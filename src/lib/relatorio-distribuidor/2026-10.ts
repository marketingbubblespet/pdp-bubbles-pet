// src/lib/relatorio-distribuidor/2026-10.ts
// Dados do relatório de captação de distribuidores de outubro de 2026 (estrutura nova).
// Meta: export "DIST Analise - 01 Campanhas por dia" de 01/09 a 31/10, somado por mês
// (o total dos dois meses, R$ 15.625,12, bate com os relatórios 03 a 09 da extração de 27/11).
// Comercial: "Relatorio_Captacao_Distribuidores_10-2026.docx" (Diretoria Comercial). A tabela
// "Aberturas de outubro por origem" é controle interno do comercial e não entra aqui.
// Região: Meta "07 Conjuntos por regiao" e Google "19 Campanhas por estado e mes".
// Anúncios: Meta "06 Anuncios por mes". Google: "DIST Analise - 10/11/18/19" de outubro.
import type { RelatorioDistribuidor } from './tipos'
import { relatorioSetembro2026v2 } from './2026-09-v2'

export const relatorioOutubro2026: RelatorioDistribuidor = {
  mes: { ano: 2026, mes: 10 },
  periodo: '01/10 a 31/10',

  redes: {
    meta: {
      campanhas: [
        {
          id: 'distribuidor-tradicional',
          nome: 'Distribuidor Tradicional',
          status: { tipo: 'ativa', texto: 'Ativa' },
          investimento: 7366.3,
          impressoes: 191337,
          cliques: 2092,
          leads: 206,
          destaque: 'Única campanha com veiculação no mês. Linha Care e WhatsApp seguiram pausadas.',
        },
      ],
      // Export de região: a soma (189.720 + 1.617 sem estado) bate com as 191.337 impressões.
      impressoesPorUF: {
        SP: 70260, MG: 25756, RJ: 10029, BA: 9320, AM: 8138, PE: 7598, GO: 7282, MT: 7057, MA: 5978, ES: 5719,
        MS: 4987, DF: 4354, RO: 3465, PB: 3414, RN: 2949, PI: 2694, AL: 2596, TO: 2338, SE: 1864, RR: 1428, AP: 1272, AC: 1222,
      },
    },
    google: {
      campanhas: [
        {
          id: 'pmax-cadastro-distribuidor',
          nome: 'PMax · Cadastro Distribuidor',
          status: { tipo: 'ativa', texto: 'Ativa, R$ 1/dia' },
          investimento: 27.62,
          impressoes: 717,
          cliques: 61,
          leads: 0,
          destaque: 'Limitada pela política "Declarações não confiáveis". Nenhuma conversão em outubro. As campanhas de Pesquisa seguem sem anúncios.',
        },
      ],
      impressoesPorUF: { SP: 285, RJ: 126, ES: 92, AL: 83, SE: 47, TO: 43, DF: 34, MG: 3, PR: 2, BA: 1, PE: 1 },
    },
  },

  funilComercial: {
    alcance: null,
    leadsQualificados: null,
    reunioes: null,
    novosDistribuidores: null,
  },
  notaFunil: 'Os leads qualificados por vendedor não vieram no relatório do comercial de outubro.',

  leituraHtml: 'A Distribuidor Tradicional trouxe <strong>206 leads</strong> com 3% menos investimento que em setembro, e o custo por lead caiu para <strong>R$ 35,76</strong>. Vieram menos impressões e menos cliques, mas a página converteu melhor: <strong>9,85% dos cliques viraram lead</strong>, contra 4,50% em setembro. No comercial, foram <strong>21 reuniões e 2 novos distribuidores</strong> (R$ 20.196,78 em primeiros pedidos), abaixo da meta de 6 novos e R$ 70 mil. A conversão de reunião em fechamento ficou em 9,5%, o segundo mês seguido abaixo de 10%.',

  ufsZeroConhecido: ['SC', 'RS'],
  impressoesNaoAtribuidas: 1617,

  criterioRanking: 'Anúncios com pelo menos 3 leads e 1.000 impressões no mês, ordenados por número de leads. O mesmo anúncio em mais de um conjunto, ou duplicado como cópia, é somado.',
  criativos: [
    { nome: 'ad35|img|continuo|CAMP. DISTRIBUIDORES NACIONAL| artes internas', rede: 'meta', formato: 'Imagem', investimento: 4755.61, impressoes: 118894, cliques: 1204, leads: 158,
      link: 'https://www.facebook.com/?feed_demo_ad=120245330485470677&h=AQIflXO2RC-MBpsQME-qcN0yvw0', conjuntos: ['adv+|brasil - campeoes'] },
    { nome: 'ad41|img|continuo|ESTÁTICO 02 - CAMPANHA NOVOS DISTRIBUIDORES', rede: 'meta', formato: 'Imagem', investimento: 534.62, impressoes: 20759, cliques: 179, leads: 10,
      link: 'https://www.facebook.com/?feed_demo_ad=120249469537810677&h=AQKBgJ43eE663s1KN_OmopTDy3c', conjuntos: ['adv+|brasil - ad41 (teste)'] },
    { nome: 'ad41|img|continuo|ESTÁTICO 02 - CAMPANHA NOVOS DISTRIBUIDORES — Cópia', rede: 'meta', formato: 'Imagem', investimento: 362.05, impressoes: 10195, cliques: 112, leads: 10,
      link: 'https://www.facebook.com/?feed_demo_ad=120249668551540677&h=AQIcs3ggzuoVCbueOzAt0v1KvtQ', conjuntos: ['adv+|brasil - campeoes'] },
    { nome: 'ad22|vid|continuo|VÍDEO 05- TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 566.43, impressoes: 5850, cliques: 213, leads: 14,
      link: 'https://www.facebook.com/?feed_demo_ad=120249417462890677&h=AQKovZA1X2kpsLqf64qE481xFr8', conjuntos: ['adv+|brasil - campeoes'] },
    { nome: 'ad20|vid|continuo|VÍDEO 03- TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 293.5, impressoes: 3424, cliques: 72, leads: 10,
      link: 'https://www.facebook.com/?feed_demo_ad=120249220781430677&h=AQIbnIbGhm1cugfRJoIVRYrV_vE', conjuntos: ['adv+|brasil - ad20 (teste)'] },
    { nome: 'ad42|img|continuo|ESTÁTICO 03 - CAMPANHA NOVOS DISTRIBUIDORES', rede: 'meta', formato: 'Imagem', investimento: 311.5, impressoes: 10640, cliques: 99, leads: 4,
      link: 'https://www.facebook.com/?feed_demo_ad=120249469571020677&h=AQI0HlLvakeUf8izjL_M4IKtLwk', conjuntos: ['adv+|brasil - ad42 (teste)'] },
  ],

  // Relatório da Diretoria Comercial de outubro. Fechamentos contados pelo mês do 1º pedido,
  // só vendas (sem bonificação). Leads qualificados não informados.
  comercial: [
    { nome: 'Cláudio', leadsQualificados: null, reunioes: 7, novosDistribuidores: 1, fechamentos: [
      { distribuidor: 'My Best for Pets (MBFP)', cidadeUF: 'Garça/SP', campanhaOrigem: 'Distribuidor Tradicional', dataPrimeiraCompra: '29/10/2026', valorPrimeiraCompra: 10026.61 },
    ] },
    { nome: 'Guilherme', leadsQualificados: null, reunioes: 6, novosDistribuidores: 1, fechamentos: [
      { distribuidor: 'AOX Ecommerce', cidadeUF: 'Franca/SP', campanhaOrigem: 'Distribuidor Tradicional', dataPrimeiraCompra: '20/10/2026', valorPrimeiraCompra: 10170.17 },
    ] },
    { nome: 'Paulo', leadsQualificados: null, reunioes: 8, novosDistribuidores: 0 },
  ],
  notaComercial: 'Press kits enviados no mês: 3. A My Best for Pets fechou 15 dias depois do cadastro do lead; a AOX não tem cadastro de lead no CRM da Sellum.',

  timeline: {
    marcos: [
      { dia: 23, rotulo: '23/10 · Nova página da Linha Care no ar' },
    ],
    itens: [
      { nome: 'Distribuidor Tradicional', diaInicio: 1, diaFim: 31, descricao: '01/10 → 31/10 · contínua' },
    ],
  },

  desafios: [
    { titulo: 'Conversão de reunião em fechamento abaixo de 10% pelo segundo mês', texto: '2 fechamentos em 21 reuniões (9,5%). Em setembro foram 7,7% e, em agosto, 28,6%.' },
    { titulo: 'Menos reuniões a cada mês', texto: 'As reuniões com leads da campanha caíram de 28 em agosto para 26 em setembro e 21 em outubro. O CRM tem leads qualificados e com contato feito que ainda não chegaram à reunião.' },
    { titulo: 'Primeiros pedidos no valor mínimo', texto: 'Os dois fechamentos de outubro ficaram em R$ 10,2 mil e R$ 10,0 mil, perto do mínimo que conta como abertura.' },
    { titulo: 'Google Ads sem escala', texto: 'A única campanha com entrega é a PMax Cadastro Distribuidor, com R$ 1 por dia e limitada pela política "Declarações não confiáveis". As duas campanhas de Pesquisa seguem sem anúncios, e o recurso de mensagem no WhatsApp foi reprovado.' },
  ],

  planoAnterior: {
    origem: 'Plano de ação definido no relatório de setembro e o que aconteceu com cada item.',
    itens: [
      { texto: 'Estruturar a classificação de leads no CRM, para o relatório trazer os leads qualificados por vendedor', status: 'nao-implementado', nota: 'Os leads qualificados por vendedor ainda não vieram no relatório de outubro.' },
      { texto: 'Gabriel e Juliana: reestruturar a estratégia de venda da Linha Care', status: 'andamento', nota: 'Nova página da Linha Care no ar desde 23/10 e 8 anúncios criados. A campanha ainda não voltou a rodar em outubro.' },
      { texto: 'Definir como medir leads que fecham em um mês diferente do cadastro', status: 'andamento', nota: 'O relatório do comercial passou a trazer a data de cadastro do lead e o ciclo até o 1º pedido. Falta o cadastro da AOX no CRM.' },
    ],
  },

  // Rascunho a partir dos pontos em aberto de outubro: confirmar com o gestor antes de apresentar.
  planoProximo: {
    titulo: 'Plano de ação · Novembro',
    itens: [
      { texto: 'Comercial: informar os leads qualificados por vendedor e registrar no CRM o motivo de quem não avança' },
      { texto: 'Comercial: registrar no CRM a data de cadastro de todo lead que fechar' },
      { texto: 'Google Ads: resolver a política "Declarações não confiáveis", publicar os anúncios das campanhas de Pesquisa e trocar o recurso de WhatsApp reprovado' },
      { texto: 'Linha Care: subir os anúncios da nova página de captação' },
    ],
  },

  paginas: [
    { nome: 'Captação tradicional', url: 'captacao.bubbles.com.br' },
    { nome: 'Linha Care (nova página)', url: 'ofertas.bubbles.com.br/distribuidor-care', selo: 'no ar desde 23/10' },
    { nome: 'Linha Care (A)', url: 'ofertas.bubbles.com.br/care', selo: 'pausada' },
    { nome: 'Linha Care (B)', url: 'ofertas.bubbles.com.br/care-b', selo: 'pausada' },
  ],

  regioesFoco: null,

  relatoriosAnteriores: [],
  anterior: relatorioSetembro2026v2,
}
