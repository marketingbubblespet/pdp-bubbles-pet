// src/lib/relatorio-distribuidor/secoes-texto.ts
// Seções de texto: leitura analítica, linha do tempo, desafios, status do plano anterior,
// páginas, regiões foco, plano do próximo mês e links dos relatórios anteriores.
import { VENDEDORES, type RelatorioDistribuidor, type ResultadoVendedor, type StatusPlano } from './tipos'
import { esc, fmtBRL, fmtInt, nomeMes, rotuloMes, seta } from './format'
import { totaisComercial } from './calculos'
import { aviso, cabecalho } from './secoes-numeros'

export function secaoLeitura(rel: RelatorioDistribuidor): string {
  if (!rel.leituraHtml) return ''
  return `<section class="bloco" id="leitura">${cabecalho('Análise', 'Leitura analítica')}
    <div class="leitura-analitica">${rel.leituraHtml}</div></section>`
}

// Resultado comercial por vendedor. Quem não teve nenhum número no mês sai da tabela e
// aparece só numa observação pequena abaixo dela.
// O que o time comercial precisa enviar todo mês (usado no aviso e no plano).
export const PEDIDO_COMERCIAL = [
  'Por vendedor: quantidade de leads qualificados vindos do tráfego pago',
  'Por vendedor: quantidade de reuniões realizadas com esses leads',
  'Por vendedor: quantidade de fechamentos (novos distribuidores)',
  'Para cada fechamento: nome do distribuidor, cidade/UF, campanha/origem do lead, data da primeira compra e valor do primeiro pedido',
]

// Soma do 1º pedido de um vendedor. `pendente` = faltou valor de algum fechamento.
function primeiroPedido(v: ResultadoVendedor): { total: number; pendente: boolean } {
  const fs = v.fechamentos ?? []
  const total = fs.reduce((s, f) => s + (f.valorPrimeiraCompra ?? 0), 0)
  const pendente = fs.length < v.novosDistribuidores || fs.some((f) => f.valorPrimeiraCompra == null)
  return { total, pendente }
}

function celulaPedido(p: { total: number; pendente: boolean }, novos: number): string {
  if (novos === 0) return '·'
  if (p.pendente && p.total === 0) return '<span class="tag-sem">pendente</span>'
  return `${fmtBRL(p.total)}${p.pendente ? ' <span class="tag-sem">parcial</span>' : ''}`
}

// Tabela compacta (1 linha por fechamento; média de 9 a 10 por mês), com o crédito dos
// dois times: quem fechou (comercial) e de qual campanha o lead veio (marketing).
function tabelaFechamentos(vendedores: ResultadoVendedor[]): string {
  const linhas = vendedores.flatMap((v) => (v.fechamentos ?? []).map((f) => `<tr><td>${esc(f.distribuidor)}</td>`
    + `<td>${esc(f.cidadeUF ?? '·')}</td><td>${esc(v.nome)}</td><td>${esc(f.campanhaOrigem ?? '·')}</td>`
    + `<td>${f.dataPrimeiraCompra ? esc(f.dataPrimeiraCompra) : '<span class="tag-sem">pendente</span>'}</td>`
    + `<td class="num">${f.valorPrimeiraCompra == null ? '<span class="tag-sem">pendente</span>' : fmtBRL(f.valorPrimeiraCompra)}</td></tr>`))
  if (linhas.length === 0) return ''
  return `<div class="tabela-wrap" style="margin-top:14px"><table class="tabela"><caption>Novos distribuidores do mês</caption>
    <thead><tr><th scope="col">Distribuidor</th><th scope="col">Cidade/UF</th><th scope="col">Fechado por</th><th scope="col">Campanha de origem</th><th scope="col">1ª compra</th><th scope="col" class="num">Valor do 1º pedido</th></tr></thead>
    <tbody>${linhas.join('')}</tbody></table></div>`
}

// Leads qualificados sem informação do comercial: "não informado", nunca zero.
const lq = (n: number | null) => (n == null ? '<span class="tag-sem">não informado</span>' : fmtInt(n))

