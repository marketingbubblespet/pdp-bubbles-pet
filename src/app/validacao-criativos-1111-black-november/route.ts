// Validação Meta: rota que devolve HTML pronto, fora do Google (mesmo padrão de /anuncios-black-november).
import { VALIDACAOCRIATIVOS1111BLACKNOVEMBER_HTML } from '@/lib/validacao-criativos-1111-black-november'

export async function GET() {
  return new Response(VALIDACAOCRIATIVOS1111BLACKNOVEMBER_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
