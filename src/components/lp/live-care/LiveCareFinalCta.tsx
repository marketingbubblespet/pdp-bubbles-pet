'use client'
import { LIVE_CARE } from '@/lib/live-care'
import { LiveCareCta } from './LiveCareCta'
import { LiveCareCountdown } from './LiveCareCountdown'
import { useLiveCarePhase } from './useLiveCarePhase'

export function LiveCareFinalCta() {
  const phase = useLiveCarePhase()
  const depois = phase === 'depois'

  return (
    // id usado pela barra fixa: quando esta seção aparece na tela, a barra some para não
    // duplicar o mesmo botão em cima do outro.
    <section id="cta-final" className="bg-[#F4CDD4] py-16 md:py-24 px-4">
      <div className="max-w-[720px] mx-auto text-center">
        {depois ? (
          <>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F0C0D] mb-4 leading-tight">
              Essa live já aconteceu
            </h2>
            <p className="text-sm md:text-base text-[#0F0C0D]/70 mb-8 max-w-[520px] mx-auto">
              Entre no grupo para ser avisado da próxima transmissão e receber os cupons e as novidades da
              Linha Care em primeira mão.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F0C0D] mb-4 leading-tight">
              {LIVE_CARE.weekday}, {LIVE_CARE.time}. A Linha Care ao vivo.
            </h2>
            <p className="text-sm md:text-base text-[#0F0C0D]/70 mb-8 max-w-[520px] mx-auto">
              Entre no grupo agora e receba o aviso quando a transmissão começar, junto com os cupons de
              lançamento.
            </p>
            <div className="flex justify-center mb-8">
              <LiveCareCountdown target={LIVE_CARE.targetDateISO} />
            </div>
          </>
        )}

        <LiveCareCta origem="cta-final" pulse className="w-full sm:w-auto text-base md:text-lg">
          Entrar no grupo do WhatsApp →
        </LiveCareCta>

        <p className="mt-4 text-xs text-[#0F0C0D]/60">
          Grupo VIP de groomers Bubbles. Gratuito, sem compromisso, saia quando quiser.
        </p>
      </div>
    </section>
  )
}
