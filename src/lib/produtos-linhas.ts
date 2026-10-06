// src/lib/produtos-linhas.ts
// Catálogo usado pela nomenclatura quando o destino é a coleção de uma linha
// (bubbles.com.br/collections/<linha>). Cópia do JSON de slugs da Shopify de 06/10/2026,
// só com produtos ATIVOS e sem brindes ("100% off"). Produto novo ou arquivado: pedir o
// JSON atualizado e regerar esta lista.
//
// - `slug`: exato da Shopify, vai no link (?destaque=<slug>). Não editar à mão.
// - `curto`: versão curta usada no nome do anúncio (sem "pet", "pro/ego", diluição).
// - `grupo`: agrupamento da lista no modal de busca.

export type CodigoLinhaColecao = 'pro' | 'ess'

export type ProdutoLinha = {
  linha: CodigoLinhaColecao
  grupo: string
  nome: string
  slug: string
  curto: string
}

// Coleções disponíveis como destino. Xperience, Collora e Care ficam ocultas por enquanto:
// para ativar, acrescentar a linha aqui, a categoria em nomenclatura.ts e os produtos abaixo.
export const COLECOES: Record<CodigoLinhaColecao, { rotulo: string; url: string }> = {
  pro: { rotulo: 'Linha Pro', url: 'https://www.bubbles.com.br/collections/pro' },
  ess: { rotulo: 'Linha Essential', url: 'https://www.bubbles.com.br/collections/essential' },
}

// Valor do campo `destaque` quando o anúncio é da coleção inteira (link sem parâmetro).
export const COLECAO_INTEIRA = '*'

export const ORDEM_GRUPOS = ['Shampoos', 'Condicionadores', 'Máscaras', 'Perfumes', 'Finalizadores', 'Kits', 'Auxiliares', 'Acessórios']

