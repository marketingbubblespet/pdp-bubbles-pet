// src/lib/distribuidor-care.ts
// Dados isolados da LP /distribuidor-care (captação de distribuidores e atacadistas da Linha Care).
// Não misturar com outras LPs (regra 17): nada é importado de care.ts, captacao.ts ou constants.ts.
// TypeScript puro, sem segredo: este arquivo vai para o navegador. Copy literal do super prompt de 22.10.26.
// Vitrine (abas, produtos, kits) e formulário ficam em src/components/lp/distribuidor-care/distribuidorCare*Dados.ts.

export const DISTRIBUIDOR_CARE = {
  slug: 'distribuidor-care',
  leadSlug: 'distribuidor-care',
  formName: 'distribuidor-care-lead',
  netlifyForm: 'distribuidor-care',
  netlifyFormFalha: 'falha-sellum',
  apiPath: '/api/distribuidor-care/lead',
  calculatorName: 'distribuidor_care',
  // Número novo, confirmado pelo gestor em 22.10.26 (só nas telas de falha do formulário).
  whatsappAtendimento: 'https://wa.me/5514998492048',
} as const

export const DISTRIBUIDOR_CARE_SEO = {
  // [CONFIRMAR COM O GESTOR] title e description da página (pendência 1)
  title: 'Distribuidor Linha Care Bubbles: até 45% de margem',
  description: 'Leve a Linha Care para a prateleira dos seus clientes com até 45% de margem, treinamento da equipe e material de PDV. O cadastro leva cerca de 1 minuto.',
  ogAlt: 'Seja distribuidor Linha Care',
} as const

export const DISTRIBUIDOR_CARE_LINKS = {
  privacidade: 'https://www.bubbles.com.br/pages/politica-de-privacidade',
  termos: 'https://www.bubbles.com.br/pages/termos-de-servico',
  desvio: 'https://www.bubbles.com.br/collections/care?utm_source=lp-distribuidor-care&utm_medium=desvio&utm_campaign=distribuidor-care',
} as const

// B0
export const DISTRIBUIDOR_CARE_CABECALHO = { cta: 'Quero ser distribuidor Care' } as const

// B1 (objeto único: o título por anúncio entra numa segunda fase)
export const DISTRIBUIDOR_CARE_HERO = {
  eyebrow: 'Seja distribuidor Linha Care',
  h1: 'A qualidade do banho e tosa, agora na prateleira dos seus clientes.',
  subtitulo: 'Até 45% de margem com a Linha Care no seu portfólio, mais treinamento e material de apoio para a sua equipe vender mais.',
  rotuloChips: 'Comece agora: qual é o seu negócio?',
  elevador: { texto: 'Já conhece a Bubbles®?', link: 'Ir direto ao cadastro' },
  microProva: '+150 parceiros ativos no Brasil · +5.000 groomers · nota 4,9',
  selos: ['Hipoalergênica', '100% vegana', 'Indústria registrada no MAPA'],
  altImagem: 'Linha Care em display de balcão no caixa de um pet shop',
} as const

// B2
export const DISTRIBUIDOR_CARE_FAIXA = [
  'Até 45% de margem',
  'Hipoalergênica',
  '100% vegana e cruelty-free',
  'Indústria registrada no MAPA',
  'Material de PDV',
  'Treinamento da equipe',
  'Mídia regional',
  'Procura puxada pelo TikTok',
  'Fichas técnicas',
  'Validada por groomers',
  'Menos concorrência na região',
] as const

// Nomes de ícone do lucide-react; o componente faz o mapa (dados não importam componente).
export type IconeDistribuidorCare =
  | 'TrendingUp' | 'BadgeCheck' | 'Sparkles' | 'RefreshCw' | 'PackagePlus' | 'Store' | 'Layers' | 'Percent' | 'Clock'
  | 'Smartphone' | 'Megaphone' | 'Rocket' | 'Star' | 'GraduationCap' | 'FileText' | 'BookOpen' | 'Truck'

