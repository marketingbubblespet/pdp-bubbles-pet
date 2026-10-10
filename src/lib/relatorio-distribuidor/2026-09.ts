// src/lib/relatorio-distribuidor/2026-09.ts
// Dados do relatório de captação de distribuidores de setembro de 2026.
// Somas feitas por script a partir dos exports do Meta (campanhas, região e anúncios) e do
// Google Ads (relatório de campanha), conferidas contra os totais das campanhas.
import type { RelatorioDistribuidor } from './tipos'
import { relatorioAgosto2026 } from './2026-08'

const FB = 'https://www.facebook.com/100063565944892/posts/'

export const relatorioSetembro2026: RelatorioDistribuidor = {
  mes: { ano: 2026, mes: 9 },
  periodo: '01/09 a 30/09',

  redes: {
    meta: {
      campanhas: [
        {
          id: 'distribuidor-tradicional',
          nome: 'Distribuidor Tradicional',
          status: { tipo: 'ativa', texto: 'Ativa' },
          investimento: 7607.09,
          impressoes: 296362,
          cliques: 4354,
          leads: 196,
          destaque: 'Verba escalada e 9 novos criativos testados (6 vídeos e 3 imagens).',
        },
        {
          id: 'linha-care',
          nome: 'Linha Care',
          status: { tipo: 'encerrada', texto: 'Despriorizada em 10/09' },
          investimento: 335.17,
          impressoes: 10122,
          cliques: 270,
          leads: 1,
          destaque: 'Despriorizada temporariamente: veiculou só de 01/09 a 09/09.',
        },
      ],
      // Export de região das duas campanhas (soma bate com as impressões das campanhas).
      impressoesPorUF: {
        SP: 82149, BA: 36484, MG: 32851, MA: 20388, PE: 19626, RJ: 13625, AM: 10519, GO: 10299,
        PI: 10193, MT: 8289, RN: 7659, PB: 7081, AL: 6694, ES: 5681, MS: 5468, RO: 5416, SE: 5246,
        TO: 4798, DF: 3613, AP: 2518, AC: 2328, RR: 1782, RS: 822, PR: 663, PA: 497, SC: 478, CE: 312,
      },
    },
    google: {
      campanhas: [
        {
          id: 'pmax-cadastro-distribuidor',
          nome: 'PMax · Cadastro Distribuidor',
          status: { tipo: 'ativa', texto: 'Ativa, R$ 1/dia' },
          investimento: 22.99,
          impressoes: 400,
          cliques: 38,
          leads: 2,
          destaque: 'Campanhas de Search (Canal Pet e Marca) seguem sem anúncio, e as PMax Encontre Distribuidor e Cadastro RJ estão pausadas: aguardando as imagens do time de criação.',
        },
      ],
      impressoesPorUF: null,
    },
  },

  funilComercial: {
    // Soma do alcance das 2 campanhas do Meta (a mesma pessoa pode ser contada nas duas).
    alcance: 222106,
    leadsQualificados: null,
    reunioes: null,
    novosDistribuidores: null,
  },
  notaFunil: 'Os leads qualificados aparecem como sem dado porque ainda estão pendentes: o time comercial ainda não faz essa classificação.',

  leituraHtml: 'Com a verba escalada, a Distribuidor Tradicional quase dobrou o investimento e trouxe <strong>196 leads</strong>, com CPL de <strong>R$ 38,81</strong>. A arte interna (ad35) segue como principal motor de leads, e o <strong>Vídeo 05</strong> foi o vídeo que melhor converteu nos testes, o que levou ele para o grupo campeão. Entre os estáticos que entraram em 25/09, o <strong>Estático 02</strong> teve o menor custo por lead do mês (R$ 18,62).',

  ufsZeroConhecido: [],
  impressoesNaoAtribuidas: 1005,

  criterioRanking: 'Anúncios com pelo menos 3 leads e 1.000 impressões no mês, ordenados por número de leads. O mesmo criativo rodando no grupo de teste e no grupo campeão é somado.',
  criativos: [
    { nome: 'ad35|img|continuo|CAMP. DISTRIBUIDORES NACIONAL| artes internas', rede: 'meta', formato: 'Imagem', investimento: 3088.15, impressoes: 69927, cliques: 823, leads: 99,
      link: `${FB}1647497520712430/`, conjuntos: ['adv+|brasil - campeoes'] },
    { nome: 'ad35|img|continuo|CAMP. DISTRIBUIDORES NACIONAL| artes internas — Cópia', rede: 'meta', formato: 'Imagem', investimento: 21.63, impressoes: 643, cliques: 6, leads: 0,
      link: `${FB}1647497520712430/`, conjuntos: ['adv+|norte', 'adv+|são paulo'] },
    { nome: 'ad22|vid|continuo|VÍDEO 05- TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 1607.93, impressoes: 34292, cliques: 899, leads: 46,
      link: `${FB}1714579410670907/`, conjuntos: ['adv+|brasil - ad22 (teste)', 'adv+|brasil - campeoes'] },
    { nome: 'ad41|img|continuo|ESTÁTICO 02 - CAMPANHA NOVOS DISTRIBUIDORES', rede: 'meta', formato: 'Imagem', investimento: 223.42, impressoes: 11942, cliques: 105, leads: 12,
      link: `${FB}1731331938995654/` },
    { nome: 'ad20|vid|continuo|VÍDEO 03- TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 536.39, impressoes: 37904, cliques: 526, leads: 9,
      link: `${FB}1714579514004230/`, conjuntos: ['adv+|brasil - ad20 (teste)', 'adv+|brasil - campeoes'] },
    { nome: 'ad40|img|continuo|ESTÁTICO 01 - CAMPANHA NOVOS DISTRIBUIDORES', rede: 'meta', formato: 'Imagem', investimento: 214.8, impressoes: 8060, cliques: 53, leads: 7,
      link: `${FB}1731331888995659/` },
    { nome: 'ad16|vid|continuo|VÍDEO 01 - TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 493.11, impressoes: 27896, cliques: 538, leads: 8,
      link: `${FB}1714579400670908/`, conjuntos: ['adv+|brasil - ad16 (teste)', 'adv+|brasil - campeoes'] },
    { nome: 'ad42|img|continuo|ESTÁTICO 03 - CAMPANHA NOVOS DISTRIBUIDORES', rede: 'meta', formato: 'Imagem', investimento: 232.47, impressoes: 5515, cliques: 49, leads: 6,
      link: `${FB}1731332032328978/` },
    { nome: 'ad21|vid|continuo|VÍDEO 04- TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 385.43, impressoes: 31419, cliques: 472, leads: 4,
      link: `${FB}1714579587337556/` },
    { nome: 'ad17|vid|continuo|VÍDEO 02- TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 375.4, impressoes: 31690, cliques: 438, leads: 3,
      link: `${FB}1714579597337555/` },
    { nome: 'ad23|vid|continuo|VÍDEO 06 - TRÁFEGO DISTRIBUIDORES NACIONAL', rede: 'meta', formato: 'Vídeo', investimento: 376.42, impressoes: 36585, cliques: 419, leads: 2,
      link: `${FB}1714579517337563/` },
    { nome: 'ad79|vid|continuo|VÍDEO 2 - LARI: 1 SERVIÇO 2 FATURAMENTO| Linha Care', rede: 'meta', formato: 'Vídeo', investimento: 326.63, impressoes: 9703, cliques: 219, leads: 1,
      link: `${FB}1675876747874507/` },
  ],

  // Relatório do time comercial recebido em 10/10/2026. Fechamentos contados pelo mês da
  // 1ª NF de venda (sem bonificação). Leads qualificados não informados.
  comercial: [
    { nome: 'Cláudio', leadsQualificados: null, reunioes: 6, novosDistribuidores: 1, fechamentos: [
      { distribuidor: 'Julia Mauad Faggioni (L8)', cidadeUF: 'Barueri/SP', campanhaOrigem: 'Distribuidor Tradicional', dataPrimeiraCompra: '30/09/2026', valorPrimeiraCompra: 15149.05 },
    ] },
    { nome: 'Guilherme', leadsQualificados: null, reunioes: 9, novosDistribuidores: 1, fechamentos: [
      { distribuidor: 'Michelle Carvalho Chagas', cidadeUF: 'São Paulo/SP', campanhaOrigem: 'Distribuidor Tradicional', dataPrimeiraCompra: '30/09/2026', valorPrimeiraCompra: 40310.68 },
    ] },
    { nome: 'Paulo', leadsQualificados: null, reunioes: 11, novosDistribuidores: 0 },
  ],
  notaComercial: 'A L8 é um lead cadastrado em agosto que fez a primeira compra em setembro: os fechamentos contam no mês da primeira nota fiscal de venda.',

  timeline: {
    marcos: [
      { dia: 9, rotulo: '09/09 · Início dos testes dos 6 vídeos' },
      { dia: 22, rotulo: '22/09 · Vídeos vencedores no grupo campeão' },
      { dia: 25, rotulo: '25/09 · Entrada dos 3 estáticos' },
    ],
    itens: [
      { nome: 'Distribuidor Tradicional', diaInicio: 1, diaFim: 30, descricao: '01/09 → 30/09 · contínua, com verba escalada' },
      { nome: 'Testes de vídeo (grupos separados)', diaInicio: 9, diaFim: 30, descricao: '09/09 → 30/09 · Vídeos 02, 04 e 06 pausados em 22/09' },
      { nome: 'Estáticos 01, 02 e 03', diaInicio: 25, diaFim: 30, descricao: '25/09 → 30/09 · em teste' },
      { nome: 'Linha Care', diaInicio: 1, diaFim: 9, encerrada: true, descricao: '01/09 → 09/09 · despriorizada temporariamente' },
    ],
  },

  // Pedido do usuário: em setembro, esta seção registra as ações realizadas.
  desafios: [
    { titulo: 'Teste dos 6 novos vídeos', texto: 'Cada vídeo entrou primeiro em um grupo próprio, com verba de teste, a partir de 09/09. Os que trouxeram leads (Vídeos 01, 03 e 05) foram levados em 22/09 para o grupo campeão, junto com a arte interna; os Vídeos 02, 04 e 06 foram pausados.' },
    { titulo: 'Teste de 3 novos estáticos', texto: 'Estáticos 01, 02 e 03 subiram em 25/09, cada um em grupo próprio. Em 6 dias somaram 25 leads.' },
    { titulo: 'Escala da Distribuidor Tradicional', texto: 'Investimento de R$ 4,2 mil em agosto para R$ 7,6 mil em setembro, mantendo o CPL abaixo de R$ 40.' },
    { titulo: 'Linha Care despriorizada', texto: 'A campanha foi pausada temporariamente em 10/09 para concentrar a verba na captação tradicional, até a reestruturação da estratégia.' },
  ],

  planoAnterior: {
    origem: 'Plano de ação definido no relatório de agosto e o que aconteceu com cada item.',
    itens: [
      { texto: 'Escalar as campanhas', status: 'implementado' },
      { texto: 'Iniciar as campanhas de PMax e Google Search', status: 'andamento', nota: 'As campanhas já estão criadas e entram no ar assim que as imagens do time de criação forem entregues.' },
      { texto: 'Subir as campanhas Foco 1 e Foco 2', status: 'andamento', nota: 'Previsão de início: 16/10.' },
      { texto: 'Acompanhar a landing page B da Linha Care contra a versão A', status: 'nao-implementado', nota: 'A página B foi pausada temporariamente, junto com a despriorização da Linha Care. O teste volta quando a campanha for retomada.' },
      { texto: 'Corrigir o fluxo de envio de leads para a Sellum', status: 'andamento', nota: 'Sem novos registros de falha no mês. Seguimos acompanhando para confirmar a correção.' },
      { texto: 'Estabelecer o fluxo mensal de dados comercial → marketing', status: 'andamento', nota: 'Fluxo combinado, aguardando o primeiro envio para completar o funil e a seção de novos distribuidores.' },
    ],
  },

  planoProximo: {
    titulo: 'Plano de ação · Outubro',
    itens: [
      {
        texto: 'Estruturar a classificação de leads no CRM, para o relatório trazer os leads qualificados por vendedor:',
        destaque: true,
        subitens: [
          'Criar no CRM um campo obrigatório de status do lead: novo, qualificado, desqualificado, reunião marcada, fechado',
          'Definir juntos o que é um lead qualificado (ex: tem CNPJ, atua com revenda pet, região sem distribuidor, volume mínimo de compra)',
          'Registrar o motivo quando o lead é desqualificado (ex: e-commerce, região já atendida, sem CNPJ, sem retorno)',
          'Exportar o status por vendedor todo dia 02 ou 03 do mês, junto com reuniões e fechamentos',
        ],
      },
      { texto: 'Gabriel e Juliana: reestruturar a estratégia de venda da Linha Care' },
      {
        texto: 'Definir como medir leads que fecham em um mês diferente do cadastro (ex: L8, cadastrada em agosto e faturada em setembro):',
        subitens: [
          'Registrar no CRM a data de cadastro do lead e a data da primeira nota fiscal de cada fechamento',
          'Mostrar no relatório as duas leituras: fechamentos pelo mês da nota fiscal e fechamentos pelo mês de cadastro do lead',
          'Acompanhar o ciclo médio de venda (dias entre o cadastro e a primeira compra)',
        ],
      },
    ],
  },

  paginas: [
    { nome: 'Captação tradicional', url: 'captacao.bubbles.com.br' },
    { nome: 'Linha Care (A)', url: 'ofertas.bubbles.com.br/care', selo: 'pausada' },
    { nome: 'Linha Care (B)', url: 'ofertas.bubbles.com.br/care-b', selo: 'pausada' },
  ],

  regioesFoco: relatorioAgosto2026.regioesFoco,

  relatoriosAnteriores: [{ rotulo: 'Agosto de 2026', href: '/distribuidor-agosto-2026-2' }],
  anterior: relatorioAgosto2026,
}
