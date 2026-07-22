// src/app/masterclass/spitz-alemao-b/page.tsx
// Versão B (teste A/B) — mesmo conteúdo/dados da versão A, visual "Midnight Luxury & Cosmic Rose".
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-spitz'

// Above fold — carregamento imediato
import { MasterHeroB } from '@/components/lp/masterclass-b/MasterHeroB'
import { MasterLearnB } from '@/components/lp/masterclass-b/MasterLearnB'
import { MasterAudienceB } from '@/components/lp/masterclass-b/MasterAudienceB'

// Below fold — code split
import { MasterInstructorB } from '@/components/lp/masterclass-b/MasterInstructorB'
import { MasterDetailsB } from '@/components/lp/masterclass-b/MasterDetailsB'
import { MasterAccessB } from '@/components/lp/masterclass-b/MasterAccessB'
import { MasterFinalCtaB } from '@/components/lp/masterclass-b/MasterFinalCtaB'
import { MasterFooterB } from '@/components/lp/masterclass-b/MasterFooterB'
import { FloatingWhatsApp } from '@/components/lp/masterclass/FloatingWhatsApp'

const MasterProofB     = dynamic(() => import('@/components/lp/masterclass-b/MasterProofB').then(m => ({ default: m.MasterProofB })))
const MasterFaqB       = dynamic(() => import('@/components/lp/masterclass-b/MasterFaqB').then(m => ({ default: m.MasterFaqB })))
const MasterStickyBarB = dynamic(() => import('@/components/lp/masterclass-b/MasterStickyBarB').then(m => ({ default: m.MasterStickyBarB })))
const ExitPopupB       = dynamic(() => import('@/components/lp/masterclass-b/ExitPopupB').then(m => ({ default: m.ExitPopupB })))

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL_A = `${SITE_URL}/masterclass/${MC.slug}`
const OG_IMAGE = `${SITE_URL}/images/masterclass/guilherme-hero.webp`

const title = 'MasterClass Grátis de Spitz Alemão ao Vivo com Guilherme Mendes | Bubbles Pet'
const description =
  'Aula ao vivo e gratuita de banho e tosa de Spitz Alemão em 27/07 às 19h. Acesso liberado para compras acima de R$ 499. Garanta a sua vaga.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  // Variante de teste A/B: não indexar e apontar o canonical para a versão A,
  // evitando conteúdo duplicado no Google.
  alternates: {
    canonical: PAGE_URL_A,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title,
    description,
    url: PAGE_URL_A,
    siteName: 'Bubbles Pet',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 1500, alt: 'Guilherme Mendes, instrutor da MasterClass de Spitz Alemão' }],
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'MasterClass de Spitz Alemão com Guilherme Mendes',
  description,
  startDate: MC.targetDateISO,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'VirtualLocation',
    url: PAGE_URL_A,
  },
  image: [OG_IMAGE],
  organizer: {
    '@type': 'Organization',
    name: 'Bubbles Pet',
    url: SITE_URL,
  },
  performer: {
    '@type': 'Person',
    name: MC_INSTRUCTOR.name,
  },
  offers: {
    '@type': 'Offer',
    url: PAGE_URL_A,
    price: '0',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
  },
}

export default function MasterclassSpitzB() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Animação de pulse dos CTAs + barra de rolagem rosa (escopo desta página) */}
      <style>{`
        @keyframes mcb-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(244,205,212,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(244,205,212,0); }
        }
        html {
          scrollbar-color: #F4CDD4 #111111;
          scrollbar-width: thin;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #111111;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #F4CDD4;
          border-radius: 10px;
        }
      `}</style>

      <div className="bg-[#080808] min-h-screen">
        <main className="pb-24 md:pb-20">
          <MasterHeroB />
          <MasterLearnB />
          <MasterAudienceB />
          <MasterInstructorB />
          <MasterDetailsB />
          <MasterAccessB />
          <MasterProofB />
          <MasterFaqB />
          <MasterFinalCtaB />
        </main>
        <MasterFooterB />

        {/* Estímulos de conversão */}
        <MasterStickyBarB />
        <FloatingWhatsApp />
        <ExitPopupB />
      </div>
    </>
  )
}