// B3
export const DISTRIBUIDOR_CARE_OPORTUNIDADE = {
  titulo: 'O que a Linha Care muda no seu negócio',
  cartoes: [
    { icone: 'TrendingUp', titulo: 'Mais margem por pedido', texto: 'Até 45% num produto que entra fácil no mix.' },
    { icone: 'BadgeCheck', titulo: 'Um diferencial na sua carteira', texto: 'Uma linha profissional que o concorrente não tem.' },
    { icone: 'Sparkles', titulo: 'Novidade para levar ao cliente', texto: 'Um motivo novo em cada visita da sua equipe.' },
    { icone: 'RefreshCw', titulo: 'Pedidos que crescem', texto: 'Os kits aumentam o ticket e a recompra.' },
  ],
  fechamento: 'Tudo isso com uma marca que mais de 150 parceiros já conhecem.',
} as const

// B4
export const DISTRIBUIDOR_CARE_POR_QUE_VENDE = {
  titulo: 'Por que a Linha Care vende',
  pilares: [
    { icone: 'PackagePlus', titulo: 'Entra fácil no pedido', texto: 'Soma ao que a sua equipe já oferece, sem mudar a operação.' },
    { icone: 'Store', titulo: 'Vende no caixa', texto: 'Display de balcão e compra por impulso do tutor.' },
    { icone: 'Layers', titulo: 'Combina e aumenta o ticket', texto: 'Shampoo, condicionador, finalizador e body splash formam uma rotina.' },
    { icone: 'BadgeCheck', titulo: 'Profissional que o tutor quer', texto: 'A qualidade do banho e tosa, agora para casa. Hipoalergênica, 100% vegana e fabricada em indústria própria registrada no MAPA.' },
  ],
  fechamento: 'A sua equipe não precisa virar especialista. A Bubbles® entrega o treinamento e o material.',
  ariaVideo: 'Vídeo de demonstração da Linha Care: textura, espuma e resultado',
} as const

// B5 (único bloco com valor em reais, junto da etapa 4 do formulário)
export const DISTRIBUIDOR_CARE_SIMULADOR = {
  eyebrow: 'Simulador',
  titulo: 'Veja quanto a Linha Care pode render para você',
  numeros: [
    { icone: 'Percent', antes: 'até ', destaque: '45%', depois: ' de margem' },
    { icone: 'RefreshCw', antes: 'giro de ', destaque: '45 a 60 dias', depois: '' },
    { icone: 'Clock', antes: 'retorno estimado em ', destaque: '2 a 3 meses', depois: '' },
  ],
  rotuloSlider: 'Investimento',
  minimo: 'Mínimo R$ 3 mil',
  rotulos: { faturamento: 'Faturamento estimado', lucro: 'Lucro estimado' },
  cta: 'Quero essa conta na minha região',
  ressalva: '*Cálculo baseado na margem média praticada. O giro de estoque ocorre em ciclos de 45 a 60 dias. Esses dados podem variar de acordo com região, logística e processos do distribuidor. Os valores apresentados são estimativas e as condições comerciais são confirmadas com o nosso time de atendimento.',
} as const

// 26 posições: de mil em mil até 10 mil; depois de 5 mil em 5 mil até 100 mil
export const DISTRIBUIDOR_CARE_VALORES_SIMULADOR = [
  3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
  55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
] as const

// B6 (textos do bloco; abas, produtos e kits ficam em distribuidorCareVitrineDados.ts)
export const DISTRIBUIDOR_CARE_VITRINE = {
  titulo: 'Conheça a Linha Care',
  subtitulo: '11 produtos profissionais para a rotina completa de cuidado do pet em casa.',
  seloCaixa: 'Ideal para o caixa',
  painel: { paraQueServe: 'Para que serve', comoUsar: 'Como usar', combinaCom: 'Combina com', nosKits: 'Nos kits: ' },
  selosPainel: ['Hipoalergênica', '100% vegana', 'Cruelty-free'],
  fechar: 'Fechar',
  kitsTitulo: 'Monte a rotina',
  kitsFrase: 'Kits aumentam o ticket do seu cliente.',
  kitsContagem: '{n} itens',
  ariaAbas: 'Momentos da rotina',
  ariaKits: 'Kits da Linha Care',
  ariaProdutos: 'Produtos da aba {aba}',
  anteriores: 'Ver anteriores',
  proximos: 'Ver próximos',
} as const

