# Design System Bubbles

Fonte da verdade para estilização. Nenhuma cor, fonte ou espaçamento fora desta página
deve ser usado sem aprovação explícita.

## Fonte
- **Figtree** (Google Fonts), pesos `400`, `500`, `700`, `800`.
- Já configurada em `src/app/layout.tsx`. Não trocar a fonte sem pedir.

## Cores (tokens oficiais)

### Marca
| Token | Hex | Uso |
|---|---|---|
| Rosa Bubbles (accent) | `#E8649A` | Labels, ícones, destaques, texto de ênfase |
| Rosa claro | `#F4CDD4` | Fundos suaves, bordas, barra de anúncio |
| Rosa fundo de seção | `#fdf0f3` / `#fdf2f4` | Fundo de blocos (reviews, cards) |

### Ação (CTA)
| Token | Hex | Uso |
|---|---|---|
| Verde CTA | `#3DB85C` | **Todos os botões de compra** |
| Verde fundo badge | `#f0fdf4` (borda `#bbf7d0`) | Selos de aprovação/confirmação |

### Texto
| Token | Hex | Uso |
|---|---|---|
| Texto principal | `#0F0C0D` | Títulos e texto forte |
| Texto secundário | `#6B7280` | Corpo / parágrafos |
| Texto fino | `#9ca3af` | Legendas, notas de rodapé |

### Neutros e apoio
| Token | Hex | Uso |
|---|---|---|
| Fundo geral | `#F7F7F7` | Fundo das seções (branco oficial da marca) |
| Fundo de card | `#FFFFFF` | Cards e caixas |
| Bordas | `#E5E7EB` | Bordas neutras |
| Estrelas (âmbar) | `#F4A522` | Avaliações |
| Negativo | `red-400` | Coluna "marcas comuns" na comparação |
| Cupom (barra escura) | fundo `#0d0c0d`, texto `#f4cdd4` | Botão de cupom |

## Tipografia (escala)
| Elemento | Classes |
|---|---|
| H1 | `text-3xl md:text-5xl font-extrabold leading-[1.15]` cor `#0F0C0D` |
| H2 | `text-2xl md:text-3xl font-bold` |
| Eyebrow / label | `text-xs font-bold uppercase tracking-widest` cor `#E8649A` |
| Corpo | `text-sm md:text-base font-medium` cor `#6B7280` |

## Botão CTA padrão
```
bg-[#3DB85C] text-white font-bold rounded-[10px]
px-6 md:px-8 py-3 md:py-4
hover:brightness-110 hover:scale-[1.02] active:scale-95
transition-all duration-200
```

## Layout e espaçamento
- Container padrão: `max-w-[1100px] mx-auto px-4`
- Container estreito (texto / reviews): `max-w-[760px]` a `max-w-[800px]`
- Espaçamento de seção: `py-16 md:py-24`
- Raio de borda: `rounded-[10px]` padrão; `xl` / `2xl` em cards e badges; `full` em pílulas

## Regras de uso
1. Nunca inventar cor fora desta paleta.
2. O botão de compra é **sempre verde** (`#3DB85C`). O rosa (`#E8649A`) é accent/destaque, nunca botão de compra.
3. Títulos usam `#0F0C0D`, corpo usa `#6B7280`.
4. Manter consistência visual entre todas as LPs.
