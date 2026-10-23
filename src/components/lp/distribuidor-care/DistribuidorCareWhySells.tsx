// B4 da LP /distribuidor-care: por que a Linha Care vende (4 pilares) e o vídeo de demonstração (P-02, placeholder).
import { Reveal } from '@/components/lp/care/Reveal'
import { DISTRIBUIDOR_CARE_MIDIA, DISTRIBUIDOR_CARE_POR_QUE_VENDE as D } from '@/lib/distribuidor-care'
import { DistribuidorCareVideo } from './DistribuidorCareVideo'
import { DistribuidorCareMedia, IconeDc, DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

function Video() {
  const m = DISTRIBUIDOR_CARE_MIDIA['P-02']
  const src = m.mobile ?? m.desktop
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] md:aspect-video">
      {src ? (
        <DistribuidorCareVideo src={src} srcDesktop={m.desktop} poster={m.posterMobile ?? m.posterDesktop} ariaLabel={D.ariaVideo} />
      ) : (
        <DistribuidorCareMedia codigo="P-02" />
      )}
    </div>
  )
}

export function DistribuidorCareWhySells() {
  return (
    <section aria-labelledby="dc-titulo-por-que-vende" className={`bg-[#F7F7F7] ${C.SECAO}`}>
      <div className={C.CONTAINER}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 id="dc-titulo-por-que-vende" className={C.TITULO_H2}>{D.titulo}</h2>
            <ul className="mt-8 space-y-6">
              {D.pilares.map((p, i) => (
                <li key={p.titulo}>
                  <Reveal delay={Math.min(i * 80, 240)} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-white">
                      <IconeDc nome={p.icone} />
                    </span>
                    <div>
                      <h3 className={C.TITULO_H3}>{p.titulo}</h3>
                      <p className={cn(C.CORPO, 'mt-1')}>{p.texto}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Video />
        </div>
        <p className="mt-10 text-center text-base font-medium text-[#0D0C0D] md:text-lg">{D.fechamento}</p>
      </div>
    </section>
  )
}
