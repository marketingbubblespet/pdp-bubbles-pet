// Eventos de rastreamento da LP PET South America (padrão trackCare.ts).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackPetSouthLead() {
  window.gtag?.('event', 'generate_lead', { event_category: 'pet_south_distribuidor' })
  window.fbq?.('track', 'Lead')
}

export function trackPetSouthFormSubmit() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'form_submit', form_name: 'pet-south-lead' })
}
