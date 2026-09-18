# Pedido de ajuste no schema · projeto `bubbles-gerador-de-ads` (publicacao.py)

> Enviar este arquivo pra lá. Ele lista só o que o **schema do `.md`** ou a
> **lógica de geração da análise** precisam mudar. Tudo que dava pra resolver
> só na exibição (`pdp-bubbles-pet/scripts/gerar-relatorio.mjs`) já foi
> resolvido daquele lado e não está aqui.

---

## ✅ Já resolvido (confirmado no `.md` de 16/09)

`metricas.cps`, `metricas.cpm` e `metricas.<x>.anterior` já vêm no schema,
exatamente no formato pedido. Nada a fazer.

---

## 1 · `id` duplicado quando o export não quebra por campanha/conjunto

No `.md` de 16/09, quando o canal não tem quebra por campanha (nome tipo
"Bubbles Meta — consolidado da conta..."), **todos os itens do canal
receberam o mesmo `id`** — 55 vezes o mesmo id no Meta, 35 vezes no Google
(campanha, cada conjunto e cada anúncio, todos iguais).

Isso é grave porque o `id` vira a chave do estado de decisão no
`localStorage` do relatório: decidir um item decidiria **todos** os outros
que compartilham o id, sem o usuário perceber. O gerador já se defende disso
sozinho (desduplica automaticamente), mas o ideal é o `id` nascer único —
sugestão: incluir o nível (`campanha`/`conjunto`/`anuncio`) e um índice
sequencial no id gerado quando não houver nome real pra derivar o slug, em
vez de reusar o mesmo slug truncado em todos os níveis.

## 2 · `texto:` que começa com "- " quebra o parser YAML

No mesmo arquivo, em `auditoria`, quatro entradas têm `texto:` começando com
`- ` (ex: `texto: - **\`ctr\`** · 5 linha(s) fora da faixa...`). Sem aspas,
YAML interpreta isso como início de lista, não como texto, e o parser quebra
(`YAMLException: bad indentation of a sequence entry`).

O gerador corrige isso sozinho antes de parsear, mas o ideal é a geração já
colocar aspas em qualquer `texto:` cujo valor comece com `- `, `* `, `: ` ou
outro caractere especial de YAML.

## 3 · Nome de campanha ausente quando o export não quebra por campanha

Quando o export não traz a hierarquia grupo→campanha, a campanha vira um
único item "consolidado da conta" e o **nome real de cada campanha some**. O
gerador não tem como recuperar isso: não existe, em nenhum lugar do `.md`,
uma tabela campanha↔conjunto que permita somar os conjuntos e "adivinhar" de
qual campanha cada um veio — isso exigiria dado que hoje não está no export
(mapeamento de conta do Meta/Google Ads Manager). Se o time de análise tiver
acesso a esse mapeamento por outro caminho (export separado, API), valeria
trazer no `.md` como um campo `campanha_real` em cada conjunto, mesmo que a
campanha "container" continue sendo o consolidado.

## 4 · `acao` genérico demais quando `tipo_acao: ajustar`

Muitos itens vêm com `acao: "⚙ Ajustar"` sem dizer o quê — o Caio comentou
"não dá pra saber se é pausar, reduzir verba, etc". O gerador agora mostra
`causa_raiz` junto (que já existe no schema e ajuda), mas o ideal é `acao`
trazer a recomendação concreta sempre que o sistema de análise já souber
qual é, por exemplo `"↓ Reduzir verba em 30%"` ou `"✕ Pausar (sem entrega
há 14 dias)"`, reservando "⚙ Ajustar" só pra quando a causa exige mudança
estrutural (criativo, público) que não é "escalar/reduzir/pausar".

## 5 · `motivos[]` não diz qual ROAS

Frases como `"ROAS 0.00x vs. meta 2.00x"` não dizem se é LC, FC ou ASSIST —
o Caio pediu pra sempre especificar. Pedido: todo motivo que cite ROAS já
sair com a sigla (`"ROAS LC 0.00x vs. meta 2.00x"`), e quando fizer sentido,
mencionar se os outros dois modelos (FC/ASSIST) sustentam algo ou não.

## 6 · `opcoes` não populado em itens `tipo_acao: decidir`

