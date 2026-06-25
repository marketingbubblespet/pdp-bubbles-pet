// src/lib/constants.ts
// ──────────────────────────────────────────────
// Produto
// ──────────────────────────────────────────────
export const PRODUCT = {
  name: 'Shampoo Pet Neutro Essential 5L',
  shortName: 'Shampoo Neutro Essential',
  line: 'Linha Essential',
  volume: '5L',
  dilution: '1:5',
  yieldLiters: 30,
  yieldBaths: 300,
  costPerBath: 'R$ 0,73',
  price: 'R$ 218,90',
  shopifyUrl: 'https://www.bubbles.com.br/products/shampoo-pet-neutro-essential-5l-1-5',
} as const

// ──────────────────────────────────────────────
// Marca
// ──────────────────────────────────────────────
export const BRAND = {
  name: 'Bubbles',
  tagline: 'Cosméticos pet de alta performance para profissionais que não se contentam com o básico.',
  years: '+7 Anos',
  groomers: '+5.000',
  clients: '+20.000',
  rating: '4.9/5.0',
  products: '+50',
  whatsapp: 'https://wa.me/5514996312932',
  instagram: 'https://instagram.com/bubblespet',
} as const

// ──────────────────────────────────────────────
// Avaliações reais (Loox/Judge.me — hardcode como fallback)
// ──────────────────────────────────────────────
export const REVIEWS = [
  {
    name: 'Humberto',
    date: '05/05/2025',
    stars: 5,
    text: 'Shampoo muito cheiroso, não é um shampoo que espuma bastante, mas tira bastante a sujidade da pele e pelos do animal. Gostei bastante.',
  },
  {
    name: 'Gleicemar',
    date: '04/06/2025',
    stars: 5,
    text: 'Muito cheiroso e limpa muito bem. Gostei!!',
  },
  {
    name: 'Eliana',
    date: '23/05/2025',
    stars: 5,
    text: 'Muito cheiroso, e suave!',
  },
  {
    name: 'Valmirene Lucena Tavares',
    date: '17/11/2025',
    stars: 5,
    text: 'Já estava usando. É bom.',
  },
] as const

// ──────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────
export const FAQ = [
  {
    q: 'Qual é a diluição e quanto rende?',
    a: 'A diluição é 1:5: 1 parte de produto para 5 partes de água. Um galão de 5L rende 30L de produto pronto, equivalente a aproximadamente 300 banhos de porte pequeno.',
  },
  {
    q: 'O shampoo realmente neutraliza o odor ou só perfuma?',
    a: 'O Shampoo Neutro Essential age com o ativo Bioex AO diretamente na fonte do mau cheiro, com ação antioxidante e seborreguladora, sem apenas mascarar com fragrância.',
  },
  {
    q: 'Pode ser usado em cães e gatos de qualquer pelagem?',
    a: 'Sim. A fórmula suave com surfactantes de origem vegetal é adequada para todos os tipos de pelagem, incluindo pets com pele sensível.',
  },
  {
    q: 'Pode ser usado diariamente?',
    a: 'Sim. A fórmula promove limpeza equilibrada, permitindo uso diário sem agredir a pele ou ressecar os fios.',
  },
  {
    q: 'Ajuda a controlar a oleosidade?',
    a: 'Sim. O ativo Bioex AO tem ação seborreguladora, auxiliando no controle da oleosidade e mantendo o equilíbrio natural da pele e do pelo.',
  },
  {
    q: 'O produto resseca a pelagem?',
    a: 'Não. A formulação foi desenvolvida para limpar sem ressecar, preservando a hidratação e o toque macio da pelagem.',
  },
  {
    q: 'Facilita o banho e a secagem?',
    a: 'Sim. O shampoo deixa o pelo mais alinhado e leve, facilitando a escovação e a finalização após o banho.',
  },
  {
    q: 'Possui fragrância forte?',
    a: 'Não. A fragrância é suave e equilibrada, ideal para a rotina profissional e para pets mais sensíveis.',
  },
  {
    q: 'Pode ser usado em filhotes?',
    a: 'Não é indicado para animais com menos de 4 semanas de vida. Para filhotes acima dessa idade, a fórmula suave é segura para uso normal.',
  },
  {
    q: 'Posso guardar o produto já diluído?',
    a: 'Não. O produto diluído deve ser usado no mesmo dia. Após 24 horas, entra em processo de oxidação e deve ser descartado. Dilua apenas a quantidade necessária para o dia.',
  },
  {
    q: 'Os produtos Bubbles são testados em animais?',
    a: 'Não. A Bubbles é 100% Cruelty Free: nenhum produto é testado em animais. A linha também é 100% vegana.',
  },
] as const
