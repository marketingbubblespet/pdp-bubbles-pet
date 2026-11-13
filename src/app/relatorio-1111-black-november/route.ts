// Relatorio do pico 11.11 da Black November 2026 (senha da Black, lembrada no navegador).
import { RELATORIO_1111_HTML } from '@/lib/relatorio-1111-black-november'
import { comFavicon } from '@/lib/favicon-html'

export async function GET() {
  return new Response(comFavicon(RELATORIO_1111_HTML), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
