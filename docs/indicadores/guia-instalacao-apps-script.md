# Guia de instalação · Script do Painel Black November

Liga as planilhas **Groomer (B2B)** e **Tutor (Care/B2C)** ao painel
`ofertas.bubbles.com.br/planos/indicadores`. Depois de instalado, o painel atualiza sozinho:
você só preenche a planilha, sem git e sem deploy.

**Tempo:** uns 30 minutos, uma vez só.
**Arquivos:** `docs/indicadores/apps-script/Codigo.gs` e `docs/indicadores/apps-script/appsscript.json`.

---

## Antes de começar

| Precisa | Por quê |
|---|---|
| Conta Google que é **editora** das duas planilhas | O script roda com o seu login e só lê as planilhas |
| Acesso ao **Netlify** do ofertas.bubbles.com.br | Para cadastrar 3 variáveis |
| Fazer o **commit/push** do código do site (passo 7) | Uma vez só, para o site saber falar com o script |

**Precisa do proprietário da planilha?** Não. Ser editor basta: o script só lê, e você
mesmo cria os gatilhos. A única exceção é se o Google Workspace da Bubbles tiver uma regra
de administrador que bloqueia "apps da Web" ou scripts. Nesse caso, quem libera é o
**administrador do Workspace** (TI), não o dono da planilha. Os sinais dessa situação estão
na tabela de problemas no fim do guia.

---

## Passo 1 · Criar o projeto (fora da planilha)

1. Abra **script.google.com** com a conta editora das planilhas.
2. Clique em **Novo projeto**.
3. No topo, clique em **Projeto sem título** e renomeie para `Painel Black November`.

> Por que fora da planilha? Se o script ficar dentro dela (Extensões > Apps Script), qualquer
> outro editor da planilha consegue ver as chaves. Fora dela, só você vê.

## Passo 2 · Colar o código e o manifesto

1. No arquivo **Código.gs** que já vem aberto, apague tudo e cole o conteúdo de `Codigo.gs`.
2. Clique na **engrenagem** (Configurações do projeto), na barra da esquerda.
3. Marque **"Mostrar arquivo de manifesto 'appsscript.json' no editor"**.
4. Ainda nas Configurações, em **Fuso horário**, escolha **(GMT-03:00) Horário de Brasília**.
5. Volte ao **Editor** (ícone `< >`), abra **appsscript.json**, apague tudo e cole o conteúdo de `appsscript.json`.
6. Clique em **Salvar projeto** (ícone de disquete, ou Ctrl+S).

## Passo 3 · Gerar as chaves e autorizar

1. No menu suspenso ao lado de **Executar** (topo do editor), escolha **gerarChaves**.
2. Clique em **Executar**.
3. Vai aparecer **"Autorização necessária"**. Clique em **Revisar permissões** e escolha sua conta.
4. Vai aparecer **"O Google não verificou este app"**. É normal, porque o app é seu e não foi publicado.
   Clique em **Avançado** e depois em **Acessar Painel Black November (não seguro)**.
5. Revise as permissões e clique em **Permitir**:
   - ver as planilhas (o script só lê)
   - conectar a um serviço externo (o aviso ao site)
   - executar quando você não estiver presente (os gatilhos)
   - enviar e-mail como você (os resumos e alertas)
6. Embaixo, no **Registro de execução**, aparecem duas linhas. **Copie e guarde** as duas:
   ```
   SHEETS_SCRIPT_KEY = .....
   INDICADORES_WEBHOOK_SECRET = .....
   ```
   Não mande essas chaves por WhatsApp nem por e-mail. Vão direto para o Netlify no passo 6.

## Passo 4 · Primeiro teste (só planilhas)

1. No menu suspenso, escolha **testarConfiguracao** e clique em **Executar**.
2. No Registro, o bloco **OK** deve mostrar as duas planilhas com **30 dias encontrados**.
3. Em **PROBLEMAS**, por enquanto é **normal** aparecer "Conexão com o site falhou", porque o site
   ainda não conhece a chave. Qualquer outro problema, veja a tabela no fim do guia.

## Passo 5 · Publicar como app da Web

1. No canto superior direito, clique em **Implantar > Nova implantação**.
2. Na engrenagem ao lado de **Selecionar tipo**, escolha **App da Web**.
3. Preencha:
   - **Descrição:** `v1`
   - **Executar como:** **Eu (seu e-mail)**
   - **Quem pode acessar:** **Qualquer pessoa**
4. Clique em **Implantar** e copie o **URL do app da Web** (termina em `/exec`).

> "Qualquer pessoa" é seguro: sem a chave, o link só responde "acesso negado". A chave fica só
> no Netlify, no servidor, e nunca aparece no navegador de quem abre o painel.

## Passo 6 · Cadastrar no Netlify

No Netlify, abra o site **ofertas.bubbles.com.br**, vá em **Site configuration > Environment variables > Add a variable**
e crie as três variáveis:

| Nome | Valor |
|---|---|
| `SHEETS_SCRIPT_URL` | o URL do passo 5 (termina em `/exec`) |
| `SHEETS_SCRIPT_KEY` | a chave `SHEETS_SCRIPT_KEY` do passo 3 |
| `INDICADORES_WEBHOOK_SECRET` | a chave `INDICADORES_WEBHOOK_SECRET` do passo 3 |

As variáveis `RELATORIO_SENHA` e `RELATORIO_COOKIE_SECRET`, da senha do /planos, continuam como estão.

## Passo 7 · Subir o código do site (uma vez)

