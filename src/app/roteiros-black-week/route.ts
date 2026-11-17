// Roteiros e criativos da Black Week (23 a 30/11/2026) para validação. Com a senha da Black (mesma chave do índice).
// Gerado por scripts/black-week/gerar_validacao.py --site no projeto bubbles-gerador-de-ads. Rota que devolve HTML pronto, fora do Google.
import { ROTEIROS_BLACK_WEEK_HTML } from '@/lib/roteiros-black-week'
import { comFavicon } from '@/lib/favicon-html'

export async function GET() {
  return new Response(comFavicon(ROTEIROS_BLACK_WEEK_HTML), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
