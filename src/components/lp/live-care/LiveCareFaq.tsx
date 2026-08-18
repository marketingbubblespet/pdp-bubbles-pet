'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { LIVE_CARE, LIVE_CARE_FAQ } from '@/lib/live-care'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { trackFaqOpen } from './trackLiveCare'

export function LiveCareFaq() {
  const [aberta, setAberta] = useState<number | null>(null)

  const alternar = (i: number, pergunta: string) => {
    const abrindo = aberta !== i
    setAberta(abrindo ? i : null)
    if (abrindo) trackFaqOpen(pergunta)
  }

  const whatsappDuvida = `${LIVE_CARE.whatsappDoubtUrl}?text=${encodeURIComponent(LIVE_CARE.whatsappDoubtMsg)}`

  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Dúvidas frequentes
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">
          Antes de entrar no grupo
        </h2>

        <div className="flex flex-col gap-2">
          {LIVE_CARE_FAQ.map((item, i) => {
            const estaAberta = aberta === i
            return (
              <div key={item.q} className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <button
                  type="button"
                  onClick={() => alternar(i, item.q)}
                  aria-expanded={estaAberta}
                  className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 min-h-[56px] hover:bg-[#F7F7F7] transition-colors"
                >
                  <span className="text-sm md:text-base font-bold text-[#0F0C0D]">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#E8649A] shrink-0 transition-transform duration-200 ${estaAberta ? 'rotate-180' : ''}`}
                  />
                </button>
                {estaAberta && (
                  <p className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed">{item.a}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Remove a última barreira de quem quase entrou mas travou numa dúvida específica */}
        <div className="mt-8 bg-white rounded-2xl border border-[#E5E7EB] p-6 text-center">
          <p className="text-sm font-bold text-[#0F0C0D] mb-3">Ficou com outra dúvida?</p>
          <a
            href={whatsappDuvida}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white border-2 border-[#3DB85C] text-[#3DB85C] font-bold rounded-[10px] px-6 py-3 hover:bg-[#f0fdf4] active:scale-95 transition-all duration-200"
          >
            <WhatsAppIcon size={18} /> Falar com a equipe no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
