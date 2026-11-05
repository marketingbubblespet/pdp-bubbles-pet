// src/lib/planos/anomalias.ts
// Detecta variações fora do normal dia a dia, para a aba "Detalhes de alerta" do painel.
// Compara cada dia com (1) o dia anterior com dado e (2) a média dos dias anteriores com dado.
// Usa só números do Groomer (B2B), que é a planilha completa; a do Tutor (Care) ainda chega
// incompleta e distorceria a comparação.
import type { Dia } from './indicadores'

export type Indicador = 'receita' | 'pedidos' | 'sessoes' | 'aprovacao' | 'conversao' | 'investimento' | 'roas' | 'ticket'
export type Direcao = 'queda' | 'alta'

export type Anomalia = {
  data: string
  indicador: Indicador
  direcao: Direcao
  severidade: 'forte' | 'moderada'
  valor: number
  anterior: number
  dataAnterior: string
  media: number
  vsAnterior: number // variação relativa (ou em pontos, para aprovação)
  vsMedia: number
  // Mesmo dia da semana anterior (só existe a partir do 8º dia do mês)
  semana: { data: string; valor: number; variacao: number } | null
}

// AAAA-MM-DD menos 7 dias (mesmo dia da semana anterior). Usa UTC para não sofrer com fuso.
export function menos7(data: string): string {
  const t = new Date(`${data}T12:00:00Z`)
  t.setUTCDate(t.getUTCDate() - 7)
  return t.toISOString().slice(0, 10)
}

const div = (a: number | null, b: number | null) => (a != null && b != null && b > 0 ? a / b : null)

// Valor de cada indicador num dia (null = ainda sem os números necessários).
export function valorDoDia(d: Dia, i: Indicador): number | null {
  const invest = d.investMeta != null && d.investGoogle != null ? d.investMeta + d.investGoogle : null
  switch (i) {
    case 'receita': return d.receitaB2B
    case 'pedidos': return d.pedidosB2B
    case 'sessoes': return d.sessoes
    case 'aprovacao': return div(d.faturadaB2B, d.receitaB2B)
    case 'conversao': return div(d.pedidosB2B, d.sessoes)
    case 'investimento': return invest
    case 'roas': return div(d.receitaB2B, invest)
    case 'ticket': return div(d.receitaB2B, d.pedidosB2B)
  }
}

// Limites: variação ≥ 30% já é anomalia; ≥ 50% é forte. Aprovação é em pontos percentuais
// (queda de 3 pontos já pesa no caixa; 6 pontos é forte) e só a queda interessa.
const LIMITE = { moderada: 0.3, forte: 0.5 }
const LIMITE_APROV = { moderada: 0.03, forte: 0.06 }

const INDICADORES: Indicador[] = ['receita', 'pedidos', 'sessoes', 'aprovacao', 'conversao', 'investimento', 'roas', 'ticket']

function avaliarVariacao(i: Indicador, vsAnt: number, vsMed: number) {
  const pior = Math.abs(vsAnt) >= Math.abs(vsMed) ? vsAnt : vsMed
  if (i === 'aprovacao') {
    if (pior > -LIMITE_APROV.moderada) return null
    return { direcao: 'queda' as const, severidade: pior <= -LIMITE_APROV.forte ? 'forte' as const : 'moderada' as const }
  }
  if (Math.abs(pior) < LIMITE.moderada) return null
  return { direcao: pior < 0 ? 'queda' as const : 'alta' as const, severidade: Math.abs(pior) >= LIMITE.forte ? 'forte' as const : 'moderada' as const }
}

export function detectarAnomalias(dias: Dia[]): Anomalia[] {
  const saida: Anomalia[] = []
  for (const i of INDICADORES) {
    // Dias com ALTA anômala ficam fora da base de comparação: um pico positivo num dia não pode
    // gerar alerta de queda no dia seguinte. A base é o último dia "normal" e a média dos normais.
    const base: { data: string; v: number }[] = []
    for (const d of dias) {
      const v = valorDoDia(d, i)
      if (v == null) continue
      if (base.length > 0) {
        const ant = base[base.length - 1]
        const media = base.reduce((a, h) => a + h.v, 0) / base.length
        const rel = (x: number, b: number) => (i === 'aprovacao' ? x - b : b > 0 ? (x - b) / b : 0)
        const vsAnterior = rel(v, ant.v), vsMedia = rel(v, media)
        const r = avaliarVariacao(i, vsAnterior, vsMedia)
        const d7 = dias.find((x) => x.data === menos7(d.data))
        const v7 = d7 ? valorDoDia(d7, i) : null
        const semana = d7 && v7 != null ? { data: d7.data, valor: v7, variacao: rel(v, v7) } : null
        if (r) saida.push({ data: d.data, indicador: i, ...r, valor: v, anterior: ant.v, dataAnterior: ant.data, media, vsAnterior, vsMedia, semana })
        if (r?.direcao === 'alta') continue
      }
      base.push({ data: d.data, v })
    }
  }
  // Mais recentes primeiro; dentro do dia, as fortes antes.
  return saida.sort((a, b) => b.data.localeCompare(a.data) || (a.severidade === 'forte' ? -1 : 1))
}
