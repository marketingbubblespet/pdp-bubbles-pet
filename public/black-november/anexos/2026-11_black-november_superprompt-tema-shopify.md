# Black November 2026 · super prompt do tema (Shopify)

## ⏸ Para refinar antes de usar (retomada de 29/10)

**Instrução para o Claude que retomar este trabalho:** antes de entregar o super prompt ao Gabriel, mostre a ele este resumo e as 5 perguntas da seção "Antes de colar", colete as respostas e os ajustes, atualize a Parte C (e o que mais mudar) e só então entregue o prompt final. Pedido do Gabriel em 28/10: "antes de me entregar o prompt, entregar as informações acima, para eu refinar".

**Resumo do super prompt (resposta do Claude em 28/10, para o Gabriel refinar):**

- **Início:** 5 perguntas, cada uma com resposta padrão (faixa de condições na home e nas coleções, menos Care; cronômetro com a sequência sugerida até a Mariane mandar os textos; você duplica o tema em 29/10 de manhã; prints automáticos; "6X" do rodapé trocado à mão). Depois, o passo a passo de uso e o prompt.
- **Parte A do prompt:** as 14 tarefas de tema (T00 a T14) em texto simples: preparação e levantamento, configuração central, parcelamento e cashback, blocos escuros, tag, coleção com destaque, página de produto, cronômetro fixo, faixa de condições, abas, FAQ, banners, testes com relatório e rollback.
- **Prints:** 10 páginas fixas (P01 a P10), celular e computador, nas fases base, depois e rollback, com nomes padronizados e data simulada (só na prévia) para fotografar cada semana e o dobro antes de 01/11.
- **Rollback:** cada alteração vai para um registro com antes, depois e cópia do original; o roteiro de 01/12 desfaz tudo em ordem (cronômetro, faixas, as 2 FAQs da home pelos IDs anotados, abas, banners, CSS, configuração) e confere com prints comparados aos de base.
- **Checklist mestre:** feito · testado · print antes · print depois · registrado · aprovado, para cada item.
- **Relatório em HTML e PDF:** antes e depois lado a lado e os 11 ajustes manuais (M01 a M11), que o Claude só fotografa.
- **Segurança:** o prompt autoriza por escrito só os templates da coleção, da página de produto e da home, e a exceção do cronômetro no topo; rodapé, settings e apps seguem bloqueados; o Claude para em cada [APROVAÇÃO] antes de mexer em template ou no topo; a publicação é sempre do Gabriel.

**O que o Gabriel pode refinar amanhã:** as 5 perguntas; os textos do cronômetro, da faixa e das FAQs (Parte C); a lista de páginas fotografadas (P01 a P10); a ordem das tarefas; o que entra ou sai do rollback.

## O que é esta tarefa

Um único prompt, para colar no Claude Code do projeto `C:\Users\Gabriel Bubbles\Desktop\shopify-estrutura`, com **todos os ajustes de tema da Black November 2026** feitos pelo Claude. Os ajustes manuais do painel ficam listados à parte (seção "Ajustes manuais"), para entrarem no mesmo relatório. O prompt traz:
1. a lista de todas as tarefas em texto simples, no começo (Parte A);
2. a execução detalhada de cada uma, dentro das regras R1 a R13 do projeto;
3. um checklist que o Claude mantém atualizado a cada passo;
4. prints de **antes e depois** de todo lugar alterado (e um terceiro print depois do rollback);
5. o sistema de **rollback** para 01/12 (cores, FAQs, faixas, cronômetro, abas, banners, templates, textos);
6. um relatório final em HTML e PDF com tudo o que foi ajustado.

**Fonte das tarefas:** `2026-11_black-november_plano-de-tarefas.md`, grupo "Tema pelo Claude Code" (SHOP-01 a SHOP-30). Este super prompt **substitui** os prompts soltos daquele grupo: use um ou outro, não os dois.

## Antes de colar: 5 perguntas (com a resposta padrão, se você não mudar)

1. **Faixa de condições abaixo do banner:** em quais páginas? **Padrão:** home, coleção Black November, coleção PRO (`ego`), Collora e o template padrão de coleção (Essential e demais). Care fica sem.
2. **Textos do cronômetro:** a Mariane já mandou (CRIA-01)? **Padrão:** usar a sequência sugerida (Parte C); os textos ficam editáveis no Personalizador depois.
3. **Tema de trabalho:** você duplica o tema ativo em 29/10 de manhã com o nome "Black November 2026" e evita mexer no tema ativo até publicar. **Padrão:** sim (o protocolo R10 compara tudo antes de subir).
4. **Prints:** automáticos com o Playwright de `_sistema/testes` (celular e desktop). **Padrão:** sim; se falhar, o Claude te dá a lista para tirar à mão.
5. **Ícone "Até 6X sem juros no cartão"** fica no rodapé (seção de ícones do footer): pela R9, a troca para "Até 10x" é **manual** no Personalizador. **Padrão:** você troca, e o Claude só fotografa antes e depois.

## Como usar amanhã

1. Na máquina nova: `git pull` neste repositório (`bubbles-gerador-de-ads`) e abra o projeto `shopify-estrutura` no Claude Code.
2. Se o caminho do CSV de produtos for outro, ajuste na Parte C (linha "Lista de produtos").
3. Duplique o tema ativo no admin (Loja virtual > Temas > ... > Duplicar) e anote o ID do duplicado.
4. Cole o bloco abaixo inteiro. O Claude trabalha por fases e **para nos pontos de aprovação**; você pode dizer "siga para a fase N" a cada etapa. Se a sessão acabar, abra outra e diga: "continue o super prompt da Black pelo CHECKLIST".

---

## O SUPER PROMPT (copiar daqui até o fim do bloco)

