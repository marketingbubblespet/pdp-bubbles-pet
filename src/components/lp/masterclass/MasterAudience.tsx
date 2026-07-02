import { MC_AUDIENCE, MC_NOT_AUDIENCE } from '@/lib/masterclass-spitz'

export function MasterAudience() {
  return (
    <section className="bg-[#fdf0f3] py-16 md:py-24 px-4">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Para quem é esta aula
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">
          Feita para quem leva o banho e tosa a sério
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Para quem é */}
          <div className="bg-white rounded-[10px] p-6 md:p-8 border border-[#E5E7EB]">
            <h3 className="font-extrabold text-[#0F0C0D] mb-4 flex items-center gap-2">
              <span className="text-[#3DB85C]">✓</span> Para quem é
            </h3>
            <ul className="flex flex-col gap-3">
              {MC_AUDIENCE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#0F0C0D]">
                  <span className="text-[#3DB85C] mt-0.5 shrink-0">✓</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Para quem NÃO é */}
          <div className="bg-white rounded-[10px] p-6 md:p-8 border border-[#E5E7EB]">
            <h3 className="font-extrabold text-[#0F0C0D] mb-4 flex items-center gap-2">
              <span className="text-[#9ca3af]">✕</span> Para quem não é
            </h3>
            {MC_NOT_AUDIENCE.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {MC_NOT_AUDIENCE.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6B7280]">
                    <span className="text-[#9ca3af] mt-0.5 shrink-0">✕</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-[80%] min-h-[120px] border-2 border-dashed border-[#E8649A]/40 rounded-[10px] p-6 text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8649A]">
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
