// Seções 4, 5 e 6: oferta e calendário; Meta Ads; Google Ads e Merchant Center.
import { IMG } from '@/lib/apresentacao-black-november'
import { Bloco, Callout, Cards, Figura, LinkInterno, Lista, Numeros, Passos, Secao, Tabela } from './ui'
import { Andromeda } from './Andromeda'

export function Estrategia() {
  return (
    <Secao
      id="estrategia"
      resumo={
        <>
          As ofertas valem o mês inteiro, sem ondas. O argumento forte é o brinde que aumenta o pedido, porque a maior
          parte do catálogo fica entre 10% e 20%. O cashback em dobro entra só no fim (25 a 30/11) para puxar a recompra
          de dezembro.
        </>
      }
      roteiro={[
        'A tabela de ofertas é a oficial: nada fora dela entra em anúncio.',
        'Pedidos acima de R$ 500 foram 78% da receita em 2025: brinde e kit valem mais que desconto alto.',
        '40% só no Kit Experimentação; nunca "até 40%" como promessa geral.',
        'Calendário: oferta no dia 1, segunda onda em 16/11, cashback em dobro em 25/11.',
      ]}
    >
      <Bloco
        titulo="Ofertas oficiais da Black November 2026"
        nota="Em todas as compras: cashback (em dobro de 25 a 30/11, em todos os pedidos) e 6x sem juros. As ofertas não acumulam com cupons (PRIMEIRA10 e BEMVINDO10). Enquanto durarem os estoques. Diferente de 2025, quando a Linha Essential foi a mais trabalhada (e a que mais vendeu), em 2026 o foco é a Linha PRO, puxada principalmente pelo Kit Experimentação."
      >
        <Tabela
          cabecalho={['Linha', 'Produto', 'Oferta']}
          destaque={[0, 5]}
          linhas={[
            ['PRO', 'Kit Experimentação Linha PRO', '40% off (único item a 40%)'],
            ['PRO', 'Galões 5L de shampoo e condicionador', '15% off + diluidor de brinde'],
            ['PRO', 'Shampoos e condicionadores 1L', '10% off + diluidor de brinde'],
            ['PRO', 'Kits PRO (Cronograma, Liso Intenso, Texturizador)', '20% off'],
            ['PRO', 'Perfumes PRO', '10% off + compre 3, leve 4'],
            ['Essential', 'Kit Completo Linha Essential', '5% off (de R$ 1.634,90 por R$ 1.552,90) + 4 diluidores + jaleco'],
            ['Essential', 'Demais produtos', '10% off + diluidor nos galões'],
            ['Collora', 'Kits e individuais', '15% off nos kits · 10% off nos individuais'],
            ['Xperience', 'Kits', '15% off'],
            ['Care', 'Linha Care', 'Sem promoção: só divulgação'],
          ]}
        />
      </Bloco>
      <Cards
        colunas={4}
        itens={[
          { titulo: 'Oferta desde o dia 1', texto: 'Em 2025 a loja foi de 7 pedidos em 31/10 para 21 em 01/11. As ofertas valem até 30/11.' },
          { titulo: 'Brinde que aumenta o pedido', texto: 'Diluidor nos galões, jaleco e 4 diluidores no Kit Completo, compre 3, leve 4 nos perfumes.' },
          { titulo: 'Essential como motor', texto: 'Linha Essential foi 37% da receita da loja em novembro/25, 4,9 vezes outubro.' },
          { titulo: 'Cashback em dobro no fim', texto: 'De 25 a 30/11, em todos os pedidos: crédito para o estoque de dezembro, que caiu 70% em 2025.' },
        ]}
      />
      <Bloco titulo="Calendário">
        <Passos
          itens={[
            { marca: 'S1 · 01 a 08/11', titulo: 'Abertura (domingo, com feriado na segunda)', texto: 'Site da Black às 00h, 7 anúncios estáticos e o remarketing; 3 vídeos em 03/11; teste de catálogo de 03 a 16/11.' },
            { marca: 'S2 · 09 a 15/11', titulo: 'Manter, sem escalar', texto: 'Semana em que a Meta perdeu eficiência em 2025. Mensagem: "o preço da Black já está valendo". Primeira leitura de conversão em 10/11.' },
            { marca: 'S3 · 16 a 22/11', titulo: 'Segunda onda', texto: 'Teste de criativo com 5 peças novas em 16/11 (15% da verba por 7 dias). Leitura completa em 20/11 (2/3 da Black).' },
            { marca: 'S4 · 23 a 30/11', titulo: 'Black Week', texto: 'Cashback em dobro na quarta 25/11; Black Friday na sexta 27/11; Cyber Monday e último dia na segunda 30/11. Verba sobe em degraus de 20%.' },
            { marca: '01/12', titulo: 'Saída', texto: 'Preços voltam às 00h. Em 15/12, lembrete para quem comprou: "seu cashback está disponível, hora de repor o estoque".' },
          ]}
        />
      </Bloco>
    </Secao>
  )
}

