# Plano de Construção — LP Live "Dia do Tosador"

> Documento de execução. O Sonnet deve seguir passo a passo. O código já está pronto abaixo,
> a tarefa é criar os arquivos com esse conteúdo, atualizar o sitemap, e rodar lint + build.
> Página estruturalmente nova, mas segue o padrão de captura das masterclasses (tema CLARO).

---

## 0. Decisões travadas (respondidas pelo cliente)

- **Rota/slug:** `/live-dia-do-tosador`
- **Data:** domingo, 26/07/2026, 19h (horário de Brasília), duração ~1h, ao vivo no **Instagram**
- **CTA único:** entrar no grupo do WhatsApp: `https://chat.whatsapp.com/IB4fWtKySFJ6P5SB9aOXU9`
- **Apresentador:** placeholder **"Fulano de Tal"** (aguardando definição)
- **Prova social:** "confiada por mais de 5.000 groomers" (usar `BRAND.groomers`)
- **Sem contador de vagas** (a urgência vem da data, evento único)
- **Botão flutuante:** NÃO abre o WhatsApp direto, ele **rola até a seção que tem o link**
  (âncora `#participar`)
- **Visual:** tema CLARO (Design System padrão)
- **Herói:** improvisado (tipográfico, sem depender de imagem), cliente ajusta depois
- **Headline:** NÃO usar "hoje é o seu dia" (a página roda 10 dias antes). Usar tom de
  antecipação/convite.

---

## 1. Regras do projeto a respeitar (checklist)

- [ ] Todo texto visível em **pt-BR**, **sem travessão "—"** (usar vírgula, ":" ou ".").
- [ ] Isolamento: tudo em `src/lib/live-tosador.ts` e `src/components/lp/live-tosador/`. Não
      tocar em outras LPs. Não tocar em `layout.tsx`/`globals.css`.
- [ ] Link do WhatsApp usa **`<a>` puro** (NÃO `CtaLink`), porque o link de convite do grupo
      não usa UTMs e para evitar risco de quebrar o código do convite. O rastreamento do clique
      é feito por evento de pixel no `onClick` (função `trackJoinClick`).
- [ ] Below-fold com `dynamic()` (code-split), padrão das outras LPs.
- [ ] Adicionar a página ao mapa de páginas (`src/app/page.tsx`, regra 22 do CONVENCOES).
- [ ] Rodar `npm run lint` e `npm run build` no final, ambos devem passar limpos.
- [ ] Nenhuma imagem com `fill` sem `sizes` (o herói é tipográfico, não usa imagem, então ok).

---

## 2. Arquivos a criar

```
src/lib/live-tosador.ts
src/components/lp/live-tosador/
  trackJoin.ts
  LiveCta.tsx
  LiveCountdown.tsx
  LiveEventGate.tsx
  LiveHero.tsx
  LiveReasons.tsx
  LiveGroupBenefits.tsx      (contém id="participar", alvo do botão flutuante)
  LiveAudience.tsx
  LiveProof.tsx
  LiveFaq.tsx
  LiveFinalCta.tsx
  LiveFooter.tsx
  LiveStickyBar.tsx
  LiveFloatingWhatsApp.tsx   (rola até #participar)
  LiveExitPopup.tsx
src/app/live-dia-do-tosador/page.tsx
```
E editar: `src/app/page.tsx` (sitemap).

---

## 3. Passo 1 — Dados: `src/lib/live-tosador.ts`

