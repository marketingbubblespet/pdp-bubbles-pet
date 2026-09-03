import { MC } from '@/lib/masterclass-penteados'
import { MasterCtaPenteados } from './MasterCtaPenteados'
import { MasterCountdownPenteados } from './MasterCountdownPenteados'

export function MasterFinalCtaPenteados() {
  return (
    <section id="cta-final" className="bg-[#F4CDD4] py-16 md:py-24 px-4">
      <div className="max-w-[720px] mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-medium text-[#0F0C0D] mb-4 leading-tight">
          {MC.weekday}, {MC.time}. Penteados que encantam, ao vivo.
        </h2>
        <p className="text-sm md:text-base text-[#0F0C0D]/70 mb-8 max-w-[520px] mx-auto">
          Garanta seu acesso comprando a partir de R$399 em qualquer produto Bubbles até {MC.purchaseDeadline}.
        </p>

        <div className="flex justify-center mb-8">
          <MasterCountdownPenteados target={MC.targetDateISO} />
        </div>

        <MasterCtaPenteados origem="cta-final" pulse className="w-full sm:w-auto text-base md:text-lg">
          Quero garantir meu acesso →
        </MasterCtaPenteados>

        <p className="mt-4 text-xs text-[#0F0C0D]/60">
          {MC.accessRule} até {MC.purchaseDeadline}, o mesmo dia da aula.
        </p>
      </div>
    </section>
  )
}
