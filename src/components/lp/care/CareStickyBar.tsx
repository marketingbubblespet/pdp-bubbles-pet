'use client'
import { useEffect, useState } from 'react'

export function CareStickyBar() {
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
          <p className="text-sm font-extrabold text-[#0F0C0D] leading-tight">Bubbles Care</p>
          <p className="text-xs text-[#6B7280]">Revenda pro seu petshop, pré-venda de lançamento</p>
        </div>
        <a
          href="#cadastro"
          className="flex-1 sm:flex-none text-center bg-[#3DB85C] text-white font-bold rounded-xl px-5 py-3 text-sm hover:brightness-110 active:scale-95 transition-all"
        >
          Quero revender →
        </a>
      </div>
    </div>
  )
}
