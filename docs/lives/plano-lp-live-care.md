# Planejamento: LP da Live de Lançamento da Linha Care

> **STATUS: página construída em 18/08/2026.** Rota `/live-care` no ar (build e lint limpos).
> Decisões tomadas por padrão na construção: slug `/live-care`, `GTM-5L9TD3PN`, vitrine pura
> (sem link de loja), kits só citados na copy, e pergunta de replay fora da FAQ.
> Ainda pendentes: fotos e bios das apresentadoras, foto do herói, e a URL da coleção Care
> caso você queira o link para a loja.

---

## 1. Resumo executivo

| Item | Definição |
|---|---|
| **Tipo de página** | Captura pura. Sem venda, sem checkout, sem gatilho de compra. |
| **CTA único** | Entrar no grupo do WhatsApp |
| **Evento** | Live de lançamento da Linha Care |
| **Data** | Domingo, 23 de agosto de 2026 (confirmado: é domingo mesmo) |
| **Horário** | 19h, horário de Brasília |
| **Duração** | 1 hora |
| **Onde acontece** | Ao vivo no Instagram da Bubbles, com aviso no grupo do WhatsApp |
| **Apresentam** | Amanda Moreth e Ellen Lourenção (equipe interna Bubbles) |
| **Público** | Groomers e tosadores profissionais, todos os níveis, clientes e não clientes |
| **Tráfego** | Anúncios pagos, público frio e morno |
| **Grupo** | VIP existente, sem limite de vagas |
| **Link do grupo** | `https://chat.whatsapp.com/EMFIIEEEzovLfLT5veZVBW` |
| **Tema visual** | Claro, `DESIGN-SYSTEM.md` padrão |
| **Prazo real** | 5 dias a partir de hoje (18/08). A urgência da página é genuína. |

### Diferença desta página para as MasterClasses
Isso muda decisões de estrutura, não é só tema/data diferente:

| | MasterClass (Spitz, Rostinho Bebê) | Esta live |
|---|---|---|
| Acesso | Destravado por compra | Aberto, gratuito |
| Formato | Aula técnica com roteiro | Bate-papo dinâmico, com gatilhos de venda |
| Plataforma | Google Meet (fechado) | Instagram (aberto) |
| CTA | Cadastro + compra | Só entrar no grupo |
| Entregáveis | Certificado, replay, material | Lembretes, cupons, comunidade |
| Bloco de produtos | Shoppable, com botão comprar | Vitrine sem preço e sem botão de compra |

**Referência estrutural mais próxima:** a LP `/live-dia-do-tosador` que já existe (mesmo público, mesmo CTA de grupo, mesma lógica de countdown). A diferença é que aquela foi restilizada para **tema escuro** e esta será **clara**.

---

## 2. Decisões pendentes (preciso da sua resposta antes de codar)

### 2.1 Bloqueantes

**A) Slug da página**
O briefing não define a URL. Minha recomendação:

| Opção | Prós | Contras |
|---|---|---|
| `/live-care` **(recomendado)** | Curto, fácil de digitar na bio do Instagram e em anúncio | Genérico se houver outras lives da Care depois |
| `/live-lancamento-care` | Descritivo, bom para SEO | Longo para digitar no celular |
| `/live-23-08` | Datado, reutilizável para outras lives | Não comunica o tema |

**B) Rastreamento** ✅ **RESOLVIDO: `GTM-5L9TD3PN`**

Observação para registro: o item 11 do briefing dizia que a página "herda GA4 + Google Ads + Meta Pixel já configurados no sistema". Isso deixou de valer em 18/08, quando removemos esses três scripts do `layout.tsx`. Hoje cada página carrega só o seu próprio contêiner GTM, e as tags de GA4, Ads e Meta são configuradas dentro do GTM.

Esta página usa o **`GTM-5L9TD3PN`** (contêiner de ecommerce, masterclass, lives e iscas), não o de captação.

**C) Fotos das apresentadoras**
O briefing diz "tem no drive", mas os arquivos não chegaram. Preciso das fotos da **Amanda Moreth** e da **Ellen Lourenção** para a seção de autoridade. Sem elas, a seção fica com placeholder cinza.

**D) Imagem de herói**
Também marcada como "tem no drive". Ver especificação na seção 6.

