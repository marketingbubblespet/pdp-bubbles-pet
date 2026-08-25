// src/lib/tracking.ts
// Módulo central de rastreamento (dataLayer). Nenhum componente deve chamar
// window.dataLayer.push, window.gtag ou window.fbq diretamente — sempre pelas funções
// exportadas aqui. Isso garante que todo evento novo (e toda LP nova) siga o mesmo
// contrato, sem precisar configurar nada no GTM além de escutar o nome do evento.
// Ver docs/tracking.md para a tabela completa de eventos e como usar em página nova.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

function push(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

// ---------------------------------------------------------------------------
// Geração de ID de lead
// ---------------------------------------------------------------------------

/**
 * Gera um ID de lead determinístico o bastante para servir de chave de dedupe entre
 * navegador e servidor: ex. createLeadId('care') => 'care-20260825-a3f9c1'.
 *
 * Nunca use crypto.randomUUID() para compor o event_id: o event_id precisa ser o mesmo
 * dos dois lados (navegador e Conversions API/servidor), e a única forma de garantir
 * isso sem round-trip é o navegador gerar UMA vez e essa mesma string viajar junto no
 * payload que vai pro Netlify/Sellum. Um UUID aleatório por lado dobraria a contagem
 * de conversão silenciosamente.
 */
export function createLeadId(formSlug: string): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const suffix = Math.random().toString(36).slice(2, 8)
  return `${formSlug}-${yyyy}${mm}${dd}-${suffix}`
}

// ---------------------------------------------------------------------------
// Normalização de dados de identidade (Advanced Matching / Enhanced Conversions)
// ---------------------------------------------------------------------------

function normalizeEmail(email: string): string | undefined {
  const v = email.trim().toLowerCase()
  return v === '' ? undefined : v
}

// Só dígitos, com DDI 55 na frente. Aceita valor já formatado ((11) 91234-5678) ou cru.
function normalizePhone(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, '')
  if (digits === '') return undefined
  return digits.startsWith('55') ? digits : `55${digits}`
}

function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const parts = fullName.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  const [firstName, ...rest] = parts
  const lastName = rest.length > 0 ? rest.join(' ') : undefined
  return { firstName, lastName }
}

// ---------------------------------------------------------------------------
// API pública — um push por tipo de evento, nomes e chaves fixos (contrato com o GTM)
// ---------------------------------------------------------------------------

export function pushLead(params: {
  leadId: string
  formName: string
  qualified: boolean
  user: { email?: string; phone?: string; firstName?: string; lastName?: string }
  extra?: Record<string, unknown>
}): void {
  const { leadId, formName, qualified, user, extra } = params

  const userData: Record<string, string> = {}
  const email = user.email ? normalizeEmail(user.email) : undefined
  const phone = user.phone ? normalizePhone(user.phone) : undefined
  if (email) userData.email = email
  if (phone) userData.phone_number = phone
  if (user.firstName) userData.first_name = user.firstName.trim().toLowerCase()
  if (user.lastName) userData.last_name = user.lastName.trim().toLowerCase()

  push({
    event: 'lead_form_submitted',
    event_id: `lead.${leadId}`,
    lead_id: leadId,
    form_name: formName,
    lead_qualified: qualified,
    user_data: userData,
    ...(extra ?? {}),
  })
}

/** Atalho: monta user_data a partir de nome completo + telefone + email crus. */
export function pushLeadFromForm(params: {
  leadId: string
  formName: string
  qualified: boolean
  fullName: string
  email?: string
  phone: string
  extra?: Record<string, unknown>
}): void {
  const { firstName, lastName } = splitName(params.fullName)
  pushLead({
    leadId: params.leadId,
    formName: params.formName,
    qualified: params.qualified,
    user: { email: params.email, phone: params.phone, firstName, lastName },
    extra: params.extra,
  })
}

export function pushFormOpen(formName: string): void {
  push({ event: 'form_open', form_name: formName })
}

export function pushFormStep(formName: string, stepNumber: number, stepName: string): void {
  push({ event: 'form_step', form_name: formName, step_number: stepNumber, step_name: stepName })
}

export function pushFormAbandon(formName: string, stepNumber: number): void {
  push({ event: 'form_abandon', form_name: formName, step_number: stepNumber })
}

export function pushCtaClick(label: string, location: string): void {
  push({ event: 'cta_click', cta_label: label, cta_location: location })
}

export function pushWhatsappClick(location: string): void {
  push({ event: 'whatsapp_click', link_location: location })
}

export function pushShareClick(location: string): void {
  push({ event: 'share_click', share_location: location })
}

export function pushCalculatorUse(calculatorName: string, extra?: Record<string, unknown>): void {
  push({ event: 'calculator_use', calculator_name: calculatorName, ...(extra ?? {}) })
}

export function pushExitPopupShown(location: string): void {
  push({ event: 'exit_popup_shown', popup_location: location })
}

export function pushExitPopupClick(location: string): void {
  push({ event: 'exit_popup_click', popup_location: location })
}

export function pushScrollDepth(percent: number): void {
  push({ event: 'scroll_depth', percent_scrolled: percent })
}

export function pushPageView(path: string, title: string): void {
  push({ event: 'page_view', page_path: path, page_title: title })
}

// ---------------------------------------------------------------------------
// NÍVEL 2 — Lead leve (só GA4, sem conversão de mídia paga)
// ---------------------------------------------------------------------------

/**
 * Captura de contato antes de abrir o WhatsApp. NÃO é `lead_form_submitted`:
 * esse nome é reservado a candidatura de distribuidor/revenda gravada no CRM
 * (Nível 1, dispara conversão de Google Ads e Meta). Aqui o dado vai só pro
 * Netlify Forms, então é Nível 2 e usa nome próprio.
 *
 * Todos os campos de identificação são opcionais por decisão de produto: quem não
 * quiser preencher segue pro WhatsApp mesmo assim, e ainda registramos a origem
 * do clique, a URL de conversão e os parâmetros de campanha.
 */
export function pushWhatsappGate(params: {
  gateId: string
  formName: string
  landingPage: string
  ctaLocation: string
  perfil?: string
  user?: { email?: string; phone?: string; firstName?: string; lastName?: string }
  extra?: Record<string, unknown>
}): void {
  const { gateId, formName, landingPage, ctaLocation, perfil, user, extra } = params

  const userData: Record<string, string> = {}
  const email = user?.email ? normalizeEmail(user.email) : undefined
  const phone = user?.phone ? normalizePhone(user.phone) : undefined
  if (email) userData.email = email
  if (phone) userData.phone_number = phone
  if (user?.firstName) userData.first_name = user.firstName.trim().toLowerCase()
  if (user?.lastName) userData.last_name = user.lastName.trim().toLowerCase()

  push({
    event: 'whatsapp_gate_submitted',
    event_id: `gate.${gateId}`,
    gate_id: gateId,
    form_name: formName,
    landing_page: landingPage,
    cta_location: ctaLocation,
    // Campo vazio é omitido, nunca vai como string vazia.
    ...(perfil ? { perfil } : {}),
    ...(Object.keys(userData).length > 0 ? { user_data: userData } : {}),
    ...(extra ?? {}),
  })
}

/** Divide um nome completo em first/last para o contrato de `user_data`. */
export function splitFullName(fullName: string): { firstName?: string; lastName?: string } {
  return splitName(fullName)
}