// B7
export const DISTRIBUIDOR_CARE_DEMANDA = {
  titulo: 'O tutor já procura',
  texto: 'A Bubbles® investe para o tutor pedir. O seu cliente só precisa ter na prateleira.',
  provas: [
    { icone: 'Smartphone', texto: 'Afiliados no TikTok mostram a Linha Care para tutores todos os dias.' },
    { icone: 'Megaphone', texto: 'Mídia regional da Bubbles® gera procura perto do seu cliente.' },
    { icone: 'Rocket', texto: 'Um lançamento que foi sucesso com o tutor.' },
    { icone: 'Star', texto: 'Nota 4,9 entre os clientes.' },
  ],
  ariaFila: 'Vídeos de clientes',
} as const

// P-03: vídeos de clientes, ainda sem arquivo
export const DISTRIBUIDOR_CARE_VIDEOS_CLIENTES = [
  { src: null as string | null, poster: null as string | null, descricao: 'Vídeo de cliente usando o produto (1 de 3)', aria: 'Vídeo de cliente usando a Linha Care, 1 de 3' },
  { src: null as string | null, poster: null as string | null, descricao: 'Vídeo de cliente usando o produto (2 de 3)', aria: 'Vídeo de cliente usando a Linha Care, 2 de 3' },
  { src: null as string | null, poster: null as string | null, descricao: 'Vídeo de cliente usando o produto (3 de 3)', aria: 'Vídeo de cliente usando a Linha Care, 3 de 3' },
] as const

// B8
export const DISTRIBUIDOR_CARE_APOIO = {
  titulo: 'O que você e a sua equipe recebem',
  itens: [
    { icone: 'Store', titulo: 'Material de PDV', texto: 'Display de balcão e gôndola' },
    { icone: 'GraduationCap', titulo: 'Treinamento da equipe de vendas' },
    { icone: 'FileText', titulo: 'Fichas técnicas' },
    { icone: 'BookOpen', titulo: 'Materiais informativos' },
    { icone: 'Megaphone', titulo: 'Mídia regional' },
    { icone: 'Truck', titulo: 'Expedição em 5 dias úteis' },
  ],
  fotoExpedicao: '/images/distribuidores/bubbles-estoque-expedicao-desktop.webp',
  altExpedicao: 'Estoque da Bubbles com caixas etiquetadas prontas para a expedição',
} as const

// B9
export const DISTRIBUIDOR_CARE_REGIAO = {
  titulo: 'Menos concorrência na sua região',
  texto: 'Trabalhamos com poucos distribuidores por região. Quem entra tem espaço para crescer sem disputar preço com outro distribuidor da mesma marca.',
} as const

// B10
export const DISTRIBUIDOR_CARE_MARCA = {
  tituloAntes: 'Quem é a ',
  tituloMarca: 'Bubbles®',
  numeros: [
    { antes: '', destaque: '+7', depois: ' anos' },
    { antes: '', destaque: '+150', depois: ' parceiros ativos no Brasil' },
    { antes: '', destaque: '+5.000', depois: ' groomers' },
    { antes: 'nota ', destaque: '4,9', depois: '' },
  ],
  lastro: 'Fabricada em indústria própria registrada no MAPA, em Lençóis Paulista (SP).',
  pausar: 'Pausar o vídeo',
  retomar: 'Retomar o vídeo',
} as const

