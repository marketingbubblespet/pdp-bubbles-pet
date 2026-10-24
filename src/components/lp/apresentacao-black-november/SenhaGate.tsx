'use client'
// Tela de senha da página /apresentacao-black-november, no mesmo padrão de /estudos-distribuidor-care.
// É uma trava de navegação, não segurança de verdade: a senha fica no código.
import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react'

const PASSWORD = 'black2026'
const SESSION_KEY = 'apresentacao_black_unlocked'

function subscribe() {
  return () => {}
}

export function SenhaGate({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(SESSION_KEY) === '1',
    () => null,
  )
  const [manualUnlock, setManualUnlock] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setManualUnlock(true)
    } else {
      setError(true)
    }
  }

  const unlocked = manualUnlock || stored
  if (unlocked === null) return <main className="min-h-screen bg-[#F7F7F7]" />
  if (unlocked) return <>{children}</>

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F7] p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[340px] rounded-[12px] border border-[#E5E7EB] bg-white p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#E8649A]">Bubbles Pet · diretoria</p>
        <h1 className="mb-4 text-xl font-medium text-[#0D0C0D]">Plano da Black November 2026</h1>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError(false)
          }}
          placeholder="Senha"
          aria-label="Senha"
          autoFocus
          className={`mb-3 min-h-[44px] w-full rounded-[12px] border px-3 text-sm ${error ? 'border-[#E8649A]' : 'border-[#E5E7EB]'}`}
        />
        {error && <p className="mb-3 text-xs text-[#E8649A]">Senha incorreta.</p>}
        <button type="submit" className="min-h-[44px] w-full rounded-[12px] bg-[#0D0C0D] px-4 text-sm font-semibold text-white">
          Entrar
        </button>
      </form>
    </main>
  )
}
