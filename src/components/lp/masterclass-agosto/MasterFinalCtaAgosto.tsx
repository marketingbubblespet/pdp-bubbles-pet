import { MC } from '@/lib/masterclass-agosto'
import { MasterCtaB } from '@/components/lp/masterclass-b/MasterCtaB'
import { MasterCountdownB } from '@/components/lp/masterclass-b/MasterCountdownB'
import { EventGate } from '@/components/lp/masterclass/EventGate'

export function MasterFinalCtaAgosto() {
  return (
    <section className="bg-[#080808] py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-[760px] mx-auto text-center">
        <EventGate
          target={MC.targetDateISO}
          fallback={
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
                Edição encerrada
              </p>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
                Essa MasterClass já aconteceu
              </h2>
              <p className="text-sm md:text-base text-white/60 mb-8 max-w-[560px] mx-auto">
                Deixe seu contato no WhatsApp para ser avisado assim que abrirem as inscrições da
                próxima edição.
              </p>
              <a
                href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#F4CDD4] text-[#080808] font-black uppercase tracking-widest rounded-xl px-6 md:px-8 py-3.5 md:py-4 transition-transform duration-150 hover:scale-[1.02] shadow-[0_0_20px_rgba(244,205,212,0.2)] text-xs md:text-sm"
              >
                Avisar da próxima edição →
              </a>
            </>
          }
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
            {MC.date} às {MC.time}, {MC.timezone}
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
            Garanta a sua vaga na MasterClass de Rostinho Bebê
          </h2>
          <p className="text-sm md:text-base text-white/60 mb-8 max-w-[560px] mx-auto">
            {MC.accessRule} até {MC.purchaseDeadline}. Vagas por tempo limitado.
          </p>

          <div className="flex justify-center mb-8">
            <MasterCountdownB target={MC.targetDateISO} />
          </div>

          <MasterCtaB href="#acesso" pulse className="text-xs md:text-sm">
            Garantir meu acesso →
          </MasterCtaB>
        </EventGate>
      </div>
    </section>
  )
}
