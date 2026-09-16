# Plano da Página de Boas-Vindas · Bubbles

> **Status: plano decidido, aguardando validação final.** Nada foi construído.
> Revisão 2 · 2026-09-06 · Decisões fundamentadas em dados, não em preferência.
>
> Base: `docs/brand/` (personas, marca, tom de voz, produtos), `DESIGN-SYSTEM.md`,
> dados reais de receita da loja e pesquisa de referências de e-commerce B2B.

---

## 1. O que esta página é (e o que ela não é)

**Página nova e complementar, em `/pages/boas-vindas`. Nunca substitui a home.**

São conceitos diferentes e vale registrar por quê:

| | Home | Página de boas-vindas |
|---|---|---|
| Quem chega | Tráfego direto, recorrente, quem já conhece | Primeira visita, quase sempre vinda de campanha |
| Função | Vitrine permanente, navegação para tudo | Converter um desconhecido em primeiro pedido |
| Sucesso | Navegação e recompra | Primeira compra ou captura de contato |
| Risco de mexer | Alto, afeta toda a loja | Baixo, página isolada |

Como é página nova, o rollback é trivial: despublicar. Isso permite testar de verdade,
sem colocar a loja em risco.

### O público

**Groomer profissional e dono de pet shop.** Confirmado pelo `DESIGN-SYSTEM.md` e pelos
dados da loja: top 10 de vendas são galões de 5L concentrados, ticket médio de
**R$ 228 a R$ 1.463**.

Ele não está escolhendo um shampoo. Está avaliando **trocar de fornecedor**. E a pesquisa
B2B mostra que ele completa **70% a 90% da decisão sozinho**, antes de falar com alguém.
A página precisa entregar tudo que ele usaria para decidir.

> ⚠️ **Vocabulário obrigatório:** rendimento, diluição, custo por banho, protocolo, margem.
> **Nunca "seu pet"** — esse é o tom do tutor, não do profissional que compra para o salão.

---

## 2. Objetivo e métricas

**Primário:** primeira compra de um groomer que nunca comprou Bubbles.
**Secundário:** entrada no Círculo Bubbles (contato + comunidade) para quem não compra hoje.

O ticket é alto e o ciclo B2B é longo. Quem não compra na primeira visita ainda vale muito,
desde que a gente fique com o contato.

| Métrica | Meta inicial | Referência de mercado |
|---|---|---|
| Conversão em pedido | 2% | 1–3% típico · 3–5% bom · 5%+ excelente |
| Entrada no Círculo | 5% | 3–8% em captura bem feita |
| Interação com a calculadora | 35% das sessões | 4min27s é o tempo médio em calculadoras B2B |
| Scroll até prova social | 60% | — |

---

## 3. Decisões tomadas e os dados que decidiram

Esta seção existe para você poder discordar com base no mesmo material que eu usei.

### D1 · A calculadora é interativa, não uma tabela estática

**A comparação:**

| Opção | Prós | Contras |
|---|---|---|
| Tabela estática de rendimento | Simples, rápida de construir, zero JS | Passiva. O visitante lê e esquece |
| **Calculadora interativa** ✅ | O visitante monta o próprio caso | Mais trabalho, exige JS na section |

**Os dados decidiram:**
- Conteúdo interativo gera **2x mais conversões** que conteúdo estático
- Um caso B2B registrou **+134% de conversão** ao adicionar calculadora de ROI
- **72% dos decisores B2B** classificam ferramentas interativas como "muito úteis"
- Tempo médio numa calculadora: **4min27s**, mais de 3x o de conteúdo estático
- **O dado decisivo:** quem monta o próprio caso com a calculadora do fornecedor tem
  **2,1x mais chance de comprar** do que quem recebe um case pronto

Seu pedido de incluir o campo "quanto você cobra pelo banho" é exatamente o que ativa
esse 2,1x. O groomer não lê o nosso argumento; ele constrói o dele.

### D2 · A calculadora usa o protocolo completo, não só o shampoo

