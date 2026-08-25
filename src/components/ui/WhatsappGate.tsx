'use client'
// src/components/ui/WhatsappGate.tsx
// Substitui um <a> de WhatsApp: no primeiro clique da página abre um formulário curto,
// e só então leva a pessoa pro WhatsApp. Depois de preenchido uma vez naquela LP, os
// próximos cliques passam direto.
//
// Todos os campos são opcionais: quem não quiser preencher clica em "continuar" e vai
// pro WhatsApp do mesmo jeito. Mesmo nesse caso registramos a origem do clique, a URL
// de conversão e os parâmetros de campanha, que já é dado útil.
import { useState, type ReactNode } from 'react'
import { coletarContexto } from '@/lib/lead-context'
import { createLeadId, pushFormOpen, pushWhatsappGate, pushWhatsappClick, splitFullName } from '@/lib/tracking'

const NETLIFY_FORM_NAME = 'whatsapp-gate'

// Chave por landing page: preencheu na Live do Tosador, passa direto lá pra sempre,
// mas preenche de novo se cair numa LP diferente (decisão de produto).
const chaveDaPagina = () => `bubbles_lead_gate_${window.location.pathname}`

// Guarda o que a pessoa digitou para pré-preencher numa próxima LP. Ela ainda passa
// pelo gate (o lead é registrado por LP), mas não precisa digitar tudo de novo.
const CHAVE_DADOS = 'bubbles_lead_dados'

type DadosSalvos = { nome?: string; email?: string; whatsapp?: string; perfil?: string }

function lerDadosSalvos(): DadosSalvos {
  try {
    const bruto = localStorage.getItem(CHAVE_DADOS)
    return bruto ? (JSON.parse(bruto) as DadosSalvos) : {}
  } catch {
    return {}
  }
}

function jaPreencheuNestaPagina(): boolean {
  try {
    return localStorage.getItem(chaveDaPagina()) === '1'
  } catch {
    return false
  }
}

// Formata o telefone conforme digita: (00) 0000-0000 fixo ou (00) 00000-0000 celular.
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

const PERFIS = [
  { value: 'tutor', label: 'Tutor' },
  { value: 'groomer', label: 'Groomer' },
  { value: 'outro', label: 'Outro' },
] as const

