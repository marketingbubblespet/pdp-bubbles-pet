'use client'
// B10 da LP /distribuidor-care: quem é a Bubbles®, com o vídeo institucional de fundo (overlay escuro) e os números.
// A <source> só entra a 400 px da tela (padrão CaptacaoBrandStats.tsx:14-43); com "reduzir movimento", sem vídeo.
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import {
  DISTRIBUIDOR_CARE_MARCA as D, DISTRIBUIDOR_CARE_MIDIA, DISTRIBUIDOR_CARE_POSTER_PROVISORIO, DISTRIBUIDOR_CARE_VIDEO_INSTITUCIONAL,
} from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

const POSTER = DISTRIBUIDOR_CARE_MIDIA['P-08'].src

export function DistribuidorCareBrand() {
  const secao = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [carregar, setCarregar] = useState(false)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    const el = secao.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCarregar(true); obs.disconnect() }
    }, { rootMargin: '400px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const v = video.current
    if (!carregar || !v) return
    v.load()
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {})
  }, [carregar])

  const alternar = () => {
    const v = video.current
    if (!v) return
    if (pausado) v.play().catch(() => {})
    else v.pause()
    setPausado(!pausado)
  }

  return (
    <section ref={secao} aria-labelledby="dc-titulo-marca" className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#0D0C0D]">
      <video ref={video} muted loop playsInline preload="none" aria-hidden="true" poster={POSTER ?? DISTRIBUIDOR_CARE_POSTER_PROVISORIO}
        data-placeholder={POSTER ? undefined : 'P-08'} className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden">
        {carregar && <source src={DISTRIBUIDOR_CARE_VIDEO_INSTITUCIONAL} type="video/mp4" />}
      </video>
      <div aria-hidden="true" className="absolute inset-0 bg-black/70 motion-reduce:hidden" />
      <div className={`relative z-10 w-full ${C.CONTAINER} ${C.SECAO} text-center`}>
        <h2 id="dc-titulo-marca" className="text-2xl font-medium text-white md:text-3xl">
          {D.tituloAntes}<span className="text-[#F4CDD4]">{D.tituloMarca}</span>
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {D.numeros.map((n) => (
            <li key={n.destaque} className="rounded-[12px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <span className="text-sm text-white/90">{n.antes}</span>
              <span className="text-2xl font-semibold text-white md:text-3xl">{n.destaque}</span>
              <span className="text-sm text-white/90">{n.depois}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-white/90 md:text-base">{D.lastro}</p>
      </div>
      <button type="button" onClick={alternar} aria-label={pausado ? D.retomar : D.pausar}
        className={`absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white motion-reduce:hidden ${C.FOCO}`}>
        {pausado ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
      </button>
    </section>
  )
}
