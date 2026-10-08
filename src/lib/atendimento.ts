// src/lib/atendimento.ts
// Dados e rastreamento isolados da página /atendimento: recebe o tráfego de anúncio do
// Meta e leva a pessoa para o WhatsApp de atendimento da Bubbles.
//
// Cada visita ganha um ID de atendimento (5 caracteres, letra maiúscula e número) que vai
// escrito na mensagem do WhatsApp e é gravado no Netlify Forms junto com hora de entrada,
// hora do clique, UTMs, IDs de clique (gclid, fbclid...) e cookies de anúncio. Depois da
// compra na Shopify, o ID (ou a hora de entrada/clique) liga o pedido a esse registro para
// o envio de conversão offline.
//
// IMPORTANTE: todo campo de `montarRegistro` precisa estar declarado no form
// "atendimento-whatsapp" em public/__forms.html. Campo não declarado é descartado em
// silêncio pelo Netlify.

export const ATENDIMENTO = {
  slug: 'atendimento',
  // Número informado pelo usuário em 08/10/2026.
  whatsappNumero: '5514997023387',
  formName: 'atendimento-whatsapp',
  // Sem clique, abre o WhatsApp sozinho depois deste tempo. 0 desliga o automático.
  autoRedirectSegundos: 10,
} as const

// ── Variações de texto por UTM ───────────────────────────────────────────────
// A página procura estas palavras em utm_campaign, utm_content e utm_term (sem acento,
// minúsculo), inclusive os códigos da nomenclatura (ess, col, perf, kit, pro). A primeira que bater define o texto. Sem UTM ou sem palavra conhecida: padrão.

export type VariacaoAtendimento = {
  chave: string
  eyebrow: string
  titulo: string
  subtitulo: string
  // Trecho que entra na mensagem do WhatsApp: "quero atendimento <assunto>".
  assunto: string
}

const PADRAO: VariacaoAtendimento = {
  chave: 'padrao',
  eyebrow: 'Atendimento Bubbles',
  titulo: 'Fale agora com um especialista Bubbles',
  subtitulo:
    'Tire suas dúvidas sobre produtos, diluição e rendimento, e receba a indicação certa para o seu banho e tosa.',
  assunto: '',
}

const VARIACOES: { palavras: string[]; v: VariacaoAtendimento }[] = [
  {
    palavras: ['essential', 'ess'],
    v: {
      chave: 'essential',
      eyebrow: 'Linha Essential',
      titulo: 'Fale com a Bubbles sobre a Linha Essential',
      subtitulo: 'Galões de 5L com diluição 1:5 e custo por banho baixo. Tire suas dúvidas e receba a indicação certa.',
      assunto: 'sobre a Linha Essential',
    },
  },
  {
    palavras: ['collora', 'coloracao', 'color', 'col'],
    v: {
      chave: 'collora',
      eyebrow: 'Linha Collora',
      titulo: 'Fale com a Bubbles sobre a coloração Collora',
      subtitulo: 'Tire suas dúvidas sobre cores, aplicação e rendimento da Collora no seu salão.',
      assunto: 'sobre a coloração Collora',
    },
  },
  {
    palavras: ['perfume', 'perf', 'fragrancia'],
    v: {
      chave: 'perfume',
      eyebrow: 'Perfumes Bubbles',
      titulo: 'Fale com a Bubbles sobre os perfumes',
      subtitulo: 'Fragrâncias de alta fixação para o pet sair do banho com cheiro de salão. Tire suas dúvidas.',
      assunto: 'sobre os perfumes',
    },
  },
  {
    palavras: ['kit', 'combo'],
    v: {
      chave: 'kit',
      eyebrow: 'Kits Bubbles',
      titulo: 'Fale com a Bubbles sobre os kits',
      subtitulo: 'Receba a indicação do kit certo para a rotina do seu banho e tosa.',
      assunto: 'sobre os kits',
    },
  },
  {
    palavras: ['pro', 'ego'],
    v: {
      chave: 'pro',
      eyebrow: 'Linha PRO',
      titulo: 'Fale com a Bubbles sobre a Linha PRO',
      subtitulo: 'Diluição 1:10 e resultado de salão. Tire suas dúvidas e receba a indicação certa para cada pelagem.',
      assunto: 'sobre a Linha PRO',
    },
  },
]

