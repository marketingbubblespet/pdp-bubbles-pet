// src/lib/relatorio-distribuidor/2026-08.ts
// Dados do relatório de captação de distribuidores de agosto de 2026.
// Números de mídia iguais aos do relatório original (/distribuidor-agosto-2026).
//
// Para o próximo mês: copiar este arquivo como 2026-09.ts, trocar os números e apontar
// `anterior: relatorioAgosto2026` para ligar as setas de comparação.
import type { RelatorioDistribuidor } from './tipos'
import { relatorioJulho2026 } from './2026-07'

export const relatorioAgosto2026: RelatorioDistribuidor = {
  mes: { ano: 2026, mes: 8 },
  periodo: '01/08 a 31/08',

  redes: {
    meta: {
      campanhas: [
        {
          id: 'distribuidor-tradicional',
          nome: 'Distribuidor Tradicional',
          status: { tipo: 'ativa', texto: 'Ativa' },
          investimento: 4162.5,
          impressoes: 118542,
          cliques: 1426,
          leads: 180,
          destaque: 'Melhor CPL e melhor taxa de conversão clique → lead da conta.',
        },
        {
          id: 'linha-care',
          nome: 'Linha Care',
          status: { tipo: 'reduzida', texto: 'Ativa, verba reduzida' },
          investimento: 3300.22,
          impressoes: 134887,
          cliques: 2254,
          leads: 17,
          destaque: 'Verba reduzida em 80% desde 19/08.',
          nota: '* Leads corrigidos manualmente de 7 para 17: houve falha no envio dos leads do site para a Sellum, que subnotificou os resultados desta campanha.',
        },
        {
          id: 'pet-south',
          nome: 'Pet South',
          status: { tipo: 'encerrada', texto: 'Encerrada em 15/08' },
          investimento: 1706.76,
          impressoes: 35718,
          cliques: 490,
          leads: 12,
          destaque: 'Evento anual, encerramento planejado: não é queda de performance.',
        },
      ],
      // Só a campanha Distribuidor Tradicional (export de conjuntos com quebra por região).
      impressoesPorUF: {
        SP: 47403, AC: 748, AP: 977, AM: 3357, PA: 6658, RO: 2390, RR: 681, TO: 1166, AL: 1028,
        BA: 5463, CE: 2701, DF: 4310, ES: 2143, MS: 2281, MA: 1754, MT: 2717, MG: 11128, PB: 1419,
        PI: 1139, RJ: 8718, RN: 1300, SE: 854, GO: 5105, PE: 3024,
      },
    },
    google: {
      campanhas: [
        {
          id: 'pmax-cadastro-distribuidor',
          nome: 'PMax · Cadastro Distribuidor',
          status: { tipo: 'ativa', texto: 'Ativa, R$ 1/dia' },
          investimento: 24.29,
          impressoes: 696,
          cliques: 42,
          leads: 4,
          destaque: 'Campanhas de Search (Canal Pet e Marca) criadas, mas sem anúncio: ainda não veicularam.',
        },
      ],
      impressoesPorUF: null,
    },
  },

  funilComercial: {
    // Soma do alcance das 3 campanhas do Meta (a mesma pessoa pode ser contada em mais de uma).
    alcance: 110729,
    leadsQualificados: null,
    reunioes: null,
    novosDistribuidores: null,
  },
  notaFunil: 'Pendente do time comercial, por vendedor: leads qualificados, reuniões e fechamentos; e, para cada fechamento, distribuidor, cidade/UF, data da primeira compra e valor do primeiro pedido.',

  leituraHtml: 'A Linha Care teve o <strong>melhor CTR da conta (1,67%)</strong> e o <strong>menor custo por clique (R$ 1,46)</strong>, indicando que o criativo e a segmentação funcionaram. No entanto, foi a campanha com a <strong>pior conversão de clique em lead (0,75%, contra 12,62% da Distribuidor Tradicional)</strong>, um custo por lead 8,4 vezes maior. O gargalo, portanto, não está na mídia, e sim na landing page, o que motivou a criação de uma versão B, atualmente em aprovação.',

  ufsZeroConhecido: ['PR', 'SC', 'RS'],
  impressoesNaoAtribuidas: 78,
  notaMapa:'O mapa considera só a campanha Distribuidor Tradicional, a única com quebra por estado na exportação. Os estados do Sul aparecem zerados porque foram excluídos da segmentação a pedido do time comercial.',

  // Anúncios da campanha Distribuidor Tradicional com o nome exato do Gerenciador, somando
  // as linhas do mesmo anúncio em conjuntos diferentes. A regra de mínimo (3 leads e 1.000
  // impressões) é aplicada na página, então aqui pode listar todos.
  criterioRanking: 'Anúncios com pelo menos 3 leads e 1.000 impressões no mês, ordenados por número de leads.',
  criativos: [
    { nome: 'ad35|img|continuo|CAMP. DISTRIBUIDORES NACIONAL| artes internas', rede: 'meta', formato: 'Imagem', investimento: 3532.35, impressoes: 102298, cliques: 1226, leads: 153,
      link: 'https://www.facebook.com/100063565944892/posts/1647497520712430/', conjuntos: ['adv+|brasil - campeoes', 'adv+|brasilia'] },
    { nome: 'ad35|img|continuo|CAMP. DISTRIBUIDORES NACIONAL| artes internas — Cópia', rede: 'meta', formato: 'Imagem', investimento: 417.01, impressoes: 11332, cliques: 136, leads: 20,
      link: null, conjuntos: ['adv+|norte', 'adv+|são paulo'] },
    { nome: 'imagem|captacao|novos_distribuidores_linha_ego_v2-1572640434864806', rede: 'meta', formato: 'Imagem', investimento: 154.31, impressoes: 3387, cliques: 51, leads: 7,
      link: null, conjuntos: ['adv+|são paulo', 'adv+|norte'] },
    { nome: 'imagem|captacao|novos_distribuidores_linha_ego-1572640468198136', rede: 'meta', formato: 'Imagem', investimento: 45.21, impressoes: 1391, cliques: 12, leads: 0,
      link: null, conjuntos: ['adv+|são paulo', 'adv+|norte'] },
  ],

  // Time comercial ainda não enviou. Quando enviar, preencher por vendedor, ex:
  // [{ nome: 'Ivan', leadsQualificados: 10, reunioes: 4, novosDistribuidores: 1 }, ...]
  comercial: null,


  timeline: {
    marcos: [{ dia: 18, rotulo: '18/08 · Reunião Comercial × Marketing' }],
    itens: [
      { nome: 'Distribuidor Tradicional', diaInicio: 1, diaFim: 31, descricao: '01/08 → 31/08 · contínua' },
      { nome: 'Linha Care', diaInicio: 1, diaFim: 31, descricao: '01/08 → 31/08 · contínua, com redução de verba em 19/08' },
      { nome: 'Pet South', diaInicio: 1, diaFim: 15, encerrada: true, descricao: '01/08 → 15/08 · encerrada' },
    ],
  },

  desafios: [
    { titulo: 'Falha no envio de leads para a Sellum', texto: 'Leads da Linha Care subnotificados (7 registrados vs. 17 reais). Correção em andamento.' },
    { titulo: 'Landing page da Linha Care com baixíssima conversão', texto: '0,75% de clique para lead. Versão B criada, em processo de aprovação.' },
    { titulo: 'Atraso na produção de criativos', texto: 'Os novos vídeos de distribuidor definidos na reunião de 18/08 ainda não foram gravados, o que travou o aumento de verba e a entrada no Google Ads.' },
  ],

  planoAnterior: {
    origem: 'Decisões da reunião Comercial × Marketing de 18/08 e o que aconteceu com cada uma.',
    itens: [
      { texto: 'Exclusão das regiões solicitadas pelo time comercial', status: 'implementado' },
      { texto: 'Reestruturação das campanhas para receber os novos vídeos', status: 'implementado' },
      { texto: 'Redução de 80% do investimento na Linha Care', status: 'implementado', nota: 'Queda de aproximadamente R$ 155/dia para R$ 45/dia a partir de 19/08.' },
      { texto: 'Criação da versão B da landing page da Linha Care', status: 'implementado', nota: 'Página criada, em aprovação.' },
      { texto: 'Novos criativos de distribuidor', status: 'implementado', nota: '9 novos testes de material: 6 vídeos e 3 imagens.' },
      { texto: 'Aumento de verba', status: 'implementado', nota: 'Previsto na reunião: de R$ 5 mil para R$ 10 mil.' },
      { texto: 'Entrada no Google Ads', status: 'andamento', nota: 'Hoje só a PMax Cadastro Distribuidor roda, com R$ 1/dia. A escala com PMax e Google Search fica para o próximo mês, com fotos e vídeos em produção.' },
    ],
  },

  planoProximo: {
    titulo: 'Plano de ação · Setembro',
    itens: [
      { texto: 'Escalar as campanhas' },
      { texto: 'Iniciar as campanhas de PMax e Google Search para complementar a estratégia (fotos e vídeos em produção)' },
      { texto: 'Subir as campanhas Foco 1 e Foco 2' },
      { texto: 'Acompanhar o desempenho da landing page B da Linha Care contra a versão A' },
      { texto: 'Corrigir o fluxo de envio de leads para a Sellum, eliminando a subnotificação' },
      {
        texto: 'Estabelecer o fluxo mensal de dados comercial → marketing, com entrega todo dia 02 ou 03 de cada mês, contendo:',
        destaque: true,
        subitens: [
          'Por vendedor (Ivan, Paulo, Claudio, Guilherme e Thainá): leads qualificados vindos do tráfego pago',
          'Por vendedor: reuniões realizadas com esses leads',
          'Por vendedor: fechamentos (novos distribuidores)',
          'Para cada fechamento: nome do distribuidor, cidade/UF, data da primeira compra e valor do primeiro pedido',
        ],
      },
    ],
  },

  paginas: [
    { nome: 'Captação tradicional', url: 'captacao.bubbles.com.br' },
    { nome: 'Pet South', url: 'captacao.bubbles.com.br/pet-south' },
    { nome: 'Linha Care (A)', url: 'ofertas.bubbles.com.br/care' },
    { nome: 'Linha Care (B)', url: 'ofertas.bubbles.com.br/care-b', selo: 'em aprovação' },
  ],

  regioesFoco: {
    intro: 'A subir com os novos criativos.',
    itens: [
      { titulo: 'Foco 1 · Centro-Oeste e interior de SP', texto: 'Goiás (exceto Goiânia), Mato Grosso, Mato Grosso do Sul (exceto Dourados), ABC Paulista, Jundiaí, Ribeirão Preto, Araçatuba, Votuporanga, Barretos, Fernandópolis.' },
      { titulo: 'Foco 2 · Estados com pouca ou nenhuma presença de distribuidor', texto: 'Espírito Santo, Minas Gerais (exceto Uberlândia, que já possui distribuidor), Tocantins, Rondônia, Acre, Amapá, Sergipe, Piauí, Londrina e Ponta Grossa (PR).' },
    ],
  },

  relatoriosAnteriores: [],
  anterior: relatorioJulho2026,
}