### 2.2 Não bloqueantes (dá pra subir sem, mas a página fica melhor com)

**E) Vai ter replay?**
O briefing não responde. É a pergunta mais comum de quem não pode assistir ao vivo, e a falta de resposta gera desconfiança. Se a live ficar salva no perfil do Instagram, vale dizer isso na FAQ.

**F) Número de prova social específico**
O campo ficou em branco. **Fallback proposto:** usar o `+5.000 groomers parceiros` que já é constante da marca (`BRAND.groomers`), igual às outras LPs. Se você tiver o número real de pessoas já no grupo VIP, fica mais forte ("junte-se a X groomers que já estão no grupo").

**G) Depoimentos de lives anteriores**
Marcado sem resposta. Se não houver, a seção de prova social usa só o número de groomers e a credibilidade da marca. Não vou inventar depoimento.

**H) YouTube simultâneo?**
Na seção 2 do briefing está marcado "Instagram/YouTube", mas na seção 5 você escreveu "é uma live no instagram". Vou tratar como **só Instagram**. Se for nos dois, me avise para ajustar a copy.

**I) Meta de entradas no grupo**
Campo em branco. Não afeta a página, mas ajuda a definir o que é sucesso.

### 2.3 Ponto de conformidade que quero alinhar

O tema do briefing é "**fature 2 vezes**". O `tom-de-voz.md` proíbe "promessas vagas ou exageradas sem embasamento". Se lido como "dobre seu faturamento", vira promessa não comprovável.

**Solução proposta:** enquadrar como fato de modelo de negócio, não como promessa de resultado. Ou seja, "fature duas vezes **com o mesmo cliente**" (o serviço no salão + o produto que ele leva pra casa). Isso é descritivo e verdadeiro, não é promessa de dobrar receita. É o mesmo enquadramento que já usamos na LP `/care`.

---

## 3. Arquitetura de arquivos (respeitando o isolamento entre LPs)

```
src/
  app/
    live-care/                      ← slug a confirmar
      page.tsx                      ← composição + metadata + JSON-LD do evento + GTM
      opengraph-image.tsx           ← imagem de compartilhamento
  components/
    lp/
      live-care/                    ← pasta isolada, nada compartilhado com outra LP
        LiveCareHero.tsx
        LiveCareCountdown.tsx
        LiveCareReasons.tsx
        LiveCareLineup.tsx
        LiveCareGroupBenefits.tsx
        LiveCareHosts.tsx
        LiveCareAudience.tsx
        LiveCarePrizes.tsx
        LiveCareFaq.tsx
        LiveCareFinalCta.tsx
        LiveCareFooter.tsx
        LiveCareStickyBar.tsx
        LiveCareFloatingWhatsApp.tsx
        LiveCareExitPopup.tsx
        LiveCareEventGate.tsx
        trackLiveCare.ts
  lib/
    live-care.ts                    ← TODOS os textos e dados desta LP, isolados
```

**Arquivos compartilhados que serão tocados (e por quê):**

| Arquivo | Mudança | Impacto |
|---|---|---|
| `src/app/page.tsx` | Adicionar a nova página no mapa interno | Obrigatório pela regra 22 do `CONVENCOES.md` |
| `src/app/sitemap.ts` | Adicionar a nova rota | SEO |
| `src/components/ui/GtmScript.tsx` | Só **usar**, não alterar | Nenhum |

Nada em `src/lib/care.ts`, nada em `src/components/lp/care/`, nada em `layout.tsx` ou `globals.css`.

---

## 4. Estrutura da página, seção a seção

Ordem pensada para tráfego frio: valor em 5 segundos, depois prova, depois quebra de objeção, sempre com o mesmo botão.

---

### Seção 1. Herói (above the fold)

**Objetivo:** em 5 segundos a pessoa entende o que é, quando é, e o que fazer.

**Layout:** duas colunas no desktop (texto à esquerda, imagem à direita), empilhado no mobile com o texto primeiro.

**Copy sugerida:**

