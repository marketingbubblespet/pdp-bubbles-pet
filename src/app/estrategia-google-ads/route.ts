// Plano de Google Ads da Black November 2026 (execução, campanhas, textos, Merchant e o porquê).
// Mesmo padrão de /anuncios-black-november: rota que devolve um HTML pronto, fora do Google.
import { PLANO_GOOGLE_BLACK_NOVEMBER_HTML } from '@/lib/plano-google-black-november'

export async function GET() {
  return new Response(PLANO_GOOGLE_BLACK_NOVEMBER_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
