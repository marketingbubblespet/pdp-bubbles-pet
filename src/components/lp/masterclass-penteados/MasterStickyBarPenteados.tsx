'use client'
import { useEffect, useState } from 'react'
import { MC } from '@/lib/masterclass-penteados'

export function MasterStickyBarPenteados() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-[#0D0C0D] leading-tight">
            MasterClass de Penteados
          </p>
          <p className="text-xs text-[#666666]">
            {MC.date} às {MC.time}, ao vivo
          </p>
        </div>
        <a
          href="#acesso"
          className="flex-1 sm:flex-none text-center bg-[#3DB85C] text-white font-semibold rounded-[12px] px-5 py-3 min-h-[44px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-xs"
          style={{ animation: 'mcp-pulse 2s ease-in-out infinite' }}
        >
          Garantir meu acesso →
        </a>
      </div>
    </div>
  )
}
