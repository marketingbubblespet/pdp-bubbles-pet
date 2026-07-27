import Image from 'next/image'
import { Clock, Star, Users, Heart, Package, type LucideIcon } from 'lucide-react'
import { CARE_BRAND_STATS } from '@/lib/care'
import { Reveal } from './Reveal'
import { CountUp } from './CountUp'

const ICONS: Record<string, LucideIcon> = { Clock, Star, Users, Heart, Package }

export function CareBrand() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Foto de fundo (exemplo/placeholder): trocar por imagem real da marca/ambiente Bubbles */}
      <Image
        src="/images/masterclass/bastidores-1.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">
            Nossa essência
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white text-center mb-6">
            Quem é a <span className="text-[#F4CDD4]">Bubbles®</span>?
          </h2>
          <p className="text-sm md:text-base text-white/70 text-center leading-relaxed max-w-[720px] mx-auto mb-2">
            A Bubbles® nasceu no mercado profissional de banho e tosa. Foi de lá que vimos a lacuna do home care: o tutor sai satisfeito da loja, mas não tinha como continuar esse cuidado em casa.
          </p>
          <p className="text-sm md:text-base text-white/70 text-center leading-relaxed max-w-[720px] mx-auto mb-10">
            Pensando nessa necessidade e no faturamento extra que isso representa pro seu negócio, criamos a <strong className="text-white">Linha Care</strong>: a mesma qualidade e performance que você já entrega no pet shop, agora pronta pra continuar em casa e virar uma nova fonte de receita pro seu negócio.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {CARE_BRAND_STATS.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <Reveal key={s.label} delay={i * 100}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-white/10 flex flex-col items-center text-center gap-1.5 transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15">
                  {Icon && <Icon size={20} className="text-[#F4CDD4]" />}
                  <span className="font-extrabold text-white text-lg md:text-xl">
                    <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-white">{s.label}</span>
                  <span className="text-[10px] text-white/50">{s.sub}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
