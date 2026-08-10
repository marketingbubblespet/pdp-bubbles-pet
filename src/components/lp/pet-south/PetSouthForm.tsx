'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronRight, X, MessageCircle } from 'lucide-react'
import { loadUtms } from '@/lib/utm'
import { PET_SOUTH, PET_SOUTH_BUSINESS_MODELS } from '@/lib/pet-south'
import { OPEN_FORM_EVENT } from './formBus'
import { trackPetSouthFormSubmit, trackPetSouthLead } from './trackPetSouth'

const SELLUM_WEBHOOK_URL = 'https://api-admin.sellum.app/v1/public/crm/webhooks/captacao-237b5035c0'
const SELLUM_TOKEN = 'crm_15eb27da51aa452be74dfe4512570c8a7e16acd25f9600a0'

// Nome do formulário no painel do Netlify. Precisa bater com public/__forms.html.
const NETLIFY_FORM_NAME = 'pet-south-lead'

const TOTAL_STEPS = 5

type FormState = {
  name: string
  email: string
  whatsapp: string
  hasCnpj: 'yes' | 'no' | ''
  cnpj: string
  hasErp: 'yes' | 'no' | ''
  city: string
  targetCities: string
  businessModel: string
  previousBrands: string
  hasInvestment: 'yes' | 'no' | ''
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  whatsapp: '',
  hasCnpj: '',
  cnpj: '',
  hasErp: '',
  city: '',
  targetCities: '',
  businessModel: '',
  previousBrands: '',
  hasInvestment: '',
}

