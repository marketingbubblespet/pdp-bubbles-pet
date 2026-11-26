// src/lib/relatorio-distribuidor/render-v3.ts
// Versão 3 do visual do relatório mensal (prévia em /distribuidor-agosto-2026-3).
// Mantém o visual claro e as seções da versão 2 (render.ts, que não muda) e traz conceitos
// do relatório de acompanhamento da Black November (/relatorio-black-november):
// - navegação por edições, aqui por mês, no topo e no sumário;
// - bloco "Período analisado" no sumário;
// - placar no topo (investimento contra o teto e os números do mês);
// - seção "Vai bem, vai mal e atenção", montada dos números do próprio relatório;
// - seção "Definições e fontes" no fim;
// - seções numeradas e, no celular, barra fixa com o nome da seção que está na tela.
import type { MesRef, Rede, RelatorioDistribuidor } from './tipos'
import { CSS } from './estilos'
import { NOME_REDE, REDES, indicadores, totaisComercial, totaisConsolidado, valorPrimeirosPedidos } from './calculos'
import { esc, fmtBRL, fmtInt, fmtPct, nomeMes, rotuloMes, seta } from './format'
import { cabecalho, secaoCampanhas, secaoConsolidado, secaoFunil, secaoRedes } from './secoes-numeros'
import { secaoCriativos, secaoMapa } from './secoes-mapa'
import {
  secaoComercial, secaoDesafios, secaoLeitura, secaoPaginas, secaoPlanoAnterior, secaoPlanoProximo,
  secaoRegioesFoco, secaoTimeline,
} from './secoes-texto'

// Um mês que tem relatório publicado. A lista é passada pela rota, do mais novo ao mais antigo
// ou em qualquer ordem: a página ordena sozinha.
export interface MesRelatorio {
  mes: MesRef
  href: string
}

function maiuscula(texto: string): string {
  return `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`
}

function ordem(m: MesRef): number {
  return m.ano * 12 + m.mes
}

// Links dos meses, com o mês aberto marcado e o mais novo sinalizado.
function linksMeses(rel: RelatorioDistribuidor, meses: MesRelatorio[]): string {
  const lista = [...meses].sort((a, b) => ordem(b.mes) - ordem(a.mes))
  return lista.map((m, i) => {
    const atual = ordem(m.mes) === ordem(rel.mes)
    const rotulo = `${maiuscula(rotuloMes(m.mes))}${i === 0 ? ' · mais novo' : ''}`
    return `<a href="${esc(m.href)}"${atual ? ' class="atual" aria-current="page"' : ''}>${rotulo}</a>`
  }).join('')
}

function chipsRedes(rel: RelatorioDistribuidor): string {
  return REDES.map((r) => rel.redes[r]
    ? `<span class="chip">✓ ${NOME_REDE[r]}</span>`
    : `<span class="chip sem">${NOME_REDE[r]}: sem dados em ${nomeMes(rel.mes)}</span>`).join('')
}

