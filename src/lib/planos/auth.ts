// src/lib/planos/auth.ts
// Cookie assinado (HMAC-SHA256) que protege /planos. Usa Web Crypto (SubtleCrypto) em vez
// de `node:crypto` porque este módulo roda tanto no middleware (Edge) quanto em route
// handlers (Node) — SubtleCrypto é a única API de assinatura comum aos dois runtimes.
export const NOME_COOKIE = 'planos_auth'
const DURACAO_MS = 12 * 60 * 60 * 1000 // 12h, conforme o briefing

function base64UrlDe(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlPara(valor: string): Uint8Array {
  const base64 = valor.replace(/-/g, '+').replace(/_/g, '/').padEnd(valor.length + ((4 - (valor.length % 4)) % 4), '=')
  const bin = atob(base64)
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

async function chaveHmac(segredo: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(segredo), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ])
}

async function assinar(payload: string, segredo: string): Promise<string> {
  const chave = await chaveHmac(segredo)
  const assinatura = await crypto.subtle.sign('HMAC', chave, new TextEncoder().encode(payload))
  return base64UrlDe(assinatura)
}

export async function gerarCookieAssinado(segredo: string): Promise<string> {
  const payload = base64UrlDe(new TextEncoder().encode(JSON.stringify({ exp: Date.now() + DURACAO_MS })).buffer as ArrayBuffer)
  const assinatura = await assinar(payload, segredo)
  return `${payload}.${assinatura}`
}

export async function validarCookieAssinado(valor: string | undefined, segredo: string): Promise<boolean> {
  if (!valor) return false
  const [payload, assinatura] = valor.split('.')
  if (!payload || !assinatura) return false

  const assinaturaEsperada = await assinar(payload, segredo)
  // Comparação em tempo constante: SubtleCrypto não expõe timingSafeEqual, mas o
  // tamanho fixo do HMAC-SHA256 (32 bytes) torna a comparação byte a byte aceitável aqui.
  if (assinatura.length !== assinaturaEsperada.length) return false
  let diferente = 0
  for (let i = 0; i < assinatura.length; i++) {
    diferente |= assinatura.charCodeAt(i) ^ assinaturaEsperada.charCodeAt(i)
  }
  if (diferente !== 0) return false

  try {
    const { exp } = JSON.parse(new TextDecoder().decode(base64UrlPara(payload))) as { exp: number }
    return typeof exp === 'number' && Date.now() < exp
  } catch {
    return false
  }
}
