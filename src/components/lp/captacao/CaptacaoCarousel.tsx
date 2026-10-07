'use client'
// Carrossel de arrastar com setas, igual ao da página de referência (captacao.bubbles.com.br):
// - setas laterais (só no celular, a menos que showOnDesktop);
// - degradê nas bordas opcional (showGradient);
// - rola sozinho a cada 4s enquanto está visível, voltando ao início no fim
//   (desligado no celular se disableAutoOnMobile, e sempre desligado com "reduzir movimento").
import { useEffect, type ReactNode, type RefObject } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function passo(el: HTMLElement) {
  return el.clientWidth > 768 ? 400 : 300
}

export function rolarCarrossel(el: HTMLElement | null, lado: 'left' | 'right') {
  if (!el) return
  const { scrollLeft, scrollWidth, clientWidth } = el
  if (lado === 'right') {
    if (scrollLeft + clientWidth >= scrollWidth - 10) el.scrollTo({ left: 0, behavior: 'smooth' })
    else el.scrollBy({ left: passo(el), behavior: 'smooth' })
  } else if (scrollLeft <= 10) el.scrollTo({ left: scrollWidth, behavior: 'smooth' })
  else el.scrollBy({ left: -passo(el), behavior: 'smooth' })
}

// Rolagem automática a cada 4s enquanto o carrossel aparece na tela.
export function useAutoScroll(ref: RefObject<HTMLElement | null>, { disableOnMobile = false } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: ReturnType<typeof setInterval> | undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer)
        if (!entry.isIntersecting) return
        timer = setInterval(() => {
          if (disableOnMobile && window.innerWidth <= 768) return
          rolarCarrossel(el, 'right')
        }, 4000)
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => {
      clearInterval(timer)
      obs.disconnect()
    }
  }, [ref, disableOnMobile])
}

const BOTAO =
  'w-11 h-11 rounded-full bg-[#080808]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-[#F4CDD4] hover:text-[#080808] transition-colors shadow-lg'

export function CaptacaoCarousel({
  children,
  carouselRef,
  showOnDesktop = false,
  showGradient = false,
  hideArrows = false,
}: {
  children: ReactNode
  carouselRef: RefObject<HTMLElement | null>
  showOnDesktop?: boolean
  showGradient?: boolean
  hideArrows?: boolean
}) {
  return (
    <div className="relative group/carousel">
      {showGradient && (
        <>
          <div className="absolute top-0 bottom-0 -left-6 md:left-0 w-12 md:w-32 bg-gradient-to-r from-[#0F0C0D] via-[#0F0C0D]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 -right-6 md:right-0 w-12 md:w-32 bg-gradient-to-l from-[#0F0C0D] via-[#0F0C0D]/80 to-transparent z-10 pointer-events-none" />
        </>
      )}
      {children}
      {!hideArrows && (
        <div className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20 ${showOnDesktop ? '' : 'md:hidden'} px-0`}>
          <button type="button" aria-label="Anterior" onClick={() => rolarCarrossel(carouselRef.current, 'left')} className={`${BOTAO} ml-2 md:-ml-5`}>
            <ChevronLeft size={24} />
          </button>
          <button type="button" aria-label="Próximo" onClick={() => rolarCarrossel(carouselRef.current, 'right')} className={`${BOTAO} mr-2 md:-mr-5`}>
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
