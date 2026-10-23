// src/app/api/distribuidor-care/lead/route.ts
// Lead qualificado da LP /distribuidor-care: confere a origem, lê o corpo (JSON até 8 KB), descarta o honeypot,
// valida campo a campo, agenda o Lead da API de Conversões do Meta com after() e envia à Sellum (8 s + 1 tentativa).
// Token e URL do webhook só em variáveis de servidor (nunca NEXT_PUBLIC_). Log sem dado pessoal.
import { after, type NextRequest } from 'next/server'
import { createHash } from 'node:crypto'
import { isEmailValid } from '@/components/lp/captacao/captacaoFormUtils'
import { DISTRIBUIDOR_CARE_FORM as F, DISTRIBUIDOR_CARE_TIPOS_NEGOCIO } from '@/components/lp/distribuidor-care/distribuidorCareFormDados'
import {
  LEAD_ID_REGEX, cidadeValida, cnpjValido, nomeValido, rotuloDe, whatsappValido, type CorpoLead,
} from '@/components/lp/distribuidor-care/distribuidorCareFormUtils'

export const runtime = 'nodejs'

const PRODUCAO = 'https://ofertas.bubbles.com.br'
const PREVIEW = /^https:\/\/deploy-preview-\d+--[a-z0-9-]+\.netlify\.app$/
const LIMITE_BYTES = 8 * 1024
const URL_PADRAO = `${PRODUCAO}/distribuidor-care`
const LOG = '[distribuidor-care]'

type Motivo = 'sellum_indisponivel' | 'validacao' | 'origem'
type LeadValidado = Omit<CorpoLead, 'bot-field'>
type ContextoMeta = { ip?: string; ua?: string; fbp?: string; fbc?: string; url: string }

function responder(status: number, corpo: { ok: true } | { ok: false; motivo: Motivo }) {
  return Response.json(corpo, { status, headers: { 'Cache-Control': 'no-store' } })
}

// ── Origem (o Next só confere Origin em Server Actions) ──────────────────────

function origemDoReferer(referer: string | null): string | null {
  if (!referer) return null
  try { return new URL(referer).origin } catch { return null }
}

/** Devolve a origem aceita, ou null. O preview só chama a si mesmo (mesmo host). */
function origemPermitida(req: NextRequest): string | null {
  if (req.headers.get('sec-fetch-site') === 'cross-site') return null
  const origin = req.headers.get('origin')
  if (origin === 'null') return null
  const origem = origin ?? origemDoReferer(req.headers.get('referer'))
  if (!origem) return null
  if (origem === PRODUCAO) return origem
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (PREVIEW.test(origem)) return new URL(origem).host === host ? origem : null
  return process.env.NODE_ENV === 'development' && origem === 'http://localhost:3000' ? origem : null
}

// ── Corpo e validação ────────────────────────────────────────────────────────

async function lerJson(req: NextRequest): Promise<Record<string, unknown> | null> {
  if (!(req.headers.get('content-type') ?? '').startsWith('application/json')) return null
  if (Number(req.headers.get('content-length') ?? '0') > LIMITE_BYTES) return null
  const texto = await req.text()
  if (Buffer.byteLength(texto, 'utf8') > LIMITE_BYTES) return null
  try {
    const valor: unknown = JSON.parse(texto)
    return valor && typeof valor === 'object' && !Array.isArray(valor) ? (valor as Record<string, unknown>) : null
  } catch {
    return null
  }
}

const CHAVES: readonly (keyof LeadValidado)[] = [
  'leadId', 'tipoNegocio', 'tipoNegocioOutro', 'estado', 'cidade', 'vendedoresExternos', 'pontosDeVenda', 'trabalhaComPet',
  'nome', 'cargo', 'whatsapp', 'email', 'cnpj', 'pedidoInicial', 'canal', 'horario', 'full_url',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'fbp', 'fbc',
]

function limpar(v: string): string {
  return v.replace(/[\u0000-\u001F\u007F]/g, '').trim().replace(/\s+/g, ' ')
}

/** Lê só as chaves conhecidas; qualquer uma que não seja string reprova. */
function lerTextos(dados: Record<string, unknown>): LeadValidado | string {
  const saida: Partial<LeadValidado> = {}
  for (const k of CHAVES) {
    const v = dados[k] ?? ''
    if (typeof v !== 'string') return k
    saida[k] = limpar(v)
  }
  return saida as LeadValidado
}

const naLista = (lista: readonly { value: string }[], v: string) => lista.some((o) => o.value === v)

