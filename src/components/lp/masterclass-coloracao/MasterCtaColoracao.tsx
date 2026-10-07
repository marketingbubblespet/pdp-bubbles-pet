'use client'
import { CtaLink } from '@/components/ui/CtaLink'
import { pushCtaClick } from '@/lib/tracking'
import { MC } from '@/lib/masterclass-coloracao'

// Botão de compra da página: leva pra coleção Collora na Shopify (UTM preservada via
// CtaLink). Saída pra loja é engajamento (cta_click), nunca lead. A keyframe "mcc-pulse"
// é definida uma vez em page.tsx.
export function MasterCtaColoracao({
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
      href={MC.collectionUrl}
      onClick={() => pushCtaClick('masterclass-coloracao-comprar', origem)}
      className={`inline-flex items-center justify-center gap-2 min-h-[52px] bg-[#3DB85C] text-white font-semibold rounded-[12px] px-6 md:px-8 py-3.5 md:py-4 hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md text-center motion-reduce:transition-none ${className}`}
    >
      <span
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...(pulse ? { animation: 'mcc-pulse 2.4s ease-in-out infinite' } : {}) }}
      >
        {children}
      </span>
    </CtaLink>
  )
}
