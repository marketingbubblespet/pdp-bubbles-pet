import Image from 'next/image'
import { Users, Video } from 'lucide-react'
import { CARE_DEMAND, CARE_B_DEMAND_MACHINE } from '@/lib/care-b'
import { Reveal } from '@/components/lp/care/Reveal'
import { CountUp } from '@/components/lp/care/CountUp'

// Mesma estrutura visual de CareDemandMachine.tsx (variante A). O que muda é só a
// copy: para de citar "TikTok Shop" como canal de compra (que soa concorrência pro
// lojista) e passa a falar de reconhecimento de marca. Números mantidos, sem o dado
// de "vendas em 3 meses" (era o que mais reforçava o canal de venda direta).
const stats = [
  { icon: Users, target: CARE_DEMAND.afiliados, prefix: '', label: 'Criadores gerando conteúdo pela marca' },
  { icon: Video, target: CARE_DEMAND.videos, prefix: '+', label: 'Vídeos e lives já produzidos' },
]

export function CareBDemandMachine() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <style>{`
        @keyframes careb-float-c { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-14px, 16px); } }
        .careb-blob-c { animation: careb-float-c 8s ease-in-out infinite; }
      `}</style>

      <Image
        src="/images/care-hero-produtos.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#fdf0f3]/95 z-0" />
      <div className="careb-blob-c absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-white opacity-30 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
            {CARE_B_DEMAND_MACHINE.eyebrow}
          </p>
          <h2 className="text-2xl md:text-4xl font-medium leading-tight text-[#0D0C0D] mb-4 text-center max-w-[820px] mx-auto">
            {CARE_B_DEMAND_MACHINE.h2}
          </h2>
          <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-10 text-center max-w-[720px] mx-auto">
            {CARE_B_DEMAND_MACHINE.corpo}
          </p>
        </Reveal>

        {/* items-stretch + h-full nos dois níveis (Reveal e card): garante que os dois
            blocos fiquem com a mesma altura mesmo com textos de tamanhos diferentes. */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-[560px] mx-auto items-stretch">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className="h-full">
              <div className="h-full bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center justify-center text-center gap-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <s.icon size={28} className="text-[#E8649A]" />
                <span className="text-3xl md:text-4xl font-medium text-[#0D0C0D]">
                  <CountUp target={s.target} prefix={s.prefix} />
                </span>
                <span className="text-xs md:text-sm text-[#666666] leading-snug">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="text-sm md:text-base font-semibold text-[#0D0C0D] text-center max-w-[680px] mx-auto">
            {CARE_B_DEMAND_MACHINE.fechamento}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
