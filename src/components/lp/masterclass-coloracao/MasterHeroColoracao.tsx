import Image from 'next/image'
import { Calendar, Clock, MapPin, Check, Unlock } from 'lucide-react'
import { MC, MC_INSTRUCTOR, MC_HERO_IMAGE } from '@/lib/masterclass-coloracao'
import { BRAND } from '@/lib/constants'
import { EventGate } from '@/components/lp/masterclass/EventGate'
import { WhatsappGate } from '@/components/ui/WhatsappGate'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { MasterCtaColoracao } from './MasterCtaColoracao'
import { MasterCountdownColoracao } from './MasterCountdownColoracao'

const metaItems = [
  { icon: Calendar, text: `${MC.weekday}, ${MC.dateFull} às ${MC.time}` },
  { icon: Clock, text: MC.duration },
  { icon: MapPin, text: `${MC.format}, ${MC.platform}` },
]

export function MasterHeroColoracao() {
  return (
    <section className="bg-[#F7F7F7] pt-10 pb-14 md:pt-16 md:pb-20 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            MasterClass {MC.dateFull} às {MC.time} · Aula ao vivo
          </p>

          <div className="inline-flex items-start gap-2 bg-white border border-[#E5E7EB] rounded-2xl px-3.5 py-2 mb-4">
            <Unlock size={16} className="text-[#E8649A] shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm font-semibold text-[#0D0C0D]">
              {MC.accessShort} até {MC.dateFull}
              <span className="font-medium text-[#666666]"> · Site, WhatsApp oficial ou Distribuidores</span>
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-medium text-[#0D0C0D] tracking-tight leading-[1.15] mb-4">
            {MC.title}
          </h1>
          <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-3">{MC.subtitle}</p>

          <p className="flex items-center gap-1.5 text-xs font-semibold text-[#666666] mb-5">
            <Check size={14} className="text-[#3DB85C] shrink-0" />
            {BRAND.groomers} groomers parceiros confiam na Bubbles
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {metaItems.map((m) => (
              <span
                key={m.text}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0D0C0D]"
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
                  Essa edição da MasterClass já aconteceu. Entre na lista de espera para ser avisado
                  quando abrirem as inscrições da próxima.
                </p>
                <WhatsappGate
                  href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappWaitlistMsg)}`}
                  ctaLocation="hero-lista-espera"
                  ctaLabel="Entrar na lista de espera"
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3.5 hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md text-sm w-full sm:w-auto"
                >
                  <WhatsAppIcon size={18} /> Entrar na lista de espera
                </WhatsappGate>
              </div>
            }
          >
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666666] mb-2">Faltam</p>
              <MasterCountdownColoracao target={MC.targetDateISO} />
            </div>

            <MasterCtaColoracao origem="hero" pulse className="text-sm w-full sm:w-auto">
              Quero garantir meu acesso →
            </MasterCtaColoracao>

            <p className="mt-3 text-xs text-[#666666]">
              {MC.accessRule} até {MC.purchaseDeadline} pra participar.
            </p>
          </EventGate>
        </div>

        {/* Fica depois do texto no HTML: no celular aparece abaixo da regra de acesso; no desktop, na coluna da direita. */}
        <div className="max-w-[420px] mx-auto md:max-w-none w-full">
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-md">
            <Image
              src={MC_HERO_IMAGE.src}
              alt={MC_HERO_IMAGE.alt}
              fill
              priority
              fetchPriority="high"
              quality={75}
              sizes="(max-width: 767px) 420px, 620px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="font-medium text-[#0D0C0D] tracking-tight">Com {MC_INSTRUCTOR.name}</p>
            <p className="text-sm text-[#666666]">{MC_INSTRUCTOR.credential}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
