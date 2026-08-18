'use client'
import { useSyncExternalStore } from 'react'
import { LIVE_CARE } from '@/lib/live-care'

export type LivePhase = 'antes' | 'ao-vivo' | 'depois'

// A página não pode virar lixo às 20h de domingo: a verba de anúncio costuma continuar
// rodando depois do evento. Este hook diz em qual dos três momentos estamos, para cada
// seção decidir o que mostrar.
function calcularFase(): LivePhase {
  const agora = Date.now()
  if (agora >= new Date(LIVE_CARE.endDateISO).getTime()) return 'depois'
  if (agora >= new Date(LIVE_CARE.targetDateISO).getTime()) return 'ao-vivo'
  return 'antes'
}

// O "tempo" é a fonte externa aqui: reavaliamos a cada 15s e avisamos o React só quando
// algo muda. useSyncExternalStore (mesmo padrão do CtaLink e da home) evita o setState
// dentro de efeito, que dispara renderização em cascata.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15000)
  return () => clearInterval(id)
}

// Retorna null no servidor e no primeiro render: "agora" não existe na renderização
// estática. Quem consome trata null como "antes da live", que é o caso da maioria
// absoluta das visitas.
export function useLiveCarePhase(): LivePhase | null {
  return useSyncExternalStore(subscribe, calcularFase, () => null)
}
