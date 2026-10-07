import { MC } from '@/lib/masterclass-coloracao'
import { EventGate } from '@/components/lp/masterclass/EventGate'
import { WhatsappGate } from '@/components/ui/WhatsappGate'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { MasterCtaColoracao } from './MasterCtaColoracao'
import { MasterCountdownColoracao } from './MasterCountdownColoracao'

export function MasterFinalCtaColoracao() {
  return (
    <section id="cta-final" className="bg-[#F4CDD4] py-16 md:py-24 px-4">
      <div className="max-w-[720px] mx-auto text-center">
        <EventGate
          target={MC.targetDateISO}
          fallback={
            <>
              <h2 className="text-2xl md:text-4xl font-medium text-[#0D0C0D] mb-4 leading-tight">
                Essa edição já aconteceu
              </h2>
              <p className="text-sm md:text-base text-[#0D0C0D]/80 mb-8 max-w-[520px] mx-auto">
                Entre na lista de espera e seja avisado quando abrirem as inscrições da próxima MasterClass de Coloração Pet.
              </p>
              <WhatsappGate
                href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappWaitlistMsg)}`}
                ctaLocation="cta-final-lista-espera"
                ctaLabel="Entrar na lista de espera"
                className="inline-flex items-center justify-center gap-2 min-h-[52px] bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3.5 hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md w-full sm:w-auto"
              >
                <WhatsAppIcon size={18} /> Entrar na lista de espera
              </WhatsappGate>
            </>
          }
        >
          <h2 className="text-2xl md:text-4xl font-medium text-[#0D0C0D] mb-4 leading-tight">
            {MC.weekday}, {MC.date} às {MC.time}. Coloração pet do zero à prática, ao vivo.
          </h2>
          <p className="text-sm md:text-base text-[#0D0C0D]/80 mb-8 max-w-[520px] mx-auto">
            {MC.accessRule} até {MC.purchaseDeadline}, o mesmo dia da aula.
          </p>

          <div className="flex justify-center mb-8">
            <MasterCountdownColoracao target={MC.targetDateISO} />
          </div>

          <MasterCtaColoracao origem="cta-final" pulse className="w-full sm:w-auto text-base md:text-lg">
            Quero garantir meu acesso →
          </MasterCtaColoracao>
        </EventGate>
      </div>
    </section>
  )
}