// Placar do topo: investimento do mês contra o teto e os quatro números que resumem o mês.
function placarTopo(rel: RelatorioDistribuidor): string {
  const t = totaisConsolidado(rel)
  if (!t) return ''
  const ant = totaisConsolidado(rel.anterior)
  const ind = indicadores(t)
  const indAnt = indicadores(ant)
  const teto = rel.tetoMensal ?? 10000
  const pct = (t.investimento / teto) * 100
  const acima = t.investimento > teto
  const com = totaisComercial(rel)
  const pedidos = valorPrimeirosPedidos(rel)
  const semDado = '<span class="tag-sem">sem dado</span>'
  const numero = (rotulo: string, valor: string, badge = '') =>
    `<div class="pt-num"><b>${valor}</b>${badge}<span>${rotulo}</span></div>`
  return `<section class="placar-topo" aria-label="Resumo do mês">
    <div class="pt-linha">
      <div><p class="pt-eb">Investimento do mês · Meta + Google</p>
      <p class="pt-val">${fmtBRL(t.investimento)} <span>de ${fmtBRL(teto)} de teto mensal</span></p></div>
      <span class="pt-selo ${acima ? 'acima' : 'ok'}">${acima ? 'Acima do teto' : 'Dentro do teto'}</span>
    </div>
    <div class="pt-barra" role="img" aria-label="${fmtPct(pct, 1)} do teto mensal"><i style="width:${Math.min(pct, 100).toFixed(1)}%"></i></div>
    <div class="pt-nums">
      ${numero('Leads', fmtInt(t.leads), seta(t.leads, ant?.leads, 'maior'))}
      ${numero('Custo por lead', ind.cpl == null ? semDado : fmtBRL(ind.cpl), seta(ind.cpl, indAnt.cpl, 'menor'))}
      ${numero('Novos distribuidores', com ? fmtInt(com.novosDistribuidores) : semDado)}
      ${numero('Primeiros pedidos', pedidos == null ? semDado : fmtBRL(pedidos))}
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
function sinais(rel: RelatorioDistribuidor): { bem: Sinal[]; mal: Sinal[]; atencao: Sinal[] } {
  const bem: Sinal[] = []
  const mal: Sinal[] = []
  const atencao: Sinal[] = []
  const fonteMidia = REDES.filter((r) => rel.redes[r]).map((r) => NOME_REDE[r]).join(' e ')
  const mesAnt = rel.anterior ? nomeMes(rel.anterior.mes) : ''

  // Resultado comercial.
  const com = totaisComercial(rel)
  const pedidos = valorPrimeirosPedidos(rel)
  if (com && com.novosDistribuidores > 0) {
    bem.push({
      texto: `Novos distribuidores no mês${pedidos == null ? '' : `, com ${fmtBRL(pedidos)} em primeiros pedidos`}`,
      num: fmtInt(com.novosDistribuidores), fonte: 'time comercial',
    })
  } else if (com) {
    mal.push({ texto: 'Nenhum novo distribuidor fechado no mês', num: '0', fonte: 'time comercial' })
  }

  // Menor e maior custo por lead entre as campanhas com pelo menos 3 leads.
  const campanhas = REDES.flatMap((r: Rede) => (rel.redes[r]?.campanhas ?? [])
    .map((c) => ({ c, rede: r, cpl: indicadores(c).cpl })))
    .filter((x): x is typeof x & { cpl: number } => x.c.leads >= 3 && x.cpl != null)
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

  // Teto de investimento.
  const teto = rel.tetoMensal ?? 10000
  if (t && t.investimento > teto) {
    mal.push({ texto: `Investimento acima do teto mensal de ${fmtBRL(teto)}`, num: fmtBRL(t.investimento), fonte: fonteMidia })
  } else if (t && t.investimento > teto * 0.9) {
    atencao.push({ texto: `Investimento perto do teto mensal de ${fmtBRL(teto)}`, num: fmtPct((t.investimento / teto) * 100, 1), fonte: fonteMidia })
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

function secaoVaiBemMal(rel: RelatorioDistribuidor): string {
  const s = sinais(rel)
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

// --- Definições e fontes ---

function secaoDefinicoes(rel: RelatorioDistribuidor): string {
  const teto = rel.tetoMensal ?? 10000
  const definicoes: [string, string][] = [
    ['Lead', 'Cadastro de quem quer ser distribuidor, contado pela plataforma de anúncio (Meta Ads ou Google Ads).'],
    ['CPL', 'Custo por lead: investimento ÷ leads.'],
    ['CTR', 'Taxa de cliques: cliques ÷ impressões.'],
    ['CPC', 'Custo por clique: investimento ÷ cliques.'],
    ['CPM', 'Custo por mil impressões: investimento ÷ impressões × 1.000.'],
    ['Clique → lead', 'Leads ÷ cliques. Mostra quanto a página de captação converte.'],
    ['Novo distribuidor', 'Fechamento informado pelo time comercial, contado no mês da primeira nota fiscal de venda.'],
    ['Primeiros pedidos', 'Soma do valor da primeira compra de cada novo distribuidor do mês.'],
    ['Teto mensal', `Limite de investimento do mês, somando Meta e Google: ${fmtBRL(teto)}.`],
    ['▲ ▼', 'Variação contra o mês anterior. Verde é melhora, vermelho é piora e cinza só informa a direção.'],
  ]
  const fontes = [
    rel.redes.meta ? 'Meta Ads: exportações do Gerenciador de Anúncios (campanhas, anúncios e região).' : null,
    rel.redes.google ? 'Google Ads: relatório de campanha.' : null,
    rel.comercial ? 'Reuniões, novos distribuidores e primeiros pedidos: relatório do time comercial, por vendedor.' : null,
  ].filter((x): x is string => x !== null)
  // Ressalvas já escritas no arquivo de dados do mês (notas de campanha, do funil e do mapa).
  const ressalvas = [
    ...REDES.flatMap((r) => (rel.redes[r]?.campanhas ?? []).filter((c) => c.nota).map((c) => `${c.nome}: ${c.nota!.replace(/^\*\s*/, '')}`)),
    rel.notaFunil, rel.notaComercial, rel.notaMapa,
  ].filter((x): x is string => Boolean(x))
  const lista = (itens: string[]) => `<ul class="fontes">${itens.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
  return `<section class="bloco" id="definicoes">${cabecalho('Apoio', 'Definições e fontes')}
    <h3 class="sub-bloco">Glossário</h3>
    <dl class="defs">${definicoes.map(([dt, dd]) => `<dt>${dt}</dt><dd>${esc(dd)}</dd>`).join('')}</dl>
    <h3 class="sub-bloco">Fontes de ${nomeMes(rel.mes)}</h3>${lista(fontes)}
    ${ressalvas.length > 0 ? `<h3 class="sub-bloco">Ressalvas de ${nomeMes(rel.mes)}</h3>${lista(ressalvas)}` : ''}
  </section>`
}

// --- Sumário ---

// Mesma lógica da versão 2 (itens saem do id e do <h2> de cada seção), com os meses e o
// período analisado acima da lista.
function sumario(rel: RelatorioDistribuidor, meses: MesRelatorio[], secoes: string[]): string {
  const itens = secoes.map((s) => ({
    id: s.match(/<section[^>]*id="([^"]+)"/)?.[1],
    titulo: s.match(/<h2>([^<]+)<\/h2>/)?.[1],
  })).filter((x) => x.id && x.titulo)
  const lista = itens.map((x, i) => `<li><a href="#${x.id}" data-toc-alvo="${x.id}">`
    + `<span class="toc__num">${String(i + 1).padStart(2, '0')}</span><span class="toc__texto">${x.titulo}</span></a></li>`).join('')
  const comparado = rel.anterior ? ` · comparado com ${rotuloMes(rel.anterior.mes)}` : ''
  return `<nav class="toc" id="sumario" aria-label="Sumário">
<div class="toc-meses"><small>Meses do relatório</small>${linksMeses(rel, meses)}</div>
<div class="toc-per"><small>Período analisado</small><b>${esc(rel.periodo)}</b><span>${maiuscula(rotuloMes(rel.mes))}${comparado}</span></div>
<p class="toc__label">Sumário</p><ul class="toc__list">${lista}</ul></nav>
<div class="toc__backdrop" id="toc-backdrop"></div>`
}

