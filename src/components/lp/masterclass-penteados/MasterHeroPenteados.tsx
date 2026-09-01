import Image from 'next/image'
import { Calendar, Clock, MapPin, Check, Unlock } from 'lucide-react'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-penteados'
import { BRAND } from '@/lib/constants'
import { MasterCtaPenteados } from './MasterCtaPenteados'
import { MasterCountdownPenteados } from './MasterCountdownPenteados'
import { HighlightPricePenteados } from './HighlightPricePenteados'
import { EventGate } from '../masterclass/EventGate'
import { WhatsappGate } from '@/components/ui/WhatsappGate'

const metaItems = [
  { icon: Calendar, text: `${MC.date} às ${MC.time}` },
  { icon: Clock, text: MC.duration },
  { icon: MapPin, text: `${MC.format}, ${MC.platform}` },
]

export function MasterHeroPenteados() {
  return (
    <section className="bg-[#F7F7F7] pt-10 pb-14 md:pt-16 md:pb-20 px-4">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Coluna de texto */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            {MC.program} · Aula ao vivo
          </p>

          {/* Condição de acesso, em destaque logo no topo */}
          <div className="inline-flex items-center gap-2 bg-[#FDF2F4] border border-[#F4CDD4] rounded-full px-3.5 py-2 mb-4">
            <Unlock size={16} className="text-[#B25A72] shrink-0" />
            <p className="text-xs md:text-sm font-semibold text-[#0D0C0D]">
              <HighlightPricePenteados text={`Acesso liberado comprando ${MC.minPurchase}+ até ${MC.purchaseDeadline}`} />
              <span className="font-medium text-[#666666]"> · site, WhatsApp oficial ou distribuidores</span>
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-medium text-[#0D0C0D] leading-[1.15] mb-4">
            {MC.title}
          </h1>
          <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-3">
            {MC.subtitle}
          </p>

          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#666666] mb-5">
            <Check size={14} className="text-[#3DB85C] shrink-0" />
            {BRAND.groomers} groomers parceiros confiam na Bubbles
          </p>

          {/* Meta: data, duração, formato */}
          <div className="flex flex-wrap gap-2 mb-6">
            {metaItems.map((m) => (
              <span
                key={m.text}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#666666]"
              >
                <m.icon size={14} className="text-[#E8649A] shrink-0" />
                {m.text}
              </span>
            ))}
          </div>

          <EventGate
            target={MC.targetDateISO}
            fallback={
              <div>
                <p className="text-sm font-semibold text-[#0D0C0D] mb-4">
                  Essa edição da MasterClass já aconteceu. Deixe seu contato para ser avisado
                  quando abrirem as inscrições da próxima.
                </p>
                <WhatsappGate
                  href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
                  ctaLocation="masterclass-penteados-hero"
                  ctaLabel="Avisar da próxima edição"
                  theme="light"
                  className="inline-flex items-center justify-center bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3 md:py-4 min-h-[44px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95 text-xs md:text-sm w-full sm:w-auto"
                >
                  Avisar da próxima edição →
                </WhatsappGate>
              </div>
            }
          >
            {/* Contagem regressiva real para o início da aula */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#666666] mb-2">
                Faltam
              </p>
              <MasterCountdownPenteados target={MC.targetDateISO} />
            </div>

            <MasterCtaPenteados href="#acesso" pulse className="text-xs md:text-sm w-full sm:w-auto">
              Garantir meu acesso →
            </MasterCtaPenteados>

            <p className="mt-3 text-xs text-[#666666]">
              <HighlightPricePenteados text={`Vaga garantida para quem comprar ${MC.minPurchase}+ até ${MC.purchaseDeadline}.`} />
            </p>
          </EventGate>
        </div>

        {/* Coluna da instrutora */}
        <div className="max-w-[280px] mx-auto md:max-w-none">
          <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
            <Image
              src={MC_INSTRUCTOR.photo}
              alt={MC_INSTRUCTOR.name}
              fill
              priority
              fetchPriority="high"
              quality={70}
              sizes="(max-width: 767px) 280px, 526px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="font-medium text-[#0D0C0D]">{MC_INSTRUCTOR.name}</p>
            <p className="text-sm text-[#666666]">{MC_INSTRUCTOR.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
