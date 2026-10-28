// Plano de tarefas da Black November 2026 (nome, descrição, data, responsável, com botões de copiar).
// Mesmo padrão de /projecao-black-november: rota que devolve um HTML pronto, fora do Google.
import { PLANO_TAREFAS_BLACK_NOVEMBER_HTML } from '@/lib/plano-tarefas-black-november'

export async function GET() {
  return new Response(PLANO_TAREFAS_BLACK_NOVEMBER_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
