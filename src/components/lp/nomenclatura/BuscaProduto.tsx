'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  COLECAO_INTEIRA,
  COLECOES,
  buscarProdutos,
  nomeLegivel,
  type CodigoLinhaColecao,
  type ProdutoLinha,
} from '@/lib/produtos-linhas'

// Modal de busca de produto da linha (categoria Linha Pro/Essential). Filtra enquanto a
// pessoa digita, sem acento/cedilha, por pedaço de palavra e em qualquer ordem. Setas +
// Enter escolhem; Esc fecha. No celular ocupa a tela inteira.
export function BuscaProduto({
  linha,
  onEscolher,
  onFechar,
}: {
  linha: CodigoLinhaColecao
  onEscolher: (p: ProdutoLinha | typeof COLECAO_INTEIRA) => void
  onFechar: () => void
}) {
  const [consulta, setConsulta] = useState('')
  const [todasLinhas, setTodasLinhas] = useState(false)
  const [ativo, setAtivo] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listaRef = useRef<HTMLUListElement>(null)

  const resultados = useMemo(
    () => buscarProdutos(consulta, todasLinhas ? null : linha),
    [consulta, todasLinhas, linha],
  )

  useEffect(() => {
    inputRef.current?.focus()
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = anterior
    }
  }, [])

  useEffect(() => {
    listaRef.current?.querySelector(`[data-i="${ativo}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [ativo])

  const mudarConsulta = (v: string) => {
    setConsulta(v)
    setAtivo(0)
  }

  const onKey = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Escape') onFechar()
    else if (ev.key === 'ArrowDown') {
      ev.preventDefault()
      setAtivo((a) => Math.min(a + 1, resultados.length - 1))
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault()
      setAtivo((a) => Math.max(a - 1, 0))
    } else if (ev.key === 'Enter' && resultados[ativo]) {
      ev.preventDefault()
      onEscolher(resultados[ativo])
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center bg-black/40 md:p-6"
      onClick={onFechar}
      onKeyDown={onKey}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Escolher produto da ${COLECOES[linha].rotulo}`}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full md:max-w-[620px] md:max-h-[80vh] bg-white md:rounded-[20px] shadow-xl overflow-hidden"
      >
        <div className="p-4 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-sm font-semibold text-[#0D0C0D]">
              Qual produto da {COLECOES[linha].rotulo}?
            </p>
            <button
              type="button"
              onClick={onFechar}
              className="min-h-[36px] rounded-[10px] border border-[#E5E7EB] px-3 text-[13px] text-[#666666] hover:border-[#E8649A]"
            >
              Fechar
            </button>
          </div>
          <input
            ref={inputRef}
            value={consulta}
            onChange={(e) => mudarConsulta(e.target.value)}
            placeholder="digite: sh, clareador, perfume 500, kit, 5 litros..."
            className="w-full bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-base text-[#0D0C0D] placeholder:text-[#888888] focus:outline-none focus:border-[#E8649A]"
            aria-controls="nom-busca-lista"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
            <label className="flex items-center gap-2 text-[13px] text-[#666666] cursor-pointer">
              <input
                type="checkbox"
                checked={todasLinhas}
                onChange={(e) => {
                  setTodasLinhas(e.target.checked)
                  setAtivo(0)
                }}
                className="accent-[#E8649A]"
              />
              Buscar também na outra linha
            </label>
            <span className="text-[12px] text-[#666666]">
              {resultados.length} {resultados.length === 1 ? 'produto' : 'produtos'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEscolher(COLECAO_INTEIRA)}
          className="text-left px-4 py-3 border-b border-[#E5E7EB] bg-[#FDF2F4] hover:brightness-[0.98]"
        >
          <span className="block text-sm font-semibold text-[#0D0C0D]">Coleção inteira, sem destaque</span>
          <span className="block text-[12px] text-[#666666]">
            O anúncio fala da linha toda. O link vai para {COLECOES[linha].url.replace('https://www.', '')}
          </span>
        </button>

        <ul id="nom-busca-lista" ref={listaRef} role="listbox" className="flex-1 overflow-y-auto">
          {resultados.length === 0 && (
            <li className="px-4 py-6 text-sm text-[#666666]">
              Nenhum produto encontrado. Tente uma parte do nome (ex: &ldquo;clar&rdquo;)
              {!todasLinhas && ' ou marque "buscar também na outra linha"'}.
            </li>
          )}
          {resultados.map((p, i) => {
            const mostraGrupo = consulta.trim() === '' && (i === 0 || resultados[i - 1].grupo !== p.grupo)
            return (
              <li key={p.slug}>
                {mostraGrupo && (
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-[#E8649A]">
                    {p.grupo}
                  </p>
                )}
                <button
                  type="button"
                  data-i={i}
                  role="option"
                  aria-selected={i === ativo}
                  onMouseEnter={() => setAtivo(i)}
                  onClick={() => onEscolher(p)}
                  className={`w-full text-left min-h-[48px] px-4 py-2.5 border-b border-[#F3F4F6] ${
                    i === ativo ? 'bg-[#FDF2F4]' : 'bg-white'
                  }`}
                >
                  <span className="block text-sm text-[#0D0C0D]">{nomeLegivel(p.nome)}</span>
                  <span className="block text-[12px] text-[#666666]">
                    {p.grupo}
                    {todasLinhas && ` · ${p.linha === 'pro' ? 'Pro' : 'Essential'}`}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
