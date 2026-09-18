# Plano da versão B da LP Care (captação de revenda)

> Documento de decisão. Nada foi implementado ainda. Ler as seções 3 e 8 antes de aprovar:
> há pontos que travam parte do plano e exigem informação que não está no código.

---

## 1. Onde o diagnóstico está certo

Concordo com 4 dos 5 pontos, e a razão técnica de cada um:

| Ponto do diagnóstico | Por que procede |
|---|---|
| **Formulário escondido no fim** | A página tem 17 blocos. O formulário é o 12º. Todo CTA da página é âncora `#cadastro`, ou seja, o lojista clica e **rola** até o fim. Quem fecha antes some sem deixar rastro. |
| **Excesso de carga cognitiva** | A seção de produtos abre 11 SKUs com ficha de benefício ("realça pelagem clara", "com óleo de argan"). Isso é copy de PDP para tutor, não de captação B2B. |
| **Calculadora enterrada** | É o único bloco que fala a língua do lojista (número), e está no 7º lugar. |
| **Depoimentos desalinhados** | Os 3 depoimentos são de distribuidores (MANTYPET, Assispet, SERRAPET). O público-alvo da campanha é o groomer/petshop, que não se vê ali. |

## 2. Onde eu discordo, com ressalva

**"Remova a menção ao TikTok."** O diagnóstico está certo no *problema* e exagerado na *solução*.

O problema é real: dizer "TikTok Shop" para um lojista descreve um **canal concorrente** que vende direto ao tutor, mais barato, sem passar por ele. A frase atual ("2.665 pessoas trabalhando de graça pra levar o tutor até o seu balcão") não se sustenta logicamente se a compra acontece no app.

Mas remover o bloco inteiro tira o **único lastro de prova** da promessa central da página. A LP inteira foi construída sobre uma tese: *"não vai encalhar, porque a demanda já existe"*. Sem número, isso vira promessa vazia, que converte pior que promessa mal enquadrada.

**Caminho:** manter os números, tirar o canal de venda da frase. Falar de **desejo de marca**, não de loja online.

- Hoje: "2.665 criadores já estão gerando procura pela Bubbles no TikTok Shop"
- Proposto: "+3.500 vídeos de creators já colocaram a Bubbles na frente do tutor. Quando ele vir a Care na sua prateleira, não vai ser a primeira vez."

---

## 3. Conflitos que travam parte do plano

Estes quatro pontos **não posso resolver sozinho**. Preciso de informação ou decisão sua.

### 3.1 Depoimento de groomer não existe (bloqueante)

O diagnóstico pede trocar os depoimentos de distribuidor por depoimentos de dono de petshop. **Não temos esses depoimentos.** Os 3 atuais são reais e são de distribuidores.

Não vou inventar depoimento de petshop: seria fabricar conteúdo de cliente, e é o tipo de coisa que destrói confiança se alguém checar. Opções:

- **(a)** Você consegue 2-3 depoimentos reais de petshop/groomer que já revende a Care
- **(b)** Mantenho os de distribuidor, mas reposiciono o bloco: deixa de ser "gente como você" e vira "quem já apostou na marca" (prova de solidez, não de espelho)
- **(c)** A versão B roda **sem** prova social de terceiros, e o teste mede se isso pesa

Minha recomendação: **(b)** agora, migrando pra **(a)** assim que houver depoimento real. A opção (c) joga fora um ativo que já existe.

### 3.2 A margem real não está fechada (bloqueante e mais grave)

O diagnóstico pede destacar "margem de lucro média de X%". **Esse número não existe hoje**, e há um problema anterior a ele, que registrei no briefing original e continua aberto:

> Com a tabela de preços recebida, comprando de 1 a 99 unidades pela Shopify, o custo por
> unidade fica **acima** do preço sugerido de revenda ("Con. Final"). No papel, o lojista
> teria **prejuízo** revendendo em qualquer quantidade abaixo de 100 unidades.

A calculadora atual (`CareCalculator.tsx`) contorna isso com um valor fixo de placeholder:

```
const LUCRO_MEDIO_POR_UNIDADE = 12 // placeholder
// TODO [a confirmar com Ivan]: não plugar em produção sem esses números
```

**Isso é o núcleo do problema de conversão, não um detalhe.** Uma LP B2B que promete lucro e apresenta número inventado tem dois destinos: ou o lojista não acredita e sai, ou acredita, compra, faz a conta e vira reclamação.

Antes de subir a calculadora pra segunda dobra (o que o diagnóstico pede, e eu concordo), preciso da **margem real por faixa de compra**. Sem isso, a versão B repete o mesmo erro em posição mais visível, o que é pior que hoje.

### 3.3 Formulário curto x qualificação do lead

O formulário atual tem 3 etapas e segmenta em Varejo (mín. R$ 3.000) / Distribuidor (mín. R$ 10.000) / Outro. **Essa segmentação decide se o lead entra no CRM ou vai só pro WhatsApp.** Um formulário de 4 campos na primeira dobra joga essa lógica fora.

**Caminho proposto (captura cedo, qualifica depois):**

1. Na dobra: 4 campos (nome, WhatsApp, nome da empresa, "você é: petshop / distribuidor / outro")
2. Envia e **já registra o lead** no Netlify + CRM
3. Na tela de confirmação, oferece completar o perfil (CNPJ, cidade, investimento pretendido)

Assim o lead nunca se perde por abandono no meio do formulário, e a qualificação vira um bônus em vez de um pedágio.

### 3.4 Hotjar / Clarity é decisão à parte

Instalar mapa de calor exige: aprovar uma biblioteca nova (regra 6 da `CONVENCOES.md`), liberar o domínio no `script-src` e `connect-src` do `netlify.toml`, e avaliar LGPD, já que essas ferramentas gravam sessão. **Não faço sem sua ordem explícita.**

