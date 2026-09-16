// src/lib/planos/mensagem.ts
// Monta o texto puro (sem markdown, WhatsApp aceita *negrito*) enviado por WhatsApp ou copiado.
import type { PlanoFrontmatter } from './types'
import type { Resumo } from './resumo'
import { formatMoneyNumber, formatDateBR, formatDataAgora, formatHoraAgora } from './format'

export const LIMITE_CARACTERES_AVISO = 1500

function linhaAprovada(x: Resumo['aprovadas'][number], indice: number): string {
  const { acao } = x
  const linhas = [`${indice + 1}. ${acao.nome} — ${acao.acao}`]

  if (acao.verba.atual != null && acao.verba.sugerida != null) {
    linhas.push(`   Verba: R$ ${formatMoneyNumber(acao.verba.atual)}/dia → R$ ${formatMoneyNumber(acao.verba.sugerida)}/dia`)
  }
  if (x.opcaoEscolhida) {
    const opcao = acao.opcoes.find((o) => o.id === x.opcaoEscolhida)
    if (opcao) linhas.push(`   Escolha: ${opcao.texto}`)
  }
  if (x.observacao.trim()) linhas.push(`   ${x.observacao.trim()}`)

  return linhas.join('\n')
}

function linhaReprovada(x: Resumo['reprovadas'][number], indice: number): string {
  const { acao } = x
  return [`${indice + 1}. ${acao.nome} — ${acao.acao}`, `   Motivo: ${x.observacao.trim()}`].join('\n')
}

function linhaPendente(x: Resumo['pendentes'][number], indice: number): string {
  return `${indice + 1}. ${x.acao.nome} — ${x.acao.acao}`
}

export function montarMensagem(plano: PlanoFrontmatter, resumo: Resumo): string {
  const blocos: string[] = []

  blocos.push(`*Relatório de análise · ${plano.cliente.nome} · ${plano.canal}*`)
  blocos.push(`Período analisado: ${formatDateBR(plano.periodo.inicio)} a ${formatDateBR(plano.periodo.fim)}`)
  blocos.push(`Revisado por ${plano.revisor} em ${formatDataAgora()} às ${formatHoraAgora()}`)
  blocos.push('')

  blocos.push(`*✅ APROVADAS (${resumo.aprovadas.length})*`)
  blocos.push(
    resumo.aprovadas.length > 0
      ? resumo.aprovadas.map(linhaAprovada).join('\n')
      : 'Nenhuma.',
  )
  blocos.push('')

  blocos.push(`*❌ NÃO APLICADAS (${resumo.reprovadas.length})*`)
  blocos.push(
    resumo.reprovadas.length > 0
      ? resumo.reprovadas.map(linhaReprovada).join('\n')
      : 'Nenhuma.',
  )

  if (resumo.pendentes.length > 0) {
    blocos.push('')
    blocos.push(`*⏳ PENDENTES (${resumo.pendentes.length})*`)
    blocos.push(resumo.pendentes.map(linhaPendente).join('\n'))
  }

  blocos.push('')
  const sinalImpacto = resumo.impactoSemanal >= 0 ? 'libera' : 'exige a mais'
  blocos.push(`*Impacto estimado:* ${sinalImpacto} R$ ${formatMoneyNumber(Math.abs(resumo.impactoSemanal))}/semana`)
  blocos.push(`Relatório: ${plano.slug}`)

  return blocos.join('\n')
}
