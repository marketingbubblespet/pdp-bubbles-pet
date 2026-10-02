// src/lib/nomenclatura.ts
// Ferramenta interna: gerador de nomenclatura padronizada de criativos (Meta Ads).
// Toda a "verdade" do padrão vive aqui: listas de opções, códigos, rótulos e as
// funções puras que montam o nome. Nenhum componente monta a string por conta própria,
// tudo passa por montarNome(). Se o padrão mudar em 2027, muda só neste arquivo.

// ── Formato final ────────────────────────────────────────────────────────────
// ad07|img|pont|grm|pro|sha|clareador|axoly-performance|influ-weryka|kit-pistache|wpp|ate-28-out-26
//  1    2    3    4    5   6      7            8               9            10      11      12
// 1 numero  2 midia  3 ciclo  4 publico  5 linha  6 categoria  7 produto
// 8 metodologia  9 talento (quem aparece)  10 do que se trata  11 destino (some se for o site)
// 12 data: pontual = "ate-dia-mes-ano" escolhido; contínuo = mês-ano em que foi gerado.
// Blocos vazios (4 a 11) somem do nome, e valores genéricos ("todas", "todos") também,
// pra não repetir "todas|todos|todos" em anúncio que não é de produto.

export type OpcaoSimples = { codigo: string; rotulo: string }
export type Opcao = OpcaoSimples & { ex: string }

export const OPCOES_MIDIA: Opcao[] = [
  { codigo: 'img', rotulo: 'Imagem', ex: 'arte estática, foto de produto' },
  { codigo: 'vid', rotulo: 'Vídeo', ex: 'vídeo no feed' },
  { codigo: 'car', rotulo: 'Carrossel', ex: 'vários cards, imagem ou vídeo' },
  { codigo: 'reels', rotulo: 'Reels', ex: 'vídeo vertical para Reels' },
  { codigo: 'stories', rotulo: 'Stories', ex: 'vídeo ou arte vertical para Stories' },
  { codigo: 'outro', rotulo: 'Outro', ex: 'formato não listado, você escreve' },
]

export const OPCOES_CICLO: Opcao[] = [
  {
    codigo: 'pont',
    rotulo: 'Pontual',
    ex: 'tem data para acabar. O nome termina com a data final, ex: ate-28-out-26',
  },
  { codigo: 'cont', rotulo: 'Contínuo', ex: 'sem prazo. O nome termina com o mês atual, ex: set-26' },
]

// Para onde o clique leva. Site é o padrão e não entra no nome.
export const OPCOES_DESTINO: Opcao[] = [
  { codigo: 'site', rotulo: 'Site / loja', ex: 'padrão, não aparece no nome' },
  { codigo: 'wpp', rotulo: 'WhatsApp', ex: 'conversa com o atendimento' },
  { codigo: 'insta', rotulo: 'Perfil do Instagram', ex: 'visitas ao perfil' },
  { codigo: 'lp', rotulo: 'Landing page', ex: 'LP de captação. Pede o nome da LP' },
]

const BLOCO_DESTINO: Record<string, string> = {
  wpp: 'wpp',
  insta: 'insta-visitas-ao-perfil',
}

// Atalhos de nome de LP (o campo aceita texto livre).
export const SUGESTOES_LP = ['masterclass-coloracao', 'captacao-distribuidor', 'care', 'live-care', 'essential']

// Valores que não dizem nada no nome: quando aparecem em linha, categoria ou produto,
// o bloco some.
const GENERICOS = new Set(['todas', 'todos', 'todo', 'toda', 'geral', 'nenhum', 'nenhuma'])
const util = (s: string) => (GENERICOS.has(s) ? '' : s)

export const OPCOES_PUBLICO: Opcao[] = [
  { codigo: 'grm', rotulo: 'Groomer', ex: 'profissional de banho e tosa' },
  { codigo: 'tut', rotulo: 'Tutor', ex: 'dono do pet, consumidor final' },
  { codigo: 'dis', rotulo: 'Distribuidor', ex: 'revenda, atacado' },
  { codigo: 'brand', rotulo: 'Branding / Geral', ex: 'institucional, sem público específico' },
  { codigo: 'outro', rotulo: 'Outro', ex: 'ex: veterinário. Você escreve' },
]

