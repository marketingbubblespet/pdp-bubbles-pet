'use client'
// Trilho genérico da LP /distribuidor-care: trilho com scroll-snap, sem autoplay. Setas só no desktop e só quando
// o trilho transborda; cada clique rola um item. Nada roda sozinho.
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DISTRIBUIDOR_CARE_VITRINE as V } from '@/lib/distribuidor-care'
import { comportamento } from './useDistribuidorCareForm'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

type Props = {
  id: string
  ariaLabel: string
  cabecalho?: ReactNode
  focavel?: boolean          // trilho sem elemento focável dentro (kits): recebe Tab para rolar pelo teclado
  centralizarDesktop?: boolean
  children: ReactNode
}

type Estado = { transborda: boolean; inicio: boolean; fim: boolean }

const SETA = `flex h-11 w-11 items-center justify-center rounded-full border border-[#888888] bg-white text-[#0D0C0D] disabled:opacity-40 ${C.FOCO}`

export function DistribuidorCareCarousel({ id, ariaLabel, cabecalho, focavel = false, centralizarDesktop = false, children }: Props) {
  const trilho = useRef<HTMLUListElement>(null)
  const [estado, setEstado] = useState<Estado>({ transborda: false, inicio: true, fim: false })

  useEffect(() => {
    const el = trilho.current
    if (!el) return
    const medir = () => setEstado({
      transborda: el.scrollWidth > el.clientWidth + 1,
      inicio: el.scrollLeft <= 1,
      fim: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    })
    const obs = new ResizeObserver(medir)
    obs.observe(el)
    el.addEventListener('scroll', medir, { passive: true })
    return () => { obs.disconnect(); el.removeEventListener('scroll', medir) }
  }, [])

  const rolar = (direcao: 1 | -1) => {
    const el = trilho.current
    const item = el?.firstElementChild as HTMLElement | null
    if (!el || !item) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: direcao * (item.getBoundingClientRect().width + gap), behavior: comportamento() })
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>{cabecalho}</div>
        {estado.transborda && (
          <div className="hidden gap-2 md:flex">
            <button type="button" aria-label={V.anteriores} aria-controls={id} disabled={estado.inicio} onClick={() => rolar(-1)} className={SETA}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" aria-label={V.proximos} aria-controls={id} disabled={estado.fim} onClick={() => rolar(1)} className={SETA}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <ul
        ref={trilho}
        id={id}
        role="region"
        aria-roledescription="carrossel"
        aria-label={ariaLabel}
        tabIndex={focavel ? 0 : undefined}
        className={`-mx-4 mt-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden ${
          centralizarDesktop ? 'md:justify-center' : ''} ${focavel ? C.FOCO : ''}`}
      >
        {children}
      </ul>
    </div>
  )
}
