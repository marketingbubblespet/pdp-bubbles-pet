---
tipo: relatorio-analise
slug: 2026-09-16-bubbles-unificado
cliente:
  id: bubbles
  nome: Bubbles
canal: Meta Ads + Google Ads
nivel: campanha
gerado_em: '2026-09-16'
revisor: Caio
whatsapp: '5514981287761'
periodo:
  inicio: '2026-09-10'
  fim: '2026-09-16'
  dias: 7
  rotulo: 7 dias
comparativo:
  inicio: '2026-09-03'
  fim: '2026-09-09'
  dias: 7
evidencia:
  inicio: '2026-08-18'
  fim: '2026-09-16'
  dias: 30
completude:
  selo: quase
  resumo: Uma etapa fica sem avaliação · o resto do diagnóstico está inteiro.
  colunas_faltando:
    - nome: Frequência
      camada: importante
      vazia: false
      impede: §3.5 · saturação de público · sem ela não dá para separar 'público cansado' de 'criativo fraco'
      onde: Gerenciador de Anúncios → Colunas → Personalizar → **Frequência**. Não vem no export da Nemu.
    - nome: Custo do produto
      camada: detalhe
      vazia: false
      impede: ROAS de equilíbrio real · hoje as metas são referência de mercado
      onde: cadastrar o custo dos produtos na Nemu · hoje vem zerado
investimento:
  janela: 9914.03
  anterior: null
  teto_mensal: 20000
  projecao_mes: null
conta:
  vendas_mes: 123
  taxa_conversao: 0.0039
  acima_do_limiar: true
  investimento_total: 9914.03
