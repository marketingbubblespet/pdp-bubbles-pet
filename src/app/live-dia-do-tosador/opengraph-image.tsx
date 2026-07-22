// Imagem de capa gerada por código para o link da live (WhatsApp, Instagram, etc.).
// Não depende de foto real: assim que a arte oficial ou as fotos das apresentadoras
// chegarem, este arquivo pode ser trocado por um opengraph-image.jpg/png estático.
import { ImageResponse } from 'next/og'
import { LIVE } from '@/lib/live-tosador'

export const alt = 'Live Dia do Tosador com a Bubbles'
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
          background: '#080808',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            background: '#1A1A1A',
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
            {LIVE.dateFull} · Dia do Tosador
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          Live Dia do Tosador com a Bubbles
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 28,
          }}
        >
          {`Ao vivo no ${LIVE.platform} · ${LIVE.weekday}, ${LIVE.date} às ${LIVE.time}`}
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
