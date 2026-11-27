// Sempre o relatório de distribuidores mais novo: o primeiro mês de MESES_V3 (v3.ts).
// Os meses ficam em /relatorio-distribuidor-<mes><aa>. Funções em paginas-v3.ts.
import { comFavicon } from '@/lib/favicon-html'
import { paginaMaisNova, respostaRelatorio } from '@/lib/relatorio-distribuidor/paginas-v3'

export async function GET() {
  return respostaRelatorio(comFavicon(paginaMaisNova()))
}
