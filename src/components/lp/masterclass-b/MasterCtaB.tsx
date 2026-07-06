// Botão CTA da versão B — "Midnight Luxury & Cosmic Rose".
export function MasterCtaB({
  href,
  children,
  pulse = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  pulse?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 bg-[#F4CDD4] text-[#080808] font-black uppercase tracking-widest rounded-xl px-6 md:px-8 py-3.5 md:py-4 transition-transform duration-150 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(244,205,212,0.2)] text-center ${className}`}
      style={pulse ? { animation: 'mcb-pulse 2s ease-in-out infinite' } : undefined}
    >
      {children}
    </a>
  )
}
