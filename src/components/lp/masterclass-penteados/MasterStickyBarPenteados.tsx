'use client'
import { useEffect, useState } from 'react'
import { MC } from '@/lib/masterclass-penteados'
import { MasterCtaPenteados } from './MasterCtaPenteados'

export function MasterStickyBarPenteados() {
  const [passouHero, setPassouHero] = useState(false)
  const [ctaFinalVisivel, setCtaFinalVisivel] = useState(false)

  useEffect(() => {
    const onScroll = () => setPassouHero(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Some quando o CTA final entra na tela, pra não duplicar o mesmo botão em cima do outro.
  useEffect(() => {
    const alvo = document.getElementById('cta-final')
    if (!alvo) return
    const obs = new IntersectionObserver(
      ([entry]) => setCtaFinalVisivel(entry.isIntersecting),
      { rootMargin: '-40% 0px 0px 0px' },
    )
    obs.observe(alvo)
    return () => obs.disconnect()
  }, [])

  const visivel = passouHero && !ctaFinalVisivel

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visivel ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block shrink-0">
          <p className="text-sm font-medium text-[#0F0C0D] tracking-tight leading-tight">
            MasterClass Penteados
          </p>
          <p className="text-xs text-[#6B7280]">
            {MC.weekday}, {MC.date} às {MC.time}
          </p>
        </div>
        <MasterCtaPenteados origem="barra-fixa" className="flex-1 sm:flex-none text-sm px-5 py-3">
          Quero garantir meu acesso
        </MasterCtaPenteados>
      </div>
    </div>
  )
}
