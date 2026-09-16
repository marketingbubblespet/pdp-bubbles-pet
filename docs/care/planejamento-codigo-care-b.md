# Planejamento de código — `/care-b`

> Só planejamento. Nenhum arquivo listado aqui foi criado ainda. Baseado nas 5 decisões
> já aprovadas em `plano-lp-care-b.md`: estimativa rotulada, depoimentos de distribuidor
> mantidos, formulário de 3 etapas mantido, sem heatmap, rota `/care-b` confirmada.

---

## 1. Estrutura de arquivos

Isolamento total da `/care` (regra 14 da `CONVENCOES.md`) — nada em `care/` é editado.

```
src/app/care-b/
  page.tsx                    ← novo, robots noindex
  opengraph-image.tsx         ← copiado de care/opengraph-image.tsx, textos ajustados

src/lib/
  care.ts                     ← REUTILIZADO (não editado): CARE_PRODUCTS, CARE_TESTIMONIALS,
                                 CARE_BRAND_STATS, CARE_FAQ continuam servindo a B
  care-b.ts                   ← novo, só o que muda: textos do hero, da "máquina de
                                 demanda" reformulada, a nova seção "não atrapalha o banho",
                                 e o valor de margem estimada (rotulado)

src/components/lp/care-b/
  CareBHero.tsx                ← novo (herói + formulário completo, ver seção 3)
  CareBCalculator.tsx          ← adaptado de CareCalculator.tsx
  CareBServiceProof.tsx        ← novo — a seção que mata a objeção do groomer
  CareBDemandMachine.tsx       ← adaptado de CareDemandMachine.tsx (copy reformulada)
  CareBProducts.tsx            ← adaptado de CareProducts.tsx (condensado, sem ficha técnica)
  CareBWhyResell.tsx           ← adaptado de CareWhyResell.tsx (6 cards → 4)
  CareBHowItWorks.tsx          ← REUTILIZADO como está (importado direto de care/)
  CareBGroomerProof.tsx        ← REUTILIZADO como está (depoimentos de distribuidor)
  CareBFaq.tsx                 ← adaptado de CareFaq.tsx (11 → 6 perguntas)
  CareBFinalCta.tsx            ← adaptado de CareFinalCta.tsx (copy nova)
  CareBFooter.tsx               ← REUTILIZADO como está
  CareBStickyBar.tsx           ← REUTILIZADO como está
  CareBExitPopup.tsx           ← REUTILIZADO como está
  CareBForm.tsx                ← CÓPIA de CareForm.tsx + campo `variante: 'b'` no payload
```

**Critério de reuso vs. adaptação vs. novo:** blocos cuja copy já é neutra em relação ao
diagnóstico (como funciona, footer, sticky bar) são **importados direto** do `care/`
existente — sem duplicar código à toa. Blocos que o diagnóstico pede pra encurtar ou
reescrever viram **cópia adaptada**. Só o que não existe hoje (a seção de objeção do
groomer, o hero com form) é **novo de verdade**.

---

## 2. Reaproveitamento visual (design, cores, fotos)

Nenhum token novo. Tudo puxado do `DESIGN-SYSTEM.md`, igual à `/care` atual:

| Elemento | Origem | Uso na B |
|---|---|---|
| Paleta | `#F7F7F7` fundo, `#E8649A` accent, `#3DB85C` CTA, `#0D0C0D` texto | idêntica |
| Fonte | Poppins 400/500/600 | idêntica |
| `care-hero-produtos.jpg` | já existe em `public/images/` | reaproveitada no hero da B |
| `mechanism-pelagem.jpg` | já existe | reaproveitada na seção "não atrapalha o banho" (novo uso: ilustra o pet bem cuidado voltando pro banho) |
| `masterclass/bastidores-2.webp` | já existe | reaproveitada no CTA final (mesmo tratamento com overlay escuro) |
| 11 fotos de produto (`care_*.webp`) | já existem | reaproveitadas no bloco de portfólio condensado (grid menor, sem ficha técnica individual) |
| `bubbles-logo.svg` | já existe | footer, idêntico |
| Scrollbar customizada (`#E8649A`/`#F4CDD4`) | inline style no `page.tsx` atual | copiada igual |

**Nenhuma imagem nova precisa ser produzida** para a B ir ao ar. Se você quiser uma foto
real de groomer com pet pra seção de objeção (bloco novo, ver 3.3), me avisa — por ora vou
reaproveitar `mechanism-pelagem.jpg`.

---

## 3. Detalhamento por bloco

### 3.1 `CareBHero.tsx` (novo)

Layout: grid 2 colunas (mesma estrutura do `CareHero.tsx` atual — imagem à direita,
texto+CTA à esquerda), mas a coluna direita **no mobile empilha abaixo do formulário**,
não da imagem. Diferença central: em vez de um único CTA que rola a página, a coluna
direita **é o formulário** (reaproveita `CareBForm.tsx` renderizado direto ali, sem
precisar rolar).

