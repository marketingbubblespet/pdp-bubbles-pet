import type { NextConfig } from 'next'

// CSP das páginas renderizadas pelo Next. Espelha o Content-Security-Policy do netlify.toml
// (que só chega aos arquivos de public/). Ao mudar uma, mude a outra.
const GOOGLE_E_META = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://analytics.google.com',
  'https://*.google.com',
  'https://*.doubleclick.net',
]

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    ...GOOGLE_E_META,
    'https://www.googleadservices.com',
    'https://connect.facebook.net',
    'https://www.facebook.com',
    'https://analytics.tiktok.com',
    'https://sc-static.net',
    'https://www.youtube.com',
    'https://s.ytimg.com',
    'https://www.clarity.ms',
    'https://*.clarity.ms',
  ].join(' '),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  [
    "img-src 'self' data:",
    'https://cdn.shopify.com',
    'https://www.bubbles.com.br',
    'https://img.youtube.com',
    'https://i.ytimg.com',
    'https://www.facebook.com',
    'https://*.google.com',
    'https://*.googleusercontent.com',
    'https://*.doubleclick.net',
    'https://analytics.tiktok.com',
    'https://bubbles.gabrielxavier.online',
  ].join(' '),
  "font-src 'self' data: https://fonts.gstatic.com",
  "media-src 'self' https://cdn.shopify.com https://www.bubbles.com.br",
  [
    "connect-src 'self'",
    ...GOOGLE_E_META,
    'https://connect.facebook.net',
    'https://www.facebook.com',
    'https://analytics.tiktok.com',
    'https://www.bubbles.com.br',
    'https://wascer.bubbles.com.br',
    'https://api-admin.sellum.app',
    'https://*.clarity.ms',
  ].join(' '),
  'frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.facebook.com https://td.doubleclick.net',
]

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  // Modo de teste: Report-Only só avisa no console, não bloqueia nada. Trocar para
  // Content-Security-Policy depois de 7 dias sem aviso novo.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy-Report-Only', value: cspDirectives.join('; ') },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/masterclass/spitz-alemao-b',
        destination: '/masterclass/spitz-alemao',
        permanent: false,
      },
      {
        source: '/masterclass/penteados',
        destination: '/masterclass/penteados-que-encantam',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'www.bubbles.com.br' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480, 560],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75],
  },
}

export default nextConfig
