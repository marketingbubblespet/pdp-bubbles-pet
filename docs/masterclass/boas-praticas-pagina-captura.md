# Boas Práticas: Página de Captura de Masterclass

Referência para construir páginas de captura/inscrição de masterclass no sistema.
Baseado em pesquisa de boas práticas de páginas de webinar/aula ao vivo (2025-2026) e
adaptado ao modelo atual da Bubbles. Fontes no final.

---

## Modelo padrão Bubbles: página de captura pura
**Decisão fixa:** toda página de masterclass usa o modelo de **captura pura**. O CTA
principal é sempre o **cadastro** (nome + e-mail e/ou WhatsApp) para receber o link e
participar de graça. Isso maximiza o número de inscritos no topo do funil.

### Quando a masterclass for destravada por compra (ex: Collora)
Algumas masterclasses exigem compra para liberar o acesso (ex: comprar a linha Collora,
ou acima de R$X). Nesses casos a página **continua sendo de captura**, mas ganha um
**bloco de produtos estilo e-commerce** (cards "shoppable") com os itens que destravam o
acesso. Cada card leva direto para a página do produto na Shopify.

Assim o visitante faz as duas coisas na mesma página: se inscreve (captura) e compra o
produto que qualifica o acesso, sem precisar sair para procurar no site. Ver o bloco
"Bloco de produtos" na anatomia abaixo.

---

## Anatomia da página (blocos na ordem)

### 1. Above the fold (herói)
O visitante precisa entender em 5 segundos: o que é, o que ganha, quando e o que fazer.
- **Título orientado a resultado** (não "Masterclass de banho", e sim "Técnicas de banho para atender mais pets no mesmo dia e aumentar seu faturamento").
- Subtítulo com a transformação prometida.
- **Data, hora, duração e formato** (ao vivo, online) visíveis.
- Foto do instrutor (autoridade) e/ou vídeo curto.
- **CTA primário** já na primeira dobra ("Garantir meu acesso VIP" / "Quero participar").
- Selo de marca (Groomer Premium) e gratuidade/condição ("gratuito para compras acima de R$X").

### 2. O que você vai aprender
- 3 a 5 bullets de **resultado** (o que muda na vida do groomer), não de tópicos secos.
- Evitar agenda minuto a minuto. Blocos de alto nível.

### 2b. O que você recebe (entregáveis e bônus)
Mostrar os bônus do cadastro como lista visual com ícones. Itens típicos:
- 🎓 Certificado digital
- 💬 Acesso ao grupo VIP no WhatsApp
- 📄 PDF de resumo da aula (enviado depois), quando houver
- 🔗 Link de acesso à aula ao vivo

Bônus tangíveis aumentam o valor percebido e a conversão.

### 3. Para quem é / Para quem não é
- Duas colunas. Qualifica o público e aumenta a percepção de relevância.
- "Para quem é": ex. groomer que quer cobrar mais, pet shop iniciante, etc.
- "Para quem não é": ex. quem busca curso completo de A a Z, quem não atua com banho e tosa.

### 4. Quem vai ensinar (autoridade)
- Bio curta do instrutor com números/credenciais (anos de experiência, resultados, reconhecimento).
- Foto profissional. Autoridade derruba a objeção "vale meu tempo?".

### 5. Detalhes e logística
Responder com clareza (é onde as páginas costumam falhar):
- **Quando:** data, horário e fuso.
- **Onde:** plataforma (YouTube ao vivo, Zoom, etc.).
- **Como recebe o link:** e-mail e/ou grupo de WhatsApp, e quando.
- **Duração** estimada (incluindo Q&A).
- **Tem replay?** Sim/não e por quanto tempo.

### 6. Como participar / requisitos
- No modelo compra-gatilho: explicar o passo a passo ("Compre qualquer item acima de R$X → acesso liberado → entre no grupo VIP → receba o link").
- Deixar claro prazo de compra e como o acesso é confirmado.
- Se houver pré-requisito técnico (app, câmera, etc.), listar aqui.

### 6b. Bloco de produtos (e-commerce / shoppable) — quando o acesso é por compra
Usar sempre que a masterclass for destravada por compra (ex: linha Collora, kits, compra acima de R$X).
- Mostrar os produtos que destravam o acesso em **cards estilo loja**: imagem, nome, preço e botão de comprar.
- Cada card linka direto para a página do produto na Shopify, abrindo em nova aba.
- Os links devem passar pelo componente `CtaLink` para **preservar as UTMs** (rastreamento de mídia paga).
- Reforço de copy acima do bloco: "Garanta seu acesso comprando qualquer item abaixo".
- Visual seguindo o Design System (card branco, raio `rounded-[10px]`/`xl`, botão verde `#3DB85C`).
- **Técnico:** criar um componente reutilizável (ex: `ProductCard` + `ProductGrid`) que recebe uma lista de produtos `{ nome, imagem, preco, url }`. Os dados ficam no arquivo de dados da LP da masterclass (ex: `src/lib/masterclass-collora.ts`), nunca misturado com outra LP.

### 7. Prova social
- Depoimentos de quem já participou, prints do grupo, número de inscritos.
- Logos/contagem reforçam credibilidade. Headline + prova social pode subir inscrições em até ~30%.

### 8. FAQ (quebra de objeções)
Resolver o "last-mile" antes do botão final. Perguntas típicas:
- Preciso comprar para participar? Quanto?
- É ao vivo ou gravado? Vou poder rever depois?
- Onde e como recebo o link?
- Quanto tempo dura?
- Ganho certificado?
- Funciona para o meu caso (iniciante / pet shop pequeno)?
Evitar repetir o que já está na página ou criar objeções novas.

