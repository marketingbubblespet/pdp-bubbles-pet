// src/lib/planos/indicadores.ts
// Painel de indicadores (aba NOV26 das planilhas "Acompanhamento Diário" B2B e B2C).
// Regra combinada: Receita, faturado, pedidos e clientes somam B2B + B2C; as taxas vêm da B2B.
// Totais do mês são SEMPRE recalculados a partir dos dias preenchidos (nunca da linha TOTAL
// da planilha, que já veio errada uma vez por célula digitada como texto).
//
// PROVISÓRIO: dados de exemplo para validar o visual no localhost. Dias 01 e 02 vieram da
// planilha; 03 e 04 do CSV atualizado (sem dado fictício). Na conexão,
// `getIndicadores()` passa a buscar do Apps Script e este bloco é apagado.

export type Dia = {
  data: string // AAAA-MM-DD
  receitaB2B: number | null // captada
  receitaB2C: number | null // captada
  faturadaB2B: number | null
  faturadaB2C: number | null
  pedidosB2B: number | null
  pedidosB2C: number | null
  sessoes: number | null // Groomer
  sessoesB2C: number | null
  investMeta: number | null // Groomer
  investGoogle: number | null // Groomer
  investMetaB2C: number | null
  investGoogleB2C: number | null
  novosB2B: number | null
  novosB2C: number | null
  recorrentesB2B: number | null
  recorrentesB2C: number | null
}

export type Indicadores = {
  mes: string
  // Data/hora (ISO) da última edição manual na planilha, registrada pelo Apps Script.
  ultimaEdicaoManual: string | null
  metaFaturamento: number // meta do mês, faturado Groomer + Tutor
  dias: Dia[]
}

const exemplo: Record<string, Partial<Dia>> = {
  '2026-11-01': { receitaB2B: 15959.09, receitaB2C: 285.5, faturadaB2B: 15666.12, faturadaB2C: 263.77, pedidosB2B: 22, pedidosB2C: 3, sessoes: 2167, investMeta: 1098.39, investGoogle: 395.45, sessoesB2C: 244, investMetaB2C: 762.24, investGoogleB2C: 0 },
  '2026-11-02': { receitaB2B: 6922.53, receitaB2C: 1457, faturadaB2B: 6729.36, faturadaB2C: 1334.82, pedidosB2B: 16, pedidosB2C: 10, sessoes: 872, investMeta: 900.81, investGoogle: 464.2, sessoesB2C: 240, investMetaB2C: 870.75, investGoogleB2C: 0 },
  // 03 e 04: CSVs da aba NOV26 exportados em 05/11 às 11:35 (B2C e Meta Ads ainda vazios)
  '2026-11-03': { receitaB2B: 17527.4, faturadaB2B: 16719.93, pedidosB2B: 31, sessoes: 977, investGoogle: 542.41, sessoesB2C: 208, investMetaB2C: 754.99, investGoogleB2C: 0 },
  '2026-11-04': { receitaB2B: 15100.19, faturadaB2B: 14048.87, pedidosB2B: 19, sessoesB2C: 200, investMetaB2C: 882.05, investGoogleB2C: 0 },
}

const VAZIO: Omit<Dia, 'data'> = {
  receitaB2B: null, receitaB2C: null, faturadaB2B: null, faturadaB2C: null, pedidosB2B: null,
  pedidosB2C: null, sessoes: null, sessoesB2C: null, investMeta: null, investGoogle: null,
  investMetaB2C: null, investGoogleB2C: null,
  novosB2B: null, novosB2C: null, recorrentesB2B: null, recorrentesB2C: null,
}

