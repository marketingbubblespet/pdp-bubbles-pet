// src/lib/planos/resumo.ts
// Deriva o resumo (aprovadas/reprovadas/pendentes/impacto) a partir do plano + estado de
// revisão. Função pura, sem I/O, fácil de testar e reusar entre a UI e o builder da
// mensagem do WhatsApp.
import type { Acao, EstadoPlano, Investimento } from './types'

export interface AcaoComDecisao {
  acao: Acao
  decisao: 'pendente' | 'aprovado' | 'reprovado'
  observacao: string
  opcaoEscolhida: string | null
}

export interface Resumo {
  aprovadas: AcaoComDecisao[]
  reprovadas: AcaoComDecisao[]
  pendentes: AcaoComDecisao[]
  // Impacto diário: positivo = verba liberada, negativo = verba adicional necessária.
  // Só soma ações com verba.atual conhecida — sem isso não há como calcular impacto.
  impactoDiario: number
  impactoSemanal: number
}

// `pausar` sem verba.sugerida libera o valor atual inteiro (o item para de gastar);
// `reduzir`/`escalar` usam a diferença entre atual e sugerida. Sem `verba.atual`
// (comum no nível anúncio, onde a verba pertence ao conjunto), não há o que calcular.
function deltaVerba(a: Acao): number {
  if (a.verba.atual == null) return 0
  const sugerida = a.verba.sugerida ?? a.verba.atual
  if (a.tipo_acao === 'pausar') return a.verba.atual
  if (a.tipo_acao === 'reduzir') return a.verba.atual - sugerida
  if (a.tipo_acao === 'escalar') return -(sugerida - a.verba.atual)
  return 0
}

export function calcularResumo(acoes: Acao[], estado: EstadoPlano): Resumo {
  // `executado` já foi aplicado antes desta revisão: some do resumo, não conta como
  // pendência nem entra no cálculo de impacto (não é uma decisão em aberto).
  const revisaveis = acoes.filter((a) => a.tipo_acao !== 'executado')

  const comDecisao: AcaoComDecisao[] = revisaveis.map((acao) => {
    const s = estado[acao.id]
    return {
      acao,
      decisao: s?.decisao ?? 'pendente',
      observacao: s?.observacao ?? '',
      opcaoEscolhida: s?.opcaoEscolhida ?? null,
    }
  })

  const aprovadas = comDecisao.filter((x) => x.decisao === 'aprovado')
  const reprovadas = comDecisao.filter((x) => x.decisao === 'reprovado')
  const pendentes = comDecisao.filter((x) => x.decisao === 'pendente')

  const impactoDiario = aprovadas.reduce((soma, x) => soma + deltaVerba(x.acao), 0)

  return {
    aprovadas,
    reprovadas,
    pendentes,
    impactoDiario,
    impactoSemanal: impactoDiario * 7,
  }
}

// Projeção ajustada só é calculável quando o relatório já traz uma projeção de base.
export function projecaoComImpacto(investimento: Investimento, impactoSemanal: number): number | null {
  if (investimento.projecao_mes == null) return null
  const semanasNoMes = 4.33
  return investimento.projecao_mes - impactoSemanal * semanasNoMes
}
