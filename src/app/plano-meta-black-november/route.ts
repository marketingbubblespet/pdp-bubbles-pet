// Plano da campanha Meta Ads da Black November 2026 (estrutura, públicos, verba, criativos e operação).
// Mesmo padrão de /criativos-black-november: rota que devolve um HTML pronto, fora do Google.
import { PLANO_META_BLACK_NOVEMBER_HTML } from '@/lib/plano-meta-black-november'

export async function GET() {
  return new Response(PLANO_META_BLACK_NOVEMBER_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
