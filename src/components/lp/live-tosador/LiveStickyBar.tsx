'use client'
import { useEffect, useState } from 'react'
import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'

export function LiveStickyBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <p className="text-sm font-extrabold text-[#0F0C0D] leading-tight">Live Dia do Tosador</p>
          <p className="text-xs text-[#6B7280]">{LIVE.weekday}, {LIVE.date} às {LIVE.time}, ao vivo e gratuita</p>
        </div>
        <LiveCta pulse className="flex-1 sm:flex-none text-sm px-5 py-3">Entrar no grupo do WhatsApp</LiveCta>
      </div>
    </div>
  )
}
