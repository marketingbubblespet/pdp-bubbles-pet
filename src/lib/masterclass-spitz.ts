// src/lib/masterclass-spitz.ts
// Dados isolados da MasterClass de Spitz Alemão (não misturar com outras LPs).
// Itens marcados com [AGUARDANDO INFORMAÇÕES] devem ser preenchidos antes de publicar.
import { BRAND } from '@/lib/constants'

export const MC = {
  slug: 'spitz-alemao',
  program: 'MasterClass Julho',

  // Herói
  title: 'Banho e tosa de Spitz Alemão: a técnica que separa o groomer comum do especialista',
  subtitle:
    'Aula ao vivo e gratuita com Guilherme Mendes para você dominar uma das raças mais exigentes do mercado, elevar o seu padrão e cobrar mais por isso.',
  transformation:
    'Ao final, você vai saber banhar e tosar Spitz Alemão com a técnica de um especialista, evitando os erros que estragam a pelagem e atendendo com a confiança de quem domina a raça.',

  // Quando e onde
  date: '27/07',
  dateFull: '27 de julho',
  time: '19h',
  timezone: 'horário de Brasília',
  duration: '1 hora',
  format: 'Ao vivo e online',
  platform: 'Google Meet',
  targetDateISO: '2026-07-27T19:00:00-03:00',
  replay: 'A aula fica salva no YouTube depois, para você rever quando quiser.',

  // Condição de acesso
  minPurchase: 'R$ 499',
  storeUrl: 'https://www.bubbles.com.br',
  purchaseDeadline: '27 de julho',
  purchaseWindow: 'até o dia da aula', // usado em frases curtas, ex: "comprando R$ 499+ até o dia da aula"

  // Contato de dúvidas (WhatsApp geral da marca)
  whatsapp: BRAND.whatsapp,
  whatsappMsg: 'Olá! Tenho uma dúvida sobre a MasterClass de Spitz Alemão.',
  // Mensagem de quem quer ser avisado da próxima edição (popup de saída / evento encerrado)
  whatsappReminderMsg:
    'Olá! Quero ser avisado(a) quando abrirem as inscrições da próxima MasterClass de Spitz Alemão.',

  // Última edição (prova social)
  lastEditionVideoId: 'N6uAPCRZ2GU',
  // Minutos de prévia liberados antes de pausar/mutar automaticamente
  videoPreviewMinutes: 20,
} as const

// Onde vale a compra que libera o acesso
export const MC_PURCHASE_CHANNELS = [
  'Site oficial da Bubbles',
  'WhatsApp oficial de vendas Bubbles',
  'Distribuidores autorizados Bubbles',
] as const

// O que você vai aprender (resultados concretos)
export const MC_LEARN = [
  {
    icon: '✂️',
    text: 'Aprimore técnicas de banho e tosa específicas para o Spitz Alemão',
  },
  {
    icon: '🚫',
    text: 'Elimine os erros mais comuns que prejudicam a pelagem do Spitz',
  },
  {
    icon: '⭐',
    text: 'Ganhe mais confiança para atender uma das raças mais exigentes do mercado pet',
  },
] as const

// O que você recebe (entregáveis e bônus)
export const MC_DELIVERABLES = [
  { icon: '🎓', text: 'Certificado digital de participação' },
  { icon: '💬', text: 'Confirmação da vaga direto pelo WhatsApp após a compra' },
  { icon: '🔗', text: 'Link da aula ao vivo enviado no dia' },
  { icon: '▶️', text: 'Replay salvo no YouTube para rever quando quiser' },
] as const

// Para quem é
export const MC_AUDIENCE = [
  'Groomer iniciante que quer começar com o pé direito',
  'Groomer que quer aumentar o faturamento',
  'Groomer experiente que quer se aprimorar',
  'Dono de pet shop que quer lucrar mais',
  'Profissional que quer se diferenciar da concorrência',
] as const

// Para quem NÃO é
export const MC_NOT_AUDIENCE = [
  'Quem busca fórmula mágica sem prática e dedicação',
  'Quem não atende ou não pretende atender a raça Spitz',
  'Quem não está disposto a investir em técnica e evolução profissional',
  'Quem espera resultado sem repetir a técnica depois da aula',
] as const

// Instrutor
export const MC_INSTRUCTOR = {
  name: 'Guilherme Mendes',
  credential: 'Groomer especialista em Spitz e competidor multicampeão',
  tags: ['Groomer', 'Palestrante', 'Empresário', 'Competidor'],
  // photo: [AGUARDANDO INFORMAÇÕES] link/arquivo da foto
} as const

