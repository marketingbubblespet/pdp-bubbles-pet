# Auditoria técnica — 03/08/2026

Levantamento de segurança e performance do projeto inteiro (Next.js 16 + React 19), feito
com análise direta + agentes especializados (forensic-specialist para segurança,
general-purpose para performance). Build, TypeScript e ESLint passaram sem erros no
momento da auditoria.

Nada deste relatório foi corrigido ainda. É um checklist de atividades futuras.

## Como usar este arquivo

Marque `[x]` no item conforme for corrigindo. Ordem sugerida: começar pelos críticos.

---

## 🔴 Crítico

- [ ] **Token do CRM Sellum exposto no navegador.**
  `src/components/lp/care/CareForm.tsx:14-15` — `SELLUM_WEBHOOK_URL` e `SELLUM_TOKEN` estão
  hardcoded num componente `'use client'`, então vão em texto puro no JS que qualquer
  visitante baixa (F12 → Sources). Qualquer pessoa pode extrair o token e mandar leads
  falsos/spam direto pro CRM.
  **Correção:** criar uma rota de API no Next (ex: `src/app/api/care-lead/route.ts`, roda
  no servidor) e mover o token pra variável de ambiente sem prefixo `NEXT_PUBLIC_`
  (`.env.local`, nunca commitado). O formulário no cliente passa a chamar essa rota interna
  em vez de bater direto no Sellum. **Muda a arquitetura** (hoje o projeto não tem nenhuma
  rota de API) — avisar antes de mexer.

---

## 🟠 Médio

- [ ] **Duas LPs de eventos que já passaram continuam no ar como se estivessem valendo.**
  MasterClass Spitz Alemão (evento era 27/07) e Live Dia do Tosador (evento era 26/07) —
  hoje é 03/08, ambos já aconteceram. O `EventGate` troca o conteúdo, mas só depois que o
  JS carrega no cliente; o HTML servido (e o que o Google indexa) ainda mostra a oferta
  "compre até o dia da aula" com contagem regressiva. Decisão de negócio: desativar,
  redirecionar ou atualizar essas páginas.

- [ ] **Teste A/B `spitz-alemao-b` está desligado mas ainda "existe".**
  `next.config.ts:10` redireciona `/masterclass/spitz-alemao-b` → `/masterclass/spitz-alemao`
  (teste já encerrado), mas a variante continua listada no mapa de páginas
  (`src/app/page.tsx:17`) e ainda é gerada no build. Confirmar se remove do mapa ou deixa
  como está.

- [ ] **Sem headers de segurança no `next.config.ts`.**
  Sem CSP nem `X-Frame-Options` → a LP pode ser embutida num iframe malicioso (clickjacking)
  sobrepondo o botão de compra. Risco baixo pra um site de marketing sem login, mas é
  hardening simples de adicionar.

- [ ] **3 vulnerabilidades altas em dependências transitivas do Next.**
  `npm audit --omit=dev` aponta `postcss` e `sharp` (subdependências do Next 16.2.9),
  corrigidas subindo pra **Next 16.2.12** (não é major). Risco prático baixo hoje (não
  processamos imagem/CSS de fonte não confiável), mas vale fazer na próxima janela de
  manutenção. **Pedir autorização antes de trocar versão de lib** (regra do projeto).

---

## ⚡ Performance

- [ ] **`fill` sem `sizes` — único caso no projeto.**
  `src/components/lp/essential/StickyCtaBar.tsx:22` — container é 44×44px, sem `sizes` o
  Next baixa a maior imagem do `deviceSizes` (até 3840px) pra um badge de 44px.
  **Correção:** adicionar `sizes="44px"`. Todos os outros ~20 usos de `fill` no projeto já
  estão corretos, não mexer neles.

- [ ] **Imagens de origem pesadas nas LPs de maior tráfego.**
  - `public/images/mechanism-pelagem.jpg` — 1,3 MB (usado como fundo full-bleed, quase
    invisível atrás de overlay escuro em `CareDemandMachine.tsx` — peso pago por algo que
    o usuário mal vê)
  - `public/images/care-hero-produtos.jpg` — 635 KB (é a imagem de **LCP** da LP Care)
  - `public/images/hero-produto-5l.jpg` — 241 KB (é a imagem de **LCP** da LP Essential)
  O Next recomprime na entrega, mas o arquivo de origem pesado custa caro em todo
  cache-miss (todo deploy novo) — pior justo para quem clica no anúncio logo após uma
  publicação. **Correção:** reexportar como WebP/JPG bem comprimido antes de subir.

