'use client'
// Gráfico de barras empilhadas por dia, só com CSS (sem biblioteca nova).
// O detalhe do dia aparece numa faixa fixa acima das barras (não flutua por cima do gráfico,
// então nunca sobrepõe título nem é cortado na borda). Hover no desktop, toque no celular.
// Sem interação, a faixa mostra hoje (ou o último dia com dado).
import { useState } from 'react'
import { formatMoney } from '@/lib/planos/format'
import type { Dia } from '@/lib/planos/indicadores'

export type Serie = { rotulo: string; campo: Exclude<keyof Dia, 'data'>; cor: string }

const FORMATOS = {
  moeda: formatMoney,
  inteiro: (v: number) => Math.round(v).toLocaleString('pt-BR'),
}

export function GraficoDiario({ titulo, dias, series, formato, hoje }: {
  titulo: string
  dias: Dia[]
  series: Serie[]
  formato: keyof typeof FORMATOS
  hoje: string
}) {
  const fmt = FORMATOS[formato]
  const totalDia = (d: Dia) => series.reduce((acc, s) => acc + (d[s.campo] ?? 0), 0)
  const maximo = Math.max(1, ...dias.map(totalDia))
  const ultimoComDado = [...dias].reverse().find((d) => totalDia(d) > 0)?.data
  const padrao = dias.some((d) => d.data === hoje) && totalDia(dias.find((d) => d.data === hoje)!) > 0 ? hoje : ultimoComDado ?? hoje
  const [ativo, setAtivo] = useState<string | null>(null)
  const sel = dias.find((d) => d.data === (ativo ?? padrao))
  const rotuloDia = (d: string) => `${d.slice(8)}/${d.slice(5, 7)}`

  return (
    <section className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base md:text-lg font-medium text-[#0D0C0D]">{titulo}</h2>
        <div className="flex gap-4 text-xs text-[#666666]">
          {series.map((s) => (
            <span key={s.rotulo} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-black/10" style={{ background: s.cor }} />
              {s.rotulo}
            </span>
          ))}
        </div>
      </div>

      {/* Faixa de detalhe do dia selecionado */}
      {sel && (
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-[12px] bg-[#F7F7F7] px-3 py-2 text-sm" aria-live="polite">
          <span className="font-semibold text-[#0D0C0D]">{rotuloDia(sel.data)}{sel.data === hoje ? ' · hoje' : ''}</span>
          {series.map((s) => (
            <span key={s.rotulo} className="flex items-center gap-1.5 text-[#666666]">
              <span className="h-2 w-2 rounded-full border border-black/10" style={{ background: s.cor }} />
              {s.rotulo} <span className="text-[#0D0C0D]">{fmt(sel[s.campo] ?? 0)}</span>
            </span>
          ))}
          <span className="text-[#666666]">Total <span className="font-semibold text-[#0D0C0D]">{fmt(totalDia(sel))}</span></span>
        </div>
      )}

      <div className="mt-4 flex h-44 md:h-52 items-end gap-[2px] md:gap-1" onMouseLeave={() => setAtivo(null)}>
        {dias.map((d) => {
          const total = totalDia(d)
          const selecionado = sel?.data === d.data
          return (
            <button
              key={d.data}
              type="button"
              onMouseEnter={() => setAtivo(d.data)}
              onClick={() => setAtivo(d.data)}
              aria-label={`${rotuloDia(d.data)}: ${fmt(total)}`}
              aria-pressed={selecionado}
              className="flex h-full min-w-0 flex-1 flex-col justify-end"
            >
              <span
                className={`mx-auto flex w-[70%] flex-col-reverse overflow-hidden rounded-t-[3px] bg-[#F7F7F7] transition-opacity duration-150 motion-reduce:transition-none ${ativo && !selecionado && total > 0 ? 'opacity-60' : ''}`}
                style={{ height: `${Math.max(2, (total / maximo) * 100)}%` }}
              >
                {series.map((s) => (
                  <span key={s.rotulo} style={{ height: `${total ? ((d[s.campo] ?? 0) / total) * 100 : 0}%`, background: s.cor }} />
                ))}
              </span>
            </button>
          )
        })}
      </div>

      {/* Eixo dos dias: no celular só a cada 5 dias + hoje, para não amontoar */}
      <div className="mt-1 flex gap-[2px] md:gap-1">
        {dias.map((d, i) => {
          const ehHoje = d.data === hoje
          const n = i + 1
          const mostraMobile = ehHoje || n === 1 || n % 5 === 0
          return (
            <span
              key={d.data}
              className={`min-w-0 flex-1 text-center text-[10px] leading-4 ${ehHoje ? 'font-semibold text-[#E8649A]' : 'text-[#666666]'} ${mostraMobile ? '' : 'invisible md:visible'}`}
            >
              {d.data.slice(8)}
            </span>
          )
        })}
      </div>
    </section>
  )
}
