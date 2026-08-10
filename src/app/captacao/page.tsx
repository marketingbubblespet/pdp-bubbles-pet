// src/app/captacao/page.tsx
import type { Metadata } from 'next'
import { CAPTACAO } from '@/lib/captacao'
import { GtmScript } from '@/components/ui/GtmScript'
import { CaptacaoApp } from '@/components/lp/captacao/CaptacaoApp'

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${CAPTACAO.slug}`

const title = 'Seja um distribuidor Bubbles | Captação de parceiros'
const description = 'Domine a sua região com a marca que define o padrão do cosmético pet. Margens competitivas, suporte de marketing 360º e logística ágil para distribuidores autorizados Bubbles.'

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

export default function CaptacaoPage() {
  return (
    <>
      {/* GTM escopado só nesta página (não entra no layout global) */}
      <GtmScript id="GTM-N4PHK6DM" />

      {/* Barra de rolagem no accent da marca (escopo desta página, tema escuro) */}
      <style>{`
        html { scrollbar-color: #F4CDD4 #1A1A1A; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0F0C0D; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #F4CDD4; }
      `}</style>

      <CaptacaoApp />
    </>
  )
}
