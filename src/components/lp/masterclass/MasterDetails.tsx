import { MC_DETAILS } from '@/lib/masterclass-spitz'

export function MasterDetails() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[800px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Detalhes e logística
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">
          Tudo o que você precisa saber
        </h2>

        <div className="bg-white rounded-[10px] border border-[#E5E7EB] divide-y divide-[#E5E7EB] overflow-hidden">
          {MC_DETAILS.map((d) => (
            <div key={d.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8649A] sm:w-44 shrink-0">
                {d.label}
              </span>
              <span className="text-sm font-medium text-[#0F0C0D]">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