```ts
// src/lib/live-tosador.ts
// Dados isolados da LP da Live "Dia do Tosador" (não misturar com outras LPs).
import { BRAND } from '@/lib/constants'

export const LIVE = {
  slug: 'live-dia-do-tosador',
  date: '26/07',
  dateFull: '26 de julho',
  weekday: 'domingo',
  time: '19h',
  timezone: 'horário de Brasília',
  duration: '1 hora',
  platform: 'Instagram',
  targetDateISO: '2026-07-26T19:00:00-03:00',
  host: 'Fulano de Tal', // [AGUARDANDO INFORMAÇÕES] apresentador da live
  whatsappGroupUrl: 'https://chat.whatsapp.com/IB4fWtKySFJ6P5SB9aOXU9',
  socialProof: BRAND.groomers, // '+5.000'
} as const

// O que vai rolar na live (motivos para comparecer ao vivo)
export const LIVE_REASONS = [
  { icon: '🎁', title: 'Novidades em primeira mão', text: 'Produtos e itens exclusivos apresentados só na live. Você conhece antes de todo mundo.' },
  { icon: '🏷️', title: 'Condições de Dia do Tosador', text: 'Descontos liberados exclusivamente durante a transmissão.' },
  { icon: '🎉', title: 'Sorteio ao vivo', text: 'Brindes e produtos sorteados só entre quem está assistindo.' },
  { icon: '💡', title: 'Indicação de quem entende', text: 'Recomendações práticas de produtos para o dia a dia do salão, sem propaganda genérica.' },
  { icon: '📅', title: 'Data única', text: 'A celebração do Dia do Tosador numa live de domingo, sem repetição.' },
] as const

// Por que entrar no grupo (a ponte entre "assistir no Instagram" e "entrar no WhatsApp")
export const LIVE_GROUP_BENEFITS = [
  { icon: '🔔', title: 'Lembrete na hora certa', text: 'A gente te avisa quando a live começar. Você não perde o horário.' },
  { icon: '🏷️', title: 'Promoções exclusivas', text: 'Cupons e condições que circulam primeiro no grupo.' },
  { icon: '👥', title: 'Comunidade de tosadores', text: 'Troca de informação com groomers atuantes de todo o Brasil.' },
] as const

// FAQ
export const LIVE_FAQ = [
  { q: 'Quando e onde é a live?', a: 'Domingo, 26 de julho, às 19h (horário de Brasília), ao vivo no Instagram da Bubbles.' },
  { q: 'Preciso pagar para participar?', a: 'Não. A live é totalmente gratuita.' },
  { q: 'Por que preciso entrar no grupo do WhatsApp?', a: 'É no grupo que avisamos a hora da live e liberamos os cupons e promoções. Entrar no grupo é a forma de não perder nada.' },
  { q: 'Preciso ser cliente Bubbles?', a: 'Não. A live é aberta a todo tosador e groomer, sendo cliente ou não.' },
  { q: 'Como concorro ao sorteio?', a: 'Assistindo à live ao vivo no Instagram. Os sorteios acontecem durante a transmissão.' },
  { q: 'Vai ter desconto?', a: 'Sim. As condições especiais de Dia do Tosador são liberadas só durante a live.' },
] as const
```

---

## 4. Passo 2 — Componentes de lógica

### 4.1 `trackJoin.ts`
```ts
// Dispara evento de lead quando alguém clica para entrar no grupo do WhatsApp.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}
export function trackJoinClick() {
  window.gtag?.('event', 'generate_lead', { event_category: 'live_dia_tosador' })
  window.fbq?.('track', 'Lead')
}
```

### 4.2 `LiveCta.tsx` (botão verde WhatsApp, com rastreamento)
```tsx
'use client'
import { LIVE } from '@/lib/live-tosador'
import { trackJoinClick } from './trackJoin'

export function LiveCta({
  children,
  pulse = false,
  className = '',
}: {
  children: React.ReactNode
  pulse?: boolean
  className?: string
}) {
  return (
    <a
      href={LIVE.whatsappGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackJoinClick}
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-[10px] px-6 md:px-8 py-3.5 md:py-4 hover:brightness-110 active:scale-95 transition-all duration-200 text-center ${className}`}
      style={pulse ? { animation: 'live-pulse 2s ease-in-out infinite' } : undefined}
    >
      {children}
    </a>
  )
}
```

### 4.3 `LiveCountdown.tsx` (contagem regressiva, tema claro)
```tsx
'use client'
import { useEffect, useState } from 'react'

type T = { d: number; h: number; m: number; s: number }

export function LiveCountdown({ target, className = '' }: { target: string; className?: string }) {
  const [t, setT] = useState<T | null>(null)

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  if (!t) return null // evita mismatch de hidratação

  const box = (n: number, l: string) => (
    <div className="flex flex-col items-center bg-white rounded-[10px] px-3 py-2 md:px-4 md:py-3 min-w-[56px] md:min-w-[68px] shadow-sm border border-[#E5E7EB]">
      <span className="text-xl md:text-2xl font-extrabold text-[#0F0C0D] tabular-nums">{String(n).padStart(2, '0')}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">{l}</span>
    </div>
  )

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      {box(t.d, 'dias')}{box(t.h, 'horas')}{box(t.m, 'min')}{box(t.s, 'seg')}
    </div>
  )
}
```

### 4.4 `LiveEventGate.tsx` (troca o conteúdo quando a live já passou)
```tsx
'use client'
import { useEffect, useState } from 'react'