export const OPCOES_LINHA: Opcao[] = [
  { codigo: 'pro', rotulo: 'PRO', ex: 'linha principal, antiga Ego' },
  { codigo: 'ess', rotulo: 'Essential', ex: 'linha de entrada' },
  { codigo: 'xpe', rotulo: 'Xperience', ex: 'kits gourmand sensoriais' },
  { codigo: 'col', rotulo: 'Collora', ex: 'coloração' },
  { codigo: 'care', rotulo: 'Care', ex: 'linha de revenda petshop' },
  { codigo: 'outro', rotulo: 'Outro', ex: 'linha não listada, você escreve' },
]

// Categorias seguem o menu do site. "inst" cobre criativo de marca sem produto.
export const OPCOES_CATEGORIA: OpcaoSimples[] = [
  { codigo: 'sha', rotulo: 'Shampoos' },
  { codigo: 'cond', rotulo: 'Condicionadores' },
  { codigo: 'masc', rotulo: 'Máscaras' },
  { codigo: 'perf', rotulo: 'Perfumes' },
  { codigo: 'final', rotulo: 'Finalizadores' },
  { codigo: 'kit', rotulo: 'Kit' },
  { codigo: 'aux', rotulo: 'Auxiliares' },
  { codigo: 'aces', rotulo: 'Acessórios' },
  { codigo: 'color', rotulo: 'Coloração' },
  { codigo: 'todos', rotulo: 'Todos os produtos' },
  { codigo: 'lanc', rotulo: 'Lançamentos' },
  { codigo: 'inst', rotulo: 'Institucional, sem produto' },
]

export const OPCOES_METODOLOGIA: Opcao[] = [
  { codigo: 'axoly', rotulo: 'Axoly', ex: 'produzido ou gerido pela Axoly. Pede o pilar' },
  { codigo: 'interno', rotulo: 'Interno', ex: 'produção interna Bubbles' },
  { codigo: 'outro', rotulo: 'Outro', ex: 'freelancer, a própria influencer, cliente' },
]

export const OPCOES_TALENTO: Opcao[] = [
  { codigo: 'influ', rotulo: 'Influenciador(a)', ex: 'aparece um influencer. Pede o nome' },
  { codigo: 'int', rotulo: 'Colaborador(a) interno', ex: 'quem grava é da equipe Bubbles' },
  { codigo: 'nenhum', rotulo: 'Ninguém aparece', ex: 'arte, foto de produto, motion' },
]

// Atalhos de nome para colaboradores que costumam gravar. A pessoa também pode digitar
// um nome novo.
export const COLABORADORES = ['amanda', 'anna', 'ana', 'mariane', 'claudio', 'paulo', 'ivan', 'guilherme', 'gabriel']

// Sugestões de produto específico por linha (só atalho, o campo aceita texto livre).
export const SUGESTOES_PRODUTO: Record<string, string[]> = {
  pro: [
    'neutralizador',
    'neutro',
    'clareador',
    'realcador',
    'redutor-oleosidade',
    'texturizador',
    'liso-intenso',
    'hidratante',
    'dermo-facial',
  ],
  ess: ['neutro', 'hidratante', 'filhotes'],
  xpe: ['gelato-pistache', 'banho-volume'],
  col: [],
  care: ['hidratante-patinhas'],
  outro: [],
}

export const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
export const MESES_NOME = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

// ── Estado do formulário ─────────────────────────────────────────────────────
export type EstadoNomenclatura = {
  numero: string
  midia: string
  midiaOutro: string
  ciclo: string
  // Data final do pontual, em partes (dia "1".."31", mês "1".."12", ano "2026").
  dataDia: string
  dataMes: string
  dataAno: string
  destino: string
  lpNome: string
  publico: string
  publicoOutro: string
  linha: string
  linhaOutro: string
  categoria: string
  produto: string
  metodologia: string
  pilar: string
  metodologiaOutro: string
  talentoTipo: string
  talentoNome: string
  descricao: string
}

