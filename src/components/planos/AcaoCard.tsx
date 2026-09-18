'use client'
import { useState } from 'react'
import { ChevronDown, HelpCircle, Lightbulb, CheckCircle2, ShieldCheck } from 'lucide-react'
import type { Acao, DecisaoAcao, Leitura } from '@/lib/planos/types'
import { formatMoneyNumber } from '@/lib/planos/format'
import { EstadoIcone } from './EstadoIcone'
import { MetricasTable } from './MetricasTable'
import { DecisaoControles } from './DecisaoControles'

interface Props {
  acao: Acao
  profundidade: number
  aberto: boolean
  decisaoAtual: DecisaoAcao | undefined
  onToggle: () => void
  onAprovar: (observacao: string) => void
  onReprovar: (justificativa: string) => void
  onEscolherOpcao: (opcaoId: string, justificativa: string) => void
  registrarRef: (el: HTMLDivElement | null) => void
}

const SELO_LEITURA: Record<Leitura, { rotulo: string; className: string }> = {
  firme: { rotulo: '✅ veredito firme', className: 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]' },
  direcional: { rotulo: '🟡 direcional', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'sem leitura': { rotulo: '⚪ sem leitura', className: 'bg-gray-100 text-gray-600 border-gray-200' },
}

function ExecutadaBadge({ acao, registrarRef }: { acao: Acao; registrarRef: Props['registrarRef'] }) {
  return (
    <div
      id={`acao-${acao.id}`}
      ref={registrarRef}
      className="flex items-center gap-3 rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-3.5 opacity-70"
    >
      <CheckCircle2 size={18} className="text-gray-400 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-600 truncate">{acao.nome}</p>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 shrink-0">Já executado</span>
    </div>
  )
}

function SinaisSuprimidos({ acao }: { acao: Acao }) {
  const [aberto, setAberto] = useState(false)
  if (acao.sinais_suprimidos.length === 0) return null

  return (
    <div className="rounded-[12px] border border-gray-200">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left"
      >
        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
          <ShieldCheck size={15} className="text-gray-400" />
          O que NÃO é problema aqui ({acao.sinais_suprimidos.length})
        </span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${aberto ? 'rotate-180' : ''}`} />
      </button>
      {aberto && (
        <ul className="flex flex-col gap-1.5 px-4 pb-3 text-sm text-gray-600">
          {acao.sinais_suprimidos.map((s) => (
            <li key={s.sinal}>
              <span className="font-medium text-gray-800">{s.sinal}</span> — {s.motivo}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function AcaoCard({
  acao,
  profundidade,
  aberto,
  decisaoAtual,
  onToggle,
  onAprovar,
  onReprovar,
  onEscolherOpcao,
  registrarRef,
}: Props) {
  if (acao.tipo_acao === 'executado') {
    return <ExecutadaBadge acao={acao} registrarRef={registrarRef} />
  }

  const decisao = decisaoAtual?.decisao ?? 'pendente'
  const contentId = `acao-conteudo-${acao.id}`
  const selo = SELO_LEITURA[acao.evidencia.leitura]

  return (
    <div
      id={`acao-${acao.id}`}
      ref={registrarRef}
      style={{ marginLeft: profundidade > 0 ? `${Math.min(profundidade, 2) * 20}px` : undefined }}
      className={`rounded-[12px] border transition-colors ${
        decisao === 'aprovado'
          ? 'border-[#bbf7d0]'
          : decisao === 'reprovado'
            ? 'border-red-200'
            : 'border-gray-200'
      } bg-white`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={aberto}
        aria-controls={contentId}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left min-h-[44px]"
      >
        <EstadoIcone decisao={decisao} size={18} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{acao.apelido}</p>
          <p className="text-xs text-gray-500 truncate">{acao.acao}</p>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform duration-200 motion-reduce:transition-none ${aberto ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id={contentId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          aberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 flex flex-col gap-5 border-t border-gray-100 pt-4">
            <div>
              <p className="text-base font-semibold text-gray-900">{acao.nome}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="inline-block rounded-full bg-[#FDF2F4] text-[#E8649A] text-xs font-semibold uppercase tracking-wide px-3 py-1">
                  {acao.acao}
                </span>
                <span className={`inline-block rounded-full border text-xs font-semibold px-3 py-1 ${selo.className}`}>
                  {selo.rotulo}
                </span>
              </div>
            </div>

            {acao.evidencia.leitura === 'sem leitura' && acao.evidencia.cliques != null && acao.evidencia.vendas_esperadas != null && (
              <p className="text-sm text-gray-600 bg-gray-50 rounded-[12px] px-4 py-3">
                Este item teve {acao.evidencia.cliques} cliques ≈ {acao.evidencia.vendas_esperadas.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} venda esperada.
                Zero vendas aqui é o resultado esperado mesmo para um bom anúncio.
              </p>
            )}

            {acao.verba.atual != null && acao.verba.sugerida != null && (
              <div className="rounded-[12px] bg-[#FDF2F4] px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  De R$ {formatMoneyNumber(acao.verba.atual)}/dia → R$ {formatMoneyNumber(acao.verba.sugerida)}/dia
                </p>
              </div>
            )}

            <MetricasTable metricas={acao.metricas} />

            {acao.motivos.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  Por que estou sugerindo
                </p>
                <ol className="flex flex-col gap-1.5 list-decimal list-inside text-sm text-gray-700">
                  {acao.motivos.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ol>
              </div>
            )}

            <SinaisSuprimidos acao={acao} />

            {acao.expectativa && (
              <div className="flex items-start gap-2 rounded-[12px] bg-gray-50 px-4 py-3">
                <Lightbulb size={16} className="text-[#E8649A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    O que espero que aconteça
                  </p>
                  <p className="text-sm text-gray-700">{acao.expectativa}</p>
                </div>
              </div>
            )}

            {acao.perguntas.length > 0 && (
              <div className="flex items-start gap-2 rounded-[12px] bg-amber-50 px-4 py-3">
                <HelpCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">
                    Perguntas
                  </p>
                  <ul className="flex flex-col gap-1 text-sm text-gray-700">
                    {acao.perguntas.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <DecisaoControles
              acao={acao}
              atual={decisaoAtual}
              onAprovar={onAprovar}
              onReprovar={onReprovar}
              onEscolherOpcao={onEscolherOpcao}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
