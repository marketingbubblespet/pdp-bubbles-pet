---
tipo: relatorio-analise
versao_schema: 2
slug: 2026-09-13-bubbles-semana-37-v2
cliente: { id: bubbles-v2, nome: Bubbles }
gerado_em: 2026-09-15
revisor: Caio
whatsapp: "5514981287761"

periodo:     { inicio: 2026-09-07, fim: 2026-09-13, dias: 7,  rotulo: "7 dias" }
comparativo: { inicio: 2026-08-31, fim: 2026-09-06, dias: 7 }
evidencia:   { inicio: 2026-08-15, fim: 2026-09-13, dias: 30 }

completude:
  selo: quase
  resumo: "Uma etapa fica sem avaliação · o resto do diagnóstico está inteiro."
  colunas_faltando:
    - { nome: Frequência, camada: importante, vazia: false,
        impede: "§3.5 · saturação de público",
        onde: "Gerenciador → Colunas → Personalizar" }

conta:
  vendas_mes: 65
  taxa_conversao: 0.0042
  acima_do_limiar: false
  investimento_total: 31457.23

canais:
  - id: meta
    nome: "Meta Ads"
    analisado: true
    investimento: { janela: 3517.18, anterior: 2980.44, var_pct: 18.0,
                    teto_mensal: 20000, projecao_mes: 15420.00 }
    campanhas:
      - id: gx-compra
        nome: "GX_COMPRA_ADV_ABO_INTERNO-BUBBLES_TODOS_OS_PRODUTOS_E_LINHAS"
        tipo: prospeccao
        publico: groomer
        acao: "→ Manter"
        tipo_acao: manter
        situacao: consistente
        papel: fechador
        evidencia: { cliques: 1840, vendas_esperadas: 7.7, leitura: firme }
        verba: { atual: 120.00, sugerida: null, anterior: 110.00, variacao_pct: null }
        metricas:
          investimento:  { valor: 1638.56, var_pct: 66.8, meta: null }
          vendas:        { valor: 12,      var_pct: 50.0, meta: null }
          ticket_medio:  { valor: 331.92,  var_pct: null, meta: null }
          roas_lc:       { valor: 2.43,    var_pct: 12.4, meta: 2.0 }
          roas_fc:       { valor: 1.10,    var_pct: null, meta: null }
          roas_assist:   { valor: 4.17,    var_pct: null, meta: null }
          ctr:           { valor: 1.29,    var_pct: -3.1, meta: 1.0 }
          impressoes:    { valor: 87074,   var_pct: 12.0, meta: null }
          sessoes:       { valor: 412,     var_pct: 8.0,  meta: null }
          connect_rate:  { valor: 0.87,    var_pct: null, meta: null }
        motivos:
          - "É a única campanha que vendeu nas duas semanas seguidas."
        sinais_suprimidos:
          - { sinal: "Frequência acima do limite", motivo: "remarketing tolera repetição maior" }
        expectativa: "R$ 6/dia a mais deveria trazer ~1 venda adicional por semana."
        perguntas: ["Sobrou criativo no conjunto para absorver mais verba?"]
        historico: "14/09 · sugerido escalar · aplicado"
        conjuntos:
          - id: gx-cj08
            nome: "CJ_08_INTERNO-BUBBLES_AD_TOP_ESTADOS_PRO_PERFUMES-06.07.2026"
            tipo: prospeccao
            publico: groomer
            acao: "↑ Escalar 20%"
            tipo_acao: escalar
            situacao: consistente
            papel: fechador
            evidencia: { cliques: 710, vendas_esperadas: 2.9, leitura: firme }
            verba: { atual: 28.00, sugerida: 34.28, anterior: 28.80, variacao_pct: 20 }
            metricas:
              investimento:  { valor: 197.43, var_pct: -2.0, meta: null }
              vendas:        { valor: 3,      var_pct: 50.0, meta: null }
              ticket_medio:  { valor: 895.02, var_pct: 100.4, meta: null }
              roas_lc:       { valor: 13.60,  var_pct: 207.0, meta: 2.0 }
              roas_fc:       { valor: 0.00,   var_pct: null,  meta: null }
              roas_assist:   { valor: 13.60,  var_pct: 141.0, meta: null }
              ctr:           { valor: 0.67,   var_pct: -26.0, meta: 1.0 }
              impressoes:    { valor: 12594,  var_pct: 20.0,  meta: null }
              sessoes:       { valor: 66,     var_pct: -19.0, meta: null }
              connect_rate:  { valor: 0.786,  var_pct: -9.0,  meta: null }
            motivos:
              - "É o único conjunto que vendeu nas duas semanas seguidas."
              - "O investimento ficou praticamente igual e as vendas subiram de 2 para 3."
            sinais_suprimidos: []
            expectativa: "R$ 6/dia a mais deveria trazer cerca de 1 venda adicional por semana."
            perguntas: ["Sobrou criativo suficiente no conjunto para absorver mais verba?"]
            historico: null
            sustentacao: null
            anuncios:
              - id: gx-cj08-ad12
                nome: "ad12|img|pontual|CRIATIVO 02 - MINI PERFUMES"
                formato: imagem
                novo: false
                tipo: prospeccao
                publico: groomer
                acao: "↑ Escalar 20%"
                tipo_acao: escalar
                situacao: comecou
                papel: fechador
                evidencia: { cliques: 460, vendas_esperadas: 1.9, leitura: firme }
                verba: { atual: 25.33, sugerida: 30.25, anterior: 10.06, variacao_pct: 20 }
                metricas:
                  investimento:  { valor: 177.30, var_pct: 152.0, meta: null }
                  vendas:        { valor: 3,      var_pct: null,  meta: null }
                  ticket_medio:  { valor: 895.02, var_pct: null,  meta: null }
                  roas_lc:       { valor: 15.14,  var_pct: null,  meta: 2.0 }
                  roas_fc:       { valor: 0.00,   var_pct: null,  meta: null }
                  roas_assist:   { valor: 15.14,  var_pct: null,  meta: null }
                  ctr:           { valor: 0.66,   var_pct: null,  meta: 1.0 }
                  impressoes:    { valor: 9200,   var_pct: null,  meta: null }
                  sessoes:       { valor: 44,     var_pct: null,  meta: null }
                  connect_rate:  { valor: 0.759,  var_pct: null,  meta: null }
                motivos:
                  - "É o anúncio que está sustentando sozinho o resultado do conjunto."
                sinais_suprimidos: []
                expectativa: null
                perguntas: []
                historico: null
                concentracao: { share_gasto: 0.90, dominante: true, sufocado: false }
          - id: gx-cj09
            nome: "CJ_09_INTERNO-BUBBLES_AD_TOP_ESTADOS_PRO-V2"
            tipo: prospeccao
            publico: groomer
            acao: "→ Manter e testar concentração"
            tipo_acao: manter
            situacao: comecou
            papel: completo
            evidencia: { cliques: 320, vendas_esperadas: 1.3, leitura: direcional }
            verba: { atual: 30.00, sugerida: 30.00, anterior: 16.30, variacao_pct: 0 }
            metricas:
              investimento:  { valor: 204.43, var_pct: 84.0,  meta: null }
              vendas:        { valor: 2,      var_pct: null,  meta: null }
              ticket_medio:  { valor: 266.73, var_pct: null,  meta: null }
              roas_lc:       { valor: 2.61,   var_pct: null,  meta: 2.0 }
              roas_fc:       { valor: 2.18,   var_pct: null,  meta: null }
              roas_assist:   { valor: 2.61,   var_pct: null,  meta: null }
              ctr:           { valor: 1.02,   var_pct: -18.0, meta: 1.0 }
              impressoes:    { valor: 11523,  var_pct: 110.0, meta: null }
              sessoes:       { valor: 118,    var_pct: 84.0,  meta: null }
              connect_rate:  { valor: 1.00,   var_pct: 6.0,   meta: null }
            motivos:
              - "ROAS LC acima do piso de saúde de 2,0, mas a semana anterior fechou em zero venda."
              - "ConnectRate de 100% é o melhor da campanha."
            sinais_suprimidos: []
            expectativa: "Se repetir venda na próxima semana, vira consistente e dá para concentrar verba com segurança."
            perguntas: ["Prefere esperar mais uma semana ou já concentrar verba nele?"]
            historico: null
            sustentacao: null
            anuncios: []
      - id: rocket-remarketing
        nome: "ROCKET_COMPRA_REMARKETING-09.07.2026_2"
        tipo: remarketing
        publico: null
        acao: "↓ Reduzir para R$ 70"
        tipo_acao: reduzir
        situacao: parou
        papel: fraco
        evidencia: { cliques: 210, vendas_esperadas: 0.9, leitura: direcional }
        verba: { atual: 135.00, sugerida: 70.00, anterior: 135.00, variacao_pct: -48.1 }
        metricas:
          investimento:  { valor: 945.00, var_pct: 5.0,  meta: null }
          vendas:        { valor: 0,      var_pct: null, meta: null }
          ticket_medio:  { valor: null,   var_pct: null, meta: null }
          roas_lc:       { valor: 0.36,   var_pct: null, meta: 3.6 }
          roas_fc:       { valor: 0.50,   var_pct: null, meta: null }
          roas_assist:   { valor: 2.19,   var_pct: null, meta: null }
          ctr:           { valor: 0.41,   var_pct: null, meta: 1.0 }
          impressoes:    { valor: 40200,  var_pct: null, meta: null }
          sessoes:       { valor: 165,    var_pct: null, meta: null }
          connect_rate:  { valor: 0.71,   var_pct: null, meta: null }
        motivos:
          - "A meta de remarketing da casa é 3,6 e ele entrega 0,36."
          - "Parou de vender na comparação entre semanas."
        sinais_suprimidos: []
        expectativa: "Reduzir libera cerca de R$ 455/semana."
        perguntas: ["O público de remarketing está com janela de quantos dias?"]
        historico: null
        conjuntos: []
  - id: google
    nome: "Google Ads"
    analisado: false
    motivo_ausencia: "Não houve extração do Google Ads nesta semana."
    campanhas: []

