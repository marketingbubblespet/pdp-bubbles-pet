'use client'
// Estado do formulário da LP /distribuidor-care num módulo externo (lido com useSyncExternalStore): os chips do hero
// gravam a etapa 1 antes de o B13 montar, e a barra fixa e o popup leem o status. Progresso em sessionStorage.
import { useEffect, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from 'react'
import { createLeadId, pushFormAbandon, pushFormOpen, pushFormStep, pushLeadDesviado, pushLeadFromForm } from '@/lib/tracking'
import { DISTRIBUIDOR_CARE } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_FORM as F, DISTRIBUIDOR_CARE_TIPOS_NEGOCIO } from './distribuidorCareFormDados'
import {
  CAMPOS_VAZIOS, LEAD_ID_REGEX, errosDaEtapa, mascaraCnpj, mascaraWhatsapp, preencher,
  type Canal, type CamposForm, type Etapa, type EstadoForm, type Horario, type StatusCadastro, type TelaFinal,
  type TipoNegocio, type Uf,
} from './distribuidorCareFormUtils'
import { ErroRota, enviarNetlify, enviarRota, montarCamposNetlify, montarCorpoRota } from './distribuidorCareSubmit'
import { fbcParaGuardar } from './distribuidorCareAttribution'

export type { CamposForm, EstadoForm, Etapa, StatusCadastro, TelaFinal, TipoNegocio } from './distribuidorCareFormUtils'

const CHAVE_PROGRESSO = 'bubbles_dc_progresso'
const CHAVE_ENVIADO = 'bubbles_dc_enviado'
const DIA_MS = 24 * 60 * 60 * 1000

export type Enviado = { v: 1; tela: TelaFinal; canal: Canal; horario: Horario; leadId: string; salvoEm: number }
type Desvio = 'sem_cnpj' | 'sem_pedido_inicial'
type Tentativa = 'final' | Desvio

function estadoVazio(leadId: string): EstadoForm {
  return { v: 1, leadId, iniciado: false, etapa: 1, campos: CAMPOS_VAZIOS, fbc: '', salvoEm: 0 }
}
const ESTADO_SERVIDOR = estadoVazio('')

let estado: EstadoForm | null = null
let enviado: Enviado | null = null
let focoPendente: string | null = null
const ouvintes = new Set<() => void>()

function lerStorage(chave: string): string | null {
  try { return sessionStorage.getItem(chave) } catch { return null }
}
function gravarStorage(chave: string, valor: unknown): void {
  try { sessionStorage.setItem(chave, JSON.stringify(valor)) } catch { /* segue em memória */ }
}
function apagarStorage(chave: string): void {
  try { sessionStorage.removeItem(chave) } catch { /* ignora */ }
}

function valorDe<T extends string, P extends T | ''>(lista: readonly { value: T }[], v: unknown, padrao: P): T | P {
  return lista.some((o) => o.value === v) ? (v as T) : padrao
}

function recuperarEnviado(): Enviado | null {
  const cru = lerStorage(CHAVE_ENVIADO)
  if (!cru) return null
  try {
    const d = JSON.parse(cru) as Partial<Enviado>
    const telaOk = d.tela === 'sucesso' || d.tela === 'desvio' || d.tela === 'falha_sellum'
    const idOk = typeof d.leadId === 'string' && LEAD_ID_REGEX.test(d.leadId)
    if (d.v === 1 && telaOk && idOk && typeof d.salvoEm === 'number' && Date.now() - d.salvoEm < DIA_MS) {
      return { v: 1, tela: d.tela as TelaFinal, canal: valorDe(F.canais, d.canal, 'whatsapp'),
        horario: valorDe(F.horarios, d.horario, 'qualquer'), leadId: d.leadId as string, salvoEm: d.salvoEm }
    }
  } catch { /* formato inválido */ }
  apagarStorage(CHAVE_ENVIADO)
  return null
}

