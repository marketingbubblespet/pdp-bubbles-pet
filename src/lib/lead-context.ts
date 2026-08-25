// src/lib/lead-context.ts
// Coleta automática do contexto de conversão: de onde a pessoa veio, em que página
// estava, onde clicou e como se comportou antes de converter.
//
// IMPORTANTE: todo campo daqui precisa estar declarado em `public/__forms.html`.
// O Netlify Forms descarta em SILÊNCIO qualquer campo não declarado lá, sem erro
// nem aviso. Ao adicionar um campo novo aqui, adicione também no HTML.
import { loadUtms } from '@/lib/utm'

// Momento em que a página carregou, para medir quanto tempo até a conversão.
const inicioDaVisita = Date.now()

// Maior porcentagem de rolagem alcançada. Atualizado pelo listener abaixo.
let scrollMaximo = 0

if (typeof window !== 'undefined') {
  const atualizarScroll = () => {
    const doc = document.documentElement
    const total = doc.scrollHeight - doc.clientHeight
    if (total <= 0) return
    const percentual = Math.round((window.scrollY / total) * 100)
    if (percentual > scrollMaximo) scrollMaximo = Math.min(percentual, 100)
  }
  window.addEventListener('scroll', atualizarScroll, { passive: true })
}

function detectarDispositivo(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const largura = window.innerWidth
  if (largura < 768) return 'mobile'
  if (largura < 1024) return 'tablet'
  return 'desktop'
}

// Marca que esta pessoa já visitou o site antes (qualquer LP), para separar
// primeira visita de retorno na análise.
const CHAVE_VISITA = 'bubbles_ja_visitou'

function ehVisitaRecorrente(): boolean {
  try {
    const jaVisitou = localStorage.getItem(CHAVE_VISITA) === '1'
    localStorage.setItem(CHAVE_VISITA, '1')
    return jaVisitou
  } catch {
    return false
  }
}

export type LeadContext = Record<string, string>

/**
 * Monta o pacote de contexto que acompanha todo envio do gate.
 * Retorna tudo como string porque o Netlify Forms trabalha com
 * application/x-www-form-urlencoded.
 */
export function coletarContexto(params: {
  ctaLocation: string
  ctaLabel: string
  destinoUrl: string
}): LeadContext {
  const utms = loadUtms()
  const agora = new Date()

  const contexto: LeadContext = {
    // Atribuição de campanha
    // full_url guarda a URL completa COM query string: é o que permite recuperar
    // qualquer parâmetro que não mapeamos individualmente (inclusive fbclid/gclid
    // que chegaram em formatos novos).
    full_url: window.location.href,
    landing_page: window.location.pathname,
    referrer: document.referrer || 'direto',

    // Contexto do clique
    cta_location: params.ctaLocation,
    cta_label: params.ctaLabel,
    destino_url: params.destinoUrl,

    // Engajamento antes de converter
    tempo_na_pagina: String(Math.round((Date.now() - inicioDaVisita) / 1000)),
    scroll_max: String(scrollMaximo),
    visita_recorrente: ehVisitaRecorrente() ? 'sim' : 'nao',

    // Técnico
    dispositivo: detectarDispositivo(),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    user_agent: navigator.userAgent,
    enviado_em: agora.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  }

  // UTMs e IDs de clique de anúncio. Só entram se existirem, para não gravar
  // string vazia no painel.
  for (const [chave, valor] of Object.entries(utms)) {
    if (valor) contexto[chave] = valor
  }

  return contexto
}