```text
# BLACK NOVEMBER 2026 · AJUSTES DO TEMA · EXECUÇÃO COMPLETA COM CHECKLIST, PRINTS E ROLLBACK

Você vai executar TODOS os ajustes de tema da Black November 2026 da Bubbles (loja-bubbles.myshopify.com), por fases, seguindo o CLAUDE.md deste projeto (R1 a R13) em tudo, com registro de antes e depois de cada alteração, prints, checklist e um plano de rollback para 01/12. Leia este prompt inteiro antes de começar. Trabalhe em português simples, um passo por vez, e pare em cada ponto marcado com [APROVAÇÃO].

====================================================================
PARTE A · O QUE VAMOS FAZER (resumo em texto, para o Gabriel conferir)
====================================================================

A Black November vai de 01/11/2026 00h a 30/11/2026 23h59 (Brasília). O tema da Black é publicado pelo Gabriel em 31/10 às 23h50 e desfeito em 01/12. Os ajustes de tema são 14:

T00 · Preparação e registro. Sincronizar o work/ com o tema ativo (a cópia local está desatualizada: o destaque por link da coleção PRO já funciona no ar e não está no work/), fazer os backups, criar a pasta de registro da Black com o documento de rollback, o checklist e as pastas de prints, e tirar os prints de base (como o site está hoje) de 10 páginas, no celular e no computador.

T01 · Levantamento. Mapear, sem alterar nada, onde o tema fala de parcelamento (6x), de cashback (5%) e quais arquivos bb- existem e onde estão, para saber o que muda por código, o que é protegido e o que é manual.

T02 · Configuração central da Black. Criar um único lugar (snippet bb-black-config + script) com as datas da Black, o cashback (5%, e 10% a partir de 23/11), o parcelamento (até 10x, parcela mínima de R$ 25), o liga e desliga da Black e as listas de produtos por benefício. Tudo o mais lê daqui. Com a Black desligada ou fora do período, o site volta sozinho a 6x e ao cashback normal.

T03 · Parcelamento e cashback. Fazer os blocos de parcelamento e de cashback da página de produto lerem da configuração central: "até 10x sem juros" com a parcela mínima e "Ganhe R$ X de cashback" (que dobra em 23/11). Trocar todo "6x sem juros" do tema por "até 10x sem juros", menos o do rodapé, que é manual.

T04 · Blocos escuros. Deixar os blocos de conteúdo do site em tons escuros (#0D0C0D, #181818 e um tom intermediário), como na Black 2025, com texto branco e botões rosa. O topo (header) e o rodapé (footer) continuam na cor atual. Contraste conferido em preço, selos, avaliações e formulários.

T05 · Tag OFERTA BLACK e selos. Mostrar a etiqueta "OFERTA BLACK" na foto dos produtos da Black (galeria da página do produto e cards das coleções) e deixar os selos de desconto em preto durante novembro. Só aparece de 01 a 30/11.

T06 · Coleção Black November. Criar o template da coleção black-november a partir do da coleção PRO, com o destaque por link (?destaque=handle do produto) funcionando para qualquer produto da Black, banner baixo, faixa de condições e FAQ com 10 perguntas. Entregar a lista de links de destaque para os anúncios.

T07 · Página de produto da Black. No template product.black-november (o Gabriel já criou pelo admin), tirar a seção do cupom BEMVINDO10 e colocar os destaques da Black: tag, faixa de condições abaixo do preço, selo do brinde, economia em reais, custo por banho (se houver dado), mini cronômetro (se não repetir) e o rodapé de regras.

T08 · Cronômetro no topo. Uma faixa com cronômetro no topo do site todo, ACIMA da barra de avisos e fixa ao rolar, com texto e data-alvo que mudam por semana (sempre datas reais). É uma exceção autorizada à R9, pelo Protocolo das 5 Etapas: só entra uma seção nova no grupo do header, sem mexer em nenhum arquivo existente de header, menu, barra ou rodapé.

T09 · Faixa de condições abaixo do banner. Uma faixa preta fina, logo abaixo do banner da home e das coleções, com as condições da Black passando uma frase por vez. A partir de 23/11, "Cashback em dobro em todas as compras" vira a primeira frase.

T10 · Abas da home. A seção de abas que hoje tem Care, Promoções, Collora, Shampoos e Kits passa a ser: Black November (primeira, aberta e destacada), Kits, Shampoos, Collora e Care. Promoções sai.

T11 · FAQ. Duas perguntas da Black no começo do FAQ da home e dez perguntas na coleção Black, com marcação de FAQ para o Google.

T12 · Banners. Colocar os banners da Black (3 principais, 3 secundários e o da coleção) nos lugares certos, com os links de destino certos, depois que a Mariane subir as imagens.

T13 · Testes, prints e relatório. Testar tudo com datas simuladas (antes, semanas 1 a 4, dobro, último minuto e 01/12), conferir as avaliações da Konfidency, tirar os prints de depois, montar o relatório em HTML e PDF e preparar os comandos de publicação para o Gabriel (ele publica).

T14 · Rollback em 01/12. Desfazer tudo pelo documento de rollback: tirar cronômetro, faixas, FAQs adicionadas, CSS escuro, tag e destaques; voltar abas e banners; desligar a configuração da Black (volta a 6x e ao cashback normal); listar o que é manual; e tirar os prints de depois do rollback, comparando com os de base.

Fora do Claude (manuais, mas entram no relatório com antes e depois): menu "Promoções" para "Black November", textos da barra de avisos, ícone "Até 6X" do rodapé, checkout (fundo e logo), preços "de" e "por", tags bn26, modelo de página nos produtos, SEO da coleção, regras do BOGO, roleta.

====================================================================
PARTE B · REGRAS, LIMITES E AUTORIZAÇÕES DESTA RODADA
====================================================================

1. Siga o CLAUDE.md: R1 (nunca publicar, nem push no tema ativo), R2 (dois backups), R3 (nunca escrever em produto, preço, tag, coleção, metafield), R4 (só editar em work/), R5 (preferir arquivo novo bb-), R6 (não tocar em arquivo de app), R7 (gate antes de entregar), R8 (bilhete de volta antes da 1ª linha), R9 (header, footer, menu e barra de avisos), R10 a R13 (protocolo de publicação, em _sistema/docs/08_PROTOCOLO_PUBLICACAO.md).
2. AUTORIZAÇÕES EXPLÍCITAS DESTA RODADA (registre cada uma como exceção autorizada no CHANGELOG_BB.md, com o motivo "Black November 2026"):
   a) criar templates/collection.black-november.json (novo);
   b) editar templates/product.black-november.json (já existe, criado pelo Gabriel no admin);
   c) editar templates/index.json para: abas (T10), faixa de condições (T09), FAQ (T11) e banners (T12);
   d) editar os templates de coleção da faixa de condições (T09): collection.colecao-ego.json, collection.collora.json, collection.json e collection.black-november.json;
   e) R9, só para o cronômetro (T08): acrescentar UMA section nova (bb-black-cronometro) em sections/header-group.json, antes da barra de avisos, seguindo o Protocolo das 5 Etapas de _sistema/docs/07_REGRA_HEADER_FOOTER.md. Nenhum outro arquivo de header, menu, barra ou footer pode ser alterado;
   f) se for impossível carregar a configuração central e o CSS de forma global pela própria section do cronômetro, pedir autorização para UMA linha de render em layout/theme.liquid (nunca remover content_for_header). Pergunte antes.
3. NÃO AUTORIZADO nesta rodada: config/settings_data.json, config/settings_schema.json, locales, arquivos de app, footer-group.json, announcement-bar.liquid, header.liquid. Se algo exigir, pare e pergunte.
4. Antes de editar qualquer arquivo existente: copie o original para historicos-de-alteracao/black-november-2026/originais/<caminho-com-underline> e mostre o diff. [APROVAÇÃO] antes de aplicar alterações em templates/*.json e header-group.json.
5. Se o hook bloquear algo, avise de forma explícita, não contorne.
6. Regras de texto em tudo que aparece no site: sem travessão (use ·, : ou vírgula); "off" sempre minúsculo; nunca "até X%" como promessa geral (o 40% só com o Kit Experimentação); sem falar de frete; cashback sem validade; "até 10x sem juros".

====================================================================
PARTE C · DADOS DA BLACK (constantes)
====================================================================

- Período: início 2026-11-01T00:00:00-03:00 · fim 2026-11-30T23:59:59-03:00.
- Cashback: 5% em todas as compras; 10% (em dobro) de 2026-11-23T00:00:00-03:00 ao fim. É entregue como cupom para a próxima compra. Nunca mostrar validade.
- Parcelamento: até 10x sem juros, parcela mínima R$ 25 (parcelas = mínimo entre 10 e piso(preço ÷ 25), no mínimo 1). Fora da Black: 6x (como hoje). O gateway já está configurado com 10x.
- Cores: #0D0C0D (fundo profundo), #181818 (cards e seções alternadas), intermediário a propor (#121112 ou #1F1E1F), texto #FFFFFF, rosa #F4CDD4 (botão, destaque, borda da tag), texto do botão rosa #0D0C0D. Header e footer: cores atuais, intocados.
- Lista de produtos (77, com handle, preço e benefício): C:\Users\Gabriel Bubbles\Desktop\bubbles-gerador-de-ads\claude-gerador-anuncio\dados\black-november\black_november_precos_2026-10-28.csv (separador ";", colunas Linha, Produto, URL pública, Preço cheio, Desconto, Preço Black, Benefício, Preço atual). O handle é o final da URL pública.
  Benefícios: "Diluidor de brinde" (galões 5L PRO e Essential e PRO 1L) · "Compre 3, leve 4" (perfumes PRO 30 ml e 500 ml e Deo Colônia Jabuticaba) · "4 diluidores + jaleco" (Kit Completo Linha Essential).
- Handles-chave: kit-pet-experimentacao-linha-pro · kit-pet-completo-linha-essential · shampoo-pet-neutralizador-de-odores-ego-5l-1-11 · shampoo-pet-neutro-essential-5l-1-5 · kit-pet-cronograma-de-pelagem-ego-3-itens · kit-pet-mascaras-pigmentadoras-collora-7-itens · perfume-pet-puppy-ego-500ml.
- Destinos: Kit Experimentação e Kit Completo Essential vão para a página do produto; os demais produtos para /collections/black-november?destaque=<handle>.
- Cronômetro (sequência padrão, editável depois no Personalizador):
  01/11 00h a 08/11 23h59 · "Black November Bubbles: o estoque de dezembro com desconto" · conta até 30/11 23h59
  09/11 a 15/11 · "Kit Completo Linha Essential com 10% off + 4 diluidores + jaleco" · conta até 23/11 00h
  16/11 a 22/11 · "Falta pouco para o cashback em dobro" · conta até 23/11 00h
  23/11 a 29/11 · "Cashback em dobro em todas as compras" · conta até 30/11 23h59
  30/11 · "Últimas horas de Black November" · conta até 30/11 23h59
  Visual de partida (2025): fundo #F4CDD4, número #000000, formato dd : hh : mm, botão "Garantir" para /collections/black-november.
- Faixa de condições (frases):
  geral (home e coleção Black): alterna as 3 frases abaixo
  galões e Essential: "Diluidor de brinde nos galões 5L · Cashback em todas as compras · até 10x sem juros"
  Linha PRO: "Kit Experimentação com 40% off · Kits PRO com 20% off · Perfumes: compre 3, leve 4"
  Collora e Xperience: "Kits com 15% off · Cashback em todas as compras · até 10x sem juros"
  de 23/11: "Cashback em dobro em todas as compras" como 1ª frase em todas.
- FAQ da home (2, no topo do FAQ atual):
  1. Até quando vai a Black November Bubbles? · De 01 a 30 de novembro de 2026, até as 23h59, enquanto durarem os estoques e os brindes.
  2. Os cupons somam com os descontos da Black? · Não. Os produtos da Black November já estão com o preço promocional, e os cupons (como PRIMEIRA10 e BEMVINDO10) não acumulam com ele. O cashback vale em todas as compras.
- FAQ da coleção Black (10):
  1. Até quando valem as ofertas? · De 01 a 30/11/2026, até as 23h59, enquanto durarem os estoques e os brindes.
  2. Quais produtos estão na Black November? · As linhas PRO, Essential, Collora e Xperience, com descontos de 10% a 40%. A Linha Care não entra na promoção.
  3. Como funciona o diluidor de brinde? · Na compra de galões de 5L das linhas PRO e Essential e de shampoos e condicionadores PRO de 1L, o diluidor entra no carrinho automaticamente, enquanto durarem os brindes.
  4. O Kit Completo Linha Essential tem brinde? · Sim. Na Black ele sai com 10% off e leva 4 diluidores e um jaleco de brinde, enquanto durarem os brindes.
  5. Como funciona o compre 3, leve 4 dos perfumes? · Levando 3 perfumes participantes, o 4º sai de brinde, aplicado automaticamente no carrinho.
  6. Como funciona o cashback? · Você ganha 5% do valor da compra de volta em cupom para usar na próxima compra. De 23 a 30/11 ele dobra: 10%.
  7. Posso parcelar? · Sim, em até 10x sem juros no cartão, com parcela mínima de R$ 25.
  8. Os cupons somam com a Black? · Não. Os produtos já estão com o preço da Black, e os cupons não acumulam. O cashback vale normalmente.
  9. O que é o Kit Experimentação Linha PRO? · Um kit para conhecer a Linha PRO antes de abastecer o seu banho e tosa, com 40% off na Black.
  10. Os brindes têm limite? · Sim. Diluidores, jalecos e o 4º perfume valem enquanto durarem os brindes, por isso vale garantir o seu no começo do mês.
- Banners (arquivos que a Mariane sobe em Conteúdo > Arquivos, prefixo bn26_):
  principal 1 (galões com brinde) → slide 1 da home → /collections/black-november?destaque=shampoo-pet-neutralizador-de-odores-ego-5l-1-11
  principal 2 (Kits PRO) → slide 2 → /collections/black-november?destaque=kit-pet-cronograma-de-pelagem-ego-3-itens
  principal 3 (Kit Experimentação) → slide 3 → /products/kit-pet-experimentacao-linha-pro
  secundário 1 (coleção Black) → /collections/black-november
  secundário 2 (Kit Experimentação) → /products/kit-pet-experimentacao-linha-pro
  secundário 3 (máscaras Collora) → /collections/black-november?destaque=kit-pet-mascaras-pigmentadoras-collora-7-itens
  coleção Black (1920x400 e 745x400) → banner do template collection.black-november
  Desktop 1920x500, celular 745x850 nos principais; 500x500 nos secundários. Banner inteiro clicável, texto alternativo descritivo.

====================================================================
PARTE D · ESTRUTURA DE REGISTRO (criar no T00)
====================================================================

Pasta: lojas/bubbles/historicos-de-alteracao/black-november-2026/
- ROLLBACK.md · documento de volta. Seções:
  A. Identificação: tema ativo (nome, ID), tema duplicado da Black (nome, ID), backups (caminhos e data), commit/estado do work/ no início.
  B. Alterações no tema · uma linha por alteração, com ID único (ex.: T04-03): data e hora · tarefa · arquivo · local exato (section, bloco, seletor, chave JSON) · ANTES (trecho exato) · DEPOIS (trecho exato) · tipo (texto, cor, layout, template, arquivo novo, configuração, exceção R9) · original guardado em · como reverter (passo exato) · prints (nomes dos arquivos).
  C. Alterações manuais no painel (preenchidas com o Gabriel): menu, barra de avisos, ícone do rodapé, checkout, SEO da coleção.
  D. Produtos (feitas pela equipe no painel): preços, tags bn26, modelo de página. Tabela: produto · handle · antes · depois · quem · data.
  E. Descontos e apps: BOGO (diluidor, compre 3 leve 4), roleta, gateway.
  F. Roteiro de reversão de 01/12, em ordem (Parte I).
- CHECKLIST.md · checklist mestre (Parte J), atualizado ao fim de cada passo, com data e hora. Status: [ ] a fazer · [~] em andamento · [x] feito · [!] bloqueado (motivo).
- LEVANTAMENTO.md · saída do T01.
- originais/ · cópia de todo arquivo existente antes de alterar.
- prints/base/, prints/depois/, prints/rollback/ · PNG.
- relatorio/ · RELATORIO-BLACK-NOVEMBER-2026.html e .pdf.

PRINTS · convenção
- Páginas (P01 a P10):
  P01 home · P02 /collections/black-november · P03 /collections/black-november?destaque=shampoo-pet-neutralizador-de-odores-ego-5l-1-11 · P04 /collections/ego · P05 /products/kit-pet-experimentacao-linha-pro · P06 /products/kit-pet-completo-linha-essential · P07 /products/shampoo-pet-neutralizador-de-odores-ego-5l-1-11 · P08 /products/perfume-pet-puppy-ego-500ml · P09 carrinho aberto com 1 galão 5L · P10 um produto Care (controle: não pode ganhar tag nem selo da Black).
- Dispositivos: celular 390x844 e computador 1440x900. Página inteira + recorte do elemento alterado quando a mudança for pontual.
- Nome: <fase>_<ID>_<pagina>_<dispositivo>.png · ex.: base_P05_celular.png · depois_T07_P05_celular.png · depois_T07_P05_celular_recorte-preco.png · rollback_P05_celular.png.
- "Base" e "antes" vêm do tema ativo (https://www.bubbles.com.br/...). "Depois" vem do tema duplicado (?preview_theme_id=<ID>) com a data simulada (ver T02). Fechar pop-ups antes do print (roleta e aviso de cookies; recusar). Mesmo enquadramento e rolagem no antes e no depois.
- Ferramenta: Playwright de _sistema/testes (crie _sistema/testes/prints-black.js, que recebe a fase e a lista de páginas). Se não der, entregue ao Gabriel a lista para tirar à mão, com os nomes.

====================================================================
PARTE E · EXECUÇÃO POR TAREFA
====================================================================

--- T00 · PREPARAÇÃO E REGISTRO ---
1. Leia CLAUDE.md, _sistema/docs/07_REGRA_HEADER_FOOTER.md e 08_PROTOCOLO_PUBLICACAO.md. Escreva o bilhete de volta (R8).
2. Peça ao Gabriel o ID do tema duplicado "Black November 2026". Rode 06-comparar-tema-vivo.ps1 e um theme pull SÓ DE LEITURA do tema duplicado para uma pasta de comparação. Liste as diferenças entre tema vivo, duplicado e work/ (em especial: arquivos bb-destaque-*, ganchos do destaque em main-collection, templates/product.black-november.json, banners e configs do Personalizador). Traga para o work/ o que estiver só no ar, registrando no CHANGELOG. [APROVAÇÃO]
3. Backups da rodada (01-backup-tema.ps1, motivo "black-november-2026"). Confirme o 00_ORIGINAL_INTOCAVEL.
4. Crie a pasta e os arquivos da Parte D (ROLLBACK.md com a seção A preenchida, CHECKLIST.md com a Parte J).
5. Prints de base: P01 a P10, celular e computador, do tema ativo. Confira que todos os 20 existem.
Pronto quando: work/ igual ao tema da Black, backups feitos, pasta criada, 20 prints de base.

--- T01 · LEVANTAMENTO (só leitura) ---
1. Liste os arquivos bb-* (sections, snippets, assets), o que cada um faz e em quais templates está (em especial bb-pdp-parcelamento, bb-economia-cashback, bb-pdp-sticky, bb-cat-faq, bb-cat-*).
2. Todas as ocorrências de "6x", "6 x", "6X", "seis vezes", "sem juros", "parcel", "installment" e números de parcela fixos (Liquid, JSON, locales, JS, CSS). Confirme se o "Até 6X sem juros no cartão" é texto do Personalizador no footer-group (manual, R9) ou imagem.
3. Todas as ocorrências de "cashback" e onde o percentual é calculado.
4. Onde estão: a section de abas da home (qual das duas featured-collection-tabs tem Care, Promoções, Collora, Shampoos e Kits), o FAQ da home (faq-homepage), o banner principal (carousel), os banners secundários, o selo de desconto dos cards e da PDP, o elemento principal de conteúdo (ex.: #MainContent) e se o header é fixo ao rolar.
5. Verifique a section nativa sections/countdown.liquid (usada no topo em 2025): o que ela já faz (data, texto, botão, cores, fixo). Diga se serve de base para o T08.
6. Metafields já existentes que sirvam ao T07 (rendimento em banhos, custo por banho): só leitura.
Saída: LEVANTAMENTO.md com tabela # · arquivo/local · trecho · tipo · como alterar (bb-, autorizado, manual, app). Nada é alterado.

--- T02 · CONFIGURAÇÃO CENTRAL ---
1. snippets/bb-black-config.liquid (novo): escreve num elemento oculto, em data-attributes, os valores da Parte C (datas, cashback 5 e 10, início do dobro, parcelas 10, parcela mínima 25, black_ativa true) e as listas de handles por benefício (geradas do CSV: diluidor, compre3leve4, kit_completo) e a lista de handles da Black (todos os 77). Comentário no topo: o que é, como desligar, data de remoção 01/12.
2. assets/bb-black-config.js (novo, defer): lê os valores e expõe window.BBBlack com: ativa() (black_ativa e data dentro do período), cashbackPercent() (5 ou 10 pela data), parcelas(preco), semanaAtual(), estaNaBlack(handle).
   Simulação de data: se a URL tiver ?bb_data=AAAA-MM-DDTHH:MM, use essa data SOMENTE quando a página for prévia de tema (preview_theme_id na URL) ou o editor de tema (Shopify.designMode). No tema ativo, o parâmetro é ignorado.
3. Carregamento global: pela própria section do cronômetro (T08), que está no header group e aparece em todas as páginas. Se não for viável, peça a autorização da Parte B, item 2f.
4. Teste no localhost: bb_data de 2026-10-31T23:00, 2026-11-05, 2026-11-23T00:01 e 2026-12-01T00:01 e mostre os valores de ativa, cashback e semana em cada um.
Rollback: apagar os dois arquivos e as referências (ou black_ativa false, que já desliga tudo).

--- T03 · PARCELAMENTO E CASHBACK ---
1. bb-pdp-parcelamento e bb-economia-cashback passam a ler de window.BBBlack (com o valor do Liquid como inicial, para não piscar). Textos: "até {n}x de R$ {valor} sem juros" e "Ganhe R$ {valor} de cashback". Com a Black inativa: comportamento de hoje (6x e 5%).
2. Exemplos que precisam bater: R$ 517,90 → 10x de R$ 51,79 e cashback R$ 25,90 (5%) ou R$ 51,79 (10%); R$ 1.471,90 → 10x de R$ 147,19; R$ 180,00 → 7x de R$ 25,71; R$ 20,00 → à vista.
3. Demais ocorrências de "6x" do levantamento que forem do tema e não do footer: trocar para ler da configuração ("até 10x" na Black, "6x" fora). As do footer e do Personalizador vão para ROLLBACK.md seção C como manuais.
Prints: depois_T03_P05/P06/P07 (recorte do bloco de preço, parcelas e cashback), com bb_data de 2026-11-05 e de 2026-11-24.
Rollback: restaurar os originais dos dois snippets (ou black_ativa false).

--- T04 · BLOCOS ESCUROS ---
1. assets/bb-black-dark.css (novo), aplicado só quando BBBlack.ativa() (o JS põe a classe bb-black-on no <html>). Seletores sempre dentro do conteúdo principal (ex.: html.bb-black-on #MainContent ...) e do carrinho (drawer e página). Nada em body, header ou footer.
2. Alterne os tons entre seções vizinhas (#0D0C0D, #181818 e o intermediário) para dar profundidade. Texto #FFFFFF; texto secundário com contraste AA; botões #F4CDD4 com texto #0D0C0D; bordas sutis.
3. Contraste AA (4,5:1 texto, 3:1 texto grande e ícones) em: preço, preço riscado, selos, descrição, estrelas e texto da Konfidency (só CSS, nunca no arquivo do app), links, formulários, placeholders, mensagens de estoque e de erro, botões secundários.
4. Página do produto: descrição longa e tabela de diluição legíveis. Se a descrição tiver fundo branco embutido, mantenha um bloco claro para ela. Fotos de produto sem filtro.
5. Mostre a tabela seção × tom e os contrastes calculados. [APROVAÇÃO]
Prints: depois_T04 de P01 a P10 (P10 também escuro, é só cor), celular e computador.
Rollback: apagar o CSS e a classe (ou black_ativa false).

--- T05 · TAG OFERTA BLACK E SELOS ---
1. snippets/bb-tag-oferta-black.liquid (novo): "OFERTA BLACK" no canto superior esquerdo da foto, na galeria da PDP e nos cards de coleção, se o handle estiver na lista da Black OU o produto tiver a tag bn26 (a Mariane coloca as tags no painel), e BBBlack.ativa(). Caixa alta, fundo #0D0C0D, texto #FFFFFF, borda 1px #F4CDD4, pequena no card do celular. Nunca gravada na imagem.
2. Selos de desconto (%) em preto na Black (hoje verdes); rosa só para brinde. Via bb-black-dark.css.
3. Liste os ganchos de 1 linha necessários (render do snippet) e se algum arquivo é protegido. [APROVAÇÃO]
Prints: depois_T05 P02, P05, P07, P10 (P10 sem tag), recorte do card e da galeria.
Rollback: remover os ganchos e o snippet.

--- T06 · COLEÇÃO BLACK NOVEMBER ---
1. Leia como o destaque por link funciona no tema ativo (arquivos trazidos no T00): parâmetro, regras (mesma linha, brinde de R$ 0, página 1), config no Personalizador. Teste no ar com 2 produtos da PRO.
2. Crie templates/collection.black-november.json a partir de collection.colecao-ego.json (não altere o da PRO), com: destaque por link valendo para qualquer produto da coleção black-november (se a regra "mesma linha" bloquear, ajuste só para esta coleção), banner baixo (1920x400 e 745x400), faixa de condições (T09) logo abaixo do banner e a section de FAQ com as 10 perguntas (T11).
3. Mantenha as proteções da feature (brinde de R$ 0 nunca destacado, validação do handle, sem innerHTML).
4. Gere relatorio/LINKS-DESTAQUE.csv: produto · handle · URL de destaque (/collections/black-november?destaque=<handle>) para os 75 produtos que vão para a coleção (os 2 kits vão para a PDP).
5. Teste com 3 produtos de linhas diferentes, um handle inválido e um brinde.
Prints: depois_T06 P02 e P03 (celular e computador). O antes de P02 é a coleção como está hoje.
Rollback: a coleção volta ao template padrão no admin (manual, Gabriel); o arquivo do template pode ficar ou ser apagado depois.
Observação: a aplicação do template na coleção é manual (Gabriel, no admin).

--- T07 · PÁGINA DE PRODUTO DA BLACK ---
1. Puxe templates/product.black-november.json do tema (criado pelo Gabriel no admin), guarde o original e registre as sections atuais.
2. Remova a seção do cupom BEMVINDO10 ("clique para copiar"), se estiver nele.
3. Acrescente, em sections ou snippets novos bb-black-*, lendo de BBBlack e de metafields existentes (sem criar metafield):
   a) tag OFERTA BLACK na galeria (T05);
   b) faixa preta de condições logo abaixo do preço: "até 10x sem juros · Ganhe R$ X de cashback" (de 23/11, "cashback em dobro");
   c) selo rosa do benefício do item, pelas listas do CSV: "+ diluidor de brinde", "+ 4 diluidores e jaleco", "Compre 3, leve 4";
   d) economia ao lado do preço: abaixo de R$ 100, mostrar %; acima, "Você economiza R$ X" (preço comparativo menos preço);
   e) custo por banho na Black, só se existir metafield de rendimento: "de R$ X por R$ Y por banho";
   f) mini cronômetro, só se não repetir visualmente o do topo (proponha);
   g) rodapé perto do botão: "Não acumula com cupons · Enquanto durarem os estoques e os brindes".
4. Mantenha avaliações (Konfidency), compre junto, vídeo Toolstoy, ficha técnica, como usar e barra fixa de compra como no padrão.
5. Mostre o wireframe ou print do localhost antes de finalizar. [APROVAÇÃO]
Prints: depois_T07 P05, P06, P07, P08 (página inteira e recorte da área do preço), datas 2026-11-05 e 2026-11-24.
Rollback: os produtos voltam ao modelo padrão (manual, Mariane, editor em massa); o arquivo pode ficar.

--- T08 · CRONÔMETRO NO TOPO (exceção R9) ---
1. Siga o Protocolo das 5 Etapas (07_REGRA_HEADER_FOOTER.md) e registre o aceite.
2. Avalie a countdown.liquid nativa (T01). Se ela não fizer a troca de texto e de data por semana, crie sections/bb-black-cronometro.liquid (nova) com: os 5 períodos da Parte C (texto, data-alvo, botão), contagem dd : hh : mm (hh : mm : ss no último dia), horário de Brasília, troca automática por data (BBBlack), some fora de 01 a 30/11, fixa no topo ao rolar sem cobrir a barra fixa de compra do celular nem quebrar o header fixo, e textos editáveis no Personalizador.
3. Esta section carrega bb-black-config, bb-black-config.js e bb-black-dark.css (carregamento global do T02).
4. Acrescente-a ao sections/header-group.json, ANTES da barra de avisos. Nada mais muda no grupo. Mostre o diff. [APROVAÇÃO]
5. Teste no localhost: carrinho, menu (celular e desktop), busca e barra de avisos funcionando; cada um dos 5 períodos com bb_data.
Prints: depois_T08 P01, P05 e P09 (recorte do topo), um por período.
Rollback: tirar a section do header-group.json (voltar ao original guardado) e apagar o arquivo.

--- T09 · FAIXA DE CONDIÇÕES ABAIXO DO BANNER ---
1. sections/bb-black-faixa-condicoes.liquid (nova): faixa preta fina, uma frase por vez, troca a cada 4 s, para ao toque, com uma configuração "conjunto de frases" (geral, galões e Essential, PRO, Collora e Xperience). De 23/11, a frase do dobro primeiro. Some com a Black inativa.
2. Coloque logo abaixo do banner em: index.json (geral), collection.black-november.json (geral), collection.colecao-ego.json (PRO), collection.collora.json (Collora e Xperience) e collection.json (galões e Essential). Diffs. [APROVAÇÃO]
3. Confira que a faixa não empurra o conteúdo de forma estranha no celular (altura fixa).
Prints: depois_T09 P01, P02, P04 (recorte abaixo do banner).
Rollback: remover a section de cada template (voltar aos originais) e apagar o arquivo.

--- T10 · ABAS DA HOME ---
1. Na featured-collection-tabs que hoje tem Care, Promoções, Collora, Shampoos e Kits: nova ordem Black November (coleção black-november, aberta por padrão) · Kits · Shampoos · Collora · Care. Remova o bloco Promoções.
2. Destaque visual da aba Black November via bb-black-dark.css (fundo #0D0C0D, texto #F4CDD4). A ordem dos produtos dentro dela é a ordem manual da coleção (a Mariane define no admin).
3. Registre a ordem antiga exata (blocos e block_order) na seção B. Diff. [APROVAÇÃO]
Prints: depois_T10 P01 (recorte das abas), celular e computador.
Rollback: restaurar blocos e block_order originais.

--- T11 · FAQ ---
1. Home: na section faq-homepage, crie 2 blocos faq_item com as perguntas da Parte C e coloque-os PRIMEIRO no block_order. Anote os IDs dos blocos novos na seção B (para remover em 01/12).
2. Coleção Black: section de FAQ no collection.black-november.json com as 10 perguntas (reaproveite faq-homepage ou bb-cat-faq) e JSON-LD FAQPage (snippet bb-black-faq-jsonld, novo, só nesta coleção).
3. Valide o JSON-LD (estrutura válida, textos iguais aos visíveis).
Prints: depois_T11 P01 (recorte do FAQ) e P02 (recorte do FAQ).
Rollback: remover os 2 blocos da home pelo ID; o FAQ da coleção sai junto com o template.

--- T12 · BANNERS ---
1. Espere o Gabriel avisar que a Mariane subiu as imagens bn26_*. Liste as encontradas (API em leitura ou lista colada).
2. Aplique conforme a Parte C: imagem desktop e celular, link de destino, texto alternativo. Registre os banners antigos (arquivo, link, ordem) na seção B. Diff do index.json. [APROVAÇÃO]
3. Banner da coleção no collection.black-november.json.
Prints: depois_T12 P01 (banner, cada slide) e P02.
Rollback: restaurar imagens, links e ordem antigos.

--- T13 · TESTES, PRINTS E RELATÓRIO ---
1. Matriz de datas (bb_data, na prévia): 2026-10-31T23:00 (nada da Black aparece), 2026-11-05, 2026-11-12, 2026-11-18, 2026-11-24 (dobro), 2026-11-30T23:58 e 2026-12-01T00:01 (tudo some). Em cada uma: cronômetro (texto e alvo), faixa (1ª frase), cashback (5 ou 10), parcelas, tag, blocos escuros.
2. Konfidency: estrelas e texto na PDP (padrão e black-november) e nos cards; legível no escuro; layout do celular. Tabela por produto.
3. Destaque: 3 linhas diferentes, handle inválido, brinde R$ 0.
4. Console sem erros novos; nenhuma chamada /cart/* disparada pelos scripts novos; Lighthouse do celular em P01 e P05 sem piorar mais de 5 pontos contra a base.
5. Gate: 04-validar.ps1 (descontada a baseline herdada).
6. Prints de depois que faltarem (ver CHECKLIST). Confira pares: todo depois tem o seu antes (ou base).
7. Relatório (relatorio/RELATORIO-BLACK-NOVEMBER-2026.html e .pdf, este pelo Playwright page.pdf, A4 deitado):
   capa (Black November 2026 · ajustes do tema · data · tema e IDs) · sumário · resumo das 14 tarefas (Parte A) · uma seção por tarefa: o que mudou e por quê, arquivos, prints antes e depois lado a lado (celular e computador), como reverter · seção dos ajustes manuais (com os prints que o Gabriel autorizar) · checklist final · links de destaque (LINKS-DESTAQUE.csv) · como publicar e como reverter.
8. Publicação: prepare os comandos theme push --only exatos (só os arquivos desta rodada) para o tema duplicado, a verificação por theme pull (R13) e o link de prévia. O Gabriel publica em 31/10 às 23h50 (R1). Depois da publicação, prints do tema ativo (fase "publicado") de P01, P02, P05.

--- T14 · ROLLBACK EM 01/12 (só quando o Gabriel pedir) ---
Ver Parte I.

====================================================================
PARTE F · AJUSTES MANUAIS (o Claude não faz; registra e fotografa)
====================================================================
Para cada um: print de antes (tema ativo) quando o Gabriel avisar que vai fazer, print de depois quando ele avisar que fez, linha na seção C, D ou E do ROLLBACK.md e linha no CHECKLIST.
M01 menu: "Promoções" vira "Black November" → /collections/black-november (Gabriel, 31/10 23h50; o menu muda na hora no site ativo).
M02 barra de avisos: "até 10x sem juros"; "Cashback em todas as compras"; de 23/11, "Cashback em dobro em todas as compras" primeiro (Gabriel, Personalizador do tema duplicado).
M03 ícone do rodapé "Até 6X sem juros no cartão" → "Até 10x sem juros no cartão" (Gabriel, Personalizador).
M04 checkout: fundo e logo da Black (Gabriel, Configurações > Checkout, 31/10 23h50).
M05 preços "de" e "por" (Mariane, 31/10; print de P05 a P08 antes e depois).
M06 tags bn26 e coleção com os produtos (Mariane).
M07 modelo de página black-november nos produtos (Mariane; 10 principais em 30/10, demais a partir de 02/11).
M08 SEO da coleção (imagem, descrição, título e meta descrição) (Mariane).
M09 BOGO: diluidor e compre 3, leve 4 (Mariane; print do carrinho).
M10 roleta em tema escuro (Mariane; print da roleta aberta).
M11 template da coleção black-november aplicado à coleção no admin (Gabriel).

====================================================================
PARTE G · O QUE NÃO FAZER
====================================================================
- Não publicar, não dar push no tema ativo, não usar --live ou --allow-live.
- Não mexer em preço, tag, coleção, metafield, produto (R3).
- Não editar header.liquid, announcement-bar.liquid, footer-group.json, menu, settings_data.json, settings_schema.json, locales, arquivos de app.
- Não pintar header e footer.
- Não criar contador que reinicia, nem "só hoje" falso.
- Não seguir adiante numa [APROVAÇÃO] sem o "ok" do Gabriel.

====================================================================
PARTE I · ROLLBACK DE 01/12 (roteiro)
====================================================================
Ordem (o Claude faz o que é tema; lista e confere o que é manual):
1. Confirmar com o Gabriel que as campanhas pararam em 30/11 23h59.
2. Backup da rodada "rollback-black-november".
3. Manuais primeiro (lista para a equipe, com status): preços de volta (M05), BOGO da Black desligado (M09), modelo de página padrão nos produtos (M07, editor em massa), coleção sai do menu (M01 de volta a "Promoções"), barra de avisos (M02), rodapé (M03, "6X"), checkout (M04), roleta (M10), SEO da coleção para texto sem datas (M08). As tags bn26 podem ficar.
4. Tema, item por item da seção B, voltando ao ANTES exato (originais guardados):
   - header-group.json sem o cronômetro (T08); apagar bb-black-cronometro;
   - templates sem a faixa de condições (T09); apagar bb-black-faixa-condicoes;
   - index.json: abas e block_order originais (T10), remover os 2 blocos de FAQ pelos IDs (T11), banners antigos (T12);
   - snippets de parcelamento e cashback originais (T03);
   - ganchos e snippet da tag (T05); bb-black-dark.css (T04); bb-black-config e bb-black-config.js (T02);
   - collection.black-november.json e product.black-november.json podem ficar (sem uso) ou sair depois que nenhuma coleção ou produto os usar (confirmar no admin).
5. Conferir: 6x e cashback normal, nada da Black visível, nenhum erro no console, gate verde.
6. Prints de rollback de P01 a P10 (celular e computador), comparados aos de base: listar qualquer diferença.
7. Push pelo protocolo R10 a R13 (o Gabriel publica). Relatório de rollback anexado ao relatório principal: revertido · mantido de propósito · não encontrado (não forçar: mostrar).

====================================================================
PARTE J · CHECKLIST MESTRE (copiar para CHECKLIST.md e manter)
====================================================================
Para cada item: [ ] feito · [ ] testado · [ ] print antes/base · [ ] print depois · [ ] registrado no ROLLBACK · [ ] aprovado pelo Gabriel

T00  [ ] work/ sincronizado com o tema ativo (destaque incluído) · [ ] backups · [ ] pasta e ROLLBACK.md (A) · [ ] CHECKLIST.md · [ ] 20 prints de base
T01  [ ] LEVANTAMENTO.md · [ ] countdown nativa avaliada · [ ] "6X" do rodapé confirmado como manual
T02  [ ] bb-black-config.liquid · [ ] bb-black-config.js · [ ] simulação de data só na prévia · [ ] teste das 4 datas
T03  [ ] parcelamento lendo a config · [ ] cashback lendo a config · [ ] exemplos de valor conferidos · [ ] outros "6x" do tema · [ ] prints P05 P06 P07
T04  [ ] bb-black-dark.css · [ ] header e footer intocados · [ ] contraste AA · [ ] prints P01 a P10
T05  [ ] tag OFERTA BLACK · [ ] selos pretos · [ ] Care sem tag (P10) · [ ] prints
T06  [ ] destaque entendido e testado no ar · [ ] collection.black-november.json · [ ] LINKS-DESTAQUE.csv · [ ] testes de destaque · [ ] prints P02 P03
T07  [ ] product.black-november.json puxado e original guardado · [ ] BEMVINDO10 fora · [ ] destaques a a g · [ ] Konfidency e compre junto mantidos · [ ] prints P05 a P08
T08  [ ] Protocolo das 5 Etapas registrado · [ ] bb-black-cronometro · [ ] header-group.json (só a section nova) · [ ] fixo sem quebrar header e carrinho · [ ] 5 períodos testados · [ ] prints
T09  [ ] bb-black-faixa-condicoes · [ ] 5 templates · [ ] dobro em 23/11 · [ ] prints
T10  [ ] abas na nova ordem · [ ] Promoções fora · [ ] destaque da aba · [ ] ordem antiga registrada · [ ] prints
T11  [ ] 2 FAQs na home (IDs anotados) · [ ] 10 FAQs na coleção · [ ] JSON-LD válido · [ ] prints
T12  [ ] imagens encontradas · [ ] banners e links aplicados · [ ] antigos registrados · [ ] prints
T13  [ ] matriz de datas · [ ] Konfidency · [ ] destaque · [ ] console e Lighthouse · [ ] gate · [ ] relatório HTML · [ ] relatório PDF · [ ] comandos de push · [ ] prints "publicado"
M01 a M11  [ ] cada ajuste manual com antes, depois e linha no ROLLBACK
T14 (01/12)  [ ] manuais conferidos · [ ] tema revertido item a item · [ ] prints de rollback · [ ] relatório de rollback

Ao fim de cada sessão: mostre o CHECKLIST.md atualizado e o próximo passo.

COMECE PELO T00, item 1. Antes de alterar qualquer arquivo, confirme comigo o ID do tema duplicado.
```

---

## Depois

- O relatório em PDF sai em `lojas/bubbles/historicos-de-alteracao/black-november-2026/relatorio/` do projeto `shopify-estrutura`.
- A lista de links de destaque (`LINKS-DESTAQUE.csv`) vai para a montagem dos anúncios da Meta (TRAF-07).
- Se mudar alguma decisão (texto do cronômetro, faixa, FAQ), edite a Parte C antes de colar ou peça ajuste ao Claude no meio da execução.
