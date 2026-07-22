'use client'
// Anima um número de 0 até o valor final quando entra na viewport. Sem dependência externa.
import { useEffect, useRef, useState } from 'react'

export function CountUp({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1400,
  className = '',
}: {
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(target * eased)
            if (progress < 1) requestAnimationFrame(tick)
            else setValue(target)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('pt-BR')

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
