# Planejamento de código · `/distribuidor-care`

> **Fase F0 (spec e linha de base).** Nenhum arquivo de código foi criado ainda.
> Fonte: `bubbles-gerador-de-ads/claude-gerador-anuncio/brand/campaigns/entregas/2026-10-22_super-prompt-lp-distribuidor-care.md`
> (citado aqui como "super prompt", com as seções no formato §N).
> **Autorizado pelo super prompt de 22.10.26** (vale como a confirmação das regras 3, 4, 16 e 21 da `CONVENCOES.md`).
> Esta spec **não repete a copy**: todo texto visível fica em `src/lib/distribuidor-care.ts` e nos dois arquivos de dados da LP,
> copiado literal das Partes 2 e 3 do super prompt.

---

## 0. Linha de base (antes de qualquer edição, 22.10.26)

### 0.1 Saídas reais

```text
$ git status --short
 M netlify.toml
 M next.config.ts

$ npx eslint .
C:\Users\unk_g\OneDrive\Área de Trabalho\pdp-bubbles-pet\src\components\lp\captacao\CaptacaoForm.tsx
  9:31  warning  'formatPhone' is defined but never used  @typescript-eslint/no-unused-vars
  9:44  warning  'formatDoc' is defined but never used    @typescript-eslint/no-unused-vars

✖ 2 problems (0 errors, 2 warnings)

$ npx tsc --noEmit --incremental false
(sem saída, código de saída 0)

$ git diff --stat next.config.ts netlify.toml
 netlify.toml   |  5 +++-
 next.config.ts | 75 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 79 insertions(+), 1 deletion(-)

$ git diff next.config.ts netlify.toml | sha256sum
ad7879f66e52422c40a0effb37ea0d4077857c22c49ad3b488d7ae53ff4e1258
```

Bate com o esperado da §0.5 (só os 2 arquivos do gestor modificados; 0 erros e os 2 avisos de `CaptacaoForm.tsx`; tsc limpo).
O hash do diff serve de prova na F6 de que `next.config.ts` e `netlify.toml` ficaram intocados.

### 0.2 Contexto do projeto (skill `context-analysis`, só leitura)

```text
PROJECT CONTEXT
===============
Tech Stack: Next.js 16.2.9 (App Router, proxy no lugar de middleware), React 19.2.4, TypeScript 5.9.3 (target ES2017),
            Tailwind 4 (@tailwindcss/postcss), lucide-react 1.18.0, clsx + tailwind-merge (cn())
Architecture: uma pasta por LP (src/app/<lp>/, src/components/lp/<lp>/, src/lib/<lp>.ts); zona compartilhada protegida
Testing: sem suíte de testes (package.json só tem dev, build, start, lint)
Quality Tools: ESLint 9 flat config (eslint-config-next core-web-vitals + typescript, React Compiler lint), tsc --noEmit
Key Dependencies: next/image, next/og, next/script, next/dynamic; framer-motion instalado (esta LP não usa)
Entry Points: src/app/layout.tsx (Poppins, UTMCapture, PageViewTracker, JSON-LD Organization), src/proxy.ts (só /planos)
Deploy: Netlify (@netlify/plugin-nextjs), NODE_VERSION 20 no netlify.toml e .nvmrc; Node local 25.5.0
```

### 0.3 Conferência do super prompt contra o código (regra 0.3, item 3)

Nenhum conflito que bloqueie. Fatos usados pelo documento e conferidos no repositório:

| Fato do super prompt | Conferido em | Resultado |
|---|---|---|
| `tracking.ts` com 239 linhas e 17 exports; assinaturas de `pushFormOpen`, `pushFormStep`, `pushFormAbandon`, `pushCtaClick`, `pushWhatsappClick`, `pushCalculatorUse`, `pushExitPopupShown/Click`, `pushLeadFromForm` | `src/lib/tracking.ts:34-239` | Confere |
| `loadUtms` e `appendUtms` | `src/lib/utm.ts:31-38`, `:40-51` | Confere |
| `formatPhone`, `isPhoneValid`, `isEmailValid`, `encodeFormData` | `captacaoFormUtils.ts:30`, `:38`, `:43`, `:64` | Confere |
| `__forms.html`: `atendimento-whatsapp` fecha na `:195`, `</body>` na `:196` | `public/__forms.html` (197 linhas) | Confere |
| Array `pages` da home termina na `:76`, `/nomenclatura` em `:71-75` | `src/app/page.tsx` | Confere |
| Regra 40, regra de "salvou", `RadioPill`, âncoras `scroll-mt-24` | `CareForm.tsx:138-151`, `:212-253`, `:280-296`, `:343-409`, `:414-428`, `:515`, `:560`, `:613` | Confere |
| Barra de rolagem clara e `<main className="pb-24 md:pb-20">` | `src/app/care/page.tsx:57-62`, `:64` | Confere |
| GTM e snippet do Clarity | `src/app/captacao/page.tsx:30`, `:34-36` | Confere (texto do `Script` copiado literal na F2) |
| `dynamic()` com export nomeado | `CaptacaoApp.tsx:19-21` | Confere |
| CSP: `media-src 'self' cdn.shopify.com www.bubbles.com.br`, Report-Only no Next, aplicada no `netlify.toml` | `next.config.ts:46`, `:72`; `netlify.toml:22` | Confere |
| `remotePatterns` com `cdn.shopify.com`, `qualities: [70, 75]`, cache imutável de `/images/*` | `next.config.ts:96-105`; `netlify.toml:29-32` | Confere |
| `proxy.ts` só casa `/planos`; IP por `x-forwarded-for` | `src/proxy.ts:41-43`; `src/app/planos/login/actions.ts:24` | Confere |
| 11 packshots WebP, logos, foto de expedição, poster SVG | `public/images/care/`, `bubbles-logo.svg` (viewBox 1920×455,03), `distribuidores/logos-linhas/care.svg` (viewBox 1920×1080), `distribuidores/bubbles-estoque-expedicao-*.webp`, `brand-video-poster.svg` | Todos existem. `public/images/distribuidor-care/` ainda não existe (nasce na F1) |
| Ícones citados | `node_modules/lucide-react/dist/lucide-react.d.ts` | Todos existem; `CheckCircle2` é alias de `CircleCheck`; spinner é `LoaderCircle` |
| Depoimentos MANTYPET, Assispet, SERRAPET (versão sem reticências) e TOPET ("percecebemos") | `src/lib/care.ts:140-153`, `src/lib/captacao.ts:189` | Confere, texto idêntico ao do §8.12 |
| URL do vídeo institucional 720p | `src/components/lp/care/CareBrand.tsx:13` | Confere |
| Docs do Next 16 citados na §0.1 e §7.4 | `node_modules/next/dist/docs/01-app/...` | Todos existem e dizem o que o documento usa (`route.js` fora do segmento da `page`, `ssr: false` só em client, `priority` descontinuado, `after()` em Route Handler, `ip`/`geo` removidos, `Origin` só conferido em Server Actions, `NEXT_PUBLIC_` vai ao bundle) |
| `src/app/api/` | não existe | Confere: `route.ts` desta LP é a primeira rota de API |

Pontos que não bloqueiam, registrados para o relatório final:

