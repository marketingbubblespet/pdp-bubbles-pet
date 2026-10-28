# Google Ads · ajuste de orçamentos para a Black (28/10) e roteiro da PMax da Black (29/10)

**Tarefas:** TRAF-03 (orçamentos, 28/10) e TRAF-05 (criação da campanha, 29/10) · **Quem:** Gabriel · **Base:** `black-november-2026/estudo-black/06-black-atual-2026-google-ads.md`, seções 2, 3.1, 3.2, 4 e 5. Teto do mês: **R$ 20.000**.

## 1 · Hoje, 28/10: orçamentos de partida

Regra da casa: reduzir pode ser de uma vez; **aumentar no máximo 20%** por vez, com 48 horas entre degraus. Reduzir, nunca pausar (as fracas estão na 1ª redução).

| Campanha | Hoje (set/26) | A partir de 28/10 | Mudança | Por quê |
|---|---|---|---|---|
| Search de marca | R$ 120 | **R$ 144**, só se estiver limitada pelo orçamento (perde mais de 10% da parcela de impressões por orçamento) | +20% | maior ROAS da conta (LC 6,14) |
| PMAX_TP | R$ 50 | **R$ 60** | +20% | única PMax acima da régua (LC 2,51) |
| FUNDO_PMAX_COBERTURA | R$ 100 | **R$ 70** | −30% | LC 0,93; a PMax da Black mostra os mesmos produtos com a oferta |
| FUNDO_SEARCH_PRODUTO | R$ 70 | **R$ 30** | −57% | LC 0,34 |
| MEIO_SEARCH (3 campanhas) | R$ 160 somados | **R$ 20 cada** (R$ 60) | −63% | LC de 0,36 a 0,64; porta de entrada da busca de tutor |
| FUNDO_PMAX_HEROIS | pausada | **segue pausada** (se estiver ativa: R$ 40) | | os heróis vão para a PMax da Black |
| Performance Max - Promo e PMax - Promo - MG | pausadas | **seguem pausadas** | | religar no pico recomeça o aprendizado |

**Total por dia depois do ajuste:** R$ 364 (com a marca a R$ 144), contra R$ 500 hoje. A diferença vai para a PMax da Black a partir de 01/11.

**Junto, ainda hoje (seção 2 do 06):**
1. Desligar a aplicação automática de recomendações, a criação automática de recursos e a personalização de texto; apagar textos gerados pela IA que citam desconto ("13% de desconto", "15% de desconto").
2. Pausar anúncios com informação errada e o grupo GR_06_ACESSORIOS; aplicar a lista de marca onde falta; subir as negativas da Black (06, 5.8 e 5.9).
3. Merchant Center: criar e enviar as promoções de brinde (a revisão leva até 72 h) e marcar os itens da Black com `custom_label_0 = black26` (rótulo do Google, 06 seção 4.6; o catálogo da Meta usa `bn26`).
4. Compra contada em dobro (A9): se for corrigir, é **hoje e sem nenhuma outra mudança no mesmo dia**; senão, fica para depois de 01/12.

**Congelamento de 29/10 a 30/11:** nenhuma troca de estratégia de lance, meta, ação de conversão, segmentação ou estrutura. Só os degraus de verba do plano.

## 2 · Amanhã, 29/10: criar a PMax da Black

| Item | Configuração |
|---|---|
| Nome | `PMAX_BN26_BR` (seguir o padrão de nomes da conta) |
| Datas | início **01/11 00h**, fim **30/11 23h59** (a campanha para sozinha) |
| Orçamento | **R$ 150 por dia** de 01 a 15/11; degraus até R$ 259 só se ROAS LC ≥ 2,0 e limitada pelo orçamento |
| Lance | mesmo tipo das PMax atuais (não inventar meta nova) |
| Produtos | só os itens com `custom_label_0 = black26`, sem brindes e sem Care |
| Grupo de recursos | textos, imagens e vídeos da Black (06, 4.2): sem "até X%" geral, sem frete, sem travessão; Kit Experimentação 40% off só com ele na peça; Kit Completo Essential 10% off + 4 diluidores + jaleco; "até 10x sem juros"; "cashback em todas as compras" (sem porcentagem e sem validade) |
| Sinais de público | 06, 4.3 |
| URL final | coleção Black November; o Kit Experimentação e o Kit Completo Essential vão para a PDP |

**Search de marca:** criar **pausados** o anúncio de Black e o de reserva (sem o Kit Experimentação), os textos no nível da campanha, os sitelinks (coleção Black, Kit Completo Essential, Kit Experimentação, galões 5L) e os recursos de promoção, todos com início em 01/11 e fim em 30/11 (06, seção 5). Regras automáticas ligam às 00h de 01/11 e desligam às 23h de 30/11.

**Degraus durante a Black:** 09, 16 e 23/11 e 27/11 (06, 3.2). Ponto de controle da PMax da Black em 16/11.

**Saída em 01/12:** marca volta a R$ 144 e PMAX_TP a R$ 60; buscar "Black", "40%" e "BN26" em textos e recursos e confirmar que nada ficou no ar; conferir o preço cheio na Shopify e no Merchant.
