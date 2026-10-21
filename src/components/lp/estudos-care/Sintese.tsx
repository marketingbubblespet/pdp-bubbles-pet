import { Bloco, Callout, Cards, Lista, Tabela } from './ui'

// Síntese final para apresentar à diretoria. Números da Bubbles vêm do relatório de
// setembro/2026; os demais vêm dos estudos (referências, não dados validados).
export function Sintese() {
  return (
    <section id="sintese" className="scroll-mt-20 border-t-2 border-[#E8649A] bg-white py-12 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">
          Síntese para a diretoria
        </p>
        <h2 className="mt-2 text-2xl font-medium text-[#0D0C0D] md:text-3xl">
          O que os sete estudos dizem, em uma página
        </h2>

        <div className="mt-6 rounded-[20px] bg-[#0D0C0D] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F4CDD4]">Em uma frase</p>
          <p className="mt-2 text-lg font-medium text-white md:text-2xl">
            A Linha Care não precisa de mais propaganda para pet shop. Precisa de distribuidor com vendedor de
            rota, vendido pela conta financeira (margem, giro e exclusividade), com um processo comercial
            rápido e medido pelo contrato fechado.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          <Bloco titulo="A lógica dos estudos em 3 passos">
            <Cards
              itens={[
                {
                  titulo: '1. O problema é o canal, não o produto',
                  selo: 'Estudos 1 e 2',
                  texto: (
                    <p>
                      O pet shop vive do banho e tosa, teme que o home care espace as visitas, não tem perfil
                      de vendedor e tem caixa curto. Por isso a venda direta ao pet shop travou.
                    </p>
                  ),
                },
                {
                  titulo: '2. O comprador certo pensa em conta, não em cheiro',
                  selo: 'Estudos 2, 3 e 5',
                  texto: (
                    <p>
                      Distribuidor com equipe de rua quer margem alta em carga leve, giro rápido, território
                      protegido e material que faça o produto sair da prateleira sozinho.
                    </p>
                  ),
                },
                {
                  titulo: '3. Captar e converter é uma máquina de ponta a ponta',
                  selo: 'Estudos 3, 4, 6 e 7',
                  texto: (
                    <p>
                      Anúncio e página falam de margem, o formulário filtra, o comercial responde em minutos e
                      o resultado volta para as plataformas como contrato fechado.
                    </p>
                  ),
                },
              ]}
            />
          </Bloco>

          <Bloco titulo="Pergunta que cada estudo responde">
            <Tabela
              cabecalho={['Estudo', 'Pergunta', 'Resposta curta']}
              linhas={[
                ['1. Concorrentes', 'Quem compete e quanto sobra em cada elo?', 'Cinco marcas premium. O frasco de R$ 40 precisa chegar ao distribuidor por cerca de R$ 15 a 17.'],
                ['2. ICP e pitch', 'Por que falhou e quem é o cliente certo?', 'Pet shop não vende cosmético. O alvo é distribuidor com 200 a 1.000 clientes e vendedores externos.'],
                ['3. Landing page', 'O que a página precisa dizer?', 'Margem, giro, exclusividade e suporte de PDV. Formulário em 3 etapas e kit só para quem se qualifica.'],
                ['4. Meta Ads', 'Como captar com pouca verba?', 'Uma campanha aberta, praça controlada, formulário que filtra. Projeção de 2 distribuidores por R$ 2.000.'],
                ['5. Cosméticos humanos', 'Existe outro canal?', 'Sim. Distribuidores de beleza para salões e perfumarias, com rota já paga.'],
                ['6. Google Ads', 'Como pegar quem já procura fornecedor?', 'Só palavras de fundo de funil, negativas pesadas e retorno da venda fechada.'],
                ['7. SLA comercial', 'Como não perder o lead?', 'Contato em até 5 minutos, triagem por CNAE e carteira, scripts para as 3 objeções.'],
              ]}
            />
          </Bloco>

          <Bloco titulo="Estudos x nossa realidade (setembro de 2026)">
            <Tabela
              cabecalho={['Indicador', 'Estudos', 'Bubbles em setembro']}
              linhas={[
                ['CPL da campanha de distribuidor', 'cerca de R$ 36', 'cerca de R$ 38,81 (Distribuidor Tradicional)'],
                ['Custo por distribuidor fechado', 'cerca de R$ 952', 'R$ 3.982,63 (R$ 7.965,25 para 2 fechamentos)'],
                ['Verba mensal', 'R$ 2.000', 'R$ 7.965,25 entre Meta e Google'],
                ['Venda direta ao pet shop (Linha Care)', 'Fracasso previsto no estudo 2', 'R$ 335,17 para 1 lead, despriorizada em 10/09'],
                ['Google Ads', 'Peça central da captação', 'R$ 22,99 e 2 leads, quase parado'],
                ['Leads qualificados', 'Meta de 50% dos leads', 'Ainda não informado pelo comercial'],
              ]}
            />
            <p className="mt-3 text-sm text-[#666666]">
              Leitura: captar lead já custa o esperado. O que pesa é o que acontece depois (qualificar,
              reunir e fechar), e a Care por venda direta confirmou o diagnóstico do estudo 2.
            </p>
          </Bloco>

          <Bloco titulo="Decisões que dependem da diretoria">
            <Tabela
              cabecalho={['Decisão', 'Por que importa']}
              linhas={[
                ['Qual margem oferecer ao distribuidor: 45% ou 25% a 32%?', 'Os estudos 2 a 5 usam 45% e o estudo 7 usa 25% a 32%. O discurso e a tabela de preço dependem disso. Confirmar também sobre qual preço os 45% incidem.'],
                ['Qual é o distribuidor prioritário?', 'Ração e pet (estudo 2), cosméticos humanos (estudo 5) ou supermercado e farmácia (estudos 6 e 7). Cada um pede mensagem, mídia e lista de palavras diferentes.'],
                ['Qual verba para o teste?', 'Os estudos supõem R$ 2.000 por mês. Hoje investimos cerca de quatro vezes isso.'],
                ['Exclusividade territorial por contrato', 'É o argumento mais forte contra a guerra de preço, mas exige jurídico, mapa de praças e metas para manter o direito.'],
                ['Enquadramento de CNAE e isenção no MAPA', 'O estudo 5 os trata como prontos. Conferir com contador ou jurídico antes de usar em material comercial.'],
              ]}
            />
          </Bloco>

          <Bloco titulo="Sugestão de próximos passos">
            <Lista
              itens={[
                <>
                  <strong className="font-semibold text-[#0D0C0D]">Definir a oferta:</strong> margem, pedido
                  mínimo, prazo, exclusividade e kit de degustação.
                </>,
                <>
                  <strong className="font-semibold text-[#0D0C0D]">Escolher o público primário</strong> e
                  reescrever página, anúncios e palavras-chave para ele.
                </>,
                <>
                  <strong className="font-semibold text-[#0D0C0D]">Montar o processo comercial:</strong> resposta
                  em até 5 minutos, ficha de qualificação por CNAE e carteira, e classificação de lead no CRM.
                </>,
                <>
                  <strong className="font-semibold text-[#0D0C0D]">Medir pelo contrato fechado:</strong> ligar o
                  CRM ao Meta e ao Google (conversão offline) e acompanhar custo por distribuidor, não só CPL.
                </>,
                <>
                  <strong className="font-semibold text-[#0D0C0D]">Rodar um piloto de cerca de 90 dias</strong> com
                  metas simples (leads qualificados, reuniões, fechamentos) e revisar a oferta com o que
                  aparecer.
                </>,
              ]}
            />
          </Bloco>

          <Callout titulo="Para explicar em 1 minuto">
            <p>
              Tentamos vender a Linha Care direto ao pet shop e não funcionou, porque ele depende do banho e
              tosa e não faz papel de vendedor. Os estudos mostram que o cliente certo é o distribuidor que já
              tem vendedor na rua e cuida de centenas de lojas. Para ele, a Care é um produto leve, de margem
              alta e que gira rápido na mesma entrega, desde que tenha território exclusivo e display que venda
              sozinho.
            </p>
            <p>
              Hoje captar lead já custa o esperado (cerca de R$ 38). O que está caro é transformar lead em
              distribuidor: R$ 3.982 por fechamento contra R$ 952 projetados. O próximo passo é decidir a
              oferta (margem e exclusividade), acelerar o atendimento e medir tudo pelo contrato fechado.
            </p>
          </Callout>
        </div>
      </div>
    </section>
  )
}
