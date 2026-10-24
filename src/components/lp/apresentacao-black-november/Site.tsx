// Seção 7: site. Prints de 24/10/2026, simulações feitas com o Gemini e propostas com impacto estimado.
import { IMG, brl } from '@/lib/apresentacao-black-november'
import { Bloco, Callout, Figura, LinkInterno, Lista, Numeros, Secao, Tabela } from './ui'

const BASE = 562140 // projeção da loja no cenário base com R$ 30 mil na Meta

const PROPOSTAS: [string, string, string, number, number, boolean][] = [
  ['Bloco "Sua oferta Black November" na página do produto', 'Página do produto', 'Dev · 2 a 3 dias', 3, 6, true],
  ['Brinde entra sozinho no carrinho e linha "falta 1 perfume para o 4º grátis"', 'Carrinho', 'Dev · 2 dias + teste', 3, 5, true],
  ['Frete e prazo por CEP antes do botão, com data de corte', 'Produto e carrinho', 'Dev · 1 dia', 2, 4, true],
  ['Velocidade no celular (banner mobile, imagens, vídeo só no toque, menos apps)', 'Site todo', 'Dev · 2 a 3 dias', 2, 5, true],
  ['Desligar a roleta "Gire e ganhe" e o botão flutuante em novembro', 'Site todo', 'Marketing · 10 min', 1, 3, true],
  ['Barra fixa de compra no celular', 'Página do produto', 'Dev · 1 dia', 2, 4, false],
  ['Coleção Black com cabeçalho em texto, filtros e cards padrão', 'Coleção', 'Dev · 2 dias', 2, 4, false],
  ['Régua de Pix não pago e checkout abandonado (WhatsApp e e-mail)', 'Pós-checkout', 'Marketing · 1 dia', 2, 4, false],
  ['Faixa de avisos clicável e "o preço da Black já está valendo"', 'Topo', 'Marketing · meio dia', 1, 2, false],
  ['Atalhos por oferta abaixo do banner principal e 1ª aba Black November', 'Home', 'Dev · meio dia', 1, 2, false],
  ['Cashback em reais dobrado no produto, no carrinho e na página de obrigado', 'Produto, carrinho, obrigado', 'Dev · 1 dia', 1, 3, false],
  ['Banners principais sem rotação automática e inteiros clicáveis', 'Home', 'Dev · meio dia', 0.5, 1.5, false],
  ['Desligar PRIMEIRA10 e BEMVINDO10 na Black e tirar o bloco do cupom do produto', 'Checkout', 'Marketing · 1 hora', 0, 0, false],
]

const fx = (a: number, b: number) =>
  b === 0
    ? 'protege margem'
    : `+${String(a).replace('.', ',')}% a +${String(b).replace('.', ',')}% · ${brl((BASE * a) / 100)} a ${brl((BASE * b) / 100)}`

