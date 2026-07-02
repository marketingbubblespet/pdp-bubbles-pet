// Botão CTA padrão da masterclass (verde, com opção de pulsar).
export function MasterCta({
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
      className={`inline-flex items-center justify-center gap-2 bg-[#3DB85C] text-white font-bold rounded-[10px] px-6 md:px-8 py-3.5 md:py-4 hover:brightness-110 active:scale-95 transition-all duration-200 text-center ${className}`}
      style={pulse ? { animation: 'mc-pulse 2s ease-in-out infinite' } : undefined}
    >
      {children}
    </a>
  )
}
