import { MC } from '@/lib/masterclass-spitz'
import { MasterCta } from './MasterCta'
import { MasterCountdown } from './MasterCountdown'
import { HighlightPrice } from './HighlightPrice'
import { EventGate } from './EventGate'

export function MasterFinalCta() {
  return (
    <section className="bg-[#0d0c0d] py-16 md:py-24 px-4">
      <div className="max-w-[760px] mx-auto text-center">
        <EventGate
          target={MC.targetDateISO}
          fallback={
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
                Edição encerrada
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                Essa MasterClass já aconteceu
              </h2>
              <p className="text-sm md:text-base text-[#9ca3af] mb-8 max-w-[560px] mx-auto">
                Deixe seu contato no WhatsApp para ser avisado assim que abrirem as inscrições da
                próxima edição.
              </p>
              <a
                href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#3DB85C] text-white font-bold rounded-[10px] px-6 md:px-8 py-3 md:py-4 hover:brightness-110 active:scale-95 transition-all duration-200 text-base md:text-lg shadow-lg"
              >
                Avisar da próxima edição →
              </a>
            </>
          }
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
            {MC.date} às {MC.time}, {MC.timezone}
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            Garanta a sua vaga na MasterClass de Spitz Alemão
          </h2>
          <p className="text-sm md:text-base text-[#9ca3af] mb-8 max-w-[560px] mx-auto">
            <HighlightPrice
              text={`Aula ao vivo, gratuita para compras acima de ${MC.minPurchase}. Vagas por tempo limitado até o dia da aula.`}
            />
          </p>

          <div className="flex justify-center mb-8">
            <MasterCountdown target={MC.targetDateISO} />
          </div>

          <MasterCta href="#acesso" pulse className="text-base md:text-lg shadow-lg">
            Garantir meu acesso →
          </MasterCta>
        </EventGate>
      </div>
    </section>
  )
}
