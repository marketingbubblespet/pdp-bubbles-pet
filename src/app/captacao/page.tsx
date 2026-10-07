// src/app/captacao/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { CAPTACAO } from '@/lib/captacao'
import { GtmScript } from '@/components/ui/GtmScript'
import { CaptacaoApp } from '@/components/lp/captacao/CaptacaoApp'

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${CAPTACAO.slug}`

// Título e descrição idênticos aos de captacao.bubbles.com.br (pedido do usuário, out/2026).
const title = 'Bubbles Pet Cosmetics | Cosméticos Profissionais para Banho e Tosa'
const description = 'Descubra a linha completa de cosméticos profissionais para pets da Bubbles. Alta rentabilidade, qualidade premium e resultados incríveis para o seu banho e tosa. Seja um parceiro!'

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

      {/* Microsoft Clarity (gravação de sessões e mapas de calor), mesmo projeto usado em
          captacao.bubbles.com.br. Escopado só nesta página. */}
      <Script id="clarity-captacao" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wbnansxpk1");`}
      </Script>

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
