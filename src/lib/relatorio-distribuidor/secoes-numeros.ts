// src/lib/relatorio-distribuidor/secoes-numeros.ts
// Seções com números: consolidado, por rede, funil B2B e funis por campanha.
import type { Campanha, Rede, RelatorioDistribuidor } from './tipos'
import {
  NOME_REDE, REDES, campanhaAnterior, etapasFunil, indicadores, redesComDado, totaisConsolidado, totaisRede,
  type EtapaFunil, type Totais,
} from './calculos'
import { esc, fmtBRL, fmtInt, fmtPct, mesAnteriorDe, nomeMes, razao, rotuloMes, seta, type Sentido } from './format'

export function cabecalho(eyebrow: string, titulo: string, intro?: string): string {
  return `<span class="eyebrow">${eyebrow}</span><h2>${titulo}</h2>${intro ? `<p class="intro">${intro}</p>` : ''}`
}

export function aviso(html: string): string {
  return `<div class="aviso"><span aria-hidden="true">ℹ️</span><div>${html}</div></div>`
}

// Cartão de número: valor, seta de variação e, ao lado, o valor do mês anterior em miniatura.
function kpi(
  rotulo: string, atual: number | null, anterior: number | null | undefined,
  fmt: (n: number) => string, sentido: Sentido, mesAnt: string,
): string {
  const badge = seta(atual, anterior, sentido)
  const ant = badge && anterior != null ? `<span class="ant">${mesAnt}: ${fmt(anterior)}</span>` : ''
  return `<div class="kpi"><span class="valor">${atual == null ? '·' : fmt(atual)}</span>`
    + `<div class="linha">${badge}${ant}</div><span class="rotulo">${rotulo}</span></div>`
}

// Bloco de cartões para um recorte (consolidado ou uma rede).
function painelKpis(t: Totais | null, ta: Totais | null, mesAnt: string): string {
  const i = indicadores(t)
  const ia = indicadores(ta)
  const principais = [
    kpi('Investimento', t?.investimento ?? null, ta?.investimento, fmtBRL, 'maior', mesAnt),
    kpi('Impressões', t?.impressoes ?? null, ta?.impressoes, fmtInt, 'maior', mesAnt),
    kpi('Cliques', t?.cliques ?? null, ta?.cliques, fmtInt, 'maior', mesAnt),
    kpi('Leads gerados', t?.leads ?? null, ta?.leads, fmtInt, 'maior', mesAnt),
    kpi('Custo por lead', i.cpl, ia.cpl, fmtBRL, 'menor', mesAnt),
  ]
  const pct = (n: number) => fmtPct(n)
  const secundarios = [
    kpi('CTR', i.ctr, ia.ctr, pct, 'maior', mesAnt),
    kpi('CPC', i.cpc, ia.cpc, fmtBRL, 'menor', mesAnt),
    kpi('CPM', i.cpm, ia.cpm, fmtBRL, 'menor', mesAnt),
    kpi('Clique → lead', i.conv, ia.conv, pct, 'maior', mesAnt),
  ]
  return `<div class="kpis">${principais.join('')}</div><div class="kpis secundarios">${secundarios.join('')}</div>`
}

// --- 1. Consolidado (com filtro por rede) ---

