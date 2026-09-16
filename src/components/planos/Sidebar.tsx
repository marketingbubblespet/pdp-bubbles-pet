'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { PlanoFrontmatter, Decisao } from '@/lib/planos/types'
import type { NoAcao } from '@/lib/planos/tree'
import { formatDateBR } from '@/lib/planos/format'
import { EstadoIcone } from './EstadoIcone'

interface Props {
  plano: PlanoFrontmatter
  arvore: NoAcao[]
  decisoesPorId: Record<string, Decisao>
  totalRevisaveis: number
  totalRevisados: number
  onSelecionar: (acaoId: string) => void
}

function NavItem({
  no,
  profundidade,
  decisoesPorId,
  onSelecionar,
}: {
  no: NoAcao
  profundidade: number
  decisoesPorId: Record<string, Decisao>
  onSelecionar: (id: string) => void
}) {
  const executado = no.acao.tipo_acao === 'executado'
  const decisao: Decisao = executado ? 'aprovado' : (decisoesPorId[no.acao.id] ?? 'pendente')

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelecionar(no.acao.id)}
        style={{ paddingLeft: `${12 + profundidade * 14}px` }}
        className="w-full flex items-center gap-2 py-2 pr-3 text-left rounded-lg hover:bg-gray-100 transition-colors min-h-[36px]"
      >
        {executado ? (
          <span className="w-4 h-4 shrink-0 rounded-full bg-gray-300" />
        ) : (
          <EstadoIcone decisao={decisao} size={14} />
        )}
        <span className="text-sm text-gray-700 truncate">{no.acao.apelido}</span>
      </button>
      {no.filhos.length > 0 && (
        <ul>
          {no.filhos.map((filho) => (
            <NavItem key={filho.acao.id} no={filho} profundidade={profundidade + 1} decisoesPorId={decisoesPorId} onSelecionar={onSelecionar} />
          ))}
        </ul>
      )}
    </li>
  )
}

function Cabecalho({ plano, totalRevisaveis, totalRevisados }: Pick<Props, 'plano' | 'totalRevisaveis' | 'totalRevisados'>) {
  const progresso = totalRevisaveis > 0 ? (totalRevisados / totalRevisaveis) * 100 : 0
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#E8649A]">{plano.cliente.nome}</p>
      <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug capitalize">{plano.canal.replace('-', ' ')}</p>
      <p className="text-xs text-gray-500 mt-1">
        {formatDateBR(plano.periodo.inicio)} a {formatDateBR(plano.periodo.fim)}
      </p>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>{totalRevisados} de {totalRevisaveis} revisados</span>
          <span>{Math.round(progresso)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-[#3DB85C] transition-all duration-300" style={{ width: `${progresso}%` }} />
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ plano, arvore, decisoesPorId, totalRevisaveis, totalRevisados, onSelecionar }: Props) {
  const [abertoMobile, setAbertoMobile] = useState(false)

  return (
    <>
      {/* Mobile: menu recolhível no topo */}
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={() => setAbertoMobile((v) => !v)}
          className="w-full flex items-center justify-between gap-2 rounded-[12px] border border-gray-200 bg-white px-4 py-3 min-h-[44px]"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
            {abertoMobile ? <X size={18} /> : <Menu size={18} />}
            Navegação das ações
          </span>
          <span className="text-xs text-gray-500">{totalRevisados}/{totalRevisaveis}</span>
        </button>
        {abertoMobile && (
          <div className="mt-2 rounded-[12px] border border-gray-200 bg-white p-4">
            <Cabecalho plano={plano} totalRevisaveis={totalRevisaveis} totalRevisados={totalRevisados} />
            <ul>
              {arvore.map((no) => (
                <NavItem
                  key={no.acao.id}
                  no={no}
                  profundidade={0}
                  decisoesPorId={decisoesPorId}
                  onSelecionar={(id) => {
                    onSelecionar(id)
                    setAbertoMobile(false)
                  }}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop: sumário fixo */}
      <aside className="hidden md:block sticky top-6 self-start w-full max-w-[280px] rounded-[12px] border border-gray-200 bg-white p-4 max-h-[calc(100vh-48px)] overflow-y-auto">
        <Cabecalho plano={plano} totalRevisaveis={totalRevisaveis} totalRevisados={totalRevisados} />
        <ul>
          {arvore.map((no) => (
            <NavItem key={no.acao.id} no={no} profundidade={0} decisoesPorId={decisoesPorId} onSelecionar={onSelecionar} />
          ))}
        </ul>
      </aside>
    </>
  )
}
