import { Check } from 'lucide-react'
import { CARE_B_HERO } from '@/lib/care-b'
import { Reveal } from '@/components/lp/care/Reveal'
import { CareBForm } from './CareBForm'

// Herói da variante B: o formulário fica na primeira dobra, ao lado do texto, em vez
// de no fim da página atrás de um CTA que rola. Sem imagem de produto aqui (ela migra
// pro bloco de portfólio) — abre espaço vertical pro formulário caber sem rolagem.
export function CareBHero() {
  return (
    <section id="cadastro" className="relative pt-24 md:pt-28 px-4 pb-16 md:pb-24 bg-[#F7F7F7] overflow-hidden scroll-mt-4">
      <style>{`
        @keyframes careb-float-a { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(12px, -18px); } }
        @keyframes careb-float-b { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-16px, 14px); } }
        .careb-blob-a { animation: careb-float-a 7s ease-in-out infinite; }
        .careb-blob-b { animation: careb-float-b 9s ease-in-out infinite; }
      `}</style>

      <div className="careb-blob-a absolute -top-10 right-[10%] w-40 h-40 rounded-full bg-[#F4CDD4] opacity-40 blur-2xl pointer-events-none" />
      <div className="careb-blob-b absolute bottom-0 left-[5%] w-52 h-52 rounded-full bg-[#E8649A] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
                {CARE_B_HERO.eyebrow}
              </p>
              <h1 className="text-3xl md:text-5xl font-medium leading-[1.15] text-[#0D0C0D] mb-4">
                {CARE_B_HERO.h1}
              </h1>
              <p className="text-base md:text-lg text-[#666666] font-medium leading-relaxed mb-6">
                {CARE_B_HERO.corpo}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <ul className="flex flex-col gap-2">
                {CARE_B_HERO.proofs.map((proof) => (
                  <li key={proof} className="flex items-start gap-2 text-sm text-[#0D0C0D] font-medium">
                    <Check size={16} className="text-[#3DB85C] shrink-0 mt-0.5" />
                    {proof}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <CareBForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