acoes:
  - id: canal-meta
    nivel: campanha
    pai: null
    nome: Meta Ads · resumo do canal
    apelido: Meta Ads
    acao: → Manter
    tipo_acao: manter
    situacao: null
    papel: null
    evidencia:
      cliques: null
      vendas_esperadas: null
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 5424.36
        var_pct: null
        meta: 20000
      vendas:
        valor: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        var_pct: null
        meta: null
      roas_fc:
        valor: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        var_pct: null
        meta: null
      impressoes:
        valor: null
        var_pct: null
        meta: null
      sessoes:
        valor: null
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        var_pct: null
        meta: null
    motivos: []
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidado-da-conta
    nivel: campanha
    pai: canal-meta
    nome: Bubbles Meta — consolidado da conta
    apelido: CAM Bubbles
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: null
    papel: assistente
    evidencia:
      cliques: null
      vendas_esperadas: null
      leitura: sem leitura
    verba:
      atual: 30
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 5424.36
        anterior: 4896.53
        var_pct: 10.7797
        meta: null
      vendas:
        valor: 13
        anterior: 12
        var_pct: 8.3333
        meta: null
      ticket_medio:
        valor: 294.8192
        anterior: 362.9708
        var_pct: -18.7761
        meta: null
      roas_lc:
        valor: 0.7066
        anterior: 0.8895
        var_pct: -20.5697
        meta: 2
      roas_fc:
        valor: 0.6253
        anterior: 2.5385
        var_pct: -75.3649
        meta: null
      roas_assist:
        valor: 1.8756
        anterior: 2.7644
        var_pct: -32.1544
        meta: null
      ctr:
        valor: 0.9559
        anterior: 0.9675
        var_pct: -1.1988
        meta: 1
      cpm:
        valor: 18.1488
        anterior: 17.9581
        var_pct: 1.0617
        meta: null
      cps:
        valor: 2.2415
        anterior: 2.3956
        var_pct: -6.4324
        meta: 3
      impressoes:
        valor: 298883
        anterior: 272664
        var_pct: 9.6159
        meta: null
      sessoes:
        valor: 2420
        anterior: 2044
        var_pct: 18.3953
        meta: null
      connect_rate:
        valor: 0.847
        anterior: 0.7748
        var_pct: 9.3198
        meta: null
    motivos:
      - plataforma reporta 5.13x, LC mede 0.71x (+626%)
      - ROAS LC 0.71x vs. meta 2.00x
      - CTR 0.96% vs. meta 1.00%
      - connect rate Nemu 0.85 contra GA4 0.03 (97% de divergência)
      - FC 0.63x e LC 0.71x abaixo da meta · só a assistida (1.88x) sustenta
      - LC 0.71x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-01-angulos-adv-vid-top-estados-kit-foundue-chocolate27-05-
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_01_Angulos_ADV_VID_Top_Estados_KIT_FOUNDUE_CHOCOLATE27.05.26
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: parou
    papel: fraco
    evidencia:
      cliques: 1044
      vendas_esperadas: 4.0836
      leitura: firme
    verba:
      atual: 80.99
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 585.7
        anterior: 553.06
        var_pct: 5.9017
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 273.8
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0.4951
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0.2464
        anterior: 5.9491
        var_pct: -95.8584
        meta: null
      roas_assist:
        valor: 0
        anterior: 0.4951
        var_pct: -100
        meta: null
      ctr:
        valor: 0.8042
        anterior: 0.6477
        var_pct: 24.1623
        meta: 1
      cpm:
        valor: 20.5696
        anterior: 18.8545
        var_pct: 9.0965
        meta: null
      cps:
        valor: 2.5802
        anterior: 3.2155
        var_pct: -19.7573
        meta: 3
      impressoes:
        valor: 28474
        anterior: 29333
        var_pct: -2.9284
        meta: null
      sessoes:
        valor: 227
        anterior: 172
        var_pct: 31.9767
        meta: null
      connect_rate:
        valor: 0.9913
        anterior: 0.9053
        var_pct: 9.5004
        meta: null
    motivos:
      - FC 0.25x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.80% vs. meta 1.00%
      - R$ 585.70 gastos, zero conversão
      - ROAS LC -100% mas CTR +24% e CPS -20% estáveis
      - connect rate Nemu 0.99 contra GA4 0.02 (98% de divergência)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-01-angad08-vid-continuo-fondue-de-chocolate-tio-dan-axoly
    nivel: anuncio
    pai: 56174e40-cj-01-angulos-adv-vid-top-estados-kit-foundue-chocolate27-05-
    nome: ad08|vid|continuo|fondue_de_chocolate tio dan AXOLY
    apelido: AD ad08
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 613
      vendas_esperadas: 2.4562
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 472.6
        anterior: 409.5
        var_pct: 15.409
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.3054
        anterior: 5.1851
        var_pct: -94.1109
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.8094
        anterior: 0.6013
        var_pct: 34.6067
        meta: 1
      cpm:
        valor: 19.8197
        anterior: 17.0995
        var_pct: 15.9076
        meta: null
      cps:
        valor: 2.4874
        anterior: 2.946
        var_pct: -15.5692
        meta: 3
      impressoes:
        valor: 23845
        anterior: 23948
        var_pct: -0.4301
        meta: null
      sessoes:
        valor: 190
        anterior: 139
        var_pct: 36.6906
        meta: null
      connect_rate:
        valor: 0.9845
        anterior: 0.9653
        var_pct: 1.9868
        meta: null
    motivos:
      - FC 0.31x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.81% vs. meta 1.00%
      - R$ 472.60 gastos, zero conversão
      - connect rate Nemu 0.98 contra GA4 0.02 (98% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-01-angulos-adv-vidad-02-vid-angulos-kit-foundue-chocolate
    nivel: anuncio
    pai: 56174e40-cj-01-angulos-adv-vid-top-estados-kit-foundue-chocolate27-05-
    nome: ad_02_VID_Angulos_Kit_Foundue_Chocolate
    apelido: AD ad
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 132
      vendas_esperadas: 0.5289
      leitura: direcional
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 113.1
        anterior: 143.56
        var_pct: -21.2176
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 6.2213
        var_pct: -100
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.7777
        anterior: 0.8542
        var_pct: -8.9577
        meta: 1
      cpm:
        valor: 24.4329
        anterior: 26.6592
        var_pct: -8.351
        meta: null
      cps:
        valor: 3.6484
        anterior: 4.4863
        var_pct: -18.6762
        meta: 3
      impressoes:
        valor: 4629
        anterior: 5385
        var_pct: -14.039
        meta: null
      sessoes:
        valor: 31
        anterior: 32
        var_pct: -3.125
        meta: null
      connect_rate:
        valor: 0.8611
        anterior: 0.6957
        var_pct: 23.7847
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CTR 0.78% vs. meta 1.00%
      - CPS R$ 3.65 vs. meta R$ 3.00
      - connect rate Nemu 0.86 contra GA4 0.03 (97% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Gasto sem nenhuma conversão
        motivo: volume abaixo do piso de cliques
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-01-angulos-adv-vid-top-estados-linha-pro-neutralizador-28-
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_01_Angulos_ADV_VID_Top_Estados_LINHA-PRO_NEUTRALIZADOR_28.04.26
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: comecou
    papel: assistente
    evidencia:
      cliques: 574
      vendas_esperadas: 2.2452
      leitura: firme
    verba:
      atual: 50.9
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 365.57
        anterior: 321.65
        var_pct: 13.6546
        meta: null
      vendas:
        valor: 1
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 459.9
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 1.258
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 1.46
        anterior: 1.9203
        var_pct: -23.9687
        meta: null
      roas_assist:
        valor: 3.2851
        anterior: 0.0725
        var_pct: 4433.066
        meta: null
      ctr:
        valor: 2.2839
        anterior: 1.9511
        var_pct: 17.0572
        meta: 1
      cpm:
        valor: 60.0674
        anterior: 63.3918
        var_pct: -5.2443
        meta: null
      cps:
        valor: 2.63
        anterior: 2.9241
        var_pct: -10.0575
        meta: 3
      impressoes:
        valor: 6086
        anterior: 5074
        var_pct: 19.9448
        meta: null
      sessoes:
        valor: 139
        anterior: 110
        var_pct: 26.3636
        meta: null
      connect_rate:
        valor: 1
        anterior: 1.1111
        var_pct: -10
        meta: null
    motivos:
      - plataforma reporta 2.43x, LC mede 1.26x (+93%)
      - connect rate Nemu 1.00 contra GA4 0.01 (99% de divergência)
      - FC 1.46x e LC 1.26x abaixo da meta · só a assistida (3.29x) sustenta
      - LC 1.26x abaixo do piso de saúde 2.00x
      - 1.0 conversões/semana contra limiar de 25 (4% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-01-angad30-vid-continuo-shampoo-neutralizador-joyce-axoly
    nivel: anuncio
    pai: 56174e40-cj-01-angulos-adv-vid-top-estados-linha-pro-neutralizador-28-
    nome: ad30|vid|continuo|shampoo neutralizador| Joyce AXOLY
    apelido: AD ad30
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: comecou
    papel: assistente
    evidencia:
      cliques: 491
      vendas_esperadas: 1.9674
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 361.21
        anterior: 319.79
        var_pct: 12.9522
        meta: null
      vendas:
        valor: 1
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 459.9
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 1.2732
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 1.4776
        anterior: 1.9314
        var_pct: -23.496
        meta: null
      roas_assist:
        valor: 3.3248
        anterior: 0.0729
        var_pct: 4461.2529
        meta: null
      ctr:
        valor: 2.2896
        anterior: 1.9808
        var_pct: 15.5882
        meta: 1
      cpm:
        valor: 60.8098
        anterior: 63.9836
        var_pct: -4.9604
        meta: null
      cps:
        valor: 2.6956
        anterior: 2.881
        var_pct: -6.4351
        meta: 3
      impressoes:
        valor: 5940
        anterior: 4998
        var_pct: 18.8475
        meta: null
      sessoes:
        valor: 134
        anterior: 111
        var_pct: 20.7207
        meta: null
      connect_rate:
        valor: 0.9853
        anterior: 1.1212
        var_pct: -12.1224
        meta: null
    motivos:
      - plataforma reporta 2.46x, LC mede 1.27x (+93%)
      - connect rate Nemu 0.99 contra GA4 0.01 (99% de divergência)
      - FC 1.48x e LC 1.27x abaixo da meta · só a assistida (3.32x) sustenta
      - LC 1.27x abaixo do piso de saúde 2.00x
      - consome 99% da verba com LC 1.27x contra meta 2.00x
      - 1.0 conversões/semana contra limiar de 25 (4% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-01-angulos-adad39-img-continuo-neutralizador-pro-criativo
    nivel: anuncio
    pai: 56174e40-cj-01-angulos-adv-vid-top-estados-linha-pro-neutralizador-28-
    nome: ad39|img|continuo|NEUTRALIZADOR PRO| Criativo
    apelido: AD ad39
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 51
      vendas_esperadas: 0.2044
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 1.67
        anterior: 0.92
        var_pct: 81.5217
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.6949
        anterior: 0
        var_pct: null
        meta: 1
      cpm:
        valor: 28.3051
        anterior: 21.3953
        var_pct: 32.2955
        meta: null
      cps:
        valor: 0.835
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 59
        anterior: 43
        var_pct: 37.2093
        meta: null
      sessoes:
        valor: 2
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: 2
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - connect rate Nemu 2.00 contra GA4 0.00 (100% de divergência)
      - CPM +32% vs. período anterior
      - investimento +82% vs. período anterior
      - recebeu só 0.5% da verba do conjunto · 59 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
      - investimento subiu 82% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.5% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.5% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: b8aebb03-ad40-img-continuo-a-pré-lavagem-que-sabota-o-resultado-final-
    nivel: anuncio
    pai: 56174e40-cj-01-angulos-adv-vid-top-estados-linha-pro-neutralizador-28-
    nome: ad40|img|continuo|A pré-lavagem que sabota o resultado final| Criativo
    apelido: AD ad40
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 10
      vendas_esperadas: 0.0401
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0.5
        anterior: 0.69
        var_pct: -27.5362
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 10.5263
        anterior: 0
        var_pct: null
        meta: 1
      cpm:
        valor: 26.3158
        anterior: 31.3636
        var_pct: -16.0946
        meta: null
      cps:
        valor: 0.1667
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 19
        anterior: 22
        var_pct: -13.6364
        meta: null
      sessoes:
        valor: 3
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: 1.5
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - connect rate Nemu 1.50 contra GA4 0.00 (100% de divergência)
      - recebeu só 0.1% da verba do conjunto · 19 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.1% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.1% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-01-angulos-adv-vid-topad-02-vid-angulos-neutralizador-pro
    nivel: anuncio
    pai: 56174e40-cj-01-angulos-adv-vid-top-estados-linha-pro-neutralizador-28-
    nome: ad_02_VID_Angulos_Neutralizador_Pro
    apelido: AD ad
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 22
      vendas_esperadas: 0.0882
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 2.19
        anterior: 0.25
        var_pct: 776
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 1
      cpm:
        valor: 32.2059
        anterior: 22.7273
        var_pct: 41.7059
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 68
        anterior: 11
        var_pct: 518.1818
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - CPM +42% vs. período anterior
      - investimento +776% vs. período anterior
      - recebeu só 0.6% da verba do conjunto · 68 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
      - investimento subiu 776% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.6% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: CTR abaixo da meta
        motivo: volume abaixo do piso de significância
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.6% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-cocj-01-interno-bubbles-adv-brasil-linha-care-03-09-2026
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_01_INTERNO-BUBBLES_ADV_BRASIL_LINHA-CARE-03.09.2026
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: assistente
    evidencia:
      cliques: 723
      vendas_esperadas: 2.828
      leitura: firme
    verba:
      atual: 100
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 695.8
        anterior: 763.39
        var_pct: -8.8539
        meta: null
      vendas:
        valor: 2
        anterior: 5
        var_pct: -60
        meta: null
      ticket_medio:
        valor: 68.22
        anterior: 410.62
        var_pct: -83.3861
        meta: null
      roas_lc:
        valor: 0.1961
        anterior: 2.6895
        var_pct: -92.7089
        meta: 2
      roas_fc:
        valor: 0.6578
        anterior: 5.1837
        var_pct: -87.3101
        meta: null
      roas_assist:
        valor: 2.5289
        anterior: 7.0551
        var_pct: -64.1552
        meta: null
      ctr:
        valor: 1.5053
        anterior: 1.4809
        var_pct: 1.6505
        meta: 1
      cpm:
        valor: 29.6716
        anterior: 30.5539
        var_pct: -2.8876
        meta: null
      cps:
        valor: 2.1278
        anterior: 2.3931
        var_pct: -11.0838
        meta: 3
      impressoes:
        valor: 23450
        anterior: 24985
        var_pct: -6.1437
        meta: null
      sessoes:
        valor: 327
        anterior: 319
        var_pct: 2.5078
        meta: null
      connect_rate:
        valor: 0.9263
        anterior: 0.8622
        var_pct: 7.4445
        meta: null
    motivos:
      - plataforma reporta 4.15x, LC mede 0.20x (+2017%)
      - ROAS LC -93% mas CTR +2% e CPS -11% estáveis
      - connect rate Nemu 0.93 contra GA4 0.01 (99% de divergência)
      - FC 0.66x e LC 0.20x abaixo da meta · só a assistida (2.53x) sustenta
      - LC 0.20x mas LC pago 2.53x (12.9x) · a venda fecha fora do pago
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
      - sinal: Último clique abaixo do piso de saúde
        motivo: LC pago 2.53x contra 0.20x no LC (12.9x) · fecha fora do pago
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mead19-vid-continuo-hidratante-de-patinhas-care-influ-jessica
    nivel: anuncio
    pai: bubbles-meta-cocj-01-interno-bubbles-adv-brasil-linha-care-03-09-2026
    nome: 'ad19|vid|continuo|Hidratante de patinhas - CARE| INFLU: Jessica'
    apelido: AD ad19
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: parou
    papel: fraco
    evidencia:
      cliques: 124
      vendas_esperadas: 0.4969
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 3.38
        anterior: 349.33
        var_pct: -99.0324
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 43.61
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0.1248
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0
        anterior: 10.0206
        var_pct: -100
        meta: null
      roas_assist:
        valor: 0
        anterior: 8.7895
        var_pct: -100
        meta: null
      ctr:
        valor: 1.626
        anterior: 1.1257
        var_pct: 44.4489
        meta: 1
      cpm:
        valor: 27.4797
        anterior: 32.232
        var_pct: -14.744
        meta: null
      cps:
        valor: 3.38
        anterior: 3.8388
        var_pct: -11.9514
        meta: 3
      impressoes:
        valor: 123
        anterior: 10838
        var_pct: -98.8651
        meta: null
      sessoes:
        valor: 1
        anterior: 91
        var_pct: -98.9011
        meta: null
      connect_rate:
        valor: 0.5
        anterior: 0.7459
        var_pct: -32.967
        meta: null
    motivos:
      - CPS R$ 3.38 vs. meta R$ 3.00
      - ROAS LC -100% mas CTR +44% e CPS -12% estáveis
      - connect rate Nemu 0.50 contra GA4 0.00 (100% de divergência)
      - impressões -99% vs. período anterior
      - recebeu só 0.5% da verba do conjunto · 123 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.5% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.5% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-metad20-vid-continuo-apresentação-da-linha-care-influ-larissa
    nivel: anuncio
    pai: bubbles-meta-cocj-01-interno-bubbles-adv-brasil-linha-care-03-09-2026
    nome: 'ad20|vid|continuo|Apresentação da linha - CARE| INFLU: Larissa'
    apelido: AD ad20
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 6
      vendas_esperadas: 0.024
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 6.2
        anterior: 4.94
        var_pct: 25.5061
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.6667
        anterior: 1.3514
        var_pct: 23.3333
        meta: 1
      cpm:
        valor: 34.4444
        anterior: 22.2523
        var_pct: 54.7908
        meta: null
      cps:
        valor: 2.0667
        anterior: 1.6467
        var_pct: 25.5061
        meta: 3
      impressoes:
        valor: 180
        anterior: 222
        var_pct: -18.9189
        meta: null
      sessoes:
        valor: 3
        anterior: 3
        var_pct: 0
        meta: null
      connect_rate:
        valor: 1
        anterior: 1
        var_pct: 0
        meta: null
    motivos:
      - connect rate Nemu 1.00 contra GA4 0.00 (100% de divergência)
      - CPM +55% vs. período anterior
      - recebeu só 0.9% da verba do conjunto · 180 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
      - investimento subiu 26% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.9% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.9% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-cocj-01-interad21-vid-continuo-feedback-care-influ-geral
    nivel: anuncio
    pai: bubbles-meta-cocj-01-interno-bubbles-adv-brasil-linha-care-03-09-2026
    nome: 'ad21|vid|continuo|Feedback - CARE| INFLU: Geral'
    apelido: AD ad21
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 13
      vendas_esperadas: 0.0521
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 1.22
        anterior: 20.13
        var_pct: -93.9394
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 2.6316
        anterior: 1.7831
        var_pct: 47.5877
        meta: 1
      cpm:
        valor: 32.1053
        anterior: 29.9108
        var_pct: 7.3365
        meta: null
      cps:
        valor: null
        anterior: 3.355
        var_pct: null
        meta: 3
      impressoes:
        valor: 38
        anterior: 673
        var_pct: -94.3536
        meta: null
      sessoes:
        valor: 0
        anterior: 6
        var_pct: -100
        meta: null
      connect_rate:
        valor: 0
        anterior: 0.5
        var_pct: -100
        meta: null
    motivos:
      - impressões -94% vs. período anterior
      - recebeu só 0.2% da verba do conjunto · 38 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.2% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.2% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-cocj-01-intead22-vid-continuo-vídeo-04-linha-care-weryka
    nivel: anuncio
    pai: bubbles-meta-cocj-01-interno-bubbles-adv-brasil-linha-care-03-09-2026
    nome: ad22|vid|continuo|VÍDEO 04 - LINHA CARE (WERYKA)
    apelido: AD ad22
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: assistente
    evidencia:
      cliques: 580
      vendas_esperadas: 2.324
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 685
        anterior: 388.99
        var_pct: 76.0971
        meta: null
      vendas:
        valor: 2
        anterior: 4
        var_pct: -50
        meta: null
      ticket_medio:
        valor: 68.22
        anterior: 502.3725
        var_pct: -86.4204
        meta: null
      roas_lc:
        valor: 0.1992
        anterior: 5.1659
        var_pct: -96.1443
        meta: 2
      roas_fc:
        valor: 0.6682
        anterior: 1.174
        var_pct: -43.0863
        meta: null
      roas_assist:
        valor: 2.5687
        anterior: 5.9521
        var_pct: -56.8433
        meta: null
      ctr:
        valor: 1.5016
        anterior: 1.7582
        var_pct: -14.5969
        meta: 1
      cpm:
        valor: 29.6421
        anterior: 29.3533
        var_pct: 0.984
        meta: null
      cps:
        valor: 2.1273
        anterior: 1.7136
        var_pct: 24.143
        meta: 3
      impressoes:
        valor: 23109
        anterior: 13252
        var_pct: 74.3812
        meta: null
      sessoes:
        valor: 322
        anterior: 227
        var_pct: 41.8502
        meta: null
      connect_rate:
        valor: 0.928
        anterior: 0.9742
        var_pct: -4.7519
        meta: null
    motivos:
      - plataforma reporta 4.22x, LC mede 0.20x (+2017%)
      - connect rate Nemu 0.93 contra GA4 0.01 (99% de divergência)
      - investimento +76% vs. período anterior
      - FC 0.67x e LC 0.20x abaixo da meta · só a assistida (2.57x) sustenta
      - LC 0.20x mas LC pago 2.57x (12.9x) · a venda fecha fora do pago
      - consome 98% da verba com LC 0.20x contra meta 2.00x
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
      - sinal: Último clique abaixo do piso de saúde
        motivo: LC pago 2.57x contra 0.20x no LC (12.9x) · fecha fora do pago
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolcj-01-interno-bubbles-adv-top-estados-essential-v1
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_01_INTERNO-BUBBLES_ADV_TOP_ESTADOS-ESSENTIAL-V1
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: comecou
    papel: fraco
    evidencia:
      cliques: 345
      vendas_esperadas: 1.3495
      leitura: firme
    verba:
      atual: 40
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 303.49
        anterior: 263.53
        var_pct: 15.1634
        meta: null
      vendas:
        valor: 2
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 237.415
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 1.5646
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 1.0608
        anterior: 6.2475
        var_pct: -83.0211
        meta: null
      roas_assist:
        valor: 1.5646
        anterior: 8.736
        var_pct: -82.0907
        meta: null
      ctr:
        valor: 0.7508
        anterior: 0.9361
        var_pct: -19.7991
        meta: 1
      cpm:
        valor: 13.4033
        anterior: 14.097
        var_pct: -4.9214
        meta: null
      cps:
        valor: 1.9707
        anterior: 1.9236
        var_pct: 2.4505
        meta: 3
      impressoes:
        valor: 22643
        anterior: 18694
        var_pct: 21.1244
        meta: null
      sessoes:
        valor: 154
        anterior: 137
        var_pct: 12.4088
        meta: null
      connect_rate:
        valor: 0.9059
        anterior: 0.7829
        var_pct: 15.7149
        meta: null
    motivos:
      - plataforma reporta 2.75x, LC mede 1.56x (+76%)
      - FC 1.06x · LC 1.56x · ASSIST 1.56x
      - ROAS LC 1.56x vs. meta 2.00x
      - CTR 0.75% vs. meta 1.00%
      - connect rate Nemu 0.91 contra GA4 0.06 (93% de divergência)
      - LC 1.56x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-metaad06-img-pontual-criativo-03-kit-completo-linha-essential
    nivel: anuncio
    pai: bubbles-meta-consolcj-01-interno-bubbles-adv-top-estados-essential-v1
    nome: ad06|img|pontual|CRIATIVO 03 - KIT COMPLETO LINHA ESSENTIAL
    apelido: AD ad06
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: comecou
    papel: assistente
    evidencia:
      cliques: 345
      vendas_esperadas: 1.3824
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 303.49
        anterior: 263.53
        var_pct: 15.1634
        meta: null
      vendas:
        valor: 1
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 152.9
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0.5038
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 6.2475
        var_pct: -100
        meta: null
      roas_assist:
        valor: 5.1858
        anterior: 8.736
        var_pct: -40.6394
        meta: null
      ctr:
        valor: 0.7508
        anterior: 0.9361
        var_pct: -19.7991
        meta: 1
      cpm:
        valor: 13.4033
        anterior: 14.097
        var_pct: -4.9214
        meta: null
      cps:
        valor: 1.9707
        anterior: 1.8301
        var_pct: 7.6852
        meta: 3
      impressoes:
        valor: 22643
        anterior: 18694
        var_pct: 21.1244
        meta: null
      sessoes:
        valor: 154
        anterior: 144
        var_pct: 6.9444
        meta: null
      connect_rate:
        valor: 0.9059
        anterior: 0.8229
        var_pct: 10.0899
        meta: null
    motivos:
      - plataforma reporta 2.75x, LC mede 0.50x (+446%)
      - ROAS LC 0.50x vs. meta 2.00x
      - CTR 0.75% vs. meta 1.00%
      - connect rate Nemu 0.91 contra GA4 0.06 (93% de divergência)
      - FC 0.00x e LC 0.50x abaixo da meta · só a assistida (5.19x) sustenta
      - LC 0.50x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidadocj-01-remarketing-60d-frete-gratis-09-08-2026
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_01_REMARKETING_60D_FRETE_GRATIS-09.08.2026
    apelido: CJ CJ
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: parou
    papel: assistente
    evidencia:
      cliques: 663
      vendas_esperadas: 2.5933
      leitura: firme
    verba:
      atual: 50
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 353.13
        anterior: 345.53
        var_pct: 2.1995
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 69.93
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0.2024
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0.2928
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 2.2791
        anterior: 3.7556
        var_pct: -39.3149
        meta: null
      ctr:
        valor: 0.4892
        anterior: 0.3776
        var_pct: 29.55
        meta: 1
      cpm:
        valor: 12.2517
        anterior: 10.438
        var_pct: 17.3754
        meta: null
      cps:
        valor: 2.2783
        anterior: 3.17
        var_pct: -28.1307
        meta: 3
      impressoes:
        valor: 28823
        anterior: 33103
        var_pct: -12.9293
        meta: null
      sessoes:
        valor: 155
        anterior: 109
        var_pct: 42.2018
        meta: null
      connect_rate:
        valor: 1.0993
        anterior: 0.872
        var_pct: 26.0655
        meta: null
    motivos:
      - CTR 0.49% vs. meta 1.00%
      - R$ 353.13 gastos, zero conversão
      - ROAS LC -100% mas CTR +30% e CPS -28% estáveis
      - connect rate Nemu 1.10 contra GA4 0.02 (98% de divergência)
      - FC 0.29x e LC 0.00x abaixo da meta · só a assistida (2.28x) sustenta
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-metad16-img-continuo-frete-gratis-sul-criativo-01-junho-cópia
    nivel: anuncio
    pai: bubbles-meta-consolidadocj-01-remarketing-60d-frete-gratis-09-08-2026
    nome: ad16|img|continuo|frete_gratis_sul| criativo 01 - Junho — Cópia
    apelido: AD ad16
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: parou
    papel: assistente
    evidencia:
      cliques: 589
      vendas_esperadas: 2.36
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 342.62
        anterior: 214.89
        var_pct: 59.4397
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 69.93
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0.3254
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0.3018
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 2.349
        anterior: 6.0388
        var_pct: -61.1013
        meta: null
      ctr:
        valor: 0.4924
        anterior: 0.382
        var_pct: 28.8951
        meta: 1
      cpm:
        valor: 12.2251
        anterior: 10.5245
        var_pct: 16.1579
        meta: null
      cps:
        valor: 2.2393
        anterior: 2.47
        var_pct: -9.3382
        meta: 3
      impressoes:
        valor: 28026
        anterior: 20418
        var_pct: 37.2612
        meta: null
      sessoes:
        valor: 153
        anterior: 87
        var_pct: 75.8621
        meta: null
      connect_rate:
        valor: 1.1087
        anterior: 1.1154
        var_pct: -0.5997
        meta: null
    motivos:
      - CTR 0.49% vs. meta 1.00%
      - R$ 342.62 gastos, zero conversão
      - ROAS LC -100% mas CTR +29% e CPS -9% estáveis
      - connect rate Nemu 1.11 contra GA4 0.02 (98% de divergência)
      - investimento +59% vs. período anterior
      - FC 0.30x e LC 0.00x abaixo da meta · só a assistida (2.35x) sustenta
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mad17-img-continuo-frete-gratis-geral-criativo-03-junho-cópia
    nivel: anuncio
    pai: bubbles-meta-consolidadocj-01-remarketing-60d-frete-gratis-09-08-2026
    nome: ad17|img|continuo|frete_gratis_geral| criativo 03 - Junho — Cópia
    apelido: AD ad17
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 74
      vendas_esperadas: 0.2965
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 10.51
        anterior: 130.64
        var_pct: -91.955
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.3764
        anterior: 0.3705
        var_pct: 1.5911
        meta: 1
      cpm:
        valor: 13.187
        anterior: 10.2988
        var_pct: 28.0438
        meta: null
      cps:
        valor: 5.255
        anterior: 4.0825
        var_pct: 28.7201
        meta: 3
      impressoes:
        valor: 797
        anterior: 12685
        var_pct: -93.717
        meta: null
      sessoes:
        valor: 2
        anterior: 32
        var_pct: -93.75
        meta: null
      connect_rate:
        valor: 0.6667
        anterior: 0.6809
        var_pct: -2.0833
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CPS R$ 5.26 vs. meta R$ 3.00
      - connect rate Nemu 0.67 contra GA4 0.00 (100% de divergência)
      - impressões -94% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: CTR abaixo da meta
        motivo: volume abaixo do piso de significância
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-02-angulos-adv-vid-top-estados-kit-gelato-pistache-16-06-2
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_02_Angulos_ADV_VID_Top_Estados_KIT_GELATO_PISTACHE-16.06.2026
    apelido: CJ CJ
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 1519
      vendas_esperadas: 5.9415
      leitura: firme
    verba:
      atual: 50.1
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 355.38
        anterior: 340.34
        var_pct: 4.4191
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 1.5581
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 1.5581
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.4159
        anterior: 1.2985
        var_pct: 9.0418
        meta: 1
      cpm:
        valor: 14.7131
        anterior: 12.7726
        var_pct: 15.1922
        meta: null
      cps:
        valor: 1.8225
        anterior: 1.8908
        var_pct: -3.6131
        meta: 3
      impressoes:
        valor: 24154
        anterior: 26646
        var_pct: -9.3522
        meta: null
      sessoes:
        valor: 195
        anterior: 180
        var_pct: 8.3333
        meta: null
      connect_rate:
        valor: 0.5702
        anterior: 0.5202
        var_pct: 9.6004
        meta: null
    motivos:
      - FC 1.56x · LC 0.00x · ASSIST 1.56x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 355.38 gastos, zero conversão
      - connect rate Nemu 0.57 contra GA4 0.00 (99% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 51086191-ad29-vid-continuo-desembaraço-inteligente-internos-amanda-axo
    nivel: anuncio
    pai: 56174e40-cj-02-angulos-adv-vid-top-estados-kit-gelato-pistache-16-06-2
    nome: ad29|vid|continuo|desembaraço inteligente| Internos Amanda AXOLY
    apelido: AD ad29
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 1519
      vendas_esperadas: 6.0864
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 355.38
        anterior: 340.34
        var_pct: 4.4191
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 1.5581
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 1.5581
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.4159
        anterior: 1.2985
        var_pct: 9.0418
        meta: 1
      cpm:
        valor: 14.7131
        anterior: 12.7726
        var_pct: 15.1922
        meta: null
      cps:
        valor: 1.8225
        anterior: 1.8803
        var_pct: -3.0776
        meta: 3
      impressoes:
        valor: 24154
        anterior: 26646
        var_pct: -9.3522
        meta: null
      sessoes:
        valor: 195
        anterior: 181
        var_pct: 7.7348
        meta: null
      connect_rate:
        valor: 0.5702
        anterior: 0.5231
        var_pct: 8.9949
        meta: null
    motivos:
      - FC 1.56x · LC 0.00x · ASSIST 1.56x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 355.38 gastos, zero conversão
      - connect rate Nemu 0.57 contra GA4 0.00 (99% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consocj-02-remarketing-60d-principais-duvidas-20-07-2026
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_02_REMARKETING_60D_PRINCIPAIS_DUVIDAS-20.07.2026
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 958
      vendas_esperadas: 3.7472
      leitura: firme
    verba:
      atual: 50
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 364.95
        anterior: 343.83
        var_pct: 6.1426
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0.7175
        var_pct: -100
        meta: null
      ctr:
        valor: 0.805
        anterior: 1.0663
        var_pct: -24.504
        meta: 1
      cpm:
        valor: 13.6018
        anterior: 13.0476
        var_pct: 4.2477
        meta: null
      cps:
        valor: 2.2668
        anterior: 1.8789
        var_pct: 20.6465
        meta: 3
      impressoes:
        valor: 26831
        anterior: 26352
        var_pct: 1.8177
        meta: null
      sessoes:
        valor: 161
        anterior: 183
        var_pct: -12.0219
        meta: null
      connect_rate:
        valor: 0.7454
        anterior: 0.6512
        var_pct: 14.453
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.81% vs. meta 1.00%
      - R$ 364.95 gastos, zero conversão
      - connect rate Nemu 0.75 contra GA4 0.01 (99% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-metaad68-vid-continuo-os-produtos-são-hipoalergênicos-vídeo-1
    nivel: anuncio
    pai: bubbles-meta-consocj-02-remarketing-60d-principais-duvidas-20-07-2026
    nome: ad68|vid|continuo|Os produtos são hipoalergênicos? | Vídeo 1
    apelido: AD ad68
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 740
      vendas_esperadas: 2.9651
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 364.95
        anterior: 343.83
        var_pct: 6.1426
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0.7175
        var_pct: -100
        meta: null
      ctr:
        valor: 0.805
        anterior: 1.0663
        var_pct: -24.504
        meta: 1
      cpm:
        valor: 13.6018
        anterior: 13.0476
        var_pct: 4.2477
        meta: null
      cps:
        valor: 2.2668
        anterior: 1.9102
        var_pct: 18.6687
        meta: 3
      impressoes:
        valor: 26831
        anterior: 26352
        var_pct: 1.8177
        meta: null
      sessoes:
        valor: 161
        anterior: 180
        var_pct: -10.5556
        meta: null
      connect_rate:
        valor: 0.7454
        anterior: 0.6406
        var_pct: 16.3606
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.81% vs. meta 1.00%
      - R$ 364.95 gastos, zero conversão
      - connect rate Nemu 0.75 contra GA4 0.01 (99% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-ccj-03-interno-bubbles-adv-top-estados-masterclass-lives
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_03_INTERNO-BUBBLES_ADV_TOP_ESTADOS - MASTERCLASS/LIVES
    apelido: CJ CJ
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: assistente
    evidencia:
      cliques: 223
      vendas_esperadas: 0.8723
      leitura: direcional
    verba:
      atual: 50
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 160.16
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: 2.9254
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: 0.8728
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: 26.8815
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: 4.004
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 5958
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 40
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: 0.7692
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.87% vs. meta 1.00%
      - CPS R$ 4.00 vs. meta R$ 3.00
      - R$ 160.16 gastos, zero conversão
      - connect rate Nemu 0.77 contra GA4 0.04 (95% de divergência)
      - FC 0.00x e LC 0.00x abaixo da meta · só a assistida (2.93x) sustenta
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: a1ad5926-ad27-img-continuo-criativo-01-masterclass-setembroad27-img-co
    nivel: anuncio
    pai: bubbles-meta-ccj-03-interno-bubbles-adv-top-estados-masterclass-lives
    nome: ad27|img|continuo|CRIATIVO 01 - MASTERCLASS SETEMBROad27|img|continuo|CRIATIVO 01 - MASTERCLASS SETEMBRO
    apelido: AD ad27
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: assistente
    evidencia:
      cliques: 29
      vendas_esperadas: 0.1162
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 77.59
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: 6.0387
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: 0.8369
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: 22.3925
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: 2.9842
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 3465
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 26
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: 0.8966
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - CTR 0.84% vs. meta 1.00%
      - connect rate Nemu 0.90 contra GA4 0.03 (96% de divergência)
      - FC 0.00x e LC 0.00x abaixo da meta · só a assistida (6.04x) sustenta
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
      - 2 anúncio(s) ativo(s) · abaixo do mínimo de 3 para haver diversidade criativa
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Gasto sem nenhuma conversão
        motivo: volume abaixo do piso de cliques
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-ccj-03ad28-img-continuo-criativo-02-masterclass-setembro
    nivel: anuncio
    pai: bubbles-meta-ccj-03-interno-bubbles-adv-top-estados-masterclass-lives
    nome: ad28|img|continuo|CRIATIVO 02 - MASTERCLASS SETEMBRO
    apelido: AD ad28
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 23
      vendas_esperadas: 0.0922
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 82.57
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: 0.9226
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: 33.1207
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: 5.8979
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 2493
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 14
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: 0.6087
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CTR 0.92% vs. meta 1.00%
      - CPS R$ 5.90 vs. meta R$ 3.00
      - connect rate Nemu 0.61 contra GA4 0.04 (93% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Gasto sem nenhuma conversão
        motivo: volume abaixo do piso de cliques
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mcj-03-remarketing-60d-principais-duvidas-v2-20-07-2026-cópia
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_03_REMARKETING_60D_PRINCIPAIS_DUVIDAS_V2-20.07.2026 — Cópia
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 489
      vendas_esperadas: 1.9127
      leitura: firme
    verba:
      atual: 35
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 253.76
        anterior: 230.65
        var_pct: 10.0195
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.2801
        anterior: 1.0696
        var_pct: -73.8153
        meta: null
      roas_assist:
        valor: 0.2321
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.7031
        anterior: 0.6087
        var_pct: 15.5178
        meta: 1
      cpm:
        valor: 13.939
        anterior: 13.8996
        var_pct: 0.2836
        meta: null
      cps:
        valor: 2.6433
        anterior: 3.6039
        var_pct: -26.6537
        meta: 3
      impressoes:
        valor: 18205
        anterior: 16594
        var_pct: 9.7083
        meta: null
      sessoes:
        valor: 96
        anterior: 64
        var_pct: 50
        meta: null
      connect_rate:
        valor: 0.75
        anterior: 0.6337
        var_pct: 18.3594
        meta: null
    motivos:
      - FC 0.28x · LC 0.00x · ASSIST 0.23x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.70% vs. meta 1.00%
      - R$ 253.76 gastos, zero conversão
      - connect rate Nemu 0.75 contra GA4 0.00 (100% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: eb1446da-ad73-vid-continuo-como-consigo-oferecer-o-serviço-de-coloraçã
    nivel: anuncio
    pai: bubbles-mcj-03-remarketing-60d-principais-duvidas-v2-20-07-2026-cópia
    nome: ad73|vid|continuo|Como consigo oferecer o serviço de coloração| Vídeo 6
    apelido: AD ad73
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 489
      vendas_esperadas: 1.9594
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 253.76
        anterior: 230.65
        var_pct: 10.0195
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.2801
        anterior: 1.0696
        var_pct: -73.8153
        meta: null
      roas_assist:
        valor: 0.2321
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.7031
        anterior: 0.6087
        var_pct: 15.5178
        meta: 1
      cpm:
        valor: 13.939
        anterior: 13.8996
        var_pct: 0.2836
        meta: null
      cps:
        valor: 2.6433
        anterior: 3.6039
        var_pct: -26.6537
        meta: 3
      impressoes:
        valor: 18205
        anterior: 16594
        var_pct: 9.7083
        meta: null
      sessoes:
        valor: 96
        anterior: 64
        var_pct: 50
        meta: null
      connect_rate:
        valor: 0.75
        anterior: 0.6337
        var_pct: 18.3594
        meta: null
    motivos:
      - FC 0.28x · LC 0.00x · ASSIST 0.23x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.70% vs. meta 1.00%
      - R$ 253.76 gastos, zero conversão
      - connect rate Nemu 0.75 contra GA4 0.00 (100% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-05-angulos-adv-vid-top-estados-linha-pro-condicionador-v1-
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_05_Angulos_ADV_VID_Top_Estados_LINHA_PRO_CONDICIONADOR_V1-12.06.2026
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: gerador
    evidencia:
      cliques: 635
      vendas_esperadas: 2.4838
      leitura: firme
    verba:
      atual: 40.5
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 292.37
        anterior: 270.83
        var_pct: 7.9533
        meta: null
      vendas:
        valor: 2
        anterior: 1
        var_pct: 100
        meta: null
      ticket_medio:
        valor: 107.49
        anterior: 156.42
        var_pct: -31.2812
        meta: null
      roas_lc:
        valor: 0.7353
        anterior: 0.5776
        var_pct: 27.3121
        meta: 2
      roas_fc:
        valor: 2.0187
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 2.754
        anterior: 0.5776
        var_pct: 376.843
        meta: null
      ctr:
        valor: 0.8751
        anterior: 0.9214
        var_pct: -5.0222
        meta: 1
      cpm:
        valor: 15.5062
        anterior: 15.3089
        var_pct: 1.2889
        meta: null
      cps:
        valor: 2.2149
        anterior: 2.3757
        var_pct: -6.7676
        meta: 3
      impressoes:
        valor: 18855
        anterior: 17691
        var_pct: 6.5796
        meta: null
      sessoes:
        valor: 132
        anterior: 114
        var_pct: 15.7895
        meta: null
      connect_rate:
        valor: 0.8
        anterior: 0.6994
        var_pct: 14.386
        meta: null
    motivos:
      - CTR 0.88% vs. meta 1.00%
      - connect rate Nemu 0.80 contra GA4 0.00 (100% de divergência)
      - LC 0.74x mas LC pago 9.42x (12.8x) · a venda fecha fora do pago
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
      - sinal: Último clique abaixo do piso de saúde
        motivo: LC pago 9.42x contra 0.74x no LC (12.8x) · fecha fora do pago
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cj-05-angulos-adv-vid-top-estados-linha-pro-condicionador-v2-
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_05_Angulos_ADV_VID_Top_Estados_LINHA_PRO_CONDICIONADOR_V2-08.07.2026
    apelido: CJ CJ
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 494
      vendas_esperadas: 1.9323
      leitura: firme
    verba:
      atual: 40.5
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 294.63
        anterior: 271.83
        var_pct: 8.3876
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.5618
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0.5618
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.9945
        anterior: 0.6887
        var_pct: 44.4012
        meta: 1
      cpm:
        valor: 21.2315
        anterior: 21.5175
        var_pct: -1.3288
        meta: null
      cps:
        valor: 3.1344
        anterior: 3.5303
        var_pct: -11.2144
        meta: 3
      impressoes:
        valor: 13877
        anterior: 12633
        var_pct: 9.8472
        meta: null
      sessoes:
        valor: 94
        anterior: 77
        var_pct: 22.0779
        meta: null
      connect_rate:
        valor: 0.6812
        anterior: 0.8851
        var_pct: -23.0378
        meta: null
    motivos:
      - FC 0.56x · LC 0.00x · ASSIST 0.56x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.99% vs. meta 1.00%
      - CPS R$ 3.13 vs. meta R$ 3.00
      - R$ 294.63 gastos, zero conversão
      - connect rate Nemu 0.68 contra GA4 0.04 (95% de divergência)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 56174e40-cjad24-vid-continuo-condiconador-hidratante-pro-weryka-axoly
    nivel: anuncio
    pai: 56174e40-cj-05-angulos-adv-vid-top-estados-linha-pro-condicionador-v2-
    nome: ad24|vid|continuo|CONDICONADOR HIDRATANTE PRO| Weryka AXOLY
    apelido: AD ad24
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: assistente
    evidencia:
      cliques: 832
      vendas_esperadas: 3.3337
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 587
        anterior: 542.66
        var_pct: 8.1709
        meta: null
      vendas:
        valor: 2
        anterior: 1
        var_pct: 100
        meta: null
      ticket_medio:
        valor: 107.49
        anterior: 156.42
        var_pct: -31.2812
        meta: null
      roas_lc:
        valor: 0.3662
        anterior: 0.2882
        var_pct: 27.0561
        meta: 2
      roas_fc:
        valor: 1.2874
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 1.6537
        anterior: 0.2882
        var_pct: 473.7027
        meta: null
      ctr:
        valor: 0.9257
        anterior: 0.8244
        var_pct: 12.2837
        meta: 1
      cpm:
        valor: 17.9335
        anterior: 17.8954
        var_pct: 0.213
        meta: null
      cps:
        valor: 2.6441
        anterior: 2.9333
        var_pct: -9.8576
        meta: 3
      impressoes:
        valor: 32732
        anterior: 30324
        var_pct: 7.9409
        meta: null
      sessoes:
        valor: 222
        anterior: 185
        var_pct: 20
        meta: null
      connect_rate:
        valor: 0.7327
        anterior: 0.74
        var_pct: -0.9901
        meta: null
    motivos:
      - ROAS LC 0.37x vs. meta 2.00x
      - CTR 0.93% vs. meta 1.00%
      - connect rate Nemu 0.73 contra GA4 0.02 (98% de divergência)
      - FC 1.29x e LC 0.37x abaixo da meta · só a assistida (1.65x) sustenta
      - LC 0.37x abaixo do piso de saúde 2.00x
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-ccj-06-interno-bubbles-adv-top-estados-todos-os-produtos
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_06_INTERNO-BUBBLES_ADV_TOP_ESTADOS-TODOS-OS-PRODUTOS
    apelido: CJ CJ
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 460
      vendas_esperadas: 1.7993
      leitura: firme
    verba:
      atual: 30
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 225.1
        anterior: 196.12
        var_pct: 14.7767
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 4.3791
        var_pct: -100
        meta: null
      roas_assist:
        valor: 0
        anterior: 9.4375
        var_pct: -100
        meta: null
      ctr:
        valor: 0.9245
        anterior: 0.808
        var_pct: 14.4246
        meta: 1
      cpm:
        valor: 19.269
        anterior: 17.4128
        var_pct: 10.66
        meta: null
      cps:
        valor: 2.4467
        anterior: 2.4515
        var_pct: -0.1942
        meta: 3
      impressoes:
        valor: 11682
        anterior: 11263
        var_pct: 3.7201
        meta: null
      sessoes:
        valor: 92
        anterior: 80
        var_pct: 15
        meta: null
      connect_rate:
        valor: 0.8519
        anterior: 0.8791
        var_pct: -3.1019
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.92% vs. meta 1.00%
      - R$ 225.10 gastos, zero conversão
      - connect rate Nemu 0.85 contra GA4 0.08 (90% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mad05-img-pontual-criativo-01-institucional-campanha-setembro
    nivel: anuncio
    pai: bubbles-meta-ccj-06-interno-bubbles-adv-top-estados-todos-os-produtos
    nome: ad05|img|pontual|CRIATIVO 01 - INSTITUCIONAL CAMPANHA SETEMBRO
    apelido: AD ad05
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 99
      vendas_esperadas: 0.3967
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 84.78
        anterior: 145.15
        var_pct: -41.5915
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 1.1705
        var_pct: -100
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.7343
        anterior: 0.7743
        var_pct: -5.1722
        meta: 1
      cpm:
        valor: 16.8248
        anterior: 18.1279
        var_pct: -7.1885
        meta: null
      cps:
        valor: 3.2608
        anterior: 2.7913
        var_pct: 16.8171
        meta: 3
      impressoes:
        valor: 5039
        anterior: 8007
        var_pct: -37.0676
        meta: null
      sessoes:
        valor: 26
        anterior: 52
        var_pct: -50
        meta: null
      connect_rate:
        valor: 0.7027
        anterior: 0.8387
        var_pct: -16.2162
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CTR 0.73% vs. meta 1.00%
      - CPS R$ 3.26 vs. meta R$ 3.00
      - connect rate Nemu 0.70 contra GA4 0.16 (77% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Gasto sem nenhuma conversão
        motivo: volume abaixo do piso de cliques
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-metad05-img-pontual-criativo-02-campanha-institucional-agosto
    nivel: anuncio
    pai: bubbles-meta-ccj-06-interno-bubbles-adv-top-estados-todos-os-produtos
    nome: ad05|img|pontual|CRIATIVO 02 - CAMPANHA INSTITUCIONAL| Agosto
    apelido: AD ad05
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 270
      vendas_esperadas: 1.0819
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 32.92
        anterior: 43.76
        var_pct: -24.7715
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 15.7434
        var_pct: -100
        meta: null
      roas_assist:
        valor: 0
        anterior: 42.2964
        var_pct: -100
        meta: null
      ctr:
        valor: 1.5456
        anterior: 0.8555
        var_pct: 80.6563
        meta: 1
      cpm:
        valor: 25.4405
        anterior: 14.3995
        var_pct: 76.6766
        meta: null
      cps:
        valor: 1.8289
        anterior: 1.6831
        var_pct: 8.6634
        meta: 3
      impressoes:
        valor: 1294
        anterior: 3039
        var_pct: -57.4202
        meta: null
      sessoes:
        valor: 18
        anterior: 26
        var_pct: -30.7692
        meta: null
      connect_rate:
        valor: 0.9
        anterior: 1
        var_pct: -10
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - connect rate Nemu 0.90 contra GA4 0.10 (89% de divergência)
      - CPM +77% vs. período anterior
      - impressões -57% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mad16-vid-pontual-vídeo-6-pare-de-olhar-apenas-o-preço-agosto
    nivel: anuncio
    pai: bubbles-meta-ccj-06-interno-bubbles-adv-top-estados-todos-os-produtos
    nome: ad16|vid|pontual|VÍDEO 6 - PARE DE OLHAR APENAS O PREÇO| Agosto
    apelido: AD ad16
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 85
      vendas_esperadas: 0.3406
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 107.4
        anterior: 4.44
        var_pct: 2318.9189
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.9534
        anterior: 1.1628
        var_pct: -18.0034
        meta: 1
      cpm:
        valor: 20.0785
        anterior: 25.814
        var_pct: -22.2183
        meta: null
      cps:
        valor: 2.4977
        anterior: 2.22
        var_pct: 12.5079
        meta: 3
      impressoes:
        valor: 5349
        anterior: 172
        var_pct: 3009.8837
        meta: null
      sessoes:
        valor: 43
        anterior: 2
        var_pct: 2050
        meta: null
      connect_rate:
        valor: 0.8431
        anterior: 1
        var_pct: -15.6863
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.95% vs. meta 1.00%
      - R$ 107.40 gastos, zero conversão
      - connect rate Nemu 0.84 contra GA4 0.02 (98% de divergência)
      - investimento +2319% vs. período anterior
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidado-da-ccj-07-interno-bubbles-ad-top-estados-pro
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_07_INTERNO-BUBBLES_AD_TOP_ESTADOS_PRO
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: comecou
    papel: assistente
    evidencia:
      cliques: 1032
      vendas_esperadas: 4.0366
      leitura: firme
    verba:
      atual: 70
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 526.7
        anterior: 461.52
        var_pct: 14.1229
        meta: null
      vendas:
        valor: 3
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 79.09
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0.4505
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.1109
        anterior: 3.5007
        var_pct: -96.8321
        meta: null
      roas_assist:
        valor: 2.9854
        anterior: 0.4269
        var_pct: 599.3664
        meta: null
      ctr:
        valor: 1.2586
        anterior: 1.4878
        var_pct: -15.4016
        meta: 1
      cpm:
        valor: 19.6713
        anterior: 23.3551
        var_pct: -15.7728
        meta: null
      cps:
        valor: 1.9727
        anterior: 2.1566
        var_pct: -8.5307
        meta: 3
      impressoes:
        valor: 26775
        anterior: 19761
        var_pct: 35.4942
        meta: null
      sessoes:
        valor: 267
        anterior: 214
        var_pct: 24.7664
        meta: null
      connect_rate:
        valor: 0.7923
        anterior: 0.7279
        var_pct: 8.8466
        meta: null
    motivos:
      - plataforma reporta 8.63x, LC mede 0.45x (+1817%)
      - connect rate Nemu 0.79 contra GA4 0.03 (96% de divergência)
      - FC 0.11x e LC 0.45x abaixo da meta · só a assistida (2.99x) sustenta
      - LC 0.45x mas LC pago 3.95x (8.8x) · a venda fecha fora do pago
      - 3.0 conversões/semana contra limiar de 25 (12% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: LC pago 3.95x contra 0.45x no LC (8.8x) · fecha fora do pago
      - sinal: Último clique abaixo do piso de saúde
        motivo: LC pago 3.95x contra 0.45x no LC (8.8x) · fecha fora do pago
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 216816a8-ad01-vid-pontual-vídeo-1-linha-pro-com-desconto-setembro-wery
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-ccj-07-interno-bubbles-ad-top-estados-pro
    nome: ad01|vid|pontual|VÍDEO 1 - LINHA PRO COM DESCONTO SETEMBRO (WERYKA)
    apelido: AD ad01
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: comecou
    papel: fraco
    evidencia:
      cliques: 424
      vendas_esperadas: 1.6989
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 249.25
        anterior: 281.73
        var_pct: -11.5288
        meta: null
      vendas:
        valor: 1
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 105.03
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0.4214
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0.4214
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.4913
        anterior: 1.5902
        var_pct: -6.2156
        meta: 1
      cpm:
        valor: 18.1325
        anterior: 20.4567
        var_pct: -11.3614
        meta: null
      cps:
        valor: 1.5876
        anterior: 1.7945
        var_pct: -11.5288
        meta: 3
      impressoes:
        valor: 13746
        anterior: 13772
        var_pct: -0.1888
        meta: null
      sessoes:
        valor: 157
        anterior: 157
        var_pct: 0
        meta: null
      connect_rate:
        valor: 0.7659
        anterior: 0.7169
        var_pct: 6.8293
        meta: null
    motivos:
      - plataforma reporta 13.35x, LC mede 0.42x (+3068%)
      - FC 0.00x · LC 0.42x · ASSIST 0.42x
      - ROAS LC 0.42x vs. meta 2.00x
      - connect rate Nemu 0.77 contra GA4 0.01 (98% de divergência)
      - LC 0.42x abaixo do piso de saúde 2.00x
      - 1.0 conversões/semana contra limiar de 25 (4% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-conad03-vid-pontual-vídeo-5-cronograma-de-palagem-10-off
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-ccj-07-interno-bubbles-ad-top-estados-pro
    nome: ad03|vid|pontual|VÍDEO 5 - CRONOGRAMA DE PALAGEM 10% OFF
    apelido: AD ad03
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 48
      vendas_esperadas: 0.1923
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 29.71
        anterior: 72.88
        var_pct: -59.2344
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 2.7032
        var_pct: -100
        meta: null
      ctr:
        valor: 1.4159
        anterior: 1.1756
        var_pct: 20.4425
        meta: 1
      cpm:
        valor: 26.292
        anterior: 26.7744
        var_pct: -1.8017
        meta: null
      cps:
        valor: 3.7138
        anterior: 2.9152
        var_pct: 27.3926
        meta: 3
      impressoes:
        valor: 1130
        anterior: 2722
        var_pct: -58.4864
        meta: null
      sessoes:
        valor: 8
        anterior: 25
        var_pct: -68
        meta: null
      connect_rate:
        valor: 0.5
        anterior: 0.7812
        var_pct: -36
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CPS R$ 3.71 vs. meta R$ 3.00
      - connect rate Nemu 0.50 contra GA4 0.00 (100% de divergência)
      - impressões -58% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidado-da-ad04-vid-pontual-vídeo-6-kit-texturizador
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-ccj-07-interno-bubbles-ad-top-estados-pro
    nome: ad04|vid|pontual|VÍDEO 6 - KIT TEXTURIZADOR
    apelido: AD ad04
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: comecou
    papel: assistente
    evidencia:
      cliques: 88
      vendas_esperadas: 0.3526
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 128.1
        anterior: 106.91
        var_pct: 19.8204
        meta: null
      vendas:
        valor: 2
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 66.12
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 1.0323
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.456
        anterior: 15.1121
        var_pct: -96.9827
        meta: null
      roas_assist:
        valor: 11.455
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.1688
        anterior: 1.3162
        var_pct: -11.196
        meta: 1
      cpm:
        valor: 33.2727
        anterior: 32.7242
        var_pct: 1.6762
        meta: null
      cps:
        valor: 2.7255
        anterior: 3.3409
        var_pct: -18.4201
        meta: 3
      impressoes:
        valor: 3850
        anterior: 3267
        var_pct: 17.8451
        meta: null
      sessoes:
        valor: 47
        anterior: 32
        var_pct: 46.875
        meta: null
      connect_rate:
        valor: 1.0444
        anterior: 0.7442
        var_pct: 40.3472
        meta: null
    motivos:
      - plataforma reporta 6.27x, LC mede 1.03x (+507%)
      - connect rate Nemu 1.04 contra GA4 0.00 (100% de divergência)
      - FC 0.46x e LC 1.03x abaixo da meta · só a assistida (11.45x) sustenta
      - LC 1.03x mas LC pago 11.45x (11.1x) · a venda fecha fora do pago
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Último clique abaixo do piso de saúde
        motivo: LC pago 11.45x contra 1.03x no LC (11.1x) · fecha fora do pago
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mad13-vid-pontual-vídeo-1-shampoo-neutralizador-pro-5l-agosto
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-ccj-07-interno-bubbles-ad-top-estados-pro
    nome: ad13|vid|pontual|VÍDEO 1 - SHAMPOO NEUTRALIZADOR PRO 5L| Agosto
    apelido: AD ad13
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 12
      vendas_esperadas: 0.0481
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consoliad25-img-continuo-criativo-05-kit-banho-de-volume
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-ccj-07-interno-bubbles-ad-top-estados-pro
    nome: ad25|img|continuo|CRIATIVO 05 - KIT BANHO DE VOLUME
    apelido: AD ad25
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 67
      vendas_esperadas: 0.2685
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 105.38
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: 0.8968
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: 14.1052
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: 2.1506
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 7471
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 49
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: 0.7313
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.90% vs. meta 1.00%
      - R$ 105.38 gastos, zero conversão
      - connect rate Nemu 0.73 contra GA4 0.10 (86% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-cad26-img-continuo-criativo-07-kit-cronograma-de-pelagem
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-ccj-07-interno-bubbles-ad-top-estados-pro
    nome: ad26|img|continuo|CRIATIVO 07 - KIT CRONOGRAMA DE PELAGEM
    apelido: AD ad26
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 4
      vendas_esperadas: 0.016
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 14.26
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: 0.692
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: 24.6713
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: 3.565
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 578
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 4
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: 1
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CPS R$ 3.56 vs. meta R$ 3.00
      - connect rate Nemu 1.00 contra GA4 0.00 (100% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: CTR abaixo da meta
        motivo: volume abaixo do piso de significância
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mcj-08-interno-bubbles-ad-top-estados-pro-perfumes-06-07-2026
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_08_INTERNO-BUBBLES_AD_TOP_ESTADOS_PRO_PERFUMES-06.07.2026
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: colhedor
    evidencia:
      cliques: 427
      vendas_esperadas: 1.6702
      leitura: firme
    verba:
      atual: 28.38
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 211.85
        anterior: 182.42
        var_pct: 16.1331
        meta: null
      vendas:
        valor: 2
        anterior: 3
        var_pct: -33.3333
        meta: null
      ticket_medio:
        valor: 1102.91
        anterior: 457.4533
        var_pct: 141.0978
        meta: null
      roas_lc:
        valor: 10.4122
        anterior: 7.5231
        var_pct: 38.4032
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 10.4122
        anterior: 7.5231
        var_pct: 38.4032
        meta: null
      ctr:
        valor: 0.7159
        anterior: 0.8151
        var_pct: -12.1688
        meta: 1
      cpm:
        valor: 15.1657
        anterior: 18.3558
        var_pct: -17.3791
        meta: null
      cps:
        valor: 2.522
        anterior: 2.8065
        var_pct: -10.1351
        meta: 3
      impressoes:
        valor: 13969
        anterior: 9938
        var_pct: 40.5615
        meta: null
      sessoes:
        valor: 84
        anterior: 65
        var_pct: 29.2308
        meta: null
      connect_rate:
        valor: 0.84
        anterior: 0.8025
        var_pct: 4.6769
        meta: null
    motivos:
      - connect rate Nemu 0.84 contra GA4 0.06 (93% de divergência)
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: CTR abaixo da meta
        motivo: CTR baixo mas ROAS acima da meta · clique caro que converte
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mcj-08-interno-bubbad12-img-pontual-criativo-02-mini-perfumes
    nivel: anuncio
    pai: bubbles-mcj-08-interno-bubbles-ad-top-estados-pro-perfumes-06-07-2026
    nome: ad12|img|pontual|CRIATIVO 02 - MINI PERFUMES
    apelido: AD ad12
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: consistente
    papel: colhedor
    evidencia:
      cliques: 162
      vendas_esperadas: 0.6491
      leitura: direcional
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 183.07
        anterior: 143.09
        var_pct: 27.9405
        meta: null
      vendas:
        valor: 2
        anterior: 1
        var_pct: 100
        meta: null
      ticket_medio:
        valor: 1102.91
        anterior: 479.23
        var_pct: 130.1421
        meta: null
      roas_lc:
        valor: 12.0491
        anterior: 3.3492
        var_pct: 259.7644
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 12.0491
        anterior: 3.3492
        var_pct: 259.7644
        meta: null
      ctr:
        valor: 0.7259
        anterior: 0.83
        var_pct: -12.5367
        meta: 1
      cpm:
        valor: 14.1378
        anterior: 17.4649
        var_pct: -19.0504
        meta: null
      cps:
        valor: 2.3173
        anterior: 2.6998
        var_pct: -14.1665
        meta: 3
      impressoes:
        valor: 12949
        anterior: 8193
        var_pct: 58.0496
        meta: null
      sessoes:
        valor: 79
        anterior: 53
        var_pct: 49.0566
        meta: null
      connect_rate:
        valor: 0.8404
        anterior: 0.7794
        var_pct: 7.8282
        meta: null
    motivos:
      - connect rate Nemu 0.84 contra GA4 0.05 (94% de divergência)
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
      - 2 anúncio(s) ativo(s) · abaixo do mínimo de 3 para haver diversidade criativa
      - investimento subiu 28% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: CTR abaixo da meta
        motivo: CTR baixo mas ROAS acima da meta · clique caro que converte
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: 01505207-ad37-vid-continuo-mini-perfumes-oliver-pet-o-que-era-bom-fico
    nivel: anuncio
    pai: bubbles-mcj-08-interno-bubbles-ad-top-estados-pro-perfumes-06-07-2026
    nome: ad37|vid|continuo|MINI PERFUMES| Oliver Pet -  O que Era Bom Ficou Ainda Melhor
    apelido: AD ad37
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 62
      vendas_esperadas: 0.2484
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 28.78
        anterior: 37.7
        var_pct: -23.6605
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.5882
        anterior: 0.5938
        var_pct: -0.9412
        meta: 1
      cpm:
        valor: 28.2157
        anterior: 22.3872
        var_pct: 26.0351
        meta: null
      cps:
        valor: 5.756
        anterior: 4.1889
        var_pct: 37.4111
        meta: 3
      impressoes:
        valor: 1020
        anterior: 1684
        var_pct: -39.4299
        meta: null
      sessoes:
        valor: 5
        anterior: 9
        var_pct: -44.4444
        meta: null
      connect_rate:
        valor: 0.8333
        anterior: 0.9
        var_pct: -7.4074
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CTR 0.59% vs. meta 1.00%
      - CPS R$ 5.76 vs. meta R$ 3.00
      - connect rate Nemu 0.83 contra GA4 0.17 (80% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidado-dcj-09-interno-bubbles-ad-top-estados-pro-v2
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_09_INTERNO-BUBBLES_AD_TOP_ESTADOS_PRO-V2
    apelido: CJ CJ
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: fraco
    evidencia:
      cliques: 386
      vendas_esperadas: 1.5098
      leitura: firme
    verba:
      atual: 30
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 212.24
        anterior: 200.84
        var_pct: 5.6762
        meta: null
      vendas:
        valor: 1
        anterior: 1
        var_pct: 0
        meta: null
      ticket_medio:
        valor: 103.41
        anterior: 430.04
        var_pct: -75.9534
        meta: null
      roas_lc:
        valor: 0.4872
        anterior: 2.1412
        var_pct: -77.245
        meta: 2
      roas_fc:
        valor: 1.1695
        anterior: 0.9809
        var_pct: 19.2261
        meta: null
      roas_assist:
        valor: 0.4872
        anterior: 2.1412
        var_pct: -77.245
        meta: null
      ctr:
        valor: 0.9669
        anterior: 1.1761
        var_pct: -17.7918
        meta: 1
      cpm:
        valor: 17.101
        anterior: 18.7473
        var_pct: -8.7818
        meta: null
      cps:
        valor: 1.7255
        anterior: 1.6067
        var_pct: 7.3945
        meta: 3
      impressoes:
        valor: 12411
        anterior: 10713
        var_pct: 15.8499
        meta: null
      sessoes:
        valor: 123
        anterior: 125
        var_pct: -1.6
        meta: null
      connect_rate:
        valor: 1.025
        anterior: 0.9921
        var_pct: 3.32
        meta: null
    motivos:
      - plataforma reporta 0.87x, LC mede 0.49x (+78%)
      - FC 1.17x · LC 0.49x · ASSIST 0.49x
      - ROAS LC 0.49x vs. meta 2.00x
      - CTR 0.97% vs. meta 1.00%
      - connect rate Nemu 1.02 contra GA4 0.04 (96% de divergência)
      - LC 0.49x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolad09-vid-pontual-vídeo-9-shampoo-bararo-oliver-pet
    nivel: anuncio
    pai: bubbles-meta-consolidado-dcj-09-interno-bubbles-ad-top-estados-pro-v2
    nome: ad09|vid|pontual|VÍDEO 9 - SHAMPOO BARARO (OLIVER PET)
    apelido: AD ad09
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 3
      vendas_esperadas: 0.012
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 1.2
        anterior: 5.67
        var_pct: -78.836
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 3.7736
        anterior: 0.4717
        var_pct: 700
        meta: 1
      cpm:
        valor: 22.6415
        anterior: 26.7453
        var_pct: -15.3439
        meta: null
      cps:
        valor: null
        anterior: 5.67
        var_pct: null
        meta: 3
      impressoes:
        valor: 53
        anterior: 212
        var_pct: -75
        meta: null
      sessoes:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      connect_rate:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
    motivos:
      - impressões -75% vs. período anterior
      - recebeu só 0.6% da verba do conjunto · 53 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.6% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.6% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-metaad10-vid-pontual-vídeo-7-vale-a-pena-investir-em-produtos
    nivel: anuncio
    pai: bubbles-meta-consolidado-dcj-09-interno-bubbles-ad-top-estados-pro-v2
    nome: ad10|vid|pontual|VÍDEO 7 - VALE A PENA INVESTIR EM PRODUTOS
    apelido: AD ad10
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 1
      vendas_esperadas: 0.004
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 1.21
        anterior: 4.19
        var_pct: -71.1217
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0
        anterior: 0.6757
        var_pct: -100
        meta: 1
      cpm:
        valor: 41.7241
        anterior: 28.3108
        var_pct: 47.3788
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 29
        anterior: 148
        var_pct: -80.4054
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: 0
        var_pct: null
        meta: null
    motivos:
      - CPM +47% vs. período anterior
      - impressões -80% vs. período anterior
      - recebeu só 0.6% da verba do conjunto · 29 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.6% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: CTR abaixo da meta
        motivo: volume abaixo do piso de significância
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 0.6% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidado-dcjad11-vid-pontual-vídeo-8-rende-500-banhos
    nivel: anuncio
    pai: bubbles-meta-consolidado-dcj-09-interno-bubbles-ad-top-estados-pro-v2
    nome: ad11|vid|pontual|VÍDEO 8 - RENDE 500 BANHOS
    apelido: AD ad11
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: consistente
    papel: fraco
    evidencia:
      cliques: 234
      vendas_esperadas: 0.9376
      leitura: direcional
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 198.47
        anterior: 186.77
        var_pct: 6.2644
        meta: null
      vendas:
        valor: 1
        anterior: 1
        var_pct: 0
        meta: null
      ticket_medio:
        valor: 103.41
        anterior: 430.04
        var_pct: -75.9534
        meta: null
      roas_lc:
        valor: 0.521
        anterior: 2.3025
        var_pct: -77.371
        meta: 2
      roas_fc:
        valor: 1.2507
        anterior: 1.0548
        var_pct: 18.5662
        meta: null
      roas_assist:
        valor: 0.521
        anterior: 2.3025
        var_pct: -77.371
        meta: null
      ctr:
        valor: 0.982
        anterior: 1.1677
        var_pct: -15.9085
        meta: 1
      cpm:
        valor: 16.801
        anterior: 18.4829
        var_pct: -9.1
        meta: null
      cps:
        valor: 1.6539
        anterior: 1.7294
        var_pct: -4.362
        meta: 3
      impressoes:
        valor: 11813
        anterior: 10105
        var_pct: 16.9025
        meta: null
      sessoes:
        valor: 120
        anterior: 108
        var_pct: 11.1111
        meta: null
      connect_rate:
        valor: 1.0345
        anterior: 0.9153
        var_pct: 13.0268
        meta: null
    motivos:
      - FC 1.25x · LC 0.52x · ASSIST 0.52x
      - ROAS LC 0.52x vs. meta 2.00x
      - CTR 0.98% vs. meta 1.00%
      - connect rate Nemu 1.03 contra GA4 0.03 (97% de divergência)
      - LC 0.52x abaixo do piso de saúde 2.00x
      - consome 94% da verba com LC 0.52x contra meta 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidado-dcjad13-img-pontual-criativo-04-galões-de-5l
    nivel: anuncio
    pai: bubbles-meta-consolidado-dcj-09-interno-bubbles-ad-top-estados-pro-v2
    nome: ad13|img|pontual|CRIATIVO 04 - GALÕES DE 5L
    apelido: AD ad13
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 8
      vendas_esperadas: 0.0321
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 11.36
        anterior: 4.21
        var_pct: 169.8337
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.3876
        anterior: 2.4194
        var_pct: -83.9793
        meta: 1
      cpm:
        valor: 22.0155
        anterior: 16.9758
        var_pct: 29.6875
        meta: null
      cps:
        valor: 5.68
        anterior: 0.6014
        var_pct: 844.4181
        meta: 3
      impressoes:
        valor: 516
        anterior: 248
        var_pct: 108.0645
        meta: null
      sessoes:
        valor: 2
        anterior: 7
        var_pct: -71.4286
        meta: null
      connect_rate:
        valor: 1
        anterior: 1.1667
        var_pct: -14.2857
        meta: null
    motivos:
      - CPS R$ 5.68 vs. meta R$ 3.00
      - connect rate Nemu 1.00 contra GA4 0.00 (100% de divergência)
      - investimento +170% vs. período anterior
      - recebeu só 5.3% da verba do conjunto · 516 impressões
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
      - investimento subiu 170% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: Fraco nos três modelos de atribuição
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 5.3% da verba · sem base para julgar
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: CTR abaixo da meta
        motivo: volume abaixo do piso de significância
      - sinal: Último clique abaixo do piso de saúde
        motivo: sufocado pelo anúncio dominante do conjunto · recebeu só 5.3% da verba · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-concj-11-interno-bubbles-adv-top-estados-linha-xperience
    nivel: conjunto
    pai: bubbles-meta-consolidado-da-conta
    nome: CJ_11_INTERNO-BUBBLES_ADV_TOP_ESTADOS-LINHA-XPERIENCE
    apelido: CJ CJ
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 228
      vendas_esperadas: 0.8918
      leitura: direcional
    verba:
      atual: 30
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 223.53
        anterior: 150.99
        var_pct: 48.0429
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.6438
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.713
        anterior: 1.1028
        var_pct: -35.3458
        meta: 1
      cpm:
        valor: 13.393
        anterior: 15.2762
        var_pct: -12.3274
        meta: null
      cps:
        valor: 1.6681
        anterior: 1.5894
        var_pct: 4.9558
        meta: 3
      impressoes:
        valor: 16690
        anterior: 9884
        var_pct: 68.8588
        meta: null
      sessoes:
        valor: 134
        anterior: 95
        var_pct: 41.0526
        meta: null
      connect_rate:
        valor: 1.1261
        anterior: 0.8716
        var_pct: 29.1995
        meta: null
    motivos:
      - FC 0.64x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.71% vs. meta 1.00%
      - R$ 223.53 gastos, zero conversão
      - connect rate Nemu 1.13 contra GA4 0.09 (92% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos:
      - sinal: Aumento de verba acima do passo seguro
        motivo: entrega cresceu sem aumento de orçamento
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-concjad07-img-pontual-criativo-06-kit-gelato-de-pistache
    nivel: anuncio
    pai: bubbles-meta-concj-11-interno-bubbles-adv-top-estados-linha-xperience
    nome: ad07|img|pontual|CRIATIVO 06 - KIT GELATO DE PISTACHE
    apelido: AD ad07
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 228
      vendas_esperadas: 0.9136
      leitura: direcional
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 223.53
        anterior: 150.99
        var_pct: 48.0429
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0.9732
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.713
        anterior: 1.1028
        var_pct: -35.3458
        meta: 1
      cpm:
        valor: 13.393
        anterior: 15.2762
        var_pct: -12.3274
        meta: null
      cps:
        valor: 1.6681
        anterior: 1.5407
        var_pct: 8.2702
        meta: 3
      impressoes:
        valor: 16690
        anterior: 9884
        var_pct: 68.8588
        meta: null
      sessoes:
        valor: 134
        anterior: 98
        var_pct: 36.7347
        meta: null
      connect_rate:
        valor: 1.1261
        anterior: 0.8991
        var_pct: 25.2444
        meta: null
    motivos:
      - FC 0.97x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.71% vs. meta 1.00%
      - R$ 223.53 gastos, zero conversão
      - connect rate Nemu 1.13 contra GA4 0.09 (92% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-metad02-img-continuo-promoçao-abril-todos-produtos-criativo02
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-conta
    nome: AD02|IMG|CONTINUO|PROMOÇAO_ABRIL|TODOS_PRODUTOS|CRIATIVO02
    apelido: AD AD02
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 0
      vendas_esperadas: 0
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 1
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: 321.93
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 7.0 conversões/semana contra limiar de 25 (28% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-mead26-vid-continuo-medo-do-pelo-pesado-internos-amanda-axoly
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-conta
    nome: ad26|vid|continuo|medo do pelo pesado| Internos Amanda AXOLY
    apelido: AD ad26
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 0
      vendas_esperadas: 0
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-meta-consolidado-da-coad-01-vid-angulos-kit-foundue-chocolate
    nivel: anuncio
    pai: bubbles-meta-consolidado-da-conta
    nome: ad_01_VID_Angulos_Kit_Foundue_Chocolate
    apelido: AD ad
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 0
      vendas_esperadas: 0
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: null
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: canal-google
    nivel: campanha
    pai: null
    nome: Google Ads · resumo do canal
    apelido: Google Ads
    acao: → Manter
    tipo_acao: manter
    situacao: null
    papel: null
    evidencia:
      cliques: null
      vendas_esperadas: null
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 4489.67
        var_pct: null
        meta: 20000
      vendas:
        valor: null
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        var_pct: null
        meta: null
      roas_fc:
        valor: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        var_pct: null
        meta: null
      impressoes:
        valor: null
        var_pct: null
        meta: null
      sessoes:
        valor: null
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        var_pct: null
        meta: null
    motivos: []
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta
    nivel: campanha
    pai: canal-google
    nome: Bubbles Google — consolidado da conta
    apelido: CAM Bubbles
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: null
    papel: gerador
    evidencia:
      cliques: null
      vendas_esperadas: null
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 4489.67
        anterior: 4505.68
        var_pct: -0.3553
        meta: null
      vendas:
        valor: 13
        anterior: 11
        var_pct: 18.1818
        meta: null
      ticket_medio:
        valor: 506.19
        anterior: 269.6664
        var_pct: 87.7097
        meta: null
      roas_lc:
        valor: 1.4657
        anterior: 0.6584
        var_pct: 122.6298
        meta: 2
      roas_fc:
        valor: 2.3891
        anterior: 0.6833
        var_pct: 249.6326
        meta: null
      roas_assist:
        valor: 2.1987
        anterior: 1.0334
        var_pct: 112.7633
        meta: null
      ctr:
        valor: 1.2963
        anterior: 1.4233
        var_pct: -8.9238
        meta: 1
      cpm:
        valor: 31.1055
        anterior: 34.608
        var_pct: -10.1205
        meta: null
      cps:
        valor: 3.1462
        anterior: 3.3425
        var_pct: -5.8717
        meta: 3
      impressoes:
        valor: 144337
        anterior: 130192
        var_pct: 10.8647
        meta: null
      sessoes:
        valor: 1427
        anterior: 1348
        var_pct: 5.8605
        meta: null
      connect_rate:
        valor: 0.7627
        anterior: 0.7275
        var_pct: 4.8421
        meta: null
    motivos:
      - plataforma reporta 7.23x, LC mede 1.47x (+394%)
      - CPS R$ 3.15 vs. meta R$ 3.00
      - connect rate Nemu 0.76 contra GA4 0.21 (73% de divergência)
      - LC 1.47x abaixo do piso de saúde 2.00x
      - 13.0 conversões/semana contra limiar de 25 (52% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-bubbles
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Bubbles
    apelido: CJ Bubbles
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 1067
      vendas_esperadas: 5.8377
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 563.12
        anterior: 613.94
        var_pct: -8.2777
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 12.7114
        anterior: 11.629
        var_pct: 9.3076
        meta: 1
      cpm:
        valor: 307.2122
        anterior: 295.0216
        var_pct: 4.1321
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 1833
        anterior: 2081
        var_pct: -11.9173
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 563.12 gastos, zero conversão
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-bubbles-loja
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Bubbles Loja
    apelido: CJ Bubbles
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 345
      vendas_esperadas: 1.8875
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 82.11
        anterior: 138.64
        var_pct: -40.7747
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 20.5674
        anterior: 17.8147
        var_pct: 15.4515
        meta: 1
      cpm:
        valor: 291.1702
        anterior: 329.3112
        var_pct: -11.582
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 282
        anterior: 421
        var_pct: -33.0166
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 82.11 gastos, zero conversão
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-bubbles-pet
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Bubbles Pet
    apelido: CJ Bubbles
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 805
      vendas_esperadas: 4.4043
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 204.83
        anterior: 180.1
        var_pct: 13.7313
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 22.332
        anterior: 24.5638
        var_pct: -9.0855
        meta: 1
      cpm:
        valor: 202.4012
        anterior: 241.745
        var_pct: -16.2749
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 1012
        anterior: 745
        var_pct: 35.8389
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 204.83 gastos, zero conversão
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-bubbles-site
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Bubbles Site
    apelido: CJ Bubbles
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 12
      vendas_esperadas: 0.0657
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0.24
        anterior: 0.36
        var_pct: -33.3333
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 100
        anterior: 20
        var_pct: 400
        meta: 1
      cpm:
        valor: 80
        anterior: 36
        var_pct: 122.2222
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 3
        anterior: 10
        var_pct: -70
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CPM +122% vs. período anterior
      - impressões -70% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-01-kits-experience
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_01_KITS_EXPERIENCE
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: comecou
    papel: completo
    evidencia:
      cliques: 195
      vendas_esperadas: 1.0669
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 103.19
        anterior: 75.71
        var_pct: 36.2964
        meta: null
      vendas:
        valor: 2
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 432.3
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 8.3787
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 7.532
        anterior: 1.6893
        var_pct: 345.856
        meta: null
      roas_assist:
        valor: 13.3533
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.6314
        anterior: 0.6203
        var_pct: 1.7978
        meta: 1
      cpm:
        valor: 11.6349
        anterior: 10.4356
        var_pct: 11.4929
        meta: null
      cps:
        valor: 1.8104
        anterior: 1.5451
        var_pct: 17.1671
        meta: 3
      impressoes:
        valor: 8869
        anterior: 7255
        var_pct: 22.2467
        meta: null
      sessoes:
        valor: 57
        anterior: 49
        var_pct: 16.3265
        meta: null
      connect_rate:
        valor: 1.0179
        anterior: 1.0889
        var_pct: -6.5233
        meta: null
    motivos:
      - connect rate Nemu 1.02 contra GA4 0.00 (100% de divergência)
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
      - investimento subiu 36% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: CTR abaixo da meta
        motivo: CTR baixo mas ROAS acima da meta · clique caro que converte
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-01-linha-pro
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_01_LINHA_PRO
    apelido: CJ GR
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 207
      vendas_esperadas: 1.1325
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 205.4
        anterior: 213.73
        var_pct: -3.8974
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 3.3744
        var_pct: -100
        meta: null
      ctr:
        valor: 2.9155
        anterior: 3.1063
        var_pct: -6.1449
        meta: 1
      cpm:
        valor: 85.5477
        anterior: 85.1175
        var_pct: 0.5054
        meta: null
      cps:
        valor: 2.6675
        anterior: 2.8882
        var_pct: -7.6417
        meta: 3
      impressoes:
        valor: 2401
        anterior: 2511
        var_pct: -4.3807
        meta: null
      sessoes:
        valor: 77
        anterior: 74
        var_pct: 4.0541
        meta: null
      connect_rate:
        valor: 1.1
        anterior: 0.9487
        var_pct: 15.9459
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 205.40 gastos, zero conversão
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-01-sd-secagem-rendimento
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_01_SD_SECAGEM_RENDIMENTO
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: consistente
    papel: completo
    evidencia:
      cliques: 240
      vendas_esperadas: 1.3131
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 272.52
        anterior: 276.78
        var_pct: -1.5391
        meta: null
      vendas:
        valor: 2
        anterior: 1
        var_pct: 100
        meta: null
      ticket_medio:
        valor: 445.4
        anterior: 169.9
        var_pct: 162.1542
        meta: null
      roas_lc:
        valor: 3.2688
        anterior: 0.6138
        var_pct: 432.5043
        meta: 2
      roas_fc:
        valor: 4.7146
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 4.7146
        anterior: 0.8665
        var_pct: 444.0955
        meta: null
      ctr:
        valor: 2.8523
        anterior: 2.9426
        var_pct: -3.0687
        meta: 1
      cpm:
        valor: 155.4592
        anterior: 129.276
        var_pct: 20.2537
        meta: null
      cps:
        valor: 5.4504
        anterior: 4.1936
        var_pct: 29.9684
        meta: 3
      impressoes:
        valor: 1753
        anterior: 2141
        var_pct: -18.1224
        meta: null
      sessoes:
        valor: 50
        anterior: 66
        var_pct: -24.2424
        meta: null
      connect_rate:
        valor: 1
        anterior: 1.0476
        var_pct: -4.5455
        meta: null
    motivos:
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: CPS acima da meta
        motivo: tráfego caro porém qualificado · ROAS acima da meta (§3.4)
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-01-secagem-performancepro
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_01_SECAGEM-PERFORMANCEPRO
    apelido: CJ GR
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: seco
    papel: gerador
    evidencia:
      cliques: 353
      vendas_esperadas: 1.9313
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 239.41
        anterior: 220.65
        var_pct: 8.5022
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 6.2163
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.8823
        anterior: 0.8672
        var_pct: 1.7405
        meta: 1
      cpm:
        valor: 19.202
        anterior: 21.7432
        var_pct: -11.6875
        meta: null
      cps:
        valor: 2.4939
        anterior: 2.7241
        var_pct: -8.4513
        meta: 3
      impressoes:
        valor: 12468
        anterior: 10148
        var_pct: 22.8616
        meta: null
      sessoes:
        valor: 96
        anterior: 81
        var_pct: 18.5185
        meta: null
      connect_rate:
        valor: 0.8727
        anterior: 0.9205
        var_pct: -5.1852
        meta: null
    motivos:
      - CTR 0.88% vs. meta 1.00%
      - R$ 239.41 gastos, zero conversão
      - connect rate Nemu 0.87 contra GA4 0.00 (100% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: gerador de demanda · topo de funil · manter, mas NÃO escalar por 1º clique
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-01-tp
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_01_TP
    apelido: CJ GR
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: completo
    evidencia:
      cliques: 1074
      vendas_esperadas: 5.876
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 393.1
        anterior: 343.55
        var_pct: 14.4229
        meta: null
      vendas:
        valor: 2
        anterior: 2
        var_pct: 0
        meta: null
      ticket_medio:
        valor: 1622.685
        anterior: 553.67
        var_pct: 193.078
        meta: null
      roas_lc:
        valor: 8.2558
        anterior: 3.2232
        var_pct: 156.1357
        meta: 2
      roas_fc:
        valor: 7.0639
        anterior: 2.4481
        var_pct: 188.549
        meta: null
      roas_assist:
        valor: 8.6448
        anterior: 3.9306
        var_pct: 119.9371
        meta: null
      ctr:
        valor: 0.6889
        anterior: 0.6274
        var_pct: 9.8023
        meta: 1
      cpm:
        valor: 15.2999
        anterior: 11.5884
        var_pct: 32.0275
        meta: null
      cps:
        valor: 1.6111
        anterior: 1.7528
        var_pct: -8.0865
        meta: 3
      impressoes:
        valor: 25693
        anterior: 29646
        var_pct: -13.334
        meta: null
      sessoes:
        valor: 244
        anterior: 196
        var_pct: 24.4898
        meta: null
      connect_rate:
        valor: 1.3785
        anterior: 1.0538
        var_pct: 30.8198
        meta: null
    motivos:
      - connect rate Nemu 1.38 contra GA4 0.00 (100% de divergência)
      - CPM +32% vs. período anterior
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: CTR abaixo da meta
        motivo: CTR baixo mas ROAS acima da meta · clique caro que converte
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-cgr-02-experiencia-sensorial-experience
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_02_EXPERIENCIA_SENSORIAL_EXPERIENCE
    apelido: CJ GR
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: parou
    papel: fraco
    evidencia:
      cliques: 541
      vendas_esperadas: 2.9599
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 360.02
        anterior: 300.55
        var_pct: 19.7871
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 688.93
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 2.2922
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0.4858
        anterior: 0.0819
        var_pct: 493.3257
        meta: null
      roas_assist:
        valor: 0
        anterior: 2.2922
        var_pct: -100
        meta: null
      ctr:
        valor: 0.5328
        anterior: 0.6833
        var_pct: -22.0264
        meta: 1
      cpm:
        valor: 13.7992
        anterior: 16.5611
        var_pct: -16.6771
        meta: null
      cps:
        valor: 2.6279
        anterior: 2.7573
        var_pct: -4.695
        meta: 3
      impressoes:
        valor: 26090
        anterior: 18148
        var_pct: 43.7624
        meta: null
      sessoes:
        valor: 137
        anterior: 109
        var_pct: 25.6881
        meta: null
      connect_rate:
        valor: 0.9856
        anterior: 0.879
        var_pct: 12.1246
        meta: null
    motivos:
      - FC 0.49x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.53% vs. meta 1.00%
      - R$ 360.02 gastos, zero conversão
      - connect rate Nemu 0.99 contra GA4 0.00 (100% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-02-linha-essential
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_02_LINHA_ESSENTIAL
    apelido: CJ GR
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: parou
    papel: fraco
    evidencia:
      cliques: 489
      vendas_esperadas: 2.6754
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 322.36
        anterior: 324.77
        var_pct: -0.7421
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 218.9
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0.674
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0.3208
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0.2284
        anterior: 0.674
        var_pct: -66.1168
        meta: null
      ctr:
        valor: 0.8194
        anterior: 0.7832
        var_pct: 4.6249
        meta: 1
      cpm:
        valor: 22.7704
        anterior: 26.4945
        var_pct: -14.0564
        meta: null
      cps:
        valor: 2.9848
        anterior: 3.383
        var_pct: -11.7707
        meta: 3
      impressoes:
        valor: 14157
        anterior: 12258
        var_pct: 15.4919
        meta: null
      sessoes:
        valor: 108
        anterior: 96
        var_pct: 12.5
        meta: null
      connect_rate:
        valor: 0.931
        anterior: 1
        var_pct: -6.8966
        meta: null
    motivos:
      - FC 0.32x · LC 0.00x · ASSIST 0.23x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.82% vs. meta 1.00%
      - R$ 322.36 gastos, zero conversão
      - ROAS LC -100% mas CTR +5% e CPS -12% estáveis
      - connect rate Nemu 0.93 contra GA4 0.28 (69% de divergência)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-02-sd-diluicao-seguranca
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_02_SD_DILUICAO_SEGURANCA
    apelido: CJ GR
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: comecou
    papel: fraco
    evidencia:
      cliques: 44
      vendas_esperadas: 0.2407
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 65.25
        anterior: 53.03
        var_pct: 23.0436
        meta: null
      vendas:
        valor: 1
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 67.32
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 1.0317
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 1.0317
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 2.0592
        anterior: 0.995
        var_pct: 106.9498
        meta: 1
      cpm:
        valor: 83.9768
        anterior: 87.9436
        var_pct: -4.5106
        meta: null
      cps:
        valor: 4.0781
        anterior: 13.2575
        var_pct: -69.2391
        meta: 3
      impressoes:
        valor: 777
        anterior: 603
        var_pct: 28.8557
        meta: null
      sessoes:
        valor: 16
        anterior: 4
        var_pct: 300
        meta: null
      connect_rate:
        valor: 1
        anterior: 0.6667
        var_pct: 50
        meta: null
    motivos:
      - FC 0.00x · LC 1.03x · ASSIST 1.03x
      - CPS R$ 4.08 vs. meta R$ 3.00
      - LC 1.03x abaixo do piso de saúde 2.00x
      - 1.0 conversões/semana contra limiar de 25 (4% do necessário)
      - investimento subiu 23% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-03-estetica-diferenciacao
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_03_ESTETICA_DIFERENCIACAO
    apelido: CJ GR
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: colhedor
    evidencia:
      cliques: 343
      vendas_esperadas: 1.8766
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 117.87
        anterior: 209.95
        var_pct: -43.8581
        meta: null
      vendas:
        valor: 2
        anterior: 1
        var_pct: 100
        meta: null
      ticket_medio:
        valor: 388.26
        anterior: 77.8
        var_pct: 399.0488
        meta: null
      roas_lc:
        valor: 6.5879
        anterior: 0.3706
        var_pct: 1677.8112
        meta: 2
      roas_fc:
        valor: 0
        anterior: 1.7024
        var_pct: -100
        meta: null
      roas_assist:
        valor: 6.5879
        anterior: 0.3706
        var_pct: 1677.8112
        meta: null
      ctr:
        valor: 0.7974
        anterior: 0.7556
        var_pct: 5.5239
        meta: 1
      cpm:
        valor: 15.4078
        anterior: 19.1142
        var_pct: -19.3905
        meta: null
      cps:
        valor: 1.8417
        anterior: 2.916
        var_pct: -36.8403
        meta: 3
      impressoes:
        valor: 7650
        anterior: 10984
        var_pct: -30.3532
        meta: null
      sessoes:
        valor: 64
        anterior: 72
        var_pct: -11.1111
        meta: null
      connect_rate:
        valor: 1.0492
        anterior: 0.8675
        var_pct: 20.9472
        meta: null
    motivos:
      - plataforma reporta 11.21x, LC mede 6.59x (+70%)
      - connect rate Nemu 1.05 contra GA4 0.00 (100% de divergência)
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: CTR abaixo da meta
        motivo: CTR baixo mas ROAS acima da meta · clique caro que converte
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-03-linha-pro
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_03_LINHA_PRO
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: comecou
    papel: assistente
    evidencia:
      cliques: 243
      vendas_esperadas: 1.3295
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 162.39
        anterior: 95.77
        var_pct: 69.5625
        meta: null
      vendas:
        valor: 1
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 103.41
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0.6368
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 9.3869
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.6171
        anterior: 0.7608
        var_pct: -18.8891
        meta: 1
      cpm:
        valor: 17.5804
        anterior: 14.0117
        var_pct: 25.4693
        meta: null
      cps:
        valor: 2.7998
        anterior: 2.1282
        var_pct: 31.5571
        meta: 3
      impressoes:
        valor: 9237
        anterior: 6835
        var_pct: 35.1426
        meta: null
      sessoes:
        valor: 58
        anterior: 45
        var_pct: 28.8889
        meta: null
      connect_rate:
        valor: 1.0175
        anterior: 0.8654
        var_pct: 17.5828
        meta: null
    motivos:
      - plataforma reporta 6.33x, LC mede 0.64x (+894%)
      - ROAS LC 0.64x vs. meta 2.00x
      - CTR 0.62% vs. meta 1.00%
      - connect rate Nemu 1.02 contra GA4 0.00 (100% de divergência)
      - investimento +70% vs. período anterior
      - FC 0.00x e LC 0.64x abaixo da meta · só a assistida (9.39x) sustenta
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-03-linha-xperience
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_03_LINHA_XPERIENCE
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 18
      vendas_esperadas: 0.0985
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 4.31
        anterior: 18.87
        var_pct: -77.1595
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.9417
        anterior: 2.4306
        var_pct: -20.111
        meta: 1
      cpm:
        valor: 41.8447
        anterior: 65.5208
        var_pct: -36.1353
        meta: null
      cps:
        valor: 2.155
        anterior: 1.7155
        var_pct: 25.6227
        meta: 3
      impressoes:
        valor: 103
        anterior: 288
        var_pct: -64.2361
        meta: null
      sessoes:
        valor: 2
        anterior: 11
        var_pct: -81.8182
        meta: null
      connect_rate:
        valor: 1
        anterior: 1.5714
        var_pct: -36.3636
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - impressões -64% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-03-sd-fragrancia-fixacao
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_03_SD_FRAGRANCIA_FIXACAO
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 72
      vendas_esperadas: 0.3939
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 33.78
        anterior: 87.26
        var_pct: -61.2881
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 1.9471
        var_pct: -100
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.7949
        anterior: 2.1786
        var_pct: -17.6154
        meta: 1
      cpm:
        valor: 86.6154
        anterior: 95.0545
        var_pct: -8.8782
        meta: null
      cps:
        valor: 6.756
        anterior: 3.4904
        var_pct: 93.5595
        meta: 3
      impressoes:
        valor: 390
        anterior: 918
        var_pct: -57.5163
        meta: null
      sessoes:
        valor: 5
        anterior: 25
        var_pct: -80
        meta: null
      connect_rate:
        valor: 0.7143
        anterior: 1.25
        var_pct: -42.8571
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CPS R$ 6.76 vs. meta R$ 3.00
      - impressões -58% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-04-collora
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_04_COLLORA
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: gerador
    evidencia:
      cliques: 86
      vendas_esperadas: 0.4705
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 83.6
        anterior: 50.57
        var_pct: 65.3154
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 2.1617
        anterior: 14.2614
        var_pct: -84.8422
        meta: null
      roas_assist:
        valor: 2.1617
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 9.0411
        anterior: 7.3973
        var_pct: 22.2222
        meta: 1
      cpm:
        valor: 229.0411
        anterior: 138.5479
        var_pct: 65.3154
        meta: null
      cps:
        valor: 2.2
        anterior: 1.2967
        var_pct: 69.6658
        meta: 3
      impressoes:
        valor: 365
        anterior: 365
        var_pct: 0
        meta: null
      sessoes:
        valor: 38
        anterior: 39
        var_pct: -2.5641
        meta: null
      connect_rate:
        valor: 1.1515
        anterior: 1.4444
        var_pct: -20.2797
        meta: null
    motivos:
      - CPM +65% vs. período anterior
      - investimento +65% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
      - investimento subiu 65% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
      - sinal: Gasto sem nenhuma conversão
        motivo: volume abaixo do piso de cliques
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-04-perfumaria-frangancia
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_04_PERFUMARIA_FRANGANCIA
    apelido: CJ GR
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: parou
    papel: fraco
    evidencia:
      cliques: 202
      vendas_esperadas: 1.1052
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 107.84
        anterior: 171.04
        var_pct: -36.9504
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 24.61
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0.1439
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0.1439
        var_pct: -100
        meta: null
      ctr:
        valor: 0.5156
        anterior: 0.5169
        var_pct: -0.2531
        meta: 1
      cpm:
        valor: 8.8256
        anterior: 22.6693
        var_pct: -61.0681
        meta: null
      cps:
        valor: 2.5079
        anterior: 4.1717
        var_pct: -39.883
        meta: 3
      impressoes:
        valor: 12219
        anterior: 7545
        var_pct: 61.9483
        meta: null
      sessoes:
        valor: 43
        anterior: 41
        var_pct: 4.878
        meta: null
      connect_rate:
        valor: 0.6825
        anterior: 1.0513
        var_pct: -35.0755
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - CTR 0.52% vs. meta 1.00%
      - R$ 107.84 gastos, zero conversão
      - ROAS LC -100% mas CTR -0% e CPS -40% estáveis
      - connect rate Nemu 0.68 contra GA4 0.00 (100% de divergência)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-04-sd-ticket-precificacao
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_04_SD_TICKET_PRECIFICACAO
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 66
      vendas_esperadas: 0.3611
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 40.94
        anterior: 36.75
        var_pct: 11.4014
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 3.1477
        anterior: 2.6895
        var_pct: 17.0372
        meta: 1
      cpm:
        valor: 99.1283
        anterior: 89.8533
        var_pct: 10.3224
        meta: null
      cps:
        valor: 2.7293
        anterior: 3.3409
        var_pct: -18.3057
        meta: 3
      impressoes:
        valor: 413
        anterior: 409
        var_pct: 0.978
        meta: null
      sessoes:
        valor: 15
        anterior: 11
        var_pct: 36.3636
        meta: null
      connect_rate:
        valor: 1.1538
        anterior: 1
        var_pct: 15.3846
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-05-areas-sensiveis
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_05_AREAS_SENSIVEIS
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 101
      vendas_esperadas: 0.5526
      leitura: direcional
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 68.52
        anterior: 36.89
        var_pct: 85.7414
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 2.3095
        anterior: 1.5595
        var_pct: 48.0947
        meta: 1
      cpm:
        valor: 79.1224
        anterior: 35.9552
        var_pct: 120.0585
        meta: null
      cps:
        valor: 3.1145
        anterior: 2.635
        var_pct: 18.1991
        meta: 3
      impressoes:
        valor: 866
        anterior: 1026
        var_pct: -15.5945
        meta: null
      sessoes:
        valor: 22
        anterior: 14
        var_pct: 57.1429
        meta: null
      connect_rate:
        valor: 1.1
        anterior: 0.875
        var_pct: 25.7143
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CPS R$ 3.11 vs. meta R$ 3.00
      - CPM +120% vs. período anterior
      - investimento +86% vs. período anterior
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: Gasto sem nenhuma conversão
        motivo: volume abaixo do piso de cliques
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-05-collora
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_05_COLLORA
    apelido: CJ GR
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: parou
    papel: fraco
    evidencia:
      cliques: 364
      vendas_esperadas: 1.9915
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 116.05
        anterior: 102.26
        var_pct: 13.4852
        meta: null
      vendas:
        valor: 0
        anterior: 1
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 128.9
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 1.2605
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0
        anterior: 1.2605
        var_pct: -100
        meta: null
      roas_assist:
        valor: 0
        anterior: 7.6736
        var_pct: -100
        meta: null
      ctr:
        valor: 2.0333
        anterior: 3.7383
        var_pct: -45.6086
        meta: 1
      cpm:
        valor: 32.7732
        anterior: 30.8291
        var_pct: 6.3063
        meta: null
      cps:
        valor: 1.7854
        anterior: 1.0329
        var_pct: 72.8467
        meta: 3
      impressoes:
        valor: 3541
        anterior: 3317
        var_pct: 6.7531
        meta: null
      sessoes:
        valor: 65
        anterior: 99
        var_pct: -34.3434
        meta: null
      connect_rate:
        valor: 0.9028
        anterior: 0.7984
        var_pct: 13.0752
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 116.05 gastos, zero conversão
      - connect rate Nemu 0.90 contra GA4 0.00 (100% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-05-sd-fidelizacao-clientes
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_05_SD_FIDELIZACAO_CLIENTES
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 24
      vendas_esperadas: 0.1313
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 14.74
        anterior: 14.67
        var_pct: 0.4772
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 1.9231
        anterior: 3.8043
        var_pct: -49.4505
        meta: 1
      cpm:
        valor: 47.2436
        anterior: 79.7283
        var_pct: -40.7442
        meta: null
      cps:
        valor: 1.8425
        anterior: 1.8338
        var_pct: 0.4772
        meta: 3
      impressoes:
        valor: 312
        anterior: 184
        var_pct: 69.5652
        meta: null
      sessoes:
        valor: 8
        anterior: 8
        var_pct: 0
        meta: null
      connect_rate:
        valor: 1.3333
        anterior: 1.1429
        var_pct: 16.6667
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-06-acessorios
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_06_ACESSORIOS
    apelido: CJ GR
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: parou
    papel: fraco
    evidencia:
      cliques: 327
      vendas_esperadas: 1.7891
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 132.47
        anterior: 151.92
        var_pct: -12.8028
        meta: null
      vendas:
        valor: 0
        anterior: 2
        var_pct: -100
        meta: null
      ticket_medio:
        valor: null
        anterior: 140.02
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 1.8433
        var_pct: -100
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 1.8433
        var_pct: -100
        meta: null
      ctr:
        valor: 2.0846
        anterior: 1.777
        var_pct: 17.3102
        meta: 1
      cpm:
        valor: 39.4491
        anterior: 39.1244
        var_pct: 0.8299
        meta: null
      cps:
        valor: 1.9481
        anterior: 1.899
        var_pct: 2.585
        meta: 3
      impressoes:
        valor: 3358
        anterior: 3883
        var_pct: -13.5205
        meta: null
      sessoes:
        valor: 68
        anterior: 80
        var_pct: -15
        meta: null
      connect_rate:
        valor: 0.9714
        anterior: 1.1594
        var_pct: -16.2143
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - ROAS LC 0.00x vs. meta 2.00x
      - R$ 132.47 gastos, zero conversão
      - ROAS LC -100% mas CTR +17% e CPS +3% estáveis
      - connect rate Nemu 0.97 contra GA4 0.00 (100% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-06-sd-diferenciacao-premium
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_06_SD_DIFERENCIACAO_PREMIUM
    apelido: CJ GR
    acao: ⚙ Ajustar
    tipo_acao: ajustar
    situacao: consistente
    papel: gerador
    evidencia:
      cliques: 435
      vendas_esperadas: 2.3799
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 411.5
        anterior: 389.76
        var_pct: 5.5778
        meta: null
      vendas:
        valor: 2
        anterior: 1
        var_pct: 100
        meta: null
      ticket_medio:
        valor: 130.115
        anterior: 269.91
        var_pct: -51.7932
        meta: null
      roas_lc:
        valor: 0.6324
        anterior: 0.6925
        var_pct: -8.68
        meta: 2
      roas_fc:
        valor: 9.5746
        anterior: 1.816
        var_pct: 427.2438
        meta: null
      roas_assist:
        valor: 1.9827
        anterior: 0.6925
        var_pct: 186.3053
        meta: null
      ctr:
        valor: 1.8007
        anterior: 2.3095
        var_pct: -22.0313
        meta: 1
      cpm:
        valor: 64.9976
        anterior: 81.8308
        var_pct: -20.5707
        meta: null
      cps:
        valor: 2.7804
        anterior: 3.1688
        var_pct: -12.2563
        meta: 3
      impressoes:
        valor: 6331
        anterior: 4763
        var_pct: 32.9204
        meta: null
      sessoes:
        valor: 148
        anterior: 123
        var_pct: 20.3252
        meta: null
      connect_rate:
        valor: 1.2982
        anterior: 1.1182
        var_pct: 16.1033
        meta: null
    motivos:
      - plataforma reporta 8.49x, LC mede 0.63x (+1242%)
      - LC 0.63x abaixo do piso de saúde 2.00x
      - 2.0 conversões/semana contra limiar de 25 (8% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: criativo de topo de funil · forte em primeiro clique e assistida (Nemu)
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-07-sd-melhor-marca-categoria
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_07_SD_MELHOR_MARCA_CATEGORIA
    apelido: CJ GR
    acao: ◌ ROAS de uma venda só
    tipo_acao: decidir
    situacao: comecou
    papel: fraco
    evidencia:
      cliques: 381
      vendas_esperadas: 2.0845
      leitura: firme
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 328.5
        anterior: 263.04
        var_pct: 24.8859
        meta: null
      vendas:
        valor: 1
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: 372.22
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 1.1331
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 1.1331
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 2.9795
        anterior: 3.0374
        var_pct: -1.9073
        meta: 1
      cpm:
        valor: 112.5
        anterior: 102.4299
        var_pct: 9.8312
        meta: null
      cps:
        valor: 3.6099
        anterior: 3.0946
        var_pct: 16.6517
        meta: 3
      impressoes:
        valor: 2920
        anterior: 2568
        var_pct: 13.7072
        meta: null
      sessoes:
        valor: 91
        anterior: 85
        var_pct: 7.0588
        meta: null
      connect_rate:
        valor: 1.046
        anterior: 1.0897
        var_pct: -4.0162
        meta: null
    motivos:
      - FC 0.00x · LC 1.13x · ASSIST 1.13x
      - ROAS LC 1.13x vs. meta 2.00x
      - CPS R$ 3.61 vs. meta R$ 3.00
      - LC 1.13x abaixo do piso de saúde 2.00x
      - 1.0 conversões/semana contra limiar de 25 (4% do necessário)
      - investimento subiu 25% vs. a janela anterior · o passo seguro é 20%
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-contgr-08-sd-concentracao-alta-diluicao
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_08_SD_CONCENTRACAO_ALTA_DILUICAO
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 30
      vendas_esperadas: 0.1641
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 31.16
        anterior: 96.35
        var_pct: -67.6596
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.8529
        anterior: 2.4883
        var_pct: -65.7249
        meta: 1
      cpm:
        valor: 66.4392
        anterior: 149.8445
        var_pct: -55.6612
        meta: null
      cps:
        valor: 5.1933
        anterior: 6.4233
        var_pct: -19.1489
        meta: 3
      impressoes:
        valor: 469
        anterior: 643
        var_pct: -27.0607
        meta: null
      sessoes:
        valor: 6
        anterior: 15
        var_pct: -60
        meta: null
      connect_rate:
        valor: 1.5
        anterior: 0.9375
        var_pct: 60
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - CPS R$ 5.19 vs. meta R$ 3.00
      - connect rate Nemu 1.50 contra GA4 0.50 (67% de divergência)
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: CTR abaixo da meta
        motivo: volume abaixo do piso de significância
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-gr-09-sd-hipoalergenico-seguranca
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: GR_09_SD_HIPOALERGENICO_SEGURANCA
    apelido: CJ GR
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: seco
    papel: fraco
    evidencia:
      cliques: 26
      vendas_esperadas: 0.1422
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 24.45
        anterior: 38.77
        var_pct: -36.9358
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: 2
      roas_fc:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      roas_assist:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ctr:
        valor: 0.9697
        anterior: 1.2072
        var_pct: -19.6768
        meta: 1
      cpm:
        valor: 29.6364
        anterior: 78.008
        var_pct: -62.0086
        meta: null
      cps:
        valor: 2.7167
        anterior: 7.754
        var_pct: -64.9643
        meta: 3
      impressoes:
        valor: 825
        anterior: 497
        var_pct: 65.996
        meta: null
      sessoes:
        valor: 9
        anterior: 5
        var_pct: 80
        meta: null
      connect_rate:
        valor: 1.125
        anterior: 0.8333
        var_pct: 35
        meta: null
    motivos:
      - FC 0.00x · LC 0.00x · ASSIST 0.00x
      - LC 0.00x abaixo do piso de saúde 2.00x
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos:
      - sinal: ROAS abaixo da meta
        motivo: volume abaixo do piso · sem base para julgar
      - sinal: CTR abaixo da meta
        motivo: volume abaixo do piso de significância
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-mês-do-consumidor
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Mês do Consumidor
    apelido: CJ Mês
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 119
      vendas_esperadas: 0.6511
      leitura: direcional
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-mês-do-consumidor-cappuccino
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Mês do Consumidor - Cappuccino
    apelido: CJ Mês
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 3
      vendas_esperadas: 0.0164
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-mês-do-consumidor-kits
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Mês do Consumidor - Kits
    apelido: CJ Mês
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 5
      vendas_esperadas: 0.0274
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-mês-do-consumidor-linha-pro
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Mês do Consumidor - Linha Pro
    apelido: CJ Mês
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 0
      vendas_esperadas: 0
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-mês-do-consumidor-morango-do-amor
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Mês do Consumidor - Morango do Amor
    apelido: CJ Mês
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 4
      vendas_esperadas: 0.0219
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-mês-do-consumidor-neutralizador
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Mês do Consumidor - Neutralizador
    apelido: CJ Mês
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 2
      vendas_esperadas: 0.0109
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
  - id: bubbles-google-consolidado-da-conta-mês-do-consumidor-shampoo-neutro
    nivel: conjunto
    pai: bubbles-google-consolidado-da-conta
    nome: Mês do Consumidor - Shampoo Neutro
    apelido: CJ Mês
    acao: ◌ Sem volume
    tipo_acao: decidir
    situacao: sem_volume
    papel: indefinido
    evidencia:
      cliques: 2
      vendas_esperadas: 0.0109
      leitura: sem leitura
    verba:
      atual: null
      sugerida: null
      anterior: null
      variacao_pct: null
    metricas:
      investimento:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      vendas:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      ticket_medio:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_lc:
        valor: null
        anterior: null
        var_pct: null
        meta: 2
      roas_fc:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      roas_assist:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      ctr:
        valor: null
        anterior: null
        var_pct: null
        meta: 1
      cpm:
        valor: null
        anterior: null
        var_pct: null
        meta: null
      cps:
        valor: null
        anterior: null
        var_pct: null
        meta: 3
      impressoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      sessoes:
        valor: 0
        anterior: 0
        var_pct: null
        meta: null
      connect_rate:
        valor: null
        anterior: null
        var_pct: null
        meta: null
    motivos:
      - 0.0 conversões/semana contra limiar de 25 (0% do necessário)
    sinais_suprimidos: []
    expectativa: null
    perguntas: []
    opcoes: []
    historico: null
podios:
  lista:
    - chave: ctr
      titulo: 👆 Melhor chamada
      explica: Quem converte atenção em clique. Mede a promessa do criativo, não a oferta.
      metrica_destaque: ctr
      colocados:
        - pos: 1
          nome: ad01|vid|pontual|VÍDEO 1 - LINHA PRO COM DESCONTO SETEMBRO (WERYKA)
          formato: vídeo
          investimento: 526.25
          impressoes: 27249
          thumbstop: null
          ctr: 4.3863
          roas_lc: 0.1996
          roas_fc: 0
          roas_assist: 0.1996
          novo: false
        - pos: 2
          nome: ad04|vid|pontual|VÍDEO 6 - KIT TEXTURIZADOR
          formato: vídeo
          investimento: 232.32
          impressoes: 7041
          thumbstop: null
          ctr: 3.5369
          roas_lc: 0.5692
          roas_fc: 7.2058
          roas_assist: 6.3162
          novo: false
        - pos: 3
          nome: ad30|vid|continuo|shampoo neutralizador| Joyce AXOLY
          formato: vídeo
          investimento: 1216.04
          impressoes: 22511
          thumbstop: null
          ctr: 2.5578
          roas_lc: 1.0883
          roas_fc: 2.2803
          roas_assist: 3.5875
          novo: false
    - chave: roas_ultimo_clique
      titulo: 💰 Melhor fechador (LC)
      explica: Quem fecha a venda. **Esta é a régua de decisão de verba** · replicar primeiro o que está aqui.
      metrica_destaque: roas_ultimo_clique
      colocados:
        - pos: 1
          nome: ad12|img|pontual|CRIATIVO 02 - MINI PERFUMES
          formato: imagem
          investimento: 302.51
          impressoes: 19443
          thumbstop: null
          ctr: 0.9686
          roas_lc: 8.8759
          roas_fc: 0
          roas_assist: 8.8759
          novo: false
        - pos: 2
          nome: ad15|vid|pontual|VÍDEO 2 - SHAMPOO REALÇADOR  PRO 5L| Agosto
          formato: vídeo
          investimento: 309.49
          impressoes: 19635
          thumbstop: null
          ctr: 0.999
          roas_lc: 2.9648
          roas_fc: 0.3874
          roas_assist: 2.9648
          novo: false
        - pos: 3
          nome: ad36|vid|continuo|MINI PERFUMES| Oliver Pet - Embalagem Nova
          formato: vídeo
          investimento: 332.55
          impressoes: 30282
          thumbstop: null
          ctr: 0.9276
          roas_lc: 2.6857
          roas_fc: 0
          roas_assist: 3.4265
          novo: false
    - chave: roas_primeiro_clique
      titulo: 🚪 Melhor abridor (FC)
      explica: 'Quem traz gente nova. Serve à criação, não à escala: um abridor com LC fraco continua sendo bom criativo de topo.'
      metrica_destaque: roas_primeiro_clique
      colocados:
        - pos: 1
          nome: 'ad19|vid|continuo|Hidratante de patinhas - CARE| INFLU: Jessica'
          formato: vídeo
          investimento: 352.69
          impressoes: 10958
          thumbstop: null
          ctr: 1.6351
          roas_lc: 0.1236
          roas_fc: 9.9251
          roas_assist: 8.7058
          novo: false
        - pos: 2
          nome: ad04|vid|pontual|VÍDEO 6 - KIT TEXTURIZADOR
          formato: vídeo
          investimento: 232.32
          impressoes: 7041
          thumbstop: null
          ctr: 3.5369
          roas_lc: 0.5692
          roas_fc: 7.2058
          roas_assist: 6.3162
          novo: false
        - pos: 3
          nome: ad09|img|pontual|CRIATIVO 06 - SHAMPOO REALÇACADOR| Agosto
          formato: imagem
          investimento: 138.42
          impressoes: 11965
          thumbstop: null
          ctr: 0.5161
          roas_lc: 1.5583
          roas_fc: 6.6295
          roas_assist: 7.1117
          novo: false
    - chave: razao_assist
      titulo: 🤝 Melhor influenciador
      explica: Quem participa de venda que outro fecha · razão ASSIST ÷ LC. Acima de 2,0 o criativo trabalha mais na jornada do que o LC mostra.
      metrica_destaque: razao_assist
      colocados:
        - pos: 1
          nome: 'ad19|vid|continuo|Hidratante de patinhas - CARE| INFLU: Jessica'
          formato: vídeo
          investimento: 352.69
          impressoes: 10958
          thumbstop: null
          ctr: 1.6351
          roas_lc: 0.1236
          roas_fc: 9.9251
          roas_assist: 8.7058
          novo: false
        - pos: 2
          nome: ad16|img|continuo|frete_gratis_sul| criativo 01 - Junho — Cópia
          formato: imagem
          investimento: 1262.82
          impressoes: 133868
          thumbstop: null
          ctr: 0.5792
          roas_lc: 0.0554
          roas_fc: 0.0819
          roas_assist: 3.3249
          novo: false
        - pos: 3
          nome: ad06|img|pontual|CRIATIVO 03 - KIT COMPLETO LINHA ESSENTIAL
          formato: imagem
          investimento: 525.58
          impressoes: 38517
          thumbstop: null
          ctr: 1.2239
          roas_lc: 0.2909
          roas_fc: 3.1326
          roas_assist: 7.3748
          novo: false
  multi_podio:
    - nome: ad04|vid|pontual|VÍDEO 6 - KIT TEXTURIZADOR
      podios:
        - 👆 Melhor chamada (2º)
        - 🚪 Melhor abridor (FC) (2º)
    - nome: 'ad19|vid|continuo|Hidratante de patinhas - CARE| INFLU: Jessica'
      podios:
        - 🚪 Melhor abridor (FC) (1º)
        - 🤝 Melhor influenciador (1º)
  fora:
    - nome: AD02|IMG|CONTINUO|PROMOÇAO_ABRIL|TODOS_PRODUTOS|CRIATIVO02
      motivo: 1 dias no ar · abaixo de 3
    - nome: ad25|img|continuo|CRIATIVO 05 - KIT BANHO DE VOLUME
      motivo: 2 dias no ar · abaixo de 3
    - nome: ad26|img|continuo|CRIATIVO 07 - KIT CRONOGRAMA DE PELAGEM
      motivo: 2 dias no ar · abaixo de 3
    - nome: ad26|vid|continuo|medo do pelo pesado| Internos Amanda AXOLY
      motivo: 1 dias no ar · abaixo de 3
    - nome: ad27|img|continuo|CRIATIVO 01 - MASTERCLASS SETEMBROad27|img|continuo|CRIATIVO 01 - MASTERCLASS SETEMBRO
      motivo: 2 dias no ar · abaixo de 3
    - nome: ad28|img|continuo|CRIATIVO 02 - MASTERCLASS SETEMBRO
      motivo: 2 dias no ar · abaixo de 3
    - nome: ad39|img|continuo|O problema do odor que sempre volta| Criativo
      motivo: 1 dias no ar · abaixo de 3
    - nome: ad50|vid|continuo|Eu Tinha Medo de Comprar o Galão| Oliver pet
      motivo: 1 dias no ar · abaixo de 3
    - nome: ad_01_VID_Angulos_Kit_Foundue_Chocolate
      motivo: 1 dias no ar · abaixo de 3
    - nome: ad_02_VID_Angulos_Fondue
      motivo: 1 dias no ar · abaixo de 3
glossario:
  - titulo: Modelos de atribuição
    texto: ''
  - titulo: Papel na jornada
    texto: ''
  - titulo: Decisão
    texto: ''
  - titulo: Métricas
    texto: ''
  - titulo: Conceitos de leitura
    texto: Definições completas em `engine/analise/REGRAS.md` e `engine/dados/glossario-nemu.md`.
  - titulo: Modelos de atribuição
    texto: ''
  - titulo: Papel na jornada
    texto: ''
  - titulo: Decisão
    texto: ''
  - titulo: Métricas
    texto: ''
  - titulo: Conceitos de leitura
    texto: Definições completas em `engine/analise/REGRAS.md` e `engine/dados/glossario-nemu.md`.
ressalvas:
  - titulo: ⚠️ Nemu e GA4 discordam sobre as sessões
    texto: Quando as duas fontes divergem muito na mesma linha, **o problema é de medição, não de entrega** · nenhuma das duas leituras de ConnectRate ou CPS serve para decidir. Vale conferir UTM e tag antes de usar estes números.
  - titulo: ⚠️ A plataforma reivindica mais do que a Nemu mede
    texto: Google e Meta contam a própria conversão pela régua deles. A distância abaixo não é erro · é o tamanho da superatribuição. **Decidir verba pelo número da plataforma superestima o resultado.**
  - titulo: ConnectRate acima de 1,0 · não é erro
    texto: A Nemu conta **visitas de retorno do mesmo usuário**, enquanto o GA4 fecha sessão em 30 minutos. Acima de 1,0 leia como *não há perda entre clique e sessão*, nunca como percentual literal.
  - titulo: ROAS apoiado em uma venda só
    texto: Um pedido atípico move o ROAS e o ticket médio inteiros. Pela regra de significância da casa, **isso não sustenta veredito** · a leitura precisa vir da janela de 30 dias.
  - titulo: O que este export não permite avaliar
    texto: Estas etapas ficam **não avaliadas**, nunca estimadas.
  - titulo: ⚠️ Nemu e GA4 discordam sobre as sessões
    texto: Quando as duas fontes divergem muito na mesma linha, **o problema é de medição, não de entrega** · nenhuma das duas leituras de ConnectRate ou CPS serve para decidir. Vale conferir UTM e tag antes de usar estes números.
  - titulo: ⚠️ A plataforma reivindica mais do que a Nemu mede
    texto: Google e Meta contam a própria conversão pela régua deles. A distância abaixo não é erro · é o tamanho da superatribuição. **Decidir verba pelo número da plataforma superestima o resultado.**
  - titulo: ConnectRate acima de 1,0 · não é erro
    texto: A Nemu conta **visitas de retorno do mesmo usuário**, enquanto o GA4 fecha sessão em 30 minutos. Acima de 1,0 leia como *não há perda entre clique e sessão*, nunca como percentual literal.
  - titulo: ROAS apoiado em uma venda só
    texto: Um pedido atípico move o ROAS e o ticket médio inteiros. Pela regra de significância da casa, **isso não sustenta veredito** · a leitura precisa vir da janela de 30 dias.
  - titulo: O que este export não permite avaliar
    texto: Estas etapas ficam **não avaliadas**, nunca estimadas.
  - titulo: Custo do produto zerado na Nemu
    texto: Sem ele não há **ROAS de breakeven real** · a meta usada é referência de mercado, não cálculo da operação. Cadastrar o custo destrava a meta correta (breakeven = 1 ÷ margem de contribuição).
auditoria:
  - titulo: 🔴 Valores fisicamente impossíveis
    texto: '- **`ctr`** · 5 linha(s) fora da faixa 0–25% (min 28.57, max 100.00) · CTR acima de 25% é erro de escala ou de dado'
  - titulo: 🧭 Posição do canal na jornada
    texto: Receita FC **R$ 27.243,64** · receita LC **R$ 12.934,74** · razão **2.11**.
  - titulo: 📐 Poder estatístico desta janela
    texto: 'Taxa de conversão observada: **0.40%** (42 vendas ÷ 10482 cliques)'
  - titulo: 👻 Viés de sobrevivência
    texto: '- **12 de 54 itens** ficaram abaixo do piso de 1000 impressões, somando **R$ 151,65** gastos sem gerar leitura. Eles não entram em ranking nenhum · qualquer frase do tipo *"os melhores criativos são..."* significa **os melhores entre os que tiveram entrega**.'
  - titulo: 🔴 Valores fisicamente impossíveis
    texto: '- **`ctr`** · 37 linha(s) fora da faixa 0–25% (min 26.00, max 150.00) · CTR acima de 25% é erro de escala ou de dado'
  - titulo: 🧭 Posição do canal na jornada
    texto: Receita FC **R$ 21.906,82** · receita LC **R$ 14.167,80** · razão **1.55**.
  - titulo: 📐 Poder estatístico desta janela
    texto: 'Taxa de conversão observada: **0.55%** (45 vendas ÷ 8225 cliques)'
  - titulo: 👻 Viés de sobrevivência
    texto: '- **9 de 34 itens** ficaram abaixo do piso de 1000 impressões, somando **R$ 181,68** gastos sem gerar leitura. Eles não entram em ranking nenhum · qualquer frase do tipo *"os melhores criativos são..."* significa **os melhores entre os que tiveram entrega**.'
proveniencia:
  gerado_em: 2026-09-17 21:26
  fonte_verdade: nemu
  metas:
    roas_geral: 2
    roas_remarketing: 2.5
    cps_max: 3
    min_impressoes: 1000
    min_vendas_esperadas: 1
  arquivos:
    - meta-ads-daily.csv
    - meta-adsets-daily.csv
    - meta-campaigns-daily.csv
    - google-ads-daily.csv
    - google-adsets-daily.csv
    - google-campaigns-daily.csv
    - BUBBLES-OFICIAL-Anúncios (2).csv (vínculo anúncio→conjunto)

---

## Diagnóstico · Bubbles · Meta + Google Ads

Relatório gerado a partir do material cru enviado (`2026-09_unificado_semanal-7d.md`), com **Meta Ads e Google Ads juntos nesta mesma página**, período de **2026-09-10 a 2026-09-16**. Os dois primeiros itens da lista ("Meta Ads · resumo do canal" e "Google Ads · resumo do canal") são só um agrupador visual, não é dado da fonte nem decisão real. As ações dentro de cada um vêm direto do frontmatter, sem nenhum texto adicional.
