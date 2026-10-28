// Plano de site da Black November (página /site-black-november), com as decisões do gestor de 24/10 e de 28/10/2026.
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
          { valor: '10', rotulo: 'propostas decididas em 28/10' },
          { valor: '5', rotulo: 'itens que já existem ou já foram feitos' },
          { valor: '+4% a +10%', rotulo: 'de faturamento estimado com as 7 propostas originais (com desconto de sobreposição)' },
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
            ['Cupons PRIMEIRA10 e BEMVINDO10', 'Mantidos: não somam com a Black. A seção do BEMVINDO10 sai da página do produto no template da Black (proposta 9)'],
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
            <p>
              Decisão de 28/10: as abas ficam <strong className="font-semibold text-[#0D0C0D]">Black November (destacada) ·
              Kits · Shampoos · Collora · Care</strong>; Promoções sai. No menu do topo, &quot;Promoções&quot; vira
              &quot;Black November&quot;, apontando para a coleção Black (ajuste manual no painel).
            </p>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(1, 2)}</p>}
      />

      <Proposta
        n={2}
        titulo="Faixa de avisos do topo: fica a atual, com o cronômetro acima"
        imgs={[{ src: 'home-faixa-abas-proposta', legenda: 'Faixa no topo' }]}
        texto={
          <>
            <p>
              Decisão de 28/10: a faixa atual <strong className="font-semibold text-[#0D0C0D]">não sai</strong>. O cronômetro
              (proposta 10) entra acima dela, e as duas ficam juntas pelo contraste. O que muda são as mensagens de
              parcelamento e cashback, lidas de uma configuração central do tema:
            </p>
            <Tabela
              minimo={420}
              cabecalho={['Quando', 'Mensagens']}
              linhas={[
                ['01 a 08/11', '"Black November: diluidor de brinde nos galões 5L ›" · "Kit Experimentação Linha PRO com 40% off ›" · "Até 10x sem juros ›"'],
                ['09 a 22/11', 'Troca a 3ª por "O preço da Black já está valendo ›" (semana em que a Meta perdeu eficiência em 2025)'],
                ['23 a 30/11', '"Cashback em dobro em todas as compras ›" passa a ser a 1ª mensagem'],
              ]}
            />
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(1, 2)}</p>}
      />

      <Proposta
        n={3}
        titulo="Tag OFERTA BLACK na galeria e selos de desconto em preto"
        imgs={[
          { src: 'pdp-1a-tela', legenda: 'Hoje', hoje: true },
          { src: 'pdp-tag-proposta', legenda: 'Proposta' },
        ]}
        texto={
          <>
            <p>
              Decisão de 28/10: a tag é <strong className="font-semibold text-[#0D0C0D]">OFERTA BLACK</strong>. Fica no canto
              da foto, aplicada pelo tema (não gravada na imagem, porque o Google Merchant reprova selo na foto), só nos
              produtos da Black: aparece na galeria do produto e nos cards das coleções.
            </p>
            <Lista
              itens={[
                'Os produtos da Black recebem uma etiqueta interna no painel; o tema mostra a tag só de 01/11 a 30/11 e ela some sozinha depois.',
                'Lista dos produtos que recebem a tag: no plano de tarefas da Black (tarefa SHOP-06).',
                'No fundo escuro, a tag ganha uma borda rosa fina para continuar visível.',
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
        titulo="Faixa nova abaixo do banner (home e coleções)"
        imgs={[
          { src: 'colecao-1a-tela', legenda: 'Hoje', hoje: true },
          { src: 'colecao-faixa-proposta', legenda: 'Proposta' },
        ]}
        texto={
          <>
            <p>
              Os banners ficam como estão. Logo abaixo do banner da home e do banner de cada coleção entra uma faixa preta
              fina com as condições da Black, trocando a cada 4 segundos e parando no toque:
            </p>
            <Lista
              itens={[
                'Galões e Essential: "Diluidor de brinde nos galões 5L · Cashback em todas as compras · até 10x sem juros"',
                'Linha PRO: "Kit Experimentação com 40% off · Kits PRO com 20% off · Perfumes: compre 3, leve 4"',
                'Collora e Xperience: "Kits com 15% off · Cashback em todas as compras · até 10x sem juros"',
                'De 23 a 30/11, em todas: "Cashback em dobro em todas as compras" vira a 1ª frase',
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
              A coleção nova (/collections/black-november), destino dos anúncios de todos os produtos menos o Kit
              Experimentação e o Kit Completo Essential (que vão para a página do produto), usa o{' '}
              <strong className="font-semibold text-[#0D0C0D]">mesmo sistema de destaque por item da coleção da Linha PRO</strong>:
              cada anúncio abre a coleção com o seu produto em destaque. Banner de altura reduzida para os produtos
              aparecerem já na primeira tela do celular, a faixa da proposta 4, filtros por linha e ordem manual.
            </p>
            <p>Briefing do banner em HTML (desktop 1920x400 e mobile mais baixo, 745x400), no mesmo estilo do briefing da home. Simulação do banner:</p>
            <Figura src={`${IMG}/bn26_banner-colecao-black_desktop-1920x400.jpg`} alt="Banner da coleção Black, desktop" w={1920} h={400} largura={620} legenda="Desktop 1920x400" />
            <Figura src={`${IMG}/bn26_banner-colecao-black_mobile-745x400.jpg`} alt="Banner da coleção Black, mobile" w={745} h={400} largura={300} legenda="Mobile 745x400" />
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(2, 4)}</p>}
      />

      <Proposta
        n={6}
        titulo="Cashback e parcelamento num lugar só: 5% vira 10% em 23/11"
        imgs={[]}
        texto={
          <>
            <p>
              O produto já mostra &quot;Ganhe R$ X de cashback&quot;. O percentual passa a morar numa configuração central
              do tema: <strong className="font-semibold text-[#0D0C0D]">5% até 22/11 e 10% de 23/11 00h a 30/11</strong>, com
              a troca automática no produto, no carrinho, nas faixas e na página de obrigado. A validade do crédito (60
              dias) não aparece: citar o prazo tira valor.
            </p>
            <p>
              A mesma configuração guarda o parcelamento: <strong className="font-semibold text-[#0D0C0D]">até 10x sem juros
              em novembro, com parcela mínima de R$ 25</strong> (no lugar do 6x). Todo &quot;6x&quot; do site é levantado e
              trocado; em 01/12, um botão desliga a Black e volta tudo.
            </p>
            <p>
              Os 3 banners principais têm o selo &quot;5% de cashback&quot;: em 23/11, 00h, sobem as versões com
              &quot;cashback em dobro&quot; (pedido à criação em 16/11, entrega até 20/11).
            </p>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: {fx(1, 3)}</p>}
      />

      <Proposta
        n={7}
        titulo='Roleta "Gire e ganhe": tema escuro e prêmios novos'
        imgs={[
          { src: 'home-chegada', legenda: 'Hoje', hoje: true },
          { src: 'roleta-tematica-proposta', legenda: 'Referência' },
        ]}
        texto={
          <>
            <p>Decisão de 28/10: a roleta fica, em tema escuro, com 4 opções.</p>
            <Tabela
              minimo={420}
              cabecalho={['Opção da roleta', 'Observação']}
              linhas={[
                ['5% no Pix', ''],
                ['50% no site', 'Confirmar a chance real de sair: prêmio que nunca sai é risco de propaganda enganosa'],
                ['10% na Linha Care', 'Care está fora da Black: o prêmio não disputa com a oferta'],
                ['Tente de novo', ''],
              ]}
            />
            <p className="text-sm">
              Momento de abrir: a Mariane verifica com a equipe da Brexa se a roleta pode abrir só depois de 30 segundos
              (ou na 2ª página, ou ao tentar sair), para quem chega do anúncio ver a oferta primeiro.
            </p>
          </>
        }
        extra={<p className="mt-3 text-sm font-semibold text-[#0D0C0D]">Impacto estimado: de neutro a {fx(1, 3)}</p>}
      />

      <Proposta
        n={8}
        titulo="Blocos do site em tons escuros, como na Black 2025"
        imgs={[]}
        texto={
          <>
            <p>
              Em novembro os blocos de conteúdo do site ficam escuros, como na Black November de 2025;{' '}
              <strong className="font-semibold text-[#0D0C0D]">o topo (header) e o rodapé mantêm a cor atual</strong>. O
              checkout ganha fundo e logo da Black. Os tons vêm do próprio tema de 2025 (versão arquivada de 28/11/2025),
              variando entre eles para separar os blocos:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                ['#0D0C0D', 'Blocos de fundo e contador'],
                ['#181818', 'Cards de produto e seções alternadas'],
                ['#F4CDD4', 'Botões e destaques'],
              ].map(([cor, uso]) => (
                <div key={cor} className="flex items-center gap-2 rounded-[12px] border border-[#E5E7EB] p-2 pr-3">
                  <span className="h-8 w-8 rounded-[8px] border border-[#E5E7EB]" style={{ background: cor }} />
                  <span className="text-xs">
                    <strong className="font-semibold text-[#0D0C0D]">{cor}</strong>
                    <br />
                    {uso}
                  </span>
                </div>
              ))}
            </div>
            <Lista
              itens={[
                'Texto branco; contraste mínimo de leitura conferido no preço, no preço riscado, nos selos, nas avaliações e nos formulários.',
                'Página do produto: a descrição longa e a tabela de diluição continuam legíveis; fotos de produto ficam como estão, sem filtro.',
                'Feito pelos esquemas de cor do tema, registrado no "antes e depois" e revertido em 01/12.',
              ]}
            />
          </>
        }
      />

      <Proposta
        n={9}
        titulo="Página de produto da Black (variante groomer)"
        imgs={[]}
        texto={
          <>
            <p>
              Um modelo de página de produto só para os itens em promoção, aplicado produto por produto. É o destino direto
              dos anúncios do Kit Experimentação e do Kit Completo Essential.
            </p>
            <Lista
              itens={[
                'Sai a seção do cupom BEMVINDO10 (o cupom não soma com a Black e confunde).',
                'Entram: tag OFERTA BLACK, linha com "até 10x sem juros" e o cashback em reais, o brinde do item e "Não acumula com cupons".',
                'Ficam como estão: avaliações, compre junto, vídeo, ficha técnica e barra fixa de compra.',
                'Em 01/12 cada produto volta ao modelo padrão (tarefa já no plano).',
              ]}
            />
          </>
        }
      />

      <Proposta
        n={10}
        titulo="Faixa com cronômetro no topo do site todo"
        imgs={[]}
        texto={
          <>
            <p>
              Acima da faixa de avisos, em todo o site, como o contador &quot;Últimas horas de Black November&quot; de 2025
              (fundo rosa, número preto). A Mariane planeja a sequência por semanas. O contador sempre conta para uma data
              real:
            </p>
            <Tabela
              minimo={420}
              cabecalho={['Semana', 'Conta até']}
              linhas={[
                ['01 a 08/11', 'Fim da Black (30/11)'],
                ['09 a 22/11', 'Início do cashback em dobro (23/11)'],
                ['23 a 30/11', 'Fim da Black e do cashback em dobro (30/11, 23h59)'],
              ]}
            />
          </>
        }
      />

      <Cards
        colunas={2}
        itens={[
          {
            titulo: 'Recuperação de carrinho: boas práticas (CRM)',
            selo: 'copys com a Viviane (CRM)',
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
