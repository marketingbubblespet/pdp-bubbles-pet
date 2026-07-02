'use client'
import Image from 'next/image'
import { MC, MC_STEPS, MC_PRODUCTS } from '@/lib/masterclass-spitz'
import { CtaLink } from '@/components/ui/CtaLink'
import { HighlightPrice } from './HighlightPrice'
import { trackLeadClick } from './trackLead'

export function MasterAccess() {
  return (
    <section id="acesso" className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB] scroll-mt-4">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Como garantir o seu acesso
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-3">
          <HighlightPrice text={`Acesso liberado para compras acima de ${MC.minPurchase}`} />
        </h2>
        <p className="text-sm md:text-base text-[#6B7280] text-center max-w-[640px] mx-auto mb-10">
          <HighlightPrice
            text={`Garanta sua vaga comprando qualquer combinação de produtos acima de ${MC.minPurchase} na loja Bubbles. Simples assim.`}
          />
        </p>

        {/* Passo a passo */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {MC_STEPS.map((step) => (
            <div key={step.n} className="bg-[#F7F7F7] rounded-[10px] p-6 border border-[#E5E7EB]">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E8649A] text-white font-extrabold mb-3">
                {step.n}
              </span>
              <p className="text-sm font-medium text-[#0F0C0D] leading-snug">
                <HighlightPrice text={step.text} />
              </p>
            </div>
          ))}
        </div>

        {MC.purchaseDeadline ? (
          <p className="text-center text-sm font-semibold text-[#E8649A] mb-10">
            Prazo de compra: {MC.purchaseDeadline}
          </p>
        ) : (
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-[#E8649A] mb-10">
            [Aguardando prazo de compra]
          </p>
        )}

        {/* Bloco de produtos (shoppable) */}
        <div className="bg-[#fdf0f3] rounded-[10px] p-6 md:p-8 border border-[#F4CDD4]">
          <h3 className="text-lg font-extrabold text-[#0F0C0D] text-center mb-1">
            Produtos que valem o seu acesso
          </h3>
          <p className="text-sm text-[#6B7280] text-center mb-6">
            <HighlightPrice
              text={`Sugestões para montar seu carrinho. Vale qualquer combinação acima de ${MC.minPurchase}.`}
            />
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {MC_PRODUCTS.map((p) => (
              <CtaLink
                key={p.name}
                href={p.url || MC.storeUrl}
                onClick={trackLeadClick}
                className="group bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden flex flex-col hover:border-[#E8649A] transition-colors"
              >
                <div className="relative aspect-square bg-[#F7F7F7]">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-4" />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p className="font-bold text-[#0F0C0D]">{p.name}</p>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{p.description}</p>
                  <span className="mt-auto inline-block text-center bg-[#3DB85C] text-white font-bold rounded-[10px] px-4 py-2.5 text-sm group-hover:brightness-110 transition-all">
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
              className="inline-block text-center bg-[#0d0c0d] text-white font-bold rounded-[10px] px-6 py-3.5 hover:brightness-125 active:scale-95 transition-all"
            >
              Ver todos os produtos na loja →
            </CtaLink>
          </div>
        </div>

        {/* Confirmação de compra */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#6B7280] mb-3">
            Já comprou? Envie o número do seu pedido para confirmar a sua vaga e receber o link no dia.
          </p>
          <CtaLink
            href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappOrderMsg)}`}
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold rounded-[10px] px-6 py-3.5 hover:brightness-110 active:scale-95 transition-all"
          >
            Confirmar compra no WhatsApp
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
