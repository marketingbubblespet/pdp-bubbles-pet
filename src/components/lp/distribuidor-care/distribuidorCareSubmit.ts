// Envio do formulário da LP /distribuidor-care: payload do Netlify Forms, corpo da rota de API e os dois POSTs.
// O navegador só fala com /__forms.html e com /api/distribuidor-care/lead (mesma origem). Nada de Sellum ou Meta aqui.
import { encodeFormData } from '@/components/lp/captacao/captacaoFormUtils'
import { DISTRIBUIDOR_CARE } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_FORM as F, DISTRIBUIDOR_CARE_TIPOS_NEGOCIO } from './distribuidorCareFormDados'
import { lerAtribuicao } from './distribuidorCareAttribution'
import { normalizarTexto, rotuloDe, type CorpoLead, type EstadoForm } from './distribuidorCareFormUtils'

export type MotivoFalha = 'sellum_indisponivel' | 'validacao' | 'origem' | 'rede' | 'resposta_invalida'
const MOTIVOS: readonly MotivoFalha[] = ['sellum_indisponivel', 'validacao', 'origem', 'rede', 'resposta_invalida']

export class ErroRota extends Error {
  motivo: MotivoFalha
  constructor(motivo: MotivoFalha) {
    super(motivo)
    this.motivo = motivo
  }
}

type Extra = { qualificado: boolean; motivo?: 'sem_cnpj' | 'sem_pedido_inicial' }

/** Todas as colunas do formulário distribuidor-care, sempre presentes (vazias quando não houver valor). */
export function montarCamposNetlify(estado: EstadoForm, botField: string, extra: Extra): Record<string, string> {
  const c = estado.campos
  const contato = c.pedidoInicial === 'sim'
  return {
    'bot-field': botField,
    leadId: estado.leadId,
    qualificado: extra.qualificado ? 'true' : 'false',
    motivo_desvio: extra.motivo ?? '',
    tipoNegocio: rotuloDe(DISTRIBUIDOR_CARE_TIPOS_NEGOCIO, c.tipoNegocio),
    tipoNegocioOutro: c.tipoNegocio === 'outro' ? normalizarTexto(c.tipoNegocioOutro) : '',
    estado: c.estado,
    cidade: normalizarTexto(c.cidade),
    vendedoresExternos: rotuloDe(F.vendedores, c.vendedoresExternos),
    pontosDeVenda: rotuloDe(F.pdvs, c.pontosDeVenda),
    trabalhaComPet: rotuloDe(F.linhaPet, c.trabalhaComPet),
    nome: normalizarTexto(c.nome),
    cargo: rotuloDe(F.cargos, c.cargo),
    whatsapp: c.whatsapp,
    email: c.email.trim(),
    possuiCnpj: c.semCnpj ? 'Não' : 'Sim',
    cnpj: c.semCnpj ? '' : c.cnpj,
    pedidoInicial: rotuloDe(F.pedido, c.pedidoInicial),
    canalPreferido: contato ? rotuloDe(F.canais, c.canal) : '',
    melhorHorario: contato ? rotuloDe(F.horarios, c.horario) : '',
    full_url: window.location.href,
    ...lerAtribuicao(estado.fbc),
  }
}

/** Corpo da rota de API: valores das listas, nunca os rótulos. */
export function montarCorpoRota(estado: EstadoForm, botField: string): CorpoLead {
  const c = estado.campos
  const a = lerAtribuicao(estado.fbc)
  return {
    leadId: estado.leadId, tipoNegocio: c.tipoNegocio, tipoNegocioOutro: normalizarTexto(c.tipoNegocioOutro),
    estado: c.estado, cidade: normalizarTexto(c.cidade), vendedoresExternos: c.vendedoresExternos,
    pontosDeVenda: c.pontosDeVenda, trabalhaComPet: c.trabalhaComPet, nome: normalizarTexto(c.nome), cargo: c.cargo,
    whatsapp: c.whatsapp, email: c.email.trim(), cnpj: c.cnpj, pedidoInicial: c.pedidoInicial,
    canal: c.canal, horario: c.horario, full_url: window.location.href,
    utm_source: a.utm_source, utm_medium: a.utm_medium, utm_campaign: a.utm_campaign, utm_term: a.utm_term,
    utm_content: a.utm_content, gclid: a.gclid, fbclid: a.fbclid, fbp: a.fbp, fbc: a.fbc,
    'bot-field': botField,
  }
}

export async function enviarNetlify(form: 'distribuidor-care' | 'falha-sellum', campos: Record<string, string>, keepalive = false): Promise<void> {
  const controle = new AbortController()
  const limite = setTimeout(() => controle.abort(), 15_000)    // sem resposta em 15 s vira falha (botão não fica preso)
  try {
    const res = await fetch('/__forms.html', {                 // nunca '/', que o SSR intercepta; nunca JSON
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData({ ...campos, 'form-name': form }),   // form-name por último: nunca sobrescrito pelos campos
      keepalive,                                                // true só no falha-sellum (não espera a resposta)
      signal: controle.signal,
    })
    if (!res.ok) throw new Error(`Netlify Forms respondeu ${res.status}`)
  } finally {
    clearTimeout(limite)
  }
}

function respostaOk(json: unknown): boolean {
  return typeof json === 'object' && json !== null && (json as { ok?: unknown }).ok === true
}

function motivoDaResposta(json: unknown): MotivoFalha {
  const m = typeof json === 'object' && json !== null ? (json as { motivo?: unknown }).motivo : undefined
  return MOTIVOS.find((x) => x === m) ?? 'resposta_invalida'
}

export async function enviarRota(corpo: CorpoLead): Promise<void> {
  const controle = new AbortController()
  const limite = setTimeout(() => controle.abort(), 20_000)    // a rota pode levar cerca de 17 s (8 s + 0,5 s + 8 s)
  try {
    const res = await fetch(DISTRIBUIDOR_CARE.apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
      signal: controle.signal,
    })
    const json: unknown = await res.json().catch(() => null)
    if (res.ok && respostaOk(json)) return
    throw new ErroRota(motivoDaResposta(json))
  } catch (erro) {
    throw erro instanceof ErroRota ? erro : new ErroRota('rede')
  } finally {
    clearTimeout(limite)
  }
}
