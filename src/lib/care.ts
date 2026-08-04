// src/lib/care.ts
// Dados isolados da LP de lançamento Bubbles Care (revenda para petshops).
// Não misturar com outras LPs. Itens marcados [AGUARDANDO INFORMAÇÕES] ou "a confirmar"
// devem ser preenchidos/validados antes desta página sair do pré-lançamento.
import { BRAND } from '@/lib/constants'

export const CARE = {
  slug: 'care',
  tagline: 'A linha que transforma cada banho em faturamento extra.',
  whatsapp: BRAND.whatsapp,
  whatsappMsg: 'Olá! Quero saber como revender a linha Bubbles Care no meu negócio.',
} as const

// Números da máquina de demanda (TikTok Shop), vindos do briefing, confirmar antes de publicar.
// Valores numéricos (sem formatação) para alimentar o contador animado (CountUp).
export const CARE_DEMAND = {
  afiliados: 2665,
  vendas3meses: 1200,
  videos: 3500,
} as const

export const CARE_CATEGORIES = [
  { id: 'shampoo', label: 'Shampoos', icon: 'Droplets' },
  { id: 'condicionamento', label: 'Condicionamento e Hidratação', icon: 'Waves' },
  { id: 'finalizador', label: 'Finalizadores e Leave-ins', icon: 'Wind' },
  { id: 'perfume', label: 'Perfumes', icon: 'SprayCan' },
  { id: 'cuidado', label: 'Cuidados Específicos', icon: 'HeartPulse' },
] as const

export type CareCategoryId = typeof CARE_CATEGORIES[number]['id']

export const CARE_PRODUCTS = [
  {
    id: 'shampoo-limpeza-profunda',
    nome: 'Shampoo Limpeza Profunda',
    apresentacao: '300ml',
    categoria: 'shampoo',
    descricao: 'Limpa a fundo e ajuda a controlar odores, deixando a pelagem leve, macia e com sensação de limpeza prolongada.',
    imagem: '/images/care/care_shampoo-limpeza-profunda_300ml.webp',
  },
  {
    id: 'shampoo-neutro',
    nome: 'Shampoo Neutro',
    apresentacao: '300ml',
    categoria: 'shampoo',
    descricao: 'Limpeza suave para o dia a dia, indicada para todos os tipos de pelagem, com fórmula que contribui para maciez, brilho e toque agradável.',
    imagem: '/images/care/care_shampoo-neutro_300ml.webp',
  },
  {
    id: 'shampoo-pelos-claros',
    nome: 'Shampoo Pelos Claros',
    apresentacao: '300ml',
    categoria: 'shampoo',
    descricao: 'Realça a luminosidade da pelagem clara, branca ou grisalha, com tecnologia óptica que ajuda a minimizar o aspecto amarelado.',
    imagem: '/images/care/care_shampoo-pelos-claros_300ml.webp',
  },
  {
    id: 'condicionador-hidratante',
    nome: 'Condicionador Hidratante',
    apresentacao: '250ml',
    categoria: 'condicionamento',
    descricao: 'Hidrata e desembaraça, reduz os nós e deixa os pelos alinhados, macios e com toque sedoso, com óleo de argan e girassol.',
    imagem: '/images/care/care_condicionador-hidratante_300ml.webp',
  },
  {
    id: 'mascara-multifuncional',
    nome: 'Máscara Multifuncional',
    apresentacao: '100ml',
    categoria: 'condicionamento',
    descricao: 'Hidratação e nutrição intensivas com manteiga de karité e óleo de abacate, para uma pelagem mais macia, brilhante e resistente.',
    imagem: '/images/care/care_mascara-multifuncional_100ml.webp',
  },
  {
    id: 'secagem-rapida',
    nome: 'Secagem Rápida',
    apresentacao: '100ml',
    categoria: 'finalizador',
    descricao: 'Leave-in que ajuda a reduzir o tempo de secagem e facilita a escovação, deixando os pelos macios, soltos e com toque sedoso, sem pesar.',
    imagem: '/images/care/care_acelerador-de-secagem_100ml.webp',
  },
  {
    id: 'limpeza-olhos-ouvidos',
    nome: 'Limpeza de Olhos e Ouvidos',
    apresentacao: '100ml',
    categoria: 'cuidado',
    // Sem ficha técnica disponível: descrição genérica e segura, confirmar com o time.
    descricao: 'Higiene suave e prática da região dos olhos e ouvidos do pet, para incluir na rotina de cuidados do dia a dia. [descrição a confirmar]',
    imagem: '/images/care/care_limpeza-olhos-e-ouvidos_100ml.webp',
  },
  {
    id: 'hidratante-patas-focinhos',
    nome: 'Hidratante de Patas e Focinhos',
    apresentacao: '50ml',
    categoria: 'cuidado',
    descricao: 'Balm que hidrata e ajuda a proteger as patinhas e o focinho, reduzindo o ressecamento e deixando a pele macia e confortável.',
    imagem: '/images/care/care_hidratante-patas-focinho_50ml.webp',
  },
  {
    id: 'banho-a-seco',
    nome: 'Banho a Seco Desembaraçador',
    apresentacao: '250ml',
    categoria: 'finalizador',
    descricao: 'Higiene entre banhos: refresca, ajuda a desembaraçar e perfuma suavemente a pelagem seca, sem enxágue e sem deixar resíduos.',
    imagem: '/images/care/care_banho-a-seco_300ml.webp',
  },
  {
    id: 'body-splash-flora',
    nome: 'Body Splash Flora Pet',
    apresentacao: '80ml',
    categoria: 'perfume',
    descricao: 'Perfuma delicadamente a pelagem com fragrância suave e duradoura, deixando uma sensação de frescor sem pesar os pelos.',
    imagem: '/images/care/care_body-splash-flora_80ml.webp',
  },
  {
    id: 'body-splash-luna',
    nome: 'Body Splash Pet Luna',
    apresentacao: '80ml',
    categoria: 'perfume',
    descricao: 'Perfuma delicadamente a pelagem com fragrância marcante e duradoura, deixando uma sensação de frescor sem pesar os pelos.',
    imagem: '/images/care/care_body-splash-luna_80ml.webp',
  },
] as const

