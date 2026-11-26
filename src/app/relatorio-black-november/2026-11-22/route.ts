// Relatório de acompanhamento da Black November 2026. Com senha (lembrada no navegador, mesma chave do índice).
// A senha é só cortina de navegação: o HTML fica no código-fonte, por isso nenhum dado de cliente individual entra aqui.
// Mesmo padrão de /estrategia-meta-ads: rota que devolve um HTML pronto, fora do Google.
import { RELATORIO_BLACK_NOVEMBER_ED_20261122_HTML } from '@/lib/relatorio-black-november-edicao-2026-11-22'
import { comFavicon } from '@/lib/favicon-html'

export async function GET() {
  return new Response(comFavicon(RELATORIO_BLACK_NOVEMBER_ED_20261122_HTML), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
