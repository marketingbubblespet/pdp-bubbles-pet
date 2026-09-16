# Plano de Execução — Landing Page de Lançamento Bubbles Care (Revenda para Petshops)

> Documento de execução para o desenvolvedor (Sonnet). Contém tudo que é necessário para
> construir a página do zero: rota, arquivos, tokens, dados, spec seção a seção, copy sugerida,
> lógica da calculadora, formulário, SEO e checklist de validação.
>
> **Fonte das decisões:** briefing preenchido pelo cliente + 10 fichas técnicas lidas +
> referência visual da seção "Quem é a Bubbles" (captacao.bubbles.com.br) + padrão das LPs
> existentes (`essential/`, `live-dia-do-tosador/`).
>
> **Decisões do cliente já fechadas nesta sessão:**
> - **Rota:** `/care` (ofertas.bubbles.com.br/care)
> - **Formulário:** montar completo visualmente, deixar `TODO` no ponto de envio (destino a definir)
> - **Calculadora:** incluir com números placeholder marcados `[a confirmar Ivan]`
> - **Sem preços e sem links de compra na página.** A conversão é cadastro para pré-venda.

---

## 0. Índice

1. Contexto e objetivo
2. Regras de escopo e isolamento (CRÍTICO)
3. Setup técnico (rota, arquivos, tema)
4. Design tokens (tema claro rosa)
5. Modelo de dados (`src/lib/care.ts`)
6. Estrutura da página (ordem dos blocos)
7. Spec seção a seção (copy + layout + imagens + interações)
8. Calculadora de lucro (lógica + placeholders)
9. Formulário de cadastro (campos + TODO de envio)
10. SEO, metadata e OG image
11. Estímulos de conversão
12. Copy: tom de voz e compliance
13. Divergências de dados a resolver (Ivan / Ruan / time)
14. Itens pendentes (bloqueantes e não bloqueantes)
15. Checklist de execução e validação

---

## 1. Contexto e objetivo

- **Linha:** Bubbles Care, ~11 produtos prontos para uso, voltados ao **tutor** (consumidor final).
- **Público desta página:** o **dono do petshop / groomer**, NÃO o tutor.
- **Objetivo único:** o lojista conhecer a linha e **se cadastrar para revender** (pré-venda de lançamento).
- **Mecânica de conversão:** formulário de cadastro. "Preencha o cadastro e nossos consultores
  entram em contato com condições especiais de pré-venda." Sem preço e sem checkout na página.
- **Tagline oficial:** **"A linha que transforma cada banho em faturamento extra."**

### O fio condutor: matar o medo de "encalhar"

O dono do petshop não trava por falta de interesse no lucro. Ele trava por um medo:
**"e se eu comprar e o produto encalhar na prateleira?"** Toda a página serve para vencer esse
medo, nesta ordem:

1. **O medo** ("vai encalhar"), dito com empatia.
2. **O antídoto:** os números do TikTok Shop provam que a demanda já é gerada pela Bubbles. O tutor
   já chega procurando. 2.665 afiliados = 2.665 pessoas girando a prateleira do lojista, de graça.
3. **A prova de que gira:** vendas reais (1.200 produtos em 3 meses), volume de conteúdo (+3.500 vídeos).
4. **A conta:** a calculadora traduz a demanda em lucro concreto.
5. **A segurança final:** condição de lançamento e cadastro sem compromisso.

---

## 2. Regras de escopo e isolamento (CRÍTICO)

Seguir `CONVENCOES.md`. Esta é uma **LP nova e isolada**:

- Tocar **apenas** em:
  - `src/app/care/` (página nova)
  - `src/components/lp/care/` (componentes novos)
  - `src/lib/care.ts` (dados novos, exclusivos desta LP)
  - `public/images/care/` (imagens novas)
- **Zona protegida (NÃO tocar sem ordem explícita):** `src/lib/` (outros arquivos), `src/components/ui/`,
  `src/app/layout.tsx`, `src/app/globals.css`, `next.config.ts`.
- **Reutilizar** de `src/components/ui/` o que já existe (ex: `UTMCapture` já está no layout global;
  não recriar tracking). Procurar antes de criar componente novo.
