// Seção 7: site. Resumo das decisões e das 10 propostas (versão de 28/10); o detalhe abre em /site-black-november.
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
        'Mostrar as simulações: Black November como primeira aba, faixa no topo com cronômetro, tag OFERTA BLACK nas fotos.',
        'Decidido em 28/10: fundo escuro com os tons de 2025, página de produto da Black, roleta em tema escuro.',
        'Abrir a página do site para o detalhe de cada proposta.',
      ]}
      pergunta={{
        p: 'Vamos mexer na roleta, que está dando resultado?',
        r: 'Ela fica, em tema escuro, com 5% no Pix, 50% no site, 10% na Linha Care e Tente de novo. A abertura depois de 30 segundos está em análise com a Brexa.',
      }}
    >
      <Numeros
        itens={[
          { valor: '87%', rotulo: 'das sessões no celular (novembro/25)' },
          { valor: '10', rotulo: 'propostas decididas em 28/10' },
          { valor: '5', rotulo: 'itens que já existem ou já foram feitos' },
          { valor: '+4% a +10%', rotulo: 'de faturamento estimado com as 7 propostas originais' },
        ]}
      />
      <Bloco titulo="Como fica no celular (simulações feitas com o Gemini a partir de prints reais)">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {[
            ['home-faixa-abas-proposta', 'Faixa preta no topo e Black November como 1ª aba'],
            ['colecao-faixa-proposta', 'Faixa rotativa abaixo do banner da coleção'],
            ['pdp-tag-proposta', 'Tag OFERTA BLACK na foto e selos de desconto em preto'],
            ['colecao-black-banner-proposta', 'Coleção Black com banner baixo e destaque por item'],
            ['roleta-tematica-proposta', 'Roleta em tema escuro (referência)'],
          ].map(([src, leg]) => (
            <Figura key={src} src={`${IMG}/${src}.png`} alt={leg} w={704} h={1520} largura={170} legenda={leg} destaque />
          ))}
        </div>
      </Bloco>
      <div className="grid gap-4 md:grid-cols-2">
        <Callout titulo="As 10 propostas (28/10)">
          <Lista
            itens={[
              'Abas da home: Black November (destacada) · Kits · Shampoos · Collora · Care; Promoções sai; no menu, "Black November".',
              'Faixa do topo atual mantida, com mensagens de até 10x e cashback, e o cronômetro acima.',
              'Tag OFERTA BLACK na galeria e nos cards, sumindo sozinha depois de 30/11; selos de desconto em preto.',
              'Faixa rotativa nova abaixo do banner da home e das coleções.',
              'Coleção Black November com banner baixo e destaque por item, como na coleção PRO.',
              'Cashback num lugar só (5%, e 10% a partir de 23/11) e até 10x sem juros no lugar do 6x.',
              'Roleta em tema escuro: 5% no Pix, 50% no site, 10% Linha Care, Tente de novo.',
              'Blocos escuros com os tons de 2025 (header e rodapé como estão) e checkout da Black.',
              'Página de produto da Black, sem a seção do BEMVINDO10.',
              'Faixa com cronômetro por semanas, em todo o site.',
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
