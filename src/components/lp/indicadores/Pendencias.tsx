// Balão amarelo "dados faltando": fechado por padrão, abre ao clicar (<details>, sem JS).
// Some sozinho quando não falta nada.
import { AlertTriangle, ChevronDown } from 'lucide-react'
import type { Dia } from '@/lib/planos/indicadores'
import { listarPendencias } from '@/lib/planos/pendencias'

const dataBR = (d: string) => `${d.slice(8)}/${d.slice(5, 7)}`

export function Pendencias({ dias, hoje }: { dias: Dia[]; hoje: string }) {
  const pend = listarPendencias(dias, hoje)
  if (pend.length === 0) return null
  const totalManuais = pend.reduce((a, p) => a + p.manuais.length, 0)
  const ontem = pend[0]?.data
  const total = pend.reduce((a, p) => a + p.manuais.length + p.automaticos.length, 0)

  return (
    <details className="group relative inline-block">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-[#F4A522] bg-[#FFF8EB] px-3 py-1 text-xs font-semibold text-[#7A4B00] [&::-webkit-details-marker]:hidden">
        <AlertTriangle size={13} strokeWidth={2.25} aria-hidden />
        {total} {total === 1 ? 'dado faltando' : 'dados faltando'}
        <ChevronDown size={13} className="transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
      </summary>
      <div className="absolute left-0 top-full z-30 mt-2 w-[min(88vw,380px)] rounded-[12px] border border-[#F4A522] bg-[#FFF8EB] p-4 text-sm text-[#0D0C0D] shadow-lg">
        <p className="text-xs text-[#4A3A1A]">
          Dias que já passaram e ainda têm campo vazio na planilha. Os números desses dias aparecem no painel
          com o que já existe; as taxas avisam até que dia consideram.
        </p>
        {totalManuais > 0 && (
          <p className="mt-2 text-xs text-[#4A3A1A]"><span className="font-semibold">Manual</span> = preenchimento a partir da Shopify. <span className="font-semibold">Automático</span> = Adveronix, que importa por volta das 10h30.</p>
        )}
        <ul className="mt-3 flex max-h-[50vh] flex-col gap-3 overflow-y-auto">
          {pend.map((p) => (
            <li key={p.data}>
              <p className="font-semibold">{dataBR(p.data)}{p.data === ontem ? ' (último dia)' : ''}</p>
              {p.manuais.length > 0 && <p className="mt-0.5 text-xs"><span className="font-semibold">Manual:</span> {p.manuais.join(' · ')}</p>}
              {p.automaticos.length > 0 && <p className="mt-0.5 text-xs"><span className="font-semibold">Automático:</span> {p.automaticos.join(' · ')}</p>}
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}
