@AGENTS.md
@CONVENCOES.md
@DESIGN-SYSTEM.md

# Visão geral do projeto

**Leia `README.md` primeiro** (não carrega automaticamente): mapa completo de todas as
LPs/rotas, o que cada uma faz, tema (claro/escuro), onde ficam os dados/textos de cada
página, e como funciona o rastreamento (GTM, dataLayer, formulários). É o ponto de
partida pra entender a estrutura do repositório antes de mexer em qualquer coisa.

# Base de conhecimento da marca

O conhecimento institucional, de produtos e de comunicação da Bubbles está em `docs/brand/`.
NÃO é carregado automaticamente (são arquivos grandes). Ler o arquivo relevante sob demanda:

- `docs/brand/marca.md` — quem é a Bubbles, posicionamento, valores, público, diferenciais, concorrentes
- `docs/brand/tom-de-voz.md` — tom de voz, termos preferidos/proibidos, conformidade legal, taglines
- `docs/brand/personas.md` — as 6 personas de cliente
- `docs/brand/produtos.md` — catálogo completo por linha (PRO, Essential, Xperience, Aurabian, Collora, Sensorial)
- `docs/brand/operacao-banho.md` — diluição, rendimento e passo a passo do banho

Antes de escrever qualquer copy ou criar uma LP de produto: ler `docs/brand/tom-de-voz.md`
e a seção do produto em `docs/brand/produtos.md`. Índice completo em `docs/brand/README.md`.

# Design system das MasterClass (tema escuro)

Para páginas de MasterClass no tema escuro "Midnight Luxury & Cosmic Rose" (variantes B /
testes A/B, ex: `/masterclass/spitz-alemao-b`), a fonte da verdade visual é
`docs/masterclass/design-system-dark.md` — cores, tipografia, bordas, efeitos de glow e motion,
mais a lista de componentes já prontos em `src/components/lp/masterclass-b/`. Não se aplica à
LP Essential nem a MasterClass no tema claro (essas seguem o `DESIGN-SYSTEM.md` da raiz).

# Framework de desenvolvimento (agentes, comandos, skills)

Agentes, comandos `/speckit.*`, skills e regras técnicas adicionais estão em `.claude/agents/`,
`.claude/commands/`, `.claude/skills/` e `.claude/rules/` (visão geral em `docs/framework/README.md`).
Em caso de conflito entre uma regra técnica do framework e o `CONVENCOES.md` deste projeto
(estilo de trabalho, escopo, confirmação antes de agir), **CONVENCOES.md sempre prevalece**.
Os hooks em `.claude/hooks/` foram copiados mas não estão ativados (não estão registrados em
nenhum `settings.json`) — não rodam automaticamente a menos que você peça para ativá-los.

# ⛔ Favicon: sempre a patinha da Bubbles

Regra do gestor (04/11/26). Toda página do site, inclusive as rotas que devolvem HTML pronto (`route.ts`), mostra **a patinha da Bubbles** (preta sobre rosa #F4CDD4). Nunca o triângulo da Vercel, o logo do Next ou qualquer outro símbolo padrão.

- **Fonte única:** `src/app/icon.svg`. O `src/app/favicon.ico` é gerado a partir dele (16 a 256 px) e precisa ser **o mesmo desenho**. Mudou o `icon.svg`, regerar o `.ico`.
- **Por que deu errado antes:** o projeto nasceu do `create-next-app`, que traz um `favicon.ico` padrão da Vercel. Em 25/06/26 entrou o `icon.svg` da marca, mas o `.ico` antigo ficou. As páginas do Next usam o `icon.svg` pelo layout. As rotas `route.ts` (planos, anúncios, relatórios, validação) não passam pelo layout, então o navegador busca `/favicon.ico` e recebia o da Vercel.
- **Página nova em `route.ts`:** não precisa declarar ícone, o `/favicon.ico` já é a patinha. Não criar outro `favicon.ico`, `icon.png` ou `apple-icon` com outro desenho.
- **Conferir antes de dar a página como pronta:** abrir `/favicon.ico` e a página nova; se aparecer outro símbolo, corrigir antes do commit.
