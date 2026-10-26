// Plano de site da Black November (página /site-black-november), já com as decisões do gestor de 24/10/2026.
// Simulações feitas com o Gemini a partir de prints reais do site; referência de layout, não arte final.
import { IMG, brl } from '@/lib/apresentacao-black-november'
import { Bloco, Callout, Cards, Figura, Lista, Numeros, Tabela } from './ui'

const BASE = 562140

const fx = (a: number, b: number) =>
  `+${String(a).replace('.', ',')}% a +${String(b).replace('.', ',')}% · ${brl((BASE * a) / 100)} a ${brl((BASE * b) / 100)}`

function Proposta({
  n,
  titulo,
  texto,
  imgs,
  extra,
}: {
  n: number
  titulo: string
  texto: React.ReactNode
  imgs: { src: string; legenda: string; hoje?: boolean }[]
  extra?: React.ReactNode
}) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)] md:p-6">
      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">Proposta {n}</p>
          <h3 className="mt-1 text-xl font-medium text-[#0D0C0D]">{titulo}</h3>
          <div className="mt-3 space-y-3 text-sm text-[#666666] md:text-base">{texto}</div>
          {extra}
        </div>
        <div className="flex gap-3">
          {imgs.map((i) => (
            <Figura
              key={i.src + i.legenda}
              src={`${IMG}/${i.src}.png`}
              alt={i.legenda}
              w={i.hoje ? 780 : 704}
              h={i.hoje ? 1688 : 1520}
              largura={180}
              legenda={i.legenda}
              destaque={!i.hoje}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SitePlano() {
  return (
    <div className="space-y-10">
      <Numeros
        itens={[
          { valor: '87%', rotulo: 'das sessões no celular (novembro/25)' },
          { valor: '8', rotulo: 'propostas abertas para decisão' },
          { valor: '5', rotulo: 'itens que já existem ou já foram feitos' },
          { valor: '+4% a +11%', rotulo: 'de faturamento estimado se as 8 forem aplicadas (com desconto de sobreposição)' },
        ]}
      />

      <Bloco titulo="O que já existe ou não vamos fazer">
        <Tabela
          minimo={560}
          cabecalho={['Item', 'Situação']}
          linhas={[
            ['Brinde entra sozinho no carrinho e compre 3, leve 4', 'Já existe: app de brinde (BOGO)'],
            ['Barra fixa de compra no celular', 'Já existe, também nas coleções'],
            ['Compressão de imagens e velocidade', 'Já feito'],
            ['3 banners principais da home', 'Briefados; mantêm a rotação atual'],
            ['Cupons PRIMEIRA10 e BEMVINDO10', 'Mantidos: não somam com a Black e funcionam bem'],
            ['Bloco "Sua oferta Black November" na página do produto', 'Não vamos fazer: troca pela tag na galeria (proposta 3)'],
            ['Frete e prazo por CEP antes do botão', 'Não vamos fazer'],
          ]}
        />
      </Bloco>

      <Proposta
        n={1}
        titulo="Abas da home: Black November em primeiro"
        imgs={[
          { src: 'home-1a-tela', legenda: 'Hoje', hoje: true },
          { src: 'home-faixa-abas-proposta', legenda: 'Proposta' },
        ]}
        texto={
          <>
            <p>
              Hoje a segunda seção da home tem Care, Promoções, Collora, Shampoos e Kits. Em novembro, a primeira aba vira
              <strong className="font-semibold text-[#0D0C0D]"> Black November</strong>, aberta por padrão, com os
              produtos em ordem manual (Kit Experimentação, Neutralizador PRO 5L, Neutro Essential 5L, Kits PRO).
            </p>
            <p>
              Sim, &quot;Promoções&quot; fica redundante com a Black. Sugestão para novembro:{' '}
              <strong className="font-semibold text-[#0D0C0D]">Black November · Galões 5L · Kits PRO · Perfumes · Collora</strong>.
              Care sai das abas no mês (não tem desconto) e volta em dezembro.
            </p>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(1, 2)}</p>}
      />

      <Proposta
        n={2}
        titulo="Faixa de avisos do topo: preta, rotativa e clicável"
        imgs={[{ src: 'home-faixa-abas-proposta', legenda: 'Faixa no topo' }]}
        texto={
          <>
            <p>Uma frase por vez, cada uma levando para a oferta:</p>
            <Tabela
              minimo={420}
              cabecalho={['Quando', 'Mensagens']}
              linhas={[
                ['01 a 08/11', '"Black November: diluidor de brinde nos galões 5L ›" · "Kit Experimentação Linha PRO com 40% off ›" · "6x sem juros em tudo ›"'],
                ['09 a 22/11', 'Troca a 3ª por "O preço da Black já está valendo ›" (semana em que a Meta perdeu eficiência em 2025)'],
                ['25 a 30/11', '"Cashback em dobro em todas as compras ›" passa a ser a 1ª mensagem'],
              ]}
            />
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(1, 2)}</p>}
      />

      <Proposta
        n={3}
        titulo="Tag na galeria e selos de desconto em preto"
        imgs={[
          { src: 'pdp-1a-tela', legenda: 'Hoje', hoje: true },
          { src: 'pdp-tag-proposta', legenda: 'Proposta' },
        ]}
        texto={
          <>
            <p>
              Tag pequena no canto da foto, aplicada pelo tema (não gravada na imagem, porque o Google Merchant reprova
              selo na foto), nos produtos com desconto da Black: aparece na galeria do produto e nos cards das coleções.
            </p>
            <Tabela
              minimo={380}
              cabecalho={['Opção de tag', 'Leitura']}
              destaque={[0]}
              linhas={[
                ['BLACK', 'Recomendada: 5 letras, cabe em qualquer card no celular'],
                ['BLACK 26', 'Marca o ano; um pouco maior'],
                ['SÓ NA BLACK', 'Urgência, sem prometer data'],
                ['OFERTA BLACK', 'Mais clara, mas ocupa o dobro no celular'],
                ['BLACK NOV', 'Liga ao nome da campanha'],
              ]}
            />
            <Callout titulo="Observação para novembro">
              <p>
                Todas as tags de desconto do site (percentuais) aparecem em <strong className="font-semibold">preto</strong>{' '}
                durante novembro, no lugar do verde atual. Rosa fica só para brinde.
              </p>
            </Callout>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(0.5, 1.5)}</p>}
      />

      <Proposta
        n={4}
        titulo="Faixa rotativa abaixo do banner das coleções"
        imgs={[
          { src: 'colecao-1a-tela', legenda: 'Hoje', hoje: true },
          { src: 'colecao-faixa-proposta', legenda: 'Proposta' },
        ]}
        texto={
          <>
            <p>
              Os banners das coleções ficam como estão. Logo abaixo entra uma faixa preta fina com as condições da Black,
              trocando a cada 4 segundos e parando no toque:
            </p>
            <Lista
              itens={[
                'Galões e Essential: "Diluidor de brinde nos galões 5L · Cashback em todas as compras · 6x sem juros"',
                'Linha PRO: "Kit Experimentação com 40% off · Kits PRO com 20% off · Perfumes: compre 3, leve 4"',
                'Collora e Xperience: "Kits com 15% off · Cashback em todas as compras · 6x sem juros"',
                'De 25 a 30/11, em todas: "Cashback em dobro em todas as compras" vira a 1ª frase',
              ]}
            />
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(1, 2)}</p>}
      />

      <Proposta
        n={5}
        titulo="Coleção Black November com banner baixo"
        imgs={[{ src: 'colecao-black-banner-proposta', legenda: 'Proposta' }]}
        texto={
          <>
            <p>
              A coleção nova (/collections/black-november), destino dos anúncios gerais, ganha um banner de altura
              reduzida para os produtos aparecerem já na primeira tela do celular, a faixa da proposta 4, filtros por linha
              e ordem manual dos mais vendidos.
            </p>
            <p>Briefing do banner (1920x400 e 745x400) em `entregas/2026-11_black-november_briefing-banner-colecao-black.md`. Simulação do banner:</p>
            <Figura src={`${IMG}/bn26_banner-colecao-black_desktop-1920x400.jpg`} alt="Banner da coleção Black, desktop" w={1920} h={400} largura={620} legenda="Desktop 1920x400" />
            <Figura src={`${IMG}/bn26_banner-colecao-black_mobile-745x400.jpg`} alt="Banner da coleção Black, mobile" w={745} h={400} largura={300} legenda="Mobile 745x400" />
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(2, 4)}</p>}
      />

      <Proposta
        n={6}
        titulo="Carrinho com selo de pedido Black e economia em reais"
        imgs={[{ src: 'carrinho-emblema-proposta', legenda: 'Proposta' }]}
        texto={
          <>
            <p>
              O brinde já entra pelo BOGO. Para reforçar no carrinho: faixa &quot;Pedido Black November&quot; no topo,
              caixa &quot;Você economizou R$ X na Black November&quot; e a linha &quot;Este pedido gera R$ X de
              cashback&quot; (em dobro de 25 a 30/11).
            </p>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(0.5, 1.5)}</p>}
      />

      <Proposta
        n={7}
        titulo="Cashback em reais e selo dos banners no dobro"
        imgs={[]}
        texto={
          <>
            <p>
              O produto já mostra &quot;Ganhe R$ X de cashback&quot;. De 25 a 30/11 o valor exibido precisa dobrar no
              produto, no carrinho e na página de obrigado (com a validade do crédito, quando definida).
            </p>
            <p>
              Os 3 banners principais têm o selo &quot;5% de cashback&quot;: em 25/11, 00h, sobem as versões com
              &quot;cashback em dobro&quot; (pedido à criação até 20/11; está no plano de ação).
            </p>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(1, 3)}</p>}
      />

      <Proposta
        n={8}
        titulo='Roleta "Gire e ganhe": decisão da Mariane'
        imgs={[
          { src: 'home-chegada', legenda: 'Hoje', hoje: true },
          { src: 'roleta-tematica-proposta', legenda: 'Opção B' },
        ]}
        texto={
          <>
            <p>
              A roleta tem trazido resultado, e não haverá outros descontos de Black além dos já definidos. Hoje ela dá 5%
              ou 10% off e frete grátis, que não somam com a Black. As opções:
            </p>
            <Tabela
              minimo={640}
              cabecalho={['Opção', 'A favor', 'Contra']}
              linhas={[
                ['A · Manter como está', 'Nada muda; segue captando e-mails; os cupons valem fora dos produtos da Black', 'Abre em tela cheia antes da oferta para quem vem do anúncio; 5% ou 10% parecem pouco perto da Black e confundem'],
                ['B · Roleta temática Black (simulação)', 'Mantém a captação com cara de campanha; prêmios sem desconto (amostra, brinde surpresa, e-book)', 'Precisa definir e ter estoque dos prêmios; ainda abre antes da oferta'],
                ['C · Mudar o momento', 'Mantém a roleta, mas abre só depois de 30 segundos, na 2ª página ou ao tentar sair', 'Configuração do app; capta um pouco menos e-mails'],
                ['D · Pausar em novembro', 'Chegada limpa: a oferta da Black aparece primeiro', 'Perde a captação de e-mails no mês de maior tráfego'],
              ]}
            />
            <p className="text-sm">
              Recomendação: <strong className="font-semibold text-[#0D0C0D]">B com o momento de C</strong>: roleta com
              cara de Black, prêmios sem desconto e abrindo depois de 30 segundos ou na 2ª página.
            </p>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: de neutro a {fx(1, 3)}</p>}
      />

      <Cards
        colunas={2}
        itens={[
          {
            titulo: 'Recuperação de carrinho: boas práticas (CRM)',
            selo: 'execução fora da agência',
            texto: (
              <Lista
                itens={[
                  '1ª mensagem de 30 a 60 minutos depois do abandono (Pix: antes de expirar).',
                  '2ª em 24 horas e, no máximo, uma 3ª em 48 a 72 horas. Parar assim que a pessoa comprar.',
                  'Sem desconto extra: lembrar o preço da Black, o brinde e o cashback.',
                  'WhatsApp e e-mail só para quem autorizou (LGPD), com opção de sair.',
                  'Mostrar o produto deixado, com foto e link direto para o carrinho.',
                ]}
              />
            ),
          },
          {
            titulo: 'Como o impacto foi estimado',
            texto: (
              <p>
                Sobre a projeção base da loja ({brl(BASE)}), com faixas de referência de mercado. As propostas se
                sobrepõem: o total aplica 40% de desconto e não é a soma. São estimativas para priorizar, não promessa.
              </p>
            ),
          },
        ]}
      />
    </div>
  )
}
