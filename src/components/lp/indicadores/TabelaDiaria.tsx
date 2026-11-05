// Tabela dia a dia. Receita e Pedidos somados (divisão no hover/toque); demais colunas B2B.
// Mostra os dias até hoje, hoje ("preenchendo") e os 2 seguintes; depois mais 3 linhas
// que vão sumindo (blur + transparência) para a página não ficar extensa.
// Células ainda sem dado (hoje e futuro) viram um skeleton animado.
import type { ReactNode } from 'react'
import { formatMoney, formatMoneyNumber, formatOuTraco, formatPct, formatRoas } from '@/lib/planos/format'
import { avaliar, METAS_B2B, preenchido, taxasDoDia, type Dia } from '@/lib/planos/indicadores'
import { DiasMobile } from './DiasMobile'
import { Detalhe } from './Detalhe'
import { PontoAlerta } from './Alerta'
import { InfoTip } from './InfoTip'
import { COR } from './cores'

const int = (v: number) => Math.round(v).toLocaleString('pt-BR')
const pct = (v: number) => formatPct(v * 100, 2)
const FAIXAS = 'No alvo: igual ou acima da meta. Abaixo: de 85% a 99% da meta. Muito abaixo: menos de 85%.'

// Cabeçalho com explicação de cada coluna (ícone "i"). Metas vêm da aba NOV26 (B2B).
const COLUNAS: { nome: string; info?: string }[] = [
  { nome: 'Dia' },
  { nome: 'Receita', info: 'Receita captada do dia (pedidos feitos, antes de aprovação), somando Groomer e Tutor (Care). Passe o mouse no valor para ver a divisão. Preenchida manualmente a partir da Shopify.' },
  { nome: 'Pedidos', info: 'Pedidos captados no dia, somando Groomer e Tutor (Care). Passe o mouse no valor para ver a divisão. Preenchido manualmente a partir da Shopify.' },
  { nome: 'Sessões', info: 'Visitas ao site no dia, somando Groomer e Tutor (Care), pagas e orgânicas. Passe o mouse no valor para ver cada loja. Entra automaticamente na planilha à meia-noite.' },
  { nome: '% Aprov.', info: `Receita faturada ÷ receita captada (Groomer e Tutor). Mostra quanto dos pedidos foi aprovado/pago. Meta: ${formatPct(METAS_B2B.aprovacao * 100, 1)} ou mais. Abaixo: até 5 pontos da meta. Muito abaixo: mais que isso.` },
  { nome: 'Tx. conv.', info: `Pedidos ÷ sessões, somando Groomer e Tutor (Care). Só aparece quando as duas lojas já têm pedidos e sessões do dia. De cada 100 visitas, quantas viram pedido. Meta: ${formatPct(METAS_B2B.conversao * 100, 1)} ou mais. ${FAIXAS}` },
  { nome: 'Invest.', info: 'Investimento total em mídia paga no dia (Meta Ads + Google Ads), somando Groomer e Tutor (Care).' },
  { nome: 'Meta', info: 'Investimento em Meta Ads (Facebook e Instagram) no dia, Groomer + Tutor (Care). Coluna AT das duas planilhas.' },
  { nome: 'Google', info: 'Investimento em Google Ads no dia, Groomer + Tutor (Care). Coluna BH das duas planilhas. A Care ainda não tem Google Ads.' },
  { nome: 'CPA', info: 'Custo por pedido: investimento em anúncios ÷ pedidos (Groomer). Quanto custou, em mídia, cada venda do dia. Quanto menor, melhor. Referência da planilha: R$ 74,29.' },
  { nome: 'ROAS', info: `Receita captada ÷ investimento (Groomer). Quantos reais voltam para cada R$ 1 investido. Meta: ${formatRoas(METAS_B2B.roas)} ou mais. ${FAIXAS}` },
  { nome: 'Ticket', info: `Receita captada ÷ pedidos, somando Groomer e Tutor (Care). Valor médio de cada pedido. Meta: ${formatMoney(METAS_B2B.ticket)} ou mais. ${FAIXAS}` },
]
const DEPOIS_DE_HOJE = 1
const SUMINDO = [{ opacity: 0.45, blur: 1.5 }, { opacity: 0.15, blur: 3 }]

// Brilho correndo da esquerda pra direita (keyframes em Animacoes.tsx).
const Skeleton = () => (
  <span className="ind-skeleton inline-block h-3 w-10 md:w-16 rounded-[4px]" aria-label="aguardando preenchimento" />
)

// Valores em reais sem o "R$" (o cabeçalho avisa): economiza espaço para caber tudo sem rolagem.
const reais = (v: number) => formatMoneyNumber(v)

