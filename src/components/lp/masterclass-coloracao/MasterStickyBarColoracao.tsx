'use client'
import { useEffect, useState } from 'react'
import { MC } from '@/lib/masterclass-coloracao'
import { MasterCtaColoracao } from './MasterCtaColoracao'

export function MasterStickyBarColoracao() {
  const [passouHero, setPassouHero] = useState(false)
  const [ctaFinalVisivel, setCtaFinalVisivel] = useState(false)
  const [encerrada, setEncerrada] = useState(false)

  useEffect(() => {
    const onScroll = () => setPassouHero(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const checar = () => setEncerrada(Date.now() > new Date(MC.targetDateISO).getTime())
    checar()
    const id = setInterval(checar, 30000)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(id)
    }
  }, [])

  // Some quando o CTA final entra na tela, pra não duplicar o mesmo botão.
  useEffect(() => {
    const alvo = document.getElementById('cta-final')
    if (!alvo) return
    const obs = new IntersectionObserver(([entry]) => setCtaFinalVisivel(entry.isIntersecting), {
      rootMargin: '-40% 0px 0px 0px',
    })
    obs.observe(alvo)
    return () => obs.disconnect()
  }, [])

  if (encerrada) return null
  const visivel = passouHero && !ctaFinalVisivel

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 motion-reduce:transition-none ${
        visivel ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block shrink-0">
          <p className="text-sm font-medium text-[#0D0C0D] tracking-tight leading-tight">MasterClass Coloração Pet</p>
          <p className="text-xs text-[#666666]">
            {MC.weekday}, {MC.date} às {MC.time}
          </p>
        </div>
        <MasterCtaColoracao origem="barra-fixa" className="flex-1 sm:flex-none text-sm px-5 py-3">
          Quero garantir meu acesso
        </MasterCtaColoracao>
      </div>
    </div>
  )
}
