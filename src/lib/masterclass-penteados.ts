// src/lib/masterclass-penteados.ts
// Dados isolados da MasterClass "Penteados que encantam e os produtos por trás", com
// Jéssica Silva. Tema claro (padrão DESIGN-SYSTEM.md), diferente das masterclasses
// anteriores que usam o tema escuro "Midnight Luxury & Cosmic Rose".
// Fonte: docs/briefing-eventos-setembro-2026.md (Bloco 2), respondido em 02/09/2026.
//
// Decisões aplicadas por falta de resposta no briefing (confirmadas com o usuário antes
// de codar, ver resumo da conversa):
// 1. O conteúdo enviado em "Para quem NÃO é" descrevia dores de quem SE BENEFICIA da
//    aula, então foi movido pra MC_AUDIENCE ("Para quem é"). MC_NOT_AUDIENCE ficou vazio.
// 2. Prazo de compra não veio: aplicado "até 28/09" (mesmo dia da aula), por regra fixa
//    do projeto (CONVENCOES.md #23, nunca pode passar da data da aula).
// 3. "É a primeira edição?" não foi respondido, mas "80 inscritos em edições anteriores"
//    foi informado: tratado como NÃO sendo a primeira edição. Sem depoimento/prova
//    disponível pra reaproveitar.
// 4. "Produtos que destravam o acesso" veio como "TODOS OS PRODUTOS": tratado como
//    qualquer compra a partir de R$399 no site, sem vínculo a produto/linha específica
//    (mesmo modelo do MasterClass Spitz Alemão). Por isso não há bloco de vitrine de
//    produtos nesta LP.
import { BRAND } from '@/lib/constants'

export const MC = {
  slug: 'penteados',
  program: 'Setembro',

  title: 'Penteados que encantam e os produtos por trás',
  subtitle:
    'Você vai saber montar um penteado do zero: preparar o pelo, dar volume, prender sem quebrar e finalizar com brilho e perfume.',
  transformation:
    'Ao final, você vai saber montar penteados completos do zero, do escovado ao acabamento, com o produto certo pra cada tipo de pelagem, dentro do tempo de uma bancada real.',

  date: '28/09',
  dateFull: '28 de setembro',
  weekday: 'segunda-feira',
  time: '19h',
  duration: '1h30',
  format: 'Online, ao vivo',
  platform: 'Google Meet',
  targetDateISO: '2026-09-28T19:00:00-03:00',

  accessRule: 'Compre a partir de R$399 em qualquer produto',
  purchaseDeadline: '28/09', // regra fixa: nunca depois do dia da aula
  minPurchase: 399,

  whatsapp: BRAND.whatsapp,
  whatsappGroupUrl: 'https://chat.whatsapp.com/GTYAI1QXaT0Eyomnu2FvNs',
  whatsappReminderMsg: 'Olá! Quero ser avisado quando abrirem as inscrições da próxima MasterClass de Penteados.',

  hasCertificate: true,
  hasReplay: false,
  hasVipGroup: true,
  hasQA: true,

  socialProof: BRAND.groomers,
  previousEditionAttendees: 80,
} as const

// Produtos por trás dos penteados (galeria da seção "Os produtos por trás"). Cada card
// linka direto pro produto na Shopify (abre em nova aba via CtaLink, preservando UTM).
// `hoverImage` ausente = card usa efeito de zoom no hover em vez de troca de imagem
// (caso da Máscara Multifuncional, que só tem uma foto disponível).
export const MC_PRODUCTS = [
  {
    nome: 'Kit Duo Glitters Prata e Dourado',
    linha: 'Collora',
    url: 'https://www.bubbles.com.br/products/kit-pet-duo-glitters-prata-e-dourado-collora-2-itens',
    image: '/images/masterclass/produtos-penteados/collora-glitter-main.webp',
    hoverImage: '/images/masterclass/produtos-penteados/collora-glitter-hover.webp',
  },
  {
    nome: 'Gel Modelador Antifrizz',
    linha: 'PRO · 15ml',
    url: 'https://www.bubbles.com.br/products/gel-modelador-pet-antifrizz-pro-15ml',
    image: '/images/masterclass/produtos-penteados/gel-modelador-main.webp',
    hoverImage: '/images/masterclass/produtos-penteados/gel-modelador-hover.webp',
  },
  {
    nome: 'Máscara Nutritiva',
    linha: 'EGO · 500ml',
    url: 'https://www.bubbles.com.br/products/mascara-pet-nutritiva-ego-500ml',
    image: '/images/masterclass/produtos-penteados/mascara-nutritiva-main.webp',
    hoverImage: '/images/masterclass/produtos-penteados/mascara-nutritiva-hover.webp',
  },
  {
    nome: 'Kit Cronograma de Pelagem',
    linha: 'EGO · 3 itens',
    url: 'https://www.bubbles.com.br/products/kit-pet-cronograma-de-pelagem-ego-3-itens',
    image: '/images/masterclass/produtos-penteados/kit-cronograma-main.webp',
    hoverImage: '/images/masterclass/produtos-penteados/kit-cronograma-hover.webp',
  },
  {
    nome: 'Máscara Multifuncional',
    linha: 'Essential · 500g',
    url: 'https://www.bubbles.com.br/products/mascara-pet-multifuncional-essential-500g',
    image: '/images/masterclass/produtos-penteados/mascara-multifuncional.webp',
    hoverImage: null,
  },
] as const

// Canais onde a compra vale (2.5)
export const MC_PURCHASE_CHANNELS = ['Site', 'WhatsApp oficial de vendas', 'Distribuidores autorizados'] as const