// Sem dados do comercial no mês, a seção fica oculta (não expõe nomes como pendência).
// O que pedir ao comercial fica registrado em PEDIDO_COMERCIAL e na skill do relatório.
export function secaoComercial(rel: RelatorioDistribuidor): string {
  const topo = cabecalho('Time comercial', 'Novos distribuidores', 'Leads qualificados, reuniões, novos distribuidores e valor do primeiro pedido, por vendedor.')
  if (!rel.comercial) return ''
  const porNome = new Map(rel.comercial.map((v) => [v.nome, v]))
  const todos = [...VENDEDORES.map((n) => porNome.get(n) ?? { nome: n, leadsQualificados: null, reunioes: 0, novosDistribuidores: 0 }),
    ...rel.comercial.filter((v) => !(VENDEDORES as readonly string[]).includes(v.nome))]
  const vazio = (v: ResultadoVendedor) => (v.leadsQualificados ?? 0) + v.reunioes + v.novosDistribuidores === 0
  // Ordem alfabética, nunca ranking. Setas só no total do time, nunca por pessoa.
  const alfa = (a: ResultadoVendedor, b: ResultadoVendedor) => a.nome.localeCompare(b.nome, 'pt-BR')
  const comDado = todos.filter((v) => !vazio(v)).sort(alfa)
  const semDado = todos.filter(vazio).sort(alfa).map((v) => v.nome)
  const t = totaisComercial(rel)!
  const ta = totaisComercial(rel.anterior)
  const linhas = comDado.map((v) => `<tr><td>${esc(v.nome)}</td><td class="num">${lq(v.leadsQualificados)}</td>`
    + `<td class="num">${fmtInt(v.reunioes)}</td><td class="num">${fmtInt(v.novosDistribuidores)}</td>`
    + `<td class="num">${celulaPedido(primeiroPedido(v), v.novosDistribuidores)}</td></tr>`).join('')
  const pedidos = comDado.map(primeiroPedido)
  const pedidoTotal = { total: pedidos.reduce((s, p) => s + p.total, 0), pendente: pedidos.some((p, i) => p.pendente && comDado[i].novosDistribuidores > 0) }
  const total = `<tr class="total"><td>Total</td>`
    + `<td class="num">${lq(t.leadsQualificados)} ${seta(t.leadsQualificados, ta?.leadsQualificados, 'maior')}</td>`
    + `<td class="num">${fmtInt(t.reunioes)} ${seta(t.reunioes, ta?.reunioes, 'maior')}</td>`
    + `<td class="num">${fmtInt(t.novosDistribuidores)} ${seta(t.novosDistribuidores, ta?.novosDistribuidores, 'maior')}</td>`
    + `<td class="num">${celulaPedido(pedidoTotal, t.novosDistribuidores)}</td></tr>`
  const obs = semDado.length > 0 ? `<p class="obs-pequena">Sem dados de leads de tráfego no mês: ${semDado.map(esc).join(', ')}.</p>` : ''
  const nota = rel.notaComercial ? `<p class="obs-pequena">${esc(rel.notaComercial)}</p>` : ''
  return `<section class="bloco" id="comercial">${topo}
    <div class="tabela-wrap"><table class="tabela"><thead><tr><th scope="col">Vendedor</th><th scope="col" class="num">Leads qualificados</th>
      <th scope="col" class="num">Reuniões</th><th scope="col" class="num">Novos distribuidores</th><th scope="col" class="num">Valor do 1º pedido</th></tr></thead>
      <tbody>${linhas}${total}</tbody></table></div>${obs}${tabelaFechamentos(comDado)}${nota}</section>`
}

export function secaoTimeline(rel: RelatorioDistribuidor): string {
  if (!rel.timeline) return ''
  const dias = new Date(rel.mes.ano, rel.mes.mes, 0).getDate()
  const pct = (n: number) => `${((n / dias) * 100).toFixed(1)}%`
  const marcos = rel.timeline.marcos.map((m) =>
    `<div class="timeline-marco" style="left:${pct(m.dia - 0.5)}"><div class="ponto"></div><div class="rotulo">${esc(m.rotulo)}</div></div>`).join('')
  const itens = rel.timeline.itens.map((t) => `
    <div class="timeline-rotulo">${esc(t.nome)}</div>
    <div class="timeline-eixo"><div class="timeline-linha${t.encerrada ? ' encerrada' : ''}" style="left:${pct(t.diaInicio - 1)};width:${pct(t.diaFim - t.diaInicio + 1)}"></div></div>
    <div class="timeline-datas">${esc(t.descricao)}</div>`).join('')
  return `<section class="bloco" id="timeline">${cabecalho('Período', 'Linha do tempo das campanhas')}
    <div class="timeline-wrap"><div class="timeline"><div class="timeline-marcos">${marcos}</div>${itens}</div></div></section>`
}