export function LiveEventGate({
  target,
  children,
  fallback,
}: {
  target: string
  children: React.ReactNode
  fallback: React.ReactNode
}) {
  const [finished, setFinished] = useState(false)
  useEffect(() => {
    const check = () => setFinished(Date.now() > new Date(target).getTime())
    check()
    const id = setInterval(check, 30000)
    return () => clearInterval(id)
  }, [target])
  return <>{finished ? fallback : children}</>
}
```

### 4.5 `LiveFloatingWhatsApp.tsx` (rola até #participar, NÃO abre o WhatsApp)
```tsx
// Botão flutuante que leva à seção de participação (âncora #participar).
export function LiveFloatingWhatsApp() {
  return (
    <a
      href="#participar"
      aria-label="Participar da live"
      className="fixed bottom-24 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-105 active:scale-95 transition-transform"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
        <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1c.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.5-.3z" />
      </svg>
    </a>
  )
}
```

### 4.6 `LiveStickyBar.tsx` (barra fixa no rodapé, aparece ao rolar)
```tsx
'use client'
import { useEffect, useState } from 'react'
import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'

export function LiveStickyBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <p className="text-sm font-extrabold text-[#0F0C0D] leading-tight">Live Dia do Tosador</p>
          <p className="text-xs text-[#6B7280]">{LIVE.weekday}, {LIVE.date} às {LIVE.time}, ao vivo e gratuita</p>
        </div>
        <LiveCta pulse className="flex-1 sm:flex-none text-sm px-5 py-3">Entrar no grupo do WhatsApp</LiveCta>
      </div>
    </div>
  )
}
```

### 4.7 `LiveExitPopup.tsx` (pop-up de saída, 1x a cada 5 min)
```tsx
'use client'
import { useEffect, useState } from 'react'
import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'

const KEY = 'live-exit-last-shown'
const THROTTLE_MS = 5 * 60 * 1000

export function LiveExitPopup() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const canShow = () => Date.now() - Number(sessionStorage.getItem(KEY) || 0) >= THROTTLE_MS
    const show = () => { if (!canShow()) return; sessionStorage.setItem(KEY, String(Date.now())); setOpen(true) }
    const onMouseOut = (e: MouseEvent) => { if (e.clientY <= 0) show() }
    let lastY = window.scrollY, lastT = Date.now()
    const onScroll = () => {
      const y = window.scrollY, t = Date.now(), dt = t - lastT
      if (dt > 0 && dt < 300 && lastY - y > 250) show()
      lastY = y; lastT = t
    }
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { document.removeEventListener('mouseout', onMouseOut); window.removeEventListener('scroll', onScroll) }
  }, [])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={() => setOpen(false)}>
      <div className="relative bg-white rounded-[10px] max-w-[420px] w-full p-6 md:p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} aria-label="Fechar" className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center text-[#9ca3af] hover:text-[#0F0C0D] text-2xl leading-none">×</button>
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-2">Espera!</p>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0F0C0D] mb-2 leading-tight">A live do Dia do Tosador é domingo e não se repete</h3>
        <p className="text-sm text-[#6B7280] mb-6">Entre no grupo para receber o aviso na hora e os cupons liberados só ao vivo.</p>
        <LiveCta className="block w-full">Entrar no grupo do WhatsApp</LiveCta>
      </div>
    </div>
  )
}
```

---

## 5. Passo 3 — Componentes de conteúdo

### 5.1 `LiveHero.tsx`
```tsx
import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'
import { LiveCountdown } from './LiveCountdown'
import { LiveEventGate } from './LiveEventGate'

const metaItems = [
  { icon: '📅', text: `${LIVE.weekday}, ${LIVE.date} às ${LIVE.time}` },
  { icon: '⏱️', text: LIVE.duration },
  { icon: '📍', text: `Ao vivo no ${LIVE.platform}` },
]
const rewards = ['🎁 Brindes', '🎉 Sorteio ao vivo', '🏷️ Cupons exclusivos', '✨ Novidades em primeira mão']

