import { Clock3, Sparkles, Home } from 'lucide-react'
import { CARE_JOURNEY } from '@/lib/care'
import { Reveal } from './Reveal'

const ICONS = [Clock3, Sparkles, Home]

export function CareJourney() {
  return (
    <section className="bg-[#fdf0f3] py-16 md:py-24 px-4">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-4">
            {CARE_JOURNEY.title}
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] text-center leading-relaxed max-w-[680px] mx-auto mb-10">
            {CARE_JOURNEY.intro}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {CARE_JOURNEY.steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={step.label} delay={i * 120}>
                <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col gap-3 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="w-11 h-11 rounded-xl bg-[#fdf0f3] flex items-center justify-center">
                    <Icon size={22} className="text-[#E8649A]" />
                  </div>
                  <h3 className="font-extrabold text-[#0F0C0D]">{step.label}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={300}>
          <p className="text-sm md:text-base font-semibold text-[#0F0C0D] text-center max-w-[680px] mx-auto">
            {CARE_JOURNEY.closing}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
