#!/usr/bin/env node
// scripts/gerar-relatorio.mjs
// Gerador determinístico do relatório de mídia paga: lê um .md com frontmatter YAML
// (schema unificado Meta+Google) e escreve um HTML único e autocontido.
// Uso: node scripts/gerar-relatorio.mjs <caminho-do-md> [senha]
//
// Sem framework, sem build, sem IA: mesmo .md de entrada produz o mesmo HTML de saída.
// A única dependência não-nativa é `gray-matter` (já usada em src/lib/planos/fs.ts),
// que por sua vez usa js-yaml internamente — não precisamos adicionar outra lib.

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

// ---------------------------------------------------------------------------
// 1 · Leitura e normalização
// ---------------------------------------------------------------------------

const [, , entradaArg, senhaArg] = process.argv
if (!entradaArg) {
  console.error('Uso: node scripts/gerar-relatorio.mjs <caminho-do-md> [senha]')
  process.exit(1)
}

const entradaPath = path.resolve(entradaArg)
if (!fs.existsSync(entradaPath)) {
  console.error(`Arquivo não encontrado: ${entradaPath}`)
  process.exit(1)
}

// js-yaml (usado pelo gray-matter) converte datas sem aspas em objetos Date. O resto do
// gerador espera sempre string 'AAAA-MM-DD', então normalizamos recursivamente.
function normalizarDatas(valor) {
  if (valor instanceof Date) return valor.toISOString().slice(0, 10)
  if (Array.isArray(valor)) return valor.map(normalizarDatas)
  if (valor !== null && typeof valor === 'object') {
    return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, normalizarDatas(v)]))
  }
  return valor
}

const raw = fs.readFileSync(entradaPath, 'utf8')
const { data } = matter(raw)
const relatorio = normalizarDatas(data)

const SENHA = senhaArg || 'mariane'

// ---------------------------------------------------------------------------
// 2 · Utilitários de formatação (regra 0.1: null vira "—", nunca 0)
// ---------------------------------------------------------------------------

function esc(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function orDash(valor, formatador) {
  if (valor === null || valor === undefined) {
    return '<span class="valor-ausente" title="não informado">—</span>'
  }
  return formatador(valor)
}

function fmtMoney(v) {
  return 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtNum(v, casas = 0) {
  return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })
}

function fmtDateBR(iso) {
  if (!iso) return '—'
  const [y, m, d] = String(iso).split('-')
  if (!y || !m || !d) return esc(iso)
  return `${d}/${m}/${y}`
}

function fmtVariacao(pct) {
  if (pct === null || pct === undefined) return ''
  const seta = pct >= 0 ? '▲' : '▼'
  const cls = pct >= 0 ? 'var-pos' : 'var-neg'
  return `<span class="variacao ${cls}">${seta} ${fmtNum(Math.abs(pct), 1)}%</span>`
}

