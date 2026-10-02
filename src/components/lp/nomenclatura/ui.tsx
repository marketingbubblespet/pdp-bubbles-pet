'use client'
// Peças de UI compartilhadas entre as etapas. Tema claro do DESIGN-SYSTEM.md:
// accent rosa #E8649A, texto #666666, borda #E5E7EB, raio 12px, alvo mínimo 44px.
import type { ReactNode } from 'react'
import type { EstadoNomenclatura, Opcao, OpcaoSimples, SegmentoNome } from '@/lib/nomenclatura'

export const NOMES_ETAPAS = ['Identificação', 'Público e produto', 'Produção', 'Do que se trata']

// Abas das 4 etapas. A pessoa pode pular para qualquer etapa a qualquer momento.
export function AbasEtapas({
  etapa,
  onSelect,
}: {
  etapa: number
  onSelect: (n: number) => void
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1 pb-1 mb-3">
      {NOMES_ETAPAS.map((nome, i) => {
        const num = i + 1
        const ativo = etapa === num
        return (
          <button
            key={num}
            type="button"
            onClick={() => onSelect(num)}
            aria-current={ativo ? 'step' : undefined}
            className={`shrink-0 min-h-[40px] rounded-[10px] border px-3 text-[13px] transition-colors ${
              ativo
                ? 'border-[#E8649A] bg-[#FDF2F4] text-[#0D0C0D] font-semibold'
                : 'border-[#E5E7EB] bg-white text-[#666666] hover:border-[#E8649A]'
            }`}
          >
            {num}. {nome}
          </button>
        )
      })}
    </div>
  )
}

// Nome do criativo com cada bloco explicado no hover (title). O bloco inteiro é
// clicável e copia o nome completo.
export function NomeSegmentado({
  segmentos,
  onCopiar,
}: {
  segmentos: SegmentoNome[]
  onCopiar: () => void
}) {
  return (
    <button
      type="button"
      onClick={onCopiar}
      title="Clique para copiar o nome completo"
      className="w-full text-left rounded-[12px] border border-[#E5E7EB] bg-[#FDF2F4] p-4 cursor-pointer hover:border-[#E8649A] transition-colors"
    >
      <span className="font-mono text-[15px] leading-relaxed text-[#0D0C0D] break-all">
        {segmentos.map((s, i) => (
          <span key={i}>
            {i > 0 && <span className="text-[#888888]">|</span>}
            <span title={s.dica} className="underline decoration-dotted decoration-[#E8649A]/50 underline-offset-2">
              {s.texto}
            </span>
          </span>
        ))}
      </span>
    </button>
  )
}

// Setter tipado do estado do formulário, compartilhado por todas as etapas.
export type SetCampo = <K extends keyof EstadoNomenclatura>(
  campo: K,
  valor: EstadoNomenclatura[K],
) => void

// Campos obrigatórios em branco a destacar (só depois de tentar avançar).
export type Faltando = { campos: Set<string>; tentativa: number }

export type EtapaProps = {
  estado: EstadoNomenclatura
  set: SetCampo
  faltando?: Faltando
  // Quando presente (só no localhost), a etapa mostra um botão que preenche os
  // campos DESTA etapa com um exemplo, sem sair dela.
  exemplo?: () => void
}

// Botão de "preencher exemplo" de uma etapa. Some fora do localhost.
export function BotaoExemplo({ onClick }: { onClick?: () => void }) {
  if (!onClick) return null
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 min-h-[36px] rounded-[10px] border border-dashed border-[#888888] px-3 text-[13px] text-[#666666] hover:border-[#E8649A]"
    >
      Preencher exemplo desta etapa
    </button>
  )
}

export const rotulo = 'block text-sm font-medium text-[#0D0C0D] mb-1'
export const ajuda = 'text-[13px] text-[#666666] mb-3'
export const campoTexto =
  'w-full bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-base text-[#0D0C0D] placeholder:text-[#888888] focus:outline-none focus:border-[#E8649A]'

// `campo` liga a seção a uma pendência (id usado para rolar até ela). Quando o campo é
// obrigatório e ficou em branco numa tentativa de avançar, a seção ganha borda rosa,
// fundo, aviso e um tremor curto (reiniciado a cada tentativa pela `key`).
export function Secao({
  titulo,
  campo,
  faltando,
  children,
}: {
  titulo: string
  campo?: string
  faltando?: Faltando
  children: ReactNode
}) {
  const erro = Boolean(campo && faltando?.campos.has(campo))
  return (
    <div
      id={campo ? `campo-${campo}` : undefined}
      key={erro ? `erro-${faltando?.tentativa}` : 'ok'}
      className={`mb-7 scroll-mt-24 transition-colors ${
        erro
          ? 'nom-shake rounded-[12px] border-2 border-[#E8649A] bg-[#FDF2F4] p-4 -mx-4 shadow-[0_0_0_4px_rgba(232,100,154,0.18)]'
          : ''
      }`}
    >
      <p className={rotulo}>{titulo}</p>
      {erro && (
        <p role="alert" className="flex items-center gap-1.5 text-[13px] font-semibold text-[#E8649A] mb-2">
          <span aria-hidden className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-[#E8649A] text-white text-[12px]">
            !
          </span>
          Falta preencher este campo
        </p>
      )}
      {children}
    </div>
  )
}

// Grade de botões de escolha única. Cada opção mostra o rótulo e, quando existe,
// um exemplo curto embaixo.
export function GradeOpcoes({
  opcoes,
  valor,
  onSelect,
  colunas = 2,
}: {
  opcoes: (Opcao | OpcaoSimples)[]
  valor: string
  onSelect: (codigo: string) => void
  colunas?: 2 | 3
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
    >
      {opcoes.map((o) => {
        const ativo = valor === o.codigo
        const ex = 'ex' in o ? o.ex : ''
        return (
          <button
            key={o.codigo}
            type="button"
            onClick={() => onSelect(o.codigo)}
            aria-pressed={ativo}
            className={`min-h-[44px] text-left rounded-[12px] border px-3 py-2.5 transition-colors ${
              ativo
                ? 'border-[#E8649A] bg-[#FDF2F4]'
                : 'border-[#E5E7EB] bg-white hover:border-[#E8649A]'
            }`}
          >
            <span
              className={`block text-sm ${ativo ? 'font-semibold text-[#0D0C0D]' : 'font-medium text-[#0D0C0D]'}`}
            >
              {o.rotulo}
            </span>
            {ex && <span className="block text-[12px] leading-snug text-[#666666] mt-0.5">{ex}</span>}
          </button>
        )
      })}
    </div>
  )
}

// Chips de sugestão (produto, colaboradores): preenchem o campo de texto.
export function Chips({
  itens,
  onPick,
  ativo,
}: {
  itens: string[]
  onPick: (item: string) => void
  ativo?: string
}) {
  if (itens.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {itens.map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(i)}
          className={`min-h-[36px] rounded-full border px-3 text-[13px] transition-colors ${
            ativo === i
              ? 'border-[#E8649A] bg-[#FDF2F4] text-[#0D0C0D]'
              : 'border-[#E5E7EB] bg-white text-[#666666] hover:border-[#E8649A]'
          }`}
        >
          {i}
        </button>
      ))}
    </div>
  )
}