export function secaoConsolidado(rel: RelatorioDistribuidor): string {
  const t = totaisConsolidado(rel)
  if (!t) {
    return `<section class="bloco" id="consolidado">${cabecalho('Visão geral', 'Consolidado · Meta Ads + Google Ads')}
      ${aviso(`Não há dados de mídia paga referentes a ${rotuloMes(rel.mes)}.`)}</section>`
  }
  const mesAnt = nomeMes(rel.anterior ? rel.anterior.mes : mesAnteriorDe(rel.mes))
  const redes = redesComDado(rel)
  const intro = redes.length === REDES.length
    ? 'Soma de todas as campanhas de captação de distribuidores nas duas redes. Use os botões para ver cada rede separada.'
    : `Neste mês só o ${redes.map((r) => NOME_REDE[r]).join(' e ')} tem dados. As demais redes entram na soma assim que tiverem investimento.`

  const paineis = [
    { id: 'todas', nome: 'Consolidado', html: painelKpis(t, totaisConsolidado(rel.anterior), mesAnt) },
    ...REDES.map((r) => ({
      id: r,
      nome: NOME_REDE[r],
      html: rel.redes[r]
        ? painelKpis(totaisRede(rel.redes[r]), rel.anterior ? totaisRede(rel.anterior.redes[r]) : null, mesAnt)
        : aviso(`Não há dados de ${NOME_REDE[r]} referentes a ${rotuloMes(rel.mes)}.`),
    })),
  ]
  const botoes = paineis.map((p, n) =>
    `<button type="button" aria-pressed="${n === 0}" data-painel="${p.id}">${p.nome}</button>`).join('')
  const corpo = paineis.map((p, n) =>
    `<div class="painel" data-painel="${p.id}"${n === 0 ? '' : ' hidden'}>${p.html}</div>`).join('')
  const semComparativo = rel.anterior
    ? ''
    : aviso(`<strong>Sem comparativo neste relatório:</strong> não há dados referentes a ${rotuloMes(mesAnteriorDe(rel.mes))}. `
      + 'A partir do próximo relatório, cada indicador mostra a variação contra o mês anterior (▲ ▼).')

  const teto = rel.tetoMensal ?? 10000
  const acimaDoTeto = t.investimento > teto
    ? `<div class="nota-alerta">⚠️ <strong>Investimento acima do teto mensal:</strong> ${fmtBRL(t.investimento)} no mês, `
      + `${fmtBRL(t.investimento - teto)} acima do teto de ${fmtBRL(teto)}.</div>`
    : ''

  return `<section class="bloco" id="consolidado">
    ${cabecalho('Visão geral', 'Consolidado · Meta Ads + Google Ads', intro)}
    ${acimaDoTeto}
    <div class="alternar filtro-rede" role="group" aria-label="Filtrar por rede" style="margin-bottom:16px">${botoes}</div>
    ${corpo}
    ${semComparativo}
  </section>`
}

// --- 2. Por rede ---

function linhaRede(rotulo: string, valor: string, badge: string): string {
  return `<div class="rede-linha"><span>${rotulo}</span><span class="dir">${valor}${badge}</span></div>`
}

function cardRede(rel: RelatorioDistribuidor, rede: Rede): string {
  const nome = NOME_REDE[rede]
  const dados = rel.redes[rede]
  if (!dados) {
    const motivo = rel.motivoSemDados?.[rede]
    return `<div class="rede-card vazia"><div class="rede-topo"><h3>${nome}</h3></div>
      <p><strong>Não há dados de ${nome} referentes a ${rotuloMes(rel.mes)}.</strong>${motivo ? ` ${esc(motivo)}` : ''}</p></div>`
  }
  const t = totaisRede(dados)!
  const ta = rel.anterior ? totaisRede(rel.anterior.redes[rede]) : null
  const i = indicadores(t)
  const ia = indicadores(ta)
  const total = totaisConsolidado(rel)?.investimento ?? 0
  const share = total > 0 ? `${fmtPct((t.investimento / total) * 100, 0)} do investimento` : ''
  const semAnterior = rel.anterior && !rel.anterior.redes[rede]
    ? `<p style="margin:0;font-size:0.78rem;color:var(--texto)">Sem comparativo: não há dados de ${nome} referentes a ${rotuloMes(rel.anterior.mes)}.</p>`
    : ''
  return `<div class="rede-card">
    <div class="rede-topo"><h3>${nome}</h3><span>${share}</span></div>
    <div class="rede-linhas">
      ${linhaRede('Investimento', fmtBRL(t.investimento), seta(t.investimento, ta?.investimento, 'maior'))}
      ${linhaRede('Impressões', fmtInt(t.impressoes), seta(t.impressoes, ta?.impressoes, 'maior'))}
      ${linhaRede('Cliques', fmtInt(t.cliques), seta(t.cliques, ta?.cliques, 'maior'))}
      ${linhaRede('Leads', fmtInt(t.leads), seta(t.leads, ta?.leads, 'maior'))}
      ${linhaRede('Custo por lead', i.cpl == null ? '·' : fmtBRL(i.cpl), seta(i.cpl, ia.cpl, 'menor'))}
      ${linhaRede('CTR', i.ctr == null ? '·' : fmtPct(i.ctr), seta(i.ctr, ia.ctr, 'maior'))}
    </div>${semAnterior}</div>`
}

