'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { MC } from '@/lib/masterclass-penteados'
import { MasterCtaPenteados } from './MasterCtaPenteados'
import { trackExitPopup } from './trackPenteados'

const KEY = 'mc-penteados-exit-last-shown'
const THROTTLE_MS = 5 * 60 * 1000

export function ExitPopupPenteados() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const podeMostrar = () => Date.now() - Number(sessionStorage.getItem(KEY) || 0) >= THROTTLE_MS
    const mostrar = () => {
      if (!podeMostrar()) return
      sessionStorage.setItem(KEY, String(Date.now()))
      setAberto(true)
      trackExitPopup()
    }

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) mostrar()
    }

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

        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#E8649A] mb-2">Espera!</p>
        <h3 className="text-xl md:text-2xl font-medium text-[#0F0C0D] mb-2 leading-tight">
          A MasterClass é {MC.weekday} e o acesso é só até {MC.purchaseDeadline}
        </h3>
        <p className="text-sm text-[#6B7280] mb-6">
          Garanta seu acesso comprando a partir de R$399 em qualquer produto Bubbles.
        </p>

        <MasterCtaPenteados origem="popup-saida" className="w-full">
          Quero garantir meu acesso
        </MasterCtaPenteados>
      </div>
    </div>
  )
}