export function WhatsappGate({
  href,
  ctaLocation,
  ctaLabel,
  theme = 'light',
  className = '',
  style,
  onClick,
  children,
}: {
  href: string
  ctaLocation: string
  ctaLabel: string
  theme?: 'light' | 'dark'
  className?: string
  style?: React.CSSProperties
  /** Efeito colateral do componente pai no clique (ex: fechar um pop-up). */
  onClick?: () => void
  children: ReactNode
}) {
  const [aberto, setAberto] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [perfil, setPerfil] = useState('')

  const escuro = theme === 'dark'

  const abrirDestino = () => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    if (jaPreencheuNestaPagina()) {
      // Já preencheu aqui: segue o fluxo normal do link, só registra o clique.
      pushWhatsappClick(ctaLocation)
      return
    }
    e.preventDefault()
    const salvos = lerDadosSalvos()
    setNome(salvos.nome ?? '')
    setEmail(salvos.email ?? '')
    setWhatsapp(salvos.whatsapp ?? '')
    setPerfil(salvos.perfil ?? '')
    setAberto(true)
    pushFormOpen(NETLIFY_FORM_NAME)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const gateId = createLeadId('gate')
    const contexto = coletarContexto({ ctaLocation, ctaLabel, destinoUrl: href })

    const payload: Record<string, string> = {
      'form-name': NETLIFY_FORM_NAME,
      gate_id: gateId,
      nome,
      email,
      whatsapp,
      perfil,
      ...contexto,
    }

    // keepalive faz a requisição sobreviver à navegação: assim a pessoa vai pro
    // WhatsApp na hora, sem esperar a resposta do Netlify.
    fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(payload),
      keepalive: true,
    }).catch((erro) => {
      console.error('Falha ao salvar o gate de WhatsApp no Netlify Forms:', erro)
    })

    try {
      localStorage.setItem(chaveDaPagina(), '1')
      localStorage.setItem(CHAVE_DADOS, JSON.stringify({ nome, email, whatsapp, perfil }))
    } catch {}

    const { firstName, lastName } = splitFullName(nome)
    pushWhatsappGate({
      gateId,
      formName: NETLIFY_FORM_NAME,
      landingPage: window.location.pathname,
      ctaLocation,
      perfil: perfil || undefined,
      user: { email: email || undefined, phone: whatsapp || undefined, firstName, lastName },
    })

    setAberto(false)
    // Chamado dentro do gesto do usuário (submit), então não é bloqueado como pop-up.
    abrirDestino()
  }

  const inputClass = escuro
    ? 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F4CDD4]'
    : 'w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#0D0C0D] placeholder-[#9ca3af] focus:outline-none focus:border-[#E8649A]'

  const labelClass = escuro
    ? 'block text-xs font-semibold text-white/70 mb-1.5'
    : 'block text-xs font-semibold text-[#0D0C0D] mb-1.5'

  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={className} style={style}>
        {children}
      </a>

      {aberto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70"
          onClick={() => setAberto(false)}
        >
          <div
            className={`relative w-full max-w-[420px] rounded-2xl p-6 md:p-7 shadow-2xl ${
              escuro ? 'bg-[#1A1A1A] border border-white/10' : 'bg-white border border-[#E5E7EB]'
            }`}
            onClick={(ev) => ev.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar"
              className={`absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-2xl leading-none ${
                escuro ? 'text-white/40 hover:text-white' : 'text-[#9ca3af] hover:text-[#0D0C0D]'
              }`}
            >
              ×
            </button>

            <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${escuro ? 'text-[#F4CDD4]' : 'text-[#E8649A]'}`}>
              Quase lá
            </p>
            <h3 className={`text-lg md:text-xl font-medium mb-1.5 ${escuro ? 'text-white' : 'text-[#0D0C0D]'}`}>
              Antes de continuar, se apresenta pra gente?
            </h3>
            <p className={`text-xs mb-5 ${escuro ? 'text-white/60' : 'text-[#666666]'}`}>
              É rapidinho e ajuda a gente a falar com você do jeito certo. Se preferir, pode pular.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label htmlFor="gate-nome" className={labelClass}>Seu nome</label>
                <input id="gate-nome" type="text" value={nome} onChange={(ev) => setNome(ev.target.value)} className={inputClass} />
              </div>

              <div>
                <label htmlFor="gate-whatsapp" className={labelClass}>WhatsApp</label>
                <input
                  id="gate-whatsapp" type="tel" inputMode="numeric" placeholder="(00) 00000-0000"
                  value={whatsapp} onChange={(ev) => setWhatsapp(formatPhone(ev.target.value))}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="gate-email" className={labelClass}>E-mail</label>
                <input
                  id="gate-email" type="email" placeholder="exemplo@gmail.com"
                  value={email} onChange={(ev) => setEmail(ev.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <p className={labelClass}>Você é</p>
                <div className="flex gap-2">
                  {PERFIS.map((p) => {
                    const ativo = perfil === p.value
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPerfil(ativo ? '' : p.value)}
                        className={`flex-1 min-h-[44px] rounded-xl border text-sm font-semibold transition-colors ${
                          ativo
                            ? escuro
                              ? 'bg-[#F4CDD4] border-[#F4CDD4] text-[#0D0C0D]'
                              : 'bg-[#E8649A] border-[#E8649A] text-white'
                            : escuro
                              ? 'bg-white/5 border-white/10 text-white hover:border-white/30'
                              : 'bg-white border-[#E5E7EB] text-[#0D0C0D] hover:border-[#E8649A]'
                        }`}
                      >
                        {p.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 min-h-[44px] bg-[#3DB85C] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md"
              >
                Continuar pro WhatsApp →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
