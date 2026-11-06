// Validação Meta: rota que devolve HTML pronto, fora do Google (mesmo padrão de /validacao-imagens-black-november).
import { VALIDACAOVIDEOBANCADABLACKNOVEMBER2_HTML } from '@/lib/validacao-video-bancada-black-november-2'

export async function GET() {
  return new Response(VALIDACAOVIDEOBANCADABLACKNOVEMBER2_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
