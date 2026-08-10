'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { loadUtms } from '@/lib/utm'
import { CAPTACAO } from '@/lib/captacao'
import { trackCaptacaoFormSubmit, trackCaptacaoLead } from './trackCaptacao'
import {
  type FormState, EMPTY_FORM, formatPhone, formatDoc, isEmailValid, isPhoneValid, isDocValid, encodeFormData,
} from './captacaoFormUtils'
import {
  Step1Contact, Step2Profile, Step3Location, Step4Business, Step5Investment, StepNavButtons, SuccessScreen,
} from './CaptacaoFormSteps'

const SELLUM_WEBHOOK_URL = 'https://api-admin.sellum.app/v1/public/crm/webhooks/captacao-237b5035c0'
const SELLUM_TOKEN = 'crm_15eb27da51aa452be74dfe4512570c8a7e16acd25f9600a0'

const NETLIFY_FORM_NAME = 'captacao-lead'
const TOTAL_STEPS = 5

function generateId(): string {
  return Math.random().toString(36).substring(2, 11).toUpperCase()
}

function isStepValid(step: number, form: FormState): boolean {
  if (step === 1) return form.name.trim() !== '' && isEmailValid(form.email || 'x@x.com') && isPhoneValid(form.whatsapp)
  if (step === 2) return form.hasCnpj !== '' && form.hasErp !== ''
  if (step === 3) return isDocValid(form.documento, form.hasCnpj) && form.city.trim() !== '' && form.targetCities.trim() !== ''
  if (step === 5) return form.hasInvestment !== ''
  return true
}

export function CaptacaoForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [candidacyId, setCandidacyId] = useState('')
  const [attemptedNext, setAttemptedNext] = useState(false)

  useEffect(() => {
    if (isOpen) setCandidacyId(generateId())
  }, [isOpen])

  if (!isOpen) return null

  const isQualified = form.hasInvestment === 'yes'
  const whatsappMsg = isQualified
    ? CAPTACAO.whatsappMsgQualificado(candidacyId)
    : CAPTACAO.whatsappMsgNaoQualificado(candidacyId)
  const whatsappLink = `${CAPTACAO.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1)
      setIsSuccess(false)
      setForm(EMPTY_FORM)
    }, 300)
  }

  const handleNext = () => {
    setAttemptedNext(true)
    if (!isStepValid(step, form)) return
    setAttemptedNext(false)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  const handleBack = () => {
    setAttemptedNext(false)
    setStep((s) => Math.max(s - 1, 1))
  }

  const submitToDestinations = async (utms: Record<string, string | undefined>) => {
    const fullUrl = window.location.href
    const netlifyPayload = {
      'form-name': NETLIFY_FORM_NAME,
      nome: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      documento: form.documento,
      cidade: form.city,
      cidadesAtendimento: form.targetCities,
      possuiCnpj: form.hasCnpj === 'yes' ? 'Sim' : 'Não',
      possuiErp: form.hasErp === 'yes' ? 'Sim' : 'Não',
      modeloNegocio: form.businessModel,
      marcasAnteriores: form.previousBrands,
      investimento: isQualified ? 'Acima de 10.000,00' : 'Abaixo de 10.000,00',
      full_url: fullUrl,
      utm_source: utms.utm_source || '',
      utm_medium: utms.utm_medium || '',
      utm_campaign: utms.utm_campaign || '',
      utm_term: utms.utm_term || '',
      utm_content: utms.utm_content || '',
      gclid: utms.gclid || '',
      fbclid: utms.fbclid || '',
    }

    const enviarNetlify = fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(netlifyPayload),
    }).then((res) => {
      if (!res.ok) throw new Error(`Netlify Forms respondeu ${res.status}`)
    })

    const sellumPayload = {
      contactName: form.name,
      email: form.email || undefined,
      phone: form.whatsapp,
      source: 'captacao',
      id: candidacyId,
      possui_cnpj: form.hasCnpj === 'yes' ? 'Sim' : 'Não',
      cnpj: form.documento,
      utiliza_erp: form.hasErp === 'yes' ? 'Sim' : 'Não',
      cidade_estabelecimento: form.city,
      cidade_atuacao: form.targetCities,
      modelo_negocio: form.businessModel,
      marcas_anteriores: form.previousBrands,
      investimento: isQualified ? 'Acima de 10.000,00' : 'Abaixo de 10.000,00',
      language: 'pt-BR',
      full_url: fullUrl,
      ...utms,
    }

    const enviarSellum = isQualified
      ? fetch(SELLUM_WEBHOOK_URL, {
          method: 'POST',
          headers: { Authorization: `Bearer ${SELLUM_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(sellumPayload),
        }).then((res) => {
          if (!res.ok) throw new Error(`Sellum respondeu ${res.status}`)
        })
      : Promise.resolve()

    return Promise.allSettled([enviarNetlify, enviarSellum])
  }

  const handleSubmit = async () => {
    if (!isStepValid(5, form)) return
    setIsSubmitting(true)
    try {
      localStorage.setItem('captacaoFormSubmitted', 'true')
      const utms = loadUtms()
      const [netlifyResult, sellumResult] = await submitToDestinations(utms)

      if (netlifyResult.status === 'rejected') console.error('Falha ao salvar lead na Netlify:', netlifyResult.reason)
      if (sellumResult.status === 'rejected') console.error('Falha ao enviar lead pra Sellum:', sellumResult.reason)

      trackCaptacaoFormSubmit()
      trackCaptacaoLead()
      setIsSuccess(true)

      if (!isQualified) {
        setTimeout(() => window.open(whatsappLink, '_blank'), 300)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const onNextOrSubmit = step === TOTAL_STEPS ? handleSubmit : handleNext

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#1A1A1A] border border-white/10 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121212] sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">{isSuccess ? 'Candidatura Recebida' : 'Candidatura de Distribuidor'}</h3>
            {!isSuccess && <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1 font-bold">Passo {step} de {TOTAL_STEPS}</p>}
          </div>
          <button type="button" onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {!isSuccess && (
          <div className="h-1 bg-white/5 w-full">
            <motion.div className="h-full bg-[#F4CDD4] shadow-[0_0_10px_rgba(244,205,212,0.5)]" initial={{ width: '0%' }} animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
        )}

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessScreen key="success" isQualified={isQualified} candidacyId={candidacyId} whatsappLink={whatsappLink} onClose={handleClose} />
            ) : (
              <div key={`step-${step}`}>
                {step === 1 && <Step1Contact form={form} setForm={setForm} attemptedNext={attemptedNext} />}
                {step === 2 && <Step2Profile form={form} setForm={setForm} />}
                {step === 3 && <Step3Location form={form} setForm={setForm} attemptedNext={attemptedNext} />}
                {step === 4 && <Step4Business form={form} setForm={setForm} />}
                {step === 5 && <Step5Investment form={form} setForm={setForm} whatsappLink={whatsappLink} />}

                <div className="mt-8">
                  <StepNavButtons
                    step={step}
                    totalSteps={TOTAL_STEPS}
                    isSubmitting={isSubmitting}
                    onBack={handleBack}
                    onNext={onNextOrSubmit}
                    canSubmitLabel={isQualified ? 'Finalizar Candidatura' : 'Quero Condições Exclusivas'}
                  />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
