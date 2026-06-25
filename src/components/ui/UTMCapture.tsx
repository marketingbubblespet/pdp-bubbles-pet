'use client'
// src/components/ui/UTMCapture.tsx
// Roda 1x no mount: lê UTMs da URL e salva em sessionStorage.
import { useEffect } from 'react'
import { saveUtms } from '@/lib/utm'

export function UTMCapture() {
  useEffect(() => {
    saveUtms(window.location.search)
  }, [])

  return null
}
