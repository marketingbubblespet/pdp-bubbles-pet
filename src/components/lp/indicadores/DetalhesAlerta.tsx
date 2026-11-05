// Aba "Detalhes de alerta": fechada por padrão, abre ao clicar (<details> nativo, sem JS).
// Lista as anomalias do mês com comparação ao dia anterior e à média, hipóteses e plano.
import { ChevronDown } from 'lucide-react'
import { formatMoney, formatPct, formatRoas } from '@/lib/planos/format'
import { detectarAnomalias, type Anomalia, type Indicador } from '@/lib/planos/anomalias'
import { DIAGNOSTICO, NOME_INDICADOR } from '@/lib/planos/anomalias-diagnostico'
import type { Dia } from '@/lib/planos/indicadores'

const FORMATO: Record<Indicador, (v: number) => string> = {
  receita: formatMoney,
  pedidos: (v) => Math.round(v).toLocaleString('pt-BR'),
  sessoes: (v) => Math.round(v).toLocaleString('pt-BR'),
  aprovacao: (v) => formatPct(v * 100, 2),
  conversao: (v) => formatPct(v * 100, 2),
  investimento: formatMoney,
  roas: formatRoas,
  ticket: formatMoney,
}

const dataBR = (d: string) => `${d.slice(8)}/${d.slice(5, 7)}`

function variacao(a: Anomalia, v: number) {
  if (a.indicador === 'aprovacao') {
    const pts = (v * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })
    return `${v >= 0 ? '+' : ''}${pts} pontos`
  }
  return `${v >= 0 ? '+' : ''}${formatPct(v * 100, 0)}`
}

function Item({ a }: { a: Anomalia }) {
  const f = FORMATO[a.indicador]
  const diag = DIAGNOSTICO[a.indicador][a.direcao]
  const forte = a.severidade === 'forte'
  return (
    <li className={`rounded-[12px] border p-4 ${forte ? 'border-red-400 bg-[#FDF2F4]' : 'border-[#F4A522] bg-[#FFF8EB]'}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-[4px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${forte ? 'bg-red-400 text-white' : 'bg-[#F4A522] text-[#0D0C0D]'}`}>
          {a.direcao === 'queda' ? 'Queda' : 'Alta'} {forte ? 'forte' : 'moderada'}
        </span>
        <span className="text-sm font-semibold text-[#0D0C0D]">{NOME_INDICADOR[a.indicador]} · {dataBR(a.data)}</span>
      </div>
      <p className="mt-2 text-sm text-[#0D0C0D]">
        Ficou em <span className="font-semibold">{f(a.valor)}</span>: {variacao(a, a.vsAnterior)} em relação a {dataBR(a.dataAnterior)} ({f(a.anterior)})
        e {variacao(a, a.vsMedia)} em relação à média dos dias anteriores ({f(a.media)}).
        {a.semana && <> No mesmo dia da semana anterior ({dataBR(a.semana.data)}) foi {f(a.semana.valor)}: {variacao(a, a.semana.variacao)}.</>}
      </p>
      {diag.hipoteses.length > 0 && (
        <details className="group/diag mt-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-[#0D0C0D] underline decoration-dotted underline-offset-4 [&::-webkit-details-marker]:hidden">
            Ver possíveis causas e o que fazer
            <ChevronDown size={14} className="transition-transform duration-150 group-open/diag:rotate-180 motion-reduce:transition-none" />
          </summary>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#666666]">Possíveis causas</p>
            <ul className="mt-1 list-disc pl-4 text-sm text-[#0D0C0D] space-y-0.5">{diag.hipoteses.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#666666]">O que fazer</p>
            <ol className="mt-1 list-decimal pl-4 text-sm text-[#0D0C0D] space-y-0.5">{diag.plano.map((p) => <li key={p}>{p}</li>)}</ol>
          </div>
        </div>
        </details>
      )}
    </li>
  )
}

export function DetalhesAlerta({ dias }: { dias: Dia[] }) {
  const anomalias = detectarAnomalias(dias)
  const fortes = anomalias.filter((a) => a.severidade === 'forte').length

  return (
    <details className="group rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 md:px-6 [&::-webkit-details-marker]:hidden">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-base md:text-lg font-medium text-[#0D0C0D]">Detalhes de alerta</span>
          <span className="rounded-[4px] bg-[#F7F7F7] px-2 py-0.5 text-xs text-[#666666]">
            {anomalias.length === 0 ? 'nenhuma anomalia' : `${anomalias.length} ${anomalias.length === 1 ? 'anomalia' : 'anomalias'}${fortes ? ` · ${fortes} forte${fortes > 1 ? 's' : ''}` : ''}`}
          </span>
        </span>
        <ChevronDown size={18} className="shrink-0 text-[#666666] transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className="border-t border-[#E5E7EB] p-4 md:p-6">
        <p className="text-xs text-[#666666]">
          Cada dia é comparado com o dia anterior que tem dado, com a média dos dias anteriores e, a partir do 8º dia, com o mesmo dia da semana anterior. Dias com alta fora do normal
          ficam fora dessa base, para um pico não gerar alerta de queda no dia seguinte. Entra aqui variação de 30% ou mais
          (forte a partir de 50%) e queda de 3 pontos ou mais na aprovação (forte a partir de 6). Usa os números do Groomer, que é a planilha completa.
        </p>
        {anomalias.length === 0 ? (
          <p className="mt-4 text-sm text-[#0D0C0D]">Nenhuma variação fora do normal até agora.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">{anomalias.map((a) => <Item key={`${a.data}-${a.indicador}`} a={a} />)}</ul>
        )}
      </div>
    </details>
  )
}
