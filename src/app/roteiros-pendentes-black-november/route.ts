// Roteiros pendentes: rota que devolve HTML pronto, fora do Google (mesmo padrão de /anuncios-black-november).
import { ROTEIROS_PENDENTES_BLACK_NOVEMBER_HTML } from '@/lib/roteiros-pendentes-black-november'

export async function GET() {
  return new Response(ROTEIROS_PENDENTES_BLACK_NOVEMBER_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
