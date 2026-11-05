# Correção pendente · Painel Black November

**Situação:** o painel https://ofertas.bubbles.com.br/planos/indicadores já está ligado às planilhas,
mas **os números estão errados** até a correção abaixo ser aplicada. **Não use o painel para decidir nada até lá.**

---

## O que aconteceu

O painel mostra **cada dia com os números do dia seguinte**:

| No painel aparece | Mas o valor é de |
|---|---|
| 01/11: receita Groomer R$ 6.922,53 | **02/11** |
| 02/11: receita Groomer R$ 17.527,40 | **03/11** |
| 03/11: receita Groomer R$ 15.100,19 | **04/11** |

Os números do **dia 01/11 somem** (R$ 15.959,09 de receita Groomer).

**Por isso os totais não batem com a planilha.** Na consulta de 05/11:

| Indicador | Painel (errado) | Planilha (certo, até 04/11) |
|---|---|---|
| Receita captada Groomer | R$ 39.550,12 | R$ 55.509,21 |
| Faturado no mês | R$ 38.832,98 | R$ 54.762,87 |
| Ritmo da meta | 66% | cerca de 93% |
| Resumo do dia | "Resumo de 03/11" | deveria ser "Resumo de 04/11" |

## Por que aconteceu

A planilha guarda cada data como "meia-noite" **no fuso horário configurado na própria planilha**
(Arquivo > Configurações). Esse fuso é diferente do horário de Brasília. O script convertia a data usando
o horário de Brasília, que está algumas horas atrás: a meia-noite do dia 02 virava 21h do dia 01. Com isso,
cada linha caía no dia anterior.

O teste feito antes da instalação não pegou esse erro porque usou os arquivos exportados em CSV, em que a
data vem como texto ("01/11/2026") e não como data.

**Correção:** o script agora lê as datas no fuso da própria planilha. A versão corrigida já está em
`docs/indicadores/apps-script/Codigo.gs` (e no zip `painel-black-november-passagem.zip`).
**O site não precisa de nenhuma mudança.**

---

## O que fazer (cerca de 5 minutos)

Use a conta Google que instalou o script.

1. Abra **script.google.com** e entre no projeto **Painel Black November**.
2. Abra o arquivo **Código.gs**, apague todo o conteúdo e cole o conteúdo do `Codigo.gs` corrigido. Salve (Ctrl+S).
3. Publique a nova versão **mantendo o mesmo link**:
   **Implantar > Gerenciar implantações > lápis (editar) > Versão: Nova versão > Implantar**.
   - **Não** use "Nova implantação": ela gera um link novo, e aí seria preciso trocar o `SHEETS_SCRIPT_URL` no Netlify.
4. No menu suspenso de funções, rode **instalarGatilhos**. O registro deve mostrar "Gatilhos instalados: 5".
   Sem esse passo, o painel não atualiza sozinho e continua mostrando "Atualização manual feita: —".
5. Rode **testarConfiguracao** e confira, no registro de execução:
   - a linha de exemplo das duas planilhas deve começar em `2026-11-01` com os números do dia 01
     (Groomer: receita 15959.09, pedidos 22)
   - "Conexão com o site: OK"

## Como conferir que ficou certo

Abra o painel (cerca de 1 minuto depois, ou force rodando `atualizacaoNoturna`) e confira na tabela "Dia a dia":

| Dia | Receita Groomer esperada | Pedidos Groomer |
|---|---|---|
| 01/11 | R$ 15.959,09 | 22 |
| 02/11 | R$ 6.922,53 | 16 |
| 03/11 | R$ 17.527,40 | 31 |
| 04/11 | R$ 15.100,19 | 19 |

Se bater, está corrigido. O card de receita (soma das duas lojas) deve passar de R$ 55 mil.

---

## Outras pendências (não urgentes)

1. **Senha aceitar maiúscula e minúscula:** o arquivo `src/app/planos/login/actions.ts` foi alterado para
   aceitar "Mariane" e "mariane". Falta o **commit e push** (o Gabriel faz). Até lá, a senha é exatamente
   como está no Netlify.
   - No mesmo commit, **não incluir** `src/lib/anuncios-black-november.ts` e
     `src/lib/plano-meta-black-november.ts`: estão alterados, mas não fazem parte deste trabalho.
2. **"Atualização manual feita: —"** só passa a mostrar a hora depois do passo 4 e da próxima edição na planilha.
3. **Horário do Adveronix:** o script atualiza os dados automáticos às 11h, porque o Adveronix importa às 10h30.
