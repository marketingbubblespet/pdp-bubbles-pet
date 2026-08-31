// src/app/care-b/page.tsx
// Variante B de teste A/B da /care, focada em conversão B2B. Ver docs/care/plano-lp-care-b.md
// e docs/care/planejamento-codigo-care-b.md. Não editar src/app/care/ a partir daqui.
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { CARE_B } from '@/lib/care-b'
import { GtmScript } from '@/components/ui/GtmScript'

import { CareBHero } from '@/components/lp/care-b/CareBHero'
import { CareBCalculator } from '@/components/lp/care-b/CareBCalculator'
import { CareBServiceProof } from '@/components/lp/care-b/CareBServiceProof'
import { CareBDemandMachine } from '@/components/lp/care-b/CareBDemandMachine'
import { CareBProducts } from '@/components/lp/care-b/CareBProducts'
import { CareBWhyResell } from '@/components/lp/care-b/CareBWhyResell'
import { CareBFinalCta } from '@/components/lp/care-b/CareBFinalCta'

// Reuso direto: blocos cuja copy já é neutra em relação ao diagnóstico da B.
import { CareHowItWorks } from '@/components/lp/care/CareHowItWorks'
import { CareGroomerProof } from '@/components/lp/care/CareGroomerProof'
import { CareFooter } from '@/components/lp/care/CareFooter'

const CareBFaq        = dynamic(() => import('@/components/lp/care-b/CareBFaq').then(m => ({ default: m.CareBFaq })))
const CareStickyBar   = dynamic(() => import('@/components/lp/care/CareStickyBar').then(m => ({ default: m.CareStickyBar })))
const CareExitPopup   = dynamic(() => import('@/components/lp/care/CareExitPopup').then(m => ({ default: m.CareExitPopup })))

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${CARE_B.slug}`

const title = 'Bubbles Care: revenda para petshops e distribuidores'
const description = 'Faça a conta antes de decidir: simule sua margem revendendo a Linha Care e garanta sua condição de pré-venda.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: PAGE_URL },
  // Variante de teste A/B: nunca indexar (regra 22 da CONVENCOES.md).
  robots: { index: false, follow: true },
  openGraph: {
    title, description, url: PAGE_URL, siteName: 'Bubbles Pet', locale: 'pt_BR', type: 'website',
  },
}

export default function CareBPage() {
  return (
    <>
      <link rel="preconnect" href="https://cdn.shopify.com" />
      <link rel="dns-prefetch" href="https://cdn.shopify.com" />

      {/* Mesmo container da variante A: página nova sem indicação contrária. */}
      <GtmScript id="GTM-N4PHK6DM" />

      <style>{`
        html { scrollbar-color: #E8649A #F4CDD4; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4CDD4; }
        ::-webkit-scrollbar-thumb { background-color: #E8649A; border-radius: 10px; }
      `}</style>

      <main className="pb-24 md:pb-20">
        <CareBHero />
        <CareBCalculator />
        <CareBServiceProof />
        <CareBDemandMachine />
        <CareBProducts />
        <CareBWhyResell />
        <CareHowItWorks />
        <CareGroomerProof />
        <CareBFaq />
        <CareBFinalCta />
      </main>
      <CareFooter />

      <CareStickyBar />
      <CareExitPopup />
    </>
  )
}
