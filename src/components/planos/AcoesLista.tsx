import type { NoAcao } from '@/lib/planos/tree'
import type { EstadoPlano } from '@/lib/planos/types'
import { AcaoCard } from './AcaoCard'

interface Props {
  nos: NoAcao[]
  profundidade: number
  abertos: Set<string>
  estado: EstadoPlano
  onToggle: (id: string) => void
  onAprovar: (id: string, observacao: string) => void
  onReprovar: (id: string, justificativa: string) => void
  onEscolherOpcao: (id: string, opcaoId: string, justificativa: string) => void
  registrarRef: (id: string, el: HTMLDivElement | null) => void
}

// Renderiza a árvore campanha → conjunto → anúncio em profundidade indefinida: cada nível
// vira um AcaoCard, com os filhos logo abaixo, levemente recuados.
export function AcoesLista({ nos, profundidade, abertos, estado, onToggle, onAprovar, onReprovar, onEscolherOpcao, registrarRef }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {nos.map((no) => (
        <div key={no.acao.id} className="flex flex-col gap-3">
          <AcaoCard
            acao={no.acao}
            profundidade={profundidade}
            aberto={abertos.has(no.acao.id)}
            decisaoAtual={estado[no.acao.id]}
            onToggle={() => onToggle(no.acao.id)}
            onAprovar={(obs) => onAprovar(no.acao.id, obs)}
            onReprovar={(just) => onReprovar(no.acao.id, just)}
            onEscolherOpcao={(opcaoId, just) => onEscolherOpcao(no.acao.id, opcaoId, just)}
            registrarRef={(el) => registrarRef(no.acao.id, el)}
          />
          {no.filhos.length > 0 && (
            <AcoesLista
              nos={no.filhos}
              profundidade={profundidade + 1}
              abertos={abertos}
              estado={estado}
              onToggle={onToggle}
              onAprovar={onAprovar}
              onReprovar={onReprovar}
              onEscolherOpcao={onEscolherOpcao}
              registrarRef={registrarRef}
            />
          )}
        </div>
      ))}
    </div>
  )
}
