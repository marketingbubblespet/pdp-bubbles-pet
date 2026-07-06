'use client'
import { useEffect, useState } from 'react'
import { MC } from '@/lib/masterclass-spitz'

const KEY = 'mcb-exit-last-shown'
const THROTTLE_MS = 5 * 60 * 1000 // não repetir antes de 5 minutos

export function ExitPopupB() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const canShow = () => {
      const last = Number(sessionStorage.getItem(KEY) || 0)
      return Date.now() - last >= THROTTLE_MS
    }
    const show = () => {
      if (!canShow()) return
      sessionStorage.setItem(KEY, String(Date.now()))
      setOpen(true)
    }

    // Desktop: intenção de sair pelo topo da tela.
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }
    // Mobile: scroll para cima rápido e brusco, gesto típico de quem vai fechar a página.
    let lastY = window.scrollY
    let lastT = Date.now()
    const onScroll = () => {
      const y = window.scrollY
      const t = Date.now()
      const dt = t - lastT
      if (dt > 0 && dt < 300 && lastY - y > 250) show()
      lastY = y
      lastT = t
    }

    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl max-w-[420px] w-full p-6 md:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-white/40 hover:text-white text-2xl leading-none"
        >
          ×
        </button>

        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-2">
          Espera!
        </p>
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2 leading-tight">
          Não perca a MasterClass de Spitz Alemão
        </h3>
        <p className="text-sm text-white/70 mb-6">
          Aula ao vivo e gratuita em {MC.date} às {MC.time}. Fale com a gente no WhatsApp e garanta
          seu acesso antes que as vagas acabem.
        </p>

        <a
          href={`${MC.whatsapp}?text=${encodeURIComponent(MC.whatsappReminderMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="block w-full text-center bg-[#25D366] text-white font-bold rounded-xl px-6 py-3.5 hover:brightness-110 active:scale-95 transition-all"
        >
          Falar no WhatsApp →
        </a>
      </div>
    </div>
  )
}
