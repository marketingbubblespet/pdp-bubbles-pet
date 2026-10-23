// B0 da LP /distribuidor-care: cabeçalho mínimo, sem menu e com logos sem link. Botão só no desktop.
import Image from 'next/image'
import { DISTRIBUIDOR_CARE_CABECALHO } from '@/lib/distribuidor-care'
import { DistribuidorCareTrackedLink } from './DistribuidorCareTrackedLink'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareHeader() {
  return (
    <header className="border-b border-[#E5E7EB] bg-white">
      <div className={cn(C.CONTAINER, 'flex h-12 items-center justify-start md:h-16 md:justify-between')}>
        <div className="flex items-center gap-3">
          <Image src="/images/bubbles-logo.svg" width={101} height={24} alt="Bubbles" />
          <span aria-hidden="true" className="h-6 w-px bg-[#E5E7EB]" />
          <Image src="/images/distribuidor-care/logo-linha-care-v1.svg" width={80} height={24} alt="Linha Care" />
        </div>
        <DistribuidorCareTrackedLink href="#cadastro" rotulo={DISTRIBUIDOR_CARE_CABECALHO.cta} local="cabecalho"
          className={cn(C.BOTAO_SECUNDARIO, 'hidden text-sm md:inline-flex')}>
          {DISTRIBUIDOR_CARE_CABECALHO.cta}
        </DistribuidorCareTrackedLink>
      </div>
    </header>
  )
}