function mesclarCampos(c: Partial<Record<keyof CamposForm, unknown>>): CamposForm {
  const s = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '')
  const tipo = valorDe(DISTRIBUIDOR_CARE_TIPOS_NEGOCIO, c.tipoNegocio, '')
  const pedido = c.pedidoInicial === 'sim' || c.pedidoInicial === 'agora_nao' ? c.pedidoInicial : ''
  return {
    tipoNegocio: tipo, tipoNegocioOutro: tipo === 'outro' ? s(c.tipoNegocioOutro, 60) : '',
    estado: F.ufs.some((u) => u.sigla === c.estado) ? (c.estado as Uf) : '',
    cidade: s(c.cidade, 60), vendedoresExternos: valorDe(F.vendedores, c.vendedoresExternos, ''),
    pontosDeVenda: valorDe(F.pdvs, c.pontosDeVenda, ''), trabalhaComPet: valorDe(F.linhaPet, c.trabalhaComPet, ''),
    nome: s(c.nome, 80), cargo: valorDe(F.cargos, c.cargo, ''), whatsapp: mascaraWhatsapp(s(c.whatsapp, 20)),
    email: s(c.email, 120), cnpj: mascaraCnpj(s(c.cnpj, 18)), semCnpj: c.semCnpj === true, pedidoInicial: pedido,
    canal: valorDe(F.canais, c.canal, 'whatsapp'), horario: valorDe(F.horarios, c.horario, 'qualquer'),
    emailNaEtapa4: c.emailNaEtapa4 === true,
  }
}

function etapaSegura(etapa: unknown, c: CamposForm): Etapa {
  const alvo: Etapa = etapa === 2 || etapa === 3 || etapa === 4 ? etapa : 1
  for (const e of [1, 2, 3] as const) {
    if (e >= alvo) break
    if (Object.keys(errosDaEtapa(e, c)).length > 0) return e
  }
  return alvo === 4 && c.semCnpj ? 3 : alvo
}

function recuperarProgresso(): EstadoForm | null {
  const cru = lerStorage(CHAVE_PROGRESSO)
  if (!cru) return null
  try {
    const d = JSON.parse(cru) as Partial<EstadoForm>
    const idOk = typeof d.leadId === 'string' && LEAD_ID_REGEX.test(d.leadId)
    const recente = typeof d.salvoEm === 'number' && Date.now() - d.salvoEm < DIA_MS
    if (d.v === 1 && idOk && recente && d.campos && typeof d.campos === 'object') {
      const campos = mesclarCampos(d.campos)
      return { v: 1, leadId: d.leadId as string, iniciado: true, etapa: etapaSegura(d.etapa, campos), campos,
        fbc: typeof d.fbc === 'string' ? d.fbc : '', salvoEm: d.salvoEm as number }
    }
  } catch { /* formato inválido */ }
  apagarStorage(CHAVE_PROGRESSO)
  return null
}

function carregar(): void {
  if (estado) return
  enviado = recuperarEnviado()
  if (enviado) {
    estado = { ...estadoVazio(enviado.leadId), iniciado: true,
      campos: { ...CAMPOS_VAZIOS, canal: enviado.canal, horario: enviado.horario } }
    return
  }
  estado = recuperarProgresso() ?? estadoVazio(createLeadId(DISTRIBUIDOR_CARE.leadSlug))
}

function lerEstado(): EstadoForm { carregar(); return estado as EstadoForm }
function lerEnviado(): Enviado | null { carregar(); return enviado }
function assinar(f: () => void): () => void { ouvintes.add(f); return () => { ouvintes.delete(f) } }
function avisar(): void { ouvintes.forEach((f) => f()) }

export function lerStatus(): StatusCadastro {
  if (lerEnviado()) return 'enviado'
  return lerEstado().iniciado ? 'em_andamento' : 'inicial'
}

function atualizar(parcial: Partial<EstadoForm>): void {
  estado = { ...lerEstado(), ...parcial, salvoEm: Date.now() }
  if (estado.iniciado) gravarStorage(CHAVE_PROGRESSO, estado)
  avisar()
}

/** Muda campos; a primeira mudança marca o início e dispara um form_open por leadId. */
function mudarCampos(parcial: Partial<CamposForm>, extra: Partial<EstadoForm> = {}): void {
  const atual = lerEstado()
  atualizar({ ...extra, iniciado: true, campos: { ...atual.campos, ...parcial } })
  if (!atual.iniciado) pushFormOpen(DISTRIBUIDOR_CARE.formName)
}

function concluirEnvio(tela: TelaFinal): void {
  const e = lerEstado()
  enviado = { v: 1, tela, canal: e.campos.canal, horario: e.campos.horario, leadId: e.leadId, salvoEm: Date.now() }
  apagarStorage(CHAVE_PROGRESSO)
  gravarStorage(CHAVE_ENVIADO, enviado)
  avisar()
}

