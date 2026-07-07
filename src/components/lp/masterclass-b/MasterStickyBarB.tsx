'use client'
import { useEffect, useState } from 'react'
import { MC } from '@/lib/masterclass-spitz'

export function MasterStickyBarB() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#111111] border-t border-white/5 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <p className="text-sm font-black text-white tracking-tight leading-tight">
            MasterClass de Spitz Alemão
          </p>
          <p className="text-xs text-white/60">
            {MC.date} às {MC.time}, ao vivo e gratuita
          </p>
        </div>
        <a
          href="#acesso"
          className="flex-1 sm:flex-none text-center bg-[#F4CDD4] text-[#080808] font-black uppercase tracking-widest rounded-xl px-5 py-3 transition-transform duration-150 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(244,205,212,0.2)] text-xs"
          style={{ animation: 'mcb-pulse 2s ease-in-out infinite' }}
        >
          Garantir meu acesso →
        </a>
      </div>
    </div>
  )
}