**Você respondeu "não sei te dizer" na pergunta 9. Decidi com base na documentação.**

O `produtos.md` documenta o protocolo dos kits Xperience:
> 1º banho Neutralizador PRO, 2º banho shampoo do kit, 3º máscara, pós-banho leave-in,
> finalização perfume.

**A comparação:**

| Opção | Custo por banho | Risco |
|---|---|---|
| Só shampoo | Fica artificialmente baixo | **O groomer percebe na hora.** Ele sabe o que gasta |
| **Protocolo completo, com detalhamento** ✅ | Número honesto | Nenhum. O detalhamento *é* o valor |

Para este público, um número otimista demais **destrói mais confiança do que constrói**.
E mostrar a conta passo a passo é justamente o que prova que a marca conhece a rotina dele.

**Solução:** a calculadora tem dois modos, e abre no completo.

| Modo | O que entra |
|---|---|
| Banho simples | Shampoo Neutralizador + shampoo específico + condicionador |
| **Banho completo** (padrão) | O anterior + máscara + leave-in + perfume |

> ⏳ Continua valendo a validação de vocês: **este é o protocolo que a Bubbles recomenda?**
> Se o time técnico ajustar, eu troco a composição. A estrutura não muda.

### D3 · A moeda de troca do e-mail é a comunidade, não o desconto

Você escolheu comunidade e novidades em primeira mão. Os dados apoiam, com uma ressalva
honesta:

| Isca | Volume de leads | Qualidade | Efeito de longo prazo |
|---|---|---|---|
| Desconto | **Maior** (iscas com valor monetário convertem mais) | Menor, atrai caçador de oferta | Nenhum |
| **Comunidade / antecipação** ✅ | Menor | **Maior** | Cria **custo de troca**: quem está ativo na comunidade sai menos |

Como o cupom já está aberto no hero, ele não serve mais como troca. A comunidade é a
escolha certa, e casa com o valor "Comunidade" da marca e com a persona 6
(Explorador de Novidades: *lançamentos em primeira mão, pré-vendas*).

**Nome proposto: Círculo Bubbles.**

**Campos do formulário: nome, e-mail e WhatsApp.** A pesquisa é clara: em B2B de ticket
alto, **mais campos filtram qualidade**. Quem entrega o WhatsApp é lead sério, e o
WhatsApp já é canal de atendimento da marca.

### D4 · A calculadora vem logo depois do hero

**A comparação:**

| Posição | Argumento |
|---|---|
| Depois da prova social | O visitante chega "aquecido" |
| **Bloco 2, logo após o hero** ✅ | Páginas que engajam **imediatamente** convertem 17–35% contra 3% de baseline |

Decidido: bloco 2. Com apenas dois campos, a barreira de entrada é baixa o suficiente para
funcionar cedo.

### D5 · Quantas linhas ganham card

Dados de receita dos últimos 90 dias (do `DESIGN-SYSTEM.md`):

| Linha | Receita | Decisão |
|---|---|---|
| Essential | **57%** | Card grande, primeiro |
| PRO | **32%** | Card grande, segundo |
| Xperience | 5% | Card menor |
| Collora | sem venda no top 10 | Card menor (é a jogada de ticket médio) |
| Aurabian e Sensorial | sem dado | **Fora** (sua decisão na pergunta 7) |

Essential e PRO somam **89% da receita**. A hierarquia visual segue o dinheiro.

### D6 · Um diferencial competitivo que podemos usar

A principal referência do mercado vende **exclusivamente por distribuidores autorizados,
não direto ao profissional**. A Bubbles vende direto pela própria loja.

Isso vira um benefício factual, dito **sem citar ninguém** (o tom de voz proíbe comparação
pejorativa): **"Compra direta de quem fabrica. Sem intermediário, sem pedido mínimo de
distribuidor."**

---

## 4. Estrutura da página

