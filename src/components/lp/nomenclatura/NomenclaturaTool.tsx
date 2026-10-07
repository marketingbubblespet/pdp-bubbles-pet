'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CAMPOS_POR_ETAPA,
  ESTADO_VAZIO,
  EXEMPLO_TESTE,
  montarNome,
  paginaDestino,
  obrigatoriosFaltando,
  payloadRegistro,
  segmentosNome,
  type EstadoNomenclatura,
} from '@/lib/nomenclatura'
import {
  adicionarHistorico,
  gravarRascunho,
  lerHistorico,
  lerRascunho,
  limparRascunho,
  removerDoHistorico,
  type ItemHistorico,
} from './storage'
import { AbasEtapas, NOMES_ETAPAS, type SetCampo } from './ui'
import { EtapaIdentificacao } from './EtapaIdentificacao'
import { EtapaPublicoProduto } from './EtapaPublicoProduto'
import { EtapaProducao } from './EtapaProducao'
import { EtapaDescricao } from './EtapaDescricao'
import { EtapaResultado } from './EtapaResultado'
import { Historico } from './Historico'
import { Legenda } from './Legenda'
import { CriacaoAnuncio } from './CriacaoAnuncio'

const NETLIFY_FORM_NAME = 'nomenclatura-anuncio'

function encodeForm(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

function registrarNoNetlify(payload: Record<string, string>): void {
  // Silencioso e sem bloquear: o nome já está na tela e no localStorage.
  fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm({ 'form-name': NETLIFY_FORM_NAME, ...payload }),
  }).catch((err) => console.error('Nomenclatura: falha ao registrar no Netlify Forms', err))
}

