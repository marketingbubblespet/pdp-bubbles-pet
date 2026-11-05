# Painel de Indicadores Black November · Passagem de bastão

Este documento explica o que foi construído, onde está cada coisa e o que falta fazer.
Depois de ler, siga o `guia-instalacao-apps-script.md`, que tem o passo a passo da instalação.

---

## 1. O que é

É um painel interno, protegido por senha, para a equipe acompanhar **todos os dias** os resultados da
**Black November 2026** da Bubbles. A ideia é que a equipe abra uma página e entenda em segundos
se estamos bem ou mal, o que caiu e o que fazer.

- **URL:** https://ofertas.bubbles.com.br/planos/indicadores
- **Senha:** a mesma de toda a área `/planos` (variável `RELATORIO_SENHA` no Netlify). Peça ao Gabriel.
- **Período:** só novembro de 2026 (aba `NOV26`). Depois de 01/12 o painel fica parado com os dados finais.
- **Público:** Gabriel (checagem) e a equipe (acompanhamento).

## 2. De onde vêm os dados

São duas planilhas Google da consultoria Diego Santana, na aba **NOV26**:

| Planilha | Loja | Link |
|---|---|---|
| Acompanhamento Diário · Bubbles **B2B** | **Groomer** (profissional) | https://docs.google.com/spreadsheets/d/1FQv40SQNB5iIG2sh-FTnASGYVqYs0qANW7_KRPRdNPg/edit |
| Acompanhamento Diário · Bubbles **B2C** | **Tutor (Care)** | https://docs.google.com/spreadsheets/d/1YwORrKs1goSxIxaLBZAPI3nwci1HmERs6cgqe0Z_XRI/edit |

Na tabela diária de cada planilha, o cabeçalho fica na linha 13 e os dias 01 a 30/11 nas linhas 14 a 43. As colunas usadas são:

| Dado | Coluna (cabeçalho) | Como entra |
|---|---|---|
| Receita captada | K "Receita Captada" | **manual** (o Gabriel preenche a partir da Shopify, nos dias úteis entre 10h e 11h; o fim de semana entra na segunda) |
| Receita faturada | L "Receita Faturada" | manual |
| Pedidos | P "Pedidos Captados" | manual |
| Clientes novos e recorrentes | T e U | manual (ainda vazios) |
| Sessões | AH "Sessões Totais" | automático (Adveronix, **10h30**) |
| Investimento Meta | AT "Invest. Total Meta" | automático |
| Investimento Google | BH "Investimento", no bloco Google Ads | automático (a Care ainda não tem Google, fica 0) |

O script encontra as colunas **pelo nome do cabeçalho**, não pela letra.

## 3. Como funciona (arquitetura)

```
Planilhas (B2B + B2C, aba NOV26)
        |  o script só lê
        v
Apps Script único (Codigo.gs, roda na conta do Gabriel)
  - doGet: entrega os dados em JSON ao site (com chave)
  - ao editar / de hora em hora / 11h: avisa o site que mudou
  - 12h em dias úteis: e-mail de resumo ou de "aguardando preenchimento"
        |
        v
Site Next.js (Netlify) · /planos/indicadores
  - busca os dados no servidor (a chave nunca vai para o navegador)
  - guarda em cache por até 1h; o aviso do script expira o cache na hora
```

**Depois de instalado, ninguém precisa mais dar git para atualizar os números.** Basta preencher a planilha.

E-mails vão para **gabriel@bubbles.com.br** e **mariane@bubbles.com.br**. Não há e-mail no sábado nem no domingo, e o e-mail de segunda cobre sexta, sábado e domingo.

## 4. Como ficou a página (de cima para baixo)

1. **Selo "Bubbles BLACK november"**, compacto, num fundo escuro.
2. **Cabeçalho:** "Novembro 2026" e "Atualização manual feita: dd/mm às hh:mm".
3. **Resumo do dia:** receita de ontem, variação contra a média e contra o mesmo dia da semana anterior,
   % do ritmo da meta e nº de alertas **negativos**. Embaixo vem a linha "Dados preenchidos: receita até X, ROAS até Y…".
4. **Meta de faturamento:** R$ 560 mil, somando Groomer e Tutor.
   - Barra animada, com um traço que marca onde deveríamos estar até ontem.
   - Selo: Dentro / Atenção / Fora do esperado.
   - Blocos "Do esperado até ontem" e "Do total do mês", com a projeção de fechamento.
   - O esperado segue a **curva da Black**: dia comum vale 1; os dias 10, 11 e 12 valem 1,3, 2,5 e 1,3; os dias 27, 28, 29 e 30 valem 3, 2,5, 2 e 2,5.