export const ESTADO_VAZIO: EstadoNomenclatura = {
  numero: '',
  midia: '',
  midiaOutro: '',
  ciclo: '',
  dataDia: '',
  dataMes: '',
  dataAno: '',
  destino: 'site',
  lpNome: '',
  publico: '',
  publicoOutro: '',
  linha: '',
  linhaOutro: '',
  categoria: '',
  produto: '',
  metodologia: '',
  pilar: '',
  metodologiaOutro: '',
  talentoTipo: '',
  talentoNome: '',
  descricao: '',
}

// Exemplo usado pelo botão "preencher exemplo" (só aparece no localhost).
export const EXEMPLO_TESTE: EstadoNomenclatura = {
  ...ESTADO_VAZIO,
  numero: '7',
  midia: 'img',
  ciclo: 'pont',
  dataDia: '28',
  dataMes: '10',
  dataAno: String(new Date().getFullYear()),
  publico: 'grm',
  linha: 'pro',
  categoria: 'sha',
  produto: 'Clareador',
  metodologia: 'axoly',
  pilar: 'Performance',
  talentoTipo: 'influ',
  talentoNome: 'Weryka',
  descricao: 'linha pro com desconto',
}

// Quais campos do estado pertencem a cada etapa (1 a 4). Usado pelo "preencher
// exemplo" de cada etapa, que só mexe nos campos daquela etapa.
export const CAMPOS_POR_ETAPA: Record<number, (keyof EstadoNomenclatura)[]> = {
  1: ['numero', 'midia', 'midiaOutro', 'ciclo', 'dataDia', 'dataMes', 'dataAno', 'destino', 'lpNome'],
  2: ['publico', 'publicoOutro', 'linha', 'linhaOutro', 'categoria', 'produto'],
  3: ['metodologia', 'pilar', 'metodologiaOutro', 'talentoTipo', 'talentoNome'],
  4: ['descricao'],
}

// ── Funções puras ────────────────────────────────────────────────────────────

// minúsculo, sem acento, espaços e símbolos viram "-", traços colapsados e aparados.
export function slug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// "7" vira "07"; "12" continua "12"; "100" continua "100". Só dígitos.
export function formatarNumero(bruto: string): string {
  const d = bruto.replace(/\D/g, '')
  if (d === '') return ''
  return d.length === 1 ? `0${d}` : d
}

export function mesAno(agora: Date = new Date()): string {
  return `${MESES[agora.getMonth()]}-${String(agora.getFullYear()).slice(-2)}`
}

// Data final do pontual válida (dia existe naquele mês)? Devolve a Date ou null.
export function dataLimite(e: EstadoNomenclatura): Date | null {
  const d = Number(e.dataDia)
  const m = Number(e.dataMes)
  const a = Number(e.dataAno)
  if (!d || !m || !a) return null
  const dt = new Date(a, m - 1, d)
  return dt.getMonth() === m - 1 ? dt : null
}

// "ate-05-set-26"
export function blocoDataLimite(e: EstadoNomenclatura): string {
  const dt = dataLimite(e)
  if (!dt) return ''
  return `ate-${String(dt.getDate()).padStart(2, '0')}-${MESES[dt.getMonth()]}-${String(dt.getFullYear()).slice(-2)}`
}

function blocoDestino(e: EstadoNomenclatura): string {
  if (e.destino === 'lp') {
    const nome = slug(e.lpNome)
    return nome ? `lp-${nome}` : ''
  }
  return BLOCO_DESTINO[e.destino] ?? ''
}

// Último bloco do nome: data final (pontual) ou mês em que foi gerado (contínuo).
function blocoData(e: EstadoNomenclatura, agora: Date): string {
  if (e.ciclo === 'pont') return blocoDataLimite(e)
  if (e.ciclo === 'cont') return mesAno(agora)
  return ''
}

