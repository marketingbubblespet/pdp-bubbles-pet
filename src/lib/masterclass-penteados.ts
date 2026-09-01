// src/lib/masterclass-penteados.ts
// Dados isolados da MasterClass "Penteados que encantam e os produtos por trás" (28/09/2026).
// Não misturar com outras LPs de masterclass. Origem: briefing "Live e MasterClass de setembro"
// (BLOCO 2). Tema visual claro (DESIGN-SYSTEM.md), diferente das demais MasterClass (escuras).
import { BRAND } from '@/lib/constants'

export const MC = {
  slug: 'penteados-que-encantam',
  program: 'MasterClass Setembro',

  // Herói
  title: 'MasterClass: Penteados que encantam e os produtos por trás',
  subtitle:
    'Aula ao vivo com Jéssica Silva para você montar um penteado do zero: preparar o pelo, dar volume, prender sem quebrar e finalizar com brilho e perfume.',
  transformation:
    'Ao final da aula, você vai saber montar um penteado do zero: preparar o pelo, dar volume, prender sem quebrar e finalizar com brilho e perfume.',

  // Quando e onde
  date: '28/09',
  dateFull: '28 de setembro',
  time: '19h',
  timezone: 'horário de Brasília',
  duration: '1h30',
  format: 'Ao vivo e online',
  platform: 'Google Meet',
  targetDateISO: '2026-09-28T19:00:00-03:00',

  // Condição de acesso
  minPurchase: 'R$ 399',
  storeUrl: 'https://www.bubbles.com.br',
  purchaseDeadline: '28 de setembro',
  purchaseWindow: 'até o dia da aula',

  // Grupo VIP do WhatsApp (liberado para quem compra)
  vipGroupUrl: 'https://chat.whatsapp.com/GTYAI1QXaT0Eyomnu2FvNs',

  // Contato de dúvidas (WhatsApp geral da marca)
  whatsapp: BRAND.whatsapp,
  whatsappMsg: 'Olá! Tenho uma dúvida sobre a MasterClass de Penteados.',
  whatsappReminderMsg:
    'Olá! Quero ser avisado(a) quando abrirem as inscrições da próxima MasterClass de Penteados.',

  // Prova social (edições anteriores)
  previousAttendees: '80',
} as const

// Onde vale a compra que libera o acesso
export const MC_PURCHASE_CHANNELS = [
  'Site oficial da Bubbles',
  'WhatsApp oficial de vendas Bubbles',
  'Distribuidores autorizados Bubbles',
] as const

// Resultados concretos da aula (não tópicos)
export const MC_LEARN = [
  {
    icon: 'Droplets',
    text: 'Vai saber preparar o pelo no banho e na secagem para o penteado ter corpo e não desmontar em uma hora.',
  },
  {
    icon: 'Sparkles',
    text: 'Vai saber prender o topete sem repuxar a pele nem quebrar o fio, mesmo em cães que não param quietos.',
  },
  {
    icon: 'Wand2',
    text: 'Vai saber escolher o produto certo para cada tipo de pelagem, fino, ondulado ou grosso, e o que fazer quando o pelo não segura forma.',
  },
  {
    icon: 'Scissors',
    text: 'Vai saber montar penteados completos do zero, do escovado ao acabamento, dentro do tempo de uma bancada real.',
  },
  {
    icon: 'Star',
    text: 'Vai saber finalizar com brilho e fixação que aguentam o trajeto até em casa, para o tutor ver o mesmo resultado que viu no pet shop.',
  },
] as const

// O que você recebe ao se inscrever
export const MC_DELIVERABLES = [
  { icon: 'GraduationCap', text: 'Certificado digital de participação' },
  { icon: 'MessageCircle', text: 'Acesso ao grupo VIP no WhatsApp da turma' },
  { icon: 'HelpCircle', text: 'Espaço para perguntas ao vivo com a instrutora, ao final da aula' },
] as const

// Para quem é (o briefing preencheu esses itens no campo "não é" por engano: o conteúdo de
// cada um descreve uma necessidade que a aula resolve, não uma exclusão. Tratado como
// "para quem é" aqui; sinalizado ao usuário para confirmação).
export const MC_AUDIENCE = [
  'Groomer que já faz penteado, mas vê o resultado desmanchar antes do tutor chegar em casa, e quer entender se o problema é a técnica ou o preparo do pelo',
  'Banhista ou tosador que ainda não oferece penteado e quer começar com um serviço simples e bem executado, sem depender de curso longo',
  'Dono de pet shop que quer agregar valor ao banho e cobrar por um acabamento que o cliente enxerga e comenta',
  'Profissional que trava em pelagem difícil: fio fino que não segura, ondulado que arrepia, cão agitado que não deixa prender, e quer saber o que fazer em cada caso',
  'Quem quer se destacar nas redes com o antes e depois e precisa de um resultado bonito o suficiente para virar conteúdo',
] as const

