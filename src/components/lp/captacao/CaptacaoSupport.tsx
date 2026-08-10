import Image from 'next/image'
import { Truck, TrendingUp, Award, type LucideIcon } from 'lucide-react'
import { CAPTACAO_SUPPORT_ITEMS } from '@/lib/captacao'

const ICONS: Record<string, LucideIcon> = { Truck, TrendingUp, Award }

export function CaptacaoSupport() {
  return (
    <section id="suporte" className="py-20 px-6 md:px-10 relative bg-[#0F0C0D]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Excelência Logística</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight tracking-tight uppercase break-words">
            Suporte Total: <br className="hidden md:block" />
            Do Pedido à <br className="block md:hidden" />
            <span className="text-[#F4CDD4]">Satisfação do seu Cliente.</span>
          </h2>
          <p className="text-white/60 text-base mb-12 leading-relaxed">
            Nossa operação é desenhada para que sua única preocupação seja o{' '}
            <span className="text-white font-bold">relacionamento comercial</span>. O seu sell-in é consequência
            direta do nosso suporte no seu sell-out. Com produtos de{' '}
            <span className="text-white font-bold">fácil aceitação inicial</span> e altíssima taxa de recompra, a
            reposição de estoque se torna um processo natural e acelerado.
          </p>

          <div className="space-y-8">
            {CAPTACAO_SUPPORT_ITEMS.map((it) => {
              const Icon = ICONS[it.icon]
              return (
                <div key={it.title} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F4CDD4]/40 transition-colors shadow-lg">
                    <Icon className="text-[#F4CDD4]" />
                  </div>
                  <div>
                    <h5 className="text-white font-black text-lg mb-1 tracking-tight">{it.title}</h5>
                    <p className="text-white/40 text-xs font-medium">{it.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[#F4CDD4]/10 blur-[80px] rounded-full -z-10" />
          <div className="bg-[#1A1A1A] border border-white/10 p-4 rounded-[40px] shadow-2xl relative overflow-hidden">
            <div className="relative w-full aspect-[3/2] rounded-[32px] overflow-hidden">
              <Image
                src="/images/distribuidores/bubbles-estoque-expedicao-desktop.webp"
                alt="Logística Bubbles"
                fill
                sizes="(max-width: 1023px) 100vw, 526px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C0D] via-transparent to-transparent opacity-40" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <p className="text-white font-black text-[10px] md:text-sm uppercase tracking-widest bg-[#F4CDD4] text-[#0F0C0D] px-3 md:px-4 py-1.5 md:py-2 rounded-full inline-block shadow-xl">
                Logística de Alta Performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