export function secaoRedes(rel: RelatorioDistribuidor): string {
  return `<section class="bloco" id="redes">
    ${cabecalho('Por rede', 'Meta Ads e Google Ads', 'O mesmo resultado, separado por rede de anúncio.')}
    <div class="redes-grid">${REDES.map((r) => cardRede(rel, r)).join('')}</div>
  </section>`
}

// --- 3. Funil B2B ---

const LARGURAS = [100, 86, 73, 61, 50, 41, 34, 28]

// Etapa usada como base para a taxa de conversão de cada etapa.
const BASE: Partial<Record<EtapaFunil['chave'], EtapaFunil['chave']>> = {
  cliques: 'impressoes',
  leads: 'cliques',
  leadsQualificados: 'leads',
  reunioes: 'leadsQualificados',
  novosDistribuidores: 'reunioes',
}

function formaFunil(indice: number, temDado: boolean): string {
  const topo = LARGURAS[indice]
  const base = LARGURAS[indice + 1]
  const recuo = ((1 - base / topo) / 2) * 100
  const cor = temDado ? `color-mix(in srgb, var(--rosa-accent) ${100 - indice * 12}%, var(--rosa-fundo))` : 'var(--listras)'
  return `<div class="fb-forma" style="width:${topo}%;background:${cor};clip-path:polygon(0 0,100% 0,${(100 - recuo).toFixed(2)}% 100%,${recuo.toFixed(2)}% 100%)"></div>`
}

function linhaFunil(etapa: EtapaFunil, indice: number, etapas: EtapaFunil[], anteriores: EtapaFunil[], semDado = 'sem dado'): string {
  const valorDe = (lista: EtapaFunil[], chave?: EtapaFunil['chave']) => lista.find((e) => e.chave === chave)?.valor ?? null
  const conv = razao(etapa.valor, valorDe(etapas, BASE[etapa.chave]))
  const numero = etapa.valor == null
    ? `<span class="tag-sem">${semDado}</span>`
    : `<span class="num">${fmtInt(etapa.valor)}</span>${seta(etapa.valor, valorDe(anteriores, etapa.chave), 'maior')}`
  const convTxt = conv == null ? '' : `<span class="nome">${fmtPct(conv * 100)} da etapa anterior</span>`
  return `<div class="fb-linha">${formaFunil(indice, etapa.valor != null)}
    <div class="fb-info"><span class="nome">${etapa.rotulo}</span>${numero}${convTxt}</div></div>`
}

interface LinhaTabela {
  rotulo: string
  atual: number | null
  anterior: number | null
  fmt: (n: number) => string
  sentido: Sentido
  chaves?: EtapaFunil['chave'][]
}

function celula(v: number | null, fmt: (n: number) => string): string {
  return v == null ? '<span class="tag-sem">sem dado</span>' : fmt(v)
}

const ETAPAS_COMERCIAIS: EtapaFunil['chave'][] = ['leadsQualificados', 'reunioes', 'novosDistribuidores']