function diasDoMes(ano: number, mes: number): string[] {
  const total = new Date(ano, mes, 0).getDate()
  return Array.from({ length: total }, (_, i) =>
    `${ano}-${String(mes).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
  )
}

export async function getIndicadores(): Promise<Indicadores> {
  return {
    mes: 'Novembro 2026',
    ultimaEdicaoManual: '2026-11-05T10:42:00-03:00', // exemplo
    metaFaturamento: 560000,
    dias: diasDoMes(2026, 11).map((data) => ({ data, ...VAZIO, ...exemplo[data] })),
  }
}

// ---------- Cálculos (valem para um dia ou para o mês inteiro) ----------

type CampoNum = Exclude<keyof Dia, 'data'>
export const somar = (dias: Dia[], campo: CampoNum) => dias.reduce((acc, d) => acc + (d[campo] ?? 0), 0)
const div = (a: number, b: number) => (b > 0 ? a / b : null)
const somaOuNull = (a: number | null, b: number | null) => (a == null && b == null ? null : (a ?? 0) + (b ?? 0))

export const preenchido = (d: Dia) => d.receitaB2B != null || d.pedidosB2B != null

// Taxas de UM dia: cada uma aparece assim que os números que ela usa estão preenchidos
// (mesmas fórmulas da planilha: N, AA, AN, Y; CPA = investimento ÷ pedidos).
export function taxasDoDia(d: Dia) {
  const d1 = (a: number | null, b: number | null) => (a != null && b != null && b > 0 ? a / b : null)
  const invest = d.investMeta != null && d.investGoogle != null ? d.investMeta + d.investGoogle : null
  const receita = somaOuNull(d.receitaB2B, d.receitaB2C)
  const pedidos = somaOuNull(d.pedidosB2B, d.pedidosB2C)
  const investMeta = somaOuNull(d.investMeta, d.investMetaB2C)
  const investGoogle = somaOuNull(d.investGoogle, d.investGoogleB2C)
  // Conversão global só quando pedidos e sessões das DUAS lojas estão preenchidos.
  const convOk = [d.pedidosB2B, d.sessoes, d.pedidosB2C, d.sessoesB2C].every((x) => x != null)
  return {
    receita,
    pedidos,
    sessoes: somaOuNull(d.sessoes, d.sessoesB2C),
    investMeta,
    investGoogle,
    investParcial: somaOuNull(investMeta, investGoogle), // Groomer + Tutor
    aprovacao: d1(d.faturadaB2B, d.receitaB2B),
    conversao: convOk ? d1(pedidos, somaOuNull(d.sessoes, d.sessoesB2C)) : null,
    roas: d1(d.receitaB2B, invest),
    ticket: d1(receita, pedidos), // global: Groomer + Tutor

    cpa: d1(invest, d.pedidosB2B),
  }
}

export function metricas(dias: Dia[]) {
  const ok = dias.filter(preenchido)
  const rB = somar(ok, 'receitaB2B'), rC = somar(ok, 'receitaB2C')
  const pB = somar(ok, 'pedidosB2B'), pC = somar(ok, 'pedidosB2C')
  const meta = somar(dias, 'investMeta'), google = somar(dias, 'investGoogle')
  const metaC = somar(dias, 'investMetaB2C'), googleC = somar(dias, 'investGoogleB2C')
  // Cada taxa usa todos os dias em que os DOIS lados da conta estão preenchidos
  // (nunca mistura pedidos de um dia sem as sessões dele).
  const com = (...c: CampoNum[]) => dias.filter((d) => c.every((k) => d[k] != null))
  const dAprov = com('faturadaB2B', 'receitaB2B')
  const dConv = com('pedidosB2B', 'sessoes', 'pedidosB2C', 'sessoesB2C')
  const dConvB = com('pedidosB2B', 'sessoes')
  const dConvC = com('pedidosB2C', 'sessoesB2C')
  const dRoas = com('receitaB2B', 'investMeta', 'investGoogle')
  const dTicket = com('receitaB2B', 'pedidosB2B')
  const clientes = (c: CampoNum[]) => (dias.some((d) => c.some((k) => d[k] != null)) ? c.reduce((a, k) => a + somar(dias, k), 0) : null)
  return {
    receitaB2B: rB, receitaB2C: rC, receita: rB + rC,
    pedidosB2B: pB, pedidosB2C: pC, pedidos: pB + pC,
    sessoesB2B: somar(dias, 'sessoes'), sessoesB2C: somar(dias, 'sessoesB2C'),
    sessoes: somar(dias, 'sessoes') + somar(dias, 'sessoesB2C'),
    investMeta: meta, investGoogle: google, investMetaB2C: metaC, investGoogleB2C: googleC,
    investimentoB2B: meta + google, investimentoB2C: metaC + googleC,
    investimento: meta + google + metaC + googleC, // Groomer + Tutor
    aprovacao: div(somar(dAprov, 'faturadaB2B'), somar(dAprov, 'receitaB2B')), // N
    // AA: pedidos ÷ sessões, global (Groomer + Tutor) e de cada loja para o hover
    conversao: div(somar(dConv, 'pedidosB2B') + somar(dConv, 'pedidosB2C'), somar(dConv, 'sessoes') + somar(dConv, 'sessoesB2C')),
    conversaoB2B: div(somar(dConvB, 'pedidosB2B'), somar(dConvB, 'sessoes')),
    conversaoB2C: div(somar(dConvC, 'pedidosB2C'), somar(dConvC, 'sessoesB2C')),
    roas: div(somar(dRoas, 'receitaB2B'), somar(dRoas, 'investMeta') + somar(dRoas, 'investGoogle')), // AN
    // Ticket global (Groomer + Tutor), com a divisão de cada um para o hover do card.
    ticket: div(rB + rC, pB + pC),
    ticketB2B: div(somar(dTicket, 'receitaB2B'), somar(dTicket, 'pedidosB2B')), // Y
    ticketB2C: div(rC, pC),
    novosB2B: clientes(['novosB2B']), novosB2C: clientes(['novosB2C']),
    recorrentesB2B: clientes(['recorrentesB2B']), recorrentesB2C: clientes(['recorrentesB2C']),
  }
}

// ---------- Alertas ----------
// Referência: as metas da própria planilha B2B (linha 3, "Meta"). Na conexão, passam a vir da
// planilha; aqui ficam fixas só para o exemplo.
export const METAS_B2B = { aprovacao: 0.9333, conversao: 0.028, roas: 12, ticket: 350 }
export type Nivel = 'alvo' | 'abaixo' | 'muito-abaixo'

// Todos são "quanto maior, melhor". No alvo: ≥ 100% da meta. Abaixo: 85% a 99%.
// Muito abaixo: < 85%. A % de aprovação é mais rígida (perder 15 pontos é muito), então
// usa faixa menor: abaixo até 5 pontos percentuais da meta.
export function avaliar(indicador: keyof typeof METAS_B2B, valor: number | null): Nivel | null {
  if (valor == null) return null
  const meta = METAS_B2B[indicador]
  if (valor >= meta) return 'alvo'
  if (indicador === 'aprovacao') return valor >= meta - 0.05 ? 'abaixo' : 'muito-abaixo'
  return valor / meta >= 0.85 ? 'abaixo' : 'muito-abaixo'
}

// ---------- Meta de faturamento ----------
// Curva da Black November: dias de pico pesam mais na meta. Peso 1 = dia comum.
// 11/11 (11.11) e de 27/11 em diante (Black Friday e Cyber Monday) carregam mais expectativa.
// Ajustar aqui se o planejamento mudar.
export const PESO_DIA: Record<number, number> = { 10: 1.3, 11: 2.5, 12: 1.3, 27: 3, 28: 2.5, 29: 2, 30: 2.5 }
const peso = (data: string) => PESO_DIA[Number(data.slice(8))] ?? 1

export function metaDoDia(dados: Indicadores, data: string): number {
  const total = dados.dias.reduce((a, d) => a + peso(d.data), 0)
  return (dados.metaFaturamento * peso(data)) / total
}

export const faturadoDoDia = (d: Dia) => somaOuNull(d.faturadaB2B, d.faturadaB2C)

// Esperado = soma da meta de cada dia já fechado (até ontem), seguindo a curva acima.
// Compara com o faturado Groomer + Tutor. Projeção = mesmo ritmo aplicado ao mês inteiro.
export function ritmoMeta(dados: Indicadores, hoje: string) {
  const fechados = dados.dias.filter((d) => d.data < hoje)
  const esperado = fechados.reduce((a, d) => a + metaDoDia(dados, d.data), 0)
  const faturado = somar(dados.dias, 'faturadaB2B') + somar(dados.dias, 'faturadaB2C')
  const ritmo = esperado > 0 ? faturado / esperado : null
  const status = ritmo == null ? 'inicio' : ritmo >= 1 ? 'dentro' : ritmo >= 0.9 ? 'atencao' : 'fora'
  return {
    faturado, esperado, diasFechados: fechados.length, diferenca: faturado - esperado,
    meta: dados.metaFaturamento, ritmo, status, projecao: ritmo == null ? null : ritmo * dados.metaFaturamento,
  } as const
}

export function hojeSP(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date())
}
