// Imagem de capa gerada por código para o link da página (WhatsApp, Instagram, etc.).
import { ImageResponse } from 'next/og'

export const alt = 'Seja um distribuidor Bubbles'
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
          background: '#0F0C0D',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            background: 'rgba(244,205,212,0.1)',
            borderRadius: 999,
            padding: '14px 32px',
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#F4CDD4',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Captação · Distribuidores Bubbles
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 56,
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 960,
          }}
        >
          Domine a sua região com a marca que define o padrão
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 28,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Margens competitivas, suporte 360º e logística ágil
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
              background: '#F4CDD4',
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF' }}>Bubbles Pet</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
