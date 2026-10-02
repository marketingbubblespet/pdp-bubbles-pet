import { Check } from 'lucide-react'
import { MC, MC_STEPS, MC_PURCHASE_CHANNELS } from '@/lib/masterclass-coloracao'
import { MasterCtaColoracao } from './MasterCtaColoracao'

export function MasterAccessColoracao() {
  return (
    <section id="acesso" className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB] scroll-mt-4">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Como garantir o seu acesso
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] tracking-tight text-center mb-3">
          Dois jeitos de liberar sua vaga
        </h2>
        <p className="text-sm md:text-base text-[#666666] text-center max-w-[640px] mx-auto mb-10">
          Qualquer produto Collora, de qualquer valor, ou qualquer compra a partir de R$399 em produtos Bubbles. Vale até {MC.purchaseDeadline}.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {MC_STEPS.map((step) => (
            <div key={step.n} className="bg-[#F7F7F7] rounded-[20px] p-6 border border-[#E5E7EB]">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E8649A] text-white font-semibold mb-3">
                {step.n}
              </span>
              <p className="text-sm text-[#666666] leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#F7F7F7] border border-[#E5E7EB] rounded-[20px] p-5 md:p-6 mb-10">
          <p className="text-center text-sm font-semibold text-[#E8649A] mb-3">Prazo de compra: até {MC.purchaseDeadline}</p>
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

        <div className="flex justify-center">
          <MasterCtaColoracao origem="acesso" pulse className="w-full sm:w-auto text-base">
            Quero garantir meu acesso →
          </MasterCtaColoracao>
        </div>
      </div>
    </section>
  )
}
