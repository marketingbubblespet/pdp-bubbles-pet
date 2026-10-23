// B8 da LP /distribuidor-care: o que o distribuidor e a equipe recebem, com P-04, P-05 e a foto de expedição.
import Image from 'next/image'
import { Reveal } from '@/components/lp/care/Reveal'
import { DISTRIBUIDOR_CARE_APOIO as D } from '@/lib/distribuidor-care'
import { DistribuidorCareMedia, IconeDc, DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareSupport() {
  return (
    <section aria-labelledby="dc-titulo-apoio" className={`bg-white ${C.SECAO}`}>
      <div className={C.CONTAINER}>
        <h2 id="dc-titulo-apoio" className={cn(C.TITULO_H2, 'text-center')}>{D.titulo}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {D.itens.map((item, i) => (
            <li key={item.titulo}>
              <Reveal delay={Math.min(i * 40, 240)} className="h-full">
                <div className={cn(C.CARTAO, 'h-full')}>
                  <IconeDc nome={item.icone} />
                  <h3 className="mt-3 text-sm font-medium text-[#0D0C0D] md:text-base">{item.titulo}</h3>
                  {'texto' in item && <p className="mt-1 text-sm text-[#666666]">{item.texto}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          <div className="relative aspect-square overflow-hidden rounded-[12px]"><DistribuidorCareMedia codigo="P-04" /></div>
          <div className="relative aspect-square overflow-hidden rounded-[12px]"><DistribuidorCareMedia codigo="P-05" /></div>
          <div className="relative col-span-2 aspect-square overflow-hidden rounded-[12px] md:col-span-1">
            <Image src={D.fotoExpedicao} alt={D.altExpedicao} fill sizes="(max-width: 767px) calc(100vw - 32px), 352px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