O schema já previa (versões anteriores) um campo `opcoes` com as alternativas
concretas quando a ação é "decidir" (ex: "dar verba de teste" vs
"desativar"). No `.md` de 16/09 esse campo não aparece em nenhum item
`decidir` — sem ele, a página só mostra `causa_raiz` e `motivos`, sem indicar
as alternativas reais. Pedido: voltar a popular `opcoes: [{id, texto}]` nesses
itens, ou, se o campo foi descontinuado de propósito, confirmar isso pra
tirar a menção dele da documentação do gerador.

## 7 · Notas metodológicas dentro do `nome`

Nomes como `"...consolidado da conta (chupim/concentração desconsiderado a
pedido do gestor)"` embutem uma nota de metodologia dentro do campo `nome`.
O Caio pediu pra isso nunca aparecer ali — o nome deveria ser só o nome. O
gerador já tem um lugar pronto pra esse tipo de nota, uma seção nova
**"Considerações desta análise"**, que só falta o schema alimentar:

```yaml
consideracoes:
  - "Chupim/concentração desconsiderado nesta campanha a pedido do gestor."
  - "..."
```

Array de strings simples, no nível raiz do `.md` (mesmo nível de `glossario`,
`ressalvas`, etc). Pedido: mover qualquer nota parentética que hoje vai
dentro de `nome` pra esse array.

## 8 · Flag explícita para "consolidado" (em vez do gerador adivinhar pelo nome)

O gerador agora detecta "isso é um consolidado sem quebra" checando se o
`nome` contém a string "consolidado da conta" — funciona, mas é frágil (muda
o texto do nome, quebra a detecção). Pedido: um campo booleano explícito,
por exemplo `consolidado: true`, em vez de depender do texto do nome.

## 9 · Flags para "pausado" / "sem dados no período"

O gerador agora agrupa automaticamente conjuntos/anúncios sem nenhum
investimento nem impressão num bloco à parte ("sem dados neste período"),
mas não sabe **por quê** — pode ser pausa, pode ser item novo que ainda não
rodou, e o schema não distingue os dois casos. Pedido: dois campos por item,
`pausado: true|false` e `pausado_em: <data ou null>`, pra o relatório poder
dizer "pausado desde 10/09" em vez de só "sem dados".

## 10 · `thumbstop` não preenchido nos pódios

Vários colocados de pódio vêm com `thumbstop: null` mesmo sendo vídeo (onde
thumbstop deveria existir). Conferir se a coluna está vindo vazia do export
da Nemu, como já é o caso documentado pra "Visualização de vídeo P50" em
relatórios anteriores.

## 11 · Confirmar: ROAS sempre da Nemu, nunca nativo da plataforma

O Caio pediu explicitamente: "quando for tratar de ROAS, use somente a Nemu
como base, os ROAS do Google Ads e Meta Ads são errados, eles inflam". Os
campos `metricas.roas_lc/fc/assist` já parecem ser sempre Nemu (os motivos
que citam "plataforma reporta Xx" tratam isso como comparação/ressalva, não
como fonte da métrica principal) — só pedindo a confirmação formal de que
isso nunca muda, pra não precisar reconferir relatório a relatório.

## 12 · `hierarquia: {}` vazio e formato real de `conciliacao`

Dois ajustes pequenos de contrato, já corrigidos do lado do gerador, só
documentando pra manter os dois lados alinhados:

- `hierarquia` veio como objeto vazio (`{}`) quando não há reconstrução pra
  medir. O gerador agora só mostra o bloco quando `hierarquia.cobertura`
  existe — se `{}` for sempre o valor "nada a mostrar", tudo certo, só
  confirmando que é isso mesmo (e não um campo que deveria ter vindo
  preenchido e não veio).
- `conciliacao[]` usa os campos `a`, `b`, `fecha`, `causa` (mais simples do
  que o `rotulo_a`/`rotulo_b`/`diferenca`/`diferenca_pct`/`confianca`/
  `solucao` do primeiro exemplo do prompt original). O gerador já lê esse
  formato real — só registrando que esse é o contrato estável.

---

## Resumo pra priorizar

**Mais importante:** itens 1 e 2 (afetam a geração quebrar ou os dados se
misturarem) e item 7 (o Caio pediu isso de forma bem direta).
**Bom ter:** itens 3 a 6, 8 e 9 (deixam a leitura bem mais clara).
**Confirmação/registro:** itens 10, 11 e 12 (não bloqueiam nada hoje).