const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function variacaoPorUtm(params: URLSearchParams): VariacaoAtendimento {
  const texto = normalizar(
    ['utm_campaign', 'utm_content', 'utm_term'].map((k) => params.get(k) ?? '').join(' '),
  )
  if (!texto.trim()) return PADRAO
  const palavras = texto.split(/[^a-z0-9]+/).filter(Boolean)
  for (const { palavras: chaves, v } of VARIACOES) {
    if (chaves.some((c) => palavras.includes(c))) return v
  }
  return PADRAO
}

export function mensagemWhatsapp(id: string, v: VariacaoAtendimento): string {
  const assunto = v.assunto ? ` ${v.assunto}` : ''
  return `Olá! Vim pelo anúncio da Bubbles e quero atendimento${assunto}.\n\nID de atendimento: ${id}`
}

export function linkWhatsapp(id: string, v: VariacaoAtendimento): string {
  return `https://wa.me/${ATENDIMENTO.whatsappNumero}?text=${encodeURIComponent(mensagemWhatsapp(id, v))}`
}

// ── ID de atendimento ────────────────────────────────────────────────────────
// 5 caracteres, letras maiúsculas e números, sem os que se confundem ao ler/digitar
// (0/O, 1/I/L). 31 símbolos ^ 5 ≈ 28 milhões de combinações.
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function gerarIdAtendimento(): string {
  const bytes = new Uint8Array(5)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => ALFABETO[b % ALFABETO.length]).join('')
}

// ── IDs de clique: salvos por 90 dias ───────────────────────────────────────
// O ID de atendimento é por visita, mas os IDs de clique da última visita que trouxe
// algum são guardados por 90 dias (prazo do Google para conversão offline). Se a pessoa
// voltar sem parâmetro (ex: digitou o endereço), o registro ainda leva o último clique.

const IDS_CLIQUE = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid', 'msclkid', 'li_fat_id'] as const
const CHAVE_CLIQUES = 'bubbles_atd_cliques'
const NOVENTA_DIAS = 90 * 24 * 60 * 60 * 1000

type CliquesSalvos = Partial<Record<(typeof IDS_CLIQUE)[number], string>> & { salvoEm?: number }

function lerCliquesSalvos(): CliquesSalvos {
  try {
    const bruto = localStorage.getItem(CHAVE_CLIQUES)
    if (!bruto) return {}
    const dados = JSON.parse(bruto) as CliquesSalvos
    if (!dados.salvoEm || Date.now() - dados.salvoEm > NOVENTA_DIAS) {
      localStorage.removeItem(CHAVE_CLIQUES)
      return {}
    }
    return dados
  } catch {
    return {}
  }
}

// Chamado ao carregar a página. Devolve os IDs de clique valendo nesta visita (da URL,
// ou os salvos da última visita) e de onde vieram.
export function resolverCliques(params: URLSearchParams): {
  cliques: Partial<Record<(typeof IDS_CLIQUE)[number], string>>
  origem: 'url' | 'salvo' | 'nenhum'
  salvoEm?: number
} {
  const daUrl: CliquesSalvos = {}
  for (const k of IDS_CLIQUE) {
    const v = params.get(k)
    if (v) daUrl[k] = v
  }
  if (Object.keys(daUrl).length > 0) {
    const agora = Date.now()
    try {
      localStorage.setItem(CHAVE_CLIQUES, JSON.stringify({ ...daUrl, salvoEm: agora }))
    } catch {}
    return { cliques: daUrl, origem: 'url', salvoEm: agora }
  }
  const salvos = lerCliquesSalvos()
  const { salvoEm, ...cliques } = salvos
  if (Object.keys(cliques).length > 0) return { cliques, origem: 'salvo', salvoEm }
  return { cliques: {}, origem: 'nenhum' }
}

// ── Cookies de anúncio ───────────────────────────────────────────────────────

function cookie(nome: string): string {
  const m = document.cookie.match(new RegExp(`(?:^|; )${nome.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&')}=([^;]*)`))
  return m ? decodeURIComponent(m[1]) : ''
}

// _fbc oficial do Meta; sem o cookie, monta no formato fb.1.<timestamp ms>.<fbclid>.
function fbc(fbclid: string | undefined, clicouEm: number | undefined): string {
  const c = cookie('_fbc')
  if (c) return c
  return fbclid ? `fb.1.${clicouEm ?? Date.now()}.${fbclid}` : ''
}

