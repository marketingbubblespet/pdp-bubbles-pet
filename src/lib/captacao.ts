// src/lib/captacao.ts
// Dados isolados da LP de captação de distribuidores Bubbles (revenda B2B).
// Não misturar com outras LPs.
import { BRAND } from '@/lib/constants'

export const CAPTACAO = {
  slug: 'captacao',
  tagline: 'Domine a sua região com a marca que define o padrão do cosmético pet.',
  whatsapp: 'https://wa.me/5514997023387',
  whatsappMsgQualificado: (id: string) =>
    `Olá! Preenchi o formulário de distribuidor Bubbles e gostaria de falar sobre a minha candidatura. ID: ${id}`,
  whatsappMsgNaoQualificado: (id: string) =>
    `Olá! Preenchi o formulário de distribuidor Bubbles e gostaria de comprar produtos com condições diferenciadas e exclusivas. ID: ${id}`,
} as const

export const CAPTACAO_BENEFITS_MARQUEE = [
  'Margens de Lucro Superiores',
  'Suporte de Marketing 360º',
  'Logística Ágil',
  'Treinamento Técnico',
  'Produtos Veganos',
  'Alta Diluição 1:10',
  'Fragrâncias Exclusivas',
  'Material de PDV Gratuito',
  'Produtos fáceis de vender',
  'Produto Favorito dos Groomers',
  'Produtos de alta recorrência',
  'Alta Taxa de Positivação',
  'Suporte no Sell-out',
  'Fácil Positivação',
  'Alta Recompra',
  'Cruelty Free',
] as const

// Imagens desktop/mobile já copiadas para public/images/distribuidores/
export const CAPTACAO_HERO_LINES = [
  {
    name: 'Linha PRO',
    desc: 'Máximo rendimento para profissionais',
    imgDesktop: '/images/distribuidores/bubbles-linha-pro-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-linha-pro-mobile.webp',
    overlay: 'A linha preferida dos maiores centros de estética do país.',
  },
  {
    name: 'Essential',
    desc: 'O melhor custo-benefício do mercado',
    imgDesktop: '/images/distribuidores/bubbles-linha-essential-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-linha-essential-mobile.webp',
    overlay: 'Volume industrial com a qualidade que o seu cliente exige.',
  },
  {
    name: 'Xperience',
    desc: 'Sensorial premium e fragrâncias únicas',
    imgDesktop: '/images/distribuidores/bubbles-linha-xperience-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-linha-xperience-mobile.webp',
    overlay: 'Fragrâncias que fixam por dias e fidelizam o tutor.',
  },
  {
    name: 'Collora',
    desc: 'Tratamento de cor e brilho intenso',
    imgDesktop: '/images/distribuidores/bubbles-kit-collora-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-kit-collora-mobile.webp',
    overlay: 'Tecnologia de pigmentação segura e brilho tridimensional.',
  },
] as const

// Logos das linhas em public/images/distribuidores/logos-linhas/ (vindos do CDN da loja).
// O logo da Care também está salvo lá, mas a linha ainda não entra nesta lista.
export const CAPTACAO_PRODUCT_LINES = [
  {
    name: 'PRO',
    target: 'Groomers Avançados',
    pos: 'Alta performance, resultado técnico superior.',
    visual: 'Embalagem preta, tom sério e técnico.',
    highlightLabel: 'Diluição',
    highlightValue: '1:10 (rende até 550 banhos/5L).',
    quote: 'Para quem não aceita menos que o melhor',
    accent: '#FFFFFF',
    logo: '/images/distribuidores/logos-linhas/pro.svg',
  },
  {
    name: 'Essential',
    target: 'Pet Shops em Crescimento',
    pos: 'Linha Premium com preço acessível. O equilíbrio perfeito entre custo-benefício e alto desempenho profissional.',
    visual: 'Embalagem rosa/neutra, tom amigável.',
    highlightLabel: 'Recorrência',
    highlightValue: 'Alta rotatividade e aceitação imediata.',
    quote: 'Qualidade Bubbles com o melhor custo por banho',
    accent: '#F4CDD4',
    logo: '/images/distribuidores/logos-linhas/essential.svg',
  },
  {
    name: 'Xperience',
    target: 'Experiência Sensorial',
    pos: 'Focada em posicionamento de mercado, diferenciação da concorrência e aumento imediato do ticket médio do banho e tosa.',
    visual: 'Uma explosão de experiências. Embalagens dinâmicas que podem assumir todas as cores.',
    highlightLabel: 'Tecnologia',
    highlightValue: 'Formulada com as últimas novidades e tendências do mercado mundial de cosmética.',
    quote: 'Seu pet vai cheirar tão bem que vão perguntar o segredo',
    accent: '#C8A96E',
    logo: '/images/distribuidores/logos-linhas/xperience.svg',
  },
  {
    name: 'Collora',
    target: 'Estética Criativa',
    pos: 'Coloração pet profissional segura e vibrante.',
    visual: 'Embalagens vibrantes com conceito arco-íris.',
    highlightLabel: 'Inovação',
    highlightValue: 'Transforme a pelagem em arte com segurança.',
    quote: 'Transforme a pelagem em arte com segurança comprovada',
    accent: '#B066C6',
    logo: '/images/distribuidores/logos-linhas/collora.svg',
  },
] as const

