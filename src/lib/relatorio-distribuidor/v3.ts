// src/lib/relatorio-distribuidor/v3.ts
// Configuração comum das páginas na estrutura nova (render-v3.ts): os meses publicados e as
// fotos dos anúncios. Mês novo entra no topo de MESES_V3; foto nova entra em FOTOS_CRIATIVOS
// com nome de arquivo novo (as imagens em /images têm cache de 1 ano).
// Estrutura padrão desde 27/11/2026. Passo a passo da extração e da montagem do mês no
// projeto bubbles-gerador-de-ads: claude-gerador-anuncio/brand/campaigns/distribuidor-relatorio-mensal/README.md
import type { MesRelatorio, NovaEstrategia } from './render-v3'
import type { RelatorioDistribuidor } from './tipos'

export const MESES_V3: MesRelatorio[] = [
  { mes: { ano: 2026, mes: 10 }, href: '/distribuidor-outubro-2026' },
  { mes: { ano: 2026, mes: 9 }, href: '/distribuidor-setembro-2026-2' },
  { mes: { ano: 2026, mes: 8 }, href: '/distribuidor-agosto-2026-4' },
]

// Fotos baixadas da conta de distribuidores em 27/11/2026 (anúncios em veiculação).
const PASTA = '/images/relatorio-distribuidor/criativos'
export const FOTOS_CRIATIVOS: Record<string, string> = {
  ad35: `${PASTA}/ad35-artes-internas-2026-11.jpg`,
  ad22: `${PASTA}/ad22-video05-capa-2026-11.webp`,
  ad41: `${PASTA}/ad41-estatico02-2026-11.jpg`,
  ad34: `${PASTA}/ad34-video-guilherme-capa-2026-11.webp`,
  ad20: `${PASTA}/ad20-video03-capa-2026-11.webp`,
  ad16: `${PASTA}/ad16-video01-capa-2026-11.webp`,
}

// Regiões foco do mês como "novas estratégias": cada lugar vira uma etiqueta (a vírgula
// dentro de parênteses não separa).
export function estrategiasDeRegioes(rel: RelatorioDistribuidor): NovaEstrategia[] {
  return (rel.regioesFoco?.itens ?? []).map((r) => ({
    titulo: r.titulo,
    texto: 'Campanha própria para estas praças, a subir com os novos criativos.',
    etiquetas: ['Segmentação por região'],
    itens: r.texto.replace(/\.$/, '').split(/,\s*(?![^()]*\))/),
  }))
}