const CSS_V3 = `
  /* Topo: linha de contexto, título do mês, período e navegação por mês. */
  header.topo .kicker { display: block; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #5c4650; margin-bottom: 6px; }
  .periodo-pill { display: inline-block; font-size: 0.8rem; font-weight: 600; color: #fff; background: var(--preto); border-radius: 999px; padding: 4px 12px; margin-bottom: 10px; }
  .meses { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 14px; }
  .meses small { font-size: 0.75rem; color: #5c4650; }
  .meses a { font-size: 0.78rem; font-weight: 500; color: var(--preto); background: var(--card); border: 1px solid transparent; border-radius: 999px; padding: 6px 14px; text-decoration: none; transition: border-color 150ms; }
  .meses a:hover { border-color: var(--rosa-accent); }
  .meses a.atual { background: var(--preto); color: #fff; font-weight: 600; }

  /* Placar do topo. */
  .placar-topo { background: var(--card); border-radius: 16px; padding: 16px 18px; margin-top: 20px; }
  .pt-linha { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
  .pt-eb { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--rosa-accent); margin: 0; }
  .pt-val { font-size: 1.5rem; font-weight: 600; line-height: 1.25; margin: 2px 0 0; font-variant-numeric: tabular-nums; }
  .pt-val span { font-size: 0.85rem; font-weight: 400; color: var(--texto); }
  .pt-selo { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; border-radius: 999px; padding: 3px 10px; white-space: nowrap; }
  .pt-selo.ok { color: var(--bom-fg); background: var(--bom-bg); border: 1px solid var(--bom-borda); }
  .pt-selo.acima { color: var(--ruim-fg); background: var(--ruim-bg); border: 1px solid var(--ruim-borda); }
  .pt-barra { height: 10px; background: var(--rosa-fundo); border-radius: 999px; overflow: hidden; margin: 12px 0 14px; }
  .pt-barra i { display: block; height: 100%; background: var(--rosa-accent); border-radius: 999px; }
  .pt-nums { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .pt-num { border-left: 3px solid var(--rosa); padding-left: 10px; min-width: 0; }
  .pt-num b { display: block; font-size: 1.15rem; line-height: 1.3; font-variant-numeric: tabular-nums; }
  .pt-num > span:last-child { display: block; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--texto); margin-top: 2px; }
  @media (max-width: 640px) { .pt-nums { grid-template-columns: repeat(2, minmax(0, 1fr)); } .pt-val { font-size: 1.25rem; } }

  /* Sumário: meses e período analisado acima da lista. */
  .toc-meses, .toc-per { border: 1px solid var(--borda); background: var(--card); border-radius: 12px; padding: 10px 12px; margin-bottom: 12px; }
  .toc-meses small, .toc-per small { display: block; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--texto); margin-bottom: 6px; }
  .toc-meses a { display: block; color: var(--texto); text-decoration: none; padding: 5px 8px; border-radius: 8px; line-height: 1.35; }
  .toc-meses a:hover { color: var(--preto); background: var(--rosa-fundo); }
  .toc-meses a.atual { color: var(--preto); background: var(--rosa); font-weight: 600; }
  .toc-per b { display: block; font-size: 0.9rem; color: var(--preto); }
  .toc-per span { display: block; color: var(--texto); line-height: 1.35; }
  .toc-per { margin-bottom: 20px; }

  /* Seções numeradas. */
  main { counter-reset: secao; }
  main section[id] { counter-increment: secao; }
  main section[id] h2::before {
    content: counter(secao); display: inline-flex; align-items: center; justify-content: center;
    min-width: 1.7em; height: 1.7em; padding: 0 0.35em; margin-right: 0.55em; border-radius: 999px;
    background: var(--rosa); color: var(--preto); font-size: 0.72em; font-weight: 600; vertical-align: 0.12em;
  }

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

  /* Definições e fontes. */
  #definicoes .sub-bloco { margin-top: 20px; }
  #definicoes .sub-bloco:first-of-type { margin-top: 0; }
  dl.defs { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 8px 18px; margin: 0; background: var(--card); border: 1px solid var(--borda); border-radius: 14px; padding: 14px 16px; font-size: 0.85rem; }
  dl.defs dt { font-weight: 600; }
  dl.defs dd { margin: 0; color: var(--texto); }
  @media (max-width: 640px) { dl.defs { grid-template-columns: 1fr; gap: 2px 0; } dl.defs dd { margin-bottom: 8px; } }
  ul.fontes { margin: 0; padding-left: 1.2em; font-size: 0.85rem; color: var(--texto); display: flex; flex-direction: column; gap: 6px; }
`

