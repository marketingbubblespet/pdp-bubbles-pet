// Eventos de rastreamento da LP da Live da Linha Care.
// Esta página não tem formulário: a conversão é o clique de saída para o grupo do
// WhatsApp. Tudo vai pelo dataLayer, porque GA4/Ads/Meta agora são configurados dentro
// do GTM (GTM-5L9TD3PN), e não mais por script direto no layout.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

function push(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

// Conversão principal. `origem` identifica qual CTA da página foi clicado, o que permite
// medir no GTM qual posição converte mais sem criar um evento novo para cada botão.
export function trackJoinGroup(origem: string) {
  push({ event: 'join_group', form_name: 'live-care', origem })
}

// Clique para assistir no Instagram (só aparece durante a transmissão).
export function trackWatchLive() {
  push({ event: 'watch_live', form_name: 'live-care' })
}

// Abertura de uma pergunta da FAQ, útil para descobrir a maior objeção do público.
export function trackFaqOpen(pergunta: string) {
  push({ event: 'faq_open', form_name: 'live-care', pergunta })
}

// Pop-up de saída exibido.
export function trackExitPopup() {
  push({ event: 'exit_popup_shown', form_name: 'live-care' })
}
