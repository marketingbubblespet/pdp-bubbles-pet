import { Gift, PartyPopper, Ticket, type LucideIcon } from 'lucide-react'
import { LIVE_CARE_PRIZES } from '@/lib/live-care'
import { LiveCareCta } from './LiveCareCta'

const ICONS: Record<string, LucideIcon> = { Gift, PartyPopper, Ticket }

// Dá o motivo concreto de assistir AO VIVO, e não só ver depois. Sem prometer número de
// cupom nem produto sorteado, porque a oferta só é revelada na transmissão.
export function LiveCarePrizes() {
  return (
    <section className="bg-[#fdf0f3] py-16 md:py-20 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
          Só para quem estiver ao vivo
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] mb-4">
          Sorteio, brindes e cupons durante a transmissão
        </h2>
        <p className="text-sm md:text-base text-[#666666] mb-8 max-w-[620px] mx-auto leading-relaxed">
          Os sorteios acontecem ao vivo, e as condições especiais de lançamento são liberadas só durante a
          live. Quem assiste participa. Quem está no grupo é avisado na hora.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {LIVE_CARE_PRIZES.map((p) => {
            const Icon = ICONS[p.icon]
            return (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-4 py-2.5 text-sm font-semibold text-[#0D0C0D]"
              >
                {Icon && <Icon size={17} className="text-[#E8649A]" />}
                {p.label}
              </span>
            )
          })}
        </div>

        <LiveCareCta origem="premios" className="w-full sm:w-auto">
          Quero ser avisado no grupo →
        </LiveCareCta>
      </div>
    </section>
  )
}
