'use client'
import { useEffect } from 'react'
import { MC, MC_PURCHASE_CHANNELS } from '@/lib/masterclass-spitz'

// WebMCP é uma API experimental de navegador (ainda não padronizada) que permite a uma
// página expor "ferramentas" para agentes de IA que navegam no site em nome do usuário.
// Este componente não renderiza nada visualmente — só registra as ferramentas quando o
// navegador suporta a API, e não faz nada em caso contrário (feature-detection defensivo).
interface ModelContextTool {
  name: string
  description: string
  inputSchema?: Record<string, unknown>
  execute: (input?: unknown) => unknown | Promise<unknown>
}

interface ModelContext {
  registerTool: (tool: ModelContextTool) => void
  unregisterTool?: (name: string) => void
}

declare global {
  interface Navigator {
    modelContext?: ModelContext
  }
}

export function WebMcpTools() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.navigator?.modelContext) return

    const mc = window.navigator.modelContext
    const registered: string[] = []

    try {
      mc.registerTool({
        name: 'get_masterclass_details',
        description:
          'Retorna data, horário, formato e condição de acesso da MasterClass de Spitz Alemão.',
        execute: () => ({
          title: MC.title,
          date: MC.dateFull,
          time: MC.time,
          timezone: MC.timezone,
          duration: MC.duration,
          format: MC.format,
          platform: MC.platform,
          minPurchase: MC.minPurchase,
          purchaseDeadline: MC.purchaseDeadline,
          purchaseChannels: MC_PURCHASE_CHANNELS,
        }),
      })
      registered.push('get_masterclass_details')

      mc.registerTool({
        name: 'scroll_to_purchase_section',
        description:
          'Rola a página até a seção "Como garantir o seu acesso", onde estão os produtos e o passo a passo de compra.',
        execute: () => {
          document.getElementById('acesso')?.scrollIntoView({ behavior: 'smooth' })
          return { ok: true }
        },
      })
      registered.push('scroll_to_purchase_section')
    } catch {
      // API presente mas com formato inesperado — falha silenciosa, não afeta a página.
    }

    return () => {
      registered.forEach((name) => mc.unregisterTool?.(name))
    }
  }, [])

  return null
}