1. **Expressão regular com `\p{L}` e `\p{M}`** (§12.7) com `target: ES2017`: testei isolado no scratchpad com `tsc 5.9.3` e passa sem erro.
2. **Fotos dos kits com `?v=`** (CDN): `remotePatterns` sem `search` aceita qualquer query (doc `image.md:531`, `:589`). As fotos passam pelo otimizador (`/_next/image`, `'self'`), então não pedem host novo na CSP.
3. **Transparências:** a §5.1 chama o overlay do B10 de "única transparência", mas o §8.7.4 e o §8.19 pedem `backdrop:bg-black/50` nos diálogos e o §8.18 uma sombra `rgba` na F1. Sigo o que cada bloco pede literalmente e registro a diferença.
4. **`createLeadId`** (`tracking.ts:39`) pode, em tese, gerar sufixo vazio (`Math.random()` igual a 0), que a regex `[a-z0-9]{1,6}` recusaria. Probabilidade desprezível; vira critério de borda (§4.6).
5. **CSP no deploy:** o diagnóstico de 22.10.26 indicou que hoje os cabeçalhos do `netlify.toml` só chegam a `public/`. A spec segue o super prompt (§7.1) e constrói como se a CSP já bloqueasse.

---

## 1. Estrutura de arquivos

Isolamento total (regras 14 a 19). Teto de linhas entre parênteses (§6.1). Nenhum arquivo fora desta lista.

```text
CRIAR
src/app/distribuidor-care/
├── page.tsx                              Server Component: metadata, GTM, Clarity, barra de rolagem, <DistribuidorCareApp /> (60)
└── opengraph-image.tsx                   OG 1200×630 por next/og, P-07 (90)
src/app/api/distribuidor-care/lead/
└── route.ts                              POST: Origin, honeypot, validação, Sellum, CAPI com after() (450)
src/lib/
└── distribuidor-care.ts                  constantes, SEO, links, textos de B0 a B5, B7 a B16, F1 a F3, mídia (500)
src/components/lp/distribuidor-care/
├── DistribuidorCareApp.tsx               'use client': composição, dynamic(), ponte entre blocos (120)
├── distribuidorCareVitrineDados.ts       DISTRIBUIDOR_CARE_ABAS, _PRODUTOS, _KITS (300)
├── distribuidorCareFormDados.ts          DISTRIBUIDOR_CARE_FORM, _TIPOS_NEGOCIO, 27 UFs, erros, telas (300)
├── DistribuidorCareMedia.tsx             foto real ou placeholder P-01 a P-08; DISTRIBUIDOR_CARE_CLASSES (120)
├── DistribuidorCareVideo.tsx             'use client': vídeo sob demanda, sem autoplay (80)
├── DistribuidorCareTrackedLink.tsx       'use client': link de âncora com pushCtaClick (40)
├── DistribuidorCareHeader.tsx            B0 (60)
├── DistribuidorCareHero.tsx              B1 (200)
├── DistribuidorCareHeroChips.tsx         'use client': os 6 chips do B1 (60)
├── DistribuidorCareTicker.tsx            B2 (120)
├── DistribuidorCareChanges.tsx           B3 (80)
├── DistribuidorCareWhySells.tsx          B4 (120)
├── DistribuidorCareCalculator.tsx        B5 #simulador (220)
├── DistribuidorCareProducts.tsx          B6: abas e carrossel de produtos (250)
├── DistribuidorCareProductDialog.tsx     B6: painel <dialog> (200)
├── DistribuidorCareKits.tsx              B6: faixa "Monte a rotina" (150)
├── DistribuidorCareCarousel.tsx          carrossel scroll-snap genérico (150)
├── DistribuidorCareDemand.tsx            B7 (150)
├── DistribuidorCareSupport.tsx           B8 (120)
├── DistribuidorCareRegion.tsx            B9 (50)
├── DistribuidorCareBrand.tsx             B10 (160)
├── DistribuidorCareTestimonials.tsx      'use client': B11 (160)
├── DistribuidorCareHowItWorks.tsx        B12 (70)
├── DistribuidorCareForm.tsx              B13: section#cadastro, caixa-âncora, etapas e telas (200)
├── DistribuidorCareFormFields.tsx        campo, grupo de opções, erro, honeypot, privacidade (250)
├── DistribuidorCareFormSteps.tsx         etapas 1 a 4 (400)
├── DistribuidorCareFormScreens.tsx       sucesso, desvio, falha da Sellum, falha total (220)
├── useDistribuidorCareForm.ts            módulo de estado externo, sessionStorage, leadId, navegação, rolagem, foco (300)
├── distribuidorCareFormUtils.ts          funções puras: máscaras, CNPJ, validação, primeiro inválido, CorpoLead (200)
├── distribuidorCareSubmit.ts             payloads, POST /__forms.html, POST da rota, falha-sellum (250)
├── distribuidorCareAttribution.ts        UTMs, gclid, fbclid, _fbp, _fbc (80)
├── DistribuidorCareFaq.tsx               B14 (150)
├── DistribuidorCareFinalCta.tsx          B15 (90)
├── DistribuidorCareFooter.tsx            B16 (90)
├── DistribuidorCareStickyBar.tsx         F1 (110)
├── DistribuidorCareExitPopup.tsx         F2 (150)
└── DistribuidorCareShareLink.tsx         F3 (60)
public/images/distribuidor-care/logo-linha-care-v1.svg   cópia exata de logos-linhas/care.svg com viewBox 458 389 1001 302
docs/distribuidor-care/planejamento-codigo.md            esta spec

ALTERAR (só acréscimo, exceto docs/tracking.md)
public/__forms.html      + formulários distribuidor-care e falha-sellum, entre a :195 e o </body> (§11.3)
src/lib/tracking.ts      + 5 funções no fim (pushLeadDesviado, pushShareWhatsapp, pushFaqOpen, pushVitrineAba, pushVitrineProdutoOpen)
src/app/page.tsx         + 1 item no array pages, antes do ] da :76 (§6.8)
docs/tracking.md         form_name distribuidor-care-lead, 5 linhas na tabela, seção "LP /distribuidor-care" (§13.3)

NÃO TOCAR
next.config.ts, netlify.toml (alterações não commitadas do gestor), package.json, .nvmrc, layout.tsx, globals.css,
src/components/ui/*, utm.ts, funções existentes do tracking.ts, constants.ts, care.ts, captacao.ts, atendimento.ts,
sitemap.ts, robots.ts, proxy.ts, CONVENCOES.md, README.md, DESIGN-SYSTEM.md, public/llms.txt e todas as outras LPs
```

**Critério de reuso:** importar sem copiar só o que é neutro e estável (`Reveal`, `GtmScript`, `WhatsAppIcon`, helpers de
`captacaoFormUtils.ts`, funções existentes do `tracking.ts`, `loadUtms`). Tudo o que tem copy, tema ou comportamento
diferente é cópia adaptada dentro da pasta da LP. Dados nunca são importados de outra LP (regra 17): são copiados.

---

## 2. Reaproveitamento visual

Nenhum token novo. Paleta do tema claro (§5.1): `#0D0C0D`, `#666666`, `#888888` (só borda de controle e texto de 18 px ou mais),
`#F7F7F7`, `#FFFFFF`, `#E5E7EB`, `#E8649A` (ícone, borda, decoração, texto de 24 px ou mais), `#F4CDD4`, `#FDF2F4`, `#FCEEF1`,
`#3DB85C` (só fundo de botão de conversão, com texto `#0D0C0D`), `#f0fdf4`/`#bbf7d0`, `red-600`, `#E4E7E9` (fundo das fotos).

