// src/lib/live-tosador.ts
// Dados isolados da LP da Live "Dia do Tosador" (não misturar com outras LPs).
import { BRAND } from '@/lib/constants'

export const LIVE = {
  slug: 'live-dia-do-tosador',
  date: '26/07',
  dateFull: '26 de julho',
  weekday: 'domingo',
  time: '19h',
  timezone: 'horário de Brasília',
  duration: '1 hora',
  platform: 'Instagram',
  targetDateISO: '2026-07-26T19:00:00-03:00',
  host: 'Mariane Gutierres e Anna Grandi',
  whatsappGroupUrl: 'https://chat.whatsapp.com/IB4fWtKySFJ6P5SB9aOXU9',
  socialProof: BRAND.groomers, // '+5.000'
} as const

// Apresentadoras da live
export const LIVE_HOSTS = [
  {
    name: 'Mariane Gutierres',
    bio: 'Gerente de Marketing na Bubbles há 4 anos. Chegou pela área de marketing e acompanha os groomers bem de perto: nos eventos, nas redes sociais e nos treinamentos da marca, incluindo os últimos lançamentos e a feira Pet South.',
    quote: 'Mesmo do lado do marketing, eu vivo de perto a dedicação de cada groomer. Essa live é a nossa forma de celebrar quem faz a Bubbles acontecer todos os dias.',
    photoSpec: 'Foto quadrada, rosto centralizado, fundo neutro, mín. 400x400px, .webp ou .jpg',
    bioPending: false,
  },
  {
    name: 'Anna Grandi',
    bio: 'Analista de Social Commerce na Bubbles há 2 anos e meio. Também chegou pelo marketing e vive o mercado pet nos eventos, nas redes sociais e nos treinamentos, com destaque para a feira Pet South, onde mergulha no dia a dia dos groomers e conhece cada cliente de perto.',
    quote: 'O Dia do Tosador é especial porque é quando a gente reconhece toda a dedicação desses profissionais. Na live, vamos comemorar junto com eles, com descontos especiais pra marcar a data.',
    photoSpec: 'Foto quadrada, rosto centralizado, fundo neutro, mín. 400x400px, .webp ou .jpg',
    bioPending: false,
  },
] as const

// O que vai rolar na live (motivos para comparecer ao vivo)
export const LIVE_REASONS = [
  { icon: '🎁', title: 'Novidades em primeira mão', text: 'Produtos e itens exclusivos apresentados só na live. Você conhece antes de todo mundo.' },
  { icon: '🏷️', title: 'Condições de Dia do Tosador', text: 'Descontos liberados exclusivamente durante a transmissão.' },
  { icon: '🎉', title: 'Sorteio ao vivo', text: 'Brindes e produtos sorteados só entre quem está assistindo.' },
  { icon: '💡', title: 'Indicação de quem entende', text: 'Recomendações práticas de produtos para o dia a dia do salão, sem propaganda genérica.' },
  { icon: '📅', title: 'Data única', text: 'A celebração do Dia do Tosador numa live de domingo, sem repetição.' },
] as const

// Por que entrar no grupo (a ponte entre "assistir no Instagram" e "entrar no WhatsApp")
export const LIVE_GROUP_BENEFITS = [
  { icon: '🔔', title: 'Lembrete na hora certa', text: 'A gente te avisa quando a live começar. Você não perde o horário.' },
  { icon: '🏷️', title: 'Promoções exclusivas', text: 'Cupons e condições que circulam primeiro no grupo.' },
  { icon: '👥', title: 'Comunidade de tosadores', text: 'Troca de informação com groomers atuantes de todo o Brasil.' },
] as const

// FAQ
export const LIVE_FAQ = [
  { q: 'Quando e onde é a live?', a: 'Domingo, 26 de julho, às 19h (horário de Brasília), ao vivo no Instagram da Bubbles.' },
  { q: 'Preciso pagar para participar?', a: 'Não. A live é totalmente gratuita.' },
  { q: 'Por que preciso entrar no grupo do WhatsApp?', a: 'É no grupo que avisamos a hora da live e liberamos os cupons e promoções. Entrar no grupo é a forma de não perder nada.' },
  { q: 'Preciso ser cliente Bubbles?', a: 'Não. A live é aberta a todo tosador e groomer, sendo cliente ou não.' },
  { q: 'Como concorro ao sorteio?', a: 'Assistindo à live ao vivo no Instagram. Os sorteios acontecem durante a transmissão.' },
  { q: 'Vai ter desconto?', a: 'Sim. As condições especiais de Dia do Tosador são liberadas só durante a live.' },
] as const
