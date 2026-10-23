// Funções puras e tipos do formulário da LP /distribuidor-care. Sem 'use client': a rota de API importa daqui.
import { formatPhone, isEmailValid, isPhoneValid } from '@/components/lp/captacao/captacaoFormUtils'
import { DISTRIBUIDOR_CARE_FORM as F, DISTRIBUIDOR_CARE_TIPOS_NEGOCIO } from './distribuidorCareFormDados'

export type TipoNegocio = (typeof DISTRIBUIDOR_CARE_TIPOS_NEGOCIO)[number]['value']
export type Uf = (typeof F.ufs)[number]['sigla']
export type Vendedores = (typeof F.vendedores)[number]['value']
export type Pdvs = (typeof F.pdvs)[number]['value']
export type LinhaPet = (typeof F.linhaPet)[number]['value']
export type Cargo = (typeof F.cargos)[number]['value']
export type Canal = (typeof F.canais)[number]['value']
export type Horario = (typeof F.horarios)[number]['value']
export type Etapa = 1 | 2 | 3 | 4
export type StatusCadastro = 'inicial' | 'em_andamento' | 'enviado'
export type TelaFinal = 'sucesso' | 'desvio' | 'falha_sellum'

export type CamposForm = {
  tipoNegocio: TipoNegocio | ''
  tipoNegocioOutro: string
  estado: Uf | ''
  cidade: string
  vendedoresExternos: Vendedores | ''
  pontosDeVenda: Pdvs | ''
  trabalhaComPet: LinhaPet | ''
  nome: string
  cargo: Cargo | ''
  whatsapp: string
  email: string
  cnpj: string
  semCnpj: boolean
  pedidoInicial: 'sim' | 'agora_nao' | ''
  canal: Canal
  horario: Horario
  emailNaEtapa4: boolean
}

export type EstadoForm = {
  v: 1
  leadId: string
  iniciado: boolean
  etapa: Etapa
  campos: CamposForm
  fbc: string        // fb.1.<ms>.<fbclid> montado uma vez quando não há cookie _fbc
  salvoEm: number
}

// Corpo enviado à rota de API: valores das listas, nunca os rótulos.
export type CorpoLead = {
  leadId: string; tipoNegocio: string; tipoNegocioOutro: string; estado: string; cidade: string
  vendedoresExternos: string; pontosDeVenda: string; trabalhaComPet: string; nome: string; cargo: string
  whatsapp: string; email: string; cnpj: string; pedidoInicial: string; canal: string; horario: string
  full_url: string
  utm_source: string; utm_medium: string; utm_campaign: string; utm_term: string; utm_content: string
  gclid: string; fbclid: string; fbp: string; fbc: string
  'bot-field': string
}

export const LEAD_ID_REGEX = /^distribuidor-care-\d{8}-[a-z0-9]{1,6}$/

export const CAMPOS_VAZIOS: CamposForm = {
  tipoNegocio: '', tipoNegocioOutro: '', estado: '', cidade: '', vendedoresExternos: '', pontosDeVenda: '',
  trabalhaComPet: '', nome: '', cargo: '', whatsapp: '', email: '', cnpj: '', semCnpj: false, pedidoInicial: '',
  canal: 'whatsapp', horario: 'qualquer', emailNaEtapa4: false,
}

/** trim e espaços repetidos reduzidos a um. */
export function normalizarTexto(v: string): string {
  return v.trim().replace(/\s+/g, ' ')
}

export function mascaraWhatsapp(bruto: string): string {
  let d = bruto.replace(/\D/g, '')
  if (d.length > 11 && d.startsWith('55')) d = d.slice(2) // +55 14 99999-9999 vira 14 99999-9999
  d = d.replace(/^0+/, '')                                 // 014... vira 14...
  return formatPhone(d)
}

export function whatsappValido(valor: string): boolean {
  const d = valor.replace(/\D/g, '')
  if (!isPhoneValid(valor) || !/^[1-9][1-9]/.test(d)) return false
  return d.length === 10 || d[2] === '9'
}

