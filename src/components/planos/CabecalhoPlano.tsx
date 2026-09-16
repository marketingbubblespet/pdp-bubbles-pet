import { AlertTriangle, Ban } from 'lucide-react'
import type { PlanoFrontmatter, Selo } from '@/lib/planos/types'
import { formatMoney, formatDateBR, formatOuTraco } from '@/lib/planos/format'

const SELO_CONFIG: Record<Selo, { texto: string; className: string }> = {
  completa: { texto: 'Análise completa', className: 'bg-[#3DB85C] text-white' },
  quase: { texto: 'Análise completa, com nota', className: 'bg-amber-500 text-white' },
  parcial: { texto: 'Análise parcial', className: 'bg-orange-500 text-white' },
  bloqueada: { texto: 'Análise bloqueada · não decidir por esta página', className: 'bg-red-600 text-white' },
}

function SeloCompletude({ plano }: { plano: PlanoFrontmatter }) {
  const { completude } = plano
  const config = SELO_CONFIG[completude.selo]
  const colunasNaoVazias = completude.colunas_faltando.filter((c) => c)

  return (
    <div className={`rounded-[12px] px-4 py-3 mb-4 flex flex-col gap-1 ${config.className}`}>
      <p className="text-sm font-semibold flex items-center gap-2">
        {completude.selo === 'bloqueada' && <Ban size={16} />}
        {completude.selo !== 'completa' && completude.selo !== 'bloqueada' && <AlertTriangle size={16} />}
        {config.texto}
      </p>
      <p className="text-xs opacity-90">{completude.resumo}</p>
      {colunasNaoVazias.length > 0 && (
        <details className="mt-1">
          <summary className="text-xs cursor-pointer opacity-90 hover:opacity-100">
            O que falta ({colunasNaoVazias.length})
          </summary>
          <ul className="mt-2 flex flex-col gap-1.5 text-xs bg-black/10 rounded-lg p-2.5">
            {colunasNaoVazias.map((c) => (
              <li key={c.nome}>
                <span className="font-semibold">{c.nome}</span> ({c.camada}{c.vazia ? ' · vazia' : ''}) — impede: {c.impede}. Onde conseguir: {c.onde}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}

const NIVEL_LABEL: Record<string, string> = {
  campanha: 'Análise por campanha',
  conjunto: 'Análise por conjunto',
  grupo: 'Análise por conjunto',
  anuncio: 'Análise por anúncio',
}

// Cabeçalho estático (não precisa de interatividade), fica no server component da página.
export function CabecalhoPlano({ plano }: { plano: PlanoFrontmatter }) {
  const { investimento, evidencia } = plano
  const variacao =
    investimento.anterior != null && investimento.anterior > 0
      ? ((investimento.janela - investimento.anterior) / investimento.anterior) * 100
      : null
  const estouraTeto = investimento.projecao_mes != null && investimento.projecao_mes > investimento.teto_mensal

  return (
    <header className="mb-8">
      <SeloCompletude plano={plano} />

      <p className="text-xs font-semibold uppercase tracking-wide text-[#E8649A] mb-1">
        {plano.cliente.nome} · {plano.canal}
      </p>
      <h1 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] break-words">
        {NIVEL_LABEL[plano.nivel] ?? 'Análise'}
      </h1>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-[12px] border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Período analisado</p>
          <p className="text-sm font-semibold text-gray-900">
            {formatDateBR(plano.periodo.inicio)} a {formatDateBR(plano.periodo.fim)}
          </p>
        </div>
        <div className="rounded-[12px] border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Comparado com</p>
          <p className="text-sm font-semibold text-gray-900">
            {formatDateBR(plano.comparativo.inicio)} a {formatDateBR(plano.comparativo.fim)}
          </p>
        </div>
        <div className="rounded-[12px] border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Investimento na janela</p>
          <p className="text-sm font-semibold text-gray-900">
            {formatMoney(investimento.janela)}{' '}
            {variacao != null && (
              <span className={variacao >= 0 ? 'text-[#3DB85C]' : 'text-red-600'}>
                ({variacao >= 0 ? '+' : ''}{variacao.toFixed(1)}%)
              </span>
            )}
          </p>
        </div>
        <div className="rounded-[12px] border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Teto mensal · Projeção</p>
          <p className={`text-sm font-semibold ${estouraTeto ? 'text-red-600' : 'text-gray-900'}`}>
            {formatMoney(investimento.teto_mensal)} · {formatOuTraco(investimento.projecao_mes, formatMoney)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Hoje não entra: o dia corrente é incompleto e fica de fora da janela. Evidência acumulada de{' '}
        {evidencia.dias} dias ({formatDateBR(evidencia.inicio)} a {formatDateBR(evidencia.fim)}) sustenta o veredito de
        conversão; a decisão em si olha os {plano.periodo.dias} dias da janela.
      </p>
    </header>
  )
}