> **[eyebrow]** LIVE DE LANÇAMENTO · LINHA CARE
>
> **[H1]** Transforme cada banho em uma nova oportunidade de venda
>
> **[subtítulo]** No domingo, 23 de agosto, apresentamos a Linha Care ao vivo: a linha de home care que faz o resultado do seu banho e tosa continuar na casa do tutor, e abre uma nova frente de faturamento no seu negócio, sem aumentar o número de atendimentos.
>
> **[prova social]** ✓ +5.000 groomers parceiros já confiam na Bubbles
>
> **[meta em pílulas]** 📅 Domingo, 23/08 · 🕖 19h (Brasília) · ⏱️ 1 hora · 📱 Ao vivo no Instagram
>
> **[contagem regressiva real]** Faltam: 05d 04h 12m 33s
>
> **[CTA verde]** Entrar no grupo do WhatsApp →
>
> **[microcopy sob o botão]** Gratuito. É no grupo que avisamos a hora da live e liberamos os cupons.

**Componentes:** `LiveCareHero`, `LiveCareCountdown`, `LiveCareEventGate`.

**Imagem:** `[FOTO-01]` (ver seção 6).

**Mobile:** H1 em `text-3xl`, botão largura total, contagem regressiva em uma linha só com 4 blocos.

---

### Seção 2. O que você ganha assistindo

**Objetivo:** justificar 1 hora do domingo à noite do groomer. São os 5 motivos do briefing, que já vieram muito bem escritos.

**Layout:** grade de 5 cards. 1 coluna no mobile, 2 no tablet, 3 no desktop (o quinto card ocupa destaque).

**Conteúdo (direto do briefing, com títulos encurtados para leitura rápida):**

| Ícone | Título | Texto |
|---|---|---|
| Sparkles | Conheça uma linha feita para prolongar o resultado do banho | Produtos que ajudam o tutor a manter em casa a aparência, o perfume e o cuidado conquistados no banho e tosa. |
| Target | Faça recomendações mais assertivas | Entenda como indicar o produto adequado para cada pet e transformar seu conhecimento profissional em uma experiência ainda melhor para o cliente. |
| TrendingUp | Amplie suas oportunidades de ganho | Veja como a Linha Care pode gerar novas vendas e ampliar o faturamento do banho e tosa por meio da indicação de produtos para home care. |
| Award | Diferencie seu atendimento | Ofereça uma solução completa: o cuidado começa no seu espaço e continua na casa do tutor, fortalecendo sua autoridade como profissional. |
| Star | Veja o lançamento em primeira mão | Saiba quais são os produtos, benefícios e formas de apresentar a Bubbles Care aos clientes antes que todo mundo conheça. |

**Componente:** `LiveCareReasons`. Ícones da `lucide-react` (padrão do projeto, sem emoji no código).

---

### Seção 3. A linha que vamos apresentar

**Objetivo:** criar desejo pelo produto. A pessoa vê que existe algo concreto e novo, e entende que o caminho para conhecer é a live.

**Boa notícia:** as 11 fotos dos produtos Care **já existem no projeto** (`public/images/care/`), não precisam vir do drive.

#### ⚠️ Decisão pendente: vitrine ou loja?

Aqui apareceu uma contradição que preciso que você resolva. O briefing (seção 1) diz: *"sem venda, sem gatilho de compra, um único CTA"*. Mas você me enviou todos os links de produto da Shopify, o que sugere o contrário.

| Opção | Como fica | Quando faz sentido |
|---|---|---|
| **A. Vitrine pura** *(fiel ao briefing)* | Foto e nome, sem preço, sem botão, sem link. Único CTA da página continua sendo o grupo. | A live é o evento de lançamento e a compra deve acontecer **durante** a transmissão, com o cupom que só sai ao vivo. Manter link agora "vaza" a conversão antes da hora e enfraquece o motivo de assistir. |
| **B. Vitrine com link para a loja** | Cada card leva para a página do produto na Shopify, em nova aba, via `CtaLink` (preserva UTM). | Se a linha já está à venda e você quer aproveitar o tráfego pago para vender mesmo de quem não vai assistir. |
| **C. Híbrido** *(meu voto)* | Os 11 produtos ficam em vitrine pura, e só um bloco discreto no fim da página, depois do CTA principal, leva para a coleção Care completa. | Preserva o foco no grupo, mas não perde quem já chegou decidido a comprar. |

Enquanto você não decidir, sigo com a **opção A**, que é o que o briefing diz.

#### Catálogo recebido (URLs oficiais confirmadas)

