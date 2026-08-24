'use client'
import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { loadUtms } from '@/lib/utm'
import { CARE } from '@/lib/care'
import { trackCareLead, trackCareFormSubmit } from './trackCare'

const SELLUM_WEBHOOK_URL = 'https://api-admin.sellum.app/v1/public/crm/webhooks/campos-do-formulario-linha-care-f47be681d1'
const SELLUM_TOKEN = 'crm_414922a02b0bf588301ae868350adf823bc4c6ce5c644bdf'

// Nome do formulário no painel do Netlify. Precisa bater com public/__forms.html.
const NETLIFY_FORM_NAME = 'care-parceria'

// Abaixo deste valor o lead NÃO entra no CRM da Sellum: fica só no Netlify Forms e a
// pessoa é encaminhada pro WhatsApp, onde o time avalia caso a caso. Na prática só a
// categoria "Outro" alcança valores abaixo disso.
const VALOR_MINIMO_CRM = 3000

// Segundos que a confirmação fica na tela antes de levar pro WhatsApp.
const SEGUNDOS_ATE_WHATSAPP = 3

const TOTAL_STEPS = 3

// Segmentos e o pedido mínimo de cada um. O valor aparece dentro do próprio cartão de
// escolha, então a pessoa enxerga a faixa antes de selecionar, sem surpresa no fim.
const CATEGORIAS = [
  {
    value: 'varejo',
    label: 'Varejo',
    detalhe: '(Petshop, Agropecuária, Clínica veterinária)',
    minimo: 3000,
  },
  {
    value: 'distribuidor',
    label: 'Distribuidor / Atacadista (Cosméticos e Afins)',
    detalhe: '',
    minimo: 10000,
  },
  // "Outro" não mostra pedido mínimo: o perfil é desconhecido até o comercial falar com a pessoa.
  {
    value: 'outro',
    label: 'Outro',
    detalhe: '',
    minimo: null,
  },
] as const

type CategoriaValue = (typeof CATEGORIAS)[number]['value']

const fmtBRL = (valor: number) => `R$ ${valor.toLocaleString('pt-BR')}`

// Faixas do slider "quanto pretende investir", uma por categoria. Distribuidor começa no
// próprio pedido mínimo (R$ 10.000), então nem aparecem valores abaixo disso. "Outro"
// começa mais embaixo porque costuma ser perfil de entrada menor. O último ponto de cada
// faixa é aberto (ex: 51k+).
const FAIXAS_POR_CATEGORIA: Record<CategoriaValue, number[]> = {
  varejo: [3000, 5000, 10000, 15000, 20000, 30000, 51000],
  distribuidor: [10000, 15000, 20000, 30000, 51000],
  outro: [500, 1000, 2000, 3000, 5000, 10000, 20000, 30000],
}

// Rótulo curto pros marcadores embaixo do slider: 500, 3k, 51k.
const fmtCompacto = (valor: number) => (valor >= 1000 ? `${valor / 1000}k` : `${valor}`)

type FormState = {
  nome: string
  email: string
  whatsapp: string
  petshop: string
  categoria: CategoriaValue | ''
  categoriaOutro: string
  possuiCnpj: 'sim' | 'nao' | ''
  documento: string
  cidade: string
  clienteBubbles: 'sim' | 'nao' | ''
  // Índice dentro da faixa do slider (a faixa muda conforme a categoria escolhida).
  investimentoIdx: number
}

const EMPTY_FORM: FormState = {
  nome: '',
  email: '',
  whatsapp: '',
  petshop: '',
  categoria: '',
  categoriaOutro: '',
  possuiCnpj: '',
  documento: '',
  cidade: '',
  clienteBubbles: '',
  investimentoIdx: 0,
}

// Codifica um objeto como application/x-www-form-urlencoded, formato que o Netlify Forms espera
function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

const inputClass = 'w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0D0C0D] focus:outline-none focus:border-[#E8649A]'
const labelClass = 'block text-xs font-semibold text-[#0D0C0D] mb-1.5'

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

// Formata como CPF (000.000.000-00) até 11 dígitos e como CNPJ (00.000.000/0000-00)
// a partir do 12º. A máscara se ajusta sozinha se a pessoa digitar a mais ou a menos.
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

