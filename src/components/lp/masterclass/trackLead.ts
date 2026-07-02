// Dispara um evento de lead quando o visitante clica em um link de saída para a loja Bubbles.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function trackLeadClick() {
  window.gtag?.('event', 'generate_lead', { event_category: 'masterclass_spitz' })
  window.fbq?.('track', 'Lead')
}
