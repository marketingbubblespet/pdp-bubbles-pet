// src/lib/criacao-anuncio.ts
// Lê o que foi colado da planilha de criativos (Google Sheets) e separa os campos de
// cada anúncio. Também quebra textos soltos do Google (PMax, Search, extensões) em
// itens individuais. Funções puras: nenhum componente interpreta a colagem por conta.

// UTM fixa de todos os anúncios Meta (vale mesmo quando a planilha não traz).
export const UTM_PADRAO =
  'utm_source=facebook&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium=cpc_{{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}'

// Ordem das colunas da planilha (cabeçalho oficial). Se a colagem trouxer o cabeçalho,
// a posição real de cada coluna é lida dele; senão vale esta ordem.
const COLUNAS = {
  nome: 'nome do criativo',
  copy1: 'copy 01',
  copy2: 'copy 02',
  titulo1: 'titulo 1',
  titulo2: 'titulo 2',
  drive: 'link drive',
  destino: 'pagina de destino',
} as const
type Coluna = keyof typeof COLUNAS

const POSICAO_PADRAO: Record<Coluna, number> = {
  nome: 1,
  copy1: 9,
  copy2: 10,
  titulo1: 11,
  titulo2: 12,
  drive: 15,
  destino: 16,
}

const NOME_AD = /^ad\d+\|/i

export type CampoAnuncio = { rotulo: string; valor: string }
export type Anuncio = { nome: string; campos: CampoAnuncio[] }
export type ItemGoogle = { rotulo: string; texto: string; limite: number | null }
export type GrupoGoogle = { titulo: string; itens: ItemGoogle[] }
export type ResultadoColagem = { anuncios: Anuncio[]; google: GrupoGoogle[] }

const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/gu, '')
    .replace(/\*/g, '')
    .trim()
    .toLowerCase()

// Parser de TSV no formato do Google Sheets: célula com quebra de linha ou aspas vem
// entre aspas, e aspas internas viram "". Com `aspas` desligado, lê tudo literal
// (usado quando sobra uma aspa sem par, para não engolir o resto do texto).
function parseTsv(texto: string, aspas = true): string[][] | null {
  const linhas: string[][] = []
  let linha: string[] = []
  let celula = ''
  let dentro = false
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i]
    if (dentro) {
      if (c === '"') {
        if (texto[i + 1] === '"') {
          celula += '"'
          i++
        } else dentro = false
      } else celula += c
      continue
    }
    if (aspas && c === '"' && celula === '') dentro = true
    else if (c === '\t') {
      linha.push(celula)
      celula = ''
    } else if (c === '\n') {
      linha.push(celula)
      linhas.push(linha)
      linha = []
      celula = ''
    } else if (c !== '\r') celula += c
  }
  if (dentro) return null
  linha.push(celula)
  linhas.push(linha)
  return linhas
}

function posicoesDoCabecalho(linha: string[]): Record<Coluna, number> | null {
  const cab = linha.map(normalizar)
  if (!cab.includes(COLUNAS.nome)) return null
  const pos = { ...POSICAO_PADRAO }
  for (const chave of Object.keys(COLUNAS) as Coluna[]) {
    const i = cab.indexOf(COLUNAS[chave])
    if (i >= 0) pos[chave] = i
  }
  return pos
}

const ROTULOS: [Coluna, string][] = [
  ['copy1', 'Copy 01'],
  ['copy2', 'Copy 02'],
  ['titulo1', 'Título 01'],
  ['titulo2', 'Título 02'],
  ['drive', 'Link do material'],
  ['destino', 'Link de destino'],
]

function lerAnuncio(celulas: string[], pos: Record<Coluna, number>): Anuncio | null {
  // A nomenclatura identifica o anúncio. Se ela não está na coluna esperada (ex: a
  // colagem começou sem a coluna de status), desloca todas as colunas na mesma medida.
  let iNome = pos.nome
  if (!NOME_AD.test((celulas[iNome] ?? '').trim())) {
    iNome = celulas.findIndex((c) => NOME_AD.test(c.trim()))
    if (iNome < 0) return null
  }
  const desloc = iNome - pos.nome
  const campos: CampoAnuncio[] = [{ rotulo: 'Nomenclatura', valor: celulas[iNome].trim() }]
  for (const [chave, rotulo] of ROTULOS) {
    const valor = (celulas[pos[chave] + desloc] ?? '').trim()
    if (valor) campos.push({ rotulo, valor })
  }
  campos.push({ rotulo: 'UTM', valor: UTM_PADRAO })
  return { nome: celulas[iNome].trim(), campos }
}

