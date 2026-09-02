export async function GET() {
  return new Response(HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

const HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Mídia Paga Bubbles · Agosto 2026</title>
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/icon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    /* Paleta oficial da marca (DESIGN-SYSTEM.md), igual à página de captura da Linha Care */
    --rosa-bubbles: #F4CDD4;
    --branco: #F7F7F7;
    --preto: #0F0C0D;
    --rosa-profundo: #E8649A;
    --rosa-medio: #F4CDD4;
    --cinza-rosa: #6B7280;
    --cinza-claro: #E5E7EB;
    --surface: #FFFFFF;
    --bom-fg: #2F7A4C; --bom-bg: #E2EFE7;
    --atencao-fg: #9A6410; --atencao-bg: #F5EAD6;
    --prejuizo-fg: #A83A38; --prejuizo-bg: #F6E0DF;
    --link: var(--rosa-profundo);
    --focus: #E8649A;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --branco: #14100F;
      --surface: #1E1819;
      --preto: #F2E9EB;
      --rosa-bubbles: #3A2A2E;
      --rosa-profundo: #F4A6C4;
      --rosa-medio: #4A363B;
      --cinza-rosa: #C9B9BC;
      --cinza-claro: #241D1E;
      --bom-fg: #7ECB9A; --bom-bg: #1E3327;
      --atencao-fg: #E3B564; --atencao-bg: #3A2E18;
      --prejuizo-fg: #E38A87; --prejuizo-bg: #3A2320;
      --link: var(--rosa-profundo);
      --focus: #F4A6C4;
    }
  }
  :root[data-theme="dark"] {
    --branco: #14100F;
    --surface: #1E1819;
    --preto: #F2E9EB;
    --rosa-bubbles: #3A2A2E;
    --rosa-profundo: #F4A6C4;
    --rosa-medio: #4A363B;
    --cinza-rosa: #C9B9BC;
    --cinza-claro: #241D1E;
    --bom-fg: #7ECB9A; --bom-bg: #1E3327;
    --atencao-fg: #E3B564; --atencao-bg: #3A2E18;
    --prejuizo-fg: #E38A87; --prejuizo-bg: #3A2320;
    --link: var(--rosa-profundo);
    --focus: #F4A6C4;
  }

  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    background: var(--branco);
    color: var(--preto);
    font-family: 'Figtree', system-ui, sans-serif;
    line-height: 1.6;
  }
  h1, h2, h3, .num-grande, .brand-name {
    font-family: 'Poppins', system-ui, sans-serif;
    font-weight: 600;
    text-wrap: balance;
    margin: 0;
  }
  h2 { font-weight: 500; }
  .mono, .ad-name, .eyebrow, table code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  table { font-variant-numeric: tabular-nums; }
  a { color: var(--link); }
  a:focus-visible, button:focus-visible, input:focus-visible, summary:focus-visible {
    outline: 3px solid var(--focus);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  }

  /* ---- Cortina de acesso (não é segurança real, ver comentário no JS abaixo) ---- */
  #gate {
    position: fixed; inset: 0; z-index: 100;
    display: flex; align-items: center; justify-content: center;
    background: var(--branco);
    padding: 24px;
  }
  #gate.escondido { display: none; }
  .gate-card {
    background: var(--surface);
    border: 1px solid var(--rosa-medio);
    border-radius: 20px;
    padding: 40px 32px;
    max-width: 360px;
    width: 100%;
    text-align: center;
  }
  .gate-card img { width: 56px; height: auto; margin: 0 auto 16px; display: block; }
  .gate-card h1 { font-size: 1.2rem; margin-bottom: 6px; }
  .gate-card p.sub { color: var(--cinza-rosa); font-size: 0.85rem; margin: 0 0 20px; }
  .gate-card label { display: block; text-align: left; font-size: 0.8rem; font-weight: 500; margin-bottom: 6px; }
  .gate-card input[type="password"] {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1px solid var(--rosa-medio); background: var(--branco); color: var(--preto);
    font-size: 1rem; margin-bottom: 6px;
  }
  .gate-card .dica { font-size: 0.75rem; color: var(--cinza-rosa); margin: 0 0 16px; }
  .gate-card button {
    width: 100%; padding: 12px; border: none; border-radius: 10px;
    background: var(--rosa-profundo); color: #fff; font-weight: 600; font-size: 0.95rem;
    cursor: pointer;
  }
  .gate-card .erro {
    color: var(--prejuizo-fg); font-size: 0.85rem; min-height: 1.2em; margin-top: 10px;
  }

  #relatorio { display: none; }
  #relatorio.visivel { display: block; }

  header.topo {
    background: var(--rosa-profundo);
    padding: 40px 20px 32px;
  }
  .marca {
    display: flex; align-items: center; gap: 10px;
    max-width: 1100px; margin: 0 auto 28px;
  }
  /* Logo branco: o arquivo original é preto (#0d0c0d), invertido via filtro pra
     ficar branco em cima do fundo rosa profundo do cabeçalho. */
  .marca img { width: 180px; height: auto; filter: brightness(0) invert(1); }
  .topo-conteudo { max-width: 1100px; margin: 0 auto; }
  .eyebrow {
    font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
    color: #FFFFFF; opacity: 0.85; margin: 0 0 10px;
  }
  header.topo h1 { font-size: 1.6rem; max-width: 720px; margin-bottom: 12px; color: #FFFFFF; }
  header.topo .subtitulo { max-width: 640px; color: #FFFFFF; opacity: 0.85; font-size: 0.95rem; margin: 0 0 14px; }
  header.topo .meta { font-size: 0.78rem; color: #FFFFFF; opacity: 0.7; }

  main { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
  section.bloco { padding: 40px 0; border-bottom: 1px solid var(--cinza-claro); }
  section.bloco:last-of-type { border-bottom: none; }
  section.bloco h2 { font-size: 1.35rem; margin-bottom: 8px; }
  section.bloco > p.intro { color: var(--cinza-rosa); max-width: 68ch; margin: 0 0 20px; }

  .kpis {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px; margin-bottom: 24px;
  }
  .kpi { background: var(--rosa-bubbles); border-radius: 14px; padding: 16px; }
  .kpi .valor { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1.3rem; display: block; }
  .kpi .rotulo { font-size: 0.75rem; color: var(--cinza-rosa); }

  .tabela-wrap { overflow-x: auto; margin-bottom: 20px; border: 1px solid var(--cinza-claro); border-radius: 12px; }
  table { width: 100%; border-collapse: collapse; min-width: 560px; font-size: 0.85rem; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--cinza-claro); white-space: nowrap; }
  thead th { background: var(--cinza-claro); font-weight: 600; font-family: 'Figtree', sans-serif; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr.total td { font-weight: 600; background: var(--rosa-bubbles); }
  td.ad-name, th.ad-name { white-space: normal; min-width: 220px; }

  .pill {
    display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 0.72rem; font-weight: 600;
  }
  .pill.bom { color: var(--bom-fg); background: var(--bom-bg); }
  .pill.atencao { color: var(--atencao-fg); background: var(--atencao-bg); }
  .pill.prejuizo { color: var(--prejuizo-fg); background: var(--prejuizo-bg); }

  ul.bullets, ol.bullets { padding-left: 1.2em; margin: 0 0 20px; }
  ul.bullets li, ol.bullets li { margin-bottom: 8px; max-width: 68ch; }

  .caixa-destaque {
    background: var(--rosa-bubbles); border-radius: 14px; padding: 18px 20px; margin-bottom: 20px;
  }
  .caixa-destaque p { margin: 0 0 8px; }
  .caixa-destaque p:last-child { margin-bottom: 0; }

  .caixa-metodo {
    border: 1px dashed var(--rosa-medio); border-radius: 12px; padding: 14px 16px; font-size: 0.82rem;
    color: var(--cinza-rosa); margin-bottom: 20px;
  }

  .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px; }
  .card-criativo { border: 1px solid var(--cinza-claro); border-radius: 14px; padding: 16px; }
  .card-criativo h3 { font-size: 0.9rem; margin-bottom: 8px; }
  .card-criativo .ad-name { font-size: 0.78rem; display: block; margin-bottom: 12px; color: var(--cinza-rosa); }
  .btn-criativo {
    display: inline-block; font-size: 0.8rem; font-weight: 600; padding: 8px 14px; border-radius: 8px;
    background: var(--rosa-profundo); color: #fff; text-decoration: none;
  }

  .pendencias-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
  .pendencia-card { background: var(--surface); border: 1px solid var(--cinza-claro); border-radius: 14px; padding: 18px; }
  .pendencia-card h3 { font-size: 0.9rem; margin-bottom: 10px; }
  .pendencia-card ol { padding-left: 1.1em; margin: 0; font-size: 0.85rem; }
  .pendencia-card li { margin-bottom: 6px; }

  details.secundario { margin-bottom: 20px; }
  details.secundario summary {
    cursor: pointer; font-weight: 600; padding: 10px 0; font-size: 0.9rem;
  }

  footer.notas {
    padding: 32px 0 60px; font-size: 0.78rem; color: var(--cinza-rosa);
  }
  footer.notas ul { padding-left: 1.2em; }
  footer.notas li { margin-bottom: 8px; max-width: 72ch; }

  @media (max-width: 640px) {
    header.topo h1 { font-size: 1.3rem; }
    .kpi .valor { font-size: 1.1rem; }
  }
</style>
</head>
<body>

<div id="gate">
  <div class="gate-card">
    <img src="/images/bubbles-logo.svg" alt="Bubbles">
    <h1>Relatório de mídia paga</h1>
    <p class="sub">Acesso restrito ao time Bubbles</p>
    <form id="gate-form">
      <label for="gate-senha">Senha</label>
      <input type="password" id="gate-senha" autocomplete="off" autofocus>
      <p class="dica">Dica: nome da gerente</p>
      <button type="submit">Entrar</button>
      <p class="erro" id="gate-erro" role="alert"></p>
    </form>
  </div>
</div>

<div id="relatorio">
<header class="topo">
  <div class="marca">
    <img src="/images/bubbles-logo.svg" alt="Bubbles">
  </div>
  <div class="topo-conteudo">
    <p class="eyebrow">RELATÓRIO DE FECHAMENTO · MÍDIA PAGA</p>
    <h1>Mídia Paga Bubbles · Agosto 2026</h1>
    <p class="subtitulo">Fechamento das três frentes: Ecommerce Groomers (venda direta), Distribuidores Tradicional e Distribuidores Linha Care (captação B2B).</p>
    <p class="meta">Período 01–31 ago 2026 | Fontes: Google Ads e Meta Ads | Contas Meta: BUBBLES-OFICIAL e BUBBLES-DISTRIBUIDORES</p>
  </div>
</header>

<main>

<section class="bloco" id="contexto">
  <h2>1. Contexto</h2>
  <p class="intro">Este relatório cobre três frentes de tráfego pago, cada uma com objetivo, público e responsável diferentes.</p>

  <h3 style="font-size:1rem; margin-bottom:6px;">Tráfego Ecommerce (Groomers)</h3>
  <p style="max-width:68ch; margin:0 0 16px;">Venda direta de produtos profissionais para groomers e donos de pet shop, rodando em Google Ads e Meta Ads. Estratégia de Diego Santana (estrategista referência em ecommerce no Brasil), execução por mim, Gabriel, e por Caio, gestor de tráfego da consultoria.</p>

  <h3 style="font-size:1rem; margin-bottom:6px;">Tráfego Distribuidor</h3>
  <p style="max-width:68ch; margin:0 0 16px;">Captação de novos distribuidores Bubbles pelo Brasil. Estratégia e execução do tráfego 100% comigo, Gabriel.</p>

  <h3 style="font-size:1rem; margin-bottom:6px;">Tráfego Linha Care</h3>
  <p style="max-width:68ch; margin:0;">Frente nova de agosto: venda direta ao tutor do pet, não mais só ao profissional. Estudos, personas e estratégia estão sendo elaborados por Diego Santana, com início das vendas diretas ao tutor previsto para os próximos dias.</p>
</section>

<section class="bloco" id="resumo">
  <h2>2. Resumo executivo</h2>
  <div class="kpis">
    <div class="kpi"><span class="valor">R$ 46.042,90</span><span class="rotulo">Investimento total</span></div>
    <div class="kpi"><span class="valor">ROAS 5,92</span><span class="rotulo">Ecommerce Groomers (agregado)</span></div>
    <div class="kpi"><span class="valor">209 leads</span><span class="rotulo">Distribuidores, R$ 43,87 por lead</span></div>
    <div class="kpi"><span class="valor">≈ R$ 218.205</span><span class="rotulo">Receita gerada, Ecommerce · Fonte: Google Ads e Meta Ads</span></div>
  </div>

  <div class="tabela-wrap">
    <table>
      <thead>
        <tr><th>Frente</th><th>Canal</th><th>Investimento</th><th>Resultado</th><th>Retorno</th></tr>
      </thead>
      <tbody>
        <tr><td>Ecommerce Groomers</td><td>Google Ads</td><td>R$ 18.274,71</td><td>211,8 conversões</td><td>R$ 102.959,06 · ROAS 5,63</td></tr>
        <tr><td>Ecommerce Groomers</td><td>Meta Ads</td><td>R$ 18.598,71</td><td>191 compras</td><td>≈ R$ 115.246 · ROAS ≈ 6,2</td></tr>
        <tr class="total"><td>Subtotal Ecommerce</td><td></td><td>R$ 36.873,42</td><td>≈ 403 vendas</td><td>≈ R$ 218.205 · ROAS 5,92</td></tr>
        <tr><td>Distribuidores (B2B)</td><td>Meta Ads</td><td>R$ 9.169,48</td><td>209 leads</td><td>R$ 43,87 por lead</td></tr>
        <tr class="total"><td>TOTAL GERAL</td><td></td><td>R$ 46.042,90</td><td></td><td></td></tr>
      </tbody>
    </table>
  </div>

  <ul class="bullets">
    <li>Captação de distribuidor tem uma campanha eficiente carregando quase tudo (86% dos leads) e duas outras frentes com perfis bem diferentes.</li>
    <li>O gargalo da Linha Care é a página de captura, não o criativo.</li>
  </ul>

  <div class="caixa-destaque">
    <p><strong>Observação:</strong> em agosto, a captação de distribuidor rodou em 3 frentes: a Tradicional, a Linha Care e o evento Pet South. Hoje o maior desafio na parte de distribuidores é estruturar a captura de distribuidores para a Linha Care, estamos na etapa de reformulação da estratégia. Já na frente Tradicional, o desafio é produzir novos criativos.</p>
  </div>
</section>

<section class="bloco" id="ecommerce">
  <h2>2. Ecommerce Groomers</h2>

  <h3 style="font-size:1rem; margin-bottom:10px;">2.1 Google Ads · campanhas</h3>
  <div class="tabela-wrap">
    <table>
      <thead>
        <tr><th>Canal</th><th>Gasto</th><th>Conv.</th><th>Receita</th><th>ROAS</th></tr>
      </thead>
      <tbody>
        <tr class="total"><td>TOTAL Google Ads</td><td>R$ 18.274,71</td><td>211,81</td><td>R$ 102.959,06</td><td>5,63</td></tr>
      </tbody>
    </table>
  </div>

  <details class="secundario">
    <summary>Ver campanhas em detalhe</summary>
    <div class="tabela-wrap">
      <table>
        <thead>
          <tr><th>Campanha</th><th>Tipo</th><th>Gasto</th><th>Conv.</th><th>Receita</th><th>ROAS</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td class="mono">Bubbles - Branding - [Increase]</td><td>Pesquisa</td><td>R$ 3.032,44</td><td>109,82</td><td>R$ 65.225,06</td><td>21,51</td><td><span class="pill bom">Forte</span></td></tr>
          <tr><td class="mono">FUNDO_PMAX_COBERTURA_TOP_ESTADOS - 15.07.26</td><td>PMax</td><td>R$ 3.040,85</td><td>42,13</td><td>R$ 13.660,70</td><td>4,49</td><td><span class="pill bom">Saudável, limitada por orçamento</span></td></tr>
          <tr><td class="mono">FUNDO_PMAX_HEROIS_TOP_ESTADOS - 15.07.26</td><td>PMax</td><td>R$ 3.024,92</td><td>27,87</td><td>R$ 12.303,11</td><td>4,07</td><td><span class="pill bom">Saudável, limitada por orçamento</span></td></tr>
          <tr><td class="mono">PMAX_TP_TOP_ESTADOS - 14.04.26</td><td>PMax</td><td>R$ 1.876,84</td><td>17,49</td><td>R$ 5.526,38</td><td>2,94</td><td><span class="pill atencao">OK, limitada por orçamento</span></td></tr>
          <tr><td class="mono">MEIO_SEARCH_DOR_TOP_ESTADOS - 17.07.26 · Lote 3</td><td>Pesquisa</td><td>R$ 1.824,17</td><td>7,00</td><td>R$ 3.295,80</td><td>1,81</td><td><span class="pill atencao">Fraco</span></td></tr>
          <tr><td class="mono">MEIO_SEARCH_DOR_TOP_ESTADOS - 15.07.26 - Lote 2</td><td>Pesquisa</td><td>R$ 1.823,75</td><td>2,00</td><td>R$ 1.223,80</td><td>0,67</td><td><span class="pill prejuizo">Prejuízo</span></td></tr>
          <tr><td class="mono">FUNDO_SEARCH_PRODUTO_TOP_ESTADOS - 16.07.26</td><td>Pesquisa</td><td>R$ 1.828,28</td><td>2,50</td><td>R$ 1.014,73</td><td>0,56</td><td><span class="pill prejuizo">Prejuízo</span></td></tr>
          <tr><td class="mono">MEIO_SEARCH_DOR_TOP_ESTADOS - 15.07.26</td><td>Pesquisa</td><td>R$ 1.823,47</td><td>3,00</td><td>R$ 709,48</td><td>0,39</td><td><span class="pill prejuizo">Prejuízo</span></td></tr>
          <tr class="total"><td>TOTAL</td><td></td><td>R$ 18.274,71</td><td>211,81</td><td>R$ 102.959,06</td><td>5,63</td><td></td></tr>
        </tbody>
      </table>
    </div>
  </details>

  <ul class="bullets">
    <li>R$ 7.299,67 (40% do orçamento do Google) rodou em campanhas com ROAS abaixo de 1,81. As três MEIO_SEARCH_DOR mais a FUNDO_SEARCH_PRODUTO juntas geraram 14,5 conversões e R$ 6.243 de receita: não se pagam.</li>
    <li>Bubbles - Branding - [Increase] representa 63% da receita do Google com 17% do orçamento. Excelente, mas colhe demanda já existente, não gera demanda nova.</li>
    <li>3 das 4 campanhas PMax estão limitadas por orçamento, com ROAS entre 2,94 e 4,49. Há espaço para escalar.</li>
    <li>FUNDO_PMAX_HEROIS_TOP_ESTADOS - 15.07.26 mostra "Os produtos foram excluídos": problema de feed a resolver.</li>
  </ul>

  <h3 style="font-size:1rem; margin-bottom:10px;">2.2 Meta Ads · geral</h3>
  <div class="tabela-wrap">
    <table>
      <thead>
        <tr><th>Canal</th><th>Gasto</th><th>Compras</th><th>Receita</th><th>ROAS</th></tr>
      </thead>
      <tbody>
        <tr class="total"><td>TOTAL Meta Ads</td><td>R$ 18.598,71</td><td>191</td><td>≈ R$ 115.246</td><td>≈ 6,2</td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="font-size:1rem; margin-bottom:10px;">2.3 Meta Ads · top 4 por volume</h3>
  <div class="tabela-wrap">
    <table>
      <thead>
        <tr><th>#</th><th class="ad-name">Anúncio</th><th>Compras</th><th>ROAS</th><th>Gasto</th><th>Receita</th><th>Link</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td class="ad-name mono">ad16|img|continuo|frete_gratis_sul| criativo 01 - Junho – Cópia</td><td>26</td><td>16,01</td><td>R$ 1.408,16</td><td>R$ 22.548</td><td><a href="https://www.dropbox.com/scl/fo/e2jio8yx36gldml4yokic/AOyb30MJOQSTjxaOTFvXyLc?rlkey=zz1joekwtm8ervzf677azeuu9&dl=0">ver criativo</a></td></tr>
        <tr><td>2</td><td class="ad-name mono">ad29|vid|continuo|desembaraço inteligente| Internos Amanda AXOLY</td><td>17</td><td>7,52</td><td>R$ 1.542,97</td><td>R$ 11.603</td><td><a href="https://www.facebook.com/100063565944892/posts/1633266585468857/">ver criativo</a></td></tr>
        <tr><td>3</td><td class="ad-name mono">ad71|vid|continuo|Qual a diferença da Bubbles...| Vídeo 4</td><td>15</td><td>4,80</td><td>R$ 930,72</td><td>R$ 4.467</td><td><a href="https://www.facebook.com/100063565944892/posts/1633266585468857/">ver criativo</a></td></tr>
        <tr><td>4</td><td class="ad-name mono">ad06|vid|continuo|fondue_de_chocolate| oliver pet AXOLY</td><td>12</td><td>2,24</td><td>R$ 1.992,39</td><td>R$ 4.465</td><td><a href="https://www.facebook.com/100063565944892/posts/1620610350067814/">ver criativo</a></td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="font-size:1rem; margin-bottom:10px;">2.4 Meta Ads · top 4 por ROAS (piso de 5 compras)</h3>
  <div class="tabela-wrap">
    <table>
      <thead>
        <tr><th>#</th><th class="ad-name">Anúncio</th><th>ROAS</th><th>Compras</th><th>Gasto</th><th>Receita</th><th>Link</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td class="ad-name mono">ad26|vid|continuo|medo do pelo pesado| Internos Amanda AXOLY</td><td>25,38</td><td>9</td><td>R$ 216,56</td><td>R$ 5.497</td><td><a href="https://www.facebook.com/100063565944892/posts/1633198762142306/">ver criativo</a></td></tr>
        <tr><td>2</td><td class="ad-name mono">ad16|img|continuo|frete_gratis_sul| criativo 01 - Junho – Cópia</td><td>16,01</td><td>26</td><td>R$ 1.408,16</td><td>R$ 22.548</td><td><a href="https://www.dropbox.com/scl/fo/e2jio8yx36gldml4yokic/AOyb30MJOQSTjxaOTFvXyLc?rlkey=zz1joekwtm8ervzf677azeuu9&dl=0">ver criativo</a></td></tr>
        <tr><td>3</td><td class="ad-name mono">ad48|vid|continuo|Meu truque para a diluição perfeita| Oliver pet</td><td>10,19</td><td>11</td><td>R$ 682,66</td><td>R$ 6.953</td><td><a href="https://www.facebook.com/100063565944892/posts/1646702817458567/">ver criativo</a></td></tr>
        <tr><td>4</td><td class="ad-name mono">ad68|vid|continuo|Os produtos são hipoalergênicos? | Vídeo 1</td><td>9,52</td><td>5</td><td>R$ 290,35</td><td>R$ 2.764</td><td><a href="https://www.facebook.com/100063565944892/posts/1665077328954449/">ver criativo</a></td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="font-size:1rem; margin-bottom:10px;">2.5 Meta Ads · top 4 por CTR</h3>
  <div class="tabela-wrap">
    <table>
      <thead>
        <tr><th>#</th><th class="ad-name">Anúncio</th><th>CTR</th><th>Cliques no link</th><th>Impressões</th><th>Link</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td class="ad-name mono">ad30|vid|continuo|shampoo neutralizador| Joyce AXOLY</td><td>1,90%</td><td>402</td><td>21.159</td><td><a href="https://www.facebook.com/100063565944892/posts/1640697408059108/">ver criativo</a></td></tr>
        <tr><td>2</td><td class="ad-name mono">ad29|vid|continuo|desembaraço inteligente| Internos Amanda AXOLY</td><td>1,25%</td><td>1.456</td><td>116.740</td><td><a href="https://www.facebook.com/100063565944892/posts/1633266585468857/">ver criativo</a></td></tr>
        <tr><td>3</td><td class="ad-name mono">ad06|vid|continuo|fondue_de_chocolate| oliver pet AXOLY</td><td>1,11%</td><td>1.000</td><td>90.392</td><td><a href="https://www.facebook.com/100063565944892/posts/1620610350067814/">ver criativo</a></td></tr>
        <tr><td>4</td><td class="ad-name mono">ad48|vid|continuo|Meu truque para a diluição perfeita| Oliver pet</td><td>1,01%</td><td>368</td><td>36.441</td><td><a href="https://www.facebook.com/100063565944892/posts/1646702817458567/">ver criativo</a></td></tr>
      </tbody>
    </table>
  </div>
  <div class="caixa-metodo">
    <p style="margin:0;">Nota de método: dados da exportação BUBBLES-OFICIAL · Anúncios · 01–31 ago 2026, coluna "CTR (taxa de cliques no link)". Ranqueamento com piso de 5.000 impressões, mesmo critério de robustez usado no ranking por ROAS, para não premiar anúncio de baixo volume com resultado instável.</p>
  </div>

  <div class="caixa-destaque">
    <p style="margin:0;">Observação: para conferir todos os criativos da conta, a planilha completa está em <a href="https://docs.google.com/spreadsheets/d/1A3t-to4GvzghwXmrri31GWhl_22_SVq1cIEAvlo2CH4/edit?usp=sharing">docs.google.com/spreadsheets/d/1A3t-to4GvzghwXmrri31GWhl_22_SVq1cIEAvlo2CH4</a>.</p>
  </div>

  <div class="caixa-metodo">
    <p style="margin:0;">Nota de método: a exportação do Meta não traz coluna de CTA. O ranqueamento por volume e por ROAS foi feito com piso de 5 compras neste último, para não premiar volume irrelevante. O ângulo de venda está no próprio nome do anúncio.</p>
  </div>

  <h3 style="font-size:1rem; margin-bottom:10px;">2.6 Leitura de criativo</h3>
  <ul class="bullets">
    <li><span class="mono">ad16|img|continuo|frete_gratis_sul| criativo 01 - Junho – Cópia</span> é o melhor anúncio da conta, presente nos dois rankings. Risco: frequência 12,1, audiência saturada, precisa de criativo novo ou audiência maior. Link: <a href="https://www.dropbox.com/scl/fo/e2jio8yx36gldml4yokic/AOyb30MJOQSTjxaOTFvXyLc?rlkey=zz1joekwtm8ervzf677azeuu9&dl=0">ver criativo</a></li>
    <li>Três ângulos vencedores: oferta de frete grátis; dor/rotina do groomer (medo do pelo pesado, desembaraço inteligente, diluição perfeita); quebra de objeção (hipoalergênico, qual a diferença da Bubbles).</li>
    <li>Formato dominante: vídeo com criador (AXOLY, Oliver Pet, Internos Amanda), 3 das 4 posições nos dois rankings.</li>
    <li>Piores desempenhos: <span class="mono">ad06|vid|continuo|fondue_de_chocolate| oliver pet AXOLY</span> (maior gasto individual, R$ 1.992,39, ROAS 2,24); e <span class="mono">ad39|img|continuo|O problema do odor que sempre volta| Criativo</span>, ROAS 0,96, prejuízo. Link: <a href="https://www.facebook.com/100063565944892/posts/1581310690664447/">https://www.facebook.com/100063565944892/posts/1581310690664447/</a></li>
    <li>Alerta de qualidade: a maioria dos anúncios com dado está sinalizada "Abaixo da média, 35% mais baixos" em taxa de conversão. Isso indica descompasso entre a promessa do criativo e a experiência da página.</li>
  </ul>

  <details class="secundario">
    <summary>2.5 Outros criativos com link disponível (fora dos rankings)</summary>
    <div class="tabela-wrap">
      <table>
        <thead>
          <tr><th class="ad-name">Anúncio</th><th>Situação em agosto</th><th>Link</th></tr>
        </thead>
        <tbody>
          <tr><td class="ad-name mono">AD02|IMG|CONTINUO|PROMOÇAO_ABRIL|TODOS_PRODUTOS|CRIATIVO02</td><td>1 compra · R$ 252,52 · ROAS 1,91</td><td><a href="https://www.facebook.com/100063565944892/posts/1581310690664447/">ver criativo</a></td></tr>
          <tr><td class="ad-name mono">ad45|img|pontual|CAMPANHA INSTITUCIONAL| Criativo 01</td><td>Sem entrega (inativo)</td><td><a href="https://www.facebook.com/100063565944892/posts/1652550536873795/">ver criativo</a></td></tr>
          <tr><td class="ad-name mono">ad20|img|pontual|seleção_groomer_pro| criativo 04</td><td>Sem entrega (not_delivering)</td><td><a href="https://www.facebook.com/100063565944892/posts/1594432879352228/">ver criativo</a></td></tr>
          <tr><td class="ad-name mono">ad47|img|pontual|KIT COMPLETO ESSENTIAL| Criativo 03</td><td>Sem entrega (not_delivering)</td><td><a href="https://www.facebook.com/100063565944892/posts/1652687026860146/">ver criativo</a></td></tr>
        </tbody>
      </table>
    </div>
  </details>
</section>

<section class="bloco" id="distribuidores">
  <h2>3. Distribuidores (B2B)</h2>

  <div class="caixa-destaque">
    <p>A campanha "Mensagem | Petshops | WhatsApp [Increase] - Copy" foi excluída deste fechamento.</p>
    <p>A campanha Linha Care foi contabilizada com 17 leads (ajuste manual), embora a exportação do Meta registre 7.</p>
  </div>

  <div class="kpis">
    <div class="kpi"><span class="valor">R$ 9.169,48</span><span class="rotulo">Gasto</span></div>
    <div class="kpi"><span class="valor">209</span><span class="rotulo">Leads</span></div>
    <div class="kpi"><span class="valor">R$ 43,87</span><span class="rotulo">Custo por lead</span></div>
    <div class="kpi"><span class="valor">4.170</span><span class="rotulo">Cliques no link (CTR 1,44%)</span></div>
    <div class="kpi"><span class="valor">R$ 31,71</span><span class="rotulo">CPM médio</span></div>
    <div class="kpi"><span class="valor">289.146</span><span class="rotulo">Impressões</span></div>
  </div>

  <div class="tabela-wrap">
    <table>
      <thead>
        <tr><th class="ad-name">Campanha</th><th>Status</th><th>Leads</th><th>Gasto</th><th>Custo por lead</th><th>CPM</th><th>Freq.</th><th>Cliques link</th></tr>
      </thead>
      <tbody>
        <tr><td class="ad-name mono">[GX] [Conv] [Leads] [Novos Distribuidores] V2</td><td>Ativa</td><td>180</td><td>R$ 4.162,50</td><td>R$ 23,13</td><td>R$ 35,11</td><td>2,19</td><td>1.426</td></tr>
        <tr><td class="ad-name mono">[GX] [Conv] [Leads] [Novos Distribuidores/Petshop] Linha Care</td><td>Ativa</td><td>17*</td><td>R$ 3.300,22</td><td>R$ 194,13</td><td>R$ 24,47</td><td>3,17</td><td>2.254</td></tr>
        <tr><td class="ad-name mono">[GX] [Conv] [Leads] [Novos Distribuidores] Pet South</td><td>Encerrada</td><td>12</td><td>R$ 1.706,76</td><td>R$ 142,23</td><td>R$ 47,78</td><td>2,56</td><td>490</td></tr>
        <tr class="total"><td>TOTAL</td><td></td><td>209</td><td>R$ 9.169,48</td><td>R$ 43,87</td><td>R$ 31,71</td><td></td><td>4.170</td></tr>
      </tbody>
    </table>
  </div>
  <p style="font-size:0.78rem; color:var(--cinza-rosa); margin-top:-10px;">* 17 leads considerados; a exportação do Meta registrou 7.</p>

  <h3 style="font-size:1rem; margin: 20px 0 10px;">Criativos campeões</h3>
  <div class="cards-grid">
    <div class="card-criativo">
      <h3>Distribuidores Tradicional · [GX] V2</h3>
      <span class="ad-name mono">ad35|img|continuo|CAMP. DISTRIBUIDORES NACIONAL| artes internas</span>
      <a class="btn-criativo" href="https://www.facebook.com/100063565944892/posts/1647497520712430/">ver criativo</a>
    </div>
    <div class="card-criativo">
      <h3>Linha Care</h3>
      <span class="ad-name mono">ad79|vid|continuo|VÍDEO 2 - LARI: 1 SERVIÇO 2 FATURAMENTO| Linha Care</span>
      <a class="btn-criativo" href="https://www.facebook.com/100063565944892/posts/1675876747874507/">ver criativo</a>
    </div>
    <div class="card-criativo">
      <h3>Pet South · convite de evento</h3>
      <span class="ad-name mono">ad02|vid|pontual|Trafego distribuidores PSA| Claudio</span>
      <a class="btn-criativo" href="https://www.facebook.com/100063565944892/posts/1675716314557217/">ver criativo</a>
    </div>
  </div>

  <div class="caixa-destaque">
    <p><span class="mono">ad34|vid|continuo|captação_de_distribuidores| vídeo guilherme comercial</span> ficou pausado o mês inteiro por saturação. Link: <a href="https://www.facebook.com/100063565944892/posts/1601236435338539/">ver criativo</a></p>
    <p>A campanha Pet South em agosto foi específica de evento, não captação contínua: o custo por lead mais alto deve ser lido como ativação de evento, não aquisição.</p>
  </div>

  <ul class="bullets">
    <li>[GX] V2 carrega a operação: 180 dos 209 leads (86%), R$ 23,13, frequência confortável de 2,19. É onde concentrar orçamento.</li>
    <li>Linha Care tem problema de página, não de criativo: 2.254 cliques no link (o maior da conta), só 17 leads (0,75% de conversão pós-clique). CPM mais barato da conta (R$ 24,47), o criativo atrai bem e barato, o funil quebra na página de captura. Frequência 3,17 já pressiona.</li>
    <li>Pet South foi encerrada corretamente: maior CPM da conta (R$ 47,78), R$ 142 por lead, coerente com janela curta de evento.</li>
    <li>O lead de [GX] V2 custa 8,4 vezes menos que o da Linha Care.</li>
  </ul>
</section>

<section class="bloco" id="pendencias">
  <h2>4. Pendências por frente</h2>
  <div class="pendencias-grid">
    <div class="pendencia-card">
      <h3>Linha Care (produto, B2C)</h3>
      <ol>
        <li>Criação e configuração das contas de anúncio</li>
        <li>Aguardando os criativos Axoly</li>
        <li>Aguardando o Axoly B2C</li>
      </ol>
    </div>
    <div class="pendencia-card">
      <h3>Distribuidores Tradicional (captação B2B contínua)</h3>
      <ol>
        <li>Novos criativos</li>
        <li>Criação das campanhas de Google Ads para captação de distribuidor</li>
      </ol>
    </div>
    <div class="pendencia-card">
      <h3>Distribuidores Care (captação B2B da Linha Care)</h3>
      <ol>
        <li>Criação de nova página de captura, a atual fracassou</li>
        <li>Criação de novos anúncios</li>
      </ol>
    </div>
    <div class="pendencia-card">
      <h3>Ecommerce Groomers (venda direta)</h3>
      <ol>
        <li>Imagens e vídeos das campanhas de PMax e Search</li>
      </ol>
    </div>
  </div>
</section>

<section class="bloco" id="recomendacoes">
  <h2>5. Recomendações para setembro</h2>
  <h3 style="font-size:1rem; margin-bottom:10px;">Prioridade alta</h3>
  <ol class="bullets">
    <li>Resolver o problema de exclusão de produtos em <span class="mono">FUNDO_PMAX_HEROIS_TOP_ESTADOS - 15.07.26</span>.</li>
    <li>Nova página de captura da Linha Care: maior impacto financeiro imediato (R$ 3.300 gastos em agosto com 0,75% de conversão pós-clique).</li>
    <li>Trocar ou ampliar a audiência de <span class="mono">ad16|img|continuo|frete_gratis_sul| criativo 01 - Junho – Cópia</span>: frequência 12,1 insustentável, é o maior gerador de receita.</li>
  </ol>
  <h3 style="font-size:1rem; margin-bottom:10px;">Prioridade média</h3>
  <ol class="bullets">
    <li>Aumentar orçamento das campanhas PMax limitadas por orçamento com ROAS acima de 4: FUNDO_PMAX_COBERTURA_TOP_ESTADOS - 15.07.26 e FUNDO_PMAX_HEROIS_TOP_ESTADOS - 15.07.26.</li>
    <li>Produzir novos criativos nos três ângulos vencedores, em formato de vídeo com criador.</li>
    <li>Escalar [GX] [Conv] [Leads] [Novos Distribuidores] V2 enquanto a frequência permitir.</li>
  </ol>
</section>

<footer class="notas">
  <h2 style="font-size:1.1rem; margin-bottom:12px;">6. Notas de dados</h2>
  <ul>
    <li>Todos os valores são referentes ao período de 01 a 31 de agosto de 2026. Os links de criativo foram fornecidos separadamente e não alteram nenhum número.</li>
    <li>O Google conta "conversões" (valor fracionário, incluindo ações modeladas, múltiplos tipos de conversão). O Meta conta "compras" do pixel. A comparação entre canais é de ordem de grandeza, não linha a linha.</li>
    <li>Total da conta Google (incluindo campanhas fora do filtro do relatório): R$ 20.399,82 · 236,09 conversões · R$ 112.163,07.</li>
    <li>Meta Ecommerce consolidado somando os conjuntos de anúncio entregues, conta BUBBLES-OFICIAL.</li>
    <li>O arquivo de Distribuidores é em nível de campanha, sem detalhamento por anúncio. Os criativos campeões foram informados manualmente.</li>
    <li>Distribuidores não tem receita atribuída, a métrica é lead.</li>
    <li>Links de criativo ausentes para: <span class="mono">ad29|vid|continuo|desembaraço inteligente| Internos Amanda AXOLY</span>; <span class="mono">ad71|vid|continuo|Qual a diferença da Bubbles...| Vídeo 4</span>; <span class="mono">ad06|vid|continuo|fondue_de_chocolate| oliver pet AXOLY</span>; <span class="mono">ad26|vid|continuo|medo do pelo pesado| Internos Amanda AXOLY</span>; <span class="mono">ad48|vid|continuo|Meu truque para a diluição perfeita| Oliver pet</span>; <span class="mono">ad68|vid|continuo|Os produtos são hipoalergênicos? | Vídeo 1</span>.</li>
  </ul>
</footer>

</main>
</div>

<script>
  // Isto é uma cortina de acesso casual, não segurança real: a senha fica visível
  // no código-fonte desta página. Serve só para evitar que o link circule por acaso,
  // não para proteger dado sensível.
  (function () {
    var SENHA = 'mariane';
    var chaveSessao = 'bubbles_relatorio_ago26_ok';
    var gate = document.getElementById('gate');
    var relatorio = document.getElementById('relatorio');
    var form = document.getElementById('gate-form');
    var input = document.getElementById('gate-senha');
    var erro = document.getElementById('gate-erro');

    function liberar() {
      gate.classList.add('escondido');
      relatorio.classList.add('visivel');
    }

    try {
      if (sessionStorage.getItem(chaveSessao) === '1') {
        liberar();
      }
    } catch (e) {}

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (input.value === SENHA) {
        try { sessionStorage.setItem(chaveSessao, '1'); } catch (e) {}
        erro.textContent = '';
        liberar();
      } else {
        erro.textContent = 'Senha incorreta. Tente de novo.';
        input.focus();
        input.select();
      }
    });
  })();
</script>

</body>
</html>`
