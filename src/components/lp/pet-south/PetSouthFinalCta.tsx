'use client'
import { openPetSouthForm } from './formBus'

export function PetSouthFinalCta() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4] text-[#080808] border-y border-[#F4CDD4] text-center px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        <div className="inline-block px-4 py-1.5 bg-[#080808] text-[#F4CDD4] rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
          PET South America 2025/2026
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-[#080808] uppercase tracking-tight">
          Pronto para Expandir seu Negócio com a Bubbles®?
        </h2>
        <p className="text-[#080808]/80 text-sm md:text-base font-medium max-w-xl mx-auto">
          Preencha o formulário e nossa equipe comercial entrará em contato com atendimento prioritário para agendar sua reunião.
        </p>
        <button
          type="button"
          onClick={openPetSouthForm}
          className="bg-[#080808] hover:bg-[#1A1A1A] text-[#F4CDD4] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl hover:scale-105"
        >
          AGENDAR REUNIÃO AGORA
        </button>
      </div>
    </section>
  )
}
