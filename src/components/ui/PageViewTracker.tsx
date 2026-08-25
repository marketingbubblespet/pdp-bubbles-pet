'use client'
// src/components/ui/PageViewTracker.tsx
// Publica page_view no dataLayer quando a rota muda por navegação client-side (ex: o
// mapa de páginas na home usa next/link para as LPs). Não decide container nem carrega
// GTM: só dispara o evento, pra quem já tiver o container escutando.
// O carregamento inicial da página já dispara pageview pelo próprio gtm.js, então
// ignoramos a primeira renderização e só publicamos a partir da segunda rota.
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { pushPageView } from '@/lib/tracking'

export function PageViewTracker() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    pushPageView(pathname, document.title)
  }, [pathname])

  return null
}