### 8b. Ainda tem dúvidas? Fale no WhatsApp
Logo após a FAQ, um bloco curto convidando quem ainda ficou com dúvida a falar direto no WhatsApp.
- Botão verde de WhatsApp com mensagem pré-preenchida (ex: "Olá! Tenho uma dúvida sobre a masterclass").
- Remove a última barreira de quem quase se inscreveu mas travou em uma dúvida específica.

### 9. CTA final + urgência real
- Repetir o CTA com reforço de valor.
- **Urgência autêntica:** vagas reais, prazo real de inscrição, data fixa. Evitar contador falso (quebra confiança).

---

## Princípios de conversão
- **Mobile-first é regra, não detalhe:** desenhar primeiro para o celular (mais de 50% das inscrições e quase todo o tráfego pago vêm de mobile). Tudo tem que funcionar no polegar: botões grandes, texto legível, zero rolagem horizontal.
- **Headline de resultado específico** converte mais que título genérico.
- **CTA emocional:** "Garantir meu acesso VIP", "Quero minha vaga" superam "Enviar/Registrar".
- **Formulário curto:** só o essencial (nome, e-mail e/ou WhatsApp). Quanto menos campos, maior a conversão.
- **Página dedicada:** sem menu de navegação, sem rodapé cheio de links que distraem.
- **Contraste e hierarquia:** o botão precisa saltar; o olho precisa saber onde clicar.
- Benchmark de páginas bem otimizadas: **20% a 45% de conversão** de visitante para inscrito.

## Estímulos de conversão (sempre mobile-first)
A página de masterclass deve ter muitos pontos de conversão, sem poluir. Padrão Bubbles:
- **Barra fixa no rodapé (sticky bottom bar):** sempre visível no mobile, com CTA de inscrição. Reusar/adaptar o componente `StickyCtaBar` que já existe na LP Essential.
- **Botão de CTA pulsando:** animação sutil de pulse no botão principal, chama atenção sem ser agressivo.
- **WhatsApp flutuante de dúvida:** botão fixo no canto inferior, abre conversa direta. Reduz objeção e abandono.
- **Bloco "ainda tem dúvidas? fale no WhatsApp"** logo após a FAQ (ver bloco 8b).
- **Pop-up de saída (exit-intent):** ao detectar intenção de sair, mostrar um último incentivo para se inscrever. No mobile, disparar por scroll-up rápido ou inatividade (não existe "mouse leave" no toque). Mostrar só uma vez por sessão.
- **CTAs repetidos ao longo da página:** vários botões, todos levando ao mesmo cadastro.
- **Contador de cadastros (opcional):** prova social ao vivo, ex: "237 groomers já se inscreveram". Definir no briefing se entra e a partir de qual número.
- **Urgência real:** data fixa, contagem regressiva verdadeira para o início da aula, vagas reais.

> Equilíbrio: estímulo demais ao mesmo tempo cansa. Priorizar sticky bar + WhatsApp flutuante + 1 pop-up de saída por sessão.

---

## Reduzir no-show (crítico no modelo ao vivo)
Inscrito não é presença. O maior vazamento de uma aula ao vivo é quem se inscreve e não aparece.
- **Confirmação imediata** após a inscrição, com convite de calendário.
- **Sequência de lembretes:** 1 dia antes (com o que vai aprender), 1 hora antes, e 15 min antes (com o link de acesso).
- **WhatsApp tem até ~98% de taxa de abertura**, muito acima do e-mail. O grupo VIP da Bubbles já é um ativo forte para isso.
- **Compromisso na inscrição** importa mais que lembrete: pedir um pequeno passo (entrar no grupo, responder uma pergunta) aumenta o comparecimento.

---

## Estrutura da própria aula (referência)
- Duração ideal: **1h30 a 3h**.
- Formato: introdução breve, conteúdo prático com cases reais, interação/Q&A, e chamada para ação no final.
- A prova ao vivo derruba objeções em tempo real e ancora valor antes da oferta.
- Conversão de venda em masterclass ao vivo bem feita: **20% a 40%** (muito acima de 1-3% de um lançamento por e-mail frio).

---

## Erros a evitar
- Contador regressivo falso ou escassez fabricada.
- Formulário longo pedindo dados desnecessários.
- Página com menu/links que tiram o foco do CTA.
- Não dizer onde acontece nem como recebe o link (gera desconfiança e no-show).
- Agenda minuto a minuto em vez de promessas de resultado.
- Falar de tópicos em vez de transformação.

---

## Fontes
- [HubSpot, 25 Webinar Landing Page Examples (2025)](https://blog.hubspot.com/website/webinar-landing-page-examples)
- [OptimizePress, 24 Best Webinar Landing Page Examples for 2025](https://www.optimizepress.com/webinar-landing-page-examples/)
- [ClickMeeting, Webinar Landing Page: High-Converting Designs](https://blog.clickmeeting.com/webinar-landing-page)
- [Airmeet, 10 Ways to Optimize Webinar Landing Pages](https://www.airmeet.com/hub/blog/10-ways-to-optimize-webinar-landing-pages-for-high-conversions/)
- [eWebinar, 6 Ways to Increase Webinar Attendance](https://ewebinar.com/blog/increase-webinar-attendance)
- [Wati, Increase Webinar Attendance With WhatsApp](https://www.wati.io/en/blog/how-to-increase-webinar-attendance-with-whatsapp/)
- [Univid, Effective Webinar Reminders](https://univid.io/webinar-glossary/webinar-reminder/)
- [DigitalManager Guru, Masterclass: estratégia (pt-BR)](https://blog.digitalmanager.guru/masterclass/)
- [Kit, Webinar Landing Pages + tips](https://kit.com/resources/blog/webinar-landing-pages)
- [Unbounce, Webinar landing page examples + best practices](https://unbounce.com/landing-page-examples/webinar-landing-page-examples/)
