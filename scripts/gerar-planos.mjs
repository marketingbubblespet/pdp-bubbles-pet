// scripts/gerar-planos.mjs
// Lê o .md unificado real (Meta + Google, schema `canais[]`) e gera UM arquivo
// content/planos/*.md no schema que o sistema Next.js (/planos) já espera, com os
// dois canais juntos na mesma página: cada canal vira um nó-raiz sintético
// ("Meta Ads" / "Google Ads"), e a campanha/conjunto/anúncio reais de cada canal
// ficam pendurados nele via `pai` — sem misturar os dados dos dois canais entre si.
// Não adiciona nenhuma feature nova: só traduz a estrutura, campo a campo, pro
// schema já existente em src/lib/planos/types.ts. Regra 0.1 continua valendo:
// nada é calculado ou inventado aqui, só copiado (o nó sintético do canal usa o
// investimento e a meta que já vêm prontos em `canais[].investimento`).
//
// Uso: node scripts/gerar-planos.mjs <entrada.md>

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const entradaArg = process.argv[2]
if (!entradaArg) {
  console.error('Uso: node scripts/gerar-planos.mjs <entrada.md>')
  process.exit(1)
}
const entradaPath = path.resolve(entradaArg)
if (!fs.existsSync(entradaPath)) {
  console.error(`Arquivo não encontrado: ${entradaPath}`)
  process.exit(1)
}

function normalizarDatas(valor) {
  if (valor instanceof Date) return valor.toISOString().slice(0, 10)
  if (Array.isArray(valor)) return valor.map(normalizarDatas)
  if (valor && typeof valor === 'object') {
    const saida = {}
    for (const [k, v] of Object.entries(valor)) saida[k] = normalizarDatas(v)
    return saida
  }
  return valor
}

function blindarYamlTextoComLista(raw) {
  return raw.replace(/^(\s*texto: )(- .*)$/gm, (_, prefixo, valor) => {
    const escapado = valor.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    return `${prefixo}"${escapado}"`
  })
}

function desduplicarIds(itens) {
  const vistos = new Map()
  const percorrer = (lista) => {
    for (const item of lista ?? []) {
      const contagem = vistos.get(item.id) ?? 0
      if (contagem > 0) item.id = `${item.id}--dup${contagem}`
      vistos.set(item.id, contagem + 1)
      percorrer(item.conjuntos)
      percorrer(item.anuncios)
    }
  }
  percorrer(itens)
  return itens
}

const raw = blindarYamlTextoComLista(fs.readFileSync(entradaPath, 'utf8'))
const { data } = matter(raw)
const relatorio = normalizarDatas(data)
for (const canal of relatorio.canais ?? []) desduplicarIds(canal.campanhas)

function apelidoDe(nome, nivel) {
  const limpo = (nome ?? '').trim()
  const prefixo = { campanha: 'CAM', conjunto: 'CJ', anuncio: 'AD' }[nivel] ?? '·'
  const primeiraPalavra = limpo.split(/[\s_|]/)[0]
  return primeiraPalavra ? `${prefixo} ${primeiraPalavra}`.slice(0, 24) : prefixo
}

function paraAcao(item, pai) {
  return {
    id: item.id,
    nivel: item.nivel,
    pai,
    nome: item.nome,
    apelido: apelidoDe(item.nome, item.nivel),
    acao: item.acao ?? null,
    tipo_acao: item.tipo_acao ?? null,
    situacao: item.situacao ?? null,
    papel: item.papel ?? null,
    evidencia: {
      cliques: item.evidencia?.cliques ?? null,
      vendas_esperadas: item.evidencia?.vendas_esperadas ?? null,
      leitura: item.evidencia?.leitura ?? 'sem leitura',
    },
    verba: item.verba ?? { atual: null, sugerida: null, anterior: null, variacao_pct: null },
    metricas: item.metricas ?? {},
    motivos: item.motivos ?? [],
    sinais_suprimidos: item.sinais_suprimidos ?? [],
    expectativa: item.expectativa ?? null,
    perguntas: item.perguntas ?? [],
    opcoes: item.opcoes ?? [],
    historico: item.historico ?? null,
  }
}

function achatarCanal(canal, paiRaiz) {
  const acoes = []
  const percorrer = (itens, pai) => {
    for (const item of itens ?? []) {
      acoes.push(paraAcao(item, pai))
      percorrer(item.conjuntos, item.id)
      percorrer(item.anuncios, item.id)
    }
  }
  percorrer(canal.campanhas, paiRaiz)
  return acoes
}

