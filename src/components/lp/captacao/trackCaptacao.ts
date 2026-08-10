// Eventos de rastreamento da LP de captação de distribuidores (padrão trackCare.ts).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackCaptacaoLead() {
  window.gtag?.('event', 'generate_lead', { event_category: 'captacao_distribuidor' })
  window.fbq?.('track', 'Lead')
}

export function trackCaptacaoFormSubmit() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'form_submit', form_name: 'captacao-lead' })
}

export function trackCaptacaoFormOpen() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'form_open', form_name: 'captacao-lead' })
}
