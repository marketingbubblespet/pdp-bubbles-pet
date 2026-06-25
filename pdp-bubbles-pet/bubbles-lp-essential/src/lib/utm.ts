// src/lib/utm.ts
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
] as const

type UtmKey = typeof UTM_KEYS[number]
export type UtmParams = Partial<Record<UtmKey, string>>

const SESSION_KEY = 'bubbles_utms'

export function saveUtms(search: string): void {
  const params = new URLSearchParams(search)
  const utms: UtmParams = {}
  for (const key of UTM_KEYS) {
    const val = params.get(key)
    if (val) utms[key] = val
  }
  if (Object.keys(utms).length > 0) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(utms))
    } catch {}
  }
}

export function loadUtms(): UtmParams {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as UtmParams) : {}
  } catch {
    return {}
  }
}

export function appendUtms(baseUrl: string, utms: UtmParams): string {
  if (Object.keys(utms).length === 0) return baseUrl
  try {
    const url = new URL(baseUrl)
    for (const [key, value] of Object.entries(utms)) {
      if (value) url.searchParams.set(key, value)
    }
    return url.toString()
  } catch {
    return baseUrl
  }
}
