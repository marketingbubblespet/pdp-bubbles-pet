import { Scissors, Star, GraduationCap, MessageCircle, Link2, type LucideIcon } from 'lucide-react'
import { MC, MC_LEARN, MC_DELIVERABLES } from '@/lib/masterclass-penteados'

const LEARN_ICONS: Record<string, LucideIcon> = {
  '✂️': Scissors,
  '⭐': Star,
}
const DELIVERABLE_ICONS: Record<string, LucideIcon> = {
  '🎓': GraduationCap,
  '💬': MessageCircle,
  '🔗': Link2,
}

export function MasterLearnPenteados() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          O que você vai aprender
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0F0C0D] tracking-tight text-center max-w-[760px] mx-auto mb-4">
          {MC.transformation}
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {MC_LEARN.map((item) => {
            const Icon = LEARN_ICONS[item.icon]
            return (
              <div
                key={item.text}
                className="bg-[#F7F7F7] rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#F4CDD4] transition-colors duration-300 flex flex-col gap-3"
              >
                {Icon && <Icon size={28} className="text-[#E8649A]" />}
                <p className="text-sm md:text-base font-medium text-[#0F0C0D] leading-snug">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 md:mt-20 max-w-[760px] mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#E8649A] mb-6 text-center">
            O que você recebe ao participar
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {MC_DELIVERABLES.map((d) => {
              const Icon = DELIVERABLE_ICONS[d.icon]
              return (
                <div
                  key={d.text}
                  className="flex items-start gap-3 bg-[#F7F7F7] rounded-xl p-4 border border-[#E5E7EB]"
                >
                  {Icon && <Icon size={22} className="text-[#E8649A] shrink-0" />}
                  <p className="text-sm text-[#6B7280] leading-relaxed">{d.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
