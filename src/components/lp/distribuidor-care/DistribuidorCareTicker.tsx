'use client'
// B2 da LP /distribuidor-care: faixa de benefícios com botão de pausa (WCAG 2.2.2). Com "reduzir movimento",
// some a faixa animada e aparece a lista estática inteira. A cópia da animação é aria-hidden.
import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { DISTRIBUIDOR_CARE_FAIXA } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

const ITEM = 'flex shrink-0 items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#0D0C0D]'

function Itens() {
  return DISTRIBUIDOR_CARE_FAIXA.map((t) => (
    <li key={t} className={ITEM}>
      <span>{t}</span>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E8649A]" />
    </li>
  ))
}

export function DistribuidorCareTicker() {
  const [pausado, setPausado] = useState(false)
  return (
    <div className="bg-[#F4CDD4] py-3">
      <style>{`@keyframes dc-faixa { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="flex items-center gap-3 px-4 motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-label={pausado ? 'Retomar a faixa de benefícios' : 'Pausar a faixa de benefícios'}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0D0C0D] ${C.FOCO}`}
        >
          {pausado ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
        </button>
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-4"
            style={{ animation: 'dc-faixa 40s linear infinite', animationPlayState: pausado ? 'paused' : 'running' }}
          >
            <ul aria-label="Benefícios da Linha Care" className="flex gap-4"><Itens /></ul>
            <ul aria-hidden="true" className="flex gap-4"><Itens /></ul>
          </div>
        </div>
      </div>
      <ul aria-label="Benefícios da Linha Care" className="hidden flex-wrap justify-center gap-x-4 gap-y-2 px-4 motion-reduce:flex">
        <Itens />
      </ul>
    </div>
  )
}
