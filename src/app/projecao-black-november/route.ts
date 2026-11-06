// Projeção de verba da Black November 2026 na Meta (cenários de R$ 30, 40, 45 e 50 mil).
// Mesmo padrão de /anuncios-black-november: rota que devolve um HTML pronto, fora do Google.
import { PROJECAO_BLACK_NOVEMBER_HTML } from '@/lib/projecao-black-november'
import { comFavicon } from '@/lib/favicon-html'

export async function GET() {
  return new Response(comFavicon(PROJECAO_BLACK_NOVEMBER_HTML), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
