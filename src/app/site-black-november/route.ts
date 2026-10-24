// Propostas de site da Black November 2026 (protótipos e impacto estimado).
// Mesmo padrão de /criativos-black-november: rota que devolve um HTML pronto, fora do Google.
import { SITE_BLACK_NOVEMBER_HTML } from '@/lib/site-black-november'

export async function GET() {
  return new Response(SITE_BLACK_NOVEMBER_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
