// src/components/ui/SectionWrapper.tsx
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
  id?: string
  bg?: 'default' | 'accent' | 'dark'
}

export function SectionWrapper({ children, className, id, bg = 'default' }: Props) {
  const bgMap = {
    default: 'bg-background',
    accent: 'bg-accent/20',
    dark: 'bg-foreground text-background',
  }
  return (
    <section
      id={id}
      className={cn('px-4 py-16 md:py-24', bgMap[bg], className)}
    >
      <div className="max-w-content mx-auto">
        {children}
      </div>
    </section>
  )
}
