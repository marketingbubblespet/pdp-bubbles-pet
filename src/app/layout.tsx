import type { Metadata } from 'next'
import { Poppins, Lobster_Two } from 'next/font/google'
import './globals.css'
import { UTMCapture } from '@/components/ui/UTMCapture'
import { BRAND } from '@/lib/constants'

const SITE_URL = 'https://ofertas.bubbles.com.br'

// Pesos permitidos pela marca: 400 (corpo), 500 (títulos), 600 (ênfase/CTA).
// 700+ é proibido — nunca adicionar '700' aqui.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'optional',
  preload: true,
  variable: '--font-poppins',
})

// Fonte decorativa (uso pontual, ex: assinatura/destaque de marca), não é a fonte de corpo.
const lobsterTwo = Lobster_Two({
  subsets: ['latin'],
  weight: ['400'],
  display: 'optional',
  preload: false,
  variable: '--font-lobster-two',
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
    <html lang="pt-BR" className={`${poppins.className} ${poppins.variable} ${lobsterTwo.variable}`}>
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
