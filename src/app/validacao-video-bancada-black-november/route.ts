// Validação Meta: rota que devolve HTML pronto, fora do Google (mesmo padrão de /validacao-imagens-black-november).
import { VALIDACAOVIDEOBANCADABLACKNOVEMBER_HTML } from '@/lib/validacao-video-bancada-black-november'

export async function GET() {
  return new Response(VALIDACAOVIDEOBANCADABLACKNOVEMBER_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