| Elemento | Origem | Uso nesta LP |
|---|---|---|
| Fonte | Poppins 400/500/600 do `layout.tsx` | idêntica; sem Lobster Two |
| 11 packshots | `public/images/care/*.webp` (800×800) | B6, nomes `_300ml` mantidos |
| Logo Bubbles | `public/images/bubbles-logo.svg` | B0 (101×24), B16 (110×26), OG (base64) |
| Logo Linha Care | cópia recortada `public/images/distribuidor-care/logo-linha-care-v1.svg` | B0 (80×24) |
| Foto de expedição | `public/images/distribuidores/bubbles-estoque-expedicao-desktop.webp` | B8 |
| Vídeo institucional 720p | URL do CDN da Shopify (`CareBrand.tsx:13`), copiada para os dados | B10, com overlay escuro |
| Poster provisório | `public/images/brand-video-poster.svg` | B10 até a P-08 chegar |
| Fotos dos 8 kits | CDN da Shopify (`.../files/...`) | B6 |
| Barra de rolagem clara | `<style>` de `src/app/care/page.tsx:57-62` | `page.tsx`, literal |
| Placeholders P-01 a P-08 | `DistribuidorCareMedia` (base `LiveCarePhoto.tsx` + `MediaPlaceholder.tsx` sem `font-bold`) | caixas tracejadas honestas |

Imports cruzados previstos (vão para o relatório, um por linha): `@/components/lp/care/Reveal`,
`@/components/lp/captacao/captacaoFormUtils` (`formatPhone`, `isPhoneValid`, `isEmailValid`, `encodeFormData`).

---

## 3. Detalhamento por bloco e critérios de aceite

Formato do `spec-template`: **Dado / Quando / Então**, agrupado em **Must** (obrigatório), **Should** (importante, não bloqueia)
e **Edge** (borda e erro). A verificação que exige navegador vale no deploy preview (§15); sem ele, valem build, lint, tsc e
a leitura do HTML gerado. Classes, ids e copy seguem o super prompt; aqui ficam o contrato e o teste.

### 3.0 Regras comuns a todos os blocos

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | a página montada | o HTML do servidor é inspecionado | existe um único `h1` (B1), cada bloco de conteúdo é `<section aria-labelledby="dc-titulo-<bloco>">` com o `h2` daquele id, sem pular nível |
| Must | qualquer texto visível, `title`, `description`, `alt`, `aria-label` ou OG | as buscas da §15.2 rodam | zero travessão (U+2014), meia-risca (U+2013), "!" e termos do léxico proibido (§3.3) |
| Must | qualquer componente da LP | o código é buscado | nenhum `font-bold`, `font-extrabold`, `font-black`, `rounded-[10px]`, `#0F0C0D`, `#fdf0f3`, `framer-motion`, `priority=` |
| Must | qualquer `<Image fill>` | o código é lido | tem `sizes` e `quality` 75 ou omitido |
| Must | qualquer clique em link de âncora interna | o clique acontece | não há link externo no corpo (B1 a B15), exceto F3, a Política de Privacidade do formulário e as telas pós-envio |
| Should | `Reveal` | o código é buscado | aparece só nas grades do B3, B4, B7, B8 e B12, com delay de no máximo 240 ms |
| Edge | `prefers-reduced-motion: reduce` | a página é usada | nada se move sozinho; rolagem por JS usa `behavior: 'auto'`; vídeos não tocam sozinhos |

### 3.1 B0 · Cabeçalho (`DistribuidorCareHeader.tsx`, dados `DISTRIBUIDOR_CARE_CABECALHO`)

Logos sem link, sem menu, botão secundário só no desktop (`hidden md:inline-flex`) para `#cadastro`; `h-12` no celular, `h-16` no desktop.

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o cabeçalho renderizado | o HTML é lido | o único `<a>` é o botão para `#cadastro`; logos são `<Image>` sem link |
| Must | viewport de 360 ou 375 px | a página abre | o cabeçalho tem no máximo 48 px e nenhum botão |
| Must | desktop | o botão é clicado | dispara `cta_click` com `cta_label: 'Quero ser distribuidor Care'` e `cta_location: 'cabecalho'` |
| Should | o logo Linha Care recortado | a página abre no preview | o desenho aparece inteiro, sem corte, com cerca de 24 px de altura |

### 3.2 B1 · Hero (`DistribuidorCareHero.tsx` + `DistribuidorCareHeroChips.tsx`, dados `DISTRIBUIDOR_CARE_HERO` e `DISTRIBUIDOR_CARE_TIPOS_NEGOCIO`)

Primeira dobra completa no celular; chips gravam no módulo de estado do formulário (`escolherTipo`), rolam e focam "Estado".

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | viewport 360×640 ou 375×667 | a página abre | eyebrow, H1, subtítulo, rótulo, 6 chips em 2 colunas, elevador e micro-prova ficam visíveis sem rolar e sem rolagem horizontal |
| Must | nenhum toque anterior | a pessoa toca "Distribuidor de beleza" | rola até `#cadastro`, a etapa 1 mostra a opção marcada, o foco vai para `dc-estado` e sai **um** `form_open` com `form_name: 'distribuidor-care-lead'` |
| Must | um chip já tocado | a pessoa toca outro chip | o tipo muda, o resto do formulário é mantido e **não** sai outro `form_open` |
| Must | progresso salvo com `tipoNegocio` | a página recarrega | o chip correspondente nasce com `aria-pressed="true"`, borda 2 px `#E8649A`, fundo `#FDF2F4` e ícone `Check` |
| Must | o HTML do servidor | é inspecionado | H1 e chips sem `opacity-0`; nenhum `Reveal` e nenhum `priority` no hero |
| Must | o elevador | é clicado | navega para `#cadastro` sem JS de rolagem e dispara `cta_click` com `cta_location: 'elevador'` |
| Should | a P-01 ainda sem arquivo | a página abre | o contêiner reserva `aspect-[4/5] md:aspect-[4/3]` (sem CLS) e os 3 selos ficam legíveis por cima, fora da caixa `aria-hidden` |
| Edge | o status é `enviado` | um chip é tocado | só rola até `#cadastro`; não grava nada nem dispara evento |
| Edge | o formulário ainda não montou (hidratação) | um chip é tocado | o id `dc-estado` fica como foco pendente e o B13 aplica ao montar (`consumirFocoPendente`) |

### 3.3 B2 · Faixa de benefícios (`DistribuidorCareTicker.tsx`, client, dados `DISTRIBUIDOR_CARE_FAIXA`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | a faixa rodando (40 s por volta, `@keyframes dc-faixa`) | o botão de pausa é acionado | a animação para e o `aria-label` passa a "Retomar a faixa de benefícios"; acionar de novo retoma |
| Must | `prefers-reduced-motion: reduce` | a página abre | a faixa animada e o botão somem; os 11 itens aparecem estáticos, quebrando linha |
| Must | leitor de tela | a faixa é lida | cada item é lido uma vez (a cópia tem `aria-hidden="true"`; só uma versão fica na árvore) |
| Edge | texto sobre `#F4CDD4` | o contraste é medido | o texto é `#0D0C0D`, nunca branco |

### 3.4 B3 · O que muda (`DistribuidorCareChanges.tsx`, dados `DISTRIBUIDOR_CARE_OPORTUNIDADE`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o bloco renderizado | o HTML é lido | 4 cartões literais com ícones `TrendingUp`, `BadgeCheck`, `Sparkles`, `RefreshCw` (`aria-hidden`) e a frase de fechamento; nenhum botão |
| Must | viewport de 360 px | a página abre | 1 coluna, sem corte de texto; `sm:grid-cols-2`, `lg:grid-cols-4` acima disso |