Confirmei os 11 produtos contra o `src/lib/care.ts`: **nome e volume batem em todos**, nenhuma divergência de cadastro.

| # | Produto | Vol. | URL |
|---|---|---|---|
| 1 | Shampoo Neutro | 300ml | `/products/shampoo-pet-neutro-care-300ml` |
| 2 | Shampoo Limpeza Profunda | 300ml | `/products/shampoo-pet-limpeza-profunda-care-300ml` |
| 3 | Shampoo Pelos Claros | 300ml | `/products/shampoo-pet-pelos-claros-care-300ml` |
| 4 | Condicionador Hidratante | 250ml | `/products/condicionador-pet-hidratante-care-250ml` |
| 5 | Máscara Multifuncional | 100ml | `/products/mascara-pet-multifuncional-care-100ml` |
| 6 | Secagem Rápida | 100ml | `/products/secagem-rapida-pet-care-100ml` |
| 7 | Banho a Seco Desembaraçador | 250ml | `/products/banho-pet-a-seco-desembaracador-care-250ml` |
| 8 | Limpeza de Olhos e Ouvidos | 100ml | `/products/limpeza-pet-olhos-e-ouvidos-care-100ml` |
| 9 | Hidratante de Patas e Focinhos | 50ml | `/products/hidratante-pet-patas-e-focinhos-care-50ml` |
| 10 | Body Splash Flora | 80ml | `/products/body-splash-pet-flora-care-80ml` |
| 11 | Body Splash Luna | 80ml | `/products/body-splash-pet-luna-care-80ml` |

Domínio base: `https://www.bubbles.com.br`

#### Os 5 kits (informação nova, não estava no briefing)

| Kit | URL |
|---|---|
| Kit Banho Completo | `/products/kit-pet-banho-competo-care` |
| Kit Tratamento Profundo | `/products/kit-pet-tratamento-profundo-care` |
| Kit Pelos Claros | `/products/kit-pet-pelos-claros-care` |
| Kit Cuidado Total | `/products/kit-pet-cuidado-total-care` |
| Kit Cuidados Essenciais | `/products/kit-pet-cuidados-essenciais` |

**Três pontos sobre os kits:**

1. **Não temos foto de nenhum kit.** Se eles entrarem na página, preciso das 5 imagens.
2. **A URL do primeiro kit tem um erro de digitação na Shopify:** `banho-competo` em vez de `banho-completo`. Não é erro meu, é o slug real que você me passou. Vale corrigir na Shopify (com redirecionamento da URL antiga), senão fica assim para sempre no link.
3. **Kits combinam melhor com live de lançamento** do que produtos avulsos, porque elevam o ticket e simplificam a decisão de quem está começando. Se a oferta ao vivo for de kit, faz sentido eles aparecerem na página. Me diga se entram.

**Copy sugerida:**

> **[eyebrow]** O QUE VOCÊ VAI CONHECER
>
> **[H2]** 11 produtos pensados para o cuidado continuar depois que o pet sai do seu salão
>
> **[texto]** Shampoos, condicionamento, finalizadores, perfumes e cuidados específicos. Na live, mostramos produto por produto e como apresentar cada um ao tutor.
>
> **[grade de 11 imagens, só foto e nome]**
>
> **[CTA]** Quero ver o lançamento ao vivo →

**Componente:** `LiveCareLineup`. Reaproveita os dados de `CARE_PRODUCTS` como **referência de conteúdo**, mas com cópia própria em `src/lib/live-care.ts` (regra 17: cada LP tem seu arquivo de dados).

---

### Seção 4. Por que entrar no grupo (a ponte)

**Objetivo:** essa é a seção mais importante da página. A live é no Instagram, mas o CTA é o WhatsApp. Sem essa ponte explicada, a pessoa pensa "então eu só abro o Instagram no domingo" e não converte.

**Copy sugerida:**

> **[eyebrow]** COMO NÃO PERDER
>
> **[H2]** A live é no Instagram. O aviso, os cupons e os brindes saem no grupo.
>
> **[3 cards]**
>
> 🔔 **Lembrete na hora certa** · A gente te avisa quando a live começar. Você não perde o horário no meio do domingo.
>
> 🏷️ **Promoções exclusivas** · Cupons e condições especiais circulam primeiro no grupo, antes de qualquer outro canal.
>
> 👥 **Comunidade de groomers** · Troca de informação com profissionais atuantes de todo o Brasil, todos os dias, não só no dia da live.