export function LiveHero() {
  return (
    <section className="bg-[#F7F7F7] pt-12 pb-14 md:pt-20 md:pb-20 px-4">
      <div className="max-w-[820px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
          {LIVE.dateFull} · Dia do Tosador
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.12] text-[#0F0C0D] mb-4">
          No Dia do Tosador, a Bubbles vai comemorar com você, ao vivo.
        </h1>
        <p className="text-sm md:text-base font-medium text-[#6B7280] leading-relaxed mb-6 max-w-[640px] mx-auto">
          Uma live especial para celebrar quem faz a mágica do banho e tosa acontecer. Vai ter brinde, sorteio ao vivo, cupom exclusivo e novidades liberadas antes de todo mundo.
        </p>

        {/* Recompensas em pílulas */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {rewards.map((r) => (
            <span key={r} className="inline-block bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0F0C0D]">{r}</span>
          ))}
        </div>

        {/* Meta: data, duração, plataforma */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {metaItems.map((m) => (
            <span key={m.text} className="inline-flex items-center gap-1.5 bg-[#fdf0f3] border border-[#F4CDD4] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold text-[#0F0C0D]">
              <span>{m.icon}</span>{m.text}
            </span>
          ))}
        </div>
        <p className="text-xs text-[#9ca3af] mb-8">Com apresentação de {LIVE.host}.</p>

        <LiveEventGate
          target={LIVE.targetDateISO}
          fallback={
            <div>
              <p className="text-sm font-semibold text-[#0F0C0D] mb-4">A live do Dia do Tosador já aconteceu. Entre no grupo para não perder a próxima e receber as promoções da Bubbles.</p>
              <LiveCta className="text-base md:text-lg w-full sm:w-auto shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
            </div>
          }
        >
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mb-2">A live começa em</p>
            <div className="flex justify-center"><LiveCountdown target={LIVE.targetDateISO} /></div>
          </div>
          <LiveCta pulse className="text-base md:text-lg w-full sm:w-auto shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
          <p className="mt-3 text-xs text-[#9ca3af]">É no grupo que a gente avisa a hora e libera os cupons. Sem grupo, você corre o risco de perder.</p>
        </LiveEventGate>
      </div>
    </section>
  )
}
```

### 5.2 `LiveReasons.tsx`
```tsx
import { LIVE_REASONS } from '@/lib/live-tosador'

export function LiveReasons() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">O que vai rolar na live</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">Motivos de verdade para não perder</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {LIVE_REASONS.map((r) => (
            <div key={r.title} className="bg-[#F7F7F7] rounded-[10px] p-6 border border-[#E5E7EB] flex flex-col gap-2">
              <span className="text-3xl">{r.icon}</span>
              <h3 className="font-extrabold text-[#0F0C0D]">{r.title}</h3>
              <p className="text-sm text-[#6B7280] leading-snug">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 5.3 `LiveGroupBenefits.tsx` (id="participar", alvo do botão flutuante)
```tsx
import { LIVE_GROUP_BENEFITS } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'

export function LiveGroupBenefits() {
  return (
    <section id="participar" className="bg-[#fdf0f3] py-16 md:py-24 px-4 scroll-mt-4">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">Por que entrar no grupo</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] mb-10">O grupo é a sua garantia de não perder nada</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {LIVE_GROUP_BENEFITS.map((b) => (
            <div key={b.title} className="bg-white rounded-[10px] p-6 border border-[#E5E7EB] flex flex-col gap-2 items-center text-center">
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-extrabold text-[#0F0C0D]">{b.title}</h3>
              <p className="text-sm text-[#6B7280] leading-snug">{b.text}</p>
            </div>
          ))}
        </div>
        <LiveCta pulse className="text-base md:text-lg shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
      </div>
    </section>
  )
}
```

### 5.4 `LiveAudience.tsx`
```tsx
export function LiveAudience() {
  return (
    <section className="bg-white py-14 md:py-20 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[720px] mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#0F0C0D] mb-3">Para todo tosador e groomer</h2>
        <p className="text-sm md:text-base text-[#6B7280] leading-relaxed">
          Do iniciante ao dono de petshop. Você não precisa ser cliente Bubbles para participar. É só chegar.
        </p>
      </div>
    </section>
  )
}
```

### 5.5 `LiveProof.tsx`
```tsx
import { LIVE } from '@/lib/live-tosador'

export function LiveProof() {
  return (
    <section className="bg-[#F7F7F7] py-14 md:py-16 px-4">
      <div className="max-w-[720px] mx-auto text-center">
        <p className="text-2xl md:text-3xl font-extrabold text-[#0F0C0D]">
          Confiada por mais de <span className="text-[#E8649A]">5.000 groomers</span> em todo o Brasil.
        </p>
        <p className="text-sm text-[#6B7280] mt-2">A marca que os profissionais recomendam, celebrando quem faz o banho e tosa acontecer.</p>
      </div>
    </section>
  )
}
```
> Nota: se quiser, pode usar `{LIVE.socialProof}` no lugar de "5.000" para vir de `BRAND`.
> Como o número já está fixo na frase com destaque, deixei escrito. Sonnet: manter como está.

### 5.6 `LiveFaq.tsx` (acordeão)
```tsx
'use client'
import { useState } from 'react'
import { LIVE_FAQ } from '@/lib/live-tosador'

export function LiveFaq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">Perguntas frequentes</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">Ainda ficou com dúvida?</h2>
        <div className="flex flex-col gap-3">
          {LIVE_FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border border-[#E5E7EB] rounded-[10px] overflow-hidden bg-white">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-semibold text-[#0F0C0D] text-sm md:text-base">{item.q}</span>
                  <span className={`text-[#E8649A] text-xl shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                {isOpen && <div className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed">{item.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

### 5.7 `LiveFinalCta.tsx` (fundo escuro de contraste)
```tsx
import { LIVE } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'
import { LiveCountdown } from './LiveCountdown'
import { LiveEventGate } from './LiveEventGate'

export function LiveFinalCta() {
  return (
    <section className="bg-[#0d0c0d] py-16 md:py-24 px-4">
      <div className="max-w-[760px] mx-auto text-center">
        <LiveEventGate
          target={LIVE.targetDateISO}
          fallback={
            <>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">A live já aconteceu</h2>
              <p className="text-sm md:text-base text-[#9ca3af] mb-8 max-w-[560px] mx-auto">Entre no grupo para não perder a próxima e receber as promoções da Bubbles.</p>
              <LiveCta className="text-base md:text-lg shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
            </>
          }
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">{LIVE.weekday}, {LIVE.date} às {LIVE.time}, {LIVE.timezone}</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">Não deixe passar. O Dia do Tosador é uma vez por ano.</h2>
          <p className="text-sm md:text-base text-[#9ca3af] mb-8 max-w-[560px] mx-auto">Brinde, sorteio, cupom e novidades liberadas só ao vivo. Entre no grupo para garantir o seu lugar.</p>
          <div className="flex justify-center mb-8"><LiveCountdown target={LIVE.targetDateISO} /></div>
          <LiveCta pulse className="text-base md:text-lg shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
        </LiveEventGate>
      </div>
    </section>
  )
}
```

### 5.8 `LiveFooter.tsx`
```tsx
import Image from 'next/image'

export function LiveFooter() {
  return (
    <footer className="bg-[#F7F7F7] border-t border-[#E5E7EB] pt-10 pb-28 md:pb-24 px-4">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-3 text-center">
        <Image src="/images/bubbles-logo.svg" alt="Bubbles Pet" width={110} height={26} />
        <p className="text-xs text-[#9ca3af]">© {new Date().getFullYear()} Bubbles Pet. Todos os direitos reservados.</p>
        <p className="text-xs text-[#9ca3af]">Cosméticos pet de alta performance para profissionais.</p>
        <div className="flex items-center gap-3 mt-1">
          <a href="https://www.bubbles.com.br/pages/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-xs text-[#9ca3af] underline hover:text-[#6B7280] transition-colors">Política de Privacidade</a>
          <span className="text-xs text-[#9ca3af]">·</span>
          <a href="https://www.bubbles.com.br/pages/termos-de-servico" target="_blank" rel="noopener noreferrer" className="text-xs text-[#9ca3af] underline hover:text-[#6B7280] transition-colors">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  )
}
```

---

## 6. Passo 4 — Página: `src/app/live-dia-do-tosador/page.tsx`

```tsx
// src/app/live-dia-do-tosador/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { LIVE } from '@/lib/live-tosador'

// Above fold — carregamento imediato
import { LiveHero } from '@/components/lp/live-tosador/LiveHero'
import { LiveReasons } from '@/components/lp/live-tosador/LiveReasons'
import { LiveGroupBenefits } from '@/components/lp/live-tosador/LiveGroupBenefits'

// Below fold — code split
import { LiveAudience } from '@/components/lp/live-tosador/LiveAudience'
import { LiveProof } from '@/components/lp/live-tosador/LiveProof'
import { LiveFinalCta } from '@/components/lp/live-tosador/LiveFinalCta'
import { LiveFooter } from '@/components/lp/live-tosador/LiveFooter'
import { LiveFloatingWhatsApp } from '@/components/lp/live-tosador/LiveFloatingWhatsApp'

const LiveFaq       = dynamic(() => import('@/components/lp/live-tosador/LiveFaq').then(m => ({ default: m.LiveFaq })))
const LiveStickyBar = dynamic(() => import('@/components/lp/live-tosador/LiveStickyBar').then(m => ({ default: m.LiveStickyBar })))
const LiveExitPopup = dynamic(() => import('@/components/lp/live-tosador/LiveExitPopup').then(m => ({ default: m.LiveExitPopup })))

const SITE_URL = 'https://www.bubbles.com.br'
const PAGE_URL = `${SITE_URL}/${LIVE.slug}`

const title = 'Live Dia do Tosador com a Bubbles | 26/07 às 19h'
const description = 'Live especial de Dia do Tosador em 26/07 às 19h, ao vivo no Instagram. Brindes, sorteio, cupons e novidades. Entre no grupo do WhatsApp e participe.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title, description, url: PAGE_URL, siteName: 'Bubbles Pet', locale: 'pt_BR', type: 'website',
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Live Dia do Tosador com a Bubbles',
  description,
  startDate: LIVE.targetDateISO,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: { '@type': 'VirtualLocation', url: PAGE_URL },
  organizer: { '@type': 'Organization', name: 'Bubbles Pet', url: SITE_URL },
  offers: { '@type': 'Offer', url: PAGE_URL, price: '0', priceCurrency: 'BRL', availability: 'https://schema.org/InStock', validFrom: new Date().toISOString() },
}

export default function LiveDiaDoTosador() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* Pulse dos CTAs + barra de rolagem rosa (escopo desta página) */}
      <style>{`
        @keyframes live-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
        html { scrollbar-color: #E8649A #F4CDD4; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F4CDD4; }
        ::-webkit-scrollbar-thumb { background-color: #E8649A; border-radius: 10px; }
      `}</style>

      <main className="pb-24 md:pb-20">
        <LiveHero />
        <LiveReasons />
        <LiveGroupBenefits />
        <LiveAudience />
        <LiveProof />
        <LiveFaq />
        <LiveFinalCta />
      </main>
      <LiveFooter />

      {/* Estímulos de conversão */}
      <LiveStickyBar />
      <LiveFloatingWhatsApp />
      <LiveExitPopup />
    </>
  )
}
```

---

## 7. Passo 5 — Atualizar o sitemap (`src/app/page.tsx`)

Adicionar ao array `pages` (mantendo os itens existentes):

```tsx
  {
    href: '/live-dia-do-tosador',
    label: 'Live Dia do Tosador',
    description: 'Página de captura da live de 26/07 (grupo de WhatsApp)',
  },
```

---

## 8. Passo 6 — Verificação final

1. `npm run lint` (deve passar limpo, 0 erros)
2. `npm run build` (deve compilar e gerar a rota `/live-dia-do-tosador`)
3. Se possível, subir o preview e conferir:
   - Herói mostra a contagem regressiva e a headline de antecipação (não "hoje")
   - Botão flutuante do WhatsApp **rola** até a seção "Por que entrar no grupo" (id `#participar`)
   - CTAs verdes abrem o link do grupo em nova aba
   - Layout responsivo no mobile (375px), sem overflow

---

## 9. Pendências para depois (não bloqueiam o build)

- Trocar o placeholder do apresentador (`LIVE.host = 'Fulano de Tal'`) pelo nome real.
- Trocar/adicionar imagem de herói se o cliente enviar (hoje o herói é tipográfico, sem imagem).
- Confirmar o número exato de groomers da prova social (hoje "5.000", do institucional).
