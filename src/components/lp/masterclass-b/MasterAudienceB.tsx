import { Check, X } from 'lucide-react'
import { MC_AUDIENCE, MC_NOT_AUDIENCE } from '@/lib/masterclass-spitz'

export function MasterAudienceB() {
  return (
    <section className="bg-[#080808] py-16 md:py-24 px-4">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">
          Para quem é esta aula
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center mb-10">
          Feita para quem leva o banho e tosa a sério
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Para quem é */}
          <div className="bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/5">
            <h3 className="font-black text-white tracking-tight mb-4 flex items-center gap-2">
              <Check size={18} className="text-[#F4CDD4]" /> Para quem é
            </h3>
            <ul className="flex flex-col gap-3">
              {MC_AUDIENCE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                  <Check size={16} className="text-[#F4CDD4] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Para quem NÃO é */}
          <div className="bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/5">
            <h3 className="font-black text-white tracking-tight mb-4 flex items-center gap-2">
              <X size={18} className="text-white/60" /> Para quem não é
            </h3>
            {MC_NOT_AUDIENCE.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {MC_NOT_AUDIENCE.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <X size={16} className="text-white/60 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-[80%] min-h-[120px] border border-dashed border-[#F4CDD4]/30 rounded-xl p-6 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4]">
                  [Aguardando informações]
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
