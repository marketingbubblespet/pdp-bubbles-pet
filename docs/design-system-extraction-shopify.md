# Design System Bubbles — Extração para Shopify (tema claro)

> Extraído do projeto `lp-bubbles` (Next.js/Tailwind v4) para reuso no tema Shopify.
> Fonte da verdade original: `DESIGN-SYSTEM.md` + tokens reais em `src/app/globals.css`
> e nos componentes de produção (`src/components/lp/*`, `src/components/ui/*`).
> Este documento traduz tudo pra CSS puro (custom properties), sem depender do Tailwind,
> já que o Shopify não roda Tailwind nativamente.

---

## 1. Fonte

**Figtree** (Google Fonts), pesos usados: `400` (regular), `500` (medium), `700` (bold), `800` (extrabold).

```css
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;700;800&display=swap');

body {
  font-family: 'Figtree', sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

No projeto original, os pesos são carregados via `next/font/google` com `display: optional` (evita FOUT com penalidade mínima de performance). No Shopify, usar `font-display: swap` no `@font-face`/link do Google Fonts é o equivalente prático.

---

## 2. Tokens de cor (custom properties)

Copiar direto pro `:root` do tema:

```css
:root {
  /* Marca */
  --color-accent: #E8649A;          /* Rosa Bubbles — labels, ícones, destaques, texto de ênfase */
  --color-accent-light: #F4CDD4;    /* Rosa claro — fundos suaves, bordas, barra de anúncio */
  --color-accent-bg: #fdf0f3;       /* Rosa fundo de seção (blocos, cards) — variante 1 */
  --color-accent-bg-alt: #fdf2f4;   /* Rosa fundo de seção — variante 2, praticamente idêntica */

  /* Ação / CTA */
  --color-cta: #3DB85C;             /* Verde — TODOS os botões de compra/conversão principal */
  --color-cta-badge-bg: #f0fdf4;    /* Fundo de selo de aprovação/confirmação */
  --color-cta-badge-border: #bbf7d0;

  /* Texto */
  --color-text: #0F0C0D;            /* Títulos e texto forte */
  --color-text-muted: #6B7280;      /* Corpo / parágrafos */
  --color-text-faint: #9ca3af;      /* Legendas, notas de rodapé, disclaimers */

  /* Neutros e apoio */
  --color-bg: #F7F7F7;              /* Fundo geral das seções (branco oficial da marca) */
  --color-card: #FFFFFF;            /* Cards e caixas */
  --color-border: #E5E7EB;          /* Bordas neutras padrão */
  --color-star: #F4A522;            /* Estrelas de avaliação (âmbar) */
  --color-negative: #f87171;        /* red-400 — coluna "concorrentes" em comparações */

  /* Cupom / barra escura (elemento de contraste pontual) */
  --color-coupon-bg: #0d0c0d;
  --color-coupon-text: #f4cdd4;

  /* WhatsApp (ícone/CTA de canal, cor fixa da marca WhatsApp, não da Bubbles) */
  --color-whatsapp: #25D366;
}
```

### Regras de uso de cor (não negociáveis)
1. **Nunca inventar cor fora desta paleta.** Toda variação visual nasce combinando os tokens acima com opacidade (ex: `rgba(15,12,13,0.7)` para texto secundário sobre fundo claro).
2. **O botão de compra/CTA principal é sempre verde** (`--color-cta`). O rosa é *accent*, nunca cor de botão de conversão principal.
3. Títulos = `--color-text`. Corpo de texto = `--color-text-muted`. Textos auxiliares/legais = `--color-text-faint`.
4. Bordas neutras usam sempre `--color-border`, nunca preto puro ou cinza arbitrário.

---

## 3. Escala tipográfica

| Elemento | Tamanho (mobile → desktop) | Peso | Cor | Extra |
|---|---|---|---|---|
| H1 (herói) | `28px → 48px` (`text-3xl md:text-5xl`) | 800 (extrabold) | `--color-text` | `line-height: 1.15` |
| H2 (seção) | `24px → 32px` (`text-2xl md:text-3xl`) | 700 (bold) | `--color-text` | — |
| Eyebrow / label acima do título | `12px` (`text-xs`) | 800 (extrabold/black) | `--color-accent` | `text-transform: uppercase; letter-spacing: 0.1em` |
| Corpo | `14px → 16px` (`text-sm md:text-base`) | 500 (medium) | `--color-text-muted` | `line-height: 1.6` |
| Legenda / nota de rodapé | `10px → 12px` | 400–700 | `--color-text-faint` | itálico opcional para citações |

```css
.h1 { font-size: 1.75rem; font-weight: 800; line-height: 1.15; color: var(--color-text); }
@media (min-width: 768px) { .h1 { font-size: 3rem; } }