export function MetaAds() {
  return (
    <Secao
      id="meta"
      resumo={
        <>
          Três campanhas de compra, com dois conjuntos que aprendem o mês inteiro em vez de trinta. A Meta divide a
          verba entre os anúncios; a leitura por linha de produto continua pelo nome de cada anúncio.
        </>
      }
      roteiro={[
        'Por que poucos conjuntos: cada um precisa de cerca de 25 compras por semana para sair do aprendizado; a conta sustenta 2.',
        'Remarketing com peso na Black Week (de 14% para 26% da verba do dia), o contrário de 2025.',
        'Catálogo volta como teste pequeno, com prazo e critério de saída.',
        'Régua: ROAS de último clique de 2,0 para decidir verba; escala de no máximo 20% a cada 48 horas.',
      ]}
      pergunta={{
        p: 'Se o anúncio campeão concentrar a verba, os outros não aparecem?',
        r: 'É o normal desde a mudança de leilão da Meta em 2026. Anúncio que não recebeu verba não é julgado; o teste de 16/11 reserva 15% para dar entrega às peças novas.',
      }}
    >
      <Numeros
        itens={[
          { valor: 'R$ 30 mil', rotulo: 'verba da Black na Meta (2025: R$ 23 mil)' },
          { valor: '2', rotulo: 'conjuntos que aprendem o mês todo (2025: 30). Estrutura em refinamento' },
          { valor: '41 + 6', rotulo: 'criativos aprovados e peças novas (réplica do campeão, "preço já valendo" e 4 de cashback em dobro)' },
          { valor: '2,0', rotulo: 'ROAS de último clique: régua para escalar ou cortar' },
        ]}
      />
      <Andromeda />
      <Bloco
        titulo="A referência que funcionou em 2025: o vídeo da bancada"
        nota="Os outros anúncios de 2025 eram tradicionais ou reaproveitados; este foi o que se destacou. Roteiro completo em entregas/2026-11_black-november_roteiro-video-bancada.md."
      >
        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          <Figura src={`${IMG}/ref-2025-video-bancada.png`} alt="Anúncio de vídeo da Black 2025 com a bancada de produtos" w={370} h={622} largura={200} legenda="vdeo|promo|black_friday_2025|black_geral|24nov (Oliver Pet)" />
          <div className="space-y-4">
            <Numeros
              itens={[
                { valor: '12', rotulo: 'compras nos últimos dias da Black 2025' },
                { valor: '10,79', rotulo: 'ROAS Reportado (contagem da Meta)' },
                { valor: 'R$ 65', rotulo: 'custo por compra' },
                { valor: '34 s', rotulo: 'plano fixo, uma pessoa falando' },
              ]}
            />
            <Cards
              colunas={2}
              itens={[
                { titulo: 'Por que funcionou', texto: 'Pessoa real falando com o groomer; bancada com todas as linhas ("tudo está na Black"); argumento de negócio: estoque de fim de ano sem pesar no bolso; desconto e brinde juntos.' },
                { titulo: 'Como fica em 2026', texto: 'Mesma bancada organizada por linha, faixa real de desconto (nada de "até 40%"), diluidor de brinde e Kit Experimentação em destaque. Uma gravação, três aberturas: mês todo (16/11), cashback em dobro (25/11) e último dia (30/11).' },
              ]}
            />
          </div>
        </div>
      </Bloco>
      <Callout titulo="Em refinamento: estrutura das campanhas">
        <Lista
          itens={[
            'A estrutura abaixo ainda está sendo refinada. A dúvida principal: deixar só 1 conjunto amplo com tudo terá boa performance no Andromeda, com 8 grupos de promoção diferentes?',
            'Página de destino: cada promoção pode levar para a coleção com o produto em destaque ou para a página tradicional do produto. A escolha muda a leitura de cada grupo e precisa ser definida por grupo.',
            'Pergunta em aberto: de todos os itens em promoção, qual é o melhor para puxar as vendas sem risco de quebra de estoque? O Kit Experimentação é um forte candidato, mas o ticket dele é baixo e pode reduzir o faturamento.',
          ]}
        />
      </Callout>
      <Bloco titulo="Estrutura das campanhas">
        <Tabela
          cabecalho={['Campanha', 'Para quem', 'Período', 'Verba']}
          linhas={[
            ['C1 · Prospecção', 'Público amplo: Brasil inteiro ou só os estados-chave usados desde março (em decisão). Conjunto de cashback em dobro com as peças que mais venderam, de 25 a 30/11', '01 a 30/11', 'R$ 24.120 (80%)'],
            ['C2 · Remarketing Quente', 'Visitou o site ou pôs no carrinho nos últimos 14 dias', '01 a 30/11', 'R$ 4.020 (13%)'],
            ['C2 · Remarketing Impactados', 'Assistiu a 75% ou 95% dos vídeos, seguidores, engajou com a marca, visitou o site em 60 dias, leads e clientes', '25 a 30/11', 'R$ 1.160 (4%)'],
            ['C3 · Teste de catálogo', 'Viu produto no site nos últimos 60 dias; carrossel com o preço da Black puxado da loja', '03 a 16/11', 'R$ 700 (2%)'],
          ]}
        />
      </Bloco>
      <Bloco
        titulo="Verba por semana"
        nota="Degraus de 20% em 25/11 e 27/11, só com luz verde da checagem anterior. Um 3º degrau opcional em 29/11, só com verba economizada. R$ 30 mil é teto, não meta."
      >
        <Tabela
          minimo={520}
          cabecalho={['Semana', 'Prospecção', 'Remarketing', 'Catálogo', 'Total', '% do mês']}
          destaque={[3]}
          linhas={[
            ['S1 · 01 a 08/11', 'R$ 6.000', 'R$ 1.000', 'R$ 300', 'R$ 7.300', '24,3%'],
            ['S2 · 09 a 15/11', 'R$ 5.250', 'R$ 875', 'R$ 350', 'R$ 6.475', '21,6%'],
            ['S3 · 16 a 22/11', 'R$ 5.250', 'R$ 875', 'R$ 50', 'R$ 6.175', '20,6%'],
            ['S4 · 23 a 30/11', 'R$ 7.620', 'R$ 2.430', '', 'R$ 10.050', '33,5%'],
          ]}
        />
      </Bloco>
      <Bloco titulo="Criativos e banners" nota="Banners do site já briefados: 3 principais (1920x500 e 745x850) e 3 secundários (500x500).">
        <div className="mb-4 flex flex-wrap gap-3">
          <LinkInterno href="/criativos-black-november">Ver os 41 criativos e o N01</LinkInterno>
        </div>
        <Cards
          colunas={3}
          itens={[
            { titulo: 'Lançamento', selo: '01 e 03/11', texto: '7 estáticos em 01/11 (galões, Kit Experimentação, Kits PRO, perfumes, Essential) e 3 vídeos em 03/11.' },
            { titulo: 'N01 · réplica do campeão', selo: 'em aprovação', texto: '"Linha Essential com 10% off": a fórmula do anúncio que fez 41% das compras de 2025. Entra no lugar do criativo 24 se aprovado.' },
            { titulo: 'Cashback em dobro', selo: '25/11', texto: 'Peças novas no remarketing e as campeãs da prospecção com o selo trocado, num conjunto novo.' },
          ]}
        />
        <div className="mt-6 grid gap-3">
          <Figura src={`${IMG}/bn26_banner-principal1-galoes-brinde_desktop-1920x500.jpg`} alt="Banner principal 1: galões com brinde" w={1920} h={500} largura={1068} legenda="Banner principal 1 · galões com diluidor de brinde" />
          <div className="grid gap-3 md:grid-cols-2">
            <Figura src={`${IMG}/bn26_banner-principal2-kits-pro_desktop-1920x500.jpg`} alt="Banner principal 2: Kits PRO" w={1920} h={500} largura={526} legenda="Banner principal 2 · Kits PRO" />
            <Figura src={`${IMG}/bn26_banner-principal3-kit-experimentacao_desktop-1920x500.jpg`} alt="Banner principal 3: Kit Experimentação" w={1920} h={500} largura={526} legenda="Banner principal 3 · Kit Experimentação" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Figura src={`${IMG}/bn26_banner-secundario1-colecao-black_500x500.jpg`} alt="Banner secundário 1: coleção Black" w={500} h={500} largura={340} legenda="Secundário 1 · coleção Black" />
            <Figura src={`${IMG}/bn26_banner-secundario2-kit-experimentacao_500x500.jpg`} alt="Banner secundário 2: Kit Experimentação" w={500} h={500} largura={340} legenda="Secundário 2 · Kit Experimentação" />
            <Figura src={`${IMG}/bn26_banner-secundario3-collora-mascaras_500x500.jpg`} alt="Banner secundário 3: máscaras Collora" w={500} h={500} largura={340} legenda="Secundário 3 · máscaras Collora" />
          </div>
        </div>
      </Bloco>
    </Secao>
  )
}

