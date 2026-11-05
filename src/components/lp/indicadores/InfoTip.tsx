'use client'
// Ícone "i" com explicação. Desktop: aparece ao passar o mouse. Celular: ao tocar.
// A caixa abre para BAIXO (o cabeçalho da tabela fica no topo da área de rolagem).
import { useState } from 'react'
import { Info } from 'lucide-react'

export function InfoTip({ titulo, texto, alinhar = 'centro' }: {
  titulo: string
  texto: string
  alinhar?: 'esquerda' | 'centro' | 'direita'
}) {
  const [aberto, setAberto] = useState(false)
  const pos = alinhar === 'esquerda' ? 'left-0' : alinhar === 'direita' ? 'right-0' : 'left-1/2 -translate-x-1/2'
  return (
    <span data-info className="group/info relative ml-1 inline-flex items-center align-[-1px]">
      {/* span com role=button (não <button>): o ícone também fica dentro de cards que já são
          botões, e botão dentro de botão é HTML inválido. stopPropagation evita abrir o card. */}
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => { e.stopPropagation(); setAberto((v) => !v) }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setAberto((v) => !v) } }}
        onMouseLeave={() => setAberto(false)}
        aria-label={`O que é ${titulo}`}
        aria-expanded={aberto}
        className="cursor-help text-[#888888] hover:text-[#E8649A] focus-visible:text-[#E8649A] transition-colors duration-150"
      >
        <Info size={12} strokeWidth={2.25} />
      </span>
      <span
        role="tooltip"
        className={`pointer-events-none absolute top-full z-30 mt-2 w-60 rounded-[12px] bg-[#0D0C0D] px-3 py-2 text-left text-[11px] whitespace-normal font-normal normal-case tracking-normal leading-snug text-white shadow-lg ${pos} ${
          // display (não opacity): escondida não ocupa espaço nem estica a rolagem da tabela
          aberto ? 'block' : 'hidden group-hover/info:block group-focus-within/info:block'
        }`}
      >
        <span className="block font-semibold">{titulo}</span>
        <span className="mt-0.5 block text-white/80">{texto}</span>
      </span>
    </span>
  )
}