export function secaoDesafios(rel: RelatorioDistribuidor): string {
  if (rel.desafios.length === 0) return ''
  const itens = rel.desafios.map((d) =>
    `<div class="desafio"><span class="icone" aria-hidden="true">⚠️</span><div><h3>${esc(d.titulo)}</h3><p>${esc(d.texto)}</p></div></div>`).join('')
  return `<section class="bloco" id="desafios">${cabecalho('Período', 'Desafios do período')}<div class="desafios">${itens}</div></section>`
}

const ROTULO_STATUS: Record<StatusPlano, string> = {
  implementado: '✅ Implementado',
  andamento: '⏳ Em andamento',
  'nao-implementado': 'Não implementado',
}

const ROTULO_PLACAR: Record<StatusPlano, string> = {
  implementado: 'implementados',
  andamento: 'em andamento',
  'nao-implementado': 'não implementados',
}

export function secaoPlanoAnterior(rel: RelatorioDistribuidor): string {
  const topo = cabecalho('Plano anterior', 'O que foi planejado foi implementado?')
  if (!rel.planoAnterior || rel.planoAnterior.itens.length === 0) {
    return `<section class="bloco" id="plano-anterior">${topo}${aviso('Não há plano anterior registrado para este relatório.')}</section>`
  }
  const { origem, itens } = rel.planoAnterior
  const conta = (s: StatusPlano) => itens.filter((i) => i.status === s).length
  const placar = (['implementado', 'andamento', 'nao-implementado'] as StatusPlano[])
    .filter((s) => conta(s) > 0)
    .map((s) => `<span class="st ${s}">${conta(s)} de ${itens.length} ${ROTULO_PLACAR[s]}</span>`).join('')
  const lista = itens.map((i) => `<li class="status-item"><span class="st ${i.status}">${ROTULO_STATUS[i.status]}</span>
    <div>${esc(i.texto)}${i.nota ? `<span class="nota">${esc(i.nota)}</span>` : ''}</div></li>`).join('')
  return `<section class="bloco" id="plano-anterior">
    ${cabecalho('Plano anterior', 'O que foi planejado foi implementado?', esc(origem))}
    <div class="placar">${placar}</div>
    <ul class="status-lista">${lista}</ul>
  </section>`
}

export function secaoPaginas(rel: RelatorioDistribuidor): string {
  if (rel.paginas.length === 0) return ''
  const itens = rel.paginas.map((p) =>
    `<li><span>${esc(p.nome)}</span><span><a href="${esc(p.url.startsWith('http') ? p.url : `https://${p.url}`)}" target="_blank" rel="noopener noreferrer">${esc(p.url)} ↗</a>${p.selo ? ` <span class="selo">${esc(p.selo)}</span>` : ''}</span></li>`).join('')
  return `<section class="bloco" id="paginas">${cabecalho('Páginas', 'Páginas de captação')}<ul class="links-lista">${itens}</ul></section>`
}

export function secaoRegioesFoco(rel: RelatorioDistribuidor): string {
  if (!rel.regioesFoco) return ''
  const cards = rel.regioesFoco.itens.map((r) =>
    `<div class="regiao-card"><h3>${esc(r.titulo)}</h3><p>${esc(r.texto)}</p></div>`).join('')
  return `<section class="bloco" id="regioes-foco">${cabecalho('Segmentação', 'Campanhas de região foco', rel.regioesFoco.intro)}
    <div class="regioes-grid">${cards}</div></section>`
}

export function secaoPlanoProximo(rel: RelatorioDistribuidor): string {
  const itens = rel.planoProximo.itens.map((i) => {
    if (!i.destaque) return `<li>${esc(i.texto)}</li>`
    const sub = i.subitens ? `<ul>${i.subitens.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''
    return `<li class="item-destaque"><strong>${esc(i.texto)}</strong>${sub}</li>`
  }).join('')
  return `<section class="bloco" id="plano">${cabecalho('Próximo mês', esc(rel.planoProximo.titulo))}<ol class="plano">${itens}</ol></section>`
}

export function secaoRelatoriosAnteriores(rel: RelatorioDistribuidor): string {
  const corpo = rel.relatoriosAnteriores.length > 0
    ? `<ul class="links-lista">${rel.relatoriosAnteriores.map((r) =>
      `<li><span>${esc(r.rotulo)}</span><a href="${esc(r.href)}">Abrir relatório</a></li>`).join('')}</ul>`
    : aviso(`Este é o primeiro relatório mensal de captação de distribuidores. Os relatórios de ${nomeMes(rel.mes)} em diante ficam listados aqui.`)
  return `<section class="bloco" id="anteriores">${cabecalho('Histórico', 'Relatórios anteriores', `Relatórios de captação de distribuidores anteriores a ${rotuloMes(rel.mes)}.`)}${corpo}</section>`
}
