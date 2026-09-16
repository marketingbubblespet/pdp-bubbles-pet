# Pedido de ajuste no schema · projeto `bubbles-gerador-de-ads` (publicacao.py)

> Enviar este arquivo pra lá. Ele lista só o que o **schema do `.md`** precisa
> ganhar pro gerador de relatório (`pdp-bubbles-pet/scripts/gerar-relatorio.mjs`)
> conseguir mostrar o que o Caio pediu, sem violar a regra "nunca calcular,
> inferir ou completar um número" (PARTE 0.1 do prompt do gerador).

## 1 · `metricas.cps` e `metricas.cpm`

Hoje `metricas` traz: `investimento, vendas, ticket_medio, roas_lc, roas_fc,
roas_assist, ctr, impressoes, sessoes, connect_rate`. Faltam CPS e CPM — o Caio
pediu essas duas colunas na tabela e hoje elas aparecem como "—" porque o
schema não as emite.

```yaml
metricas:
  cps: { valor: 3.28, var_pct: null, meta: 3.0 }   # custo por sessão
  cpm: { valor: 12.45, var_pct: null, meta: null } # custo por mil impressões
```

Mesmo formato `{valor, var_pct, meta}` dos outros campos de métrica.

## 2 · Valor bruto da semana anterior em cada métrica (`anterior`)

O Caio pediu uma coluna "semana anterior" ao lado da "semana analisada" em
cada linha da tabela. Hoje cada métrica só tem `var_pct` (a variação em %), não
o valor absoluto anterior — e calcular o valor anterior a partir do `var_pct`
seria inferir um número que o schema não garante (arredondamento composto,
por exemplo), o que quebra a regra 0.1.

```yaml
metricas:
  investimento: { valor: 1638.56, anterior: 982.19, var_pct: 66.8, meta: null }
  vendas:       { valor: 12, anterior: 8, var_pct: 50.0, meta: null }
  # ... mesmo padrão pra ticket_medio, roas_lc, roas_fc, roas_assist, ctr,
  #     impressoes, sessoes, connect_rate, cps, cpm
```

**Enquanto isso não vier**, o gerador simplesmente não mostra a coluna
"semana anterior" (fica invisível quando nenhuma métrica do item tem
`anterior`) — não quebra, só fica incompleto até o schema trazer o dado.

## 3 · Confirmar: o glossário do frontmatter é só complemento

O gerador agora já embute um glossário de casa completo (ROAS LC/FC/ASSIST,
papel na jornada — completo/fechador/gerador/assistente/colhedor/fraco,
situação — consistente/começou/parou/seco/sem_volume, decisão —
escalar/reduzir/manter/ajustar/pausar, chupim_bom, chupim_ruim, sufocado,
salvo pela venda, thumbstop, piso de significância, janela de análise,
ROAS diluído, MER, CTR, CPM, CPS, Ticket médio, ConnectRate, Frequência,
perda por orçamento/classificação do Google). Isso cobre o que já existia nos
relatórios manuais anteriores.

**O que ainda só vem de lá**: qualquer termo *novo* que a análise da semana
crie (ex: um nome de padrão específico da conta, tipo "X_conta_travada" ou
similar) continua precisando entrar em `glossario:` no `.md`, porque isso é
conhecimento daquela semana, não regra geral da casa.

Se o time de análise perceber que algum termo do "glossário de casa" mudou de
definição (ex: o piso de significância deixou de ser 1.000 impressões), avisar
que o texto embutido no gerador precisa ser atualizado também — ele não lê
`brand/metricas/metas.toml` nem nada parecido, é um texto fixo no script.

## 4 · Nenhuma mudança estrutural pedida

Todo o resto do ajuste pedido pelo Caio (cores, sumário, botões de decisão só
no grupo, bolinha pulsando, ícones de ajuda, export com emoji) foi resolvido
só no **gerador** (`gerar-relatorio.mjs`), sem precisar de nada novo do
`.md`. Não precisa mudar mais nada na geração do relatório além dos itens 1 e
2 acima.
