// B7 da LP /distribuidor-care: o tutor já procura (demanda puxada, sem números do TikTok) e 3 vídeos de clientes (P-03).
// Vídeo real só como MP4 próprio: o embed do TikTok é barrado pelo frame-src da CSP.
import { Reveal } from '@/components/lp/care/Reveal'
import { DISTRIBUIDOR_CARE_DEMANDA as D, DISTRIBUIDOR_CARE_VIDEOS_CLIENTES as VIDEOS } from '@/lib/distribuidor-care'
import { DistribuidorCareVideo } from './DistribuidorCareVideo'
import { DistribuidorCareMedia, IconeDc, DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

function Videos() {
  return (
    <div role="region" aria-label={D.ariaFila} tabIndex={0}
      className={`-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 ${C.FOCO}`}>
      {VIDEOS.map((v) => (
        <div key={v.aria} className="relative aspect-[9/16] w-[58%] shrink-0 snap-start overflow-hidden rounded-[12px] md:w-auto">
          {v.src
            ? <DistribuidorCareVideo src={v.src} poster={v.poster} ariaLabel={v.aria} />
            : <DistribuidorCareMedia codigo="P-03" descricao={v.descricao} />}
        </div>
      ))}
    </div>
  )
}

export function DistribuidorCareDemand() {
  return (
    <section aria-labelledby="dc-titulo-demanda" className={`bg-[#F7F7F7] ${C.SECAO}`}>
      <div className={cn(C.CONTAINER, 'grid items-center gap-10 md:grid-cols-2')}>
        <div>
          <h2 id="dc-titulo-demanda" className={C.TITULO_H2}>{D.titulo}</h2>
          <p className="mt-4 border-l-4 border-[#E8649A] pl-4 text-xl font-medium text-[#0D0C0D] md:text-2xl">{D.texto}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {D.provas.map((p, i) => (
              <li key={p.texto}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="flex h-full items-start gap-3 rounded-[12px] border border-[#E5E7EB] bg-white p-4">
                    <IconeDc nome={p.icone} size={20} className="mt-0.5 shrink-0 text-[#E8649A]" />
                    <p className="text-sm text-[#0D0C0D]">{p.texto}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Videos />
      </div>
    </section>
  )
}