### 3.5 B4 · Por que vende (`DistribuidorCareWhySells.tsx`, dados `DISTRIBUIDOR_CARE_POR_QUE_VENDE`, mídia P-02)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | P-02 sem arquivo | a página abre | caixa P-02 com `aspect-[4/5] md:aspect-video` reservada (sem CLS) |
| Must | carregamento inicial | a aba Rede é olhada | nenhum MP4 baixado |
| Must | o pilar 4 | o layout é lido em qualquer largura | os selos citados ficam no mesmo cartão do texto (lastro colado) |
| Should | P-02 com arquivo no futuro | o bloco chega a 400 px da tela | `DistribuidorCareVideo` insere a `<source>` (desktop ou celular por `matchMedia('(min-width: 768px)')`), com `controls`, sem autoplay |

### 3.6 B5 · Simulador `#simulador` (`DistribuidorCareCalculator.tsx`, client, dados `DISTRIBUIDOR_CARE_SIMULADOR` e `DISTRIBUIDOR_CARE_VALORES_SIMULADOR`)

Fórmula: faturamento = `Math.round(investimento / 0.55)`; lucro = faturamento menos investimento; moeda `'R$\u00a0' + Intl pt-BR`.

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | a página abre (inclusive ao recarregar) | o simulador renderiza | slider no índice 0: R$ 3.000, faturamento R$ 5.455 e lucro R$ 2.455, iguais no servidor e no cliente (sem erro de hidratação) |
| Must | a lista de posições | é lida | 26 posições: 3.000 a 10.000 de mil em mil; 15.000 a 100.000 de 5 mil em 5 mil |
| Must | os valores de conferência | o slider passa por eles | 4.000 → 7.273/3.273; 10.000 → 18.182/8.182; 50.000 → 90.909/40.909; 100.000 → 181.818/81.818 |
| Must | leitor de tela | o slider muda | anuncia o valor em reais (`aria-valuetext`), nunca o índice; resultados em `aria-live="polite"` |
| Must | a ressalva | o layout é lido em qualquer largura | fica logo abaixo dos 2 resultados, também no celular |
| Must | arrastar o slider por 5 s | os eventos são contados | no máximo 4 `calculator_use` com `calculator_name: 'distribuidor_care'` e `investimento` (trava de 1,5 s em variável de módulo) |
| Must | o botão principal | é clicado | vai para `#cadastro` e dispara `cta_click` com `cta_location: 'simulador'` |
| Must | o código da LP | é buscado por `R$ 3`, `3.000`, `3 mil`, `3000` | só aparece no simulador e na pergunta da etapa 4 |
| Should | teclado | Home e End são usados | vão a R$ 3.000 e R$ 100.000; setas mudam uma posição |
| Edge | o F2 leva o foco | "Quero ver a minha conta" é clicado | o `h2` do bloco recebe o foco (`tabIndex={-1}`) |

### 3.7 B6 · Vitrine (`DistribuidorCareProducts.tsx`, `DistribuidorCareProductDialog.tsx`, `DistribuidorCareKits.tsx`, `DistribuidorCareCarousel.tsx`; dados `DISTRIBUIDOR_CARE_VITRINE` + `distribuidorCareVitrineDados.ts`)

Abas APG com ativação automática, carrossel scroll-snap sem autoplay, um único `<dialog>` com `showModal()`, 8 kits sem link.

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o HTML do servidor | é lido | 4 painéis no DOM, "Limpar" ativo (`aria-selected="true"`, `tabIndex={0}`), os outros com `hidden`; Limpar mostra Shampoo Neutro, Limpeza Profunda e Pelos Claros, nessa ordem |
| Must | foco numa aba | seta direita ou esquerda é usada | o foco move **e** ativa a aba vizinha, com volta nas pontas; Home e End vão à primeira e à última; sai um `vitrine_aba` por troca |
| Must | o carregamento da página | os eventos são contados | nenhum `vitrine_aba` sai sem ação da pessoa |
| Must | um cartão de produto | é tocado | o painel abre (bottom sheet no celular, centralizado no desktop), o foco vai para "Fechar" e sai um `vitrine_produto_open` com `produto` e `aba` |
| Must | o painel aberto | Esc, "Fechar" ou clique no fundo | fecha, o foco volta ao cartão que abriu e o fundo da página volta a rolar |
| Must | os 11 produtos | são lidos | volume, frase e selo da tabela §8.7.5; Condicionador "250 g"; Hidratante "50 ml"; só os 4 marcados com "Ideal para o caixa" |
| Must | os 8 kits | são lidos | na ordem da §8.7.6, sem preço, sem link e sem "✨"; Pelos Claros e Cuidado Total com "Body Splash Care 80 ml"; Xperience com "4 itens" e `data-placeholder="composicao-kit"` |
| Must | o código da LP | é buscado | nenhum `TELA_08`, `CARE_CATEGORIES`, `CARE_PRODUCTS` nem `href` para `bubbles.com.br/products` |
| Should | desktop com trilho que transborda | o trilho de kits é olhado | setas de 44 px aparecem, ficam `disabled` nas pontas e rolam um item por clique |
| Should | celular | o trilho é olhado | sem setas; o próximo cartão aparece pela metade |
| Edge | painel aberto no iPhone (Safari ou navegador do Instagram) | a pessoa rola dentro dele | o fundo não rola (`overscroll-behavior: contain` + `overflow: hidden` no `html`) e o clique fora fecha (sem `closedby`) |
| Edge | Limpeza de Olhos e Ouvidos | o painel abre | mostra o texto neutro; `provisorio: true` só nos dados, nada na tela |

### 3.8 B7 · O tutor já procura (`DistribuidorCareDemand.tsx`, dados `DISTRIBUIDOR_CARE_DEMANDA` e `DISTRIBUIDOR_CARE_VIDEOS_CLIENTES`, mídia P-03)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o bloco renderizado | o HTML é lido | 4 cartões literais sem nenhum número do TikTok; texto em destaque literal |
| Must | o bloco | o código é buscado | nenhum `iframe` nem script do TikTok |
| Must | P-03 sem arquivo | a página abre | 3 caixas `aspect-[9/16]` reservadas; no celular, fila com scroll-snap em `role="region"` com `aria-label="Vídeos de clientes"` e `tabIndex={0}` |

### 3.9 B8 · O que recebem (`DistribuidorCareSupport.tsx`, dados `DISTRIBUIDOR_CARE_APOIO`, mídias P-04, P-05 e foto de expedição)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o bloco renderizado | o HTML é lido | 6 cartões literais (Material de PDV com o texto "Display de balcão e gôndola") |
| Must | a foto de expedição | carrega | por `next/image` com `fill` e `sizes="(max-width: 767px) calc(100vw - 32px), 352px"`, quadro `aspect-square` |
| Must | P-04 e P-05 sem arquivo | o HTML é lido | caixas com `data-placeholder="P-04"` e `"P-05"` |

### 3.10 B9 · Menos concorrência (`DistribuidorCareRegion.tsx`, dados `DISTRIBUIDOR_CARE_REGIAO`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o bloco renderizado | o HTML é lido | título e texto literais; nenhum número de vagas, raio, cidade, mapa, contador ou prazo; nenhum ícone de mapa |

