'use client'
// src/components/lp/TopBar.tsx
import Image from 'next/image'
import { useState, useEffect } from 'react'

const IconPercent = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
    <path d="M19 5L5 19M9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7ZM19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17Z" />
  </svg>
)
const IconTruck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
    <path d="M5 17H3V5H15V7M7 17H13M13 17H15M15 17H19V11L17 7H15M15 17V7M15 7H10" />
    <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
  </svg>
)
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
)
const IconHeart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.08 13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5 22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
  </svg>
)
const IconCopy = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

function CouponBtn({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 ml-1.5 bg-[#0d0c0d] text-[#f4cdd4] text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer hover:bg-[#1a1718] transition-colors"
    >
      <span>{copied ? '✓ COPIADO' : code}</span>
      {!copied && <IconCopy />}
    </button>
  )
}

const ITEMS = [
  {
    icon: <IconPercent />,
    content: <span className="flex items-center gap-1">GANHE 10% OFF <CouponBtn code="PRIMEIRA10" /></span>,
  },
  { icon: <IconTruck />, content: 'FRETE GRÁTIS POR REGIÃO' },
  { icon: <IconStar />,  content: '100% VEGANOS E CRUELTY FREE' },
  { icon: <IconHeart />, content: 'A MARCA FAVORITA DOS MELHORES GROOMERS' },
]

// Duplicated 3× for a seamless infinite scroll
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS]

export function TopBar() {
  const [stickyVisible, setStickyVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Rotating announcement bar */}
      <div className="bg-[#f4cdd4] text-[#0d0c0d] h-10 flex items-center overflow-hidden border-b border-[#e8b8c2]">
        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: 'announcement-scroll 40s linear infinite' }}
        >
          {TRACK.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-8 text-[10px] md:text-xs font-semibold tracking-wider uppercase shrink-0">
              {item.icon}
              <span>{item.content}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logo bar — some quando sticky CTA aparece */}
      <div className={`bg-[#FAFAFA] border-b border-[#E5E7EB] overflow-hidden flex items-center px-4 transition-all duration-300 ${stickyVisible ? 'max-h-0 opacity-0' : 'max-h-14 opacity-100'}`}>
        <div className="max-w-[1100px] mx-auto w-full">
          <Image
            src="/images/bubbles-logo.svg"
            alt="Bubbles Pet"
            width={110}
            height={26}
            priority
          />
        </div>
      </div>
    </header>
  )
}
