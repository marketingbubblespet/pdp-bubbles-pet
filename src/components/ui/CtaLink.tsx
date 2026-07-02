'use client'
// src/components/ui/CtaLink.tsx
// Drop-in replacement para <a> que injeta UTMs persistidos no href de destino.
import { useSyncExternalStore, type ReactNode } from 'react'
import { loadUtms, appendUtms } from '@/lib/utm'

interface Props {
  href: string
  className?: string
  children: ReactNode
  target?: string
  rel?: string
  onClick?: () => void
}

// sessionStorage não muda durante o ciclo de vida do componente (é escrito uma vez
// pelo UTMCapture no carregamento da página), então não há evento para assinar.
function subscribe() {
  return () => {}
}

export function CtaLink({
  href,
  className,
  children,
  target = '_blank',
  rel = 'noopener noreferrer',
  onClick,
}: Props) {
  // useSyncExternalStore lê a UTM no client sem o padrão setState-dentro-de-effect
  // (que causava um render extra) e sem warning de hidratação: o snapshot do server
  // é o href puro, e o React troca para o snapshot real do client automaticamente.
  const finalUrl = useSyncExternalStore(
    subscribe,
    () => appendUtms(href, loadUtms()),
    () => href,
  )

  return (
    <a href={finalUrl} className={className} target={target} rel={rel} onClick={onClick}>
      {children}
    </a>
  )
}
