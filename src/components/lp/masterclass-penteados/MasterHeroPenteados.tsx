import Image from 'next/image'
import { Calendar, Clock, MapPin, Check, Unlock } from 'lucide-react'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-penteados'
import { BRAND } from '@/lib/constants'
import { MasterCtaPenteados } from './MasterCtaPenteados'
import { MasterCountdownPenteados } from './MasterCountdownPenteados'
import { EventGate } from '@/components/lp/masterclass/EventGate'

const metaItems = [
  { icon: Calendar, text: `${MC.dateFull} às ${MC.time}` },
  { icon: Clock, text: MC.duration },
  { icon: MapPin, text: `${MC.format}, ${MC.platform}` },
]

export function MasterHeroPenteados() {
  return (
    <section className="bg-[#F7F7F7] pt-10 pb-14 md:pt-16 md:pb-20 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-[1fr_1.25fr] gap-8 md:gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            MasterClass {MC.dateFull} às {MC.time} · Aula ao vivo
          </p>

          <div className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-3.5 py-2 mb-4">
            <Unlock size={16} className="text-[#E8649A] shrink-0" />
            <p className="text-xs md:text-sm font-semibold text-[#0F0C0D]">
              Acesso liberado em compras acima de R$ 399 até {MC.dateFull}
              <span className="font-medium text-[#6B7280]"> · Site, WhatsApp oficial ou Distribuidores</span>
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-medium text-[#0F0C0D] tracking-tight leading-[1.1] mb-4">
            {MC.title}
          </h1>
          <p className="text-sm md:text-base text-[#6B7280] leading-relaxed mb-3">
            {MC.subtitle}
          </p>

          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] mb-5">
            <Check size={14} className="text-[#3DB85C] shrink-0" />
            {BRAND.groomers} groomers parceiros confiam na Bubbles
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {metaItems.map((m) => (
              <span
                key={m.text}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0F0C0D]"
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
                <p className="text-sm font-semibold text-[#0F0C0D] mb-4">
                  Essa edição da MasterClass já aconteceu. Deixe seu contato para ser avisado
                  quando abrirem as inscrições da próxima.
                </p>
                <a
                  href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3.5 md:py-4 transition-transform duration-150 hover:scale-[1.02] active:scale-95 shadow-md text-xs md:text-sm w-full sm:w-auto"
                >
                  Avisar da próxima edição →
                </a>
              </div>
            }
          >
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-2">
                Faltam
              </p>
              <MasterCountdownPenteados target={MC.targetDateISO} />
            </div>

            <MasterCtaPenteados origem="hero" pulse className="text-xs md:text-sm w-full sm:w-auto">
              Quero garantir meu acesso →
            </MasterCtaPenteados>

            <p className="mt-3 text-xs text-[#6B7280]">
              {MC.accessRule} até {MC.purchaseDeadline} pra participar.
            </p>
          </EventGate>
        </div>

        <div className="order-first md:order-none max-w-[420px] mx-auto md:max-w-none">
          <div className="relative aspect-[4/5] md:aspect-[3/4] md:max-h-[85vh] rounded-3xl overflow-hidden shadow-md">
            <Image
              src={MC_INSTRUCTOR.photo}
              alt={MC_INSTRUCTOR.name}
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(max-width: 767px) 420px, 700px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="font-medium text-[#0F0C0D] tracking-tight">{MC_INSTRUCTOR.name}</p>
            <p className="text-sm text-[#6B7280]">{MC_INSTRUCTOR.credential.split('.')[0]}.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
