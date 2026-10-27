// Seção 7: site. Resumo das decisões e das 7 propostas; o detalhe abre em /site-black-november.
import { IMG } from '@/lib/apresentacao-black-november'
import { Bloco, Callout, Figura, LinkInterno, Lista, Numeros, Secao } from './ui'

export function Site() {
  return (
    <Secao
      id="site"
      resumo={
        <>
          87% das visitas vêm do celular. Os banners da Black já estão briefados, o brinde já entra sozinho no carrinho e a
          barra fixa de compra já existe. O que falta é deixar a Black visível em todo o caminho: abas da home, faixa do
          topo, tag nas fotos, faixa nas coleções, coleção própria e carrinho.
        </>
      }
      roteiro={[
        'Começar pelo que já está pronto: banners, brinde automático (BOGO), barra fixa e imagens comprimidas.',
        'Mostrar as simulações: Black November como primeira aba, faixa preta no topo, tag BLACK nas fotos.',
        'Roleta: apresentar as 4 opções para decisão.',
        'Abrir a página do site para o detalhe de cada proposta.',
      ]}
      pergunta={{
        p: 'Vamos mexer na roleta, que está dando resultado?',
        r: 'Não é obrigatório. A recomendação é deixá-la com cara de Black, com prêmios sem desconto e abrindo depois de 30 segundos.',
      }}
    >
      <Numeros
        itens={[
          { valor: '87%', rotulo: 'das sessões no celular (novembro/25)' },
          { valor: '7', rotulo: 'propostas para decidir' },
          { valor: '5', rotulo: 'itens que já existem ou já foram feitos' },
          { valor: '+4% a +10%', rotulo: 'de faturamento estimado com as 7 propostas' },
        ]}
      />
      <Bloco titulo="Como fica no celular (simulações feitas com o Gemini a partir de prints reais)">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {[
            ['home-faixa-abas-proposta', 'Faixa preta no topo e Black November como 1ª aba'],
            ['colecao-faixa-proposta', 'Faixa rotativa abaixo do banner da coleção'],
            ['pdp-tag-proposta', 'Tag BLACK na foto e selos de desconto em preto'],
            ['colecao-black-banner-proposta', 'Coleção Black com banner baixo'],
            ['roleta-tematica-proposta', 'Roleta temática (uma das 4 opções)'],
          ].map(([src, leg]) => (
            <Figura key={src} src={`${IMG}/${src}.png`} alt={leg} w={704} h={1520} largura={170} legenda={leg} destaque />
          ))}
        </div>
      </Bloco>
      <div className="grid gap-4 md:grid-cols-2">
        <Callout titulo="As 7 propostas">
          <Lista
            itens={[
              'Abas da home: Black November · Galões 5L · Kits PRO · Perfumes · Collora (Care e Promoções saem no mês).',
              'Faixa do topo preta, rotativa e clicável, com mensagem por semana.',
              'Tag BLACK na galeria e nos cards; selos de desconto em preto em novembro.',
              'Faixa rotativa abaixo do banner de cada coleção, sem trocar os banners.',
              'Coleção Black November com banner baixo (briefing pronto).',
              'Cashback em reais dobrado de 25 a 30/11 e troca do selo dos banners.',
              'Roleta: manter, deixar temática, mudar o momento ou pausar (em decisão).',
            ]}
          />
        </Callout>
        <Callout titulo="Já existe ou não vamos fazer">
          <Lista
            itens={[
              'Brinde automático no carrinho e compre 3, leve 4: app BOGO.',
              'Barra fixa de compra, inclusive nas coleções.',
              'Imagens comprimidas.',
              'Banners principais: mantêm a rotação.',
              'Cupons mantidos (não somam com a Black). Sem bloco de oferta na página do produto e sem frete por CEP.',
            ]}
          />
        </Callout>
      </div>
      <LinkInterno href="/site-black-november">Abrir o plano de site completo, com simulações e opções</LinkInterno>
    </Secao>
  )
}
