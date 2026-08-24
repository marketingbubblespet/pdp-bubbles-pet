import Image from 'next/image'
import { Users, TrendingUp, Video, Check } from 'lucide-react'
import { CARE_DEMAND, CARE_QUICK_PROOFS } from '@/lib/care'
import { Reveal } from './Reveal'

const pills = [
  { icon: Users, text: `${CARE_DEMAND.afiliados.toLocaleString('pt-BR')} afiliados divulgando` },
  { icon: TrendingUp, text: `${CARE_DEMAND.vendas3meses.toLocaleString('pt-BR')} produtos vendidos em 3 meses` },
  { icon: Video, text: `+${CARE_DEMAND.videos.toLocaleString('pt-BR')} vídeos criados` },
]

export function CareHero() {
  return (
    <section className="relative pt-24 md:pt-28 px-4 pb-16 md:pb-24 bg-[#F7F7F7] overflow-hidden">
      <style>{`
        @keyframes care-float-a { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(12px, -18px); } }
        @keyframes care-float-b { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-16px, 14px); } }
        .care-blob-a { animation: care-float-a 7s ease-in-out infinite; }
        .care-blob-b { animation: care-float-b 9s ease-in-out infinite; }
      `}</style>

      {/* Blobs decorativos flutuando */}
      <div className="care-blob-a absolute -top-10 right-[10%] w-40 h-40 rounded-full bg-[#F4CDD4] opacity-40 blur-2xl pointer-events-none" />
      <div className="care-blob-b absolute bottom-0 left-[5%] w-52 h-52 rounded-full bg-[#E8649A] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
                Lançamento · Bubbles Care
              </p>
              <h1 className="text-3xl md:text-5xl font-medium leading-[1.15] text-[#0D0C0D] mb-4">
                Transforme cada banho em uma nova oportunidade de venda e fature 2 vezes.
              </h1>
              <p className="text-base md:text-lg text-[#666666] font-medium leading-relaxed mb-6">
                A Linha Care chega com uma linha completa para banho, finalização e manutenção em casa, unindo qualidade profissional, design marcante e uma estratégia de marketing pensada para gerar procura, giro e recompra.
              </p>
            </Reveal>

            {/* Provas rápidas */}
            <Reveal delay={100}>
              <ul className="flex flex-col gap-2 mb-6">
                {CARE_QUICK_PROOFS.map((proof) => (
                  <li key={proof} className="flex items-start gap-2 text-sm text-[#0D0C0D] font-medium">
                    <Check size={16} className="text-[#3DB85C] shrink-0 mt-0.5" />
                    {proof}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="flex flex-wrap gap-2 mb-8">
              {pills.map((p, i) => (
                <Reveal key={p.text} delay={200 + i * 100} className="inline-block">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0D0C0D]">
                    <p.icon size={14} className="text-[#E8649A] shrink-0" />
                    {p.text}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={450}>
              <a
                href="#cadastro"
                className="inline-block bg-[#3DB85C] text-white font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-lg"
              >
                Quero ser revendedor da Linha Care →
              </a>
              <p className="text-[10px] md:text-xs text-[#666666] mt-3">
                Cadastro sem compromisso. Nossa equipe comercial entrará em contato para apresentar as condições de revenda.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative flex justify-center md:justify-end">
            <div className="group relative w-full max-w-[560px] aspect-square rounded-2xl overflow-hidden bg-[#fdf0f3]">
              <Image
                src="/images/care-hero-produtos.jpg"
                alt="Linha Bubbles Care"
                fill
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1"
                priority
                fetchPriority="high"
                sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 768px) 560px, 560px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
