'use client'
// Vídeo sob demanda da LP /distribuidor-care: a <source> só entra quando o elemento chega a 400 px da tela.
// Sem autoplay, com controles, muted e playsInline. Usado pelas mídias P-02 e P-03 quando os arquivos chegarem.
import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  srcDesktop?: string | null
  poster?: string | null
  ariaLabel?: string
  className?: string
}

export function DistribuidorCareVideo({ src, srcDesktop = null, poster = null, ariaLabel, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [fonte, setFonte] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      const desktop = window.matchMedia('(min-width: 768px)').matches
      setFonte(desktop && srcDesktop ? srcDesktop : src)
      obs.disconnect()
    }, { rootMargin: '400px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [src, srcDesktop])

  useEffect(() => {
    if (fonte) ref.current?.load()
  }, [fonte])

  return (
    <video
      ref={ref}
      controls
      muted
      playsInline
      preload="none"
      poster={poster ?? undefined}
      aria-label={ariaLabel}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    >
      {fonte && <source src={fonte} type="video/mp4" />}
    </video>
  )
}
