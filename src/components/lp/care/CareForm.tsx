'use client'
import { useState } from 'react'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { loadUtms } from '@/lib/utm'
import { CARE } from '@/lib/care'
import { trackCareLead } from './trackCare'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const SELLUM_WEBHOOK_URL = 'https://api-admin.sellum.app/v1/public/crm/webhooks/captacao-237b5035c0'
const SELLUM_TOKEN = 'crm_15eb27da51aa452be74dfe4512570c8a7e16acd25f9600a0'

const TOTAL_STEPS = 3

type FormState = {
  nome: string
  email: string
  whatsapp: string
  petshop: string
  possuiCnpj: 'sim' | 'nao' | ''
  cidade: string
  banhosMes: string
  clienteBubbles: 'sim' | 'nao' | ''
  investimentoMinimo: 'sim' | 'nao' | ''
}

const EMPTY_FORM: FormState = {
  nome: '',
  email: '',
  whatsapp: '',
  petshop: '',
  possuiCnpj: '',
  cidade: '',
  banhosMes: '',
  clienteBubbles: '',
  investimentoMinimo: '',
}

// Codifica um objeto como application/x-www-form-urlencoded, formato que o Netlify Forms espera
function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

const inputClass = 'w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0F0C0D] focus:outline-none focus:border-[#E8649A]'
const labelClass = 'block text-xs font-bold text-[#0F0C0D] mb-1.5'

// Formata o telefone conforme o usuário digita: (00) 0000-0000 (fixo) ou (00) 00000-0000 (celular)
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