.h2 { font-size: 1.5rem; font-weight: 700; color: var(--color-text); }
@media (min-width: 768px) { .h2 { font-size: 1.875rem; } }

.eyebrow {
  font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--color-accent);
}

.body-text { font-size: 0.875rem; font-weight: 500; color: var(--color-text-muted); line-height: 1.6; }
@media (min-width: 768px) { .body-text { font-size: 1rem; } }
```

---

## 4. Botões

### Botão CTA primário (compra/conversão — sempre verde)
```css
.btn-cta {
  background-color: var(--color-cta);
  color: #fff;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;      /* py-3 px-6, mobile */
  transition: all 0.2s ease;
}
@media (min-width: 768px) {
  .btn-cta { padding: 1rem 2rem; }  /* py-4 px-8, desktop */
}
.btn-cta:hover { filter: brightness(1.1); transform: scale(1.02); }
.btn-cta:active { transform: scale(0.95); }
```

### Botão secundário (rosa, accent, ex: "próxima etapa" de formulário)
```css
.btn-accent {
  background-color: var(--color-accent);
  color: #fff;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
}
.btn-accent:hover { filter: brightness(1.1); transform: scale(1.02); }
```

### Botão outline/neutro (ex: "voltar" em formulário multi-etapa)
```css
.btn-outline {
  background: #fff;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-weight: 700;
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
}
.btn-outline:hover { background: var(--color-bg); }
```

### Botão WhatsApp (cor fixa de canal, não é token da marca)
```css
.btn-whatsapp {
  background-color: var(--color-whatsapp);
  color: #fff;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.875rem 1.5rem;
}
```
**Regra de ícone:** todo elemento que leva ao WhatsApp usa o **logo oficial do WhatsApp** (SVG próprio, já que bibliotecas de ícone modernas removeram ícones de marca) — nunca um ícone genérico de balão de conversa.

---

## 5. Cards e blocos

### Card padrão (branco sobre fundo cinza claro)
```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;          /* rounded-2xl */
  padding: 1.5rem;               /* p-6, escala até p-8/p-10 em cards maiores */
}
```

### Bloco de destaque rosa (calculadoras, highlights)
```css
.card-accent {
  background: var(--color-accent-bg);   /* #fdf0f3 */
  border-radius: 12px;
  padding: 1rem 1.25rem;
  text-align: center;
}
```

### Badge de aprovação/confirmação (selo verde)
```css
.badge-success {
  background: var(--color-cta-badge-bg);
  border: 1px solid var(--color-cta-badge-border);
  border-radius: 9999px;         /* pill */
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-cta);
}
```

### Radio pill (seleção estilo botão, usado em formulários de qualificação)
```css
.radio-pill {
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 0.375rem;
  font-size: 0.875rem; font-weight: 700;
  border-radius: 10px;
  padding: 0.625rem 1rem;
  border: 1px solid var(--color-border);
  background: #fff;
  color: var(--color-text);
  cursor: pointer;
  transition: colors 0.2s;
}
.radio-pill.is-checked {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}
.radio-pill:hover:not(.is-checked) { border-color: var(--color-accent); }
```

### Cartão de opção com detalhe (ex: seleção de segmento/categoria)
```css
.option-card {
  display: flex; align-items: flex-start; gap: 0.75rem;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  background: #fff;
  cursor: pointer;
}
.option-card.is-checked {
  background: var(--color-accent-bg);
  border-color: var(--color-accent);
}
/* bolinha de rádio custom dentro do card */
.option-card__dot {
  width: 1rem; height: 1rem; margin-top: 0.125rem;
  border-radius: 9999px; border: 2px solid var(--color-border);
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.option-card.is-checked .option-card__dot { border-color: var(--color-accent); }
.option-card.is-checked .option-card__dot::after {
  content: ''; width: 0.5rem; height: 0.5rem; border-radius: 9999px; background: var(--color-accent);
}
```

---

## 6. Formulários

### Input padrão
```css
.input {
  width: 100%;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: var(--color-text);
}
.input:focus { outline: none; border-color: var(--color-accent); }
```

### Label
```css
.label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.375rem;
}
```

### Mensagem de erro
```css
.field-error { font-size: 0.75rem; color: #dc2626; margin-top: 0.25rem; }
```

### Padrão de formulário multi-etapa (wizard)
Estrutura usada nos formulários de qualificação de lead do projeto:
- Caixa externa: `background: var(--color-bg); border-radius: 16px; padding: 1.5–2rem; border: 1px solid var(--color-border)`
- Cabeçalho do passo: label pequena "Passo X de N" (`--color-text-faint`, uppercase) + título do passo (bold) lado a lado
- Barra de progresso: trilho `height: 6px; background: var(--color-border); border-radius: 9999px`, preenchimento `background: var(--color-accent)`, largura = `(passo atual / total) * 100%`, com `transition: width 0.3s ease-out`
- Navegação: botão "Voltar" (outline) + botão "Próxima etapa"/CTA final (accent ou verde) lado a lado, CTA final sempre `flex: 1`
- **Regra de UX obrigatória** (formulários em etapas, crítico pra mobile):
  - Ao trocar de etapa, rolar a caixa do formulário pro topo **só se ela estiver fora da tela** — nunca rolar se já visível, evita solavanco
  - Se a validação falhar, rolar até o primeiro campo pendente (não até o topo genérico)
  - Ao enviar com sucesso, rolar até a tela de confirmação (ela é bem mais curta que o formulário, senão o usuário acha que não enviou)
  - Toda essa rolagem acontece no clique do botão, nunca dentro de um efeito reativo, e respeitando `prefers-reduced-motion` (rolagem instantânea em vez de suave)

### Máscaras de campo usadas no projeto (replicar em JS puro no tema)
- **Telefone BR**: formata como `(00) 0000-0000` (fixo, 10 dígitos) ou `(00) 00000-0000` (celular, 11 dígitos), progressivamente enquanto digita
- **CPF/CNPJ combinado**: até 11 dígitos vira CPF (`000.000.000-00`); a partir do 12º dígito muda pra CNPJ (`00.000.000/0000-00`)
- **E-mail**: validação por regex simples (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), mensagem de erro só aparece após tentativa de avançar/enviar, não a cada tecla

---

## 7. Layout e espaçamento

```css
:root {
  --container-wide: 1100px;     /* container padrão de seção */
  --container-narrow: 760px;    /* texto corrido, reviews, formulários */
  --radius-sm: 10px;            /* padrão: botões, inputs, cards pequenos */
  --radius-lg: 16px;            /* rounded-2xl: cards, caixas de formulário */
  --radius-xl: 24px;            /* rounded-3xl: blocos hero, destaques grandes */
  --radius-pill: 9999px;        /* badges, pills, avatares */
}

.container-wide { max-width: var(--container-wide); margin-inline: auto; padding-inline: 1rem; }
.container-narrow { max-width: var(--container-narrow); margin-inline: auto; padding-inline: 1rem; }

.section { padding-block: 4rem; }         /* py-16 mobile */
@media (min-width: 768px) { .section { padding-block: 6rem; } }  /* py-24 desktop */
```

**Raio de borda por contexto:**
- Padrão (botões, inputs): `10px`
- Cards, caixas de conteúdo: `16px`–`24px`
- Badges, pills, avatares circulares: `9999px` (full)

---

## 8. Sombras e efeitos

```css
--shadow-card: 0 1px 2px rgba(0,0,0,0.05);              /* shadow-sm, cards estáticos */
--shadow-cta: 0 4px 6px rgba(0,0,0,0.1);                 /* shadow-md, botões CTA */
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);                /* shadow-lg, heróis/destaques */
--shadow-sticky-bar: 0 -4px 20px rgba(0,0,0,0.08);       /* barra fixa no rodapé, sombra pra cima */
```

Efeitos de hover padrão em elementos clicáveis: `filter: brightness(1.1)` + leve `scale(1.02)`; em `:active`, `scale(0.95)`. Transições sempre `all 0.2s ease` (ou `duration-200` no equivalente Tailwind).

---

## 9. Blocos/padrões de seção recorrentes

Esses são os "componentes" reaproveitáveis entre páginas — traduzir cada um pra uma section do Shopify:

| Bloco | Estrutura | Fundo típico |
|---|---|---|
| **Hero** | Eyebrow + H1 + parágrafo + lista de provas rápidas (ícone check + texto) + pills de prova social + CTA + imagem/produto | `--color-bg` |
| **Ticker/marquee de prova social** | Faixa horizontal com scroll infinito (`@keyframes` translateX -50%), texto uppercase separado por `•` | `--color-accent-light` ou escuro pontual |
| **Grade de produtos com abas** | Tabs com indicador deslizante (`position: absolute` + `transition: left/width`), grid 2 col mobile / 4 col desktop, cada item com imagem quadrada + nome + descrição curta | branco |
| **Calculadora interativa** | Slider nativo (`accent-color` no token rosa) + dois números grandes em destaque (resultado) + disclaimer pequeno de "projeção ilustrativa" | `--color-accent-bg` |
| **Cards de diferenciais** | Grid 2–3 col, ícone + label pequeno (accent) + título bold + texto muted | branco |
| **Estatísticas animadas (CountUp)** | Números grandes que sobem de 0 até o valor real ao entrar na viewport, com prefixo/sufixo (`+`, `%`, `/5.0`) | `--color-bg` |
| **Prova social / depoimentos** | Cards com aspas, nome + selo "Verificado" | `--color-accent-bg` |
| **FAQ (accordion)** | Lista com `divide-y`, cada item com pergunta bold + chevron que rotaciona 180° ao abrir, resposta em `--color-text-muted` | `--color-bg` |
| **CTA final** | Fundo escuro com foto (overlay `rgba(13,12,13,0.85)`), texto branco, CTA verde centralizado | imagem + overlay escuro |
| **Barra fixa (sticky bar)** | Fixa no rodapé, aparece após `scrollY > 600px`, `transform: translateY(100%)` → `translateY(0)` com transição, título + subtítulo + CTA | branco com sombra pra cima |
| **Pop-up de saída (exit-intent)** | Modal centralizado, disparado por `mouseout` no topo da tela (`clientY <= 0`) ou scroll-up rápido, com throttle de 5 min via `sessionStorage` (nunca "uma vez só") | overlay `rgba(0,0,0,0.6)` + card branco |

---

## 10. Ícones

- Biblioteca: **Lucide** (contorno, `stroke-width` padrão, tamanhos 14–40px conforme contexto)
- Cor do ícone segue o contexto: accent rosa em labels/destaques, `--color-cta` em confirmações, `--color-text-muted` em textos auxiliares
- **Exceção obrigatória: WhatsApp sempre usa o logo oficial em SVG próprio**, nunca ícone genérico de chat da biblioteca de ícones (Lucide removeu ícones de marca)

---

## 11. Idioma e tom de escrita (aplica-se a qualquer copy nova no Shopify)

- Todo texto visível em **pt-BR**
- **Nunca usar travessão "—"** em texto visível; substituir por vírgula, dois-pontos ou ponto final
- CTA de compra sempre em primeira pessoa ("Quero...", "Garantir...") combinado com verbo de ação
- Eyebrow/label acima de título: curto, maiúsculo, direto (ex: "PRÉ-VENDA DE LANÇAMENTO", "COMO FUNCIONA")

---

## 12. Checklist de implementação no tema Shopify

- [ ] Importar Figtree (400/500/700/800) via Google Fonts ou upload local
- [ ] Criar os custom properties de cor no CSS global do tema (seção 2)
- [ ] Criar classes utilitárias de botão (`.btn-cta`, `.btn-accent`, `.btn-outline`, `.btn-whatsapp`)
- [ ] Criar classes de card/badge/radio-pill (seção 5)
- [ ] Padronizar `border-radius: 10px` em todo botão/input do tema
- [ ] Garantir que **todo CTA de compra use o verde `#3DB85C`**, nunca outra cor
- [ ] Reaproveitar os padrões de seção da tabela da seção 9 como blocos do Shopify (`sections/*.liquid`)
- [ ] Baixar/recriar o SVG oficial do WhatsApp pra qualquer link de canal
- [ ] Aplicar a regra de "sem travessão" em toda copy nova
