import { Bloco, Callout, Cards, EstudoSecao, Lista, Numeros, Tabela } from './ui'

type Anuncio = { foco: string; titulos: string[]; descricoes: string[] }

const ANUNCIOS: Anuncio[] = [
  {
    foco: 'Supermercado e atacarejo: margem e giro',
    titulos: ['Alta Margem e Rápido Giro', 'Linha Care Bubbles B2B', 'Cosméticos Pet Atacado'],
    descricoes: [
      'Aumente o ticket médio do seu supermercado com produtos premium de alta rentabilidade.',
      'Margem superior e alto giro. Cosmética pet validada para as prateleiras do seu negócio.',
    ],
  },
  {
    foco: 'Perfumaria e loja conceito: embalagem elegante',
    titulos: ['Cosméticos Pet Premium', 'Design e Embalagem Elegante', 'Fornecedor Linha Pet B2B'],
    descricoes: [
      'Atraia clientes exigentes com uma linha de cosmética pet de estética sofisticada e visual.',
      'Sem infantilização. Body splash e cuidados pet com apresentação de perfumaria de luxo.',
    ],
  },
  {
    foco: 'Agropecuária e varejo pet: validação profissional',
    titulos: ['A Marca de +5000 Groomers', 'Banho de Pet Shop em Casa', 'Revenda Linha Care Bubbles'],
    descricoes: [
      'Distribua a linha vegana e cruelty-free que os maiores especialistas do mercado aprovam.',
      'Qualidade profissional agora pronta para uso doméstico. Seja um distribuidor autorizado.',
    ],
  },
]

// Mostra o texto e a contagem real de caracteres (limite do Google: 30 títulos, 90 descrições).
function Linha({ texto, limite }: { texto: string; limite: number }) {
  const estoura = texto.length > limite
  return (
    <li className="flex items-start justify-between gap-3 text-sm">
      <span className="text-[#0D0C0D]">{texto}</span>
      <span className={`shrink-0 text-xs ${estoura ? 'font-semibold text-[#E8649A]' : 'text-[#666666]'}`}>
        {texto.length}/{limite}
      </span>
    </li>
  )
}