// _ga = "GA1.1.123456789.1700000000" → client id "123456789.1700000000".
function gaClientId(): string {
  const ga = cookie('_ga')
  const partes = ga.split('.')
  return partes.length >= 4 ? partes.slice(-2).join('.') : ''
}

// ── Datas ────────────────────────────────────────────────────────────────────

// "2026-10-08 14:32:05-03:00": formato aceito na importação offline do Google Ads.
export function dataHoraBrasilia(d: Date): string {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(d)
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? ''
  return `${g('year')}-${g('month')}-${g('day')} ${g('hour') === '24' ? '00' : g('hour')}:${g('minute')}:${g('second')}-03:00`
}

// ── Navegador ────────────────────────────────────────────────────────────────

function navegadorApp(ua: string): string {
  if (/Instagram/i.test(ua)) return 'instagram'
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return 'facebook'
  if (/WhatsApp/i.test(ua)) return 'whatsapp'
  if (/TikTok|musical_ly/i.test(ua)) return 'tiktok'
  return 'navegador'
}

function sistema(ua: string): string {
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  if (/Windows/i.test(ua)) return 'windows'
  if (/Mac OS X/i.test(ua)) return 'mac'
  return 'outro'
}

function dispositivo(): string {
  const w = window.innerWidth
  return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop'
}

const CHAVE_VISITA = 'bubbles_atd_visitas'

// Conta quantas visitas este navegador já fez na /atendimento (inclui a atual).
export function contarVisita(): number {
  try {
    const n = Number(localStorage.getItem(CHAVE_VISITA) ?? '0') + 1
    localStorage.setItem(CHAVE_VISITA, String(n))
    return n
  } catch {
    return 1
  }
}

// ── Registro para o Netlify ──────────────────────────────────────────────────

const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'] as const
// IDs de campanha/conjunto/anúncio que costumam vir na URL dos anúncios do Meta.
const IDS_CAMPANHA = ['campaign_id', 'adset_id', 'ad_id', 'placement', 'site_source_name'] as const

export type Visita = {
  id: string
  entrada: Date
  numeroVisita: number
  params: URLSearchParams
  url: string
  referrer: string
  variacao: VariacaoAtendimento
  cliques: ReturnType<typeof resolverCliques>
}

export function montarRegistro(
  v: Visita,
  clique: { tipo: 'clique' | 'automatico'; local: string; scrollMax: number },
): Record<string, string> {
  const agora = new Date()
  const ua = navigator.userAgent
  const reg: Record<string, string> = {
    'form-name': ATENDIMENTO.formName,
    atendimento_id: v.id,
    // Tempo
    entrada_em: dataHoraBrasilia(v.entrada),
    clique_em: dataHoraBrasilia(agora),
    clique_unix: String(Math.floor(agora.getTime() / 1000)),
    segundos_na_pagina: String(Math.round((agora.getTime() - v.entrada.getTime()) / 1000)),
    tipo_redirecionamento: clique.tipo,
    cta_location: clique.local,
    scroll_max: String(clique.scrollMax),
    numero_visita: String(v.numeroVisita),
    // Origem
    full_url: v.url,
    landing_page: window.location.pathname,
    referrer: v.referrer || 'direto',
    variacao: v.variacao.chave,
    // Cliques de anúncio
    cliques_origem: v.cliques.origem,
    cliques_salvos_em: v.cliques.salvoEm ? dataHoraBrasilia(new Date(v.cliques.salvoEm)) : '',
    fbc: fbc(v.cliques.cliques.fbclid, v.cliques.salvoEm),
    fbp: cookie('_fbp'),
    ga_client_id: gaClientId(),
    gcl_aw: cookie('_gcl_aw'),
    // Destino
    whatsapp_numero: ATENDIMENTO.whatsappNumero,
    mensagem: mensagemWhatsapp(v.id, v.variacao),
    // Técnico
    dispositivo: dispositivo(),
    sistema: sistema(ua),
    app_origem: navegadorApp(ua),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    idioma: navigator.language,
    user_agent: ua,
  }
  for (const k of [...UTMS, ...IDS_CAMPANHA]) {
    const val = v.params.get(k)
    if (val) reg[k] = val
  }
  for (const [k, val] of Object.entries(v.cliques.cliques)) if (val) reg[k] = val
  // Campo vazio não vai: o painel do Netlify fica limpo.
  for (const k of Object.keys(reg)) if (reg[k] === '') delete reg[k]
  return reg
}
