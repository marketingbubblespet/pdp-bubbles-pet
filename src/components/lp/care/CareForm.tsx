'use client'
import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { loadUtms } from '@/lib/utm'
import { trackCareLead } from './trackCare'

const SELLUM_WEBHOOK_URL = 'https://api-admin.sellum.app/v1/public/crm/webhooks/captacao-237b5035c0'
const SELLUM_TOKEN = 'crm_15eb27da51aa452be74dfe4512570c8a7e16acd25f9600a0'

// Codifica um objeto como application/x-www-form-urlencoded, formato que o Netlify Forms espera
function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export function CareForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const formData = new FormData(e.currentTarget)
    const lead = Object.fromEntries(formData.entries()) as Record<string, string>
    const utms = loadUtms()
    const fullUrl = window.location.href

    const sellumPayload = {
      contactName: `(care) ${lead.nome}`,
      companyName: lead.petshop,
      email: lead.email || undefined,
      phone: lead.whatsapp,
      source: 'care',
      cidade: lead.cidade,
      banhosMes: lead.banhosMes,
      clienteBubbles: lead.clienteBubbles,
      ...utms,
      full_url: fullUrl,
    }

    // Backup: mesmo lead também vai pro Netlify Forms (painel Netlify > Forms),
    // independente do resultado do envio pra Sellum.
    const netlifyPayload = {
      'form-name': 'care-lead',
      nome: lead.nome,
      petshop: lead.petshop,
      cidade: lead.cidade,
      whatsapp: lead.whatsapp,
      email: lead.email || '',
      banhosMes: lead.banhosMes || '',
      clienteBubbles: lead.clienteBubbles || '',
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

    trackCareLead()
    setSubmitted(true)
  }

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
          <form
            onSubmit={handleSubmit}
            name="care-lead"
            className="bg-[#F7F7F7] rounded-2xl p-6 md:p-8 border border-[#E5E7EB] flex flex-col gap-4"
          >
            <input type="hidden" name="form-name" value="care-lead" />

            <div>
              <label htmlFor="nome" className="block text-xs font-bold text-[#0F0C0D] mb-1.5">
                Nome completo *
              </label>
              <input
                id="nome" name="nome" type="text" required
                className="w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0F0C0D] focus:outline-none focus:border-[#E8649A]"
              />
            </div>

            <div>
              <label htmlFor="petshop" className="block text-xs font-bold text-[#0F0C0D] mb-1.5">
                Nome do petshop *
              </label>
              <input
                id="petshop" name="petshop" type="text" required
                className="w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0F0C0D] focus:outline-none focus:border-[#E8649A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cidade" className="block text-xs font-bold text-[#0F0C0D] mb-1.5">
                  Cidade / Estado *
                </label>
                <input
                  id="cidade" name="cidade" type="text" required
                  className="w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0F0C0D] focus:outline-none focus:border-[#E8649A]"
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-xs font-bold text-[#0F0C0D] mb-1.5">
                  WhatsApp *
                </label>
                <input
                  id="whatsapp" name="whatsapp" type="tel" required placeholder="(00) 00000-0000"
                  className="w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0F0C0D] focus:outline-none focus:border-[#E8649A]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#0F0C0D] mb-1.5">
                E-mail
              </label>
              <input
                id="email" name="email" type="email"
                className="w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0F0C0D] focus:outline-none focus:border-[#E8649A]"
              />
            </div>

            <div>
              <label htmlFor="banhosMes" className="block text-xs font-bold text-[#0F0C0D] mb-1.5">
                Quantos banhos você faz por mês?
              </label>
              <select
                id="banhosMes" name="banhosMes" defaultValue=""
                className="w-full bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-2.5 text-sm text-[#0F0C0D] focus:outline-none focus:border-[#E8649A]"
              >
                <option value="" disabled>Selecione uma faixa</option>
                <option value="ate-50">Até 50 banhos</option>
                <option value="51-150">51 a 150 banhos</option>
                <option value="151-300">151 a 300 banhos</option>
                <option value="mais-300">Mais de 300 banhos</option>
              </select>
            </div>

            <fieldset>
              <legend className="block text-xs font-bold text-[#0F0C0D] mb-1.5">
                Já é cliente Bubbles?
              </legend>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                  <input type="radio" name="clienteBubbles" value="sim" className="accent-[#E8649A]" />
                  Sim
                </label>
                <label className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                  <input type="radio" name="clienteBubbles" value="nao" className="accent-[#E8649A]" />
                  Não
                </label>
              </div>
            </fieldset>

            {error && (
              <p className="text-sm text-red-600 text-center">
                Não conseguimos enviar seu cadastro agora. Tente novamente em instantes.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#3DB85C] text-white font-bold text-base px-6 py-3.5 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md disabled:opacity-60"
            >
              {loading ? 'Enviando...' : 'Quero revender no meu petshop →'}
            </button>
            <p className="text-[10px] text-[#9ca3af] text-center">
              Ao enviar, você concorda em ser contatado pela equipe Bubbles.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
