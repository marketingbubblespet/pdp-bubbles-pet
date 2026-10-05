// Relatório de captação de distribuidores de setembro de 2026 (modelo em src/lib/relatorio-distribuidor/).
import { respostaRelatorio } from '@/lib/relatorio-distribuidor/render'
import { relatorioSetembro2026 } from '@/lib/relatorio-distribuidor/2026-09'

export async function GET() {
  return respostaRelatorio(relatorioSetembro2026)
}
