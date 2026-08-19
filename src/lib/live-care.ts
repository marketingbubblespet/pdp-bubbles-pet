// src/lib/live-care.ts
// Dados isolados da LP da Live de Lançamento da Linha Care (não misturar com outras LPs).
// Planejamento completo em docs/lives/plano-lp-live-care.md
import { BRAND } from '@/lib/constants'

export const LIVE_CARE = {
  slug: 'live-care',
  date: '23/08',
  dateFull: '23 de agosto',
  weekday: 'domingo',
  time: '19h',
  timezone: 'horário de Brasília',
  duration: '1 hora',
  platform: 'Instagram',

  // Início e fim reais da transmissão. O fim controla a troca de estado da página
  // (antes, durante e depois da live).
  targetDateISO: '2026-08-23T19:00:00-03:00',
  endDateISO: '2026-08-23T20:00:00-03:00',

  hosts: 'Amanda Moreth e Ellen Lourenção',
  whatsappGroupUrl: 'https://chat.whatsapp.com/EMFIIEEEzovLfLT5veZVBW',
  instagramUrl: BRAND.instagram,

  // WhatsApp de dúvida (atendimento), diferente do link do grupo.
  whatsappDoubtUrl: BRAND.whatsapp,
  whatsappDoubtMsg: 'Olá! Tenho uma dúvida sobre a live de lançamento da Linha Care.',

  socialProof: BRAND.groomers, // '+5.000'
} as const

// Motivos para assistir (textos do briefing, títulos encurtados para leitura rápida)
export const LIVE_CARE_REASONS = [
  {
    icon: 'Sparkles',
    title: 'Uma linha feita para prolongar o resultado do banho',
    text: 'Produtos que ajudam o tutor a manter em casa a aparência, o perfume e o cuidado conquistados no banho e tosa.',
  },
  {
    icon: 'Target',
    title: 'Recomendações mais assertivas',
    text: 'Entenda como indicar o produto adequado para cada pet e transformar seu conhecimento profissional em uma experiência ainda melhor para o cliente.',
  },
  {
    icon: 'TrendingUp',
    title: 'Mais oportunidades de ganho',
    text: 'Veja como a Linha Care pode gerar novas vendas e ampliar o faturamento do banho e tosa por meio da indicação de produtos para home care.',
  },
  {
    icon: 'Award',
    title: 'Um atendimento que se diferencia',
    text: 'Ofereça uma solução completa: o cuidado começa no seu espaço e continua na casa do tutor, fortalecendo sua autoridade como profissional.',
  },
  {
    icon: 'Star',
    title: 'O lançamento em primeira mão',
    text: 'Saiba quais são os produtos, benefícios e formas de apresentar a Bubbles Care aos clientes antes que todo mundo conheça.',
  },
] as const

// Vitrine da linha. Sem preço e sem link: a compra acontece na live, com o cupom liberado
// ao vivo. As 11 fotos já existem em public/images/care/.
export const LIVE_CARE_PRODUCTS = [
  { nome: 'Shampoo Neutro', volume: '300ml', imagem: '/images/care/care_shampoo-neutro_300ml.webp' },
  { nome: 'Shampoo Limpeza Profunda', volume: '300ml', imagem: '/images/care/care_shampoo-limpeza-profunda_300ml.webp' },
  { nome: 'Shampoo Pelos Claros', volume: '300ml', imagem: '/images/care/care_shampoo-pelos-claros_300ml.webp' },
  { nome: 'Condicionador Hidratante', volume: '250ml', imagem: '/images/care/care_condicionador-hidratante_300ml.webp' },
  { nome: 'Máscara Multifuncional', volume: '100ml', imagem: '/images/care/care_mascara-multifuncional_100ml.webp' },
  { nome: 'Secagem Rápida', volume: '100ml', imagem: '/images/care/care_acelerador-de-secagem_100ml.webp' },
  { nome: 'Banho a Seco Desembaraçador', volume: '250ml', imagem: '/images/care/care_banho-a-seco_300ml.webp' },
  { nome: 'Limpeza de Olhos e Ouvidos', volume: '100ml', imagem: '/images/care/care_limpeza-olhos-e-ouvidos_100ml.webp' },
  { nome: 'Hidratante de Patas e Focinhos', volume: '50ml', imagem: '/images/care/care_hidratante-patas-focinho_50ml.webp' },
  { nome: 'Body Splash Flora', volume: '80ml', imagem: '/images/care/care_body-splash-flora_80ml.webp' },
  { nome: 'Body Splash Luna', volume: '80ml', imagem: '/images/care/care_body-splash-luna_80ml.webp' },
] as const

