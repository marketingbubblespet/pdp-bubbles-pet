'use client'
import { LIVE } from '@/lib/live-tosador'
import { WhatsappGate } from '@/components/ui/WhatsappGate'

export function LiveCta({
  children,
  pulse = false,
  className = '',
  origem = 'cta',
  label = 'Entrar no grupo do WhatsApp',
}: {
  children: React.ReactNode
  pulse?: boolean
  className?: string
  origem?: string
  label?: string
}) {
  return (
    <WhatsappGate
      href={LIVE.whatsappGroupUrl}
      ctaLocation={`live-tosador-${origem}`}
      ctaLabel={label}
      theme="dark"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold rounded-[10px] px-6 md:px-8 py-3.5 md:py-4 hover:brightness-110 active:scale-95 transition-all duration-200 text-center ${className}`}
      style={pulse ? { animation: 'live-pulse 2s ease-in-out infinite' } : undefined}
    >
      {children}
    </WhatsappGate>
  )
}
