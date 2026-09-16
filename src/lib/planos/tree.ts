// src/lib/planos/tree.ts
// Monta a árvore campanha → conjunto → anúncio a partir do campo `pai` de cada ação,
// preservando a ordem em que aparecem no frontmatter dentro de cada nível.
import type { Acao } from './types'

export interface NoAcao {
  acao: Acao
  filhos: NoAcao[]
}

export function montarArvore(acoes: Acao[]): NoAcao[] {
  const porId = new Map(acoes.map((a) => [a.id, a]))
  const filhosPorPai = new Map<string | null, Acao[]>()

  for (const acao of acoes) {
    // `pai` órfão (aponta pra um id inexistente) vira raiz, em vez de sumir da árvore.
    const paiValido = acao.pai && porId.has(acao.pai) ? acao.pai : null
    const lista = filhosPorPai.get(paiValido) ?? []
    lista.push(acao)
    filhosPorPai.set(paiValido, lista)
  }

  const construir = (paiId: string | null): NoAcao[] =>
    (filhosPorPai.get(paiId) ?? []).map((acao) => ({ acao, filhos: construir(acao.id) }))

  return construir(null)
}

// Lista achatada em ordem de leitura (pré-ordem), útil pra navegação sequencial
// "próxima pendente" sem duplicar a lógica de percurso da árvore.
export function achatarArvore(arvore: NoAcao[]): Acao[] {
  const resultado: Acao[] = []
  const percorrer = (nos: NoAcao[]) => {
    for (const no of nos) {
      resultado.push(no.acao)
      percorrer(no.filhos)
    }
  }
  percorrer(arvore)
  return resultado
}

// Nome do conjunto mais próximo na ancestralidade de cada ação (ou o próprio apelido,
// se a ação já for de nível campanha/conjunto sem conjunto acima). Usado pra agrupar o
// bloco "Aprovadas" do resumo final por conjunto, como pedido no briefing.
export function montarMapaGrupoConjunto(acoes: Acao[]): Record<string, string> {
  const porId = new Map(acoes.map((a) => [a.id, a]))
  const mapa: Record<string, string> = {}

  for (const acao of acoes) {
    let atual: Acao | undefined = acao
    let conjuntoEncontrado: Acao | undefined
    while (atual) {
      if (atual.nivel === 'conjunto' || atual.nivel === 'grupo') {
        conjuntoEncontrado = atual
        break
      }
      atual = atual.pai ? porId.get(atual.pai) : undefined
    }
    mapa[acao.id] = (conjuntoEncontrado ?? acao).apelido
  }

  return mapa
}
