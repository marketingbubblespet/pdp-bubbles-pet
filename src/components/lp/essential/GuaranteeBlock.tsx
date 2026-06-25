// src/components/lp/GuaranteeBlock.tsx
import { ShieldCheck, Lock, Truck, CreditCard } from 'lucide-react'

const paymentMethods = ['Pix', 'Visa', 'Mastercard', 'Amex', 'Boleto']

export function GuaranteeBlock() {
  return (
    <section className="px-4 py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-10">
          {/* Garantia */}
          <div>
            <ShieldCheck size={40} className="text-[#E8649A] mb-3" />
            <h3 className="text-lg md:text-xl font-bold text-[#0F0C0D] mb-2">
              Troca em 7 dias, sem burocracia.
            </h3>
            <p className="text-[#6B7280] leading-relaxed mb-3 text-sm md:text-base">
              Se o produto chegar com defeito ou diferente do pedido, a Bubbles resolve. Entre em contato e resolvemos sem complicação.
            </p>
          </div>

          {/* Pagamento seguro */}
          <div>
            <Lock size={40} className="text-[#E8649A] mb-3" />
            <h3 className="text-lg md:text-xl font-bold text-[#0F0C0D] mb-2">
              Compra 100% segura
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {paymentMethods.map((m) => (
                <div key={m} className="flex items-center gap-1 border border-[#E5E7EB] rounded-lg px-2.5 py-1">
                  <CreditCard size={12} className="text-[#6B7280]" />
                  <span className="text-xs font-medium text-[#6B7280]">{m}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6B7280]">🔒 Loja verificada Shopify</p>
          </div>
        </div>

        {/* Frete */}
        <div className="flex items-center justify-center gap-2 md:gap-3 border border-[#E5E7EB] rounded-xl px-4 md:px-6 py-3 md:py-4 bg-white">
          <Truck size={18} className="text-[#3DB85C] shrink-0" />
          <p className="text-xs md:text-sm font-medium text-[#0F0C0D]">
            Frete grátis por região para pedidos acima de R$ 299 · Entrega em 2 a 7 dias úteis
          </p>
        </div>
      </div>
    </section>
  )
}
