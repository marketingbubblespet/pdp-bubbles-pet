// Dados da apresentação da Black November 2026 à diretoria (/apresentacao-black-november).
// Fonte: estudo da Black no repositório bubbles-gerador-de-ads
// (claude-gerador-anuncio/brand/campaigns/black-november-2026/estudo-black/01 a 06 e dados/shopify-black/RESUMO.md).
// Números da loja vêm da Shopify; os da Meta 2025 são da própria Meta (ROAS Reportado) ou da UTM de último clique.

export const SECOES = [
  { id: 'resumo', curto: 'Resumo', titulo: 'Resumo e o que pedimos hoje', minutos: 3 },
  { id: 'black-2025', curto: 'Black 2025', titulo: 'O que a Black 2025 ensinou', minutos: 5 },
  { id: 'mercado', curto: 'Mercado', titulo: 'Mercado, busca e concorrência', minutos: 3 },
  { id: 'estrategia', curto: 'Estratégia', titulo: 'Oferta, mensagem e calendário', minutos: 3 },
  { id: 'meta', curto: 'Meta Ads', titulo: 'Meta Ads: R$ 30 mil', minutos: 4 },
  { id: 'google', curto: 'Google', titulo: 'Google Ads e Merchant Center: R$ 20 mil', minutos: 3 },
  { id: 'site', curto: 'Site', titulo: 'Site: onde a venda se perde', minutos: 4 },
  { id: 'projecao', curto: 'Projeção', titulo: 'Projeção de faturamento', minutos: 3 },
  { id: 'plano', curto: 'Plano de ação', titulo: 'Plano de ação durante a Black', minutos: 3 },
  { id: 'riscos', curto: 'Riscos', titulo: 'Riscos e decisões', minutos: 2 },
  { id: 'proximos', curto: 'Próximos passos', titulo: 'Próximos passos até 01/11', minutos: 1 },
] as const

export type SecaoId = (typeof SECOES)[number]['id']

export function numeroDaSecao(id: SecaoId) {
  return SECOES.findIndex((s) => s.id === id) + 1
}

// Black 2025 na loja (Shopify, receita líquida, todos os canais)
export const LOJA_2025 = { pedidos: 694, receita: 420710, ticket: 606 }

// Projeção: âncora na Black 2025 real da Meta (UTM de último clique na Shopify)
export const PROJ = {
  verbaMeta2025: 23006,
  pedidosLcMeta2025: 73,
  receitaLcMeta2025: 35697,
  comprasContagemMeta2025: 262,
  google2025: 12000,
  google2026: 20000,
  ticketLoja2026: 648, // 7% acima dos R$ 606 da Black 2025
  ticketLc2026: 523, // 7% acima dos R$ 489 do pedido de último clique da Meta em 2025
  crescimentoLoja: 1.25, // pedidos por dia de ago a out/26 contra out/25
  puxadaSemUtm: 1, // pedidos sem UTM que cada pedido LC extra da Meta puxa
  verbas: [30000, 40000, 45000, 50000],
  cenarios: { otimista: 0.8, base: 0.65, conservador: 0.5 },
  site: [
    { rotulo: 'Sem melhorias de site', valor: 0 },
    { rotulo: 'Essenciais, estimativa conservadora', valor: 6 },
    { rotulo: 'Essenciais, estimativa média', valor: 10 },
  ],
} as const

export type Cenario = keyof typeof PROJ.cenarios

export function projetar(verbaMeta: number, cenario: Cenario, melhoraSite: number) {
  const e = PROJ.cenarios[cenario]
  const pedidosLc = PROJ.pedidosLcMeta2025 * Math.pow(verbaMeta / PROJ.verbaMeta2025, e)
  const base = LOJA_2025.pedidos * PROJ.crescimentoLoja
  const extra = Math.max(0, pedidosLc - PROJ.pedidosLcMeta2025 * PROJ.crescimentoLoja) * (1 + PROJ.puxadaSemUtm)
  const pedidosLoja = (base + extra) * (1 + melhoraSite / 100)
  const faturamento = pedidosLoja * PROJ.ticketLoja2026
  const receitaLc = pedidosLc * PROJ.ticketLc2026
  return {
    verbaMeta,
    pedidosLc,
    receitaLc,
    roasLc: receitaLc / verbaMeta,
    pedidosLoja,
    faturamento,
    midiaTotal: verbaMeta + PROJ.google2026,
    contra2025: faturamento / LOJA_2025.receita - 1,
  }
}

// Verba da Meta por semana (documento 05, seção 8.1) e divisão do dinheiro acima de R$ 30 mil
export const META_SEMANAS = [
  { semana: 'S1 · 01 a 08/11', dias: 8, base: 7300, extra: 0.2 },
  { semana: 'S2 · 09 a 15/11', dias: 7, base: 6475, extra: 0.15 },
  { semana: 'S3 · 16 a 22/11', dias: 7, base: 6175, extra: 0.25 },
  { semana: 'S4 · 23 a 30/11', dias: 8, base: 10050, extra: 0.4 },
]

export const META_LINHAS = [
  { linha: 'Prospecção (C1)', base: 24120, extra: 0.6 },
  { linha: 'Remarketing Quente', base: 4020, extra: 0.1 },
  { linha: 'Remarketing Impactados', base: 1160, extra: 0.15 },
  { linha: 'Teste de catálogo e reserva por desempenho', base: 700, extra: 0.15 },
]

export const IMG = '/images/black-november'

export const brl = (v: number) => 'R$ ' + Math.round(v).toLocaleString('pt-BR')
export const pct = (v: number, casas = 0) =>
  (v >= 0 ? '+' : '') + (v * 100).toLocaleString('pt-BR', { maximumFractionDigits: casas }) + '%'
