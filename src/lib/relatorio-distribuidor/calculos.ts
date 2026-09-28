// src/lib/relatorio-distribuidor/calculos.ts
// Somas e indicadores derivados. Tudo parte dos volumes brutos de cada campanha
// (investimento, impressões, cliques, leads); CPL, CTR etc. são sempre recalculados daqui.
import type { Campanha, DadosRede, Rede, RelatorioDistribuidor, UF } from './tipos'
import { razao } from './format'
import { REGIAO_UF, REGIOES, type Regiao } from './mapa-brasil'

export interface Totais {
  investimento: number
  impressoes: number
  cliques: number
  leads: number
}

export interface Indicadores {
  cpl: number | null
  ctr: number | null // em %
  cpc: number | null
  cpm: number | null
  conv: number | null // clique → lead, em %
}

export const NOME_REDE: Record<Rede, string> = { meta: 'Meta Ads', google: 'Google Ads' }
export const REDES: Rede[] = ['meta', 'google']

export function somar(itens: Totais[]): Totais {
  return itens.reduce(
    (t, c) => ({
      investimento: t.investimento + c.investimento,
      impressoes: t.impressoes + c.impressoes,
      cliques: t.cliques + c.cliques,
      leads: t.leads + c.leads,
    }),
    { investimento: 0, impressoes: 0, cliques: 0, leads: 0 },
  )
}

export function totaisRede(rede: DadosRede | null | undefined): Totais | null {
  return rede ? somar(rede.campanhas) : null
}

// Consolidado = soma das redes que têm dado no mês. Nenhuma rede com dado: null.
export function totaisConsolidado(rel: RelatorioDistribuidor | null): Totais | null {
  if (!rel) return null
  const comDado = REDES.map((r) => totaisRede(rel.redes[r])).filter((t): t is Totais => t !== null)
  return comDado.length > 0 ? somar(comDado) : null
}

export function indicadores(t: Totais | null): Indicadores {
  const pct = (v: number | null) => (v == null ? null : v * 100)
  return {
    cpl: razao(t?.investimento, t?.leads),
    ctr: pct(razao(t?.cliques, t?.impressoes)),
    cpc: razao(t?.investimento, t?.cliques),
    cpm: t ? razao(t.investimento * 1000, t.impressoes) : null,
    conv: pct(razao(t?.leads, t?.cliques)),
  }
}

export function redesComDado(rel: RelatorioDistribuidor): Rede[] {
  return REDES.filter((r) => rel.redes[r] !== null)
}

// Campanha do mês anterior com o mesmo id (para as setas dos cards de campanha).
export function campanhaAnterior(rel: RelatorioDistribuidor, id: string): Campanha | null {
  if (!rel.anterior) return null
  for (const r of REDES) {
    const achou = rel.anterior.redes[r]?.campanhas.find((c) => c.id === id)
    if (achou) return achou
  }
  return null
}

// --- Funil B2B ---

export interface EtapaFunil {
  chave: 'impressoes' | 'alcance' | 'cliques' | 'leads' | 'leadsQualificados' | 'reunioes' | 'novosDistribuidores'
  rotulo: string
  valor: number | null
}

// Sem `rede`: consolidado. Com `rede`: só a mídia daquela rede; as etapas comerciais ficam
// null, porque o time comercial não separa o resultado por rede de anúncio.
export function etapasFunil(rel: RelatorioDistribuidor | null, rede?: Rede): EtapaFunil[] {
  const t = rede ? totaisRede(rel?.redes[rede]) : totaisConsolidado(rel)
  const fc = rede ? null : rel?.funilComercial
  const com = rede ? null : totaisComercial(rel)
  return [
    { chave: 'impressoes', rotulo: 'Impressões', valor: t?.impressoes ?? null },
    { chave: 'cliques', rotulo: 'Cliques', valor: t?.cliques ?? null },
    { chave: 'leads', rotulo: 'Leads', valor: t?.leads ?? null },
    { chave: 'leadsQualificados', rotulo: 'Leads qualificados', valor: fc?.leadsQualificados ?? com?.leadsQualificados ?? null },
    { chave: 'reunioes', rotulo: 'Reuniões', valor: fc?.reunioes ?? com?.reunioes ?? null },
    { chave: 'novosDistribuidores', rotulo: 'Novos distribuidores', valor: fc?.novosDistribuidores ?? com?.novosDistribuidores ?? null },
  ]
}

// Soma do valor do 1º pedido de todos os fechamentos. Sem nenhum valor informado: null.
export function valorPrimeirosPedidos(rel: RelatorioDistribuidor | null): number | null {
  const valores = (rel?.comercial ?? []).flatMap((v) => v.fechamentos ?? [])
    .map((f) => f.valorPrimeiraCompra).filter((x): x is number => x != null)
  return valores.length ? valores.reduce((s, x) => s + x, 0) : null
}

// Soma do resultado comercial de todos os vendedores. Sem dado do comercial: null.
export function totaisComercial(rel: RelatorioDistribuidor | null) {
  if (!rel?.comercial) return null
  return rel.comercial.reduce(
    (s, v) => ({
      leadsQualificados: s.leadsQualificados + v.leadsQualificados,
      reunioes: s.reunioes + v.reunioes,
      novosDistribuidores: s.novosDistribuidores + v.novosDistribuidores,
    }),
    { leadsQualificados: 0, reunioes: 0, novosDistribuidores: 0 },
  )
}

// --- Mapa ---

export interface MapaImpressoes {
  porUF: Partial<Record<UF, number>>
  total: number
  redes: Rede[] // redes que entraram na soma
}

export function impressoesPorUF(rel: RelatorioDistribuidor | null): MapaImpressoes | null {
  if (!rel) return null
  const porUF: Partial<Record<UF, number>> = {}
  const redes: Rede[] = []
  for (const r of REDES) {
    const dados = rel.redes[r]?.impressoesPorUF
    if (!dados) continue
    redes.push(r)
    for (const [uf, v] of Object.entries(dados) as [UF, number][]) porUF[uf] = (porUF[uf] ?? 0) + v
  }
  if (redes.length === 0) return null
  const total = Object.values(porUF).reduce((s, v) => s + (v ?? 0), 0)
  return { porUF, total, redes }
}

export function porRegiao(mapa: MapaImpressoes): { regiao: Regiao; total: number; share: number }[] {
  const soma = new Map<Regiao, number>(REGIOES.map((r) => [r, 0]))
  for (const [uf, v] of Object.entries(mapa.porUF) as [UF, number][]) {
    soma.set(REGIAO_UF[uf], (soma.get(REGIAO_UF[uf]) ?? 0) + v)
  }
  return REGIOES.map((regiao) => {
    const total = soma.get(regiao) ?? 0
    return { regiao, total, share: mapa.total > 0 ? (total / mapa.total) * 100 : 0 }
  }).sort((a, b) => b.total - a.total)
}

// Classificação por quantil (nível 1 a 4, 0 = sem impressão): cada faixa de cor fica com
// um número parecido de estados. Com escala linear, SP concentraria tudo no tom mais forte
// e o resto do país ficaria da mesma cor.
export function niveisPorQuantil<K extends string>(valores: Partial<Record<K, number>>): Partial<Record<K, number>> {
  const positivos = (Object.entries(valores) as [K, number][]).filter(([, v]) => v > 0).sort((a, b) => a[1] - b[1])
  const niveis: Partial<Record<K, number>> = {}
  positivos.forEach(([uf], i) => {
    niveis[uf] = Math.min(4, Math.floor((i / positivos.length) * 4) + 1)
  })
  return niveis
}
