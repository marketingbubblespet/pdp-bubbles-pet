// Resumo em uma linha do último dia fechado: responde "estamos bem?" em 5 segundos.
// Dia de referência = último dia antes de hoje com receita preenchida.
// Comparações usam a receita do Groomer (a planilha do Tutor ainda chega incompleta).
import { formatMoney, formatPct } from '@/lib/planos/format'
import { detectarAnomalias, ehPositiva, menos7 } from '@/lib/planos/anomalias'
import { ritmoMeta, type Indicadores } from '@/lib/planos/indicadores'

const dataBR = (d: string) => `${d.slice(8)}/${d.slice(5, 7)}`

function Variacao({ v, rotulo }: { v: number | null; rotulo: string }) {
  if (v == null) return null
  const cor = v >= 0 ? 'text-[#166534]' : 'text-[#B4235F]'
  return (
    <span className="whitespace-nowrap">
      <span className={`font-semibold ${cor}`}>{v >= 0 ? '+' : ''}{formatPct(v * 100, 0)}</span> {rotulo}
    </span>
  )
}

export function ResumoDia({ dados, hoje }: { dados: Indicadores; hoje: string }) {
  const comDado = dados.dias.filter((d) => d.data < hoje && d.receitaB2B != null)
  const ref = comDado[comDado.length - 1]
  if (!ref) return null

  const anteriores = comDado.slice(0, -1)
  const media = anteriores.length ? anteriores.reduce((a, d) => a + (d.receitaB2B ?? 0), 0) / anteriores.length : null
  const semana = dados.dias.find((d) => d.data === menos7(ref.data))?.receitaB2B ?? null
  const rel = (b: number | null) => (b != null && b > 0 ? (ref.receitaB2B! - b) / b : null)
  const r = ritmoMeta(dados, hoje)
  // Só os negativos: variação boa não é alerta.
  const alertas = detectarAnomalias(dados.dias).filter((a) => a.data === ref.data && !ehPositiva(a))
  const fortes = alertas.filter((a) => a.severidade === 'forte').length

  return (
    <section className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 md:px-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">Resumo de {dataBR(ref.data)}</p>
      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-[#666666]">
        <span className="text-base md:text-lg font-semibold text-[#0D0C0D]">{formatMoney(ref.receitaB2B!)}</span>
        <span>de receita (Groomer)</span>
        <Variacao v={rel(media)} rotulo="vs média dos dias anteriores" />
        <Variacao v={rel(semana)} rotulo="vs mesmo dia da semana passada" />
        <span className="whitespace-nowrap">
          · <span className="font-semibold text-[#0D0C0D]">{r.ritmo == null ? '—' : formatPct(r.ritmo * 100, 0)}</span> do ritmo da meta
        </span>
        <span className="whitespace-nowrap">
          · <span className="font-semibold text-[#0D0C0D]">{alertas.length}</span> {alertas.length === 1 ? 'alerta' : 'alertas'} no dia{fortes ? ` (${fortes} forte${fortes > 1 ? 's' : ''})` : ''}
        </span>
      </p>
    </section>
  )
}
