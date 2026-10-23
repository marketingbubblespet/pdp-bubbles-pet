'use client'
// B14 da LP /distribuidor-care: perguntas frequentes em acordeão (uma aberta por vez). As respostas ficam no DOM
// desde o servidor (hidden), e cada uma fecha num link para #cadastro (a 7 vai para #simulador).
import { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { pushFaqOpen } from '@/lib/tracking'
import { DISTRIBUIDOR_CARE_FAQ, DISTRIBUIDOR_CARE_FAQ_TITULO } from '@/lib/distribuidor-care'
import { DistribuidorCareTrackedLink } from './DistribuidorCareTrackedLink'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareFaq() {
  const [aberta, setAberta] = useState<number | null>(null)

  const alternar = (n: number) => {
    if (aberta === n) { setAberta(null); return }
    setAberta(n)
    pushFaqOpen(n)
  }

  return (
    <section aria-labelledby="dc-titulo-faq" className={`bg-white ${C.SECAO}`}>
      <div className={C.CONTAINER}>
        <h2 id="dc-titulo-faq" className={cn(C.TITULO_H2, 'text-center')}>{DISTRIBUIDOR_CARE_FAQ_TITULO}</h2>
        <div className="mx-auto mt-10 max-w-[760px]">
          {DISTRIBUIDOR_CARE_FAQ.map((f, i) => {
            const n = i + 1
            const estaAberta = aberta === n
            return (
              <div key={f.q} className="border-b border-[#E5E7EB]">
                <h3>
                  <button type="button" id={`dc-faq-pergunta-${n}`} aria-expanded={estaAberta} aria-controls={`dc-faq-resposta-${n}`}
                    onClick={() => alternar(n)}
                    className={`flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-[#0D0C0D] ${C.FOCO}`}>
                    {f.q}
                    <ChevronDown size={20} aria-hidden="true"
                      className={`shrink-0 text-[#E8649A] transition-transform duration-150 ${estaAberta ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div id={`dc-faq-resposta-${n}`} hidden={!estaAberta} className="pb-5">
                  <p className={C.CORPO}>{f.a}</p>
                  <DistribuidorCareTrackedLink href={f.cta.href} rotulo={f.cta.rotulo} local={`faq-${n}`} className={cn(C.LINK_TEXTO, 'mt-2 text-sm')}>
                    {f.cta.rotulo}
                    <ArrowRight size={16} aria-hidden="true" />
                  </DistribuidorCareTrackedLink>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