export function GoogleAds() {
  return (
    <Secao
      id="google"
      resumo={
        <>
          No Google a Black não cria procura nova: ela converte quem já busca a marca e o produto. Por isso concentramos a
          verba no que vende, criamos uma única campanha nova de Black e reduzimos o que hoje não paga.
        </>
      }
      roteiro={[
        'Google pago foi 11% da receita da loja em nov/25 e é 17% hoje: canal em crescimento.',
        'Uma campanha nova (PMax da Black) e proteção da busca de marca, que é o maior retorno da conta.',
        'Régua das PMax: ROAS de último clique de 4,0 para subir verba.',
        'O Merchant é quase todo automático; o que é à mão está na tabela, com prazo de 28/10.',
      ]}
    >
      <Numeros
        itens={[
          { valor: 'R$ 20 mil', rotulo: 'verba do Google em novembro (2025: R$ 12 mil)' },
          { valor: '1', rotulo: 'campanha nova: Performance Max da Black, com início e fim automáticos' },
          { valor: '4,0', rotulo: 'ROAS de último clique para as PMax subirem verba (Search: 2,0)' },
          { valor: '11% → 17%', rotulo: 'parte do Google pago na receita da loja (nov/25 → ago a out/26)' },
        ]}
      />
      <Bloco titulo="O que muda nas campanhas" nota="Não criar campanha de busca de &quot;black friday&quot; nem Demand Gen: não há busca de Black do groomer, e vídeo novo aprenderia no pior momento.">
        <Tabela
          cabecalho={['Ação', 'Campanha', 'Verba no mês', 'Por quê']}
          linhas={[
            ['Manter e proteger', 'Busca de marca', 'R$ 5.970', 'Maior retorno da conta; já perdia 12% das impressões por falta de verba'],
            ['Manter', 'PMax principal (PMAX_TP)', 'R$ 2.490', 'Única PMax acima da régua'],
            ['Criar', 'PMax da Black', 'R$ 5.410', 'Produtos, textos, imagens e vídeos da Black; começa e termina sozinha'],
            ['Reduzir', 'PMax de cobertura', 'R$ 2.100', 'Retorno abaixo de 1; a PMax da Black mostra os mesmos produtos com a oferta'],
            ['Reduzir', 'Buscas de produto e de meio de funil', 'R$ 2.700', 'Retorno de 0,34 a 0,64'],
            ['Reserva', 'Antecipar degraus da marca', 'R$ 1.330', 'Só se a busca de marca estiver limitada pela verba'],
          ]}
        />
      </Bloco>
      <Bloco titulo="Verba por semana">
        <Tabela
          minimo={420}
          cabecalho={['S1', 'S2', 'S3', 'S4', 'Reserva', 'Total']}
          linhas={[['R$ 4.112', 'R$ 3.878', 'R$ 4.424', 'R$ 6.256', 'R$ 1.330', 'R$ 20.000']]}
        />
      </Bloco>
      <Bloco titulo="Merchant Center: o que é automático e o que é à mão">
        <Tabela
          cabecalho={['Item', 'Como', 'Impacto']}
          linhas={[
            ['Preço da Black (de/por), estoque, títulos e imagens', 'Automático pelo app da Shopify. Conferir 2 produtos em 01/11 às 7h', 'Preço errado reprova o produto no Google'],
            ['Brinde (diluidor e jaleco)', 'À mão: 2 promoções no Merchant até 28/10 (análise de 24 a 72 h)', 'Etiqueta de oferta no anúncio de Shopping'],
            ['Rótulo "black26" nos produtos da Black', 'À mão, por regra de feed, até 28/10', 'Separa os produtos da Black na PMax nova'],
            ['6x sem juros', 'Opcional, por feed suplementar', 'Mostra "6x de R$ X" no anúncio'],
            ['Cashback em dobro', 'Não existe no Merchant: vai no texto dos anúncios e no site', 'Sem efeito no feed'],
          ]}
        />
      </Bloco>
      <Callout titulo="Regra de segurança da campanha nova">
        <Lista
          itens={[
            'Ponto de controle em 16/11 com o retorno de 09 a 15/11.',
            'ROAS de último clique de 4,0 ou mais: segue os degraus.',
            'Abaixo da régua: fica em R$ 150 por dia, sem degrau. Abaixo de 1,0: cai para R$ 100 e não sobe mais.',
          ]}
        />
      </Callout>
    </Secao>
  )
}
