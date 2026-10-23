// Criativos Meta Ads da captação de distribuidores da Linha Care (estáticos e roteiros modulares).
// Mesmo padrão dos relatórios de distribuidor: rota que devolve um HTML pronto, fora do Google.
import { CRIATIVOS_DISTRIBUIDOR_CARE_HTML } from '@/lib/criativos-distribuidor-care'

export async function GET() {
  return new Response(CRIATIVOS_DISTRIBUIDOR_CARE_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
