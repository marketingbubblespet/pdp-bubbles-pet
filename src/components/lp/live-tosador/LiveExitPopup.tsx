'use client'
import { useEffect, useState } from 'react'
import { LiveCta } from './LiveCta'

const KEY = 'live-exit-last-shown'
const THROTTLE_MS = 5 * 60 * 1000

export function LiveExitPopup() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const canShow = () => Date.now() - Number(sessionStorage.getItem(KEY) || 0) >= THROTTLE_MS
    const show = () => { if (!canShow()) return; sessionStorage.setItem(KEY, String(Date.now())); setOpen(true) }
    const onMouseOut = (e: MouseEvent) => { if (e.clientY <= 0) show() }
    let lastY = window.scrollY, lastT = Date.now()
    const onScroll = () => {
      const y = window.scrollY, t = Date.now(), dt = t - lastT
      if (dt > 0 && dt < 300 && lastY - y > 250) show()
      lastY = y; lastT = t
    }
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { document.removeEventListener('mouseout', onMouseOut); window.removeEventListener('scroll', onScroll) }
  }, [])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={() => setOpen(false)}>
      <div className="relative bg-white rounded-[10px] max-w-[420px] w-full p-6 md:p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} aria-label="Fechar" className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center text-[#9ca3af] hover:text-[#0F0C0D] text-2xl leading-none">×</button>
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-2">Espera!</p>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0F0C0D] mb-2 leading-tight">A live do Dia do Tosador é domingo e não se repete</h3>
        <p className="text-sm text-[#6B7280] mb-6">Entre no grupo para receber o aviso na hora e os cupons liberados só ao vivo.</p>
        <LiveCta className="block w-full">Entrar no grupo do WhatsApp</LiveCta>
      </div>
    </div>
  )
}