// 1280×720, H.264, 20,9 s (mesma URL de src/components/lp/care/CareBrand.tsx:13)
export const DISTRIBUIDOR_CARE_VIDEO_INSTITUCIONAL = 'https://cdn.shopify.com/videos/c/vp/6fd9894dcddb47b5883886091db28520/6fd9894dcddb47b5883886091db28520.HD-720p-4.5Mbps-45960585.mp4'
export const DISTRIBUIDOR_CARE_POSTER_PROVISORIO = '/images/brand-video-poster.svg'

// B11
export const DISTRIBUIDOR_CARE_PROVA = {
  titulo: '+150 parceiros ativos no Brasil confiam na Bubbles®',
  lerMais: 'Ler mais',
  lerMenos: 'Ler menos',
  demanda: 'Validada por mais de 5.000 groomers',
} as const

// Copiados de src/lib/care.ts (MANTYPET, Assispet, SERRAPET) e src/lib/captacao.ts (TOPET, com "percebemos").
export const DISTRIBUIDOR_CARE_DEPOIMENTOS = [
  {
    empresa: 'MANTYPET',
    texto: 'Ser distribuidor da Bubbles tem se mostrado uma experiência extremamente enriquecedora e estratégica, marcada por aprendizado constante e resultados positivos desde o início, mesmo sem experiência prévia no segmento de banho e tosa. O suporte próximo e eficiente da equipe Bubbles, aliado à excelência dos produtos, nos transmite total segurança operacional e fortalece nossa atuação comercial, refletindo diretamente na alta aceitação e satisfação dos clientes.',
  },
  {
    empresa: 'Assispet',
    texto: 'A Bubbles se tornou em pouco tempo um dos nossos principais fornecedores, um grande parceiro que veio pra somar trabalho e resultado em nossa distribuidora, com excelente atendimento e suporte de toda equipe, uma empresa com um leque imenso de produtos, sempre trazendo novidades ao mercado pet.',
  },
  {
    empresa: 'SERRAPET',
    texto: 'Ser distribuidor Bubbles vai muito além de vender produtos, é viver, na prática, a transformação que eles causam. É acompanhar de perto aquele pet que chega para o banho e sai renovado, com o pelo macio, brilho evidente e um perfume que realmente marca. É ver o olhar do cliente mudar, o elogio espontâneo surgir e saber que você fez parte daquela experiência. No dia a dia, é sentir a diferença na rotina dos profissionais: produtos que rendem, que facilitam o trabalho e elevam o padrão do atendimento. É perceber que não se trata só de estética, mas de cuidado, bem-estar e valorização do serviço prestado. Ser Bubbles é criar conexão com os pet shops, com os groomers e com cada cliente que volta justamente pela experiência que teve. É ter orgulho de representar algo que entrega resultado de verdade, que fideliza e que faz o negócio crescer junto. No fim, ser distribuidor Bubbles é isso: não é só sobre o que você entrega, é sobre o que as pessoas sentem depois, pois a satisfação do cliente do meu cliente é a minha satisfação.',
  },
  {
    empresa: 'TOPET',
    texto: 'Trabalhar com a Bubbles é ter a segurança de estar ao lado de uma marca forte, reconhecida e em constante crescimento no mercado pet. Seu investimento consistente em marketing e inovação faz com que os produtos tenham alta aceitação e desejo, criando uma conexão natural com os clientes. A cada chegada, percebemos o quanto a marca já é aguardada, existe uma expectativa, um interesse genuíno e uma confiança construída ao longo do tempo. Isso torna nosso trabalho muito mais fluido, fortalecendo parcerias e facilitando o acesso aos clientes. Com a Bubbles, unimos credibilidade, inovação e propósito, levando aos nossos clientes não apenas produtos, mas uma experiência que já é valorizada e esperada pelo mercado.',
  },
] as const

// B12
export const DISTRIBUIDOR_CARE_COMO_FUNCIONA = {
  titulo: 'Como funciona',
  passos: [
    'Você preenche em 1 minuto.',
    'O nosso time de atendimento fala com você no horário comercial.',
    'Uma conversa rápida, por vídeo ou telefone, para montar a sua conta.',
    'Primeiro pedido, treinamento da sua equipe e material de PDV.',
  ],
} as const

