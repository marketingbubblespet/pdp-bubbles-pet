'use client'
// Modo apresentação: setas passam de seção, N mostra o roteiro de fala, cronômetro contra o tempo planejado.
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { SECOES } from '@/lib/apresentacao-black-november'

const NotasCtx = createContext(false)

export function Roteiro({ itens, pergunta }: { itens: string[]; pergunta?: { p: string; r: string } }) {
  const visivel = useContext(NotasCtx)
  if (!visivel) return null
  return (
    <aside className="mt-6 rounded-[12px] border-l-4 border-[#E8649A] bg-[#0D0C0D] p-5 text-white">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#F4CDD4]">Roteiro do apresentador</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {itens.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="text-[#E8649A]">›</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
      {pergunta && (
        <p className="mt-3 border-t border-white/20 pt-3 text-sm">
          <span className="text-[#F4CDD4]">Pergunta provável:</span> {pergunta.p}
          <br />
          <span className="text-[#F4CDD4]">Resposta:</span> {pergunta.r}
        </p>
      )}
    </aside>
  )
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export function Apresentador({ children }: { children: ReactNode }) {
  const [notas, setNotas] = useState(false)
  const [atual, setAtual] = useState(-1)
  const [inicio, setInicio] = useState<number | null>(null)
  const [agora, setAgora] = useState(0)

  const ir = useCallback((i: number) => {
    const alvo = Math.max(0, Math.min(SECOES.length - 1, i))
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(SECOES[alvo].id)?.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth' })
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setAtual(SECOES.findIndex((s) => s.id === e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECOES.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input, textarea, select')) return
      if (['ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); ir(atual + 1) }
      if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); ir(atual - 1) }
      if (e.key.toLowerCase() === 'n') setNotas((v) => !v)
      if (e.key.toLowerCase() === 't') setInicio((v) => (v ? null : Date.now()))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [atual, ir])

  useEffect(() => {
    if (!inicio) return
    const t = setInterval(() => setAgora(Math.floor((Date.now() - inicio) / 1000)), 1000)
    return () => clearInterval(t)
  }, [inicio])

  const planejado = SECOES.slice(0, Math.max(atual, 0) + 1).reduce((s, x) => s + x.minutos, 0)
  const total = SECOES.reduce((s, x) => s + x.minutos, 0)
  const atrasado = inicio !== null && agora > planejado * 60

  return (
    <NotasCtx.Provider value={notas}>
      {children}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-1 rounded-[12px] bg-[#0D0C0D] p-1.5 text-sm text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
        <button type="button" aria-label="Seção anterior" onClick={() => ir(atual - 1)} className="min-h-[44px] min-w-[44px] rounded-[8px] hover:bg-white/10">
          ‹
        </button>
        <span className="hidden px-1 sm:inline">
          {atual >= 0 ? `${atual + 1}/${SECOES.length} · ${SECOES[atual].curto}` : 'Capa'}
        </span>
        <button type="button" aria-label="Próxima seção" onClick={() => ir(atual + 1)} className="min-h-[44px] min-w-[44px] rounded-[8px] hover:bg-white/10">
          ›
        </button>
        <button
          type="button"
          onClick={() => setNotas((v) => !v)}
          className={`min-h-[44px] rounded-[8px] px-3 ${notas ? 'bg-[#E8649A]' : 'hover:bg-white/10'}`}
          title="Mostrar o roteiro de fala (tecla N)"
        >
          Roteiro
        </button>
        <button
          type="button"
          onClick={() => setInicio((v) => (v ? null : Date.now()))}
          className={`min-h-[44px] rounded-[8px] px-3 tabular-nums ${atrasado ? 'text-[#F4CDD4]' : ''} hover:bg-white/10`}
          title="Iniciar ou zerar o cronômetro (tecla T)"
        >
          {inicio ? `${fmt(agora)} / ${planejado} min` : `⏱ ${total} min`}
        </button>
      </div>
    </NotasCtx.Provider>
  )
}
