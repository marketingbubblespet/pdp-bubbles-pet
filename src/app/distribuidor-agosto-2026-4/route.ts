// Relatório de agosto de 2026 na estrutura nova (render-v3.ts, 9 seções). Comparado com
// /distribuidor-agosto-2026-3 (16 seções) e escolhido como padrão em 27/11/2026.
// As outras páginas de agosto não mudam.
import { comFavicon } from '@/lib/favicon-html'
import { renderRelatorioV3 } from '@/lib/relatorio-distribuidor/render-v3'
import { relatorioAgosto2026 } from '@/lib/relatorio-distribuidor/2026-08'
import { FOTOS_CRIATIVOS, MESES_V3, estrategiasDeRegioes } from '@/lib/relatorio-distribuidor/v3'

export async function GET() {
  const html = renderRelatorioV3(relatorioAgosto2026, {
    meses: MESES_V3, estrutura: 'enxuta', fotosCriativos: FOTOS_CRIATIVOS,
    novasEstrategias: estrategiasDeRegioes(relatorioAgosto2026),
  })
  return new Response(comFavicon(html), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
