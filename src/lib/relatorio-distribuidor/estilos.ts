// src/lib/relatorio-distribuidor/estilos.ts
// CSS da página do relatório. Parte do estilo do relatório de agosto original, só com
// tokens do DESIGN-SYSTEM.md (sem peso 700, texto pequeno sempre em #666666).
export const CSS = `
  :root {
    --rosa: #F4CDD4;
    --rosa-fundo: #FDF2F4;
    --rosa-accent: #E8649A;
    --preto: #0D0C0D;
    --texto: #666666;
    --fundo: #F7F7F7;
    --card: #FFFFFF;
    --borda: #E5E7EB;
    --bom-fg: #166534; --bom-bg: #f0fdf4; --bom-borda: #bbf7d0;
    --atencao-fg: #9A6410; --atencao-bg: #FEF3E2; --atencao-borda: #FBE0A8;
    --ruim-fg: #A83A38; --ruim-bg: #FDECEC; --ruim-borda: #F6C6C4;
    --pendente-fg: #6B5D60; --pendente-bg: #F1EBEC;
    --mapa-0: #F7F7F7;
    --mapa-1: #FDF2F4;
    --mapa-2: #F4CDD4;
    --mapa-3: color-mix(in srgb, #E8649A 55%, #F4CDD4);
    --mapa-4: #E8649A;
    --listras: repeating-linear-gradient(45deg, #F1EBEC 0 6px, #E7DFE1 6px 12px);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--fundo); color: var(--preto);
    font-family: 'Poppins', system-ui, sans-serif; font-weight: 400; line-height: 1.6; font-size: 15px;
  }
  h1, h2, h3, h4 { font-weight: 500; text-wrap: balance; margin: 0; }
  strong, b { font-weight: 600; }
  table { font-variant-numeric: tabular-nums; }
  a { color: var(--rosa-accent); }
  a:focus-visible { outline: 3px solid var(--rosa-accent); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }

  /* Topo */
  header.topo { background: var(--rosa); padding: 36px 20px 32px; }
  .topo-conteudo { max-width: 1240px; margin: 0 auto; }
  .topo-conteudo img.logo { display: block; width: 180px; height: auto; margin-bottom: 22px; }
  header.topo h1 { font-size: 1.7rem; margin-bottom: 6px; }
  header.topo p.sub { font-size: 0.95rem; color: #5c4650; margin: 0 0 14px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { font-size: 0.75rem; font-weight: 600; border-radius: 999px; padding: 4px 12px; background: var(--card); }
  .chip.sem { background: transparent; border: 1px dashed #B99AA3; color: #5c4650; font-weight: 500; }

  main { max-width: 1000px; margin: 0 auto; padding: 0 20px; min-width: 0; }

  /* Sumário: mesmo padrão dos relatórios semanais (public/relatorios/…-v2). Coluna fixa
     à esquerda no computador; no celular vira gaveta aberta pelo botão "☰ Sumário". */
  html { scroll-behavior: smooth; }
  section.bloco { scroll-margin-top: 16px; }
  .pagina { max-width: 1280px; margin: 0 auto; padding: 2rem 1.25rem 0; }
  .pagina main { margin: 0; padding: 0; width: 100%; }
  @media (min-width: 990px) { .pagina { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 3rem; align-items: start; } }
  .toc { font-size: 0.78rem; scrollbar-width: thin; scrollbar-color: var(--rosa) transparent; }
  .toc::-webkit-scrollbar { width: 6px; }
  .toc::-webkit-scrollbar-track { background: transparent; }
  .toc::-webkit-scrollbar-thumb { background: var(--rosa); border-radius: 999px; }
  .toc::-webkit-scrollbar-thumb:hover { background: var(--rosa-accent); }
  @media (min-width: 990px) { .toc { position: sticky; top: 1.5rem; max-height: calc(100vh - 3rem); overflow-y: auto; } }
  .toc__label { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--texto); margin: 0 0 1rem; }
  .toc__list { list-style: none; margin: 0; padding: 0; }
  .toc__list a { display: flex; align-items: baseline; gap: 0.5rem; padding: 0.38rem 0 0.38rem 0.8rem; color: var(--texto); border-left: 4px solid transparent; text-decoration: none; line-height: 1.35; transition: color 150ms, border-color 150ms; }
  .toc__list a:hover { color: var(--preto); }
  .toc__list a.is-active { color: var(--preto); border-left-color: var(--rosa-accent); font-weight: 500; }
  .toc__num { color: rgba(13,12,13,0.35); font-variant-numeric: tabular-nums; }
  .toc__toggle { position: fixed; left: 1rem; bottom: 1.5rem; z-index: 90; display: none; align-items: center; gap: 0.5rem; min-height: 44px; padding: 0.7rem 1.15rem; font: inherit; font-size: 0.8125rem; font-weight: 600; color: #fff; background: var(--preto); border: 0; border-radius: 999px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .toc__backdrop { position: fixed; inset: 0; z-index: 95; background: rgba(13,12,13,0.4); opacity: 0; visibility: hidden; transition: opacity 250ms ease, visibility 250ms ease; }
  .toc__backdrop.is-open { opacity: 1; visibility: visible; }
  @media (max-width: 989px) {
    .toc { position: fixed; top: 0; left: 0; bottom: 0; width: min(310px, 86vw); z-index: 96; background: #fff; padding: 2rem 1.5rem; overflow-y: auto; transform: translateX(-101%); transition: transform 350ms ease; }
    .toc.is-open { transform: translateX(0); }
    .toc__toggle { display: inline-flex; }
  }
  /* Voltar ao topo: canto inferior direito, cinza discreto; rosa só no hover/foco. */
  .btn-topo { position: fixed; right: 1.25rem; bottom: 1.5rem; z-index: 80; width: 44px; height: 44px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; background: var(--card); color: var(--texto); border: 1px solid var(--borda); box-shadow: 0 2px 8px rgba(0,0,0,0.07); cursor: pointer; opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity 250ms, visibility 250ms, transform 250ms, background 150ms, color 150ms, border-color 150ms; }
  .btn-topo.is-visivel { opacity: 1; visibility: visible; transform: none; }
  .btn-topo:hover, .btn-topo:focus-visible { background: var(--rosa-accent); border-color: var(--rosa-accent); color: #fff; }
  .btn-topo:focus-visible { outline: 3px solid var(--rosa); outline-offset: 2px; }
  @media print { .btn-topo { display: none !important; } }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .toc, .toc__backdrop, .btn-topo { transition: none; } }
  @media print { .toc, .toc__toggle, .toc__backdrop { display: none !important; } .pagina { display: block; } }
  section.bloco { padding: 40px 0; border-bottom: 1px solid var(--borda); }
  section.bloco:last-of-type { border-bottom: none; }
  .eyebrow { display: block; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--rosa-accent); margin-bottom: 4px; }
  section.bloco h2 { font-size: 1.3rem; margin-bottom: 6px; }
  section.bloco > p.intro { color: var(--texto); max-width: 68ch; margin: 0 0 20px; font-size: 0.92rem; }

  /* Variação ▲ ▼ */
  .var { display: inline-block; font-size: 0.72rem; font-weight: 600; border-radius: 999px; padding: 1px 8px; white-space: nowrap; vertical-align: middle; }
  .var-bom { color: var(--bom-fg); background: var(--bom-bg); }
  .var-ruim { color: var(--ruim-fg); background: var(--ruim-bg); }
  .var-neutro { color: var(--pendente-fg); background: var(--pendente-bg); }
  .vs { display: block; font-size: 0.72rem; color: var(--texto); margin-top: 2px; }

  /* Avisos */
  .aviso {
    display: flex; gap: 10px; align-items: flex-start; background: var(--card);
    border: 1px dashed #D9B8C2; border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; color: var(--texto);
  }
  .aviso strong { color: var(--preto); }
  .aviso + * { margin-top: 16px; }
  * + .aviso { margin-top: 16px; }
  .nota-alerta {
    background: var(--atencao-bg); border: 1px solid var(--atencao-borda); border-radius: 12px;
    padding: 14px 18px; font-size: 0.85rem; color: #6b4a0a; margin-top: 16px;
  }
  .nota-alerta strong { color: var(--atencao-fg); }

  /* KPIs */
  .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; }
  /* Cartão: valor no topo, variação logo abaixo e o rótulo sempre colado no rodapé
     (margin-top:auto), para os rótulos de uma mesma linha ficarem alinhados. */
  .kpi { background: var(--card); border: 1px solid var(--borda); border-radius: 16px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .kpi .valor { font-size: 1.4rem; font-weight: 600; line-height: 1.2; white-space: nowrap; }
  .kpi .linha { display: flex; align-items: center; gap: 6px; min-height: 20px; white-space: nowrap; }
  .kpi .rotulo { display: block; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--rosa-accent); margin-top: auto; padding-top: 4px; }
  .kpis.secundarios { margin-top: 10px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
  .kpis.secundarios .kpi { background: var(--card); border-color: var(--borda); border-left: 3px solid var(--rosa); border-radius: 12px; padding: 10px 12px; }
  .kpis.secundarios .valor { font-size: 1.1rem; }
  .tabela tr.total td { font-weight: 600; background: var(--fundo); }
  /* Faixa "Resultado em distribuidores" dentro do consolidado. */
  .bloco-distribuidores { margin-top: 22px; }
  .sub-bloco { font-size: 0.95rem; margin: 0 0 10px; }
  .sub-bloco small { font-size: 0.75rem; font-weight: 400; color: var(--texto); }
  /* Uma linha só com os 6 cartões no computador; 3 por linha no tablet e 2 no celular. */
  .kpis.distribuidores { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; }
  .kpis.distribuidores .kpi { border-left: 3px solid var(--rosa-accent); border-radius: 12px; padding: 8px 10px; gap: 2px; }
  .kpis.distribuidores .valor { font-size: 1rem; }
  .kpis.distribuidores .rotulo { font-size: 0.6rem; letter-spacing: 0.03em; }
  .kpis.distribuidores .linha { flex-wrap: wrap; white-space: normal; }
  @media (max-width: 900px) { .kpis.distribuidores { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (max-width: 480px) { .kpis.distribuidores { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .kpi .valor .tag-sem { font-size: 0.72rem; vertical-align: middle; }
  .lista-pedido { margin: 6px 0 0; padding-left: 1.1em; }
  .lista-pedido li { margin-bottom: 2px; }
  .obs-pequena { font-size: 0.72rem; color: var(--texto); margin: 8px 0 0; }

  /* Por rede */
  .redes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .rede-card { background: var(--card); border: 1px solid var(--borda); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
  .rede-card.vazia { background: var(--pendente-bg); border-style: dashed; }
  .rede-topo { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .rede-topo h3 { font-size: 1.05rem; }
  .rede-topo span { font-size: 0.78rem; color: var(--texto); }
  .rede-linhas { display: flex; flex-direction: column; }
  .rede-linha { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 1px solid var(--borda); font-size: 0.85rem; }
  .rede-linha:last-child { border-bottom: none; }
  .rede-linha .dir { display: flex; align-items: center; gap: 8px; font-weight: 600; }
  .rede-card.vazia p { margin: 0; font-size: 0.88rem; color: var(--pendente-fg); }

  /* Funil B2B */
  .funil-b2b { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 28px; align-items: start; }
  /* Funil fixo na tela enquanto a tabela ao lado rola, até o fim da seção. */
  .fb { display: flex; flex-direction: column; gap: 3px; position: sticky; top: 16px; }
  .fb-linha { display: grid; grid-template-columns: minmax(0, 1fr) 170px; align-items: center; gap: 14px; }
  .fb-forma { height: 44px; margin: 0 auto; }
  .fb-info { font-size: 0.8rem; line-height: 1.35; }
  .fb-info .nome { display: block; color: var(--texto); }
  .fb-info .num { font-weight: 600; font-size: 0.95rem; margin-right: 4px; }
  .tag-sem { display: inline-block; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; color: var(--pendente-fg); background: var(--pendente-bg); border-radius: 999px; padding: 1px 8px; }

  /* Tabelas */
  .tabela-wrap { overflow-x: auto; background: var(--card); border: 1px solid var(--borda); border-radius: 20px; }
  table.tabela { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  .tabela caption { text-align: left; font-weight: 600; font-size: 0.85rem; padding: 14px 16px 4px; }
  .tabela th { text-align: left; font-weight: 600; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--texto); padding: 10px 16px; border-bottom: 1px solid var(--borda); }
  .tabela td { padding: 10px 16px; border-bottom: 1px solid var(--borda); }
  .tabela tr:last-child td { border-bottom: none; }
  .tabela td.num, .tabela th.num { text-align: right; white-space: nowrap; }
  .tabela tr.grupo td { background: var(--rosa-fundo); font-weight: 600; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--rosa-accent); padding: 8px 16px; }

  /* Funis por campanha */
  .campanhas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .campanha-card { background: var(--card); border: 1px solid var(--borda); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .campanha-topo { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .campanha-card h3 { font-size: 1rem; }
  .rede-tag { display: block; font-size: 0.72rem; color: var(--texto); margin-top: 2px; }
  .status-pill { display: inline-block; flex-shrink: 0; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; border-radius: 999px; padding: 3px 10px; }
  .status-pill.ativa { color: var(--bom-fg); background: var(--bom-bg); border: 1px solid var(--bom-borda); }
  .status-pill.reduzida { color: var(--atencao-fg); background: var(--atencao-bg); border: 1px solid var(--atencao-borda); }
  .status-pill.encerrada { color: var(--pendente-fg); background: var(--pendente-bg); border: 1px solid #D8CCCF; }
  .mini-funil { display: flex; flex-direction: column; font-size: 0.8rem; }
  .mini-funil-linha { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px dashed var(--borda); }
  .mini-funil-linha:last-child { border-bottom: none; }
  .mini-funil-linha .dir { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .mini-funil-linha .conv { color: var(--texto); font-size: 0.72rem; }
  .campanha-metricas { display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.76rem; color: var(--texto); }
  .campanha-metricas span { background: var(--rosa-fundo); border-radius: 8px; padding: 3px 8px; }
  .campanha-destaque { font-size: 0.8rem; color: var(--texto); background: var(--fundo); border-radius: 10px; padding: 8px 10px; }
  .campanha-nota { font-size: 0.74rem; color: var(--ruim-fg); }

  .leitura-analitica { background: var(--rosa-fundo); border-radius: 20px; padding: 20px 24px; font-size: 0.9rem; line-height: 1.7; }

  /* Mapa */
  .mapa-layout { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 32px; align-items: start; }
  .mapa { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; }
  .uf { aspect-ratio: 1; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--mapa-0); border: 1px solid var(--borda); line-height: 1.15; }
  .uf b { font-size: 0.82rem; }
  .uf small { font-size: 0.64rem; }
  .uf.n1 { background: var(--mapa-1); border-color: var(--mapa-2); }
  .uf.n2 { background: var(--mapa-2); border-color: var(--mapa-2); }
  .uf.n3 { background: var(--mapa-3); border-color: var(--mapa-3); }
  .uf.n4 { background: var(--mapa-4); border-color: var(--mapa-4); }
  .mapa.sem-dado .uf { background: var(--pendente-bg); border-color: #E2D8DA; color: var(--pendente-fg); }
  .mapa-caixa { background: var(--card); border: 1px solid var(--borda); border-radius: 20px; padding: 16px; }
  .mapa-svg { display: block; width: 100%; height: auto; margin-top: 8px; }
  .mapa-svg path { fill: var(--fe); stroke: var(--card); stroke-width: 1.2; stroke-linejoin: round; }
  .mapa-svg path:hover { stroke: var(--preto); }
  .modo-regiao .mapa-svg path { fill: var(--fr); }
  .mapa-svg.sem-dado path { fill: var(--pendente-bg); }
  .rot-uf, .rot-reg { fill: var(--preto); text-anchor: middle; dominant-baseline: middle; paint-order: stroke; stroke: rgba(255,255,255,0.75); stroke-width: 3px; pointer-events: none; }
  .rot-uf { font-size: 11px; font-weight: 600; }
  .rot-reg { font-size: 16px; font-weight: 600; }
  .rot-uf .pct { font-weight: 400; font-size: 10px; }
  .rot-reg .pct { font-weight: 500; font-size: 14px; }
  .rot-linha { stroke: var(--texto); stroke-width: 0.8; }
  .rot-regioes { display: none; }
  .modo-regiao .rot-regioes { display: inline; }
  .modo-regiao .rot-estados { display: none; }
  .alternar { display: inline-flex; background: var(--fundo); border-radius: 12px; padding: 4px; gap: 4px; flex-wrap: wrap; }
  .alternar button { font: inherit; font-size: 0.8rem; font-weight: 500; border: 0; background: transparent; color: var(--texto); border-radius: 9px; padding: 0 14px; min-height: 36px; cursor: pointer; transition: background 150ms; }
  .alternar button[aria-pressed="true"] { background: var(--card); color: var(--preto); font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
  .alternar button:focus-visible { outline: 3px solid var(--rosa-accent); outline-offset: 2px; }
  .painel[hidden] { display: none; }
  .kpi .ant { font-size: 0.62rem; color: var(--texto); white-space: nowrap; }
  .kpi .var { font-size: 0.66rem; padding: 0 6px; }
  .legenda { display: flex; align-items: center; gap: 6px; font-size: 0.72rem; color: var(--texto); margin-top: 10px; }
  .legenda i { width: 22px; height: 12px; border-radius: 3px; display: inline-block; }
  .regioes-lista { display: flex; flex-direction: column; gap: 12px; }
  .regiao-linha { font-size: 0.85rem; }
  .regiao-linha .topo { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 4px; }
  .regiao-linha .dir { display: flex; align-items: center; gap: 8px; font-weight: 600; }
  .regiao-linha .num { font-size: 0.75rem; color: var(--texto); font-weight: 400; }
  .barra-fundo { background: var(--borda); border-radius: 6px; height: 10px; overflow: hidden; }
  .barra { background: var(--rosa-accent); height: 100%; border-radius: 6px; }
  .top-ufs { margin-top: 20px; }

  /* Ranking de criativos */
  .ranking { display: flex; flex-direction: column; gap: 10px; }
  .criativo { display: grid; grid-template-columns: 40px minmax(0, 1fr) auto; gap: 14px; align-items: center; background: var(--card); border: 1px solid var(--borda); border-radius: 16px; padding: 14px 16px; }
  .criativo .pos { width: 36px; height: 36px; border-radius: 50%; background: var(--rosa-fundo); color: var(--rosa-accent); font-weight: 600; display: flex; align-items: center; justify-content: center; }
  .criativo:first-child .pos { background: var(--rosa-accent); color: var(--card); }
  .criativo h3 { font-size: 0.92rem; overflow-wrap: anywhere; }
  .criativo .meta { font-size: 0.75rem; color: var(--texto); margin-top: 2px; }
  .criativo .nums { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; font-size: 0.75rem; }
  .criativo .nums span { background: var(--rosa-fundo); border-radius: 8px; padding: 2px 8px; }
  .link-criativo { display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 12px; border: 1px solid var(--rosa-accent); font-size: 0.8rem; font-weight: 600; text-decoration: none; white-space: nowrap; }
  .criativo .credito { color: var(--rosa-accent); font-weight: 500; }
  .previa-fb { margin-top: 8px; font-size: 0.8rem; }
  .previa-fb summary { cursor: pointer; color: var(--rosa-accent); font-weight: 600; min-height: 32px; display: inline-flex; align-items: center; }
  .previa-fb iframe { display: block; max-width: 100%; border: 1px solid var(--borda); border-radius: 12px; background: var(--card); margin-top: 6px; }
  .link-aguardando { font-size: 0.72rem; font-weight: 600; color: var(--pendente-fg); background: var(--pendente-bg); border-radius: 999px; padding: 4px 10px; white-space: nowrap; }

  /* Timeline */
  .timeline-wrap { overflow-x: auto; padding: 8px 0 4px; }
  .timeline { min-width: 560px; padding: 30px 0 10px; }
  .timeline-eixo { position: relative; height: 6px; background: var(--borda); border-radius: 3px; margin-bottom: 6px; }
  .timeline-linha { position: absolute; top: 0; height: 6px; border-radius: 3px; background: var(--rosa-accent); }
  .timeline-linha.encerrada { background: var(--pendente-fg); opacity: 0.5; }
  .timeline-rotulo { font-size: 0.78rem; font-weight: 600; margin-bottom: 2px; }
  .timeline-datas { font-size: 0.72rem; color: var(--texto); margin-bottom: 14px; }
  .timeline-marcos { position: relative; }
  .timeline-marco { position: absolute; top: -26px; transform: translateX(-50%); text-align: center; font-size: 0.7rem; }
  .timeline-marco .ponto { width: 10px; height: 10px; border-radius: 50%; background: var(--rosa-accent); margin: 0 auto 4px; }
  .timeline-marco .rotulo { font-weight: 600; white-space: nowrap; }

  /* Desafios */
  .desafios { display: flex; flex-direction: column; gap: 10px; }
  .desafio { display: flex; gap: 12px; background: var(--card); border: 1px solid var(--borda); border-radius: 14px; padding: 14px 16px; }
  .desafio .icone { font-size: 1.1rem; flex-shrink: 0; }
  .desafio h3 { font-size: 0.88rem; font-weight: 600; margin: 0 0 2px; }
  .desafio p { font-size: 0.82rem; color: var(--texto); margin: 0; }

  /* Plano anterior */
  .placar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .placar span { font-size: 0.78rem; font-weight: 600; border-radius: 999px; padding: 4px 12px; }
  .status-lista { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .status-item { display: flex; gap: 12px; align-items: flex-start; background: var(--card); border: 1px solid var(--borda); border-radius: 14px; padding: 12px 16px; font-size: 0.88rem; }
  .status-item .nota { display: block; font-size: 0.78rem; color: var(--texto); margin-top: 2px; }
  .st { flex-shrink: 0; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; border-radius: 999px; padding: 3px 10px; margin-top: 2px; white-space: nowrap; }
  .st.implementado { color: var(--bom-fg); background: var(--bom-bg); border: 1px solid var(--bom-borda); }
  .st.andamento { color: var(--atencao-fg); background: var(--atencao-bg); border: 1px solid var(--atencao-borda); }
  /* Sutil, mas vermelho: sem fundo, texto e bolinha em vermelho. */
  .st.nao-implementado { color: var(--ruim-fg); background: transparent; border: 1px solid var(--ruim-borda); }
  .st.nao-implementado::before { content: ""; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--ruim-fg); margin-right: 6px; vertical-align: middle; }

  /* Listas de links */
  .links-lista { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .links-lista li { background: var(--card); border: 1px solid var(--borda); border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
  .links-lista .selo { font-size: 0.7rem; color: var(--atencao-fg); font-weight: 600; }

  .regioes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .regiao-card { background: var(--card); border: 1px solid var(--borda); border-radius: 20px; padding: 20px; }
  .regiao-card h3 { font-size: 0.95rem; margin-bottom: 8px; color: var(--rosa-accent); }
  .regiao-card p { font-size: 0.85rem; color: var(--texto); margin: 0; }

  /* Plano do próximo mês */
  ol.plano { padding-left: 1.3em; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  ol.plano li { font-size: 0.9rem; }
  .item-destaque { list-style: none; margin-left: -1.3em; background: var(--rosa-fundo); border: 2px solid var(--rosa-accent); border-radius: 14px; padding: 14px 16px; margin-top: 6px; }
  .item-destaque strong { color: var(--rosa-accent); }
  .item-destaque ul { margin: 8px 0 0; padding-left: 1.2em; font-size: 0.85rem; }
  .item-destaque ul li { margin-bottom: 4px; }

  footer.rodape { padding: 24px 20px 48px; font-size: 0.75rem; color: var(--texto); text-align: center; }

  @media (max-width: 760px) {
    .funil-b2b, .mapa-layout { grid-template-columns: minmax(0, 1fr); }
    .fb { position: static; }
    .mapa { max-width: 380px; }
  }
  @media (max-width: 640px) {
    header.topo h1 { font-size: 1.35rem; }
    .topo-conteudo img.logo { width: 140px; }
    .fb-linha { grid-template-columns: minmax(0, 1fr) 130px; gap: 10px; }
    .criativo { grid-template-columns: 36px minmax(0, 1fr); }
    .criativo .acao { grid-column: 2; }
  }
  @media print {
    body { background: #fff; font-size: 12px; }
    header.topo, .uf, .fb-forma, .barra, .var, .st, .status-pill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    section.bloco { break-inside: avoid; padding: 20px 0; }
    .kpi, .rede-card, .campanha-card, .desafio, .regiao-card, .criativo, .status-item { break-inside: avoid; }
    a { color: var(--preto); text-decoration: none; }
  }
`
