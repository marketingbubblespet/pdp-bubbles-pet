import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'
import { LiveCountdown } from './LiveCountdown'
import { LiveEventGate } from './LiveEventGate'

const metaItems = [
  { icon: '📅', text: `${LIVE.weekday}, ${LIVE.date} às ${LIVE.time}` },
  { icon: '⏱️', text: LIVE.duration },
  { icon: '📍', text: `Ao vivo no ${LIVE.platform}` },
]
const rewards = ['🎁 Brindes', '🎉 Sorteio ao vivo', '🏷️ Cupons exclusivos', '✨ Novidades em primeira mão']

export function LiveHero() {
  return (
    <section className="bg-[#F7F7F7] pt-12 pb-14 md:pt-20 md:pb-20 px-4">
      <div className="max-w-[820px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
          {LIVE.dateFull} · Dia do Tosador
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.12] text-[#0F0C0D] mb-4">
          No Dia do Tosador, a Bubbles vai comemorar com você, ao vivo.
        </h1>
        <p className="text-sm md:text-base font-medium text-[#6B7280] leading-relaxed mb-6 max-w-[640px] mx-auto">
          Uma live especial para celebrar quem faz a mágica do banho e tosa acontecer. Vai ter brinde, sorteio ao vivo, cupom exclusivo e novidades liberadas antes de todo mundo.
        </p>

        {/* Recompensas em pílulas */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {rewards.map((r) => (
            <span key={r} className="inline-block bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0F0C0D]">{r}</span>
          ))}
        </div>

        {/* Meta: data, duração, plataforma */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {metaItems.map((m) => (
            <span key={m.text} className="inline-flex items-center gap-1.5 bg-[#fdf0f3] border border-[#F4CDD4] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0F0C0D]">
              <span>{m.icon}</span>{m.text}
            </span>
          ))}
        </div>
        <p className="text-xs text-[#9ca3af] mb-8">Com apresentação de {LIVE.host}.</p>

        <LiveEventGate
          target={LIVE.targetDateISO}
          fallback={
            <div>
              <p className="text-sm font-semibold text-[#0F0C0D] mb-4">A live do Dia do Tosador já aconteceu. Entre no grupo para não perder a próxima e receber as promoções da Bubbles.</p>
              <LiveCta className="text-base md:text-lg w-full sm:w-auto shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
            </div>
          }
        >
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mb-2">A live começa em</p>
            <div className="flex justify-center"><LiveCountdown target={LIVE.targetDateISO} /></div>
          </div>
          <LiveCta pulse className="text-base md:text-lg w-full sm:w-auto shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
          <p className="mt-3 text-xs text-[#9ca3af]">É no grupo que a gente avisa a hora e libera os cupons. Sem grupo, você corre o risco de perder.</p>
        </LiveEventGate>
      </div>
    </section>
  )
}