// B13 (moldura; o resto do formulário fica em distribuidorCareFormDados.ts)
export const DISTRIBUIDOR_CARE_CADASTRO = { titulo: 'Quero ser distribuidor Care', subtitulo: 'Leva cerca de 1 minuto.' } as const

// B14
export const DISTRIBUIDOR_CARE_FAQ_TITULO = 'Perguntas frequentes'
export const DISTRIBUIDOR_CARE_FAQ = [
  { q: 'Nunca trabalhei com linha pet. Por onde começo?',
    a: 'Por uma conversa com o nosso time. Mostramos quais clientes da sua carteira já podem vender a Care, ajudamos a montar o primeiro pedido e treinamos a sua equipe. Você não começa sozinho.',
    cta: { rotulo: 'Quero começar', href: '#cadastro' } },
  { q: 'Minha equipe trabalha com outros segmentos. Ela consegue vender a Care?',
    a: 'Consegue. A Care é fácil de apresentar: produto profissional, hipoalergênico e vegano, que o tutor já procura. A equipe recebe treinamento, fichas técnicas e material de PDV, e o display no balcão faz boa parte da venda.',
    cta: { rotulo: 'Quero preparar a minha equipe', href: '#cadastro' } },
  { q: 'Já tenho uma marca parecida. Por que a Care?',
    a: 'Porque é a linha profissional que os groomers já usam, agora para o tutor. É hipoalergênica, 100% vegana e cruelty-free, fabricada em indústria própria registrada no MAPA, e a Bubbles® investe em mídia para gerar procura. É um diferencial para o seu cliente, não mais um item igual aos outros.',
    cta: { rotulo: 'Quero ver as condições', href: '#cadastro' } },
  { q: 'E se o produto não girar no meu cliente?',
    a: 'A Bubbles® gera procura com afiliados no TikTok e mídia regional, e o material de PDV coloca o produto à vista no caixa, onde a compra por impulso acontece. O giro costuma ficar entre 45 e 60 dias, e a validade é de 36 meses a partir da fabricação: o estoque não tem pressa.',
    cta: { rotulo: 'Quero falar com o time', href: '#cadastro' } },
  { q: 'O tutor conhece a Bubbles?',
    a: 'Conhece. São mais de 7 anos no mercado, +5.000 groomers usando os produtos e nota 4,9 entre os clientes. O lançamento da Care foi um sucesso com o tutor.',
    cta: { rotulo: 'Quero distribuir a Care', href: '#cadastro' } },
  { q: 'Vocês vendem direto para o meu cliente ou no marketplace?',
    a: 'Protegemos quem distribui com política de preço e poucos distribuidores por região. Os detalhes são apresentados na conversa com o time.',
    cta: { rotulo: 'Quero agendar a conversa', href: '#cadastro' } },
  { q: 'Qual é o investimento para começar?',
    a: 'Use o simulador acima para ver uma estimativa. As condições da sua região são apresentadas pelo time de atendimento.',
    cta: { rotulo: 'Quero simular', href: '#simulador' } },
  { q: 'Que apoio eu recebo depois do primeiro pedido?',
    a: 'Material de PDV, treinamento da equipe, fichas técnicas, materiais informativos e mídia regional.',
    cta: { rotulo: 'Quero esse apoio', href: '#cadastro' } },
  { q: 'Vocês enviam o catálogo antes da conversa?',
    a: 'O catálogo e as condições da sua região são apresentados na conversa com o nosso time, por vídeo ou telefone. É rápido, e você já sai com a sua conta montada.',
    cta: { rotulo: 'Quero agendar a conversa', href: '#cadastro' } },
] as const

// B15
export const DISTRIBUIDOR_CARE_CTA_FINAL = {
  titulo: 'A demanda está criada. Falta a Linha Care chegar aos seus clientes.',
  cta: 'Quero ser distribuidor Care',
  selo: 'Processo seguro e confidencial',
} as const

