# Bubbles Pet — Landing Pages (lp-bubbles)

Coleção de landing pages de marketing da **Bubbles Pet** (cosméticos pet profissionais,
banho e tosa). Cada rota é uma LP **independente**, com seu próprio conjunto de dados,
componentes e, em alguns casos, tema visual. Não é um site institucional único, é um
conjunto de páginas de captação/venda publicadas separadamente.

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4
- **Deploy:** Netlify, domínio `ofertas.bubbles.com.br`
- **Formulários:** Netlify Forms (`public/__forms.html`) + CRM Sellum (webhook direto)
- **Rastreamento:** módulo central `src/lib/tracking.ts`, containers GTM por página

> **Se você é uma IA abrindo este projeto pela primeira vez:** os arquivos `CLAUDE.md`,
> `AGENTS.md`, `CONVENCOES.md` e `DESIGN-SYSTEM.md` na raiz **carregam automaticamente**
> no contexto de sessões Claude Code — leia-os primeiro, eles têm prioridade sobre
> qualquer instrução genérica. Este README é um mapa geral; as convenções de como
> trabalhar (escopo, confirmação antes de agir, isolamento entre páginas) estão em
> `CONVENCOES.md`, e são a regra de ouro deste repositório.

---

## 1. O que é cada arquivo de instrução na raiz

| Arquivo | Conteúdo |
|---|---|
| `CLAUDE.md` | Índice: importa os outros 3 abaixo + aponta pra `docs/brand/` e pro design system escuro |
| `AGENTS.md` | Aviso de que essa versão do Next.js pode divergir do que a IA já sabe por treino |
| `CONVENCOES.md` | **A mais importante.** Estilo de trabalho: escopo cirúrgico, confirmação antes de agir, isolamento entre LPs, regras de negócio (preço/GTM/UTM), padrão de formulário multi-etapa, regras de rastreamento (dataLayer) |
| `DESIGN-SYSTEM.md` | Cores, tipografia, espaçamento do **tema claro** (Essential, Care, Live Care, Captação clara) |
| `docs/masterclass/design-system-dark.md` | Mesma função, mas pro **tema escuro** "Midnight Luxury & Cosmic Rose" (MasterClass, Live Dia do Tosador, Pet South) |

---

## 2. Mapa de páginas (as "vertentes")

Cada LP tem um objetivo de negócio diferente. `/` (a home) não é a página pública real
do site, é um **mapa interno de navegação** protegido por senha, útil pra achar todas
as LPs publicadas — atualizado a cada página nova (`CONVENCOES.md` regra 22).

| Rota | Linha/produto | Tema | Objetivo | Formulário/CRM |
|---|---|---|---|---|
| `/essential` | Essential | claro | PDP principal (compra direta) | não |
| `/care` | Care | claro | Captação de revenda B2B (petshop/distribuidor) | sim, Netlify + Sellum |
| `/care-b` | Care | claro | **Variante de teste A/B** da `/care`, foco B2B mais direto (ver seção 6) | sim, mesmo form da A |
| `/captacao` | multi-linha | **escuro** | Captação de distribuidor | sim, Netlify + Sellum |
| `/pet-south` | multi-linha | **escuro** | Captação de distribuidor (evento PET South America) | sim, Netlify + Sellum |
| `/live-care` | Care | claro | Captura de contato pra live de lançamento (WhatsApp) | não (WhatsApp) |
| `/live-dia-do-tosador` | institucional | **escuro** | Captura pra live "Dia do Tosador" (WhatsApp) | não (WhatsApp) |
| `/masterclass/spitz-alemao` | PRO | **escuro** | Venda de acesso a aula (compra na Shopify libera acesso) | não |
| `/masterclass/spitz-alemao-b` | PRO | **escuro** | Variante de teste A/B da anterior | não |
| `/masterclass/rostinho-bebe` | PRO | **escuro** | Mesma mecânica, outra aula/tema | não |

**Convenção de variante de teste A/B:** sufixo `-b` na rota, `robots: { index: false }`
no `metadata`, listada na home com label deixando claro que é teste.

---

## 3. Isolamento entre páginas (regra mais importante do repo)

Cada LP só toca em `src/app/<lp>/` e `src/components/lp/<lp>/`. **Nunca** compartilha
arquivo de dados entre produtos diferentes. Isso está em `CONVENCOES.md` regra 14-19,
mas o padrão físico é:

```
src/app/<lp>/page.tsx              ← composição da página (importa os blocos, define metadata)
src/app/<lp>/opengraph-image.tsx   ← imagem de compartilhamento gerada por código
src/lib/<lp>.ts                    ← TODOS os dados/textos daquela LP (preço, copy, links)
src/components/lp/<lp>/*.tsx       ← os blocos visuais daquela LP, só ela usa
```

**Arquivos compartilhados** (zona protegida, regra 15/16 do `CONVENCOES.md`, só mexer
com ordem explícita): `src/lib/tracking.ts`, `src/lib/utm.ts`, `src/lib/constants.ts`,
`src/components/ui/*`, `src/app/layout.tsx`, `src/app/globals.css`,
`public/__forms.html`, `netlify.toml`.

