// Relatório de captação de distribuidores de setembro de 2026, na estrutura nova
// (render-v3.ts, 9 seções). /distribuidor-setembro-2026 continua no visual anterior.
// Dados em src/lib/relatorio-distribuidor/2026-09-v2.ts.
import { comFavicon } from '@/lib/favicon-html'
import { renderRelatorioV3 } from '@/lib/relatorio-distribuidor/render-v3'
import { relatorioSetembro2026v2 } from '@/lib/relatorio-distribuidor/2026-09-v2'
import { FOTOS_CRIATIVOS, MESES_V3, estrategiasDeRegioes } from '@/lib/relatorio-distribuidor/v3'

export async function GET() {
  const html = renderRelatorioV3(relatorioSetembro2026v2, {
    meses: MESES_V3, estrutura: 'enxuta', fotosCriativos: FOTOS_CRIATIVOS,
    novasEstrategias: estrategiasDeRegioes(relatorioSetembro2026v2),
  })
  return new Response(comFavicon(html), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
