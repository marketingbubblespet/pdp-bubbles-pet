'use client'
// src/components/lp/StickyCtaBar.tsx
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PRODUCT } from '@/lib/constants'
import { CtaLink } from '@/components/ui/CtaLink'

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[999] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-lg overflow-hidden relative border border-gray-100 shrink-0 hidden sm:block">
            <Image src="/images/groomer-badge.png" alt={PRODUCT.shortName} fill className="object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-[#0F0C0D] truncate">{PRODUCT.shortName}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[16px] font-semibold text-black leading-none">{PRODUCT.price}</span>
              <span className="text-[10px] text-[#3DB85C] bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="shrink-0"><circle cx="12" cy="12" r="10" fill="#3DB85C"/><path d="M12 6v2m0 8v2M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                +<strong>R$ 10,94</strong> cashback
              </span>
            </div>
          </div>
        </div>
        <CtaLink
          href={PRODUCT.shopifyUrl}
          className="inline-block bg-[#3DB85C] text-white font-bold text-sm md:text-base px-5 md:px-8 py-2.5 md:py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150 text-center shadow-lg shrink-0 whitespace-nowrap"
        >
          <span className="hidden md:inline">Comprar agora →</span>
          <span className="md:hidden">Comprar →</span>
        </CtaLink>
      </div>
    </div>
  )
}
