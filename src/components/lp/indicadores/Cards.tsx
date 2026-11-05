// Cards do acumulado do mês (só dias preenchidos). Receita e Pedidos somam B2B + B2C
// (divisão no hover/toque); o resto é B2B, recalculado a partir dos dias.
import { formatMoney, formatOuTraco, formatPct, formatRoas } from '@/lib/planos/format'
import type { ReactNode } from 'react'
import { avaliar, metricas, METAS_B2B, type Indicadores } from '@/lib/planos/indicadores'
import { Detalhe } from './Detalhe'
import { SeloAlerta } from './Alerta'
import { InfoTip } from './InfoTip'
import { COR } from './cores'

const int = (v: number) => Math.round(v).toLocaleString('pt-BR')
const pct = (casas: number) => (v: number) => formatPct(v * 100, casas)

// Explicação em linguagem simples, para quem não é da área (ícone "i" ao lado do título).
const INFO = {
  receita: 'Soma do valor de todos os pedidos feitos no mês, antes de saber se foram pagos. Junta a loja Groomer (profissional) e a Tutor (Care).',
  pedidos: 'Quantidade de compras feitas no mês, somando Groomer e Tutor (Care).',
  sessoes: 'Quantas visitas o site recebeu no mês, somando Groomer e Tutor (Care). Uma pessoa que entra 2 vezes conta como 2 visitas. Passe o mouse para ver cada loja.',
  aprovacao: `De cada R$ 100 em pedidos do Groomer, quanto foi realmente pago (PIX, boleto ou cartão aprovado). Meta: ${formatPct(METAS_B2B.aprovacao * 100, 1)} ou mais.`,
  conversao: `De cada 100 visitas ao site, quantas viraram compra, somando Groomer e Tutor (Care). Passe o mouse para ver cada loja. Meta: ${formatPct(METAS_B2B.conversao * 100, 1)} ou mais.`,
  investimento: 'Quanto foi gasto em anúncios pagos no mês, somando Groomer e Tutor (Care): Meta Ads (Facebook e Instagram) e Google Ads. Passe o mouse para ver cada um. A Care ainda não tem Google Ads.',
  roas: `Retorno dos anúncios: para cada R$ 1 investido, quantos reais voltaram em vendas, somando Groomer e Tutor (Care). Passe o mouse para ver cada loja. Meta: ${formatRoas(METAS_B2B.roas)} ou mais.`,
  clientes: 'Clientes que compraram no mês: novos (primeira compra) e recorrentes (já tinham comprado antes), somando Groomer e Tutor (Care). Mostra se a Black está trazendo gente nova ou só antecipando a compra de quem já compraria.',
  ticket: `Valor médio de cada pedido (receita ÷ pedidos), somando Groomer e Tutor (Care). Passe o mouse para ver cada um. Meta: ${formatMoney(METAS_B2B.ticket)} ou mais.`,
}

