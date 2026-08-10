// src/lib/pet-south.ts
// Dados isolados da LP institucional PET South America (captação de distribuidores/lojistas).
// Não misturar com outras LPs.
import { BRAND } from '@/lib/constants'

export const PET_SOUTH = {
  slug: 'pet-south',
  whatsapp: 'https://wa.me/5514996312932',
} as const

export const PET_SOUTH_MARQUEE = [
  '🔥 LANÇAMENTO NOVA LINHA CARE',
  'Condições Especiais para Distribuidores & Lojistas',
  'Markup Médio de 80%',
  'Duas Linhas Profissionais',
  'Reunião Presencial no Estande',
  'Kits de Banhos Sensoriais',
  'Linha de Coloração',
  'Linha Home Care',
  'Até 70% Recompra',
  'Suporte no Sell-out',
  'Material de PDV Gratuito',
] as const

// Linhas em destaque no carrossel do Hero.
export const PET_SOUTH_HERO_LINES = [
  {
    name: 'Linha PRO',
    desc: 'Máximo rendimento e alta diluição 1:10 para estéticas',
    imgDesktop: '/images/distribuidores/bubbles-linha-pro-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-linha-pro-mobile.webp',
  },
  {
    name: 'Essential',
    desc: 'O melhor custo-benefício de alta rotação',
    imgDesktop: '/images/distribuidores/bubbles-linha-essential-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-linha-essential-mobile.webp',
  },
  {
    name: 'Xperience',
    desc: 'Sensorial premium e fixação prolongada',
    imgDesktop: '/images/distribuidores/bubbles-linha-xperience-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-linha-xperience-mobile.webp',
  },
  {
    name: 'Collora',
    desc: 'Tratamento de cor e brilho tridimensional',
    imgDesktop: '/images/distribuidores/bubbles-kit-collora-desktop.webp',
    imgMobile: '/images/distribuidores/bubbles-kit-collora-mobile.webp',
  },
] as const

// Ecossistema da feira: números do lado direito da seção.
export const PET_SOUTH_FAIR_STATS = [
  { value: '32.650+', label: 'Profissionais', sub: 'Visitantes qualificados no evento' },
  { value: '272+', label: 'Expositores', sub: 'Líderes de mercado reunidos' },
  { value: '976', label: 'Cidades', sub: 'Cobertura em todos os estados' },
  { value: '83%', label: 'Concentração Sudeste', sub: 'Alto poder de compra regional' },
] as const

export const PET_SOUTH_FAIR_BULLETS = [
  { title: 'Lançamento Exclusivo da Linha Care:', text: 'Acesso em primeira mão à nova linha de cosmética e cuidados especiais.' },
  { title: 'Condições Especiais para a Feira:', text: 'Descontos exclusivos, prazos estendidos e bonificação em estoque para reuniões agendadas.' },
  { title: 'Atendimento para Distribuidores & Lojistas:', text: 'Condições comerciais diferenciadas e suporte direto dos executivos da fábrica.' },
] as const

// Grade das 11 SKUs da Linha Care, agrupadas por categoria.
export const PET_SOUTH_CARE_CATEGORIES = [
  {
    num: '01',
    title: 'Shampoos (300ml)',
    tag: '3 SKUs Essenciais',
    items: ['Limpeza Profunda', 'Neutro de Uso Diário', 'Pelos Claros'],
  },
  {
    num: '02',
    title: 'Condicionamento',
    tag: '2 SKUs de Alta Nutrição',
    items: ['Condicionador Hidratante (250ml)', 'Máscara Multifuncional (100ml)'],
  },
  {
    num: '03',
    title: 'Finalizadores',
    tag: '2 SKUs de Praticidade',
    items: ['Secagem Rápida Leave-in (100ml)', 'Banho a Seco Desembaraçador (250ml)'],
  },
  {
    num: '04',
    title: 'Cuidados Específicos',
    tag: '2 SKUs Dermocosméticos',
    items: ['Limpeza de Olhos e Ouvidos (100ml)', 'Hidratante de Patas e Focinhos (50ml)'],
  },
  {
    num: '05',
    title: 'Body Splash',
    tag: '2 SKUs Alta Fixação',
    items: ['Body Splash Flora Pet (80ml)', 'Body Splash Pet Luna (80ml)'],
  },
] as const

