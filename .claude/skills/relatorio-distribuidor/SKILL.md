---
name: relatorio-distribuidor
description: Gera o relatório mensal de Captação de Distribuidores (padrão de apresentação aprovado em set/2026, modelo /distribuidor-agosto-2026-2) a partir dos CSVs do Meta Ads e Google Ads e dos dados do time comercial. Usar quando pedirem "relatório de distribuidor(es)", "relatório de captação" ou o relatório mensal de um mês específico.
---

# Relatório mensal de Captação de Distribuidores

Padrão aprovado de apresentação para o time de marketing e vendas (exposição de dados, não
sistema de análise). **Modelo de referência:** `/distribuidor-agosto-2026-2`, com os dados em
`src/lib/relatorio-distribuidor/2026-08.ts`. Todo o visual já está pronto em
`src/lib/relatorio-distribuidor/`. Para cada mês novo, **só se cria um arquivo de dados e uma
rota**. Não mexer no visual sem pedido.

## 1. Antes de começar: checklist de entrada (alertar o que faltar)

Conferir cada item. **Se algo faltar, avisar o usuário ANTES de gerar**, listando exatamente o
que falta e o que acontece na página sem ele (coluna "Sem isso").

### CSVs de mídia (período = mês fechado, 01 a último dia)
| # | Arquivo | Onde exportar | Colunas usadas | Sem isso |
|---|---|---|---|---|
| 1 | Meta · **Campanhas** | Gerenciador → Campanhas | Nome da campanha, Valor gasto, Impressões, Alcance, Cliques no link, Resultados | Sem consolidado, sem funil (bloqueia o relatório) |
| 2 | Meta · **Conjuntos com detalhamento por Região** | Conjuntos → Detalhamento → Por entrega → Região | Nome do conjunto, Região, Impressões, Valor gasto, Cliques | Mapa sai "sem dados por estado" |
| 3 | Meta · **Anúncios** (com coluna Nome do conjunto) | Gerenciador → Anúncios | Nome do anúncio, Nome do conjunto, Valor gasto, Impressões, Cliques no link, Resultados | Ranking de criativos vazio |
| 4 | Google Ads · **Relatório de campanha** | Google Ads → Campanhas → Baixar | Campanha, Status, Custo, Impr., Cliques, Conversões | Card Google: "Não há dados de Google Ads referentes a <mês>" |
| 5 | Google Ads · **Locais (por estado)**, opcional | Insights/Locais do usuário → Estado | Estado, Impressões | Mapa considera só o Meta (aviso automático) |

Os exports do Meta precisam cobrir **todas** as campanhas de distribuidor (Tradicional, Linha
Care, Pet South, novas). Se o 2 ou o 3 vierem só de uma campanha, avisar que o mapa e o
ranking ficam restritos a ela (campo `notaMapa`).

### Dados do time comercial (vendedores: Ivan, Paulo, Claudio, Guilherme, Thainá)
Por vendedor: **leads qualificados**, **reuniões**, **novos distribuidores (fechamentos)**.
Para cada fechamento: **nome do distribuidor, cidade/UF, campanha/origem do lead, data da primeira compra e valor do
primeiro pedido**.
Sem isso, a seção "Novos distribuidores" mostra "Aguardando os dados do time comercial", e o
funil fica "sem dado" nas 3 últimas etapas. Isso não bloqueia o relatório, mas deve ser avisado.

### Lembrete obrigatório: links dos criativos
Antes de gerar, e de novo ao entregar, listar **todo criativo do ranking** (≥ 3 leads e
≥ 1.000 impressões, cópias já unidas) que está sem link. Antes de pedir, **procurar se o
usuário já informou o link**: nesta conversa, nos arquivos de dados dos meses anteriores
(`src/lib/relatorio-distribuidor/*.ts`, mesmo nome de anúncio) e na memória. Link achado
entra direto, com o aviso "reaproveitei o link de <onde>". Só pedir o que realmente falta.
Registro até agora: ad35 artes internas = `https://www.facebook.com/100063565944892/posts/1647497520712430/`;
`imagem|captacao|novos_distribuidores_linha_ego_v2-1572640434864806` = sem link informado
(o usuário vai enviar os links junto com as próximas campanhas; em agosto fica "Link aguardando").

