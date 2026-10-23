'use client'
// Link de âncora interna da LP /distribuidor-care (#cadastro, #simulador). Só rola a página: é cta_click, nunca lead.
import type { ReactNode } from 'react'
import { pushCtaClick } from '@/lib/tracking'

type Props = { href: string; rotulo: string; local: string; className?: string; children: ReactNode }

export function DistribuidorCareTrackedLink({ href, rotulo, local, className, children }: Props) {
  return (
    <a href={href} className={className} onClick={() => pushCtaClick(rotulo, local)}>
      {children}
    </a>
  )
}
