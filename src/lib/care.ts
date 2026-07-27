// src/lib/care.ts
// Dados isolados da LP de lançamento Bubbles Care (revenda para petshops).
// Não misturar com outras LPs. Itens marcados [AGUARDANDO INFORMAÇÕES] ou "a confirmar"
// devem ser preenchidos/validados antes desta página sair do pré-lançamento.
import { BRAND } from '@/lib/constants'

export const CARE = {
  slug: 'care',
  tagline: 'A linha que transforma cada banho em faturamento extra.',
  whatsapp: BRAND.whatsapp,
  whatsappMsg: 'Olá! Quero saber como revender a linha Bubbles Care no meu petshop.',
} as const

// Números da máquina de demanda (TikTok Shop), vindos do briefing, confirmar antes de publicar.
// Valores numéricos (sem formatação) para alimentar o contador animado (CountUp).
export const CARE_DEMAND = {
  afiliados: 2665,
  vendas3meses: 1200,
  videos: 3500,
} as const

export const CARE_CATEGORIES = [
  { id: 'shampoo', label: 'Shampoos' },
  { id: 'condicionamento', label: 'Condicionamento e Hidratação' },
  { id: 'finalizador', label: 'Finalizadores e Leave-ins' },
  { id: 'perfume', label: 'Perfumes' },
  { id: 'cuidado', label: 'Cuidados Específicos' },
] as const

export type CareCategoryId = typeof CARE_CATEGORIES[number]['id']

// Imagens placeholder: reaproveitando fotos reais já existentes no projeto (não há fotos
// dos produtos Care ainda). Trocar por foto real de cada produto assim que chegar.
const PLACEHOLDER_IMAGES = [
  '/images/hero-produto-5l.jpg',
  '/images/masterclass/produto-linha-pro.webp',
  '/images/masterclass/produto-texturizador.webp',
] as const

export const CARE_PRODUCTS = [
  {
    id: 'shampoo-limpeza-profunda',
    nome: 'Shampoo Limpeza Profunda',
    apresentacao: '300ml',
    categoria: 'shampoo',
    descricao: 'Limpa a fundo e ajuda a controlar odores, deixando a pelagem leve, macia e com sensação de limpeza prolongada.',
    imagem: PLACEHOLDER_IMAGES[0],
  },
  {
    id: 'shampoo-neutro',
    nome: 'Shampoo Neutro',
    apresentacao: '300ml',
    categoria: 'shampoo',
    descricao: 'Limpeza suave para o dia a dia, indicada para todos os tipos de pelagem, com fórmula que contribui para maciez, brilho e toque agradável.',
    imagem: PLACEHOLDER_IMAGES[1],
  },
  {
    id: 'shampoo-pelos-claros',
    nome: 'Shampoo Pelos Claros',
    apresentacao: '300ml',
    categoria: 'shampoo',
    descricao: 'Realça a luminosidade da pelagem clara, branca ou grisalha, com tecnologia óptica que ajuda a minimizar o aspecto amarelado.',
    imagem: PLACEHOLDER_IMAGES[2],
  },
  {
    id: 'condicionador-hidratante',
    nome: 'Condicionador Hidratante',
    apresentacao: '250ml',
    categoria: 'condicionamento',
    descricao: 'Hidrata e desembaraça, reduz os nós e deixa os pelos alinhados, macios e com toque sedoso, com óleo de argan e girassol.',
    imagem: PLACEHOLDER_IMAGES[0],
  },
  {
    id: 'mascara-multifuncional',
    nome: 'Máscara Multifuncional',
    apresentacao: '100ml',
    categoria: 'condicionamento',
    descricao: 'Hidratação e nutrição intensivas com manteiga de karité e óleo de abacate, para uma pelagem mais macia, brilhante e resistente.',
    imagem: PLACEHOLDER_IMAGES[1],
  },
  {
    id: 'secagem-rapida',
    nome: 'Secagem Rápida',
    apresentacao: '100ml',
    categoria: 'finalizador',
    descricao: 'Leave-in que ajuda a reduzir o tempo de secagem e facilita a escovação, deixando os pelos macios, soltos e com toque sedoso, sem pesar.',
    imagem: PLACEHOLDER_IMAGES[2],
  },
  {
    id: 'limpeza-olhos-ouvidos',
    nome: 'Limpeza de Olhos e Ouvidos',
    apresentacao: '100ml',
    categoria: 'cuidado',
    // Sem ficha técnica disponível: descrição genérica e segura, confirmar com o time.
    descricao: 'Higiene suave e prática da região dos olhos e ouvidos do pet, para incluir na rotina de cuidados do dia a dia. [descrição a confirmar]',
    imagem: PLACEHOLDER_IMAGES[0],
  },
  {
    id: 'hidratante-patas-focinhos',
    nome: 'Hidratante de Patas e Focinhos',
    apresentacao: '50ml',
    categoria: 'cuidado',
    descricao: 'Balm que hidrata e ajuda a proteger as patinhas e o focinho, reduzindo o ressecamento e deixando a pele macia e confortável.',
    imagem: PLACEHOLDER_IMAGES[1],
  },
  {
    id: 'banho-a-seco',
    nome: 'Banho a Seco Desembaraçador',
    apresentacao: '250ml',
    categoria: 'finalizador',
    descricao: 'Higiene entre banhos: refresca, ajuda a desembaraçar e perfuma suavemente a pelagem seca, sem enxágue e sem deixar resíduos.',
    imagem: PLACEHOLDER_IMAGES[2],
  },
  {
    id: 'body-splash-flora',
    nome: 'Body Splash Flora Pet',
    apresentacao: '80ml',
    categoria: 'perfume',
    descricao: 'Perfuma delicadamente a pelagem com fragrância suave e duradoura, deixando uma sensação de frescor sem pesar os pelos.',
    imagem: PLACEHOLDER_IMAGES[0],
  },
  {
    id: 'body-splash-luna',
    nome: 'Body Splash Pet Luna',
    apresentacao: '80ml',
    categoria: 'perfume',
    descricao: 'Perfuma delicadamente a pelagem com fragrância marcante e duradoura, deixando uma sensação de frescor sem pesar os pelos.',
    imagem: PLACEHOLDER_IMAGES[1],
  },
] as const