// B16
export const DISTRIBUIDOR_CARE_RODAPE = {
  linhaLegal: (ano: number) => `© ${ano} Bubbles | CNPJ: 31.900.078/0001-96 | R. Fortunato Zilo, 238 - Vila Antonieta II, Lençóis Paulista - SP | CEP: 18681-200`,
  links: [
    { rotulo: 'Política de Privacidade', href: DISTRIBUIDOR_CARE_LINKS.privacidade },
    { rotulo: 'Termos', href: DISTRIBUIDOR_CARE_LINKS.termos },
  ],
  // [CONFIRMAR COM O GESTOR] ressalva adaptada da /captacao: saíram 3 frases e houve 2 ajustes (pendência 7)
  ressalva: 'Os valores de faturamento e margem apresentados no simulador são estimativas baseadas em médias de mercado e podem variar conforme a gestão e a região. Caso tenha dúvidas sobre os cálculos, margens ou condições comerciais específicas para sua região, fale com o nosso time de atendimento.',
} as const

// F1
export const DISTRIBUIDOR_CARE_BARRA_FIXA = { texto: 'Até 45% de margem com a Linha Care', cta: 'Quero ser distribuidor Care' } as const

// F2
export const DISTRIBUIDOR_CARE_POPUP = {
  titulo: 'Antes de sair: quer ver a sua conta com a Linha Care?',
  cta: 'Quero ver a minha conta',
  recusar: 'Agora não',
} as const

// F3 (sem valores do simulador)
export const DISTRIBUIDOR_CARE_COMPARTILHAR = {
  rotulo: 'Quero enviar para o meu sócio ou diretor',
  mensagem: 'Olha essa oportunidade: distribuir a Linha Care Bubbles com margem de até 45%. Veja a página: https://ofertas.bubbles.com.br/distribuidor-care?utm_source=whatsapp&utm_medium=compartilhar&utm_campaign=distribuidor-care',
} as const

// Mídias: trocar placeholder por arquivo é mudar uma linha (null pelo caminho, sempre com nome -v1).
export type CodigoMidia = 'P-01' | 'P-02' | 'P-03' | 'P-04' | 'P-05' | 'P-06' | 'P-07' | 'P-08'

export const DISTRIBUIDOR_CARE_MIDIA = {
  'P-01': { tipo: 'foto', descricao: 'Foto: Linha Care num display de balcão', dimensoes: 'Desktop 1200×900 (4:3) · celular 800×1000 (4:5)',
            desktop: null as string | null,   // '/images/distribuidor-care/care-display-balcao-desktop-v1.webp'
            mobile: null as string | null },  // '/images/distribuidor-care/care-display-balcao-mobile-v1.webp'
  'P-02': { tipo: 'video', descricao: 'Vídeo de demonstração: textura, espuma e resultado', dimensoes: 'Desktop 1920×1080 (16:9) · celular 1080×1350 (4:5)',
            desktop: null as string | null, mobile: null as string | null,
            posterDesktop: null as string | null, posterMobile: null as string | null },
  'P-03': { tipo: 'video', descricao: 'Vídeo de cliente usando o produto', dimensoes: '1080×1920 (9:16)', src: null as string | null },
  'P-04': { tipo: 'foto', descricao: 'Foto: display de balcão no caixa de um pet shop real', dimensoes: '800×800 (1:1)', src: null as string | null },
  'P-05': { tipo: 'foto', descricao: 'Foto: Linha Care na gôndola, com régua ou wobbler', dimensoes: '800×800 (1:1)', src: null as string | null },
  'P-06': { tipo: 'foto', descricao: 'Foto de kit, quando a loja não tiver imagem', dimensoes: '800×800 (1:1)', src: null as string | null },
  'P-07': { tipo: 'foto', descricao: 'Imagem Open Graph gerada por código', dimensoes: '1200×630', src: null as string | null },
  'P-08': { tipo: 'foto', descricao: 'Poster do vídeo institucional', dimensoes: '1280×720', src: null as string | null },
} as const
