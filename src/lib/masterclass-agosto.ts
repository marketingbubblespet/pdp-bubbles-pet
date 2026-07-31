// src/lib/masterclass-agosto.ts
// Dados isolados da MasterClass "O Segredo Está no Banho" (rostinho bebê), com Tio Dan.
// Não misturar com outras LPs. Itens marcados [AGUARDANDO INFORMAÇÕES] devem ser preenchidos
// antes de publicar.
import { BRAND } from '@/lib/constants'

export const MC = {
  slug: 'rostinho-bebe',
  program: 'Agosto PRO',

  // Herói
  title: 'O Segredo Está no Banho: a base do rostinho bebê perfeito',
  subtitle:
    'Aula ao vivo com Tio Dan, especialista em tosa bebê e rostinho, para você dominar a base que garante o rostinho bebê perfeito, direto no banho, antes mesmo de tocar na tesoura.',
  transformation:
    'Ao final, você vai saber escolher o shampoo certo pra cada pelagem, preparar o pelo no banho pra tesoura deslizar com precisão, e executar o corte de rostinho bebê com simetria e acabamento profissional, em diferentes raças e formatos de rosto.',

  // Quando e onde
  date: '24/08',
  dateFull: '24 de agosto',
  time: '19h',
  timezone: 'horário de Brasília',
  duration: '2 horas',
  format: 'Ao vivo e online',
  platform: 'Google Meet',
  targetDateISO: '2026-08-24T19:00:00-03:00',
  replay: 'A aula fica salva no YouTube depois, com acesso vitalício para você rever quando quiser.',

  // Condição de acesso: compra de qualquer item da Linha PRO (sem valor mínimo fixo)
  accessRule: 'Compre qualquer item da Linha PRO',
  storeUrl: 'https://www.bubbles.com.br/collections/pro',
  purchaseDeadline: '24 de agosto',
  purchaseWindow: 'até o dia da aula',

  // Contato de dúvidas (WhatsApp geral da marca)
  whatsapp: BRAND.whatsapp,
  whatsappMsg: 'Olá! Tenho uma dúvida sobre a MasterClass de Rostinho Bebê com o Tio Dan.',
  whatsappReminderMsg:
    'Olá! Quero ser avisado(a) quando abrirem as inscrições da próxima MasterClass de Rostinho Bebê.',

  // Prova social de edição anterior: [AGUARDANDO INFORMAÇÕES] link da gravação citado no
  // briefing não foi enviado ainda. Bloco de prova (MasterProofB) fica de fora até chegar.
  lastEditionVideoId: '',
  videoPreviewMinutes: 20,
} as const

export const MC_PURCHASE_CHANNELS = [
  'Site oficial da Bubbles',
  'WhatsApp oficial de vendas Bubbles',
  'Distribuidores autorizados Bubbles',
] as const

// O que você vai aprender (resultados concretos, condensado dos 5 do briefing)
export const MC_LEARN = [
  {
    icon: '✂️',
    text: 'Escolha o shampoo certo pra cada tipo de pelagem, entendendo o porquê por trás da escolha, não só qual produto usar',
  },
  {
    icon: '🚫',
    text: 'Prepare o pelo corretamente no banho pra tesoura deslizar com precisão na tosa, reduzindo pelo embolado e retrabalho',
  },
  {
    icon: '⭐',
    text: 'Execute o corte de rostinho bebê com simetria e acabamento profissional, em diferentes raças e formatos de rosto',
  },
] as const

// O que você recebe (entregáveis e bônus)
export const MC_DELIVERABLES = [
  { icon: '🎓', text: 'Certificado digital de participação' },
  { icon: '💬', text: 'Confirmação da vaga direto pelo WhatsApp após a compra' },
  { icon: '🔗', text: 'Link da aula ao vivo enviado no dia' },
  { icon: '▶️', text: 'Replay salvo no YouTube, com acesso vitalício' },
] as const

// Para quem é
export const MC_AUDIENCE = [
  'Groomer iniciante que quer começar com o pé direito',
  'Groomer que quer aumentar o faturamento',
  'Groomer experiente que quer se aprimorar',
  'Dono de pet shop que quer lucrar mais',
  'Profissional que quer se diferenciar da concorrência',
] as const

// Para quem NÃO é: [AGUARDANDO INFORMAÇÕES] briefing não especificou
export const MC_NOT_AUDIENCE = [] as const

// Instrutor
export const MC_INSTRUCTOR = {
  name: 'Tio Dan',
  credential: 'Groomer Bubbles e especialista em tosa bebê e rostinho',
  bio: 'Groomer, mais de 10 mil atendimentos, empresário e competidor multipremiado.',
  tags: ['Groomer', 'Especialista em Rostinho', 'Empresário', 'Competidor'],
  photo: '/images/masterclass/tio-dan-retrato.webp',
} as const

