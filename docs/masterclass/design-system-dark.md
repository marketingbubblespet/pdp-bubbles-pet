# Design System — MasterClass (tema escuro "Midnight Luxury & Cosmic Rose")

Fonte da verdade visual para páginas de MasterClass no tema escuro (variantes B / testes A/B).
Não se aplica à LP Essential nem a páginas de MasterClass no tema claro — essas seguem o
`DESIGN-SYSTEM.md` da raiz. Implementação de referência já em código:
`src/components/lp/masterclass-b/` (página viva em `/masterclass/spitz-alemao-b`).

Índice: [1. Cores](#1-cores) · [2. Tipografia](#2-tipografia) · [3. Layout e bordas](#3-layout-e-bordas) ·
[4. Efeitos e brilho](#4-efeitos-e-brilho) · [5. Motion](#5-motion) · [6. Componentes já implementados](#6-componentes-já-implementados) ·
[7. Padrões novos a construir](#7-padrões-novos-a-construir-quando-pedido)

---

## 1. Cores

### Canvas (fundos)
| Token | Hex | Uso | Tailwind |
|---|---|---|---|
| Canvas principal | `#080808` | Fundo base da página, seções de abertura/fechamento | `bg-[#080808]` |
| Superfície secundária | `#111111` | Separar seções, cards de segundo nível | `bg-[#111111]` |
| Superfície elevada | `#1A1A1A` | Cards, modais, inputs, badges que "flutuam" | `bg-[#1A1A1A]` |

### Destaque (accent)
| Token | Hex | Uso | Tailwind |
|---|---|---|---|
| Cosmic Rose | `#F4CDD4` | CTA principal, ícones de destaque, barra de progresso, glow | `text-[#F4CDD4]` / `bg-[#F4CDD4]` |

### Texto
| Token | Valor | Uso | Tailwind |
|---|---|---|---|
| Primário | `#FFFFFF` | Títulos | `text-white` |
| Secundário | `rgba(255,255,255,0.70)` | Parágrafos, corpo de texto | `text-white/70` |
| Terciário | `rgba(255,255,255,0.40)` | Labels, metadados, legendas | `text-white/40` |

## 2. Tipografia

- **Fonte:** mantida a Figtree já configurada no projeto (não trocar para Inter/Outfit sem pedido
  explícito — evita mexer no carregamento de fonte compartilhado do `layout.tsx`).
- **Monospace** (contadores, IDs técnicos): reservado para números de countdown e badges técnicos.

| Elemento | Tailwind |
|---|---|
| H1 / H2 | `font-black text-white tracking-tight` |
| Micro-label / badge | `text-[10px] font-bold text-white/40 uppercase tracking-widest` |
| Corpo | `text-sm text-white/70 leading-relaxed` |
| Elementos técnicos (contador, preço) | `font-mono text-xs text-[#F4CDD4]` |

## 3. Layout e bordas

- **Borda padrão:** `border border-white/5` (contorno quase invisível, efeito "vidro cortado").
- **Borda em hover/foco:** `border-white/10` ou `focus:border-[#F4CDD4]`.
- **Raio de canto:**
  - Inputs e botões secundários: `rounded-xl` (12px)
  - Cards e modais: `rounded-2xl` (cards) ou `rounded-3xl` (fotos/modais grandes)
- **Padding interno:** `p-8` (32px) ou `p-12` (48px) no desktop para cards/bento — nunca "espremido".

## 4. Efeitos e brilho

| Efeito | Tailwind (arbitrary) | Uso |
|---|---|---|
| Aurora / glow ambiente | `shadow-[0_0_20px_rgba(244,205,212,0.2)]` | Botões de CTA, fotos de destaque |
| Glow de sucesso/progresso | `shadow-[0_0_10px_rgba(244,205,212,0.5)]` | Barra de progresso, ícone de play |

## 5. Motion

| Interação | Duração | Tailwind |
|---|---|---|
| Transição completa de tela | 300ms | `transition-colors duration-300` |
| Hover de botão | 150ms | `transition-transform hover:scale-[1.02] duration-150` |
| Foco de input | 200ms | `transition-colors duration-200 outline-none focus:border-[#F4CDD4]` |

Pulse de CTA (usado no sticky bar e CTA final) já está registrado como keyframe `mcb-pulse`,
escopado por página em `<style>` inline (ver `spitz-alemao-b/page.tsx`) — nunca em CSS global.

## 6. Componentes já implementados

Todos em `src/components/lp/masterclass-b/`, prontos para reuso em qualquer nova MasterClass escura:

| Componente | Papel |
|---|---|
| `MasterCtaB` | Botão CTA pill rosa, com glow e opção de pulse |
| `HighlightPriceB` | Realce do valor mínimo de compra dentro de texto corrido |
| `MasterCountdownB` | Contagem regressiva em cards escuros com números mono |
| `MasterHeroB` | Herói com badge de condição de acesso, título, prova social, meta pills |
| `MasterLearnB` | Bloco "o que vai aprender" + "o que recebe" |
| `MasterAudienceB` | Bloco "para quem é / não é" |
| `MasterInstructorB` | Bio do instrutor com foto e tags |
| `MasterDetailsB` | Tabela de logística |
| `MasterAccessB` | Passo a passo, prazo/canais de compra, produtos shoppable |
| `MasterProofB` | Player de YouTube protegido (prévia cronometrada) + galeria de bastidores |
| `MasterFaqB` | Acordeão de perguntas frequentes |
| `MasterFinalCtaB` | CTA final com countdown |
| `MasterFooterB` | Rodapé com links legais |
| `MasterStickyBarB` / `ExitPopupB` | Estímulos de conversão |

Reaproveitados sem alteração (funcionam em qualquer fundo): `CtaLink`, `EventGate`, `trackLead`,
`FloatingWhatsApp` (verde do WhatsApp é cor de marca de terceiro, mantém-se igual).

## 7. Padrões novos a construir (quando pedido)

A referência visual que você trouxe (LP de distribuidor) usa alguns padrões que **ainda não
existem** como componente no projeto. Documentando aqui para quando forem solicitados numa
próxima MasterClass, sem implementar agora:

- **Ticker/faixa de benefícios** — barra rosa fina com texto rolando horizontalmente (mesmo
  padrão do `TopBar.tsx` da LP Essential, adaptado para fundo `#F4CDD4`/texto `#080808`).
- **Cards segmentados por linha de produto** — grid de 3-4 cards escuros, cada um com
  ícone-badge, nome da linha, lista de vantagens (✓) e uma desvantagem/aviso (✕), CTA no rodapé
  do card.
- **Grid bento de benefícios** — 2x2 ou 2x3 cards pequenos (`bg-[#1A1A1A] border-white/5
  rounded-2xl p-6`), ícone + label curto, ao lado de um bloco de texto com título em destaque.
- **Simulador/calculadora (ROI)** — card com input (slider ou campo numérico) à esquerda e
  card de resultado à direita (`font-mono` para os números), recalculando ao vivo.
- **Stats sobre foto** — seção com imagem de fundo escurecida (overlay `bg-black/60`) e uma
  fileira de badges `número + label` sobrepostos.
- **Abas de conteúdo (tabs)** — pílulas clicáveis que trocam o card de conteúdo abaixo (ex:
  "Marketing Ativo", "Suporte Estratégico"), similar ao padrão de accordion do `MasterFaqB`
  mas com troca de conteúdo por clique em vez de expandir.
- **Carrossel de depoimentos** — cards com estrelas, aspas, nome + selo de verificação, setas
  de navegação nas laterais.

Cada um desses, quando pedido, deve seguir os tokens das seções 1-5 acima (mesmas cores,
bordas, raios e motion) para manter consistência entre MasterClasses.
