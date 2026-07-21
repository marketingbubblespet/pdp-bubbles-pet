'use client'
import { useEffect, useState } from 'react'

export function LiveEventGate({
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
