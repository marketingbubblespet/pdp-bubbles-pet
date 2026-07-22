'use client'
import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'

const pages = [
  {
    href: '/essential',
    label: 'Essential 5L',
    description: 'Shampoo Neutro Professional — LP de vendas',
  },
  {
    href: '/masterclass/spitz-alemao',
    label: 'MasterClass Spitz Alemão',
    description: 'Página de captura da aula ao vivo com Guilherme Mendes',
  },
  {
    href: '/masterclass/spitz-alemao-b',
    label: 'MasterClass Spitz Alemão (versão B)',
    description: 'Variante de teste A/B, tema escuro "Midnight Luxury & Cosmic Rose"',
  },
  {
    href: '/live-dia-do-tosador',
    label: 'Live Dia do Tosador',
    description: 'Página de captura para a live de 26/07 com Mariane Gutierres e Anna Grandi',
  },
  {
    href: '/care',
    label: 'Bubbles Care (Revenda)',
    description: 'Pré-lançamento para petshops: cadastro de revenda da linha Care',
  },
]

const PASSWORD = 'mariane'
const SESSION_KEY = 'sitemap_unlocked'

function isLocalhost() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname)
}

// sessionStorage/hostname não mudam sozinhos durante o ciclo de vida do componente,
// então não há evento externo para assinar de verdade.
function subscribe() {
  return () => {}
}

export default function Sitemap() {
  // Lido via useSyncExternalStore (evita setState-em-effect e mismatch de hidratação:
  // o servidor recebe "checando", o client troca para o valor real assim que hidrata).
  const storeUnlocked = useSyncExternalStore(
    subscribe,
    () => isLocalhost() || sessionStorage.getItem(SESSION_KEY) === '1',
    () => null,
  )
  const [manualUnlock, setManualUnlock] = useState(false)
  const unlocked = manualUnlock ? true : storeUnlocked

  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setManualUnlock(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (unlocked === null) {
    return <main style={{ minHeight: '100vh', background: '#F7F7F7' }} />
  }

  if (!unlocked) {
    return (
      <main style={{ fontFamily: 'Figtree, sans-serif', background: '#F7F7F7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: 32, maxWidth: 340, width: '100%' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8649A', marginBottom: 8 }}>
            Bubbles Pet
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0F0C0D', marginBottom: 16 }}>
            Área restrita
          </h1>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            placeholder="Senha"
            autoFocus
            style={{ width: '100%', boxSizing: 'border-box', fontSize: 14, padding: '10px 12px', borderRadius: 8, border: `1px solid ${error ? '#E8649A' : '#E5E7EB'}`, marginBottom: error ? 8 : 16 }}
          />
          {error && (
            <p style={{ fontSize: 12, color: '#E8649A', marginBottom: 12 }}>Senha incorreta.</p>
          )}
          <button
            type="submit"
            style={{ width: '100%', background: '#3DB85C', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
          >
            Entrar
          </button>
        </form>
      </main>
    )
  }

  return (
    <main style={{ fontFamily: 'Figtree, sans-serif', background: '#F7F7F7', minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8649A', marginBottom: 8 }}>
          Bubbles Pet
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F0C0D', marginBottom: 4 }}>
          Mapa de páginas
        </h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 40 }}>
          Todas as landing pages do projeto.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: 10,
                  padding: '16px 20px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
              >
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0C0D', margin: 0 }}>{page.label}</p>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>{page.description}</p>
                </div>
                <span style={{ color: '#E8649A', fontSize: 18, marginLeft: 16 }}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
