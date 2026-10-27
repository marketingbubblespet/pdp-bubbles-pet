// Capa, resumo executivo, pedido à diretoria e agenda.
import { SECOES } from '@/lib/apresentacao-black-november'
import { Callout, Lista, Numeros, Secao } from './ui'

export function Capa() {
  const total = SECOES.reduce((s, x) => s + x.minutos, 0)
  return (
    <header className="bg-[#0D0C0D] text-white">
      <div className="mx-auto max-w-[1100px] px-4 pb-14 pt-14 md:pb-20 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#F4CDD4]">
          Bubbles Pet · groomer e pet shop · e-commerce
        </p>
        <h1 className="mt-4 text-4xl font-medium leading-[1.1] md:text-6xl">Plano da Black November 2026</h1>
        <p className="mt-5 max-w-[760px] text-base text-white/80 md:text-lg">
          O que a Black 2025 ensinou, o que vamos fazer de 01 a 30/11/2026 e quanto esperamos faturar.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ['R$ 420.710', 'faturamento da loja na Black 2025: a meta mínima é empatar'],
            ['R$ 562 mil', 'projeção 2026 no cenário base: 34% acima de 2025'],
            ['R$ 50 mil', 'mídia em novembro: Meta R$ 30 mil e Google R$ 20 mil (2025: R$ 35 mil)'],
            ['R$ 648', 'ticket médio previsto, 7% acima dos R$ 606 de 2025'],
          ].map(([v, r]) => (
            <div key={v} className="rounded-[12px] border border-white/15 p-4">
              <p className="text-2xl font-semibold text-[#F4CDD4] md:text-3xl">{v}</p>
              <p className="mt-1 text-sm text-white/75">{r}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/60">
          Apresentação de {total} minutos e 10 de perguntas. Para apresentar: setas ‹ › passam as seções, N mostra o
          roteiro de fala e T liga o cronômetro (também na barra no canto da tela).
        </p>
      </div>
    </header>
  )
}

export function Navegacao() {
  return (
    <nav aria-label="Seções" className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-[1100px] gap-1 overflow-x-auto px-4 py-2">
        {SECOES.map((s, i) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className="flex min-h-[44px] items-center rounded-[12px] px-3 text-sm font-medium text-[#0D0C0D] hover:bg-[#FDF2F4]"
            >
              <span className="mr-1.5 text-[#E8649A]">{i + 1}</span>
              {s.curto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Resumo() {
  return (
    <Secao
      id="resumo"
      resumo={
        <>
          A Black 2025 dobrou os pedidos da loja. Em 2026 repetimos o que funcionou (oferta no ar desde o dia 1, Linha
          Essential, brinde que aumenta o pedido), cortamos o que desperdiçou (testes no meio do mês, catálogo sem
          desenho, remarketing travado na Black Week) e arrumamos o site, onde metade do clique pago se perdia.
        </>
      }
      roteiro={[
        'Abrir pela meta: empatar com os R$ 420.710 de 2025 é o mínimo; a projeção base é R$ 562 mil.',
        'Dizer de onde vêm os números: Shopify (loja), Meta, Google, Nemu e pesquisa de busca. Nada é chute.',
        'Mostrar os 4 pedidos à diretoria logo no início, para a conversa terminar em decisão.',
        'Explicar a ordem: passado, mercado, plano, site, números, riscos.',
      ]}
      pergunta={{
        p: 'Por que investir mais se 2025 foi bem?',
        r: 'A loja cresceu 25% no ano; os R$ 30 mil na Meta sustentam esse ritmo. O dinheiro extra só entra se o retorno provar nas checagens de 10 e 20/11.',
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Callout titulo="O que pedimos à diretoria hoje" escuro>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Aprovar R$ 50 mil de mídia em novembro: R$ 30 mil na Meta e R$ 20 mil no Google.</li>
            <li>
              Aprovar uma reserva de até R$ 15 mil na Meta, liberada só se o retorno de último clique (ROAS LC) estiver
              em 2,0 ou mais nas checagens de 10/11 e 20/11.
            </li>
            <li>Escolher as propostas de site, implementadas no tema em 28/10 (seção 7).</li>
            <li>Ciência dos riscos e das decisões em aberto (seção 10).</li>
          </ol>
        </Callout>
        <Callout titulo="Em cinco pontos">
          <Lista
            itens={[
              'Na loja, a Black 2025 foi de volume e de ticket: pedidos +112% e receita +188% contra outubro.',
              'Um anúncio simples da Linha Essential com 10% off carregou a Meta: 41% das compras.',
              'O meio do mês perdeu eficiência na Meta com testes; a loja não caiu.',
              'Metade do clique pago não chegava a abrir a página, e 79% dos checkouts não viravam compra (possível erro de medição, a confirmar nos testes de compra).',
              'Dezembro caiu 70%: o cashback em dobro no fim de novembro vira crédito para a recompra.',
            ]}
          />
        </Callout>
      </div>
      <Numeros
        itens={[
          { valor: '+34%', rotulo: 'faturamento projetado contra 2025 (cenário base, R$ 30 mil na Meta)' },
          { valor: '868', rotulo: 'pedidos projetados na loja em novembro (2025: 694)' },
          { valor: '2', rotulo: 'conjuntos que aprendem o mês todo, um de prospecção e um de remarketing (2025: 30). Estrutura em refinamento' },
          { valor: '15', rotulo: 'checagens datadas de 02/11 a 01/12, com regra escrita para pausar e escalar' },
        ]}
      />
    </Secao>
  )
}
