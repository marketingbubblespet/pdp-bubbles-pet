'use client'
import { useEffect, useState } from 'react'
import { MC } from '@/lib/masterclass-spitz'

export function MasterStickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <p className="text-sm font-extrabold text-[#0F0C0D] leading-tight">
            MasterClass de Spitz Alemão
          </p>
          <p className="text-xs text-[#6B7280]">
            {MC.date} às {MC.time}, ao vivo e gratuita
          </p>
        </div>
        <a
          href="#acesso"
          className="flex-1 sm:flex-none text-center bg-[#3DB85C] text-white font-bold rounded-[10px] px-5 py-3 hover:brightness-110 active:scale-95 transition-all"
          style={{ animation: 'mc-pulse 2s ease-in-out infinite' }}
        >
          Garantir meu acesso →
        </a>
      </div>
    </div>
  )
}