function linhasTabela(rel: RelatorioDistribuidor, rede?: Rede): { grupo: string; linhas: LinhaTabela[] }[] {
  const v = (r: RelatorioDistribuidor | null) => {
    const e = Object.fromEntries(etapasFunil(r, rede).map((x) => [x.chave, x.valor])) as Record<EtapaFunil['chave'], number | null>
    const t = rede ? totaisRede(r?.redes[rede]) : totaisConsolidado(r)
    return { ...e, investimento: t?.investimento ?? null }
  }
  const a = v(rel)
  const b = rel.anterior ? v(rel.anterior) : null
  const pct = (n: number) => fmtPct(n * 100)
  const taxa = (rotulo: string, num: EtapaFunil['chave'], den: EtapaFunil['chave']): LinhaTabela => ({
    rotulo, atual: razao(a[num], a[den]), anterior: b ? razao(b[num], b[den]) : null, fmt: pct, sentido: 'maior', chaves: [num, den],
  })
  const custo = (rotulo: string, den: EtapaFunil['chave']): LinhaTabela => ({
    rotulo, atual: razao(a.investimento, a[den]), anterior: b ? razao(b.investimento, b[den]) : null, fmt: fmtBRL, sentido: 'menor', chaves: [den],
  })
  // Por rede, só as linhas de mídia: as comerciais não se dividem por rede.
  const soMidia = (ls: LinhaTabela[]) => (rede ? ls.filter((l) => !l.chaves?.some((k) => ETAPAS_COMERCIAIS.includes(k))) : ls)
  return [
    { grupo: 'Conversão entre etapas', linhas: soMidia([
      taxa('Impressões → Cliques (CTR)', 'cliques', 'impressoes'),
      taxa('Cliques → Leads', 'leads', 'cliques'),
      taxa('Leads → Leads qualificados', 'leadsQualificados', 'leads'),
      taxa('Leads qualificados → Reuniões', 'reunioes', 'leadsQualificados'),
      taxa('Reuniões → Novos distribuidores', 'novosDistribuidores', 'reunioes'),
      taxa('Lead → Novo distribuidor (total)', 'novosDistribuidores', 'leads'),
    ]) },
    { grupo: 'Custo por etapa', linhas: soMidia([
      custo('Custo por lead', 'leads'),
      custo('Custo por lead qualificado', 'leadsQualificados'),
      custo('Custo por reunião', 'reunioes'),
      custo('Custo por novo distribuidor', 'novosDistribuidores'),
    ]) },
  ]
}

function tabelaFunil(rel: RelatorioDistribuidor, rede?: Rede): string {
  const comAnterior = rel.anterior !== null
  const colunas = comAnterior ? 4 : 2
  const nomeAnt = rel.anterior ? nomeMes(rel.anterior.mes) : ''
  const cabeca = `<tr><th scope="col">Etapa</th><th scope="col" class="num">${nomeMes(rel.mes)}</th>`
    + (comAnterior ? `<th scope="col" class="num">${nomeAnt}</th><th scope="col" class="num">Variação</th>` : '') + '</tr>'
  const corpo = linhasTabela(rel, rede).map(({ grupo, linhas }) =>
    `<tr class="grupo"><td colspan="${colunas}">${grupo}</td></tr>` + linhas.map((l) =>
      `<tr><td>${l.rotulo}</td><td class="num">${celula(l.atual, l.fmt)}</td>`
      + (comAnterior ? `<td class="num">${celula(l.anterior, l.fmt)}</td><td class="num">${seta(l.atual, l.anterior, l.sentido) || '·'}</td>` : '')
      + '</tr>').join('')).join('')
  return `<div class="tabela-wrap"><table class="tabela"><thead>${cabeca}</thead><tbody>${corpo}</tbody></table></div>`
}

// Corpo do funil (desenho + tabela) para o consolidado ou uma rede.
function corpoFunil(rel: RelatorioDistribuidor, rede?: Rede): string {
  if (rede && !rel.redes[rede]) return aviso(`Não há dados de ${NOME_REDE[rede]} referentes a ${rotuloMes(rel.mes)}.`)
  const etapas = etapasFunil(rel, rede)
  const anteriores = etapasFunil(rel.anterior, rede)
  const linhas = etapas.map((e, i) => linhaFunil(e, i, etapas, anteriores, rede ? 'só no consolidado' : 'sem dado')).join('')
  return `<div class="funil-b2b"><div class="fb">${linhas}</div>${tabelaFunil(rel, rede)}</div>`
}