```
[ Eyebrow: "Pré-venda de lançamento" ]
[ H1: mesma promessa central de hoje, editada pra caber sem o card de produto atrás ]
[ Pills de prova rápida — reaproveita CARE_QUICK_PROOFS de lib/care.ts ]
[ FORMULÁRIO (3 etapas) — CareBForm renderizado aqui, não em âncora ]
```

No mobile, ordem: título → pills → formulário. Sem imagem de produto no hero da B (ela
migra pro bloco de portfólio, seção 3.5) — abre espaço vertical pro formulário caber
sem rolagem em telas de ~700px de altura.

### 3.2 `CareBCalculator.tsx` (adaptado)

Mesma UI do `CareCalculator.tsx` (slider, dois números grandes, disclaimer). Muda:
- Sobe para 2ª posição na página (depois do hero)
- `LUCRO_MEDIO_POR_UNIDADE` continua estimado, mas o disclaimer fica mais explícito:
  atual diz "Valores de margem em confirmação final" → B diz **"Projeção estimada com
  base no ticket médio da categoria. Sua margem real é confirmada com o consultor no
  cadastro."** (decisão 1: usar estimativa, mas rotulada sem ambiguidade)

### 3.3 `CareBServiceProof.tsx` (novo — o bloco mais importante do plano)

Não existe hoje como seção própria (está espremido num card + 1 pergunta de FAQ). Layout:
2 colunas, imagem (`mechanism-pelagem.jpg`) + texto.

```
Eyebrow: "A dúvida que todo groomer tem"
H2: "Vender Care não tira o seu banho de ninguém"
Corpo: pet que usa Care em casa volta com menos nó → banho rende mais na bancada →
       tutor volta mais rápido pro seu salão (o argumento invertido do diagnóstico,
       seção 4 do plano aprovado)
3 bullets curtos reaproveitando a lógica de CARE_CONNECTION (lib/care.ts), reescritos
pra reforçar "manutenção em casa fortalece o profissional", não "não atrapalha"
```

### 3.4 `CareBDemandMachine.tsx` (adaptado)

Mesma estrutura de `CareDemandMachine.tsx` (números animados com `CountUp`, reaproveitado
sem alteração). Muda só a copy ao redor dos números — igual combinamos: os números da
`CARE_DEMAND` (2.665 afiliados, +3.500 vídeos) continuam, mas o texto para de mencionar
"TikTok Shop" como canal de compra e passa a falar de desejo/reconhecimento de marca.

### 3.5 `CareBProducts.tsx` (adaptado)

`CareProducts.tsx` hoje tem abas por categoria + card com ficha técnica por produto
(nome, descrição, categoria). Na B: **sem abas, sem ficha técnica individual** — grid
único com as 11 fotos (`care_*.webp`) e uma frase de fechamento:

```
"Portfólio completo com 11 produtos de alto giro: do banho à perfumaria."
```

As imagens continuam as mesmas 11 já existentes; só a moldura de copy ao redor some.

### 3.6 `CareBWhyResell.tsx` (adaptado)

`CARE_WHY_RESELL` em `lib/care.ts` tem 6 itens. Na B, 4 (mantém margem, giro/recompra,
marketing de apoio, portfólio completo; corta design/apresentação e qualidade
profissional, que são argumento de produto, não de negócio).

### 3.7 `CareBHowItWorks.tsx`, `CareBGroomerProof.tsx`, `CareBFooter.tsx`, `CareBStickyBar.tsx`, `CareBExitPopup.tsx`

Reuso direto, sem cópia de arquivo — importados de `@/components/lp/care/*` dentro da
pasta `care-b`. `CareBGroomerProof` mantém os 3 depoimentos de distribuidor (decisão 2).

### 3.8 `CareBFaq.tsx` (adaptado)

`CARE_FAQ` tem 11 perguntas. Na B, 6 — mantendo as que respondem objeção de negócio
(margem, mínimo de compra, reposição) e a pergunta que hoje trata a objeção do groomer
(fica redundante com a seção 3.3 nova, mas repetir no FAQ não atrapalha, reforça).
Cortadas as muito técnicas de produto.

### 3.9 `CareBFinalCta.tsx` (adaptado)

Mesmo tratamento visual de `CareFinalCta.tsx` (foto + overlay escuro + CTA verde). Copy
final reforça a promessa financeira, não a demanda: menos "a demanda já está aí", mais
"faça a conta antes de decidir" (linkando de volta pro simulador, que já rodou lá em cima).

### 3.10 `CareBForm.tsx` (cópia, não reuso)

