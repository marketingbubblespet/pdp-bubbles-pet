// src/lib/masterclass-coloracao.ts
// Dados isolados da MasterClass "Coloração pet sem mistério", com Lari Stephanie (29/10/2026).
// Tema claro (DESIGN-SYSTEM.md), mesmo padrão da edição de setembro (Penteados).
// Fonte: briefing da MasterClass de outubro de 2026, respondido em 02/10/2026.
//
// Decisões confirmadas com o usuário antes de codar:
// 1. Acesso: qualquer produto Collora (de qualquer valor) OU qualquer compra a partir de R$399.
// 2. Endereço: /masterclass/coloracao-pet. GTM: GTM-5L9TD3PN, como pedido no briefing
//    (exceção consciente à regra 42, igual às MasterClass anteriores).
// 3. Vitrine: os 20 produtos da coleção Collora, 8 visíveis e o resto em "ver mais".
// 4. O item 11 do briefing falava "depois de 26/10", mas a data mudou pra 29/10: a página
//    vira "aula encerrada + lista de espera" a partir do horário da aula de 29/10.
//
// Pendências do briefing (não inventadas, ficam de fora até virem):
// - Foto da Lari: não foi enviada. Enquanto `photo` for null, a seção "Quem vai ensinar"
//   aparece só com texto e o herói usa uma foto de resultado de coloração.
// - Link do grupo VIP de outubro, cupom da oferta, "para quem NÃO é", material em PDF.
// Preços: puxados da coleção Collora da Shopify em 02/10/2026. Se mudarem na loja,
// atualizar aqui (regra 25: preço só muda com confirmação).
import { BRAND } from '@/lib/constants'

export const MC = {
  slug: 'coloracao-pet',
  program: 'Outubro',

  title: 'Coloração pet sem mistério: do zero à prática em uma aula',
  subtitle:
    'Avaliar o pet, escolher a cor, preparar o pelo, aplicar com segurança e transformar a coloração em um serviço que aumenta o ticket do seu pet shop.',
  transformation:
    'Ao final, você vai saber decidir com segurança se o pet pode ser colorido, aplicar um primeiro design simples e cobrar pela coloração como serviço.',

  date: '29/10',
  dateFull: '29 de outubro',
  weekday: 'quinta-feira',
  time: '19h',
  duration: '2 horas',
  format: 'Online, ao vivo',
  platform: 'Google Meet',
  targetDateISO: '2026-10-29T19:00:00-03:00',

  accessRule: 'Compre qualquer produto Collora ou a partir de R$399 em qualquer produto',
  accessShort: 'Acesso liberado na compra de qualquer produto Collora ou em compras a partir de R$ 399',
  purchaseDeadline: '29/10', // regra fixa (CONVENCOES #23): nunca depois do dia da aula
  minPurchase: 399,
  collectionUrl: 'https://www.bubbles.com.br/collections/collora',

  whatsapp: BRAND.whatsapp,
  whatsappGroupUrl: null as string | null, // pendente no briefing
  whatsappDoubtMsg: 'Olá! Tenho uma dúvida sobre a MasterClass de Coloração Pet.',
  whatsappWaitlistMsg: 'Olá! Quero entrar na lista de espera da próxima MasterClass de Coloração Pet.',

  hasCertificate: true,
  hasReplay: true,
  hasVipGroup: true,
  hasQA: true,
} as const

const SHOP = 'https://www.bubbles.com.br/products/'
const IMG = '/images/masterclass/coloracao/produtos/'

// Ordem = ordem na página. Os 8 primeiros seguem o passo a passo da aula (kits de
// entrada, preparo, cor, diluição, acabamento); o resto aparece em "ver mais".
const PRODUTOS = [
  ['kit-pet-iniciante-coloracao', 'Kit Collora Iniciante Coloração', 'Kit', 548.9],
  ['kit-pet-completo-coloracao', 'Kit Collora Completo Coloração', 'Kit', 1015.9],
  ['kit-collora-kit-aplicador', 'Kit Máscaras Pigmentadoras + Kit Aplicador de brinde', 'Kit', 656.9],
  ['spray-pet-preparo-collora-100ml', 'Spray Preparo Collora', '100ml', 31.9],
  ['kit-pet-mascaras-pigmentadoras-collora-7-itens', 'Kit Máscaras Pigmentadoras Collora', '7 cores', 653.9],
  ['mascara-pet-diluidora-collora-500g', 'Máscara Diluidora Collora', '500g', 61.9],
  ['kit-pet-cores-primarias-collora-3-itens', 'Kit Cores Primárias Collora', '3 itens', 328.86],
  ['kit-pet-duo-glitters-prata-e-dourado-collora-2-itens', 'Kit Duo Glitters Prata e Dourado', '2 itens', 137.9],
  ['kit-pet-duo-mascaras-pigmentadoras-azul-e-rosa-collora-2-itens', 'Kit Duo Azul e Rosa', '2 itens', 219.9],
  ['kit-pet-duo-mascaras-pigmentadoras-rosa-e-roxa-collora-2-itens', 'Kit Duo Rosa e Roxa', '2 itens', 219.9],
  ['mascara-pet-pigmentadora-collora-100g-rosa', 'Máscara Pigmentadora Rosa', '100g', 115.9],
  ['mascara-pet-pigmentadora-collora-100g-roxa', 'Máscara Pigmentadora Roxa', '100g', 115.9],
  ['mascara-pet-pigmentadora-collora-100g-azul', 'Máscara Pigmentadora Azul', '100g', 115.9],
  ['mascara-pet-pigmentadora-collora-100g-verde', 'Máscara Pigmentadora Verde', '100g', 115.9],
  ['mascara-pet-pigmentadora-collora-100g-amarela', 'Máscara Pigmentadora Amarela', '100g', 115.9],
  ['mascara-pet-pigmentadora-collora-100g-laranja', 'Máscara Pigmentadora Laranja', '100g', 115.9],
  ['mascara-pet-pigmentadora-collora-100g-vermelha', 'Máscara Pigmentadora Vermelha', '100g', 115.9],
  ['glitter-pet-em-po-collora-15g-prata', 'Glitter em Pó Prata', '15g', 72.9],
  ['glitter-pet-em-po-collora-15g-dourado', 'Glitter em Pó Dourado', '15g', 72.9],
  ['kit-pet-aplicador-collora-3-itens', 'Kit Aplicador Collora', '3 itens', 25.9],
] as const

