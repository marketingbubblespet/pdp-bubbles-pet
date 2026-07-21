// Dispara evento de lead quando alguém clica para entrar no grupo do WhatsApp.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}
export function trackJoinClick() {
  window.gtag?.('event', 'generate_lead', { event_category: 'live_dia_tosador' })
  window.fbq?.('track', 'Lead')
}
