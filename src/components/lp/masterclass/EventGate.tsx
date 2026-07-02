'use client'
import { useEffect, useState } from 'react'

// Troca o conteúdo automaticamente quando a data/hora do evento já passou.
export function EventGate({
  target,
  children,
  fallback,
}: {
  target: string
  children: React.ReactNode
  fallback: React.ReactNode
}) {
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const check = () => setFinished(Date.now() > new Date(target).getTime())
    check()
    const id = setInterval(check, 30000)
    return () => clearInterval(id)
  }, [target])

  return <>{finished ? fallback : children}</>
}
