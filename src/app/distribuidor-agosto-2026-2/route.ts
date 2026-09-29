// Versão 2 do relatório de agosto, montada pelo modelo reutilizável em
// src/lib/relatorio-distribuidor/. A versão original continua em /distribuidor-agosto-2026.
import { respostaRelatorio } from '@/lib/relatorio-distribuidor/render'
import { relatorioAgosto2026 } from '@/lib/relatorio-distribuidor/2026-08'

export async function GET() {
  return respostaRelatorio(relatorioAgosto2026)
}
