'use client'
import { Check } from 'lucide-react'
import { MC, MC_STEPS, MC_PURCHASE_CHANNELS } from '@/lib/masterclass-penteados'
import { CtaLink } from '@/components/ui/CtaLink'
import { HighlightPricePenteados } from './HighlightPricePenteados'
import { pushCtaClick } from '@/lib/tracking'

export function MasterAccessPenteados() {
  return (
    <section id="acesso" className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB] scroll-mt-4">
      <div className="max-w-[900px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Como garantir o seu acesso
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] text-center mb-3">
          <HighlightPricePenteados text={`Acesso liberado para compras acima de ${MC.minPurchase}`} />
        </h2>
        <p className="text-sm md:text-base text-[#666666] text-center max-w-[640px] mx-auto mb-10">
          <HighlightPricePenteados
            text={`Garanta sua vaga comprando qualquer combinação de produtos acima de ${MC.minPurchase} até ${MC.purchaseDeadline}. Simples assim.`}
          />
        </p>

        {/* Passo a passo */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {MC_STEPS.map((step) => (
            <div key={step.n} className="bg-[#FDF2F4] rounded-[20px] p-6 border border-[#F4CDD4]">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E8649A] text-white font-semibold mb-3">
                {step.n}
              </span>
              <p className="text-sm text-[#666666] leading-relaxed">
                <HighlightPricePenteados text={step.text} />
              </p>
            </div>
          ))}
        </div>

        {/* Prazo e canais de compra */}
        <div className="bg-[#F7F7F7] border border-[#E5E7EB] rounded-[20px] p-5 md:p-6 mb-10">
          <p className="text-center text-sm font-semibold text-[#B25A72] mb-3">
            Prazo de compra: até {MC.purchaseDeadline}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {MC_PURCHASE_CHANNELS.map((channel) => (
              <span
                key={channel}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs font-semibold text-[#666666]"
              >
                <Check size={14} className="text-[#3DB85C] shrink-0" />
                {channel}
              </span>
            ))}
          </div>
        </div>

        {/* CTA para a loja */}
        <div className="flex flex-col items-center gap-3">
          <CtaLink
            href={MC.storeUrl}
            onClick={() => pushCtaClick('ver_loja', 'acesso')}
            className="inline-flex items-center justify-center bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3 md:py-4 min-h-[44px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95 text-sm"
          >
            Comprar e garantir meu acesso →
          </CtaLink>
          <p className="text-xs text-[#666666] text-center max-w-[420px]">
            Prefere comprar por WhatsApp? Fale com a equipe de vendas Bubbles e monte seu pedido por lá.
          </p>
        </div>
      </div>
    </section>
  )
}
