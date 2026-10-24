// Estratégia de Meta pensada para o Andromeda (o motor de entrega da Meta desde 2026):
// como os 8 grupos de produto viram anúncios dentro de poucos conjuntos.
import { Bloco, Cards, Tabela } from './ui'

export function Andromeda() {
  return (
    <>
      <Bloco
        titulo="Como o Andromeda muda a estrutura"
        nota="Andromeda é o sistema de entrega da Meta desde o início de 2026: ele escolhe a quem mostrar cada anúncio olhando o próprio criativo. Na prática, o criativo virou a segmentação, e público fatiado em muitos conjuntos atrapalha."
      >
        <Cards
          colunas={3}
          itens={[
            { titulo: 'O criativo é a segmentação', selo: 'princípio 1', texto: 'Público amplo e anúncios diferentes entre si. Cada peça fala com um tipo de groomer (quem quer economia, quem quer resultado, quem quer testar antes) e a Meta acha essa pessoa.' },
            { titulo: 'Poucos conjuntos, com volume', selo: 'princípio 2', texto: 'Um conjunto precisa de cerca de 25 compras por semana para sair do aprendizado. Com R$ 875 por dia e custo de R$ 120 por compra, a conta sustenta 2. Em 2025 foram 30 conjuntos e nenhum saiu.' },
            { titulo: 'Diversidade de conceito, não de cor', selo: 'princípio 3', texto: 'O Andromeda junta peças parecidas como se fossem uma só. Vale ter de 8 a 12 conceitos de verdade (oferta, custo por banho, resultado, prova, demonstração) e de 6 a 10 anúncios no ar por conjunto.' },
            { titulo: 'Concentração é normal', selo: 'princípio 4', texto: 'A Meta tende a pôr 60% a 90% da verba num anúncio. Quem ficou com menos de 10% não recebeu chance e não é julgado como ruim.' },
            { titulo: 'Teste com verba reservada', selo: 'princípio 5', texto: 'Em 16/11, as 5 peças novas recebem 15% da verba por 7 dias, para provar resultado sem depender da escolha da Meta.' },
            { titulo: 'Remarketing separado e com peças próprias', selo: 'princípio 6', texto: 'Em 2025, o campeão repetido no remarketing rendeu metade. Lá entram carrosséis por linha e mensagens de "ainda dá tempo" e cashback em dobro.' },
          ]}
        />
      </Bloco>
      <Bloco
        titulo="Os 8 grupos dentro da prospecção"
        nota="Os grupos não viram conjuntos: viram anúncios no mesmo conjunto amplo, e a leitura por grupo continua pelo nome de cada anúncio (ex.: ad02|img|bn26|galoes5l|criativo02). Números = criativos da página de criativos."
      >
        <Tabela
          minimo={820}
          cabecalho={['Grupo', 'Papel na Black', 'No ar em 01 e 03/11', '2ª onda (16/11)', 'Reserva']}
          linhas={[
            ['Galões 5L', 'Motor de ticket: estoque de dezembro com brinde e custo por banho', '2, 3 e 4 (estáticos) · vídeo 6', 'vídeo 7 (conta na tela)', '1 e 5'],
            ['Linha Essential', 'Campeã de 2025: oferta simples de linha', '24 ou N01 (réplica do campeão) · vídeo 26', 'versão nova do líder', '23, 25'],
            ['Kit Experimentação', 'Porta de entrada da Linha PRO: testar antes de abastecer (40% off)', '9 · vídeo 11', '', '8, 10 e 12'],
            ['Kits PRO', 'Resultado no acabamento (20% off)', '16', '13', '14, 15, 17 e 18'],
            ['Perfumes PRO', 'Aumentar o pedido: compre 3, leve 4', '19', 'vídeo 21', '20 e 22'],
            ['Coleção Black', 'Visão geral da oferta para quem não sabe o que quer', '', 'vídeo 38', '35, 36 e 37'],
            ['Xperience', 'Serviço diferenciado; vende melhor para quem já conhece', '', '', '31 a 34 (33 entra se faltar o 38)'],
            ['Collora', 'Novo serviço no banho; curiosidade alta, precisa de educação', '', '', '27 a 30'],
            ['Remarketing (campanha própria)', 'Fechar quem visitou e quem pôs no carrinho', '39 e 40 (carrosséis) e 41', '"preço já valendo" de 09 a 22/11', 'cashback em dobro em 25/11'],
          ]}
        />
      </Bloco>
    </>
  )
}
