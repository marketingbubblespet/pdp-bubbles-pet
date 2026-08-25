# Rastreamento (dataLayer) — convenção para páginas novas

Módulo central: `src/lib/tracking.ts`. Ninguém chama `window.dataLayer.push`,
`window.gtag` ou `window.fbq` direto num componente — sempre pelas funções exportadas
aqui. O GTM escuta por **nome de evento**, nunca por caminho de rota.

## Container GTM (continua manual, "do jeito antigo")

Não existe injeção automática por rota. Todo `page.tsx` novo precisa do
`<GtmScript id="..."/>` manual, igual já é hoje. Antes de criar a página, decida o
container (ver `CONVENCOES.md`, seção 11):

- **`GTM-N4PHK6DM`** ("Bubbles - LPs") é o padrão para LP nova, salvo indicação contrária.
- **`GTM-5L9TD3PN`** ("Bubbles - Shopify", de outro fornecedor) só nas páginas que já
  usam: `essential`, `live-care`, `live-dia-do-tosador`, `masterclass/rostinho-bebe`,
  `masterclass/spitz-alemao`, `masterclass/spitz-alemao-b`. Nunca migrar página nem
  configuração desse container.
- A home (`/`) não carrega GTM.

## Tabela de eventos

Os eventos têm **níveis**, e o nível decide o que dispara no GTM:

- **Nível 1 — conversão de mídia paga.** Só `lead_form_submitted`, e só para candidatura
  de distribuidor/revenda gravada no CRM. Dispara conversão no Google Ads e no Meta, o que
  alimenta lance de campanha real. `form_name` válidos: `captacao-lead`, `care-lead`,
  `pet-south-lead`. **Na dúvida, não use este nome.**
- **Nível 2 — lead leve.** Captura de contato de menor intenção, só GA4, sem conversão de
  mídia. Hoje: `whatsapp_gate_submitted`.
- **Nível 3 — engajamento.** Nenhuma conversão.

| Evento | Nível | Chaves obrigatórias | Quando |
|---|---|---|---|
| `lead_form_submitted` | 1 | `event_id`, `lead_id`, `form_name`, `lead_qualified`, `user_data{}` | Envio de formulário aceito |
| `whatsapp_gate_submitted` | 2 | `event_id`, `gate_id`, `form_name`, `landing_page`, `cta_location` | Gate de WhatsApp enviado |
| `form_open` | `form_name` | Abertura do formulário/modal |
| `form_step` | `form_name`, `step_number`, `step_name` | Avanço de etapa |
| `form_abandon` | `form_name`, `step_number` | Fechamento sem enviar |
| `cta_click` | `cta_label`, `cta_location` | Clique em CTA |
| `whatsapp_click` | `link_location` | Clique para `wa.me` / `api.whatsapp` |
| `share_click` | `share_location` | Botão de compartilhar |
| `calculator_use` | `calculator_name` | Uso de calculadora |
| `exit_popup_shown` | `popup_location` | Exibição do exit popup |
| `exit_popup_click` | `popup_location` | Clique no exit popup |
| `scroll_depth` | `percent_scrolled` | Marcos 25/50/75/90 |
| `page_view` | `page_path`, `page_title` | Navegação client-side (ativo via `PageViewTracker`, ver abaixo) |

**Importante:** `user_data` só existe em `lead_form_submitted`. Nos demais eventos, nunca.
Adicionar um evento **novo** que não está nesta tabela exige criar o trigger
correspondente no GTM — os daqui já existem configurados.

## Formulário novo: passo a passo

```ts
import { createLeadId, pushLeadFromForm, pushFormOpen, pushFormStep } from '@/lib/tracking'

// 1. Ao abrir o formulário/modal
pushFormOpen('minha-lp-lead')

// 2. Ao gerar o lead (uma vez, guarde num useState — reaproveite se já existir um
//    candidacyId no formulário, não gere dois IDs para a mesma pessoa)
const [leadId] = useState(() => createLeadId('minha-lp'))

// 3. A cada avanço de etapa
pushFormStep('minha-lp-lead', numeroDaEtapa, 'Nome da etapa')

// 4. No envio: inclua `leadId` no payload do Netlify E do Sellum, espere o
//    Promise.allSettled resolver, e só dispare o lead se o Netlify aceitou
const [netlifyResult, sellumResult] = await Promise.allSettled([enviarNetlify, enviarSellum])

if (netlifyResult.status === 'fulfilled') {
  pushLeadFromForm({
    leadId,
    formName: 'minha-lp-lead',
    qualified: true, // ou false, conforme a regra de qualificação da sua LP
    fullName: form.nome,
    email: form.email,
    phone: form.whatsapp,
    extra: sellumResult.status === 'rejected' ? { sellum_failed: true } : undefined,
  })
}
```