export function secaoFunil(rel: RelatorioDistribuidor): string {
  const faltando = etapasFunil(rel).filter((e) => e.valor == null).map((e) => e.rotulo)
  const alerta = faltando.length > 0
    ? `<div class="nota-alerta">⚠️ <strong>Etapas sem dado em ${nomeMes(rel.mes)}:</strong> ${faltando.join(', ')}. `
      + `As taxas e custos que dependem delas aparecem como "sem dado".${rel.notaFunil ? ` ${rel.notaFunil}` : ''}</div>`
    : ''
  const paineis = [{ id: 'todas', nome: 'Consolidado' }, ...REDES.map((r) => ({ id: r, nome: NOME_REDE[r] }))]
  const botoes = paineis.map((p, n) => `<button type="button" aria-pressed="${n === 0}" data-painel="${p.id}">${p.nome}</button>`).join('')
  const corpo = paineis.map((p, n) => `<div class="painel" data-painel="${p.id}"${n === 0 ? '' : ' hidden'}>`
    + `${corpoFunil(rel, p.id === 'todas' ? undefined : (p.id as Rede))}</div>`).join('')
  return `<section class="bloco" id="funil">
    ${cabecalho('Funil B2B', 'Da impressão ao novo distribuidor', 'Cada etapa mostra o volume do mês e quanto passou da etapa anterior. Na tabela, as taxas e o custo de cada etapa. Leads qualificados, reuniões e novos distribuidores vêm do time comercial e só existem no consolidado.')}
    <div class="alternar filtro-rede" role="group" aria-label="Filtrar funil por rede" style="margin-bottom:16px">${botoes}</div>
    ${corpo}
    ${alerta}
  </section>`
}

// --- 4. Funis por campanha ---

function cardCampanha(rel: RelatorioDistribuidor, c: Campanha, rede: Rede): string {
  const ant = campanhaAnterior(rel, c.id)
  const i = indicadores(c)
  const ia = indicadores(ant)
  const linha = (rotulo: string, valor: string, extra = '') =>
    `<div class="mini-funil-linha"><span>${rotulo}</span><span class="dir">${valor}${extra}</span></div>`
  return `<div class="campanha-card">
    <div class="campanha-topo"><div><h3>${esc(c.nome)}</h3><span class="rede-tag">${NOME_REDE[rede]}</span></div>
      <span class="status-pill ${c.status.tipo}">${esc(c.status.texto)}</span></div>
    <div class="mini-funil">
      ${linha('Impressões', fmtInt(c.impressoes), seta(c.impressoes, ant?.impressoes, 'maior'))}
      ${linha('Cliques', fmtInt(c.cliques), (i.ctr == null ? '' : ` <span class="conv">(CTR ${fmtPct(i.ctr)})</span>`) + seta(c.cliques, ant?.cliques, 'maior'))}
      ${linha('Leads', fmtInt(c.leads), (i.conv == null ? '' : ` <span class="conv">(${fmtPct(i.conv)})</span>`) + seta(c.leads, ant?.leads, 'maior'))}
    </div>
    <div class="campanha-metricas">
      <span>Investimento ${fmtBRL(c.investimento)}</span>
      ${i.cpl == null ? '' : `<span>CPL ${fmtBRL(i.cpl)} ${seta(i.cpl, ia.cpl, 'menor')}</span>`}
      ${i.cpc == null ? '' : `<span>CPC ${fmtBRL(i.cpc)}</span>`}
      ${i.cpm == null ? '' : `<span>CPM ${fmtBRL(i.cpm)}</span>`}
    </div>
    ${c.destaque ? `<div class="campanha-destaque">${esc(c.destaque)}</div>` : ''}
    ${c.nota ? `<div class="campanha-nota">${esc(c.nota)}</div>` : ''}
  </div>`
}

export function secaoCampanhas(rel: RelatorioDistribuidor): string {
  const cards = REDES.flatMap((r) => (rel.redes[r]?.campanhas ?? []).map((c) => cardCampanha(rel, c, r)))
  if (cards.length === 0) return ''
  const intro = rel.anterior ? 'As setas comparam cada campanha com ela mesma no mês anterior.' : undefined
  return `<section class="bloco" id="campanhas">
    ${cabecalho('Por campanha', 'Funis por campanha', intro)}
    <div class="campanhas-grid">${cards.join('')}</div>
  </section>`
}
