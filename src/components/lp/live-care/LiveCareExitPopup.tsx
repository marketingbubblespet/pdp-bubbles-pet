'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { LIVE_CARE } from '@/lib/live-care'
import { LiveCareCta } from './LiveCareCta'
import { trackExitPopup } from './trackLiveCare'
import { useLiveCarePhase } from './useLiveCarePhase'

const KEY = 'livecare-exit-last-shown'
const THROTTLE_MS = 5 * 60 * 1000

export function LiveCareExitPopup() {
  const [aberto, setAberto] = useState(false)
  const phase = useLiveCarePhase()

  useEffect(() => {
    const podeMostrar = () => Date.now() - Number(sessionStorage.getItem(KEY) || 0) >= THROTTLE_MS
    const mostrar = () => {
      if (!podeMostrar()) return
      sessionStorage.setItem(KEY, String(Date.now()))
      setAberto(true)
      trackExitPopup()
    }

    // Desktop: mouse saindo pelo topo da janela.
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) mostrar()
    }

    // Mobile: não existe "mouse leave", então usamos rolagem rápida para cima como
    // sinal equivalente de intenção de sair.
    let ultimoY = window.scrollY
    let ultimoT = Date.now()
    const onScroll = () => {
      const y = window.scrollY
      const t = Date.now()
      const dt = t - ultimoT
      if (dt > 0 && dt < 300 && ultimoY - y > 250) mostrar()
      ultimoY = y
      ultimoT = t
    }

    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!aberto) return null

  const depois = phase === 'depois'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
      onClick={() => setAberto(false)}
    >
      <div
        className="relative bg-white rounded-2xl max-w-[420px] w-full p-6 md:p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setAberto(false)}
          aria-label="Fechar"
          className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-[#9ca3af] hover:text-[#0F0C0D] transition-colors"
        >
          <X size={20} />
        </button>

        <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8649A] mb-2">Espera!</p>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0F0C0D] mb-2 leading-tight">
          {depois
            ? 'Não perca a próxima live'
            : `A live é ${LIVE_CARE.weekday} e o cupom só sai ao vivo`}
        </h3>
        <p className="text-sm text-[#6B7280] mb-6">
          {depois
            ? 'Entre no grupo e seja avisado antes de todo mundo quando a próxima transmissão for marcada.'
            : 'Entre no grupo para receber o aviso na hora e as condições de lançamento da Linha Care.'}
        </p>

        <LiveCareCta origem="popup-saida" className="w-full">
          Entrar no grupo do WhatsApp
        </LiveCareCta>
      </div>
    </div>
  )
}
