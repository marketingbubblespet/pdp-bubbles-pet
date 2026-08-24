import { Check } from 'lucide-react'
import { LIVE_CARE_AUDIENCE } from '@/lib/live-care'

export function LiveCareAudience() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Para quem é
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-10">
          Feita para quem trabalha com banho e tosa
        </h2>

        <ul className="flex flex-col gap-3">
          {LIVE_CARE_AUDIENCE.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 bg-[#F7F7F7] rounded-xl px-5 py-4 border border-[#E5E7EB]"
            >
              <Check size={18} className="text-[#3DB85C] shrink-0 mt-0.5" />
              <span className="text-sm md:text-base font-medium text-[#0D0C0D]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
