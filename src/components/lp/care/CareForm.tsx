'use client'
import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { loadUtms } from '@/lib/utm'
import { trackCareLead } from './trackCare'

export function CareForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const lead = Object.fromEntries(formData.entries())
    const utms = loadUtms()

    // TODO [decidir depois]: destino do lead ainda não definido (Netlify Forms, WhatsApp,
    // embed externo ou CRM). Por ora só registramos o evento e mostramos sucesso local.
    // eslint-disable-next-line no-console
    console.log('Lead Bubbles Care (TODO enviar):', { ...lead, ...utms })

    trackCareLead()
    setLoading(false)
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
          <form onSubmit={handleSubmit} className="bg-[#F7F7F7] rounded-2xl p-6 md:p-8 border border-[#E5E7EB] flex flex-col gap-4">
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