export function renderRelatorioV3(rel: RelatorioDistribuidor, meses: MesRelatorio[]): string {
  const mesTitulo = maiuscula(rotuloMes(rel.mes))
  const publico = rel.publico ?? 'Equipe de Marketing e Comercial'
  const titulo = `Relatório de Captação de Distribuidores · ${mesTitulo}`
  // Ordem: resumo primeiro, depois os números, o detalhe, o que foi feito e o que vem a seguir.
  // "Relatórios anteriores" sai da lista porque a navegação por mês cobre esse papel.
  const secoes = [
    secaoVaiBemMal(rel),
    secaoConsolidado(rel),
    secaoRedes(rel),
    secaoFunil(rel),
    secaoComercial(rel),
    secaoCampanhas(rel),
    secaoLeitura(rel),
    secaoMapa(rel),
    secaoCriativos(rel),
    secaoTimeline(rel),
    secaoDesafios(rel),
    secaoPlanoAnterior(rel),
    secaoPaginas(rel),
    secaoRegioesFoco(rel),
    secaoPlanoProximo(rel),
    secaoDefinicoes(rel),
  ].filter(Boolean)

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
    <img class="logo" src="/images/bubbles-logo.svg" alt="Bubbles">
    <span class="kicker">Bubbles · Captação de distribuidores · Relatório mensal</span>
    <h1>Relatório de ${rotuloMes(rel.mes)}</h1>
    <span class="periodo-pill">Período analisado: ${esc(rel.periodo)}</span>
    <p class="sub">${esc(publico)}</p>
    <div class="chips">${chipsRedes(rel)}</div>
    <div class="meses"><small>Meses do relatório:</small>${linksMeses(rel, meses)}</div>
    ${placarTopo(rel)}
  </div>
</header>
<div class="barra-secao">
  <button type="button" class="toc__toggle" id="toc-toggle" aria-expanded="false" aria-controls="sumario">☰ Sumário</button>
  <span class="secao-atual" id="secao-atual"></span>
</div>
<div class="pagina">
${sumario(rel, meses, secoes)}
<main>
${secoes.join('\n')}
</main>
</div>
<footer class="rodape">Relatório de Captação de Distribuidores · <strong>${mesTitulo}</strong> · ${esc(publico)}</footer>
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
