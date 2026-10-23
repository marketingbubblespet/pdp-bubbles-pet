// Criativos Meta Ads da Black November 2026 para groomers (estáticos, vídeos e remarketing).
// Mesmo padrão de /criativos-distribuidor-care: rota que devolve um HTML pronto, fora do Google.
import { CRIATIVOS_BLACK_NOVEMBER_HTML } from '@/lib/criativos-black-november'

export async function GET() {
  return new Response(CRIATIVOS_BLACK_NOVEMBER_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