Cópia de `CareForm.tsx`, mantendo **exatamente** a mesma lógica de 3 etapas, mesma
categorização (Varejo/Distribuidor/Outro), mesmo Netlify/Sellum (decisão 3: manter
estrutura mesmo com atrito). Única mudança real: acrescenta `variante: 'b'` no payload
do Netlify e do Sellum, e no `pushLeadFromForm`/`extra` do dataLayer — permite comparar
A vs. B no CRM e no GA4 sem criar nome de evento novo (seção 6 do plano aprovado).

Aqui mora a decisão de posição: como o formulário passa a viver **dentro do hero**
(seção 3.1), o `CareBForm` perde a "âncora de rolagem" que tinha em `/care` (ele não
precisa mais lidar com `scroll-mt-4` nem ser alvo de CTAs em outras seções) — mas os
outros CTAs da página (calculadora, CTA final) continuam levando pra lá via `#cadastro`,
caso a pessoa role antes de decidir.

---

## 4. `page.tsx` da `/care-b`

```tsx
export const metadata: Metadata = {
  title: 'Bubbles Care: revenda para petshops e distribuidores', // ajustar
  robots: { index: false, follow: true },  // convenção de variante de teste
}

export default function CareBPage() {
  return (
    <>
      <GtmScript id="GTM-N4PHK6DM" />
      {/* mesma scrollbar customizada do care/page.tsx */}
      <main>
        <CareBHero />          {/* inclui formulário */}
        <CareBCalculator />
        <CareBServiceProof />  {/* novo */}
        <CareBDemandMachine />
        <CareBProducts />
        <CareBWhyResell />
        <CareBHowItWorks />
        <CareBGroomerProof />
        <CareBFaq />
        <CareBFinalCta />
      </main>
      <CareBFooter />
      <CareBStickyBar />
      <CareBExitPopup />
    </>
  )
}
```

10 blocos contra 17 da A (bate com a seção 5 do plano aprovado).

---

## 5. Rastreamento

Nada de evento novo (evita depender de gatilho novo no GTM, regra 43/44 da
`CONVENCOES.md`). Reaproveita o módulo central `src/lib/tracking.ts` como está:

- `pushFormOpen('care-lead')`, `pushFormStep`, `pushLeadFromForm` — idênticos à A
- Único acréscimo: `extra: { variante: 'b' }` no `pushLeadFromForm`, e `variante: 'b'`
  nos payloads do Netlify (`netlifyPayload`) e do Sellum (`sellumPayload`)
- **Precisa declarar o campo `variante`** em `public/__forms.html`, no formulário
  `care-parceria` — senão o Netlify descarta o valor em silêncio

---

## 6. Mapa de páginas e SEO

- Home (`src/app/page.tsx`): adiciona item com label de variante de teste (regra 22)
- `robots: { index: false }` no `metadata` da B, igual ao padrão do `spitz-alemao-b`
- `opengraph-image.tsx`: copiado do da `/care`, só texto ajustado — mesma arte, mesmo
  reuso de imagem

---

## 7. O que fica pra depois (fora deste planejamento)

- Depoimento real de groomer/petshop (decisão 2, quando você conseguir)
- Margem real por faixa de compra, pra tirar o rótulo de "estimativa"
- Hotjar/Clarity (decisão 4, você vai providenciar)
- `ScrollDepthTracker` — não pedido explicitamente aqui, mas já existe pronto em
  `src/components/ui/`; posso montar na B se você quiser medir abandono sem lib nova

---

## 8. Confirmação antes de eu escrever o código

Esse planejamento cobre estrutura de arquivo, reuso de design/fotos e o que cada bloco
faz. Antes de eu começar a implementação de verdade, só confirme:

1. Este mapa de blocos/arquivos está de acordo?
2. Tudo bem eu escrever os textos novos (hero, seção de objeção, demanda reformulada,
   FAQ enxuto) seguindo `docs/brand/tom-de-voz.md`, ou você quer revisar a copy antes
   de eu colocar no código?

---

## 9. Copy final (texto pronto pra cada bloco)

Revisado contra o checklist de `docs/brand/tom-de-voz.md`: sem termos proibidos, sem
travessão, vocabulário preferido (alta performance, resultado profissional, alta
diluição etc.) onde cabe. **O formulário (`CareBForm.tsx`) não foi tocado** — nenhuma
etapa, campo ou pergunta muda, conforme pedido.

### 9.1 Hero (`CareBHero.tsx`)

```
Eyebrow: Pré-venda de lançamento

H1: Transforme cada banho em uma nova fonte de faturamento, sem ocupar
    a bancada nem a sua agenda.

Corpo: A Linha Care leva o cuidado profissional pra casa do tutor, com
       margem estruturada pro seu negócio e produtos que já têm demanda
       formada. Preencha o cadastro e receba a condição de pré-venda.

Pills de prova rápida (reaproveitando CARE_QUICK_PROOFS):
- Linha completa para revenda
- Margem estruturada por faixa de compra
- Suporte e material de divulgação inclusos
- Demanda já formada com o consumidor final
```

