import Image from 'next/image'
import { CARE_B_FINAL_CTA } from '@/lib/care-b'
import { Reveal } from '@/components/lp/care/Reveal'

export function CareBFinalCta() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <Image
        src="/images/masterclass/bastidores-2.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#0d0c0d]/85 z-0" />

      <Reveal className="relative z-10 max-w-[760px] mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#F4CDD4] mb-3">
          {CARE_B_FINAL_CTA.eyebrow}
        </p>
        <h2 className="text-2xl md:text-4xl font-medium text-white leading-tight mb-4">
          {CARE_B_FINAL_CTA.h2}
        </h2>
        <p className="text-sm md:text-base text-[#666666] mb-8 max-w-[560px] mx-auto">
          {CARE_B_FINAL_CTA.corpo}
        </p>
        <a
          href="#cadastro"
          className="inline-block bg-[#3DB85C] text-white font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg"
        >
          Quero revender no meu negócio →
        </a>
      </Reveal>
    </section>
  )
}
