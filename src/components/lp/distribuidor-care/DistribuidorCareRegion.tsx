// B9 da LP /distribuidor-care: menos concorrência na região, como valor (sem regra, vaga, raio ou mapa).
import { DISTRIBUIDOR_CARE_REGIAO as D } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

export function DistribuidorCareRegion() {
  return (
    <section aria-labelledby="dc-titulo-regiao" className={`bg-[#FDF2F4] ${C.SECAO} px-4`}>
      <div className="mx-auto max-w-[760px] text-center">
        <h2 id="dc-titulo-regiao" className={C.TITULO_H2}>{D.titulo}</h2>
        <p className="mt-4 text-base text-[#666666] md:text-lg">{D.texto}</p>
      </div>
    </section>
  )
}