export const CAPTACAO_PROFITABILITY_ITEMS = [
  { icon: 'BarChart3', title: 'Ganhos Exponenciais', desc: 'Estrutura de preços desenhada para o seu crescimento.' },
  { icon: 'Zap', title: 'Giro de Estoque', desc: 'Produtos de alta recorrência e aceitação imediata.' },
  { icon: 'Shield', title: 'Segurança de Mercado', desc: 'Segurança de Margem - Política rígida de controle de preço mínimo de venda (protegendo o distribuidor contra a canibalização de preços).' },
  { icon: 'Users', title: 'Fidelização', desc: 'O profissional que usa Bubbles® não aceita substitutos.' },
] as const

export const CAPTACAO_PROFITABILITY_LIST = [
  'Margens de lucro estruturadas para escala',
  'Payback do investimento inicial em tempo recorde',
  'Bonificações por metas atingidas*',
  'Apoio em feiras e eventos regionais',
] as const

// Reaproveita os números institucionais oficiais da marca (BRAND) na seção "Quem é a Bubbles".
export const CAPTACAO_BRAND_STATS = [
  { icon: 'Clock', val: BRAND.years, label: 'Tempo de Mercado', desc: 'Pioneirismo e Inovação' },
  { icon: 'Star', val: BRAND.rating, label: 'NPS e Satisfação', desc: 'Aprovação Máxima' },
  { icon: 'Users', val: BRAND.groomers, label: 'Base de Groomers', desc: 'Especialistas de Elite' },
  { icon: 'Heart', val: BRAND.clients, label: 'Clientes Ativos', desc: 'Tutores Apaixonados' },
  { icon: 'Package', val: BRAND.products, label: 'Mix de Soluções', desc: 'Produtos Exclusivos' },
] as const

export const CAPTACAO_COMMUNITY_ITEMS = [
  {
    title: 'Marketing Ativo',
    desc: 'Acesso a criativos semanais, fotos profissionais e vídeos para suas redes sociais. Suporte total para o seu sell-out. Nossa equipe de design e copy cria materiais prontos para você postar e vender, garantindo que a marca esteja sempre em evidência na sua região.',
    icon: 'Instagram',
  },
  {
    title: 'Suporte Técnico',
    desc: 'Canal direto com especialistas para sanar dúvidas de aplicação e diluição. Treinamento contínuo para sua equipe comercial e técnica. Entendemos que o conhecimento técnico é a base da venda consultiva no mercado pet de alto padrão.',
    icon: 'HelpCircle',
  },
  {
    title: 'Tecnologias Exclusivas',
    desc: 'Tecnologia de fragrâncias de longa duração e fórmulas de alta performance que criam desejo no tutor final. Nossos produtos utilizam ativos de cosmética humana adaptados para o pH animal, entregando resultados visíveis desde o primeiro banho.',
    icon: 'Award',
  },
  {
    title: 'Plataforma Completa',
    desc: 'Treinamentos de gestão, vendas e processos para acelerar o crescimento do seu negócio de distribuição. Ensinamos desde a contratação de vendedores até a gestão de estoque e fluxo de caixa, resolvendo as principais dores do distribuidor moderno.',
    icon: 'GraduationCap',
  },
  {
    title: 'Alta Recompra',
    desc: 'Produtos com taxa de fidelidade superior a 90%. O sell-in é consequência natural de um sell-out forte e recorrente. Uma vez que o groomer testa Bubbles®, ele se torna um embaixador da marca, garantindo pedidos de reposição automáticos.',
    icon: 'TrendingUp',
  },
] as const