function slugificar(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ---------------------------------------------------------------------------
// 3 · Configuração dos cinco estados de decisão (PARTE 3.1)
// ---------------------------------------------------------------------------

const ESTADOS_JS = `
const ESTADOS = {
  aplicar:     { rotulo: "Aplicar completamente", cor: "verde",   exige: null },
  parcial:     { rotulo: "Aplicar parcialmente",  cor: "ambar",   exige: "observacao", dica: "O que você vai fazer e o que fica de fora?" },
  nao_aplicar: { rotulo: "Não vou aplicar",       cor: "vermelho",exige: "motivo",     dica: "Por quê? Isto impede a próxima análise de repetir." },
  adiar:       { rotulo: "Adiar",                 cor: "azul",    exige: "quando",     dica: "Para quando, ou esperando o quê?" },
  manter:      { rotulo: "Manter como está",      cor: "cinza",   exige: null },
};
`

// ---------------------------------------------------------------------------
// 4 · Tabela de métricas · ordem fixa (PARTE 4.5)
//
// NOTA · CPS e CPM entraram na tabela a pedido do Caio, mas o schema atual (PARTE 1 do
// prompt) não emite esses campos em `metricas`. Enquanto o publicacao.py não mandar
// `metricas.cps` e `metricas.cpm`, essas duas linhas aparecem como "—" (regra 0.1) — não é
// bug, é a página respeitando "nunca inventar número". Ver PEDIDO-OUTRO-PROJETO.md.
//
// NOTA · a coluna "semana anterior" só aparece quando o item tem pelo menos um
// `metricas.<x>.anterior` — também não existe no schema hoje (só `var_pct`). Calcular o
// valor anterior a partir do `var_pct` violaria a regra 0.1 (nunca inferir um número), por
// isso a coluna fica ausente até o schema trazer o valor bruto.
// ---------------------------------------------------------------------------

const ORDEM_METRICAS = [
  ['investimento', 'Investimento', fmtMoney],
  ['vendas', 'Vendas', (v) => fmtNum(v, 0)],
  ['ticket_medio', 'Ticket médio', fmtMoney],
  ['cps', 'CPS', fmtMoney],
  ['cpm', 'CPM', fmtMoney],
  ['roas_lc', 'ROAS LC', (v) => fmtNum(v, 2)],
  ['roas_fc', 'ROAS FC', (v) => fmtNum(v, 2)],
  ['roas_assist', 'ROAS ASSIST', (v) => fmtNum(v, 2)],
  ['ctr', 'CTR', (v) => fmtNum(v, 2) + '%'],
  ['impressoes', 'Impressões', (v) => fmtNum(v, 0)],
  ['sessoes', 'Sessões', (v) => fmtNum(v, 0)],
  ['connect_rate', 'ConnectRate', (v) => fmtNum(v * 100, 1) + '%'],
]
// Linhas visíveis por padrão; o resto fica atrás do "ver mais indicadores" (compactação
// pedida pelo Caio). CTR é a última linha sempre visível — o toggle mora ali do lado.
const METRICA_CORTE = 'ctr'

// Glossário embutido no gerador: definições de casa que não dependem do relatório da
// semana (ao contrário de `glossario` do frontmatter, que traz nuance específica daquele
// período). Usado só para os ícones de ajuda (ⓘ) ao lado de sigla não óbvia.
const GLOSSARIO_PADRAO = {
  'ROAS LC': 'Último clique · credita ao último canal acessado antes da compra. É a régua de decisão da casa, saudável a partir de 2,0x.',
  'ROAS FC': 'Primeiro clique · credita ao primeiro canal da jornada. Mostra quem traz gente nova, não serve para decidir escala.',
  'ROAS ASSIST': 'Assistida · credita a venda inteira a todos os canais que participaram da jornada. Multiplica, por isso nunca é comparada com a meta — só como razão ASSIST ÷ LC.',
  CTR: 'Cliques ÷ impressões. Mede se o criativo atrai clique.',
  CPM: 'Custo por mil impressões. Sobe com leilão competitivo ou público saturado.',
  CPS: 'Custo por sessão · investimento ÷ sessões no site.',
  ConnectRate: 'Sessões ÷ cliques. Abaixo de ~80% indica página lenta ou link errado. Acima de 100% costuma ser visita de retorno, não erro.',
  'Ticket médio': 'Receita ÷ número de vendas.',
}

function iconeAjuda(rotulo) {
  const def = GLOSSARIO_PADRAO[rotulo]
  if (!def) return ''
  return ` <span class="tooltip" tabindex="0" data-tip="${esc(def)}">ⓘ</span>`
}

let _contadorTabelaMetricas = 0

function metricasTable(metricas) {
  if (!metricas) return ''
  _contadorTabelaMetricas += 1
  const idTabela = `metricas-${_contadorTabelaMetricas}`
  let depoisDoCorte = false
  const linhas = ORDEM_METRICAS.map(([chave, rotulo, formatador]) => {
    const m = metricas[chave] ?? { valor: null, anterior: null, var_pct: null, meta: null }
    const destaque = chave === 'roas_lc' ? ' destaque' : ''
    const linhaOculta = depoisDoCorte
    if (chave === METRICA_CORTE) depoisDoCorte = true
    const meta = m.meta != null ? `<span class="meta-dist"> · meta ${esc(formatador(m.meta))}</span>` : ''
    const anteriorCol = m.anterior != null ? `<td class="col-anterior">${orDash(m.anterior, formatador)}</td>` : ''
    return `<tr class="${destaque.trim()} ${linhaOculta ? 'linha-extra' : ''}" ${linhaOculta ? `data-extra-de="${idTabela}" hidden` : ''}>
      <th scope="row">${esc(rotulo)}${iconeAjuda(rotulo)}</th>
      ${anteriorCol}
      <td>${orDash(m.valor, formatador)}${meta} ${fmtVariacao(m.var_pct)}</td>
    </tr>`
  }).join('')
  const temColunaAnterior = ORDEM_METRICAS.some(([chave]) => metricas[chave]?.anterior != null)
  const cabecalho = temColunaAnterior
    ? `<thead><tr><th scope="col"></th><th scope="col">Semana anterior</th><th scope="col">Semana analisada</th></tr></thead>`
    : ''
  return `<div class="table-wrap">
    <table class="metricas" id="${idTabela}">${cabecalho}<tbody>${linhas}</tbody></table>
    <button type="button" class="ver-mais-indicadores" data-tabela="${idTabela}" aria-expanded="false">Ver mais indicadores ▾</button>
  </div>`
}

// ---------------------------------------------------------------------------
// 5 · Selo de leitura e sustentação (PARTE 4.6 / 4.7)
// ---------------------------------------------------------------------------

const SELO_LEITURA = {
  firme: { emoji: '✅', cls: 'ok', texto: 'veredito firme' },
  direcional: { emoji: '🟡', cls: 'atencao', texto: 'direcional' },
  'sem leitura': { emoji: '⚪', cls: 'neutro', texto: 'sem leitura' },
}

function seloLeitura(evidencia) {
  if (!evidencia) return ''
  const s = SELO_LEITURA[evidencia.leitura] ?? SELO_LEITURA['sem leitura']
  return `<span class="badge badge--${s.cls}">${s.emoji} ${esc(s.texto)}</span>`
}

function notaSemLeitura(evidencia) {
  if (!evidencia || evidencia.leitura !== 'sem leitura') return ''
  return `<p class="nota-sem-leitura">Este item teve ${fmtNum(evidencia.cliques, 0)} cliques ≈ ${fmtNum(evidencia.vendas_esperadas, 2)} venda esperada. Zero vendas aqui é o resultado esperado mesmo para um bom anúncio.</p>`
}

const SUSTENTACAO_NIVEL = {
  sustentado: { emoji: '🟢', texto: 'Sustentado' },
  em_parte: { emoji: '🟡', texto: 'Sustentado em parte' },
  fragil: { emoji: '🟠', texto: 'Sustentação frágil' },
  sem_leitura: { emoji: '⚪', texto: 'Sem leitura' },
  sem_sustentacao: { emoji: '🔴', texto: 'Sem sustentação' },
}

function blocoSustentacao(s) {
  if (!s) return ''
  const nivel = SUSTENTACAO_NIVEL[s.nivel] ?? SUSTENTACAO_NIVEL.sem_leitura
  return `<div class="sustentacao">
    <p><strong>${nivel.emoji} ${esc(nivel.texto)}</strong> · ${esc(s.motivo ?? '')}</p>
    <p class="aviso">Sustentação autoriza <strong>manter</strong>, nunca <strong>escalar</strong>. Item com LC zero não passa de 15% da verba do conjunto.</p>
  </div>`
}

// ---------------------------------------------------------------------------
// 6 · Verba (PARTE 4.4)
// ---------------------------------------------------------------------------

function blocoVerba(verba) {
  if (!verba || verba.sugerida == null || verba.atual == null) return ''
  const aviso = verba.variacao_pct != null && Math.abs(verba.variacao_pct) > 20
    ? `<p class="aviso-verba">⚠️ acima do passo seguro de 20% a cada 48h</p>`
    : ''
  const anterior = verba.anterior != null
    ? `<p class="verba-anterior">na semana passada: ${fmtMoney(verba.anterior)}</p>`
    : ''
  return `<div class="verba-destaque">
    <p class="verba-valores">${fmtMoney(verba.atual)} → <strong>${fmtMoney(verba.sugerida)}</strong> ${fmtVariacao(verba.variacao_pct)}</p>
    ${anterior}
    ${aviso}
  </div>`
}

// ---------------------------------------------------------------------------
// 7 · Item decidível: controles de decisão (PARTE 3)
// ---------------------------------------------------------------------------

// Recebe o item inteiro (não só o id) para poder deixar explícito, junto dos botões,
// exatamente o que cada estado aplica — pedido do Caio: "não ficou claro o que ela tem
// que aplicar".
function controlesDecisao(item) {
  const id = item.id
  const motivoPrincipal = (item.motivos ?? [])[0] ?? null
  return `<div class="decisao" data-item="${esc(id)}">
    <p class="decisao__resumo">
      ${motivoPrincipal ? `<span class="decisao__resumo-linha"><strong>Motivo:</strong> ${esc(motivoPrincipal)}</span>` : ''}
      <span class="decisao__resumo-linha"><strong>Ação sugerida:</strong> ${esc(item.acao ?? '—')}</span>
    </p>
    <div class="decisao__estados" role="radiogroup" aria-label="Como prosseguir">
      ${Object.entries({
        aplicar: 'Aplicar completamente',
        parcial: 'Aplicar parcialmente',
        nao_aplicar: 'Não vou aplicar',
        adiar: 'Adiar',
        manter: 'Manter como está',
      }).map(([chave, rotulo]) => `
        <button type="button" class="btn-estado" data-estado="${chave}" data-item="${esc(id)}" role="radio" aria-checked="false">
          ${esc(rotulo)}
        </button>`).join('')}
    </div>
    <div class="decisao__campo" data-campo-de="${esc(id)}" hidden>
      <label for="campo-${esc(id)}"></label>
      <textarea id="campo-${esc(id)}" rows="2"></textarea>
    </div>
  </div>`
}

// Bolinha que pulsa ao lado do selo de leitura enquanto o item não tem decisão — some
// assim que o usuário escolhe um estado (ver JS: atualizarBotoes esconde/mostra por id).
function pulsoIndicador(id) {
  return `<span class="pulso" data-pulso-de="${esc(id)}" aria-hidden="true"></span>`
}

// ---------------------------------------------------------------------------
// 8 · Motivos, sinais suprimidos, perguntas, histórico
// ---------------------------------------------------------------------------

function blocoTexto(itens, titulo, cls) {
  if (!itens || itens.length === 0) return ''
  return `<details class="${cls}"><summary>${esc(titulo)} (${itens.length})</summary>
    <ul>${itens.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
  </details>`
}

function blocoSinaisSuprimidos(sinais) {
  if (!sinais || sinais.length === 0) return ''
  return `<details class="sinais-suprimidos"><summary>O que NÃO é problema aqui (${sinais.length})</summary>
    <ul>${sinais.map((s) => `<li><strong>${esc(s.sinal)}</strong> · ${esc(s.motivo)}</li>`).join('')}</ul>
  </details>`
}

// ---------------------------------------------------------------------------
// 9 · Árvore campanha → conjunto → anúncio (PARTE 4.3)
// ---------------------------------------------------------------------------

function badgeAcao(item) {
  return `<span class="acao-tag">${esc(item.acao ?? '')}</span>`
}

function badgesContexto(item) {
  const partes = []
  if (item.tipo) partes.push(`<span class="tag">${esc(item.tipo)}</span>`)
  if (item.publico) partes.push(`<span class="tag">${esc(item.publico)}</span>`)
  if (item.situacao) partes.push(`<span class="tag">${esc(item.situacao)}</span>`)
  partes.push(seloLeitura(item.evidencia))
  return partes.join(' ')
}

function renderAnuncio(anuncio) {
  const id = anuncio.id
  return `<details class="no no--anuncio" id="${esc(id)}">
    <summary>
      <span class="no__nome">${esc(anuncio.nome)}</span>
      ${anuncio.novo ? '<span class="tag tag--novo">novo</span>' : ''}
      ${badgeAcao(anuncio)}
      <span class="no__roas">ROAS LC ${orDash(anuncio.metricas?.roas_lc?.valor, (v) => fmtNum(v, 2))}</span>
      ${seloLeitura(anuncio.evidencia)}
      ${pulsoIndicador(id)}
    </summary>
    <div class="no__corpo">
      <p class="no__badges">${badgesContexto(anuncio)}</p>
      ${notaSemLeitura(anuncio.evidencia)}
      ${blocoVerba(anuncio.verba)}
      ${metricasTable(anuncio.metricas)}
      ${blocoTexto(anuncio.motivos, 'Por que esta ação', 'motivos')}
      ${blocoSinaisSuprimidos(anuncio.sinais_suprimidos)}
      ${blocoTexto(anuncio.perguntas, 'Perguntas em aberto', 'perguntas')}
      ${anuncio.expectativa ? `<p class="expectativa"><strong>O que esperamos:</strong> ${esc(anuncio.expectativa)}</p>` : ''}
      ${anuncio.historico ? `<details class="historico"><summary>Histórico</summary><p>${esc(anuncio.historico)}</p></details>` : ''}
      ${controlesDecisao(anuncio)}
    </div>
  </details>`
}

function renderConjunto(conjunto) {
  const id = conjunto.id
  const anuncios = (conjunto.anuncios ?? []).map(renderAnuncio).join('')
  return `<details class="no no--conjunto" id="${esc(id)}">
    <summary>
      <span class="no__nome">${esc(conjunto.nome)}</span>
      ${badgeAcao(conjunto)}
      ${blocoVerba(conjunto.verba) ? `<span class="no__verba-resumo">${fmtMoney(conjunto.verba.atual)} → ${fmtMoney(conjunto.verba.sugerida)}</span>` : ''}
      <span class="no__roas">ROAS LC ${orDash(conjunto.metricas?.roas_lc?.valor, (v) => fmtNum(v, 2))}</span>
      ${seloLeitura(conjunto.evidencia)}
      ${pulsoIndicador(id)}
    </summary>
    <div class="no__corpo">
      <p class="no__badges">${badgesContexto(conjunto)}</p>
      ${notaSemLeitura(conjunto.evidencia)}
      ${blocoSustentacao(conjunto.sustentacao)}
      ${blocoVerba(conjunto.verba)}
      ${metricasTable(conjunto.metricas)}
      ${blocoTexto(conjunto.motivos, 'Por que esta ação', 'motivos')}
      ${blocoSinaisSuprimidos(conjunto.sinais_suprimidos)}
      ${blocoTexto(conjunto.perguntas, 'Perguntas em aberto', 'perguntas')}
      ${conjunto.expectativa ? `<p class="expectativa"><strong>O que esperamos:</strong> ${esc(conjunto.expectativa)}</p>` : ''}
      ${conjunto.historico ? `<details class="historico"><summary>Histórico</summary><p>${esc(conjunto.historico)}</p></details>` : ''}
      ${controlesDecisao(conjunto)}
      ${anuncios ? `<div class="filhos">${anuncios}</div>` : ''}
    </div>
  </details>`
}

// A campanha é só contexto/resumo — os botões de decisão moram nos conjuntos (e nos
// anúncios). Exceção: campanha sem nenhum conjunto cadastrado (estrutura achatada) não
// teria onde decidir, então ela mesma vira o item decidível nesse caso raro.
function renderCampanha(campanha) {
  const id = campanha.id
  const semConjuntos = (campanha.conjuntos ?? []).length === 0
  const conjuntos = (campanha.conjuntos ?? []).map(renderConjunto).join('')
  return `<article class="no no--campanha" id="${esc(id)}">
    <header class="no__cabecalho">
      <h3 class="no__nome">${esc(campanha.nome)}</h3>
      <p class="no__badges">${badgesContexto(campanha)} ${badgeAcao(campanha)} ${semConjuntos ? pulsoIndicador(id) : ''}</p>
      <p class="no__resumo">
        ${orDash(campanha.metricas?.investimento?.valor, fmtMoney)} ·
        ${orDash(campanha.metricas?.vendas?.valor, (v) => fmtNum(v, 0) + ' vendas')} ·
        ROAS LC ${orDash(campanha.metricas?.roas_lc?.valor, (v) => fmtNum(v, 2))} ·
        ${(campanha.conjuntos ?? []).length} conjunto(s)
      </p>
    </header>
    <div class="no__corpo">
      ${notaSemLeitura(campanha.evidencia)}
      ${blocoVerba(campanha.verba)}
      ${metricasTable(campanha.metricas)}
      ${blocoTexto(campanha.motivos, 'Por que esta ação', 'motivos')}
      ${blocoSinaisSuprimidos(campanha.sinais_suprimidos)}
      ${blocoTexto(campanha.perguntas, 'Perguntas em aberto', 'perguntas')}
      ${campanha.expectativa ? `<p class="expectativa"><strong>O que esperamos:</strong> ${esc(campanha.expectativa)}</p>` : ''}
      ${campanha.historico ? `<details class="historico"><summary>Histórico</summary><p>${esc(campanha.historico)}</p></details>` : ''}
      ${semConjuntos ? controlesDecisao(campanha) : ''}
      ${conjuntos ? `<div class="filhos">${conjuntos}</div>` : ''}
    </div>
  </article>`
}

// ---------------------------------------------------------------------------
// 10 · Canal (Meta / Google) — nunca somados (regra 0.3)
// ---------------------------------------------------------------------------

function renderCanal(canal, indiceSecao) {
  const idSecao = `canal-${canal.id}`
  if (!canal.analisado) {
    return `<section class="secao" id="${idSecao}">
      <h2>${String(indiceSecao).padStart(2, '0')} · ${esc(canal.nome)}</h2>
      <p class="canal-ausente"><em>Não entrou nesta análise.</em> ${esc(canal.motivo_ausencia ?? 'Sem dados para este período.')} As campanhas seguem rodando, apenas não foram avaliadas aqui.</p>
    </section>`
  }

  const inv = canal.investimento ?? {}
  const estouraTeto = inv.projecao_mes != null && inv.teto_mensal != null && inv.projecao_mes > inv.teto_mensal
  const campanhas = (canal.campanhas ?? []).map(renderCampanha).join('')

  return `<section class="secao" id="${idSecao}">
    <h2>${String(indiceSecao).padStart(2, '0')} · ${esc(canal.nome)}</h2>
    <p class="canal-investimento">
      Investimento na janela: ${orDash(inv.janela, fmtMoney)} ${fmtVariacao(inv.var_pct)}
      ${inv.projecao_mes != null ? `<span class="pacing ${estouraTeto ? 'pacing--estoura' : ''}">Projeção do mês: ${fmtMoney(inv.projecao_mes)} de ${fmtMoney(inv.teto_mensal)}</span>` : ''}
    </p>
    <div class="campanhas">${campanhas || '<p class="vazio">Nenhuma campanha neste canal.</p>'}</div>
  </section>`
}

// ---------------------------------------------------------------------------
// 11 · Selo de completude (PARTE 4.1)
// ---------------------------------------------------------------------------

const SELO_COMPLETUDE = {
  completa: { cor: 'ok', texto: 'Análise completa' },
  quase: { cor: 'atencao', texto: 'Análise completa, com nota' },
  parcial: { cor: 'reduzir', texto: 'Análise parcial' },
  bloqueada: { cor: 'perigo', texto: 'Análise bloqueada · não decidir por esta página' },
}

function blocoCompletude(completude) {
  if (!completude) return ''
  const s = SELO_COMPLETUDE[completude.selo] ?? SELO_COMPLETUDE.parcial
  const colunas = (completude.colunas_faltando ?? [])
  return `<div class="selo-completude selo-completude--${s.cor}" data-selo="${completude.selo}">
    <p class="selo-completude__texto"><strong>${esc(s.texto)}</strong></p>
    <p class="selo-completude__resumo">${esc(completude.resumo ?? '')}</p>
    ${colunas.length > 0 ? `<details class="colunas-faltando"><summary>O que falta (${colunas.length})</summary>
      <ul>${colunas.map((c) => `<li><strong>${esc(c.nome)}</strong> (${esc(c.camada)}${c.vazia ? ' · vazia' : ''}) · impede: ${esc(c.impede)}. Onde conseguir: ${esc(c.onde)}</li>`).join('')}</ul>
    </details>` : ''}
  </div>`
}

// ---------------------------------------------------------------------------
// 12 · Período e investimento (PARTE 4.2)
// ---------------------------------------------------------------------------

function blocoPeriodo(relatorio) {
  const { periodo, comparativo, evidencia, conta } = relatorio
  return `<div class="periodo-investimento">
    <div class="periodo-grid">
      <div><p class="rotulo">Janela analisada</p><p class="valor">${fmtDateBR(periodo.inicio)} → ${fmtDateBR(periodo.fim)}</p><p class="sub">${esc(periodo.rotulo ?? periodo.dias + ' dias')}</p></div>
      <div><p class="rotulo">Comparada com</p><p class="valor">${fmtDateBR(comparativo.inicio)} → ${fmtDateBR(comparativo.fim)}</p><p class="sub">${comparativo.dias} dias</p></div>
    </div>
    <p class="investimento-total">Investimento total: ${orDash(conta?.investimento_total, fmtMoney)}</p>
    <p class="nota">Hoje não entra: o dia corrente está incompleto e sempre subestima.</p>
    <p class="nota">A decisão olha ${periodo.dias} dias; o volume que sustenta um veredito de conversão vem dos ${evidencia?.dias ?? '—'}.</p>
  </div>`
}

// ---------------------------------------------------------------------------
// 13 · Pódios (PARTE 4.8)
// ---------------------------------------------------------------------------

function renderPodios(podios) {
  if (!podios || !podios.lista || podios.lista.length === 0) return ''
  const categorias = podios.lista.map((cat) => `
    <div class="podio-categoria">
      <h3>${esc(cat.titulo)}</h3>
      <p class="podio-explica">${esc(cat.explica ?? '')}</p>
      <div class="podio-cards">
        ${(cat.colocados ?? []).map((c) => `
          <div class="podio-card">
            <p class="podio-pos">${c.pos}º</p>
            <p class="podio-nome">${esc(c.nome)}${c.novo ? ' <span class="tag tag--novo">novo</span>' : ''}</p>
            <p class="podio-formato">${esc(c.formato)}</p>
            <ul class="podio-metricas">
              <li>Investimento: ${fmtMoney(c.investimento)}</li>
              <li>Impressões: ${fmtNum(c.impressoes, 0)}</li>
              <li>Thumbstop: ${orDash(c.thumbstop, (v) => fmtNum(v, 1) + '%')}</li>
              <li>CTR: ${fmtNum(c.ctr, 2)}%</li>
              <li>ROAS LC: ${fmtNum(c.roas_lc, 2)}</li>
              <li>ROAS FC: ${fmtNum(c.roas_fc, 2)}</li>
              <li>ROAS ASSIST: ${fmtNum(c.roas_assist, 2)}</li>
            </ul>
          </div>`).join('')}
      </div>
    </div>`).join('')

  const multi = (podios.multi_podio ?? []).length > 0
    ? `<div class="multi-podio"><h3>Apareceu em mais de um pódio</h3>
        <ul>${podios.multi_podio.map((m) => `<li><strong>${esc(m.nome)}</strong> · ${(m.podios ?? []).map(esc).join(' · ')}</li>`).join('')}</ul>
      </div>`
    : ''

  const fora = (podios.fora ?? []).length > 0
    ? `<details class="podios-fora"><summary>Fora dos pódios (${podios.fora.length})</summary>
        <p class="nota">Ficar de fora quase sempre é falta de entrega, não falta de resultado.</p>
        <ul>${podios.fora.map((f) => `<li><strong>${esc(f.nome)}</strong> · ${esc(f.motivo)}</li>`).join('')}</ul>
      </details>`
    : ''

  return `<section class="secao" id="podios">
    <h2 data-titulo-sumario>Pódios de criativo</h2>
    ${categorias}
    ${multi}
    ${fora}
  </section>`
}

// ---------------------------------------------------------------------------
// 14 · Hierarquia, conciliação, nomes repetidos (PARTE 4.9)
// ---------------------------------------------------------------------------

function renderDiagnostico(relatorio) {
  const { hierarquia, conciliacao, nomes_repetidos } = relatorio
  const blocoHierarquia = hierarquia
    ? `<details class="hierarquia" ${hierarquia.cobertura < 1 ? 'open' : ''}>
        <summary>Hierarquia da reconstrução</summary>
        <p>Cobertura: ${fmtNum(hierarquia.cobertura * 100, 0)}% · ${fmtNum(hierarquia.dias_unicos, 0)} dias únicos</p>
        <p>${esc(hierarquia.nota ?? '')}</p>
      </details>`
    : ''

  const blocoConciliacao = (conciliacao ?? []).length > 0
    ? `<details class="conciliacao"><summary>Conciliação entre níveis (${conciliacao.length})</summary>
        <ul>${conciliacao.map((c) => c.fecha
          ? `<li class="ok">${esc(c.rotulo_a)} × ${esc(c.rotulo_b)}: fecha.</li>`
          : `<li><strong>${esc(c.rotulo_a)} × ${esc(c.rotulo_b)}</strong>: diferença de ${fmtMoney(c.diferenca)} (${fmtNum(c.diferenca_pct, 1)}%). Causa (${esc(c.confianca)}): ${esc(c.causa)}. ${esc(c.solucao ?? '')}</li>`
        ).join('')}</ul>
      </details>`
    : ''

  const blocoNomes = (nomes_repetidos ?? []).length > 0
    ? `<details class="nomes-repetidos" open><summary>Nomes repetidos entre estruturas (${nomes_repetidos.length})</summary>
        <p class="nota">O sistema não vê a miniatura do criativo e por isso não pode decidir sozinho se é o mesmo arquivo.</p>
        <table><thead><tr><th>Nome</th><th>Onde aparece</th><th>Investido</th></tr></thead><tbody>
          ${nomes_repetidos.map((n) => `<tr><td>${esc(n.nome)}</td><td>${(n.onde ?? []).map(esc).join('<br>')}</td><td>${fmtMoney(n.investido)}</td></tr>`).join('')}
        </tbody></table>
      </details>`
    : ''

  if (!blocoHierarquia && !blocoConciliacao && !blocoNomes) return ''
  return `<section class="secao secao--diagnostico">${blocoHierarquia}${blocoConciliacao}${blocoNomes}</section>`
}

// ---------------------------------------------------------------------------
// 15 · Glossário, ressalvas, auditoria, proveniência (PARTE 4.10 / 4.11)
// ---------------------------------------------------------------------------

const SEVERIDADE = { ok: '🟢', aviso: '🟡', alerta: '🔴' }

// Glossário de casa, completo, que não depende do relatório da semana (definições gerais,
// não os números específicos de cada período — esses continuam vindo só do frontmatter).
// Reunido a partir dos relatórios manuais anteriores desta conta. O glossário do
// frontmatter (`relatorio.glossario`) entra por cima e pode sobrescrever/estender qualquer
// termo daqui.
// Organizado nas mesmas cinco categorias dos relatórios manuais anteriores, pra bater
// com o que o Caio já está acostumado a ler.
const GLOSSARIO_CATEGORIAS = {
  'Modelos de atribuição': [
    { termo: 'ROAS LC · último clique', definicao: 'Credita 100% ao último canal acessado antes da compra, seja pago, orgânico ou direto. É a régua de decisão da casa, saudável a partir de 2,0x.' },
    { termo: 'ROAS FC · primeiro clique', definicao: 'Credita 100% da venda ao primeiro canal da jornada. Mostra quem traz gente nova. Regra da casa: é leitura de topo de funil, não serve para escalar.' },
    { termo: 'ROAS ASSIST · assistida', definicao: 'Credita 100% a todos os canais que participaram da jornada. Multiplica crédito, a soma passa de 100%, então nunca é comparada com a meta. Entra só como razão ASSIST ÷ LC.' },
    { termo: 'ROAS LC pago', definicao: 'Credita ao último canal pago, descartando orgânico e direto. Quando fica bem acima do LC, significa que a venda fechou fora da mídia paga.' },
    { termo: 'ROAS Markov', definicao: 'Simula remover o canal e mede quanto a conversão cai. Mede incrementalidade, não reparte a mesma receita, não é comparável com a meta de ROAS.' },
    { termo: 'ROAS diluído', definicao: 'O ROAS se reparte entre os itens do nível de baixo. Um anúncio com ROAS 0 dentro de um grupo com ROAS 5 não é necessariamente um anúncio ruim, julgar sem olhar o grupo gera pausa indevida.' },
    { termo: 'MER', definicao: 'Receita total da loja ÷ investimento total em mídia. Não depende de atribuição, é o número que decide verba total, enquanto o ROAS decide criativo.' },
  ],
  'Papel na jornada': [
    { termo: 'completo', definicao: 'Abre e fecha, primeiro clique e último clique acima da meta. O mais seguro para receber verba.' },
    { termo: 'fechador', definicao: 'Último clique acima da meta, fecha venda sozinho.' },
    { termo: 'gerador', definicao: 'Último clique abaixo da meta, mas primeiro clique acima. Abre jornada que fecha em outro canal, nunca pausar pelo último clique, e também não escalar por ele.' },
    { termo: 'assistente', definicao: 'Não abre nem fecha, mas participa de muitas jornadas (assistida ≥ 2× o último clique). Regra da casa: assistida sozinha não sustenta investimento.' },
    { termo: 'colhedor', definicao: 'Fecha bem mas quase não abre jornada, esperado em busca de marca e remarketing muito qualificado.' },
    { termo: 'fraco', definicao: 'Abaixo da meta nos três modelos, candidato a pausa, respeitados piso e janela.' },
  ],
  Decisão: [
    { termo: '↑ Escalar', definicao: 'Subir 20% a cada 48h, nunca dobrar de uma vez.' },
    { termo: '→ Manter', definicao: 'Sem gargalo ou sem base para mexer. Não mexer por ansiedade.' },
    { termo: '⚙ Ajustar', definicao: 'Gargalo identificado, um ajuste por vez.' },
    { termo: '↓ Reduzir', definicao: 'Diminuir a verba sem tirar do ar.' },
    { termo: '✕ Pausar', definicao: 'Exige causa raiz registrada e um mínimo de dias/histórico de evidência (varia por conta, ver auditoria do relatório).' },
  ],
  Métricas: [
    { termo: 'CTR', definicao: 'Cliques ÷ impressões. Mede atratividade do criativo.' },
    { termo: 'CPM', definicao: 'Custo por mil impressões. Sobe com leilão competitivo ou público saturado.' },
    { termo: 'CPS', definicao: 'Custo por sessão, investimento ÷ sessões no site.' },
    { termo: 'Ticket Médio', definicao: 'Receita ÷ número de vendas, vem pronto da Nemu por modelo de atribuição.' },
    { termo: 'ConnectRate', definicao: 'Sessões ÷ cliques. Abaixo de ~80% indica página lenta ou link errado. Acima de 100% costuma ser visita de retorno do mesmo usuário, não erro.' },
    { termo: 'Frequência', definicao: 'Vezes que a mesma pessoa viu o anúncio. Limite da casa: 3 em prospecção, 5 em remarketing.' },
  ],
  'Conceitos de leitura': [
    { termo: 'Nomenclatura de ROAS', definicao: 'LC = último clique, FC = primeiro clique, ASSIST = assistida. A sigla é só rótulo de leitura.' },
    { termo: 'Piso de significância', definicao: 'Volume mínimo para a métrica valer: 1.000 impressões para CTR e 50 cliques para conversão. Abaixo disso o número é acaso.' },
    { termo: 'Janela de análise', definicao: 'Hoje nunca entra (dia incompleto). Padrão: os últimos dias com dado, sempre comparados com o mesmo tamanho de janela imediatamente anterior.' },
    { termo: 'Evidência acumulada', definicao: 'Volume somado numa janela maior (normalmente 30 dias) do que a de decisão (normalmente 7), usado para sustentar veredito de conversão quando a janela curta tem poucos cliques.' },
    { termo: 'Thumbstop', definicao: 'Quem viu 3 segundos ÷ quem recebeu a impressão. Mede atenção, a primeira barreira do criativo. Só existe em vídeo. Referência da casa: 30%.' },
    { termo: 'Salvo pela venda', definicao: 'O item bate a meta com um pedido grande e fica abaixo dela sem ele. O ROAS que se repete é o "sem essa venda", não é motivo para escalar em cima de um pedido só.' },
    { termo: 'Pódio de criativo', definicao: 'Ranking de criativo para o time de criação, numa janela de 30 dias, separado por pergunta (gancho, chamada, fechador, abridor, influenciador).' },
    { termo: 'chupim_bom', definicao: 'Domina a verba do conjunto e performa. Pausá-lo custa o melhor anúncio, mas é a única forma de dar chance aos outros acumularem dado.' },
    { termo: 'chupim_ruim', definicao: 'Domina a verba do conjunto e está abaixo da meta, consome entrega e não entrega resultado.' },
    { termo: 'sufocado', definicao: 'Recebeu menos de ~10% da verba do conjunto havendo um item dominante. Não pode ser julgado como fraco, nunca teve chance de provar nada.' },
    { termo: 'Sustentação (ROAS LC zero)', definicao: 'Quando o último clique é zero, a pergunta é se primeiro clique e assistida sustentam a presença do item na jornada. Sustentação autoriza manter, nunca escalar.' },
    { termo: 'Perda por orçamento (Google)', definicao: 'A campanha deixou de aparecer no leilão por falta de verba, pede mais orçamento.' },
    { termo: 'Perda por classificação (Google)', definicao: 'Deixou de aparecer por lance baixo, qualidade fraca do anúncio ou experiência de página ruim, não adianta subir verba.' },
  ],
}

// O glossário do frontmatter entra na categoria "Termos desta semana" — é conhecimento
// específico daquele período, não regra geral de casa (ver PEDIDO-OUTRO-PROJETO.md).
function renderGlossario(glossarioFrontmatter, indice) {
  const categorias = { ...GLOSSARIO_CATEGORIAS }
  if (glossarioFrontmatter && glossarioFrontmatter.length > 0) {
    categorias['Termos desta semana'] = glossarioFrontmatter
  }
  const total = Object.values(categorias).reduce((soma, lista) => soma + lista.length, 0)
  const blocos = Object.entries(categorias).map(([titulo, itens]) => `
    <h3>${esc(titulo)}</h3>
    <dl class="glossario">
      ${itens.map((g) => `<dt id="termo-${slugificar(g.termo)}">${esc(g.termo)}</dt><dd>${esc(g.definicao)}</dd>`).join('')}
    </dl>`).join('')
  return `<section class="secao" id="glossario">
    <h2>${String(indice).padStart(2, '0')} · Glossário</h2>
    <details><summary>Ver termos (${total})</summary>${blocos}</details>
  </section>`
}

function renderRessalvas(ressalvas, indice) {
  if (!ressalvas || ressalvas.length === 0) return ''
  return `<section class="secao" id="ressalvas">
    <h2>${String(indice).padStart(2, '0')} · Ressalvas de dado</h2>
    <div class="ressalvas">
      ${ressalvas.map((r) => `<div class="ressalva"><p class="ressalva__titulo">${esc(r.titulo)}</p><p>${esc(r.texto)}</p></div>`).join('')}
    </div>
  </section>`
}

function renderAuditoria(auditoria, indice) {
  return `<section class="secao" id="auditoria">
    <h2>${String(indice).padStart(2, '0')} · Revisão do relatório</h2>
    <p class="secao-sub">Temos o direito de afirmar isto?</p>
    ${!auditoria || auditoria.length === 0
      ? `<p class="auditoria-ok">🟢 As auditorias passaram sem ressalva.</p>`
      : `<div class="auditoria">${auditoria.map((a) => `<div class="auditoria__item"><p><strong>${SEVERIDADE[a.severidade] ?? ''} ${esc(a.titulo)}</strong></p><p>${esc(a.texto)}</p></div>`).join('')}</div>`}
  </section>`
}

function renderProveniencia(proveniencia) {
  if (!proveniencia) return ''
  return `<details class="proveniencia"><summary>Proveniência · como reproduzir este relatório</summary>
    <table><tbody>
      <tr><th>Gerado em</th><td>${esc(proveniencia.gerado_em)}</td></tr>
      <tr><th>Fonte de verdade</th><td>${esc(proveniencia.fonte_verdade)}</td></tr>
      <tr><th>Metas</th><td>${Object.entries(proveniencia.metas ?? {}).map(([k, v]) => `${esc(k)}: ${esc(v)}`).join(' · ')}</td></tr>
      <tr><th>Arquivos</th><td>${(proveniencia.arquivos ?? []).map(esc).join('<br>')}</td></tr>
    </tbody></table>
  </details>`
}

// ---------------------------------------------------------------------------
// 16 · Sumário (PARTE 2.1) — só campanhas dos dois canais
// ---------------------------------------------------------------------------

function renderSumario(relatorio) {
  const itens = []
  itens.push({ nivel: 1, id: 'resumo-semana', texto: 'Resumo da semana' })

  let indiceCanal = 2
  for (const canal of relatorio.canais ?? []) {
    itens.push({ nivel: 1, id: `canal-${canal.id}`, texto: canal.nome, numero: indiceCanal })
    for (const campanha of canal.campanhas ?? []) {
      itens.push({ nivel: 2, id: campanha.id, texto: campanha.nome })
    }
    indiceCanal++
  }

  const extras = []
  if (relatorio.podios?.lista?.length) extras.push({ id: 'podios', texto: 'Pódios de criativo' })
  if (relatorio.glossario?.length) extras.push({ id: 'glossario', texto: 'Glossário' })
  if (relatorio.ressalvas?.length) extras.push({ id: 'ressalvas', texto: 'Ressalvas de dado' })
  extras.push({ id: 'auditoria', texto: 'Revisão do relatório' })
  extras.push({ id: 'exportar', texto: 'Exportar decisões' })
  for (const e of extras) {
    itens.push({ nivel: 1, id: e.id, texto: e.texto, numero: indiceCanal })
    indiceCanal++
  }

  let contador = 1
  const linhas = itens.map((item) => {
    const numero = item.nivel === 1 ? String(item.numero ?? contador++).padStart(2, '0') : ''
    return `<li class="toc__item toc__item--nivel${item.nivel}">
      <a href="#${esc(item.id)}" data-toc-alvo="${esc(item.id)}">
        ${numero ? `<span class="toc__num">${numero}</span>` : ''}
        <span class="toc__texto">${esc(item.texto)}</span>
        ${item.nivel === 1 ? `<span class="toc__estado" data-toc-estado="${esc(item.id)}"></span>` : ''}
      </a>
    </li>`
  }).join('')

  return `<nav class="toc" id="sumario" aria-label="Sumário">
    <p class="toc__label">Sumário</p>
    <ul class="toc__list">${linhas}</ul>
  </nav>
  <button type="button" class="toc__toggle" id="toc-toggle" aria-expanded="false" aria-controls="sumario">☰ Sumário</button>
  <div class="toc__backdrop" id="toc-backdrop"></div>`
}

// ---------------------------------------------------------------------------
// 17 · Exportação (PARTE 5) — montada inteiramente no cliente, a partir do
// mesmo JSON que populamos abaixo (ITENS_EXPORT), porque depende do estado
// de decisão que só existe no navegador (localStorage).
// ---------------------------------------------------------------------------

function coletarItensParaExport(relatorio) {
  const itens = []
  for (const canal of relatorio.canais ?? []) {
    if (!canal.analisado) continue
    for (const campanha of canal.campanhas ?? []) {
      // A campanha só decide sozinha quando não tem conjunto nenhum (ver renderCampanha) —
      // do contrário quem decide são os conjuntos/anúncios dela.
      if ((campanha.conjuntos ?? []).length === 0) {
        itens.push({ id: campanha.id, nivel: 'campanha', canal: canal.nome, campanha: campanha.nome, nome: campanha.nome, acao: campanha.acao, verba: campanha.verba, motivos: campanha.motivos })
      }
      for (const conjunto of campanha.conjuntos ?? []) {
        itens.push({ id: conjunto.id, nivel: 'conjunto', canal: canal.nome, campanha: campanha.nome, nome: conjunto.nome, acao: conjunto.acao, verba: conjunto.verba, motivos: conjunto.motivos })
        for (const anuncio of conjunto.anuncios ?? []) {
          itens.push({ id: anuncio.id, nivel: 'anuncio', canal: canal.nome, campanha: campanha.nome, nome: anuncio.nome, acao: anuncio.acao, verba: anuncio.verba, motivos: anuncio.motivos })
        }
      }
    }
  }
  return itens
}

// ---------------------------------------------------------------------------
// 18 · CSS (PARTE 6) — paleta Bubbles cheia
// ---------------------------------------------------------------------------

const CSS = `
:root{
  --bubbles-magenta:#FF0080;
  --bubbles-magenta-fundo:#CC0066;
  --bubbles-rosa:#F4CDD4;
  --bubbles-preto:#0F0C0D;
  --bubbles-cinza-claro:#F7F7F7;
  --bubbles-branco:#FFFFFF;
  --cinza-medio:#666666;
  --borda:#E5E7EB;

  --ok:#1B7F4B;
  --manter:#2563EB;
  --atencao:#B45309;
  --reduzir:var(--bubbles-magenta-fundo);
  --perigo:#B91C1C;
  --neutro:#6B7280;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{margin:0;background:var(--bubbles-cinza-claro);color:var(--bubbles-preto);
  font-family:'Work Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{margin:0 0 .6em;font-weight:500;font-family:'Libre Baskerville',Georgia,serif}
h3,h4{font-family:inherit;font-weight:600}
p{margin:0 0 1rem}
a{color:var(--bubbles-preto)}
strong{font-weight:600}
:focus-visible{outline:2px solid var(--bubbles-magenta);outline-offset:2px;border-radius:4px}
.valor-ausente{color:var(--neutro);cursor:help;border-bottom:1px dotted var(--neutro)}

/* Gate de senha */
#gate{position:fixed;inset:0;z-index:999;display:flex;align-items:center;justify-content:center;
  background:var(--bubbles-preto);padding:1.5rem;transition:opacity .4s ease,visibility .4s ease}
#gate.is-open{opacity:0;visibility:hidden;pointer-events:none}
.gate__box{width:100%;max-width:360px;text-align:center}
.gate__title{color:#fff;font-size:1.25rem;margin-bottom:.4rem}
.gate__sub{font-size:.875rem;color:rgba(255,255,255,.72);margin-bottom:2rem}
.gate__field{display:flex;gap:.5rem}
#gate-input{flex:1;min-width:0;font-size:1rem;padding:.75rem 1rem;border:1.5px solid rgba(255,255,255,.25);
  border-radius:10px;background:#fff}
.gate__btn{font-weight:600;font-size:.9375rem;color:var(--bubbles-preto);background:#fff;border:0;
  border-radius:999px;padding:.75rem 1.5rem;cursor:pointer}
.gate__btn:hover{background:var(--bubbles-rosa)}
.gate__hint{margin-top:1rem;font-size:.8125rem;color:rgba(255,255,255,.5)}
.gate__error{min-height:1.4rem;margin-top:.5rem;font-size:.8125rem;color:rgba(255,255,255,.7)}

/* Aviso desktop */
#aviso-desktop{background:var(--bubbles-rosa);color:var(--bubbles-preto);padding:.75rem 1.25rem;
  font-size:.875rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
#aviso-desktop button{border:0;background:transparent;font-size:1.1rem;cursor:pointer}
#aviso-desktop[hidden]{display:none}

#shell{opacity:0;transition:opacity .5s ease}
#shell.is-revealed{opacity:1}

/* Progresso */
#progresso{position:sticky;bottom:0;z-index:80;background:#fff;border-top:1px solid var(--borda);
  padding:.75rem 1.25rem;display:flex;align-items:center;gap:1rem;font-size:.8125rem}
#progresso .barra{flex:1;height:6px;background:var(--borda);border-radius:99px;overflow:hidden}
#progresso .barra__fill{height:100%;background:var(--bubbles-magenta);width:0%;transition:width .2s ease}
#progresso button{white-space:nowrap;border:0;border-radius:999px;padding:.6rem 1.2rem;font-weight:600;
  background:var(--bubbles-preto);color:#fff;cursor:pointer}

/* Cabeçalho / capa */
.cover{background:var(--bubbles-preto);color:#fff;padding:3rem 1.25rem}
.cover__inner{max-width:1280px;margin:0 auto}
.cover__eyebrow{display:inline-block;font-size:.6875rem;font-weight:600;text-transform:uppercase;
  letter-spacing:.1em;background:rgba(255,255,255,.14);border-radius:999px;padding:.3rem .875rem;margin-bottom:1.2rem}
.cover__title{font-size:clamp(1.75rem,4vw,2.5rem);color:#fff;margin:0 0 .5rem}
.cover__sub{color:rgba(255,255,255,.75);font-size:.9375rem;max-width:44ch}
.cover__meta{display:flex;flex-wrap:wrap;gap:2rem;padding-top:1.5rem;margin-top:1.5rem;
  border-top:1px solid rgba(255,255,255,.18)}
.cover__meta div{min-width:150px}
.cover__meta dt{font-size:.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;
  color:rgba(255,255,255,.55);margin-bottom:.35rem}
.cover__meta dd{margin:0;font-size:.9375rem;color:#fff}

/* Layout */
.layout{max-width:1280px;margin:0 auto;padding:2rem 1.25rem 4rem}
@media(min-width:990px){.layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:3rem;align-items:start}}

/* Sumário */
.toc{font-size:.875rem}
@media(min-width:990px){.toc{position:sticky;top:1.5rem;max-height:calc(100vh - 3rem);overflow-y:auto}}
.toc__label{font-size:.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;
  color:var(--cinza-medio);margin-bottom:1rem}
.toc__list{list-style:none;margin:0;padding:0}
.toc__list a{display:flex;align-items:baseline;gap:.5rem;padding:.5rem 0 .5rem .9rem;
  color:var(--cinza-medio);border-left:4px solid transparent;text-decoration:none;line-height:1.35}
.toc__item--nivel2 a{padding-left:1.8rem;font-size:.8125rem}
.toc__item--nivel2 .toc__texto{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.toc__list a:hover{color:var(--bubbles-preto)}
.toc__list a.is-active{color:var(--bubbles-preto);border-left-color:var(--bubbles-magenta);font-weight:500}
.toc__num{color:rgba(15,12,13,.35);font-variant-numeric:tabular-nums}
.toc__estado{margin-left:auto;font-size:.7rem}
.toc__toggle{position:fixed;left:1rem;bottom:5rem;z-index:90;display:none;align-items:center;gap:.5rem;
  min-height:44px;padding:.7rem 1.15rem;font-size:.8125rem;font-weight:600;color:#fff;
  background:var(--bubbles-preto);border:0;border-radius:999px;cursor:pointer}
.toc__backdrop{position:fixed;inset:0;z-index:95;background:rgba(15,12,13,.4);opacity:0;visibility:hidden;
  transition:opacity .25s ease,visibility .25s ease}
.toc__backdrop.is-open{opacity:1;visibility:visible}
@media(max-width:989px){
  .toc{position:fixed;top:0;left:0;bottom:0;width:min(310px,86vw);z-index:96;background:#fff;
    padding:2rem 1.5rem;overflow-y:auto;transform:translateX(-101%);transition:transform .35s ease}
  .toc.is-open{transform:translateX(0)}
  .toc__toggle{display:inline-flex}
}

/* Seções e nós */
.secao{margin-bottom:3rem;scroll-margin-top:1.5rem}
.secao h2{scroll-margin-top:1.5rem}
.secao-sub{color:var(--cinza-medio);font-size:.875rem;margin-top:-.5rem}
.canal-ausente{background:#fff;border:1px solid var(--borda);border-radius:16px;padding:1.25rem}
.canal-investimento{font-size:.9375rem;color:var(--cinza-medio);display:flex;flex-wrap:wrap;gap:1rem;align-items:center}
.pacing{background:var(--bubbles-rosa);border-radius:999px;padding:.2rem .7rem;font-size:.8125rem}
.pacing--estoura{background:var(--perigo);color:#fff}

.campanhas{display:flex;flex-direction:column;gap:1rem;margin-top:1.5rem}
.no{background:#fff;border:1px solid var(--borda);border-radius:16px;padding:1.25rem;overflow-wrap:break-word}
.no--campanha{padding:1.5rem}
.no__cabecalho h3{font-size:1.125rem;margin-bottom:.4rem}
.no__badges{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0}
.no__resumo{font-size:.875rem;color:var(--cinza-medio)}
.no--conjunto,.no--anuncio{padding:0}
.no--conjunto summary,.no--anuncio summary{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem;
  padding:.9rem 1.1rem;cursor:pointer;list-style:none;font-size:.9375rem}
.no--conjunto summary::-webkit-details-marker,.no--anuncio summary::-webkit-details-marker{display:none}
.no--conjunto summary::before,.no--anuncio summary::before{content:'▸';color:var(--cinza-medio)}
details[open]>summary::before{content:'▾'}
.no__nome{font-weight:500;flex:1;min-width:200px}
.no__roas{font-size:.8125rem;color:var(--cinza-medio)}
.no__verba-resumo{font-size:.8125rem;color:var(--bubbles-magenta-fundo);font-weight:600}
.no__corpo{padding:0 1.1rem 1.1rem}
.no--campanha>.no__corpo{padding:0}
.filhos{display:flex;flex-direction:column;gap:.6rem;margin-top:1rem}
.filhos .no{border-radius:12px}

.tag{display:inline-block;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.03em;
  background:var(--bubbles-cinza-claro);color:var(--cinza-medio);border-radius:6px;padding:.15rem .5rem}
.tag--novo{background:var(--manter);color:#fff}
.acao-tag{font-size:.8125rem;font-weight:600;color:var(--bubbles-preto)}
.badge{display:inline-block;font-size:.75rem;font-weight:600;border-radius:999px;padding:.15rem .6rem}
.badge--ok{background:#DCFCE7;color:var(--ok)}
.badge--atencao{background:#FEF3C7;color:var(--atencao)}
.badge--neutro{background:#F3F4F6;color:var(--neutro)}
.nota-sem-leitura,.nota{font-size:.8125rem;color:var(--cinza-medio);background:var(--bubbles-cinza-claro);
  border-radius:10px;padding:.6rem .9rem;margin:.6rem 0}
.tooltip{cursor:help;border-bottom:1px dotted currentColor}

.verba-destaque{background:var(--bubbles-rosa);border-radius:12px;padding:.8rem 1rem;margin:.8rem 0}
.verba-valores{font-size:1.05rem;font-weight:600;margin:0}
.verba-anterior{font-size:.8125rem;color:var(--cinza-medio);margin:.2rem 0 0}
.aviso-verba{font-size:.8125rem;color:var(--reduzir);margin:.2rem 0 0}
.variacao{font-size:.8125rem;font-weight:600}
.var-pos{color:var(--ok)}
.var-neg{color:var(--perigo)}

.table-wrap{overflow-x:auto;margin:.8rem 0}
table.metricas{width:100%;border-collapse:collapse;font-size:.875rem}
table.metricas thead th{text-align:right;font-size:.7rem;text-transform:uppercase;letter-spacing:.04em;
  color:var(--cinza-medio);padding:.3rem .6rem}
table.metricas thead th:first-child{text-align:left}
table.metricas th{text-align:left;font-weight:500;color:var(--cinza-medio);padding:.45rem .6rem;
  border-bottom:1px solid var(--borda);white-space:nowrap}
table.metricas td{padding:.45rem .6rem;border-bottom:1px solid var(--borda);text-align:right}
table.metricas td.col-anterior{color:var(--cinza-medio)}
table.metricas tbody tr:nth-child(even){background:var(--bubbles-cinza-claro)}
table.metricas tr.destaque th,table.metricas tr.destaque td{font-weight:700;color:var(--bubbles-preto)}
.meta-dist{color:var(--cinza-medio);font-size:.8125rem}
.ver-mais-indicadores{display:block;margin:.4rem 0 0;border:0;background:transparent;color:var(--bubbles-magenta-fundo);
  font-size:.8125rem;font-weight:600;cursor:pointer;padding:.4rem 0}
@media(max-width:600px){
  table.metricas,table.metricas thead,table.metricas tbody,table.metricas th,table.metricas td,table.metricas tr{display:block}
  table.metricas thead{display:none}
  table.metricas tr{padding:.4rem 0;border-bottom:1px solid var(--borda);display:flex;justify-content:space-between;flex-wrap:wrap}
  table.metricas th{border:0;padding-bottom:.1rem}
  table.metricas td{border:0;padding-top:0;text-align:right}
}

.sustentacao{background:#FFF7ED;border-radius:12px;padding:.8rem 1rem;margin:.6rem 0}
.sustentacao .aviso{font-size:.8125rem;color:var(--reduzir);margin:.4rem 0 0}

details.motivos,details.perguntas,details.sinais-suprimidos,details.historico{margin:.6rem 0}
details summary{cursor:pointer;font-size:.8125rem;font-weight:600;color:var(--cinza-medio)}
.expectativa{background:var(--bubbles-cinza-claro);border-radius:10px;padding:.7rem .9rem;font-size:.9rem}

/* Decisão */
/* Bolinha pulsante ao lado do veredito enquanto o item não tem decisão (JS remove/oculta
   ao decidir) */
.pulso{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--bubbles-magenta);
  animation:pulso-anim 1.6s ease-in-out infinite}
@keyframes pulso-anim{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}
@media(prefers-reduced-motion:reduce){.pulso{animation:none}}

.decisao{margin-top:1rem;padding-top:1rem;border-top:1px dashed var(--borda)}
.decisao__resumo{background:var(--bubbles-cinza-claro);border-radius:10px;padding:.7rem .9rem;
  font-size:.875rem;display:flex;flex-direction:column;gap:.3rem;margin-bottom:.8rem}
.decisao__resumo-linha strong{color:var(--bubbles-preto)}
.decisao__estados{display:flex;flex-wrap:wrap;gap:.5rem}
.btn-estado{min-height:44px;border:1.5px solid var(--borda);background:#fff;border-radius:10px;
  padding:.5rem 1rem;font-size:.8125rem;font-weight:600;cursor:pointer;color:var(--bubbles-preto);
  transition:filter .15s ease}
.btn-estado:hover{filter:brightness(0.97)}
/* Tom leve desde o estado não selecionado, para reconhecer cada ação sem precisar clicar
   (o Caio pediu para aproveitar o mesmo princípio de cor do Aprovar/Não aplicar antigo) */
.btn-estado[data-estado="aplicar"]{background:#EAF7EF;border-color:#BFE6CC;color:var(--ok)}
.btn-estado[data-estado="parcial"]{background:#FEF3E2;border-color:#F5D9A8;color:var(--atencao)}
.btn-estado[data-estado="nao_aplicar"]{background:#FCEAEA;border-color:#F3C6C6;color:var(--perigo)}
.btn-estado[data-estado="adiar"]{background:#E8EEFC;border-color:#C3D3F7;color:var(--manter)}
.btn-estado[data-estado="manter"]{background:#F1F2F4;border-color:#DADCE0;color:var(--neutro)}
.btn-estado[aria-checked="true"][data-estado="aplicar"]{background:var(--ok);border-color:var(--ok);color:#fff}
.btn-estado[aria-checked="true"][data-estado="parcial"]{background:var(--atencao);border-color:var(--atencao);color:#fff}
.btn-estado[aria-checked="true"][data-estado="nao_aplicar"]{background:var(--perigo);border-color:var(--perigo);color:#fff}
.btn-estado[aria-checked="true"][data-estado="adiar"]{background:var(--manter);border-color:var(--manter);color:#fff}
.btn-estado[aria-checked="true"][data-estado="manter"]{background:var(--neutro);border-color:var(--neutro);color:#fff}
.decisao__campo{margin-top:.6rem}
.decisao__campo label{display:block;font-size:.8125rem;color:var(--cinza-medio);margin-bottom:.3rem}
.decisao__campo textarea{width:100%;border:1.5px solid var(--borda);border-radius:10px;padding:.6rem;
  font-family:inherit;font-size:.9rem}
.decisao--pendente-obrigatoria .decisao__campo textarea{border-color:var(--perigo)}

/* Pódios */
.podio-categoria{margin-bottom:1.5rem}
.podio-explica{font-size:.875rem;color:var(--cinza-medio)}
.podio-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.8rem}
.podio-card{background:#fff;border:1px solid var(--borda);border-radius:12px;padding:.9rem}
.podio-pos{font-weight:700;color:var(--bubbles-magenta-fundo);margin:0}
.podio-nome{font-weight:500;font-size:.875rem;margin:.2rem 0}
.podio-formato{font-size:.75rem;color:var(--cinza-medio);text-transform:uppercase}
.podio-metricas{list-style:none;padding:0;margin:.5rem 0 0;font-size:.8125rem;color:var(--cinza-medio)}
.multi-podio{background:var(--bubbles-rosa);border-radius:12px;padding:1rem;margin:1rem 0}

.secao--diagnostico details{background:#fff;border:1px solid var(--borda);border-radius:12px;
  padding:1rem;margin-bottom:.8rem}
.conciliacao li.ok{color:var(--ok)}

/* Selo de completude */
.selo-completude{border-radius:16px;padding:1rem 1.25rem;color:#fff;margin-bottom:1.5rem}
.selo-completude--ok{background:var(--ok)}
.selo-completude--atencao{background:var(--atencao)}
.selo-completude--reduzir{background:var(--reduzir)}
.selo-completude--perigo{background:var(--perigo)}
.selo-completude__texto{margin:0}
.selo-completude__resumo{margin:.3rem 0 0;font-size:.875rem;opacity:.9}
.selo-completude details{margin-top:.6rem;font-size:.8125rem}
.selo-completude summary{color:#fff;opacity:.9}

.periodo-investimento{background:#fff;border:1px solid var(--borda);border-radius:16px;padding:1.25rem;margin-bottom:2rem}
.periodo-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:.8rem}
.periodo-grid .rotulo{font-size:.75rem;color:var(--cinza-medio);text-transform:uppercase;letter-spacing:.05em;margin:0}
.periodo-grid .valor{font-size:1rem;font-weight:600;margin:.2rem 0}
.periodo-grid .sub{font-size:.8125rem;color:var(--cinza-medio);margin:0}
.investimento-total{font-weight:600}

#glossario details>h3{font-size:.8125rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;
  color:var(--bubbles-magenta-fundo);margin:1.4rem 0 .6rem}
#glossario details>h3:first-of-type{margin-top:1rem}
.glossario{display:grid;grid-template-columns:max-content 1fr;gap:.4rem 1rem;margin-top:.8rem}
.glossario dt{font-weight:600}
.glossario dd{margin:0;color:var(--cinza-medio)}
.ressalvas{display:flex;flex-direction:column;gap:.8rem}
.ressalva{background:#FEF3C7;border-radius:12px;padding:1rem}
.ressalva__titulo{font-weight:600;margin:0 0 .3rem}
.auditoria{display:flex;flex-direction:column;gap:.8rem}
.auditoria__item{background:#fff;border:1px solid var(--borda);border-radius:12px;padding:1rem}
.auditoria-ok{color:var(--ok);font-weight:600}
.proveniencia table{width:100%;border-collapse:collapse;font-size:.8125rem;margin-top:.6rem}
.proveniencia th{text-align:left;color:var(--cinza-medio);padding:.3rem .5rem;white-space:nowrap}
.proveniencia td{padding:.3rem .5rem}

.exportar{background:#fff;border:1px solid var(--borda);border-radius:16px;padding:1.5rem}
.exportar__botoes{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1rem}
.exportar__botoes button{min-height:44px;border-radius:999px;padding:.7rem 1.4rem;font-weight:600;
  font-size:.875rem;cursor:pointer;border:1.5px solid var(--bubbles-preto)}
#btn-copiar{background:#fff;color:var(--bubbles-preto)}
#btn-whatsapp{background:#25D366;color:#fff;border-color:#25D366}
#preview-copiar{white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:.75rem;
  background:var(--bubbles-cinza-claro);border-radius:10px;padding:1rem;margin-top:1rem;max-height:400px;overflow:auto}

@media print{
  #gate,#progresso,.toc,.toc__toggle,#aviso-desktop,.decisao,.exportar__botoes{display:none!important}
  details{display:block!important}
  .layout{display:block;max-width:100%}
  body{background:#fff}
}
`

// ---------------------------------------------------------------------------
// 19 · JS do cliente (gate, decisões, localStorage, scrollspy, export)
// ---------------------------------------------------------------------------

function clienteJS(relatorio, senha) {
  const slug = relatorio.slug
  const whatsapp = relatorio.whatsapp
  const itensExport = coletarItensParaExport(relatorio)
  const urlRelatorio = '' // preenchido manualmente após o deploy, se necessário

  return `
${ESTADOS_JS}
const SLUG = ${JSON.stringify(slug)};
const SENHA = ${JSON.stringify(senha)};
const WHATSAPP = ${JSON.stringify(whatsapp)};
const ITENS = ${JSON.stringify(itensExport)};
const URL_RELATORIO = ${JSON.stringify(urlRelatorio)};
const CHAVE_STORAGE = 'plano:' + SLUG;
const CHAVE_GATE = 'plano-acesso:' + SLUG;
const CHAVE_AVISO = 'plano-aviso-desktop:' + SLUG;

/* AVISO DE SEGURANÇA: esta proteção é de conveniência, não de segurança real.
   A senha está visível no código-fonte desta página. Serve para evitar acesso
   casual ao documento, não protege contra alguém determinado a ler. */
(function gate(){
  const gate = document.getElementById('gate');
  const shell = document.getElementById('shell');
  const input = document.getElementById('gate-input');
  const btn = document.getElementById('gate-btn');
  const erro = document.getElementById('gate-erro');

  function abrir(){
    gate.classList.add('is-open');
    shell.classList.add('is-revealed');
  }

  try {
    if (localStorage.getItem(CHAVE_GATE) === '1') { abrir(); }
  } catch(e) {}

  function tentar(){
    if (input.value === SENHA) {
      try { localStorage.setItem(CHAVE_GATE, '1'); } catch(e) {}
      abrir();
    } else {
      erro.textContent = 'Senha incorreta.';
      erro.classList.add('is-visible');
    }
  }
  btn.addEventListener('click', tentar);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tentar(); });
})();

/* Aviso de desktop (PARTE 2.3) */
(function avisoDesktop(){
  const aviso = document.getElementById('aviso-desktop');
  if (!aviso) return;
  try {
    if (localStorage.getItem(CHAVE_AVISO) === '1') { aviso.hidden = true; return; }
  } catch(e) {}
  const fechar = () => {
    aviso.hidden = true;
    try { localStorage.setItem(CHAVE_AVISO, '1'); } catch(e) {}
  };
  aviso.querySelector('button')?.addEventListener('click', fechar);
  if (window.innerWidth >= 1100) setTimeout(fechar, 6000);
})();

/* Estado de decisão */
function lerEstado(){
  try {
    const raw = localStorage.getItem(CHAVE_STORAGE);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}
function gravarEstado(estado){
  try { localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado)); } catch(e) {}
}
let ESTADO = lerEstado();

function itemCompleto(id){
  const s = ESTADO[id];
  if (!s || !s.estado) return false;
  const config = ESTADOS[s.estado];
  if (config && config.exige) return !!(s[config.exige] && s[config.exige].trim().length > 0);
  return true;
}

function atualizarBotoes(id){
  const s = ESTADO[id] || {};
  document.querySelectorAll('.btn-estado[data-item="'+id+'"]').forEach((b) => {
    const ativo = b.dataset.estado === s.estado;
    b.setAttribute('aria-checked', ativo ? 'true' : 'false');
  });
  const pulso = document.querySelector('[data-pulso-de="'+id+'"]');
  if (pulso) pulso.style.display = s.estado ? 'none' : '';
  const campoWrap = document.querySelector('.decisao__campo[data-campo-de="'+id+'"]');
  if (!campoWrap) return;
  const config = s.estado ? ESTADOS[s.estado] : null;
  if (config && config.exige) {
    campoWrap.hidden = false;
    campoWrap.querySelector('label').textContent = config.dica || '';
    const ta = campoWrap.querySelector('textarea');
    ta.value = s[config.exige] || '';
  } else {
    campoWrap.hidden = true;
  }
}

function atualizarSumario(){
  const porSecaoOuCampanha = {};
  for (const it of ITENS) {
    porSecaoOuCampanha[it.id] = itemCompleto(it.id);
  }
  document.querySelectorAll('[data-toc-estado]').forEach((el) => {
    const id = el.dataset.tocEstado;
    // campanha: olha o próprio item; seção de canal: olha todos os itens daquele canal
    const secaoCanal = document.getElementById(id);
    let estadoTexto = '';
    if (secaoCanal && secaoCanal.classList.contains('secao')) {
      const idsDoCanal = ITENS.filter((it) => it.id.startsWith(id.replace('canal-','')) || true).map((it)=>it.id);
      // fallback simples: se a seção é de canal, usamos apenas os ids de campanhas dentro dela
    }
    if (ITENS.find((it) => it.id === id)) {
      estadoTexto = itemCompleto(id) ? '●' : (ESTADO[id] && ESTADO[id].estado ? '◐' : '○');
    }
    el.textContent = estadoTexto;
  });
}

function atualizarProgresso(){
  const total = ITENS.length;
  const decididos = ITENS.filter((it) => itemCompleto(it.id)).length;
  const pendenteMotivo = ITENS.filter((it) => ESTADO[it.id] && ESTADO[it.id].estado && !itemCompleto(it.id)).length;
  const fill = document.querySelector('#progresso .barra__fill');
  const texto = document.querySelector('#progresso .texto');
  if (fill) fill.style.width = (total ? (decididos/total*100) : 0) + '%';
  if (texto) texto.textContent = decididos + ' de ' + total + ' decisões' + (pendenteMotivo ? '  ·  ' + pendenteMotivo + ' aguardando motivo' : '');
}

function definirEstado(id, estado){
  ESTADO[id] = ESTADO[id] || {};
  ESTADO[id].estado = estado;
  gravarEstado(ESTADO);
  atualizarBotoes(id);
  atualizarSumario();
  atualizarProgresso();
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-estado');
  if (btn) { definirEstado(btn.dataset.item, btn.dataset.estado); return; }
});

document.addEventListener('input', (e) => {
  const ta = e.target.closest('.decisao__campo textarea');
  if (!ta) return;
  const wrap = ta.closest('.decisao__campo');
  const id = wrap.dataset.campoDe;
  const s = ESTADO[id] || {};
  const config = s.estado ? ESTADOS[s.estado] : null;
  if (config && config.exige) {
    s[config.exige] = ta.value;
    ESTADO[id] = s;
    gravarEstado(ESTADO);
    atualizarProgresso();
  }
});

// Estado inicial de cada controle
document.querySelectorAll('.decisao').forEach((d) => atualizarBotoes(d.dataset.item));
atualizarSumario();
atualizarProgresso();

/* Scrollspy do sumário */
(function scrollspy(){
  const secoesENos = Array.from(document.querySelectorAll('.secao, .no--campanha'));
  if (!secoesENos.length) return;
  const links = document.querySelectorAll('.toc__list a');
  const observer = new IntersectionObserver((entradas) => {
    const visivel = entradas.find((en) => en.isIntersecting);
    if (!visivel) return;
    links.forEach((l) => l.classList.toggle('is-active', l.dataset.tocAlvo === visivel.target.id));
  }, { rootMargin: '-15% 0px -70% 0px' });
  secoesENos.forEach((el) => observer.observe(el));
})();

/* Sumário: drawer mobile */
(function tocDrawer(){
  const toc = document.getElementById('sumario');
  const toggle = document.getElementById('toc-toggle');
  const backdrop = document.getElementById('toc-backdrop');
  if (!toc || !toggle) return;
  function abrir(v){
    toc.classList.toggle('is-open', v);
    backdrop.classList.toggle('is-open', v);
    toggle.setAttribute('aria-expanded', v ? 'true' : 'false');
  }
  toggle.addEventListener('click', () => abrir(!toc.classList.contains('is-open')));
  backdrop.addEventListener('click', () => abrir(false));
  toc.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => abrir(false)));
})();

/* "Ver mais indicadores" — compacta a tabela até CTR, expande o resto sob demanda */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ver-mais-indicadores');
  if (!btn) return;
  const aberto = btn.getAttribute('aria-expanded') === 'true';
  document.querySelectorAll('[data-extra-de="'+btn.dataset.tabela+'"]').forEach((tr) => { tr.hidden = aberto; });
  btn.setAttribute('aria-expanded', aberto ? 'false' : 'true');
  btn.textContent = aberto ? 'Ver mais indicadores ▾' : 'Ver menos indicadores ▴';
});

/* Expandir/recolher tudo + só pendentes */
document.querySelectorAll('[data-acao-expandir]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const aberto = btn.dataset.acaoExpandir === 'expandir';
    document.querySelectorAll('details.no--conjunto, details.no--anuncio').forEach((d) => { d.open = aberto; });
  });
});
document.getElementById('filtro-pendentes')?.addEventListener('click', function(){
  const ativo = this.getAttribute('aria-pressed') === 'true';
  this.setAttribute('aria-pressed', ativo ? 'false' : 'true');
  document.querySelectorAll('.no--conjunto, .no--anuncio, .no--campanha').forEach((no) => {
    const id = no.id;
    const completo = ITENS.find((it) => it.id === id) ? itemCompleto(id) : false;
    no.style.display = (!ativo && completo) ? 'none' : '';
  });
});

/* Exportação (PARTE 5) */
function nomeEstado(estado){ return ESTADOS[estado] ? ESTADOS[estado].rotulo : estado; }
function emojiEstado(estado){
  return { aplicar:'✅', parcial:'🟡', nao_aplicar:'❌', adiar:'⏰', manter:'⚪' }[estado] || '⏳';
}

// "Copiar tudo" (PARTE 5.3) · sem limite de tamanho, todo item nos três níveis, inclusive
// os mantidos — quem recebe executa sem abrir a página.
function montarTextoCompleto(){
  const linhas = [];
  linhas.push('DECISÕES · ' + ${JSON.stringify(relatorio.cliente?.nome ?? '')} + ' · ' + ${JSON.stringify(fmtDateBR(relatorio.periodo.inicio))} + ' a ' + ${JSON.stringify(fmtDateBR(relatorio.periodo.fim))} + ' (' + ${JSON.stringify(relatorio.periodo.rotulo || relatorio.periodo.dias + ' dias')} + ')');
  linhas.push('Revisado por ' + ${JSON.stringify(relatorio.revisor)} + ' em ' + new Date().toLocaleDateString('pt-BR'));
  linhas.push('');
  const porCanal = {};
  for (const it of ITENS) { (porCanal[it.canal] = porCanal[it.canal] || []).push(it); }
  for (const canal in porCanal) {
    linhas.push('═══ ' + canal.toUpperCase() + ' ═══');
    const porCampanha = {};
    for (const it of porCanal[canal]) { (porCampanha[it.campanha] = porCampanha[it.campanha] || []).push(it); }
    for (const campanha in porCampanha) {
      const itens = porCampanha[campanha];
      linhas.push('');
      linhas.push('━━ CAMPANHA: ' + campanha);
      for (const it of itens) {
        const s = ESTADO[it.id] || {};
        const prefixo = it.nivel === 'campanha' ? '    ' : it.nivel === 'conjunto' ? '    ▸ CONJUNTO: ' : '        · ANÚNCIO: ';
        linhas.push('');
        if (it.nivel !== 'campanha') linhas.push(prefixo + it.nome);
        linhas.push('      Sugerido: ' + (it.acao || '—'));
        linhas.push('      Decisão:  ' + emojiEstado(s.estado) + ' ' + (s.estado ? nomeEstado(s.estado).toUpperCase() : 'SEM DECISÃO'));
        const config = s.estado ? ESTADOS[s.estado] : null;
        if (config && config.exige && s[config.exige]) {
          linhas.push('      ' + config.dica.split('?')[0] + ': ' + s[config.exige]);
        }
      }
    }
    linhas.push('');
  }
  linhas.push('═══ RESUMO ═══');
  const contagem = {};
  for (const it of ITENS) { const e = (ESTADO[it.id] || {}).estado || 'sem_decisao'; contagem[e] = (contagem[e]||0)+1; }
  for (const chave in ESTADOS) {
    linhas.push(emojiEstado(chave) + ' ' + ESTADOS[chave].rotulo.padEnd(24,'.') + ' ' + (contagem[chave] || 0));
  }
  linhas.push('⏳ ' + 'Sem decisão'.padEnd(24,'.') + ' ' + (contagem['sem_decisao'] || 0));
  return linhas.join('\\n');
}

// Mensagem do WhatsApp (PARTE 5.2) · enxuta, com *negrito* e _itálico_ reais, agrupada por
// canal → campanha. Itens mantidos viram uma linha de contagem; o detalhe fica no "Copiar
// tudo". Emojis marcam o estado de cada item, para dar para ler rápido no celular.
function montarMensagemWhatsapp(){
  const linhas = [];
  linhas.push('Oi! Revisei o relatório de ' + ${JSON.stringify(relatorio.cliente?.nome ?? '')} + ' de ' + ${JSON.stringify(fmtDateBR(relatorio.periodo.inicio))} + ' a ' + ${JSON.stringify(fmtDateBR(relatorio.periodo.fim))} + ' e as ações serão:');
  linhas.push('');

  const porCanal = {};
  for (const it of ITENS) { (porCanal[it.canal] = porCanal[it.canal] || []).push(it); }
  let mantidosTotal = 0;
  let semDecisaoTotal = 0;

  for (const canal in porCanal) {
    const itensCanal = porCanal[canal];
    const comAcao = itensCanal.filter((it) => {
      const e = (ESTADO[it.id] || {}).estado;
      return e && e !== 'manter';
    });
    mantidosTotal += itensCanal.filter((it) => (ESTADO[it.id] || {}).estado === 'manter').length;
    semDecisaoTotal += itensCanal.filter((it) => !(ESTADO[it.id] || {}).estado).length;

    linhas.push('*' + canal.toUpperCase() + '*');
    if (comAcao.length === 0) {
      linhas.push('_Nada com ação nova neste canal por enquanto._');
      linhas.push('');
      continue;
    }
    const porCampanha = {};
    for (const it of comAcao) { (porCampanha[it.campanha] = porCampanha[it.campanha] || []).push(it); }
    for (const campanha in porCampanha) {
      linhas.push('');
      linhas.push('*' + campanha + '*');
      for (const it of porCampanha[campanha]) {
        const s = ESTADO[it.id] || {};
        linhas.push('• ' + emojiEstado(s.estado) + ' ' + (it.nivel !== 'campanha' ? it.nome : it.acao));
        if (it.nivel !== 'campanha') linhas.push('  ' + (it.acao || ''));
        const config = s.estado ? ESTADOS[s.estado] : null;
        if (config && config.exige && s[config.exige]) {
          linhas.push('  _' + s[config.exige] + '_');
        }
      }
    }
    linhas.push('');
  }

  if (mantidosTotal > 0) linhas.push('⚪ *MANTER COMO ESTÁ (' + mantidosTotal + ')* — os demais itens continuam como estão. Detalhe no texto copiado.');
  if (semDecisaoTotal > 0) linhas.push('⏳ *' + semDecisaoTotal + ' item(ns) ainda sem decisão* neste envio.');
  if (URL_RELATORIO) { linhas.push(''); linhas.push('🔗 ' + URL_RELATORIO); }

  let texto = linhas.join('\\n').replace(/\\n{3,}/g, '\\n\\n');
  const limite = 1500;
  if (texto.length > limite) {
    texto = texto.slice(0, limite).trim() + '\\n\\n_Lista completa no relatório e no texto copiado._';
  }
  return texto;
}

const previewEl = document.getElementById('preview-copiar');
if (previewEl) { previewEl.hidden = false; previewEl.textContent = 'Clique em "Copiar tudo" para gerar o texto completo das decisões.'; }

document.getElementById('btn-copiar')?.addEventListener('click', async () => {
  const texto = montarTextoCompleto();
  if (previewEl) { previewEl.textContent = texto; }
  try {
    await navigator.clipboard.writeText(texto);
    const btn = document.getElementById('btn-copiar');
    const original = btn.textContent;
    btn.textContent = '✅ Copiado!';
    setTimeout(() => { btn.textContent = original; }, 2000);
  } catch(e) {}
});

document.getElementById('btn-whatsapp')?.addEventListener('click', () => {
  const msg = montarMensagemWhatsapp();
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
});
`
}

// ---------------------------------------------------------------------------
// 20 · Montagem final do HTML
// ---------------------------------------------------------------------------

function montarHTML(relatorio, senha) {
  const cliente = relatorio.cliente?.nome ?? '—'
  const periodo = relatorio.periodo ?? {}
  let indice = 2
  const canaisHtml = (relatorio.canais ?? []).map((c) => renderCanal(c, indice++)).join('')
  const podiosHtml = renderPodios(relatorio.podios)
  if (podiosHtml) indice++
  const diagnosticoHtml = renderDiagnostico(relatorio)
  const glossarioHtml = renderGlossario(relatorio.glossario, indice)
  if (glossarioHtml) indice++
  const ressalvasHtml = renderRessalvas(relatorio.ressalvas, indice)
  if (ressalvasHtml) indice++
  const auditoriaHtml = renderAuditoria(relatorio.auditoria, indice)
  indice++
  const provenienciaHtml = renderProveniencia(relatorio.proveniencia)
  const indiceExportar = indice

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Relatório de mídia paga · ${esc(cliente)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;1,400&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>

<div id="gate">
  <div class="gate__box">
    <p class="gate__title">Relatório de mídia paga</p>
    <p class="gate__sub">${esc(cliente)} · digite a senha para continuar</p>
    <div class="gate__field">
      <input id="gate-input" type="password" placeholder="Senha" autofocus>
      <button id="gate-btn" class="gate__btn" type="button">Entrar</button>
    </div>
    <p class="gate__hint">Dica: nome da gerente.</p>
    <p id="gate-erro" class="gate__error"></p>
  </div>
</div>

<div id="shell">
  <div id="aviso-desktop">
    <span>🖥️ Este relatório foi feito para desktop. No celular tudo funciona, mas tabelas largas e o sistema de decisões leem melhor em tela grande.</span>
    <button type="button" aria-label="Fechar aviso">✕</button>
  </div>

  <header class="cover">
    <div class="cover__inner">
      <span class="cover__eyebrow">Relatório de mídia paga</span>
      <h1 class="cover__title">${esc(cliente)}</h1>
      <p class="cover__sub">Revisão semanal de campanhas em ${(relatorio.canais ?? []).map((c) => esc(c.nome)).join(' e ')}.</p>
      <dl class="cover__meta">
        <div><dt>Período analisado</dt><dd>${fmtDateBR(periodo.inicio)} a ${fmtDateBR(periodo.fim)}</dd></div>
        <div><dt>Canais sob gestão</dt><dd>${(relatorio.canais ?? []).map((c) => esc(c.nome)).join(' · ')}</dd></div>
        <div><dt>Data do documento</dt><dd>${fmtDateBR(relatorio.gerado_em)} · revisor ${esc(relatorio.revisor)}</dd></div>
      </dl>
    </div>
  </header>

  <div class="layout">
    ${renderSumario(relatorio)}

    <main>
      <section class="secao" id="resumo-semana">
        <h2>01 · Resumo da semana</h2>
        ${blocoCompletude(relatorio.completude)}
        ${blocoPeriodo(relatorio)}
        <div class="controles-globais" style="display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:1rem">
          <button type="button" data-acao-expandir="expandir" class="btn-estado">Expandir tudo</button>
          <button type="button" data-acao-expandir="recolher" class="btn-estado">Recolher tudo</button>
          <button type="button" id="filtro-pendentes" class="btn-estado" aria-pressed="false">Só os pendentes</button>
        </div>
      </section>

      ${canaisHtml}
      ${podiosHtml}
      ${diagnosticoHtml}
      ${glossarioHtml}
      ${ressalvasHtml}
      ${auditoriaHtml}
      ${provenienciaHtml}

      <section class="secao exportar" id="exportar">
        <h2>${String(indiceExportar).padStart(2, '0')} · Exportar decisões</h2>
        <p class="secao-sub">Fecha o ciclo: o que você decidir aqui volta para a próxima análise.</p>
        <div class="exportar__botoes">
          <button type="button" id="btn-copiar">📋 Copiar tudo</button>
          <button type="button" id="btn-whatsapp">💬 Enviar no WhatsApp</button>
        </div>
        <pre id="preview-copiar" hidden></pre>
      </section>
    </main>
  </div>

  <div id="progresso">
    <span class="texto">0 de 0 decisões</span>
    <div class="barra"><div class="barra__fill"></div></div>
  </div>
</div>

<script>${clienteJS(relatorio, senha)}</script>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// 21 · Escrita do arquivo
// ---------------------------------------------------------------------------

const pastaSaida = path.join(
  process.cwd(),
  'output',
  `relatorio-${relatorio.cliente?.id ?? 'cliente'}-${relatorio.periodo?.fim ?? 'data'}`,
)
fs.mkdirSync(pastaSaida, { recursive: true })

const html = montarHTML(relatorio, SENHA)
const saidaPath = path.join(pastaSaida, 'index.html')
fs.writeFileSync(saidaPath, html, 'utf8')

console.log(`Gerado: ${saidaPath} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`)
