'use client'
import { LIVE } from '@/lib/live-tosador'
import { trackJoinClick } from './trackJoin'

export function LiveCta({
  children,
  pulse = false,
  className = '',
}: {
  children: React.ReactNode
  pulse?: boolean
  className?: string
}) {
  return (
    <a
      href={LIVE.whatsappGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackJoinClick}
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-[10px] px-6 md:px-8 py-3.5 md:py-4 hover:brightness-110 active:scale-95 transition-all duration-200 text-center ${className}`}
      style={pulse ? { animation: 'live-pulse 2s ease-in-out infinite' } : undefined}
    >
      {children}
    </a>
  )
}
