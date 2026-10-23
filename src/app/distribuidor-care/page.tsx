// src/app/distribuidor-care/page.tsx
// LP de captação de distribuidores da Linha Care (tráfego Meta Ads). Server Component:
// só metadata, scripts de medição e o wrapper client da página.
import type { Metadata } from 'next'
import Script from 'next/script'
import { DISTRIBUIDOR_CARE, DISTRIBUIDOR_CARE_SEO } from '@/lib/distribuidor-care'
import { GtmScript } from '@/components/ui/GtmScript'
import { DistribuidorCareApp } from '@/components/lp/distribuidor-care/DistribuidorCareApp'

const SITE_URL = 'https://ofertas.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${DISTRIBUIDOR_CARE.slug}`
const { title, description } = DISTRIBUIDOR_CARE_SEO

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: PAGE_URL },
  // Página de campanha (100% Meta Ads): nunca indexar e fora do sitemap.ts.
  robots: { index: false, follow: true },
  openGraph: {
    title, description, url: PAGE_URL, siteName: 'Bubbles Pet', locale: 'pt_BR', type: 'website',
  },
}

export default function DistribuidorCarePage() {
  return (
    <>
      {/* GTM escopado só nesta página (container das LPs de distribuidor, regra 42) */}
      <GtmScript id="GTM-N4PHK6DM" />

      {/* Microsoft Clarity: mesmo projeto e mesmo snippet da /captacao (src/app/captacao/page.tsx:34-36). */}
      <Script id="clarity-distribuidor-care" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wbnansxpk1");`}
      </Script>

      {/* Barra de rolagem no accent da marca (escopo desta página, tema claro), igual à /care */}
      <style>{`
        html { scrollbar-color: #E8649A #F4CDD4; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4CDD4; }
        ::-webkit-scrollbar-thumb { background-color: #E8649A; border-radius: 10px; }
      `}</style>

      <DistribuidorCareApp />
    </>
  )
}
