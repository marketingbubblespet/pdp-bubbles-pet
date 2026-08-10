'use client'
import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle, MessageCircle } from 'lucide-react'
import { CAPTACAO_BUSINESS_MODELS } from '@/lib/captacao'
import {
  type FormState,
  inputClass,
  labelClass,
  errorClass,
  isEmailValid,
  isPhoneValid,
  isDocValid,
  formatPhone,
  formatDoc,
} from './captacaoFormUtils'

const fadeStep = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
}

function YesNoPills({ value, onChange }: { value: string; onChange: (v: 'yes' | 'no') => void }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(['yes', 'no'] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${
            value === opt ? 'bg-[#F4CDD4] text-[#0F0C0D] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'
          }`}
        >
          {opt === 'yes' ? 'Sim' : 'Não'}
        </button>
      ))}
    </div>
  )
}

export function Step1Contact({
  form, setForm, attemptedNext,
}: { form: FormState; setForm: (f: FormState) => void; attemptedNext: boolean }) {
  return (
    <motion.div {...fadeStep} className="space-y-6">
      <h4 className="text-xl font-black text-white mb-8 tracking-tight">Dados de Contato</h4>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>Nome Completo</label>
          <input id="name" type="text" placeholder="Ex: Gabriel Silva" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {attemptedNext && form.name.trim() === '' && <span className={errorClass}>Preencha seu nome.</span>}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>E-mail Corporativo</label>
            <input id="email" type="email" placeholder="seu@email.com" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {form.email && !isEmailValid(form.email) && <span className={errorClass}>E-mail inválido.</span>}
          </div>
          <div>
            <label htmlFor="telefone" className={labelClass}>Seu WhatsApp</label>
            <input id="telefone" type="tel" inputMode="numeric" placeholder="(00) 00000-0000" className={inputClass} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: formatPhone(e.target.value) })} />
            {attemptedNext && !isPhoneValid(form.whatsapp) && <span className={errorClass}>Telefone inválido. Inclua o DDD.</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Step2Profile({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <motion.div {...fadeStep} className="space-y-8">
      <h4 className="text-xl font-black text-white mb-8 tracking-tight">Perfil Operacional</h4>
      <div className="space-y-8">
        <div>
          <p className="text-white font-bold mb-4 text-sm">Possui CNPJ ativo?</p>
          <YesNoPills value={form.hasCnpj} onChange={(v) => setForm({ ...form, hasCnpj: v })} />
        </div>
        <div>
          <p className="text-white font-bold mb-4 text-sm">Utiliza sistema de gestão (ERP)?</p>
          <YesNoPills value={form.hasErp} onChange={(v) => setForm({ ...form, hasErp: v })} />
        </div>
      </div>
    </motion.div>
  )
}

export function Step3Location({
  form, setForm, attemptedNext,
}: { form: FormState; setForm: (f: FormState) => void; attemptedNext: boolean }) {
  const isCpf = form.hasCnpj === 'no'
  return (
    <motion.div {...fadeStep} className="space-y-6">
      <h4 className="text-xl font-black text-white mb-8 tracking-tight">Localização e Identificação</h4>
      <div className="space-y-4">
        <p className="text-white/60 text-sm mb-4">
          {isCpf ? 'Para prosseguir, precisamos saber os dados de identificação do distribuidor.' : 'Para prosseguir, precisamos saber os dados da sua empresa.'}
        </p>
        <div id="documento" className="scroll-mt-24">
          <label htmlFor="documentoInput" className={labelClass}>{isCpf ? 'CPF do Distribuidor' : 'CNPJ da Empresa'}</label>
          <input
            id="documentoInput" type="text" inputMode="numeric"
            placeholder={isCpf ? '000.000.000-00' : '00.000.000/0000-00'}
            className={inputClass} value={form.documento}
            onChange={(e) => setForm({ ...form, documento: formatDoc(e.target.value) })}
          />
          {attemptedNext && !isDocValid(form.documento, form.hasCnpj) && (
            <span className={errorClass}>{isCpf ? 'CPF inválido. Deve possuir 11 dígitos.' : 'CNPJ inválido. Deve possuir 14 dígitos.'}</span>
          )}
        </div>
        <div id="city" className="scroll-mt-24">
          <label htmlFor="cityInput" className={labelClass}>Qual cidade está o seu estabelecimento?</label>
          <input id="cityInput" type="text" placeholder="Ex: São Paulo" className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          {attemptedNext && form.city.trim() === '' && <span className={errorClass}>Preencha a cidade.</span>}
        </div>
        <div id="targetCities" className="scroll-mt-24">
          <label htmlFor="targetCitiesInput" className={labelClass}>Quais outras cidades pretende atender? (separado por vírgulas)</label>
          <input id="targetCitiesInput" type="text" placeholder="Ex: Campinas, Limeira" className={inputClass} value={form.targetCities} onChange={(e) => setForm({ ...form, targetCities: e.target.value })} />
          {attemptedNext && form.targetCities.trim() === '' && <span className={errorClass}>Preencha ao menos uma cidade.</span>}
        </div>
      </div>
    </motion.div>
  )
}

export function Step4Business({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <motion.div {...fadeStep} className="space-y-6">
      <h4 className="text-xl font-black text-white mb-8 tracking-tight">Modelo de Negócio</h4>
      <div className="space-y-6">
        <div>
          <span className={labelClass}>Como você atua hoje?</span>
          <div className="grid grid-cols-1 gap-2">
            {CAPTACAO_BUSINESS_MODELS.map((opt) => (
              <button
                key={opt.id} type="button"
                onClick={() => setForm({ ...form, businessModel: opt.label })}
                className={`py-4 px-6 rounded-xl border text-left font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-between ${
                  form.businessModel === opt.label ? 'bg-[#F4CDD4] text-[#0F0C0D] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'
                }`}
              >
                {opt.label}
                {form.businessModel === opt.label && <CheckCircle size={16} />}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="previousBrands" className={labelClass}>Já trabalha com alguma marca de cosmética pet? (Opcional)</label>
          <input id="previousBrands" type="text" placeholder="Ex: Marca X, Marca Y ou Não trabalho" className={inputClass} value={form.previousBrands} onChange={(e) => setForm({ ...form, previousBrands: e.target.value })} />
        </div>
      </div>
    </motion.div>
  )
}

export function Step5Investment({
  form, setForm, whatsappLink,
}: { form: FormState; setForm: (f: FormState) => void; whatsappLink: string }) {
  return (
    <motion.div {...fadeStep} className="space-y-8">
      <h4 className="text-xl font-black text-white mb-8 tracking-tight">Critério de Investimento</h4>
      <div id="hasInvestment" className="scroll-mt-24">
        <p className="text-white font-bold mb-6 leading-relaxed text-sm">
          Para ser um <span className="bg-[#F4CDD4] text-[#0F0C0D] px-1">Autorizado</span> e pertencer ao{' '}
          <span className="bg-[#F4CDD4] text-[#0F0C0D] px-1">ecossistema</span> Bubbles, o investimento inicial em
          estoque é de <span className="text-[#F4CDD4]">R$ 10.000,00</span>. Você possui esse capital disponível para
          início imediato?
        </p>
        <YesNoPills value={form.hasInvestment} onChange={(v) => setForm({ ...form, hasInvestment: v })} />
      </div>

      {form.hasInvestment === 'no' && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
          <p className="text-white/80 text-xs leading-relaxed">
            Entendemos perfeitamente. No momento, focamos em distribuidores autorizados com este perfil de
            investimento para o credenciamento do estoque inicial.
            <br /><br />
            No entanto, se você deseja adquirir nossos produtos com{' '}
            <span className="text-[#F4CDD4] font-bold">condições e descontos exclusivos</span>, você pode falar
            diretamente com o nosso atendimento comercial ao enviar o cadastro.
          </p>
        </div>
      )}
      {/* Link auxiliar, usado só na tela de sucesso (whatsappLink recebido por props para reuso futuro) */}
      <span className="hidden" data-whatsapp-link={whatsappLink} />
    </motion.div>
  )
}

export function StepNavButtons({
  step, totalSteps, isSubmitting, onBack, onNext, canSubmitLabel,
}: {
  step: number
  totalSteps: number
  isSubmitting: boolean
  onBack: () => void
  onNext: () => void
  canSubmitLabel: string
}) {
  return (
    <div className="flex gap-4">
      {step > 1 && (
        <button type="button" onClick={onBack} disabled={isSubmitting} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors disabled:opacity-50">
          Voltar
        </button>
      )}
      <button
        type="button" onClick={onNext} disabled={isSubmitting}
        className="flex-[2] bg-[#F4CDD4] text-[#0F0C0D] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-[0_0_20px_rgba(244,205,212,0.2)] flex items-center justify-center gap-2 group"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-[#0F0C0D]/30 border-t-[#0F0C0D] rounded-full animate-spin" />
        ) : (
          <>
            {step < totalSteps ? 'Próxima Etapa' : canSubmitLabel} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </div>
  )
}

export function SuccessScreen({
  isQualified, candidacyId, whatsappLink, onClose,
}: { isQualified: boolean; candidacyId: string; whatsappLink: string; onClose: () => void }) {
  return (
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6 text-center py-4">
      <div className="w-16 h-16 bg-[#F4CDD4]/10 text-[#F4CDD4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,205,212,0.2)] animate-pulse">
        {isQualified ? <CheckCircle size={36} className="text-[#F4CDD4]" /> : <MessageCircle size={36} className="text-[#F4CDD4]" />}
      </div>
      <h4 className="text-2xl font-black text-white tracking-tight">{isQualified ? 'Candidatura Enviada!' : 'Condições Exclusivas!'}</h4>
      <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
        {isQualified ? (
          <>
            Agradecemos o seu interesse em se tornar um distribuidor autorizado Bubbles.
            <br /><br />
            Nossa equipe de expansão já recebeu o seu cadastro comercial e técnico com sucesso (ID:{' '}
            <span className="text-[#F4CDD4] font-mono">{candidacyId}</span>). Em breve, um dos nossos atendentes
            entrará em contato com você diretamente para prosseguir com o seu credenciamento.
          </>
        ) : (
          <>
            Para sua comodidade, abrimos uma conversa no WhatsApp para que você possa comprar nossos produtos com
            condições exclusivas e diferenciadas.
            <br /><br />
            Se a janela do WhatsApp não abriu automaticamente, clique no botão abaixo para iniciar o seu atendimento
            comercial personalizado.
            <br />(ID do Atendimento: <span className="text-[#F4CDD4] font-mono">{candidacyId}</span>)
          </>
        )}
      </p>
      <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
        {!isQualified && (
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 bg-[#F4CDD4] text-[#0F0C0D] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(244,205,212,0.2)] flex items-center justify-center gap-2">
            <MessageCircle size={16} /> Abrir WhatsApp
          </a>
        )}
        <button
          type="button" onClick={onClose}
          className={`w-full sm:w-auto px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform ${
            !isQualified ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#F4CDD4] text-[#0F0C0D] shadow-[0_0_20px_rgba(244,205,212,0.2)]'
          }`}
        >
          {isQualified ? 'Fechar' : 'Fechar'}
        </button>
      </div>
    </motion.div>
  )
}
