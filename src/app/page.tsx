import Link from 'next/link'

const pages = [
  {
    href: '/essential',
    label: 'Essential 5L',
    description: 'Shampoo Neutro Professional — LP de vendas',
  },
]

export default function Sitemap() {
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
