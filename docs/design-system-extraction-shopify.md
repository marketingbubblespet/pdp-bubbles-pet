# Design System Bubbles — Extração para Shopify (tema claro)

> Extraído do projeto `lp-bubbles` (Next.js/Tailwind v4) para reuso no tema Shopify.
> Fonte da verdade original: `DESIGN-SYSTEM.md` (raiz do projeto).
> Este documento traduz tudo pra CSS puro (custom properties), sem depender do Tailwind,
> já que o Shopify não roda Tailwind nativamente.
>
> **Atualizado** após extração do HTML renderizado da PDP mais vendida em
> www.bubbles.com.br, pra alinhar com o que está realmente em produção. As decisões
> desta revisão substituem a versão anterior deste documento.

---

## 1. Fonte

**Poppins** (Google Fonts), pesos `400` (regular), `500` (medium), `600` (semibold).
**Lobster Two** (Google Fonts), fonte decorativa, uso pontual — nunca corpo ou título.

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Lobster+Two&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
}

.decorative {
  font-family: 'Lobster Two', cursive;
}
```

`Figtree` foi **descontinuada** — não estava em uso em lugar nenhum do site real, era
resquício de uma decisão anterior do Design System que nunca chegou a produção.

---

## 2. Peso tipográfico — regra da marca: nunca usamos bold

```
400 regular  → corpo de texto
500 medium   → TÍTULOS (h1 a h6)   ← padrão de título
600 semibold → ênfase máxima (preço, CTA, destaque)
700 bold     → PROIBIDO
800 / 900    → PROIBIDO
```

Carregar **apenas** os pesos 400, 500 e 600 da Poppins no `<link>`/`@font-face`. Qualquer
`font-weight: 700` ou maior encontrado em CSS legado deve ser corrigido para 500 (se for
título) ou 600 (se for ênfase/preço/CTA).

---

## 3. Tokens de cor (custom properties)

```css
:root {
  /* Marca — confirmado em uso real no site, não muda */
  --color-brand-pink: #F4CDD4;             /* primária — cor da linha Essential */
  --color-brand-super-pink: #E8649A;       /* labels, ícones, destaques */
  --color-brand-dark: #0D0C0D;             /* texto principal / preto de marca */
  --color-action-green: #3DB85C;           /* CTA de compra, e SÓ isso */

  /* Superfícies rosa */
  --surface-pink-light: #FDF2F4;
  --surface-pink-section: #FCEEF1;

  /* Texto: #888888 tem contraste ~3.5:1 sobre branco — REPROVA WCAG AA em texto
     pequeno (mínimo 4.5:1). Só usar em texto >=18px, legenda grande ou decorativo.
     Qualquer texto de leitura usa --text-secondary. */
  --text-muted: #888888;
  --text-secondary: #666666;

  /* Neutros */
  --color-bg: #F7F7F7;
  --color-card: #FFFFFF;
  --color-border: #E5E7EB;
  --color-star: #F4A522;
  --color-negative: #f87171;

  /* Cupom / barra escura */
  --color-coupon-bg: #0D0C0D;
  --color-coupon-text: #F4CDD4;

  /* WhatsApp (cor fixa do canal, não é token de marca) */
  --color-whatsapp: #25D366;

  /* Linhas de produto */
  --color-line-pro: #0D0C0D;
  --color-line-essential: #F4CDD4;
  --color-line-xperience: #C8A96E;
  --color-line-collora: #B066C6;

  /* Layout */
  --page-width: 1400px;
  --container-wide: 1100px;
  --container-narrow: 760px;

  /* Raio de borda */
  --radius-chip: 4px;
  --radius-default: 12px;   /* padrão: botão, input, card */
  --radius-card: 20px;      /* card destacado */
  --radius-hero: 40px;      /* bloco hero / seção pill */

  --shadow-card: 0 2px 8px rgba(0,0,0,0.07);

  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;

  --cta-min-height: 44px;   /* alvo de toque no mobile — lei de Fitts */
}
```

**Paleta descartada:** o site em produção ainda carrega uma paleta paralela (navy
`#000647` e ciano `#26B6E2`), herdada do tema Ascent anterior. Essa paleta foi
**descartada** pela decisão de marca — não incluir no Design System. A loja vai migrar
pra rosa/verde.

### Regras de uso de cor (não negociáveis)
1. **Nunca hex solto** — sempre via token.
2. **Verde `#3DB85C` só em botão de compra**, nunca decoração ou destaque de texto.
3. Títulos usam `--color-brand-dark` (`#0D0C0D`). Corpo de leitura usa `--text-secondary`
   (`#666666`). `--text-muted` (`#888888`) só em texto ≥18px ou decorativo.
