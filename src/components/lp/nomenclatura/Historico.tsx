'use client'
import { useState } from 'react'
import { camposEmBranco } from '@/lib/nomenclatura'
import type { ItemHistorico } from './storage'

function fmtData(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${String(d.getFullYear()).slice(-2)} ${p(d.getHours())}:${p(d.getMinutes())}`
}

// Últimas gerações em tabela: data/hora e nome. Mostra 5, abre o resto no "ver todos".
// Clicar no nome copia. Cada linha tem editar e excluir.
export function Historico({
  itens,
  onCopiar,
  onEditar,
  onExcluir,
}: {
  itens: ItemHistorico[]
  onCopiar: (nome: string) => void
  onEditar: (item: ItemHistorico) => void
  onExcluir: (item: ItemHistorico) => void
}) {
  const [verTodos, setVerTodos] = useState(false)
  if (itens.length === 0) return null

  const visiveis = verTodos ? itens : itens.slice(0, 5)

  return (
    <section className="mt-12 border-t border-[#E5E7EB] pt-8">
      <h2 className="text-lg font-medium text-[#0D0C0D] mb-4">Últimas gerações</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-[#888888] whitespace-nowrap">
                Data e hora
              </th>
              <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-widest text-[#888888]">
                Nome
              </th>
              <th className="py-2 text-xs font-semibold uppercase tracking-widest text-[#888888]">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((item) => {
              const faltou = camposEmBranco(item.estado)
              return (
                <tr key={item.nome + item.geradoEm} className="border-b border-[#E5E7EB] align-top">
                  <td className="py-3 pr-4 text-[13px] text-[#666666] whitespace-nowrap tabular-nums">
                    {fmtData(item.geradoEm)}
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      type="button"
                      onClick={() => onCopiar(item.nome)}
                      title="Clique para copiar"
                      className="font-mono text-[13px] text-[#0D0C0D] break-all text-left hover:text-[#E8649A]"
                    >
                      {item.nome}
                    </button>
                    {faltou.length > 0 && (
                      <p className="text-[12px] text-[#B4740A] mt-1">
                        faltou: {faltou.join(', ')}
                      </p>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onCopiar(item.nome)}
                        className="min-h-[32px] rounded-[8px] border border-[#E5E7EB] px-2.5 text-[12px] text-[#666666] hover:border-[#E8649A]"
                      >
                        copiar
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditar(item)}
                        className="min-h-[32px] rounded-[8px] border border-[#E5E7EB] px-2.5 text-[12px] text-[#666666] hover:border-[#E8649A]"
                      >
                        editar
                      </button>
                      <button
                        type="button"
                        onClick={() => onExcluir(item)}
                        className="min-h-[32px] rounded-[8px] border border-[#E5E7EB] px-2.5 text-[12px] text-[#666666] hover:border-[#E8649A] hover:text-[#E8649A]"
                      >
                        excluir
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {itens.length > 5 && (
        <button
          type="button"
          onClick={() => setVerTodos((v) => !v)}
          className="mt-3 text-[13px] font-medium text-[#E8649A]"
        >
          {verTodos ? 'ver menos' : `ver todos os ${itens.length}`}
        </button>
      )}
    </section>
  )
}
