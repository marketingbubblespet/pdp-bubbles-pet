// B15 da LP /distribuidor-care: CTA final (#cta-final), selo de segurança colado ao botão e o F3 para o sócio.
import { ShieldCheck } from 'lucide-react'
import { DISTRIBUIDOR_CARE_CTA_FINAL as D } from '@/lib/distribuidor-care'
import { DistribuidorCareTrackedLink } from './DistribuidorCareTrackedLink'
import { DistribuidorCareShareLink } from './DistribuidorCareShareLink'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareFinalCta() {
  return (
    <section id="cta-final" aria-labelledby="dc-titulo-cta-final" className={`bg-[#FCEEF1] ${C.SECAO} px-4`}>
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <h2 id="dc-titulo-cta-final" className="text-2xl font-medium leading-tight text-[#0D0C0D] md:text-4xl">{D.titulo}</h2>
        <DistribuidorCareTrackedLink href="#cadastro" rotulo={D.cta} local="cta-final" className={cn(C.BOTAO_PRIMARIO, 'mt-8 w-full sm:w-auto')}>
          {D.cta}
        </DistribuidorCareTrackedLink>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#666666]">
          <ShieldCheck size={14} aria-hidden="true" className="text-[#E8649A]" />
          {D.selo}
        </p>
        <div className="mt-4">
          <DistribuidorCareShareLink origem="cta-final" />
        </div>
      </div>
    </section>
  )
}
