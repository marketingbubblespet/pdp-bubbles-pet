import { TrendingUp, Clock, Scissors, Handshake, Award, ShieldCheck, type LucideIcon } from 'lucide-react'
import { CARE_WHY_RESELL } from '@/lib/care'
import { Reveal } from './Reveal'

const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Clock,
  Scissors,
  Handshake,
  Award,
  ShieldCheck,
}

export function CareWhyResell() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
            Por que revender
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10 max-w-[720px] mx-auto">
            Uma nova receita que entra sem tirar tempo do seu banho e tosa.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CARE_WHY_RESELL.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="w-11 h-11 rounded-xl bg-[#fdf0f3] flex items-center justify-center">
                    {Icon && <Icon size={22} className="text-[#E8649A]" />}
                  </div>
                  <h3 className="font-extrabold text-[#0F0C0D]">{item.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
