// src/lib/relatorio-distribuidor/paginas-v3.ts
// HTML de cada mês na estrutura padrão (render-v3.ts, 9 seções). As rotas
// /relatorio-distribuidor-<mes><aa> chamam a função do mês; /relatorio-distribuidor
// chama paginaMaisNova(), que segue o primeiro item de MESES_V3.
// Mês novo: função aqui + linha em PAGINAS_V3 + linha no topo de MESES_V3 (v3.ts) + rota.
import { renderRelatorioV3, type NovaEstrategia } from './render-v3'
import { relatorioAgosto2026 } from './2026-08'
import { relatorioSetembro2026v2 } from './2026-09-v2'
import { relatorioOutubro2026 } from './2026-10'
import { FOTOS_CRIATIVOS, MESES_V3, estrategiasDeRegioes } from './v3'

const ESTRATEGIAS_OUTUBRO: NovaEstrategia[] = [
  {
    titulo: 'Nova página e anúncios da Linha Care para distribuidores',
    texto: 'Página de captação própria da Linha Care, com formulário em 4 etapas e simulador de margem. Só o lead com CNPJ que aceita o pedido inicial a partir de R$ 3 mil vai para a Sellum; os demais são levados para a loja da Care.',
    etiquetas: ['Linha Care', 'Meta Ads', 'Página no ar desde 23/10'],
    itens: ['Até 45% de margem', '4 anúncios estáticos', '4 vídeos com 3 ganchos cada', 'Público amplo, Brasil', 'R$ 2 mil por mês para começar'],
  },
]

export const paginaOutubro2026 = () => renderRelatorioV3(relatorioOutubro2026, {
  meses: MESES_V3, estrutura: 'enxuta', novasEstrategias: ESTRATEGIAS_OUTUBRO, fotosCriativos: FOTOS_CRIATIVOS,
})

// Setembro refeito na estrutura padrão, com a campanha de WhatsApp e o mapa completo.
export const paginaSetembro2026 = () => renderRelatorioV3(relatorioSetembro2026v2, {
  meses: MESES_V3, estrutura: 'enxuta', fotosCriativos: FOTOS_CRIATIVOS,
  novasEstrategias: estrategiasDeRegioes(relatorioSetembro2026v2),
})

export const paginaAgosto2026 = () => renderRelatorioV3(relatorioAgosto2026, {
  meses: MESES_V3, estrutura: 'enxuta', fotosCriativos: FOTOS_CRIATIVOS,
  novasEstrategias: estrategiasDeRegioes(relatorioAgosto2026),
})

// Chave = href do mês em MESES_V3.
const PAGINAS_V3: Record<string, () => string> = {
  '/relatorio-distribuidor-outubro26': paginaOutubro2026,
  '/relatorio-distribuidor-setembro26': paginaSetembro2026,
  '/relatorio-distribuidor-agosto26': paginaAgosto2026,
}

export function paginaMaisNova(): string {
  const href = MESES_V3[0].href
  const pagina = PAGINAS_V3[href]
  if (!pagina) throw new Error(`Mês sem página em PAGINAS_V3: ${href}`)
  return pagina()
}

export function respostaRelatorio(html: string): Response {
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
