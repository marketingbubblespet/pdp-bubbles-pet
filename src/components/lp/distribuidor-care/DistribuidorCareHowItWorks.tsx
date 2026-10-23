// B12 da LP /distribuidor-care: como funciona, em 4 passos. Sem botão.
import { Reveal } from '@/components/lp/care/Reveal'
import { DISTRIBUIDOR_CARE_COMO_FUNCIONA as D } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareHowItWorks() {
  return (
    <section aria-labelledby="dc-titulo-como-funciona" className={`bg-white ${C.SECAO}`}>
      <div className={C.CONTAINER}>
        <h2 id="dc-titulo-como-funciona" className={cn(C.TITULO_H2, 'text-center')}>{D.titulo}</h2>
        <div className="relative mx-auto mt-10 max-w-[760px] md:max-w-none">
        <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-0.5 bg-[#F4CDD4] md:hidden" />
        <ol role="list" className="relative grid list-none gap-6 md:grid-cols-4">
          {D.passos.map((p, i) => (
            <li key={p} className="relative">
              <Reveal delay={i * 80} className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4CDD4] font-semibold text-[#0D0C0D]">
                  {i + 1}
                </span>
                <p className="pt-2.5 text-sm text-[#0D0C0D] md:pt-0 md:text-base">{p}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