export const PRODUTOS_LINHAS: ProdutoLinha[] = [
  { linha: 'pro', grupo: 'Finalizadores', nome: 'ATIVADOR PET LISO INTENSO PRO (EGO) 300ML (LÍQUIDO)', slug: 'ativador-pet-liso-intenso-ego-300ml-liquido', curto: 'ativador-liso-intenso-300ml-liquido' },
  { linha: 'pro', grupo: 'Acessórios', nome: 'AVENTAL GROOMER PRO BUBBLES (UNISSEX)', slug: 'avental-groomer-pro-bubbles-unissex', curto: 'avental-groomer-unissex' },
  { linha: 'pro', grupo: 'Acessórios', nome: 'AVENTAL GROOMER STANDARD BUBBLES (UNISSEX)', slug: 'avental-groomer-standard-bubbles-unissex', curto: 'avental-groomer-standard-unissex' },
  { linha: 'pro', grupo: 'Kits', nome: 'COMBO SACHÊ LINHA PRO (SORTIDOS)', slug: 'combo-sache-linha-ego', curto: 'combo-sache-sortidos' },
  { linha: 'pro', grupo: 'Condicionadores', nome: 'CONDICIONADOR PET HIDRATANTE PRO (EGO) 1L (1:10)', slug: 'condicionador-pet-hidratante-ego-1l-1-10', curto: 'condicionador-hidratante-1l' },
  { linha: 'pro', grupo: 'Condicionadores', nome: 'CONDICIONADOR PET HIDRATANTE PRO (EGO) 5L (1:10)', slug: 'condicionador-pet-hidratante-ego-5l-1-10', curto: 'condicionador-hidratante-5l' },
  { linha: 'ess', grupo: 'Condicionadores', nome: 'CONDICIONADOR PET HIDRATANTE ESSENTIAL 5L (1:5)', slug: 'condicionador-pet-hidratante-essential-5l-1-5', curto: 'condicionador-hidratante-5l' },
  { linha: 'pro', grupo: 'Condicionadores', nome: 'CONDICIONADOR PET NEUTRALIZADOR DE ODORES PRO (EGO) 1L (1:10)', slug: 'condicionador-pet-neutralizador-de-odores-ego-1l-1-10', curto: 'condicionador-neutralizador-odores-1l' },
  { linha: 'pro', grupo: 'Condicionadores', nome: 'CONDICIONADOR PET NEUTRALIZADOR DE ODORES PRO (EGO) 5L (1:10)', slug: 'condicionador-pet-neutralizador-de-odores-ego-5l-1-10', curto: 'condicionador-neutralizador-odores-5l' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'DEO COLÔNIA PET JABUTICABA PRO (EGO) 300ML', slug: 'deo-colonia-pet-jabuticaba-ego-300ml', curto: 'deo-colonia-jabuticaba-300ml' },
  { linha: 'ess', grupo: 'Kits', nome: 'KIT PET COMPLETO LINHA ESSENTIAL', slug: 'kit-pet-completo-linha-essential', curto: 'kit-completo' },
  { linha: 'pro', grupo: 'Kits', nome: 'KIT PET CRONOGRAMA DE PELAGEM PRO (EGO) (3 ITENS)', slug: 'kit-pet-cronograma-de-pelagem-ego-3-itens', curto: 'kit-cronograma-pelagem' },
  { linha: 'ess', grupo: 'Kits', nome: 'KIT PET ESSENTIAL FLORATO', slug: 'kit-pet-essential-florato', curto: 'kit-florato' },
  { linha: 'ess', grupo: 'Kits', nome: 'KIT PET ESSENTIAL FRUTADO', slug: 'kit-pet-essential-frutado', curto: 'kit-frutado' },
  { linha: 'ess', grupo: 'Kits', nome: 'KIT PET ESSENTIAL PINEAPPLE', slug: 'kit-pet-essential-tropical', curto: 'kit-pineapple' },
  { linha: 'pro', grupo: 'Kits', nome: 'KIT PET LISO INTENSO PRO (EGO) (4 ITENS)', slug: 'kit-pet-liso-intenso-ego-4-itens', curto: 'kit-liso-intenso' },
  { linha: 'pro', grupo: 'Kits', nome: 'KIT PET PERFUMES EXPERIMENTAÇÃO', slug: 'kit-pet-perfumes-experimentacao', curto: 'kit-perfumes-experimentacao' },
  { linha: 'pro', grupo: 'Kits', nome: 'KIT PET BANHO DE VOLUME (PRO) (4 ITENS)', slug: 'kit-pet-texturizador-ego-4-itens', curto: 'kit-banho-volume' },
  { linha: 'pro', grupo: 'Finalizadores', nome: 'LEAVE-IN PET FINALIZADOR PRO (EGO) 500ML (CREME)', slug: 'leave-in-pet-finalizador-ego-500ml-creme', curto: 'leave-in-finalizador-500ml-creme' },
  { linha: 'ess', grupo: 'Finalizadores', nome: 'LEAVE-IN PET SECAGEM RÁPIDA ESSENTIAL 500ML', slug: 'leave-in-pet-secagem-rapida-essential-500ml', curto: 'leave-in-secagem-rapida-500ml' },
  { linha: 'pro', grupo: 'Finalizadores', nome: 'LEAVE-IN PET TEXTURIZADOR PRO (EGO) 300ML', slug: 'leave-in-pet-texturizador-ego-300ml', curto: 'leave-in-texturizador-300ml' },
  { linha: 'pro', grupo: 'Auxiliares', nome: 'LIMPEZA PET OTOLÓGICA PRO (EGO) 500ML', slug: 'limpeza-pet-otologica-ego-500ml', curto: 'limpeza-otologica-500ml' },
  { linha: 'pro', grupo: 'Acessórios', nome: 'LUVA DE SILICONE DERMO PROTETOR PRO (EGO) 500ML', slug: 'luva-de-silicone-dermo-protetor-ego-500ml', curto: 'luva-silicone-dermo-protetor-500ml' },
  { linha: 'pro', grupo: 'Máscaras', nome: 'MÁSCARA PET HIDRATANTE PRO (EGO) 500ML', slug: 'mascara-pet-hidratante-ego-500ml', curto: 'mascara-hidratante-500ml' },
  { linha: 'pro', grupo: 'Máscaras', nome: 'MÁSCARA PET LISO INTENSO PRO (EGO) 500ML', slug: 'mascara-pet-liso-intenso-ego-500ml', curto: 'mascara-liso-intenso-500ml' },
  { linha: 'ess', grupo: 'Máscaras', nome: 'MÁSCARA PET MULTIFUNCIONAL ESSENTIAL 500G', slug: 'mascara-pet-multifuncional-essential-500g', curto: 'mascara-multifuncional-500g' },
  { linha: 'pro', grupo: 'Máscaras', nome: 'MÁSCARA PET NUTRITIVA PRO (EGO) 500ML', slug: 'mascara-pet-nutritiva-ego-500ml', curto: 'mascara-nutritiva-500ml' },
  { linha: 'pro', grupo: 'Máscaras', nome: 'MÁSCARA PET RECONSTRUTORA PRO (EGO) 500ML', slug: 'mascara-pet-reconstrutora-ego-500ml', curto: 'mascara-reconstrutora-500ml' },
  { linha: 'pro', grupo: 'Máscaras', nome: 'MÁSCARA PET TEXTURIZADORA PRO (EGO) 500ML', slug: 'mascara-pet-texturizadora-ego-500ml', curto: 'mascara-texturizadora-500ml' },
  { linha: 'pro', grupo: 'Finalizadores', nome: 'ÓLEO DE ARGAN PET PRO (EGO) 100ML', slug: 'oleo-de-argan-pet-ego-100ml', curto: 'oleo-argan-100ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET BRAVE PRO (EGO) 30ML', slug: 'perfume-pet-brave-ego-30ml', curto: 'perfume-brave-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET BRAVE PRO (EGO) 500ML', slug: 'perfume-pet-brave-ego-500ml', curto: 'perfume-brave-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET CANDY PRO (EGO) 30ML', slug: 'perfume-pet-candy-ego-30ml-1', curto: 'perfume-candy-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET CANDY PRO (EGO) 500ML', slug: 'perfume-pet-candy-ego-500ml', curto: 'perfume-candy-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET CHILD PRO (EGO) 30ML', slug: 'perfume-pet-child-ego-30ml', curto: 'perfume-child-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET CHILD PRO (EGO) 500ML', slug: 'perfume-pet-child-ego-500ml', curto: 'perfume-child-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET CHOCOLATE BELGA PRO (EGO) 30ML', slug: 'perfume-pet-chocolate-belga-ego-30ml', curto: 'perfume-chocolate-belga-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET CHOCOLATE BELGA PRO (EGO) 500ML', slug: 'perfume-pet-chocolate-belga-ego-500ml', curto: 'perfume-chocolate-belga-500ml' },
  { linha: 'ess', grupo: 'Perfumes', nome: 'PERFUME PET DUO FRUTADO ESSENTIAL 500ML', slug: 'perfume-pet-duo-frutado-essential-500ml', curto: 'perfume-duo-frutado-500ml' },
  { linha: 'ess', grupo: 'Perfumes', nome: 'PERFUME PET FLORATO ESSENTIAL 500ML', slug: 'perfume-pet-florato-essential-500ml', curto: 'perfume-florato-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET IMPERA PRO (EGO) 30ML', slug: 'perfume-pet-impera-ego-30ml', curto: 'perfume-impera-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET IMPERA PRO (EGO) 500ML', slug: 'perfume-pet-impera-ego-500ml', curto: 'perfume-impera-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET JABUTICABA PRO (EGO) 30ML', slug: 'perfume-pet-jabuticaba-ego-30ml', curto: 'perfume-jabuticaba-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET JABUTICABA PRO (EGO) 500ML', slug: 'perfume-pet-jabuticaba-ego-500ml', curto: 'perfume-jabuticaba-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET MACADÂMIA PRO (EGO) 30ML', slug: 'perfume-pet-macadamia-ego-30ml', curto: 'perfume-macadamia-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET MACADÂMIA PRO (EGO) 500ML', slug: 'perfume-pet-macadamia-ego-500ml', curto: 'perfume-macadamia-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET PUPPY PRO (EGO) 30ML', slug: 'perfume-pet-puppy-ego-30ml', curto: 'perfume-puppy-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET PUPPY PRO (EGO) 500ML', slug: 'perfume-pet-puppy-ego-500ml', curto: 'perfume-puppy-500ml' },
  { linha: 'ess', grupo: 'Perfumes', nome: 'PERFUME PET TROPICALE ESSENTIAL 500ML', slug: 'perfume-pet-tropicale-essential-500ml', curto: 'perfume-tropicale-500ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET ULTRA PRO (EGO) 30ML', slug: 'perfume-pet-ultra-ego-30ml', curto: 'perfume-ultra-30ml' },
  { linha: 'pro', grupo: 'Perfumes', nome: 'PERFUME PET ULTRA PRO (EGO) 500ML', slug: 'perfume-pet-ultra-ego-500ml', curto: 'perfume-ultra-500ml' },
  { linha: 'pro', grupo: 'Finalizadores', nome: 'SÉRUM PET LISO INTENSO PRO (EGO) 100ML', slug: 'serum-pet-liso-intenso-ego-100ml', curto: 'serum-liso-intenso-100ml' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET CLAREADOR PRO (EGO) 1L (1:10)', slug: 'shampoo-pet-clareador-ego-1l-1-10', curto: 'shampoo-clareador-1l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET CLAREADOR PRO (EGO) 5L (1:10)', slug: 'shampoo-pet-clareador-ego-5l-1-10', curto: 'shampoo-clareador-5l' },
  { linha: 'ess', grupo: 'Shampoos', nome: 'SHAMPOO PET CLAREADOR ESSENTIAL 5L (1:5)', slug: 'shampoo-pet-clareador-essential-5l-1-5', curto: 'shampoo-clareador-5l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET NEUTRALIZADOR DE ODORES PRÉ-LAVAGEM PRO (EGO) 1L (1:10)', slug: 'shampoo-pet-neutralizador-de-odores-ego-1l-1-11', curto: 'shampoo-neutralizador-odores-1l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET NEUTRALIZADOR DE ODORES PRÉ-LAVAGEM PRO (EGO) 5L (1:10)', slug: 'shampoo-pet-neutralizador-de-odores-ego-5l-1-11', curto: 'shampoo-neutralizador-odores-5l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET NEUTRO PRO (EGO) 1L (1:10)', slug: 'shampoo-pet-neutro-ego-1l-1-10', curto: 'shampoo-neutro-1l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET NEUTRO PRO (EGO) 5L (1:10)', slug: 'shampoo-pet-neutro-ego-5l-1-10', curto: 'shampoo-neutro-5l' },
  { linha: 'ess', grupo: 'Shampoos', nome: 'SHAMPOO PET NEUTRO ESSENTIAL 5L (1:5)', slug: 'shampoo-pet-neutro-essential-5l-1-5', curto: 'shampoo-neutro-5l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET REALÇADOR DE CORES PRO (EGO) 1L (1:10)', slug: 'shampoo-pet-realcador-de-cores-ego-1l-1-10', curto: 'shampoo-realcador-cores-1l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET REALÇADOR DE CORES PRO (EGO) 5L (1:10)', slug: 'shampoo-pet-realcador-de-cores-ego-5l-1-10', curto: 'shampoo-realcador-cores-5l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET REDUTOR DE OLEOSIDADE PRO (EGO) 1L (1:4)', slug: 'shampoo-pet-redutor-de-oleosidade-ego-1l-1-4', curto: 'shampoo-redutor-oleosidade-1l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET TEXTURIZADOR PRO (EGO) 1L (1:4)', slug: 'shampoo-pet-texturizador-ego-1l-1-4', curto: 'shampoo-texturizador-1l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET DERMO FACIAL PRO (EGO) 1L (PRONTO USO)', slug: 'shampoo-pet-dermo-facial-ego-1l-pronto-uso', curto: 'shampoo-dermo-facial-1l' },
  { linha: 'pro', grupo: 'Shampoos', nome: 'SHAMPOO PET LISO INTENSO PRO (EGO) 1L (1:4)', slug: 'shampoo-pet-liso-intenso-ego-1l-1-4', curto: 'shampoo-liso-intenso-1l' },
  { linha: 'pro', grupo: 'Finalizadores', nome: 'GEL MODELADOR PET ANTIFRIZZ PRO 15ML', slug: 'gel-modelador-pet-antifrizz-pro-15ml', curto: 'gel-modelador-antifrizz-15ml' },
  { linha: 'pro', grupo: 'Acessórios', nome: 'ADESIVO REDONDO PRO 25X25CM', slug: 'adesivo-redondo-pro-25x25cm', curto: 'adesivo-redondo-25x25cm' },
  { linha: 'ess', grupo: 'Shampoos', nome: 'SHAMPOO PET NEUTRALIZADOR PINEAPPLE ESSENTIAL 5L (1:5)', slug: 'shampoo-pet-neutralizador-pineapple-essential-5l-1-5', curto: 'shampoo-neutralizador-pineapple-5l' },
  { linha: 'ess', grupo: 'Perfumes', nome: 'PERFUME PET PINEAPPLE ESSENTIAL 500ML', slug: 'perfume-pet-pineapple-essential-500ml', curto: 'perfume-pineapple-500ml' },
  { linha: 'pro', grupo: 'Finalizadores', nome: 'LEAVE-IN PET FINALIZADOR PRO 500ML (SPRAY)', slug: 'leave-in-pet-finalizador-pro-500ml-spray', curto: 'leave-in-finalizador-500ml-spray' },
  { linha: 'ess', grupo: 'Kits', nome: 'KIT FINALIZADORES ESSENTIAL', slug: 'kit-finalizadores-essential', curto: 'kit-finalizadores' },
  { linha: 'pro', grupo: 'Finalizadores', nome: 'SPRAY PET DESEMBARAÇADOR PRO 500ML', slug: 'spray-pet-desembaracador-pro-500ml', curto: 'spray-desembaracador-500ml' },
  { linha: 'pro', grupo: 'Auxiliares', nome: 'LIMPEZA PET DE OLHOS PRO 500ML', slug: 'limpeza-pet-olhos-pro-500ml', curto: 'limpeza-olhos-500ml' },
  { linha: 'pro', grupo: 'Kits', nome: 'KIT PET EXPERIMENTAÇÃO LINHA PRO', slug: 'kit-pet-experimentacao-linha-pro', curto: 'kit-experimentacao' },
]

// ── Busca ────────────────────────────────────────────────────────────────────

// minúsculo, sem acento/cedilha; "5 litros", "5 L" e "5l" viram "5l"; "500 ml" vira "500ml".
export function normalizarBusca(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/(\d+)\s*(litros?|lts?)\b/g, '$1l')
    .replace(/(\d+)\s*(ml|l|g|kg)\b/g, '$1$2')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

// Palavra digitada → outras formas que também devem achar o produto.
const SINONIMOS: Record<string, string[]> = {
  ego: ['pro'],
  tropical: ['pineapple'],
  abacaxi: ['pineapple'],
  volume: ['volume', 'texturizador'],
  hidratacao: ['hidratante'],
  hidratar: ['hidratante'],
  clarear: ['clareador'],
  branco: ['clareador'],
  pelo: ['pelagem'],
  cheiro: ['odores', 'perfume'],
  odor: ['odores'],
  oleoso: ['oleosidade'],
  cor: ['cores', 'realcador'],
  orelha: ['otologica'],
  ouvido: ['otologica'],
  olho: ['olhos'],
  filhote: ['puppy', 'child'],
  colonia: ['colonia', 'perfume'],
  desembaraco: ['desembaracador'],
  frizz: ['antifrizz'],
}

const textoBusca = new Map<string, string>()
function haystack(p: ProdutoLinha): string {
  let h = textoBusca.get(p.slug)
  if (!h) {
    h = normalizarBusca(`${p.nome} ${p.slug.replace(/-/g, ' ')} ${p.grupo} ${p.linha === 'ess' ? 'essential' : 'pro'}`)
    textoBusca.set(p.slug, h)
  }
  return h
}

// Cada palavra digitada precisa aparecer no produto (pedaço de palavra vale: "sh" acha
// shampoo, "real" acha realçador), em qualquer ordem. Começo de palavra vale mais na ordem.
export function buscarProdutos(consulta: string, linha: CodigoLinhaColecao | null): ProdutoLinha[] {
  const base = linha ? PRODUTOS_LINHAS.filter((p) => p.linha === linha) : PRODUTOS_LINHAS
  const tokens = normalizarBusca(consulta).split(' ').filter(Boolean)
  const ordemGrupo = (p: ProdutoLinha) => ORDEM_GRUPOS.indexOf(p.grupo)
  if (tokens.length === 0) {
    return [...base].sort((a, b) => ordemGrupo(a) - ordemGrupo(b) || a.nome.localeCompare(b.nome))
  }
  const comNota: { p: ProdutoLinha; nota: number }[] = []
  for (const p of base) {
    const h = haystack(p)
    const palavras = h.split(' ')
    let nota = 0
    let ok = true
    for (const t of tokens) {
      const alternativas = [t, ...(SINONIMOS[t] ?? [])]
      const inicio = alternativas.some((a) => palavras.some((w) => w.startsWith(a)))
      const meio = inicio || alternativas.some((a) => h.includes(a))
      if (!meio) {
        ok = false
        break
      }
      nota += inicio ? 2 : 1
    }
    if (ok) comNota.push({ p, nota })
  }
  return comNota
    .sort((a, b) => b.nota - a.nota || ordemGrupo(a.p) - ordemGrupo(b.p) || a.p.nome.localeCompare(b.p.nome))
    .map((x) => x.p)
}

export function produtoPorSlug(slug: string): ProdutoLinha | undefined {
  return PRODUTOS_LINHAS.find((p) => p.slug === slug)
}

// Nome legível para mostrar na tela ("Shampoo Pet Clareador Pro (Ego) 1L (1:10)").
export function nomeLegivel(nome: string): string {
  return nome
    .toLowerCase()
    .replace(/(^|[\s(-])(\p{L})/gu, (_, a: string, b: string) => a + b.toUpperCase())
    .replace(/\b(\d+)(ml|l|g|cm)\b/gi, (_, n: string, u: string) => n + (u.toLowerCase() === 'l' ? 'L' : u.toLowerCase()))
}
