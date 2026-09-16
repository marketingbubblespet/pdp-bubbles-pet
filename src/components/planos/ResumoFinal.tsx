'use client'
import { useMemo, useState } from 'react'
import { Copy, Check, AlertTriangle, Trash2 } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import type { PlanoFrontmatter } from '@/lib/planos/types'
import type { Resumo } from '@/lib/planos/resumo'
import { montarMensagem, LIMITE_CARACTERES_AVISO } from '@/lib/planos/mensagem'
import { projecaoComImpacto } from '@/lib/planos/resumo'
import { formatMoney, formatMoneyNumber } from '@/lib/planos/format'

interface Props {
  plano: PlanoFrontmatter
  resumo: Resumo
  grupoDe: Record<string, string>
  onLimpar: () => void
}

function BlocoAprovadas({ resumo, grupoDe }: Pick<Props, 'resumo' | 'grupoDe'>) {
  const porGrupo = useMemo(() => {
    const mapa = new Map<string, typeof resumo.aprovadas>()
    for (const item of resumo.aprovadas) {
      const grupo = grupoDe[item.acao.id] ?? item.acao.apelido
      mapa.set(grupo, [...(mapa.get(grupo) ?? []), item])
    }
    return mapa
  }, [resumo, grupoDe])

  if (resumo.aprovadas.length === 0) {
    return <p className="text-sm text-gray-500">Nenhuma ação aprovada ainda.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {[...porGrupo.entries()].map(([grupo, itens]) => (
        <div key={grupo}>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">{grupo}</p>
          <ul className="flex flex-col gap-1.5">
            {itens.map((x) => (
              <li key={x.acao.id} className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">{x.acao.nome}</span> — {x.acao.acao}
                {x.acao.verba.atual != null && x.acao.verba.sugerida != null && (
                  <span className="text-gray-500">
                    {' '}(R$ {formatMoneyNumber(x.acao.verba.atual)}/dia → R$ {formatMoneyNumber(x.acao.verba.sugerida)}/dia)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function BlocoReprovadas({ resumo }: Pick<Props, 'resumo'>) {
  if (resumo.reprovadas.length === 0) {
    return <p className="text-sm text-gray-500">Nenhuma ação não aplicada.</p>
  }
  return (
    <ul className="flex flex-col gap-2">
      {resumo.reprovadas.map((x) => (
        <li key={x.acao.id} className="text-sm text-gray-700">
          <span className="font-medium text-gray-900">{x.acao.nome}</span> — {x.acao.acao}
          <p className="text-xs text-gray-500 mt-0.5">Motivo: {x.observacao}</p>
        </li>
      ))}
    </ul>
  )
}

function BlocoPendentes({ resumo }: Pick<Props, 'resumo'>) {
  if (resumo.pendentes.length === 0) {
    return <p className="text-sm text-[#3DB85C] font-medium">Tudo revisado.</p>
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-1.5 text-sm text-amber-700 font-medium">
        <AlertTriangle size={15} /> Ainda há {resumo.pendentes.length} ação(ões) sem revisão.
      </p>
      <ul className="flex flex-col gap-1">
        {resumo.pendentes.map((x) => (
          <li key={x.acao.id} className="text-sm text-gray-600">
            {x.acao.nome} — {x.acao.acao}
          </li>
        ))}
      </ul>
    </div>
  )
}

function BlocoImpacto({ plano, resumo }: Pick<Props, 'plano' | 'resumo'>) {
  const libera = resumo.impactoSemanal >= 0
  const projecaoAjustada = projecaoComImpacto(plano.investimento, resumo.impactoSemanal)

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-[12px] bg-gray-50 p-4">
        <p className="text-xs text-gray-500 mb-1">Impacto na verba (semanal)</p>
        <p className={`text-xl font-semibold ${libera ? 'text-[#3DB85C]' : 'text-red-600'}`}>
          {libera ? '+' : '-'} {formatMoney(Math.abs(resumo.impactoSemanal))}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {libera ? 'Liberado pelas ações aprovadas' : 'Necessário a mais pelas ações de escalar'}
        </p>
      </div>
      <div className="rounded-[12px] bg-gray-50 p-4">
        <p className="text-xs text-gray-500 mb-1">Projeção do mês (ajustada)</p>
        <p className="text-xl font-semibold text-gray-900">
          {projecaoAjustada != null ? formatMoney(projecaoAjustada) : '—'}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          Teto mensal: {formatMoney(plano.investimento.teto_mensal)}
        </p>
      </div>
    </div>
  )
}

export function ResumoFinal({ plano, resumo, grupoDe, onLimpar }: Props) {
  const [copiado, setCopiado] = useState(false)
  const [confirmandoLimpar, setConfirmandoLimpar] = useState(false)

  const mensagem = useMemo(() => montarMensagem(plano, resumo), [plano, resumo])
  const excedeuLimite = mensagem.length > LIMITE_CARACTERES_AVISO

  const copiarMensagem = async () => {
    try {
      await navigator.clipboard.writeText(mensagem)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      // Sem permissão de clipboard: sem alternativa client-side melhor, o usuário pode
      // selecionar o texto manualmente se isso acontecer (raro fora de HTTP inseguro).
    }
  }

  const enviarWhatsapp = () => {
    const url = `https://wa.me/${plano.whatsapp}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="rounded-[20px] border border-gray-200 bg-white p-5 md:p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">✅ Aprovadas ({resumo.aprovadas.length})</h2>
        <BlocoAprovadas resumo={resumo} grupoDe={grupoDe} />
      </div>
      <div className="border-t border-gray-100 pt-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">❌ Não aplicadas ({resumo.reprovadas.length})</h2>
        <BlocoReprovadas resumo={resumo} />
      </div>
      <div className="border-t border-gray-100 pt-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">⏳ Pendentes</h2>
        <BlocoPendentes resumo={resumo} />
      </div>
      <div className="border-t border-gray-100 pt-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Impacto</h2>
        <BlocoImpacto plano={plano} resumo={resumo} />
      </div>

      {excedeuLimite && (
        <p className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
          <AlertTriangle size={14} className="shrink-0" />
          A mensagem passou de {LIMITE_CARACTERES_AVISO} caracteres e o WhatsApp pode truncar. Prefira copiar e colar.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={copiarMensagem}
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-[12px] border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:border-[#E8649A] hover:text-[#E8649A] transition-colors"
        >
          {copiado ? <Check size={18} className="text-[#3DB85C]" /> : <Copy size={18} />}
          {copiado ? 'Copiado!' : 'Copiar mensagem'}
        </button>
        <button
          type="button"
          onClick={enviarWhatsapp}
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-[12px] bg-[#3DB85C] text-white px-6 py-3 font-semibold hover:brightness-110 hover:scale-[1.01] active:scale-95 transition-all"
        >
          <WhatsAppIcon size={18} /> Enviar no WhatsApp
        </button>
      </div>

      <div className="flex justify-center">
        {confirmandoLimpar ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Apagar todas as respostas salvas?</span>
            <button type="button" onClick={() => { onLimpar(); setConfirmandoLimpar(false) }} className="text-red-600 font-semibold hover:underline">
              Sim, limpar
            </button>
            <button type="button" onClick={() => setConfirmandoLimpar(false)} className="text-gray-500 hover:underline">
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmandoLimpar(true)}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={13} /> Limpar respostas
          </button>
        )}
      </div>
    </section>
  )
}
