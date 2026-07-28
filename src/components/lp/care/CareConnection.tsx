import { CheckCircle2 } from 'lucide-react'
import { CARE_CONNECTION } from '@/lib/care'
import { Reveal } from './Reveal'

export function CareConnection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-4">
            {CARE_CONNECTION.title}
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] text-center leading-relaxed max-w-[720px] mx-auto mb-8">
            {CARE_CONNECTION.text}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="grid sm:grid-cols-2 gap-3 mb-8 max-w-[720px] mx-auto">
            {CARE_CONNECTION.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 bg-[#F7F7F7] rounded-xl p-4 text-sm text-[#0F0C0D] font-medium">
                <CheckCircle2 size={18} className="text-[#E8649A] shrink-0 mt-0.5" />
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-[#fdf0f3] rounded-2xl p-6 md:p-8 text-center max-w-[720px] mx-auto">
            <p className="text-base md:text-lg font-extrabold text-[#0F0C0D]">
              {CARE_CONNECTION.highlight}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
