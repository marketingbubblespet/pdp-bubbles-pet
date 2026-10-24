// Seções 2 e 3: o que a Black 2025 ensinou; mercado, busca e concorrência.
import { Barras, Bloco, Callout, Cards, Lista, Numeros, Secao, Tabela } from './ui'

export function Black2025() {
  return (
    <Secao
      id="black-2025"
      resumo={
        <>
          Novembro de 2025 fez R$ 420.710 na loja, quase três vezes outubro. Na Meta, um anúncio carregou o mês; no
          meio do mês, testes coincidiram com o pior momento da conta; e o site deixou venda pelo caminho.
        </>
      }
      roteiro={[
        'Começar pela loja, que é o número que a diretoria conhece: 694 pedidos e R$ 420.710.',
        'Corrigir a leitura antiga: não foi só ticket, a loja dobrou em pedidos.',
        'Mostrar o campeão (Essential 10% off) e dizer que ele tem réplica no plano de 2026 (N01).',
        'Fechar com dezembro (−70%): é o motivo do cashback em dobro no fim.',
      ]}
      pergunta={{
        p: 'A Meta diz que vendeu R$ 175 mil. Por que vocês usam R$ 35 mil?',
        r: 'A Meta conta quem viu ou clicou em 7 dias; a loja só credita o último clique com UTM. A verdade está no meio, por isso a régua da casa é o último clique (Nemu) e a loja por dia.',
      }}
    >
      <Numeros
        itens={[
          { valor: '+112%', rotulo: 'pedidos da loja contra outubro/25 (694 contra 327)' },
          { valor: '+188%', rotulo: 'receita da loja contra outubro/25' },
          { valor: 'R$ 606', rotulo: 'ticket médio da Black (outubro: R$ 446)' },
          { valor: '−70%', rotulo: 'dezembro/25 contra novembro: o groomer antecipou o estoque' },
        ]}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Bloco titulo="A loja mês a mês (Shopify)">
          <Tabela
            minimo={360}
            cabecalho={['Mês', 'Pedidos', 'Receita', 'Ticket']}
            destaque={[1]}
            linhas={[
              ['Outubro/25', '327', 'R$ 145.965', 'R$ 446'],
              ['Novembro/25', '694', 'R$ 420.710', 'R$ 606'],
              ['Dezembro/25', '286', 'R$ 125.368', 'R$ 438'],
            ]}
          />
        </Bloco>
        <Bloco titulo="A loja por semana de novembro (receita por dia)">
          <Barras
            itens={[
              { rotulo: 'S1 · 01 a 09/11 · 19,3 pedidos/dia', valor: 'R$ 11.270', largura: 59 },
              { rotulo: 'S2 · 10 a 16/11 · 19,6 pedidos/dia', valor: 'R$ 13.005', largura: 68 },
              { rotulo: 'S3 · 17 a 23/11 · 24,9 pedidos/dia', valor: 'R$ 13.513', largura: 71 },
              { rotulo: 'S4 · 24 a 30/11 · 29,9 pedidos/dia', valor: 'R$ 19.093', largura: 100, destaque: true },
            ]}
            nota="Maior dia: sexta 28/11, com 58 pedidos e R$ 37.811."
          />
        </Bloco>
      </div>
      <Bloco
        titulo="A mídia em 2025 (só havia Meta e Google)"
        nota="Meta: compras e ROAS na contagem da própria Meta (clique de 7 dias ou visualização de 1 dia). A coluna de último clique vem da UTM registrada na Shopify, que é comparável com a régua de 2026. Google e Meta ficam em linhas separadas, nunca somados."
      >
        <Tabela
          cabecalho={['Canal', 'Investimento', 'Contagem da plataforma', 'Último clique na loja (UTM)', 'Leitura']}
          linhas={[
            ['Meta Ads', 'R$ 23.006', '262 compras · ROAS 7,64', '73 pedidos · R$ 35.697', 'Campeão: Linha Essential com 10% off, 41% das compras'],
            ['Google Ads', 'R$ 12.000', 'não disponível para nov/25', '83 pedidos · R$ 46.025', 'Busca de marca e produto; não há busca de Black do groomer'],
          ]}
        />
      </Bloco>
      <Bloco titulo="Meta semana a semana (contagem da Meta)">
        <Tabela
          minimo={560}
          cabecalho={['Semana', 'Investimento', 'Compras', 'ROAS Reportado', 'Leitura']}
          destaque={[1]}
          linhas={[
            ['S1 · 01 a 09/11', 'R$ 5.754', '74', '9,29', 'Oferta no ar desde o dia 1 pegou quem se abastece cedo'],
            ['S2 · 10 a 16/11', 'R$ 6.069', '45', '4,40', 'Maior gasto com testes de catálogo: a Meta perdeu eficiência, a loja não caiu'],
            ['S3 · 17 a 23/11', 'R$ 4.008', '58', '9,54', 'Corte do que não vendia e 2ª onda de criativos: semana mais eficiente'],
            ['S4 · 24 a 30/11', 'R$ 7.174', '85', '7,99', 'Maior volume, leilão mais caro; remarketing ficou com pouca verba'],
          ]}
        />
      </Bloco>
      <div className="grid gap-4 md:grid-cols-2">
        <Callout titulo="Deu certo e vamos repetir">
          <Lista
            itens={[
              'Oferta no ar desde 01/11, valendo o mês todo, com a mesma peça até o fim.',
              'Linha Essential com desconto simples em imagem estática: 51% da receita atribuída pela Meta; Essential foi 37% da receita da loja e o Kit Completo Essential, o produto nº 1.',
              'Cortar o que não vendia no meio do mês (16 e 17/11).',
              'Segunda onda de criativos de 17 a 19/11: 49 compras.',
              'Peça nova com oferta concreta no remarketing (kit com 40% off).',
            ]}
          />
        </Callout>
        <Callout titulo="Deu errado e vamos evitar">
          <Lista
            itens={[
              'Verba alta e testes no meio do mês: a S2 levou 26% da verba e 17% das compras.',
              'Catálogo sem desenho de teste: R$ 2.022 com retorno abaixo do resto da conta.',
              'Remarketing com verba de semana comum na Black Week (15% da verba da S4).',
              '30 conjuntos para 262 compras: nenhum saiu da fase de aprendizado.',
              'Site: só 46,5% dos cliques chegaram a abrir a página e 21% dos checkouts viraram compra.',
            ]}
          />
        </Callout>
      </div>
    </Secao>
  )
}