export const MC_PRODUCTS = PRODUTOS.map(([handle, nome, detalhe, preco]) => ({
  handle,
  nome,
  detalhe,
  preco,
  url: `${SHOP}${handle}`,
  image: `${IMG}${handle}.webp`,
}))

export const MC_PRODUCTS_VISIBLE = 8

// Fotos de resultados enviadas no briefing (pasta "FOTOS DE COLORAÇÃO").
export const MC_GALLERY = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  src: `/images/masterclass/coloracao/resultado-${n}.webp`,
  alt: `Pet com coloração Collora, resultado ${n}`,
}))

export const MC_HERO_IMAGE = {
  src: '/images/masterclass/coloracao/hero.webp',
  alt: 'Shih Tzu com coloração arco-íris feita com Collora',
}

// Itens da linha (fotos do briefing + informações de docs/brand/produtos.md).
const ITEM = '/images/masterclass/coloracao/itens/'
export const MC_COLORS = [
  { nome: 'Red', tom: 'Vermelha', image: `${ITEM}red.webp` },
  { nome: 'Orange', tom: 'Laranja', image: `${ITEM}orange.webp` },
  { nome: 'Yellow', tom: 'Amarela', image: `${ITEM}yellow.webp` },
  { nome: 'Green', tom: 'Verde', image: `${ITEM}green.webp` },
  { nome: 'Blue', tom: 'Azul', image: `${ITEM}blue.webp` },
  { nome: 'Purple', tom: 'Roxa', image: `${ITEM}purple.webp` },
  { nome: 'Pink', tom: 'Rosa', image: `${ITEM}pink.webp` },
] as const

export const MC_LINE_ITEMS = [
  {
    nome: 'Spray Preparo',
    detalhe: '100ml',
    texto: 'Prepara o pelo para receber a cor e substitui o banho preparatório. Rende até 400 borrifadas.',
    image: `${ITEM}spray-aplicacao.webp`,
  },
  {
    nome: 'Máscara Diluidora',
    detalhe: '500g',
    texto: 'Dilui as tintas para criar tons intermediários, de 1:1 a 1:30. Rende até 150 pumps.',
    image: `${ITEM}diluidora.webp`,
  },
  {
    nome: 'Glitter Collora',
    detalhe: '15g, prata ou dourado',
    texto: 'Efeito cintilante no acabamento, atóxico e temporário.',
    image: `${ITEM}glitter.webp`,
  },
] as const

export const MC_LINE_STEPS = [
  'Borrife o Spray Preparo',
  'Escolha a cor e, se quiser, dilua na Máscara Diluidora',
  'Aplique no pelo seco e limpo',
  'Aguarde a fixação',
  'Finalize com glitter, se desejar',
] as const
export const MC_PURCHASE_CHANNELS = ['Site', 'WhatsApp oficial de vendas', 'Distribuidores autorizados'] as const

// O que você vai aprender (briefing item 7, resultados concretos)
export const MC_LEARN = [
  'Vai saber avaliar o pet antes de colorir, olhando pelagem, pele e temperamento, para decidir com segurança se pode fazer o serviço ou não.',
  'Vai saber escolher a cor certa para cada pelagem e explicar ao tutor o resultado real, sem prometer um tom que não vai aparecer.',
  'Vai saber preparar o pelo no banho e na secagem para a cor pegar por igual e durar mais.',
  'Vai saber aplicar e finalizar um primeiro design simples, como pontas, orelhas ou rabo, protegendo as áreas sensíveis e respeitando o tempo de pausa.',
  'Vai saber oferecer a coloração como serviço: como apresentar ao tutor, orientar os cuidados em casa e cobrar pelo adicional.',
] as const

