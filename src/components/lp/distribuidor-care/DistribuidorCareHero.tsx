// B1 da LP /distribuidor-care: primeira dobra completa no celular (eyebrow, H1, subtítulo, chips, elevador, micro-prova).
// Nada de Reveal nem priority aqui: H1 e chips nascem visíveis no HTML do servidor.
import { BadgeCheck } from 'lucide-react'
import { DISTRIBUIDOR_CARE_HERO } from '@/lib/distribuidor-care'
import { DistribuidorCareHeroChips } from './DistribuidorCareHeroChips'
import { DistribuidorCareTrackedLink } from './DistribuidorCareTrackedLink'
import { DistribuidorCareMedia, DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

const H = DISTRIBUIDOR_CARE_HERO

function Imagem() {
  // P-01: quando os dois arquivos existirem, trocar a caixa por <picture> com getImageProps (padrão CaptacaoHero.tsx:34-62),
  // fetchPriority 'high' e loading 'eager' só na fonte desktop.
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] md:aspect-[4/3]">
      <DistribuidorCareMedia codigo="P-01" alt={H.altImagem} />
      <ul className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
        {H.selos.map((s) => (
          <li key={s} className={C.PILULA}>
            <BadgeCheck size={14} aria-hidden="true" className="text-[#E8649A]" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DistribuidorCareHero() {
  return (
    <section aria-labelledby="dc-titulo-hero" className="bg-[#F7F7F7] pb-12 pt-4 md:pb-20 md:pt-12">
      <div className={cn(C.CONTAINER, 'grid items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-12')}>
        <div>
          <p className={C.EYEBROW}>{H.eyebrow}</p>
          <h1 id="dc-titulo-hero" className="mt-2 text-[26px] font-medium leading-[1.15] text-[#0D0C0D] sm:text-3xl md:mt-4 md:text-5xl">
            {H.h1}
          </h1>
          <p className="mt-2 text-[15px] leading-snug text-[#666666] md:mt-4 md:text-lg">{H.subtitulo}</p>
          <div className="mt-3 md:mt-6">
            <DistribuidorCareHeroChips />
          </div>
          <p className="mt-2 text-sm text-[#0D0C0D]">
            {H.elevador.texto}{' '}
            <DistribuidorCareTrackedLink href="#cadastro" rotulo={H.elevador.link} local="elevador"
              className={`inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-[#666666] ${C.FOCO}`}>
              {H.elevador.link}
            </DistribuidorCareTrackedLink>
          </p>
          <p className="text-xs font-medium text-[#666666]">{H.microProva}</p>
        </div>
        <Imagem />
      </div>
    </section>
  )
}
