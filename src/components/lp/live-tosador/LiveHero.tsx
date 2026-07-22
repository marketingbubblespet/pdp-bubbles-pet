import { Image as ImageIcon, Calendar, Clock, MapPin, Gift, PartyPopper, Tag, Sparkles } from 'lucide-react'
import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'
import { LiveCountdown } from './LiveCountdown'
import { LiveEventGate } from './LiveEventGate'

const metaItems = [
  { icon: Calendar, text: `${LIVE.weekday}, ${LIVE.date} às ${LIVE.time}` },
  { icon: Clock, text: LIVE.duration },
  { icon: MapPin, text: `Ao vivo no ${LIVE.platform}` },
]
const rewards = [
  { icon: Gift, text: 'Brindes' },
  { icon: PartyPopper, text: 'Sorteio ao vivo' },
  { icon: Tag, text: 'Cupons exclusivos' },
  { icon: Sparkles, text: 'Novidades em primeira mão' },
]

export function LiveHero() {
  return (
    <section className="bg-[#080808] pt-12 pb-14 md:pt-20 md:pb-20 px-4">
      <div className="max-w-[820px] mx-auto text-center">
        {/* Placeholder da arte oficial da campanha — substituir por next/image quando a arte chegar */}
        <div className="mx-auto mb-6 max-w-[560px] rounded-2xl border-2 border-dashed border-white/10 bg-[#1A1A1A] flex flex-col items-center justify-center gap-2 p-5">
          <ImageIcon size={28} className="text-white/40 shrink-0" />
          <span className="text-[11px] text-white/40 text-center leading-relaxed max-w-[440px]">
            <strong className="text-white/60">Arte oficial do &quot;Dia do Tosador&quot;</strong> — banner 1200x400px, PNG/WebP.
            Sugestão de conteúdo: Mariane e Anna juntas (ou uma cena de banho/tosa), clima de celebração
            profissional, paleta Cosmic Rose sobre fundo escuro, com o texto ou selo &quot;Dia do Tosador&quot;
            em destaque. Evitar imagens de banco genéricas.
          </span>
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
          {LIVE.dateFull} · Dia do Tosador
        </p>
        <h1 className="text-3xl md:text-5xl font-black leading-[1.12] text-white tracking-tight mb-4">
          No Dia do Tosador, a Bubbles vai comemorar com você, ao vivo.
        </h1>
        <p className="text-sm md:text-base font-medium text-white/70 leading-relaxed mb-6 max-w-[640px] mx-auto">
          Uma live especial para celebrar quem faz a mágica do banho e tosa acontecer. Vai ter brinde, sorteio ao vivo, cupom exclusivo e novidades liberadas antes de todo mundo.
        </p>

        {/* Recompensas em pílulas */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {rewards.map((r) => (
            <span key={r.text} className="inline-flex items-center gap-1.5 bg-[#1A1A1A] border border-white/5 rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-white">
              <r.icon size={14} className="text-[#F4CDD4] shrink-0" />{r.text}
            </span>
          ))}
        </div>

        {/* Meta: data, duração, plataforma */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {metaItems.map((m) => (
            <span key={m.text} className="inline-flex items-center gap-1.5 bg-[#1A1A1A] border border-white/5 rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-white">
              <m.icon size={14} className="text-[#F4CDD4] shrink-0" />{m.text}
            </span>
          ))}
        </div>
        <p className="text-xs text-white/40 mb-8">Com apresentação de {LIVE.host}.</p>

        <LiveEventGate
          target={LIVE.targetDateISO}
          fallback={
            <div>
              <p className="text-sm font-semibold text-white mb-4">A live do Dia do Tosador já aconteceu. Entre no grupo para não perder a próxima e receber as promoções da Bubbles.</p>
              <LiveCta className="text-base md:text-lg w-full sm:w-auto shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
            </div>
          }
        >
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-2">A live começa em</p>
            <div className="flex justify-center"><LiveCountdown target={LIVE.targetDateISO} /></div>
          </div>
          <LiveCta pulse className="text-base md:text-lg w-full sm:w-auto shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
          <p className="mt-3 text-xs text-white/40">É no grupo que a gente avisa a hora e libera os cupons. Sem grupo, você corre o risco de perder.</p>
        </LiveEventGate>
      </div>
    </section>
  )
}
