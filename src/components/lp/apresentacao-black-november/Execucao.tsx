// Seções 8 a 11: projeção, plano de ação, riscos e decisões, próximos passos.
import { Bloco, Callout, Cards, LinkInterno, Lista, Passos, Secao, Tabela } from './ui'
import { Simulador } from './Simulador'

export function Projecao() {
  return (
    <Secao
      id="projecao"
      resumo={
        <>
          Com ticket médio 7% acima de 2025 (R$ 648), todos os cenários passam da meta de empatar com 2025. Com R$ 30
          mil na Meta, a projeção é de R$ 562 mil (+34%). Cada R$ 10 mil a mais rende menos que o anterior, por isso o
          extra é uma reserva condicionada ao resultado.
        </>
      }
      roteiro={[
        'Mostrar R$ 30 mil (base) e depois clicar em R$ 40 e R$ 50 mil: o faturamento sobe pouco a cada degrau.',
        'Trocar para "Essenciais" nas melhorias de site: o site mexe mais no resultado que verba extra.',
        'O ticket pesa tanto quanto a verba: cada R$ 10 de ticket muda o mês em cerca de R$ 8,7 mil.',
        'Deixar claro o limite: projeção para comparar cenários, não promessa de receita.',
      ]}
      pergunta={{
        p: 'Por que não colocar logo R$ 50 mil?',
        r: 'De R$ 30 para R$ 50 mil a projeção sobe cerca de 7% no cenário base. Liberamos o extra só se o retorno de último clique provar 2,0 nas checagens de 10 e 20/11.',
      }}
    >
      <Simulador />
      <div className="grid gap-4 md:grid-cols-2">
        <Callout titulo="Como a projeção foi feita">
          <Lista
            itens={[
              'Âncora real: na Black 2025, a Meta investiu R$ 23.006 e a loja registrou 73 pedidos de último clique (UTM) vindos dela.',
              'Retorno decrescente: dobrar a verba multiplica os pedidos por cerca de 1,57 no cenário base (1,74 no otimista e 1,41 no conservador).',
              'Loja: os 694 pedidos de 2025 crescidos 25% (ritmo da loja de agosto a outubro/26 contra outubro/25), mais os pedidos extras da Meta acima disso e o que eles puxam sem UTM.',
              'Ticket de R$ 648, 7% acima dos R$ 606 de 2025. Google com R$ 20 mil entra no crescimento da base.',
            ]}
          />
        </Callout>
        <Callout titulo="O que a projeção não faz">
          <Lista
            itens={[
              'Não é meta de receita: serve para comparar cenários entre si.',
              'Não separa a influência da Meta nas vendas sem origem identificada (74% da loja em novembro/25).',
              'Não inclui a recompra de dezembro puxada pelo cashback em dobro.',
              'As melhorias de site são estimativas de referência de mercado.',
            ]}
          />
        </Callout>
      </div>
      <LinkInterno href="/projecao-black-november">Abrir a projeção completa, com premissas editáveis</LinkInterno>
    </Secao>
  )
}