// O que você vai aprender (2.7, resultados concretos, não tópicos)
export const MC_LEARN = [
  { icon: '✂️', text: 'Vai saber preparar o pelo no banho e na secagem para o penteado ter corpo e não desmontar em uma hora.' },
  { icon: '✂️', text: 'Vai saber prender o topete sem repuxar a pele nem quebrar o fio, mesmo em cães que não param quietos.' },
  { icon: '⭐', text: 'Vai saber escolher o produto certo para cada tipo de pelagem, fino, ondulado ou grosso, e o que fazer quando o pelo não segura forma.' },
  { icon: '⭐', text: 'Vai saber montar penteados completos do zero, do escovado ao acabamento, dentro do tempo de uma bancada real.' },
  { icon: '✂️', text: 'Vai saber finalizar com brilho e fixação que aguentam o trajeto até em casa, para o tutor ver o mesmo resultado que viu no pet shop.' },
] as const

// O que você recebe ao participar (2.4, 2.7)
export const MC_DELIVERABLES = [
  { icon: '🎓', text: 'Certificado digital de participação' },
  { icon: '💬', text: 'Acesso ao grupo VIP no WhatsApp' },
  { icon: '🔗', text: 'Link de acesso enviado no grupo, no dia da aula' },
] as const

// Para quem é (2.8, itens movidos de "Para quem NÃO é" após confirmação)
export const MC_AUDIENCE = [
  'Groomer que já faz penteado, mas vê o resultado desmanchar antes do tutor chegar em casa, e quer entender se o problema é a técnica ou o preparo do pelo',
  'Banhista ou tosador que ainda não oferece penteado e quer começar com um serviço simples e bem executado, sem depender de curso longo',
  'Dono de pet shop que quer agregar valor ao banho e cobrar por um acabamento que o cliente enxerga e comenta',
  'Profissional que trava em pelagem difícil (fio fino que não segura, ondulado que arrepia, cão agitado que não deixa prender) e quer saber o que fazer em cada caso',
  'Quem quer se destacar nas redes com o antes e depois e precisa de um resultado bonito o suficiente para virar conteúdo',
] as const

// Para quem NÃO é: vazio (ver nota de decisão no topo do arquivo)
export const MC_NOT_AUDIENCE = [] as const

// Instrutora (2.3)
export const MC_INSTRUCTOR = {
  name: 'Jéssica Silva',
  credential: 'Groomer especialista em penteados pet, com anos de profissão e centenas de atendimentos. Instrutora de cursos por todo o Brasil, une técnica, criatividade e elegância em penteados que encantam tutores e valorizam o serviço.',
  bio: 'Groomer especialista em penteados pet há anos. Ministra cursos pelo Brasil e acredita que técnica, criatividade e elegância transformam um penteado em um serviço que o tutor volta para comprar.',
  tags: ['Groomer', 'Especialista', 'Penteados', 'Técnica'],
  // Fotos diferentes por seção: a primeira foto enviada (retrato) vai no hero, a segunda
  // (com os produtos) fica só em "Quem vai ensinar".
  heroPhoto: '/images/masterclass/jessica-instrutora.webp',
  photo: '/images/masterclass/jessica-hero.webp',
} as const

// Detalhes e logística (2.2, 2.4)
export const MC_DETAILS = [
  { label: 'Quando', value: `${MC.dateFull} (${MC.weekday}), às ${MC.time}` },
  { label: 'Onde', value: `${MC.format}, pelo ${MC.platform}` },
  { label: 'Duração', value: `${MC.duration}, com espaço para perguntas ao final` },
  { label: 'Como recebe o link', value: 'No grupo VIP do WhatsApp, no dia 28/09 às 19h' },
  { label: 'Tem replay?', value: 'Não. É só ao vivo, sem gravação disponível depois.' },
  { label: 'Certificado', value: 'Digital, enviado após a participação' },
] as const

// Passo a passo de acesso (2.5)
export const MC_STEPS = [
  { n: 1, text: `Compre a partir de R$399 em qualquer produto Bubbles até ${MC.purchaseDeadline}, o mesmo dia da aula.` },
  { n: 2, text: 'Seu acesso ao grupo VIP no WhatsApp é liberado automaticamente após a compra.' },
  { n: 3, text: 'No dia 28/09 às 19h, o link da MasterClass é enviado no grupo.' },
] as const

// FAQ
export const MC_FAQ = [
  { q: 'Quando e onde é a MasterClass?', a: `${MC.dateFull} (${MC.weekday}), às ${MC.time}, ao vivo pelo ${MC.platform}.` },
  { q: 'Preciso comprar para participar?', a: `Sim. O acesso é liberado para compras a partir de R$399 em qualquer produto Bubbles, feitas até ${MC.purchaseDeadline}, o mesmo dia da aula. Vale no site, no WhatsApp oficial de vendas ou em distribuidores autorizados.` },
  { q: 'Como recebo o link de acesso?', a: 'Assim que você compra, seu acesso ao grupo VIP no WhatsApp é liberado. É lá que o link da aula é enviado, no dia 28/09 às 19h.' },
  { q: 'Vou poder assistir depois, se eu perder?', a: 'Não. Essa MasterClass é só ao vivo, sem gravação disponível depois.' },
  { q: 'Ganho certificado?', a: 'Sim, certificado digital de participação enviado após a aula.' },
  { q: 'Preciso ser cliente Bubbles?', a: 'Não. A MasterClass é aberta a todo groomer e tosador, sendo cliente ou não, desde que faça a compra que libera o acesso.' },
  { q: 'A aula é boa para quem está começando com penteados?', a: 'Sim. A aula é para todos os níveis, de quem quer começar com um serviço simples até quem já faz penteado mas quer resolver problemas específicos de técnica e durabilidade.' },
  { q: 'Vai ter espaço para perguntas?', a: 'Sim, a aula tem 1h30 com espaço reservado para perguntas ao final.' },
] as const
