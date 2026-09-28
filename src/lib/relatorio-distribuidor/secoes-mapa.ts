// src/lib/relatorio-distribuidor/secoes-mapa.ts
// Mapa de impressões por estado (com visão por região) e ranking de criativos.
import type { Criativo, RelatorioDistribuidor, UF } from './tipos'
import { NOME_REDE, REDES, impressoesPorUF, indicadores, niveisPorQuantil, porRegiao, type MapaImpressoes } from './calculos'
import { esc, fmtBRL, fmtInt, fmtPct, nomeMes, rotuloMes, seta } from './format'
import { NOME_UF, REGIAO_UF, TODAS_UFS, type Regiao } from './mapa-brasil'
import { MAPA_UF, MAPA_VIEWBOX } from './mapa-svg'
import { aviso, cabecalho } from './secoes-numeros'

function fmtShare(share: number): string {
  return fmtPct(share, share < 10 ? 1 : 0)
}

// Estados pequenos demais para a sigla caber dentro: rótulo fora, ligado por uma linha.
const ROTULO_FORA: Partial<Record<UF, [number, number]>> = {
  RN: [575, 150], PB: [578, 176], PE: [580, 202], AL: [578, 226], SE: [566, 250],
  ES: [520, 378], RJ: [490, 432], DF: [410, 296],
}

// Posição do rótulo de cada região no modo "por região".
const CENTRO_REGIAO: Record<Regiao, [number, number]> = {
  Norte: [215, 150], Nordeste: [470, 205], 'Centro-Oeste': [290, 305], Sudeste: [420, 385], Sul: [320, 490],
}

function rotuloUF(uf: UF, texto: string): string {
  const { x, y } = MAPA_UF[uf]
  const fora = ROTULO_FORA[uf]
  if (!fora) return `<text x="${x}" y="${y}" class="rot-uf">${texto}</text>`
  return `<line x1="${x}" y1="${y}" x2="${fora[0] - 4}" y2="${fora[1] - 3}" class="rot-linha"/>`
    + `<text x="${fora[0]}" y="${fora[1]}" class="rot-uf" text-anchor="start">${texto}</text>`
}

function svgMapa(mapa: MapaImpressoes | null): string {
  const niveisUF = mapa ? niveisPorQuantil(mapa.porUF) : {}
  const regioes = mapa ? porRegiao(mapa) : []
  const niveisReg = niveisPorQuantil(Object.fromEntries(regioes.map((r) => [r.regiao, r.total])))
  const pct = (v: number) => (mapa && mapa.total > 0 ? fmtShare((v / mapa.total) * 100) : '')
  const estados = TODAS_UFS.map((uf) => {
    const v = mapa?.porUF[uf] ?? 0
    const titulo = mapa ? `${NOME_UF[uf]}: ${fmtInt(v)} impressões (${pct(v)})` : NOME_UF[uf]
    return `<path d="${MAPA_UF[uf].d}" style="--fe:var(--mapa-${niveisUF[uf] ?? 0});--fr:var(--mapa-${niveisReg[REGIAO_UF[uf]] ?? 0})"><title>${titulo}</title></path>`
  }).join('')
  const rotEstados = TODAS_UFS.map((uf) => rotuloUF(uf, mapa ? `<tspan>${uf}</tspan> <tspan class="pct">${pct(mapa.porUF[uf] ?? 0) || '0%'}</tspan>` : uf)).join('')
  const rotRegioes = regioes.map((r) => {
    const [x, y] = CENTRO_REGIAO[r.regiao]
    return `<text x="${x}" y="${y}" class="rot-reg">${r.regiao}<tspan x="${x}" dy="20" class="pct">${fmtShare(r.share)}</tspan></text>`
  }).join('')
  return `<svg class="mapa-svg${mapa ? '' : ' sem-dado'}" viewBox="${MAPA_VIEWBOX}" role="img" aria-label="Mapa do Brasil com impressões por estado">`
    + `<g class="estados">${estados}</g><g class="rot-estados">${rotEstados}</g><g class="rot-regioes">${rotRegioes}</g></svg>`
}

