import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'
import { LiveCountdown } from './LiveCountdown'
import { LiveEventGate } from './LiveEventGate'

export function LiveFinalCta() {
  return (
    <section className="bg-[#080808] py-16 md:py-24 px-4">
      <div className="max-w-[760px] mx-auto text-center">
        <LiveEventGate
          target={LIVE.targetDateISO}
          fallback={
            <>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">A live já aconteceu</h2>
              <p className="text-sm md:text-base text-white/70 mb-8 max-w-[560px] mx-auto">Entre no grupo para não perder a próxima e receber as promoções da Bubbles.</p>
              <LiveCta className="text-base md:text-lg shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
            </>
          }
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">{LIVE.weekday}, {LIVE.date} às {LIVE.time}, {LIVE.timezone}</p>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">Não deixe passar. O Dia do Tosador é uma vez por ano.</h2>
          <p className="text-sm md:text-base text-white/70 mb-8 max-w-[560px] mx-auto">Brinde, sorteio, cupom e novidades liberadas só ao vivo. Entre no grupo para garantir o seu lugar.</p>
          <div className="flex justify-center mb-8"><LiveCountdown target={LIVE.targetDateISO} /></div>
          <LiveCta pulse className="text-base md:text-lg shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
        </LiveEventGate>
      </div>
    </section>
  )
}