export const PET_SOUTH_DEMAND_STATS = [
  { value: '+2.665', label: 'Afiliados Ativos' },
  { value: '+3.500', label: 'Vídeos & Lives' },
  { value: '4.9 / 5.0', label: 'Satisfação Tutores' },
] as const

// Diferenciais competitivos.
export const PET_SOUTH_WHY_CHOOSE = [
  { icon: 'DollarSign', title: 'Markup Médio de 80%', text: 'Excelente rentabilidade com precificação tabelada para proteger o distribuidor contra a concorrência desleal.' },
  { icon: 'Award', title: 'Linha Completa & Até 70% Recompra', text: 'Duas linhas profissionais completas, kits de banhos sensoriais, linha de coloração e linha home care com alta taxa de recompra.' },
  { icon: 'Truck', title: 'Logística & Entrega Ágil', text: 'Faturamento rápido direto da fábrica para garantir que a sua equipe de vendas nunca fique desabastecida.' },
  { icon: 'Users', title: 'Suporte no Sell-Out', text: 'Materiais de PDV, amostras comerciais, treinamentos técnicos e workshops para capacitar sua equipe comercial.' },
  { icon: 'Shield', title: 'Diversidade & Portfólio Amplo', text: 'Kits sensoriais, coloração, produtos de alta diluição e soluções completas para banho e tosa e revenda final.' },
  { icon: 'Sparkles', title: 'Conceito Vegan & Cruelty-Free', text: 'Produtos 100% livres de crueldade e de parabenos, alinhados às exigências ecológicas e premium do mercado atual.' },
] as const

// Estatísticas "Nossa Essência" (mesmos números da marca em CARE_BRAND_STATS/BRAND).
export const PET_SOUTH_BRAND_STATS = [
  { icon: 'Clock', val: BRAND.years, label: 'Tempo de Mercado', desc: 'Pioneirismo e Inovação' },
  { icon: 'Star', val: BRAND.rating, label: 'NPS e Satisfação', desc: 'Aprovação Máxima' },
  { icon: 'Users', val: BRAND.groomers, label: 'Base de Groomers', desc: 'Especialistas de Elite' },
  { icon: 'Heart', val: BRAND.clients, label: 'Clientes Ativos', desc: 'Tutores Apaixonados' },
  { icon: 'Package', val: BRAND.products, label: 'Mix de Soluções', desc: 'Produtos Exclusivos' },
] as const

export const PET_SOUTH_FAQ = [
  {
    q: 'Qual é o investimento mínimo para iniciar?',
    a: 'O investimento inicial padrão em estoque é de R$ 10.000,00. No entanto, para contatos iniciados via PET South America, oferecemos condições especiais de parcelamento e suporte em material de divulgação.',
  },
  {
    q: 'Quais são as principais linhas de produtos da Bubbles®?',
    a: 'Oferecemos duas linhas profissionais completas para centros estéticos, kits de banhos sensoriais, linha de coloração e uma linha completa para home care.',
  },
  {
    q: 'A fábrica fornece suporte de marketing e treinamento?',
    a: 'Sim! Disponibilizamos catálogo impresso e digital, vídeos demonstrativos, fotos em alta resolução, amostras grátis para prospecção e treinamento técnico para sua equipe de vendas.',
  },
  {
    q: 'Posso vender tanto para pet shops quanto para estéticas veterinárias?',
    a: 'Com certeza. Nossas linhas atendem desde grandes centros estéticos profissionais (linha PRO e Xperience em alta diluição) até o varejo de autosserviço (linhas para homecare).',
  },
] as const

// Opções do passo 4 do formulário (modelo comercial atual).
export const PET_SOUTH_BUSINESS_MODELS = [
  { value: 'Distribuidora de Cosméticos Pet', label: 'Distribuidora Exclusiva de Cosméticos Pet' },
  { value: 'Distribuidora Multimarcas Pet', label: 'Distribuidora Multimarcas Pet' },
  { value: 'Representante Comercial', label: 'Representante Comercial com Carteira' },
  { value: 'Novo Empreendedor', label: 'Novo Empreendedor iniciando no setor' },
] as const
