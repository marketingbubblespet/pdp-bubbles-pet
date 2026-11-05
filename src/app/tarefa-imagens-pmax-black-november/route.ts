// Tarefa de criação das imagens PMax: HTML pronto, fora do Google.
import { TAREFA_IMAGENS_PMAX_BLACK_NOVEMBER_HTML } from '@/lib/tarefa-imagens-pmax-black-november'

export async function GET() {
  return new Response(TAREFA_IMAGENS_PMAX_BLACK_NOVEMBER_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
