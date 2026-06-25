import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { UTMCapture } from '@/components/ui/UTMCapture'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'optional',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Shampoo Pet Neutro Essential 5L — Bubbles Pet',
  description: 'Shampoo profissional para groomers. Diluição 1:5, rende 30L e ~300 banhos.',
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
        <UTMCapture />
        {children}

        {/* Google: GA4 (x2) + Google Ads (conversão e remarketing) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KLHVV853CE"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KLHVV853CE');
          gtag('config', 'G-10FB3FBV6V');
          gtag('config', 'AW-10809385596');
        `}</Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','1244183519410761');
          fbq('track','PageView');
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1244183519410761&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
