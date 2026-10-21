import { Bloco, Callout, Cards, EstudoSecao, Lista, Numeros, Passos, Tabela } from './ui'

export function Estudo7Sla() {
  return (
    <EstudoSecao
      id="estudo-7"
      numero={7}
      titulo="SLA, qualificação e abordagem comercial (do lead à oportunidade)"
      resumo="Playbook para o time de pré-vendas: tempos máximos em cada etapa do funil, como separar distribuidor de pequeno lojista em 5 minutos, scripts de WhatsApp e telefone e respostas para as 3 objeções mais comuns."
    >
      <Numeros
        itens={[
          { valor: '21x', rotulo: 'mais chance de qualificar se o contato sai em até 5 minutos' },
          { valor: '+40%', rotulo: 'de avanço com ligação em até 10 minutos' },
          { valor: '70%', rotulo: 'dos leads sem contato efetivo sem automação' },
          { valor: '< 14%', rotulo: 'das empresas brasileiras respondem em 5 minutos' },
        ]}
      />

      <Bloco titulo="SLA de cada etapa do funil">
        <Tabela
          cabecalho={['Etapa', 'Limite', 'Quem', 'O que fazer']}
          linhas={[
            ['Lead recebido', 'até 2 minutos', 'CRM e automação', 'Enriquecer pelo CNPJ, conferir CNAE e rotear por região.'],
            ['Primeiro toque', 'até 5 minutos', 'SDR (pré-vendas)', 'Ligar e mandar mensagem estruturada no WhatsApp.'],
            ['Sem conexão', '7 dias úteis', 'SDR', 'Pelo menos 8 tentativas alternando voz, mensagem e e-mail.'],
            ['Qualificação', 'até 5 minutos', 'SDR', 'Aplicar as perguntas de diagnóstico de canal, equipe e capacidade.'],
            ['Passagem de bastão', 'até 15 minutos', 'SDR para o executivo', 'Registrar o briefing no CRM e fechar a agenda.'],
            ['Apresentação', '24 a 48 horas', 'Conta-chave ou regional', 'Plano de margens, positivação, trade marketing e amostras.'],
          ]}
        />
      </Bloco>

      <Bloco titulo="Distribuidor de verdade ou pequeno lojista?">
        <Tabela
          cabecalho={['Sinal', 'Distribuidor (alvo)', 'Pequeno varejo']}
          linhas={[
            ['CNAE', 'Atacadista: 46.46-0/01, 46.49-4/08, 46.39-7/01', 'Varejista: 47.72-5/00, 47.89-0/04 ou MEI'],
            ['Carteira', '150 a mais de 1.000 PDVs ativos por território', 'Uma loja, no máximo duas filiais'],
            ['Equipe', 'Representantes externos, promotores e televendas', 'Venda de balcão, o dono atende'],
            ['Recebimento', 'Doca, carga paletizada, frota', 'Caixas pequenas por correio ou entrega urbana'],
            ['Compra', 'Pedido mínimo em lote ou palete, giro mensal', 'Reposição pontual, abaixo do mínimo da fábrica'],
          ]}
        />
      </Bloco>

      <Bloco titulo="4 perguntas para os primeiros 5 minutos">
        <Lista
          itens={[
            <>
              <strong className="font-semibold text-[#0D0C0D]">Capilaridade:</strong> quantos pontos de venda
              ativos a distribuidora abastece e qual a extensão da malha de entrega?
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Força comercial:</strong> quantos
              representantes ou promotores de campo e em qual segmento está a maior parte do faturamento
              (supermercado, drogaria e perfumaria, agropecuária)?
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Mix:</strong> já positivam higiene, beleza ou
              bem-estar animal, ou a Linha Care abriria a categoria?
            </>,
            <>
              <strong className="font-semibold text-[#0D0C0D]">Condições:</strong> pedido mínimo paletizado,
              tributação interestadual e faturamento em ciclos de 28 a 56 dias combinam com a política de
              compras deles?
            </>,
          ]}
        />
      </Bloco>

      <Bloco titulo="Para onde cada lead vai no CRM">
        <Cards
          colunas={2}
          itens={[
            {
              titulo: 'Tier A: distribuidor estratégico',
              selo: 'Agenda em até 24 horas',
              texto: (
                <p>
                  CNAE atacadista, mais de 250 PDVs, mais de 8 representantes externos, armazém com doca.
                  Vai para o executivo de grandes contas.
                </p>
              ),
            },
            {
              titulo: 'Tier B: regional especialista',
              selo: 'Apresentação padrão',
              texto: (
                <p>
                  CNAE atacadista, 80 a 250 PDVs, forte em agropecuárias ou perfumarias, televendas ativo.
                  Vai para o executivo comercial regional, com pedido mínimo regional.
                </p>
              ),
            },
            {
              titulo: 'Tier C: varejo local',
              selo: 'Desqualificado para distribuição',
              texto: (
                <p>
                  CNAE varejista, loja de bairro ou clínica isolada, sem equipe externa. Recebe resposta
                  cordial no WhatsApp com o catálogo do e-commerce B2B.
                </p>
              ),
            },
            {
              titulo: 'Sem perfil comercial',
              selo: 'Arquivar',
              texto: (
                <p>
                  CPF, MEI sem logística ou pedido de amostra de consumidor. Arquiva no CRM e envia
                  mensagem automática com a loja B2C.
                </p>
              ),
            },
          ]}
        />
      </Bloco>

      <Bloco titulo="Ligação de 4 minutos">
        <Passos
          itens={[
            { marca: '0 a 30 s', titulo: 'Abertura', texto: 'Identificação rápida e pedido de 3 minutos do comprador.' },
            { marca: '30 a 90 s', titulo: 'Tese de mercado', texto: 'Mercado pet de R$ 78 bi e a lacuna de rentabilidade: pet food rende 8% a 12%, cosmético cresce em dois dígitos.' },
            { marca: '90 a 180 s', titulo: 'Sondagem', texto: 'Canal principal da equipe de campo e margem bruta e prazo que a diretoria exige.' },
            { marca: '180 a 240 s', titulo: 'Agendamento', texto: 'Reunião de 15 minutos com o executivo regional, com duas opções de horário.' },
          ]}
        />
        <p className="mt-3 text-sm text-[#666666]">
          No WhatsApp, a mensagem 1 apresenta a linha (11 produtos de 300 ml, vegana, validada por mais de
          5.000 profissionais) e propõe 10 minutos. A mensagem 2 manda o PDF de uma página com a simulação de
          margem.
        </p>
      </Bloco>

      <Bloco titulo="As 3 objeções e a resposta">
        <Tabela
          cabecalho={['Objeção', 'Resposta do estudo']}
          linhas={[
            [
              '"Não atuamos no canal pet, nosso foco é farma, perfumaria e supermercado."',
              '53% dos lares têm animais e compram higiene nos mesmos pontos. A linha eleva o ticket por visita sem aumentar a quilometragem.',
            ],
            [
              '"Marca nova vira mercadoria encalhada."',
              'Marca usada por mais de 5.000 profissionais, displays de caixa, testeiras, régua de gôndola e 5% a 8% de bonificação para ativar os 50 principais clientes.',
            ],
            [
              '"A margem e o prazo não cobrem o custo do atacado."',
              'Frascos de 50 a 300 ml concentram valor por palete. Margem de 25% a 32% e faturamento em 28, 42 e 56 dias.',
            ],
          ]}
        />
      </Bloco>

      <Bloco titulo="Os 11 produtos do pedido">
        <Tabela
          cabecalho={['Produto', 'Volume', 'Papel no ponto de venda']}
          linhas={[
            ['Shampoo Neutro', '300 ml', 'Entrada da categoria, maior recorrência'],
            ['Shampoo Limpeza Profunda', '300 ml', 'Sujeira intensa, cães que vivem na rua'],
            ['Shampoo Pelos Claros', '300 ml', 'Especialidade estética'],
            ['Condicionador Hidratante', '250 g', 'Venda casada com o shampoo'],
            ['Máscara Multifuncional', '100 ml', 'Tratamento de hidratação em 90 segundos'],
            ['Secagem Rápida', '100 ml', 'Reduz o tempo de secador'],
            ['Banho a Seco Desembaraçador', '250 ml', 'Alto giro, spray sem água'],
            ['Body Splash Flora', '80 ml', 'Perfumaria, compra por impulso'],
            ['Body Splash Luna', '80 ml', 'Segunda fragrância, estimula levar mais de um'],
            ['Hidratante de Patas e Focinhos', '50 ml', 'Dermocosmético compacto de valor alto'],
            ['Limpeza de Olhos e Ouvidos', '100 ml', 'Higiene preventiva periódica'],
          ]}
        />
      </Bloco>

      <Callout titulo="Governança do processo">
        <Lista
          itens={[
            'Painel diário do tempo de primeira resposta, com alerta quando passa de 5 minutos e redistribuição do lead.',
            'Métricas do funil: conexão com o decisor em até 48 horas, conversão de lead para oportunidade por origem e ciclo do primeiro contato ao primeiro pedido.',
            'Treino semanal de simulação de ligação, com linguagem de giro, margem e distribuição, sem termos de banho e tosa.',
          ]}
        />
      </Callout>

      <Callout titulo="Atenção: este estudo usa outra margem">
        <p>
          Aqui a margem bruta do distribuidor é de 25% a 32%. Os estudos 2 a 5 prometem 45%. Antes de
          qualquer abordagem, vale decidir qual número a Bubbles pratica de fato. O estudo também mira
          supermercado, farmácia e agropecuária, canais diferentes do distribuidor de ração (estudo 2) e do
          de cosméticos humanos (estudo 5).
        </p>
      </Callout>
    </EstudoSecao>
  )
}
