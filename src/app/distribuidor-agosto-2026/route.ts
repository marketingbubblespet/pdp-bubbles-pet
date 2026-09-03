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
<title>Relatório de Captação de Distribuidores · Agosto 2026</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --rosa: #F4CDD4;
    --rosa-fundo: #FDF2F4;
    --rosa-accent: #E8649A;
    --preto: #0D0C0D;
    --texto: #666666;
    --texto-mudo: #888888;
    --fundo: #F7F7F7;
    --card: #FFFFFF;
    --borda: #E5E7EB;
    --bom-fg: #166534; --bom-bg: #f0fdf4; --bom-borda: #bbf7d0;
    --atencao-fg: #9A6410; --atencao-bg: #FEF3E2; --atencao-borda: #FBE0A8;
    --prejuizo-fg: #A83A38; --prejuizo-bg: #FDECEC; --prejuizo-borda: #F6C6C4;
    --pendente-fg: #6B5D60; --pendente-bg: #F1EBEC;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--fundo);
    color: var(--preto);
    font-family: 'Poppins', system-ui, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    font-size: 15px;
  }
  h1, h2, h3, .numero-grande { font-weight: 500; text-wrap: balance; margin: 0; }
  strong, b { font-weight: 600; }
  table { font-variant-numeric: tabular-nums; }
  a { color: var(--rosa-accent); }
  a:focus-visible, button:focus-visible { outline: 3px solid var(--rosa-accent); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }

  header.topo {
    background: var(--rosa);
    padding: 32px 20px;
  }
  .marca { display: flex; align-items: center; gap: 10px; max-width: 1000px; margin: 0 auto 18px; }
  .marca img { width: 36px; height: auto; }
  .marca span { font-size: 1rem; font-weight: 600; }
  .topo-conteudo { max-width: 1000px; margin: 0 auto; }
  header.topo h1 { font-size: 1.7rem; color: var(--preto); margin-bottom: 6px; }
  header.topo p.sub { font-size: 0.95rem; color: #5c4650; margin: 0; }

  main { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
  section.bloco { padding: 36px 0; border-bottom: 1px solid var(--borda); }
  section.bloco:last-of-type { border-bottom: none; }
  section.bloco h2 { font-size: 1.25rem; margin-bottom: 6px; }
  section.bloco > p.intro { color: var(--texto); max-width: 68ch; margin: 0 0 20px; }

  /* Cards de destaque */
  .kpis-principais {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px; margin-bottom: 16px;
  }
  .kpi-card {
    background: var(--card); border: 1px solid var(--borda); border-radius: 20px;
    padding: 18px 16px; text-align: center;
  }
  .kpi-card .valor { display: block; font-size: 1.5rem; font-weight: 600; color: var(--preto); }
  .kpi-card .rotulo { display: block; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--rosa-accent); margin-top: 4px; }

  .kpis-secundarios {
    display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
    background: var(--rosa-fundo); border-radius: 12px; padding: 14px; margin-bottom: 8px;
  }
  .kpis-secundarios span { font-size: 0.82rem; color: var(--texto); font-weight: 500; }
  .kpis-secundarios b { color: var(--preto); }

  /* Funil */
  .funil { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .funil-etapa {
    display: flex; align-items: center; gap: 14px; background: var(--card);
    border: 1px solid var(--borda); border-radius: 12px; padding: 12px 16px;
  }
  .funil-etapa.pendente {
    background: var(--pendente-bg); border-style: dashed; border-color: #C7BBBE; opacity: 0.85;
  }
  .funil-barra-wrap { flex: 1; min-width: 0; }
  .funil-barra-fundo { background: var(--borda); border-radius: 6px; height: 10px; overflow: hidden; }
  .funil-barra { background: var(--rosa-accent); height: 100%; border-radius: 6px; }
  .funil-etapa.pendente .funil-barra-fundo { background: #E2D8DA; }
  .funil-label { width: 130px; flex-shrink: 0; font-size: 0.85rem; font-weight: 600; color: var(--preto); }
  .funil-valor { width: 140px; flex-shrink: 0; text-align: right; font-size: 0.85rem; font-weight: 600; }
  .funil-conv { width: 90px; flex-shrink: 0; text-align: right; font-size: 0.75rem; color: var(--texto); }
  .tag-pendente {
    display: inline-flex; align-items: center; gap: 4px; font-size: 0.68rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.03em; color: var(--pendente-fg);
    background: #E2D8DA; border-radius: 999px; padding: 2px 8px;
  }

  .nota-alerta {
    background: var(--atencao-bg); border: 1px solid var(--atencao-borda); border-radius: 14px;
    padding: 14px 18px; font-size: 0.85rem; color: #6b4a0a; margin-bottom: 4px;
  }
  .nota-alerta strong { color: var(--atencao-fg); }

  /* Funis por campanha */
  .campanhas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .campanha-card { background: var(--card); border: 1px solid var(--borda); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .campanha-card h3 { font-size: 1rem; }
  .status-pill { display: inline-block; align-self: flex-start; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; border-radius: 999px; padding: 3px 10px; }
  .status-pill.ativa { color: var(--bom-fg); background: var(--bom-bg); border: 1px solid var(--bom-borda); }
  .status-pill.reduzida { color: var(--atencao-fg); background: var(--atencao-bg); border: 1px solid var(--atencao-borda); }
  .status-pill.encerrada { color: var(--pendente-fg); background: var(--pendente-bg); border: 1px solid #D8CCCF; }
  .mini-funil { display: flex; flex-direction: column; gap: 4px; font-size: 0.78rem; }
  .mini-funil-linha { display: flex; justify-content: space-between; gap: 8px; padding: 3px 0; border-bottom: 1px dashed var(--borda); }
  .mini-funil-linha:last-child { border-bottom: none; }
  .mini-funil-linha .conv { color: var(--texto-mudo); font-size: 0.72rem; }
  .mini-funil-linha.pendente { color: var(--pendente-fg); font-style: italic; }
  .campanha-metricas { display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.76rem; color: var(--texto); }
  .campanha-metricas span { background: var(--rosa-fundo); border-radius: 8px; padding: 3px 8px; }
  .campanha-destaque { font-size: 0.8rem; color: var(--texto); background: var(--fundo); border-radius: 10px; padding: 8px 10px; }
  .campanha-nota { font-size: 0.74rem; color: var(--prejuizo-fg); }

  .leitura-analitica {
    background: var(--rosa-fundo); border-radius: 20px; padding: 20px 24px; font-size: 0.9rem;
    color: var(--preto); line-height: 1.7;
  }

  /* Timeline */
  .timeline-wrap { overflow-x: auto; padding: 8px 0 4px; }
  .timeline { min-width: 560px; position: relative; padding: 30px 0 10px; }
  .timeline-eixo { position: relative; height: 6px; background: var(--borda); border-radius: 3px; margin-bottom: 6px; }
  .timeline-linha { position: absolute; top: 0; height: 6px; border-radius: 3px; background: var(--rosa-accent); }
  .timeline-linha.encerrada { background: var(--pendente-fg); opacity: 0.5; }
  .timeline-rotulo { font-size: 0.78rem; font-weight: 600; color: var(--preto); margin-bottom: 2px; }
  .timeline-datas { font-size: 0.7rem; color: var(--texto-mudo); margin-bottom: 14px; }
  .timeline-marco {
    position: absolute; top: -26px; transform: translateX(-50%); text-align: center; font-size: 0.7rem;
  }
  .timeline-marco .ponto { width: 10px; height: 10px; border-radius: 50%; background: var(--rosa-accent); margin: 0 auto 4px; }
  .timeline-marco .rotulo { font-weight: 600; color: var(--preto); white-space: nowrap; }

  /* Desafios */
  .desafios { display: flex; flex-direction: column; gap: 10px; }
  .desafio { display: flex; gap: 12px; background: var(--card); border: 1px solid var(--borda); border-radius: 14px; padding: 14px 16px; }
  .desafio .icone { font-size: 1.1rem; flex-shrink: 0; }
  .desafio h4 { font-size: 0.88rem; font-weight: 600; margin: 0 0 2px; }
  .desafio p { font-size: 0.82rem; color: var(--texto); margin: 0; }

  /* Reunião comercial x marketing */
  .duas-colunas { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
  .coluna-card { border-radius: 20px; padding: 18px 20px; }
  .coluna-card.aplicado { background: var(--bom-bg); border: 1px solid var(--bom-borda); }
  .coluna-card.pendente { background: var(--atencao-bg); border: 1px solid var(--atencao-borda); }
  .coluna-card h3 { font-size: 0.95rem; margin-bottom: 10px; }
  .coluna-card ul { margin: 0; padding-left: 1.2em; font-size: 0.85rem; }
  .coluna-card li { margin-bottom: 6px; }

  /* Páginas de captação */
  .links-lista { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .links-lista li { background: var(--card); border: 1px solid var(--borda); border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
  .links-lista .em-aprovacao { font-size: 0.7rem; color: var(--atencao-fg); font-weight: 600; }

  /* Regiões foco */
  .regioes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .regiao-card { background: var(--card); border: 1px solid var(--borda); border-radius: 20px; padding: 20px; }
  .regiao-card h3 { font-size: 0.95rem; margin-bottom: 8px; color: var(--rosa-accent); }
  .regiao-card p { font-size: 0.85rem; color: var(--texto); margin: 0; }

  /* Plano de ação */
  ol.plano { padding-left: 1.3em; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  ol.plano li { font-size: 0.9rem; }
  .item-destaque {
    list-style: none; margin-left: -1.3em; background: var(--rosa-fundo); border: 2px solid var(--rosa-accent);
    border-radius: 14px; padding: 14px 16px; margin-top: 6px;
  }
  .item-destaque strong { color: var(--rosa-accent); }
  .item-destaque ul { margin: 8px 0 0; padding-left: 1.2em; font-size: 0.85rem; }
  .item-destaque ul li { margin-bottom: 4px; }

  footer.rodape { padding: 24px 0 48px; font-size: 0.72rem; color: var(--texto-mudo); text-align: center; }

  @media (max-width: 640px) {
    header.topo h1 { font-size: 1.35rem; }
    .funil-etapa { flex-wrap: wrap; }
    .funil-label { width: 100%; }
    .funil-barra-wrap { width: 100%; order: 3; }
    .funil-valor, .funil-conv { width: auto; }
  }

  @media print {
    body { background: #fff; font-size: 12px; }
    header.topo { background: var(--rosa) !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    section.bloco { break-inside: avoid; padding: 20px 0; }
    .kpi-card, .campanha-card, .desafio, .regiao-card, .coluna-card { break-inside: avoid; }
    a { color: var(--preto); text-decoration: none; }
  }
</style>
</head>
<body>

<header class="topo">
  <div class="marca">
    <img src="/images/bubbles-logo.svg" alt="Bubbles">
    <span>Bubbles</span>
  </div>
  <div class="topo-conteudo">
    <h1>Relatório de Captação de Distribuidores</h1>
    <p class="sub">Agosto de 2026 · 01/08 a 31/08 · Apresentação à diretoria em 03/09/2026</p>
  </div>
</header>

<main>

<section class="bloco" id="destaques">
  <div class="kpis-principais">
    <div class="kpi-card"><span class="valor">R$ 9.169,48</span><span class="rotulo">Investimento total</span></div>
    <div class="kpi-card"><span class="valor">289.147</span><span class="rotulo">Impressões</span></div>
    <div class="kpi-card"><span class="valor">4.170</span><span class="rotulo">Cliques</span></div>
    <div class="kpi-card"><span class="valor">209</span><span class="rotulo">Leads gerados</span></div>
    <div class="kpi-card"><span class="valor">R$ 43,87</span><span class="rotulo">Custo por lead</span></div>
  </div>
  <div class="kpis-secundarios">
    <span>CTR geral <b>1,44%</b></span>
    <span>·</span>
    <span>CPC <b>R$ 2,20</b></span>
    <span>·</span>
    <span>CPM <b>R$ 31,71</b></span>
    <span>·</span>
    <span>Conversão clique → lead <b>5,01%</b></span>
  </div>
</section>

<section class="bloco" id="funil-consolidado">
  <h2>Funil consolidado</h2>
  <p class="intro">Da impressão ao lead, o funil está completo. As duas últimas etapas, que fecham o ciclo comercial, ainda dependem de dado externo à mídia paga.</p>

  <div class="funil">
    <div class="funil-etapa">
      <span class="funil-label">Impressões</span>
      <div class="funil-barra-wrap"><div class="funil-barra-fundo"><div class="funil-barra" style="width:100%"></div></div></div>
      <span class="funil-valor">289.147</span>
      <span class="funil-conv">—</span>
    </div>
    <div class="funil-etapa">
      <span class="funil-label">Cliques</span>
      <div class="funil-barra-wrap"><div class="funil-barra-fundo"><div class="funil-barra" style="width:1.44%"></div></div></div>
      <span class="funil-valor">4.170</span>
      <span class="funil-conv">1,44%</span>
    </div>
    <div class="funil-etapa">
      <span class="funil-label">Leads</span>
      <div class="funil-barra-wrap"><div class="funil-barra-fundo"><div class="funil-barra" style="width:5%"></div></div></div>
      <span class="funil-valor">209</span>
      <span class="funil-conv">5,01%</span>
    </div>
    <div class="funil-etapa pendente">
      <span class="funil-label">Reuniões</span>
      <div class="funil-barra-wrap"><div class="funil-barra-fundo"></div></div>
      <span class="funil-valor"><span class="tag-pendente">Dado pendente</span></span>
      <span class="funil-conv">—</span>
    </div>
    <div class="funil-etapa pendente">
      <span class="funil-label">Fechamentos</span>
      <div class="funil-barra-wrap"><div class="funil-barra-fundo"></div></div>
      <span class="funil-valor"><span class="tag-pendente">Dado pendente</span></span>
      <span class="funil-conv">—</span>
    </div>
  </div>

  <div class="nota-alerta">
    ⚠️ <strong>Lacuna de dados:</strong> as etapas de Reuniões e Fechamentos ainda não foram recebidas do time comercial. Sem elas não é possível calcular o custo por reunião, o custo por fechamento nem a taxa de conversão comercial, que é tipicamente onde o funil mais perde volume. A definição desse fluxo mensal está no plano de ação.
  </div>
</section>

<section class="bloco" id="campanhas">
  <h2>Funis por campanha</h2>
  <div class="campanhas-grid">

    <div class="campanha-card">
      <div style="display:flex; justify-content:space-between; align-items:start; gap:8px;">
        <h3>Distribuidor Tradicional</h3>
        <span class="status-pill ativa">Ativa</span>
      </div>
      <div class="mini-funil">
        <div class="mini-funil-linha"><span>Impressões</span><span>118.542</span></div>
        <div class="mini-funil-linha"><span>Cliques</span><span>1.426 <span class="conv">(CTR 1,20%)</span></span></div>
        <div class="mini-funil-linha"><span>Leads</span><span>180 <span class="conv">(12,62%)</span></span></div>
        <div class="mini-funil-linha pendente"><span>Reuniões</span><span>Pendente</span></div>
        <div class="mini-funil-linha pendente"><span>Fechamentos</span><span>Pendente</span></div>
      </div>
      <div class="campanha-metricas">
        <span>Investimento R$ 4.162,50</span>
        <span>CPL R$ 23,12</span>
        <span>CPC R$ 2,92</span>
        <span>CPM R$ 35,11</span>
      </div>
      <div class="campanha-destaque">Melhor CPL e melhor taxa de conversão clique → lead da conta.</div>
    </div>

    <div class="campanha-card">
      <div style="display:flex; justify-content:space-between; align-items:start; gap:8px;">
        <h3>Linha Care</h3>
        <span class="status-pill reduzida">Ativa, verba reduzida</span>
      </div>
      <div class="mini-funil">
        <div class="mini-funil-linha"><span>Impressões</span><span>134.887</span></div>
        <div class="mini-funil-linha"><span>Cliques</span><span>2.254 <span class="conv">(CTR 1,67%)</span></span></div>
        <div class="mini-funil-linha"><span>Leads</span><span>17 <span class="conv">(0,75%)</span></span></div>
        <div class="mini-funil-linha pendente"><span>Reuniões</span><span>Pendente</span></div>
        <div class="mini-funil-linha pendente"><span>Fechamentos</span><span>Pendente</span></div>
      </div>
      <div class="campanha-metricas">
        <span>Investimento R$ 3.300,22</span>
        <span>CPL R$ 194,13</span>
        <span>CPC R$ 1,46</span>
        <span>CPM R$ 24,47</span>
      </div>
      <div class="campanha-destaque">Verba reduzida em 80% desde 19/08.</div>
      <div class="campanha-nota">* Leads corrigidos manualmente de 7 para 17: houve falha no envio dos leads do site para a Sellum, que subnotificou os resultados desta campanha.</div>
    </div>

    <div class="campanha-card">
      <div style="display:flex; justify-content:space-between; align-items:start; gap:8px;">
        <h3>Pet South</h3>
        <span class="status-pill encerrada">Encerrada em 15/08</span>
      </div>
      <div class="mini-funil">
        <div class="mini-funil-linha"><span>Impressões</span><span>35.718</span></div>
        <div class="mini-funil-linha"><span>Cliques</span><span>490 <span class="conv">(CTR 1,37%)</span></span></div>
        <div class="mini-funil-linha"><span>Leads</span><span>12 <span class="conv">(2,45%)</span></span></div>
        <div class="mini-funil-linha pendente"><span>Reuniões</span><span>Pendente</span></div>
        <div class="mini-funil-linha pendente"><span>Fechamentos</span><span>Pendente</span></div>
      </div>
      <div class="campanha-metricas">
        <span>Investimento R$ 1.706,76</span>
        <span>CPL R$ 142,23</span>
        <span>CPC R$ 3,48</span>
        <span>CPM R$ 47,78</span>
      </div>
      <div class="campanha-destaque">Evento anual, encerramento planejado: não é queda de performance.</div>
    </div>

  </div>
</section>

<section class="bloco" id="leitura">
  <h2>Leitura analítica</h2>
  <div class="leitura-analitica">
    A Linha Care teve o <strong>melhor CTR da conta (1,67%)</strong> e o <strong>menor custo por clique (R$ 1,46)</strong>, indicando que o criativo e a segmentação funcionaram. No entanto, foi a campanha com a <strong>pior conversão de clique em lead (0,75%, contra 12,62% da Distribuidor Tradicional)</strong>, um custo por lead 8,4 vezes maior. O gargalo, portanto, não está na mídia, e sim na landing page, o que motivou a criação de uma versão B, atualmente em aprovação.
  </div>
</section>

<section class="bloco" id="timeline">
  <h2>Linha do tempo das campanhas</h2>
  <div class="timeline-wrap">
    <div class="timeline">
      <div style="position:relative;">
        <div class="timeline-marco" style="left:58%;">
          <div class="ponto"></div>
          <div class="rotulo">18/08 · Reunião Comercial × Marketing</div>
        </div>
      </div>

      <div class="timeline-rotulo">Distribuidor Tradicional</div>
      <div class="timeline-eixo"><div class="timeline-linha" style="left:0%; width:100%;"></div></div>
      <div class="timeline-datas">01/08 → 31/08 · contínua</div>

      <div class="timeline-rotulo">Linha Care</div>
      <div class="timeline-eixo"><div class="timeline-linha" style="left:0%; width:100%;"></div></div>
      <div class="timeline-datas">01/08 → 31/08 · contínua, com redução de verba em 19/08</div>

      <div class="timeline-rotulo">Pet South</div>
      <div class="timeline-eixo"><div class="timeline-linha encerrada" style="left:0%; width:48%;"></div></div>
      <div class="timeline-datas">01/08 → 15/08 · encerrada</div>
    </div>
  </div>
</section>

<section class="bloco" id="desafios">
  <h2>Desafios do período</h2>
  <div class="desafios">
    <div class="desafio">
      <span class="icone">⚠️</span>
      <div>
        <h4>Falha no envio de leads para a Sellum</h4>
        <p>Leads da Linha Care subnotificados (7 registrados vs. 17 reais). Correção em andamento.</p>
      </div>
    </div>
    <div class="desafio">
      <span class="icone">⚠️</span>
      <div>
        <h4>Landing page da Linha Care com baixíssima conversão</h4>
        <p>0,75% de clique para lead. Versão B criada, em processo de aprovação.</p>
      </div>
    </div>
    <div class="desafio">
      <span class="icone">⚠️</span>
      <div>
        <h4>Atraso na produção de criativos</h4>
        <p>Os novos vídeos de distribuidor definidos na reunião de 18/08 ainda não foram gravados, o que travou o aumento de verba e a entrada no Google Ads.</p>
      </div>
    </div>
  </div>
</section>

<section class="bloco" id="reuniao">
  <h2>Reunião Comercial × Marketing (18/08)</h2>
  <div class="duas-colunas">
    <div class="coluna-card aplicado">
      <h3>✅ Já aplicado</h3>
      <ul>
        <li>Exclusão das regiões solicitadas pelo time comercial</li>
        <li>Reestruturação das campanhas para receber os novos vídeos</li>
        <li>Redução de 80% do investimento na Linha Care (confirmado nos dados: queda de aproximadamente R$ 155/dia para R$ 45/dia a partir de 19/08)</li>
        <li>Criação da versão B da landing page da Linha Care, motivada pela baixa qualidade e alto custo dos leads</li>
      </ul>
    </div>
    <div class="coluna-card pendente">
      <h3>⏳ Pendente (aguardando criativos)</h3>
      <ul>
        <li>Aumento de verba de R$ 5 mil para R$ 10 mil</li>
        <li>Entrada no Google Ads (imagem e vídeo)</li>
        <li>6 novos vídeos e 4 novas imagens (em edição)</li>
      </ul>
    </div>
  </div>
</section>

<section class="bloco" id="paginas">
  <h2>Páginas de captação</h2>
  <ul class="links-lista">
    <li><span>Captação tradicional</span><span>captacao.bubbles.com.br</span></li>
    <li><span>Pet South</span><span>captacao.bubbles.com.br/pet-south</span></li>
    <li><span>Linha Care (A)</span><span>ofertas.bubbles.com.br/care</span></li>
    <li><span>Linha Care (B)</span><span>ofertas.bubbles.com.br/care-b <span class="em-aprovacao">em aprovação</span></span></li>
  </ul>
</section>

<section class="bloco" id="regioes">
  <h2>Campanhas de região foco</h2>
  <p class="intro">A subir com os novos criativos.</p>
  <div class="regioes-grid">
    <div class="regiao-card">
      <h3>Foco 1 · Centro-Oeste e interior de SP</h3>
      <p>Goiás (exceto Goiânia), Mato Grosso, Mato Grosso do Sul (exceto Dourados), ABC Paulista, Jundiaí, Ribeirão Preto, Araçatuba, Votuporanga, Barretos, Fernandópolis.</p>
    </div>
    <div class="regiao-card">
      <h3>Foco 2 · Estados com pouca ou nenhuma presença de distribuidor</h3>
      <p>Espírito Santo, Minas Gerais (exceto Uberlândia, que já possui distribuidor), Tocantins, Rondônia, Acre, Amapá, Sergipe, Piauí, Londrina e Ponta Grossa (PR).</p>
    </div>
  </div>
</section>

<section class="bloco" id="plano">
  <h2>Plano de ação · Setembro</h2>
  <ol class="plano">
    <li>Aplicar o aumento de verba de R$ 5 mil para R$ 10 mil assim que os criativos forem entregues</li>
    <li>Subir as campanhas no Google Ads (imagem e vídeo)</li>
    <li>Publicar os 6 novos vídeos e as 4 novas imagens</li>
    <li>Subir as campanhas Foco 1 e Foco 2</li>
    <li>Acompanhar o desempenho da landing page B da Linha Care contra a versão A</li>
    <li>Corrigir o fluxo de envio de leads para a Sellum, eliminando a subnotificação</li>
    <li class="item-destaque">
      <strong>Estabelecer o fluxo mensal de dados comercial → marketing</strong>, com entrega todo dia 02 ou 03 de cada mês, contendo:
      <ul>
        <li>Quantidade de reuniões realizadas com leads de tráfego</li>
        <li>Quantidade de fechamentos com leads de tráfego</li>
        <li>Valor da primeira compra de cada fechamento</li>
        <li>Fechamentos por comercial</li>
      </ul>
    </li>
  </ol>
</section>

</main>

<footer class="rodape">
  Relatório de mídia paga Bubbles Distribuidores · Agosto de 2026 · Preparado para apresentação à diretoria em 03/09/2026.
</footer>

</body>
</html>`
