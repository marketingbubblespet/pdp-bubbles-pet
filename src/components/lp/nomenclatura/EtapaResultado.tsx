'use client'
import { useState } from 'react'
import {
  camposEmBranco,
  segmentosNome,
  type EstadoNomenclatura,
} from '@/lib/nomenclatura'
import { NomeSegmentado } from './ui'

// Etapa 5: nome pronto, cópia e aviso suave do que ficou em branco (não bloqueia).
export function EtapaResultado({
  estado,
  geradoEm,
  copiado,
  onCopiar,
  onEditar,
  onNovoMesmaCampanha,
  onZerar,
}: {
  estado: EstadoNomenclatura
  geradoEm: string
  copiado: boolean
  onCopiar: () => void
  onEditar: () => void
  onNovoMesmaCampanha: () => void
  onZerar: () => void
}) {
  const [mantido, setMantido] = useState(false)
  const faltando = camposEmBranco(estado)
  // Recria os segmentos a partir da data em que o nome foi gerado, para o mês bater.
  const segmentos = segmentosNome(estado, geradoEm ? new Date(geradoEm) : new Date())

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-2">
        Nome do criativo
      </p>

      <div className="mb-3">
        <NomeSegmentado segmentos={segmentos} onCopiar={onCopiar} />
        <p className="text-[12px] text-[#888888] mt-1">
          Passe o mouse em cada bloco para ver o significado. Clique no nome para copiar.
        </p>
      </div>

      <button
        type="button"
        onClick={onCopiar}
        className="w-full min-h-[44px] bg-[#E8649A] text-white font-semibold rounded-[12px] hover:brightness-110 active:scale-95 transition-all duration-200"
      >
        {copiado ? 'Copiado!' : 'Copiar nome'}
      </button>

      {faltando.length > 0 && !mantido && (
        <div className="mt-4 rounded-[12px] border border-[#F4A522] bg-[#FFF8EC] p-4">
          <p className="text-sm font-medium text-[#0D0C0D] mb-1">Ficou em branco:</p>
          <p className="text-[13px] text-[#666666]">{faltando.join(', ')}.</p>
          <p className="text-[13px] text-[#666666] mt-1">
            Isso fica marcado no histórico. Você pode editar e preencher, ou manter assim.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onEditar}
              className="min-h-[40px] rounded-[10px] border border-[#F4A522] bg-white px-4 text-[13px] font-semibold text-[#B4740A] hover:bg-[#FFF3DC] transition-colors"
            >
              Editar e preencher
            </button>
            <button
              type="button"
              onClick={() => setMantido(true)}
              className="min-h-[40px] rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#666666] hover:border-[#E8649A] transition-colors"
            >
              Manter assim mesmo
            </button>
          </div>
        </div>
      )}

      {faltando.length > 0 && mantido && (
        <p className="mt-4 text-[13px] text-[#666666]">
          Mantido com {faltando.length === 1 ? 'campo' : 'campos'} em branco. Marcado no histórico.
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onEditar}
          className="min-h-[44px] rounded-[12px] bg-[#E8649A] text-white font-semibold hover:brightness-110 active:scale-95 transition-all duration-200"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={onNovoMesmaCampanha}
          className="min-h-[44px] rounded-[12px] border border-[#E8649A] text-[#E8649A] font-semibold hover:bg-[#FDF2F4] transition-colors"
        >
          Novo, mesma campanha
        </button>
        <button
          type="button"
          onClick={onZerar}
          className="min-h-[44px] rounded-[12px] border border-[#E5E7EB] text-[#666666] font-medium hover:border-[#E8649A] transition-colors"
        >
          Começar do zero
        </button>
      </div>
    </div>
  )
}