// Nó sintético de topo pra cada canal, só pra agrupar visualmente Meta e Google na
// mesma página — não é um dado da fonte, por isso fica claramente marcado como
// "resumo do canal" e não entra em nenhuma decisão real (tipo_acao: 'manter').
function noCanal(canal, nome) {
  const inv = canal.investimento ?? {}
  return {
    id: `canal-${canal.id}`,
    nivel: 'campanha',
    pai: null,
    nome: `${nome} · resumo do canal`,
    apelido: nome,
    acao: '→ Manter',
    tipo_acao: 'manter',
    situacao: null,
    papel: null,
    evidencia: { cliques: null, vendas_esperadas: null, leitura: 'sem leitura' },
    verba: { atual: null, sugerida: null, anterior: null, variacao_pct: null },
    metricas: {
      investimento: { valor: inv.janela ?? null, var_pct: inv.var_pct ?? null, meta: inv.teto_mensal ?? null },
      vendas: { valor: null, var_pct: null, meta: null },
      ticket_medio: { valor: null, var_pct: null, meta: null },
      roas_lc: { valor: null, var_pct: null, meta: null },
      roas_fc: { valor: null, var_pct: null, meta: null },
      roas_assist: { valor: null, var_pct: null, meta: null },
      ctr: { valor: null, var_pct: null, meta: null },
      impressoes: { valor: null, var_pct: null, meta: null },
      sessoes: { valor: null, var_pct: null, meta: null },
      connect_rate: { valor: null, var_pct: null, meta: null },
    },
    motivos: [],
    sinais_suprimidos: [],
    expectativa: null,
    perguntas: [],
    opcoes: [],
    historico: null,
  }
}

const NOMES = { meta: 'Meta Ads', google: 'Google Ads' }

function montarFrontmatter(obj) {
  return yaml.dump(obj, { lineWidth: -1, noRefs: true })
}

const outDir = path.resolve('content/planos')
fs.mkdirSync(outDir, { recursive: true })

const canais = relatorio.canais ?? []
const acoes = []
for (const canal of canais) {
  const nome = NOMES[canal.id] ?? canal.nome
  const raiz = noCanal(canal, nome)
  acoes.push(raiz)
  acoes.push(...achatarCanal(canal, raiz.id))
}

const slug = `${relatorio.slug}-unificado`
const investimentoTotal = {
  janela: relatorio.conta?.investimento_total ?? null,
  anterior: null,
  teto_mensal: canais[0]?.investimento?.teto_mensal ?? null,
  projecao_mes: null,
}

const frontmatter = {
  tipo: 'relatorio-analise',
  slug,
  cliente: relatorio.cliente,
  canal: canais.map((c) => NOMES[c.id] ?? c.nome).join(' + '),
  nivel: 'campanha',
  gerado_em: relatorio.gerado_em,
  revisor: relatorio.revisor,
  whatsapp: relatorio.whatsapp,
  periodo: relatorio.periodo,
  comparativo: relatorio.comparativo,
  evidencia: relatorio.evidencia,
  completude: relatorio.completude,
  investimento: investimentoTotal,
  conta: relatorio.conta,
  acoes,
  podios: relatorio.podios ?? null,
  glossario: relatorio.glossario ?? [],
  ressalvas: relatorio.ressalvas ?? [],
  auditoria: relatorio.auditoria ?? [],
  proveniencia: relatorio.proveniencia,
}

const corpo = `## Diagnóstico · Bubbles · Meta + Google Ads

Relatório gerado a partir do material cru enviado (\`${path.basename(entradaPath)}\`), com **Meta Ads e Google Ads juntos nesta mesma página**, período de **${relatorio.periodo.inicio} a ${relatorio.periodo.fim}**. Os dois primeiros itens da lista ("Meta Ads · resumo do canal" e "Google Ads · resumo do canal") são só um agrupador visual, não é dado da fonte nem decisão real. As ações dentro de cada um vêm direto do frontmatter, sem nenhum texto adicional.
`

const conteudo = `---\n${montarFrontmatter(frontmatter)}\n---\n\n${corpo}`
const destino = path.join(outDir, `${slug}.md`)
fs.writeFileSync(destino, conteudo, 'utf8')
console.log(`Gerado: content/planos/${slug}.md (${acoes.length} ações, ${canais.length} canais)`)
