// Antes e depois dos ajustes nos criativos da Black Week, para revisão da Mariane. Gerado por gerar_antes_depois.py --site.
import { HTML_ROTEIROS_BLACK_WEEK_AJUSTES } from '@/lib/roteiros-black-week-ajustes'
import { comFavicon } from '@/lib/favicon-html'

export async function GET() {
  return new Response(comFavicon(HTML_ROTEIROS_BLACK_WEEK_AJUSTES), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