// Bloco de conexão com o lojista (roteiro do Ivan)
export const CARE_CONNECTION = {
  title: 'Seu cliente já compra o serviço. Agora, ele pode continuar comprando o cuidado.',
  text: 'O banho e tosa entrega resultado imediato. A linha Bubbles Care ajuda o tutor a manter esse resultado por mais tempo, e cria uma nova oportunidade de venda dentro do seu negócio.',
  bullets: [
    'Aumenta o valor de cada atendimento',
    'Transforma a recomendação do profissional em venda',
    'Fortalece o relacionamento com o tutor',
    'Estimula novas compras ao longo do tempo',
    'Amplia o faturamento sem depender apenas de novos agendamentos',
    'Reduz o risco de o tutor comprar em outro lugar',
  ],
  highlight: 'O serviço gera confiança. O home care prolonga o relacionamento.',
} as const

// Depoimentos reais de distribuidores parceiros Bubbles
export const CARE_TESTIMONIALS = [
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
    text: 'Ser distribuidor Bubbles vai muito além de vender produtos, é viver, na prática, a transformação que eles causam. É acompanhar de perto aquele pet que chega para o banho e sai renovado, com o pelo macio, brilho evidente e um perfume que realmente marca. É ver o olhar do cliente mudar, o elogio espontâneo surgir e saber que você fez parte daquela experiência. No dia a dia, é sentir a diferença na rotina dos profissionais: produtos que rendem, que facilitam o trabalho e elevam o padrão do atendimento. É perceber que não se trata só de estética, mas de cuidado, bem-estar e valorização do serviço prestado. Ser Bubbles é criar conexão com os pet shops, com os groomers e com cada cliente que volta justamente pela experiência que teve. É ter orgulho de representar algo que entrega resultado de verdade, que fideliza e que faz o negócio crescer junto. No fim, ser distribuidor Bubbles é isso: não é só sobre o que você entrega, é sobre o que as pessoas sentem depois, pois a satisfação do cliente do meu cliente é a minha satisfação.',
  },
] as const