Faça o commit e o push dos arquivos do painel. Os novos e alterados são:

- `src/lib/planos/indicadores-fonte.ts` (novo): busca os dados no script
- `src/app/api/indicadores/atualizar/route.ts` (novo): recebe o aviso do script
- `src/lib/planos/indicadores.ts`, `anomalias.ts`, `anomalias-diagnostico.ts`
- `src/components/lp/indicadores/*` e `src/app/planos/indicadores/page.tsx`
- `docs/indicadores/*` (este guia e o script)

O push dispara o deploy no Netlify, que já sobe com as variáveis do passo 6. **Depois disso, nunca
mais é preciso dar git para atualizar os números.**

## Passo 8 · Segundo teste (tudo ligado)

1. Volte ao Apps Script e rode **testarConfiguracao** de novo.
   Agora deve aparecer **"Conexão com o site: OK"** e nenhum problema.
2. Abra `ofertas.bubbles.com.br/planos/indicadores` (senha do /planos). Os números devem bater com a planilha.

## Passo 9 · Ligar as automações

1. Rode **instalarGatilhos**. O Registro deve dizer **"Gatilhos instalados: 5"**.
2. Confira no ícone do **relógio** (Acionadores), na barra da esquerda:

| Função | Quando roda | O que faz |
|---|---|---|
| `aoEditar` (x2) | quando alguém edita a planilha B2B ou a B2C | grava a hora e avisa o site 1 min depois |
| `verificarDeHoraEmHora` | de hora em hora | avisa o site se algo mudou; manda o resumo atrasado |
| `atualizacaoNoturna` | todo dia, entre 11h e 12h | pega os dados automáticos do Adveronix (importa às 10h30) |
| `enviarResumoDiario` | todo dia, entre 12h e 13h | e-mail de resumo ou de "aguardando" (só em dias úteis) |

## Passo 10 · Testar o e-mail

Rode **testarEmail**. Em um minuto, gabriel@ e mariane@ recebem o e-mail. Se ainda faltar dado
de ontem, o assunto começa com "Aguardando preenchimento". Se estiver tudo preenchido, chega o
resumo com os alertas.

---

## Como funciona no dia a dia

- **Você preenche a planilha entre 10h e 11h.** Cerca de 1 minuto depois da última edição, o painel já mostra os números novos,
  e "Atualização manual feita" passa a mostrar a hora da edição.
- **Às 12h em dias úteis**, chega o e-mail:
  - se faltar algum dado manual de ontem: **"Aguardando preenchimento"**, com a lista do que falta
    (dia, planilha e coluna)
  - se estiver tudo preenchido: **resumo**, com receita, pedidos, ticket e faturado do mês, mais as **quedas
    fora do normal**
- **Se você preencher depois das 12h,** o resumo sai sozinho na próxima verificação de hora em hora (até 20h).
- **Na segunda-feira**, o e-mail cobre sexta, sábado e domingo. Sábado e domingo não têm e-mail.
- **Erro no script:** chega um e-mail para o gabriel@, no máximo um a cada 6 horas.
- **A partir de 02/12/2026** o script para sozinho. Para remover de vez, rode **removerGatilhos**.

## Se precisar mudar o código do script depois

1. Edite o código e salve.
2. Clique em **Implantar > Gerenciar implantações**, depois no **lápis**, e em **Versão** escolha **Nova versão** e **Implantar**.
   Assim o URL continua o mesmo e não é preciso mexer no Netlify.

> Não use "Nova implantação" de novo: isso gera um URL novo.

## Problemas comuns

| O que aparece | Causa provável | O que fazer |
|---|---|---|
| Painel: "Conexão com a planilha não configurada" | Variáveis do Netlify ausentes ou deploy antigo | Confira o passo 6 e faça um novo deploy (Deploys > Trigger deploy) |
| Painel: "A planilha respondeu com erro" ou "acesso negado" | `SHEETS_SCRIPT_KEY` diferente da chave do script | Rode `gerarChaves` (mostra as chaves atuais) e corrija no Netlify |
| testarConfiguracao: "sem acesso à planilha" | Conta sem acesso, ou ID errado em `CONFIG.PLANILHAS` | Abra a planilha com a mesma conta; confira o ID no link |
| testarConfiguracao: "coluna ... não encontrada" | Alguém renomeou o cabeçalho na linha 13 | Volte o nome original ou ajuste `COLUNAS` no script |
| Aviso: "... não é um número" | Célula digitada como texto (ex.: `R$ 15.666,12` com espaço estranho) | Redigite o valor na planilha só com números |
| "Conexão com o site falhou (401)" | `INDICADORES_WEBHOOK_SECRET` diferente de `CHAVE_WEBHOOK` | Copie de novo a chave do `gerarChaves` para o Netlify e faça deploy |
| Ao implantar, não aparece "Qualquer pessoa" | Regra do Google Workspace da empresa | Peça ao administrador do Workspace (TI) para permitir apps da Web do Apps Script |
| E-mails não chegam | Caiu no spam ou atingiu o limite diário do Google | Procure "[Painel Black]" no spam; o limite é de 100 por dia (usamos cerca de 3) |
| Painel não atualiza após a edição | Gatilhos não instalados | Rode `instalarGatilhos`; o painel também se atualiza sozinho em até 1h |

## Teste local (opcional, para quem mexe no código)

No arquivo `.env.local` do projeto, que nunca vai para o git, coloque as mesmas 3 variáveis do
passo 6 e rode `npm run dev`.
