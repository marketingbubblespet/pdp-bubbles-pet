// Plano de aplicação do Google Ads da Black: HTML pronto, fora do Google.
import { PLANO_APLICACAO_GOOGLE_BLACK_NOVEMBER_HTML } from '@/lib/plano-aplicacao-google-black-november'
import { comFavicon } from '@/lib/favicon-html'

export async function GET() {
  return new Response(comFavicon(PLANO_APLICACAO_GOOGLE_BLACK_NOVEMBER_HTML), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
