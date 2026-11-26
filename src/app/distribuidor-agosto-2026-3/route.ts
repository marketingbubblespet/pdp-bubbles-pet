// Prévia da versão 3 do relatório de agosto: mesmo dado e visual claro da versão 2, com a
// navegação por mês e outros conceitos do relatório da Black November (render-v3.ts).
// As páginas /distribuidor-agosto-2026, /distribuidor-agosto-2026-2 e
// /distribuidor-setembro-2026 não mudam.
import { comFavicon } from '@/lib/favicon-html'
import { renderRelatorioV3, type MesRelatorio } from '@/lib/relatorio-distribuidor/render-v3'
import { relatorioAgosto2026 } from '@/lib/relatorio-distribuidor/2026-08'

// Meses com relatório publicado. Setembro ainda abre no visual atual.
const MESES: MesRelatorio[] = [
  { mes: { ano: 2026, mes: 9 }, href: '/distribuidor-setembro-2026' },
  { mes: { ano: 2026, mes: 8 }, href: '/distribuidor-agosto-2026-3' },
]

export async function GET() {
  return new Response(comFavicon(renderRelatorioV3(relatorioAgosto2026, MESES)), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