export const MC_DELIVERABLES = [
  { icon: 'certificado', text: 'Certificado digital de participação' },
  { icon: 'grupo', text: 'Acesso ao grupo VIP no WhatsApp' },
  { icon: 'replay', text: 'Replay da aula no YouTube' },
] as const

// Para quem é (briefing item 8)
export const MC_AUDIENCE = [
  'Groomer que nunca coloriu e tem medo de errar: quer começar com segurança, sem arriscar a pele do pet nem a confiança do tutor.',
  'Groomer que já tentou colorir e o resultado não ficou bom: a cor manchou, desbotou rápido ou não pegou, e agora quer entender o porquê.',
  'Dono de pet shop que quer um novo serviço para faturar mais: um adicional simples, que aumenta o ticket e diferencia da concorrência.',
  'Groomer que recebe pedidos de coloração e ainda recusa, porque não se sente preparado para atender.',
  'Profissional que quer se destacar nas redes sociais com pets coloridos que chamam atenção e atraem novos clientes.',
] as const

export const MC_INSTRUCTOR = {
  name: 'Lari Stephanie',
  credential: 'Groomer referência em coloração pet',
  bio: 'Lari trabalha com grooming desde 2014 e une duas visões que fazem diferença na prática: a de quem está na mesa de banho e tosa todos os dias e a de quem administra o próprio pet shop. Especialista em coloração pet, ela vai mostrar como transformar a técnica em um serviço seguro, bonito e lucrativo.',
  quote:
    'Quero te ensinar o que aprendi em mais de 10 anos de grooming: como colorir com segurança e transformar isso em um diferencial no seu pet shop.',
  tags: ['Especialista em coloração', 'Aula prática', 'Do zero à prática', 'Online e ao vivo'],
  // Frame do anúncio Meta "VÍDEO 2 - LARI: 1 SERVIÇO 2 FATURAMENTO | Linha Care" (post
  // 1675876747874507, citado em src/app/relatorio-agosto-2026). Trocar pela foto
  // profissional quando ela chegar.
  photo: '/images/masterclass/coloracao/lari.webp' as string | null,
} as const

export const MC_DETAILS = [
  { label: 'Quando', value: `${MC.dateFull} (${MC.weekday}), às ${MC.time}` },
  { label: 'Onde', value: `${MC.format}, pelo ${MC.platform}` },
  { label: 'Duração', value: `${MC.duration}, com espaço para perguntas ao final` },
  { label: 'Como recebe o link', value: `No grupo VIP do WhatsApp, no dia ${MC.date}` },
  { label: 'Lembretes', value: '1 dia antes, 1 hora antes e 15 minutos antes da aula' },
  { label: 'Tem replay?', value: 'Sim, no YouTube' },
  { label: 'Certificado', value: 'Digital, enviado após a participação' },
] as const

export const MC_STEPS = [
  { n: 1, text: `Compre qualquer produto Collora, ou a partir de R$399 em qualquer produto Bubbles, até ${MC.purchaseDeadline}, o mesmo dia da aula.` },
  { n: 2, text: 'Com a compra confirmada, seu acesso ao grupo VIP no WhatsApp é liberado.' },
  { n: 3, text: `No dia ${MC.date}, o link da MasterClass é enviado no grupo.` },
] as const

export const MC_FAQ = [
  { q: 'Quando e onde é a MasterClass?', a: `${MC.dateFull} (${MC.weekday}), às ${MC.time}, ao vivo pelo ${MC.platform}.` },
  { q: 'Preciso comprar para participar?', a: `Sim. O acesso é liberado na compra de qualquer produto Collora, de qualquer valor, ou em compras a partir de R$399 em qualquer produto Bubbles, feitas até ${MC.purchaseDeadline}, o mesmo dia da aula. Vale no site, no WhatsApp oficial de vendas ou em distribuidores autorizados.` },
  { q: 'Comprei antes do anúncio da MasterClass. Tenho acesso?', a: 'Não. Valem só as compras feitas a partir do anúncio da MasterClass até o dia da aula.' },
  { q: 'Como recebo o link de acesso?', a: `Com a compra confirmada, seu acesso ao grupo VIP no WhatsApp é liberado. O link da aula é enviado lá no dia ${MC.date}, com lembretes 1 dia antes, 1 hora antes e 15 minutos antes.` },
  { q: 'Vou poder assistir depois, se eu perder?', a: 'Sim. O replay da aula fica disponível no YouTube.' },
  { q: 'Ganho certificado?', a: 'Sim, certificado digital de participação.' },
  { q: 'Nunca coloriu um pet. A aula serve para mim?', a: 'Sim. A aula vai do zero à prática: começa pela avaliação do pet e pela escolha da cor, até chegar no primeiro design simples e em como cobrar pelo serviço.' },
  { q: 'Vai ter espaço para perguntas?', a: `Sim, a aula tem ${MC.duration} com espaço reservado para perguntas ao final.` },
] as const