### Pendências para o relatório de setembro/2026
- Perguntar o **motivo** de "Entrada no Google Ads" não ter sido concluída (em agosto ficou sem motivo, por decisão do usuário) e reescrever para o comercial.
- Pedir os links dos criativos das novas campanhas.

### Anotações para o relatório de outubro/2026 (gerado em novembro)
Eventos do mês informados pelo usuário. Entram na linha do tempo (`timeline.marcos`) e nas
ações realizadas (`desafios`); usar para explicar variações de leads e CPL no mês.
- **07/10:** alterações no formulário de captação para diminuir a quantidade de revendedores de e-commerce entre os leads.
- **08/10:** exclusão da capital de São Paulo e da Baixada Santista da segmentação das campanhas.
  Contexto para a leitura: o estado de SP era a região com mais impressões (em setembro,
  82.149 impressões, cerca de 27% das impressões com estado identificado, ver `2026-09.ts`).
  Tirar a capital reduz um público grande e barato de alcançar, então é esperado que o CPM e
  o custo por lead (CPL) subam a partir de 08/10. O objetivo da exclusão foi diminuir a
  captação em regiões onde já temos bastante distribuidores. Apresentar a alta
  do CPL como efeito previsto da decisão, não como queda de performance.

- **Comparativo:** setembro (`2026-09.ts`) já tem os dados do comercial (reuniões, fechamentos,
  1º pedido). Outubro deve apontar `anterior: relatorioSetembro2026` e pedir ao comercial os
  números de outubro no mesmo formato, para sempre comparar o mês com o anterior.
- Leads qualificados ainda não são medidos pelo comercial: usar `leadsQualificados: null`
  (aparece "não informado"). Conferir se os itens do plano de outubro sobre o CRM avançaram.
- Ivan e Thainá atendem leads, mas estão com outras atribuições: sem dados deles, a página
  mostra só a observação sutil "Sem dados de leads de tráfego no mês".
- Fechamentos sempre com `campanhaOrigem: 'Distribuidor Tradicional'` quando o comercial disser
  só "campanha". A tabela "Aberturas por origem" do comercial (feira, indicação, prospecção) é
  controle interno deles e fica fora do relatório. Não mostrar press kits, nº de NF, data de
  cadastro nem ciclo em dias (decisão do usuário, 10/10/2026).
- Base de cálculo do custo por distribuidor e do retorno: investimento de TODAS as campanhas
  de distribuidor (Meta + Google), não só a Tradicional.

### Regra de conduta
Propostas que o usuário **não respondeu** não são aplicadas. Só aplicar o que ele aprovou explicitamente.

### Plano anterior: perguntar o motivo do que não foi feito
Para **cada item do plano anterior que não foi implementado ou está em andamento**, perguntar
ao usuário, **um item por vez**, o motivo. Depois **reescrever o motivo** para o time comercial:
claro e objetivo, focado no próximo passo e na data prevista, com tom construtivo, sem
culpar pessoas ou áreas e sem expor o marketing de forma desnecessária. Nunca inventar o
motivo. Mostrar a versão reescrita ao usuário antes de gravar no campo `nota` do item.

### Informações manuais (perguntar se não vierem)
- **Status do plano anterior:** para cada item do `planoProximo` do mês anterior, dizer se foi implementado, está em andamento ou não foi implementado, com nota (ver regra acima para os não feitos).
- **Plano do próximo mês.**
- **Links dos criativos:** um link de post do Facebook (`facebook.com/<id>/posts/<id>`) gera prévia; sem link, aparece "Link aguardando".
- **Correções manuais de leads**, por exemplo falha de envio para a Sellum (vira `nota` na campanha).
- **Contexto das campanhas:** status (ativa / verba reduzida / encerrada), destaques, eventos do mês (vira `timeline`), desafios, leitura analítica.
- Data da apresentação, páginas de captação e regiões foco (mudanças em relação ao mês anterior).