export function PlanoAcao() {
  return (
    <Secao
      id="plano"
      resumo={
        <>
          Cada decisão de novembro tem data, dado de entrada e regra escrita antes. Ninguém pausa ou escala no impulso de
          um dia ruim ou de um dia bom.
        </>
      }
      roteiro={[
        'Em cada checagem chegam 4 coisas: export da Meta, Nemu (último clique), vendas da Shopify e estoque.',
        'Pausa e escala têm número; anúncio com menos de 7 dias ou sem verba não é julgado.',
        'Verba que um item não usar vai, nesta ordem, para o remarketing, a prospecção e a reserva da Black Week.',
        'Disparos de e-mail e WhatsApp: execução fora da agência, calendário sugerido.',
      ]}
    >
      <Bloco titulo="Calendário de checagens">
        <Tabela
          minimo={640}
          cabecalho={['Data', 'Momento', 'O que se decide']}
          destaque={[2, 5, 7, 9]}
          linhas={[
            ['02/11 seg', 'Feriado, dia seguinte à estreia', 'Entrega, ritmo, medição, site e catálogo: só correção'],
            ['04 e 06/11', 'Primeira semana', 'Funil alto, vídeos e concentração de verba: marcar, sem cortar'],
            ['10/11 ter', '1/3 da Black', 'Primeira leitura de conversão: pausar pelas regras; liberar ou não o 1º extra'],
            ['13/11 sex', 'Preparação', 'Quem sai, quem entra e o teste de criativo da 2ª onda'],
            ['16 e 17/11', 'Segunda onda', 'Peças novas e teste de criativo no ar; decisão do catálogo'],
            ['20/11 sex', '2/3 da Black', 'Leitura completa, estoque até 30/11, verba economizada e 2º extra'],
            ['23 e 24/11', 'Véspera da Black Week', 'Prospecção congela; conjuntos de cashback em dobro programados'],
            ['25/11 qua', 'Cashback em dobro', 'Checagens às 9h, 14h e 19h: só correção e estoque'],
            ['26/11 qui', 'Véspera', 'Luz verde do degrau de 27/11'],
            ['27/11 sex', 'Black Friday', 'Checagens às 9h, 13h, 18h e 22h: pausa imediata por estoque'],
            ['28 e 29/11', 'Fim de semana', 'Estoque, ritmo e frequência; 3º degrau opcional'],
            ['30/11 seg', 'Cyber Monday', 'Só estoque; fim às 23h59'],
            ['01/12 ter', 'Saída', 'Desligamento e relatório final (dados completos em 07/12)'],
          ]}
        />
      </Bloco>
      <Bloco titulo="Regras escritas antes">
        <Cards
          colunas={4}
          itens={[
            { titulo: 'Pausar anúncio', selo: 'com 7 dias ou mais', texto: 'Zero venda com R$ 240 gastos; retorno abaixo de 1,0 nos três modelos com R$ 360; CTR abaixo de 0,35% com 2.000 impressões e nenhuma venda.' },
            { titulo: 'Escalar', selo: 'a partir de 18/11', texto: 'ROAS de último clique de 2,0 ou mais e custo por compra até R$ 120 por 3 dias seguidos: +20%, com 48 horas entre degraus.' },
            { titulo: 'Nunca pausar', selo: 'proteção', texto: 'Anúncio com menos de 7 dias, anúncio que não recebeu verba, criativo antigo que ainda vende, o líder que vende.' },
            { titulo: 'Verba economizada', selo: 'teto, não meta', texto: 'O que um item deixar de gastar vai para o Quente, depois a prospecção, depois a reserva da Black Week. Se nada passar na régua, não se gasta.' },
          ]}
        />
      </Bloco>
      <Bloco titulo="Disparos de e-mail e WhatsApp (sugestão)" nota="Excluir dos disparos de oferta quem comprou nas últimas 48 horas.">
        <Tabela
          minimo={560}
          cabecalho={['Quando', 'Mensagem', 'Por quê']}
          linhas={[
            ['dom 01/11, 9h', 'Abertura: ofertas valem o mês todo e Kit Experimentação', 'Pega quem se abastece cedo'],
            ['ter 10/11', 'O preço da Black já está valendo', 'Semana fraca da Meta em 2025; o dia 10 foi o 2º maior da loja'],
            ['ter 17/11', 'Segunda onda com os mais vendidos', 'Junto com a renovação dos anúncios'],
            ['qua 25/11, 8h', 'Cashback em dobro começou', 'Argumento novo da reta final'],
            ['sex 27/11, 8h', 'Black Friday', 'Pico de procura'],
            ['seg 30/11, 10h e 18h', 'Último dia da Black e do cashback em dobro', 'Urgência real, com data verdadeira'],
            ['ter 01/12', 'Só para quem comprou: seu cashback está disponível', 'Dezembro caiu 70% em 2025'],
          ]}
        />
      </Bloco>
    </Secao>
  )
}

