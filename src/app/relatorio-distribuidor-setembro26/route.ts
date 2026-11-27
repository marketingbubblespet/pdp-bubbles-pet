// Relatório de captação de distribuidores de setembro de 2026, na estrutura padrão (9 seções).
// HTML montado em src/lib/relatorio-distribuidor/paginas-v3.ts.
import { comFavicon } from '@/lib/favicon-html'
import { paginaSetembro2026, respostaRelatorio } from '@/lib/relatorio-distribuidor/paginas-v3'

export async function GET() {
  return respostaRelatorio(comFavicon(paginaSetembro2026()))
}