### Decisões já tomadas pelo usuário (28/09/2026)
- Campanhas de petshop/WhatsApp (ex: "Mensagem | Petshops | WhatsApp") ficam **fora** do relatório de distribuidor.
- Conversões do Google Ads (PMax "Cadastro Distribuidor") **contam como leads**.
- Vendedores são 5 pessoas: Ivan, Paulo, **Claudio** e **Guilherme** (duas pessoas) e Thainá.

## 2. Como transformar os CSVs em dados

- **Campanhas (CSV 1):** 1 item por campanha de distribuidor com investimento > 0. `leads` = Resultados (pixel lead). Manter o **mesmo `id`** da campanha nos meses seguintes; é isso que liga as setas de comparação por campanha.
- **Mapa (CSV 2):** somar Impressões por estado de todos os conjuntos. Nomes do export: "São Paulo (state)" → SP, "Federal District" → DF, "Rio de Janeiro (state)" → RJ, "Acre (state)" → AC, e assim por diante. A linha "Unknown" vai para `impressoesNaoAtribuidas`. Estados excluídos da segmentação vão em `ufsZeroConhecido` (hoje PR, SC e RS). **Conferir:** a soma dos conjuntos tem que bater com as impressões da(s) campanha(s).
- **Criativos (CSV 3):** agrupar as linhas por **nome exato do anúncio**, somar gasto, impressões, cliques e leads, e listar os conjuntos em `conjuntos`. Pode listar todos: a página **une as cópias** ("— Cópia") sozinha e só mostra anúncios com **≥ 3 leads e ≥ 1.000 impressões**.
- **Google (CSV 4):** 1 campanha por linha com Custo > 0. Campanhas sem veiculação viram `destaque` de texto.
- Fazer as somas com script (node), nunca de cabeça, e conferir contra as linhas "Total" dos exports.

## 3. Passo a passo

1. Rodar o checklist da seção 1 e alertar o que faltar.
2. Copiar o arquivo do mês anterior como `src/lib/relatorio-distribuidor/AAAA-MM.ts` (ex: `2026-09.ts`) e renomear o export (`relatorioSetembro2026`).
3. Preencher com os números do mês e apontar `anterior: <relatório do mês anterior>`. As setas ▲▼ e o valor do mês anterior aparecem sozinhos.
4. `planoAnterior` = itens do `planoProximo` do mês anterior, com o status informado. `relatoriosAnteriores` = acrescentar o link do mês anterior (ex: `/distribuidor-agosto-2026-2`).
5. Criar a rota `src/app/distribuidor-<mes>-<ano>/route.ts` (igual a `src/app/distribuidor-agosto-2026-2/route.ts`, trocando o import).
6. Acrescentar o relatório na lista `relatorios` da home (`src/app/page.tsx`), conforme a regra 22.
7. Validar: `npx tsc --noEmit` sem erro nos arquivos de `relatorio-distribuidor`, a página respondendo 200 e a soma do consolidado batendo com os exports.
8. Entregar o link local e a lista do que ficou pendente (dados do comercial, links, perguntas em aberto).

## 4. Regras do relatório (já implementadas no código; não quebrar)