Vale dizer: **boa parte do que o mapa de calor mostraria, o `scroll_depth` que já implementamos vai mostrar de graça**, sem lib nova e sem gravar sessão. Sugiro montar o `ScrollDepthTracker` na versão B e olhar esse dado antes de instalar qualquer coisa.

---

## 4. O ponto que o diagnóstico não cobriu (e que pode ser o mais importante)

Você levantou algo que não está no diagnóstico e que, para a **persona groomer**, é a objeção número um:

> *"Se eu vender o produto pro tutor levar pra casa, ele vai espaçar os banhos e eu perco receita de serviço."*

Essa é uma objeção **existencial**, não comercial. Enquanto ela não cair, nenhum argumento de margem funciona: o groomer está comparando um lucro novo e incerto contra a receita que já paga a conta dele.

**Onde ela está hoje:** espremida em dois lugares discretos. Um card na seção "Por que revender" ("Complementa, não substitui") e a 3ª pergunta do FAQ. Ou seja: a objeção mais forte do público-alvo aparece depois de 12 blocos, dentro de um acordeão fechado.

**Na versão B ela vira seção própria, logo depois da calculadora**, com o argumento invertido:

- Não é "a Care não atrapalha o seu banho" (defensivo, admite a dúvida)
- É "**o pet que usa Care em casa volta com menos nó, o banho rende mais e o tutor volta mais rápido**" (a manutenção em casa **melhora** a operação e encurta o ciclo de recompra do serviço)

Esse é, na minha leitura, o maior ganho potencial de conversão do teste inteiro, acima de mexer na posição do formulário.

---

## 5. Estrutura proposta da versão B

| # | Bloco | Origem | Objetivo |
|---|---|---|---|
| 1 | **Hero com formulário ao lado** | novo | Promessa financeira + captura sem rolagem |
| 2 | **Simulador de lucro** | reposicionado (era 7º) | B2B decide por número |
| 3 | **"Vender Care não tira seu banho"** | novo (era card + FAQ) | Mata a objeção nº 1 do groomer |
| 4 | **Prova de demanda reformulada** | reescrito | Desejo de marca, sem canal de venda |
| 5 | **Portfólio em bloco único** | condensado (era 11 cards) | "11 produtos de alto giro", sem ficha técnica |
| 6 | **Por que revender** | enxugado (6 → 4 cards) | Margem, giro, marketing, suporte |
| 7 | **Como funciona** | mantido | Mostrar que a entrada é rápida |
| 8 | **Prova social** | depende da decisão 3.1 | Confiança |
| 9 | **FAQ enxuto** | 11 → ~6 perguntas | Só objeção B2B |
| 10 | **CTA final** | mantido | Última captura |

**Sai da versão B:** `CareConnection`, `CareJourney`, `CareTicker`, `CareBrand` (institucional), `CareDemandGallery`. São 17 blocos hoje contra ~10 na B.

---

## 6. Impactos técnicos

| Item | Impacto |
|---|---|
| **Rota** | `/care-b`, seguindo a convenção do `spitz-alemao-b` |
| **SEO** | `robots: { index: false }`, como toda variante de teste. Não afeta o ranking da `/care` |
| **Isolamento** | Componentes novos em `src/components/lp/care-b/`. **A `/care` atual não é tocada** (regra 14) |
| **Dados** | Reaproveita `src/lib/care.ts`. Textos novos entram como constantes próprias da B |
| **GTM** | `/care-b` usa `GTM-N4PHK6DM` (padrão, mesmo da `/care`) |
| **Rastreamento** | Mantém `form_name: 'care-lead'` (Nível 1 válido) e adiciona `variante: 'b'` no payload. Assim o CRM separa A de B sem criar nome de evento novo, que exigiria gatilho novo no GTM |
| **Mapa de páginas** | Entra na home com label de variante de teste (regra 22) |
| **Netlify Forms** | Campo `variante` precisa ser declarado no `public/__forms.html`, senão é descartado em silêncio |

---

## 7. Riscos do teste

1. **Teste sem tráfego suficiente não conclui nada.** Com muitas mudanças de uma vez, se a B ganhar você não saberá qual mudança causou o ganho. É um teste de *conceito* (página curta e financeira vs. longa e educativa), não de elemento isolado. Isso é aceitável aqui, dado que a A performou mal, mas precisa ser consciente.
2. **A margem placeholder é o maior risco.** Ver 3.2.
3. **Página mais curta pode reduzir lead de baixa intenção e aumentar lead qualificado.** Se você medir só volume bruto, a B pode "parecer" pior sendo melhor. Sugiro comparar **lead qualificado** (`lead_qualified: true`), não total.
4. **A objeção do groomer pode não ser vencida por texto.** Se depois do teste ela continuar aparecendo no WhatsApp, o caminho é prova (um caso real de petshop que aumentou ticket), não copy melhor.

---

## 8. O que preciso de você antes de construir

| # | Preciso de | Trava o quê |
|---|---|---|
| 1 | **A margem real por faixa de compra** (ou autorização pra manter estimativa e rotular como tal na página) | O bloco mais importante da B |
| 2 | **Decisão sobre depoimentos:** (a) você consegue reais de petshop, (b) mantenho os de distribuidor reposicionados, ou (c) sem prova social | Bloco 8 |
| 3 | **Ok no formulário em duas etapas** (captura na dobra, perfil na confirmação) | Bloco 1 |
| 4 | **Hotjar/Clarity: instalo ou fico com o `scroll_depth`?** | Nada, é paralelo |
| 5 | **Confirmar a rota `/care-b`** | Estrutura |
