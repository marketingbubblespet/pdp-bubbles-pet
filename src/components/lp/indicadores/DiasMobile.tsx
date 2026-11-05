// Visão do "Dia a dia" no celular: um card por dia, sem rolagem lateral.
// Mesmas regras da tabela: skeleton no que falta, bolinha de alerta, hoje destacado e
// os últimos dias sumindo (blur) para a seção não ficar longa.
import type { ReactNode } from 'react'
import { formatMoney, formatOuTraco, formatPct, formatRoas } from '@/lib/planos/format'
import { avaliar, preenchido, taxasDoDia, type Dia } from '@/lib/planos/indicadores'
import { PontoAlerta } from './Alerta'

const int = (v: number) => Math.round(v).toLocaleString('pt-BR')
const pct = (v: number) => formatPct(v * 100, 2)
const SUMINDO = [{ opacity: 0.45, blur: 1.5 }, { opacity: 0.15, blur: 3 }]

const Skeleton = () => <span className="ind-skeleton inline-block h-3 w-14 rounded-[4px]" aria-label="aguardando preenchimento" />

function Campo({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wide text-[#666666]">{rotulo}</p>
      <p className="mt-0.5 break-words text-[13px] text-[#0D0C0D]">{children}</p>
    </div>
  )
}

function CardDia({ d, hoje, estilo }: { d: Dia; hoje: string; estilo?: { opacity: number; blur: number } }) {
  const t = taxasDoDia(d)
  const ehHoje = d.data === hoje
  const temDado = preenchido(d)
  const aberto = d.data >= hoje || temDado
  const v = (conteudo: ReactNode, vazio: boolean) => (vazio && aberto ? <Skeleton /> : vazio ? '—' : conteudo)
  const al = (k: Parameters<typeof avaliar>[0], x: number | null) => <PontoAlerta nivel={avaliar(k, x)} />
  const divisao = (b: number | null, c: number | null, f: (n: number) => string) =>
    b == null && c == null ? null : <span className="block text-[10px] text-[#666666]">G {formatOuTraco(b, f)} · T {formatOuTraco(c, f)}</span>

  return (
    <li
      className={`border-b border-[#E5E7EB] px-4 py-3 last:border-0 ${ehHoje ? 'border-l-4 border-l-[#E8649A] bg-[#FDF2F4]' : ''}`}
      style={estilo ? { opacity: estilo.opacity, filter: `blur(${estilo.blur}px)` } : undefined}
      aria-hidden={estilo ? true : undefined}
    >
      <p className="flex items-baseline gap-2">
        <span className={temDado || ehHoje ? 'text-sm font-semibold text-[#0D0C0D]' : 'text-sm text-[#666666]'}>{d.data.slice(8)}/{d.data.slice(5, 7)}</span>
        {ehHoje && <span className="text-[9px] font-semibold uppercase tracking-wide text-[#E8649A]">preenchendo</span>}
      </p>
      <div className="mt-2 grid grid-cols-3 gap-x-3 gap-y-2">
        <Campo rotulo="Receita">{v(<>{formatOuTraco(t.receita, formatMoney)}{divisao(d.receitaB2B, d.receitaB2C, formatMoney)}</>, !temDado)}</Campo>
        <Campo rotulo="Pedidos">{v(<>{formatOuTraco(t.pedidos, int)}{divisao(d.pedidosB2B, d.pedidosB2C, int)}</>, !temDado)}</Campo>
        <Campo rotulo="Ticket">{v(<>{al('ticket', t.ticket)}{formatOuTraco(t.ticket, formatMoney)}</>, t.ticket == null)}</Campo>
        <Campo rotulo="Sessões">{v(<>{formatOuTraco(t.sessoes, int)}{divisao(d.sessoes, d.sessoesB2C, int)}</>, t.sessoes == null)}</Campo>
        <Campo rotulo="Tx. conv.">{v(<>{al('conversao', t.conversao)}{formatOuTraco(t.conversao, pct)}</>, t.conversao == null)}</Campo>
        <Campo rotulo="% Aprov.">{v(<>{al('aprovacao', t.aprovacao)}{formatOuTraco(t.aprovacao, pct)}</>, t.aprovacao == null)}</Campo>
        <Campo rotulo="Invest.">{v(<>{formatOuTraco(t.investParcial, formatMoney)}<span className="block text-[10px] text-[#666666]">Meta {formatOuTraco(t.investMeta, formatMoney)} · Google {formatOuTraco(t.investGoogle, formatMoney)}</span></>, t.investParcial == null)}</Campo>
        <Campo rotulo="CPA">{v(formatOuTraco(t.cpa, formatMoney), t.cpa == null)}</Campo>
        <Campo rotulo="ROAS">{v(<>{al('roas', t.roas)}{formatOuTraco(t.roas, formatRoas)}</>, t.roas == null)}</Campo>
      </div>
    </li>
  )
}

export function DiasMobile({ visiveis, sumindo, hoje }: { visiveis: Dia[]; sumindo: Dia[]; hoje: string }) {
  return (
    <ul className="mt-3">
      {visiveis.map((d) => <CardDia key={d.data} d={d} hoje={hoje} />)}
      {sumindo.map((d, i) => <CardDia key={d.data} d={d} hoje={hoje} estilo={SUMINDO[i]} />)}
    </ul>
  )
}
