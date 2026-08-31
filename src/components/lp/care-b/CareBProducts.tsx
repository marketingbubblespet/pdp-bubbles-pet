import Image from 'next/image'
import { CARE_PRODUCTS } from '@/lib/care'
import { CARE_B_PRODUCTS } from '@/lib/care-b'
import { Reveal } from '@/components/lp/care/Reveal'

// Versão condensada de CareProducts.tsx: sem abas por categoria e sem ficha técnica
// individual por produto (nome/benefício), que é carga cognitiva de PDP, não de
// captação B2B. Grid único com as mesmas 11 fotos já existentes.
export function CareBProducts() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
            {CARE_B_PRODUCTS.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-4">
            {CARE_B_PRODUCTS.h2}
          </h2>
          <p className="text-sm md:text-base text-[#666666] text-center mb-10 max-w-[640px] mx-auto">
            {CARE_B_PRODUCTS.corpo}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-8">
            {CARE_PRODUCTS.map((p) => (
              <div key={p.id} className="relative aspect-square rounded-[10px] overflow-hidden bg-[#fdf0f3]">
                <Image
                  src={p.imagem}
                  alt={p.nome}
                  fill
                  sizes="(max-width: 767px) 30vw, 160px"
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-sm md:text-base font-semibold text-[#0D0C0D] text-center mb-8">
            {CARE_B_PRODUCTS.fechamento}
          </p>
        </Reveal>

        <div className="flex justify-center">
          <a
            href="#cadastro"
            className="inline-block bg-[#3DB85C] text-white font-semibold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-md"
          >
            Quero revender essa linha →
          </a>
        </div>
      </div>
    </section>
  )
}
