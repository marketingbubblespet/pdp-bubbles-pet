import { Bloco, Callout, Cards, EstudoSecao, Lista, Numeros, Passos, Tabela } from './ui'

export function Estudo5Cosmeticos() {
  return (
    <EstudoSecao
      id="estudo-5"
      numero={5}
      titulo="Expansão lateral: distribuidores de cosméticos humanos"
      resumo="Valida a ideia de vender a Linha Care por quem já distribui beleza para salões, perfumarias e farmácias. A tese: a rota já está paga, então quase toda a margem de 45% vira lucro."
    >
      <Numeros
        itens={[
          { valor: '45%', rotulo: 'margem contra 15% a 25% da linha capilar' },
          { valor: 'R$ 35 a 45,90', rotulo: 'compra por impulso no caixa' },
          { valor: '4646-0/01', rotulo: 'CNAE de cosméticos já inclui produtos para animais' },
          { valor: '15 dias úteis', rotulo: 'cadência de prospecção ativa' },
        ]}
      />

      <Bloco titulo="Quem já fez essa ponte">
        <Cards
          itens={[
            {
              titulo: 'Grupo Boticário, Au.Migos Pets',
              selo: 'Final de 2023',
              texto: (
                <p>
                  Itens de R$ 39,90 a R$ 69,90, vendidos nas lojas, no catálogo do revendedor, no
                  e-commerce Beleza na Web e em farmácias.
                </p>
              ),
            },
            {
              titulo: 'Vizzela, coleção Dog Lovers',
              texto: <p>Maquiagem vegana que explora a sobreposição entre público de beleza e tutores.</p>,
            },
            {
              titulo: 'Beleza na Web e farmácias',
              texto: (
                <p>
                  Vitrine pet junto de cabelo e pele, e corredores de higiene animal ao lado da perfumaria
                  nas redes da Abrafarma.
                </p>
              ),
            },
          ]}
        />
      </Bloco>

      <Bloco titulo="Por que o distribuidor não teria burocracia nova">
        <Tabela
          cabecalho={['Tema', 'Cosmético humano', 'Linha Care', 'Efeito']}
          linhas={[
            ['Órgão regulador', 'Anvisa', 'MAPA', 'Sem conflito fiscal'],
            ['Registro do produto', 'Notificação ou registro', 'Isento (IN MAPA nº 38/1999)', 'Fábrica assume a conformidade'],
            ['CNAE', '4646-0/01', '4646-0/01 (cita cosméticos para animais)', 'Mesmo CNPJ e objeto social'],
            ['Armazém e frota', 'Carga seca', 'Carga seca, frasco lacrado', 'Mesmo galpão e mesmos caminhões'],
          ]}
        />
        <p className="mt-3 text-sm text-[#666666]">
          Antes de usar esses enquadramentos em material comercial, vale validar com contador ou jurídico. O
          estudo os trata como pontos prontos, mas são afirmações legais.
        </p>
      </Bloco>

      <Bloco titulo="Onde a linha vende nessa carteira">
        <Lista
          itens={[
            <>
              <strong className="font-semibold text-[#0D0C0D]">Salões de beleza e clínicas estéticas:</strong>{' '}
              a cliente das classes A e B tem pet, e o caixa é ponto de impulso. Display com banho a seco,
              hidratante de patas e perfume rende venda sem tempo técnico do cabeleireiro.
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Perfumarias e multimarcas:</strong> um ponto de
              cosmética pet limpa segura o cliente que iria ao pet shop.
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Farmácias independentes:</strong> margem acima
              da dos medicamentos tabelados.
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Venda direta e catálogo:</strong> produto de
              apelo afetivo que complementa o pedido habitual de beleza.
            </>,
          ]}
        />
      </Bloco>

      <Bloco titulo="A conta do lucro incremental">
        <Tabela
          cabecalho={['Métrica', 'Linha capilar humana', 'Linha Care']}
          linhas={[
            ['Margem bruta do distribuidor', '15% a 25%', '45%'],
            ['Ticket no balcão', 'R$ 80 a 160, venda assistida', 'R$ 35 a 45,90, impulso'],
            ['Público no ponto de venda', 'Quem tem rotina química específica', 'Quase todo lar com cão ou gato'],
            ['Frete marginal', 'Rateado', 'Perto de zero, usa o espaço ocioso do baú'],
          ]}
        />
        <p className="mt-3 text-sm text-[#666666]">
          Lucro incremental = (volume faturado x 45%) menos o custo marginal de distribuição. Como o custo
          marginal é quase zero, praticamente toda a margem vira contribuição líquida.
        </p>
      </Bloco>

      <Bloco titulo="Pitch consultivo em 5 fases">
        <Lista
          itens={[
            'Diagnóstico da rota: o caminhão já roda toda semana, que produto de alta margem ele leva?',
            'Oportunidade: o Boticário já estruturou marca pet, a fronteira entre autocuidado e cuidado animal caiu no ponto de venda.',
            'Apresentação da linha: cosmética profissional para uso domiciliar, 100% vegana e hipoalergênica, sem jargão veterinário.',
            'Mecanismo financeiro: 45% de margem, mesmo CNAE, isenção de registro e mesma caixa de despacho.',
            'Risco operacional: expositores compactos de balcão e treinamento de 20 minutos para os representantes.',
          ]}
        />
      </Bloco>

      <Bloco titulo="Cadência de prospecção (15 dias úteis)">
        <Passos
          itens={[
            { marca: 'Dia 1', titulo: 'LinkedIn', texto: 'Conexão com o sócio ou diretor, sem mensagem invasiva.' },
            { marca: 'Dia 2', titulo: 'E-mail de abertura', texto: 'Margem de 45% e monetização da rota de salões.' },
            { marca: 'Dia 4', titulo: 'WhatsApp', texto: 'Foto do display de caixa e proposta de ganho marginal.' },
            { marca: 'Dia 7', titulo: 'Ligação', texto: 'Conversa consultiva sobre margem comprimida na carteira atual.' },
            { marca: 'Dia 9', titulo: 'E-mail de prova', texto: 'CNAE idêntico, precedentes como o Boticário.' },
            { marca: 'Dia 12', titulo: 'WhatsApp', texto: 'Convite para demonstração de 15 minutos e envio de mostruário.' },
            { marca: 'Dia 15', titulo: 'E-mail de despedida', texto: 'Encerra a cadência e retira a exclusividade da região.' },
          ]}
        />
      </Bloco>

      <Callout titulo="Três diretrizes do estudo">
        <Lista
          itens={[
            'Neutralizar o medo regulatório no primeiro contato, com a prova de CNAE e da isenção de registro.',
            'Manter o foco na carteira já existente do distribuidor (salões, perfumarias, drogarias), sem competir com agropecuárias e hospitais veterinários.',
            'Entregar ferramentas de ativação: mostruários de cheiro, embalagem com apelo de cosmética de prestígio e displays compactos para dar giro curto na gôndola.',
          ]}
        />
      </Callout>
    </EstudoSecao>
  )
}
