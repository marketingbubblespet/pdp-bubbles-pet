// Botão CTA da MasterClass Penteados — tema claro (DESIGN-SYSTEM.md).
export function MasterCtaPenteados({
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
      className={`inline-flex items-center justify-center gap-2 bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3 md:py-4 min-h-[44px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95 text-center ${className}`}
      style={pulse ? { animation: 'mcp-pulse 2s ease-in-out infinite' } : undefined}
    >
      {children}
    </a>
  )
}
