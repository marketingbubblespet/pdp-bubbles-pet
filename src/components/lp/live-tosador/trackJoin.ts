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

// Dispara evento quando alguém usa o botão de compartilhar a página com outro groomer.
export function trackShareClick() {
  window.gtag?.('event', 'share', { event_category: 'live_dia_tosador' })
}