// Resolve um bloco de opção: se for "outro", usa o texto livre; senão, o próprio código.
function valorOpcao(codigo: string, outro: string): string {
  if (codigo === 'outro') return slug(outro)
  return codigo
}

function blocoMetodologia(e: EstadoNomenclatura): string {
  if (e.metodologia === 'axoly') {
    const p = slug(e.pilar)
    return p ? `axoly-${p}` : 'axoly'
  }
  if (e.metodologia === 'interno') return 'interno'
  if (e.metodologia === 'outro') return slug(e.metodologiaOutro)
  return ''
}

function blocoTalento(e: EstadoNomenclatura): string {
  const nome = slug(e.talentoNome)
  if (e.talentoTipo === 'influ') return nome ? `influ-${nome}` : ''
  if (e.talentoTipo === 'int') return nome ? `int-${nome}` : ''
  return ''
}

export type SegmentoNome = { texto: string; dica: string }

function rotuloDe(lista: OpcaoSimples[], codigo: string): string {
  return lista.find((o) => o.codigo === codigo)?.rotulo ?? codigo
}

const semTraco = (s: string) => s.replace(/-/g, ' ')

// Quebra o nome em segmentos com a explicação de cada bloco. É a fonte de montarNome()
// e também alimenta os tooltips (passar o mouse numa abreviação mostra o significado).
export function segmentosNome(e: EstadoNomenclatura, agora: Date = new Date()): SegmentoNome[] {
  const segs: SegmentoNome[] = []
  const num = formatarNumero(e.numero)
  segs.push({
    texto: num ? `ad${num}` : 'ad',
    dica: num ? `Anúncio número ${num}` : 'Número do anúncio, em branco',
  })

  const midia = valorOpcao(e.midia, e.midiaOutro)
  if (midia) {
    segs.push({
      texto: midia,
      dica: `Mídia: ${e.midia === 'outro' ? e.midiaOutro : rotuloDe(OPCOES_MIDIA, midia)}`,
    })
  }
  if (e.ciclo) segs.push({ texto: e.ciclo, dica: `Ciclo: ${rotuloDe(OPCOES_CICLO, e.ciclo)}` })

  const publico = valorOpcao(e.publico, e.publicoOutro)
  if (publico) {
    segs.push({
      texto: publico,
      dica: `Público: ${e.publico === 'outro' ? e.publicoOutro : rotuloDe(OPCOES_PUBLICO, publico)}`,
    })
  }

  const linha = util(valorOpcao(e.linha, e.linhaOutro))
  if (linha) {
    segs.push({
      texto: linha,
      dica: `Linha: ${e.linha === 'outro' ? e.linhaOutro : rotuloDe(OPCOES_LINHA, linha)}`,
    })
  }
  if (util(e.categoria)) {
    segs.push({ texto: e.categoria, dica: `Categoria: ${rotuloDe(OPCOES_CATEGORIA, e.categoria)}` })
  }

  const prod = util(slug(e.produto))
  if (prod) segs.push({ texto: prod, dica: `Produto: ${semTraco(prod)}` })

  const met = blocoMetodologia(e)
  if (met) {
    const dica =
      e.metodologia === 'axoly'
        ? `Metodologia: Axoly${slug(e.pilar) ? `, pilar ${semTraco(slug(e.pilar))}` : ''}`
        : e.metodologia === 'interno'
          ? 'Metodologia: produção interna'
          : `Metodologia: ${semTraco(slug(e.metodologiaOutro))}`
    segs.push({ texto: met, dica })
  }

  const tal = blocoTalento(e)
  if (tal) {
    const nome = semTraco(slug(e.talentoNome))
    segs.push({
      texto: tal,
      dica: e.talentoTipo === 'influ' ? `Influenciador(a): ${nome}` : `Colaborador(a) interno: ${nome}`,
    })
  }

  const desc = slug(e.descricao)
  if (desc) segs.push({ texto: desc, dica: `Do que se trata: ${semTraco(desc)}` })

  const dest = blocoDestino(e)
  if (dest) {
    const rot = rotuloDe(OPCOES_DESTINO, e.destino)
    segs.push({ texto: dest, dica: `Destino: ${e.destino === 'lp' ? `landing page ${semTraco(slug(e.lpNome))}` : rot}` })
  }

  const data = blocoData(e, agora)
  if (data) {
    const dt = dataLimite(e)
    segs.push({
      texto: data,
      dica:
        e.ciclo === 'pont' && dt
          ? `Roda até ${dt.getDate()} de ${MESES_NOME[dt.getMonth()]} de ${dt.getFullYear()}`
          : `Mês em que o nome foi gerado: ${data}`,
    })
  }

  return segs
}

