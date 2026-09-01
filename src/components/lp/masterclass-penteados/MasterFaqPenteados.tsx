'use client'
import { useState } from 'react'
import { MC, MC_FAQ } from '@/lib/masterclass-penteados'
import { WhatsappGate } from '@/components/ui/WhatsappGate'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

const waLink = `${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappMsg)}`

export function MasterFaqPenteados() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Perguntas frequentes
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] text-center mb-10">
          Ainda ficou com dúvida?
        </h2>

        <div className="flex flex-col gap-3">
          {MC_FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border border-[#E5E7EB] rounded-[12px] overflow-hidden bg-white">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-[#0D0C0D] text-sm md:text-base">{item.q}</span>
                  <span className={`text-[#E8649A] text-xl shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-[#666666] leading-relaxed">{item.a}</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bloco: dúvidas no WhatsApp */}
        <div className="mt-10 bg-white rounded-[20px] p-6 md:p-8 border border-[#E5E7EB] text-center">
          <h3 className="font-medium text-[#0D0C0D] mb-2">Ainda tem dúvidas?</h3>
          <p className="text-sm text-[#666666] mb-5">
            Fale direto com a nossa equipe no WhatsApp e tire qualquer dúvida antes de garantir a sua vaga.
          </p>
          <WhatsappGate
            href={waLink}
            ctaLocation="masterclass-penteados-faq"
            ctaLabel="Falar no WhatsApp"
            theme="light"
            className="inline-flex items-center gap-2 bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 py-3.5 min-h-[44px] hover:brightness-110 active:scale-95 transition-all"
          >
            <WhatsAppIcon size={18} />
            Falar no WhatsApp
          </WhatsappGate>
        </div>
      </div>
    </section>
  )
}
