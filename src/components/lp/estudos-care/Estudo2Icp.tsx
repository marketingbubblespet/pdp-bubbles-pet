import { Bloco, Callout, Cards, EstudoSecao, Lista, Numeros, Tabela } from './ui'

export function Estudo2Icp() {
  return (
    <EstudoSecao
      id="estudo-2"
      numero={2}
      titulo="Por que a revenda direta falhou e quem é o distribuidor ideal"
      resumo="Explica o fracasso da Linha Care vendida direto ao pet shop (poucas adesões, CPL alto), define o perfil do distribuidor tradicional porta a porta e entrega os três argumentos para vencer o ceticismo dele."
    >
      <Numeros
        itens={[
          { valor: 'R$ 75 bi', rotulo: 'mercado pet brasileiro por ano' },
          { valor: 'R$ 3,3 bi', rotulo: 'Pet Care, com alta de 20%' },
          { valor: 'até 45%', rotulo: 'margem oferecida ao distribuidor' },
          { valor: '2 a 3 meses', rotulo: 'payback prometido' },
        ]}
      />

      <Bloco titulo="Por que o pet shop não vendeu a Linha Care">
        <Tabela
          cabecalho={['Barreira', 'O que acontece', 'Efeito na estratégia']}
          linhas={[
            [
              'Medo de canibalizar o banho e tosa',
              'O serviço é o motor de caixa e de previsibilidade. Home care parece espaçar as visitas.',
              'Rejeição de cosmético profissional para casa, mesmo sendo complementar.',
            ],
            [
              'Perfil técnico, não vendedor',
              'O groomer é um artesão, exausto depois do banho, e o balcão é passivo.',
              'O produto fica parado na prateleira, sem upsell, sem recompra.',
            ],
            [
              'Caixa curto e inadimplência',
              'Gestão amadora, fiado, inadimplência de 10% já é risco sistêmico.',
              'Cosmético vira o primeiro item cortado do orçamento de compras.',
            ],
          ]}
        />
      </Bloco>

      <Bloco titulo="Perfil ideal de distribuidor (ICP)">
        <Tabela
          cabecalho={['Critério', 'Especificação']}
          linhas={[
            ['Porte', 'Faturamento de R$ 300 mil a R$ 2 milhões por mês, atuação regional.'],
            ['Carteira', '200 a 1.000 pontos de venda ativos (pet shops, clínicas, agropecuárias).'],
            ['Tempo de mercado', '3 a 5 anos, com crédito e cobrança já maduros.'],
            ['Equipe', 'Vendedores externos porta a porta, comissionados, rota a cada 7, 15 ou 21 dias.'],
            ['Estrutura', 'Armazém, frota própria ou terceirizada, entregas periódicas.'],
            ['Dor latente', 'Dependência de ração (margem de 8% a 15%, carga pesada e volumosa).'],
          ]}
        />
      </Bloco>

      <Bloco titulo="As três dores do distribuidor e a resposta da Linha Care">
        <Cards
          itens={[
            {
              titulo: 'Margem espremida pelo frete',
              selo: 'Resposta: 45% de margem',
              texto: (
                <p>
                  Cosmético é pequeno, cabe na mesma entrega e eleva a margem da nota inteira sem viagem
                  extra. O payback curto gira o capital várias vezes ao ano.
                </p>
              ),
            },
            {
              titulo: 'Megagrupos e guerra de preço',
              selo: 'Resposta: exclusividade',
              texto: (
                <p>
                  A fusão Petz e Cobasi passa de R$ 7 bi. Com território exclusivo, ninguém mais vende a
                  linha na região e a margem não é corroída por leilão de desconto.
                </p>
              ),
            },
            {
              titulo: 'Estoque morto (sell-in sem sell-out)',
              selo: 'Resposta: material de PDV',
              texto: (
                <p>
                  Display no caixa, régua de gôndola e wobbler vendem sozinhos. O vendedor volta só para
                  repor, em vez de ouvir que o produto encalhou.
                </p>
              ),
            },
          ]}
        />
      </Bloco>

      <Bloco titulo="Os três pitches de venda">
        <Tabela
          cabecalho={['Pitch', 'Objeção que derruba', 'Argumento central']}
          linhas={[
            [
              'Alavanca de rentabilidade',
              '"Mais um shampoo no catálogo, minha equipe só vende ração."',
              'Margem limpa de 45% com cubagem mínima. Basta o vendedor adicionar um expositor ao pedido de ração e o ticket por visita sobe.',
            ],
            [
              'Automação do sell-out',
              '"O produto encalha e a culpa cai no meu vendedor."',
              'A indústria não depende da lábia do lojista. Display no checkout induz a compra por impulso e o representante só repõe.',
            ],
            [
              'Blindagem territorial',
              '"Se eu abrir mercado, vocês vendem para o concorrente."',
              'Exclusividade regional em contrato, sem importação paralela nem megastore na área. Os 45% ficam protegidos.',
            ],
          ]}
        />
      </Bloco>

      <Callout titulo="Como o payback protege contra calote">
        <p>
          Como a margem é alta, o distribuidor recupera o investimento com uma fração menor de clientes
          pagando. Displays perto do caixa estimulam venda de menor valor e à vista (Pix, dinheiro), o que
          dá liquidez ao pet shop para pagar as faturas de 30, 60 ou 90 dias.
        </p>
      </Callout>

      <Bloco titulo="Recomendações de implementação">
        <Lista
          itens={[
            'Fazer due diligence antes de aprovar: equipe externa real, taxa de positivação da carteira, sistema de força de vendas. Distribuidor só de ração e volume exige análise severa.',
            'Amarrar em contrato o uso do material de PDV e a prova por foto, para não repetir o ambiente de encalhe.',
            'Dar exclusividade com metas trimestrais ou semestrais. Quem não positivar a linha perde o monopólio.',
          ]}
        />
      </Bloco>
    </EstudoSecao>
  )
}
