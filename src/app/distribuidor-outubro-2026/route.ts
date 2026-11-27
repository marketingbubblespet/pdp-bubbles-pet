// Relatório de captação de distribuidores de outubro de 2026, na estrutura nova
// (render-v3.ts, 9 seções). Dados em src/lib/relatorio-distribuidor/2026-10.ts.
import { comFavicon } from '@/lib/favicon-html'
import { renderRelatorioV3, type NovaEstrategia } from '@/lib/relatorio-distribuidor/render-v3'
import { relatorioOutubro2026 } from '@/lib/relatorio-distribuidor/2026-10'
import { FOTOS_CRIATIVOS, MESES_V3 } from '@/lib/relatorio-distribuidor/v3'

const NOVAS_ESTRATEGIAS: NovaEstrategia[] = [
  {
    titulo: 'Nova página e anúncios da Linha Care para distribuidores',
    texto: 'Página de captação própria da Linha Care, com formulário em 4 etapas e simulador de margem. Só o lead com CNPJ que aceita o pedido inicial a partir de R$ 3 mil vai para a Sellum; os demais são levados para a loja da Care.',
    etiquetas: ['Linha Care', 'Meta Ads', 'Página no ar desde 23/10'],
    itens: ['Até 45% de margem', '4 anúncios estáticos', '4 vídeos com 3 ganchos cada', 'Público amplo, Brasil', 'R$ 2 mil por mês para começar'],
  },
]

export async function GET() {
  const html = renderRelatorioV3(relatorioOutubro2026, {
    meses: MESES_V3, estrutura: 'enxuta', novasEstrategias: NOVAS_ESTRATEGIAS, fotosCriativos: FOTOS_CRIATIVOS,
  })
  return new Response(comFavicon(html), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
