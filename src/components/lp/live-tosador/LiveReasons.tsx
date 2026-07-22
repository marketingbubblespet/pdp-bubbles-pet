import { Gift, Tag, PartyPopper, Lightbulb, Calendar, type LucideIcon } from 'lucide-react'
import { LIVE_REASONS } from '@/lib/live-tosador'

// LIVE_REASONS guarda emoji (dado da LP); aqui trocamos por ícone Lucide.
const REASON_ICONS: Record<string, LucideIcon> = {
  '🎁': Gift,
  '🏷️': Tag,
  '🎉': PartyPopper,
  '💡': Lightbulb,
  '📅': Calendar,
}

export function LiveReasons() {
  return (
    <section className="bg-[#111111] py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">O que vai rolar na live</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center mb-10">Motivos de verdade para não perder</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {LIVE_REASONS.map((r) => {
            const Icon = REASON_ICONS[r.icon]
            return (
              <div key={r.title} className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 flex flex-col gap-2">
                {Icon && <Icon size={28} className="text-[#F4CDD4]" />}
                <h3 className="font-extrabold text-white">{r.title}</h3>
                <p className="text-sm text-white/70 leading-snug">{r.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