function RadioPill({
  name, value, checked, onChange, children,
}: { name: string; value: string; checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label
      className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-[10px] px-4 py-2.5 border cursor-pointer transition-colors ${
        checked ? 'bg-[#E8649A] border-[#E8649A] text-white' : 'bg-white border-[#E5E7EB] text-[#0D0C0D] hover:border-[#E8649A]'
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  )
}

// Cartão de segmento com o pedido mínimo já impresso, para a pessoa se posicionar
// sozinha antes de escolher em vez de descobrir o valor depois.
function CategoriaCard({
  checked, onChange, label, detalhe, valor,
}: { checked: boolean; onChange: () => void; label: string; detalhe?: string; valor?: string }) {
  return (
    <label
      className={`flex items-start gap-3 rounded-[10px] px-4 py-3 border cursor-pointer transition-colors ${
        checked ? 'bg-[#fdf0f3] border-[#E8649A]' : 'bg-white border-[#E5E7EB] hover:border-[#E8649A]'
      }`}
    >
      <input type="radio" name="categoria" checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={`w-4 h-4 mt-0.5 rounded-full border-2 shrink-0 flex items-center justify-center ${
          checked ? 'border-[#E8649A]' : 'border-[#E5E7EB]'
        }`}
      >
        {checked && <span className="w-2 h-2 rounded-full bg-[#E8649A]" />}
      </span>
      <span className="flex flex-col">
        {/* O detalhe fica inline, na mesma linha do rótulo, e só quebra se faltar largura. */}
        <span className="text-sm font-semibold text-[#0D0C0D] leading-snug">
          {label}
          {detalhe && <span className="text-xs font-medium text-[#666666]"> {detalhe}</span>}
        </span>
        {valor && (
          <span className={`text-xs font-semibold mt-1 ${checked ? 'text-[#E8649A]' : 'text-[#666666]'}`}>
            primeiro pedido a partir de {valor}
          </span>
        )}
      </span>
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
  const [redirecting, setRedirecting] = useState(false)
  const formBoxRef = useRef<HTMLDivElement>(null)

  const whatsappUrl = `${CARE.whatsapp}?text=${encodeURIComponent(CARE.whatsappMsg)}`

  // Leads abaixo do mínimo veem a confirmação por alguns segundos e só então seguem pro
  // WhatsApp. Usamos assign() em vez de href = ... porque é chamada de método, não
  // atribuição em objeto global (o lint do React Compiler barra a atribuição).
  useEffect(() => {
    if (!redirecting) return
    const id = setTimeout(() => window.location.assign(whatsappUrl), SEGUNDOS_ATE_WHATSAPP * 1000)
    return () => clearTimeout(id)
  }, [redirecting, whatsappUrl])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }))

  // Quem liga "reduzir movimento" no sistema recebe rolagem instantânea, sem animação.
  const scrollBehavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

  // O passo 2 é bem mais alto que os outros. Ao avançar dele para o 3, a página encolhe e a
  // rolagem do usuário acabaria parando na seção seguinte, como se o formulário tivesse
  // sumido. Chamamos isso no clique (e não num efeito) porque o topo da caixa não muda de
  // lugar quando o passo troca: assim a rolagem já sai certa, sem piscar o conteúdo errado.
  const scrollToFormBox = (force = false) => {
    const el = formBoxRef.current
    if (!el) return
    if (!force && el.getBoundingClientRect().top >= 0) return
    el.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
  }

  // Primeiro campo pendente do passo atual, na mesma ordem em que aparecem na tela.
  const firstInvalidId = (): string | null => {
    if (step === 1) {
      if (form.nome.trim() === '') return 'nome'
      if (form.email.trim() !== '' && !isEmailValid(form.email)) return 'email'
      if (!isPhoneValid(form.whatsapp)) return 'whatsapp'
      return null
    }
    if (step === 2) {
      if (form.categoria === '') return 'grupo-categoria'
      if (form.categoria === 'outro' && form.categoriaOutro.trim() === '') return 'categoriaOutro'
      if (form.petshop.trim() === '') return 'petshop'
      if (form.possuiCnpj === '') return 'grupo-cnpj'
      if (form.documento.trim() === '') return 'documento'
      if (form.cidade.trim() === '') return 'cidade'
      return null
    }
    return null
  }

  // Sem isso, quem está lá embaixo no botão clica em "Próxima etapa" e não vê nada
  // acontecer: a mensagem de erro aparece num campo acima, fora da tela.
  const scrollToFirstError = () => {
    const id = firstInvalidId()
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
  }

  const categoriaSel = CATEGORIAS.find((c) => c.value === form.categoria)

  // A faixa do slider depende da categoria, então trocar de categoria zera o slider:
  // sem isso um índice alto de "Outro" apontaria pra um valor errado na faixa padrão.
  const setCategoria = (value: CategoriaValue) =>
    setForm((f) => ({ ...f, categoria: value, investimentoIdx: 0 }))

  const faixas = FAIXAS_POR_CATEGORIA[form.categoria || 'varejo']
  const investimentoIdx = Math.min(form.investimentoIdx, faixas.length - 1)
  const investimentoUltimo = investimentoIdx === faixas.length - 1
  // O último ponto é aberto ("a partir de"), por isso ganha o "+".
  const investimentoLabel = `${fmtBRL(faixas[investimentoIdx])}${investimentoUltimo ? '+' : ''}`
  // Define se o lead entra no CRM ou segue só pro Netlify + WhatsApp.
  const qualificado = faixas[investimentoIdx] >= VALOR_MINIMO_CRM

  const step1Valid = form.nome.trim() !== '' && isPhoneValid(form.whatsapp) && (form.email.trim() === '' || isEmailValid(form.email))
  const step2Valid =
    form.categoria !== '' &&
    (form.categoria !== 'outro' || form.categoriaOutro.trim() !== '') &&
    form.petshop.trim() !== '' &&
    form.possuiCnpj !== '' &&
    form.documento.trim() !== '' &&
    form.cidade.trim() !== ''
  // O passo 3 não tem campo obrigatório: o slider já nasce com um valor selecionado.

  const goNext = () => {
    setAttemptedNext(true)
    if ((step === 1 && !step1Valid) || (step === 2 && !step2Valid)) {
      scrollToFirstError()
      return
    }
    setAttemptedNext(false)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
    scrollToFormBox()
  }
  const goBack = () => {
    setAttemptedNext(false)
    setStep((s) => Math.max(s - 1, 1))
    scrollToFormBox()
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(false)

    const utms = loadUtms()
    const fullUrl = window.location.href

    const sellumPayload = {
      contactName: form.nome,
      companyName: form.petshop,
      email: form.email || undefined,
      phone: form.whatsapp,
      source: 'care',
      cidade: form.cidade,
      categoria: categoriaSel?.label ?? '',
      categoriaOutro: form.categoriaOutro || undefined,
      possuiCnpj: form.possuiCnpj,
      documento: form.documento,
      clienteBubbles: form.clienteBubbles,
      investimentoPretendido: investimentoLabel,
      ...utms,
      full_url: fullUrl,
    }

    // Backup: mesmo lead também vai pro Netlify Forms (painel Netlify > Forms),
    // independente do resultado do envio pra Sellum.
    const netlifyPayload = {
      'form-name': NETLIFY_FORM_NAME,
      nome: form.nome,
      petshop: form.petshop,
      categoria: categoriaSel?.label ?? '',
      categoriaOutro: form.categoriaOutro || '',
      possuiCnpj: form.possuiCnpj,
      documento: form.documento,
      cidade: form.cidade,
      whatsapp: form.whatsapp,
      email: form.email || '',
      clienteBubbles: form.clienteBubbles || '',
      investimentoPretendido: investimentoLabel,
      full_url: fullUrl,
      ...utms,
    }

    // O Netlify recebe TODO lead, qualificado ou não.
    const enviarNetlify = fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(netlifyPayload),
    }).then((res) => {
      if (!res.ok) throw new Error(`Netlify Forms respondeu ${res.status}`)
    })

    // Já o CRM só recebe quem atinge o valor mínimo.
    const enviarSellum = qualificado
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
      console.error('Falha ao enviar lead Bubbles Care pra Sellum:', sellumResult.reason)
    }
    if (netlifyResult.status === 'rejected') {
      console.error('Falha ao salvar lead Bubbles Care no Netlify Forms:', netlifyResult.reason)
    }

    setLoading(false)

    // Com os dois destinos ativos, um que funcione já garante o lead salvo. Quando o lead
    // não vai pro CRM, o Netlify é o único destino, então ele precisa ter dado certo.
    const salvou = qualificado
      ? netlifyResult.status === 'fulfilled' || sellumResult.status === 'fulfilled'
      : netlifyResult.status === 'fulfilled'

    if (!salvou) {
      setError(true)
      return
    }

    trackCareFormSubmit()
    trackCareLead()
    setSubmitted(true)
    if (!qualificado) setRedirecting(true)
    // A confirmação é bem mais curta que o formulário: sem isso a pessoa pode terminar
    // olhando a seção de baixo e achar que o cadastro não foi enviado.
    scrollToFormBox(true)
  }

  const stepTitles = ['Dados de contato', 'Sobre a sua empresa', 'Sua parceria']

  return (
    <section id="cadastro" className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB] scroll-mt-4">
      <div className="max-w-[640px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Pré-venda de lançamento
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-3">
          Quero ser parceiro Bubbles Care
        </h2>
        <p className="text-sm md:text-base text-[#666666] text-center mb-10 max-w-[480px] mx-auto">
          Preencha o cadastro e nossos consultores entram em contato com as condições especiais de pré-venda.
        </p>

        {/* Âncora de rolagem: precisa envolver formulário e confirmação, porque os dois
            trocam de lugar e a caixa muda de altura. */}
        <div ref={formBoxRef} className="scroll-mt-4">
        {submitted ? (
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-8 text-center flex flex-col items-center gap-3">
            <CheckCircle2 size={40} className="text-[#3DB85C]" />
            <h3 className="font-medium text-[#0D0C0D] text-lg">Cadastro recebido!</h3>
            {redirecting ? (
              <>
                <p className="text-sm text-[#666666]">
                  Você está sendo redirecionado para o WhatsApp para falar com um consultor.
                </p>
                {/* Saída manual, caso o redirecionamento automático não aconteça. */}
                <a
                  href={whatsappUrl}
                  className="text-xs font-semibold text-[#3DB85C] underline"
                >
                  Continuar agora
                </a>
              </>
            ) : (
              <p className="text-sm text-[#666666]">
                Nossos consultores vão falar com você em breve pelo WhatsApp ou e-mail informado.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-[#F7F7F7] rounded-2xl p-6 md:p-8 border border-[#E5E7EB]">
            {/* Cabeçalho do passo + barra de progresso */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666666]">
                  Passo {step} de {TOTAL_STEPS}
                </p>
                <h3 className="text-sm font-medium text-[#0D0C0D]">{stepTitles[step - 1]}</h3>
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
                  <div id="grupo-categoria" className="scroll-mt-24">
                    <p className={labelClass}>Como sua empresa se identifica? *</p>
                    <div className="flex flex-col gap-2">
                      {CATEGORIAS.map((c) => (
                        <CategoriaCard
                          key={c.value}
                          checked={form.categoria === c.value}
                          onChange={() => setCategoria(c.value)}
                          label={c.label}
                          detalhe={c.detalhe || undefined}
                          valor={c.minimo === null ? undefined : fmtBRL(c.minimo)}
                        />
                      ))}
                    </div>
                    {attemptedNext && form.categoria === '' && (
                      <p className="text-xs text-red-600 mt-1">Selecione uma opção.</p>
                    )}
                  </div>

                  {form.categoria === 'outro' && (
                    <div>
                      <label htmlFor="categoriaOutro" className={labelClass}>Qual? *</label>
                      <input
                        id="categoriaOutro" type="text" value={form.categoriaOutro}
                        onChange={(e) => set('categoriaOutro', e.target.value)}
                        className={inputClass}
                      />
                      {attemptedNext && form.categoriaOutro.trim() === '' && (
                        <p className="text-xs text-red-600 mt-1">Conte pra gente qual é o seu segmento.</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label htmlFor="petshop" className={labelClass}>Nome da empresa *</label>
                    <input
                      id="petshop" type="text" value={form.petshop}
                      onChange={(e) => set('petshop', e.target.value)}
                      className={inputClass}
                    />
                    {attemptedNext && form.petshop.trim() === '' && (
                      <p className="text-xs text-red-600 mt-1">Preencha o nome da empresa.</p>
                    )}
                  </div>

                  <div id="grupo-cnpj" className="scroll-mt-24">
                    <p className={labelClass}>Possui CNPJ ativo? *</p>
                    <div className="flex gap-3">
                      <RadioPill name="possuiCnpj" value="sim" checked={form.possuiCnpj === 'sim'} onChange={() => set('possuiCnpj', 'sim')}>Sim</RadioPill>
                      <RadioPill name="possuiCnpj" value="nao" checked={form.possuiCnpj === 'nao'} onChange={() => set('possuiCnpj', 'nao')}>Não</RadioPill>
                    </div>
                    {attemptedNext && form.possuiCnpj === '' && (
                      <p className="text-xs text-red-600 mt-1">Selecione uma opção.</p>
                    )}
                  </div>

                  {form.possuiCnpj !== '' && (
                    <div>
                      <label htmlFor="documento" className={labelClass}>
                        {form.possuiCnpj === 'sim' ? 'CNPJ *' : 'CPF *'}
                      </label>
                      <input
                        id="documento" type="text" inputMode="numeric"
                        placeholder={form.possuiCnpj === 'sim' ? '00.000.000/0000-00' : '000.000.000-00'}
                        value={form.documento}
                        onChange={(e) => set('documento', formatDoc(e.target.value))}
                        className={inputClass}
                      />
                      {attemptedNext && form.documento.trim() === '' && (
                        <p className="text-xs text-red-600 mt-1">Preencha o documento.</p>
                      )}
                    </div>
                  )}

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
                    <p className={labelClass}>Já é parceiro Bubbles?</p>
                    <div className="flex gap-3">
                      <RadioPill name="clienteBubbles" value="sim" checked={form.clienteBubbles === 'sim'} onChange={() => set('clienteBubbles', 'sim')}>Sim</RadioPill>
                      <RadioPill name="clienteBubbles" value="nao" checked={form.clienteBubbles === 'nao'} onChange={() => set('clienteBubbles', 'nao')}>Não</RadioPill>
                    </div>
                  </div>

                  <div id="grupo-investimento" className="scroll-mt-24">
                    <label htmlFor="investimento" className={labelClass}>
                      Quanto você pretende investir no primeiro pedido?
                    </label>

                    <div className="bg-white border border-[#E5E7EB] rounded-[10px] px-4 pt-4 pb-3">
                      <p className="text-2xl font-medium text-[#E8649A] text-center mb-3 tabular-nums">
                        {investimentoLabel}
                      </p>
                      <input
                        id="investimento"
                        type="range"
                        min={0}
                        max={faixas.length - 1}
                        step={1}
                        value={investimentoIdx}
                        onChange={(e) => set('investimentoIdx', Number(e.target.value))}
                        className="w-full accent-[#E8649A]"
                      />
                      {/* Marcadores posicionados por porcentagem (e não com justify-between)
                          pra cada tracinho cair debaixo da bolinha. A margem lateral
                          compensa metade da bolinha, que é onde o curso dela começa e
                          termina de verdade. */}
                      <div className="relative h-6 mx-2">
                        {faixas.map((valor, i) => {
                          const ativo = i === investimentoIdx
                          return (
                            <span
                              key={valor}
                              className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                              style={{ left: `${(i / (faixas.length - 1)) * 100}%` }}
                            >
                              <span className={`w-px h-1.5 ${ativo ? 'bg-[#E8649A]' : 'bg-[#E5E7EB]'}`} />
                              <span
                                className={`mt-1 text-[10px] font-semibold tabular-nums ${
                                  ativo ? 'text-[#E8649A]' : 'text-[#666666]'
                                }`}
                              >
                                {fmtCompacto(valor)}{i === faixas.length - 1 ? '+' : ''}
                              </span>
                            </span>
                          )
                        })}
                      </div>
                    </div>
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
                  className="flex items-center gap-1 bg-white border border-[#E5E7EB] text-[#0D0C0D] font-semibold text-sm px-5 py-3 rounded-[10px] hover:bg-[#F7F7F7] active:scale-95 transition-all duration-200"
                >
                  <ChevronLeft size={16} /> Voltar
                </button>
              )}

              {step < TOTAL_STEPS && (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 flex items-center justify-center gap-1 bg-[#E8649A] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md"
                >
                  Próxima etapa <ChevronRight size={16} />
                </button>
              )}

              {step === TOTAL_STEPS && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-[#3DB85C] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md disabled:opacity-60"
                >
                  {loading ? 'Enviando...' : 'Enviar cadastro →'}
                </button>
              )}
            </div>

            <p className="text-[10px] text-[#666666] text-center mt-4">
              Ao enviar, você concorda em ser contatado pela equipe Bubbles.
            </p>
          </div>
        )}
        </div>
      </div>
    </section>
  )
}
