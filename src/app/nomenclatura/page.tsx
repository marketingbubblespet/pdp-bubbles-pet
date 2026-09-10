// src/app/nomenclatura/page.tsx
// Ferramenta interna da social media: gera o nome padronizado dos criativos de Meta Ads.
// Página oculta: sem GTM, noindex, protegida por senha (AcessoGate).
import type { Metadata } from 'next'
import { AcessoGate } from '@/components/lp/nomenclatura/AcessoGate'
import { NomenclaturaTool } from '@/components/lp/nomenclatura/NomenclaturaTool'

export const metadata: Metadata = {
  title: 'Gerador de Nomenclatura de Anúncios',
  robots: { index: false, follow: false },
}

export default function NomenclaturaPage() {
  return (
    <AcessoGate>
      <NomenclaturaTool />
    </AcessoGate>
  )
}