- **Nunca inventar número.** Campo sem dado = `null`, e a página mostra o aviso ("sem dado", "Não há dados de <rede> referentes a <mês>").
- **Primeira seção = consolidado Meta + Google**, com filtro Consolidado / Meta Ads / Google Ads. Logo abaixo, a faixa **"Resultado em distribuidores"** (todas as redes): leads qualificados, reuniões, novos distribuidores, valor dos 1º pedidos, custo por novo distribuidor e retorno do 1º pedido (valor ÷ investimento). Linha única e compacta. **Sem dados do comercial, a faixa fica oculta.** O funil B2B tem o mesmo filtro; as etapas comerciais só existem no consolidado.
- **Comparativo obrigatório:** sempre ligar `anterior`. Sem mês anterior, aparece um aviso único, sem setas vazias.
- Cor da seta: verde = melhorou, vermelha = piorou (CPL, CPC e CPM caindo é bom). **Investimento: subiu = verde, caiu = vermelho** (decisão do usuário, 28/09/2026).
- **Teto de investimento: R$ 10.000/mês** (Meta + Google, campo `tetoMensal`). Se o consolidado passar, aparece um aviso no topo automaticamente; citar isso também na entrega.
- Zero conhecido ≠ sem dado. Percentual do mapa é sobre as impressões com estado identificado.
- Todo mês registra o **plano anterior (implementado ou não)** e o **plano do próximo mês**.
- No fim da página, links dos **relatórios anteriores de distribuidor** (só dessa série).
- Topo e rodapé: mês sempre em **negrito** ("**Agosto de 2026**") e o público ("Equipe de Marketing e Comercial", campo `publico`). **Nunca** citar diretoria nem data de apresentação.
- Texto em pt-BR; sem peso 700; tokens do `DESIGN-SYSTEM.md`. Relatório com `noindex` e sem GTM.

## 5. Relacionamento Marketing × Comercial (decisões do usuário, 28/09/2026)

O relatório é apresentado aos dois times juntos. Ele deve valorizar o trabalho de ambos e
nunca soar como cobrança.
- **Seção "Novos distribuidores" fica OCULTA** enquanto o comercial não enviar os dados. Não listar nomes como pendência. O que pedir fica em `PEDIDO_COMERCIAL` (`secoes-texto.ts`) e no checklist da seção 1.
- No funil, etapas comerciais sem número continuam como **"sem dado"** (decisão do usuário).
- **Vendedores em ordem alfabética**, nunca em ranking. **Setas só no total do time**; por pessoa, o mês anterior aparece em letra pequena abaixo de cada número (decisão de 10/10/2026: sempre mostrar mês anterior e atual em todas as etapas).
- Tabela de fechamentos fica recolhida ("Ver os novos distribuidores do mês"), abre com clique.
- Quem ficou zerado: observação sutil **"Sem leads de tráfego atribuídos no mês: X, Y."**
- **Fechamentos em tabela compacta** (média de 9 a 10 por mês; cards ficariam extensos), com "Fechado por" (crédito do comercial) e "Campanha de origem" (crédito do marketing). Pedir a campanha de origem de cada fechamento.
- **Plano anterior "Não implementado":** selo sutil, mas vermelho (sem ❌). O motivo segue a regra da seção 1 (perguntar e reescrever).
- **Plano do próximo mês:** lista única, sem separar por responsável.
- **Crédito nos criativos:** "com participação de <nome> (comercial)". Vem do campo `participacao` ou é detectado sozinho pelo nome do vendedor no nome do anúncio (as nomenclaturas vão passar a informar quem gravou).
- Linguagem: tom construtivo, "nós/juntos", sem culpar pessoas ou áreas.

### Tarefas futuras
- **Relatório de outubro/2026:** incluir as **fotos dos comerciais** (estão no Drive do usuário). Pedir as fotos ao gerar o relatório de outubro e usá-las na seção do time comercial.

## 6. Mapa dos arquivos

| Arquivo | Papel |
|---|---|
| `tipos.ts` | Formato dos dados e regras (comentários) |
| `AAAA-MM.ts` | Dados de cada mês (o único arquivo que muda todo mês) |
| `calculos.ts` | Somas, CPL/CTR/CPC/CPM, funil, mapa, regiões |
| `format.ts` | Formatação pt-BR e setas ▲▼ |
| `secoes-numeros.ts` | Consolidado (com filtro), por rede, funil B2B (com filtro), campanhas |
| `secoes-mapa.ts` | Mapa SVG por estado/região e ranking de criativos (união de cópias, prévia do Facebook) |
| `secoes-texto.ts` | Comercial (com 1º pedido), leitura, linha do tempo, desafios, planos, páginas, histórico |
| `estilos.ts` / `render.ts` | Visual e montagem da página (ordem das seções) |
| `mapa-brasil.ts` / `mapa-svg.ts` | Regiões, nomes das UFs e contornos do mapa |
