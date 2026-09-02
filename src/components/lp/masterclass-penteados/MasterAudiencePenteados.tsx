import { Check } from 'lucide-react'
import { MC_AUDIENCE } from '@/lib/masterclass-penteados'

export function MasterAudiencePenteados() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[800px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Para quem é esta aula
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0F0C0D] tracking-tight text-center mb-10">
          Feita para quem já lida com pelagem difícil e quer um penteado que dure
        </h2>

        <ul className="flex flex-col gap-3">
          {MC_AUDIENCE.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-[#E5E7EB]"
            >
              <Check size={18} className="text-[#3DB85C] shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-[#0F0C0D]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