function legenda(): string {
  const cores = [1, 2, 3, 4].map((n) => `<i style="background:var(--mapa-${n})"></i>`).join('')
  return `<div class="legenda"><span>Menos</span>${cores}<span>Mais impressões</span></div>`
}

function listaRegioes(rel: RelatorioDistribuidor, mapa: MapaImpressoes): string {
  const mapaAnt = impressoesPorUF(rel.anterior)
  const anteriores = mapaAnt ? porRegiao(mapaAnt) : []
  return `<div class="regioes-lista">${porRegiao(mapa).map((r) => {
    const ant = anteriores.find((x) => x.regiao === r.regiao)?.total
    return `<div class="regiao-linha"><div class="topo"><span>${r.regiao}</span>
      <span class="dir">${fmtShare(r.share)} <span class="num">${fmtInt(r.total)}</span>${seta(r.total, ant, 'maior')}</span></div>
      <div class="barra-fundo"><div class="barra" style="width:${r.share.toFixed(1)}%"></div></div></div>`
  }).join('')}</div>`
}

function topEstados(mapa: MapaImpressoes): string {
  const top = (Object.entries(mapa.porUF) as [UF, number][]).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const linhas = top.map(([uf, v], i) =>
    `<tr><td>${i + 1}. ${NOME_UF[uf]} (${uf})</td><td class="num">${fmtInt(v)}</td><td class="num">${fmtShare((v / mapa.total) * 100)}</td></tr>`).join('')
  return `<div class="tabela-wrap top-ufs"><table class="tabela"><caption>Top 5 estados</caption>
    <thead><tr><th scope="col">Estado</th><th scope="col" class="num">Impressões</th><th scope="col" class="num">%</th></tr></thead>
    <tbody>${linhas}</tbody></table></div>`
}

export function secaoMapa(rel: RelatorioDistribuidor): string {
  const mapa = impressoesPorUF(rel)
  const grade = svgMapa(mapa)
  const botoes = mapa
    ? `<div class="alternar" role="group" aria-label="Ver mapa por">
        <button type="button" aria-pressed="true" data-modo="estado">Por estado</button>
        <button type="button" aria-pressed="false" data-modo="regiao">Por região</button></div>`
    : ''

  if (!mapa) {
    return `<section class="bloco" id="mapa">
      ${cabecalho('Alcance geográfico', 'Impressões por estado e região')}
      <div class="mapa-layout"><div>${grade}</div>
        ${aviso(`<strong>Não há dados de impressões por estado referentes a ${rotuloMes(rel.mes)}.</strong> `
          + 'O mapa é preenchido a partir do relatório de região do gerenciador de anúncios, com cor de acordo com o volume de impressões e a divisão por região.')}</div>
    </section>`
  }

  const faltam = REDES.filter((r) => rel.redes[r] && !mapa.redes.includes(r))
  const nota = faltam.length > 0
    ? aviso(`O mapa considera só ${mapa.redes.map((r) => NOME_REDE[r]).join(' e ')}: não há dados por estado de ${faltam.map((r) => NOME_REDE[r]).join(' e ')} referentes a ${rotuloMes(rel.mes)}.`)
    : ''
  return `<section class="bloco" id="mapa">
    ${cabecalho('Alcance geográfico', 'Impressões por estado e região', `${fmtInt(mapa.total)} impressões com estado identificado em ${nomeMes(rel.mes)}. Quanto mais forte o rosa, mais impressões no estado.`)}
    <div class="mapa-layout">
      <div class="mapa-caixa">${botoes}${grade}${legenda()}</div>
      <div><h3 style="font-size:0.95rem;margin-bottom:12px">Por região</h3>${listaRegioes(rel, mapa)}${topEstados(mapa)}</div>
    </div>
    ${nota}
    ${rel.notaMapa ? aviso(esc(rel.notaMapa)) : ''}
  </section>`
}

