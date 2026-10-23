// Atribuição do lead da LP /distribuidor-care: UTMs, gclid, fbclid e os cookies _fbp e _fbc do Pixel.
// Lógica copiada de src/lib/atendimento.ts:187-197 (sem importar as funções privadas de lá).
import { loadUtms } from '@/lib/utm'

function lerCookie(nome: string): string {
  if (typeof document === 'undefined') return ''
  const m = document.cookie.match(new RegExp(`(?:^|; )${nome.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&')}=([^;]*)`))
  return m ? decodeURIComponent(m[1]) : ''
}

/**
 * fbc a guardar no progresso: o já guardado; sem ele, sem cookie _fbc e com fbclid, monta
 * fb.1.<ms>.<fbclid> uma única vez (o chamador grava no EstadoForm).
 */
export function fbcParaGuardar(guardado: string): string {
  if (guardado || lerCookie('_fbc')) return guardado
  const fbclid = loadUtms().fbclid ?? ''
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : ''
}

export function lerAtribuicao(fbcGuardado: string): Record<string, string> {
  const u = loadUtms()
  return {
    utm_source: u.utm_source ?? '', utm_medium: u.utm_medium ?? '', utm_campaign: u.utm_campaign ?? '',
    utm_term: u.utm_term ?? '', utm_content: u.utm_content ?? '', gclid: u.gclid ?? '', fbclid: u.fbclid ?? '',
    fbp: lerCookie('_fbp'),
    fbc: lerCookie('_fbc') || fbcGuardado,
  }
}