// Monta o nome final. `agora` é injetável para ficar testável e para o histórico
// gravar sempre a data em que o nome foi gerado.
export function montarNome(e: EstadoNomenclatura, agora: Date = new Date()): string {
  return segmentosNome(e, agora)
    .map((s) => s.texto)
    .filter(Boolean)
    .join('|')
}

export type Pendencia = { campo: string; rotulo: string; etapa: number }

// Campos OBRIGATÓRIOS: sem eles o nome não é gerado. Devolve o que falta e em qual etapa.
export function obrigatoriosFaltando(e: EstadoNomenclatura): Pendencia[] {
  const p: Pendencia[] = []
  if (formatarNumero(e.numero) === '') p.push({ campo: 'numero', rotulo: 'Número do anúncio', etapa: 1 })
  if (e.midia === '' || (e.midia === 'outro' && slug(e.midiaOutro) === '')) {
    p.push({ campo: 'midia', rotulo: 'Tipo de mídia', etapa: 1 })
  }
  if (e.ciclo === '') p.push({ campo: 'ciclo', rotulo: 'Pontual ou contínuo', etapa: 1 })
  if (e.ciclo === 'pont' && !dataLimite(e)) p.push({ campo: 'data', rotulo: 'Data final do anúncio pontual', etapa: 1 })
  if (e.destino === 'lp' && slug(e.lpNome) === '') p.push({ campo: 'destino', rotulo: 'Nome da landing page', etapa: 1 })
  if (e.publico === '' || (e.publico === 'outro' && slug(e.publicoOutro) === '')) {
    p.push({ campo: 'publico', rotulo: 'Público', etapa: 2 })
  }
  return p
}

// Campos OPCIONAIS que ficaram em branco: só um lembrete no fim, não bloqueia.
export function camposEmBranco(e: EstadoNomenclatura): string[] {
  const faltando: string[] = []
  if (e.linha === '' || (e.linha === 'outro' && slug(e.linhaOutro) === '')) faltando.push('Linha do produto')
  if (e.categoria === '') faltando.push('Categoria')
  if (blocoMetodologia(e) === '') faltando.push('Metodologia (Axoly / Interno)')
  if (e.talentoTipo === '') faltando.push('Quem aparece no criativo')
  if (slug(e.descricao) === '') faltando.push('Do que se trata o anúncio')
  return faltando
}

// Payload achatado para o Netlify Forms: cada campo numa coluna, além do nome pronto.
export function payloadRegistro(
  e: EstadoNomenclatura,
  nome: string,
  agora: Date = new Date(),
): Record<string, string> {
  return {
    nomeGerado: nome,
    numero: formatarNumero(e.numero),
    midia: valorOpcao(e.midia, e.midiaOutro),
    ciclo: e.ciclo,
    publico: valorOpcao(e.publico, e.publicoOutro),
    linha: valorOpcao(e.linha, e.linhaOutro),
    categoria: e.categoria,
    produto: slug(e.produto),
    metodologia: e.metodologia,
    pilar: slug(e.pilar),
    talentoTipo: e.talentoTipo,
    talentoNome: slug(e.talentoNome),
    descricao: slug(e.descricao),
    destino: blocoDestino(e),
    dataFinal: blocoDataLimite(e),
    mesAno: blocoData(e, agora),
    geradoEm: agora.toISOString(),
  }
}