export function Site() {
  return (
    <Secao
      id="site"
      resumo={
        <>
          87% das visitas vêm do celular. Em 2025, só 46,5% dos cliques pagos chegaram a abrir a página e 79% dos
          checkouts não viraram compra. Hoje, quem chega pelo anúncio encontra primeiro uma roleta de desconto em tela
          cheia. Os banners da Black já estão briefados; abaixo, o que vem em volta deles.
        </>
      }
      roteiro={[
        'Mostrar o print da chegada: a roleta cobre a página e ainda dá cupom que somaria com a Black.',
        'Mostrar a página do produto hoje: adesivo na foto, brinde sem nome, preço sem de/por, "R$0.77" com ponto.',
        'Apresentar as 3 simulações como referência de layout, não arte final.',
        'Pedir a escolha: as 5 essenciais são as de maior impacto com menor esforço.',
      ]}
      pergunta={{
        p: 'Dá para fazer tudo até 31/10?',
        r: 'As 5 essenciais cabem em cerca de 6 a 8 dias de dev, contando teste. O resto entra em novembro, fora dos dias de pico.',
      }}
    >
      <Numeros
        itens={[
          { valor: '87%', rotulo: 'das sessões no celular (novembro/25)' },
          { valor: '46,5%', rotulo: 'dos cliques pagos chegaram a abrir a página em 2025' },
          { valor: '21%', rotulo: 'dos checkouts viraram compra em 2025' },
          { valor: '+6% a +10%', rotulo: 'de faturamento estimado com as 5 propostas essenciais' },
        ]}
      />
      <Bloco
        titulo="Como o site está hoje (celular, 24/10/2026)"
        nota="1: roleta e aviso de cookies na chegada. 2: banner rotativo e primeira aba Care. 3: o banner ocupa a primeira tela da coleção e os produtos ficam para baixo. 4: adesivo de brinde gravado na foto, selo &quot;BRINDE GRÁTIS&quot; sem dizer qual, preço sem de/por e bloco do cupom BEMVINDO10. O cashback em reais já aparece no produto (bom)."
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Figura src={`${IMG}/home-chegada.png`} alt="Home ao chegar pelo celular, com a roleta de desconto" w={780} h={1688} largura={260} legenda="1 · Chegada: roleta e cookies" />
          <Figura src={`${IMG}/home-1a-tela.png`} alt="Home sem pop-ups" w={780} h={1688} largura={260} legenda="2 · Home" />
          <Figura src={`${IMG}/colecao-1a-tela.png`} alt="Coleção Essential" w={780} h={1688} largura={260} legenda="3 · Coleção" />
          <Figura src={`${IMG}/pdp-1a-tela.png`} alt="Página de um galão Essential" w={780} h={1688} largura={260} legenda="4 · Produto" />
        </div>
      </Bloco>
      <Bloco
        titulo="Hoje × proposta (simulação feita com o Gemini a partir dos prints)"
        nota="Ilustração de layout para decidir, não arte final: na home, os rótulos dos galões e os produtos da vitrine são fictícios; na coleção, a segunda linha ainda tem o selo antigo. Preços e textos seguem a tabela oficial."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['home', 'Home: sem roleta, faixa clicável, banner da Black, atalhos por oferta e aba Black November', 'home-chegada'],
            ['colecao', 'Coleção: cabeçalho em texto, filtros e produtos na primeira tela, com de/por e custo por banho', 'colecao-1a-tela'],
            ['pdp', 'Produto: foto limpa, selos, de/por, bloco da oferta e barra fixa de compra', 'pdp-1a-tela'],
          ].map(([n, leg, hoje]) => (
            <div key={n}>
              <div className="grid grid-cols-2 gap-2">
                <Figura src={`${IMG}/${hoje}.png`} alt={`Hoje: ${n}`} w={780} h={1688} largura={170} legenda="Hoje" />
                <Figura src={`${IMG}/${n}-proposta.png`} alt={`Proposta: ${n}`} w={704} h={1524} largura={170} legenda="Proposta" destaque />
              </div>
              <p className="mt-2 text-sm text-[#666666]">{leg}</p>
            </div>
          ))}
        </div>
      </Bloco>
      <Bloco
        titulo="As 5 propostas essenciais, vistas no celular"
        nota="Simulações feitas com o Gemini, para entender a aplicação. O desenho final fica com o time de site."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            ['pdp-proposta', 704, 1524, '1 · Bloco da oferta no produto: de/por, economia, brinde, custo por banho e cashback'],
            ['carrinho-proposta', 704, 1520, '2 · Brinde entra sozinho, progresso do compre 3 leve 4, cashback em reais'],
            ['carrinho-proposta', 704, 1520, '3 · Frete e prazo por CEP antes de finalizar (mesmo carrinho)'],
            ['colecao-proposta', 704, 1524, '4 · Velocidade: coleção sem banner pesado, produto já na primeira tela'],
            ['home-proposta', 704, 1520, '5 · Sem roleta de desconto na chegada; a oferta aparece primeiro'],
          ].map(([src, w, h, leg]) => (
            <Figura key={String(leg)} src={`${IMG}/${src}.png`} alt={String(leg)} w={Number(w)} h={Number(h)} largura={200} legenda={String(leg)} destaque />
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-[200px_1fr] md:items-center">
          <Figura src={`${IMG}/pix-proposta.png`} alt="Mensagem de WhatsApp lembrando o Pix aberto" w={704} h={1520} largura={200} destaque />
          <div>
            <p className="text-base font-medium text-[#0D0C0D]">Também com grande impacto: régua de Pix não pago</p>
            <p className="mt-1 text-sm text-[#666666]">
              Mensagem automática no WhatsApp 20 minutos depois do Pix gerado, antes de ele expirar. Referência de
              mercado: 15% a 20% dos Pix abertos são recuperados. Não depende do dev do site, só da ferramenta de
              mensagens.
            </p>
          </div>
        </div>
      </Bloco>
      <Bloco
        titulo="As propostas e o impacto estimado"
        nota={`Impacto sobre a projeção base da loja (${brl(BASE)}). Faixas tiradas de referência de mercado e do que a Black 2025 mostrou. As propostas se sobrepõem: o total não é a soma (na página de decisão, o total aplica 40% de desconto pela sobreposição).`}
      >
        <Tabela
          minimo={760}
          cabecalho={['Proposta', 'Onde', 'Esforço', 'Impacto estimado no mês']}
          destaque={[0, 1, 2, 3, 4]}
          linhas={PROPOSTAS.map(([t, onde, esf, a, b, ess]) => [
            <span key={t}>
              {ess && (
                <span className="mr-2 rounded-[4px] bg-[#0D0C0D] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#F4CDD4]">
                  essencial
                </span>
              )}
              {t}
            </span>,
            onde,
            esf,
            fx(a, b),
          ])}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <LinkInterno href="/site-black-november">Abrir a página de decisão do site, com protótipos e escolha</LinkInterno>
        </div>
      </Bloco>
      <Callout titulo="Já decidido e briefado">
        <Lista
          itens={[
            '3 banners principais: galões com brinde, Kits PRO e Kit Experimentação, sem texto sobre as bolinhas e setas do carrossel.',
            '3 banners secundários: coleção Black, Kit Experimentação e máscaras Collora.',
            'Ponto a decidir: os banners principais têm o selo "5% de cashback"; em 25/11 eles precisam trocar para o dobro, ou o selo sai sem porcentagem desde já.',
          ]}
        />
      </Callout>
    </Secao>
  )
}
