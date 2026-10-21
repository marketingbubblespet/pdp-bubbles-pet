import { Barras, Bloco, Callout, Cards, EstudoSecao, Lista, Numeros, Tabela } from './ui'

export function Estudo4MetaAds() {
  return (
    <EstudoSecao
      id="estudo-4"
      numero={4}
      titulo="Meta Ads com R$ 2.000 por mês"
      resumo="Como gastar R$ 66,66 por dia para credenciar 2 distribuidores por mês: público aberto, praça controlada, três ângulos de criativo, formulário que filtra e a conta do CAC."
    >
      <Numeros
        itens={[
          { valor: 'R$ 66,66', rotulo: 'verba por dia (R$ 2.000 no mês)' },
          { valor: '~R$ 36', rotulo: 'CPL do formulário de alta intenção' },
          { valor: '~2,1', rotulo: 'distribuidores fechados por mês' },
          { valor: '~R$ 952', rotulo: 'CAC projetado' },
        ]}
      />

      <Bloco titulo="Segmentação: tudo numa campanha só">
        <Tabela
          cabecalho={['Modelo', 'Viabilidade com R$ 2.000', 'Veredito']}
          linhas={[
            ['Público semelhante (lookalike)', 'Baixa: poucos distribuidores históricos para o algoritmo aprender', 'Evitar no início'],
            ['Interesses de pet', 'Média: atrai groomer e tutor, não o atacadista, e divide a verba', 'Desaconselhado'],
            ['Aberto (broad) com copy filtrante', 'Alta: o criativo e o formulário fazem o filtro', 'Recomendado'],
          ]}
        />
        <div className="mt-4">
          <Lista
            itens={[
              'Um único conjunto de anúncios, homens e mulheres de 28 a 55 anos. Dividir a verba derruba cada conjunto abaixo de R$ 20 por dia e trava o aprendizado.',
              'Localização "pessoas que moram nesta localização", nunca o padrão que inclui viajantes.',
              'Cidades já contratadas entram na lista de exclusão do conjunto na hora. Interessados da borda vão para lista de espera.',
              'Expansão em ondas: cidades polo e vizinhas viáveis para o frete.',
            ]}
          />
        </div>
      </Bloco>

      <Bloco titulo="Três ângulos de criativo">
        <Cards
          itens={[
            {
              titulo: 'Margem e payback',
              selo: 'Imagem ou carrossel',
              texto: (
                <>
                  <p>Custo de R$ 21,94 para venda sugerida de R$ 39,90 (margem de 45%) e retorno entre 30 e 45 dias.</p>
                  <p>Botão: Obter Acesso.</p>
                </>
              ),
            },
            {
              titulo: 'Demonstração de produto',
              selo: 'Vídeo vertical 9:16',
              texto: (
                <>
                  <p>Textura, perfume e embalagem, prateleira e display. Mostra que o produto não encalha.</p>
                  <p>Botão: Solicitar Catálogo.</p>
                </>
              ),
            },
            {
              titulo: 'Modelo e exclusividade',
              selo: 'Vídeo do diretor',
              texto: (
                <>
                  <p>Ataca o medo de a fábrica vender direto na praça do distribuidor. Duas vagas por mês.</p>
                  <p>Botão: Verificar Disponibilidade.</p>
                </>
              ),
            },
          ]}
        />
      </Bloco>

      <Bloco titulo="Referência de CPL por formato">
        <Tabela
          cabecalho={['Formato', 'CPL bruto', 'Leads que servem', 'CPL qualificado', 'Lead que vira contrato']}
          linhas={[
            ['WhatsApp direto', 'R$ 8 a 18', '10% a 18%', 'R$ 65 a 110', '1,5% a 2,5%'],
            ['Formulário mais volume', 'R$ 15 a 25', '20% a 30%', 'R$ 60 a 90', '2% a 3,5%'],
            ['Formulário alta intenção', 'R$ 28 a 45', '45% a 60%', 'R$ 55 a 75', '3,5% a 5,5%'],
            ['Landing page externa', 'R$ 50 a 95', '60% a 75%', 'R$ 75 a 130', '4% a 6,5%'],
          ]}
        />
      </Bloco>

      <Bloco titulo="O funil que fecha a conta (formulário de alta intenção)">
        <Barras
          itens={[
            { rotulo: 'Investimento no mês', valor: 'R$ 2.000', largura: 100, destaque: true },
            { rotulo: 'Leads brutos (CPL de R$ 36)', valor: '55 a 56', largura: 82 },
            { rotulo: 'Leads qualificados (50%)', valor: '~28', largura: 62 },
            { rotulo: 'Reuniões (30% dos qualificados)', valor: '8 a 9', largura: 42 },
            { rotulo: 'Distribuidores fechados (25% das reuniões)', valor: '~2,1', largura: 24, destaque: true },
          ]}
          nota="Barras ilustrativas, sem escala real. Conta: R$ 2.000 divididos por 2,1 distribuidores dá CAC de cerca de R$ 952. Com primeiro pedido de R$ 4.000 a R$ 8.000, o estudo estima LTV sobre CAC acima de 5x."
        />
      </Bloco>

      <Bloco titulo="Formulário com 3 travas">
        <Lista
          itens={[
            'Modelo de negócio: distribuidora com carteira PJ passa, representante autônomo passa, lojista de consumo próprio e consumidor final são descartados.',
            'Capital: confirma disponibilidade para o pedido mínimo de abertura (R$ 3.000 a R$ 5.000).',
            'Praça: cidade e estado digitados à mão, para cruzar com o mapa de exclusividade.',
            'Integração: formulário ligado ao CRM por Make ou n8n, com resposta no WhatsApp em até 5 minutos (cadência de 5 a 7 tentativas em uma semana).',
          ]}
        />
      </Bloco>

      <Callout titulo="Para comparar com a nossa realidade (setembro de 2026)">
        <p>
          Investimento de R$ 7.965,25 (Meta e Google), 199 leads e 2 distribuidores fechados: custo de R$ 3.982,63
          por distribuidor, contra os R$ 952 projetados. O CPL da campanha Distribuidor Tradicional ficou em
          cerca de R$ 38,81, próximo do R$ 36 do estudo. A diferença está na conversão depois do lead (reuniões
          e fechamentos), não no custo de captar.
        </p>
        <p className="text-sm text-[#666666]">
          Fechamentos do mês podem vir de leads de meses anteriores, então a comparação é uma ordem de grandeza.
        </p>
      </Callout>
    </EstudoSecao>
  )
}
