// src/lib/relatorio-distribuidor/tipos.ts
// Formato dos dados de um relatório mensal de captação de distribuidores.
// Cada mês é um arquivo próprio (ex: 2026-08.ts) que preenche este formato; o visual é
// gerado a partir dele por render.ts.
//
// Regras do relatório (valem para todo mês):
// - Nunca inventar número: campo sem dado é `null` e a página mostra o aviso de ausência.
// - Rede sem dados no mês (`null`) mostra "Não há dados de <rede> referentes a <mês>".
// - Comparativo com o mês anterior é obrigatório: basta apontar `anterior` para o arquivo
//   do mês passado e as setas de variação aparecem sozinhas. Sem `anterior`, a página
//   avisa que não há comparativo naquele mês.
// - Todo mês registra o status do plano anterior (`planoAnterior`) e o plano do próximo
//   mês (`planoProximo`).

export type Rede = 'meta' | 'google'

export type UF =
  | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA'
  | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO'

export interface MesRef {
  ano: number
  mes: number // 1 a 12
}

export interface Campanha {
  // Mesmo `id` em meses diferentes = mesma campanha (é o que liga o comparativo).
  id: string
  nome: string
  status: { tipo: 'ativa' | 'reduzida' | 'encerrada'; texto: string }
  investimento: number
  impressoes: number
  cliques: number
  leads: number
  destaque?: string
  nota?: string
}

export interface DadosRede {
  campanhas: Campanha[]
  // Impressões por estado (relatório de região do gerenciador). Sem o dado: `null`.
  impressoesPorUF: Partial<Record<UF, number>> | null
}

// Etapas do funil que não saem da mídia paga (vêm do time comercial ou do gerenciador).
export interface FunilComercial {
  alcance: number | null
  leadsQualificados: number | null
  reunioes: number | null
  novosDistribuidores: number | null
}

// Time comercial que recebe os leads de tráfego (ordem de exibição).
export const VENDEDORES = ['Ivan', 'Paulo', 'Claudio', 'Guilherme', 'Thainá'] as const

// Cada novo distribuidor fechado com lead de tráfego.
export interface Fechamento {
  distribuidor: string
  cidadeUF?: string // ex: 'Goiânia/GO'
  dataPrimeiraCompra: string | null // 'DD/MM/AAAA'
  valorPrimeiraCompra: number | null // R$
}

export interface ResultadoVendedor {
  nome: string
  leadsQualificados: number
  reunioes: number
  novosDistribuidores: number
  // Um item por novo distribuidor. Se faltar (ou vier com menos itens que
  // novosDistribuidores), a página marca o valor do 1º pedido como pendente.
  fechamentos?: Fechamento[]
}

export interface Criativo {
  nome: string
  rede: Rede
  formato: 'Vídeo' | 'Imagem' | 'Carrossel'
  investimento: number
  impressoes: number
  cliques: number
  leads: number
  // Link do anúncio/criativo. Sem link ainda: `null` (a página mostra "link aguardando").
  // Link de post do Facebook (facebook.com/.../posts/...) ganha uma prévia incorporada.
  link: string | null
  // Conjuntos de anúncios onde este anúncio rodou. Cópias ("— Cópia") do mesmo anúncio
  // são unificadas na página, somando os números e juntando os conjuntos.
  conjuntos?: string[]
}

export type StatusPlano = 'implementado' | 'andamento' | 'nao-implementado'

export interface ItemPlanoAnterior {
  texto: string
  status: StatusPlano
  nota?: string
}

export interface ItemPlanoProximo {
  texto: string
  subitens?: string[]
  destaque?: boolean
}

export interface ItemTimeline {
  nome: string
  diaInicio: number
  diaFim: number
  encerrada?: boolean
  descricao: string
}

export interface RelatorioDistribuidor {
  mes: MesRef
  periodo: string // ex: '01/08 a 31/08'
  // Quem participa da apresentação. Padrão: 'Equipe de Marketing e Comercial'.
  // Não citar diretoria nem data de apresentação.
  publico?: string
  // Teto de investimento mensal (Meta + Google). Padrão: R$ 10.000. Se o consolidado
  // passar, a página mostra um aviso no topo.
  tetoMensal?: number
  redes: { meta: DadosRede | null; google: DadosRede | null }
  // Explica por que uma rede está sem dados (ex: campanhas ainda não iniciadas).
  motivoSemDados?: Partial<Record<Rede, string>>
  funilComercial: FunilComercial
  notaFunil?: string
  // Resultado enviado pelo time comercial, por vendedor. Ainda não enviado: `null`.
  // Quando preenchido, os totais alimentam o funil B2B automaticamente.
  comercial?: ResultadoVendedor[] | null
  // Explica o recorte do mapa (ex: quais campanhas têm quebra por estado).
  notaMapa?: string
  // Estados fora da segmentação: zero conhecido (≠ sem dado). Os demais estados ausentes
  // dos dados aparecem como "sem dado" no mapa 3D.
  ufsZeroConhecido?: UF[]
  // Impressões sem estado identificado ("Unknown" no export). Ficam fora do mapa.
  impressoesNaoAtribuidas?: number | null
  leituraHtml?: string
  // Ranking na ordem em que aparece (1º primeiro). Vazio: a página avisa que não há ranking.
  criativos: Criativo[]
  criterioRanking?: string
  timeline: { itens: ItemTimeline[]; marcos: { dia: number; rotulo: string }[] } | null
  desafios: { titulo: string; texto: string }[]
  planoAnterior: { origem: string; itens: ItemPlanoAnterior[] } | null
  planoProximo: { titulo: string; itens: ItemPlanoProximo[] }
  paginas: { nome: string; url: string; selo?: string }[]
  regioesFoco: { intro?: string; itens: { titulo: string; texto: string }[] } | null
  relatoriosAnteriores: { rotulo: string; href: string }[]
  // Relatório do mês anterior, para o comparativo. `null` = sem comparativo neste mês.
  anterior: RelatorioDistribuidor | null
}