/** Nome do primeiro campo recusado, ou null quando tudo passa. */
function campoInvalido(l: LeadValidado): string | null {
  const regras: [keyof LeadValidado, boolean][] = [
    ['leadId', LEAD_ID_REGEX.test(l.leadId)],
    ['tipoNegocio', naLista(DISTRIBUIDOR_CARE_TIPOS_NEGOCIO, l.tipoNegocio)],
    ['tipoNegocioOutro', l.tipoNegocioOutro.length <= 60 && !/[<>]/.test(l.tipoNegocioOutro)],
    ['estado', F.ufs.some((u) => u.sigla === l.estado)],
    ['cidade', cidadeValida(l.cidade)],
    ['vendedoresExternos', naLista(F.vendedores, l.vendedoresExternos)],
    ['pontosDeVenda', naLista(F.pdvs, l.pontosDeVenda)],
    ['trabalhaComPet', naLista(F.linhaPet, l.trabalhaComPet)],
    ['cargo', naLista(F.cargos, l.cargo)],
    ['canal', naLista(F.canais, l.canal)],
    ['horario', naLista(F.horarios, l.horario)],
    ['nome', nomeValido(l.nome)],
    ['whatsapp', whatsappValido(l.whatsapp)],
    ['email', l.email === '' ? l.canal !== 'email' : l.email.length <= 120 && isEmailValid(l.email)],
    ['cnpj', cnpjValido(l.cnpj)],
    ['pedidoInicial', l.pedidoInicial === 'sim'],
  ]
  return regras.find(([, ok]) => !ok)?.[0] ?? null
}

const fbpValido = (v: string) => /^fb\.\d\.\d{10,13}\.\d+$/.test(v)
const fbcValido = (v: string) => v.length <= 600 && /^fb\.\d\.\d{10,13}\.[\w-]+$/.test(v)

/** Campos de atribuição: corrige em vez de recusar. */
function corrigirAtribuicao(l: LeadValidado, origem: string): LeadValidado {
  const urlOk = l.full_url.length <= 2048 && (l.full_url.startsWith(URL_PADRAO) || (origem !== PRODUCAO && l.full_url.startsWith(`${origem}/distribuidor-care`)))
  return {
    ...l,
    tipoNegocioOutro: l.tipoNegocio === 'outro' ? l.tipoNegocioOutro : '',
    full_url: urlOk ? l.full_url : URL_PADRAO,
    utm_source: l.utm_source.slice(0, 200), utm_medium: l.utm_medium.slice(0, 200), utm_campaign: l.utm_campaign.slice(0, 200),
    utm_term: l.utm_term.slice(0, 200), utm_content: l.utm_content.slice(0, 200),
    gclid: l.gclid.slice(0, 500), fbclid: l.fbclid.slice(0, 500),
    fbp: fbpValido(l.fbp) ? l.fbp : '',
    fbc: fbcValido(l.fbc) ? l.fbc : '',
  }
}

function validarLead(dados: Record<string, unknown>, origem: string): LeadValidado | null {
  const lido = lerTextos(dados)
  const invalido = typeof lido === 'string' ? lido : campoInvalido(lido)
  if (invalido || typeof lido === 'string') {
    console.error(`${LOG} validacao recusou`, { campo: invalido })
    return null
  }
  return corrigirAtribuicao(lido, origem)
}

// ── Sellum ───────────────────────────────────────────────────────────────────

const ouVazio = (v: string) => (v === '' ? undefined : v)

// [CONFIRMAR COM O GESTOR] o webhook "Distribuidor Care" exige companyName? (o formulário não pergunta a empresa)
function montarPayloadSellum(l: LeadValidado) {
  return {
    contactName: l.nome, email: ouVazio(l.email), phone: l.whatsapp, source: 'distribuidor-care', leadId: l.leadId,
    tipoNegocio: rotuloDe(DISTRIBUIDOR_CARE_TIPOS_NEGOCIO, l.tipoNegocio), tipoNegocioOutro: ouVazio(l.tipoNegocioOutro),
    estado: l.estado, cidade: l.cidade, vendedoresExternos: rotuloDe(F.vendedores, l.vendedoresExternos),
    pontosDeVenda: rotuloDe(F.pdvs, l.pontosDeVenda), trabalhaComPet: rotuloDe(F.linhaPet, l.trabalhaComPet),
    cargo: rotuloDe(F.cargos, l.cargo), cnpj: l.cnpj, pedidoInicial: 'Sim',
    canalPreferido: rotuloDe(F.canais, l.canal), melhorHorario: rotuloDe(F.horarios, l.horario),
    utm_source: ouVazio(l.utm_source), utm_medium: ouVazio(l.utm_medium), utm_campaign: ouVazio(l.utm_campaign),
    utm_term: ouVazio(l.utm_term), utm_content: ouVazio(l.utm_content), gclid: ouVazio(l.gclid), fbclid: ouVazio(l.fbclid),
    fbp: ouVazio(l.fbp), fbc: ouVazio(l.fbc), full_url: l.full_url,
  }
}

async function enviarSellum(lead: LeadValidado): Promise<'ok' | 'sem_config' | 'falhou'> {
  const url = process.env.SELLUM_DISTRIBUIDOR_CARE_WEBHOOK_URL
  const token = process.env.SELLUM_DISTRIBUIDOR_CARE_TOKEN
  if (!url || !token || !url.startsWith('https://')) {
    console.error(`${LOG} sellum sem configuração`)
    return 'sem_config'
  }
  const corpo = JSON.stringify(montarPayloadSellum(lead))
  for (let tentativa = 1; tentativa <= 2; tentativa++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: corpo,
        signal: AbortSignal.timeout(8000),
      })
      if (res.ok) return 'ok'
      console.error(`${LOG} sellum respondeu`, { status: res.status, tentativa, leadId: lead.leadId })
      if (res.status < 500 && res.status !== 408 && res.status !== 429) return 'falhou'   // 4xx não melhora repetindo
    } catch (erro) {
      console.error(`${LOG} sellum falhou`, { erro: (erro as Error).name, tentativa, leadId: lead.leadId })
    }
    if (tentativa === 1) await new Promise((r) => setTimeout(r, 500))
  }
  return 'falhou'
}

