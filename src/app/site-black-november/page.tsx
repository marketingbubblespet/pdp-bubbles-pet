// src/app/site-black-november/page.tsx
// Plano de site da Black November 2026, aberto a partir da apresentação (/apresentacao-black-november).
// Mesma senha da apresentação. Escondida do Google.
import type { Metadata } from 'next'
import { SenhaGate } from '@/components/lp/apresentacao-black-november/SenhaGate'
import { SitePlano } from '@/components/lp/apresentacao-black-november/SitePlano'

export const metadata: Metadata = {
  title: 'Site · Black November 2026 | Bubbles Pet',
  description: 'Propostas de site para a Black November 2026, com simulações e decisões.',
  robots: { index: false, follow: false },
}

export default function SiteBlackNovemberPage() {
  return (
    <SenhaGate>
      <main className="min-h-screen bg-[#F7F7F7] pb-16 text-[#0D0C0D]">
        <header className="bg-[#0D0C0D] text-white">
          <div className="mx-auto max-w-[1100px] px-4 pb-10 pt-10 md:pt-14">
            <a href="/apresentacao-black-november#site" className="text-sm text-[#F4CDD4] hover:underline">
              ‹ Voltar ao plano da Black November
            </a>
            <h1 className="mt-4 text-3xl font-medium md:text-5xl">Site na Black November</h1>
            <p className="mt-3 max-w-[760px] text-base text-white/80">
              O que já existe, o que não vamos fazer e as 8 propostas para decidir, com simulação no celular feita a partir
              de prints reais do site (24/10/2026). As simulações são referência de layout, não arte final.
            </p>
          </div>
        </header>
        <div className="mx-auto max-w-[1100px] px-4 pt-10">
          <SitePlano />
        </div>
      </main>
    </SenhaGate>
  )
}
