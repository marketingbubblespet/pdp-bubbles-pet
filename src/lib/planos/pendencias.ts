// src/lib/planos/pendencias.ts
// Lista o que ainda falta na planilha (dias já passados), para o balão amarelo do painel.
// Manual = preenchido pelo Gabriel a partir da Shopify. Automático = Adveronix (importa às 10h30).
import type { Dia } from './indicadores'

type Loja = 'Groomer' | 'Tutor (Care)'
type Campo = { chave: Exclude<keyof Dia, 'data'>; nome: string; loja: Loja; manual: boolean }

const CAMPOS: Campo[] = [
  { chave: 'receitaB2B', nome: 'Receita captada', loja: 'Groomer', manual: true },
  { chave: 'faturadaB2B', nome: 'Receita faturada', loja: 'Groomer', manual: true },
  { chave: 'pedidosB2B', nome: 'Pedidos', loja: 'Groomer', manual: true },
  { chave: 'receitaB2C', nome: 'Receita captada', loja: 'Tutor (Care)', manual: true },
  { chave: 'faturadaB2C', nome: 'Receita faturada', loja: 'Tutor (Care)', manual: true },
  { chave: 'pedidosB2C', nome: 'Pedidos', loja: 'Tutor (Care)', manual: true },
  { chave: 'sessoes', nome: 'Sessões', loja: 'Groomer', manual: false },
  { chave: 'investMeta', nome: 'Investimento Meta', loja: 'Groomer', manual: false },
  { chave: 'investGoogle', nome: 'Investimento Google', loja: 'Groomer', manual: false },
  { chave: 'sessoesB2C', nome: 'Sessões', loja: 'Tutor (Care)', manual: false },
  { chave: 'investMetaB2C', nome: 'Investimento Meta', loja: 'Tutor (Care)', manual: false },
]

export type PendenciaDia = { data: string; manuais: string[]; automaticos: string[] }

// Só dias que já passaram (até ontem). Hoje ainda não fechou, então não é pendência.
export function listarPendencias(dias: Dia[], hoje: string): PendenciaDia[] {
  return dias
    .filter((d) => d.data < hoje)
    .map((d) => {
      const falta = CAMPOS.filter((c) => d[c.chave] == null)
      const texto = (c: Campo) => `${c.loja}: ${c.nome}`
      return {
        data: d.data,
        manuais: falta.filter((c) => c.manual).map(texto),
        automaticos: falta.filter((c) => !c.manual).map(texto),
      }
    })
    .filter((p) => p.manuais.length + p.automaticos.length > 0)
    .reverse() // mais recentes primeiro
}