function Card({ rotulo, valor, nota, alerta, dica, info, direita }: { rotulo: string; valor: string; nota?: string; alerta?: ReactNode; dica?: boolean; info?: string; direita?: boolean }) {
  return (
    <div className="h-full rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <p className="flex items-center text-xs font-semibold uppercase tracking-widest text-[#E8649A]">
        {rotulo}
        {info && <InfoTip titulo={rotulo} texto={info} alinhar={direita ? 'direita' : 'esquerda'} />}
      </p>
      <p className="mt-2 text-xl md:text-2xl font-semibold text-[#0D0C0D]">{valor}</p>
      {nota && <p className="mt-1 text-xs text-[#666666]">{nota}{dica && <span className="[@media(hover:hover)]:hidden"> · toque para ver</span>}</p>}
      {alerta}
    </div>
  )
}

export function Cards({ dados }: { dados: Indicadores }) {
  const m = metricas(dados.dias)
  const novos = m.novosB2B == null && m.novosB2C == null ? null : (m.novosB2B ?? 0) + (m.novosB2C ?? 0)
  const recorr = m.recorrentesB2B == null && m.recorrentesB2C == null ? null : (m.recorrentesB2B ?? 0) + (m.recorrentesB2C ?? 0)
  const fmtInt = (v: number | null) => formatOuTraco(v, int)
  // Aviso quando a taxa ainda não usa todos os dias com dado (falta algum número da conta).
  const ate = (d: string | null) =>
    d && m.ate.ultimoComDado && d < m.ate.ultimoComDado ? ` · considera até ${d.slice(8)}/${d.slice(5, 7)}` : ''

  return (
    <div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <Detalhe linhas={[
        { rotulo: 'Groomer', valor: formatMoney(m.receitaB2B), cor: COR.b2b },
        { rotulo: 'Tutor (Care)', valor: formatMoney(m.receitaB2C), cor: COR.b2c },
      ]}>
        <Card rotulo="Receita captada" valor={formatMoney(m.receita)} nota="Groomer & Tutor (Care)" dica info={INFO.receita} />
      </Detalhe>
      <Detalhe linhas={[
        { rotulo: 'Groomer', valor: int(m.pedidosB2B), cor: COR.b2b },
        { rotulo: 'Tutor (Care)', valor: int(m.pedidosB2C), cor: COR.b2c },
      ]}>
        <Card rotulo="Pedidos" valor={int(m.pedidos)} nota="Groomer & Tutor (Care)" dica info={INFO.pedidos} direita />
      </Detalhe>
      <Detalhe linhas={[
        { rotulo: 'Groomer', valor: formatOuTraco(m.ticketB2B, formatMoney), cor: COR.b2b },
        { rotulo: 'Tutor (Care)', valor: formatOuTraco(m.ticketB2C, formatMoney), cor: COR.b2c },
      ]}>
        <Card rotulo="Ticket médio" valor={formatOuTraco(m.ticket, formatMoney)} nota="Groomer & Tutor (Care)" dica info={INFO.ticket}
          alerta={<SeloAlerta nivel={avaliar('ticket', m.ticket)} meta={formatMoney(METAS_B2B.ticket)} />} />
      </Detalhe>
      <Detalhe linhas={[
        { rotulo: 'Groomer', valor: int(m.sessoesB2B), cor: COR.b2b },
        { rotulo: 'Tutor (Care)', valor: int(m.sessoesB2C), cor: COR.b2c },
      ]}>
        <Card rotulo="Sessões" valor={int(m.sessoes)} nota="Groomer & Tutor (Care)" dica info={INFO.sessoes} direita />
      </Detalhe>
      <Detalhe linhas={[
        { rotulo: 'Groomer', valor: formatOuTraco(m.conversaoB2B, pct(2)), cor: COR.b2b },
        { rotulo: 'Tutor (Care)', valor: formatOuTraco(m.conversaoB2C, pct(2)), cor: COR.b2c },
      ]}>
        <Card rotulo="Tx. de conversão" valor={formatOuTraco(m.conversao, pct(2))} nota={`Groomer & Tutor (Care)${ate(m.ate.conversao)}`} dica info={INFO.conversao}
          alerta={<SeloAlerta nivel={avaliar('conversao', m.conversao)} meta={pct(1)(METAS_B2B.conversao)} />} />
      </Detalhe>
      <Card rotulo="% Aprovação" valor={formatOuTraco(m.aprovacao, pct(2))} nota={`Groomer${ate(m.ate.aprovacao)}`} info={INFO.aprovacao} direita
        alerta={<SeloAlerta nivel={avaliar('aprovacao', m.aprovacao)} meta={pct(1)(METAS_B2B.aprovacao)} />} />
      <Detalhe linhas={[
        { rotulo: 'Meta Ads · Groomer', valor: formatMoney(m.investMeta), cor: COR.meta },
        { rotulo: 'Google Ads · Groomer', valor: formatMoney(m.investGoogle), cor: COR.google },
        { rotulo: 'Meta Ads · Tutor (Care)', valor: formatMoney(m.investMetaB2C), cor: COR.b2c },
        { rotulo: 'Google Ads · Tutor (Care)', valor: formatMoney(m.investGoogleB2C), cor: COR.google },
      ]}>
        <Card rotulo="Investimento" valor={formatMoney(m.investimento)} nota="Groomer & Tutor (Care)" dica info={INFO.investimento} />
      </Detalhe>
      <Detalhe linhas={[
        { rotulo: 'Groomer', valor: formatOuTraco(m.roasB2B, formatRoas), cor: COR.b2b },
        { rotulo: 'Tutor (Care)', valor: formatOuTraco(m.roasB2C, formatRoas), cor: COR.b2c },
      ]}>
        <Card rotulo="ROAS captado" valor={formatOuTraco(m.roas, formatRoas)} nota={`Groomer & Tutor (Care)${ate(m.ate.roas)}`} dica info={INFO.roas} direita
          alerta={<SeloAlerta nivel={avaliar('roas', m.roas)} meta={formatRoas(METAS_B2B.roas)} />} />
      </Detalhe>
      <Detalhe className="col-span-2 md:col-span-1" linhas={[
        { rotulo: 'Novos · Groomer', valor: fmtInt(m.novosB2B), cor: COR.b2b },
        { rotulo: 'Novos · Tutor (Care)', valor: fmtInt(m.novosB2C), cor: COR.b2c },
        { rotulo: 'Recorrentes · Groomer', valor: fmtInt(m.recorrentesB2B), cor: COR.b2b },
        { rotulo: 'Recorrentes · Tutor (Care)', valor: fmtInt(m.recorrentesB2C), cor: COR.b2c },
      ]}>
        <Card rotulo="Clientes" info={INFO.clientes}
          valor={novos == null && recorr == null ? '—' : `${fmtInt(novos)} novos · ${fmtInt(recorr)} recorr.`}
          nota={novos == null && recorr == null ? 'Aguardando preenchimento na planilha' : 'Groomer & Tutor (Care)'} dica={novos != null || recorr != null} />
      </Detalhe>
    </div>
    <p className="mt-2 text-xs text-[#666666]">
      Cada taxa usa todos os dias em que os dois números da conta já estão preenchidos. Alertas comparam com as metas da aba NOV26 (B2B).
    </p>
    </div>
  )
}
