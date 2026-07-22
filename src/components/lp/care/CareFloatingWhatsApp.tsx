import { CARE } from '@/lib/care'

// Botão flutuante que leva ao WhatsApp de dúvidas (diferente do formulário de cadastro).
export function CareFloatingWhatsApp() {
  return (
    <a
      href={`${CARE.whatsapp}?text=${encodeURIComponent(CARE.whatsappMsg)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-24 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-105 active:scale-95 transition-transform"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
        <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1c.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.5-.3z" />
      </svg>
    </a>
  )
}
