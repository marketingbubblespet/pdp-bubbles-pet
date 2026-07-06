import { MC_DETAILS } from '@/lib/masterclass-spitz'

export function MasterDetailsB() {
  return (
    <section className="bg-[#080808] py-16 md:py-24 px-4">
      <div className="max-w-[800px] mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">
          Detalhes e logística
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center mb-10">
          Tudo o que você precisa saber
        </h2>

        <div className="bg-[#111111] rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
          {MC_DETAILS.map((d) => (
            <div key={d.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] sm:w-44 shrink-0">
                {d.label}
              </span>
              <span className="text-sm text-white/70">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