Quando uma LP precisa de uma variante de teste (`-b`), o padrão é: pasta nova
(`src/app/<lp>-b/`, `src/components/lp/<lp>-b/`), reaproveitando por import direto os
blocos da versão A que não mudam, e copiando/adaptando só o que muda. Ver
`docs/care/planejamento-codigo-care-b.md` como exemplo real desse processo.

---

## 4. Onde estão as "variáveis" de cada página

Não existe `.env` com segredo de produto — cada LP guarda seus próprios dados como
constantes TypeScript exportadas em `src/lib/<lp>.ts` (ou `<lp>-b.ts` pra variante).
Isso inclui:

- **Preço, cupom, mensagens de WhatsApp** (regra 25/26 do `CONVENCOES.md`: não mexer
  sem confirmar, é dado sensível de negócio)
- **Copy de cada seção** (títulos, textos, FAQ, depoimentos)
- **Links de compra Shopify, número de WhatsApp, faixas de investimento do formulário**

Segredos técnicos (token do Sellum, IDs de GTM) ficam **hardcoded dentro do componente
de formulário/página de cada LP** (ex: `SELLUM_TOKEN` em `CareForm.tsx`), não em
variável de ambiente — são tokens de webhook público por design do Sellum, não chaves
de infraestrutura. Container GTM é declarado por `<GtmScript id="GTM-..."/>` dentro de
cada `page.tsx` (ver seção 5).

---

## 5. Rastreamento (GTM, dataLayer, formulários)

Documentação completa em **`docs/tracking.md`** — leia antes de mexer em qualquer
formulário ou evento. Resumo:

- **GTM é carregado manualmente por página**, não existe injeção automática por rota.
  Todo `page.tsx` novo precisa do `<GtmScript id="..."/>`. Dois containers em uso:
  `GTM-N4PHK6DM` (nosso, padrão pra LP nova) e `GTM-5L9TD3PN` (de outro fornecedor, só
  nas páginas que já usam — nunca mexer nesse container nem migrar página pra fora dele
  sem confirmar). Mapa completo em `CONVENCOES.md` regra 42.
- **Todo evento de dataLayer passa por `src/lib/tracking.ts`**, o único módulo que toca
  `window.dataLayer`. Nunca chamar `window.gtag`/`window.fbq` direto num componente.
- **Nomes de evento têm nível** (Nível 1 = conversão de mídia paga, só pra candidatura
  de distribuidor gravada no CRM; Nível 2 = lead leve; Nível 3 = engajamento). Tabela
  completa em `docs/tracking.md`. Publicar `lead_form_submitted` fora do Nível 1 infla
  conversão de anúncio real.
- **Todo formulário** usa `createLeadId()` pra gerar um ID determinístico (nunca
  `crypto.randomUUID()`), que vira `event_id` do lead e viaja no payload do Netlify e
  do Sellum — é o que permite deduplicar Google/Meta entre navegador e servidor.
- **`public/__forms.html`** precisa declarar todo campo que um formulário envia pro
  Netlify. Campo não declarado é descartado **em silêncio**, sem erro — causa clássica
  de "por que esse dado não chegou no painel".
- **`src/components/ui/WhatsappGate.tsx`**: modal curto (nome, WhatsApp, e-mail, perfil,
  todos opcionais) que algumas LPs abrem antes de liberar o link de WhatsApp, capturando
  contato mesmo sem formulário completo. Publica `whatsapp_gate_submitted` (Nível 2).

---

## 6. Testes A/B em andamento

| Par | Estado | Docs |
|---|---|---|
| `/masterclass/spitz-alemao` vs. `-b` | Ativo | tema escuro, mesma mecânica de compra |
| `/care` vs. `/care-b` | Ativo | ver `docs/care/plano-lp-care-b.md` (diagnóstico e decisões aprovadas) e `docs/care/planejamento-codigo-care-b.md` (mapa de arquivos/blocos) |

---

## 7. Base de conhecimento da marca

Não carrega automaticamente (arquivos grandes). Ler sob demanda antes de escrever copy
nova, per `CLAUDE.md`:

- `docs/brand/marca.md` — posicionamento, valores, público, concorrentes
- `docs/brand/tom-de-voz.md` — tom de voz, termos proibidos/preferidos, compliance legal
- `docs/brand/personas.md` — as 6 personas de cliente
- `docs/brand/produtos.md` — catálogo completo por linha (PRO, Essential, Xperience,
  Aurabian, Collora, Sensorial, Care)
- `docs/brand/operacao-banho.md` — diluição, rendimento, passo a passo do banho

---

## 8. Comandos

```bash
npm run dev      # servidor local (não subir sem o usuário pedir, CONVENCOES.md regra 36)
npm run build    # obrigatório rodar antes de dizer que uma tarefa está pronta
npm run lint     # eslint
npx tsc --noEmit # checagem de tipos isolada
```

Deploy é via push pro Netlify (o usuário decide quando publicar — nunca fazer commit,
push ou build de produção sem pedido explícito, `CONVENCOES.md` regras 11-13).
