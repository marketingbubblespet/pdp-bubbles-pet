// Validação de imagens: rota que devolve HTML pronto, fora do Google (mesmo padrão de /plano-google-black-november).
import { VALIDACAOIMAGENSBLACKNOVEMBER_HTML } from '@/lib/validacao-imagens-black-november'

export async function GET() {
  return new Response(VALIDACAOIMAGENSBLACKNOVEMBER_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
