// src/app/masterclass/coloracao-pet/page.tsx
// MasterClass "Coloração pet sem mistério", com Lari Stephanie (29/10/2026).
// Tema claro (DESIGN-SYSTEM.md), mesmo padrão de /masterclass/penteados-que-encantam.
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { MC, MC_INSTRUCTOR, MC_HERO_IMAGE } from '@/lib/masterclass-coloracao'
import { GtmScript } from '@/components/ui/GtmScript'

// Above fold
import { MasterHeroColoracao } from '@/components/lp/masterclass-coloracao/MasterHeroColoracao'
import { MasterLearnColoracao } from '@/components/lp/masterclass-coloracao/MasterLearnColoracao'
import { MasterGalleryColoracao } from '@/components/lp/masterclass-coloracao/MasterGalleryColoracao'
import { MasterLineColoracao } from '@/components/lp/masterclass-coloracao/MasterLineColoracao'
import { MasterProductsColoracao } from '@/components/lp/masterclass-coloracao/MasterProductsColoracao'
import { MasterAudienceColoracao } from '@/components/lp/masterclass-coloracao/MasterAudienceColoracao'

// Below fold
import { MasterInstructorColoracao } from '@/components/lp/masterclass-coloracao/MasterInstructorColoracao'
import { MasterDetailsColoracao } from '@/components/lp/masterclass-coloracao/MasterDetailsColoracao'
import { MasterAccessColoracao } from '@/components/lp/masterclass-coloracao/MasterAccessColoracao'
import { MasterFinalCtaColoracao } from '@/components/lp/masterclass-coloracao/MasterFinalCtaColoracao'
import { MasterFooterColoracao } from '@/components/lp/masterclass-coloracao/MasterFooterColoracao'
import { FloatingWhatsAppColoracao } from '@/components/lp/masterclass-coloracao/FloatingWhatsAppColoracao'

const MasterFaqColoracao = dynamic(() =>
  import('@/components/lp/masterclass-coloracao/MasterFaqColoracao').then((m) => ({ default: m.MasterFaqColoracao })),
)
const MasterStickyBarColoracao = dynamic(() =>
  import('@/components/lp/masterclass-coloracao/MasterStickyBarColoracao').then((m) => ({ default: m.MasterStickyBarColoracao })),
)
const ExitPopupColoracao = dynamic(() =>
  import('@/components/lp/masterclass-coloracao/ExitPopupColoracao').then((m) => ({ default: m.ExitPopupColoracao })),
)

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/masterclass/${MC.slug}`
const OG_IMAGE = `${SITE_URL}${MC_HERO_IMAGE.src}`

const title = 'MasterClass Coloração Pet sem Mistério com Lari Stephanie | Bubbles Pet'
const description =
  'Aula ao vivo de coloração pet em 29/10 às 19h. Acesso liberado na compra de qualquer produto Collora ou em compras a partir de R$ 399.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  keywords: ['masterclass coloração pet', 'coloração pet groomer', 'curso coloração pet', 'Collora', 'Lari Stephanie', 'Bubbles Pet'],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    siteName: 'Bubbles Pet',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1080, height: 1350, alt: MC_HERO_IMAGE.alt }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `MasterClass: ${MC.title}`,
  description,
  startDate: MC.targetDateISO,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: { '@type': 'VirtualLocation', url: PAGE_URL },
  image: [OG_IMAGE],
  organizer: { '@type': 'Organization', name: 'Bubbles Pet', url: SITE_URL },
  performer: { '@type': 'Person', name: MC_INSTRUCTOR.name },
} as const

export default function MasterclassColoracao() {
  return (
    <>
      <GtmScript id="GTM-5L9TD3PN" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      <style>{`
        @keyframes mcc-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(61,184,92,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(61,184,92,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="mcc-pulse"] { animation: none !important; }
        }
      `}</style>

      <div className="bg-[#F7F7F7] min-h-screen">
        <main className="pb-24 md:pb-20">
          <MasterHeroColoracao />
          <MasterLearnColoracao />
          <MasterGalleryColoracao />
          <MasterLineColoracao />
          <MasterProductsColoracao />
          <MasterAudienceColoracao />
          <MasterInstructorColoracao />
          <MasterDetailsColoracao />
          <MasterAccessColoracao />
          <MasterFaqColoracao />
          <MasterFinalCtaColoracao />
        </main>
        <MasterFooterColoracao />

        <MasterStickyBarColoracao />
        <FloatingWhatsAppColoracao />
        <ExitPopupColoracao />
      </div>
    </>
  )
}