> ⛔ Não existe bloco de barra de anúncio. Header, footer, menu e barra de anúncio são
> globais e **intocáveis** (regra R9 do projeto Shopify). A página começa no hero.

### Bloco 1 · Hero com o cupom em destaque
**Personas:** todas · **Estrutura:** Percepção de Valor → Diferencial → Compra Justificada

```
[PLACEHOLDER: foto de groomer trabalhando, 1600x900, formato paisagem]
Preferir profissional em ação no salão, não frasco isolado.
```

**Título (h1):**
> Cosméticos pet de alta performance para quem vive de banho e tosa

**Subtítulo:**
> Diluição 1:10 nos shampoos PRO. Um galão de 5L rende até 500 banhos.

**Bloco do cupom** (fundo `#0D0C0D`, texto `#F4CDD4`, alto contraste):
> **Primeira compra? Use PRIMEIRA10 e ganhe 10%.**
> Código copiável em um clique, com retorno visual de "copiado".
> Abaixo, em `text-xs`: `Válido para todo o site, no seu primeiro pedido.`

**CTA primário** (verde `#3DB85C`, mínimo 44px):
> Ver os produtos

**Faixa de credibilidade** (`text-xs`, cor `#666666`):
> Registro MAPA SP 006580-3 · Vegano · Cruelty Free · Mais de 56 mil groomers acompanham a marca

**Hierarquia:** o título vem primeiro e maior. O cupom é bloco de contraste, não título
concorrente. Convivem na mesma dobra sem disputar.

**Não fazer:** carrossel automático (prejudica o LCP), vídeo pesado no topo, segundo CTA
competindo com o botão de compra.

---

### Bloco 2 · Quanto sobra para você em cada banho
**Persona:** Comparador de Preço · **Estrutura:** Foco na Tecnologia → Resultado Tangível

O bloco mais importante da página. Detalhamento completo na seção 5.

**Título:**
> Faça a conta do seu salão

**Subtítulo:**
> Dois campos. A gente mostra quanto o produto custa por banho e quanto sobra para você.

```
[PLACEHOLDER: nenhum. Este bloco é a própria interface]
```

---

### Bloco 3 · A gente conhece a sua rotina
**Personas:** Inseguro e Cético · **Estrutura:** Problema → Solução → Benefício Ampliado

Três colunas, cada uma com uma dor real do público (de `marca.md`) e a resposta:

| Dor | Resposta | Produto |
|---|---|---|
| Secagem lenta trava a agenda | Secagem até 60% mais rápida | Leave-in Creme Finalizador Pro |
| O cheiro não dura até o tutor buscar | Eau de Parfum com fixação de até 7 dias | Perfumes PRO |
| Odor de pelo molhado que não sai | Tecnologia Sniff Tech | Shampoo Neutralizador Pro |

```
[PLACEHOLDER: 3 ícones ou 3 fotos quadradas 600x600, uma por dor]
```

---

### Bloco 4 · Qual linha é a sua
**Personas:** Inseguro e Explorador · **Estrutura:** Educação → Empoderamento → Oferta

Quatro cards, hierarquia por receita (ver D5):

| Linha | Chamada | Para quem | Cor |
|---|---|---|---|
| **ESSENTIAL** | Melhor custo-benefício | Está começando ou quer render mais gastando menos. Diluição 1:5 | `#F4CDD4` |
| **PRO** | Rendimento máximo | Trabalha com volume. Diluição 1:10, Sniff Tech, eau de parfum | `#0D0C0D` |
| **XPERIENCE** | Banho premium | Quer vender experiência sensorial e cobrar mais por isso | `#C8A96E` |
| **COLLORA** | Serviço novo | Coloração estética para adicionar um serviço ao salão | `#B066C6` |

```
[PLACEHOLDER: 4 imagens de linha, 800x800, com a paleta de cada uma]
```

---

### Bloco 5 · Quem já usa
**Personas:** Inseguro e Cético · **Estrutura:** Testemunho → Validação → CTA

Você confirmou que **temos depoimentos nos produtos**. Usar os reais da loja.

