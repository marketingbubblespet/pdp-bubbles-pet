'use client'
// B5 da LP /distribuidor-care (#simulador): faturamento = investimento ÷ 0,55; lucro = faturamento menos investimento.
// Slider sobre o índice da lista (26 posições), sempre começando no primeiro valor; ressalva colada aos resultados.
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { pushCalculatorUse } from '@/lib/tracking'
import { DISTRIBUIDOR_CARE, DISTRIBUIDOR_CARE_SIMULADOR as S, DISTRIBUIDOR_CARE_VALORES_SIMULADOR as VALORES } from '@/lib/distribuidor-care'
import { DistribuidorCareTrackedLink } from './DistribuidorCareTrackedLink'
import { DistribuidorCareShareLink } from './DistribuidorCareShareLink'
import { IconeDc, DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

const reais = (n: number) => 'R$ ' + new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(n)

// Trava de 1,5 s entre eventos (padrão de CareCalculator.tsx:13-28)
let ultimoEvento = 0
function registrarUso(investimento: number): void {
  const agora = Date.now()
  if (agora - ultimoEvento < 1500) return
  ultimoEvento = agora
  pushCalculatorUse(DISTRIBUIDOR_CARE.calculatorName, { investimento })
}

function Numeros() {
  return (
    <ul className="mt-8 space-y-4">
      {S.numeros.map((n) => (
        <li key={n.destaque} className="flex items-center gap-3 text-base text-[#0D0C0D] md:text-lg">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-white">
            <IconeDc nome={n.icone} />
          </span>
          <span>{n.antes}<strong className="font-semibold">{n.destaque}</strong>{n.depois}</span>
        </li>
      ))}
    </ul>
  )
}

function Resultado({ rotulo, valor }: { rotulo: string; valor: number }) {
  return (
    <div className="rounded-[12px] bg-[#F7F7F7] p-4">
      <p className="text-xs text-[#666666]">{rotulo}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-[#0D0C0D] md:text-2xl">{reais(valor)}</p>
    </div>
  )
}

export function DistribuidorCareCalculator() {
  const [indice, setIndice] = useState(0)
  const investimento = VALORES[indice]
  const faturamento = Math.round(investimento / 0.55)
  const lucro = faturamento - investimento

  return (
    <section id="simulador" aria-labelledby="dc-titulo-simulador" className={`bg-[#FDF2F4] ${C.SECAO}`}>
      <div className={cn(C.CONTAINER, 'grid items-start gap-10 md:grid-cols-[1fr_1.1fr]')}>
        <div>
          <p className={C.EYEBROW}>{S.eyebrow}</p>
          <h2 id="dc-titulo-simulador" tabIndex={-1} className={cn(C.TITULO_H2, 'mt-3 focus:outline-none')}>{S.titulo}</h2>
          <Numeros />
        </div>
        <div className={cn(C.CARTAO, 'p-6 md:p-8')}>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="dc-simulador-investimento" className="text-sm font-medium text-[#0D0C0D]">{S.rotuloSlider}</label>
            <span className="text-lg font-semibold tabular-nums text-[#0D0C0D]">{reais(investimento)}</span>
          </div>
          <input
            id="dc-simulador-investimento"
            type="range"
            min={0}
            max={VALORES.length - 1}
            step={1}
            value={indice}
            aria-valuetext={reais(investimento)}
            onChange={(e) => {
              const i = Number(e.target.value)
              setIndice(i)
              registrarUso(VALORES[i])
            }}
            className={`mt-3 h-11 w-full cursor-pointer touch-pan-y accent-[#E8649A] ${C.FOCO}`}
          />
          <p className="text-xs text-[#666666]">{S.minimo}</p>
          <div aria-live="polite" aria-atomic="true" className="mt-5 grid grid-cols-2 gap-3">
            <Resultado rotulo={S.rotulos.faturamento} valor={faturamento} />
            <Resultado rotulo={S.rotulos.lucro} valor={lucro} />
          </div>
          <p className={cn(C.LEGAL, 'mt-3 leading-relaxed')}>{S.ressalva}</p>
          <DistribuidorCareTrackedLink href="#cadastro" rotulo={S.cta} local="simulador" className={cn(C.BOTAO_PRIMARIO, 'mt-6 w-full')}>
            {S.cta}
          </DistribuidorCareTrackedLink>
          <div className="mt-3 flex justify-center">
            <DistribuidorCareShareLink origem="simulador" />
          </div>
        </div>
      </div>
    </section>
  )
}
