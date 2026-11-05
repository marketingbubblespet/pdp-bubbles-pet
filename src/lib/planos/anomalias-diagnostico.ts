// src/lib/planos/anomalias-diagnostico.ts
// Hipóteses e plano de ação para cada tipo de anomalia (indicador × queda/alta).
// Texto pensado para a operação da loja Groomer (B2B, galões, distribuidor).
import type { Direcao, Indicador } from './anomalias'

type Diagnostico = { hipoteses: string[]; plano: string[] }

export const NOME_INDICADOR: Record<Indicador, string> = {
  receita: 'Receita captada (Groomer)',
  pedidos: 'Pedidos (Groomer)',
  sessoes: 'Sessões (Groomer)',
  aprovacao: '% de aprovação (Groomer)',
  conversao: 'Taxa de conversão (Groomer)',
  investimento: 'Investimento em mídia (Groomer)',
  roas: 'ROAS captado (Groomer)',
  ticket: 'Ticket médio (Groomer)',
}

const CHECAGEM_BASE = 'Confirmar na planilha se o dia foi preenchido por completo (preenchimento parcial parece queda).'

export const DIAGNOSTICO: Record<Indicador, Record<Direcao, Diagnostico>> = {
  receita: {
    queda: {
      hipoteses: ['Site lento ou fora do ar em parte do dia', 'Erro no checkout ou no gateway de pagamento', 'Campanha pausada, reprovada ou com orçamento esgotado', 'Produto campeão (galão 5L) sem estoque', 'Efeito do dia da semana (domingo e feriado vendem menos)', 'Preenchimento manual ainda incompleto'],
      plano: [CHECAGEM_BASE, 'Fazer uma compra teste completa no celular, até a tela de pagamento', 'Ver no Meta e no Google se as campanhas entregaram normalmente e se há anúncio reprovado', 'Conferir estoque dos 10 mais vendidos na Shopify', 'Comparar com o mesmo dia da semana anterior antes de agir', 'Rodar o PageSpeed da home e de uma PDP de galão'],
    },
    alta: {
      hipoteses: ['Pedido grande atípico (distribuidor ou salão comprando volume)', 'Ação de e-mail, WhatsApp ou cupom que funcionou', 'Lançamento duplicado na planilha'],
      plano: ['Abrir os maiores pedidos do dia na Shopify e ver a origem (UTM/canal)', 'Se foi ação de marketing, registrar o que foi feito para repetir', 'Conferir se o valor não foi digitado duas vezes'],
    },
  },
  pedidos: {
    queda: {
      hipoteses: ['Checkout com erro (frete não calcula, cupom falhando)', 'Menos tráfego qualificado (campanha pausada ou público errado)', 'Site lento no celular', 'Produto principal indisponível'],
      plano: [CHECAGEM_BASE, 'Testar o checkout com CEPs de regiões diferentes', 'Ver no GA4 o funil carrinho → checkout → compra e em qual etapa as pessoas saem', 'Checar entrega das campanhas no dia'],
    },
    alta: {
      hipoteses: ['Campanha ou ação promocional com boa resposta', 'Várias compras pequenas de teste ou fracionadas'],
      plano: ['Identificar a origem dos pedidos (UTM) e reforçar o que funcionou', 'Ver se o ticket caiu junto (muitos pedidos pequenos)'],
    },
  },
  sessoes: {
    queda: {
      hipoteses: ['Campanha pausada, reprovada ou orçamento esgotado', 'Rastreamento quebrado (GA4 ou integração Adveronix sem dados)', 'Queda no tráfego orgânico ou fim de semana'],
      plano: ['Ver no GA4 em tempo real se o site está registrando visitas', 'Conferir entrega e gasto das campanhas no dia', 'Checar se a tag do GA4 continua carregando nas páginas'],
    },
    alta: {
      hipoteses: ['Campanha nova ou com mais orçamento', 'Tráfego de baixa qualidade ou robô', 'Post ou menção que trouxe visitas'],
      plano: ['Ver a fonte das sessões no GA4', 'Se a conversão caiu junto, desconfiar de tráfego ruim e revisar público e posicionamentos'],
    },
  },
  aprovacao: {
    queda: {
      hipoteses: ['PIX ou boleto gerado e não pago', 'Antifraude recusando cartões', 'Gateway de pagamento instável', 'Cancelamentos por falta de estoque ou erro de frete'],
      plano: ['Listar pedidos pendentes e cancelados do dia na Shopify e ver o motivo', 'Disparar lembrete de pagamento para PIX e boleto em aberto', 'Checar o status do gateway e a taxa de recusa de cartão'],
    },
    alta: { hipoteses: [], plano: [] },
  },
  conversao: {
    queda: {
      hipoteses: ['Erro no checkout ou cálculo de frete', 'Site lento (principalmente no celular)', 'Tráfego de pior qualidade entrando', 'Preço, cupom ou cashback não aparecendo certo', 'Sessões infladas por robô'],
      plano: ['Fazer compra teste completa no celular', 'Ver no GA4 em que etapa do funil a queda aconteceu', 'Comparar a conversão por canal (pago x orgânico) para isolar a origem', 'Conferir se cupom e cashback da campanha estão ativos'],
    },
    alta: {
      hipoteses: ['Ação comercial forte no dia', 'Sessões subnotificadas (rastreamento perdendo visitas), o que infla a taxa'],
      plano: ['Validar se o número de sessões do dia está coerente com o investimento', 'Se a alta for real, identificar o canal e reforçar'],
    },
  },
  investimento: {
    queda: {
      hipoteses: ['Orçamento diário esgotado ou limite do cartão da conta de anúncios', 'Campanha pausada ou anúncio reprovado', 'Dado de investimento ainda não importado na planilha'],
      plano: ['Ver o status de pagamento das contas de anúncio', 'Revisar alterações recentes no histórico das contas', 'Confirmar se o Adveronix importou o dia'],
    },
    alta: {
      hipoteses: ['Aumento de orçamento ou campanha nova', 'Erro de configuração de orçamento (diário x vitalício)'],
      plano: ['Conferir o histórico de alterações das campanhas', 'Verificar se o ROAS acompanhou; se não, voltar o orçamento'],
    },
  },
  roas: {
    queda: {
      hipoteses: ['Gasto subiu sem retorno (campanha ou público ruim)', 'Criativo saturado (frequência alta)', 'Receita do dia ainda não preenchida por completo', 'Venda atribuída a outro dia (compra B2B costuma levar mais tempo)'],
      plano: ['Identificar a campanha que mais gastou no dia e o retorno dela', 'Pausar ou reduzir os conjuntos com pior retorno', 'Revisar criativos com frequência acima de 3', CHECAGEM_BASE],
    },
    alta: {
      hipoteses: ['Venda grande atribuída ao dia', 'Investimento menor que o normal no dia'],
      plano: ['Ver se o investimento caiu (ROAS alto com gasto baixo não escala)', 'Se a campanha está eficiente, testar aumento de orçamento aos poucos (20% a cada 2 ou 3 dias)'],
    },
  },
  ticket: {
    queda: {
      hipoteses: ['Mais pedidos de produtos menores (1L, perfumes) e menos galões', 'Kits fora de estoque', 'Cupom ou desconto mais agressivo'],
      plano: ['Ver o mix de produtos vendidos no dia', 'Reforçar ofertas de galão 5L e kits nos anúncios e na home', 'Testar frete grátis a partir de um valor para puxar o ticket'],
    },
    alta: {
      hipoteses: ['Pedido grande de distribuidor ou salão', 'Kits vendendo bem'],
      plano: ['Identificar o cliente e o produto do pedido grande', 'Avaliar ação de recompra para esse perfil'],
    },
  },
}