// [CONFIRMAR COM O GESTOR] aceitar CNPJ alfanumérico (inscrições novas da Receita a partir de julho de 2026): exige teclado de texto no campo
export function mascaraCnpj(bruto: string): string {
  const d = bruto.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

const PESOS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const PESOS_2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

function digitoCnpj(base: string, pesos: number[]): number {
  const soma = pesos.reduce((total, peso, i) => total + (base.charCodeAt(i) - 48) * peso, 0)
  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}

/** Dígitos verificadores do CNPJ, sem consultar base nenhuma. */
export function cnpjValido(valor: string): boolean {
  const d = valor.replace(/\D/g, '')
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const dv1 = digitoCnpj(d.slice(0, 12), PESOS_1)
  const dv2 = digitoCnpj(d.slice(0, 12) + dv1, PESOS_2)
  return d.endsWith(`${dv1}${dv2}`)
}

const SEM_SINAL_DE_TAG = /^[^<>]*$/

export function cidadeValida(v: string): boolean {
  const t = normalizarTexto(v)
  return t.length >= 2 && t.length <= 60 && /\p{L}/u.test(t) && SEM_SINAL_DE_TAG.test(t)
}

export function nomeValido(v: string): boolean {
  const t = normalizarTexto(v)
  return t.length >= 2 && t.length <= 80 && (t.match(/\p{L}/gu) ?? []).length >= 2 && SEM_SINAL_DE_TAG.test(t)
}

export function emailValido(v: string): boolean {
  const t = v.trim()
  return t.length <= 120 && isEmailValid(t)
}

/** O campo de e-mail de contato aparece na etapa 4 com canal e-mail. */
export function mostraEmailContato(c: CamposForm): boolean {
  return c.canal === 'email' && (c.emailNaEtapa4 || !emailValido(c.email))
}

function errosEtapa3(c: CamposForm, e: Record<string, string>): void {
  if (!nomeValido(c.nome)) e['dc-nome'] = F.erros.nome
  if (c.cargo === '') e['dc-grupo-cargo'] = F.erros.cargo
  if (!whatsappValido(c.whatsapp)) e['dc-whatsapp'] = F.erros.whatsapp
  if (c.email.trim() !== '' && !emailValido(c.email)) e['dc-email'] = F.erros.email
  if (c.semCnpj) return
  if (c.cnpj.replace(/\D/g, '').length !== 14) e['dc-cnpj'] = F.erros.cnpjIncompleto
  else if (!cnpjValido(c.cnpj)) e['dc-cnpj'] = F.erros.cnpjInvalido
}

/** Erros da etapa, com as chaves na ordem em que os campos aparecem na tela. */
export function errosDaEtapa(etapa: Etapa, c: CamposForm): Record<string, string> {
  const e: Record<string, string> = {}
  if (etapa === 1) {
    if (c.tipoNegocio === '') e['dc-grupo-tipo'] = F.erros.tipo
    if (c.estado === '') e['dc-estado'] = F.erros.estado
    if (!cidadeValida(c.cidade)) e['dc-cidade'] = F.erros.cidade
  } else if (etapa === 2) {
    if (c.vendedoresExternos === '') e['dc-grupo-vendedores'] = F.erros.vendedores
    if (c.pontosDeVenda === '') e['dc-grupo-pdvs'] = F.erros.pdvs
    if (c.trabalhaComPet === '') e['dc-grupo-linha-pet'] = F.erros.linhaPet
  } else if (etapa === 3) {
    errosEtapa3(c, e)
  } else if (mostraEmailContato(c)) {
    if (c.email.trim() === '') e['dc-email-contato'] = F.erros.emailContatoVazio
    else if (!emailValido(c.email)) e['dc-email-contato'] = F.erros.email
  }
  return e
}

export function primeiroInvalido(etapa: Etapa, c: CamposForm): string | null {
  return Object.keys(errosDaEtapa(etapa, c))[0] ?? null
}

/** Rótulo humano de um valor de lista. */
export function rotuloDe(lista: readonly { value: string; label: string }[], valor: string): string {
  return lista.find((o) => o.value === valor)?.label ?? ''
}

/** Troca {chave} pelo valor. */
export function preencher(modelo: string, valores: Record<string, string | number>): string {
  return modelo.replace(/\{(\w+)\}/g, (_, k: string) => String(valores[k] ?? ''))
}