### 3.11 B10 · Quem é a Bubbles® (`DistribuidorCareBrand.tsx`, client, dados `DISTRIBUIDOR_CARE_MARCA` e `DISTRIBUIDOR_CARE_VIDEO_INSTITUCIONAL`, P-08)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | carregamento inicial | a aba Rede é olhada | nenhum byte do MP4 antes de o bloco chegar a 400 px da tela (`IntersectionObserver`, `rootMargin: '400px 0px'`) |
| Must | `prefers-reduced-motion: reduce` | o bloco aparece | fundo `#0D0C0D` liso, sem vídeo e sem botão de pausa; texto legível |
| Must | o vídeo tocando | o botão de pausa é acionado | pausa e o rótulo vira "Retomar o vídeo"; acionar de novo retoma |
| Must | os números | são lidos | "4,9" com vírgula, sem "NPS", sem `CountUp`; frase de lastro literal colada aos números |
| Edge | P-08 sem arquivo | o vídeo renderiza | poster `/images/brand-video-poster.svg` e `data-placeholder="P-08"` no `<video>` |

### 3.12 B11 · Prova (`DistribuidorCareTestimonials.tsx`, client, dados `DISTRIBUIDOR_CARE_PROVA` e `DISTRIBUIDOR_CARE_DEPOIMENTOS`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | os 4 depoimentos | o código é buscado | texto literal (busca por "A Bubbles se tornou", "é sobre o que as pessoas sentem" sem reticências e "percebemos"); nenhum "percecebemos" |
| Must | depoimento com mais de 300 caracteres (MANTYPET, SERRAPET, TOPET) | "Ler mais" é acionado por teclado | tira o `line-clamp-6`, o rótulo vira "Ler menos" e `aria-expanded` acompanha; o texto inteiro sempre esteve no DOM |
| Must | o bloco | o código é buscado | nenhuma estrela, "Verificado", avatar, foto, cargo ou cidade |
| Edge | Assispet (menos de 300 caracteres) | o cartão renderiza | sem botão "Ler mais" |

### 3.13 B12 · Como funciona (`DistribuidorCareHowItWorks.tsx`, dados `DISTRIBUIDOR_CARE_COMO_FUNCIONA`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o bloco renderizado | o HTML é lido | 4 passos literais, na ordem, em `<ol role="list">`, número do círculo com `aria-hidden`; nenhum botão |

### 3.14 B13 · Formulário `#cadastro` (`DistribuidorCareForm.tsx`; detalhes na seção 4)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | a página | o HTML é lido | `id="cadastro"` na `<section>` com `scroll-mt-4`; todo link interno de cadastro aponta para ela; não é modal |
| Must | o `DistribuidorCareApp` | o código é lido | o formulário é import **estático**, nunca `dynamic()` |
| Must | a caixa do formulário | o HTML é lido | tem `data-clarity-mask="True"` e envolve formulário **e** telas finais (âncora da regra 40) |

### 3.15 B14 · Perguntas frequentes (`DistribuidorCareFaq.tsx`, client, dados `DISTRIBUIDOR_CARE_FAQ`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o HTML do servidor | é buscado por "36 meses a partir da fabricação" | encontra: as 9 respostas estão no DOM, fechadas com `hidden` |
| Must | a pergunta N fechada | é aberta | `aria-expanded="true"`, as outras fecham (uma por vez) e sai um `faq_open` com `pergunta: N`; fechar não dispara |
| Must | os links das respostas | são lidos | a FAQ 7 vai para `#simulador`; as outras para `#cadastro`; cada clique dispara `cta_click` com `cta_location: 'faq-N'` |
| Must | o bloco | é buscado por "R$" e "3 mil" | nenhum resultado |

### 3.16 B15 · CTA final `#cta-final` (`DistribuidorCareFinalCta.tsx`, dados `DISTRIBUIDOR_CARE_CTA_FINAL`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o bloco renderizado | o HTML é lido | título, botão e selo literais; o selo fica logo abaixo do botão; o F3 vem depois do selo |
| Must | o botão | é medido | 48 px de altura, verde `#3DB85C` com texto `#0D0C0D` |
| Must | o botão | é clicado | vai para `#cadastro` e dispara `cta_click` com `cta_location: 'cta-final'` |

### 3.17 B16 · Rodapé (`DistribuidorCareFooter.tsx`, dados `DISTRIBUIDOR_CARE_RODAPE`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o rodapé | renderiza | linha legal idêntica, com o ano de `new Date().getFullYear()` e o CNPJ 31.900.078/0001-96 |
| Must | os links Política de Privacidade e Termos | são lidos | `target="_blank"` e `rel="noopener noreferrer"` |
| Must | o código da LP | é buscado por "bonificação", "metas" e "premiação" | nenhum resultado |
| Should | celular | o fim da página é olhado | o `pb-28` deixa a F1 sem cobrir o conteúdo |

### 3.18 F1 · Barra fixa (`DistribuidorCareStickyBar.tsx`, `dynamic(..., { ssr: false })`, dados `DISTRIBUIDOR_CARE_BARRA_FIXA`)

Visível quando `passouDosChips && !cadastroVisivel && !enviado`, por `IntersectionObserver` em `#dc-hero-chips` e `#cadastro`.

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | desktop (`md` ou mais) | a página rola | a barra nunca aparece |
| Must | celular | os chips saem da tela por cima | a barra sobe (`translate-y-0`) |
| Must | celular com a barra visível | qualquer parte de `#cadastro` entra na tela | a barra some |
| Must | status `enviado` | a página rola | a barra não volta |
| Must | a barra escondida | a navegação é por Tab | ela não recebe foco (`aria-hidden="true"` e `inert`) |
| Must | o botão | é clicado | dispara `cta_click` com `cta_location: 'barra-fixa'` |
| Edge | viewport de 360 px | o formulário é preenchido | a barra não cobre "Continuar" nem o botão final |

### 3.19 F2 · Popup de saída (`DistribuidorCareExitPopup.tsx`, `dynamic(..., { ssr: false })`, dados `DISTRIBUIDOR_CARE_POPUP`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | desktop com mouse, status `inicial`, sem outro `<dialog>` aberto, sem exibição nos últimos 5 min | o mouse sai pelo topo (`clientY <= 0`, sem `relatedTarget`) | abre com `showModal()`, o foco vai ao botão principal e sai `exit_popup_shown` com `popup_location: 'distribuidor-care'` |
| Must | o popup aberto | "Quero ver a minha conta" é clicado | fecha, rola até `#simulador`, foca o `h2` do B5 e sai `exit_popup_click` |
| Must | o popup aberto | "Agora não", Esc ou clique fora | só fecha; o foco volta a quem tinha antes |
| Must | celular ou tela de toque | o gatilho ocorre | não abre |
| Must | status `em_andamento` ou `enviado` (chip tocado, campo preenchido, envio feito) | o gatilho ocorre | não abre |
| Edge | `sessionStorage` bloqueado | o gatilho ocorre de novo | abre no máximo 1 vez por carregamento (trava em memória) |
| Edge | o painel de produto do B6 aberto | o gatilho ocorre | não abre |

