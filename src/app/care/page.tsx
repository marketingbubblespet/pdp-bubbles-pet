// src/app/care/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { CARE } from '@/lib/care'

// Above fold — carregamento imediato
import { CareHero } from '@/components/lp/care/CareHero'
import { CareTicker } from '@/components/lp/care/CareTicker'
import { CareDemandMachine } from '@/components/lp/care/CareDemandMachine'
import { CareProducts } from '@/components/lp/care/CareProducts'

// Below fold — code split
import { CareCalculator } from '@/components/lp/care/CareCalculator'
import { CareWhyResell } from '@/components/lp/care/CareWhyResell'
import { CareBrand } from '@/components/lp/care/CareBrand'
import { CareHowItWorks } from '@/components/lp/care/CareHowItWorks'
import { CareGroomerProof } from '@/components/lp/care/CareGroomerProof'
import { CareForm } from '@/components/lp/care/CareForm'
import { CareFinalCta } from '@/components/lp/care/CareFinalCta'
import { CareFooter } from '@/components/lp/care/CareFooter'
import { CareFloatingWhatsApp } from '@/components/lp/care/CareFloatingWhatsApp'

const CareFaq          = dynamic(() => import('@/components/lp/care/CareFaq').then(m => ({ default: m.CareFaq })))
const CareStickyBar    = dynamic(() => import('@/components/lp/care/CareStickyBar').then(m => ({ default: m.CareStickyBar })))
const CareExitPopup    = dynamic(() => import('@/components/lp/care/CareExitPopup').then(m => ({ default: m.CareExitPopup })))

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${CARE.slug}`

const title = 'Bubbles Care: revenda para petshops | A linha que gira sozinha'
const description = 'Revenda a linha Bubbles Care no seu petshop sem medo de encalhar. A demanda já é gerada por milhares de afiliados. Cadastre-se para as condições de pré-venda de lançamento.'

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

export default function CarePage() {
  return (
    <>
      {/* Barra de rolagem no accent da marca (escopo desta página) */}
      <style>{`
        html { scrollbar-color: #E8649A #F4CDD4; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4CDD4; }
        ::-webkit-scrollbar-thumb { background-color: #E8649A; border-radius: 10px; }
      `}</style>

      <main className="pb-24 md:pb-20">
        <CareHero />
        <CareTicker />
        <CareDemandMachine />
        <CareProducts />
        <CareCalculator />
        <CareWhyResell />
        <CareBrand />
        <CareHowItWorks />
        <CareGroomerProof />
        <CareForm />
        <CareFaq />
        <CareFinalCta />
      </main>
      <CareFooter />

      {/* Estímulos de conversão */}
      <CareStickyBar />
      <CareFloatingWhatsApp />
      <CareExitPopup />
    </>
  )
}