**Componente:** `LiveCareGroupBenefits`.

---

### Seção 5. Quem apresenta

**Objetivo:** autoridade e rosto humano. Público frio precisa saber quem vai falar com ele.

**Layout:** dois cards lado a lado (empilhados no mobile), foto redonda, nome, cargo e uma frase de convite.

**Conteúdo:**

| | Amanda Moreth | Ellen Lourenção |
|---|---|---|
| Foto | `[FOTO-02]` | `[FOTO-03]` |
| Cargo | `[AGUARDANDO]` equipe Bubbles | `[AGUARDANDO]` equipe Bubbles |
| Bio curta | `[AGUARDANDO]` | `[AGUARDANDO]` |
| Frase de convite | `[AGUARDANDO]` | `[AGUARDANDO]` |

> ⚠️ **Pendência:** o briefing só informou os nomes e que são internas da Bubbles. Para a seção funcionar como autoridade, preciso do cargo e de 1 a 2 frases de bio de cada uma. Sem isso, mostro só nome e cargo genérico, o que enfraquece a seção. **Não vou inventar credencial de pessoa real.**

**Componente:** `LiveCareHosts`.

---

### Seção 6. Sorteio, brindes e cupons (incentivo ao vivo)

**Objetivo:** dar o motivo concreto para assistir **ao vivo** e não só ver depois. Combate o no-show, que é o maior vazamento desse formato.

**Copy sugerida:**

> **[eyebrow]** SÓ PARA QUEM ESTIVER AO VIVO
>
> **[H2]** Sorteio, brindes e cupons durante a transmissão
>
> **[texto]** Os sorteios acontecem ao vivo, e as condições especiais de lançamento são liberadas só durante a live. Quem assiste participa. Quem está no grupo é avisado na hora.
>
> **[3 selos]** 🎁 Brindes · 🎉 Sorteio ao vivo · 🏷️ Cupons de lançamento

**Componente:** `LiveCarePrizes`.

> ⚠️ **Nota de conformidade:** não vou detalhar valor de cupom nem produto sorteado, porque o briefing diz que a oferta "não será divulgada antes, apenas na hora". A copy fica no nível de categoria, sem prometer número.

---

### Seção 7. Para quem é a live

**Objetivo:** qualificar sem excluir. Como o briefing marcou "todos" e "é porta de entrada", a seção é inclusiva, sem coluna de "para quem não é" (que aqui só afastaria gente do topo de funil).

**Copy sugerida:**

> **[H2]** Feita para quem trabalha com banho e tosa
>
> ✓ Groomer que quer aumentar o faturamento sem aumentar a agenda
> ✓ Dono de pet shop procurando uma nova frente de receita
> ✓ Profissional que quer se diferenciar da concorrência da região
> ✓ Quem ainda não é cliente Bubbles e quer conhecer a marca
> ✓ Quem já é cliente e quer ser o primeiro a trabalhar com a Care

**Componente:** `LiveCareAudience`.

---

### Seção 8. FAQ

**Objetivo:** quebrar a última objeção antes do botão final.

| Pergunta | Resposta |
|---|---|
| Quando e onde é a live? | Domingo, 23 de agosto, às 19h (horário de Brasília), ao vivo no Instagram da Bubbles. |
| Preciso pagar alguma coisa? | Não. A live é totalmente gratuita e aberta. |
| Por que preciso entrar no grupo do WhatsApp? | É no grupo que avisamos a hora da live e liberamos os cupons e as condições de lançamento. Entrar no grupo é a forma de não perder nada. |
| Preciso ser cliente Bubbles? | Não. A live é aberta a todo groomer e tosador, sendo cliente ou não. |
| Quanto tempo dura? | Cerca de 1 hora. |
| Como concorro ao sorteio? | Assistindo ao vivo no Instagram. Os sorteios acontecem durante a transmissão. |
| Vou poder assistir depois? | `[AGUARDANDO RESPOSTA: tem replay?]` |
| Vai ter desconto na linha? | As condições especiais de lançamento são apresentadas durante a live. |