### Por quê nesta ordem
- **`leadId` nunca é `crypto.randomUUID()`**: ele viaja no payload do Netlify e do Sellum,
  então o servidor conhece a mesma chave que o navegador. O `event_id` do lead é sempre
  `` `lead.${leadId}` `` — é isso que permite o Meta colapsar o evento do navegador com o
  da Conversions API sem contar a conversão em dobro.
- **Só dispara com Netlify confirmado**: é o único destino que recebe todo lead
  (qualificado ou não). Se ele falhou, o lead não existe de verdade em lugar nenhum.
  Se só o Sellum falhou, ainda é um lead válido — registre `sellum_failed: true`.
- **E-mail/telefone/nome em texto puro**: `pushLeadFromForm` já normaliza (e-mail
  minúsculo, telefone só dígitos com DDI 55, nome em minúsculas). Nunca faça hash no
  navegador — as tags do Google/Meta hasheiam no momento do envio, e um hash pronto
  desliga o Enhanced Conversions/Advanced Matching sem erro visível.

## Página sem formulário

`/masterclass/*`, `/live-dia-do-tosador` e páginas parecidas não têm formulário: a
"conversão" é sair pro WhatsApp ou pra loja. Use `pushWhatsappClick`/`pushCtaClick` de
engajamento — **nunca** `pushLead`/`pushLeadFromForm` nesses casos, porque sem um
servidor conhecendo o mesmo `leadId` não existe dedupe possível, e um evento de lead
sem contrapartida vira conversão fantasma no Meta.

Um botão que só rola a página até uma seção (não abre WhatsApp nem loja) é `cta_click`,
nunca `whatsapp_click` nem lead — ele não é uma conversão, é navegação interna.

## Page view virtual

`src/components/ui/PageViewTracker.tsx` fica montado no `layout.tsx` (ao lado do
`UTMCapture`) e publica `page_view` toda vez que a rota muda por navegação client-side
(ex: a home usa `next/link` pra ir até as LPs). A primeira renderização é ignorada de
propósito: o próprio `gtm.js` já dispara um pageview inicial quando carrega, então
publicar de novo duplicaria a sessão. Não decide container nem carrega GTM, só publica
o evento — cada página continua responsável pelo seu próprio `<GtmScript/>`.

## Scroll depth

`src/components/ui/ScrollDepthTracker.tsx` publica `scroll_depth` nos marcos 25/50/75/90%,
uma vez cada por carregamento de página. Monte manualmente na página que precisar:

```tsx
import { ScrollDepthTracker } from '@/components/ui/ScrollDepthTracker'

// dentro do JSX da página
<ScrollDepthTracker />
```

Substitui o trigger nativo "Scroll Depth" do GTM, que dispara repetido e polui o Meta.

## Gate de WhatsApp

`src/components/ui/WhatsappGate.tsx` substitui um `<a>` de WhatsApp: no primeiro clique
da página abre um formulário curto (nome, WhatsApp, e-mail, "você é tutor/groomer/outro"),
e só então leva a pessoa pro WhatsApp.

```tsx
<WhatsappGate
  href={linkDoWhatsapp}
  ctaLocation="live-tosador-hero"
  ctaLabel="Entrar no grupo do WhatsApp"
  theme="dark"          // 'light' nas LPs de fundo claro
  className="..."
>
  Entrar no grupo do WhatsApp
</WhatsappGate>
```

Regras que ele já aplica sozinho:
- **Todos os campos são opcionais.** Quem não quiser preencher clica em continuar e vai
  pro WhatsApp igual. Mesmo assim registramos origem do clique, URL de conversão e UTMs.
- **Uma vez por landing page.** `localStorage` com chave `bubbles_lead_gate_<pathname>`:
  preencheu naquela LP, os próximos cliques passam direto. Em LP diferente, preenche de
  novo (mas os campos vêm pré-preenchidos com o que ele já digitou antes).
- **Não bloqueia o destino.** O envio usa `keepalive`, então a pessoa vai pro WhatsApp na
  hora, sem esperar resposta do Netlify.
- Publica `form_open` na abertura e `whatsapp_gate_submitted` no envio.

**Onde NÃO usar:** link de compra/loja. O caminho de compra segue livre, sem gate.

### Campos gravados no Netlify

Vão junto de todo envio, via `src/lib/lead-context.ts`: `full_url` (com query string),
`landing_page`, `referrer`, UTMs, `gclid`, `fbclid`, `cta_location`, `cta_label`,
`destino_url`, `tempo_na_pagina`, `scroll_max`, `visita_recorrente`, `dispositivo`,
`viewport`, `user_agent`, `enviado_em`, `gate_id`.

⚠️ **Campo novo precisa ser declarado em `public/__forms.html`.** O Netlify descarta em
silêncio qualquer campo não declarado lá: sem erro, sem aviso, o dado simplesmente não
aparece no painel.