// Válido com DDD + fixo (10 dígitos) ou DDD + celular (11 dígitos)
function isPhoneValid(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

function isEmailValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function RadioPill({
  name, value, checked, onChange, children,
}: { name: string; value: string; checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label
      className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-bold rounded-[10px] px-4 py-2.5 border cursor-pointer transition-colors ${
        checked ? 'bg-[#E8649A] border-[#E8649A] text-white' : 'bg-white border-[#E5E7EB] text-[#0F0C0D] hover:border-[#E8649A]'
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  )
}

export function CareForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [attemptedNext, setAttemptedNext] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }))

  const step1Valid = form.nome.trim() !== '' && isPhoneValid(form.whatsapp) && (form.email.trim() === '' || isEmailValid(form.email))
  const step2Valid = form.petshop.trim() !== '' && form.cidade.trim() !== '' && form.possuiCnpj !== ''
  const step3Valid = form.investimentoMinimo !== ''

  const goNext = () => {
    setAttemptedNext(true)
    if (step === 1 && !step1Valid) return
    if (step === 2 && !step2Valid) return
    setAttemptedNext(false)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  const goBack = () => {
    setAttemptedNext(false)
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = async () => {
    if (!step3Valid) { setAttemptedNext(true); return }
    setLoading(true)
    setError(false)

    const utms = loadUtms()
    const fullUrl = window.location.href

    const sellumPayload = {
      contactName: `(care) ${form.nome}`,
      companyName: form.petshop,
      email: form.email || undefined,
      phone: form.whatsapp,
      source: 'care',
      cidade: form.cidade,
      possuiCnpj: form.possuiCnpj,
      banhosMes: form.banhosMes,
      clienteBubbles: form.clienteBubbles,
      investimentoMinimo: form.investimentoMinimo,
      ...utms,
      full_url: fullUrl,
    }

    // Backup: mesmo lead também vai pro Netlify Forms (painel Netlify > Forms),
    // independente do resultado do envio pra Sellum.
    const netlifyPayload = {
      'form-name': 'care-lead',
      nome: form.nome,
      petshop: form.petshop,
      possuiCnpj: form.possuiCnpj,
      cidade: form.cidade,
      whatsapp: form.whatsapp,
      email: form.email || '',
      banhosMes: form.banhosMes || '',
      clienteBubbles: form.clienteBubbles || '',
      investimentoMinimo: form.investimentoMinimo || '',
      full_url: fullUrl,
      ...utms,
    }

    const [sellumResult, netlifyResult] = await Promise.allSettled([
      fetch(SELLUM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SELLUM_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellumPayload),
      }).then((res) => {
        if (!res.ok) throw new Error(`Sellum respondeu ${res.status}`)
      }),
      fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(netlifyPayload),
      }).then((res) => {
        if (!res.ok) throw new Error(`Netlify Forms respondeu ${res.status}`)
      }),
    ])

    if (sellumResult.status === 'rejected') {
      console.error('Falha ao enviar lead Bubbles Care pra Sellum:', sellumResult.reason)
    }
    if (netlifyResult.status === 'rejected') {
      console.error('Falha ao salvar lead Bubbles Care no Netlify Forms:', netlifyResult.reason)
    }

    setLoading(false)

    // Só considera falha total se os DOIS destinos falharem; um dos dois já garante o lead salvo.
    if (sellumResult.status === 'rejected' && netlifyResult.status === 'rejected') {
      setError(true)
      return
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'form_submit', form_name: 'care-lead' })

    trackCareLead()
    setSubmitted(true)
  }

  const stepTitles = ['Dados de contato', 'Sobre o seu petshop', 'Perfil e investimento']

  return (
    <section id="cadastro" className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB] scroll-mt-4">
      <div className="max-w-[640px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Pré-venda de lançamento
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-3">
          Quero revender no meu petshop
        </h2>
        <p className="text-sm md:text-base text-[#6B7280] text-center mb-10 max-w-[480px] mx-auto">
          Preencha o cadastro e nossos consultores entram em contato com as condições especiais de pré-venda.
        </p>

        {submitted ? (
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-8 text-center flex flex-col items-center gap-3">
            <CheckCircle2 size={40} className="text-[#3DB85C]" />
            <h3 className="font-extrabold text-[#0F0C0D] text-lg">Cadastro recebido!</h3>
            <p className="text-sm text-[#6B7280]">
              Nossos consultores vão falar com você em breve pelo WhatsApp ou e-mail informado.
            </p>
          </div>
        ) : (
          <div className="bg-[#F7F7F7] rounded-2xl p-6 md:p-8 border border-[#E5E7EB]">
            {/* Cabeçalho do passo + barra de progresso */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
                  Passo {step} de {TOTAL_STEPS}
                </p>
                <h3 className="text-sm font-extrabold text-[#0F0C0D]">{stepTitles[step - 1]}</h3>
              </div>
              <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E8649A] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {step === 1 && (
                <>
                  <div>
                    <label htmlFor="nome" className={labelClass}>Nome completo *</label>
                    <input
                      id="nome" type="text" value={form.nome}
                      onChange={(e) => set('nome', e.target.value)}
                      className={inputClass}
                    />
                    {attemptedNext && form.nome.trim() === '' && (
                      <p className="text-xs text-red-600 mt-1">Preencha seu nome.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>E-mail</label>
                    <input
                      id="email" type="email" placeholder="exemplo@gmail.com" value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className={inputClass}
                    />
                    {attemptedNext && form.email.trim() !== '' && !isEmailValid(form.email) && (
                      <p className="text-xs text-red-600 mt-1">E-mail inválido.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className={labelClass}>WhatsApp *</label>
                    <input
                      id="whatsapp" type="tel" inputMode="numeric" placeholder="(00) 00000-0000" value={form.whatsapp}
                      onChange={(e) => set('whatsapp', formatPhone(e.target.value))}
                      className={inputClass}
                    />
                    {attemptedNext && form.whatsapp.trim() === '' && (
                      <p className="text-xs text-red-600 mt-1">Preencha seu WhatsApp.</p>
                    )}
                    {attemptedNext && form.whatsapp.trim() !== '' && !isPhoneValid(form.whatsapp) && (
                      <p className="text-xs text-red-600 mt-1">Número de telefone incorreto.</p>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="petshop" className={labelClass}>Nome do petshop *</label>
                    <input
                      id="petshop" type="text" value={form.petshop}
                      onChange={(e) => set('petshop', e.target.value)}
                      className={inputClass}
                    />
                    {attemptedNext && form.petshop.trim() === '' && (
                      <p className="text-xs text-red-600 mt-1">Preencha o nome do petshop.</p>
                    )}
                  </div>
                  <div>
                    <p className={labelClass}>Possui CNPJ ativo? *</p>
                    <div className="flex gap-3">
                      <RadioPill name="possuiCnpj" value="sim" checked={form.possuiCnpj === 'sim'} onChange={() => set('possuiCnpj', 'sim')}>Sim</RadioPill>
                      <RadioPill name="possuiCnpj" value="nao" checked={form.possuiCnpj === 'nao'} onChange={() => set('possuiCnpj', 'nao')}>Não</RadioPill>
                    </div>
                    {attemptedNext && form.possuiCnpj === '' && (
                      <p className="text-xs text-red-600 mt-1">Selecione uma opção.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cidade" className={labelClass}>Cidade / Estado *</label>
                    <input
                      id="cidade" type="text" value={form.cidade}
                      onChange={(e) => set('cidade', e.target.value)}
                      className={inputClass}
                    />
                    {attemptedNext && form.cidade.trim() === '' && (
                      <p className="text-xs text-red-600 mt-1">Preencha a cidade.</p>
                    )}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label htmlFor="banhosMes" className={labelClass}>Quantos banhos o seu estabelecimento faz por mês?</label>
                    <select
                      id="banhosMes" value={form.banhosMes}
                      onChange={(e) => set('banhosMes', e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>Selecione uma faixa</option>
                      <option value="ate-50">Até 50 banhos</option>
                      <option value="51-150">51 a 150 banhos</option>
                      <option value="151-300">151 a 300 banhos</option>
                      <option value="mais-300">Mais de 300 banhos</option>
                    </select>
                  </div>

                  <div>
                    <p className={labelClass}>Já é cliente Bubbles?</p>
                    <div className="flex gap-3">
                      <RadioPill name="clienteBubbles" value="sim" checked={form.clienteBubbles === 'sim'} onChange={() => set('clienteBubbles', 'sim')}>Sim</RadioPill>
                      <RadioPill name="clienteBubbles" value="nao" checked={form.clienteBubbles === 'nao'} onChange={() => set('clienteBubbles', 'nao')}>Não</RadioPill>
                    </div>
                  </div>

                  <div>
                    <p className={labelClass}>Você tem condição de fazer um primeiro pedido a partir de R$ 3.000? *</p>
                    <div className="flex gap-3">
                      <RadioPill name="investimentoMinimo" value="sim" checked={form.investimentoMinimo === 'sim'} onChange={() => set('investimentoMinimo', 'sim')}>Sim</RadioPill>
                      <RadioPill name="investimentoMinimo" value="nao" checked={form.investimentoMinimo === 'nao'} onChange={() => set('investimentoMinimo', 'nao')}>Não</RadioPill>
                    </div>
                    {attemptedNext && form.investimentoMinimo === '' && (
                      <p className="text-xs text-red-600 mt-1">Selecione uma opção.</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center mt-4">
                Não conseguimos enviar seu cadastro agora. Tente novamente em instantes.
              </p>
            )}

            <div className="flex items-center gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-1 bg-white border border-[#E5E7EB] text-[#0F0C0D] font-bold text-sm px-5 py-3 rounded-[10px] hover:bg-[#F7F7F7] active:scale-95 transition-all duration-200"
                >
                  <ChevronLeft size={16} /> Voltar
                </button>
              )}

              {step < TOTAL_STEPS && (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 flex items-center justify-center gap-1 bg-[#E8649A] text-white font-bold text-sm md:text-base px-6 py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md"
                >
                  Próxima etapa <ChevronRight size={16} />
                </button>
              )}

              {step === TOTAL_STEPS && form.investimentoMinimo === 'nao' && (
                <a
                  href={`${CARE.whatsapp}?text=${encodeURIComponent(CARE.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center bg-[#25D366] text-white font-bold text-sm md:text-base px-6 py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md text-center"
                >
                  Falar no WhatsApp
                </a>
              )}

              {step === TOTAL_STEPS && form.investimentoMinimo !== 'nao' && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-[#3DB85C] text-white font-bold text-sm md:text-base px-6 py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md disabled:opacity-60"
                >
                  {loading ? 'Enviando...' : 'Enviar cadastro →'}
                </button>
              )}
            </div>

            <p className="text-[10px] text-[#9ca3af] text-center mt-4">
              Ao enviar, você concorda em ser contatado pela equipe Bubbles.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