**Componente:** `LiveCareFaq` (acordeão, uma pergunta aberta por vez).

---

### Seção 9. CTA final + urgência real

**Copy sugerida:**

> **[H2]** Domingo, 19h. A Linha Care ao vivo.
>
> **[texto]** Entre no grupo agora e receba o aviso quando a transmissão começar.
>
> **[contagem regressiva repetida]**
>
> **[CTA grande verde]** Entrar no grupo do WhatsApp →
>
> **[microcopy]** Grupo VIP de groomers Bubbles. Gratuito, sem compromisso.

**Componente:** `LiveCareFinalCta`.

---

### Seção 10. Rodapé enxuto

Logo, CNPJ/razão social se aplicável, Instagram, WhatsApp de dúvidas. Sem menu de navegação (regra de página dedicada: nada que tire o foco do CTA).

**Componente:** `LiveCareFooter`.

---

## 5. Estímulos de conversão (mobile-first)

| Estímulo | Comportamento | Componente |
|---|---|---|
| **Barra fixa inferior** | Aparece após rolar além do herói. Mostra "Domingo, 19h" + botão. | `LiveCareStickyBar` |
| **WhatsApp flutuante** | Canto inferior direito, abre conversa de dúvida (diferente do grupo). | `LiveCareFloatingWhatsApp` |
| **Pop-up de saída** | Uma vez por sessão. No mobile dispara por rolagem rápida para cima. | `LiveCareExitPopup` |
| **CTA pulsante** | Pulse sutil no botão do herói. | dentro do `LiveCareHero` |
| **CTAs repetidos** | 5 pontos de conversão na página, todos para o mesmo link do grupo. | várias seções |

---

## 6. Ativos visuais necessários (placeholders)

### Fotos que preciso receber

| ID | Onde | O que deve mostrar | Dimensão sugerida | Arquivo final |
|---|---|---|---|---|
| **`[FOTO-01]`** | Herói, coluna direita | Opção A: Amanda e Ellen juntas, em estúdio. Opção B: a Linha Care em ambiente de pet shop. Opção C: groomer finalizando um pet com aspecto premium. | 1080×1080 (quadrada) ou 1200×1500 (retrato) | `public/images/live-care/hero.webp` |
| **`[FOTO-02]`** | Quem apresenta | Retrato da **Amanda Moreth**, enquadramento do peito para cima, fundo limpo | 800×800 quadrada | `public/images/live-care/amanda.webp` |
| **`[FOTO-03]`** | Quem apresenta | Retrato da **Ellen Lourenção**, mesmo enquadramento da Amanda para o par ficar consistente | 800×800 quadrada | `public/images/live-care/ellen.webp` |
| **`[FOTO-04]`** *(opcional)* | Prova social | Print ou foto de live anterior da Bubbles, ou foto do grupo em atividade | 1200×675 (16:9) | `public/images/live-care/prova.webp` |
| **`[OG-IMAGE]`** | Compartilhamento (WhatsApp, Instagram) | Gerada por código, não precisa de arte. Fundo claro, título da live, data e logo. | 1200×630 | gerado em `opengraph-image.tsx` |
| **`[FOTO-05 a 09]`** *(só se os kits entrarem)* | Bloco de kits | Foto de cada um dos 5 kits Care | 1080×1080 quadrada | `public/images/live-care/kit-*.webp` |

### Imagens que já temos (não precisa enviar nada)

✅ **11 fotos dos produtos Care**, em `public/images/care/`
✅ **Foto de conjunto da linha** (`care-hero-produtos.jpg`)

### Especificação técnica das imagens
- Formato **`.webp`**, qualidade 82, largura máxima 1200px (eu converto, pode mandar em JPG/PNG).
- Todas com `next/image` e atributo `sizes` correto por breakpoint (regra 34 do `CONVENCOES.md`).
- Retratos das apresentadoras com `object-top` para não cortar a cabeça.

### Enquanto as fotos não chegam
Cada placeholder será uma caixa cinza com borda tracejada rosa e o texto do que falta, por exemplo: `[FOTO-02: retrato da Amanda Moreth]`. Assim a página fica navegável e você vê o layout, sem risco de subir com imagem errada.

---

## 7. Comportamento depois da live (importante)

A página não pode virar lixo às 20h de domingo. Proposta usando o padrão `EventGate` que já existe no projeto:

| Momento | O que a página mostra |
|---|---|
| **Até 23/08 às 19h** | Página completa com contagem regressiva ativa |
| **Durante a live (19h às 20h)** | Contagem some, aparece "🔴 Estamos ao vivo agora no Instagram" com link direto para o perfil, e o botão do grupo continua |
| **Depois de 23/08 às 20h** | "Essa live já aconteceu. Entre no grupo para ser avisado da próxima e receber os cupons." CTA continua sendo o grupo |

Isso preserva o valor da verba de anúncio que continuar rodando depois do evento e evita a experiência ruim de contador zerado.

---

## 8. Rastreamento

| Item | Definição |
|---|---|
| **GTM** | `[DECISÃO PENDENTE: GTM-5L9TD3PN ou GTM-N4PHK6DM]`, ver seção 2.1-B |
| **Evento de conversão** | `dataLayer.push({ event: 'join_group', form_name: 'live-care' })` no clique de qualquer CTA de grupo |
| **UTMs** | Preservadas automaticamente pelo `UTMCapture` global e repassadas pelo `CtaLink` |
| **Eventos secundários** | `scroll_50`, `faq_open`, `exit_popup_shown` (opcionais, ajudam a otimizar anúncio) |

Como não há formulário nesta página, a conversão é o **clique de saída para o WhatsApp**. Vale configurar isso como conversão no Google Ads e no Meta pelo GTM.

---

## 9. SEO e metadata

| Campo | Valor proposto |
|---|---|
| **Title** | Live de Lançamento Linha Care · 23/08 às 19h \| Bubbles Pet |
| **Description** | Live gratuita no dia 23 de agosto às 19h: conheça a Linha Care e veja como transformar cada banho em uma nova oportunidade de venda no seu pet shop. Entre no grupo. |
| **Canonical** | `https://ofertas.bubbles.com.br/live-care` |
| **robots** | `index, follow` (é página de aquisição, deve ser indexável) |
| **JSON-LD** | `Event` com `startDate`, `VirtualLocation`, organizador Bubbles, `eventAttendanceMode: Online` |

---

## 10. Checklist de conformidade (antes de publicar)

- [ ] Nenhum termo proibido do `tom-de-voz.md` ("cura", "medicinal", "anti-inflamatório", "não causa reação")
- [ ] Produtos apresentados como **cosméticos pet** para cães e gatos, sem finalidade terapêutica
- [ ] **Sem travessão "—"** em nenhum texto visível
- [ ] Todo texto visível em pt-BR
- [ ] "Fature 2 vezes" enquadrado como duas vendas para o mesmo cliente, não como promessa de dobrar receita
- [ ] Nenhum número de sorteio ou cupom prometido antes da live
- [ ] Cores só da paleta do `DESIGN-SYSTEM.md`, botão de CTA no verde `#3DB85C`
- [ ] Todas as imagens com `sizes` correto, confirmadas existentes em `public/images`
- [ ] Testado no mobile antes do desktop
- [ ] Link do grupo testado e funcionando
- [ ] `npm run build` passando
- [ ] Página adicionada ao mapa em `src/app/page.tsx` e ao `sitemap.ts`

---

## 11. Próximos passos

1. **Você responde** as decisões da seção 2 (principalmente slug, GTM e as fotos)
2. Eu crio `src/lib/live-care.ts` com todos os textos, para você revisar a copy antes de virar tela
3. Eu construo os componentes na ordem: herói → motivos → grupo → apresentadoras → restante
4. Rodo `npm run build` e te mostro o resultado
5. Você revisa, ajustamos, e só então vai para o Git

### Estimativa de esforço
Como a estrutura é muito próxima da `/live-dia-do-tosador` que já existe, o trabalho é mais de adaptação do que de invenção. O caminho crítico é a **copy** e as **fotos**, não o código.

---

## 12. Como reverter

Se você não gostar do resultado, tudo desta LP vive em 3 lugares isolados:
`src/app/live-care/`, `src/components/lp/live-care/` e `src/lib/live-care.ts`.
Apagar essas 3 pastas e remover as 2 linhas adicionadas em `page.tsx` e `sitemap.ts` desfaz 100% da mudança, sem afetar nenhuma outra página do site.