// Por que entrar no grupo: a ponte entre "assistir no Instagram" e "entrar no WhatsApp".
export const LIVE_CARE_GROUP_BENEFITS = [
  {
    icon: 'BellRing',
    title: 'Lembrete na hora certa',
    text: 'A gente te avisa quando a transmissão começar. Você não perde o horário no meio do domingo.',
  },
  {
    icon: 'Tag',
    title: 'Promoções exclusivas',
    text: 'Cupons e condições de lançamento circulam primeiro no grupo, antes de qualquer outro canal.',
  },
  {
    icon: 'Users',
    title: 'Comunidade de groomers',
    text: 'Troca de informação com profissionais atuantes de todo o Brasil, todos os dias, não só no dia da live.',
  },
] as const

// Apresentadoras. [AGUARDANDO] fotos reais: não inventar credencial de pessoa real.
// Enquanto photo for null, o componente mostra um placeholder visual.
export const LIVE_CARE_HOSTS = [
  {
    name: 'Amanda Moreth',
    role: 'Analista Comercial',
    photo: null,
    bio: 'Estou na Bubbles há 6 meses, atuando no atendimento comercial e Sucesso do Cliente. No dia a dia, acompanho de perto os groomers, ouvindo suas necessidades e construindo uma relação próxima com quem faz o setor acontecer.',
    quote: 'Já converso com muitos de vocês todos os dias, mas quero esse encontro ao vivo para uma troca ainda mais sincera, celebrar nossa profissão e contar todas as novidades da linha Care.',
  },
  {
    name: 'Ellen Lourenção',
    role: 'Líder de SAC e P&D',
    photo: null,
    bio: 'Líder de SAC na Bubbles, com atuação próxima aos clientes e profissionais do setor. À frente do Sucesso do Cliente, acompanha de perto suas necessidades, experiências e feedbacks, contribuindo também para a evolução dos produtos junto ao P&D.',
    quote: 'Estar perto dos nossos clientes é o que realmente nos permite entender suas necessidades. Essa live é uma oportunidade de reconhecer e valorizar quem inspira a Bubbles todos os dias.',
  },
] as const

// Público. Lista só inclusiva: a live é porta de entrada, então não existe coluna de
// "para quem não é", que aqui só afastaria gente do topo do funil.
export const LIVE_CARE_AUDIENCE = [
  'Groomer que quer aumentar o faturamento sem aumentar a agenda',
  'Dono de pet shop procurando uma nova frente de receita',
  'Profissional que quer se diferenciar da concorrência da região',
  'Quem ainda não conhece a Bubbles e quer conhecer a marca',
  'Quem já é cliente e quer ser o primeiro a trabalhar com a Care',
] as const

// O que acontece só ao vivo (combate o no-show).
export const LIVE_CARE_PRIZES = [
  { icon: 'Gift', label: 'Brindes' },
  { icon: 'PartyPopper', label: 'Sorteio ao vivo' },
  { icon: 'Ticket', label: 'Cupons de lançamento' },
] as const

// FAQ. A pergunta de replay ficou de fora de propósito: o briefing não respondeu se a
// live fica salva, e prometer o que não se confirma quebra a confiança.
export const LIVE_CARE_FAQ = [
  {
    q: 'Quando e onde é a live?',
    a: 'Domingo, 23 de agosto, às 19h (horário de Brasília), ao vivo no Instagram da Bubbles.',
  },
  {
    q: 'Preciso pagar alguma coisa?',
    a: 'Não. A live é totalmente gratuita e aberta a qualquer profissional.',
  },
  {
    q: 'Por que preciso entrar no grupo do WhatsApp?',
    a: 'É no grupo que avisamos a hora da live e liberamos os cupons e as condições de lançamento. Entrar no grupo é a forma de não perder nada.',
  },
  {
    q: 'Preciso ser cliente Bubbles?',
    a: 'Não. A live é aberta a todo groomer e tosador, sendo cliente ou não.',
  },
  {
    q: 'Quanto tempo dura?',
    a: 'Cerca de 1 hora, com espaço para perguntas durante a transmissão.',
  },
  {
    q: 'Como concorro ao sorteio?',
    a: 'Assistindo ao vivo no Instagram. Os sorteios acontecem durante a transmissão.',
  },
  {
    q: 'Vai ter desconto na linha?',
    a: 'As condições especiais de lançamento são apresentadas durante a live, junto com os kits prontos da Linha Care.',
  },
] as const
