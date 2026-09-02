// src/app/masterclass/penteados/page.tsx
// MasterClass "Penteados que encantam e os produtos por trás", com Jéssica Silva.
// Tema claro (padrão DESIGN-SYSTEM.md). Planejamento: docs/briefing-eventos-setembro-2026.md
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { MC, MC_INSTRUCTOR } from '@/lib/masterclass-penteados'
import { GtmScript } from '@/components/ui/GtmScript'

// Above fold
import { MasterHeroPenteados } from '@/components/lp/masterclass-penteados/MasterHeroPenteados'
import { MasterLearnPenteados } from '@/components/lp/masterclass-penteados/MasterLearnPenteados'
import { MasterProductsPenteados } from '@/components/lp/masterclass-penteados/MasterProductsPenteados'
import { MasterAudiencePenteados } from '@/components/lp/masterclass-penteados/MasterAudiencePenteados'

// Below fold
import { MasterInstructorPenteados } from '@/components/lp/masterclass-penteados/MasterInstructorPenteados'
import { MasterDetailsPenteados } from '@/components/lp/masterclass-penteados/MasterDetailsPenteados'
import { MasterAccessPenteados } from '@/components/lp/masterclass-penteados/MasterAccessPenteados'
import { MasterFinalCtaPenteados } from '@/components/lp/masterclass-penteados/MasterFinalCtaPenteados'
import { FloatingWhatsAppPenteados } from '@/components/lp/masterclass-penteados/FloatingWhatsAppPenteados'
import { MasterFooterPenteados } from '@/components/lp/masterclass-penteados/MasterFooterPenteados'

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
const OG_IMAGE = `${SITE_URL}/images/masterclass/jessica-instrutora.webp`

const title = `MasterClass ${MC.title} com ${MC_INSTRUCTOR.name} | Bubbles Pet`
const description = `Aula ao vivo de banho e tosa em ${MC.dateFull} às ${MC.time}. Acesso liberado para compras a partir de R$399. Garanta a sua vaga.`

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  keywords: ['masterclass penteados', 'penteado pet', 'grooming', 'banho e tosa'],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title, description, url: PAGE_URL, siteName: 'Bubbles Pet', locale: 'pt_BR', type: 'website',
    images: [OG_IMAGE],
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
  name: `MasterClass ${MC.title} com ${MC_INSTRUCTOR.name}`,
  description,
  startDate: MC.targetDateISO,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: { '@type': 'VirtualLocation', url: PAGE_URL },
  image: [OG_IMAGE],
  organizer: { '@type': 'Organization', name: 'Bubbles Pet', url: SITE_URL },
}

export default function MasterclassPenteados() {
  return (
    <>
      <GtmScript id="GTM-5L9TD3PN" />

      {/* Dados estruturados do evento para resultados ricos no Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* Pulse do CTA + barra de rolagem no accent da marca (escopo desta página) */}
      <style>{`
        @keyframes mcp-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(61,184,92,0.45); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(61,184,92,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="mcp-pulse"] { animation: none !important; }
        }
        html { scrollbar-color: #E8649A #F4CDD4; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4CDD4; }
        ::-webkit-scrollbar-thumb { background-color: #E8649A; border-radius: 10px; }
      `}</style>

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

      <MasterStickyBarPenteados />
      <FloatingWhatsAppPenteados />
      <ExitPopupPenteados />
    </>
  )
}