4. Manter consistência visual entre todas as seções do tema.

---

## 4. Escala tipográfica

| Elemento | Tamanho (mobile → desktop) | Peso | Cor |
|---|---|---|---|
| H1 (herói) | `28px → 48px` | 500 (medium) | `--color-brand-dark` |
| H2 (seção) | `24px → 32px` | 500 (medium) | `--color-brand-dark` |
| Eyebrow / label acima do título | `12px` | 600 (semibold) | `--color-brand-super-pink` |
| Corpo | `14px → 16px` | 400 (regular) | `--text-secondary` |
| Preço / CTA / destaque | conforme contexto | 600 (semibold) | `--color-brand-dark` ou branco sobre CTA |
| Legenda ≥18px / decorativo | conforme contexto | 400–500 | `--text-muted` permitido |

```css
.h1 { font-size: 1.75rem; font-weight: 500; line-height: 1.15; color: var(--color-brand-dark); }
@media (min-width: 768px) { .h1 { font-size: 3rem; } }

.h2 { font-size: 1.5rem; font-weight: 500; color: var(--color-brand-dark); }
@media (min-width: 768px) { .h2 { font-size: 1.875rem; } }

.eyebrow {
  font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--color-brand-super-pink);
}

.body-text { font-size: 0.875rem; font-weight: 400; color: var(--text-secondary); line-height: 1.6; }
@media (min-width: 768px) { .body-text { font-size: 1rem; } }

.price, .emphasis { font-weight: 600; }
```

---

## 5. Botões

### Botão CTA primário (compra/conversão — sempre verde)
```css
.btn-cta {
  background-color: var(--color-action-green);
  color: #fff;
  font-weight: 600;
  border-radius: var(--radius-default);
  min-height: var(--cta-min-height);
  padding: 0.75rem 1.5rem;
  transition: all var(--duration-base) ease;
}
@media (min-width: 768px) {
  .btn-cta { padding: 1rem 2rem; }
}
.btn-cta:hover { filter: brightness(1.1); transform: scale(1.02); }
.btn-cta:active { transform: scale(0.95); }
```

> **Dívida técnica conhecida do lado da loja:** o site em produção hoje força
> `border-radius: 0 !important` nos botões (herança do tema Ascent). Isso **não** é o
> padrão do Design System — o padrão continua `12px`. É a implementação da loja que
> precisa migrar pro token correto, não o token que deve se adaptar ao bug visual atual.

### Botão secundário (rosa, accent)
```css
.btn-accent {
  background-color: var(--color-brand-super-pink);
  color: #fff;
  font-weight: 600;
  border-radius: var(--radius-default);
  min-height: var(--cta-min-height);
  padding: 0.75rem 1.5rem;
}
```

### Botão outline/neutro
```css
.btn-outline {
  background: #fff;
  border: 1px solid var(--color-border);
  color: var(--color-brand-dark);
  font-weight: 600;
  border-radius: var(--radius-default);
  min-height: var(--cta-min-height);
  padding: 0.75rem 1.25rem;
}
.btn-outline:hover { background: var(--color-bg); }
```

### Botão WhatsApp
```css
.btn-whatsapp {
  background-color: var(--color-whatsapp);
  color: #fff;
  font-weight: 600;
  border-radius: var(--radius-default);
  min-height: var(--cta-min-height);
  padding: 0.875rem 1.5rem;
}
```
**Regra de ícone:** todo elemento que leva ao WhatsApp usa o **logo oficial do WhatsApp**
em SVG próprio — nunca um ícone genérico de balão de conversa.

---

## 6. Cards e blocos

```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);   /* 20px, card destacado */
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
}

.card-accent {
  background: var(--surface-pink-light);
  border-radius: var(--radius-default);
  padding: 1rem 1.25rem;
  text-align: center;
}

.badge-success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 9999px;
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-action-green);
}

.chip {
  border-radius: var(--radius-chip);   /* 4px */
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
}
```

---

## 7. Formulários

```css
.input {
  width: 100%;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-default);
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: var(--color-brand-dark);
}
.input:focus { outline: none; border-color: var(--color-brand-super-pink); }

.label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-brand-dark);
  margin-bottom: 0.375rem;
}

.field-error { font-size: 0.75rem; color: #dc2626; margin-top: 0.25rem; }
```

