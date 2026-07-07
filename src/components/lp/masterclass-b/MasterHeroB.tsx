import Image from 'next/image'
import { Calendar, Clock, MapPin, Check, Unlock } from 'lucide-react'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-spitz'
import { BRAND } from '@/lib/constants'
import { MasterCtaB } from './MasterCtaB'
import { MasterCountdownB } from './MasterCountdownB'
import { HighlightPriceB } from './HighlightPriceB'
import { EventGate } from '../masterclass/EventGate'

const metaItems = [
  { icon: Calendar, text: `${MC.date} às ${MC.time}` },
  { icon: Clock, text: MC.duration },
  { icon: MapPin, text: `${MC.format}, ${MC.platform}` },
]

export function MasterHeroB() {
  return (
    <section className="bg-[#080808] pt-10 pb-14 md:pt-16 md:pb-20 px-4">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Coluna de texto */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3">
            {MC.program} · Aula ao vivo e gratuita
          </p>

          {/* Condição de acesso, em destaque logo no topo */}
          <div className="inline-flex items-center gap-2 bg-[#111111] border border-white/5 rounded-full px-3.5 py-2 mb-4">
            <Unlock size={16} className="text-[#F4CDD4] shrink-0" />
            <p className="text-xs md:text-sm font-bold text-white">
              <HighlightPriceB text={`Acesso liberado comprando ${MC.minPurchase}+ até ${MC.purchaseDeadline}`} />
              <span className="font-medium text-white/60"> · site, WhatsApp oficial ou distribuidores</span>
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.02] mb-4">
            {MC.title}
          </h1>
          <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-3">
            {MC.subtitle}
          </p>

          <p className="flex items-center gap-1.5 text-xs font-semibold text-white/60 mb-5">
            <Check size={14} className="text-[#F4CDD4] shrink-0" />
            {BRAND.groomers} groomers parceiros confiam na Bubbles
          </p>

          {/* Meta: data, duração, formato */}
          <div className="flex flex-wrap gap-2 mb-6">
            {metaItems.map((m) => (
              <span
                key={m.text}
                className="inline-flex items-center gap-1.5 bg-[#1A1A1A] border border-white/5 rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-white/70"
              >
                <m.icon size={14} className="text-[#F4CDD4] shrink-0" />
                {m.text}
              </span>
            ))}
          </div>

          <EventGate
            target={MC.targetDateISO}
            fallback={
              <div>
                <p className="text-sm font-semibold text-white mb-4">
                  Essa edição da MasterClass já aconteceu. Deixe seu contato para ser avisado
                  quando abrirem as inscrições da próxima.
                </p>
                <a
                  href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#F4CDD4] text-[#080808] font-black uppercase tracking-widest rounded-xl px-6 md:px-8 py-3.5 md:py-4 transition-transform duration-150 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(244,205,212,0.2)] text-xs md:text-sm w-full sm:w-auto"
                >
                  Avisar da próxima edição →
                </a>
              </div>
            }
          >
            {/* Contagem regressiva real para o início da aula */}
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">
                Faltam
              </p>
              <MasterCountdownB target={MC.targetDateISO} />
            </div>

            <MasterCtaB href="#acesso" pulse className="text-xs md:text-sm w-full sm:w-auto">
              Garantir meu acesso →
            </MasterCtaB>

            <p className="mt-3 text-xs text-white/60">
              <HighlightPriceB text={`Participação gratuita para quem comprar ${MC.minPurchase}+ até ${MC.purchaseDeadline}.`} />
            </p>
          </EventGate>
        </div>

        {/* Coluna do instrutor */}
        <div className="max-w-[280px] mx-auto md:max-w-none">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(244,205,212,0.2)]">
            <Image
              src="/images/masterclass/guilherme-instrutor.webp"
              alt={MC_INSTRUCTOR.name}
              fill
              priority
              sizes="(max-width: 767px) 280px, 526px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="font-black text-white tracking-tight">{MC_INSTRUCTOR.name}</p>
            <p className="text-sm text-white/60">{MC_INSTRUCTOR.credential}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
