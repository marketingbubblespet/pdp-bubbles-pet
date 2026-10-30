// Subir anúncios da Black November 2026: copiar campos, baixar artes e marcar o que está no ar.
// Mesmo padrão de /criativos-black-november: rota que devolve um HTML pronto, fora do Google.
import { ANUNCIOS_BLACK_NOVEMBER_HTML } from '@/lib/anuncios-black-november'

export async function GET() {
  return new Response(ANUNCIOS_BLACK_NOVEMBER_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