export function Mercado() {
  return (
    <Secao
      id="mercado"
      resumo={
        <>
          O e-commerce brasileiro cresceu 36% na Black November de 2025, com o pico concentrado nas primeiras horas da
          quinta e da sexta. Para cosmético pet profissional, novembro não é pico de busca: a Black do groomer é
          abastecimento, não caça a promoção.
        </>
      }
      roteiro={[
        'Mercado: a última semana concentra cerca de 31% de novembro; a Bubbles seguiu essa curva (32%).',
        'O consumidor confere se o desconto é real (84%): por isso preço "de" honesto e brinde como argumento.',
        'Busca: "black friday pet" é procura de tutor no varejo. Não vamos gastar com isso.',
        'Concorrentes: ninguém estava com Black no ar em 23/10. Quem entra primeiro pega quem se abastece cedo.',
      ]}
    >
      <Numeros
        itens={[
          { valor: 'R$ 39,2 bi', rotulo: 'Black November 2025 no e-commerce brasileiro (+36,2%, Neotrust)' },
          { valor: 'R$ 4,76 bi', rotulo: 'só na sexta 28/11, o melhor resultado desde 2021' },
          { valor: '31%', rotulo: 'do valor de novembro na semana de 24 a 30/11 (Bubbles: 32%)' },
          { valor: '84%', rotulo: 'dos consumidores conferem se o desconto é real (Google, 2025)' },
        ]}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Callout titulo="O que o mercado ensina">
          <Lista
            itens={[
              'O ticket sobe ao longo da semana: R$ 325 na segunda para cerca de R$ 554 na sexta.',
              'As primeiras 48 horas decidiram 2025: a quinta cresceu mais que a sexta.',
              'Pix cresceu 37,5% na Black (Itaú); recorde de 297 milhões de Pix em 28/11.',
              'Para 2026, 48% dos consumidores já chegam com lista pronta e 41% esperam gastar mais.',
            ]}
          />
        </Callout>
        <Callout titulo="O que a busca do Google mostra (DataForSEO)">
          <Lista
            itens={[
              'Novembro não é pico de busca para cosmético pet: a busca do nicho caiu de 13% a 42% contra anos anteriores.',
              '"Black friday pet" é busca de tutor no varejo e caiu 39%: não vale campanha de Black no Google.',
              'Os brindes são procurados: "diluição 1 para 10" (630 buscas por mês), "jaleco banho e tosa" (170) e "diluidor de shampoo" (140).',
            ]}
          />
        </Callout>
      </div>
      <Bloco
        titulo="Concorrentes: o que anunciavam em 23/10/2026 (Biblioteca de Anúncios da Meta)"
        nota="Coleta pela Apify. Nenhum concorrente tinha anúncio de Black no ar. A Biblioteca não guarda anúncio inativo do Brasil, então o histórico de Black deles não pode ser lido."
      >
        <Cards
          colunas={4}
          itens={[
            { titulo: 'Perigot', selo: 'premium', texto: 'Fala de faturamento e posicionamento com o groomer; separa profissional e tutor; usa catálogo.' },
            { titulo: 'Hydra', selo: 'prova social', texto: 'Não anuncia com o próprio nome: quem anuncia são pet shops clientes citando a marca.' },
            { titulo: 'IBASA', selo: 'outro foco', texto: 'Veterinária e agro, mais uma marca de tutor. Pouca sobreposição com o groomer agora.' },
            { titulo: 'Trem de Pet', selo: 'demonstração', texto: 'Oferece demonstração grátis de banhos: a mesma lógica do nosso Kit Experimentação.' },
          ]}
        />
      </Bloco>
      <Callout titulo="Como a Bubbles responde">
        <Lista
          itens={[
            'Custo por banho e rendimento (galão, diluição), argumento que o concorrente premium não usa.',
            'Brinde que é ferramenta de trabalho (diluidor, jaleco), não desconto maior.',
            'Kit Experimentação com 40% off: testar antes de abastecer.',
            'Pet shops clientes como prova social real, sem depoimento inventado.',
          ]}
        />
      </Callout>
    </Secao>
  )
}
