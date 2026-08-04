// Eventos de rastreamento da LP Bubbles Care (padrão trackJoin.ts da live-dia-do-tosador).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackCareLead() {
  window.gtag?.('event', 'generate_lead', { event_category: 'care_revenda' })
  window.fbq?.('track', 'Lead')
}

// Evento do GTM/dataLayer no envio do formulário. Nome do evento mantido igual ao
// histórico ('care-lead') propositalmente: renomear quebraria gatilhos já configurados
// no Google Tag Manager, e isso não foi pedido.
export function trackCareFormSubmit() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'form_submit', form_name: 'care-lead' })
}

// Dispara (com throttle simples) quando o lojista mexe no slider da calculadora.
let lastCalculatorEvent = 0
export function trackCareCalculatorUse() {
  const now = Date.now()
  if (now - lastCalculatorEvent < 1500) return
  lastCalculatorEvent = now
  window.gtag?.('event', 'calculator_use', { event_category: 'care_revenda' })
}
