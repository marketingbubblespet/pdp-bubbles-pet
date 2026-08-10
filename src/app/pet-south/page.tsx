// src/app/pet-south/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { PET_SOUTH } from '@/lib/pet-south'
import { GtmScript } from '@/components/ui/GtmScript'

// Above fold — carregamento imediato
import { PetSouthHeader } from '@/components/lp/pet-south/PetSouthHeader'
import { PetSouthHero } from '@/components/lp/pet-south/PetSouthHero'
import { PetSouthMarquee } from '@/components/lp/pet-south/PetSouthMarquee'
import { PetSouthFairSection } from '@/components/lp/pet-south/PetSouthFairSection'

// Below fold — code split
import { PetSouthCareLaunch } from '@/components/lp/pet-south/PetSouthCareLaunch'
import { PetSouthWhyChoose } from '@/components/lp/pet-south/PetSouthWhyChoose'
import { PetSouthCalculator } from '@/components/lp/pet-south/PetSouthCalculator'
import { PetSouthEssencia } from '@/components/lp/pet-south/PetSouthEssencia'
import { PetSouthFaq } from '@/components/lp/pet-south/PetSouthFaq'
import { PetSouthFinalCta } from '@/components/lp/pet-south/PetSouthFinalCta'
import { PetSouthFooter } from '@/components/lp/pet-south/PetSouthFooter'

const PetSouthForm = dynamic(() => import('@/components/lp/pet-south/PetSouthForm').then((m) => ({ default: m.PetSouthForm })))
const PetSouthStickyBar = dynamic(() => import('@/components/lp/pet-south/PetSouthStickyBar').then((m) => ({ default: m.PetSouthStickyBar })))

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${PET_SOUTH.slug}`

const title = 'Bubbles® na PET South America: seja distribuidor'
const description = 'Agende sua reunião com a Bubbles® na PET South America e conheça as condições especiais para distribuidores e lojistas, incluindo o lançamento da Linha Care.'

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

export default function PetSouthPage() {
  return (
    <>
      {/* GTM escopado só nesta página (não entra no layout global) */}
      <GtmScript id="GTM-N4PHK6DM" />

      {/* Barra de rolagem no accent da marca (escopo desta página) */}
      <style>{`
        html { scrollbar-color: #E8649A #F4CDD4; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4CDD4; }
        ::-webkit-scrollbar-thumb { background-color: #E8649A; border-radius: 10px; }
      `}</style>

      <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#F4CDD4] selection:text-[#080808]">
        <PetSouthHeader />
        <main>
          <PetSouthHero />
          <PetSouthMarquee />
          <PetSouthFairSection />
          <PetSouthCareLaunch />
          <PetSouthWhyChoose />
          <PetSouthCalculator />
          <PetSouthEssencia />
          <PetSouthFaq />
          <PetSouthFinalCta />
        </main>
        <PetSouthFooter />

        <PetSouthForm />
        <PetSouthStickyBar />
      </div>
    </>
  )
}