- Ao publicar, **atualizar o mapa de páginas na home** (`src/app/page.tsx`), adicionando o item
  "Bubbles Care" na lista `pages` (regra CONVENCOES.md #22).
- **Não** alterar preço, cupom, GA4, Pixel, UTM sem pedir. Esta página herda GA4 + Pixel do layout.

---

## 3. Setup técnico

### Rota e arquivos

```
src/app/care/
  page.tsx                     # monta a página, metadata, JSON-LD, <style> de escopo
  opengraph-image.tsx          # imagem de capa gerada por código (padrão live-dia-do-tosador)

src/components/lp/care/
  CareHero.tsx                 # herói: oportunidade + medo + CTA + prova resumida
  CareDemandMachine.tsx        # bloco TikTok (o coração da página)
  CareProducts.tsx             # catálogo dos 11 produtos agrupados por categoria
  CareCalculator.tsx           # calculadora de lucro (client, com placeholders)
  CareWhyResell.tsx            # "por que revender a Care" (cards de argumento)
  CareBrand.tsx                # "Quem é a Bubbles" (5 stat cards) — ver seção 7.6
  CareHowItWorks.tsx           # como funciona a pré-venda / parceria (passo a passo)
  CareGroomerProof.tsx         # prova social de groomers
  CareFaq.tsx                  # FAQ (client, accordion)
  CareForm.tsx                 # formulário de cadastro (client) — CTA principal
  CareFinalCta.tsx             # reforço final + âncora pro formulário
  CareFooter.tsx               # rodapé (padrão das LPs, tema claro)
  CareStickyBar.tsx            # barra fixa (client)
  CareFloatingWhatsApp.tsx     # WhatsApp flutuante de dúvidas
  CareExitPopup.tsx            # pop-up de saída (client)
  trackCare.ts                 # eventos GA4/Pixel (lead, calculator_use, share) — padrão trackJoin.ts

src/lib/care.ts                # todos os dados da linha (ver seção 5)

public/images/care/            # imagens placeholder (ver nota abaixo)
```

### Tema

**Tema CLARO** ("rosa claro"), seguindo o `DESIGN-SYSTEM.md` da raiz, igual à LP `essential/`.
NÃO usar o tema escuro das masterclasses. Fundo geral `#F7F7F7`, cards brancos, accent rosa
`#E8649A` / rosa claro `#F4CDD4`, botão de ação verde `#3DB85C`.

### Imagens placeholder

Ainda não há fotos dos produtos nem prints dos afiliados. Onde houver imagem, usar placeholder:
- Criar componente/estilo de placeholder (caixa com `bg-[#fdf0f3]`, borda tracejada rosa, ícone
  Lucide + legenda do tamanho esperado), OU usar imagens de exemplo neutras.
- **Padrão de ícones:** usar **Lucide** (não emoji), igual foi feito na `live-dia-do-tosador`.
- Todo `next/image` com `fill` precisa de `sizes` (CONVENCOES.md #34).

---

## 4. Design tokens (tema claro rosa) — referência inline

Do `DESIGN-SYSTEM.md`, para o Sonnet não precisar abrir o arquivo:

| Uso | Token |
|---|---|
| Fundo geral | `bg-[#F7F7F7]` |
| Fundo de card | `bg-white` |
| Fundo de seção suave (rosa) | `bg-[#fdf0f3]` ou `bg-[#fdf2f4]` |
| Accent / eyebrow / ênfase | `text-[#E8649A]` |
| Rosa claro (bordas, selos) | `#F4CDD4` |
| Botão de compra/ação | `bg-[#3DB85C] text-white` |
| Texto principal | `text-[#0F0C0D]` |
| Texto secundário | `text-[#6B7280]` |
| Texto fino | `text-[#9ca3af]` |
| Bordas neutras | `border-[#E5E7EB]` |
| Estrelas | `#F4A522` |

**Escala tipográfica:**
- H1: `text-3xl md:text-5xl font-extrabold leading-[1.15] text-[#0F0C0D]`
- H2: `text-2xl md:text-3xl font-bold text-[#0F0C0D]`
- Eyebrow: `text-xs font-bold uppercase tracking-widest text-[#E8649A]`
- Corpo: `text-sm md:text-base font-medium text-[#6B7280]`

**Botão CTA padrão:**
```
bg-[#3DB85C] text-white font-bold rounded-[10px] px-6 md:px-8 py-3 md:py-4
hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200
```

**Layout:** container `max-w-[1100px] mx-auto px-4`; texto estreito `max-w-[760px]`;
espaçamento de seção `py-16 md:py-24`; raio `rounded-[10px]` (cards `xl`/`2xl`).

**Regras de copy:** pt-BR; **sem travessão "—"** em texto visível (usar vírgula, ":" ou ".").

---

## 5. Modelo de dados (`src/lib/care.ts`)

Arquivo isolado, só desta LP. Estrutura sugerida (o Sonnet ajusta tipos conforme padrão do projeto):

```ts
// src/lib/care.ts
import { BRAND } from '@/lib/constants'

export const CARE = {
  slug: 'care',
  tagline: 'A linha que transforma cada banho em faturamento extra.',
  whatsapp: BRAND.whatsapp,              // WhatsApp de dúvidas (mesmo padrão das LPs)
  whatsappMsg: 'Olá! Quero saber como revender a linha Bubbles Care no meu petshop.',
} as const

// Números da máquina de demanda (TikTok Shop) — confirmar antes de publicar
export const CARE_DEMAND = {
  afiliados: '2.665',
  vendas3meses: '1.200',
  videos: '+3.500',
} as const

// Categorias/sub-linhas da Care (briefing seção 3)
// Shampoos, condicionadores/hidratação, finalizadores/leave-ins, perfumes, cuidados específicos
export const CARE_PRODUCTS = [
  // categoria: 'shampoo' | 'condicionamento' | 'finalizador' | 'perfume' | 'cuidado'
  { id: 'shampoo-limpeza-profunda', nome: 'Shampoo Limpeza Profunda', apresentacao: '300ml',
    categoria: 'shampoo',
    descricao: 'Limpa a fundo e ajuda a neutralizar odores, deixando a pelagem leve, macia e com sensação de limpeza prolongada.',
    imagem: '/images/care/placeholder.png' }, // TODO trocar por foto real
  { id: 'shampoo-neutro', nome: 'Shampoo Neutro', apresentacao: '300ml', categoria: 'shampoo',
    descricao: 'Limpeza suave para o dia a dia, para todos os tipos de pelagem, deixando os pelos macios, brilhantes e com toque agradável.',
    imagem: '/images/care/placeholder.png' },
  { id: 'shampoo-pelos-claros', nome: 'Shampoo Pelos Claros', apresentacao: '300ml', categoria: 'shampoo',
    descricao: 'Realça a luminosidade da pelagem clara, branca ou grisalha, minimizando o aspecto amarelado com tecnologia óptica.',
    imagem: '/images/care/placeholder.png' },
  { id: 'condicionador-hidratante', nome: 'Condicionador Hidratante', apresentacao: '250ml', categoria: 'condicionamento',
    descricao: 'Hidrata e desembaraça, reduz os nós e deixa os pelos alinhados, macios e com toque sedoso. Com óleo de argan.',
    imagem: '/images/care/placeholder.png' },
  { id: 'mascara-multifuncional', nome: 'Máscara Multifuncional', apresentacao: '100ml', categoria: 'condicionamento',
    descricao: 'Hidratação e nutrição com manteiga de karité, óleo de abacate e pantenol, para uma pelagem mais macia, brilhante e resistente.',
    imagem: '/images/care/placeholder.png' },
  { id: 'secagem-rapida', nome: 'Secagem Rápida', apresentacao: '100ml', categoria: 'finalizador',
    descricao: 'Leave-in que ajuda a reduzir o tempo de secagem, facilita a escovação e deixa os pelos macios e soltos, sem pesar.',
    imagem: '/images/care/placeholder.png' },
  { id: 'limpeza-olhos-ouvidos', nome: 'Limpeza de Olhos e Ouvidos', apresentacao: '100ml', categoria: 'cuidado',
    descricao: 'Higiene suave e diária da região dos olhos e ouvidos do pet. [descrição a confirmar, ainda sem ficha técnica]',
    imagem: '/images/care/placeholder.png' }, // ATENÇÃO: sem PDF de ficha técnica (ver seção 13)
  { id: 'hidratante-patas-focinhos', nome: 'Hidratante de Patas e Focinhos', apresentacao: '50ml', categoria: 'cuidado',
    descricao: 'Balm que hidrata e forma uma barreira cosmética nas patinhas e no focinho, reduzindo o ressecamento, com ceras de candelilla e carnaúba e manteiga de karité.',
    imagem: '/images/care/placeholder.png' },
  { id: 'banho-a-seco', nome: 'Banho a Seco Desembaraçador', apresentacao: '250ml', categoria: 'finalizador',
    descricao: 'Higiene entre banhos: refresca, desembaraça e perfuma suavemente a pelagem seca, sem enxágue e sem resíduos. Com aloe vera.',
    imagem: '/images/care/placeholder.png' },
  { id: 'body-splash-flora', nome: 'Body Splash Flora Pet', apresentacao: '80ml', categoria: 'perfume',
    descricao: 'Perfuma delicadamente a pelagem com fragrância duradoura e sensação de frescor, sem pesar os pelos.',
    imagem: '/images/care/placeholder.png' },
  { id: 'body-splash-luna', nome: 'Body Splash Pet Luna', apresentacao: '80ml', categoria: 'perfume',
    descricao: 'Perfuma delicadamente a pelagem com fragrância duradoura e sensação de frescor, sem pesar os pelos.',
    imagem: '/images/care/placeholder.png' },
] as const

export const CARE_CATEGORIES = [
  { id: 'shampoo', label: 'Shampoos' },
  { id: 'condicionamento', label: 'Condicionamento e Hidratação' },
  { id: 'finalizador', label: 'Finalizadores e Leave-ins' },
  { id: 'perfume', label: 'Perfumes' },
  { id: 'cuidado', label: 'Cuidados Específicos' },
] as const

// "Por que revender" (briefing seção 7, todos marcados como sim)
export const CARE_WHY_RESELL = [
  { icon: 'TrendingUp', title: 'Nova fonte de lucro sem trabalho extra', text: 'O cliente já está na sua loja. Você só oferece o produto no balcão.' },
  { icon: 'Clock', title: 'Vende no melhor momento', text: 'Pet recém-banhado e cheiroso: é a hora em que o tutor mais valoriza levar o cuidado pra casa.' },
  { icon: 'Scissors', title: 'Facilita o seu trabalho', text: 'O pet cuidado em casa chega com menos nó, e o banho rende mais na sua bancada.' },
  { icon: 'Handshake', title: 'Complementa, não substitui', text: 'A Care é a manutenção em casa entre um banho profissional e outro. Não tira o seu serviço, valoriza ele.' },
  { icon: 'Award', title: 'Reforça sua autoridade', text: 'Quando você recomenda, o tutor confia. Sua indicação vale mais que qualquer anúncio.' },
  { icon: 'ShieldCheck', title: 'Margem protegida e PDV pronto', text: 'Você recebe material de ponto de venda e uma margem pensada para o petshop.' },
] as const

// FAQ (briefing seção 9)
export const CARE_FAQ = [
  { q: 'Se o tutor compra no site de vocês, por que eu deveria estocar?', a: '...' },
  { q: 'Produto pronto rende pouco, vai encalhar na prateleira?', a: '...' },
  { q: 'Qual a margem real que eu ganho?', a: '...' },
  { q: 'Quanto preciso comprar para começar?', a: '...' },
  { q: 'E se o preço do site ficar mais barato que o meu?', a: '...' },
  { q: 'Se eu vender o kit para o tutor, eu perco ele do meu banho e tosa?', a: '...' },
] as const

// Quem é a Bubbles (referência: captacao.bubbles.com.br)
export const CARE_BRAND_STATS = [
  { icon: 'Clock', value: '+7 Anos', label: 'Tempo de mercado', sub: 'Pioneirismo e inovação' },
  { icon: 'Star', value: '4.9/5.0', label: 'NPS e satisfação', sub: 'Aprovação máxima' },
  { icon: 'Users', value: '+5.000', label: 'Base de groomers', sub: 'Especialistas de elite' },
  { icon: 'Heart', value: '+20.000', label: 'Clientes ativos', sub: 'Tutores apaixonados' },
  { icon: 'Package', value: '+50', label: 'Mix de soluções', sub: 'Produtos exclusivos' },
] as const
```

> As respostas do FAQ (`a: '...'`) estão como sugestão na seção 7.9 abaixo; o Sonnet deve
> preencher a partir de lá.

---

## 6. Estrutura da página (ordem dos blocos)

Todos aprovados no briefing (seção 2). Adicionado o bloco "Quem é a Bubbles" pedido pelo cliente.

1. **Herói** (`CareHero`) — oportunidade sem esconder o medo + CTA + prova resumida
2. **A máquina de demanda / TikTok** (`CareDemandMachine`) — o coração, o antídoto ao medo
3. **Os 11 produtos** (`CareProducts`) — catálogo por categoria, só imagem (sem preço/link)
4. **Calculadora "quanto seu petshop lucra"** (`CareCalculator`) — placeholders Ivan
5. **Por que revender a Care** (`CareWhyResell`) — 6 cards de argumento
6. **Quem é a Bubbles** (`CareBrand`) — 5 stat cards (referência captação)
7. **Como funciona a pré-venda** (`CareHowItWorks`) — passo a passo do cadastro
8. **Prova social de groomers** (`CareGroomerProof`)
9. **Formulário de cadastro** (`CareForm`) — CTA principal da conversão
10. **FAQ** (`CareFaq`)
11. **CTA final** (`CareFinalCta`) — reforço + âncora pro formulário

**Estímulos:** `CareStickyBar` (barra fixa), `CareFloatingWhatsApp`, `CareExitPopup`, `CareFooter`.

> Ordem de carregamento (padrão de performance das LPs): acima da dobra (Hero, DemandMachine,
> Products) com import direto; abaixo da dobra com `dynamic()` (Calculator, WhyResell, Brand,
> HowItWorks, GroomerProof, Form, Faq, FinalCta, StickyBar, ExitPopup).

---

## 7. Spec seção a seção

Em cada seção: **objetivo → copy sugerida → layout/tokens → imagens → interações**.
Toda copy abaixo é sugestão pronta para uso; ajustar só se a liderança pedir (ver seção 12).

### 7.1 Herói (`CareHero`)

- **Objetivo:** enquadrar a oportunidade encarando o medo de frente. Prova de demanda já resumida aqui.
- **Eyebrow:** `LANÇAMENTO · BUBBLES CARE`
- **H1:** "Revenda sem medo de encalhar. A procura a gente já criou pra você."
- **Subtítulo:** "A linha Care já tem tutor procurando. Você só precisa ter na prateleira. A Bubbles gera a demanda; o lucro fica com o seu petshop."
- **Pílulas de prova resumida** (3, com ícone Lucide rosa): "2.665 afiliados divulgando", "1.200 produtos vendidos em 3 meses", "+3.500 vídeos criados".
- **CTA principal:** botão verde "Quero revender no meu petshop" → âncora `#cadastro` (rola até o formulário).
- **Imagem:** placeholder de herói (produto Care / ambiente de petshop / prateleira). Legenda do placeholder: "Imagem de herói, 1200x800px, produtos Care na prateleira ou ambiente de petshop".
- **Layout:** grid 2 colunas no desktop (texto + imagem), 1 coluna no mobile. Fundo `#F7F7F7`.

### 7.2 A máquina de demanda / TikTok (`CareDemandMachine`) — o coração

- **Objetivo:** provar que o giro é puxado pela Bubbles, não pelo lojista. É o bloco mais importante.
- **Eyebrow:** `A MÁQUINA DE DEMANDA`
- **H2:** "Enquanto você lê isto, tem gente vendendo Care pra você."
- **Copy de abertura:** "2.665 criadores já estão gerando procura pela Bubbles no TikTok Shop. Os tutores vão procurar os produtos. A pergunta é: vão encontrar na sua prateleira?"
- **3 números em destaque** (cards brancos, número grande rosa `#E8649A`, fonte forte):
  - `2.665` — Afiliados ativos divulgando a marca
  - `1.200` — Produtos vendidos em 3 meses de TikTok Shop
  - `+3.500` — Vídeos e lives já produzidos pelos afiliados
- **Faixa de reforço:** "Não é promessa de venda. É venda que já está acontecendo. Cada afiliado é uma pessoa trabalhando, de graça, para levar o tutor até o seu balcão."
- **Galeria de prova:** grade de 4 a 6 placeholders de vídeo/print de afiliado (legenda: "Print/vídeo real de afiliado do TikTok, 9:16"). Trocar por prints reais quando o time enviar.
- **Layout:** fundo `#fdf0f3` (rosa suave) para destacar como bloco especial. `py-16 md:py-24`.

### 7.3 Os 11 produtos (`CareProducts`)

- **Objetivo:** catálogo visual, agrupado por categoria. **Sem preço, sem link de compra** (só imagem + nome + descrição curta).
- **Eyebrow:** `A LINHA COMPLETA`
- **H2:** "11 produtos prontos para girar na sua prateleira."
- **Layout:** agrupar por `CARE_CATEGORIES`. Para cada categoria, um subtítulo e um grid de cards
  (2 col mobile / 3-4 col desktop). Card = imagem placeholder (quadrada, fundo `#fdf0f3`), nome
  (`font-extrabold #0F0C0D`), apresentação (`text-xs #9ca3af`), descrição (`text-sm #6B7280`).
- **Sem CTA por card.** Um CTA geral no fim da seção: "Quero revender essa linha" → `#cadastro`.
- **Imagens:** placeholder por produto, legenda "Foto do produto, fundo neutro, 800x800px".

### 7.4 Calculadora (`CareCalculator`)

Ver **seção 8** (lógica detalhada). Resumo de UI:
- **Eyebrow:** `FAÇA A CONTA`
- **H2:** "Quanto a Care pode render pro seu petshop?"
- Slider + resultado de lucro estimado/mês. Números placeholder `[a confirmar Ivan]`.
- Disclaimer visível: "Projeção ilustrativa baseada na demanda que já geramos. Resultados reais podem variar."
- Fundo branco ou `#fdf2f4`. Client component.

### 7.5 Por que revender a Care (`CareWhyResell`)

- **Objetivo:** os 6 argumentos de revenda (dados em `CARE_WHY_RESELL`).
- **Eyebrow:** `POR QUE REVENDER`
- **H2:** "Uma nova receita que entra sem tirar tempo do seu banho e tosa."
- **Layout:** grid de 6 cards (1 col mobile / 2-3 col desktop). Cada card: ícone Lucide rosa em
  círculo `bg-[#fdf0f3]`, título `font-extrabold`, texto `text-sm #6B7280`. Fundo da seção `#F7F7F7` ou branco.

### 7.6 Quem é a Bubbles (`CareBrand`) — referência captação

- **Objetivo:** autoridade da marca, exatamente no espírito da seção de captacao.bubbles.com.br.
- **Eyebrow:** `NOSSA ESSÊNCIA`
- **H2:** "Quem é a Bubbles®?"
- **Parágrafo 1:** "A Bubbles® nasceu da vontade de transformar a experiência de banho e tosa em algo mais profissional, sensorial e consciente, tanto para o groomer quanto para o pet."
- **Parágrafo 2:** "Com mais de 7 anos de história, elevamos o padrão do mercado, transformando cada atendimento em uma experiência memorável."
- **5 stat cards** (dados em `CARE_BRAND_STATS`), lado a lado (rolagem horizontal no mobile ou grid
  responsivo): ícone Lucide no topo, número grande (`+7 Anos`, `4.9/5.0`, `+5.000`, `+20.000`, `+50`),
  label em maiúsculas, sub-legenda fina.
  - Ícones: Clock, Star, Users, Heart, Package.
- **Layout:** pode usar fundo escuro sutil OU manter tema claro. Como a página é tema claro, sugiro
  cards brancos com borda `#E5E7EB` sobre fundo `#fdf0f3`, número em `#E8649A`. (A referência original
  é sobre foto escura; aqui adaptamos ao tema claro da Care para manter consistência.)

### 7.7 Como funciona a pré-venda (`CareHowItWorks`)

- **Objetivo:** explicar o caminho, sem preço. É cadastro → contato → condição especial.
- **Eyebrow:** `COMO FUNCIONA`
- **H2:** "Simples: você se cadastra, a gente cuida do resto."
- **Passo a passo (3 passos, numerados):**
  1. "Preencha o cadastro" — leva 1 minuto, sem compromisso.
  2. "Nossos consultores entram em contato" — com as condições especiais de pré-venda de lançamento.
  3. "Você monta seu primeiro pedido" — com o mix ideal para começar a girar na sua prateleira.
- **Layout:** 3 cards ou timeline horizontal. Ícones Lucide. CTA no fim → `#cadastro`.
- **Observação:** NÃO mencionar Shopify, Sellum, faixas de desconto ou valores nesta versão de
  pré-lançamento (decisão do cliente). Isso entra depois.

### 7.8 Prova social de groomers (`CareGroomerProof`)

- **Objetivo:** confiança de quem já usa a marca.
- **Eyebrow:** `QUEM JÁ CONFIA`
- **H2:** "Mais de 5.000 groomers já constroem seu padrão com a Bubbles."
- **Layout:** 2-3 cards de depoimento (estrelas `#F4A522`, aspas, nome + selo). Usar placeholders de
  depoimento até o time enviar os reais (NÃO inventar depoimento de pessoa real; usar rótulo
  "[Depoimento a confirmar]" no lugar do texto). Foto do groomer = placeholder redondo.

### 7.9 FAQ (`CareFaq`) — respostas sugeridas

Accordion (padrão `LiveFaq`/`MasterFaqB`). Respostas prontas (ajustar com a liderança):

- **"Se o tutor compra no site de vocês, por que eu deveria estocar?"**
  "Porque a maioria dos tutores decide na hora, no balcão, com o pet recém-banhado na frente. Quem tem o produto na prateleira captura essa venda por impulso, que o site sozinho não pega."
- **"Produto pronto rende pouco, vai encalhar na prateleira?"**
  "É justamente o contrário do que a gente construiu. Tem 2.665 afiliados gerando procura pela linha todos os dias. O tutor já chega querendo. Seu papel é só ter o produto disponível."
- **"Qual a margem real que eu ganho?"**
  "A margem é pensada para o petshop, com material de ponto de venda pronto. No cadastro, nossos consultores passam a condição de lançamento com os números fechados para o seu caso."
- **"Quanto preciso comprar para começar?"**
  "Na pré-venda de lançamento, os consultores montam com você um primeiro pedido no tamanho certo pra sua loja, sem exagero de estoque."
- **"E se o preço do site ficar mais barato que o meu?"**
  "A política de preço protege quem revende. Isso é parte da conversa com o consultor no seu cadastro."
- **"Se eu vender o kit para o tutor, eu perco ele do meu banho e tosa?"**
  "Não. A Care é manutenção em casa entre um banho e outro. O pet volta mais fácil de trabalhar, e você segue sendo a referência de cuidado dele."

### 7.10 CTA final (`CareFinalCta`)

- **Eyebrow:** `PRÉ-VENDA DE LANÇAMENTO`
- **H2:** "Entre agora, com prioridade. Depois, seu concorrente já vai estar revendendo."
- **Texto:** "A demanda já está girando. Garanta que ela encontre a sua prateleira primeiro."
- **CTA:** botão verde "Quero revender no meu petshop" → `#cadastro`.
- **Layout:** faixa de destaque (pode usar `bg-[#fdf0f3]` ou fundo escuro `#0d0c0d` com texto claro,
  como o `LiveFinalCta`). Confirmar com a identidade final.

---

## 8. Calculadora de lucro (`CareCalculator`)

> **IMPORTANTE:** os números reais dependem do Ivan (ver briefing seção 8.1 e 13). Construir a UI
> e a lógica com **constantes placeholder nomeadas**, claramente marcadas, para trocar depois.
> NÃO exibir preço de produto (decisão do cliente). O resultado é um **valor de lucro estimado**.

### 8.1 Modelo (a validar com Ivan)

Modelo **B / híbrido** (a confirmar). Proposta: slider de **quantas unidades o lojista pretende
comprar/mês** (ou quantos banhos faz por mês) → mostra o **lucro estimado**.

```ts
// TODO [a confirmar Ivan]: todos os valores abaixo são placeholder.
const LUCRO_MEDIO_POR_UNIDADE = 0        // R$ de margem média por unidade (Ivan define)
const TAXA_CONVERSAO = 0                  // % de clientes/banhos que levam 1 produto (Ivan define)
// resultado:
const lucroMes = unidadesVendidasMes * LUCRO_MEDIO_POR_UNIDADE
```

- **Amarração com o bloco TikTok:** apresentar a taxa como consequência da demanda já ativa. Ex:
  "considerando a procura que já geramos, a cada X clientes seus, Y levam um produto Care".
- **Faixa do slider:** definir com Ivan (ex: 10 a 200 unidades/mês). Placeholder: 10 a 100.

### 8.2 Saídas do resultado (validar com Ivan)

- Lucro extra estimado por mês (número grande, rosa).
- Lucro extra estimado por ano.
- (Opcional) "unidades vendidas por mês", reforçando o giro.
- Disclaimer obrigatório: "Projeção ilustrativa. Resultados reais variam conforme o movimento da sua loja."

### 8.3 Cuidados (briefing 8.5)

- Deixar explícito que é estimativa.
- **Não** comparar "preço por litro" com linhas profissionais (regra do plano).
- **Não** renderizar números negativos. Enquanto Ivan não fecha a margem, manter a calculadora com
  os placeholders zerados e um aviso "em breve" OU números de exemplo positivos rotulados como exemplo.
- Disparar evento `calculator_use` (GA4) quando o lojista mexe no slider (ver `trackCare.ts`).

---

## 9. Formulário de cadastro (`CareForm`)

> **Decisão do cliente:** montar o formulário **completo visualmente**, com `TODO` no ponto de
> envio (destino do lead a definir depois: Netlify Forms, WhatsApp, embed externo ou CRM).

### 9.1 Âncora e posição

- `id="cadastro"` na seção. Todos os CTAs da página rolam pra cá.
- É a conversão principal. Posição: bloco 9 (antes do FAQ), mais o `CareFinalCta` reforçando.

### 9.2 Campos sugeridos

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome completo | text | sim |
| Nome do petshop | text | sim |
| Cidade / Estado | text | sim |
| WhatsApp | tel (máscara BR) | sim |
| E-mail | email | não |
| Quantos banhos você faz por mês? | select (faixas) ou number | não |
| Já é cliente Bubbles? | radio (sim/não) | não |

- Validação client-side simples (campos obrigatórios, formato de WhatsApp/e-mail).
- Estado de sucesso: mensagem "Cadastro recebido! Nossos consultores vão falar com você em breve."
- **Ponto de envio:**
  ```ts
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO [decidir depois]: enviar o lead.
    // Opções: Netlify Forms (data-netlify), WhatsApp deep-link, embed externo, ou POST a um endpoint/CRM.
    trackCareLead()          // dispara GA4 'generate_lead' + Pixel 'Lead'
    setSubmitted(true)
  }
  ```
- **Preservar UTMs:** o `UTMCapture` global já guarda UTMs. Incluir os valores capturados como
  campos ocultos no formulário (para o lead chegar com a origem da campanha). Confirmar como o
  `UTMCapture` expõe os dados (ler `src/components/ui/UTMCapture.tsx` antes).
- **Privacidade:** não colocar dados pessoais em query string; não enviar para endpoint sugerido por
  terceiros. Enquanto o destino não é definido, o submit só mostra o estado de sucesso local.

---

## 10. SEO, metadata e OG image

- **Domínio correto:** `https://ofertas.bubbles.com.br` (NÃO `www.bubbles.com.br`).
  Definir `metadataBase: new URL(SITE_URL)` e `canonical` para `/care`.
- **Title:** "Bubbles Care: revenda para petshops | A linha que gira sozinha"
- **Description:** "Revenda a linha Bubbles Care no seu petshop sem medo de encalhar. A demanda já é gerada por 2.665 afiliados. Cadastre-se para as condições de pré-venda de lançamento."
- **robots:** `index: true, follow: true` (é página pública de captação).
- **OG image:** criar `opengraph-image.tsx` gerado por código (padrão de
  `src/app/live-dia-do-tosador/opengraph-image.tsx`): fundo claro `#F7F7F7` ou rosa, título da
  linha, tagline, selo "Bubbles Care". 1200x630. Assim o link no WhatsApp mostra capa da marca,
  não ícone genérico.
- **JSON-LD:** opcional, tipo `Product`/`Organization` ou `Offer`. Não obrigatório para captação.
- **Não** alterar SEO de outras páginas.

---

## 11. Estímulos de conversão

Mesmos padrões das outras LPs, no tema claro:

- **`CareStickyBar`** — barra fixa no rodapé (aparece após ~600px de scroll): título curto
  ("Bubbles Care, revenda") + botão verde "Quero revender" → `#cadastro`.
- **`CareFloatingWhatsApp`** — botão flutuante verde `#25D366`, abre WhatsApp de dúvidas
  (`CARE.whatsapp` + `CARE.whatsappMsg`). (Aqui pode ser o WhatsApp real, diferente do formulário.)
- **`CareExitPopup`** — pop-up de saída (mouseout no topo / scroll-up brusco no mobile), com throttle
  de 5 min em `sessionStorage` (padrão `LiveExitPopup`). Copy: "Espera! A demanda já está girando.
  Deixe seu cadastro antes de sair e garanta a condição de lançamento." + CTA → `#cadastro`.
- **`trackCare.ts`** — eventos: `generate_lead` (submit do form), `calculator_use` (uso do slider),
  `share` (se houver botão de compartilhar). Seguir o padrão de `trackJoin.ts`.

---

## 12. Copy: tom de voz e compliance

- Seguir `docs/brand/tom-de-voz.md`. **Cosmético pet**, sem promessa terapêutica/medicamentosa.
- **Termos proibidos:** "cura", "anti-inflamatório", "remédio/medicinal", "não causa reação",
  referência a uso humano. As fichas técnicas confirmam: "produto sem ação terapêutica".
- **Tom com o lojista:** parceria e oportunidade, não súplica. Urgência real (prioridade de
  lançamento vs. concorrente), não fabricada.
- **Sem travessão "—"** em texto visível (usar vírgula, ":" ou ".").
- **Frases/termos que a liderança faz questão de usar ou proibir:** estão no canal de Marketing no
  Slack. **PENDENTE:** buscar antes de finalizar a copy (ver seção 14).
- Descrições de produto: benefício estético/higiene/bem-estar apenas. Nunca "trata", "resolve
  problema de pele", etc. (as fichas dizem "não indicado para pet com problemas de pele").

---

## 13. Divergências de dados a resolver (Ivan / Ruan / time)

Encontradas ao cruzar as **10 fichas técnicas** com a **lista de 11 produtos** do briefing:

1. **10 PDFs para 11 produtos.** Não há um PDF por item da lista. Reconciliar antes de publicar.
2. **"Shampoo Neutralizador" (PDF) x "Shampoo Limpeza Profunda" (briefing #1).** Provavelmente o
   mesmo produto com nome diferente (o PDF fala em remoção de impurezas e odores, ativo Deoplex
   Clear de controle de odor). **Confirmar o nome oficial de venda.**
3. **"Finalizador Perfumado Oleoso" (PDF) NÃO está na lista de 11.** Existe ficha técnica mas não
   entrou na tabela de preços/produtos. É um 12º produto? Substitui algum? **Confirmar.** (Se for
   incluído, já deixei a descrição pronta: "Finalizador que dá brilho intenso, reduz o frizz e
   alinha os pelos sem aspecto oleoso, com óleos de castanha-do-pará e patauá.")
4. **"Limpeza de Olhos e Ouvidos" (briefing #7) NÃO tem ficha técnica.** Descrição no `care.ts` está
   como placeholder. **Pedir a ficha ou a descrição oficial.**
5. **Body Splash:** a lista tem 2 (Flora Pet e Pet Luna), mas há só 1 PDF ("Body Splash Fresh Pet")
   e as fragrâncias ainda estão "aguardando escolha". Confirmar os 2 nomes finais e as fragrâncias.
6. **Condicionador:** PDF diz 300ml, briefing diz 250ml. **Confirmar a apresentação correta.**
7. **Preços/margem (briefing 8.1):** a planilha, como recebida, dá prejuízo abaixo de 100un. Como a
   página não exibe preço e a calculadora usa placeholders, isso não bloqueia o visual, mas
   **bloqueia ligar a calculadora com números reais.** Resolver com Ivan antes do v2.
8. **Identidade visual da Care (logo/selo próprio):** pendente com o **Ruan**. Por ora seguir o
   Design System (tema claro rosa). Se vier selo "Care", aplicar depois.

---

## 14. Itens pendentes

**Bloqueiam a versão final (não o protótipo):**
- Fotos reais dos 11 produtos (fundo neutro). Hoje: placeholder.
- Prints/vídeos reais dos afiliados do TikTok. Hoje: placeholder.
- Depoimentos reais de groomers. Hoje: placeholder rotulado (não inventar).
- Destino do formulário (Netlify Forms / WhatsApp / embed / CRM). Hoje: `TODO` no submit.
- Números da calculadora (Ivan). Hoje: placeholder zerado/exemplo.
- Frases/termos obrigatórios ou proibidos da liderança (canal Marketing no Slack).
- Confirmação dos números do TikTok (2.665 / 1.200 / +3.500) e das divergências da seção 13.

**Não bloqueiam:**
- Identidade própria da Care (Ruan) — segue Design System enquanto não vier.
- JSON-LD (opcional).

---

## 15. Checklist de execução e validação

Para o Sonnet seguir, em ordem:

- [ ] Criar `src/lib/care.ts` com todos os dados (seção 5).
- [ ] Criar a rota `src/app/care/page.tsx` (metadata + JSON-LD opcional + `<style>` de escopo +
      montagem dos blocos na ordem da seção 6, com `dynamic()` abaixo da dobra).
- [ ] Criar `src/app/care/opengraph-image.tsx` (seção 10).
- [ ] Criar os componentes em `src/components/lp/care/` (seção 3), tema claro (seção 4), ícones Lucide.
- [ ] Criar `trackCare.ts` (eventos GA4/Pixel).
- [ ] Colocar imagens placeholder em `public/images/care/` (ou componente de placeholder reutilizável).
- [ ] Formulário com `id="cadastro"`, campos da seção 9, `TODO` no submit, UTMs ocultas.
- [ ] Calculadora com constantes placeholder marcadas `[a confirmar Ivan]`, sem números negativos.
- [ ] Todos os `next/image fill` com `sizes`. Copy sem travessão "—". Tudo pt-BR.
- [ ] **Atualizar `src/app/page.tsx`** (home) adicionando "Bubbles Care" no mapa de páginas.
- [ ] `npm run build` limpo.
- [ ] Testar no navegador (`/care`): renderização, âncoras dos CTAs → `#cadastro`, slider da
      calculadora, accordion do FAQ, sticky bar, exit popup, responsivo mobile.
- [ ] Revisar compliance (seção 12) antes de dizer que está pronto.

---

### Resumo de decisões travadas (não reabrir sem pedir)

- Rota `/care`; tema claro rosa (Design System raiz); sem preço e sem link de compra na página;
  conversão por formulário de cadastro (submit `TODO`); calculadora com placeholders do Ivan;
  seção "Quem é a Bubbles" incluída (5 stats da captação); domínio `ofertas.bubbles.com.br`.