// Por que revender a Care (briefing seção 7, todos os itens marcados como sim)
export const CARE_WHY_RESELL = [
  { icon: 'TrendingUp', title: 'Nova fonte de lucro sem trabalho extra', text: 'O cliente já está na sua loja. Você só oferece o produto no balcão.' },
  { icon: 'Clock', title: 'Vende no melhor momento', text: 'Pet recém-banhado e cheiroso: é a hora em que o tutor mais valoriza levar o cuidado pra casa.' },
  { icon: 'Scissors', title: 'Facilita o seu trabalho', text: 'O pet cuidado em casa chega com menos nó, e o banho rende mais na sua bancada.' },
  { icon: 'Handshake', title: 'Complementa, não substitui', text: 'A Care é a manutenção em casa entre um banho profissional e outro. Não tira o seu serviço, valoriza ele.' },
  { icon: 'Award', title: 'Reforça sua autoridade', text: 'Quando você recomenda, o tutor confia. Sua indicação vale mais que qualquer anúncio.' },
  { icon: 'ShieldCheck', title: 'Margem protegida e material para divulgação', text: 'Você recebe material de divulgação pronto, feito pra gerar desejo, e uma condição exclusiva pro seu petshop.' },
] as const

// Quem é a Bubbles (referência: captacao.bubbles.com.br)
// Valores numéricos (target/prefix/suffix/decimals) para alimentar o contador animado (CountUp).
export const CARE_BRAND_STATS = [
  { icon: 'Clock', target: 7, prefix: '+', suffix: ' Anos', decimals: 0, label: 'Tempo de mercado', sub: 'Pioneirismo e inovação' },
  { icon: 'Star', target: 4.9, prefix: '', suffix: '/5.0', decimals: 1, label: 'NPS e satisfação', sub: 'Aprovação máxima' },
  { icon: 'Users', target: 5000, prefix: '+', suffix: '', decimals: 0, label: 'Base de groomers', sub: 'Especialistas de elite' },
  { icon: 'Heart', target: 20000, prefix: '+', suffix: '', decimals: 0, label: 'Clientes ativos', sub: 'Tutores apaixonados' },
  { icon: 'Package', target: 50, prefix: '+', suffix: '', decimals: 0, label: 'Mix de soluções', sub: 'Produtos exclusivos' },
] as const

// Passo a passo da pré-venda (sem preço, sem link de compra nesta versão)
export const CARE_HOW_IT_WORKS = [
  { step: '1', title: 'Preencha o cadastro', text: 'Leva 1 minuto e não tem compromisso.' },
  { step: '2', title: 'Fale com um consultor', text: 'Nossos consultores entram em contato com as condições especiais de pré-venda de lançamento.' },
  { step: '3', title: 'Monte seu primeiro pedido', text: 'Com o mix ideal para começar a girar na sua prateleira.' },
] as const

// Depoimentos: placeholder até o time enviar os reais (não inventar pessoa/texto real)
export const CARE_TESTIMONIALS_PENDING = true

export const CARE_FAQ = [
  {
    q: 'Qual a margem real de ganho revendendo a Care?',
    a: 'A margem é pensada para o petshop, com material de divulgação pronto. No cadastro, nossos consultores passam a condição de lançamento com os números fechados para o seu caso.',
  },
  {
    q: 'Quanto eu preciso comprar pra começar?',
    a: 'Na pré-venda de lançamento, os consultores montam com você um primeiro pedido no tamanho certo pra sua loja, sem exagero de estoque.',
  },
  {
    q: 'Se eu vender o kit pro tutor, eu perco ele do meu banho e tosa?',
    a: 'Não. A Care é manutenção em casa entre um banho e outro. O pet volta mais fácil de trabalhar, e você segue sendo a referência de cuidado dele.',
  },
  {
    q: 'Qual a diferença entre a linha profissional e a Care?',
    a: 'A linha profissional é a que você já usa no banho e tosa, dentro do petshop. A Care é pronta para o tutor usar em casa, pensada para manter o resultado do seu trabalho entre uma visita e outra.',
  },
  {
    q: 'Quais produtos têm mais saída?',
    a: 'Os shampoos e os itens de manutenção do dia a dia costumam ser a porta de entrada, mas a linha inteira foi pensada para cobrir cada momento do cuidado em casa. No cadastro, os consultores ajudam a montar o mix ideal pro seu público.',
  },
  {
    q: 'Como posicionar os produtos na prateleira?',
    a: 'Você recebe material de divulgação pronto pra ajudar nisso. E o melhor momento pra oferecer é logo depois do banho, com o pet limpo e cheiroso na frente do tutor.',
  },
] as const
