'use client'
// Página /atendimento: um botão grande que leva ao WhatsApp, com orientação visual para
// clicar e, sem clique, abertura automática depois de alguns segundos (cancelável).
// Todo o rastreamento (ID, UTMs, IDs de clique, cookies) vem de src/lib/atendimento.ts.
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BadgeCheck, ListChecks, Star, Users } from 'lucide-react'
import { BRAND } from '@/lib/constants'
import {
  ATENDIMENTO,
  contarVisita,
  gerarIdAtendimento,
  linkWhatsapp,
  montarRegistro,
  resolverCliques,
  variacaoPorUtm,
  type Visita,
} from '@/lib/atendimento'
import { pushWhatsappRedirect } from '@/lib/tracking'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

const LINK_SEM_ID = `https://wa.me/${ATENDIMENTO.whatsappNumero}`
const POLITICA = 'https://www.bubbles.com.br/policies/privacy-policy'

function encode(dados: Record<string, string>): string {
  return Object.entries(dados)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

export function AtendimentoRedirect() {
  const [visita, setVisita] = useState<Visita | null>(null)
  const [restante, setRestante] = useState<number>(ATENDIMENTO.autoRedirectSegundos)
  const [autoAtivo, setAutoAtivo] = useState(ATENDIMENTO.autoRedirectSegundos > 0)
  const [saindo, setSaindo] = useState(false)
  const enviado = useRef(false)
  const scrollMax = useRef(0)

  // Dados da visita: só existem no navegador (URL, localStorage, cookies).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dados só existem no navegador
    setVisita({
      id: gerarIdAtendimento(),
      entrada: new Date(),
      numeroVisita: contarVisita(),
      params,
      url: window.location.href,
      referrer: document.referrer,
      variacao: variacaoPorUtm(params),
      cliques: resolverCliques(params),
    })
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      if (total > 0) scrollMax.current = Math.max(scrollMax.current, Math.round((window.scrollY / total) * 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Grava no Netlify, avisa o GTM e abre o WhatsApp na mesma aba (funciona melhor
  // dentro do navegador do Instagram/Facebook do que abrir nova aba).
  const registrar = useCallback(
    (tipo: 'clique' | 'automatico', local: string) => {
      if (!visita || enviado.current) return
      enviado.current = true
      setSaindo(true)
      const registro = montarRegistro(visita, { tipo, local, scrollMax: scrollMax.current })
      fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(registro),
        keepalive: true,
      }).catch((erro) => console.error('Falha ao salvar o atendimento no Netlify Forms:', erro))
      pushWhatsappRedirect({
        atendimentoId: visita.id,
        landingPage: window.location.pathname,
        ctaLocation: local,
        tipo,
        variacao: visita.variacao.chave,
        segundosNaPagina: Math.round((Date.now() - visita.entrada.getTime()) / 1000),
      })
    },
    [visita],
  )

  // Contagem do redirecionamento automático: só anda com a aba visível.
  useEffect(() => {
    if (!visita || !autoAtivo || saindo) return
    const t = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      setRestante((r) => r - 1)
    }, 1000)
    return () => window.clearInterval(t)
  }, [visita, autoAtivo, saindo])

  useEffect(() => {
    if (!visita || !autoAtivo || restante > 0 || enviado.current) return
    registrar('automatico', 'auto-redirect')
    window.location.href = linkWhatsapp(visita.id, visita.variacao)
  }, [restante, autoAtivo, visita, registrar])

  const href = visita ? linkWhatsapp(visita.id, visita.variacao) : LINK_SEM_ID
  const v = visita?.variacao

  const botao = (local: string, grande = true) => (
    <a
      href={href}
      onClick={() => registrar('clique', local)}
      className={`atd-pulse inline-flex w-full items-center justify-center gap-2.5 rounded-[12px] bg-[#3DB85C] text-white font-semibold shadow-md transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95 ${
        grande ? 'min-h-[60px] px-6 text-lg' : 'min-h-[52px] px-6 text-base'
      }`}
    >
      <WhatsAppIcon size={grande ? 24 : 20} />
      {saindo ? 'Abrindo o WhatsApp...' : 'Falar no WhatsApp'}
    </a>
  )

  return (
    <main className="min-h-[100svh] bg-[#F7F7F7] px-4">
      <style>{`
        @keyframes atd-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(61,184,92,0.45); }
          50% { box-shadow: 0 0 0 14px rgba(61,184,92,0); }
        }
        @keyframes atd-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .atd-pulse { animation: atd-pulse 1.8s ease-in-out infinite; }
        .atd-bounce { animation: atd-bounce 1.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .atd-pulse, .atd-bounce { animation: none; }
        }
      `}</style>

      {/* Seção 1: chamada e botão */}
      <section className="max-w-[520px] mx-auto pt-8 pb-10 md:pt-16 text-center">
        <Image src="/images/bubbles-logo.svg" alt="Bubbles" width={132} height={40} className="mx-auto mb-6 h-9 w-auto" priority />

        <div className={`transition-opacity duration-200 ${visita ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            {v?.eyebrow ?? 'Atendimento Bubbles'}
          </p>
          <h1 className="text-3xl md:text-4xl font-medium leading-[1.15] text-[#0D0C0D] mb-3">
            {v?.titulo ?? 'Fale agora com um especialista Bubbles'}
          </h1>
          <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-6">{v?.subtitulo ?? ''}</p>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[#0D0C0D] mb-2">
          Toque no botão para iniciar a conversa
          <span aria-hidden className="atd-bounce inline-block text-[#3DB85C]">↓</span>
        </p>
        {botao('hero')}

        <div className="mt-3 min-h-[22px] text-[13px] text-[#666666]">
          {visita && autoAtivo && !saindo && restante > 0 && (
            <p>
              Abrindo o WhatsApp em {restante}s.{' '}
              <button
                type="button"
                onClick={() => setAutoAtivo(false)}
                className="underline underline-offset-2 hover:text-[#E8649A]"
              >
                Prefiro ficar aqui
              </button>
            </p>
          )}
        </div>

        <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden shadow-sm mt-4 bg-white">
          <Image
            src="/images/hero-produto-5l.jpg"
            alt="Galões de 5L Bubbles para banho e tosa profissional"
            fill
            priority
            sizes="(max-width: 767px) calc(100vw - 32px), 520px"
            className="object-cover"
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 text-left">
          {[
            { icon: Star, valor: BRAND.rating.split('/')[0], texto: 'nota dos clientes' },
            { icon: Users, valor: BRAND.groomers, texto: 'groomers parceiros' },
            { icon: BadgeCheck, valor: BRAND.years.replace(' Anos', ''), texto: 'anos no mercado pet' },
          ].map((i) => (
            <div key={i.texto} className="rounded-[12px] bg-white border border-[#E5E7EB] px-3 py-3">
              <i.icon size={16} className="text-[#E8649A] mb-1" aria-hidden />
              <p className="text-base font-semibold text-[#0D0C0D] leading-none">{i.valor}</p>
              <p className="text-[12px] text-[#666666] leading-snug mt-1">{i.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 2: como funciona */}
      <section className="max-w-[520px] mx-auto pb-12">
        <div className="rounded-[20px] bg-white border border-[#E5E7EB] p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-[#0D0C0D] mb-3">
            <ListChecks size={18} className="text-[#E8649A]" aria-hidden />
            Como funciona
          </p>
          <ol className="space-y-2 text-sm text-[#666666]">
            <li><span className="font-semibold text-[#0D0C0D]">1.</span> Toque em &ldquo;Falar no WhatsApp&rdquo;.</li>
            <li><span className="font-semibold text-[#0D0C0D]">2.</span> A conversa abre com a mensagem e o seu ID de atendimento prontos. É só enviar.</li>
            <li><span className="font-semibold text-[#0D0C0D]">3.</span> Um especialista Bubbles responde com a indicação certa para o seu banho e tosa.</li>
          </ol>
          <div className="mt-5">{botao('como-funciona', false)}</div>
        </div>

        <p className="mt-5 text-center text-[12px] text-[#666666] leading-relaxed">
          Usamos os dados desta visita só para melhorar o atendimento e os nossos anúncios.{' '}
          <a href={POLITICA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Política de privacidade
          </a>
        </p>
        <p className="mt-2 text-center text-[12px] text-[#666666]">Bubbles Pet · cosméticos para banho e tosa profissional</p>
      </section>
    </main>
  )
}
