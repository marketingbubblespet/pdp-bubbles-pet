import { TriangleAlert } from 'lucide-react'
import type { Metricas } from '@/lib/planos/types'
import { formatMoney, formatRoas, formatOuTraco } from '@/lib/planos/format'

interface Linha {
  rotulo: string
  valor: string
  variacao: string | null
  destaque?: boolean
  aviso?: string
}

function formatVariacao(varPct: number | null): string | null {
  if (varPct == null) return null
  const seta = varPct >= 0 ? '▲' : '▼'
  return `${seta} ${Math.abs(varPct).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}

function metaTexto(meta: number | null, formatador: (v: number) => string): string {
  return meta == null ? '' : ` · meta ${formatador(meta)}`
}

// Ordem fixa da régua de decisão da casa — não reordenável.
function montarLinhas(m: Metricas): Linha[] {
  return [
    {
      rotulo: 'Investimento',
      valor: formatOuTraco(m.investimento.valor, formatMoney) + metaTexto(m.investimento.meta, formatMoney),
      variacao: formatVariacao(m.investimento.var_pct),
    },
    {
      rotulo: 'Vendas',
      valor: formatOuTraco(m.vendas.valor, (v) => String(v)),
      variacao: formatVariacao(m.vendas.var_pct),
      destaque: true,
    },
    {
      rotulo: 'Ticket médio',
      valor: formatOuTraco(m.ticket_medio.valor, formatMoney),
      variacao: formatVariacao(m.ticket_medio.var_pct),
    },
    {
      rotulo: 'ROAS LC',
      valor: formatOuTraco(m.roas_lc.valor, formatRoas) + metaTexto(m.roas_lc.meta, formatRoas),
      variacao: formatVariacao(m.roas_lc.var_pct),
      destaque: true,
    },
    {
      rotulo: 'ROAS FC',
      valor: formatOuTraco(m.roas_fc.valor, formatRoas),
      variacao: formatVariacao(m.roas_fc.var_pct),
    },
    {
      rotulo: 'ROAS ASSIST',
      valor: formatOuTraco(m.roas_assist.valor, formatRoas),
      variacao: formatVariacao(m.roas_assist.var_pct),
      aviso: 'ASSIST multiplica: uma venda tocada por 3 anúncios credita os 3 inteiros. Não é comparável com a meta.',
    },
    {
      rotulo: 'CTR',
      valor: m.ctr.valor == null ? '—' : `${m.ctr.valor.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%` + metaTexto(m.ctr.meta, (v) => `${v}%`),
      variacao: formatVariacao(m.ctr.var_pct),
    },
    {
      rotulo: 'Impressões',
      valor: formatOuTraco(m.impressoes.valor, (v) => v.toLocaleString('pt-BR')),
      variacao: formatVariacao(m.impressoes.var_pct),
    },
    {
      rotulo: 'Sessões',
      valor: formatOuTraco(m.sessoes.valor, (v) => v.toLocaleString('pt-BR')),
      variacao: formatVariacao(m.sessoes.var_pct),
    },
    {
      rotulo: 'ConnectRate',
      valor: m.connect_rate.valor == null ? '—' : `${(m.connect_rate.valor * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`,
      variacao: formatVariacao(m.connect_rate.var_pct),
    },
  ]
}

// Tabela no desktop, lista de pares rótulo/valor no mobile — nunca rolagem horizontal.
export function MetricasTable({ metricas }: { metricas: Metricas }) {
  const linhas = montarLinhas(metricas)

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Desktop: tabela de verdade */}
      <table className="hidden sm:table w-full text-sm">
        <tbody>
          {linhas.map((l) => (
            <tr key={l.rotulo} className="border-b border-gray-100 last:border-0">
              <th scope="row" className="text-left font-medium text-gray-500 px-4 py-2.5 w-[38%]">
                <span className="inline-flex items-center gap-1">
                  {l.rotulo}
                  {l.aviso && <TriangleAlert size={12} className="text-amber-500" aria-label={l.aviso} />}
                </span>
              </th>
              <td className={`px-4 py-2.5 text-right ${l.destaque ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                {l.valor}
                {l.variacao && <span className="ml-2 text-xs text-gray-500">{l.variacao}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: pares rótulo/valor empilhados */}
      <dl className="sm:hidden divide-y divide-gray-100">
        {linhas.map((l) => (
          <div key={l.rotulo} className="flex items-center justify-between px-4 py-2.5 gap-3">
            <dt className="text-sm text-gray-500">{l.rotulo}</dt>
            <dd className={`text-sm text-right ${l.destaque ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
              {l.valor}
              {l.variacao && <span className="ml-2 text-xs text-gray-500">{l.variacao}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
