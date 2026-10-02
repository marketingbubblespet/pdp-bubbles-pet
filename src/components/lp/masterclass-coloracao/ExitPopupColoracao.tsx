'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { MC } from '@/lib/masterclass-coloracao'
import { pushExitPopupShown } from '@/lib/tracking'
import { MasterCtaColoracao } from './MasterCtaColoracao'

const KEY = 'mc-coloracao-exit-last-shown'
const THROTTLE_MS = 5 * 60 * 1000

export function ExitPopupColoracao() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    if (Date.now() > new Date(MC.targetDateISO).getTime()) return

    const podeMostrar = () => Date.now() - Number(sessionStorage.getItem(KEY) || 0) >= THROTTLE_MS
    const mostrar = () => {
      if (!podeMostrar()) return
      sessionStorage.setItem(KEY, String(Date.now()))
      setAberto(true)
      pushExitPopupShown('masterclass-coloracao')
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={() => setAberto(false)}>
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-[20px] max-w-[420px] w-full p-6 md:p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setAberto(false)}
          aria-label="Fechar"
          className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-[#666666] hover:text-[#0D0C0D] transition-colors"
        >
          <X size={20} />
        </button>

        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#E8649A] mb-2">Espera!</p>
        <h3 className="text-xl md:text-2xl font-medium text-[#0D0C0D] mb-2 leading-tight">
          A MasterClass é {MC.weekday}, {MC.date}, e o acesso é só até o dia da aula
        </h3>
        <p className="text-sm text-[#666666] mb-6">
          Qualquer produto Collora já libera a sua vaga. Ou compre a partir de R$399 em qualquer produto Bubbles.
        </p>

        <MasterCtaColoracao origem="popup-saida" className="w-full">
          Quero garantir meu acesso
        </MasterCtaColoracao>
      </div>
    </div>
  )
}
