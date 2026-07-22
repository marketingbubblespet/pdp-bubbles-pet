import Image from 'next/image'
import { Users, TrendingUp, Video } from 'lucide-react'
import { CARE_DEMAND } from '@/lib/care'
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
              <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
                Lançamento · Bubbles Care
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.15] text-[#0F0C0D] mb-4">
                Revenda sem medo de encalhar. A procura a gente já criou pra você.
              </h1>
              <p className="text-base md:text-lg text-[#6B7280] font-medium leading-relaxed mb-6">
                A linha Care já tem tutor procurando. Você só precisa ter na prateleira. A Bubbles gera a demanda, o lucro fica com o seu petshop.
              </p>
            </Reveal>

            <div className="flex flex-wrap gap-2 mb-8">
              {pills.map((p, i) => (
                <Reveal key={p.text} delay={150 + i * 100} className="inline-block">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0F0C0D]">
                    <p.icon size={14} className="text-[#E8649A] shrink-0" />
                    {p.text}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <a
                href="#cadastro"
                className="inline-block bg-[#3DB85C] text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-lg"
              >
                Quero revender no meu petshop →
              </a>
              <p className="text-[10px] md:text-xs text-[#6B7280] mt-3">
                Cadastro sem compromisso. Nossos consultores falam com você.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-[560px] aspect-square rounded-2xl overflow-hidden bg-[#fdf0f3]">
              {/* Imagem de exemplo (placeholder): trocar por foto real de herói da linha Care */}
              <Image
                src="/images/hero-produto-5l.jpg"
                alt="Linha Bubbles Care"
                fill
                className="object-contain"
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
