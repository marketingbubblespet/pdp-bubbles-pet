'use client'
import { useState } from 'react'
import { Check, X } from 'lucide-react'
import type { Acao, DecisaoAcao } from '@/lib/planos/types'

const MIN_CARACTERES_JUSTIFICATIVA = 10

interface Props {
  acao: Acao
  atual: DecisaoAcao | undefined
  onAprovar: (observacao: string) => void
  onReprovar: (justificativa: string) => void
  onEscolherOpcao: (opcaoId: string | 'nenhuma', justificativa: string) => void
}

function ControlesPadrao({ acao, atual, onAprovar, onReprovar }: Omit<Props, 'onEscolherOpcao'>) {
  const [mostrarJustificativa, setMostrarJustificativa] = useState(atual?.decisao === 'reprovado')
  const [justificativa, setJustificativa] = useState(atual?.observacao ?? '')
  const [observacaoAprovado, setObservacaoAprovado] = useState(atual?.decisao === 'aprovado' ? (atual.observacao ?? '') : '')

  const justificativaValida = justificativa.trim().length >= MIN_CARACTERES_JUSTIFICATIVA

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => {
            setMostrarJustificativa(false)
            onAprovar(observacaoAprovado)
          }}
          className={`flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-[12px] px-6 py-3 font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-95 ${
            atual?.decisao === 'aprovado'
              ? 'bg-[#3DB85C] text-white'
              : 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] hover:bg-[#dcfce7]'
          }`}
        >
          <Check size={18} /> Aprovar
        </button>
        <button
          type="button"
          onClick={() => setMostrarJustificativa(true)}
          className={`flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-[12px] px-6 py-3 font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-95 ${
            atual?.decisao === 'reprovado'
              ? 'bg-red-600 text-white'
              : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
          }`}
        >
          <X size={18} /> Não aplicar
        </button>
      </div>

      {mostrarJustificativa ? (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`justificativa-${acao.id}`} className="text-xs font-medium text-gray-600">
            Justificativa (obrigatória, mínimo {MIN_CARACTERES_JUSTIFICATIVA} caracteres)
          </label>
          <textarea
            id={`justificativa-${acao.id}`}
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
            rows={2}
            className="w-full rounded-[12px] border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Por que essa ação não deve ser aplicada?"
          />
          <button
            type="button"
            disabled={!justificativaValida}
            onClick={() => onReprovar(justificativa.trim())}
            className="self-start rounded-[12px] bg-red-600 text-white text-sm font-semibold px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
          >
            Confirmar reprovação
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`obs-${acao.id}`} className="text-xs font-medium text-gray-600">
            Observação (opcional)
          </label>
          <textarea
            id={`obs-${acao.id}`}
            value={observacaoAprovado}
            onChange={(e) => setObservacaoAprovado(e.target.value)}
            onBlur={() => atual?.decisao === 'aprovado' && onAprovar(observacaoAprovado)}
            rows={1}
            className="w-full rounded-[12px] border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder='Ex: "aprovo, mas só na quinta"'
          />
        </div>
      )}
    </div>
  )
}

function ControlesDecidir({ acao, atual, onEscolherOpcao }: Pick<Props, 'acao' | 'atual' | 'onEscolherOpcao'>) {
  const [selecionado, setSelecionado] = useState<string | null>(atual?.opcaoEscolhida ?? null)
  const [justificativa, setJustificativa] = useState(atual?.decisao === 'reprovado' ? atual.observacao : '')

  const justificativaValida = justificativa.trim().length >= MIN_CARACTERES_JUSTIFICATIVA

  return (
    <div className="flex flex-col gap-3">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-medium text-gray-600 mb-1">O que fazer?</legend>
        {acao.opcoes.map((opcao) => (
          <label
            key={opcao.id}
            className={`flex items-center gap-2.5 rounded-[12px] border px-4 py-3 cursor-pointer transition-colors ${
              selecionado === opcao.id
                ? 'border-[#E8649A] bg-[#FDF2F4]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={`decidir-${acao.id}`}
              checked={selecionado === opcao.id}
              onChange={() => {
                setSelecionado(opcao.id)
                onEscolherOpcao(opcao.id, '')
              }}
              className="accent-[#E8649A]"
            />
            <span className="text-sm text-gray-900">{opcao.texto}</span>
          </label>
        ))}
        <label
          className={`flex items-center gap-2.5 rounded-[12px] border px-4 py-3 cursor-pointer transition-colors ${
            selecionado === 'nenhuma'
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name={`decidir-${acao.id}`}
            checked={selecionado === 'nenhuma'}
            onChange={() => setSelecionado('nenhuma')}
            className="accent-red-500"
          />
          <span className="text-sm text-gray-900">Nenhuma das duas</span>
        </label>
      </fieldset>

      {selecionado === 'nenhuma' && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`justificativa-decidir-${acao.id}`} className="text-xs font-medium text-gray-600">
            Justificativa (obrigatória, mínimo {MIN_CARACTERES_JUSTIFICATIVA} caracteres)
          </label>
          <textarea
            id={`justificativa-decidir-${acao.id}`}
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
            rows={2}
            className="w-full rounded-[12px] border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <button
            type="button"
            disabled={!justificativaValida}
            onClick={() => onEscolherOpcao('nenhuma', justificativa.trim())}
            className="self-start rounded-[12px] bg-red-600 text-white text-sm font-semibold px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
          >
            Confirmar decisão
          </button>
        </div>
      )}
    </div>
  )
}

export function DecisaoControles(props: Props) {
  if (props.acao.tipo_acao === 'decidir') {
    return <ControlesDecidir acao={props.acao} atual={props.atual} onEscolherOpcao={props.onEscolherOpcao} />
  }
  return <ControlesPadrao acao={props.acao} atual={props.atual} onAprovar={props.onAprovar} onReprovar={props.onReprovar} />
}