- [ ] **CLS nas contagens regressivas do Hero.**
  `MasterCountdownB.tsx`, `LiveCountdown.tsx` (e variantes) renderizam `null` até o
  primeiro tick do `useEffect`; os wrappers no Hero (`MasterHeroB.tsx`, `LiveHero.tsx`) não
  reservam altura. Quando os números aparecem, empurram o botão CTA abaixo — shift dentro
  do Hero, onde mais pesa pro Web Vitals. Afeta `spitz-alemao`, `spitz-alemao-b`,
  `rostinho-bebe` e `live-dia-do-tosador`.
  **Correção:** reservar `min-h` equivalente ao bloco de 4 boxes no wrapper.

- [ ] **Componentes pesados fora do `dynamic()` — quebra o padrão já usado ao lado.**
  - `CareForm.tsx` (412 linhas, formulário completo) — `src/app/care/page.tsx:23`, import
    estático, mesmo estando na penúltima seção. `CareFaq`/`CareStickyBar` logo abaixo já
    usam `dynamic()` corretamente.
  - `CareCalculator.tsx` — `care/page.tsx:18`
  - `MasterAccessB.tsx` — `masterclass/spitz-alemao/page.tsx:15` e `spitz-alemao-b/page.tsx:15`
  - `MasterAccessAgosto.tsx` — `masterclass/rostinho-bebe/page.tsx:16`
  **Correção:** envolver em `dynamic(() => import(...).then(m => ({ default: m.X })))`,
  igual já é feito nos componentes vizinhos.

- [ ] **`priority` duplicado no essential.**
  A logo do `TopBar.tsx:100` tem `priority` além da imagem do Hero (`Hero.tsx:63`), que é
  o LCP real. Duas dicas de prioridade competindo dilui o sinal que o browser usa.
  **Correção:** remover `priority` da logo (é SVG pequeno, carrega rápido de qualquer forma).

---

## 🟡 Baixo / cosmético

- [ ] Senha do mapa de páginas (`src/app/page.tsx:38`, `PASSWORD = 'mariane'`) está hardcoded
  no bundle do cliente — protege só uma lista de URLs públicas, não é proteção real, mas
  vale saber que não é secreta de verdade.
- [ ] A tela "Área restrita" (`/`) está no `sitemap.ts` com `priority: 0.5` → Google indexa a
  tela de senha em vez de conteúdo de LP.
- [ ] Travessão "—" em `src/app/layout.tsx:19` (title do SEO) — único caso em texto
  visível ao usuário; os demais ~25 são comentários de código.

---

## ✅ Verificado e correto (não mexer)

- Captura de UTM (`src/lib/utm.ts`, `UTMCapture.tsx`) sem XSS: allowlist fixa + API `URL`,
  nenhum valor de querystring vai pro `innerHTML`/`dangerouslySetInnerHTML`.
- Todo `dangerouslySetInnerHTML` do projeto é JSON-LD estático, sem dado de usuário.
- Todos os `target="_blank"` já têm `rel="noopener noreferrer"`.
- `WebMcpTools.tsx` (masterclass-b) só expõe 2 ferramentas inofensivas via
  `navigator.modelContext`, sem `eval`, sem rede, com try/catch defensivo.
- `.env*` corretamente no `.gitignore`; nenhum segredo além do item crítico acima.
- Formulário Care com envio duplo resiliente (Sellum + Netlify Forms via `/__forms.html`);
  o backup Netlify existe de verdade (`netlify.toml`, `public/__forms.html`).
- Todo `setInterval`/`setTimeout`/`addEventListener` do projeto tem cleanup correto no
  `return` do `useEffect` — zero vazamento de memória encontrado.
- Fonte Figtree via `next/font/google`, `display: 'optional'`, só os 4 pesos usados,
  self-hosted.
- `next.config.ts`: `formats`, `qualities`, `deviceSizes`/`imageSizes` bem dimensionados.
- Regra de negócio "prazo de compra nunca passa da data da aula" (item 23 do
  `CONVENCOES.md`): respeitada em `masterclass-spitz.ts` e `masterclass-agosto.ts`.
- `DeliveryBadge.tsx` precisa continuar `'use client'` (calcula data relativa a "hoje" no
  navegador do visitante; virar Server Component congelaria a data no momento do build).
- 16 arquivos em `src/components/lp/masterclass/` (versão não-B) não são importados por
  nenhuma página — código morto que não pesa no bundle, não precisa "corrigir".

---

## Ordem sugerida de execução

1. Token Sellum fora do navegador (crítico, mas maior esforço — muda arquitetura)
2. Decisão sobre as duas LPs de eventos vencidos (negócio, não é código)
3. Comprimir as 3 imagens pesadas
4. `sizes="44px"` no StickyCtaBar (1 linha)
5. Reservar altura nos countdowns (CLS)
6. `dynamic()` no CareForm e nos outros 3 componentes
7. Next 16.2.9 → 16.2.12 (pedir autorização antes)
8. Itens de baixa prioridade
