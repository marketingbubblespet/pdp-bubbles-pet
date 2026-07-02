import { MC, MC_LEARN, MC_DELIVERABLES } from '@/lib/masterclass-spitz'

export function MasterLearn() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        {/* O que vai aprender */}
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          O que você vai aprender
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center max-w-[760px] mx-auto mb-4">
          {MC.transformation}
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {MC_LEARN.map((item) => (
            <div
              key={item.text}
              className="bg-[#F7F7F7] rounded-[10px] p-6 border border-[#E5E7EB] flex flex-col gap-3"
            >
              <span className="text-3xl">{item.icon}</span>
              <p className="text-sm md:text-base font-semibold text-[#0F0C0D] leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* O que você recebe */}
        <div className="mt-16 md:mt-20 max-w-[760px] mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-6 text-center">
            O que você recebe ao participar
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {MC_DELIVERABLES.map((d) => (
              <div
                key={d.text}
                className="flex items-start gap-3 bg-white rounded-[10px] p-4 border border-[#E5E7EB]"
              >
                <span className="text-2xl shrink-0">{d.icon}</span>
                <p className="text-sm font-medium text-[#0F0C0D] leading-snug">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
