import { BellRing, Tag, Users, Camera, ArrowRight, type LucideIcon } from 'lucide-react'
import { LIVE_CARE_GROUP_BENEFITS } from '@/lib/live-care'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { LiveCareCta } from './LiveCareCta'

const ICONS: Record<string, LucideIcon> = { BellRing, Tag, Users }

// Seção mais importante da página: a live é no Instagram, mas o CTA é o WhatsApp. Sem
// explicar essa ponte, a pessoa pensa "então eu só abro o Instagram no domingo" e não
// converte.
export function LiveCareGroupBenefits() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Como não perder
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-10 max-w-[720px] mx-auto">
          A live é no Instagram. O aviso, os cupons e os brindes saem no grupo.
        </h2>

        {/* Fluxo visual: grupo leva ao aviso, que leva à live */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 text-center">
          <div className="flex flex-col items-center gap-1.5 max-w-[110px]">
            <span className="w-11 h-11 rounded-full bg-[#3DB85C] flex items-center justify-center">
              <WhatsAppIcon size={20} className="text-white" />
            </span>
            <span className="text-[11px] font-semibold text-[#0D0C0D] leading-tight">Você entra no grupo</span>
          </div>
          <ArrowRight size={18} className="text-[#E8649A] shrink-0" />
          <div className="flex flex-col items-center gap-1.5 max-w-[110px]">
            <span className="w-11 h-11 rounded-full bg-[#F4CDD4] flex items-center justify-center">
              <BellRing size={20} className="text-[#0D0C0D]" />
            </span>
            <span className="text-[11px] font-semibold text-[#0D0C0D] leading-tight">A gente te avisa na hora</span>
          </div>
          <ArrowRight size={18} className="text-[#E8649A] shrink-0" />
          <div className="flex flex-col items-center gap-1.5 max-w-[110px]">
            <span className="w-11 h-11 rounded-full bg-[#E8649A] flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </span>
            <span className="text-[11px] font-semibold text-[#0D0C0D] leading-tight">Você assiste ao vivo</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {LIVE_CARE_GROUP_BENEFITS.map((b) => {
            const Icon = ICONS[b.icon]
            return (
              <div key={b.title} className="bg-[#F7F7F7] rounded-2xl p-6 border border-[#E5E7EB] flex flex-col gap-2.5">
                {Icon && <Icon size={24} className="text-[#E8649A]" />}
                <h3 className="font-medium text-[#0D0C0D]">{b.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{b.text}</p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col items-center gap-3 mt-10">
          <LiveCareCta origem="grupo" pulse className="w-full sm:w-auto text-base">
            Entrar no grupo do WhatsApp →
          </LiveCareCta>
          <p className="text-xs text-[#666666]">Grupo VIP de groomers Bubbles. Gratuito e sem compromisso.</p>
        </div>
      </div>
    </section>
  )
}