podios:
  lista:
    - chave: thumbstop
      titulo: "🎣 Melhor gancho"
      explica: "Quem segura o scroll. Só vídeo."
      colocados:
        - { pos: 1, nome: "ad22|vid|continuo|VÍDEO 04 - LINHA CARE (WERYKA)", formato: vídeo, investimento: 774.66,
            impressoes: 25393, thumbstop: 26.2, ctr: 2.13,
            roas_lc: 2.77, roas_fc: 1.18, roas_assist: 4.17, novo: false }
  multi_podio: []
  fora:
    - { nome: "ad39|img|continuo|O problema do odor que sempre volta| Criativo", motivo: "2 dias no ar · abaixo de 3" }

hierarquia:
  cobertura: 1.0
  dias_unicos: 101
  nota: "Cobertura completa nesta semana."

conciliacao: []

nomes_repetidos:
  - { nome: "ad24|vid|continuo|CONDICONADOR HIDRATANTE PRO| Weryka AXOLY", onde: ["CJ_05_...V1", "CJ_05_...V2"],
      investido: 1539.47 }

glossario:
  - { termo: "ROAS LC", definicao: "Último clique · a régua de decisão da casa, saudável a partir de 2,0x." }
  - { termo: "ROAS ASSIST", definicao: "Assistida · credita a todos os canais da jornada, nunca comparado com a meta." }
ressalvas:
  - { titulo: "ConnectRate acima de 1,0", texto: "A Nemu conta visitas de retorno do mesmo usuário · não é erro." }
auditoria:
  - { chave: poder_estatistico, titulo: "Poder estatístico desta janela",
      texto: "65 vendas somando os canais, contra as ~100 de referência de mercado.", severidade: aviso }
proveniencia:
  gerado_em: "2026-09-15 14:32"
  fonte_verdade: nemu
  metas: { roas_geral: 2.0, roas_remarketing: 2.5, cps_max: 3.0 }
  arquivos: ["meta-ads-daily-[2026-09-07_2026-09-13].csv"]
---
