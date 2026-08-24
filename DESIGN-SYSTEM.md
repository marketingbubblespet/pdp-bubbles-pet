# Design System Bubbles

Fonte da verdade para estilização. Nenhuma cor, fonte ou espaçamento fora desta página
deve ser usado sem aprovação explícita.

> Atualizado em 2026 a partir de uma extração do HTML renderizado da PDP mais vendida
> em produção (www.bubbles.com.br), pra alinhar o que documentamos aqui com o que
> realmente está no ar na loja. Ver `docs/design-system-extraction-shopify.md` para a
> versão traduzida em CSS puro (custom properties), pensada pra reuso no tema Shopify.

## Fonte
- **Poppins** (Google Fonts), pesos `400`, `500`, `600`.
- **Lobster Two** (Google Fonts) como fonte decorativa, uso pontual (ex: assinatura/destaque
  de marca) — não é fonte de corpo nem de título.
- Configuradas em `src/app/layout.tsx`. Não trocar a fonte sem pedir.
- `Figtree` foi **descontinuada**: não está em uso em lugar nenhum do site em produção.

### Peso tipográfico (regra da marca: nunca usamos bold)
| Peso | Uso |
|---|---|
| `400` regular | Corpo de texto |
| `500` medium | **Títulos** (h1 a h6) — peso padrão de título |
| `600` semibold | Ênfase máxima (preço, CTA, destaque) |
| `700` bold | **PROIBIDO** |
| `800` / `900` extrabold / black | **PROIBIDO** |

Carregar apenas os pesos `400`, `500` e `600` da Poppins. Nunca usar `font-bold`,
`font-extrabold` ou `font-black` no Tailwind — usar `font-medium` (título) ou
`font-semibold` (ênfase).

## Cores (tokens oficiais)

### Marca
| Token | Hex | Uso |
|---|---|---|
| Rosa Bubbles (accent) | `#E8649A` | Labels, ícones, destaques, texto de ênfase |
| Rosa claro (primária) | `#F4CDD4` | Fundos suaves, bordas, barra de anúncio — cor da linha Essential |
| Rosa fundo de seção | `#FDF2F4` / `#FCEEF1` | Fundo de blocos (reviews, cards) |
| Marca escura | `#0D0C0D` | Texto principal / preto de marca |

### Ação (CTA)
| Token | Hex | Uso |
|---|---|---|
| Verde CTA | `#3DB85C` | **Todos os botões de compra, e só isso.** Nunca usar como decoração. |
| Verde fundo badge | `#f0fdf4` (borda `#bbf7d0`) | Selos de aprovação/confirmação |

### Texto
| Token | Hex | Uso | Ressalva de contraste |
|---|---|---|---|
| Texto principal | `#0D0C0D` | Títulos e texto forte | — |
| Texto secundário | `#666666` | Qualquer texto que o usuário precise **ler** (corpo, parágrafos) | Passa em WCAG AA |
| Texto mudo | `#888888` | Texto **≥18px**, legenda grande ou elemento decorativo | Sobre branco dá ~3.5:1 — **reprova WCAG AA em texto pequeno** (mínimo 4.5:1). Nunca usar abaixo de 18px. |

### Neutros e apoio
| Token | Hex | Uso |
|---|---|---|
| Fundo geral | `#F7F7F7` | Fundo das seções (branco oficial da marca) |
| Fundo de card | `#FFFFFF` | Cards e caixas |
| Bordas | `#E5E7EB` | Bordas neutras |
| Estrelas (âmbar) | `#F4A522` | Avaliações |
| Negativo | `red-400` | Coluna "marcas comuns" na comparação |
| Cupom (barra escura) | fundo `#0D0C0D`, texto `#F4CDD4` | Botão de cupom |

