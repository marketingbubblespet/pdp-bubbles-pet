// Prévia da versão 3 do relatório de agosto: mesmo dado e visual claro da versão 2, com a
// navegação por mês e outros conceitos do relatório da Black November (render-v3.ts).
// As páginas /distribuidor-agosto-2026, /distribuidor-agosto-2026-2 e
// /distribuidor-setembro-2026 não mudam.
import { comFavicon } from '@/lib/favicon-html'
import { renderRelatorioV3, type MesRelatorio, type NovaEstrategia } from '@/lib/relatorio-distribuidor/render-v3'
import { relatorioAgosto2026 } from '@/lib/relatorio-distribuidor/2026-08'

// Meses com relatório publicado. Setembro ainda abre no visual atual.
const MESES: MesRelatorio[] = [
  { mes: { ano: 2026, mes: 9 }, href: '/distribuidor-setembro-2026' },
  { mes: { ano: 2026, mes: 8 }, href: '/distribuidor-agosto-2026-3' },
]

// Novas estratégias de agosto: as campanhas de região foco, com o texto que já está no
// arquivo de dados do mês. Cada lugar vira uma etiqueta (a vírgula dentro de parênteses não separa).
const NOVAS_ESTRATEGIAS: NovaEstrategia[] = (relatorioAgosto2026.regioesFoco?.itens ?? []).map((r) => ({
  titulo: r.titulo,
  texto: 'Campanha própria para estas praças, a subir com os novos criativos.',
  etiquetas: ['Segmentação por região'],
  itens: r.texto.replace(/\.$/, '').split(/,\s*(?![^()]*\))/),
}))

export async function GET() {
  const html = renderRelatorioV3(relatorioAgosto2026, { meses: MESES, novasEstrategias: NOVAS_ESTRATEGIAS })
  return new Response(comFavicon(html), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
