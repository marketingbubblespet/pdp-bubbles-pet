// Imagem de capa (P-07) do link da LP /distribuidor-care, gerada por código: logo, H1 e "até 45% de margem".
// Pesos só até 600 (o DS proíbe 700 ou mais), sem foto e sem valor mínimo.
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { DISTRIBUIDOR_CARE_HERO, DISTRIBUIDOR_CARE_SEO } from '@/lib/distribuidor-care'

export const alt = DISTRIBUIDOR_CARE_SEO.ogAlt
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/images/bubbles-logo.svg'), 'base64')
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#F7F7F7',
          padding: '80px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={`data:image/svg+xml;base64,${logo}`} width={236} height={56} />
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 500,
            color: '#0D0C0D',
            lineHeight: 1.15,
            maxWidth: 1000,
            marginTop: 48,
          }}
        >
          {DISTRIBUIDOR_CARE_HERO.h1}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            background: '#F4CDD4',
            borderRadius: 999,
            padding: '14px 32px',
            fontSize: 30,
            fontWeight: 600,
            color: '#0D0C0D',
          }}
        >
          até 45% de margem
        </div>
      </div>
    ),
    { ...size }
  )
}
