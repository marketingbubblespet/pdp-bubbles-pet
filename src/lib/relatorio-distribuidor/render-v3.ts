// src/lib/relatorio-distribuidor/render-v3.ts
// Versão 3 do visual do relatório mensal (prévia em /distribuidor-agosto-2026-3).
// Mantém o visual claro e os dados da versão 2 (render.ts, que não muda) e traz conceitos
// do relatório de acompanhamento da Black November (/relatorio-black-november):
// - topo compacto, com navegação por mês e placar de metas (novos distribuidores e novos pedidos);
// - "Visão geral" como primeira seção e "Vai bem, vai mal e atenção" como segunda;
// - funis por frente (Distribuidor Tradicional e Linha Care), somando Meta e Google;
// - ranking de criativos com foto, no padrão da Black;
// - seção "Novas estratégias" (só aparece quando o mês tem alguma);
// - "Definições e fontes" recolhida no fim;
// - seções numeradas e, no celular, barra fixa com o nome da seção que está na tela.
// A opção `estrutura: 'enxuta'` monta a mesma página em 9 seções (prévia em
// /distribuidor-agosto-2026-4), para comparar com as 16 da estrutura completa.
import type { Campanha, Criativo, MesRef, Rede, RelatorioDistribuidor } from './tipos'
import { CSS } from './estilos'
import {
  NOME_REDE, REDES, indicadores, somar, totaisComercial, totaisConsolidado, valorPrimeirosPedidos, type Totais,
} from './calculos'
import { esc, fmtBRL, fmtInt, fmtPct, nomeMes, razao, rotuloMes, seta } from './format'
import { aviso, cabecalho, secaoConsolidado, secaoFunil, secaoRedes } from './secoes-numeros'
import { secaoMapa } from './secoes-mapa'
import {
  secaoComercial, secaoDesafios, secaoLeitura, secaoPaginas, secaoPlanoAnterior, secaoPlanoProximo,
  secaoRegioesFoco, secaoTimeline,
} from './secoes-texto'

// Um mês que tem relatório publicado. A lista é passada pela rota em qualquer ordem: a
// página ordena sozinha, do mais novo ao mais antigo.
export interface MesRelatorio {
  mes: MesRef
  href: string
}

// Estratégia nova apresentada no mês: texto descritivo e, se houver, imagem e lista visual.
export interface NovaEstrategia {
  titulo: string
  texto: string
  etiquetas?: string[]
  itens?: string[]
  imagem?: string
}

// O que falta, de quem e para quando. Sem dono ou prazo informado, a página mostra "a definir".
export interface Pendencia {
  texto: string
  dono?: string
  prazo?: string
}

export interface OpcoesV3 {
  meses: MesRelatorio[]
  // 'completa' (padrão): as 16 seções, uma por assunto (/distribuidor-agosto-2026-3).
  // 'enxuta': 9 seções, juntando as que tratam do mesmo assunto (/distribuidor-agosto-2026-4).
  estrutura?: 'completa' | 'enxuta'
  // Só na estrutura enxuta. Sem lista, a página monta as pendências do que o mês deixou em aberto.
  pendencias?: Pendencia[]
  // Metas mensais (regra do gestor, 27/11/26): 6 novos distribuidores e R$ 70.000 em novos pedidos.
  metaNovosDistribuidores?: number
  metaNovosPedidos?: number
  // Sem nenhuma, a seção não aparece.
  novasEstrategias?: NovaEstrategia[]
  // Foto de cada anúncio, pelo nome sem o sufixo de cópia ou pelo código curto ("ad35").
  // Sem foto, o cartão mostra o espaço reservado até a próxima extração.
  fotosCriativos?: Record<string, string>
}

const META_NOVOS_DISTRIBUIDORES = 6
const META_NOVOS_PEDIDOS = 70000

function maiuscula(texto: string): string {
  return `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`
}

function ordem(m: MesRef): number {
  return m.ano * 12 + m.mes
}

const semAcento = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Links dos meses, com o mês aberto marcado e o mais novo sinalizado.
function linksMeses(rel: RelatorioDistribuidor, meses: MesRelatorio[]): string {
  const lista = [...meses].sort((a, b) => ordem(b.mes) - ordem(a.mes))
  return lista.map((m, i) => {
    const atual = ordem(m.mes) === ordem(rel.mes)
    const rotulo = `${maiuscula(rotuloMes(m.mes))}${i === 0 ? ' · mais novo' : ''}`
    return `<a href="${esc(m.href)}"${atual ? ' class="atual" aria-current="page"' : ''}>${rotulo}</a>`
  }).join('')
}

// --- Placar do topo: duas metas em barra e os indicadores do mês ---

function barraMeta(rotulo: string, valor: number | null, meta: number, fmt: (n: number) => string): string {
  if (valor == null) {
    return `<div class="pt-meta"><div class="pt-linha"><p class="pt-eb">${rotulo}</p><span class="pt-selo pendente">Sem dado</span></div>
      <p class="pt-val"><span class="tag-sem">sem dado</span> <span>meta de ${fmt(meta)}</span></p>
      <div class="pt-barra" role="img" aria-label="Sem dado do time comercial"></div></div>`
  }
  const pct = (valor / meta) * 100
  const batida = valor >= meta
  return `<div class="pt-meta"><div class="pt-linha"><p class="pt-eb">${rotulo}</p>
      <span class="pt-selo ${batida ? 'ok' : 'abaixo'}">${batida ? 'Meta batida' : 'Abaixo da meta'}</span></div>
    <p class="pt-val">${fmt(valor)} <span>de ${fmt(meta)} da meta · ${fmtPct(pct, 0)}</span></p>
    <div class="pt-barra${batida ? ' cheia' : ''}" role="img" aria-label="${fmtPct(pct, 0)} da meta"><i style="width:${Math.min(pct, 100).toFixed(1)}%"></i></div></div>`
}

function placarTopo(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const t = totaisConsolidado(rel)
  const ant = totaisConsolidado(rel.anterior)
  const ind = indicadores(t)
  const indAnt = indicadores(ant)
  const com = totaisComercial(rel)
  const novos = rel.funilComercial.novosDistribuidores ?? com?.novosDistribuidores ?? null
  const pedidos = valorPrimeirosPedidos(rel)
  const custoNovo = razao(t?.investimento, novos)
  // Retorno do 1º pedido: novos pedidos ÷ investimento em mídia (só na estrutura enxuta).
  const retorno = razao(pedidos, t?.investimento)
  const enxuta = op.estrutura === 'enxuta'
  const vezes = (n: number) => `${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}x`
  const semDado = '<span class="tag-sem">sem dado</span>'
  const numero = (rotulo: string, valor: string, badge = '') =>
    `<div class="pt-num"><b>${valor}</b>${badge}<span>${rotulo}</span></div>`
  return `<section class="placar-topo" aria-label="Resumo do mês">
    <div class="pt-metas">
      ${barraMeta('Novos distribuidores no mês', novos, op.metaNovosDistribuidores ?? META_NOVOS_DISTRIBUIDORES, fmtInt)}
      ${barraMeta('Novos pedidos no mês', pedidos, op.metaNovosPedidos ?? META_NOVOS_PEDIDOS, fmtBRL)}
    </div>
    <div class="pt-nums${enxuta ? ' cinco' : ''}">
      ${numero('Investimento', t ? fmtBRL(t.investimento) : semDado, seta(t?.investimento ?? null, ant?.investimento, 'neutro'))}
      ${numero('Leads', t ? fmtInt(t.leads) : semDado, seta(t?.leads ?? null, ant?.leads, 'maior'))}
      ${numero('Custo por lead', ind.cpl == null ? semDado : fmtBRL(ind.cpl), seta(ind.cpl, indAnt.cpl, 'menor'))}
      ${numero('Custo por novo distribuidor', custoNovo == null ? semDado : fmtBRL(custoNovo))}
      ${enxuta ? numero('Retorno do 1º pedido', retorno == null ? semDado : vezes(retorno)) : ''}
    </div>
  </section>`
}