// Apresentação da oportunidade: jornada antes / durante / depois do banho (roteiro do Ivan)
export const CARE_JOURNEY = {
  title: 'Uma linha criada para vender antes, durante e depois do banho',
  intro: 'A Bubbles Care foi pensada para acompanhar toda a jornada de cuidado do pet:',
  steps: [
    { label: 'Antes do atendimento', text: 'Produtos que ajudam o tutor a manter uma rotina adequada.' },
    { label: 'Durante o serviço', text: 'Soluções de qualidade profissional para banho e finalização.' },
    { label: 'Depois do atendimento', text: 'Itens para preservar o resultado em casa e incentivar a recompra.' },
  ],
  closing: 'Não é apenas uma linha para ocupar espaço na prateleira. É um portfólio que conecta serviço, recomendação e consumo recorrente.',
} as const

// Provas rápidas do Hero (roteiro do Ivan)
export const CARE_QUICK_PROOFS = [
  'Linha completa para a rotina de cuidados',
  'Produtos desenvolvidos para uso profissional e home care',
  'Campanha de lançamento para gerar demanda',
  'Margens competitivas para o canal',
] as const

// Por que revender a Care (roteiro do Ivan: "o que torna a Care uma oportunidade diferente")
export const CARE_WHY_RESELL = [
  { icon: 'Layers', label: 'Portfólio completo', title: 'Do banho à manutenção', text: 'Uma grade pensada para atender diferentes momentos da rotina de cuidados, reduzindo a necessidade de o cliente buscar soluções complementares em outras marcas.' },
  { icon: 'BadgeCheck', label: 'Qualidade profissional', title: 'Resultado que o profissional reconhece', text: 'Produtos desenvolvidos para entregar uma experiência consistente no banho, na finalização e na manutenção, tanto no uso profissional quanto na recomendação para casa.' },
  { icon: 'Sparkles', label: 'Design que chama atenção', title: 'Uma apresentação que favorece a escolha', text: 'Em uma categoria com muitas opções parecidas, a identidade visual da Bubbles Care ajuda o produto a se destacar e facilita sua identificação no ponto de venda.' },
  { icon: 'RefreshCw', label: 'Potencial de recompra', title: 'Cuidado pet é uma rotina, não uma compra única', text: 'Quando o produto entra na rotina do tutor, a oportunidade deixa de ser uma venda pontual e passa a fazer parte de um ciclo de reposição e continuidade.' },
  { icon: 'Megaphone', label: 'Marketing para gerar procura', title: 'A marca também participa da venda', text: 'A Bubbles investirá em divulgação, conteúdo e presença nas redes sociais para aumentar o reconhecimento da linha e apoiar o trabalho de distribuidores e lojistas.' },
  { icon: 'TrendingUp', label: 'Margem competitiva', title: 'Mais espaço para rentabilizar cada venda', text: 'Condições comerciais estruturadas para que o parceiro tenha competitividade na revenda e uma operação saudável no ponto de venda.' },
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
    a: 'A margem é pensada para o seu negócio, com material de divulgação pronto. No cadastro, nossos consultores passam a condição de lançamento com os números fechados para o seu caso.',
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
  {
    q: 'A Bubbles vai divulgar a linha pros meus clientes, ou fico sozinho nisso?',
    a: 'As duas frentes trabalham juntas. A Bubbles investe em divulgação, conteúdo e presença nas redes pra gerar reconhecimento da linha, e você recebe material de apoio pronto pra reforçar isso no seu ponto de venda.',
  },
  {
    q: 'Preciso escolher entre vender a linha profissional ou a Care?',
    a: 'Não. São linhas complementares. A profissional continua sendo usada por você, dentro do petshop. A Care é a extensão desse cuidado pra casa, sem substituir nada do que você já faz.',
  },
  {
    q: 'Como funciona a reposição depois do primeiro pedido?',
    a: 'Os consultores acompanham com você o ritmo de reposição, alinhado à recompra natural que a rotina de cuidado em casa gera com o tempo.',
  },
  {
    q: 'Vocês oferecem algum treinamento pra minha equipe?',
    a: 'No cadastro, os consultores explicam como apresentar a linha pro tutor e tiram as principais dúvidas da sua equipe sobre o portfólio.',
  },
  {
    q: 'Tem risco de a Care concorrer com o que eu já vendo hoje?',
    a: 'Não. A Care ocupa um espaço que hoje não é atendido: o cuidado do tutor em casa. Ela não compete com sua linha profissional nem com outros produtos que você já revende.',
  },
] as const