// --- Ranking de criativos ---

// Nome sem o sufixo de cópia do Gerenciador ("— Cópia", "- Copy", "— Cópia 2"...).
function nomeBase(nome: string): string {
  return nome.replace(/\s*[—–-]\s*(c[óo]pia|copy)(\s*\d+)?\s*$/i, '').trim()
}

type CriativoUnificado = Criativo & { copias: number }

// Regra: cópias do mesmo anúncio viram uma linha só. Soma os números, junta os conjuntos
// e fica com o primeiro link disponível. O nome exibido é o do anúncio original.
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

function listaConjuntos(cs: string[]): string {
  return cs.length <= 1 ? cs.join('') : `${cs.slice(0, -1).join(', ')} e ${cs[cs.length - 1]}`
}

// Prévia do post via plugin oficial do Facebook. Só funciona para post público da página;
// anúncio "oculto" (dark post) aparece como indisponível, e o botão de link continua valendo.
function previaFacebook(link: string): string {
  if (!/facebook\.com\/[^/]+\/posts\//.test(link)) return ''
  const src = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(link)}&show_text=true&width=350`
  return `<details class="previa-fb"><summary>Ver prévia do anúncio</summary>
    <iframe src="${esc(src)}" width="350" height="560" loading="lazy" title="Prévia do anúncio no Facebook" allow="encrypted-media"></iframe></details>`
}

export function secaoCriativos(rel: RelatorioDistribuidor): string {
  const topo = cabecalho('Criativos', 'Ranking dos melhores criativos', rel.criterioRanking)
  // Regra do ranking: une as cópias e só entra anúncio com pelo menos 3 leads e 1.000
  // impressões no mês (já somadas as cópias).
  const criativos = unificarCopias(rel.criativos)
    .filter((c) => c.leads >= 3 && c.impressoes >= 1000)
    .sort((a, b) => b.leads - a.leads)
  if (criativos.length === 0) {
    return `<section class="bloco" id="criativos">${topo}
      ${aviso(`<strong>Não há ranking de criativos referente a ${rotuloMes(rel.mes)}.</strong> A partir do próximo relatório, os criativos aparecem aqui em ordem de resultado, com o link de cada anúncio.`)}</section>`
  }
  const itens = criativos.map((c, i) => {
    const ind = indicadores(c)
    const acao = c.link
      ? `<a class="link-criativo" href="${esc(c.link)}" target="_blank" rel="noopener noreferrer">Ver criativo ↗</a>`
      : '<span class="link-aguardando">Link aguardando</span>'
    return `<div class="criativo"><span class="pos">${i + 1}º</span>
      <div><h3>${esc(c.nome)}</h3><div class="meta">${c.formato} · ${NOME_REDE[c.rede]}</div>
        <div class="nums"><span>${fmtInt(c.leads)} leads</span>${ind.cpl == null ? '' : `<span>CPL ${fmtBRL(ind.cpl)}</span>`}
          ${ind.ctr == null ? '' : `<span>CTR ${fmtPct(ind.ctr)}</span>`}<span>Investimento ${fmtBRL(c.investimento)}</span></div>
        ${c.conjuntos?.length ? `<p class="obs-pequena">Anúncio utilizado nos conjuntos ${esc(listaConjuntos(c.conjuntos))}${c.copias ? ` (soma do original e ${c.copias === 1 ? '1 cópia' : `${c.copias} cópias`})` : ''}.</p>` : ''}
        ${c.link ? previaFacebook(c.link) : ''}</div>
      <div class="acao">${acao}</div></div>`
  }).join('')
  return `<section class="bloco" id="criativos">${topo}<div class="ranking">${itens}</div></section>`
}
