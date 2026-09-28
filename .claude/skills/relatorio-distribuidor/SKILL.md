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
Para cada fechamento: **nome do distribuidor, cidade/UF, data da primeira compra e valor do
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
`imagem|captacao|novos_distribuidores_linha_ego_v2-1572640434864806` = sem link informado.

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
- **Primeira seção = consolidado Meta + Google**, com filtro Consolidado / Meta Ads / Google Ads. O funil B2B tem o mesmo filtro; as etapas comerciais só existem no consolidado.
- **Comparativo obrigatório:** sempre ligar `anterior`. Sem mês anterior, aparece um aviso único, sem setas vazias.
- Cor da seta: verde = melhorou, vermelha = piorou (CPL, CPC e CPM caindo é bom). **Investimento: subiu = verde, caiu = vermelho** (decisão do usuário, 28/09/2026).
- **Teto de investimento: R$ 10.000/mês** (Meta + Google, campo `tetoMensal`). Se o consolidado passar, aparece um aviso no topo automaticamente; citar isso também na entrega.
- Zero conhecido ≠ sem dado. Percentual do mapa é sobre as impressões com estado identificado.
- Todo mês registra o **plano anterior (implementado ou não)** e o **plano do próximo mês**.
- No fim da página, links dos **relatórios anteriores de distribuidor** (só dessa série).
- Topo e rodapé: mês sempre em **negrito** ("**Agosto de 2026**") e o público ("Equipe de Marketing e Comercial", campo `publico`). **Nunca** citar diretoria nem data de apresentação.
- Texto em pt-BR; sem peso 700; tokens do `DESIGN-SYSTEM.md`. Relatório com `noindex` e sem GTM.

## 5. Mapa dos arquivos

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