// --- Vai bem, vai mal e atenção ---

interface Sinal {
  texto: string
  num?: string
  fonte: string
}

// Até 3 itens por coluna, todos calculados dos números do relatório (nada escrito à mão).
function sinais(rel: RelatorioDistribuidor, op: OpcoesV3): { bem: Sinal[]; mal: Sinal[]; atencao: Sinal[] } {
  const bem: Sinal[] = []
  const mal: Sinal[] = []
  const atencao: Sinal[] = []
  const fonteMidia = REDES.filter((r) => rel.redes[r]).map((r) => NOME_REDE[r]).join(' e ')
  const mesAnt = rel.anterior ? nomeMes(rel.anterior.mes) : ''

  // Metas do mês: novos distribuidores e novos pedidos.
  const com = totaisComercial(rel)
  const novos = rel.funilComercial.novosDistribuidores ?? com?.novosDistribuidores ?? null
  const pedidos = valorPrimeirosPedidos(rel)
  const metaNovos = op.metaNovosDistribuidores ?? META_NOVOS_DISTRIBUIDORES
  const metaPedidos = op.metaNovosPedidos ?? META_NOVOS_PEDIDOS
  if (novos != null) {
    (novos >= metaNovos ? bem : mal).push({
      texto: `Novos distribuidores ${novos >= metaNovos ? 'na meta ou acima dela' : 'abaixo da meta'} (meta de ${fmtInt(metaNovos)})`,
      num: fmtInt(novos), fonte: 'time comercial',
    })
  }
  if (pedidos != null) {
    (pedidos >= metaPedidos ? bem : mal).push({
      texto: `Novos pedidos ${pedidos >= metaPedidos ? 'na meta ou acima dela' : 'abaixo da meta'} (meta de ${fmtBRL(metaPedidos)})`,
      num: fmtBRL(pedidos), fonte: 'time comercial',
    })
  }

  // Menor e maior custo por lead entre as campanhas com pelo menos 10 leads (com menos que
  // isso, o custo por lead é acaso: 4 leads com R$ 24 não é campanha melhor que 180 leads).
  const campanhas = REDES.flatMap((r: Rede) => (rel.redes[r]?.campanhas ?? [])
    .map((c) => ({ c, rede: r, cpl: indicadores(c).cpl })))
    .filter((x): x is typeof x & { cpl: number } => x.c.leads >= 10 && x.cpl != null)
    .sort((a, b) => a.cpl - b.cpl)
  const melhor = campanhas[0]
  const pior = campanhas.length >= 2 ? campanhas[campanhas.length - 1] : null
  if (melhor) {
    bem.push({ texto: `Menor custo por lead do mês, na campanha ${melhor.c.nome}`, num: fmtBRL(melhor.cpl), fonte: NOME_REDE[melhor.rede] })
  }
  if (melhor && pior) {
    const vezes = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(pior.cpl / melhor.cpl)
    mal.push({ texto: `Maior custo por lead do mês, na campanha ${pior.c.nome} (${vezes} vezes o menor)`, num: fmtBRL(pior.cpl), fonte: NOME_REDE[pior.rede] })
  }

  // Consolidado contra o mês anterior.
  const t = totaisConsolidado(rel)
  const ant = totaisConsolidado(rel.anterior)
  if (t && ant) {
    const cpl = indicadores(t).cpl
    const cplAnt = indicadores(ant).cpl
    if (t.leads !== ant.leads) {
      (t.leads > ant.leads ? bem : mal).push({
        texto: `Leads ${t.leads > ant.leads ? 'subiram' : 'caíram'} contra ${mesAnt} (${fmtInt(ant.leads)})`,
        num: fmtInt(t.leads), fonte: fonteMidia,
      })
    }
    if (cpl != null && cplAnt != null && cpl !== cplAnt) {
      (cpl < cplAnt ? bem : mal).push({
        texto: `Custo por lead consolidado ${cpl < cplAnt ? 'caiu' : 'subiu'} contra ${mesAnt} (${fmtBRL(cplAnt)})`,
        num: fmtBRL(cpl), fonte: fonteMidia,
      })
    }
  }

  // Teto de investimento estourado.
  const teto = rel.tetoMensal ?? 10000
  if (t && t.investimento > teto) {
    mal.push({ texto: `Investimento acima do teto mensal de ${fmtBRL(teto)}`, num: fmtBRL(t.investimento), fonte: fonteMidia })
  }

  // Etapa do funil que o comercial ainda não informa.
  if ((rel.funilComercial.leadsQualificados ?? com?.leadsQualificados ?? null) == null) {
    atencao.push({ texto: 'Leads qualificados ainda sem dado no funil', num: 'sem dado', fonte: 'time comercial' })
  }

  // Desafios registrados no mês e itens do plano anterior que não fecharam.
  for (const d of rel.desafios) atencao.push({ texto: d.titulo, fonte: 'desafios do período' })
  const abertos = rel.planoAnterior?.itens.filter((i) => i.status !== 'implementado').length ?? 0
  if (rel.planoAnterior && abertos > 0) {
    atencao.push({ texto: 'Itens do plano anterior ainda não concluídos', num: `${abertos} de ${rel.planoAnterior.itens.length}`, fonte: 'plano anterior' })
  }

  return { bem: bem.slice(0, 3), mal: mal.slice(0, 3), atencao: atencao.slice(0, 3) }
}

function secaoVaiBemMal(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const s = sinais(rel, op)
  const coluna = (classe: string, titulo: string, itens: Sinal[]) => {
    const lista = itens.length > 0
      ? itens.map((i) => `<li>${esc(i.texto)}${i.num ? `: <span class="num">${i.num}</span>` : ''}<span class="fonte">fonte: ${esc(i.fonte)}</span></li>`).join('')
      : '<li class="vazio">Nada a destacar neste mês.</li>'
    return `<div class="col ${classe}"><h3>${titulo}</h3><ul>${lista}</ul></div>`
  }
  return `<section class="bloco" id="vai-bem-mal">${cabecalho('Resumo', 'Vai bem, vai mal e atenção')}
    <div class="tres">${coluna('bem', '✅ Vai bem', s.bem)}${coluna('mal', '⛔ Vai mal', s.mal)}${coluna('atencao', '⚠️ Atenção', s.atencao)}</div>
    <p class="ressalva">Até 3 itens por coluna, calculados dos números deste relatório.</p></section>`
}

