// src/lib/relatorio-distribuidor/format.ts
// Formatação pt-BR e a seta de variação (▲ ▼) contra o mês anterior.
import type { MesRef } from './tipos'

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

export function nomeMes(ref: MesRef): string {
  return MESES[ref.mes - 1]
}

export function rotuloMes(ref: MesRef): string {
  return `${nomeMes(ref)} de ${ref.ano}`
}

// Mês imediatamente anterior (usado no aviso "não há dados referentes a julho").
export function mesAnteriorDe(ref: MesRef): MesRef {
  return ref.mes === 1 ? { ano: ref.ano - 1, mes: 12 } : { ano: ref.ano, mes: ref.mes - 1 }
}

export function esc(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const nfInt = new Intl.NumberFormat('pt-BR')
const nfMoeda = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function fmtInt(n: number): string {
  return nfInt.format(Math.round(n))
}

export function fmtBRL(n: number): string {
  return `R$ ${nfMoeda.format(n)}`
}

export function fmtPct(n: number, casas = 2): string {
  return `${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(n)}%`
}

// Divisão segura: sem numerador/denominador ou com denominador zero, não há valor.
export function razao(a: number | null | undefined, b: number | null | undefined): number | null {
  if (a == null || b == null || b === 0) return null
  return a / b
}

// 'maior' = subir é bom (leads), 'menor' = cair é bom (CPL), 'neutro' = nem bom nem ruim
// (investimento), só informa a direção.
export type Sentido = 'maior' | 'menor' | 'neutro'

// Badge ▲/▼ com a variação percentual. Sem valor atual ou anterior, não mostra nada: o aviso
// de "sem comparativo" é dado uma vez só, no topo, em vez de repetir em cada número.
export function seta(atual: number | null, anterior: number | null | undefined, sentido: Sentido): string {
  if (atual == null || anterior == null || anterior === 0) return ''
  const pct = ((atual - anterior) / Math.abs(anterior)) * 100
  if (Math.abs(pct) < 0.05) return '<span class="var var-neutro">= 0,0%</span>'
  const subiu = pct > 0
  const classe = sentido === 'neutro' ? 'var-neutro' : subiu === (sentido === 'maior') ? 'var-bom' : 'var-ruim'
  const texto = fmtPct(Math.abs(pct), 1)
  const leitura = subiu ? 'subiu' : 'caiu'
  return `<span class="var ${classe}" aria-label="${leitura} ${texto}">${subiu ? '▲' : '▼'} ${texto}</span>`
}
