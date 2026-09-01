import { MC } from '@/lib/masterclass-penteados'
import { MasterCtaPenteados } from './MasterCtaPenteados'
import { MasterCountdownPenteados } from './MasterCountdownPenteados'
import { HighlightPricePenteados } from './HighlightPricePenteados'
import { EventGate } from '../masterclass/EventGate'
import { WhatsappGate } from '@/components/ui/WhatsappGate'

export function MasterFinalCtaPenteados() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto text-center">
        <EventGate
          target={MC.targetDateISO}
          fallback={
            <>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
                Edição encerrada
              </p>
              <h2 className="text-2xl md:text-4xl font-medium text-[#0D0C0D] mb-4">
                Essa MasterClass já aconteceu
              </h2>
              <p className="text-sm md:text-base text-[#666666] mb-8 max-w-[560px] mx-auto">
                Deixe seu contato no WhatsApp para ser avisado assim que abrirem as inscrições da
                próxima edição.
              </p>
              <WhatsappGate
                href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
                ctaLocation="masterclass-penteados-cta-final"
                ctaLabel="Avisar da próxima edição"
                theme="light"
                className="inline-flex items-center justify-center bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3 md:py-4 min-h-[44px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-xs md:text-sm"
              >
                Avisar da próxima edição →
              </WhatsappGate>
            </>
          }
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            {MC.date} às {MC.time}, {MC.timezone}
          </p>
          <h2 className="text-2xl md:text-4xl font-medium text-[#0D0C0D] mb-4">
            Garanta a sua vaga na MasterClass de Penteados
          </h2>
          <p className="text-sm md:text-base text-[#666666] mb-8 max-w-[560px] mx-auto">
            <HighlightPricePenteados
              text={`Aula ao vivo, com acesso liberado para compras acima de ${MC.minPurchase}. Vagas por tempo limitado até ${MC.purchaseDeadline}.`}
            />
          </p>

          <div className="flex justify-center mb-8">
            <MasterCountdownPenteados target={MC.targetDateISO} />
          </div>

          <MasterCtaPenteados href="#acesso" pulse className="text-xs md:text-sm">
            Garantir meu acesso →
          </MasterCtaPenteados>
        </EventGate>
      </div>
    </section>
  )
}
