// src/lib/planos/types.ts
// Tipos do schema de frontmatter dos relatórios de análise de mídia paga.
// Fonte da verdade: content/planos/*.md (frontmatter YAML, corpo em MDX).
// Regra número um do relatório: renderizar só o que está no frontmatter. Nunca calcular,
// inferir, arredondar ou completar um número. Campo ausente vira "—", nunca 0 nem omitido.

export type Nivel = 'campanha' | 'conjunto' | 'grupo' | 'anuncio'

export type TipoAcao = 'escalar' | 'reduzir' | 'manter' | 'ajustar' | 'pausar' | 'decidir' | 'executado'

export type Papel = 'completo' | 'fechador' | 'gerador' | 'assistente' | 'colhedor' | 'fraco' | 'indefinido'

export type Leitura = 'firme' | 'direcional' | 'sem leitura'

export type Selo = 'completa' | 'quase' | 'parcial' | 'bloqueada'

export type Camada = 'importante' | 'detalhe'

export interface ColunaFaltando {
  nome: string
  camada: Camada
  vazia: boolean
  impede: string
  onde: string
}

export interface Completude {
  selo: Selo
  resumo: string
  colunas_faltando: ColunaFaltando[]
}

export interface Periodo {
  inicio: string
  fim: string
  dias: number
}

export interface Investimento {
  janela: number
  anterior: number | null
  teto_mensal: number
  projecao_mes: number | null
}

export interface Conta {
  vendas_mes: number
  taxa_conversao: number
  acima_do_limiar: boolean
}

export interface Verba {
  atual: number | null
  // Os centavos de `sugerida` carregam o valor diário ANTERIOR por convenção de leitura
  // (ex: 34.28 = "passar para R$ 34/dia, estava em R$ 28/dia"). Nunca arredondar nem
  // reformatar esse campo.
  sugerida: number | null
  anterior: number | null
  variacao_pct: number | null
}

export interface Evidencia {
  cliques: number
  vendas_esperadas: number
  leitura: Leitura
}

export interface Metrica {
  valor: number | null
  var_pct: number | null
  meta: number | null
}

export interface Metricas {
  investimento: Metrica
  vendas: Metrica
  ticket_medio: Metrica
  roas_lc: Metrica
  roas_fc: Metrica
  roas_assist: Metrica
  ctr: Metrica
  impressoes: Metrica
  sessoes: Metrica
  connect_rate: Metrica
}

export interface SinalSuprimido {
  sinal: string
  motivo: string
}

export interface OpcaoDecisao {
  id: string
  texto: string
}

export interface Acao {
  id: string
  nivel: Nivel
  pai: string | null
  nome: string
  apelido: string
  acao: string
  tipo_acao: TipoAcao
  situacao: string | null
  papel: Papel | null
  evidencia: Evidencia
  verba: Verba
  metricas: Metricas
  motivos: string[]
  sinais_suprimidos: SinalSuprimido[]
  expectativa: string | null
  perguntas: string[]
  opcoes: OpcaoDecisao[]
  historico: string | null
}

export interface PodioColocado {
  pos: number
  nome: string
  formato: string
  investimento: number
  impressoes: number
  thumbstop: number | null
  ctr: number
  roas_lc: number
  roas_fc: number
  roas_assist: number
  novo: boolean
}

export interface PodioCategoria {
  chave: string
  titulo: string
  explica: string
  metrica_destaque: string
  colocados: PodioColocado[]
}

export interface PodioMulti {
  nome: string
  podios: string[]
}

export interface PodioFora {
  nome: string
  motivo: string
}

export interface Podios {
  lista: PodioCategoria[]
  multi_podio: PodioMulti[]
  fora: PodioFora[]
}

export interface GlossarioItem {
  titulo: string
  texto: string
}

export interface Ressalva {
  titulo: string
  texto: string
}

export interface AuditoriaItem {
  titulo: string
  texto: string
}

export interface Proveniencia {
  gerado_em: string
  fonte_verdade: string
  metas: Record<string, number>
  arquivos: string[]
}

export interface PlanoFrontmatter {
  tipo: 'relatorio-analise'
  slug: string
  cliente: { id: string; nome: string }
  canal: string
  nivel: Nivel
  gerado_em: string
  revisor: string
  whatsapp: string
  periodo: Periodo
  comparativo: Periodo
  evidencia: Periodo
  completude: Completude
  investimento: Investimento
  conta: Conta
  acoes: Acao[]
  podios: Podios | null
  glossario: GlossarioItem[]
  ressalvas: Ressalva[]
  auditoria: AuditoriaItem[]
  proveniencia: Proveniencia
}

export interface Plano {
  frontmatter: PlanoFrontmatter
  content: string
}

// --- Estado de revisão (client-side, persistido em localStorage) ---

export type Decisao = 'pendente' | 'aprovado' | 'reprovado'

export interface DecisaoAcao {
  decisao: Decisao
  // Justificativa obrigatória quando reprovado; observação opcional quando aprovado.
  observacao: string
  // Só usado quando a ação é do tipo `decidir`: id da opção escolhida, ou 'nenhuma'.
  opcaoEscolhida: string | null
}

export type EstadoPlano = Record<string, DecisaoAcao>
