// src/lib/relatorio-distribuidor/render.ts
// Monta o HTML completo de um relatório mensal a partir do arquivo de dados do mês.
// Uso numa rota: `return respostaRelatorio(dadosDoMes)`.
import type { RelatorioDistribuidor } from './tipos'
import { CSS } from './estilos'
import { NOME_REDE, REDES } from './calculos'
import { esc, nomeMes, rotuloMes } from './format'
import { secaoCampanhas, secaoConsolidado, secaoFunil, secaoRedes } from './secoes-numeros'
import { secaoCriativos, secaoMapa } from './secoes-mapa'
import {
  secaoComercial, secaoDesafios, secaoLeitura, secaoPaginas, secaoPlanoAnterior, secaoPlanoProximo,
  secaoRegioesFoco, secaoRelatoriosAnteriores, secaoTimeline,
} from './secoes-texto'

function chipsRedes(rel: RelatorioDistribuidor): string {
  return REDES.map((r) => rel.redes[r]
    ? `<span class="chip">✓ ${NOME_REDE[r]}</span>`
    : `<span class="chip sem">${NOME_REDE[r]}: sem dados em ${nomeMes(rel.mes)}</span>`).join('')
}

// Sumário lateral no mesmo padrão dos relatórios semanais (public/relatorios/…-v2):
// itens numerados, barra rosa no item ativo e, no celular, botão "☰ Sumário" que abre
// uma gaveta. Montado a partir das próprias seções (id + <h2>), acompanha sozinho o que
// entra ou sai do relatório.
function sumario(secoes: string[]): string {
  const itens = secoes.map((s) => ({
    id: s.match(/<section[^>]*id="([^"]+)"/)?.[1],
    titulo: s.match(/<h2>([^<]+)<\/h2>/)?.[1],
  })).filter((x) => x.id && x.titulo)
  const lista = itens.map((x, i) => `<li><a href="#${x.id}" data-toc-alvo="${x.id}">`
    + `<span class="toc__num">${String(i + 1).padStart(2, '0')}</span><span class="toc__texto">${x.titulo}</span></a></li>`).join('')
  return `<nav class="toc" id="sumario" aria-label="Sumário"><p class="toc__label">Sumário</p><ul class="toc__list">${lista}</ul></nav>
<button type="button" class="toc__toggle" id="toc-toggle" aria-expanded="false" aria-controls="sumario">☰ Sumário</button>
<div class="toc__backdrop" id="toc-backdrop"></div>`
}

export function renderRelatorio(rel: RelatorioDistribuidor): string {
  const mesAno = rotuloMes(rel.mes)
  // Mês sempre com inicial maiúscula e em negrito no topo e no rodapé (ex: "Agosto de 2026").
  const mesTitulo = `${mesAno.charAt(0).toUpperCase()}${mesAno.slice(1)}`
  const publico = rel.publico ?? 'Equipe de Marketing e Comercial'
  const titulo = `Relatório de Captação de Distribuidores · ${mesTitulo}`
  // Ordem das seções: primeiro o consolidado das redes, depois o detalhe, e no fim o que
  // foi feito, o que vem a seguir e o histórico.
  const secoes = [
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
    secaoRelatoriosAnteriores(rel),
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
<style>${CSS}</style>
</head>
<body>
<header class="topo">
  <div class="topo-conteudo">
    <img class="logo" src="/images/bubbles-logo.svg" alt="Bubbles">
    <h1>Relatório de Captação de Distribuidores</h1>
    <p class="sub"><strong>${mesTitulo}</strong> · ${esc(rel.periodo)} · ${esc(publico)}</p>
    <div class="chips">${chipsRedes(rel)}</div>
  </div>
</header>
<div class="pagina">
${sumario(secoes)}
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
  // Sumário: destaca a seção que está na tela.
  var linksSumario = document.querySelectorAll('.toc__list a');
  if ('IntersectionObserver' in window && linksSumario.length) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        linksSumario.forEach(function (a) {
          var ativo = a.dataset.tocAlvo === en.target.id;
          a.classList.toggle('is-active', ativo);
          if (ativo) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
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

export function respostaRelatorio(rel: RelatorioDistribuidor): Response {
  return new Response(renderRelatorio(rel), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