// Logística
export const MC_DETAILS = [
  { label: 'Quando', value: '24 de agosto, às 19h (horário de Brasília)' },
  { label: 'Duração', value: 'Aproximadamente 2 horas' },
  { label: 'Onde', value: 'Ao vivo e online, pelo Google Meet' },
  { label: 'Prazo de compra', value: 'Até 24 de agosto (mesmo dia da aula), na compra de qualquer item da Linha PRO' },
  { label: 'Como recebe o link', value: 'Pelo WhatsApp, no dia da aula' },
  { label: 'Lembretes', value: '1 hora antes e 15 minutos antes' },
  { label: 'Replay', value: 'A aula fica salva no YouTube, acesso vitalício' },
] as const

// Passo a passo para garantir o acesso
export const MC_STEPS = [
  { n: 1, text: 'Compre qualquer item da Linha PRO até 24/08, o mesmo dia da aula: no site, no WhatsApp oficial de vendas ou em distribuidores autorizados.' },
  { n: 2, text: 'Você recebe automaticamente o link do grupo VIP no WhatsApp.' },
  { n: 3, text: 'Receba o link no dia (com lembrete 1h antes e 15 min antes) e participe da aula ao vivo.' },
] as const

// Produtos sugeridos para o bloco shoppable
export const MC_PRODUCTS = [
  {
    name: 'Linha PRO',
    description: 'A linha mais completa da Bubbles: alta performance, maior rendimento e fragrância Eau de Parfum. Qualquer item já libera seu acesso.',
    url: 'https://www.bubbles.com.br/collections/pro',
    image: '/images/masterclass/produto-linha-pro.webp',
  },
  {
    name: 'Shampoo Neutro PRO 1L',
    description: 'Limpeza suave e equilibrada para todos os tipos de pelagem.',
    url: 'https://www.bubbles.com.br/collections/pro/products/shampoo-pet-neutro-ego-1l-1-10',
    image: '/images/masterclass/produto-shampoo-neutro-1l.webp',
  },
  {
    name: 'Gel Modelador Antifrizz PRO 15ml',
    description: 'Modelagem e controle de frizz para o acabamento final do pet.',
    url: 'https://www.bubbles.com.br/collections/pro/products/gel-modelador-pet-antifrizz-pro-15ml',
    image: '/images/masterclass/produto-gel-modelador.webp',
  },
  {
    name: 'Shampoo Neutralizador de Odores Pré-lavagem PRO 5L (1:11)',
    description: 'Pré-lavagem que neutraliza odores antes do banho completo.',
    url: 'https://www.bubbles.com.br/collections/pro/products/shampoo-pet-neutralizador-de-odores-ego-5l-1-11',
    image: '/images/masterclass/produto-shampoo-neutralizador-5l.webp',
  },
] as const

// FAQ
export const MC_FAQ = [
  {
    q: 'Preciso comprar para participar? O quê?',
    a: 'Sim. O acesso é liberado na compra de qualquer item da Linha PRO, feita até 24/08, o mesmo dia da aula. Não tem valor mínimo fixo: qualquer produto da linha conta.',
  },
  {
    q: 'A aula é ao vivo ou gravada?',
    a: 'É ao vivo, pelo Google Meet, com duração de aproximadamente 2 horas. Depois fica salva no YouTube, com acesso vitalício, para você rever quando quiser.',
  },
  {
    q: 'Onde e como recebo o link de acesso?',
    a: 'Pelo WhatsApp, no dia da aula. Você recebe lembretes 1 hora antes e 15 minutos antes do início.',
  },
  {
    q: 'Quanto tempo dura?',
    a: 'Aproximadamente 2 horas, incluindo o espaço para perguntas.',
  },
  {
    q: 'Vou receber certificado?',
    a: 'Sim. Todos os participantes recebem um certificado digital de participação.',
  },
  {
    q: 'Funciona para quem está começando agora?',
    a: 'Sim. A aula foi pensada do groomer iniciante ao experiente que quer se aprimorar na técnica de rostinho bebê.',
  },
  {
    q: 'A técnica funciona pra qualquer raça?',
    a: 'Sim. O Tio Dan mostra como aplicar e adaptar a técnica de rostinho bebê em diferentes raças e formatos de rosto.',
  },
  {
    q: 'Vou poder tirar dúvidas ao vivo com o Tio Dan?',
    a: 'Sim. Depois do conteúdo principal há um espaço de perguntas e respostas ao vivo com o instrutor.',
  },
  {
    q: 'A compra pode ser de qualquer produto da Linha PRO?',
    a: 'Sim. Qualquer item da Linha PRO, comprado no site da Bubbles, no WhatsApp oficial de vendas ou em distribuidores autorizados, já libera seu acesso.',
  },
  {
    q: 'Até quando posso comprar para garantir o acesso?',
    a: 'A compra precisa ser feita até o dia 24/08, o mesmo dia da aula. Compras feitas depois dessa data não garantem acesso a esta edição.',
  },
  {
    q: 'Posso participar pelo celular?',
    a: 'Sim. A aula acontece pelo Google Meet e pode ser acompanhada tanto pelo computador quanto pelo celular.',
  },
] as const