// Logística
export const MC_DETAILS = [
  { label: 'Quando', value: '27 de julho, às 19h (horário de Brasília)' },
  { label: 'Duração', value: 'Aproximadamente 1 hora' },
  { label: 'Onde', value: 'Ao vivo e online, pelo Google Meet' },
  { label: 'Prazo de compra', value: 'Até 27 de julho (mesmo dia da aula), no site, WhatsApp oficial de vendas ou distribuidores autorizados Bubbles' },
  { label: 'Como recebe o link', value: 'Pelo WhatsApp, no dia da aula, após confirmar o número do pedido' },
  { label: 'Lembretes', value: '1 dia antes, 1 hora antes e 15 minutos antes' },
  { label: 'Replay', value: 'A aula fica salva no YouTube depois' },
] as const

// Passo a passo para garantir o acesso
export const MC_STEPS = [
  { n: 1, text: 'Compre R$ 499 ou mais em produtos Bubbles até 27 de julho, o mesmo dia da aula: no site, no WhatsApp oficial de vendas ou em distribuidores autorizados.' },
  { n: 2, text: 'Você recebe automaticamente o link do grupo VIP no WhatsApp.' },
  { n: 3, text: 'Receba o link no dia e participe da aula ao vivo.' },
] as const

// Produtos sugeridos para o bloco shoppable
export const MC_PRODUCTS = [
  {
    name: 'Kit Texturizador PRO',
    description: 'Volume e efeito fluffy para preparar a tosa, com Nano Proteína de Trigo e Argila Verde.',
    url: 'https://www.bubbles.com.br/products/kit-pet-texturizador-pro-ego-4-itens-1532722',
    image: '/images/masterclass/produto-texturizador.webp',
  },
  {
    name: 'Linha PRO',
    description: 'A linha mais completa da Bubbles: alta performance, maior rendimento e fragrância Eau de Parfum.',
    url: 'https://www.bubbles.com.br/collections/pro',
    image: '/images/masterclass/produto-linha-pro.webp',
  },
] as const

// FAQ
export const MC_FAQ = [
  {
    q: 'Preciso comprar para participar? Quanto?',
    a: 'Sim. O acesso é liberado para compras de R$ 499 ou mais em produtos Bubbles, feitas até 27 de julho, o mesmo dia da aula. Você pode montar o carrinho como quiser, no site, no WhatsApp oficial de vendas ou em distribuidores autorizados.',
  },
  {
    q: 'A aula é ao vivo ou gravada?',
    a: 'É ao vivo, pelo Google Meet. Depois a aula fica salva no YouTube para você rever quando quiser.',
  },
  {
    q: 'Onde e como recebo o link de acesso?',
    a: 'Pelo WhatsApp, no dia da aula, depois de você confirmar o número do seu pedido. Você recebe lembretes 1 dia antes, 1 hora antes e 15 minutos antes.',
  },
  {
    q: 'Quanto tempo dura?',
    a: 'Aproximadamente 1 hora, incluindo o espaço para perguntas.',
  },
  {
    q: 'Vou receber certificado?',
    a: 'Sim. Todos os participantes recebem um certificado digital de participação.',
  },
  {
    q: 'Funciona para quem está começando agora?',
    a: 'Sim. A aula foi pensada do groomer iniciante ao experiente que quer se aprimorar no Spitz Alemão.',
  },
  {
    q: 'Preciso ter experiência prévia com a raça?',
    a: 'Não. A aula cobre desde os fundamentos até as técnicas mais avançadas, então funciona tanto para quem nunca atendeu um Spitz quanto para quem já tem experiência e quer refinar a técnica.',
  },
  {
    q: 'Vou poder tirar dúvidas ao vivo com o Guilherme?',
    a: 'Sim. Depois do conteúdo principal há um espaço de perguntas e respostas ao vivo com o instrutor.',
  },
  {
    q: 'A compra pode ser de qualquer produto, em qualquer canal?',
    a: 'Sim. Vale qualquer combinação de produtos que some R$ 499 ou mais, comprada no site da Bubbles, no WhatsApp oficial de vendas ou em distribuidores autorizados. Não precisa ser de uma linha específica.',
  },
  {
    q: 'Até quando posso comprar para garantir o acesso?',
    a: 'A compra precisa ser feita até o dia 27/07, o mesmo dia da aula. Compras feitas depois dessa data não garantem acesso a esta edição.',
  },
  {
    q: 'Posso participar pelo celular?',
    a: 'Sim. A aula acontece pelo Google Meet e pode ser acompanhada tanto pelo computador quanto pelo celular.',
  },
] as const
