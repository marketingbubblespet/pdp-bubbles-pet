import Image from 'next/image'
import { Check } from 'lucide-react'
import { CARE_B_SERVICE_PROOF } from '@/lib/care-b'
import { Reveal } from '@/components/lp/care/Reveal'

// Bloco novo da variante B: a objeção número um do groomer ("vender Care vai espaçar
// meus banhos") vira seção própria, com o argumento invertido — manutenção em casa
// melhora a operação do salão, em vez de só "não atrapalhar". Ver docs/care/plano-lp-care-b.md,
// seção 4.
export function CareBServiceProof() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <Reveal className="relative aspect-[4/3] rounded-2xl overflow-hidden order-first md:order-none">
          <Image
            src="/images/mechanism-pelagem.jpg"
            alt="Pet com pelagem bem cuidada, resultado do banho profissional mantido em casa"
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), 520px"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            {CARE_B_SERVICE_PROOF.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] leading-tight mb-4">
            {CARE_B_SERVICE_PROOF.h2}
          </h2>
          <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-6">
            {CARE_B_SERVICE_PROOF.corpo}
          </p>
          <ul className="flex flex-col gap-3">
            {CARE_B_SERVICE_PROOF.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm text-[#0D0C0D] font-medium">
                <Check size={16} className="text-[#3DB85C] shrink-0 mt-0.5" />
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