- Depoimento com **nome do profissional e do salão**, nunca "Maria S."
- Antes e depois de pelagem, com o produto e o protocolo usados
- Nota real de avaliação, se houver
- Menção à comunidade: mais de 56 mil groomers

```
[PLACEHOLDER: 3 a 6 fotos antes/depois, 800x800]
[PLACEHOLDER: vídeo depoimento, 1080x1920 vertical, com capa estática]
```

> ⚠️ Só material real e autorizado. Nada de banco de imagens fingindo ser cliente.

---

### Bloco 6 · Círculo Bubbles
**Persona:** Explorador · **Estrutura:** Educação → Empoderamento → Oferta

**Título:**
> Entre no Círculo Bubbles

**O que a pessoa ganha** (ser concreto, não vago):
> Lançamentos em primeira mão, antes de irem para a loja
> Grupo exclusivo de groomers
> Conteúdo técnico de protocolo e diluição

**Campos:** nome, e-mail, WhatsApp (3 campos, filtram qualidade em B2B de ticket alto)
**Botão:** verde `#3DB85C`, `Quero entrar`

```
[PLACEHOLDER: foto de comunidade/evento de groomers, 1200x800]
```

---

### Bloco 7 · Perguntas que todo groomer faz
**Persona:** Inseguro · **Estrutura:** Educação → Empoderamento

Acordeão com as dores de compra reais (de `marca.md`):

- Qual a diluição correta de cada linha?
- Quanto tempo leva a entrega para a minha região?
- Como funciona a troca se não atender?
- Posso parcelar?
- Serve para gatos? *(sim, cães e gatos)*
- Preciso de CNPJ para comprar?

> ⚠️ **Não afirmar piso de frete grátis.** O valor de R$ 199 aparece em material antigo mas
> **nunca foi confirmado**. Enquanto não confirmarem, a página diz "frete grátis por região,
> confira no checkout".

---

### Bloco 8 · Rodapé de confiança
**Persona:** Inseguro

CNPJ do fabricante e da distribuidora · Responsável Técnico e CRMV · Registro MAPA ·
Selos Vegano, Cruelty Free, Eu Reciclo · Formas de pagamento · WhatsApp de atendimento

> Este é conteúdo **dentro da nossa section**, não o footer do tema. O footer é R9.

---

## 5. A calculadora, em detalhe

### A fórmula

```
custo_por_banho = Σ ( preço_do_produto ÷ banhos_que_a_embalagem_rende )

margem_por_banho = valor_cobrado − custo_por_banho

margem_mensal    = margem_por_banho × banhos_por_dia × 26 dias
```

> Os 26 dias (6 dias por semana) ficam **escritos na tela**. Nada de premissa escondida.

### Entradas

| Campo | Tipo | Padrão |
|---|---|---|
| Quantos banhos por dia | número | 8 |
| **Quanto você cobra pelo banho** | moeda | vazio |

### Saídas

| Saída | Observação |
|---|---|
| Custo de produto por banho | com detalhamento por etapa do protocolo |
| **Margem por banho** | só aparece se o valor cobrado for preenchido |
| Margem mensal estimada | idem |
| Quanto dura um galão de 5L | em dias de operação do salão |
| Comparação PRO (1:10) × Essential (1:5) | qual compensa no volume dele |

### Rendimentos documentados (de `produtos.md`)

| Produto | Diluição | Rende |
|---|---|---|
| Shampoo Neutralizador Pro 5L | 1:10 | 500 banhos |
| Shampoo Neutro Pro 5L | 1:10 | 500 banhos |
| Condicionador Hidratante Pro 5L | 1:10 | 900 banhos |
| Máscara Pro 500ml | pronto uso | ~50 aplicações |
| Leave-in Creme Finalizador Pro 500ml | pronto uso | ~150 aplicações |
| Shampoo Neutralizador Essential 5L | 1:5 | 300 banhos |
| Condicionador Hidratante Essential 5L | 1:5 | 500 banhos |