export function comportamento(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}
export function focarDepois(id: string): void {
  requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
}
function rolarAteCadastro(): void {
  document.getElementById('cadastro')?.scrollIntoView({ behavior: comportamento(), block: 'start' })
}

/** Chips do hero: grava o tipo, volta à etapa 1 sem apagar o resto, rola e foca "Estado". */
export function escolherTipo(tipo: TipoNegocio): void {
  if (lerStatus() === 'enviado') { rolarAteCadastro(); return }
  const atual = lerEstado()
  mudarCampos(
    { tipoNegocio: tipo, tipoNegocioOutro: tipo === 'outro' ? atual.campos.tipoNegocioOutro : '' },
    { etapa: 1 },
  )
  rolarAteCadastro()
  const campo = document.getElementById('dc-estado')
  if (campo) { campo.focus({ preventScroll: true }); return }
  // O B13 pode estar montado em outra etapa: o campo só aparece no próximo render. Se o B13 ainda
  // não montou, ele aplica o foco pendente ao montar (consumirFocoPendente).
  focoPendente = 'dc-estado'
  requestAnimationFrame(() => {
    const el = document.getElementById('dc-estado')
    if (el && focoPendente) { focoPendente = null; el.focus({ preventScroll: true }) }
  })
}

export function consumirFocoPendente(): string | null {
  const id = focoPendente
  focoPendente = null
  return id
}

export function useTipoNegocio(): TipoNegocio | '' {
  return useSyncExternalStore(assinar, () => lerEstado().campos.tipoNegocio, () => '')
}
export function useStatusCadastro(): StatusCadastro {
  return useSyncExternalStore(assinar, lerStatus, () => 'inicial')
}

// ── Formulário (B13) ─────────────────────────────────────────────────────────

export type UiForm = {
  visiveis: Record<string, true>          // erros visíveis (saiu do campo ou tentou avançar)
  enviando: false | 'final' | 'agora_nao' | 'sem_cnpj'
  falhaTotal: boolean
  botField: string
  anuncio: string
}
const UI_INICIAL: UiForm = { visiveis: {}, enviando: false, falhaTotal: false, botField: '', anuncio: '' }

// Um único formulário na página: as travas do envio ficam no módulo (sem ref, que o lint do React Compiler barra).
export const ID_CAIXA = 'dc-caixa-cadastro'
const envioAtual = { travado: false, ultimo: null as Tentativa | null, bot: '' }
type Ctx = { setUi: Dispatch<SetStateAction<UiForm>> }

function rolarParaCaixa(ctx: Ctx, forcar = false): void {
  const el = document.getElementById(ID_CAIXA)
  if (!el) return
  if (!forcar && el.getBoundingClientRect().top >= 0) return
  el.scrollIntoView({ behavior: comportamento(), block: 'start' })
}

function esconderErro(ctx: Ctx, id: string): void {
  ctx.setUi((u) => {
    if (!u.visiveis[id]) return u
    const visiveis = { ...u.visiveis }
    delete visiveis[id]
    return { ...u, visiveis }
  })
}

function limparSeValido(ctx: Ctx, id: string): void {
  const e = lerEstado()
  if (!errosDaEtapa(e.etapa, e.campos)[id]) esconderErro(ctx, id)
}

/** Mostra os erros da etapa, rola e foca o primeiro. Devolve false se a etapa está válida. */
function mostrarErros(ctx: Ctx, etapa: Etapa): boolean {
  const ids = Object.keys(errosDaEtapa(etapa, lerEstado().campos))
  if (ids.length === 0) return false
  const rotulos = ids.map((id) => F.rotulosCurtos[id as keyof typeof F.rotulosCurtos])
  const anuncio = rotulos.length === 1
    ? preencher(F.anuncios.umErro, { rotulo: rotulos[0] })
    : preencher(F.anuncios.variosErros, { rotulos: rotulos.join(', ') })
  ctx.setUi((u) => ({ ...u, visiveis: Object.fromEntries(ids.map((id) => [id, true as const])), anuncio }))
  const el = document.getElementById(ids[0])
  el?.scrollIntoView({ behavior: comportamento(), block: 'center' })
  const alvo = ids[0].startsWith('dc-grupo-') ? el?.querySelector('input') : el
  alvo?.focus({ preventScroll: true })
  return true
}

