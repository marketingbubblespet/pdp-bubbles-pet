// src/app/masterclass/penteados-que-encantam/page.tsx
// MasterClass "Penteados que encantam e os produtos por trás" (28/09/2026).
// Tema visual claro (DESIGN-SYSTEM.md), diferente das demais MasterClass (escuras).
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-penteados'
import { GtmScript } from '@/components/ui/GtmScript'

// Above fold — carregamento imediato
import { MasterHeroPenteados } from '@/components/lp/masterclass-penteados/MasterHeroPenteados'
import { MasterLearnPenteados } from '@/components/lp/masterclass-penteados/MasterLearnPenteados'
import { MasterProductsPenteados } from '@/components/lp/masterclass-penteados/MasterProductsPenteados'
import { MasterAudiencePenteados } from '@/components/lp/masterclass-penteados/MasterAudiencePenteados'

// Below fold — code split
import { MasterInstructorPenteados } from '@/components/lp/masterclass-penteados/MasterInstructorPenteados'
import { MasterDetailsPenteados } from '@/components/lp/masterclass-penteados/MasterDetailsPenteados'
import { MasterAccessPenteados } from '@/components/lp/masterclass-penteados/MasterAccessPenteados'
import { MasterFinalCtaPenteados } from '@/components/lp/masterclass-penteados/MasterFinalCtaPenteados'
import { MasterFooterPenteados } from '@/components/lp/masterclass-penteados/MasterFooterPenteados'
import { FloatingWhatsAppPenteados } from '@/components/lp/masterclass-penteados/FloatingWhatsAppPenteados'

const MasterFaqPenteados = dynamic(() =>
  import('@/components/lp/masterclass-penteados/MasterFaqPenteados').then((m) => ({ default: m.MasterFaqPenteados })),
)
const MasterStickyBarPenteados = dynamic(() =>
  import('@/components/lp/masterclass-penteados/MasterStickyBarPenteados').then((m) => ({ default: m.MasterStickyBarPenteados })),
)
const ExitPopupPenteados = dynamic(() =>
  import('@/components/lp/masterclass-penteados/ExitPopupPenteados').then((m) => ({ default: m.ExitPopupPenteados })),
)

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/masterclass/${MC.slug}`
const OG_IMAGE = `${SITE_URL}${MC_INSTRUCTOR.photo}`

const title = 'MasterClass Penteados que Encantam com Jéssica Silva | Bubbles Pet'
const description =
  'Aula ao vivo de penteados pet em 28/09 às 19h. Acesso liberado para compras acima de R$ 399. Garanta a sua vaga.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  keywords: [
    'masterclass penteados pet',
    'penteado pet groomer',
    'curso groomer penteados',
    'Jéssica Silva groomer',
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
    images: [{ url: OG_IMAGE, width: 1255, height: 1673, alt: 'Jéssica Silva, instrutora da MasterClass de Penteados' }],
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
  name: 'MasterClass: Penteados que encantam e os produtos por trás',
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
    price: '399',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
  },
} as const

export default function MasterclassPenteados() {
  return (
    <>
      <GtmScript id="GTM-5L9TD3PN" />
      {/* Dados estruturados do evento para resultados ricos no Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Animação de pulse dos CTAs (escopo desta página) */}
      <style>{`
        @keyframes mcp-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(61,184,92,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(61,184,92,0); }
        }
      `}</style>

      <div className="bg-[#F7F7F7] min-h-screen">
        <main className="pb-24 md:pb-20">
          <MasterHeroPenteados />
          <MasterLearnPenteados />
          <MasterProductsPenteados />
          <MasterAudiencePenteados />
          <MasterInstructorPenteados />
          <MasterDetailsPenteados />
          <MasterAccessPenteados />
          <MasterFaqPenteados />
          <MasterFinalCtaPenteados />
        </main>
        <MasterFooterPenteados />

        {/* Estímulos de conversão */}
        <MasterStickyBarPenteados />
        <FloatingWhatsAppPenteados />
        <ExitPopupPenteados />
      </div>
    </>
  )
}
