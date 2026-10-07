'use client'
import { MC } from '@/lib/masterclass-coloracao'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { WhatsappGate } from '@/components/ui/WhatsappGate'

export function FloatingWhatsAppColoracao() {
  return (
    <WhatsappGate
      href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappDoubtMsg)}`}
      ctaLocation="botao-flutuante"
      ctaLabel="Tirar dúvida no WhatsApp"
      className="fixed bottom-24 right-4 z-40 w-[52px] h-[52px] md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#3DB85C] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <WhatsAppIcon size={24} />
      <span className="sr-only">Tirar dúvida no WhatsApp</span>
    </WhatsappGate>
  )
}
