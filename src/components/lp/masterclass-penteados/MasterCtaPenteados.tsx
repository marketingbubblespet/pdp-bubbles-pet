'use client'
import { CtaLink } from '@/components/ui/CtaLink'
import { trackPurchaseClick } from './trackPenteados'

// Botão único da página: comprar (o que libera o acesso). Não é loja própria, então
// aponta pro site institucional, com UTM preservada via CtaLink. A animação "mcp-pulse"
// é definida uma vez em page.tsx (evita duplicar a keyframe em cada botão).
export function MasterCtaPenteados({
  origem,
  pulse = false,
  className = '',
  children,
}: {
  origem: string
  pulse?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <CtaLink
      href="https://www.bubbles.com.br"
      onClick={() => trackPurchaseClick(origem)}
      className={`inline-flex items-center justify-center gap-2 min-h-[52px] bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3.5 md:py-4 hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md text-center ${className}`}
    >
      <span style={pulse ? { animation: 'mcp-pulse 2.4s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: 8 } : { display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {children}
      </span>
    </CtaLink>
  )
}
