import { Bell, Tag, Users, type LucideIcon } from 'lucide-react'
import { LIVE_GROUP_BENEFITS } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'

// LIVE_GROUP_BENEFITS guarda emoji (dado da LP); aqui trocamos por ícone Lucide.
const BENEFIT_ICONS: Record<string, LucideIcon> = {
  '🔔': Bell,
  '🏷️': Tag,
  '👥': Users,
}

export function LiveGroupBenefits() {
  return (
    <section id="participar" className="bg-[#111111] py-16 md:py-24 px-4 scroll-mt-4">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">Por que entrar no grupo</p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-10">O grupo é a sua garantia de não perder nada</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {LIVE_GROUP_BENEFITS.map((b) => {
            const Icon = BENEFIT_ICONS[b.icon]
            return (
              <div key={b.title} className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 flex flex-col gap-2 items-center text-center">
                {Icon && <Icon size={28} className="text-[#F4CDD4]" />}
                <h3 className="font-extrabold text-white">{b.title}</h3>
                <p className="text-sm text-white/70 leading-snug">{b.text}</p>
              </div>
            )
          })}
        </div>
        <LiveCta pulse className="text-base md:text-lg shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
      </div>
    </section>
  )
}
