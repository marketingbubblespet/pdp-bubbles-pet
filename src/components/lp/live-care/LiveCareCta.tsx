'use client'
import { LIVE_CARE } from '@/lib/live-care'
import { trackJoinGroup } from './trackLiveCare'

// Botão único da página: entrar no grupo do WhatsApp. `origem` só serve para o
// rastreamento saber de qual seção veio o clique.
export function LiveCareCta({
  children,
  origem,
  pulse = false,
  className = '',
}: {
  children: React.ReactNode
  origem: string
  pulse?: boolean
  className?: string
}) {
  return (
    <a
      href={LIVE_CARE.whatsappGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackJoinGroup(origem)}
      // min-h-[52px] garante área de toque confortável no mobile (alvo mínimo de 44px)
      className={`inline-flex items-center justify-center gap-2 min-h-[52px] bg-[#3DB85C] text-white font-bold rounded-[10px] px-6 md:px-8 py-3.5 md:py-4 hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md text-center ${className}`}
      style={pulse ? { animation: 'livecare-pulse 2.4s ease-in-out infinite' } : undefined}
    >
      {children}
    </a>
  )
}
