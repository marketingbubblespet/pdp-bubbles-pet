'use client'
import { useEffect, useState } from 'react'

type T = { d: number; h: number; m: number; s: number }

export function LiveCountdown({ target, className = '' }: { target: string; className?: string }) {
  const [t, setT] = useState<T | null>(null)

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return }
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

  if (!t) return null // evita mismatch de hidratação

  const box = (n: number, l: string) => (
    <div className="flex flex-col items-center bg-white rounded-[10px] px-3 py-2 md:px-4 md:py-3 min-w-[56px] md:min-w-[68px] shadow-sm border border-[#E5E7EB]">
      <span className="text-xl md:text-2xl font-extrabold text-[#0F0C0D] tabular-nums">{String(n).padStart(2, '0')}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">{l}</span>
    </div>
  )

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      {box(t.d, 'dias')}{box(t.h, 'horas')}{box(t.m, 'min')}{box(t.s, 'seg')}
    </div>
  )
}
