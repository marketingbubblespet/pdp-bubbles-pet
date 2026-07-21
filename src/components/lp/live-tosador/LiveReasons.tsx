import { LIVE_REASONS } from '@/lib/live-tosador'

export function LiveReasons() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">O que vai rolar na live</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">Motivos de verdade para não perder</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {LIVE_REASONS.map((r) => (
            <div key={r.title} className="bg-[#F7F7F7] rounded-[10px] p-6 border border-[#E5E7EB] flex flex-col gap-2">
              <span className="text-3xl">{r.icon}</span>
              <h3 className="font-extrabold text-[#0F0C0D]">{r.title}</h3>
              <p className="text-sm text-[#6B7280] leading-snug">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
