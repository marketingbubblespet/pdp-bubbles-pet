// Seções 8 a 11: projeção, plano de ação, riscos e decisões, próximos passos.
import { IMG } from '@/lib/apresentacao-black-november'
import { Bloco, Callout, Cards, Figura, LinkInterno, Lista, Passos, Secao, Tabela } from './ui'
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
      <div className="rounded-[20px] border-4 border-[#E8649A] bg-[#0D0C0D] p-6 text-white md:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#F4CDD4]">⚠ Atenção: a projeção pode variar</p>
        <p className="mt-3 text-xl font-medium md:text-2xl">
          O ponto mais crítico, que pode prejudicar muito a estratégia e a projeção, é a quebra de estoque dos produtos.
        </p>
        <p className="mt-3 text-sm text-white/80 md:text-base">
          A Black 2025 foi puxada por poucos produtos: o Kit Completo Essential, os galões Essential e PRO e os kits. Se
          um deles esgotar no meio do mês, os anúncios param, a verba precisa mudar de lugar e o faturamento cai junto. Os
          números abaixo também mudam com o leilão, o site e a medição: servem para comparar cenários, não como promessa.
        </p>
      </div>
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
      <Bloco
        titulo="Antes da Black: do dia 26/10 à estreia"
        nota="As campanhas da Black começam às 00h de domingo, 01/11. O tema do site é publicado às 23h de sexta, 30/10, pelo gestor."
      >
        <Tabela
          minimo={640}
          cabecalho={['Data', 'Atividade', 'Quem']}
          destaque={[2, 4, 6]}
          linhas={[
            ['seg 26/10', 'Aprovações: estrutura, nomes, atribuição, N01 e novos anúncios baseados nos campeões de 2025', 'Gestor'],
            ['ter 27/10', 'Diretoria: verba, reserva condicionada e propostas de site; decisão da roleta', 'Diretoria'],
            ['qua 28/10', 'Site: implementar no tema duplicado todos os banners e ajustes (abas, faixas, tags pretas, coleção Black, carrinho) e deixar aguardando publicação', 'Dev e marketing'],
            ['qua 28/10', 'Tráfego: reduzir as campanhas usuais da Meta ao mínimo (só a principal com R$ 50 por dia; remarketing a R$ 7 por dia), criar as campanhas, conjuntos e públicos da Black pausados, lista de clientes atualizada, Merchant (promoções e rótulo)', 'Mídia'],
            ['qui 29/10', 'Medição: com o tema pronto, compras reais de teste (Pix e cartão) chegando à Shopify e à Nemu com a UTM completa; pedir ao Claude Code testes completos do site e do rastreamento (modo ultracode)', 'Marketing e Claude Code'],
            ['sex 30/10', 'Entrega de todos os estáticos; anúncios subidos e aprovados; campanhas programadas para iniciar às 00h de 01/11', 'Criação e mídia'],
            ['sex 30/10, 23h', 'Publicação do tema da Black (já validado)', 'Gestor'],
            ['sáb 31/10', 'Conferência final: preços, brindes (BOGO), cupons sem somar, prévia de cada anúncio; plantão de 01 e 02/11', 'Mídia e loja'],
            ['dom 01/11, 00h', 'Início das campanhas da Black; disparo de abertura às 9h', 'Automático'],
          ]}
        />
      </Bloco>
      <Bloco titulo="Calendário de checagens durante a Black">
        <Tabela
          minimo={640}
          cabecalho={['Data', 'Momento', 'O que se decide']}
          destaque={[2, 5, 8, 10]}
          linhas={[
            ['02/11 seg', 'Feriado, dia seguinte à estreia', 'Entrega, ritmo, medição, site e catálogo: só correção'],
            ['04 e 06/11', 'Primeira semana', 'Funil alto, vídeos e concentração de verba: marcar, sem cortar'],
            ['10/11 ter', '1/3 da Black', 'Primeira leitura de conversão: pausar pelas regras; liberar ou não o 1º extra'],
            ['13/11 sex', 'Preparação', 'Quem sai, quem entra e o teste de criativo da 2ª onda'],
            ['16 e 17/11', 'Segunda onda', 'Peças novas e teste de criativo no ar; decisão do catálogo'],
            ['20/11 sex', '2/3 da Black', 'Leitura completa, estoque até 30/11, verba economizada e 2º extra'],
            ['20/11 sex', 'Pedido à criação', 'Banners principais com o selo "cashback em dobro" prontos para 25/11'],
            ['23 e 24/11', 'Véspera da Black Week', 'Prospecção congela; conjuntos de cashback em dobro programados; banners do dobro agendados'],
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
      <Bloco
        titulo="Disparos de e-mail e WhatsApp (sugestão)"
        nota="Excluir dos disparos de oferta quem comprou nas últimas 48 horas. Recuperação de carrinho, boas práticas: 1ª mensagem de 30 a 60 minutos depois do abandono (no Pix, antes de expirar), 2ª em 24 horas e no máximo uma 3ª em 48 a 72 horas; parar quando a pessoa comprar; sem desconto extra (lembrar preço da Black, brinde e cashback); só para quem autorizou o contato (LGPD), com opção de sair."
      >
        <Tabela
          minimo={560}
          cabecalho={['Quando', 'Mensagem', 'Por quê']}
          linhas={[
            ['dom 01/11, 9h', 'Abertura: ofertas valem o mês todo e Kit Experimentação', 'Pega quem se abastece cedo'],
            ['ter 10/11', 'O preço da Black já está valendo', 'Semana fraca da Meta em 2025; o dia 10 foi o 2º maior da loja'],
            ['ter 17/11', 'Segunda onda com os mais vendidos', 'Junto com a renovação dos anúncios'],
            ['qua 25/11, 8h', 'Cashback em dobro começou', 'Argumento novo da reta final'],
            ['sex 27/11, 8h', 'Black Friday', 'Pico de procura'],
            ['dom 29/11', 'Amanhã termina a Black November e o cashback em dobro', 'Escassez real, um dia antes do fim'],
            ['seg 30/11, 10h e 18h', 'Último dia da Black e do cashback em dobro', 'Urgência real, com data verdadeira'],
            ['ter 15/12', 'Lembrete só para quem comprou: seu cashback está disponível, hora de repor o estoque', 'Os itens são insumos: a reposição vem perto da metade de dezembro, que caiu 70% em 2025'],
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
            ['Site deixar venda no caminho', 'Em 2025, metade do clique não abriu a página. Atenção: pode ser erro de medição (clique contado pela Meta sem a página registrar a visita), não uma conclusão', 'Propostas da seção 7; conferir a medição na compra de teste de 29/10'],
            ['Leilão mais caro na Black Week', 'O mesmo real compra menos anúncio (CPM +20% em 2025)', 'Julgar por custo por compra e retorno, nunca pelo CPM'],
            ['Imposto da Meta desde 01/2026', 'A Meta passou a cobrar 12,15% de PIS/Cofins e ISS por cima do valor dos anúncios. Se os R$ 30 mil forem o total pago na fatura, viram cerca de R$ 26.750 de anúncio, 16% acima dos R$ 23.006 de 2025, e não 30%. Se forem o orçamento no Gerenciador, a fatura fica em cerca de R$ 33.645', 'Definir se os R$ 30 mil são orçamento ou valor da fatura; a projeção usa R$ 30 mil de orçamento no Gerenciador'],
            ['Brinde sem controle de estoque no cadastro da loja', 'A loja continua dando brinde que não existe', 'Resolvido internamente até 28/10'],
            ['Produto acabar no meio do caminho', 'Anúncio levando para produto esgotado', 'Estoque garantido; regra pronta para trocar anúncio e mover verba'],
            ['Meta e loja contando diferente', 'A Meta mostra muito mais venda que o último clique', 'Decisão pelo último clique (Nemu) com a venda da loja por dia ao lado'],
            ['Campanhas de fora da Black disputando o mesmo público', 'Preço ou cupom antigo no ar e verba dividida', 'Em 28/10 as campanhas usuais da Meta caem ao mínimo para não perder o aprendizado: só a principal fica com R$ 50 por dia (mandando para a coleção com o produto em destaque) e o remarketing usual com R$ 7 por dia. No Google, as reduções do documento 06'],
          ]}
        />
      </Bloco>
      <Bloco titulo="Pendências para fechar antes de 01/11">
        <Tabela
          minimo={620}
          cabecalho={['#', 'Pendência', 'Quem', 'Até']}
          linhas={[
            ['1', 'Estrutura das campanhas da Meta: refinar (1 conjunto amplo ou mais) e definir as páginas de destino', 'Gestor', '28/10'],
            ['2', 'Roleta "Gire e ganhe": escolher entre as 4 opções', 'Gestor', '27/10'],
            ['3', 'R$ 30 mil na Meta: orçamento no Gerenciador ou valor da fatura (imposto de 12,15%)', 'Diretoria', '27/10'],
            ['4', 'Validade do crédito do cashback em dobro', 'Diretoria', '13/11'],
            ['5', 'Rodapé das peças: "Promoção não cumulativa" ou "Não acumula com cupons"', 'Gestor', '27/10'],
            ['6', 'Preço do Neutralizador PRO 5L: R$ 439,90', 'Gestor', '27/10'],
            ['7', 'Tag da galeria: BLACK, BLACK 26, SÓ NA BLACK, OFERTA BLACK ou BLACK NOV', 'Gestor', '27/10'],
            ['8', 'Publicar o projeto de ofertas (git)', 'Gestor', '27/10'],
            ['9', 'Banner da coleção Black: briefing e simulação prontos; arte final com a criação', 'Criação', '28/10'],
          ]}
        />
        <div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]">
          <Figura src={`${IMG}/bn26_banner-colecao-black_desktop-1920x400.jpg`} alt="Simulação do banner da coleção Black, desktop" w={1920} h={400} largura={700} legenda="Banner da coleção Black · desktop 1920x400 (simulação Gemini)" />
          <Figura src={`${IMG}/bn26_banner-colecao-black_mobile-745x400.jpg`} alt="Simulação do banner da coleção Black, mobile" w={745} h={400} largura={340} legenda="Mobile 745x400 (simulação Gemini)" />
        </div>
      </Bloco>
      <Bloco titulo="Decisões em aberto">
        <Tabela
          cabecalho={['Decisão', 'Recomendação', 'Quem', 'Até']}
          linhas={[
            ['Reserva de até R$ 15 mil na Meta', 'Aprovar condicionada ao ROAS de último clique de 2,0', 'Diretoria', '27/10'],
            ['Propostas de site', 'As 7 propostas da página do site, implementadas no tema em 28/10', 'Diretoria e gestor', '27/10'],
            ['Roleta "Gire e ganhe"', 'Temática de Black, prêmios sem desconto, abrindo depois de 30 segundos', 'Gestor', '27/10'],
            ['Imposto da Meta', 'Definir se os R$ 30 mil são orçamento no Gerenciador ou valor da fatura', 'Diretoria', '27/10'],
            ['N01 e novos anúncios dos campeões de 2025', 'Criar a partir dos anúncios originais (prints e vídeos)', 'Gestor', '28/10'],
            ['Rodapé das peças', '"Não acumula com cupons" no lugar de "Promoção não cumulativa" (perfumes e cashback acumulam)', 'Gestor', '27/10'],
            ['Preço do Neutralizador PRO 5L', 'R$ 439,90 (padrão ,90 e mantém os 15% off)', 'Gestor', '27/10'],
            ['Validade do crédito do cashback em dobro', 'Definir antes das peças de 25/11', 'Diretoria', '13/11'],
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
          { marca: 'seg 26/10', titulo: 'Aprovações do gestor', texto: 'Estrutura, nomes, atribuição e novos anúncios baseados nos campeões de 2025.' },
          { marca: 'ter 27/10', titulo: 'Diretoria', texto: 'Verba, reserva condicionada, imposto da Meta, propostas de site e roleta.' },
          { marca: 'qua 28/10', titulo: 'Site e tráfego', texto: 'Banners e ajustes no tema duplicado, aguardando publicação. Campanhas usuais reduzidas ao mínimo; campanhas da Black criadas pausadas; públicos, lista de clientes e Merchant.' },
          { marca: 'qui 29/10', titulo: 'Testes', texto: 'Com o tema pronto, compras reais de teste e testes completos do site e do rastreamento pelo Claude Code (modo ultracode).' },
          { marca: 'sex 30/10', titulo: 'Anúncios e tema', texto: 'Todos os estáticos entregues; anúncios aprovados e programados para 00h de 01/11. Às 23h, publicação do tema da Black.' },
          { marca: 'sáb 31/10', titulo: 'Conferência final', texto: 'Preços, brindes, cupons, prévia de cada anúncio; plantão de 01 e 02/11 definido.' },
          { marca: 'dom 01/11', titulo: 'Início às 00h', texto: 'Campanhas da Black no ar; disparo de abertura às 9h.' },
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
