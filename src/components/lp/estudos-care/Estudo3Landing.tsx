import { Bloco, Callout, Cards, EstudoSecao, Lista, Tabela } from './ui'

const BLOCOS_PAGINA = [
  'Header minimalista, sem menu e sem link para a loja',
  'Hero com vídeo e fase 1 do formulário',
  'Diagnóstico de canal: o desgaste da margem da ração',
  'Modelo econômico: margem, giro e payback',
  'Vitrine técnica: os 11 SKUs em 4 etapas',
  'Blindagem territorial e anti marketplace',
  'Suporte e materiais de PDV',
  'Kit de homologação (maleta técnica)',
  'Autoridade e casos reais',
  'Formulário completo com praças disponíveis',
  'FAQ de objeções',
  'Footer corporativo com LGPD',
]

export function Estudo3Landing() {
  return (
    <EstudoSecao
      id="estudo-3"
      numero={3}
      titulo="Landing page de credenciamento de distribuidores"
      resumo="Diagnóstico de por que páginas anteriores não converteram (falavam com o distribuidor como se fosse consumidor) e um projeto completo: oferta, 12 blocos, copy, formulário em 3 etapas e CTAs."
    >
      <Bloco titulo="O erro de posicionamento e a virada">
        <Tabela
          cabecalho={['Vetor', 'Distribuição tradicional', 'Linha Care Bubbles']}
          linhas={[
            ['Margem bruta', '15% a 25%, em erosão', 'Até 45% tabelada e protegida em contrato'],
            ['Densidade logística', 'Sacos de 15 a 20 kg, frete alto', 'Frascos de 50 a 300 ml, alto valor por metro cúbico'],
            ['Pressão competitiva', 'Atacarejo e e-commerce', 'Proteção territorial e cláusula anti marketplace'],
            ['Payback', '6 a 12 meses', '2 a 3 meses, com recompra a cada 45 a 60 dias'],
          ]}
        />
      </Bloco>

      <Bloco titulo="Oferta em duas camadas: vídeo primeiro, kit depois">
        <Cards
          colunas={2}
          itens={[
            {
              titulo: 'Camada 1: vídeo de performance',
              selo: 'Primeira dobra',
              texto: (
                <p>
                  Mostra viscosidade, espuma e efeito dos 11 produtos. Derruba o ceticismo sem custo de
                  envio para a fábrica.
                </p>
              ),
            },
            {
              titulo: 'Camada 2: kit degustação como prêmio',
              selo: 'Só para qualificados',
              texto: (
                <p>
                  Maleta enviada somente a quem validar CNPJ, região e equipe de campo. Serve para testar
                  nos 5 melhores clientes. Kit grátis para todos atrai curioso e infla o CPL.
                </p>
              ),
            },
          ]}
        />
      </Bloco>

      <Bloco titulo="Estrutura em 12 blocos">
        <ol className="grid gap-2 md:grid-cols-2">
          {BLOCOS_PAGINA.map((b, i) => (
            <li
              key={b}
              className="flex items-center gap-3 rounded-[12px] bg-white px-4 py-3 text-sm text-[#0D0C0D] shadow-[0_2px_8px_rgba(0,0,0,0.07)]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4CDD4] text-xs font-semibold">
                {i + 1}
              </span>
              {b}
            </li>
          ))}
        </ol>
      </Bloco>

      <Bloco titulo="Os 3 eixos de copy">
        <Tabela
          cabecalho={['Eixo', 'Título proposto', 'Promessa operacional']}
          linhas={[
            [
              'Rentabilidade',
              'Troque a guerra de preços das rações por até 45% de margem com a Linha Care da Bubbles.',
              'Margem bruta de até 45% garantida por tabela.',
            ],
            [
              'Giro e payback',
              'Estoque parado destrói distribuidores. A Linha Care gira o capital em ciclos de 45 a 60 dias.',
              'Reposição a cada 6 semanas e payback de 2 a 3 meses.',
            ],
            [
              'Facilidade de venda',
              'O portfólio que seus clientes lojistas exigem para blindar o negócio contra o grande varejo.',
              'Aceitação imediata, selo vegano e suporte de PDV.',
            ],
          ]}
        />
      </Bloco>

      <Bloco titulo="Formulário em 3 etapas (microcompromisso)">
        <Tabela
          cabecalho={['Etapa', 'Campos', 'Para que serve']}
          linhas={[
            ['1. Território', 'Estado e cidade polo (listas de escolha)', 'Ver se a região está livre para exclusividade. Quase sem fricção.'],
            [
              '2. Capacidade',
              'Modelo de atuação, faixa de PDVs (até 50, 51 a 200, 201 a 500, mais de 500) e nº de representantes (1 a 3, 4 a 10, acima de 10)',
              'Medir força de rota com apenas um toque por pergunta.',
            ],
            [
              '3. Institucional',
              'Nome do decisor, e-mail corporativo, WhatsApp com DDD, CNPJ',
              'Pedidos de dados pessoais só depois do investimento nas etapas 1 e 2.',
            ],
          ]}
        />
        <p className="mt-3 text-sm text-[#666666]">
          Ficaram de fora de propósito: faturamento dos últimos 12 meses, endereço do galpão, referências
          bancárias e contrato social. O comercial apura isso na primeira ligação.
        </p>
      </Bloco>

      <Bloco titulo="Botões (CTA) por posição">
        <Tabela
          cabecalho={['Onde', 'Texto do botão']}
          linhas={[
            ['Cabeçalho fixo', 'Checar Região Disponível'],
            ['Fim do hero', 'Verificar Disponibilidade Territorial'],
            ['Seção de rentabilidade', 'Garantir Margem de até 45% na Minha Rota'],
            ['Seção do kit', 'Solicitar Maleta de Homologação Comercial'],
            ['Formulário final', 'Solicitar Análise de Exclusividade e Kit Degustação'],
          ]}
        />
      </Bloco>

      <Callout titulo="Execução comercial para fechar 2 por mês">
        <Lista
          itens={[
            'Velocidade de resposta: o formulário aciona o CRM na hora e o primeiro contato sai em menos de 15 minutos.',
            'Mídia: busca com termos como "como ser distribuidor de cosméticos pet" e social segmentando donos e gerentes de atacado (CNAE de cosméticos, veterinário e higiene animal).',
            'Coerência anúncio e página: a promessa do anúncio (45% ou kit) precisa aparecer na primeira dobra.',
            'Mapa de praças: ao fechar contrato numa mesorregião, o formulário deixa de ofertá-la.',
          ]}
        />
      </Callout>
    </EstudoSecao>
  )
}