### 3.20 F3 · Compartilhar (`DistribuidorCareShareLink.tsx`, client, prop `origem`, dados `DISTRIBUIDOR_CARE_COMPARTILHAR`)

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o link montado | o `href` é lido | é exatamente o link pronto da §8.20 (`'https://wa.me/?text=' + encodeURIComponent(mensagem)`), sem número de destino e sem valor do simulador |
| Must | o link | é clicado | sai `share_whatsapp` com `origem: 'simulador'` (B5) ou `'cta-final'` (B15); é `<a target="_blank">` direto com `WhatsAppIcon`, nunca `window.open` |
| Must | o código da LP | é buscado | o F3 só existe no B5 e no B15 |
| Should | navegador interno do Instagram e do Facebook | o link é tocado | abre o WhatsApp com o texto completo e a URL com as 3 UTMs |

---

## 4. Formulário (B13 e chips do hero)

### 4.1 Contrato do estado (`useDistribuidorCareForm.ts`)

Módulo de estado externo lido com `useSyncExternalStore` (padrão `CtaLink.tsx:33-37`), sem `setState` em `useEffect`.

| Export | Quem usa | Contrato |
|---|---|---|
| `useDistribuidorCareForm()` | B13 | `{ estado, ui, acoes }` |
| `escolherTipo(tipo)` | chips do B1 | função comum, funciona antes de o B13 montar (§10.7) |
| `useTipoNegocio()` | chips do B1 | `TipoNegocio \| ''` |
| `useStatusCadastro()` | wrapper, F1, F2 | `'inicial' \| 'em_andamento' \| 'enviado'` |
| `consumirFocoPendente()` | B13 ao montar | id ou `null` |

Tipos `CamposForm`, `EstadoForm` (`v: 1`, `leadId`, `iniciado`, `etapa`, `campos`, `salvoEm`, mais `fbc` guardado uma vez) e
`UiForm` exatamente como a §10.2 e a §11.2. Listas fechadas em `distribuidorCareFormDados.ts` e `TIPOS_NEGOCIO`, tipos
derivados com `typeof ...[number]['value']`.

### 4.2 Etapas

| Etapa | Título | Campos (ids) |
|---|---|---|
| 1 | Sobre o seu negócio | `dc-grupo-tipo`, `dc-tipo-outro` (só com "Outro"), `dc-estado` (27 UFs), `dc-cidade` |
| 2 | Como é a sua operação? | `dc-grupo-vendedores`, `dc-grupo-pdvs`, `dc-grupo-linha-pet` |
| 3 | Seus dados | `dc-nome`, `dc-grupo-cargo`, `dc-whatsapp`, `dc-email` (opcional), `dc-cnpj`, `dc-sem-cnpj` |
| 4 | Última pergunta | `dc-grupo-pedido` (Sim ou Agora não); depois do Sim: `dc-grupo-canal`, `dc-grupo-horario`, `dc-email-contato` (condicional) |

Rótulos, placeholders, ajudas, mensagens de erro e textos das telas: literais em `distribuidorCareFormDados.ts` (§10.3, §10.12).

### 4.3 Critérios do formulário

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | etapa válida | "Continuar" | avança, sai `form_step` com o número e o título da etapa de destino, rola para a caixa só se o topo saiu da tela, foca o `h3` da nova etapa e anuncia `Etapa {n} de 4: {título}` |
| Must | etapa com erros | "Continuar" | mostra todos os erros da etapa, rola até o primeiro inválido na ordem da tela (`block: 'center'`), foca o primeiro campo e anuncia o resumo |
| Must | campo de texto não tocado | a pessoa digita | nenhum erro aparece na primeira tecla; o erro aparece no `onBlur` e some assim que o valor fica válido |
| Must | grupo de opções sem escolha | "Continuar" | o erro aparece só depois do clique e some ao escolher |
| Must | "Voltar" | é acionado | volta mantendo valores, rola só se preciso, foca o `h3`; não dispara evento |
| Must | CNPJ `31.900.078/0001-96` | é validado | válido; `31.900.078/0001-97` e `11.111.111/1111-11` inválidos; 13 dígitos dão "incompleto" |
| Must | WhatsApp colado como `+55 14 99999-9999` | a máscara roda | vira `(14) 99999-9999`; `(55) 99999-9999` é aceito; `(14) 9999-999` é recusado |
| Must | "Ainda não tenho CNPJ" marcado | "Continuar" da etapa 3 com o resto válido | não mostra a etapa 4, não sai `form_step` 4 e envia o desvio `sem_cnpj` |
| Must | etapa 4 | "Sim" | mostra o bloco de contato com WhatsApp e "Qualquer horário" já marcados, sem novo envio |
| Must | canal "E-mail" com e-mail vazio | é escolhido | aparece `dc-email-contato`, obrigatório, e continua visível enquanto se digita; trocar de canal esconde e mantém o valor |
| Must | etapa 4 | "Agora não" | envia o desvio `sem_pedido_inicial` na hora, com carregamento no próprio botão |
| Must | progresso no meio da etapa 3 | a página recarrega | volta na etapa 3 com os valores e o mesmo `leadId`, sem novo `form_open` |
| Must | envio concluído (sucesso, desvio ou falha só da Sellum) | a página recarrega | a mesma tela final aparece, status `enviado`, sem dado pessoal em `bubbles_dc_enviado` |
| Must | acessibilidade | o HTML é lido | `<form noValidate>`; grupos em `<fieldset>` com `<legend>` visível; `label htmlFor` em todo campo; `aria-required`, `aria-invalid` só com erro visível, `aria-describedby` para ajuda e erro; campos com `text-base` |
| Must | o honeypot | é inspecionado | renderizado fora da tela, `tabIndex={-1}`, dentro de `aria-hidden`, nunca gravado no storage |
| Must | o código | é buscado | nenhum `data-netlify` em componente; POST só para `/__forms.html` e para a rota |
| Should | aba escondida com status `em_andamento` | `visibilitychange` para `hidden` | sai um `form_abandon` com a etapa, uma vez por carregamento; nada vai ao Netlify |
| Edge | progresso salvo com mais de 24 h, `v` diferente, `leadId` fora da regex ou JSON quebrado | a página abre | a chave é apagada e o formulário começa do zero |
| Edge | progresso na etapa 4 com `semCnpj` marcado | a página abre | volta para a etapa 3 |
| Edge | `sessionStorage` bloqueado (aba anônima, navegador interno) | o formulário é usado | funciona só em memória, sem erro |
| Edge | duplo toque no botão final | dois cliques rápidos | um envio só (trava com `useRef`) |
| Edge | `createLeadId` gera sufixo vazio (muito improvável) | o progresso é lido ou a rota valida | o progresso é descartado e a rota responde 400; vai para o relatório como limite conhecido |

### 4.4 Envio (`distribuidorCareSubmit.ts`, `distribuidorCareAttribution.ts`)