// --- Funis por frente (Distribuidor Tradicional e Linha Care) ---

type Frente = 'tradicional' | 'care' | 'evento'

const NOME_FRENTE: Record<Frente, string> = {
  tradicional: 'Distribuidor Tradicional',
  care: 'Linha Care',
  evento: 'Evento',
}

// Regra de identificação pelo nome da campanha, igual em Meta e Google (as duas contas
// são só de distribuidor):
// - nome com "care" = Linha Care;
// - nome com "pet south", "evento" ou "feira" = campanha temporária de evento, fora dos funis;
// - todo o resto = Distribuidor Tradicional.
function frentePeloNome(texto: string): Frente {
  const nome = semAcento(texto)
  if (/pet[\s_-]*south|evento|feira/.test(nome)) return 'evento'
  if (/(^|[^a-z])care([^a-z]|$)/.test(nome)) return 'care'
  return 'tradicional'
}

function frenteDe(c: Campanha): Frente {
  return frentePeloNome(`${c.id} ${c.nome}`)
}

// Fechamentos de uma frente, pela campanha de origem que o comercial informa. Só divide
// quando todo fechamento do mês veio com a origem; senão devolve null (não chuta a divisão).
function fechamentosDaFrente(rel: RelatorioDistribuidor, frente: Frente): { novos: number; pedidos: number } | null {
  const vendedores = rel.comercial ?? []
  const todos = vendedores.flatMap((v) => v.fechamentos ?? [])
  const esperado = vendedores.reduce((s, v) => s + v.novosDistribuidores, 0)
  if (!rel.comercial || todos.length !== esperado || todos.some((f) => !f.campanhaOrigem)) return null
  const meus = todos.filter((f) => frentePeloNome(f.campanhaOrigem!) === frente)
  return { novos: meus.length, pedidos: meus.reduce((s, f) => s + (f.valorPrimeiraCompra ?? 0), 0) }
}

function campanhasDaFrente(rel: RelatorioDistribuidor | null, frente: Frente): { c: Campanha; rede: Rede }[] {
  if (!rel) return []
  return REDES.flatMap((r) => (rel.redes[r]?.campanhas ?? []).filter((c) => frenteDe(c) === frente).map((c) => ({ c, rede: r })))
}

