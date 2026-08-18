// src/app/live-care/page.tsx
// LP da Live de Lançamento da Linha Care. Planejamento em docs/lives/plano-lp-live-care.md
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { LIVE_CARE } from '@/lib/live-care'
import { GtmScript } from '@/components/ui/GtmScript'

// Above fold, carregamento imediato
import { LiveCareHero } from '@/components/lp/live-care/LiveCareHero'
import { LiveCareReasons } from '@/components/lp/live-care/LiveCareReasons'
import { LiveCareLineup } from '@/components/lp/live-care/LiveCareLineup'

// Below fold
import { LiveCareGroupBenefits } from '@/components/lp/live-care/LiveCareGroupBenefits'
import { LiveCareHosts } from '@/components/lp/live-care/LiveCareHosts'
import { LiveCarePrizes } from '@/components/lp/live-care/LiveCarePrizes'
import { LiveCareAudience } from '@/components/lp/live-care/LiveCareAudience'
import { LiveCareFinalCta } from '@/components/lp/live-care/LiveCareFinalCta'
import { LiveCareFooter } from '@/components/lp/live-care/LiveCareFooter'
import { LiveCareFloatingWhatsApp } from '@/components/lp/live-care/LiveCareFloatingWhatsApp'

// Code split: só carregam quando necessário
const LiveCareFaq = dynamic(() =>
  import('@/components/lp/live-care/LiveCareFaq').then((m) => ({ default: m.LiveCareFaq })),
)
const LiveCareStickyBar = dynamic(() =>
  import('@/components/lp/live-care/LiveCareStickyBar').then((m) => ({ default: m.LiveCareStickyBar })),
)
const LiveCareExitPopup = dynamic(() =>
  import('@/components/lp/live-care/LiveCareExitPopup').then((m) => ({ default: m.LiveCareExitPopup })),
)

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${LIVE_CARE.slug}`

const title = 'Live de Lançamento Linha Care · 23/08 às 19h | Bubbles Pet'
const description =
  'Live gratuita no dia 23 de agosto às 19h: conheça a Linha Care e veja como transformar cada banho em uma nova oportunidade de venda no seu pet shop. Entre no grupo do WhatsApp.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    siteName: 'Bubbles Pet',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Live de Lançamento da Linha Bubbles Care',
  description,
  startDate: LIVE_CARE.targetDateISO,
  endDate: LIVE_CARE.endDateISO,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'VirtualLocation',
    url: LIVE_CARE.instagramUrl,
  },
  organizer: {
    '@type': 'Organization',
    name: 'Bubbles Pet',
    url: SITE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    url: PAGE_URL,
  },
}

export default function LiveCarePage() {
  return (
    <>
      <GtmScript id="GTM-5L9TD3PN" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Pulse dos CTAs + barra de rolagem no accent da marca (escopo desta página) */}
      <style>{`
        @keyframes livecare-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(61,184,92,0.45); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(61,184,92,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="livecare-pulse"] { animation: none !important; }
        }
        html { scrollbar-color: #E8649A #F4CDD4; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4CDD4; }
        ::-webkit-scrollbar-thumb { background-color: #E8649A; border-radius: 10px; }
      `}</style>

      <main className="pb-24 md:pb-20">
        <LiveCareHero />
        <LiveCareReasons />
        <LiveCareLineup />
        <LiveCareGroupBenefits />
        <LiveCareHosts />
        <LiveCarePrizes />
        <LiveCareAudience />
        <LiveCareFaq />
        <LiveCareFinalCta />
      </main>
      <LiveCareFooter />

      {/* Estímulos de conversão */}
      <LiveCareStickyBar />
      <LiveCareFloatingWhatsApp />
      <LiveCareExitPopup />
    </>
  )
}
