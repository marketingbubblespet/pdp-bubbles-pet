import { Check, X } from 'lucide-react'
import { MC_AUDIENCE, MC_NOT_AUDIENCE } from '@/lib/masterclass-penteados'

export function MasterAudiencePenteados() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Para quem é esta aula
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] text-center mb-10">
          Feita para quem leva o acabamento a sério
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Para quem é */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 border border-[#E5E7EB]">
            <h3 className="font-medium text-[#0D0C0D] mb-4 flex items-center gap-2">
              <Check size={18} className="text-[#3DB85C]" /> Para quem é
            </h3>
            <ul className="flex flex-col gap-3">
              {MC_AUDIENCE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#666666]">
                  <Check size={16} className="text-[#3DB85C] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Para quem NÃO é */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 border border-[#E5E7EB]">
            <h3 className="font-medium text-[#0D0C0D] mb-4 flex items-center gap-2">
              <X size={18} className="text-[#888888]" /> Para quem não é
            </h3>
            <ul className="flex flex-col gap-3">
              {MC_NOT_AUDIENCE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#666666]">
                  <X size={16} className="text-[#888888] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
