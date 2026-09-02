import { ImageResponse } from 'next/og'
import { MC } from '@/lib/masterclass-penteados'

export const alt = 'MasterClass Penteados que encantam e os produtos por trás'
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
            marginBottom: 36,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 700, color: '#E8649A', letterSpacing: 2, textTransform: 'uppercase' }}>
            MasterClass · Setembro
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 54,
            fontWeight: 800,
            color: '#0F0C0D',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {MC.title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 36,
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: 16,
            padding: '18px 34px',
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 800, color: '#0F0C0D' }}>
            {MC.weekday}, {MC.date} às {MC.time}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 48 }}>
          <div style={{ display: 'flex', width: 36, height: 36, borderRadius: 10, background: '#E8649A' }} />
          <span style={{ fontSize: 28, fontWeight: 700, color: '#0F0C0D' }}>Bubbles Pet</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
