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
  {
    href: '/care-b',
    label: 'Bubbles Care (Revenda, versão B)',
    description: 'Variante de teste A/B: formulário na primeira dobra, foco B2B',
  },
  {
    href: '/masterclass/rostinho-bebe',
    label: 'MasterClass Rostinho Bebê',
    description: 'Aula ao vivo de 24/08 com Tio Dan: a base do banho pro rostinho bebê perfeito',
  },
  {
    href: '/live-care',
    label: 'Live de Lançamento Linha Care',
    description: 'Live de 23/08 com Amanda e Ellen: captura para o grupo do WhatsApp',
  },
  {
    href: '/captacao',
    label: 'Captação de Distribuidores',
    description: 'Página de captação para quem quer se tornar distribuidor Bubbles',
  },
  {
    href: '/pet-south',
    label: 'Captação Pet South America',
    description: 'Variante de captação de distribuidores co-branded com a Pet South America',
  },
  {
    href: '/masterclass/penteados-que-encantam',
    label: 'MasterClass Penteados que Encantam',
    description: 'Aula ao vivo de 28/09 com Jéssica Silva: acesso liberado para compras acima de R$ 399',
  },
  {
    href: '/nomenclatura',
    label: 'Gerador de Nomenclatura de Anúncios (interno)',
    description: 'Ferramenta da social media para padronizar o nome dos criativos de Meta Ads. Oculta, sem indexação.',
  },
]

// Relatórios de mídia paga: dois tipos diferentes, por isso ficam numa seção à parte da
// lista de LPs acima. `tipo: 'rota'` é uma página Next.js de verdade (clicável, /planos).
// `tipo: 'gerado'` é um arquivo HTML estático do scripts/gerar-relatorio.mjs, copiado pra
// public/relatorios/ pra ficar servido pelo próprio Next.js — funciona igual em
// localhost:3000 e, depois do deploy, no domínio de produção (o gerador continua
// escrevendo em output/ também; a cópia em public/ é o que fica navegável pelo site).
const relatorios: Array<{ tipo: 'rota' | 'gerado'; href: string; label: string; description: string }> = [
  {
    tipo: 'rota',
    href: '/planos',
    label: 'Planos de ação (Next.js, descontinuado)',
    description: 'Protótipo em Next.js do revisor de mídia paga. Substituído pelo gerador estático abaixo — deixado no ar sem novos investimentos.',
  },
  {
    tipo: 'gerado',
    href: '/relatorios/bubbles-2026-09-13/index.html',
    label: 'Relatório · Bubbles · semana 07 a 13/09',
    description: 'Gerado por scripts/gerar-relatorio.mjs a partir de projetos/relatorio-bubbles/entrada.md (senha própria).',
  },
  {
    tipo: 'gerado',
    href: '/relatorios/bubbles-2026-09-13-v2/index.html',
    label: 'Relatório · Bubbles · semana 07 a 13/09 (v2, comparação de ajustes)',
    description: 'Segunda versão gerada com os ajustes de glossário/cor/tabela, numa pasta separada para comparar com a de cima.',
  },
  {
    tipo: 'gerado',
    href: '/relatorios/bubbles-2026-09-16/index.html',
    label: 'Relatório · Bubbles · semana 10 a 16/09 (unificado Meta + Google)',
    description: 'Gerado a partir do .md real do projeto bubbles-gerador-de-ads (2026-09_unificado_semanal-7d.md), Meta e Google no mesmo relatório.',
  },
  {
    tipo: 'rota',
    href: '/planos/2026-09-16-bubbles-unificado',
    label: 'Relatório (Next.js) · Bubbles · Meta + Google Ads · semana 10 a 16/09',
    description: 'Mesmo .md de 16/09, Meta e Google juntos na mesma página, renderizado no sistema em Next.js (/planos) — senha própria.',
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
      <main style={{ fontFamily: 'Poppins, sans-serif', background: '#F7F7F7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: 32, maxWidth: 340, width: '100%' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8649A', marginBottom: 8 }}>
            Bubbles Pet
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#0F0C0D', marginBottom: 16 }}>
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
            style={{ width: '100%', background: '#3DB85C', color: '#fff', fontWeight: 600, fontSize: 14, padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
          >
            Entrar
          </button>
        </form>
      </main>
    )
  }

  return (
    <main style={{ fontFamily: 'Poppins, sans-serif', background: '#F7F7F7', minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8649A', marginBottom: 8 }}>
          Bubbles Pet
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 500, color: '#0F0C0D', marginBottom: 4 }}>
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
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#0F0C0D', margin: 0 }}>{page.label}</p>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>{page.description}</p>
                </div>
                <span style={{ color: '#E8649A', fontSize: 18, marginLeft: 16 }}>→</span>
              </Link>
            </li>
          ))}
        </ul>

        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8649A', margin: '48px 0 8px' }}>
          Relatórios de mídia paga
        </p>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
          Revisão semanal de campanhas. Os &quot;gerados&quot; são HTML estático servido pelo próprio site, com senha própria.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {relatorios.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                target={r.tipo === 'gerado' ? '_blank' : undefined}
                rel={r.tipo === 'gerado' ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: '#fff', border: r.tipo === 'gerado' ? '1px dashed #E5E7EB' : '1px solid #E5E7EB',
                  borderRadius: 10, padding: '16px 20px', textDecoration: 'none',
                }}
              >
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#0F0C0D', margin: 0 }}>{r.label}</p>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>{r.description}</p>
                </div>
                <span style={{ color: '#E8649A', fontSize: 18, marginLeft: 16 }}>→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