export const CAPTACAO_SUPPORT_ITEMS = [
  { icon: 'Truck', title: 'Expedição em 5 Dias úteis', desc: 'Agilidade logística para garantir que seu estoque nunca fique zerado.' },
  { icon: 'TrendingUp', title: 'Fácil Positivação', desc: 'Produtos com alta taxa de aceitação inicial e recompra garantida pelos groomers.' },
  { icon: 'Award', title: 'Certificações de Elite', desc: 'Produtos Veganos e Cruelty-Free. Diferenciais éticos que fecham negócios.' },
] as const

export const CAPTACAO_TESTIMONIALS = [
  {
    name: 'MANTYPET',
    text: 'Ser distribuidor da Bubbles tem se mostrado uma experiência extremamente enriquecedora e estratégica, marcada por aprendizado constante e resultados positivos desde o início, mesmo sem experiência prévia no segmento de banho e tosa. O suporte próximo e eficiente da equipe Bubbles, aliado à excelência dos produtos, nos transmite total segurança operacional e fortalece nossa atuação comercial, refletindo diretamente na alta aceitação e satisfação dos clientes.',
  },
  {
    name: 'Assispet',
    text: 'a Bubbles se tornou em pouco tempo um dos nossos principais fornecedores, um grande parceiro que veio pra somar trabalho e resultado em nossa distribuidora, com excelente atendimento e suporte de toda equipe, uma empresa com um leque imenso de produtos, sempre trazendo novidades ao mercado pet.',
  },
  {
    name: 'SERRAPET',
    text: 'Ser distribuidor Bubbles vai muito além de vender produtos, é viver, na prática, a transformação que eles causam. É acompanhar de perto aquele pet que chega para o banho e sai renovado, com o pelo macio, brilho evidente e um perfume que realmente marca. É ver o olhar do cliente mudar, o elogio espontâneo surgir e saber que você fez parte daquela experiência. No dia a dia, é sentir a diferença na rotina dos profissionais: produtos que rendem, que facilitam o trabalho e elevam o padrão do atendimento. É perceber que não se trata só de estética, mas de cuidado, bem-estar e valorização do serviço prestado. Ser Bubbles é criar conexão com os pet shops, com os groomers e com cada cliente que volta justamente pela experiência que teve. É ter orgulho de representar algo que entrega resultado de verdade, que fideliza e que faz o negócio crescer junto. No fim, ser distribuidor Bubbles é isso: não é só sobre o que você entrega… é sobre o que as pessoas sentem depois, pois a satisfação do cliente do meu cliente é a minha satisfação.',
  },
  {
    name: 'TOPET',
    text: 'Trabalhar com a Bubbles é ter a segurança de estar ao lado de uma marca forte, reconhecida e em constante crescimento no mercado pet. Seu investimento consistente em marketing e inovação faz com que os produtos tenham alta aceitação e desejo, criando uma conexão natural com os clientes. A cada chegada, percecebemos o quanto a marca já é aguardada, existe uma expectativa, um interesse genuíno e uma confiança construída ao longo do tempo. Isso torna nosso trabalho muito mais fluido, fortalecendo parcerias e facilitando o acesso aos clientes. Com a Bubbles, unimos credibilidade, inovação e propósito, levando aos nossos clientes não apenas produtos, mas uma experiência que já é valorizada e esperada pelo mercado.',
  },
] as const

// Só "Distribuição Física": as opções E-commerce e Ambos atraíam lojistas 100% online,
// fora do foco de distribuição regional. O valor enviado (modelo_negocio) não muda.
export const CAPTACAO_BUSINESS_MODELS = [
  { id: 'fisico', label: 'Distribuição Física' },
] as const

// Fotos do selo "+150 Parceiros" na primeira dobra.
export const CAPTACAO_PARCEIROS_FOTOS = [
  '/images/distribuidores/parceiros/parceiro-1.jpg',
  '/images/distribuidores/parceiros/parceiro-2.jpg',
  '/images/distribuidores/parceiros/parceiro-3.jpg',
] as const

// Vídeo de fundo da seção "Quem é a Bubbles" (Linha PRO, mesmo da página de referência).
export const CAPTACAO_VIDEO_QUEM_SOMOS = '/videos/captacao-linha-pro.mp4'
