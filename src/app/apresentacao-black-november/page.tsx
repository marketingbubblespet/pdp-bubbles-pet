// src/app/apresentacao-black-november/page.tsx
// Apresentação do plano da Black November 2026 à diretoria (terça, 27/10/2026), em formato de site.
// Página interna, com senha e escondida do Google. Dados em src/lib/apresentacao-black-november.ts.
import type { Metadata } from 'next'
import { Apresentador } from '@/components/lp/apresentacao-black-november/Apresentador'
import { SenhaGate } from '@/components/lp/apresentacao-black-november/SenhaGate'
import { Capa, Navegacao, Resumo } from '@/components/lp/apresentacao-black-november/Abertura'
import { Black2025, Mercado } from '@/components/lp/apresentacao-black-november/Passado'
import { Estrategia, GoogleAds, MetaAds } from '@/components/lp/apresentacao-black-november/Plano2026'
import { Site } from '@/components/lp/apresentacao-black-november/Site'
import { PlanoAcao, Projecao, Proximos, Riscos } from '@/components/lp/apresentacao-black-november/Execucao'

export const metadata: Metadata = {
  title: 'Plano da Black November 2026 | Bubbles Pet',
  description: 'Apresentação do plano da Black November 2026 à diretoria.',
  robots: { index: false, follow: false },
}

export default function ApresentacaoBlackNovemberPage() {
  return (
    <SenhaGate>
      <Apresentador>
        <main className="min-h-screen bg-[#F7F7F7] pb-24 text-[#0D0C0D]">
          <Capa />
          <Navegacao />
          <Resumo />
          <Black2025 />
          <Mercado />
          <Estrategia />
          <MetaAds />
          <GoogleAds />
          <Site />
          <Projecao />
          <PlanoAcao />
          <Riscos />
          <Proximos />
          <footer className="border-t border-[#E5E7EB] py-10">
            <p className="mx-auto max-w-[1100px] px-4 text-sm text-[#666666]">
              Página interna. Números da loja: Shopify. Mídia de 2025: Meta (contagem da plataforma) e UTM de último
              clique na Shopify. Busca: DataForSEO. Concorrentes: Biblioteca de Anúncios da Meta (Apify). Versão de
              24/10/2026.
            </p>
          </footer>
        </main>
      </Apresentador>
    </SenhaGate>
  )
}
