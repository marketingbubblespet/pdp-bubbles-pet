import { Layers, RefreshCw, Megaphone, TrendingUp, type LucideIcon } from 'lucide-react'
import { CARE_B_WHY_RESELL } from '@/lib/care-b'
import { Reveal } from '@/components/lp/care/Reveal'

const ICONS: Record<string, LucideIcon> = {
  Layers,
  RefreshCw,
  Megaphone,
  TrendingUp,
}

// 4 dos 6 cards de CareWhyResell.tsx (variante A): mantém margem, giro/recompra,
// marketing de apoio, portfólio completo. Corta design/apresentação e qualidade
// profissional, que são argumento de produto, não de negócio B2B.
export function CareBWhyResell() {
  return (
    <section className="relative bg-[#F7F7F7] py-16 md:py-24 px-4 overflow-hidden">
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
            Por que revender a Care
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-10 max-w-[780px] mx-auto">
            Uma nova frente de faturamento com estrutura pra sustentar
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 items-stretch">
          {CARE_B_WHY_RESELL.map((item, i) => {
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
