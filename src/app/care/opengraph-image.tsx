// Imagem de capa gerada por código para o link da página (WhatsApp, Instagram, etc.).
// Não depende de foto real dos produtos ainda.
import { ImageResponse } from 'next/og'
import { CARE } from '@/lib/care'

export const alt = 'Bubbles Care: revenda para petshops'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7F7F7',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            background: '#fdf0f3',
            borderRadius: 999,
            padding: '14px 32px',
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#E8649A',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Lançamento · Bubbles Care
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 800,
            color: '#0F0C0D',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 960,
          }}
        >
          Revenda sem medo de encalhar
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#6B7280',
            marginTop: 28,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          {CARE.tagline}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 60,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: '#E8649A',
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 700, color: '#0F0C0D' }}>Bubbles Pet</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
