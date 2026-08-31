// src/lib/care-b.ts
// Dados isolados da variante B da LP de captação de revenda Bubbles Care.
// Não misturar com src/lib/care.ts (variante A). Reaproveita de lá o que não muda:
// CARE_PRODUCTS, CARE_TESTIMONIALS, CARE_BRAND_STATS, CARE_HOW_IT_WORKS, CARE_FAQ.
// Ver docs/care/plano-lp-care-b.md e docs/care/planejamento-codigo-care-b.md.
import { CARE, CARE_DEMAND, CARE_FAQ } from '@/lib/care'

export const CARE_B = {
  slug: 'care-b',
  whatsapp: CARE.whatsapp,
  whatsappMsg: CARE.whatsappMsg,
} as const

export { CARE_DEMAND }

export const CARE_B_HERO = {
  eyebrow: 'Pré-venda de lançamento',
  h1: 'Transforme cada banho em uma nova fonte de faturamento, sem ocupar a bancada nem a sua agenda.',
  corpo: 'A Linha Care leva o cuidado profissional pra casa do tutor, com margem estruturada pro seu negócio e produtos que já têm demanda formada. Preencha o cadastro e receba a condição de pré-venda.',
  proofs: [
    'Linha completa para revenda',
    'Margem estruturada por faixa de compra',
    'Suporte e material de divulgação inclusos',
    'Demanda já formada com o consumidor final',
  ],
} as const

export const CARE_B_CALCULATOR_DISCLAIMER =
  'Projeção estimada com base no ticket médio da categoria. Sua margem real é confirmada com o consultor no cadastro.'

export const CARE_B_SERVICE_PROOF = {
  eyebrow: 'A dúvida que todo groomer tem',
  h2: 'Vender Care não tira o seu banho de ninguém',
  corpo: 'O tutor que cuida do pet em casa entre uma visita e outra chega com menos nó e menos sujeira acumulada. O banho rende mais na sua bancada, e o resultado dura mais até a próxima vez, o que aproxima o retorno do tutor em vez de afastar.',
  bullets: [
    'Menos nó na hora de escovar reduz o tempo por atendimento',
    'Pet com pelagem mantida em casa valoriza ainda mais o seu trabalho no dia do banho',
    'Você continua sendo a referência de cuidado: o produto leva sua recomendação, não a substitui',
  ],
} as const

export const CARE_B_DEMAND_MACHINE = {
  eyebrow: 'A demanda já existe',
  h2: 'Enquanto você lê isso, a Bubbles já está gerando desejo pela marca',
  corpo: 'São milhares de vídeos de criadores de conteúdo colocando a Bubbles na frente do tutor todos os dias. Quando ele vir a Linha Care na sua prateleira, essa não vai ser a primeira vez que ouve falar da marca, e isso facilita a primeira venda.',
  fechamento: 'Reconhecimento de marca não é promessa, é o que já está acontecendo. Seu trabalho é ter o produto na prateleira quando o tutor chegar procurando.',
} as const

// 4 dos 6 itens de CARE_WHY_RESELL (lib/care.ts): mantém margem, giro/recompra,
// marketing de apoio, portfólio completo. Corta design/apresentação e qualidade
// profissional, que são argumento de produto, não de negócio.
export const CARE_B_WHY_RESELL = [
  { icon: 'Layers', label: 'Portfólio completo', title: 'Do banho à manutenção', text: 'Uma grade pensada para atender diferentes momentos da rotina de cuidados, reduzindo a necessidade de o cliente buscar soluções complementares em outras marcas.' },
  { icon: 'RefreshCw', label: 'Potencial de recompra', title: 'Cuidado pet é uma rotina, não uma compra única', text: 'Quando o produto entra na rotina do tutor, a oportunidade deixa de ser uma venda pontual e passa a fazer parte de um ciclo de reposição e continuidade.' },
  { icon: 'Megaphone', label: 'Marketing para gerar procura', title: 'A marca também participa da venda', text: 'A Bubbles investirá em divulgação, conteúdo e presença nas redes sociais para aumentar o reconhecimento da linha e apoiar o trabalho de distribuidores e lojistas.' },
  { icon: 'TrendingUp', label: 'Margem competitiva', title: 'Mais espaço para rentabilizar cada venda', text: 'Condições comerciais estruturadas para que o parceiro tenha competitividade na revenda e uma operação saudável no ponto de venda.' },
] as const

// 6 das 11 perguntas de CARE_FAQ (lib/care.ts), extraídas por referência pra não
// duplicar texto: as que respondem objeção de negócio + a objeção do groomer
// (reforça o bloco CareBServiceProof, repetição intencional).
const FAQ_B_PERGUNTAS = [
  'Qual a margem real de ganho revendendo a Care?',
  'Quanto eu preciso comprar pra começar?',
  'Se eu vender o kit pro tutor, eu perco ele do meu banho e tosa?',
  'Como funciona a reposição depois do primeiro pedido?',
  'A Bubbles vai divulgar a linha pros meus clientes, ou fico sozinho nisso?',
  'Tem risco de a Care concorrer com o que eu já vendo hoje?',
] as const

export const CARE_B_FAQ = FAQ_B_PERGUNTAS.map(
  (pergunta) => CARE_FAQ.find((item) => item.q === pergunta)!,
)

export const CARE_B_FINAL_CTA = {
  eyebrow: 'Pré-venda de lançamento',
  h2: 'Faça a conta antes de decidir. Depois, é só se cadastrar.',
  corpo: 'Volte no simulador se quiser, ou garanta agora sua condição de pré-venda e comece a construir essa nova fonte de faturamento no seu negócio.',
} as const