/** A resposta mudou: a falha total e o "Tentar de novo" da tentativa anterior deixam de valer. */
function esquecerFalha(ctx: Ctx): void {
  envioAtual.ultimo = null
  ctx.setUi((u) => (u.falhaTotal ? { ...u, falhaTotal: false } : u))
}

function irParaEtapa(ctx: Ctx, etapa: Etapa): void {
  esquecerFalha(ctx)
  atualizar({ etapa })
  const anuncio = preencher(F.anuncios.etapa, { n: etapa, titulo: F.etapas[etapa - 1] })
  ctx.setUi((u) => ({ ...u, visiveis: {}, anuncio }))
  rolarParaCaixa(ctx)
  focarDepois('dc-etapa-titulo')
}

function iniciarEnvio(ctx: Ctx, tipo: UiForm['enviando']): boolean {
  if (envioAtual.travado) return false
  envioAtual.travado = true
  ctx.setUi((u) => ({ ...u, enviando: tipo, falhaTotal: false, anuncio: F.anuncios.salvando }))
  return true
}

function mostrarFalhaTotal(ctx: Ctx): void {
  ctx.setUi((u) => ({ ...u, enviando: false, falhaTotal: true, anuncio: '' }))
  rolarParaCaixa(ctx)
  focarDepois('dc-falha-total')
}

function concluir(ctx: Ctx, tela: TelaFinal): void {
  concluirEnvio(tela)
  ctx.setUi((u) => ({ ...u, enviando: false, falhaTotal: false, anuncio: '' }))
  rolarParaCaixa(ctx, true)
  focarDepois('dc-tela-titulo')
}

function estadoComFbc(): EstadoForm {
  const e = lerEstado()
  const fbc = fbcParaGuardar(e.fbc)
  if (fbc !== e.fbc) atualizar({ fbc })
  return lerEstado()
}

async function enviarQualificado(ctx: Ctx): Promise<void> {
  if (!iniciarEnvio(ctx, 'final')) return
  envioAtual.ultimo = 'final'
  try {
    const e = estadoComFbc()
    const bot = envioAtual.bot
    const campos = montarCamposNetlify(e, bot, { qualificado: true })
    const [netlify, rota] = await Promise.allSettled([
      enviarNetlify('distribuidor-care', campos),
      enviarRota(montarCorpoRota(e, bot)),
    ])
    const netlifyOk = netlify.status === 'fulfilled'
    const sellumOk = rota.status === 'fulfilled'
    if (!netlifyOk && !sellumOk) return mostrarFalhaTotal(ctx)
    if (netlifyOk && bot.trim() === '') {
      const c = e.campos
      pushLeadFromForm({ leadId: e.leadId, formName: DISTRIBUIDOR_CARE.formName, qualified: true,
        fullName: c.nome, email: c.email, phone: c.whatsapp, extra: sellumOk ? undefined : { sellum_failed: true } })
    }
    if (!sellumOk) {
      const motivo = rota.status === 'rejected' && rota.reason instanceof ErroRota ? rota.reason.motivo : 'rede'
      enviarNetlify('falha-sellum', { ...campos, motivo }, true)
        .catch(() => console.error('[distribuidor-care] falha-sellum não gravou'))
    }
    concluir(ctx, sellumOk ? 'sucesso' : 'falha_sellum')
  } finally {
    envioAtual.travado = false
  }
}

async function enviarDesvio(ctx: Ctx, motivo: Desvio): Promise<void> {
  if (!iniciarEnvio(ctx, motivo === 'sem_cnpj' ? 'sem_cnpj' : 'agora_nao')) return
  envioAtual.ultimo = motivo
  try {
    const e = estadoComFbc()
    const bot = envioAtual.bot
    try {
      await enviarNetlify('distribuidor-care', montarCamposNetlify(e, bot, { qualificado: false, motivo }))
    } catch {
      return mostrarFalhaTotal(ctx)
    }
    if (bot.trim() === '') {
      const c = e.campos
      pushLeadFromForm({ leadId: e.leadId, formName: DISTRIBUIDOR_CARE.formName, qualified: false,
        fullName: c.nome, email: c.email, phone: c.whatsapp })
      pushLeadDesviado({ formName: DISTRIBUIDOR_CARE.formName, motivo })
    }
    concluir(ctx, 'desvio')
  } finally {
    envioAtual.travado = false
  }
}

