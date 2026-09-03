// Eventos de rastreamento da MasterClass Penteados. GTM-5L9TD3PN (masterclass/live/isca),
// configurado direto no GTM. Aqui só empurramos pro dataLayer.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

function push(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

// Clique num CTA de compra (site/WhatsApp/distribuidor): não é lead capturado no nosso
// CRM, é saída pra loja, então fica em nível de engajamento (cta_click), não lead_form_submitted.
export function trackPurchaseClick(origem: string) {
  push({ event: 'cta_click', form_name: 'masterclass-penteados', origem })
}

export function trackFaqOpen(pergunta: string) {
  push({ event: 'faq_open', form_name: 'masterclass-penteados', pergunta })
}

export function trackExitPopup() {
  push({ event: 'exit_popup_shown', form_name: 'masterclass-penteados' })
}
