'use client'
import { useEffect, useState } from 'react'

type Restante = { d: number; h: number; m: number; s: number }

export function LiveCareCountdown({ target, className = '' }: { target: string; className?: string }) {
  const [t, setT] = useState<Restante | null>(null)

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) {
        setT({ d: 0, h: 0, m: 0, s: 0 })
        return
      }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  // Evita mismatch de hidratação: no servidor não existe "agora".
  if (!t) return null

  const bloco = (n: number, label: string) => (
    <div className="flex flex-col items-center bg-white rounded-xl px-3 py-2 md:px-4 md:py-3 min-w-[62px] md:min-w-[72px] border border-[#E5E7EB] shadow-sm">
      <span className="text-xl md:text-2xl font-medium text-[#0D0C0D] tabular-nums leading-none">
        {String(n).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[#666666]">{label}</span>
    </div>
  )

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`} aria-label="Tempo restante para a live">
      {bloco(t.d, 'dias')}
      {bloco(t.h, 'horas')}
      {bloco(t.m, 'min')}
      {bloco(t.s, 'seg')}
    </div>
  )
}
