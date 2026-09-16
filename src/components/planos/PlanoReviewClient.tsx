'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import type { PlanoFrontmatter, Decisao } from '@/lib/planos/types'
import { montarArvore, achatarArvore, montarMapaGrupoConjunto } from '@/lib/planos/tree'
import { calcularResumo } from '@/lib/planos/resumo'
import { usePlanoState } from '@/lib/planos/usePlanoState'
import { Sidebar } from './Sidebar'
import { AcoesLista } from './AcoesLista'
import { ResumoFinal } from './ResumoFinal'

export function PlanoReviewClient({ frontmatter }: { frontmatter: PlanoFrontmatter }) {
  const { estado, aprovar, reprovar, escolherOpcao, limpar } = usePlanoState(frontmatter.slug)

  const arvore = useMemo(() => montarArvore(frontmatter.acoes), [frontmatter.acoes])
  const ordem = useMemo(() => achatarArvore(arvore), [arvore])
  const grupoDe = useMemo(() => montarMapaGrupoConjunto(frontmatter.acoes), [frontmatter.acoes])
  const revisaveis = useMemo(() => ordem.filter((a) => a.tipo_acao !== 'executado'), [ordem])

  const primeiraPendenteId = revisaveis.find((a) => (estado[a.id]?.decisao ?? 'pendente') === 'pendente')?.id
  const [abertos, setAbertos] = useState<Set<string>>(() => new Set(primeiraPendenteId ? [primeiraPendenteId] : []))

  // `estado` chega vazio na hidratação (o servidor não tem localStorage) e troca pro valor
  // real do navegador logo depois, via useSyncExternalStore. Detectamos essa troca
  // comparando com o valor guardado num state (não numa ref: ler `ref.current` durante a
  // renderização não é permitido) e só então abrimos a pendente certa — ajuste de estado
  // durante a renderização, sem useEffect, então não recai no "setState dentro de efeito".
  const [estadoInicial] = useState(estado)
  const [inicializado, setInicializado] = useState(false)
  if (!inicializado && estado !== estadoInicial) {
    setInicializado(true)
    setAbertos(new Set(primeiraPendenteId ? [primeiraPendenteId] : []))
  }

  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  const registrarRef = useCallback((id: string, el: HTMLDivElement | null) => {
    refs.current[id] = el
  }, [])

  const scrollBehavior = (): ScrollBehavior =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

  const proximaPendente = useCallback(
    (idAtual: string) => {
      const posAtual = revisaveis.findIndex((a) => a.id === idAtual)
      const resto = revisaveis.slice(posAtual + 1)
      return resto.find((a) => (estado[a.id]?.decisao ?? 'pendente') === 'pendente')
    },
    [revisaveis, estado],
  )

  const avancar = useCallback(
    (idAtual: string) => {
      const proxima = proximaPendente(idAtual)
      setAbertos(proxima ? new Set([proxima.id]) : new Set())
      if (proxima) {
        // Dá um instante pro DOM abrir a próxima caixa antes de rolar até ela.
        requestAnimationFrame(() => {
          refs.current[proxima.id]?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
        })
      }
    },
    [proximaPendente],
  )

  const onToggle = useCallback((id: string) => {
    setAbertos((prev) => {
      const novo = new Set(prev)
      if (novo.has(id)) novo.delete(id)
      else novo.add(id)
      return novo
    })
  }, [])

  const onAprovar = useCallback(
    (id: string, observacao: string) => {
      aprovar(id, observacao)
      avancar(id)
    },
    [aprovar, avancar],
  )

  const onReprovar = useCallback(
    (id: string, justificativa: string) => {
      reprovar(id, justificativa)
      avancar(id)
    },
    [reprovar, avancar],
  )

  const onEscolherOpcao = useCallback(
    (id: string, opcaoId: string, justificativa: string) => {
      const decisao: Decisao = opcaoId === 'nenhuma' ? 'reprovado' : 'aprovado'
      escolherOpcao(id, opcaoId, decisao, justificativa)
      avancar(id)
    },
    [escolherOpcao, avancar],
  )

  const onSelecionarSidebar = useCallback((id: string) => {
    setAbertos((prev) => new Set(prev).add(id))
    requestAnimationFrame(() => {
      refs.current[id]?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
    })
  }, [])

  const expandirTudo = () => setAbertos(new Set(revisaveis.map((a) => a.id)))
  const recolherTudo = () => setAbertos(new Set())

  const decisoesPorId: Record<string, Decisao> = useMemo(() => {
    const mapa: Record<string, Decisao> = {}
    for (const a of revisaveis) mapa[a.id] = estado[a.id]?.decisao ?? 'pendente'
    return mapa
  }, [revisaveis, estado])

  const totalRevisados = revisaveis.filter((a) => decisoesPorId[a.id] !== 'pendente').length
  const resumo = useMemo(() => calcularResumo(frontmatter.acoes, estado), [frontmatter.acoes, estado])

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
      <Sidebar
        plano={frontmatter}
        arvore={arvore}
        decisoesPorId={decisoesPorId}
        totalRevisaveis={revisaveis.length}
        totalRevisados={totalRevisados}
        onSelecionar={onSelecionarSidebar}
      />

      <div className="flex flex-col gap-6 min-w-0">
        <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
          Nota: nas verbas sugeridas, os centavos indicam o investimento diário anterior. Ex: R$ 34,28 significa
          &quot;passar para R$ 34/dia, estava em R$ 28/dia&quot;.
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={abertos.size === revisaveis.length ? recolherTudo : expandirTudo}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E8649A] transition-colors"
          >
            {abertos.size === revisaveis.length ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />}
            {abertos.size === revisaveis.length ? 'Recolher tudo' : 'Expandir tudo'}
          </button>
        </div>

        <AcoesLista
          nos={arvore}
          profundidade={0}
          abertos={abertos}
          estado={estado}
          onToggle={onToggle}
          onAprovar={onAprovar}
          onReprovar={onReprovar}
          onEscolherOpcao={onEscolherOpcao}
          registrarRef={registrarRef}
        />

        <ResumoFinal plano={frontmatter} resumo={resumo} grupoDe={grupoDe} onLimpar={limpar} />
      </div>
    </div>
  )
}
