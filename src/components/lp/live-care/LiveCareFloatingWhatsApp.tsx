'use client'
import { LIVE_CARE } from '@/lib/live-care'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

// Atendimento para dúvida, diferente do link do grupo. Fica acima da barra fixa
// (bottom-24) para os dois não se sobreporem no mobile.
export function LiveCareFloatingWhatsApp() {
  const url = `${LIVE_CARE.whatsappDoubtUrl}?text=${encodeURIComponent(LIVE_CARE.whatsappDoubtMsg)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tirar dúvida no WhatsApp"
      className="fixed bottom-24 right-4 z-40 w-[52px] h-[52px] md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#0F0C0D] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <WhatsAppIcon size={24} />
    </a>
  )
}