### 9.2 Calculadora — disclaimer (`CareBCalculator.tsx`)

```
Eyebrow: Faça a conta
H2: Quanto a Care pode render pro seu negócio?
Corpo: Simule quantas unidades por mês você pretende comprar e veja a
       margem projetada.

Disclaimer (substitui o atual): Projeção estimada com base no ticket
médio da categoria. Sua margem real é confirmada com o consultor no
cadastro.
```

### 9.3 Seção de objeção do groomer — bloco novo (`CareBServiceProof.tsx`)

```
Eyebrow: A dúvida que todo groomer tem
H2: Vender Care não tira o seu banho de ninguém

Corpo: O tutor que cuida do pet em casa entre uma visita e outra chega
com menos nó e menos sujeira acumulada. O banho rende mais na sua
bancada, e o resultado dura mais até a próxima vez, o que aproxima o
retorno do tutor em vez de afastar.

Bullets:
- Menos nó na hora de escovar reduz o tempo por atendimento
- Pet com pelagem mantida em casa valoriza ainda mais o seu trabalho
  no dia do banho
- Você continua sendo a referência de cuidado: o produto leva sua
  recomendação, não a substitui
```

### 9.4 Máquina de demanda reformulada (`CareBDemandMachine.tsx`)

```
Eyebrow: A demanda já existe
H2: Enquanto você lê isso, a Bubbles já está gerando desejo pela marca

Corpo: São milhares de vídeos de criadores de conteúdo colocando a
Bubbles na frente do tutor todos os dias. Quando ele vir a Linha Care
na sua prateleira, essa não vai ser a primeira vez que ouve falar da
marca, e isso facilita a primeira venda.

(números CARE_DEMAND mantidos: afiliados e vídeos, sem menção a canal
de venda)

Fechamento: Reconhecimento de marca não é promessa, é o que já está
acontecendo. Seu trabalho é ter o produto na prateleira quando o
tutor chegar procurando.
```

### 9.5 Portfólio condensado (`CareBProducts.tsx`)

```
Eyebrow: A linha completa
H2: 11 produtos de alto giro, do banho à perfumaria
Corpo: Portfólio fechado pra cobrir toda a rotina de cuidado em casa,
       sem precisar completar com outra marca.
Fechamento (abaixo do grid de fotos): Portfólio completo com 11
produtos de alto giro: do banho à perfumaria.
```

### 9.6 Por que revender — 4 cards (`CareBWhyResell.tsx`)

```
Eyebrow: Por que revender a Care
H2: Uma nova frente de faturamento com estrutura pra sustentar

Card 1 — Margem estruturada
Faixas de desconto por volume de compra, pensadas pra sobrar
resultado pra você.

Card 2 — Giro e recompra
Cuidado pet é rotina, não compra única: quando entra no hábito do
tutor, vira reposição recorrente.

Card 3 — Marketing que ajuda a vender
Material de divulgação pronto e presença ativa da marca nas redes,
pra você não precisar criar demanda sozinho.

Card 4 — Portfólio completo
11 produtos cobrindo toda a rotina de cuidado, sem lacuna que te
obrigue a comprar de outro fornecedor.
```

### 9.7 FAQ — 6 perguntas (`CareBFaq.tsx`)

```
1. Qual a margem real de ganho revendendo a Care?
   (mantém resposta atual de CARE_FAQ)

2. Quanto eu preciso comprar pra começar?
   (mantém resposta atual)

3. Se eu vender o kit pro tutor, eu perco ele do meu banho e tosa?
   (mantém resposta atual — reforça o bloco 9.3, repetição intencional)

4. Como funciona a reposição depois do primeiro pedido?
   (mantém resposta atual)

5. A Bubbles vai divulgar a linha pros meus clientes, ou fico sozinho
   nisso?
   (mantém resposta atual)

6. Tem risco de a Care concorrer com o que eu já vendo hoje?
   (mantém resposta atual)
```

Cortadas: as 5 perguntas mais técnicas de produto (diferença entre linha
profissional e Care, quais produtos vendem mais, como posicionar na
prateleira, treinamento de equipe, documentos), que cabem melhor numa
conversa com o consultor do que numa LP enxuta.

### 9.8 CTA final (`CareBFinalCta.tsx`)

```
Eyebrow: Pré-venda de lançamento
H2: Faça a conta antes de decidir. Depois, é só se cadastrar.

Corpo: Volte no simulador se quiser, ou garanta agora sua condição de
       pré-venda e comece a construir essa nova fonte de faturamento
       no seu negócio.

Botão: (mantém o botão/link existente pro formulário, sem alteração)
```
