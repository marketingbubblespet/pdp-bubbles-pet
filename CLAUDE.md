@AGENTS.md
@CONVENCOES.md
@DESIGN-SYSTEM.md

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