function criarAcoes(ctx: Ctx) {
  return {
    texto(id: string, campo: 'tipoNegocioOutro' | 'cidade' | 'nome' | 'whatsapp' | 'email' | 'cnpj', valor: string) {
      const v = campo === 'whatsapp' ? mascaraWhatsapp(valor) : campo === 'cnpj' ? mascaraCnpj(valor) : valor
      mudarCampos({ [campo]: v })
      limparSeValido(ctx, id)
    },
    escolher(id: string, parcial: Partial<CamposForm>) { mudarCampos(parcial); limparSeValido(ctx, id) },
    sair(id: string) {
      const e = lerEstado()
      if (errosDaEtapa(e.etapa, e.campos)[id]) ctx.setUi((u) => ({ ...u, visiveis: { ...u.visiveis, [id]: true } }))
    },
    semCnpj(marcado: boolean) { esquecerFalha(ctx); mudarCampos({ semCnpj: marcado, cnpj: '' }); esconderErro(ctx, 'dc-cnpj') },
    canal(c: Canal) {
      const atual = lerEstado().campos
      mudarCampos({ canal: c, emailNaEtapa4: c === 'email' ? atual.emailNaEtapa4 || atual.email.trim() === '' : false })
      if (c !== 'email') esconderErro(ctx, 'dc-email-contato')
    },
    continuar() {
      const e = lerEstado()
      if (mostrarErros(ctx, e.etapa)) return
      if (e.etapa === 3 && e.campos.semCnpj) { void enviarDesvio(ctx, 'sem_cnpj'); return }
      const proxima = (e.etapa + 1) as Etapa
      pushFormStep(DISTRIBUIDOR_CARE.formName, proxima, F.etapas[proxima - 1])
      irParaEtapa(ctx, proxima)
    },
    voltar() { const e = lerEstado(); if (e.etapa > 1) irParaEtapa(ctx, (e.etapa - 1) as Etapa) },
    pedido(v: 'sim' | 'agora_nao') {
      esquecerFalha(ctx)
      mudarCampos({ pedidoInicial: v })
      // [CONFIRMAR COM O GESTOR] "Agora não" envia na hora, sem segundo toque (pendência 11)
      if (v === 'agora_nao') { void enviarDesvio(ctx, 'sem_pedido_inicial'); return }
      requestAnimationFrame(() =>
        document.getElementById('dc-bloco-contato')?.scrollIntoView({ behavior: comportamento(), block: 'nearest' }))
    },
    finalizar() {
      if (lerEstado().campos.pedidoInicial !== 'sim' || mostrarErros(ctx, 4)) return
      void enviarQualificado(ctx)
    },
    tentarDeNovo() {
      const u = envioAtual.ultimo
      if (u === 'final') void enviarQualificado(ctx)
      else if (u) void enviarDesvio(ctx, u)
    },
    botField(v: string) { envioAtual.bot = v; ctx.setUi((u) => ({ ...u, botField: v })) },
  }
}
export type AcoesForm = ReturnType<typeof criarAcoes>

export function useDistribuidorCareForm() {
  const estadoAtual = useSyncExternalStore(assinar, lerEstado, () => ESTADO_SERVIDOR)
  const envio = useSyncExternalStore(assinar, lerEnviado, () => null)
  const [ui, setUi] = useState<UiForm>(UI_INICIAL)
  const [acoes] = useState(() => criarAcoes({ setUi }))

  useEffect(() => {
    const id = consumirFocoPendente()
    if (id) focarDepois(id)
  }, [])

  useEffect(() => {
    let jaEnviou = false
    const aoMudarVisibilidade = () => {
      if (jaEnviou || document.visibilityState !== 'hidden' || lerStatus() !== 'em_andamento') return
      jaEnviou = true
      pushFormAbandon(DISTRIBUIDOR_CARE.formName, lerEstado().etapa)
    }
    document.addEventListener('visibilitychange', aoMudarVisibilidade)
    return () => document.removeEventListener('visibilitychange', aoMudarVisibilidade)
  }, [])

  return { estado: estadoAtual, envio, ui, acoes }
}
