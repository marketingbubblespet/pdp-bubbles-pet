'use client'
// src/components/ui/CtaLink.tsx
// Drop-in replacement para <a> que injeta UTMs persistidos no href de destino.
import { useEffect, useState, type ReactNode } from 'react'
import { loadUtms, appendUtms } from '@/lib/utm'

interface Props {
  href: string
  className?: string
  children: ReactNode
  target?: string
  rel?: string
}

export function CtaLink({
  href,
  className,
  children,
  target = '_blank',
  rel = 'noopener noreferrer',
}: Props) {
  const [finalUrl, setFinalUrl] = useState(href)

  useEffect(() => {
    setFinalUrl(appendUtms(href, loadUtms()))
  }, [href])

  return (
    <a href={finalUrl} className={className} target={target} rel={rel}>
      {children}
    </a>
  )
}