export function NomenclaturaTool() {
  // Inicializadores preguiçosos: rodam uma vez, já no cliente (a página só monta depois
  // do AcessoGate liberar), então ler localStorage e window aqui é seguro.
  const [estado, setEstado] = useState<EstadoNomenclatura>(() => lerRascunho()?.estado ?? ESTADO_VAZIO)
  const [etapa, setEtapa] = useState<number>(() => {
    const r = lerRascunho()
    return r ? Math.min(Math.max(r.etapa, 1), 4) : 1
  })
  const [nomeGerado, setNomeGerado] = useState('')
  const [geradoEm, setGeradoEm] = useState('')
  const [tentouGerar, setTentouGerar] = useState(false)
  const [tentativa, setTentativa] = useState(0)
  const [copiado, setCopiado] = useState(false)
  const [historico, setHistorico] = useState<ItemHistorico[]>(() => lerHistorico())
  const [ehLocalhost] = useState(() =>
    ['localhost', '127.0.0.1'].includes(window.location.hostname),
  )
  const caixaRef = useRef<HTMLDivElement>(null)

  // Salva o rascunho a cada mudança, para a pessoa retomar de onde parou se fechar sem querer.
  useEffect(() => {
    if (etapa >= 5) return
    gravarRascunho(estado, etapa)
  }, [estado, etapa])

  const set: SetCampo = (campo, valor) => setEstado((s) => ({ ...s, [campo]: valor }))

  const previa = useMemo(() => segmentosNome(estado), [estado])
  const previaTexto = previa.map((s) => s.texto).join('|')
  const destinoPrevia = paginaDestino(estado)
  const [copiadoLink, setCopiadoLink] = useState(false)

  const rolarParaCaixa = () => {
    const el = caixaRef.current
    if (!el) return
    if (el.getBoundingClientRect().top >= 0) return
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' })
  }

  const irParaEtapa = (n: number) => {
    setEtapa(n)
    rolarParaCaixa()
  }

  const pendencias = obrigatoriosFaltando(estado)
  const faltando = tentouGerar
    ? { campos: new Set(pendencias.map((p) => p.campo)), tentativa }
    : undefined

  // Destaca e rola até o primeiro campo em branco. O timeout espera a etapa certa
  // renderizar quando a pendência é de outra etapa.
  const apontarPendencia = (primeira: { campo: string; etapa: number }) => {
    setTentouGerar(true)
    setTentativa((t) => t + 1)
    setEtapa(primeira.etapa)
    window.setTimeout(() => {
      const el = document.getElementById(`campo-${primeira.campo}`)
      if (!el) return
      const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'center' })
    }, 60)
  }

  // Navega para a etapa n, mas não deixa PULAR para frente sem preencher os
  // obrigatórios das etapas anteriores. Voltar é sempre livre.
  const navegar = (n: number) => {
    if (n > etapa) {
      const bloqueio = pendencias.filter((p) => p.etapa < n)
      if (bloqueio.length > 0) {
        apontarPendencia(bloqueio[0])
        return
      }
    }
    setTentouGerar(false)
    irParaEtapa(n)
  }

  const gerar = () => {
    if (pendencias.length > 0) {
      apontarPendencia(pendencias[0])
      return
    }
    setTentouGerar(false)
    const agora = new Date()
    const nome = montarNome(estado, agora)
    const iso = agora.toISOString()
    setNomeGerado(nome)
    setGeradoEm(iso)
    setHistorico(adicionarHistorico({ nome, estado, geradoEm: iso }))
    registrarNoNetlify(payloadRegistro(estado, nome, agora))
    limparRascunho()
    setEtapa(5)
    rolarParaCaixa()
  }

  const copiar = (texto: string) => {
    navigator.clipboard?.writeText(texto).then(
      () => {
        setCopiado(true)
        window.setTimeout(() => setCopiado(false), 2000)
      },
      () => {},
    )
  }

  const editar = () => {
    setNomeGerado('')
    setEtapa(1)
    rolarParaCaixa()
  }

  const novoMesmaCampanha = () => {
    setEstado((s) => ({ ...s, numero: '', produto: '', destaque: '', descricao: '', talentoNome: '' }))
    setNomeGerado('')
    setEtapa(1)
    rolarParaCaixa()
  }

  const zerar = () => {
    setEstado(ESTADO_VAZIO)
    setNomeGerado('')
    setEtapa(1)
    limparRascunho()
    rolarParaCaixa()
  }

  // Preenche só os campos da etapa atual com o exemplo, sem trocar de etapa.
  const preencherEtapaAtual = () => {
    const campos = CAMPOS_POR_ETAPA[etapa] ?? []
    setEstado((s) => {
      const novo: EstadoNomenclatura = { ...s }
      for (const c of campos) (novo as Record<string, string>)[c] = EXEMPLO_TESTE[c]
      return novo
    })
  }

  const editarDoHistorico = (item: ItemHistorico) => {
    setEstado({ ...ESTADO_VAZIO, ...item.estado })
    setNomeGerado('')
    setEtapa(1)
    rolarParaCaixa()
  }

  const exemplo = ehLocalhost ? preencherEtapaAtual : undefined

  return (
    <main className="min-h-screen bg-[#F7F7F7] pb-16">
      <style>{`
        @keyframes nom-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .nom-shake { animation: nom-shake 0.45s ease-in-out; }
        @media (prefers-reduced-motion: reduce) { .nom-shake { animation: none; } }
      `}</style>
      {/* Prévia fixa do nome sendo montado, cada bloco explicado no hover */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[720px] mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <p className="font-mono text-[13px] text-[#0D0C0D] break-all flex-1">
              {previa.length > 1
                ? previa.map((s, i) => (
                    <span key={i}>
                      {i > 0 && <span className="text-[#888888]">|</span>}
                      <span title={s.dica}>{s.texto}</span>
                    </span>
                  ))
                : 'ad...'}
            </p>
            <button
              type="button"
              onClick={() => copiar(etapa >= 5 ? nomeGerado : previaTexto)}
              className="shrink-0 min-h-[36px] rounded-[10px] border border-[#E5E7EB] px-3 text-[13px] text-[#666666] hover:border-[#E8649A]"
            >
              {copiado ? 'copiado' : 'copiar'}
            </button>
          </div>
          {destinoPrevia && (
            <div className="flex items-center gap-3 mt-1">
              <p className="font-mono text-[11px] text-[#666666] truncate flex-1" title={destinoPrevia}>
                <span className="text-[#E8649A]">destino </span>
                {destinoPrevia.replace('https://www.', '')}
              </p>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard?.writeText(destinoPrevia).then(
                    () => {
                      setCopiadoLink(true)
                      window.setTimeout(() => setCopiadoLink(false), 2000)
                    },
                    () => {},
                  )
                }
                className="shrink-0 text-[11px] text-[#666666] hover:text-[#E8649A] underline underline-offset-2"
              >
                {copiadoLink ? 'copiado' : 'copiar link'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-2">
          Bubbles Pet, ferramenta interna
        </p>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-medium text-[#0D0C0D]">
            Gerador de nomenclatura de anúncios
          </h1>
          <button
            type="button"
            onClick={zerar}
            className="shrink-0 min-h-[40px] rounded-[12px] bg-[#E8649A] text-white font-semibold text-sm px-4 hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            + Criar anúncio
          </button>
        </div>
        <p className="text-sm text-[#666666] mb-6">
          Preencha as etapas e copie o nome padronizado do criativo. Os campos com
          &ldquo;*&rdquo; são obrigatórios para avançar. &ldquo;Criar anúncio&rdquo; começa
          um novo do zero.
        </p>

        {etapa < 5 && <AbasEtapas etapa={etapa} onSelect={navegar} />}

        <div
          ref={caixaRef}
          className="scroll-mt-20 rounded-[12px] border border-[#E5E7EB] bg-white p-5 md:p-6"
        >
          {etapa === 1 && <EtapaIdentificacao estado={estado} set={set} exemplo={exemplo} faltando={faltando} />}
          {etapa === 2 && <EtapaPublicoProduto estado={estado} set={set} exemplo={exemplo} faltando={faltando} />}
          {etapa === 3 && <EtapaProducao estado={estado} set={set} exemplo={exemplo} />}
          {etapa === 4 && <EtapaDescricao estado={estado} set={set} exemplo={exemplo} />}
          {etapa === 5 && (
            <EtapaResultado
              estado={estado}
              geradoEm={geradoEm}
              copiado={copiado}
              onCopiar={() => copiar(nomeGerado)}
              onEditar={editar}
              onNovoMesmaCampanha={novoMesmaCampanha}
              onZerar={zerar}
            />
          )}

          {etapa < 5 && (
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {etapa > 1 && (
                  <button
                    type="button"
                    onClick={() => navegar(Math.max(etapa - 1, 1))}
                    className="min-h-[44px] rounded-[12px] border border-[#E5E7EB] px-5 text-sm font-medium text-[#0D0C0D] hover:border-[#E8649A] transition-colors"
                  >
                    Voltar
                  </button>
                )}
                {etapa < 4 ? (
                  <button
                    type="button"
                    onClick={() => navegar(etapa + 1)}
                    className="flex-1 min-h-[44px] rounded-[12px] border border-[#E8649A] text-[#E8649A] font-semibold hover:bg-[#FDF2F4] transition-colors"
                  >
                    Avançar para {NOMES_ETAPAS[etapa]} <span aria-hidden>→</span>
                  </button>
                ) : null}
              </div>
              {tentouGerar &&
                pendencias.filter((p) => p.etapa <= etapa).length > 0 && (
                  <p className="text-[13px] text-[#E8649A]">
                    Falta preencher, obrigatório:{' '}
                    {pendencias
                      .filter((p) => p.etapa <= etapa)
                      .map((p) => p.rotulo)
                      .join(', ')}
                    .
                  </p>
                )}
              <button
                type="button"
                onClick={gerar}
                className="w-full min-h-[44px] rounded-[12px] bg-[#E8649A] text-white font-semibold hover:brightness-110 active:scale-95 transition-all duration-200"
              >
                Gerar nome
              </button>
            </div>
          )}
        </div>

        <Historico
          itens={historico}
          onCopiar={copiar}
          onEditar={editarDoHistorico}
          onExcluir={(item) =>
            setHistorico(removerDoHistorico(item.nome, item.geradoEm))
          }
        />

        <Legenda />

        <CriacaoAnuncio />
      </div>
    </main>
  )
}
