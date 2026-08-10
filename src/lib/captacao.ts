// src/lib/captacao.ts
// Dados isolados da LP de captação de distribuidores Bubbles (revenda B2B).
// Não misturar com outras LPs.
import { BRAND } from '@/lib/constants'

export const CAPTACAO = {
  slug: 'captacao',
  tagline: 'Domine a sua região com a marca que define o padrão do cosmético pet.',
  whatsapp: 'https://wa.me/5514996312932',
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
  'Produtos Fáceis de Vender',
  'Produto Favorito dos Groomers',
  'Produtos de Alta Recorrência',
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

// Sem logo em SVG por linha disponível em public/images: exibimos o nome da linha em
// texto (ver AGENTS/relatório final). Cores mantidas fiéis ao original.
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
  },
  {
    name: 'Essential',
    target: 'Pet Shops em Crescimento',
    pos: 'Linha premium com preço acessível: o equilíbrio perfeito entre custo-benefício e alto desempenho profissional.',
    visual: 'Embalagem rosa/neutra, tom amigável.',
    highlightLabel: 'Recorrência',
    highlightValue: 'Alta rotatividade e aceitação imediata.',
    quote: 'Qualidade Bubbles com o melhor custo por banho',
    accent: '#F4CDD4',
  },
  {
    name: 'Xperience',
    target: 'Experiência Sensorial',
    pos: 'Focada em posicionamento de mercado, diferenciação da concorrência e aumento imediato do ticket médio do banho e tosa.',
    visual: 'Uma explosão de experiências, com embalagens dinâmicas.',
    highlightLabel: 'Tecnologia',
    highlightValue: 'Formulada com as últimas tendências do mercado mundial de cosmética.',
    quote: 'Seu pet vai cheirar tão bem que vão perguntar o segredo',
    accent: '#C8A96E',
  },
  {
    name: 'Collora',
    target: 'Estética Criativa',
    pos: 'Coloração pet profissional, segura e vibrante.',
    visual: 'Embalagens vibrantes com conceito arco-íris.',
    highlightLabel: 'Inovação',
    highlightValue: 'Transforme a pelagem em arte com segurança.',
    quote: 'Transforme a pelagem em arte com segurança comprovada',
    accent: '#B066C6',
  },
] as const

export const CAPTACAO_PROFITABILITY_ITEMS = [
  { icon: 'BarChart3', title: 'Ganhos Exponenciais', desc: 'Estrutura de preços desenhada para o seu crescimento.' },
  { icon: 'Zap', title: 'Giro de Estoque', desc: 'Produtos de alta recorrência e aceitação imediata.' },
  { icon: 'Shield', title: 'Segurança de Mercado', desc: 'Política rígida de controle de preço mínimo de venda, protegendo o distribuidor contra a canibalização de preços.' },
  { icon: 'Users', title: 'Fidelização', desc: 'O profissional que usa Bubbles não aceita substitutos.' },
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
    desc: 'Produtos com taxa de fidelidade superior a 90%. O sell-in é consequência natural de um sell-out forte e recorrente. Uma vez que o groomer testa Bubbles, ele se torna um embaixador da marca, garantindo pedidos de reposição automáticos.',
    icon: 'TrendingUp',
  },
] as const

export const CAPTACAO_SUPPORT_ITEMS = [
  { icon: 'Truck', title: 'Expedição em 5 Dias Úteis', desc: 'Agilidade logística para garantir que seu estoque nunca fique zerado.' },
  { icon: 'TrendingUp', title: 'Fácil Positivação', desc: 'Produtos com alta taxa de aceitação inicial e recompra garantida pelos groomers.' },
  { icon: 'Award', title: 'Certificações de Elite', desc: 'Produtos veganos e cruelty free: diferenciais éticos que fecham negócios.' },
] as const

export const CAPTACAO_TESTIMONIALS = [
  {
    name: 'MANTYPET',
    text: 'Ser distribuidor da Bubbles tem se mostrado uma experiência extremamente enriquecedora e estratégica, marcada por aprendizado constante e resultados positivos desde o início, mesmo sem experiência prévia no segmento de banho e tosa. O suporte próximo e eficiente da equipe Bubbles, aliado à excelência dos produtos, nos transmite total segurança operacional e fortalece nossa atuação comercial, refletindo diretamente na alta aceitação e satisfação dos clientes.',
  },
  {
    name: 'Assispet',
    text: 'A Bubbles se tornou em pouco tempo um dos nossos principais fornecedores, um grande parceiro que veio pra somar trabalho e resultado em nossa distribuidora, com excelente atendimento e suporte de toda equipe, uma empresa com um leque imenso de produtos, sempre trazendo novidades ao mercado pet.',
  },
  {
    name: 'SERRAPET',
    text: 'Ser distribuidor Bubbles vai muito além de vender produtos, é viver, na prática, a transformação que eles causam. É acompanhar de perto aquele pet que chega para o banho e sai renovado, com o pelo macio, brilho evidente e um perfume que realmente marca. Ser Bubbles é criar conexão com os pet shops, com os groomers e com cada cliente que volta justamente pela experiência que teve.',
  },
  {
    name: 'TOPET',
    text: 'Trabalhar com a Bubbles é ter a segurança de estar ao lado de uma marca forte, reconhecida e em constante crescimento no mercado pet. Seu investimento consistente em marketing e inovação faz com que os produtos tenham alta aceitação e desejo, criando uma conexão natural com os clientes.',
  },
] as const

export const CAPTACAO_BUSINESS_MODELS = [
  { id: 'fisico', label: 'Distribuição Física' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'ambos', label: 'Ambos (Físico e E-commerce)' },
] as const