export function Estudo6GoogleAds() {
  return (
    <EstudoSecao
      id="estudo-6"
      numero={6}
      titulo="Google Ads para supermercados, atacarejos e perfumarias"
      resumo="Estratégia de pesquisa paga para achar o comprador B2B no momento em que ele procura fornecedor: palavras de fundo de funil, lista pesada de negativas, três anúncios por perfil e retorno das vendas fechadas ao Google."
    >
      <Numeros
        itens={[
          { valor: '170 mi', rotulo: 'animais de estimação no Brasil' },
          { valor: '54%', rotulo: 'dos consumidores já compram pet em supermercado' },
          { valor: '1% a 3%', rotulo: 'margem líquida do varejo alimentar' },
          { valor: '35% a 50%', rotulo: 'margem de referência em pet care' },
        ]}
      />

      <Bloco titulo="A lógica da campanha">
        <Lista
          itens={[
            'No Meta o impacto é passivo, por interesse. Na pesquisa do Google o comprador está procurando fornecedor agora.',
            'Termos como "shampoo pet" misturam tutor, tosador e comprador de atacarejo. Em correspondência ampla, a verba some em poucas horas com consumidor final.',
            'Por isso só entram palavras de fundo de funil, com "fornecedor", "distribuidor", "atacado", "direto da fábrica" ou "para revenda", em correspondência exata e de frase.',
            'Pesquisas de topo de funil, como "margem de lucro produtos pet", ficam para SEO e conteúdo, não para o leilão.',
          ]}
        />
      </Bloco>

      <Bloco titulo="Palavras-chave por perfil de comprador">
        <Tabela
          cabecalho={['Perfil', 'Palavra-chave', 'Por que funciona']}
          linhas={[
            ['Distribuidores e atacadistas', '[distribuidor cosmético pet atacado]', '"Atacado" é o filtro de intenção.'],
            ['Distribuidores e atacadistas', '"fornecedor shampoo pet direto da fábrica"', 'Quem quer cortar intermediário.'],
            ['Distribuidores e atacadistas', '[comprar produtos pet no atacado para revenda]', '"Para revenda" isola o B2B do consumidor.'],
            ['Supermercados', '"linha pet care para supermercados"', 'Gestor de categoria buscando mix não alimentar.'],
            ['Supermercados', '[fornecedor higiene pet para atacarejo]', 'Atacarejo em crescimento, giro acelerado.'],
            ['Perfumarias', '"cosméticos pet premium para revenda"', '"Premium" sinaliza recusa da guerra de preço.'],
            ['Perfumarias', '[distribuidor de perfume pet para lojas]', 'Foco em perfumaria, longe do clínico.'],
            ['Agropecuárias e megastores', '"fornecedor produtos banho pet em casa"', 'Manutenção entre idas ao salão.'],
            ['Agropecuárias e megastores', '[marcas de cosmeticos pet profissional para revenda]', 'Quer o endosso técnico dos groomers.'],
          ]}
        />
        <p className="mt-3 text-sm text-[#666666]">
          Colchetes são correspondência exata, aspas são correspondência de frase. Lance sugerido: começar
          com Maximizar Cliques com teto de CPC (ou CPC manual otimizado) e migrar para CPA alvo quando
          houver conversões suficientes.
        </p>
      </Bloco>

      <Bloco titulo="Lista de negativas (o escudo da verba)">
        <Tabela
          cabecalho={['Ameaça', 'Exemplos para negativar']}
          linhas={[
            ['Dúvida do tutor', '"como dar banho em cachorro", "receita shampoo pet", "melhor shampoo para shih tzu"'],
            ['Compra local', '"banho e tosa perto de mim", "onde comprar shampoo pet", "telefone pet shop"'],
            ['Caça a desconto', '"shampoo pet barato", "cupom de desconto", "amostra grátis", "shopee", "mercado livre"'],
            ['Pequeno tosador', '"galão de 5 litros", "shampoo diluição 1:10", "máquina de tosa", "soprador pet"'],
            ['Outros nichos', '"ração", "bravecto", "vermífugo", "areia de gato", "coleira", "brinquedos"'],
            ['Emprego e curso', '"vagas de emprego", "curso de banho e tosa", "salário groomer", "franquia pet shop"'],
          ]}
        />
        <p className="mt-3 text-sm text-[#666666]">
          Atenção: a negativa &quot;ração&quot; bloqueia buscas de distribuidores de ração, justamente o perfil ideal
          do estudo 2. Vale decidir antes de subir a lista.
        </p>
      </Bloco>

      <Bloco titulo="Três anúncios, um por perfil">
        <div className="grid gap-4 md:grid-cols-3">
          {ANUNCIOS.map((a) => (
            <div key={a.foco} className="rounded-[12px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">{a.foco}</p>
              <p className="mt-3 text-xs font-semibold text-[#0D0C0D]">Títulos</p>
              <ul className="mt-1 space-y-1">
                {a.titulos.map((t) => (
                  <Linha key={t} texto={t} limite={30} />
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold text-[#0D0C0D]">Descrições</p>
              <ul className="mt-1 space-y-1">
                {a.descricoes.map((d) => (
                  <Linha key={d} texto={d} limite={90} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#666666]">
          As contagens acima são recalculadas pela página e podem diferir das que o estudo anotou.
        </p>
      </Bloco>

      <Bloco titulo="Ativos para ocupar mais espaço no resultado">
        <Cards
          itens={[
            {
              titulo: 'Links de site',
              texto: (
                <p>Política Comercial e Margens, Seja um Revendedor, Catálogo da Linha Care, Conheça a Nossa Fábrica.</p>
              ),
            },
            {
              titulo: 'Frases de destaque',
              texto: (
                <p>Entrega a Nível Nacional, Suporte ao Varejista, Fórmulas 100% Veganas, Kits Prontos a Usar.</p>
              ),
            },
            {
              titulo: 'Snippets estruturados',
              texto: <p>Tipos: Shampoos Profundos, Máscaras, Banho a Seco, Body Splashes.</p>,
            },
          ]}
        />
      </Bloco>

      <Callout titulo="Fechar o ciclo: conversão offline">
        <p>
          Otimizar por CPL baixo atrai contato pequeno, que não passa na qualificação do CRM. A saída é
          devolver ao Google só o que importa: quando o comercial marca a oportunidade como contrato fechado,
          essa conversão (com o valor do contrato) volta para a plataforma. Depois de cerca de 90 dias, o
          algoritmo passa a buscar perfis parecidos com quem de fato fecha.
        </p>
        <p className="text-sm text-[#666666]">
          O estudo cita RD Station, HubSpot, Pipefy e Salesforce como CRMs para essa integração.
        </p>
      </Callout>

      <Callout titulo="Para comparar com a nossa realidade (setembro de 2026)">
        <p>
          O Google Ads está praticamente parado: a campanha PMax Cadastro Distribuidor gastou R$ 22,99 em
          setembro e trouxe 2 leads. A conversão offline também está na lista de pendências da Bubbles (criar
          a ação de conversão no Google), o que combina com a recomendação final do estudo.
        </p>
      </Callout>
    </EstudoSecao>
  )
}
