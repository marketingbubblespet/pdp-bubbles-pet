// src/app/masterclass/spitz-alemao/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-spitz'

// Above fold — carregamento imediato
import { MasterHero } from '@/components/lp/masterclass/MasterHero'
import { MasterLearn } from '@/components/lp/masterclass/MasterLearn'
import { MasterAudience } from '@/components/lp/masterclass/MasterAudience'

// Below fold — code split
import { MasterInstructor } from '@/components/lp/masterclass/MasterInstructor'
import { MasterDetails } from '@/components/lp/masterclass/MasterDetails'
import { MasterAccess } from '@/components/lp/masterclass/MasterAccess'
import { MasterFinalCta } from '@/components/lp/masterclass/MasterFinalCta'
import { MasterFooter } from '@/components/lp/masterclass/MasterFooter'
import { FloatingWhatsApp } from '@/components/lp/masterclass/FloatingWhatsApp'

const MasterProof     = dynamic(() => import('@/components/lp/masterclass/MasterProof').then(m => ({ default: m.MasterProof })))
const MasterFaq       = dynamic(() => import('@/components/lp/masterclass/MasterFaq').then(m => ({ default: m.MasterFaq })))
const MasterStickyBar = dynamic(() => import('@/components/lp/masterclass/MasterStickyBar').then(m => ({ default: m.MasterStickyBar })))
const ExitPopup       = dynamic(() => import('@/components/lp/masterclass/ExitPopup').then(m => ({ default: m.ExitPopup })))

const SITE_URL = 'https://www.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/masterclass/${MC.slug}`
const OG_IMAGE = `${SITE_URL}/images/masterclass/guilherme-hero.webp`

const title = 'MasterClass Grátis de Spitz Alemão ao Vivo com Guilherme Mendes | Bubbles Pet'
const description =
  'Aula ao vivo e gratuita de banho e tosa de Spitz Alemão em 27/07 às 19h. Acesso liberado para compras acima de R$ 499. Garanta a sua vaga.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'masterclass spitz alemão',
    'banho e tosa spitz',
    'curso groomer spitz alemão',
    'Guilherme Mendes groomer',
    'Bubbles Pet',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    siteName: 'Bubbles Pet',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 1500, alt: 'Guilherme Mendes, instrutor da MasterClass de Spitz Alemão' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [OG_IMAGE],
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
    url: PAGE_URL,
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
    url: PAGE_URL,
    price: '0',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
  },
}

export default function MasterclassSpitz() {
  return (
    <>
      {/* Dados estruturados do evento para resultados ricos no Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Animação de pulse dos CTAs + barra de rolagem rosa (escopo desta página) */}
      <style>{`
        @keyframes mc-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(61,184,92,0.5); }
          50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(61,184,92,0); }
        }
        html {
          scrollbar-color: #E8649A #F4CDD4;
          scrollbar-width: thin;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #F4CDD4;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #E8649A;
          border-radius: 10px;
        }
      `}</style>

      <main className="pb-24 md:pb-20">
        <MasterHero />
        <MasterLearn />
        <MasterAudience />
        <MasterInstructor />
        <MasterDetails />
        <MasterAccess />
        <MasterProof />
        <MasterFaq />
        <MasterFinalCta />
      </main>
      <MasterFooter />

      {/* Estímulos de conversão */}
      <MasterStickyBar />
      <FloatingWhatsApp />
      <ExitPopup />
    </>
  )
}