Máscaras de campo (replicar em JS puro no tema):
- **Telefone BR**: `(00) 0000-0000` (fixo) ou `(00) 00000-0000` (celular), progressiva
- **CPF/CNPJ combinado**: até 11 dígitos vira CPF, a partir do 12º vira CNPJ
- **E-mail**: regex simples, erro só aparece após tentativa de avançar/enviar

---

## 8. Layout, sombra e motion

```css
.container-wide { max-width: var(--container-wide); margin-inline: auto; padding-inline: 1rem; }
.container-narrow { max-width: var(--container-narrow); margin-inline: auto; padding-inline: 1rem; }
.page { max-width: var(--page-width); margin-inline: auto; }

.section { padding-block: 4rem; }
@media (min-width: 768px) { .section { padding-block: 6rem; } }
```

Sempre respeitar `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 9. Blocos/padrões de seção recorrentes

| Bloco | Estrutura | Fundo típico |
|---|---|---|
| **Hero** | Eyebrow + H1 + parágrafo + provas rápidas + pills de prova social + CTA + imagem | `--color-bg` |
| **Ticker/marquee** | Faixa horizontal com scroll infinito, texto uppercase separado por `•` | `--color-brand-pink` |
| **Grade de produtos com abas** | Tabs com indicador deslizante, grid 2 col mobile / 4 col desktop | branco |
| **Calculadora interativa** | Slider + dois números grandes de resultado + disclaimer de projeção | `--surface-pink-light` |
| **Cards de diferenciais** | Grid 2–3 col, ícone + label + título + texto | branco |
| **Estatísticas animadas** | Números que sobem de 0 até o valor real ao entrar na viewport | `--color-bg` |
| **Prova social / depoimentos** | Cards com aspas, nome + selo "Verificado" | `--surface-pink-light` |
| **FAQ (accordion)** | Lista com divisores, pergunta + chevron rotativo, resposta em `--text-secondary` | `--color-bg` |
| **CTA final** | Fundo escuro com foto (overlay `rgba(13,12,13,0.85)`), texto branco, CTA verde | imagem + overlay |
| **Barra fixa (sticky bar)** | Fixa no rodapé após scroll, título + subtítulo + CTA | branco, `--shadow-card` invertida pra cima |
| **Pop-up de saída (exit-intent)** | Modal centralizado, throttle de 5 min via sessionStorage | overlay escuro + card branco |

---

## 10. Ícones

- Biblioteca: **Lucide** (contorno)
- Cor segue o contexto: rosa em labels/destaques, verde em confirmações, `--text-secondary` em auxiliares
- **WhatsApp sempre usa logo oficial em SVG próprio**, nunca ícone genérico de chat

---

## 11. Vocabulário e tom de escrita

A Bubbles vende para **banho e tosa profissional**, não para o tutor final — confirmado
pelos dados reais da loja (top 10 de vendas = galões 5L concentrados 1:5/1:10, PDP fala
em "custo por banho"/"guia de diluição"/"quantos banhos rendem", ticket médio R$ 228 a
R$ 1.463). Qualquer copy, exemplo de componente ou placeholder novo deve usar
vocabulário de **rendimento, diluição, custo por banho, protocolo** — nunca "seu pet"
(tom de consumidor final, não do profissional comprando pra revenda/salão).

- Todo texto visível em **pt-BR**
- **Nunca travessão "—"** em texto visível
- CTA de compra em primeira pessoa + verbo de ação

---

## 12. Checklist de implementação no tema Shopify

- [ ] Importar Poppins (400/500/600) + Lobster Two via Google Fonts
- [ ] Remover qualquer referência a Figtree
- [ ] Criar os custom properties de cor, raio, sombra e motion (seções 3, 6, 8)
- [ ] Corrigir todo `font-weight: 700+`/`font-bold`/`font-extrabold`/`font-black` pra `500` (título) ou `600` (ênfase)
- [ ] Trocar `#999999` por `--text-muted` (`#888888`), só em texto ≥18px
- [ ] Qualquer texto de leitura usa `--text-secondary` (`#666666`)
- [ ] Corrigir `border-radius: 0 !important` dos botões pra `12px` (dívida técnica registrada)
- [ ] Garantir altura mínima de **44px** em todo CTA
- [ ] **Todo CTA de compra usa o verde `#3DB85C`**, nunca outra cor
- [ ] Remover a paleta navy/ciano herdada do tema Ascent
- [ ] Reaproveitar os padrões de seção da tabela da seção 9 como blocos do Shopify
- [ ] Baixar/recriar o SVG oficial do WhatsApp
- [ ] Aplicar `prefers-reduced-motion` globalmente
- [ ] Revisar copy de componentes/placeholders pro vocabulário profissional (seção 11)
