// B3 da LP /distribuidor-care: o que a Linha Care muda no negócio (oportunidade, sem dor). Fecha sem botão.
import { Reveal } from '@/components/lp/care/Reveal'
import { DISTRIBUIDOR_CARE_OPORTUNIDADE as D } from '@/lib/distribuidor-care'
import { IconeDc, DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareChanges() {
  return (
    <section aria-labelledby="dc-titulo-oportunidade" className={`bg-white ${C.SECAO}`}>
      <div className={C.CONTAINER}>
        <h2 id="dc-titulo-oportunidade" className={cn(C.TITULO_H2, 'text-center')}>{D.titulo}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {D.cartoes.map((c, i) => (
            <li key={c.titulo}>
              <Reveal delay={i * 80} className="h-full">
                <div className={cn(C.CARTAO, 'h-full')}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#FDF2F4]">
                    <IconeDc nome={c.icone} />
                  </span>
                  <h3 className={cn(C.TITULO_H3, 'mt-4')}>{c.titulo}</h3>
                  <p className={cn(C.CORPO, 'mt-2')}>{c.texto}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-base font-medium text-[#0D0C0D] md:text-lg">{D.fechamento}</p>
      </div>
    </section>
  )
}
