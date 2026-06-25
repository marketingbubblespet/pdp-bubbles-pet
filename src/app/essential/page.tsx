// src/app/essential/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Above fold — carregamento imediato
import { TopBar } from '@/components/lp/essential/TopBar'
import { Hero } from '@/components/lp/essential/Hero'
import { TrustBar } from '@/components/lp/essential/TrustBar'
import { PainBlock } from '@/components/lp/essential/PainBlock'

// Below fold — code split: JS só carrega quando necessário
import { VideoBlock } from '@/components/lp/essential/VideoBlock'
import { MechanismBlock } from '@/components/lp/essential/MechanismBlock'
import { GuaranteeBlock } from '@/components/lp/essential/GuaranteeBlock'
import { BrandBlock } from '@/components/lp/essential/BrandBlock'
import { FooterBlock } from '@/components/lp/essential/FooterBlock'

const YieldBlock      = dynamic(() => import('@/components/lp/essential/YieldBlock').then(m => ({ default: m.YieldBlock })))
const ComparisonBlock = dynamic(() => import('@/components/lp/essential/ComparisonBlock').then(m => ({ default: m.ComparisonBlock })))
const ReviewsBlock    = dynamic(() => import('@/components/lp/essential/ReviewsBlock').then(m => ({ default: m.ReviewsBlock })))
const FaqBlock        = dynamic(() => import('@/components/lp/essential/FaqBlock').then(m => ({ default: m.FaqBlock })))
const StickyCtaBar    = dynamic(() => import('@/components/lp/essential/StickyCtaBar').then(m => ({ default: m.StickyCtaBar })))

export const metadata: Metadata = {
  title: 'Shampoo Pet Neutro Essential 5L | Bubbles Pet',
  description: 'Shampoo profissional para groomers. Diluição 1:5, rende 30L e ~300 banhos. Ativos Bioex AO + Extrato de Algas. 100% vegano e hipoalergênico.',
}

export default function LandingPage() {
  return (
    <>
      <TopBar />
      <main className="pb-20 md:pb-0">
        <Hero />
        <TrustBar />
        <PainBlock />
        <VideoBlock />
        <MechanismBlock />
        <YieldBlock />
        <ComparisonBlock />
        <ReviewsBlock />
        <GuaranteeBlock />
        <BrandBlock />
        <FaqBlock />
      </main>
      <FooterBlock />
      <StickyCtaBar />
    </>
  )
}