function Linha({ d, hoje, estilo }: { d: Dia; hoje: string; estilo?: { opacity: number; blur: number } }) {
  const t = taxasDoDia(d)
  const ehHoje = d.data === hoje
  const temDado = preenchido(d)
  // Skeleton no que falta: hoje, futuro e dias passados já começados mas ainda incompletos.
  const aberto = d.data >= hoje || temDado
  const cel = (conteudo: ReactNode, vazio: boolean) => (vazio && aberto ? <Skeleton /> : vazio ? '—' : conteudo)
  const al = (k: Parameters<typeof avaliar>[0], x: number | null) => <PontoAlerta nivel={avaliar(k, x)} />
  const td = 'px-1.5 md:px-2 py-2 whitespace-nowrap'

  return (
    <tr
      className={`border-b border-[#E5E7EB] last:border-0 text-[#0D0C0D] ${ehHoje ? 'bg-[#FDF2F4]' : ''}`}
      style={estilo ? { opacity: estilo.opacity, filter: `blur(${estilo.blur}px)` } : undefined}
      aria-hidden={estilo ? true : undefined}
    >
      <td className={`${td} pl-3 md:pl-5 ${ehHoje ? 'border-l-4 border-[#E8649A]' : ''}`}>
        <span className={temDado || ehHoje ? 'font-semibold text-[#0D0C0D]' : 'text-[#666666]'}>{d.data.slice(8)}/{d.data.slice(5, 7)}</span>
        {ehHoje && <span className="block text-[9px] font-semibold uppercase tracking-wide leading-3 text-[#E8649A]">preenchendo</span>}
      </td>
      <td className={td}>
        {cel(
          <Detalhe linhas={[
            { rotulo: 'Groomer', valor: formatOuTraco(d.receitaB2B, formatMoney), cor: COR.b2b },
            { rotulo: 'Tutor (Care)', valor: formatOuTraco(d.receitaB2C, formatMoney), cor: COR.b2c },
          ]}>
            <span className="underline decoration-dotted underline-offset-4">{formatOuTraco(t.receita, reais)}</span>
          </Detalhe>, !temDado)}
      </td>
      <td className={td}>
        {cel(
          <Detalhe linhas={[
            { rotulo: 'Groomer', valor: formatOuTraco(d.pedidosB2B, int), cor: COR.b2b },
            { rotulo: 'Tutor (Care)', valor: formatOuTraco(d.pedidosB2C, int), cor: COR.b2c },
          ]}>
            <span className="underline decoration-dotted underline-offset-4">{formatOuTraco(t.pedidos, int)}</span>
          </Detalhe>, !temDado)}
      </td>
      <td className={td}>
        {cel(
          <Detalhe linhas={[
            { rotulo: 'Groomer', valor: formatOuTraco(d.sessoes, int), cor: COR.b2b },
            { rotulo: 'Tutor (Care)', valor: formatOuTraco(d.sessoesB2C, int), cor: COR.b2c },
          ]}>
            <span className="underline decoration-dotted underline-offset-4">{formatOuTraco(t.sessoes, int)}</span>
          </Detalhe>, t.sessoes == null)}
      </td>
      <td className={td}>{cel(<>{al('aprovacao', t.aprovacao)}{formatOuTraco(t.aprovacao, pct)}</>, t.aprovacao == null)}</td>
      <td className={td}>{cel(<>{al('conversao', t.conversao)}{formatOuTraco(t.conversao, pct)}</>, t.conversao == null)}</td>
      <td className={td}>{cel(formatOuTraco(t.investParcial, reais), t.investParcial == null)}</td>
      <td className={td}>{cel(formatOuTraco(t.investMeta, reais), t.investMeta == null)}</td>
      <td className={td}>{cel(formatOuTraco(t.investGoogle, reais), t.investGoogle == null)}</td>
      <td className={td}>{cel(formatOuTraco(t.cpa, reais), t.cpa == null)}</td>
      <td className={td}>{cel(<>{al('roas', t.roas)}{formatOuTraco(t.roas, formatRoas)}</>, t.roas == null)}</td>
      <td className={td}>{cel(<>{al('ticket', t.ticket)}{formatOuTraco(t.ticket, reais)}</>, t.ticket == null)}</td>
    </tr>
  )
}

export function TabelaDiaria({ dias, hoje }: { dias: Dia[]; hoje: string }) {
  const iHoje = dias.findIndex((d) => d.data === hoje)
  // Mês já fechado (ou ainda não começou): mostra tudo, sem efeito de sumir.
  const corte = iHoje < 0 ? dias.length : iHoje + DEPOIS_DE_HOJE + 1
  const visiveis = dias.slice(0, corte)
  const sumindo = dias.slice(corte, corte + SUMINDO.length)

  return (
    <section className="rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 pt-4 md:px-6 md:pt-6">
        <h2 className="text-base md:text-lg font-medium text-[#0D0C0D]">Dia a dia</h2>
        <p className="hidden md:block text-xs text-[#666666]">Valores em R$</p>
      </div>
      {/* Celular: um card por dia */}
      <div className="md:hidden">
        <DiasMobile visiveis={visiveis} sumindo={sumindo} hoje={hoje} />
      </div>
      {/* Computador: tabela */}
      <div className="hidden md:block overflow-x-auto pt-16 -mt-12">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] text-left text-xs uppercase tracking-wide text-[#666666]">
              {COLUNAS.map((c, i) => (
                <th key={c.nome} className="px-1.5 md:px-2 py-2 font-medium whitespace-nowrap first:pl-3 md:first:pl-5">
                  {c.nome}
                  {c.info && <InfoTip titulo={c.nome} texto={c.info} alinhar={i <= 2 ? 'esquerda' : i >= COLUNAS.length - 3 ? 'direita' : 'centro'} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visiveis.map((d) => <Linha key={d.data} d={d} hoje={hoje} />)}
            {sumindo.map((d, i) => <Linha key={d.data} d={d} hoje={hoje} estilo={SUMINDO[i]} />)}
          </tbody>
        </table>
      </div>
    </section>
  )
}
