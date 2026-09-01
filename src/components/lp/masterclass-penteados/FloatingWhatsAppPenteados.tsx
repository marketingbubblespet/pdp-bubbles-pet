'use client'
import { useEffect, useState } from 'react'
import { MC } from '@/lib/masterclass-penteados'
import { WhatsappGate } from '@/components/ui/WhatsappGate'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

const waLink = `${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappMsg)}`

export function FloatingWhatsAppPenteados() {
  // Sobe o botão no mobile quando a sticky bar aparece, evitando aglomerar os dois no canto.
  const [stickyVisible, setStickyVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <WhatsappGate
      href={waLink}
      ctaLocation="masterclass-penteados-flutuante"
      ctaLabel="Falar no WhatsApp (botão flutuante)"
      theme="light"
      className={`fixed right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#3DB85C] shadow-lg hover:scale-105 active:scale-95 transition-all ${
        stickyVisible ? 'bottom-40 sm:bottom-24' : 'bottom-24'
      }`}
    >
      <WhatsAppIcon size={30} className="text-white" />
    </WhatsappGate>
  )
}