| Caso | Netlify `distribuidor-care` | Rota (Sellum e CAPI) | Tela |
|---|---|---|---|
| Sem CNPJ | `qualificado=false`, `motivo_desvio=sem_cnpj` | não chama | desvio |
| Agora não | `qualificado=false`, `motivo_desvio=sem_pedido_inicial` | não chama | desvio |
| CNPJ + Sim + preferência | `qualificado=true` | chama | sucesso, ou falha só da Sellum |

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | envio qualificado | Netlify e rota rodam em `Promise.allSettled` | "salvou" = Netlify **ou** rota; evento de lead só com o Netlify confirmado e o honeypot vazio |
| Must | Netlify ok e rota falhou | o envio termina | `lead_form_submitted` com `lead_qualified: true` e `sellum_failed: true`; POST do `falha-sellum` com `motivo` e `keepalive`, sem esperar; tela "Recebemos os seus dados." |
| Must | Netlify falhou e rota ok | o envio termina | tela de sucesso, sem `lead_form_submitted` e sem `falha-sellum` |
| Must | nada gravou | o envio termina | bloco `role="alert"` com os dados mantidos, status `em_andamento`, nenhum evento; "Tentar de novo" repete com o mesmo `leadId` e sem novo `form_open` |
| Must | desvio | o Netlify confirma | `lead_form_submitted` com `lead_qualified: false` e, logo depois, `lead_desviado` com o `motivo` |
| Must | os campos do Netlify | são conferidos contra o `public/__forms.html` | todo `name` enviado existe no bloco certo, inclusive `leadId`, `bot-field` e (no `falha-sellum`) `motivo`; todas as chaves vão sempre, vazias quando não houver valor |
| Must | o corpo da rota | é lido | leva os **valores** das listas (`distribuidor_pet`, `1_3`), não os rótulos |
| Must | `_fbc` ausente e `fbclid` presente | a atribuição é montada | gera `fb.1.<ms>.<fbclid>` uma vez e guarda no `EstadoForm` |
| Must | tela de desvio | o botão é clicado | abre `https://www.bubbles.com.br/collections/care?utm_source=lp-distribuidor-care&utm_medium=desvio&utm_campaign=distribuidor-care` na mesma aba, sem `CtaLink` nem `appendUtms`, e dispara `cta_click` com `cta_location: 'desvio'` |
| Must | telas de falha | o botão de WhatsApp é clicado | `<a target="_blank">` para `DISTRIBUIDOR_CARE.whatsappAtendimento` com a mensagem e o `leadId`, `WhatsAppIcon`, e `whatsapp_click` com `distribuidor-care-falha-sellum` ou `-falha-total` |
| Edge | rota sem resposta | 20 s passam | o `AbortController` corta e o motivo vira `rede` |

---

## 5. Rota de API (`src/app/api/distribuidor-care/lead/route.ts`)

`runtime = 'nodejs'`. Ordem: origem → corpo → honeypot → validação → agenda a CAPI com `after()` → Sellum → resposta.
Funções pequenas (cada uma com menos de 50 linhas): `origemPermitida`, `origemDoReferer`, `lerJson`, `validarLead`,
`montarPayloadSellum`, `enviarSellum`, `contextoMeta`, `enviarCapi`, `responder`. Validação com as listas e funções puras de
`distribuidorCareFormDados.ts`, `distribuidorCareFormUtils.ts` e `src/lib/distribuidor-care.ts`, sem dependência nova.

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | POST sem `Origin` e sem `Referer` | chega | 403 `{ ok: false, motivo: 'origem' }` |
| Must | `Origin: https://exemplo.com`, `Origin: null` ou `Sec-Fetch-Site: cross-site` | chega | 403 `origem` |
| Must | `Origin` de produção ou do próprio deploy preview (mesmo `host`) com corpo `{}` | chega | 400 `validacao` |
| Must | `Content-Type` diferente de JSON, corpo acima de 8 KB ou JSON que não é objeto | chega | 400 `validacao` |
| Must | `bot-field` preenchido com origem válida | chega | 200 `{ ok: true }` sem Sellum, sem CAPI e sem log de dado |
| Must | qualquer campo fora da regra da §12.4 | chega | 400 `validacao`; o log traz só o nome do campo |
| Must | variáveis da Sellum ausentes | lead válido chega | 503 `sellum_indisponivel`; CAPI agendada mesmo assim |
| Must | Sellum responde 5xx, 408, 429 ou estoura 8 s | lead válido chega | 1 nova tentativa depois de 500 ms; falhou de novo: 502 `sellum_indisponivel` |
| Must | Sellum responde 4xx (fora 408 e 429) | lead válido chega | sem nova tentativa; 502 |
| Must | Sellum aceita | lead válido chega | 200 `{ ok: true }` sem esperar o Meta |
| Must | qualquer resposta | sai | `Cache-Control: no-store`; nunca diz qual campo falhou, status da Sellum, erro ou stack |
| Must | GET ou outro método | chega | 405 (automático do Next) |
| Must | CAPI com `META_PIXEL_ID` e `META_CAPI_ACCESS_TOKEN` | o `after()` roda | envia `Lead` com `event_id: 'lead.<leadId>'`, `user_data` só com `em`, `ph`, `fn`, `ct`, `st`, `country` (SHA-256 hex) e `client_ip_address`, `client_user_agent`, `fbp`, `fbc` sem hash; versão `v26.0` salvo `META_GRAPH_API_VERSION` válida; tempo limite de 5 s, sem nova tentativa |
| Must | variáveis do Meta ausentes | o `after()` roda | a CAPI não faz nada, sem erro e sem log |
| Must | normalização do telefone para `ph` | `(55) 99999-9999` é normalizado | vira `5555999999999` (o DDD 55 não perde o DDI); valor vazio depois de normalizar é omitido, nunca hash de string vazia |
| Must | o código e os logs | são lidos | nenhum `NEXT_PUBLIC_` novo; nenhum token ou URL de webhook no código; log só com prefixo `[distribuidor-care]`, etapa, status, tentativa, `name` do erro e `leadId` |
| Should | `META_CAPI_TEST_EVENT_CODE` presente | a CAPI roda | inclui `test_event_code` |
| Edge | `full_url` de outro domínio | lead válido chega | troca por `https://ofertas.bubbles.com.br/distribuidor-care` |
| Edge | `fbp` ou `fbc` fora do formato | lead válido chega | viram `''`; cookie da requisição tem preferência sobre o corpo |

---

## 6. `page.tsx` e OG

- `page.tsx`: Server Component com o esqueleto da §6.6 do super prompt. `metadata` com `title` e `description` de
  `DISTRIBUIDOR_CARE_SEO`, `canonical` próprio e `robots: { index: false, follow: true }`. `<GtmScript id="GTM-N4PHK6DM" />`
  (regra 42), `<Script id="clarity-distribuidor-care" strategy="afterInteractive">` com o conteúdo idêntico ao de
  `src/app/captacao/page.tsx:35`, o `<style>` da barra de rolagem de `src/app/care/page.tsx:57-62` e `<DistribuidorCareApp />`.
  Sem `preconnect` (o layout já faz) e sem JSON-LD novo.
- `opengraph-image.tsx`: padrão de `src/app/care/opengraph-image.tsx`, `alt = 'Seja distribuidor Linha Care'`, 1200×630, PNG,
  logo Bubbles lido do disco em base64, o H1 literal e a pílula "até 45% de margem". Pesos 400, 500 e 600 (o OG da `/care` usa
  700 e 800: não copiar), `display: 'flex'` em todo `div` com mais de um filho, sem foto e sem "R$ 3 mil".

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | `npm run build` | roda | lista `/distribuidor-care`, `/distribuidor-care/opengraph-image` e `ƒ /api/distribuidor-care/lead` |
| Must | o HTML da página | é lido | `<meta name="robots" content="noindex, follow">`, canonical próprio, GTM `GTM-N4PHK6DM` e Clarity |
| Must | o `sitemap.ts` | é conferido | não foi tocado e não lista a rota |

---

## 7. Rastreamento