// ── API de Conversões do Meta ────────────────────────────────────────────────

const sha256 = (v: string) => createHash('sha256').update(v, 'utf8').digest('hex')

function normTelefone(valor: string): string | undefined {
  let d = valor.replace(/\D/g, '').replace(/^0+/, '')
  if (d.length === 10 || d.length === 11) d = `55${d}`
  return (d.length === 12 || d.length === 13) && d.startsWith('55') ? d : undefined
}
function normCidade(valor: string): string | undefined {
  const n = valor.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z]/g, '')
  return n || undefined
}
function normPrimeiroNome(valor: string): string | undefined {
  const n = (valor.split(' ')[0] ?? '').normalize('NFC').toLowerCase().replace(/[^\p{L}]/gu, '')
  return n || undefined
}

function contextoMeta(req: NextRequest, lead: LeadValidado): ContextoMeta {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-nf-client-connection-ip') || ''
  const ua = (req.headers.get('user-agent') ?? '').slice(0, 512)
  const cookieFbp = req.cookies.get('_fbp')?.value ?? ''
  const cookieFbc = req.cookies.get('_fbc')?.value ?? ''
  const fbc = (fbcValido(cookieFbc) ? cookieFbc : '') || lead.fbc || (lead.fbclid ? `fb.1.${Date.now()}.${lead.fbclid}` : '')
  return {
    ip: /^[0-9a-fA-F:.]{3,45}$/.test(ip) ? ip : undefined,
    ua: ua || undefined,
    fbp: (fbpValido(cookieFbp) ? cookieFbp : '') || lead.fbp || undefined,
    fbc: fbc || undefined,
    url: lead.full_url,
  }
}

function userData(lead: LeadValidado, ctx: ContextoMeta): Record<string, unknown> {
  const comHash: [string, string | undefined][] = [
    ['em', lead.email.trim().toLowerCase() || undefined], ['ph', normTelefone(lead.whatsapp)],
    ['fn', normPrimeiroNome(lead.nome)], ['ct', normCidade(lead.cidade)], ['st', lead.estado.toLowerCase() || undefined],
    ['country', 'br'],
  ]
  const dados: Record<string, unknown> = {}
  for (const [k, v] of comHash) if (v) dados[k] = [sha256(v)]
  if (ctx.ip) dados.client_ip_address = ctx.ip
  if (ctx.ua) dados.client_user_agent = ctx.ua
  if (ctx.fbp) dados.fbp = ctx.fbp
  if (ctx.fbc) dados.fbc = ctx.fbc
  return dados
}

async function enviarCapi(lead: LeadValidado, ctx: ContextoMeta): Promise<void> {
  const pixel = process.env.META_PIXEL_ID
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixel || !token) return
  const versaoEnv = process.env.META_GRAPH_API_VERSION ?? ''
  const versao = /^v\d+\.\d+$/.test(versaoEnv) ? versaoEnv : 'v26.0'
  const teste = process.env.META_CAPI_TEST_EVENT_CODE
  const corpo = {
    data: [{
      event_name: 'Lead', event_time: Math.floor(Date.now() / 1000), action_source: 'website',
      event_id: `lead.${lead.leadId}`, event_source_url: ctx.url, user_data: userData(lead, ctx),
    }],
    ...(teste ? { test_event_code: teste } : {}),
  }
  try {
    const res = await fetch(`https://graph.facebook.com/${versao}/${encodeURIComponent(pixel)}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) console.error(`${LOG} capi respondeu`, { status: res.status, leadId: lead.leadId })
  } catch (erro) {
    console.error(`${LOG} capi falhou`, { erro: (erro as Error).name, leadId: lead.leadId })
  }
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const origem = origemPermitida(req)
  if (!origem) return responder(403, { ok: false, motivo: 'origem' })
  const dados = await lerJson(req)
  if (!dados) return responder(400, { ok: false, motivo: 'validacao' })
  if (typeof dados['bot-field'] === 'string' && dados['bot-field'].trim() !== '') return responder(200, { ok: true })
  const lead = validarLead(dados, origem)
  if (!lead) return responder(400, { ok: false, motivo: 'validacao' })
  // A CAPI roda para todo qualificado válido, com ou sem sucesso da Sellum (dedupe pelo event_id).
  const contexto = contextoMeta(req, lead)
  after(() => enviarCapi(lead, contexto))
  const sellum = await enviarSellum(lead)
  if (sellum !== 'ok') return responder(sellum === 'sem_config' ? 503 : 502, { ok: false, motivo: 'sellum_indisponivel' })
  return responder(200, { ok: true })
}
