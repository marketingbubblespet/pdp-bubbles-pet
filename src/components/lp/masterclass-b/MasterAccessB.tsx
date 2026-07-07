'use client'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { MC, MC_STEPS, MC_PRODUCTS, MC_PURCHASE_CHANNELS } from '@/lib/masterclass-spitz'
import { CtaLink } from '@/components/ui/CtaLink'
import { HighlightPriceB } from './HighlightPriceB'
import { trackLeadClick } from '../masterclass/trackLead'

export function MasterAccessB() {
  return (
    <section id="acesso" className="bg-[#111111] py-16 md:py-24 px-4 border-t border-white/5 scroll-mt-4">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">
          Como garantir o seu acesso
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center mb-3">
          <HighlightPriceB text={`Acesso liberado para compras acima de ${MC.minPurchase}`} />
        </h2>
        <p className="text-sm md:text-base text-white/70 text-center max-w-[640px] mx-auto mb-10">
          <HighlightPriceB
            text={`Garanta sua vaga comprando qualquer combinação de produtos acima de ${MC.minPurchase} até ${MC.purchaseDeadline}. Simples assim.`}
          />
        </p>

        {/* Passo a passo */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {MC_STEPS.map((step) => (
            <div key={step.n} className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F4CDD4] text-[#080808] font-black mb-3">
                {step.n}
              </span>
              <p className="text-sm text-white/70 leading-relaxed">
                <HighlightPriceB text={step.text} />
              </p>
            </div>
          ))}
        </div>

        {/* Prazo e canais de compra */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 md:p-6 mb-10">
          <p className="text-center text-sm font-bold text-[#F4CDD4] mb-3">
            Prazo de compra: até {MC.purchaseDeadline}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {MC_PURCHASE_CHANNELS.map((channel) => (
              <span
                key={channel}
                className="inline-flex items-center gap-1.5 bg-[#111111] border border-white/10 rounded-full px-3 py-1.5 text-xs font-semibold text-white/70"
              >
                <Check size={14} className="text-[#F4CDD4] shrink-0" />
                {channel}
              </span>
            ))}
          </div>
        </div>

        {/* Bloco de produtos (shoppable) */}
        <div className="bg-[#080808] rounded-2xl p-6 md:p-8 border border-white/5">
          <h3 className="text-lg font-black text-white tracking-tight text-center mb-1">
            Produtos que valem o seu acesso
          </h3>
          <p className="text-sm text-white/60 text-center mb-6">
            <HighlightPriceB
              text={`Sugestões para montar seu carrinho. Vale qualquer combinação acima de ${MC.minPurchase}.`}
            />
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {MC_PRODUCTS.map((p) => (
              <CtaLink
                key={p.name}
                href={p.url || MC.storeUrl}
                onClick={trackLeadClick}
                className="group bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-white/10 transition-colors duration-300"
              >
                <div className="relative aspect-square bg-[#111111]">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 767px) 295px, 460px" className="object-contain p-4" />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p className="font-black text-white tracking-tight">{p.name}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{p.description}</p>
                  <span className="mt-auto inline-block text-center bg-[#F4CDD4] text-[#080808] font-black uppercase tracking-widest rounded-xl px-4 py-2.5 text-xs transition-transform duration-150 group-hover:scale-[1.02]">
                    Comprar e participar
                  </span>
                </div>
              </CtaLink>
            ))}
          </div>

          {/* Botão para a loja completa */}
          <div className="flex justify-center">
            <CtaLink
              href={MC.storeUrl}
              onClick={trackLeadClick}
              className="inline-block text-center bg-[#1A1A1A] border border-white/10 text-white font-bold rounded-xl px-6 py-3.5 hover:border-white/20 transition-colors duration-300"
            >
              Ver todos os produtos na loja →
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}