`form_name` do dataLayer: `distribuidor-care-lead` (formulários do Netlify: `distribuidor-care` e `falha-sellum`).
Catálogo completo na §13.1 do super prompt. Funções existentes usadas como estão: `createLeadId`, `pushFormOpen`, `pushFormStep`,
`pushFormAbandon`, `pushLeadFromForm`, `pushCalculatorUse`, `pushExitPopupShown`, `pushExitPopupClick`, `pushCtaClick`,
`pushWhatsappClick`. Funções novas, só acrescentadas no fim do `tracking.ts` (F5): `pushLeadDesviado`, `pushShareWhatsapp`,
`pushFaqOpen`, `pushVitrineAba`, `pushVitrineProdutoOpen`. Nas fases F2 e F3, onde o evento ainda não tiver função, fica o
comentário `// evento F5: <nome>`, trocado pela chamada na F5.

| Tipo | Dado | Quando | Então |
|---|---|---|---|
| Must | o diff do `tracking.ts` | `git diff --numstat` roda | 0 deleções; as 17 funções existentes intactas |
| Must | o código da LP | é buscado por `dataLayer.push`, `gtag(` e `fbq(` | nenhum resultado fora do `tracking.ts` |
| Must | qualquer `extra` | é lido | nunca usa `event`, `event_id`, `lead_id`, `form_name`, `lead_qualified` ou `user_data` |
| Must | dado pessoal | os eventos são lidos | só no `user_data` do `lead_form_submitted` |
| Must | `docs/tracking.md` | é lido | `distribuidor-care-lead` na lista do Nível 1, as 5 linhas novas depois do `page_view` e a seção "LP /distribuidor-care" no fim |
| Must | os comentários provisórios das fases F2 e F3 | a F5 termina e o código é buscado por `// evento F5:` | nenhum resultado |

Roteiro do GTM (§13.4) é entregue ao gestor no relatório; a sessão não mexe em contêiner.

---

## 8. Mapa de páginas e SEO

- Home (regra 22): um item novo no array `pages` de `src/app/page.tsx`, depois do `/nomenclatura` e antes do `]` da `:76`,
  com `href`, `label` e `description` literais da §6.8. `git diff --numstat src/app/page.tsx` com 0 deleções.
- `robots` noindex, follow; fora do `sitemap.ts`; sem JSON-LD novo; `title` e `description` provisórios da §6.6
  (pendência 1).

---

## 9. Ordem de execução e provas por fase

| Fase | Entregável | Prova para seguir |
|---|---|---|
| F0 | esta spec e a linha de base | saídas coladas (seção 0); todo bloco com critério; todo arquivo da seção 1 citado |
| F1 | `src/lib/distribuidor-care.ts`, `distribuidorCareVitrineDados.ts`, `distribuidorCareFormDados.ts`, `DistribuidorCareMedia.tsx`, `logo-linha-care-v1.svg` | tsc e eslint limpos nos novos; `wc -l` no teto; zero U+2014, U+2013 e "!" nos dados; todo `/images/...` citado existe |
| F2 | `page.tsx`, `opengraph-image.tsx`, `DistribuidorCareApp.tsx`, B0 a B12, B14 a B16, F1 a F3, entrada na home | build com as rotas; lint sem aviso novo; buscas de estilo proibido vazias; `<Image fill>` com `sizes`; home sem deleção |
| F3 | arquivos do formulário e os 2 blocos do `__forms.html` | build, lint e tsc limpos; conferência campo a campo; nenhum `data-netlify` em componente; `__forms.html` sem deleção |
| F4 | `route.ts` | build lista a rota `ƒ`; nenhum `NEXT_PUBLIC_` novo nem segredo no código; `security-review` e `/security-scan` sem achado alto aberto |
| F5 | funções novas do `tracking.ts`, troca dos comentários `// evento F5:`, `docs/tracking.md` | `tracking.ts` com 0 deleções; nenhuma chamada direta ao dataLayer; build, lint e tsc limpos |
| F6 | relatório final (§16) | build, lint e tsc depois da última edição; `code-reviewer`, `quality-guardian` (`/quality`), `/security-scan`; 14 buscas da §15.2 e 7 auditorias do PAS²; hash do diff de `next.config.ts` e `netlify.toml` igual ao da seção 0.1 |

Paradas previstas (§0.3): domínio novo na CSP, arquivo fora da lista, conflito com o código, arquivo acima de 500 linhas que
exija arquivo novo, passo de painel, commit, deploy ou servidor local. Nesses casos paro só o item afetado e sigo com o resto.

---

## 10. O que fica para depois (fora desta entrega)

- Mídias reais P-01 a P-06 e P-08 (a página vai ao ar com placeholders honestos; troca de uma linha em `DISTRIBUIDOR_CARE_MIDIA`).
- Título por anúncio (N5; o hero já fica num objeto próprio), teste A/B (N10), PDF da simulação (N4).
- Conversões offline do CRM e WhatsApp automático para o time.
- Limite de requisições por IP na rota (não vale para função gerada pelo adapter; defesa atual: origem, honeypot, validação e 8 KB).
- Configuração de painel (Netlify, Sellum, Meta, GTM): checklist da §14 no relatório final, feita pelo gestor.

---

## 11. Pendências `[CONFIRMAR COM O GESTOR]` (valor provisório em uso até a resposta)

| # | Pergunta | Valor provisório |
|---|---|---|
| 1 | `title` e `description` da página | os da §6.6 |
| 2 | Número do WhatsApp das telas de falha | `5514998492048` (não existe em outro ponto do código; a `/captacao` usa `5514997023387`) |
| 3 | Seleção do "Combina com" de cada produto | rotina da loja e composição dos kits |
| 4 | Texto neutro de Limpeza de Olhos e Ouvidos (sem ficha técnica) | o da §8.7.5 |
| 5 | Fotos e composição dos 2 kits Xperience (a arte traz claim?) | `composicao: null`, foto do CDN |
| 6 | "Kit Completo Linha Care Bubbles" sem ® | sem ® |
| 7 | Ressalva do rodapé com 3 frases cortadas e 2 ajustes | texto final da §8.17 |
| 8 | Esconder a F1 também com o B15 visível | só some com `#cadastro` visível e depois do envio |
| 9 | Frase "O que você preencher fica salvo só nesta aba até o envio." | não exibida |
| 10 | Campo Empresa opcional e `autoComplete="organization"` | sem campo Empresa |
| 11 | "Agora não" envia na hora, sem confirmação | envia na hora |
| 12 | Webhook "Distribuidor Care" exige `companyName`? | não envia |
| 13 | Aceitar CNPJ alfanumérico (a partir de julho de 2026) | só numérico |
| 14 | Conversão personalizada pela URL, se o Pixel recebe `Lead` de outras LPs | tag Lead só para qualificado, `eventID = {{event_id}}` |
| 15 | `share_whatsapp` novo ou `pushShareClick`, que já existe | `share_whatsapp` |
| 16 | Teste do preview com ou sem as variáveis da Sellum | primeiro sem, depois com |
| 17 | Prazo de retenção dos dados pessoais no Netlify | sem prazo |

Cada marcador fica no código como `// [CONFIRMAR COM O GESTOR] <o quê>` e nunca aparece na tela. A lista com `arquivo:linha`
sai no relatório da F6.

---

## 12. Confirmação

Autorizado pelo super prompt de 22.10.26 (§0.2): criação dos arquivos da seção 1, acréscimos em `public/__forms.html`,
`src/lib/tracking.ts` e `src/app/page.tsx`, atualização de `docs/tracking.md`, estrutura nova de página e a primeira rota de
API do projeto. Sem commit, push, deploy ou servidor local.