### Regras não negociáveis

1. **Preço sempre do objeto Shopify** (`{{ product.price }}`), nunca escrito à mão (R3)
2. Se "quanto você cobra" vier vazio, mostrar **só o custo**. Não inventar margem
3. Arredondamento honesto, nunca a favor da marca
4. Todo rendimento exibido tem que existir em `produtos.md`. Sem número estimado
5. Se um produto estiver indisponível na loja, ele sai da conta e a página avisa

---

## 6. Regras de execução

### Design System (de `DESIGN-SYSTEM.md`)
- Fonte **Poppins**, pesos **400 / 500 / 600**. **700+ é proibido**
- Verde `#3DB85C` **só em botão de compra**. Nunca decoração
- `#888888` só em texto **≥18px**. Texto de leitura usa `#666666`
- CTA com **mínimo 44px** de altura
- Container `max-w-[1100px]`, texto `max-w-[760px]`, seções `py-16 md:py-24`
- Raio padrão `12px`, card destacado `20px`, bloco hero `40px`
- Respeitar `prefers-reduced-motion` em toda animação
- Tema **claro** (não o Midnight das MasterClass)

### Copy (de `tom-de-voz.md`)
- **Sem travessão em texto visível da página**
- **Proibido:** cura, anti-inflamatório, remédio, medicamentoso, medicinal, "não causa
  reação", referência a uso humano (exceto Luva de Silicone Pro), comparação pejorativa
- **Preferir:** alta performance, resultado profissional, alta diluição, rendimento,
  custo por banho, Sniff Tech, eau de parfum, hipoalergênico, vegano, cruelty free
- Produtos são **cosméticos pet, cães e gatos**, sem finalidade terapêutica
- **Não promover descontinuados:** Deo Colônia Black/Diamond/King Pro, Máscara Desmaia
  Pelo Pro, Fluído Texturizador Pro, Kit Dropper Collora

### Shopify (projeto `shopify-estrutura`)

| Regra | Aqui significa |
|---|---|
| **R9** | Não tocar em header, footer, menu, barra de anúncio |
| **R5** | Cada bloco vira section nova com prefixo `bb-`. Nunca editar section existente |
| **R3** | Preço, nome e imagem sempre do objeto Shopify |
| **R1** | Upload manual pelo Gabriel. Claude não publica |

**Armadilhas do tema Ascent que já custaram caro:**

- ⛔ **Nunca `{% javascript %}`** — vira código morto neste tema, sem erro no console.
  Usar `<script>` no fim da section. Gate: **check 3.11**
- ⛔ **Todo `/cart/add.js` precisa de `sections_url`** — sem ele a gaveta abre dizendo
  "carrinho vazio" com os itens dentro. **Perde venda.** Gate: **check 3.12**
- ⛔ Section não abre `<main>` nem `<body>`
- ⛔ Rota sempre por `{{ routes.* }}`, nunca digitada
- ⛔ Sem CDN externo. `image_url` + `image_tag`, sempre com width/height

**Rastreamento:** os componentes React deste projeto (`PageViewTracker`, `UTMCapture`)
**não funcionam** no Liquid. No tema, vai pelo GTM já instalado na loja.

---

## 7. Mídia: o que preciso de vocês

Você disse que temos fotos e vídeos. Placeholders marcados no plano, nesta ordem de
prioridade:

| # | Onde | Formato | O que mostrar |
|---|---|---|---|
| 1 | Hero | 1600x900 | Groomer trabalhando no salão. **Não frasco isolado** |
| 2 | Prova social | 800x800, 3 a 6 | Antes e depois de pelagem |
| 3 | Linhas | 800x800, 4 | Uma por linha, com a cor de cada uma |
| 4 | Dores | 600x600, 3 | Uma por dor, ou ícone |
| 5 | Círculo Bubbles | 1200x800 | Comunidade ou evento de groomers |
| 6 | Depoimento em vídeo | 1080x1920 | Vertical, com capa estática. Opcional |