### Cores das linhas de produto
| Linha | Hex | % receita últimos 90 dias |
|---|---|---|
| Essential | `#F4CDD4` | 57% — carro-chefe, coerente com receber o rosa da marca |
| Pro (EGO) | `#0D0C0D` | 32% |
| Xperience | `#C8A96E` | 5% |
| Collora | `#B066C6` | sem venda no top 10 recente |

## Tipografia (escala)
| Elemento | Classes |
|---|---|
| H1 | `text-3xl md:text-5xl font-medium leading-[1.15]` cor `#0D0C0D` |
| H2 | `text-2xl md:text-3xl font-medium` |
| Eyebrow / label | `text-xs font-semibold uppercase tracking-widest` cor `#E8649A` |
| Corpo | `text-sm md:text-base` peso `400` cor `#666666` |
| Preço / CTA / destaque | peso `600` |

## Botão CTA padrão
```
bg-[#3DB85C] text-white font-semibold rounded-[12px]
px-6 md:px-8 py-3 md:py-4
min-height: 44px
hover:brightness-110 hover:scale-[1.02] active:scale-95
transition-all duration-200
```
Altura mínima de **44px** em qualquer CTA (alvo de toque confortável no mobile, lei de Fitts).

## Layout e espaçamento
- Largura máxima de página: `1400px`
- Container padrão: `max-w-[1100px] mx-auto px-4`
- Container estreito (texto / reviews): `max-w-[760px]` a `max-w-[800px]`
- Espaçamento de seção: `py-16 md:py-24`

### Raio de borda (escala completa)
| Tamanho | Uso |
|---|---|
| `4px` | Chip, tag |
| `12px` | **Padrão** — botão, input, card |
| `20px` | Card destacado |
| `40px` | Bloco hero / seção pill |

> Nota: o site em produção força `border-radius: 0 !important` nos botões atualmente.
> Essa é uma **dívida técnica registrada do lado da loja**, não uma mudança no Design
> System. O padrão documentado continua `12px` — é a loja que vai migrar pra ele.

## Sombra e motion
- `--shadow-card: 0 2px 8px rgba(0,0,0,0.07)`
- Durações padrão: `150ms` (micro-interação) / `250ms` (padrão) / `400ms` (transição maior)
- Sempre respeitar `prefers-reduced-motion` — quem ativa "reduzir movimento" no sistema
  recebe transições/scrolls instantâneos, sem animação.

## Regras de aplicação
1. **Nunca hex solto** — sempre usar via token.
2. **Verde `#3DB85C` só em botão de compra**, nunca como decoração ou destaque de texto.
3. **Peso 700+ é proibido.** Título usa `500`, ênfase usa `600`.
4. **`#888888` só em texto ≥18px**; qualquer texto de leitura usa `#666666`.
5. **CTA com no mínimo 44px de altura.**
6. **Respeitar `prefers-reduced-motion`** em toda animação/transição/scroll.
7. Manter consistência visual entre todas as LPs do tema claro.

## Contexto do negócio
A Bubbles vende para **banho e tosa profissional**, não para o tutor final. Isso é
confirmado pelos dados reais da loja:
- Top 10 de vendas = galões de 5L concentrados, com diluição 1:5 e 1:10
- A PDP fala em "custo por banho", "guia de diluição", "quantos banhos rendem uma
  embalagem de 5L", "indicado para uso profissional no banho e tosa"
- Ticket médio de R$ 228 a R$ 1.463

**O vocabulário de qualquer copy nova, exemplo de componente ou placeholder deve
refletir isso**: rendimento, diluição, custo por banho, protocolo — nunca "seu pet"
(esse tom é do consumidor final, não do profissional que compra pra revenda/uso no
salão).

## Escopo deste documento
Este Design System cobre o **tema claro** da Bubbles (Essential, Care, Live Care e
demais LPs de captação claras). LPs de MasterClass, a Live "Dia do Tosador" e a página
Pet South seguem um sistema visual escuro à parte ("Midnight Luxury & Cosmic Rose"),
documentado em `docs/masterclass/design-system-dark.md` — não misturar os dois.
