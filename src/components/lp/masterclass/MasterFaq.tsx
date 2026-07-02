'use client'
import { useState } from 'react'
import { MC, MC_FAQ } from '@/lib/masterclass-spitz'
import { CtaLink } from '@/components/ui/CtaLink'
import { HighlightPrice } from './HighlightPrice'

const waLink = `${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappMsg)}`

export function MasterFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Perguntas frequentes
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">
          Ainda ficou com dúvida?
        </h2>

        <div className="flex flex-col gap-3">
          {MC_FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border border-[#E5E7EB] rounded-[10px] overflow-hidden bg-white">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#0F0C0D] text-sm md:text-base">{item.q}</span>
                  <span className={`text-[#E8649A] text-xl shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed">
                    <HighlightPrice text={item.a} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bloco: dúvidas no WhatsApp */}
        <div className="mt-10 bg-[#F7F7F7] rounded-[10px] p-6 md:p-8 border border-[#E5E7EB] text-center">
          <h3 className="font-extrabold text-[#0F0C0D] mb-2">Ainda tem dúvidas?</h3>
          <p className="text-sm text-[#6B7280] mb-5">
            Fale direto com a nossa equipe no WhatsApp e tire qualquer dúvida antes de garantir a sua vaga.
          </p>
          <CtaLink
            href={waLink}
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold rounded-[10px] px-6 py-3.5 hover:brightness-110 active:scale-95 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1c.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.5-.3z" />
            </svg>
            Falar no WhatsApp
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