Toda imagem entra com `width` e `height` declarados (evita layout shift, que é 8 dos 25
erros herdados do tema).

---

## 8. Plano de testes (fase 2, depois do lançamento)

Testar um de cada vez, com volume suficiente para significância:

| # | Teste | Hipótese |
|---|---|---|
| 1 | Cupom no hero **vs** cupom só no meio | Mede o custo real de abrir com desconto numa marca premium |
| 2 | Calculadora no bloco 2 **vs** depois da prova social | Valida a decisão D4 com dado nosso, não de benchmark |
| 3 | 2 campos **vs** 3 campos no Círculo | Volume contra qualidade de lead |
| 4 | Modo "banho completo" **vs** "banho simples" como padrão | Qual número converte mais sem perder credibilidade |
| 5 | Foto de groomer **vs** foto de produto no hero | — |

O teste 1 é o mais valioso: responde com dado da Bubbles a única decisão desta página que
tomamos por instinto comercial e não por evidência.

---

## 9. Riscos registrados

| Risco | Mitigação |
|---|---|
| Número otimista na calculadora derruba a confiança | Protocolo completo como padrão, com detalhamento visível |
| Cupom no hero deprecia o posicionamento premium | Título continua profissional; teste 1 mede o custo real |
| Depoimento sem autorização | Só material real e autorizado |
| Piso de frete grátis não confirmado | Não afirmar valor. "Confira no checkout" |
| `{% javascript %}` voltar na calculadora | Gate barra automaticamente (check 3.11) |
| Página vira concorrente da home | É página de campanha, não entra no menu |

---

## 10. Ordem de construção

1. Hero + cupom (a dobra decide tudo)
2. Calculadora (o argumento central, e o mais trabalhoso)
3. Linhas
4. Dores
5. Prova social
6. Círculo Bubbles
7. FAQ + rodapé de confiança

Cada etapa passa pelo gate antes da próxima.

---

## 11. O que ainda depende de vocês

1. **O protocolo de banho da D2 está correto?** Montei a partir do `produtos.md`. Se o time
   técnico ajustar a composição, eu troco. A estrutura da calculadora não muda.
2. **Destino do CTA "Ver os produtos"** — você disse para resolver depois com o CLI
   conectado. Fica como `{{ routes.all_products_collection_url }}` até lá.
3. **Confirmação do piso de frete grátis**, se existir.

---

## 12. Fontes

- [Interactive Calculator Tools in B2B Marketing · Brixon Group](https://brixongroup.com/en/interactive-calculator-tools-in-b2b-marketing-boosting-roi-through-targeted-user-interaction/)
- [ROI Calculator Examples: 15 B2B SaaS Tools · Outgrow](https://outgrow.co/blog/roi-calculator-examples-b2b-saas)
- [13 B2B ROI Calculator Examples · Dock](https://www.dock.us/revenue-archives/roi-calculators)
- [Landing Page Conversion Rates: 40 Statistics · Genesys Growth](https://genesysgrowth.com/blog/landing-page-conversion-stats-for-marketing-leaders)
- [How to Design an Effective B2B E-Commerce Experience · Shoppingfeed](https://blog.shoppingfeed.com/en/how-to-design-an-effective-b2b-e-commerce-experience-that-drives-conversions)
- [B2B Ecommerce Websites in 2026 · BigCommerce](https://www.bigcommerce.com/articles/b2b-ecommerce/b2b-ecommerce-website/)
- [Lead Magnet Ideas · Claspo](https://claspo.io/blog/lead-magnet-ideas-examples-full-guide/)
- [15 Best B2B Lead Magnets · Vida](https://vida.io/blog/best-b2b-lead-magnets)
- [Ecommerce Homepage Optimization · EcomHint](https://ecomhint.com/guides/homepage-optimization)
- [Hydra Pet Society · site oficial](https://hydrapetsociety.com.br/a-hydra)
