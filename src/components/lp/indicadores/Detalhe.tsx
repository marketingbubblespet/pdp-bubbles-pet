'use client'
// Caixinha que mostra a divisão de um número (ex: B2B x B2C).
// Desktop: aparece ao passar o mouse. Celular: aparece ao tocar (e some ao tocar de novo).
import { useState, type ReactNode } from 'react'

export type LinhaDetalhe = { rotulo: string; valor: string; cor: string }

export function Detalhe({ linhas, children, className = '' }: {
  linhas: LinhaDetalhe[]
  children: ReactNode
  className?: string
}) {
  const [aberto, setAberto] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setAberto((v) => !v)}
      onMouseLeave={() => setAberto(false)}
      aria-expanded={aberto}
      className={`group/det relative text-left ${className}`}
    >
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-[12px] bg-[#0D0C0D] px-3 py-2 text-xs text-white shadow-lg transition-opacity duration-150 motion-reduce:transition-none ${
          aberto ? 'opacity-100' : 'opacity-0 group-hover/det:opacity-100 group-has-[[data-info]:hover]/det:!opacity-0'
        }`}
      >
        {linhas.map((l) => (
          <span key={l.rotulo} className="flex items-center gap-2 py-0.5">
            <span className="h-2 w-2 rounded-full" style={{ background: l.cor }} />
            <span className="text-white/70">{l.rotulo}</span>
            <span className="ml-auto pl-3 font-semibold">{l.valor}</span>
          </span>
        ))}
      </span>
    </button>
  )
}
