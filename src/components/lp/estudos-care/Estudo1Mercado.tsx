import { Barras, Bloco, Callout, Cards, EstudoSecao, Lista, Numeros, Tabela } from './ui'

export function Estudo1Mercado() {
  return (
    <EstudoSecao
      id="estudo-1"
      numero={1}
      titulo="Mercado, concorrentes e matemática da margem"
      resumo="Mapa dos 5 concorrentes do home care premium, de como cada um chega à prateleira e de quanto sobra em cada elo da cadeia. A conclusão: o frasco precisa chegar ao distribuidor por cerca de metade do preço da gôndola."
    >
      <Numeros
        itens={[
          { valor: 'R$ 35 a 45', rotulo: 'ticket da Linha Care ao tutor' },
          { valor: '35% a 50%', rotulo: 'margem de higiene e beleza no pet shop' },
          { valor: '15% a 25%', rotulo: 'margem da ração (o volume que atrai)' },
          { valor: '1,54x a 2,0x', rotulo: 'markup recomendado para cosméticos' },
        ]}
      />

      <Bloco titulo="Os 5 concorrentes diretos">
        <Tabela
          cabecalho={['Marca', 'Posicionamento', 'Como chega à loja', 'Argumento de venda']}
          linhas={[
            [
              'Docg.',
              'Super premium, lifestyle e "pet spa". Itens de patas e perfumes chegam perto de R$ 80.',
              'Venda direta, consultores independentes e franquias monomarca.',
              'Ciência e saúde preventiva com embalagem de luxo.',
            ],
            [
              'Pet Society (Megamazon, PS Care)',
              'Maior potência do grooming. Linha de varejo com ativos da Amazônia.',
              'Distribuidores regionais autorizados, com preferência territorial.',
              'Selo hipoalergênico testado em humanos, representante que treina a loja.',
            ],
            [
              'EcoDog',
              'Nicho ético e ecológico, mesma faixa de R$ 35 a 50.',
              'Distribuidores de nicho (natural, orgânico, ração vegana).',
              'Selo SVB, 100% vegano e cruelty-free.',
            ],
            [
              'Pet Family',
              'Galões de 5 L para o banho e frascos bonitos para a loja.',
              'Atacado direto, combos agressivos, frete consolidado.',
              'Custo baixo ao lojista (R$ 10 a 15 por frasco) e markup acima de 150%.',
            ],
            [
              'Dr. Dog',
              'Cosmecêutica hipoalergênica, discurso quase veterinário.',
              'Pet shops e clínicas.',
              'Tranquilidade para peles sensíveis (Shih Tzu, Spitz, Bulldog).',
            ],
          ]}
        />
      </Bloco>

      <Bloco titulo="Quem fica com quanto: frasco de R$ 40 na gôndola">
        <Barras
          itens={[
            { rotulo: 'Preço final ao tutor', valor: 'R$ 40,00', largura: 100, destaque: true },
            { rotulo: 'Lojista paga ao distribuidor (margem de revenda perto de 40% a 50%)', valor: 'R$ 20 a 24', largura: 60 },
            { rotulo: 'Distribuidor paga à indústria (precisa de 25% a 30%)', valor: 'R$ 15 a 17', largura: 42 },
          ]}
          nota="Exemplo do estudo: custo de R$ 20 e venda a R$ 40 dá markup de 100% (2,0x) e margem de 50%. Markup é sobre o custo, margem é sobre o preço de venda."
        />
      </Bloco>

      <Bloco titulo="Três formas de distribuir, três resultados">
        <Cards
          itens={[
            {
              titulo: 'Hierarquia regional fechada',
              selo: 'Pet Society',
              texto: (
                <p>
                  Território protegido, representante consultor, nunca falta estoque. Exige ceder margem
                  alta ao distribuidor para pagar frota e armazém.
                </p>
              ),
            },
            {
              titulo: 'Venda direta e franquia',
              selo: 'Docg.',
              texto: (
                <p>
                  Ecossistema monomarca, do cosmético ao petisco. Elimina o distribuidor generalista, mas
                  exige uma rede própria.
                </p>
              ),
            },
            {
              titulo: 'Atacado flexível',
              selo: 'Pet Family, EcoDog',
              texto: (
                <p>
                  O lojista compra combos direto ou via distribuidor de nicho. Margem muito alta para quem
                  vende, às custas do controle territorial.
                </p>
              ),
            },
          ]}
        />
      </Bloco>

      <Bloco titulo="Por que o lojista dá espaço na prateleira">
        <Lista
          itens={[
            <>
              <strong className="font-semibold text-[#0D0C0D]">Giro:</strong> o produto sai sem esforço do
              balcão.
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Proteção de margem:</strong> sem guerra de
              preço na gôndola.
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Venda cruzada:</strong> o tutor busca o cão
              depois do banho, gosta da maciez e do perfume, e compra o body splash ou o hidratante para
              estender o resultado. O banho quinzenal rende 50% a 70% de lucro ao pet shop.
            </>,
          ]}
        />
      </Bloco>

      <Callout titulo="Ponto de atenção: reforma tributária">
        <p>
          Os simuladores de markup já embutem CBS (cerca de 8,8%) e IBS (cerca de 17,7%) para 2026 e 2027.
          Se a margem do lojista cair abaixo de 20%, há risco real de prejuízo. Por isso a indústria precisa
          oferecer margem gorda hoje.
        </p>
      </Callout>

      <Callout titulo="Conclusão do estudo">
        <p>
          Três pilares convencem a cadeia: selos que blindam o lojista de risco de reputação, uma conta que
          gere lucro por unidade (custo de revenda em torno de 50% do preço da gôndola) e a venda cruzada
          que prolonga o efeito do banho profissional.
        </p>
      </Callout>
    </EstudoSecao>
  )
}
