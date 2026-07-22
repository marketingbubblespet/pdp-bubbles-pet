// src/app/live-dia-do-tosador/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { LIVE } from '@/lib/live-tosador'

// Above fold — carregamento imediato
import { LiveHero } from '@/components/lp/live-tosador/LiveHero'
import { LiveReasons } from '@/components/lp/live-tosador/LiveReasons'
import { LiveHosts } from '@/components/lp/live-tosador/LiveHosts'
import { LiveGroupBenefits } from '@/components/lp/live-tosador/LiveGroupBenefits'

// Below fold — code split
import { LiveAudience } from '@/components/lp/live-tosador/LiveAudience'
import { LiveFinalCta } from '@/components/lp/live-tosador/LiveFinalCta'
import { LiveFooter } from '@/components/lp/live-tosador/LiveFooter'
import { LiveFloatingWhatsApp } from '@/components/lp/live-tosador/LiveFloatingWhatsApp'

const LiveFaq       = dynamic(() => import('@/components/lp/live-tosador/LiveFaq').then(m => ({ default: m.LiveFaq })))
const LiveStickyBar = dynamic(() => import('@/components/lp/live-tosador/LiveStickyBar').then(m => ({ default: m.LiveStickyBar })))
const LiveExitPopup = dynamic(() => import('@/components/lp/live-tosador/LiveExitPopup').then(m => ({ default: m.LiveExitPopup })))

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${LIVE.slug}`

const title = 'Live Dia do Tosador com a Bubbles | 26/07 às 19h'
const description = 'Live especial de Dia do Tosador em 26/07 às 19h, ao vivo no Instagram. Brindes, sorteio, cupons e novidades. Entre no grupo do WhatsApp e participe.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title, description, url: PAGE_URL, siteName: 'Bubbles Pet', locale: 'pt_BR', type: 'website',
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Live Dia do Tosador com a Bubbles',
  description,
  startDate: LIVE.targetDateISO,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: { '@type': 'VirtualLocation', url: PAGE_URL },
  organizer: { '@type': 'Organization', name: 'Bubbles Pet', url: SITE_URL },
  offers: { '@type': 'Offer', url: PAGE_URL, price: '0', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', validFrom: new Date().toISOString() },
}

export default function LiveDiaDoTosador() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* Pulse dos CTAs + barra de rolagem rosa (escopo desta página) */}
      <style>{`
        @keyframes live-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
        html { scrollbar-color: #F4CDD4 #111111; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #111111; }
        ::-webkit-scrollbar-thumb { background-color: #F4CDD4; border-radius: 10px; }
      `}</style>

      <div className="bg-[#080808] min-h-screen">
        <main className="pb-24 md:pb-20">
          <LiveHero />
          <LiveReasons />
          <LiveHosts />
          <LiveGroupBenefits />
          <LiveAudience />
          <LiveFaq />
          <LiveFinalCta />
        </main>
        <LiveFooter />

        {/* Estímulos de conversão */}
        <LiveStickyBar />
        <LiveFloatingWhatsApp />
        <LiveExitPopup />
      </div>
    </>
  )
}
