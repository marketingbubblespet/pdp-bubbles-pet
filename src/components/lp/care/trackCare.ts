// Eventos de rastreamento da LP Bubbles Care (padrão trackJoin.ts da live-dia-do-tosador).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function trackCareLead() {
  window.gtag?.('event', 'generate_lead', { event_category: 'care_revenda' })
  window.fbq?.('track', 'Lead')
}

// Dispara (com throttle simples) quando o lojista mexe no slider da calculadora.
let lastCalculatorEvent = 0
export function trackCareCalculatorUse() {
  const now = Date.now()
  if (now - lastCalculatorEvent < 1500) return
  lastCalculatorEvent = now
  window.gtag?.('event', 'calculator_use', { event_category: 'care_revenda' })
}