function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function isPhoneValid(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

function isEmailValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function formatDoc(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 11) {
    if (d.length > 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
    if (d.length > 6) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
    if (d.length > 3) return `${d.slice(0, 3)}.${d.slice(3)}`
    return d
  }
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none'
const labelClass = 'text-xs font-bold text-white/70 uppercase tracking-wider block mb-2'
const errorClass = 'text-xs text-red-400 mt-1.5'

function YesNoPills({
  name, value, onChange,
}: { name: string; value: string; onChange: (v: 'yes' | 'no') => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(['yes', 'no'] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
            value === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10'
          }`}
        >
          {name === 'hasInvestment' ? (opt === 'yes' ? 'Sim, Posso Investir' : 'Não no Momento') : opt === 'yes' ? 'Sim' : 'Não'}
        </button>
      ))}
    </div>
  )
}

export function PetSouthForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [attemptedNext, setAttemptedNext] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [candidacyId, setCandidacyId] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpen = () => {
      setCandidacyId(Math.random().toString(36).slice(2, 11).toUpperCase())
      setIsOpen(true)
    }
    window.addEventListener(OPEN_FORM_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_FORM_EVENT, handleOpen)
  }, [])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }))

  const isQualified = form.hasInvestment === 'yes'

  const isCnpjCpfValid = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (form.hasCnpj === 'no') return digits.length === 11
    return digits.length === 14
  }

  const step1Valid = form.name.trim() !== '' && isEmailValid(form.email) && isPhoneValid(form.whatsapp)
  const step2Valid = form.hasCnpj !== '' && isCnpjCpfValid(form.cnpj) && form.hasErp !== ''
  const step3Valid = form.city.trim() !== '' && form.targetCities.trim() !== ''
  const step4Valid = form.businessModel !== ''
  const step5Valid = form.hasInvestment !== ''

  const stepValid = [step1Valid, step2Valid, step3Valid, step4Valid, step5Valid][step - 1]

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStep(1)
      setForm(EMPTY_FORM)
      setSubmitted(false)
      setAttemptedNext(false)
    }, 300)
  }

  const handleNext = () => {
    setAttemptedNext(true)
    if (!stepValid) return
    setAttemptedNext(false)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  const handlePrev = () => {
    setAttemptedNext(false)
    setStep((s) => Math.max(s - 1, 1))
  }

  const getWhatsAppLink = () => {
    const message = `Olá! Preenchi a candidatura de distribuidor PET South America Bubbles® e gostaria de comprar produtos com condições diferenciadas e exclusivas.

*ID de Atendimento PET South:* ${candidacyId}
*Nome:* ${form.name}
*E-mail:* ${form.email}
*WhatsApp:* ${form.whatsapp}
*Documento (CPF/CNPJ):* ${form.cnpj || 'Não informado'}
*Cidade:* ${form.city}
*Cidades de Atendimento:* ${form.targetCities}
*Modelo de Negócio:* ${form.businessModel}
*Trabalha com outras marcas:* ${form.previousBrands || 'Não informado'}

Quero comprar com condições exclusivas da feira!`
    return `${PET_SOUTH.whatsapp}?text=${encodeURIComponent(message)}`
  }

  const handleSubmit = async () => {
    setAttemptedNext(true)
    if (!stepValid) return

    setLoading(true)
    setError(false)

    const utms = loadUtms()
    const fullUrl = window.location.href

    const sellumPayload = {
      nome: form.name,
      email: form.email,
      telefone: form.whatsapp.replace(/\D/g, ''),
      possui_cnpj: form.hasCnpj === 'yes' ? 'Sim' : 'Não',
      utiliza_erp: form.hasErp === 'yes' ? 'Sim' : 'Não',
      cnpj: form.cnpj.replace(/\D/g, ''),
      cidade_estabelecimento: form.city,
      cidade_atuacao: form.targetCities,
      modelo_negocio: form.businessModel,
      marcas_anteriores: form.previousBrands,
      investimento: form.hasInvestment === 'yes' ? 'Acima de 10.000,00' : 'Abaixo de 10.000,00',
      candidacyId,
      full_url: fullUrl,
      ...utms,
    }

    const netlifyPayload = {
      'form-name': NETLIFY_FORM_NAME,
      nome: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      documento: form.cnpj,
      possui_cnpj: form.hasCnpj,
      possui_erp: form.hasErp,
      cidade: form.city,
      cidades_atuacao: form.targetCities,
      modelo_negocio: form.businessModel,
      marcas_anteriores: form.previousBrands,
      investimento: form.hasInvestment,
      candidacy_id: candidacyId,
      full_url: fullUrl,
      ...utms,
    }

    const enviarNetlify = fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(netlifyPayload),
    }).then((res) => {
      if (!res.ok) throw new Error(`Netlify Forms respondeu ${res.status}`)
    })

    const enviarSellum = isQualified
      ? fetch(SELLUM_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${SELLUM_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sellumPayload),
        }).then((res) => {
          if (!res.ok) throw new Error(`Sellum respondeu ${res.status}`)
        })
      : Promise.resolve()

    const [netlifyResult, sellumResult] = await Promise.allSettled([enviarNetlify, enviarSellum])

    if (sellumResult.status === 'rejected') {
      console.error('Falha ao enviar lead PET South pra Sellum:', sellumResult.reason)
    }
    if (netlifyResult.status === 'rejected') {
      console.error('Falha ao salvar lead PET South no Netlify Forms:', netlifyResult.reason)
    }

    setLoading(false)

    const salvou = isQualified
      ? netlifyResult.status === 'fulfilled' || sellumResult.status === 'fulfilled'
      : netlifyResult.status === 'fulfilled'

    if (!salvou) {
      setError(true)
      return
    }

    trackPetSouthFormSubmit()
    trackPetSouthLead()
    setSubmitted(true)

    if (!isQualified) {
      try {
        window.open(getWhatsAppLink(), '_blank')
      } catch {}
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <motion.div
        ref={modalRef}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#121212] border border-white/10 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#1A1A1A] sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">
              {submitted ? 'Agendamento Recebido' : 'Agendar Reunião - PET South America'}
            </h3>
            {!submitted && (
              <p className="text-[#F4CDD4] text-[10px] uppercase tracking-widest mt-1 font-bold">
                Passo {step} de {TOTAL_STEPS} • Vagas Limitadas
              </p>
            )}
          </div>
          <button type="button" onClick={handleClose} className="text-white/40 hover:text-white transition-colors" aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        {!submitted && (
          <div className="h-1 bg-white/5 w-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4]"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,205,212,0.3)]">
                  <CheckCircle size={36} />
                </div>
                <h4 className="text-2xl font-black text-white tracking-tight">
                  {isQualified ? 'Candidatura PET South Recebida!' : 'Atendimento Especial Exclusivo'}
                </h4>
                <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
                  {isQualified ? (
                    <>
                      Agradecemos seu contato no ecossistema PET South America Bubbles®.
                      <br /><br />
                      Nossa equipe de expansão recebeu seus dados comerciais com sucesso (ID PET South:{' '}
                      <span className="text-[#F4CDD4] font-mono">{candidacyId}</span>). Entraremos em contato em breve.
                    </>
                  ) : (
                    <>
                      Direcionamos o seu atendimento para o nosso canal exclusivo no WhatsApp.
                      <br /><br />
                      (ID do Atendimento: <span className="text-[#F4CDD4] font-mono">{candidacyId}</span>)
                    </>
                  )}
                </p>
                {error && <p className="text-xs text-red-400">Houve uma falha ao registrar seu cadastro. Tente novamente pelo WhatsApp.</p>}
                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {!isQualified && (
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} /> Abrir WhatsApp Comercial
                    </a>
                  )}
                  <button type="button" onClick={handleClose} className="w-full sm:w-auto px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-[#F4CDD4] text-[#080808]">
                    Fechar
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Dados de Contato da Feira</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="ps-name" className={labelClass}>Seu Nome Completo *</label>
                        <input id="ps-name" type="text" placeholder="Ex: Gabriel Xavier" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
                        {attemptedNext && form.name.trim() === '' && <p className={errorClass}>Preencha seu nome.</p>}
                      </div>
                      <div>
                        <label htmlFor="ps-email" className={labelClass}>Seu E-mail Corporativo *</label>
                        <input id="ps-email" type="email" placeholder="contato@suadistribuidora.com.br" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
                        {attemptedNext && !isEmailValid(form.email) && <p className={errorClass}>E-mail inválido.</p>}
                      </div>
                      <div>
                        <label htmlFor="ps-whatsapp" className={labelClass}>WhatsApp com DDD *</label>
                        <input id="ps-whatsapp" type="tel" inputMode="numeric" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(e) => set('whatsapp', formatPhone(e.target.value))} className={inputClass} />
                        {attemptedNext && !isPhoneValid(form.whatsapp) && <p className={errorClass}>Número de telefone inválido.</p>}
                      </div>
                    </div>
                    <button type="button" onClick={handleNext} className="w-full bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 mt-6">
                      Continuar <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Estrutura Empresarial</h4>
                    <div className="space-y-4">
                      <div>
                        <p className={labelClass}>Sua empresa possui CNPJ? *</p>
                        <YesNoPills name="hasCnpj" value={form.hasCnpj} onChange={(v) => setForm((f) => ({ ...f, hasCnpj: v, cnpj: '' }))} />
                        {attemptedNext && form.hasCnpj === '' && <p className={errorClass}>Selecione uma opção.</p>}
                      </div>

                      {form.hasCnpj !== '' && (
                        <div>
                          <label htmlFor="ps-doc" className={labelClass}>{form.hasCnpj === 'yes' ? 'CNPJ *' : 'CPF *'}</label>
                          <input
                            id="ps-doc" type="text" inputMode="numeric"
                            placeholder={form.hasCnpj === 'yes' ? '00.000.000/0001-00' : '000.000.000-00'}
                            value={form.cnpj}
                            onChange={(e) => set('cnpj', formatDoc(e.target.value))}
                            className={inputClass}
                          />
                          {attemptedNext && !isCnpjCpfValid(form.cnpj) && <p className={errorClass}>Documento inválido.</p>}
                        </div>
                      )}

                      <div>
                        <p className={labelClass}>Utiliza Sistema de Gestão ERP? *</p>
                        <YesNoPills name="hasErp" value={form.hasErp} onChange={(v) => set('hasErp', v)} />
                        {attemptedNext && form.hasErp === '' && <p className={errorClass}>Selecione uma opção.</p>}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={handlePrev} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button type="button" onClick={handleNext} className="flex-1 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs">Avançar</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Região de Atuação</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="ps-city" className={labelClass}>Cidade Base da Distribuidora *</label>
                        <input id="ps-city" type="text" placeholder="Ex: São Paulo / SP" value={form.city} onChange={(e) => set('city', e.target.value)} className={inputClass} />
                        {attemptedNext && form.city.trim() === '' && <p className={errorClass}>Preencha a cidade.</p>}
                      </div>
                      <div>
                        <label htmlFor="ps-target-cities" className={labelClass}>Cidades/Regiões que Deseja Atender *</label>
                        <input id="ps-target-cities" type="text" placeholder="Ex: Grande SP e Campinas" value={form.targetCities} onChange={(e) => set('targetCities', e.target.value)} className={inputClass} />
                        {attemptedNext && form.targetCities.trim() === '' && <p className={errorClass}>Preencha as regiões desejadas.</p>}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={handlePrev} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button type="button" onClick={handleNext} className="flex-1 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs">Avançar</button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Modelo Operacional</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="ps-business-model" className={labelClass}>Qual o seu modelo comercial atual? *</label>
                        <select
                          id="ps-business-model"
                          value={form.businessModel}
                          onChange={(e) => set('businessModel', e.target.value)}
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        >
                          <option value="">Selecione uma opção...</option>
                          {PET_SOUTH_BUSINESS_MODELS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        {attemptedNext && form.businessModel === '' && <p className={errorClass}>Selecione uma opção.</p>}
                      </div>

                      <div>
                        <label htmlFor="ps-previous-brands" className={labelClass}>Já distribui ou distribuiu outras marcas pet?</label>
                        <input id="ps-previous-brands" type="text" placeholder="Informe se relevante" value={form.previousBrands} onChange={(e) => set('previousBrands', e.target.value)} className={inputClass} />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={handlePrev} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button type="button" onClick={handleNext} className="flex-1 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs">Avançar</button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step5" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Investimento Inicial</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Para assegurar o suporte direto de fábrica PET South America e condições diferenciadas, o investimento mínimo inicial em estoque é de{' '}
                      <strong className="text-[#F4CDD4]">R$ 10.000,00</strong>.
                    </p>

                    <div>
                      <p className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-3">
                        Você possui este capital disponível para início imediato? *
                      </p>
                      <YesNoPills name="hasInvestment" value={form.hasInvestment} onChange={(v) => set('hasInvestment', v)} />
                      {attemptedNext && form.hasInvestment === '' && <p className={errorClass}>Selecione uma opção.</p>}
                    </div>

                    {error && <p className="text-sm text-red-400 text-center">Não conseguimos enviar seu cadastro agora. Tente novamente em instantes.</p>}

                    <div className="flex gap-4 pt-6">
                      <button type="button" onClick={handlePrev} disabled={loading} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-[2] bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? 'Enviando...' : 'AGENDAR REUNIÃO AGORA'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
