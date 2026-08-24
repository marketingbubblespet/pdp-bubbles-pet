'use client'
import { Calendar, Clock, Camera, Check, Radio } from 'lucide-react'
import { LIVE_CARE } from '@/lib/live-care'
import { LiveCareCta } from './LiveCareCta'
import { LiveCareCountdown } from './LiveCareCountdown'
import { LiveCarePhoto } from './LiveCarePhoto'
import { useLiveCarePhase } from './useLiveCarePhase'
import { trackWatchLive } from './trackLiveCare'

const meta = [
  { icon: Calendar, texto: `${LIVE_CARE.weekday}, ${LIVE_CARE.date}` },
  { icon: Clock, texto: `${LIVE_CARE.time}, ${LIVE_CARE.timezone}` },
  { icon: Camera, texto: `Ao vivo no ${LIVE_CARE.platform}` },
]

export function LiveCareHero() {
  const phase = useLiveCarePhase()
  // Antes da hidratação `phase` é null. Tratamos como "antes" para não piscar o
  // conteúdo de pós-live em quem chega antes do evento (a maioria absoluta).
  const depois = phase === 'depois'
  const aoVivo = phase === 'ao-vivo'

  return (
    <section className="relative bg-[#F7F7F7] overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20 px-4">
      {/* Brilho rosa suave de fundo, só decorativo */}
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#F4CDD4] opacity-40 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Coluna de texto (primeira no mobile) */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            Live de lançamento · Linha Care
          </p>

          <h1 className="text-3xl md:text-5xl font-medium leading-[1.15] text-[#0D0C0D] mb-4">
            Transforme cada banho em uma nova oportunidade de venda
          </h1>

          <p className="text-base md:text-lg text-[#666666] font-medium leading-relaxed mb-5">
            No domingo, 23 de agosto, apresentamos a Linha Care ao vivo: a linha de home care que faz o
            resultado do seu banho e tosa continuar na casa do tutor, e abre uma nova frente de faturamento
            no seu negócio, sem aumentar o número de atendimentos.
          </p>

          <p className="flex items-center gap-1.5 text-sm font-semibold text-[#0D0C0D] mb-6">
            <Check size={16} className="text-[#3DB85C] shrink-0" />
            {LIVE_CARE.socialProof} groomers parceiros já confiam na Bubbles
          </p>

          {/* Data, hora e plataforma */}
          <div className="flex flex-wrap gap-2 mb-7">
            {meta.map((m) => (
              <span
                key={m.texto}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0D0C0D]"
              >
                <m.icon size={14} className="text-[#E8649A] shrink-0" />
                {m.texto}
              </span>
            ))}
          </div>

          {depois ? (
            <div>
              <p className="text-sm font-semibold text-[#0D0C0D] mb-4">
                Essa live já aconteceu. Entre no grupo para ser avisado da próxima e receber os cupons.
              </p>
              <LiveCareCta origem="hero-pos-live" className="w-full sm:w-auto text-base">
                Entrar no grupo do WhatsApp →
              </LiveCareCta>
            </div>
          ) : aoVivo ? (
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8649A] mb-4">
                <Radio size={16} className="shrink-0 animate-pulse" />
                Estamos ao vivo agora no {LIVE_CARE.platform}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={LIVE_CARE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWatchLive}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] bg-[#E8649A] text-white font-semibold rounded-[10px] px-6 py-3.5 hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md"
                >
                  <Camera size={18} /> Assistir agora
                </a>
                <LiveCareCta origem="hero-ao-vivo" className="text-base">
                  Entrar no grupo
                </LiveCareCta>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666666] mb-2">Faltam</p>
              <LiveCareCountdown target={LIVE_CARE.targetDateISO} className="mb-6" />

              <LiveCareCta origem="hero" pulse className="w-full sm:w-auto text-base">
                Entrar no grupo do WhatsApp →
              </LiveCareCta>

              <p className="mt-3 text-xs text-[#666666]">
                Gratuito. É no grupo que avisamos a hora da live e liberamos os cupons.
              </p>
            </div>
          )}
        </div>

        {/* Coluna da imagem */}
        <div className="order-first md:order-none">
          {/* Proporção quadrada em todas as telas: a arte é um quadrado fechado, com o logo
              da Care no topo. Recortar para retrato no mobile cortaria as laterais. */}
          <div className="relative w-full max-w-[520px] mx-auto md:mx-0 md:ml-auto aspect-square rounded-2xl overflow-hidden bg-[#fdf0f3] shadow-sm">
            <LiveCarePhoto
              src="/images/live-care/hero.webp"
              alt={`Live de lançamento da Linha Care com ${LIVE_CARE.hosts}`}
              sizes="(max-width: 767px) calc(100vw - 32px), 520px"
              label="[FOTO-01: herói da live]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
