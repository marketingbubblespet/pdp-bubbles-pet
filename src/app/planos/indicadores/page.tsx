// src/app/planos/indicadores/page.tsx
// Painel interno de indicadores de tráfego (B2B + B2C). Protegido pela senha do /planos
// (src/proxy.ts). Sem GTM: é painel interno, não página de anúncio.
import Image from 'next/image'
import { connection } from 'next/server'
import { getIndicadores, hojeSP } from '@/lib/planos/indicadores'
import { Cards } from '@/components/lp/indicadores/Cards'
import { MetaFaturamento } from '@/components/lp/indicadores/MetaFaturamento'
import { GraficoDiario } from '@/components/lp/indicadores/GraficoDiario'
import { TabelaDiaria } from '@/components/lp/indicadores/TabelaDiaria'
import { COR } from '@/components/lp/indicadores/cores'
import { Animacoes } from '@/components/lp/indicadores/Animacoes'
import { DetalhesAlerta } from '@/components/lp/indicadores/DetalhesAlerta'
import { ResumoDia } from '@/components/lp/indicadores/ResumoDia'

export const metadata = {
  title: 'Indicadores · Mídia paga',
  robots: { index: false, follow: false },
}

// ISO -> "05/11 às 10:42" no horário de Brasília. Sem registro ainda, mostra "—".
function formatDataHora(iso: string | null): string {
  if (!iso) return '—'
  const p = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(new Date(iso))
  const v = (t: string) => p.find((x) => x.type === t)?.value ?? ''
  return `${v('day')}/${v('month')} às ${v('hour')}:${v('minute')}`
}

export default async function IndicadoresPage() {
  await connection() // renderiza a cada acesso: "hoje" precisa ser o dia real
  const dados = await getIndicadores()
  const hoje = hojeSP()

  return (
    <main className="min-h-screen bg-[#F7F7F7] px-4 py-10 overflow-x-clip">
      <Animacoes />
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        {/* Selo da campanha (lettering oficial da skill bubbles-criativos), compacto */}
        <div className="flex flex-col items-center gap-1.5 rounded-[20px] bg-gradient-to-b from-[#1a191a] to-[#0D0C0D] px-6 py-3 md:py-4">
          <Image src="/images/indicadores/logo-bubbles-branco.png" alt="Bubbles" width={449} height={107} priority className="h-auto w-[67px] md:w-[84px]" />
          <Image src="/images/indicadores/lettering-black-november.png" alt="Black November" width={519} height={164} priority className="h-auto w-[154px] md:w-[210px]" />
        </div>

        <header>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl md:text-3xl font-medium text-[#0D0C0D]">{dados.mes}</h1>
            <p className="text-sm text-[#666666]">
              Atualização manual feita: <span className="font-semibold text-[#0D0C0D]">{formatDataHora(dados.ultimaEdicaoManual)}</span>
            </p>
          </div>
          <p className="mt-1 text-sm text-[#666666]">
            Receita, faturamento, pedidos, ticket, sessões, conversão, investimento e clientes somam Groomer e Tutor (Care); ROAS, CPA e % de aprovação são do Groomer.
          </p>
        </header>

        <ResumoDia dados={dados} hoje={hoje} />
        <MetaFaturamento dados={dados} hoje={hoje} />
        <Cards dados={dados} />
        <TabelaDiaria dias={dados.dias} hoje={hoje} />
        <DetalhesAlerta dias={dados.dias} />

        <GraficoDiario titulo="Receita captada por dia" dias={dados.dias} hoje={hoje} formato="moeda"
          series={[{ rotulo: 'Groomer', campo: 'receitaB2B', cor: COR.b2b }, { rotulo: 'Tutor (Care)', campo: 'receitaB2C', cor: COR.b2c }]} />
        <GraficoDiario titulo="Pedidos por dia" dias={dados.dias} hoje={hoje} formato="inteiro"
          series={[{ rotulo: 'Groomer', campo: 'pedidosB2B', cor: COR.b2b }, { rotulo: 'Tutor (Care)', campo: 'pedidosB2C', cor: COR.b2c }]} />
        <GraficoDiario titulo="Investimento por dia" dias={dados.dias} hoje={hoje} formato="moeda"
          series={[{ rotulo: 'Meta · Groomer', campo: 'investMeta', cor: COR.meta }, { rotulo: 'Google · Groomer', campo: 'investGoogle', cor: COR.google }, { rotulo: 'Meta · Tutor (Care)', campo: 'investMetaB2C', cor: COR.b2c }]} />

        <aside role="note" className="flex gap-3 rounded-[12px] border-2 border-[#F4A522] bg-[#FFF8EB] p-4 md:p-5">
          <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4A522] text-sm font-semibold text-[#0D0C0D]">!</span>
          <div className="text-sm text-[#0D0C0D]">
            <p className="font-semibold">
              Ainda não há campanhas da{' '}
              <span className="rounded-[4px] bg-[#F4A522] px-1.5 py-0.5 uppercase tracking-wide">linha Care</span>{' '}
              dedicadas à Black November no ar.
            </p>
            <p className="mt-1 text-[#4A3A1A]">
              Quando estiverem rodando, os dados de publicidade passam a incluir também os da linha Care.
              Isso deve alterar bastante o ticket médio e o ROAS deste relatório.
            </p>
          </div>
        </aside>

        <footer className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 md:p-5 text-sm text-[#666666]">
          <p className="font-semibold text-[#0D0C0D]">De onde vêm os dados</p>
          <p className="mt-1">
            Planilha de acompanhamento diário da consultoria Diego Santana (abas NOV26, B2B e B2C).
            Sessões e investimento em Meta Ads e Google Ads entram automaticamente na planilha.
            Receita (faturamento) e pedidos são preenchidos manualmente todos os dias pelo Gabriel,
            a partir dos dados extraídos da Shopify.
          </p>
          <p className="mt-2">
            <span className="font-semibold text-[#0D0C0D]">Sobre a % de aprovação:</span> pagamentos por PIX e boleto levam até 3 dias
            para compensar. Por isso a aprovação dos últimos 3 dias tende a aparecer mais baixa e sobe sozinha conforme os pagamentos entram.
          </p>
        </footer>
      </div>
    </main>
  )
}
