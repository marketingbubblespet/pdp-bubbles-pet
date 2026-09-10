// Persistência local da ferramenta de nomenclatura. Tudo em localStorage e tudo
// embrulhado em try/catch: em aba anônima ou com armazenamento bloqueado, as leituras
// devolvem vazio e a página continua funcionando.
import { ESTADO_VAZIO, type EstadoNomenclatura } from '@/lib/nomenclatura'

const K_ACESSO = 'nomenclatura_acesso'
const K_RASCUNHO = 'nomenclatura_rascunho'
const K_HISTORICO = 'nomenclatura_historico'

const MAX_HISTORICO = 50

export type ItemHistorico = {
  nome: string
  estado: EstadoNomenclatura
  geradoEm: string
}

export type Rascunho = {
  estado: EstadoNomenclatura
  etapa: number
}

// ── Acesso (senha) ───────────────────────────────────────────────────────────
export function lerAcesso(): boolean {
  try {
    return localStorage.getItem(K_ACESSO) === '1'
  } catch {
    return false
  }
}

export function gravarAcesso(): void {
  try {
    localStorage.setItem(K_ACESSO, '1')
  } catch {
    // sem persistência: a pessoa digita a senha de novo na próxima visita
  }
}

// ── Rascunho (o que a pessoa está preenchendo agora) ─────────────────────────
export function lerRascunho(): Rascunho | null {
  try {
    const cru = localStorage.getItem(K_RASCUNHO)
    if (!cru) return null
    const dados = JSON.parse(cru) as Partial<Rascunho>
    if (!dados || typeof dados !== 'object' || !dados.estado) return null
    // Mescla com o estado vazio: se o formato mudar, campos novos entram com default.
    return {
      estado: { ...ESTADO_VAZIO, ...dados.estado },
      etapa: typeof dados.etapa === 'number' ? dados.etapa : 1,
    }
  } catch {
    return null
  }
}

export function gravarRascunho(estado: EstadoNomenclatura, etapa: number): void {
  try {
    localStorage.setItem(K_RASCUNHO, JSON.stringify({ estado, etapa }))
  } catch {
    // ignora
  }
}

export function limparRascunho(): void {
  try {
    localStorage.removeItem(K_RASCUNHO)
  } catch {
    // ignora
  }
}

// ── Histórico (nomes já gerados) ─────────────────────────────────────────────
export function lerHistorico(): ItemHistorico[] {
  try {
    const cru = localStorage.getItem(K_HISTORICO)
    if (!cru) return []
    const lista = JSON.parse(cru)
    return Array.isArray(lista) ? (lista as ItemHistorico[]) : []
  } catch {
    return []
  }
}

// Grava no topo, remove duplicado do mesmo nome, corta em MAX_HISTORICO.
export function adicionarHistorico(item: ItemHistorico): ItemHistorico[] {
  const atual = lerHistorico().filter((i) => i.nome !== item.nome)
  const nova = [item, ...atual].slice(0, MAX_HISTORICO)
  try {
    localStorage.setItem(K_HISTORICO, JSON.stringify(nova))
  } catch {
    // ignora
  }
  return nova
}

// Remove um item específico do histórico (identificado por nome + data de geração).
export function removerDoHistorico(nome: string, geradoEm: string): ItemHistorico[] {
  const nova = lerHistorico().filter((i) => !(i.nome === nome && i.geradoEm === geradoEm))
  try {
    localStorage.setItem(K_HISTORICO, JSON.stringify(nova))
  } catch {
    // ignora
  }
  return nova
}

export function limparHistorico(): ItemHistorico[] {
  try {
    localStorage.removeItem(K_HISTORICO)
  } catch {
    // ignora
  }
  return []
}
