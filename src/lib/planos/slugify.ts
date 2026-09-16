// src/lib/planos/slugify.ts
// Slug simples pra gerar id de âncora a partir do texto de um título (## do corpo MDX).
// Usado tanto pra extrair o sumário (server) quanto pro id real do <h2> (MdxTable).
export function slugificar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export interface ItemSumario {
  titulo: string
  slug: string
}

// Extrai os títulos de nível 2 (## Título) do markdown bruto, na ordem em que aparecem,
// pra montar o sumário no topo da página. Não usa remark aqui de propósito: é regex
// simples porque só precisamos do texto da linha, não de uma árvore MDX completa.
export function extrairSumario(markdown: string): ItemSumario[] {
  const linhas = markdown.split('\n')
  const itens: ItemSumario[] = []
  for (const linha of linhas) {
    const m = /^##\s+(.+?)\s*$/.exec(linha)
    if (m) itens.push({ titulo: m[1], slug: slugificar(m[1]) })
  }
  return itens
}