// ── Linha pronta para a planilha ─────────────────────────────────────────────

export type Complemento = {
  copy1: string
  copy2: string
  titulo1: string
  titulo2: string
  drive: string
  destino: string
}

export const COMPLEMENTO_VAZIO: Complemento = { copy1: '', copy2: '', titulo1: '', titulo2: '', drive: '', destino: '' }

// Célula no formato que o Google Sheets aceita ao colar: com quebra de linha, tab ou
// aspas, vai entre aspas (aspas internas dobradas) para não quebrar em várias células.
function celulaTsv(v: string): string {
  return /["\t\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v
}

// Linha com as 17 colunas oficiais, a partir de "Status Meta". Colunas que o gerador
// não conhece ficam vazias, para quem cola completar na planilha.
export function linhaPlanilha(p: {
  nome: string
  midia: string
  data: string
  inicio: string
  fim: string
  c: Complemento
}): string {
  const col = new Array<string>(17).fill('')
  col[1] = p.nome
  col[3] = p.data
  col[4] = p.midia
  col[9] = p.c.copy1.trim()
  col[10] = p.c.copy2.trim()
  col[11] = p.c.titulo1.trim()
  col[12] = p.c.titulo2.trim()
  col[13] = p.inicio
  col[14] = p.fim
  col[15] = p.c.drive.trim()
  col[16] = p.c.destino.trim()
  return col.map(celulaTsv).join('\t')
}

// ── Textos soltos do Google ──────────────────────────────────────────────────

const CABECALHO_GOOGLE =
  /^(t[ií]tulos?( longos?)?|headlines?|long headlines?|descri[cç](ao|ão|oes|ões)|descriptions?|pmax|performance max|search|pesquisa|rede de pesquisa|extens(ao|ão|oes|ões)|sitelinks?|frases? de destaque|callouts?|snippets?|google( ads)?)\b/i

// Limite de caracteres do Google Ads conforme o tipo do texto (null = desconhecido).
function limitePorRotulo(rotulo: string): number | null {
  const r = normalizar(rotulo)
  if (/titulo longo|long headline/.test(r)) return 90
  if (/titulo|headline/.test(r)) return 30
  if (/descri/.test(r)) return 90
  if (/sitelink|frase de destaque|frases de destaque|callout/.test(r)) return 25
  return null
}

function lerGoogle(linhas: string[]): GrupoGoogle[] {
  const grupos: GrupoGoogle[] = []
  let atual: GrupoGoogle | null = null
  for (const bruta of linhas) {
    const linha = bruta.trim()
    if (!linha) continue
    const ehCabecalho =
      linha.length <= 60 && (linha.endsWith(':') || (CABECALHO_GOOGLE.test(linha) && !/[.!?]$/.test(linha)))
    if (ehCabecalho && !/:\s*\S/.test(linha.replace(/:$/, ''))) {
      atual = { titulo: linha.replace(/:$/, ''), itens: [] }
      grupos.push(atual)
      continue
    }
    if (!atual) {
      atual = { titulo: 'Textos', itens: [] }
      grupos.push(atual)
    }
    let texto = linha.replace(/^\s*(?:[-•*]|\d+\s*[.)-])\s+/, '')
    let rotulo = atual.titulo
    const m = texto.match(/^([^:]{2,30}):\s+(.+)$/)
    if (m && CABECALHO_GOOGLE.test(m[1].trim())) {
      rotulo = m[1].trim()
      texto = m[2].trim()
    }
    atual.itens.push({ rotulo, texto, limite: limitePorRotulo(rotulo) })
  }
  return grupos.filter((g) => g.itens.length > 0)
}

export function lerColagem(texto: string): ResultadoColagem {
  const tabela = parseTsv(texto) ?? parseTsv(texto, false) ?? []
  let pos = POSICAO_PADRAO
  const anuncios: Anuncio[] = []
  const soltas: string[] = []

  for (const celulas of tabela) {
    const cab = posicoesDoCabecalho(celulas)
    if (cab) {
      pos = cab
      continue
    }
    if (celulas.length > 1) {
      const anuncio = lerAnuncio(celulas, pos)
      if (anuncio) anuncios.push(anuncio)
      continue
    }
    // Sem tabulação: texto solto (títulos e descrições do Google). Uma célula entre
    // aspas pode trazer várias linhas, então quebra de novo.
    soltas.push(...celulas[0].split('\n'))
  }
  return { anuncios, google: lerGoogle(soltas) }
}
