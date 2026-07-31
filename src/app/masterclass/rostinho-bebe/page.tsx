// src/app/masterclass/rostinho-bebe/page.tsx
// MasterClass "O Segredo Está no Banho" (rostinho bebê), com Tio Dan — visual "Midnight
// Luxury & Cosmic Rose" (mesmo tema escuro da masterclass de Spitz Alemão).
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-agosto'

// Above fold — carregamento imediato
import { MasterHeroAgosto } from '@/components/lp/masterclass-agosto/MasterHeroAgosto'
import { MasterLearnAgosto } from '@/components/lp/masterclass-agosto/MasterLearnAgosto'
import { MasterAudienceAgosto } from '@/components/lp/masterclass-agosto/MasterAudienceAgosto'

// Below fold — code split
import { MasterInstructorAgosto } from '@/components/lp/masterclass-agosto/MasterInstructorAgosto'
import { MasterDetailsAgosto } from '@/components/lp/masterclass-agosto/MasterDetailsAgosto'
import { MasterAccessAgosto } from '@/components/lp/masterclass-agosto/MasterAccessAgosto'
import { MasterFinalCtaAgosto } from '@/components/lp/masterclass-agosto/MasterFinalCtaAgosto'
import { FloatingWhatsAppAgosto } from '@/components/lp/masterclass-agosto/FloatingWhatsAppAgosto'
import { MasterFooterB } from '@/components/lp/masterclass-b/MasterFooterB'

const MasterFaqAgosto       = dynamic(() => import('@/components/lp/masterclass-agosto/MasterFaqAgosto').then(m => ({ default: m.MasterFaqAgosto })))
const MasterStickyBarAgosto = dynamic(() => import('@/components/lp/masterclass-agosto/MasterStickyBarAgosto').then(m => ({ default: m.MasterStickyBarAgosto })))
const ExitPopupAgosto       = dynamic(() => import('@/components/lp/masterclass-agosto/ExitPopupAgosto').then(m => ({ default: m.ExitPopupAgosto })))

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/masterclass/${MC.slug}`
const OG_IMAGE = `${SITE_URL}/images/masterclass/tio-dan-hero.webp`

const title = 'MasterClass O Segredo Está no Banho: Rostinho Bebê com Tio Dan | Bubbles Pet'
const description =
  'Aula ao vivo com Tio Dan em 24/08 às 19h: a base do banho que garante o rostinho bebê perfeito. Acesso liberado na compra de qualquer item da Linha PRO. Garanta a sua vaga.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  keywords: [
    'masterclass rostinho bebê',
    'tosa rostinho bebê',
    'curso groomer banho e tosa',
    'Tio Dan groomer',
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
    images: [{ url: OG_IMAGE, width: 1440, height: 1440, alt: 'Tio Dan, instrutor da MasterClass de Rostinho Bebê' }],
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
  name: 'MasterClass O Segredo Está no Banho: Rostinho Bebê com Tio Dan',
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
}

export default function MasterclassRostinhoBebe() {
  return (
    <>
      {/* Dados estruturados do evento para resultados ricos no Google */}
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
          <MasterHeroAgosto />
          <MasterLearnAgosto />
          <MasterAudienceAgosto />
          <MasterInstructorAgosto />
          <MasterDetailsAgosto />
          <MasterAccessAgosto />
          <MasterFaqAgosto />
          <MasterFinalCtaAgosto />
        </main>
        <MasterFooterB />

        {/* Estímulos de conversão */}
        <MasterStickyBarAgosto />
        <FloatingWhatsAppAgosto />
        <ExitPopupAgosto />
      </div>
    </>
  )
}
