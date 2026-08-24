import { Layers, BadgeCheck, Sparkles, RefreshCw, Megaphone, TrendingUp, type LucideIcon } from 'lucide-react'
import { CARE_WHY_RESELL } from '@/lib/care'
import { Reveal } from './Reveal'

const ICONS: Record<string, LucideIcon> = {
  Layers,
  BadgeCheck,
  Sparkles,
  RefreshCw,
  Megaphone,
  TrendingUp,
}

export function CareWhyResell() {
  return (
    <section className="relative bg-[#F7F7F7] py-16 md:py-24 px-4 overflow-hidden">
      {/* Textura de fundo (grid de pontos), reforça o clima tecnológico da seção */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(232,100,154,0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
            Diferenciais Bubbles Care
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-10 max-w-[780px] mx-auto">
            O que torna a Bubbles Care uma oportunidade diferente para o canal
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {CARE_WHY_RESELL.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col gap-3 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="w-11 h-11 rounded-xl bg-[#fdf0f3] flex items-center justify-center">
                    {Icon && <Icon size={22} className="text-[#E8649A]" />}
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#E8649A]">{item.label}</p>
                  <h3 className="font-medium text-[#0D0C0D]">{item.title}</h3>
                  <p className="text-sm text-[#666666] leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
