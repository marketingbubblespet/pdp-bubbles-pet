import { MC } from '@/lib/masterclass-penteados'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export function FloatingWhatsAppPenteados() {
  const url = `${MC.whatsapp}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre a MasterClass de Penteados.')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tirar dúvida no WhatsApp"
      className="fixed bottom-24 right-4 z-40 w-[52px] h-[52px] md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#3DB85C] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <WhatsAppIcon size={24} />
    </a>
  )
}