// Para quem NÃO é
export const MC_NOT_AUDIENCE = [
  'Quem busca fórmula mágica sem prática e repetição depois da aula',
  'Quem não pretende oferecer penteado como serviço no salão',
  'Quem não está disposto a investir em produto e técnica para elevar o acabamento',
] as const

// Instrutora
export const MC_INSTRUCTOR = {
  name: 'Jéssica Silva',
  role: 'Groomer Especialista',
  credential:
    'Groomer especialista em penteados pet, com anos de profissão e centenas de atendimentos. Instrutora de cursos por todo o Brasil, une técnica, criatividade e elegância em penteados que encantam tutores e valorizam o serviço.',
  bio:
    'Groomer especialista em penteados pet há anos. Ministra cursos pelo Brasil e acredita que técnica, criatividade e elegância transformam um penteado em um serviço que o tutor volta para comprar.',
  tags: ['Groomer', 'Especialista', 'Penteados', 'Técnica'],
  photo: '/images/masterclass/jessica-instrutora.jpg',
} as const

// Logística
export const MC_DETAILS = [
  { label: 'Quando', value: '28 de setembro, às 19h (horário de Brasília)' },
  { label: 'Duração', value: 'Aproximadamente 1h30, com espaço para perguntas ao final' },
  { label: 'Onde', value: 'Ao vivo e online, pelo Google Meet' },
  { label: 'Prazo de compra', value: 'Até 28 de setembro (mesmo dia da aula), no site, WhatsApp oficial de vendas ou distribuidores autorizados' },
  { label: 'Como recebe o link', value: 'O acesso ao grupo de WhatsApp é liberado nas compras acima de R$ 399. O link da aula é enviado nesse grupo no dia 28/09, às 19h' },
  { label: 'Lembretes', value: '1 dia antes, 1 hora antes e 15 minutos antes' },
  { label: 'Replay', value: 'Não fica gravada: é só ao vivo' },
  { label: 'Certificado', value: 'Certificado digital para todos os participantes' },
] as const

// Passo a passo para garantir o acesso
export const MC_STEPS = [
  { n: 1, text: 'Compre R$ 399 ou mais em produtos Bubbles até 28 de setembro, o mesmo dia da aula: no site, no WhatsApp oficial de vendas ou em distribuidores autorizados.' },
  { n: 2, text: 'Você recebe automaticamente o link do grupo VIP no WhatsApp.' },
  { n: 3, text: 'No dia 28/09, às 19h, o link da aula é enviado no grupo. É só entrar e participar.' },
] as const

// FAQ
export const MC_FAQ = [
  {
    q: 'Preciso comprar para participar? Quanto?',
    a: 'Sim. O acesso é liberado para compras de R$ 399 ou mais em produtos Bubbles, feitas até 28 de setembro, o mesmo dia da aula. Vale no site, no WhatsApp oficial de vendas ou em distribuidores autorizados.',
  },
  {
    q: 'A aula é ao vivo ou gravada?',
    a: 'É só ao vivo, pelo Google Meet. Não fica gravada e não há replay depois.',
  },
  {
    q: 'Onde e como recebo o link de acesso?',
    a: 'Depois da compra, você entra no grupo VIP do WhatsApp da turma. O link da aula é enviado nesse mesmo grupo no dia 28/09, às 19h. Você recebe lembretes 1 dia antes, 1 hora antes e 15 minutos antes.',
  },
  {
    q: 'Quanto tempo dura?',
    a: 'Aproximadamente 1h30, incluindo o espaço para perguntas ao vivo com a Jéssica no final.',
  },
  {
    q: 'Vou receber certificado?',
    a: 'Sim. Todos os participantes recebem um certificado digital de participação.',
  },
  {
    q: 'Funciona para quem nunca fez penteado?',
    a: 'Sim. A aula ensina a montar um penteado do zero, então funciona tanto para quem está começando quanto para quem já faz e quer refinar a técnica.',
  },
  {
    q: 'Vou poder tirar dúvidas ao vivo com a Jéssica?',
    a: 'Sim. Depois do conteúdo principal há um espaço de perguntas e respostas ao vivo com a instrutora.',
  },
  {
    q: 'A compra pode ser de qualquer produto, em qualquer canal?',
    a: 'Sim. Vale qualquer combinação de produtos que some R$ 399 ou mais, comprada no site da Bubbles, no WhatsApp oficial de vendas ou em distribuidores autorizados.',
  },
  {
    q: 'Até quando posso comprar para garantir o acesso?',
    a: 'A compra precisa ser feita até o dia 28/09, o mesmo dia da aula. Compras feitas depois dessa data não garantem acesso a esta edição.',
  },
  {
    q: 'Posso participar pelo celular?',
    a: 'Sim. A aula acontece pelo Google Meet e pode ser acompanhada tanto pelo computador quanto pelo celular.',
  },
] as const