function cardFrente(rel: RelatorioDistribuidor, frente: Frente, ateFechamento = false): string {
  const itens = campanhasDaFrente(rel, frente)
  if (itens.length === 0) return ''
  // Estrutura enxuta: o funil da frente segue até o distribuidor fechado e mostra as páginas dela.
  const fech = ateFechamento ? fechamentosDaFrente(rel, frente) : null
  const paginas = ateFechamento ? rel.paginas.filter((p) => frentePeloNome(p.nome) === frente) : []
  const t: Totais = somar(itens.map((x) => x.c))
  const antItens = campanhasDaFrente(rel.anterior, frente)
  const ant = antItens.length > 0 ? somar(antItens.map((x) => x.c)) : null
  const i = indicadores(t)
  const ia = indicadores(ant)
  const linha = (rotulo: string, valor: string, extra = '') =>
    `<div class="mini-funil-linha"><span>${rotulo}</span><span class="dir">${valor}${extra}</span></div>`
  const redes = REDES.filter((r) => itens.some((x) => x.rede === r)).map((r) => `<span class="rede-tag">${NOME_REDE[r]}</span>`).join(' ')
  const composicao = itens.map(({ c, rede }) => `<li><span class="status-pill ${c.status.tipo}">${esc(c.status.texto)}</span>
    <span><strong>${esc(c.nome)}</strong> · ${NOME_REDE[rede]} · ${fmtBRL(c.investimento)} · ${fmtInt(c.leads)} leads
    ${c.destaque ? `<span class="frente-obs">${esc(c.destaque)}</span>` : ''}${c.nota ? `<span class="frente-obs">${esc(c.nota)}</span>` : ''}</span></li>`).join('')
  return `<div class="campanha-card">
    <div class="campanha-topo"><div><h3>${NOME_FRENTE[frente]}</h3>${redes}</div></div>
    <div class="mini-funil">
      ${linha('Impressões', fmtInt(t.impressoes), seta(t.impressoes, ant?.impressoes, 'maior'))}
      ${linha('Cliques', fmtInt(t.cliques), (i.ctr == null ? '' : ` <span class="conv">(CTR ${fmtPct(i.ctr)})</span>`) + seta(t.cliques, ant?.cliques, 'maior'))}
      ${linha('Leads', fmtInt(t.leads), (i.conv == null ? '' : ` <span class="conv">(${fmtPct(i.conv)})</span>`) + seta(t.leads, ant?.leads, 'maior'))}
      ${fech ? linha('Novos distribuidores', fmtInt(fech.novos), t.leads > 0 ? ` <span class="conv">(${fmtPct((fech.novos / t.leads) * 100)} dos leads)</span>` : '') : ''}
    </div>
    <div class="campanha-metricas">
      <span>Investimento ${fmtBRL(t.investimento)}</span>
      ${i.cpl == null ? '' : `<span>CPL ${fmtBRL(i.cpl)} ${seta(i.cpl, ia.cpl, 'menor')}</span>`}
      ${i.cpc == null ? '' : `<span>CPC ${fmtBRL(i.cpc)}</span>`}
      ${i.cpm == null ? '' : `<span>CPM ${fmtBRL(i.cpm)}</span>`}
    </div>
    ${fech ? `<div class="campanha-metricas fechamento${fech.novos > 0 ? '' : ' zero'}">
      <span>Custo por novo distribuidor ${fech.novos > 0 ? fmtBRL(t.investimento / fech.novos) : 'sem fechamento no mês'}</span>
      <span>Novos pedidos ${fmtBRL(fech.pedidos)}</span>
      ${fech.novos > 0 && t.investimento > 0 ? `<span>Retorno do 1º pedido ${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(fech.pedidos / t.investimento)}x</span>` : ''}
    </div>` : ''}
    ${paginas.length > 0 ? `<p class="frente-paginas">Páginas: ${paginas.map((p) =>
      `<a href="${esc(p.url.startsWith('http') ? p.url : `https://${p.url}`)}" target="_blank" rel="noopener noreferrer">${esc(p.url)} ↗</a>${p.selo ? ` <span class="selo">${esc(p.selo)}</span>` : ''}`).join(' · ')}</p>` : ''}
    <ul class="frente-campanhas">${composicao}</ul>
  </div>`
}

function secaoFrentes(rel: RelatorioDistribuidor, ateFechamento = false): string {
  const cards = (['tradicional', 'care'] as Frente[]).map((f) => cardFrente(rel, f, ateFechamento)).filter(Boolean)
  if (cards.length === 0) return ''
  const eventos = campanhasDaFrente(rel, 'evento')
  const notaEventos = eventos.length > 0
    ? aviso(`<strong>Fora dos funis por ser campanha temporária de evento:</strong> ${eventos.map(({ c }) =>
      `${esc(c.nome)} (${esc(c.status.texto)}), com ${fmtBRL(c.investimento)} e ${fmtInt(c.leads)} leads`).join('; ')}. `
      + 'Esse investimento e esses leads continuam somados na visão geral.')
    : ''
  const intro = `Cada frente soma as campanhas de Meta Ads e Google Ads.${rel.anterior ? ' As setas comparam a frente com ela mesma no mês anterior.' : ''}`
  return `<section class="bloco" id="campanhas">
    ${cabecalho('Por frente', 'Funis por campanha', intro)}
    <div class="campanhas-grid">${cards.join('')}</div>
    ${notaEventos}
  </section>`
}

// --- Criativos com foto (padrão do relatório da Black) ---

// Nome sem o sufixo de cópia do Gerenciador ("— Cópia", "- Copy", "— Cópia 2"...).
function nomeBase(nome: string): string {
  return nome.replace(/\s*[—–-]\s*(c[óo]pia|copy)(\s*\d+)?\s*$/i, '').trim()
}

type CriativoUnificado = Criativo & { copias: number }

// Cópias do mesmo anúncio viram uma linha só: soma os números e junta os conjuntos.
function unificarCopias(lista: Criativo[]): CriativoUnificado[] {
  const grupos = new Map<string, CriativoUnificado>()
  for (const c of lista) {
    const chave = `${c.rede}|${nomeBase(c.nome)}`
    const g = grupos.get(chave)
    if (!g) { grupos.set(chave, { ...c, nome: nomeBase(c.nome), conjuntos: [...(c.conjuntos ?? [])], copias: 0 }); continue }
    g.investimento += c.investimento
    g.impressoes += c.impressoes
    g.cliques += c.cliques
    g.leads += c.leads
    g.link ??= c.link
    g.copias += 1
    for (const cj of c.conjuntos ?? []) if (!g.conjuntos!.includes(cj)) g.conjuntos!.push(cj)
  }
  return [...grupos.values()]
}

function secaoCriativosFoto(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const topo = cabecalho('Criativos', 'Ranking dos melhores criativos', rel.criterioRanking)
  const criativos = unificarCopias(rel.criativos)
    .filter((c) => c.leads >= 3 && c.impressoes >= 1000)
    .sort((a, b) => b.leads - a.leads)
  if (criativos.length === 0) {
    return `<section class="bloco" id="criativos">${topo}
      ${aviso(`<strong>Não há ranking de criativos referente a ${rotuloMes(rel.mes)}.</strong>`)}</section>`
  }
  let semFoto = 0
  const itens = criativos.map((c, i) => {
    const ind = indicadores(c)
    // Código curto do anúncio (ex.: "ad35") quando o nome segue a nomenclatura da casa.
    const codigo = c.nome.match(/^(ad\d+)\b/i)?.[1]
    // Foto pelo nome completo do anúncio ou, se não houver, pelo código curto (ex.: "ad35").
    const foto = op.fotosCriativos?.[c.nome] ?? (codigo ? op.fotosCriativos?.[codigo.toLowerCase()] : undefined)
    if (!foto) semFoto += 1
    const miniatura = foto
      ? `<img src="${esc(foto)}" alt="Foto do anúncio ${esc(codigo ?? c.nome)}" width="72" height="90" loading="lazy">`
      : '<span class="sem-foto" aria-label="Foto do anúncio ainda não extraída">foto na próxima extração</span>'
    const conjuntos = c.conjuntos?.length
      ? `<span class="m">conjuntos: ${esc(c.conjuntos.join(' · '))}${c.copias ? ` (original e ${c.copias === 1 ? '1 cópia' : `${c.copias} cópias`})` : ''}</span>`
      : ''
    return `<li class="ad"><span class="pos">${i + 1}</span>
      <span class="th">${c.link ? `<a href="${esc(c.link)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir o anúncio">${miniatura}</a>` : miniatura}</span>
      <span class="ad-c"><b>${esc(codigo ?? c.formato)}</b> <span class="t">${codigo ? `${c.formato.toLowerCase()} · ` : ''}${NOME_REDE[c.rede]}</span>
        <span class="m nome">${esc(c.nome)}</span>
        <span class="m">gasto <b>${fmtBRL(c.investimento)}</b>${ind.ctr == null ? '' : ` · CTR ${fmtPct(ind.ctr)}`}</span>
        ${conjuntos}
        ${c.link ? `<a class="ver" href="${esc(c.link)}" target="_blank" rel="noopener noreferrer">Ver anúncio ↗</a>` : ''}</span>
      <span class="ad-v">${fmtInt(c.leads)} leads<small>${ind.cpl == null ? '' : `CPL ${fmtBRL(ind.cpl)}`}</small></span></li>`
  }).join('')
  const nota = semFoto > 0
    ? `<p class="ressalva">${semFoto === criativos.length ? 'As fotos dos anúncios entram' : semFoto === 1 ? 'A foto de 1 anúncio entra' : `As fotos de ${semFoto} anúncios entram`} na próxima extração, que passa a trazer o print de cada criativo.</p>`
    : ''
  return `<section class="bloco" id="criativos">${topo}<ul class="ads">${itens}</ul>${nota}</section>`
}

// --- Novas estratégias ---

function secaoNovasEstrategias(op: OpcoesV3): string {
  const lista = op.novasEstrategias ?? []
  if (lista.length === 0) return ''
  const cards = lista.map((e, i) => `<article class="estrategia${e.imagem ? ' com-imagem' : ''}">
    <div class="estrategia-texto"><span class="estrategia-num">${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(e.titulo)}</h3>
      ${e.etiquetas?.length ? `<div class="estrategia-etiquetas">${e.etiquetas.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
      <p>${esc(e.texto)}</p>
      ${e.itens?.length ? `<ul class="estrategia-itens">${e.itens.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>
    ${e.imagem ? `<img src="${esc(e.imagem)}" alt="" loading="lazy">` : ''}
  </article>`).join('')
  return `<section class="bloco" id="novas-estrategias">${cabecalho('O que vem', 'Novas estratégias', 'O que vamos colocar em prática para captar mais leads e novos distribuidores.')}
    <div class="estrategias">${cards}</div></section>`
}

// --- Definições e fontes (recolhida: abre só no clique) ---

function secaoDefinicoes(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const definicoes: [string, string][] = [
    ['Lead', 'Cadastro de quem quer ser distribuidor, contado pela plataforma de anúncio (Meta Ads ou Google Ads).'],
    ['CPL', 'Custo por lead: investimento ÷ leads.'],
    ['CTR', 'Taxa de cliques: cliques ÷ impressões.'],
    ['CPC', 'Custo por clique: investimento ÷ cliques.'],
    ['CPM', 'Custo por mil impressões: investimento ÷ impressões × 1.000.'],
    ['Clique → lead', 'Leads ÷ cliques. Mostra quanto a página de captação converte.'],
    ['Novo distribuidor', 'Fechamento informado pelo time comercial, contado no mês da primeira nota fiscal de venda.'],
    ['Novos pedidos', 'Soma do valor da primeira compra de cada novo distribuidor do mês.'],
    ['Metas do mês', `${fmtInt(op.metaNovosDistribuidores ?? META_NOVOS_DISTRIBUIDORES)} novos distribuidores e ${fmtBRL(op.metaNovosPedidos ?? META_NOVOS_PEDIDOS)} em novos pedidos.`],
    ['Frente', 'Distribuidor Tradicional ou Linha Care. Campanha com "care" no nome é Linha Care; campanha de evento fica fora dos funis; o resto é Distribuidor Tradicional.'],
    ['▲ ▼', 'Variação contra o mês anterior. Verde é melhora, vermelho é piora e cinza só informa a direção.'],
  ]
  const fontes = [
    rel.redes.meta ? 'Meta Ads: exportações do Gerenciador de Anúncios (campanhas, anúncios e região).' : null,
    rel.redes.google ? 'Google Ads: relatório de campanha.' : null,
    rel.comercial ? 'Reuniões, novos distribuidores e novos pedidos: relatório do time comercial, por vendedor.' : null,
  ].filter((x): x is string => x !== null)
  // Ressalvas já escritas no arquivo de dados do mês (notas de campanha, do funil e do mapa).
  const ressalvas = [
    ...REDES.flatMap((r) => (rel.redes[r]?.campanhas ?? []).filter((c) => c.nota).map((c) => `${c.nome}: ${c.nota!.replace(/^\*\s*/, '')}`)),
    rel.notaFunil, rel.notaComercial, rel.notaMapa,
  ].filter((x): x is string => Boolean(x))
  const lista = (itens: string[]) => `<ul class="fontes">${itens.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
  return `<section class="bloco" id="definicoes">${cabecalho('Apoio', 'Definições e fontes')}
    <details class="recolhido"><summary>Mostrar glossário, fontes e ressalvas</summary>
    <h3 class="sub-bloco">Glossário</h3>
    <dl class="defs">${definicoes.map(([dt, dd]) => `<dt>${dt}</dt><dd>${esc(dd)}</dd>`).join('')}</dl>
    <h3 class="sub-bloco">Fontes de ${nomeMes(rel.mes)}</h3>${lista(fontes)}
    ${ressalvas.length > 0 ? `<h3 class="sub-bloco">Ressalvas de ${nomeMes(rel.mes)}</h3>${lista(ressalvas)}` : ''}
    </details>
  </section>`
}

// --- Estrutura enxuta: 9 seções, juntando as que tratam do mesmo assunto ---

// Tira a casca de uma seção pronta (<section>, linha de contexto, <h2> e, se pedido, a
// introdução) para ela entrar como sub-bloco de outra seção, com um título menor.
function miolo(secao: string, titulo?: string, manterIntro = false): string {
  if (!secao) return ''
  let corpo = secao.trim()
    .replace(/^<section[^>]*>/, '').replace(/<\/section>$/, '')
    .replace(/<span class="eyebrow">[^<]*<\/span>/, '')
    .replace(/<h2>[\s\S]*?<\/h2>/, '')
  if (!manterIntro) corpo = corpo.replace(/<p class="intro">[\s\S]*?<\/p>/, '')
  return `<div class="sub-secao">${titulo ? `<h3 class="sub-titulo">${titulo}</h3>` : ''}${corpo}</div>`
}

// Encaixa sub-blocos no fim de uma seção pronta.
function comSubBlocos(secao: string, ...blocos: string[]): string {
  return secao.trim().replace(/<\/section>$/, `${blocos.join('')}</section>`)
}

// 1 · Visão geral: o consolidado como está (com o filtro por rede), o título já com o
// resultado contra a meta e, abaixo, Meta Ads e Google Ads lado a lado.
function secaoVisaoGeral(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const com = totaisComercial(rel)
  const novos = rel.funilComercial.novosDistribuidores ?? com?.novosDistribuidores ?? null
  const pedidos = valorPrimeirosPedidos(rel)
  const mil = (n: number) => `R$ ${fmtInt(n / 1000)} mil`
  const titulo = novos != null && pedidos != null
    ? `Visão geral: ${fmtInt(novos)} de ${fmtInt(op.metaNovosDistribuidores ?? META_NOVOS_DISTRIBUIDORES)} novos distribuidores e ${mil(pedidos)} de ${mil(op.metaNovosPedidos ?? META_NOVOS_PEDIDOS)} em novos pedidos`
    : 'Visão geral'
  const base = secaoConsolidado(rel).replace(/<h2>[^<]*<\/h2>/, `<h2>${titulo}</h2>`)
  return comSubBlocos(base, miolo(secaoRedes(rel), 'Meta Ads e Google Ads lado a lado'))
}

// 2 · Vai bem, vai mal e atenção, com a leitura analítica do mês logo abaixo.
function secaoResumo(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const leitura = rel.leituraHtml
    ? `<div class="sub-secao"><h3 class="sub-titulo">Leitura do mês</h3><div class="leitura-analitica">${rel.leituraHtml}</div></div>`
    : ''
  return comSubBlocos(secaoVaiBemMal(rel, op), leitura)
}

// 3 · Funil até o novo distribuidor, com o resultado por vendedor.
function secaoFunilCompleto(rel: RelatorioDistribuidor): string {
  return comSubBlocos(secaoFunil(rel), miolo(secaoComercial(rel), 'Resultado por vendedor'))
}

// 7 · O que aconteceu no mês: linha do tempo, desafios e o que foi planejado e implementado.
function secaoMes(rel: RelatorioDistribuidor): string {
  const blocos = [
    miolo(secaoTimeline(rel), 'Linha do tempo das campanhas'),
    miolo(secaoDesafios(rel), 'Desafios do período'),
    miolo(secaoPlanoAnterior(rel), 'O que foi planejado foi implementado?', true),
  ].filter(Boolean)
  if (blocos.length === 0) return ''
  return `<section class="bloco" id="mes">${cabecalho('Período', 'O que aconteceu no mês')}${blocos.join('')}</section>`
}

// Pendências: as informadas pela rota ou, sem elas, o que o mês deixou em aberto.
function pendenciasDoMes(rel: RelatorioDistribuidor, op: OpcoesV3): Pendencia[] {
  if (op.pendencias) return op.pendencias
  const lista: Pendencia[] = []
  const com = totaisComercial(rel)
  if ((rel.funilComercial.leadsQualificados ?? com?.leadsQualificados ?? null) == null) {
    lista.push({ texto: 'Informar os leads qualificados por vendedor, para fechar o funil', dono: 'Time comercial' })
  }
  for (const i of rel.planoAnterior?.itens ?? []) {
    if (i.status !== 'implementado') lista.push({ texto: i.nota ? `${i.texto}: ${i.nota}` : i.texto })
  }
  return lista
}

// 8 · O que vem: novas estratégias, plano do próximo mês e pendências com dono e prazo.
function secaoProximo(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const pend = pendenciasDoMes(rel, op)
  const pendencias = pend.length > 0
    ? `<div class="sub-secao"><h3 class="sub-titulo">Pendências</h3><ul class="pendencias">${pend.map((p) =>
      `<li><span>${esc(p.texto)}</span><span class="pend-meta"><span class="pend-pill${p.dono ? '' : ' vazio'}">Responsável: ${esc(p.dono ?? 'a definir')}</span>`
      + `<span class="pend-pill${p.prazo ? '' : ' vazio'}">Prazo: ${esc(p.prazo ?? 'a definir')}</span></span></li>`).join('')}</ul></div>`
    : ''
  const estrategias = (op.novasEstrategias ?? []).length > 0
    ? miolo(secaoNovasEstrategias(op), 'Novas estratégias')
    : miolo(secaoRegioesFoco(rel), 'Campanhas de região foco')
  return `<section class="bloco" id="proximo">${cabecalho('O que vem', 'Novas estratégias e próximos passos')}
    ${estrategias}${miolo(secaoPlanoProximo(rel), esc(rel.planoProximo.titulo))}${pendencias}</section>`
}

// --- Sumário ---

// Mesma lógica da versão 2 (itens saem do id e do <h2> de cada seção), com os meses acima da lista.
function sumario(rel: RelatorioDistribuidor, meses: MesRelatorio[], secoes: string[]): string {
  const itens = secoes.map((s) => ({
    id: s.match(/<section[^>]*id="([^"]+)"/)?.[1],
    titulo: s.match(/<h2>([^<]+)<\/h2>/)?.[1],
  })).filter((x) => x.id && x.titulo)
  const lista = itens.map((x, i) => `<li><a href="#${x.id}" data-toc-alvo="${x.id}">`
    + `<span class="toc__num">${String(i + 1).padStart(2, '0')}</span><span class="toc__texto">${x.titulo}</span></a></li>`).join('')
  return `<nav class="toc" id="sumario" aria-label="Sumário">
<div class="toc-meses"><small>Meses do relatório</small>${linksMeses(rel, meses)}</div>
<p class="toc__label">Sumário</p><ul class="toc__list">${lista}</ul></nav>
<div class="toc__backdrop" id="toc-backdrop"></div>`
}

const CSS_V3 = `
  /* Margens laterais: topo e conteúdo na mesma largura, com respiro nas laterais que cresce
     com a tela, e a coluna de conteúdo mais estreita, como na versão de setembro. */
  header.topo { padding: 20px clamp(20px, 5vw, 72px) 22px; }
  .topo-conteudo { max-width: 1140px; }
  .pagina { max-width: calc(1140px + 2 * clamp(20px, 5vw, 72px)); padding: 2rem clamp(20px, 5vw, 72px) 0; }
  @media (min-width: 990px) { .pagina { grid-template-columns: 240px minmax(0, 1fr); gap: 3.5rem; } }
  .pagina main { max-width: 860px; }
  /* Coluna mais estreita: os 5 cartões da visão geral cabem numa linha só, e a linha da
     variação quebra em vez de cortar o valor do mês anterior ("setembro: R$ 8.281,81"). */
  .pagina main .kpis:not(.distribuidores) { grid-template-columns: repeat(auto-fit, minmax(148px, 1fr)); }
  .pagina main .kpi .linha { flex-wrap: wrap; white-space: normal; row-gap: 2px; }
  .pagina main .kpi .ant { white-space: normal; }
  .pagina main .kpi .valor { white-space: normal; overflow-wrap: anywhere; }
  .pagina main .kpis.distribuidores .tag-sem { white-space: nowrap; font-size: 0.56rem; }
  /* Funil: o desenho em cima e a tabela embaixo, com a largura toda, para as colunas
     Etapa, mês, mês anterior e Variação não serem cortadas. */
  .pagina main .funil-b2b { grid-template-columns: minmax(0, 1fr); }
  .pagina main .funil-b2b .fb { position: static; max-width: 560px; }
  .pagina main .funil-b2b .tabela td:first-child { min-width: 190px; }

  /* Topo compacto: contexto e título à esquerda, logo menor à direita, meses e placar. */
  .topo-linha { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .topo-conteudo .topo-linha img.logo { width: 126px; margin: 2px 0 0; flex-shrink: 0; }
  header.topo h1 { margin-bottom: 0; }
  header.topo .kicker { display: block; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5c4650; margin-bottom: 4px; }
  .meses { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; }
  .meses small { font-size: 0.75rem; color: #5c4650; }
  .meses a { font-size: 0.78rem; font-weight: 500; color: var(--preto); background: var(--card); border: 1px solid transparent; border-radius: 999px; padding: 5px 14px; text-decoration: none; transition: border-color 150ms; }
  .meses a:hover { border-color: var(--rosa-accent); }
  .meses a.atual { background: var(--preto); color: #fff; font-weight: 600; }
  @media (max-width: 480px) { .topo-conteudo .topo-linha img.logo { width: 96px; } header.topo h1 { font-size: 1.35rem; } }

  /* Placar do topo: duas metas em barra e, abaixo, os indicadores do mês. */
  .placar-topo { background: var(--card); border-radius: 16px; padding: 14px 18px; margin-top: 14px; }
  .pt-metas { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 28px; }
  .pt-linha { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
  .pt-eb { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--rosa-accent); margin: 0; }
  .pt-val { font-size: 1.45rem; font-weight: 600; line-height: 1.25; margin: 2px 0 0; font-variant-numeric: tabular-nums; }
  .pt-val span { font-size: 0.8rem; font-weight: 400; color: var(--texto); }
  .pt-selo { font-size: 0.66rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; border-radius: 999px; padding: 2px 10px; white-space: nowrap; }
  .pt-selo.ok { color: var(--bom-fg); background: var(--bom-bg); border: 1px solid var(--bom-borda); }
  .pt-selo.abaixo { color: var(--ruim-fg); background: var(--ruim-bg); border: 1px solid var(--ruim-borda); }
  .pt-selo.pendente { color: var(--pendente-fg); background: var(--pendente-bg); }
  .pt-barra { height: 10px; background: var(--rosa-fundo); border-radius: 999px; overflow: hidden; margin-top: 8px; }
  .pt-barra i { display: block; height: 100%; background: var(--rosa-accent); border-radius: 999px; }
  .pt-barra.cheia i { background: var(--bom-fg); }
  .pt-nums { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--borda); }
  .pt-num { border-left: 3px solid var(--rosa); padding-left: 10px; min-width: 0; }
  .pt-num b { display: inline-block; font-size: 1.05rem; line-height: 1.3; font-variant-numeric: tabular-nums; margin-right: 6px; }
  .pt-num > span:last-child { display: block; font-size: 0.66rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--texto); margin-top: 2px; }
  @media (max-width: 760px) { .pt-metas { grid-template-columns: 1fr; } .pt-nums { grid-template-columns: repeat(2, minmax(0, 1fr)); } .pt-val { font-size: 1.25rem; } }

  /* Sumário: meses acima da lista. */
  .toc-meses { border: 1px solid var(--borda); background: var(--card); border-radius: 12px; padding: 10px 12px; margin-bottom: 20px; }
  .toc-meses small { display: block; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--texto); margin-bottom: 6px; }
  .toc-meses a { display: block; color: var(--texto); text-decoration: none; padding: 5px 8px; border-radius: 8px; line-height: 1.35; }
  .toc-meses a:hover { color: var(--preto); background: var(--rosa-fundo); }
  .toc-meses a.atual { color: var(--preto); background: var(--rosa); font-weight: 600; }

  /* Seções numeradas. */
  main { counter-reset: secao; }
  main section[id] { counter-increment: secao; }
  main section[id] h2::before {
    content: counter(secao); display: inline-flex; align-items: center; justify-content: center;
    min-width: 1.7em; height: 1.7em; padding: 0 0.35em; margin-right: 0.55em; border-radius: 999px;
    background: var(--rosa); color: var(--preto); font-size: 0.72em; font-weight: 600; vertical-align: 0.12em;
  }
  section.bloco:first-of-type { padding-top: 16px; }

  /* Celular: barra fixa no topo com o botão do sumário e a seção que está na tela. */
  .barra-secao { display: none; }
  @media (max-width: 989px) {
    .barra-secao { display: flex; align-items: center; gap: 12px; position: sticky; top: 0; z-index: 90; background: var(--card); border-bottom: 1px solid var(--borda); padding: 8px 16px; }
    .barra-secao .toc__toggle { position: static; flex-shrink: 0; min-height: 40px; padding: 0.5rem 1rem; box-shadow: none; }
    .barra-secao .secao-atual { font-size: 0.8rem; color: var(--texto); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    section.bloco { scroll-margin-top: 68px; }
  }
  @media print { .barra-secao { display: none !important; } }

  /* Vai bem, vai mal e atenção. */
  .tres { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  @media (max-width: 760px) { .tres { grid-template-columns: 1fr; } }
  .tres .col { background: var(--card); border: 1px solid var(--borda); border-top-width: 4px; border-radius: 14px; padding: 14px 16px; }
  .tres .col.bem { border-top-color: var(--bom-borda); }
  .tres .col.mal { border-top-color: var(--ruim-borda); }
  .tres .col.atencao { border-top-color: var(--atencao-borda); }
  .tres h3 { font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; }
  .tres ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .tres li { font-size: 0.85rem; line-height: 1.45; }
  .tres li.vazio { color: var(--texto); }
  .tres .num { font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tres .fonte { display: block; font-size: 0.72rem; color: var(--texto); }
  .ressalva { font-size: 0.78rem; color: var(--texto); margin: 12px 0 0; }

  /* Funis por frente: lista das campanhas que entram em cada soma. */
  .frente-campanhas { list-style: none; margin: 12px 0 0; padding: 12px 0 0; border-top: 1px solid var(--borda); display: flex; flex-direction: column; gap: 10px; font-size: 0.8rem; }
  .frente-campanhas li { display: flex; gap: 10px; align-items: flex-start; }
  .frente-campanhas strong { font-weight: 600; }
  .frente-obs { display: block; color: var(--texto); font-size: 0.76rem; margin-top: 2px; }
  .campanha-topo .rede-tag { display: inline-block; }
  .campanha-topo .rede-tag + .rede-tag { margin-left: 8px; }

  /* Criativos com foto. */
  ul.ads { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .ad { display: grid; grid-template-columns: 28px 72px minmax(0, 1fr) auto; gap: 14px; align-items: center; background: var(--card); border: 1px solid var(--borda); border-radius: 14px; padding: 12px 16px; }
  .ad .pos { width: 28px; height: 28px; border-radius: 999px; background: var(--rosa); display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 600; }
  .ad .th { display: block; width: 72px; height: 90px; border-radius: 8px; overflow: hidden; background: var(--rosa-fundo); }
  .ad .th a { display: block; width: 100%; height: 100%; }
  .ad .th img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ad .sem-foto { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 6px; text-align: center; font-size: 0.6rem; line-height: 1.3; color: var(--pendente-fg); background: var(--listras); }
  .ad-c { min-width: 0; font-size: 0.85rem; }
  .ad-c > b { font-weight: 600; font-size: 0.95rem; }
  .ad-c .t { color: var(--texto); font-size: 0.8rem; }
  .ad-c .m { display: block; color: var(--texto); font-size: 0.76rem; line-height: 1.45; }
  .ad-c .m b { color: var(--preto); }
  .ad-c .m.nome { font-family: ui-monospace, Consolas, monospace; font-size: 0.7rem; overflow-wrap: anywhere; }
  .ad-c .ver { display: inline-block; font-size: 0.76rem; font-weight: 600; margin-top: 4px; text-decoration: none; }
  .ad-v { text-align: right; font-size: 1.15rem; font-weight: 600; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .ad-v small { display: block; font-size: 0.74rem; font-weight: 400; color: var(--texto); }
  @media (max-width: 640px) {
    .ad { grid-template-columns: 24px 60px minmax(0, 1fr); gap: 10px; }
    .ad .th { width: 60px; height: 75px; }
    .ad-v { grid-column: 3; text-align: left; font-size: 1rem; }
  }
  @media print { .ad { break-inside: avoid; } }

  /* Estrutura enxuta: sub-blocos dentro de uma seção, páginas da frente e pendências. */
  .pt-nums.cinco { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  @media (max-width: 900px) { .pt-nums.cinco { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .sub-secao { margin-top: 28px; padding-top: 22px; border-top: 1px dashed var(--borda); }
  .sub-titulo { font-size: 1.02rem; font-weight: 500; margin-bottom: 12px; }
  .campanha-metricas.fechamento { margin-top: 6px; }
  .campanha-metricas.fechamento span { background: var(--bom-bg); border-color: var(--bom-borda); color: var(--bom-fg); }
  .campanha-metricas.fechamento.zero span { background: var(--pendente-bg); border-color: transparent; color: var(--pendente-fg); }
  .frente-paginas { font-size: 0.78rem; color: var(--texto); margin: 10px 0 0; overflow-wrap: anywhere; }
  .pendencias { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .pendencias li { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px 18px; flex-wrap: wrap; background: var(--card); border: 1px solid var(--borda); border-radius: 14px; padding: 12px 16px; font-size: 0.88rem; }
  .pendencias li > span:first-child { flex: 1 1 320px; }
  .pend-meta { display: flex; gap: 6px; flex-wrap: wrap; }
  .pend-pill { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; border-radius: 999px; padding: 3px 10px; color: var(--bom-fg); background: var(--bom-bg); border: 1px solid var(--bom-borda); white-space: nowrap; }
  .pend-pill.vazio { color: var(--atencao-fg); background: var(--atencao-bg); border-color: var(--atencao-borda); }

  /* Novas estratégias. */
  .estrategias { display: flex; flex-direction: column; gap: 12px; }
  .estrategia { background: var(--card); border: 1px solid var(--borda); border-left: 4px solid var(--rosa-accent); border-radius: 14px; padding: 16px 18px; }
  .estrategia.com-imagem { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 320px); gap: 18px; align-items: center; }
  .estrategia img { width: 100%; height: auto; border-radius: 10px; display: block; }
  .estrategia-num { display: block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; color: var(--rosa-accent); }
  .estrategia h3 { font-size: 1rem; font-weight: 600; margin: 2px 0 6px; }
  .estrategia p { font-size: 0.86rem; color: var(--texto); margin: 8px 0 0; max-width: 72ch; }
  .estrategia-etiquetas { display: flex; flex-wrap: wrap; gap: 6px; }
  .estrategia-etiquetas span { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; color: var(--pendente-fg); background: var(--pendente-bg); border-radius: 999px; padding: 2px 10px; }
  .estrategia-itens { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
  .estrategia-itens li { font-size: 0.78rem; background: var(--rosa-fundo); border: 1px solid var(--rosa); border-radius: 999px; padding: 3px 12px; }
  @media (max-width: 760px) { .estrategia.com-imagem { grid-template-columns: 1fr; } }

  /* Definições e fontes: recolhida, abre no clique. */
  details.recolhido { background: var(--card); border: 1px solid var(--borda); border-radius: 14px; padding: 4px 16px; }
  details.recolhido > summary { cursor: pointer; font-size: 0.88rem; font-weight: 600; padding: 10px 0; }
  details.recolhido[open] { padding-bottom: 16px; }
  details.recolhido .sub-bloco { margin-top: 16px; }
  dl.defs { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 8px 18px; margin: 0; font-size: 0.85rem; }
  dl.defs dt { font-weight: 600; }
  dl.defs dd { margin: 0; color: var(--texto); }
  @media (max-width: 640px) { dl.defs { grid-template-columns: 1fr; gap: 2px 0; } dl.defs dd { margin-bottom: 8px; } }
  ul.fontes { margin: 0; padding-left: 1.2em; font-size: 0.85rem; color: var(--texto); display: flex; flex-direction: column; gap: 6px; }
`

export function renderRelatorioV3(rel: RelatorioDistribuidor, op: OpcoesV3): string {
  const mesTitulo = maiuscula(rotuloMes(rel.mes))
  const titulo = `Relatório de Captação de Distribuidores · ${mesTitulo}`
  const temEstrategias = (op.novasEstrategias ?? []).length > 0
  // Ordem: visão geral, resumo do que vai bem e mal, o detalhe dos números, o que foi feito
  // e, no fim, o que vem a seguir. "Relatórios anteriores" sai porque a navegação por mês
  // cobre esse papel; "Regiões foco" só aparece quando o mês não traz novas estratégias.
  const secoes = (op.estrutura === 'enxuta' ? [
    secaoVisaoGeral(rel, op),
    secaoResumo(rel, op),
    secaoFunilCompleto(rel),
    secaoFrentes(rel, true),
    secaoCriativosFoto(rel, op),
    secaoMapa(rel),
    secaoMes(rel),
    secaoProximo(rel, op),
    secaoDefinicoes(rel, op),
  ] : [
    secaoConsolidado(rel),
    secaoVaiBemMal(rel, op),
    secaoRedes(rel),
    secaoFunil(rel),
    secaoComercial(rel),
    secaoFrentes(rel),
    secaoLeitura(rel),
    secaoMapa(rel),
    secaoCriativosFoto(rel, op),
    secaoTimeline(rel),
    secaoDesafios(rel),
    secaoPlanoAnterior(rel),
    secaoPaginas(rel),
    temEstrategias ? secaoNovasEstrategias(op) : secaoRegioesFoco(rel),
    secaoPlanoProximo(rel),
    secaoDefinicoes(rel, op),
  ]).filter(Boolean)

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(titulo)}</title>
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<style>${CSS}${CSS_V3}</style>
</head>
<body>
<header class="topo">
  <div class="topo-conteudo">
    <div class="topo-linha">
      <div><span class="kicker">Bubbles · Captação de distribuidores · Relatório mensal</span>
      <h1>Relatório de ${rotuloMes(rel.mes)}</h1></div>
      <img class="logo" src="/images/bubbles-logo.svg" alt="Bubbles">
    </div>
    <div class="meses"><small>Meses do relatório:</small>${linksMeses(rel, op.meses)}</div>
    ${placarTopo(rel, op)}
  </div>
</header>
<div class="barra-secao">
  <button type="button" class="toc__toggle" id="toc-toggle" aria-expanded="false" aria-controls="sumario">☰ Sumário</button>
  <span class="secao-atual" id="secao-atual"></span>
</div>
<div class="pagina">
${sumario(rel, op.meses, secoes)}
<main>
${secoes.join('\n')}
</main>
</div>
<footer class="rodape">Relatório de Captação de Distribuidores · <strong>${mesTitulo}</strong></footer>
<button type="button" class="btn-topo" id="btn-topo" aria-label="Voltar ao topo" title="Voltar ao topo">
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</button>
<script>
  // Filtro Consolidado / Meta / Google: mostra só o painel do botão clicado.
  document.querySelectorAll('.filtro-rede').forEach(function (grupo) {
    var secao = grupo.closest('section');
    grupo.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      grupo.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      secao.querySelectorAll('.painel').forEach(function (p) { p.hidden = p.dataset.painel !== b.dataset.painel; });
    });
  });
  // Sumário: destaca a seção que está na tela e, no celular, escreve o nome dela na barra.
  var linksSumario = document.querySelectorAll('.toc__list a');
  var secaoAtual = document.getElementById('secao-atual');
  if ('IntersectionObserver' in window && linksSumario.length) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        linksSumario.forEach(function (a) {
          var ativo = a.dataset.tocAlvo === en.target.id;
          a.classList.toggle('is-active', ativo);
          if (ativo) { a.setAttribute('aria-current', 'true'); secaoAtual.textContent = a.textContent; } else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { obs.observe(s); });
  }
  // Botão "voltar ao topo": só aparece depois de rolar um pouco.
  var btnTopo = document.getElementById('btn-topo');
  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function checarTopo() { btnTopo.classList.toggle('is-visivel', window.scrollY > 600); }
  window.addEventListener('scroll', checarTopo, { passive: true });
  checarTopo();
  btnTopo.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: semMovimento ? 'auto' : 'smooth' }); });
  // Celular: gaveta do sumário (abre no botão, fecha no fundo, no Esc ou ao escolher um item).
  var toc = document.getElementById('sumario'), tocBtn = document.getElementById('toc-toggle'), tocFundo = document.getElementById('toc-backdrop');
  function abrirToc(v) {
    toc.classList.toggle('is-open', v); tocFundo.classList.toggle('is-open', v);
    tocBtn.setAttribute('aria-expanded', String(v));
  }
  tocBtn.addEventListener('click', function () { abrirToc(!toc.classList.contains('is-open')); });
  tocFundo.addEventListener('click', function () { abrirToc(false); });
  linksSumario.forEach(function (a) { a.addEventListener('click', function () { abrirToc(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') abrirToc(false); });
  // Mapa: alterna entre cor por estado e cor por região.
  document.querySelectorAll('.mapa-caixa .alternar').forEach(function (grupo) {
    var caixa = grupo.closest('.mapa-caixa');
    grupo.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      grupo.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      caixa.classList.toggle('modo-regiao', b.dataset.modo === 'regiao');
    });
  });
</script>
</body>
</html>`
}