5. **9 cards:** Receita, Pedidos, Ticket, Sessões, Tx. de conversão, % Aprovação, Investimento, ROAS e Clientes.
   - Todos somam Groomer + Tutor, **menos a % de aprovação**, que é só do Groomer.
   - Passando o mouse no card, aparece a divisão por loja.
   - O ícone "i" explica cada indicador em linguagem simples.
   - Selo de alerta comparando com as metas da planilha B2B: aprovação 93,3%, conversão 2,8%, ROAS 12 e ticket R$ 350.
     - **No alvo:** igual ou acima da meta.
     - **Abaixo:** de 85% a 99% da meta.
     - **Muito abaixo:** menos de 85% da meta.
   - Quando a taxa não usa todos os dias, aparece "considera até dd/mm".
6. **Dia a dia:** tabela no computador e um card por dia no celular.
   - Os dias preenchidos ficam em negrito, e o dia de hoje fica destacado com "preenchendo".
   - O que falta aparece como skeleton.
   - A coluna CPA (investimento ÷ pedidos) aparece só aqui.
7. **Detalhes de alerta** (fechado, abre com um clique):
   - Compara cada dia com o dia anterior, com a média e com o mesmo dia da semana anterior.
   - **Verde** = alta boa. **Vermelho ou âmbar** = queda.
   - Cada alerta tem "Possíveis causas" e "O que fazer".
8. **3 gráficos por dia:** receita, pedidos e investimento.
9. **Avisos:**
   - Em amarelo: "ainda não há campanhas da LINHA CARE dedicadas à Black".
   - Fonte dos dados.
   - Lembrete de que PIX e boleto levam até 3 dias para compensar.

O visual segue o `DESIGN-SYSTEM.md` do projeto: fonte Poppins, rosa #E8649A, sem negrito 700.

## 5. Arquivos no repositório `pdp-bubbles-pet`

| Arquivo | Função |
|---|---|
| `src/app/planos/indicadores/page.tsx` | A página |
| `src/lib/planos/indicadores-fonte.ts` | Busca os dados no Apps Script (só no servidor) |
| `src/lib/planos/indicadores.ts` | Tipos, cálculos, metas, curva da Black |
| `src/lib/planos/anomalias.ts` e `anomalias-diagnostico.ts` | Detecção de anomalias, hipóteses e plano de ação |
| `src/app/api/indicadores/atualizar/route.ts` | Recebe o aviso do script e expira o cache |
| `src/components/lp/indicadores/*` | Os blocos visuais |
| `src/proxy.ts` | A senha do `/planos` (arquivo compartilhado, não mexer sem autorização) |
| `docs/indicadores/apps-script/Codigo.gs` e `appsscript.json` | O script e o manifesto |
| `docs/indicadores/guia-instalacao-apps-script.md` | O passo a passo da instalação |

## 6. Variáveis no Netlify (Site configuration > Environment variables)

| Variável | Para quê | Situação |
|---|---|---|
| `RELATORIO_SENHA` | senha do /planos (combinar com o Gabriel) | **falta criar** (sem ela, a página mostra "Configuração de acesso ausente") |
| `RELATORIO_COOKIE_SECRET` | assina o login (código aleatório de 64 caracteres) | **falta criar** |
| `SHEETS_SCRIPT_URL` | URL do app da Web do script (/exec) | falta (passo 5 do guia) |
| `SHEETS_SCRIPT_KEY` | chave de leitura (gerada pelo script) | falta (passo 3 do guia) |
| `INDICADORES_WEBHOOK_SECRET` | chave do aviso de atualização (gerada pelo script) | falta (passo 3 do guia) |

Para gerar o `RELATORIO_COOKIE_SECRET`:
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Nunca coloque senhas ou chaves no código nem mande por chat.

## 7. Situação atual e próximos passos

- [x] Layout aprovado. Código novo do site, que lê da planilha, pronto e **ainda sem commit** (no computador do Gabriel).
- [x] Script testado localmente contra os exports reais das duas planilhas.
- [ ] Criar as 5 variáveis no Netlify (seção 6).
- [ ] Seguir o `guia-instalacao-apps-script.md`, passos 1 a 10.
- [ ] Commit e push do código do site (o Gabriel faz) e confirmar o deploy.
- [ ] Rodar `testarConfiguracao` e conferir "Conexão com o site: OK".
- [ ] Conferir o painel no ar e o primeiro e-mail das 12h.

**Ordem importante:** primeiro as variáveis no Netlify, depois o push.

## 8. Limitações conhecidas

- As colunas de clientes novos e recorrentes estão vazias, então o card mostra "aguardando".
- Os alertas comparam só o Groomer, porque a planilha do Tutor chega incompleta.
- As metas dos alertas estão fixas no código: `METAS_B2B` em `src/lib/planos/indicadores.ts` e `CONFIG.METAS` no script.
- O alerta pelo WhatsApp ficou para depois. O e-mail já funciona.