export function Riscos() {
  return (
    <Secao
      id="riscos"
      resumo={<>O que pode dar errado, o que já está previsto e o que ainda depende de decisão.</>}
      roteiro={[
        'Estoque está garantido; se algo quebrar, há regra pronta de troca de anúncio e realocação de verba.',
        'O maior risco controlável é o site: é onde a venda se perdeu em 2025.',
        'Listar as decisões em aberto e quem decide.',
      ]}
    >
      <Bloco titulo="Riscos">
        <Tabela
          cabecalho={['Risco', 'Efeito', 'O que está previsto']}
          linhas={[
            ['Site deixar venda no caminho', 'Em 2025, metade do clique não abriu a página', 'Propostas da seção 7, com as 5 essenciais até 31/10'],
            ['Leilão mais caro na Black Week', 'O mesmo real compra menos anúncio (CPM +20% em 2025)', 'Julgar por custo por compra e retorno, nunca pelo CPM'],
            ['Brinde sem controle de estoque no cadastro da loja', 'A loja continua dando brinde que não existe', 'Resolvido internamente até 28/10'],
            ['Produto acabar no meio do caminho', 'Anúncio levando para produto esgotado', 'Estoque garantido; regra pronta para trocar anúncio e mover verba'],
            ['Meta e loja contando diferente', 'A Meta mostra muito mais venda que o último clique', 'Decisão pelo último clique (Nemu) com a venda da loja por dia ao lado'],
            ['Campanhas de fora da Black disputando o mesmo público', 'Preço ou cupom antigo no ar', 'Revisão em 26/10'],
          ]}
        />
      </Bloco>
      <Bloco titulo="Decisões em aberto">
        <Tabela
          cabecalho={['Decisão', 'Recomendação', 'Quem', 'Até']}
          linhas={[
            ['Reserva de até R$ 15 mil na Meta', 'Aprovar condicionada ao ROAS de último clique de 2,0', 'Diretoria', '27/10'],
            ['Melhorias de site', 'As 5 essenciais até 31/10', 'Diretoria e gestor', '27/10'],
            ['N01 (réplica do campeão de 2025)', 'Aprovar no lugar do criativo 24', 'Gestor', '28/10'],
            ['Rodapé das peças', '"Não acumula com cupons" no lugar de "Promoção não cumulativa" (perfumes e cashback acumulam)', 'Gestor', '27/10'],
            ['Preço do Neutralizador PRO 5L', 'R$ 439,90 (padrão ,90 e mantém os 15% off)', 'Gestor', '27/10'],
            ['Validade do crédito do cashback em dobro', 'Definir antes das peças de 25/11', 'Diretoria', '13/11'],
            ['Selo de cashback nos banners', 'Trocar para o dobro em 25/11 ou tirar a porcentagem', 'Gestor', '28/10'],
          ]}
        />
      </Bloco>
    </Secao>
  )
}

export function Proximos() {
  return (
    <Secao id="proximos" resumo={<>O que precisa acontecer até a estreia de domingo, 01/11, às 00h.</>}>
      <Passos
        itens={[
          { marca: 'seg 26/10', titulo: 'Aprovações do gestor', texto: 'Estrutura, nomes, atribuição, N01; revisão das campanhas de fora da Black.' },
          { marca: 'ter 27/10', titulo: 'Diretoria', texto: 'Verba, reserva condicionada e melhorias de site. Rodapé e preço do Neutralizador decididos.' },
          { marca: 'qua 28/10', titulo: 'Contas e loja', texto: 'Lista de clientes atualizada, públicos criados, Merchant (promoções e rótulo), cadastros de brinde, "Mostrar produtos" desligado.' },
          { marca: 'qui 29/10', titulo: 'Medição', texto: 'Compra de teste com Pix e cartão: a venda precisa chegar à Shopify e à Nemu com a UTM completa.' },
          { marca: 'sex 30/10', titulo: 'Anúncios e site', texto: 'Anúncios do lançamento aprovados com data de início; site da Black pronto no tema duplicado.' },
          { marca: 'sáb 31/10', titulo: 'Conferência final', texto: 'Prévia de cada anúncio, orçamentos, datas, públicos; plantão de 01 e 02/11 definido.' },
          { marca: 'dom 01/11', titulo: 'Estreia às 00h', texto: 'Preços da Black no site, anúncios no ar, disparo de abertura às 9h.' },
        ]}
      />
      <Bloco titulo="Material de apoio">
        <div className="flex flex-wrap gap-3">
          <LinkInterno href="/criativos-black-november">Criativos da Meta</LinkInterno>
          <LinkInterno href="/site-black-november">Propostas de site</LinkInterno>
          <LinkInterno href="/projecao-black-november">Projeção completa</LinkInterno>
        </div>
        <p className="mt-3 text-sm text-[#666666]">
          O estudo completo (seis documentos: Black 2025, estratégia, mercado, criativos e catálogo, estrutura e plano de
          ação da Meta, Google Ads) está no repositório de anúncios e pode ser enviado a quem pedir.
        </p>
      </Bloco>
    </Secao>
  )
}
