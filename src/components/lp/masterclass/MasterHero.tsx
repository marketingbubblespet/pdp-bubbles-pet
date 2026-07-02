import Image from 'next/image'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-spitz'
import { BRAND } from '@/lib/constants'
import { MasterCta } from './MasterCta'
import { MasterCountdown } from './MasterCountdown'
import { HighlightPrice } from './HighlightPrice'
import { EventGate } from './EventGate'

const metaItems = [
  { icon: '📅', text: `${MC.date} às ${MC.time}` },
  { icon: '⏱️', text: MC.duration },
  { icon: '📍', text: `${MC.format}, ${MC.platform}` },
]

export function MasterHero() {
  return (
    <section className="bg-[#F7F7F7] pt-10 pb-14 md:pt-16 md:pb-20 px-4">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Coluna de texto */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
            {MC.program} · Aula ao vivo e gratuita
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.02] text-[#0F0C0D] mb-4">
            {MC.title}
          </h1>
          <p className="text-xs md:text-sm font-medium text-[#6B7280] leading-snug mb-3">
            {MC.subtitle}
          </p>

          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] mb-5">
            <span className="text-[#3DB85C]">✓</span>
            {BRAND.groomers} groomers parceiros confiam na Bubbles
          </p>

          {/* Meta: data, duração, formato */}
          <div className="flex flex-wrap gap-2 mb-6">
            {metaItems.map((m) => (
              <span
                key={m.text}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0F0C0D]"
              >
                <span>{m.icon}</span>
                {m.text}
              </span>
            ))}
          </div>

          <EventGate
            target={MC.targetDateISO}
            fallback={
              <div>
                <p className="text-sm font-semibold text-[#0F0C0D] mb-4">
                  Essa edição da MasterClass já aconteceu. Deixe seu contato para ser avisado
                  quando abrirem as inscrições da próxima.
                </p>
                <a
                  href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#3DB85C] text-white font-bold rounded-[10px] px-6 md:px-8 py-3 md:py-4 hover:brightness-110 active:scale-95 transition-all duration-200 text-base md:text-lg w-full sm:w-auto shadow-lg"
                >
                  Avisar da próxima edição →
                </a>
              </div>
            }
          >
            {/* Contagem regressiva real para o início da aula */}
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mb-2">
                Faltam
              </p>
              <MasterCountdown target={MC.targetDateISO} />
            </div>

            <MasterCta href="#acesso" pulse className="text-base md:text-lg w-full sm:w-auto shadow-lg">
              Garantir meu acesso →
            </MasterCta>

            <p className="mt-3 text-xs text-[#9ca3af]">
              <HighlightPrice text={`Participação gratuita para quem comprar ${MC.minPurchase}+ na loja Bubbles.`} />
            </p>
          </EventGate>
        </div>

        {/* Coluna do instrutor */}
        <div className="max-w-[280px] mx-auto md:max-w-none">
          <div className="relative aspect-[4/5] rounded-[10px] overflow-hidden">
            <Image
              src="/images/masterclass/guilherme-instrutor.webp"
              alt={MC_INSTRUCTOR.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="font-extrabold text-[#0F0C0D]">{MC_INSTRUCTOR.name}</p>
            <p className="text-sm text-[#6B7280]">{MC_INSTRUCTOR.credential}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
