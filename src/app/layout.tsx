import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { UTMCapture } from '@/components/ui/UTMCapture'
import { BRAND } from '@/lib/constants'

const SITE_URL = 'https://ofertas.bubbles.com.br'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'optional',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Shampoo Pet Neutro Essential 5L — Bubbles Pet',
  description: 'Shampoo profissional para groomers. Diluição 1:5, rende 30L e ~300 banhos.',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bubbles Pet',
  url: SITE_URL,
  sameAs: [BRAND.instagram],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={figtree.className}>
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <UTMCapture />
        {children}
      </body>
    </html>
  )
}
