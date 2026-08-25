'use client'
// src/components/ui/ScrollDepthTracker.tsx
// Publica scroll_depth nos marcos 25/50/75/90%, uma única vez por carregamento de página.
// Monte manualmente em qualquer page.tsx que precisar (ver docs/tracking.md). Substitui o
// trigger nativo "Scroll Depth" do GTM, que dispara repetido e polui o Meta.
import { useEffect, useRef } from 'react'
import { pushScrollDepth } from '@/lib/tracking'

const MARCOS = [25, 50, 75, 90] as const

export function ScrollDepthTracker() {
  const disparados = useRef<Set<number>>(new Set())
  const ticking = useRef(false)

  useEffect(() => {
    const checar = () => {
      ticking.current = false
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const alturaTotal = doc.scrollHeight - doc.clientHeight
      if (alturaTotal <= 0) return
      const percentual = (scrollTop / alturaTotal) * 100

      for (const marco of MARCOS) {
        if (percentual >= marco && !disparados.current.has(marco)) {
          disparados.current.add(marco)
          pushScrollDepth(marco)
        }
      }
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(checar)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
