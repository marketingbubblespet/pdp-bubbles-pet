'use client'
// B13 da LP /distribuidor-care: section#cadastro com o formulário de 4 etapas e as telas finais.
// Import estático no DistribuidorCareApp: os chips do hero escrevem no mesmo estado (useDistribuidorCareForm).
import { DISTRIBUIDOR_CARE_CADASTRO } from '@/lib/distribuidor-care'
import { ID_CAIXA, useDistribuidorCareForm } from './useDistribuidorCareForm'
import { DistribuidorCareFormSteps } from './DistribuidorCareFormSteps'
import { DistribuidorCareFormScreens } from './DistribuidorCareFormScreens'
import { Honeypot } from './DistribuidorCareFormFields'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareForm() {
  const { estado, envio, ui, acoes } = useDistribuidorCareForm()

  return (
    <section id="cadastro" aria-labelledby="dc-titulo-cadastro" className="scroll-mt-4 bg-[#FDF2F4] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[640px]">
        <h2 id="dc-titulo-cadastro" className={cn(C.TITULO_H2, 'text-center')}>{DISTRIBUIDOR_CARE_CADASTRO.titulo}</h2>
        <p className={cn(C.CORPO, 'mt-2 text-center')}>{DISTRIBUIDOR_CARE_CADASTRO.subtitulo}</p>

        {/* Âncora da regra 40: envolve formulário e telas finais, que se alternam no mesmo lugar. */}
        <div id={ID_CAIXA} data-clarity-mask="True" className="relative mt-8 scroll-mt-4 rounded-[12px] border border-[#E5E7EB] bg-white p-5 md:p-8">
          <p aria-live="polite" className="sr-only">{ui.anuncio}</p>
          {envio ? (
            <DistribuidorCareFormScreens envio={envio} />
          ) : (
            <form
              noValidate
              aria-labelledby="dc-titulo-cadastro"
              onSubmit={(e) => {
                e.preventDefault()
                if (estado.etapa < 4) acoes.continuar()
                else acoes.finalizar()
              }}
            >
              <Honeypot valor={ui.botField} aoMudar={acoes.botField} />
              <DistribuidorCareFormSteps etapa={estado.etapa} campos={estado.campos} leadId={estado.leadId} ui={ui} acoes={acoes} />
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
