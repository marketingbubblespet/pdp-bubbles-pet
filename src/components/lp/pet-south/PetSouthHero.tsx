'use client'
import { Award, ChevronRight, Calculator, Lock, Shield } from 'lucide-react'
import { openPetSouthForm } from './formBus'
import { PetSouthHeroCarousel } from './PetSouthHeroCarousel'

function scrollToCalculator() {
  document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })
}

export function PetSouthHero() {
  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_#F4CDD4_1px,_transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,_#F4CDD4_2px,_transparent_2px)] bg-[size:80px_80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F4CDD4]/25 via-[#F4CDD4]/15 to-transparent border border-[#F4CDD4]/40 text-[#F4CDD4] text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
            <Award size={14} className="text-[#F4CDD4]" />
            <span>O Maior Encontro de Negócios Pet da América Latina</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.15] uppercase">
            Seja o Distribuidor de Cosmética Pet{' '}
            <span className="text-[#F4CDD4] drop-shadow-[0_0_15px_rgba(244,205,212,0.4)]">Mais Desejado</span> na Sua Região.
          </h1>

          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Apresentamos na <strong className="text-white">PET South America</strong> a oportunidade de distribuição comercial com alta rentabilidade, produtos de recorrência comprovada e suporte direto da fábrica para o seu sell-out.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-[#F4CDD4]/15 rounded-xl text-[#F4CDD4]">
                <Shield size={18} />
              </div>
              <div>
                <div className="text-xs font-black text-white">Linha Completa</div>
                <div className="text-[10px] text-white/50">Profissional & Home Care</div>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-[#F4CDD4]/15 rounded-xl text-[#F4CDD4]">
                <Award size={18} />
              </div>
              <div>
                <div className="text-xs font-black text-white">Até 70% Recompra</div>
                <div className="text-[10px] text-white/50">Alta demanda do mercado</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="pet-south-hero-cta"
              type="button"
              onClick={openPetSouthForm}
              className="bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4] text-[#080808] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_25px_rgba(244,205,212,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>AGENDAR REUNIÃO</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={scrollToCalculator}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator size={16} className="text-[#F4CDD4]" />
              <span>Simular Faturamento</span>
            </button>
          </div>

          <p className="text-[11px] text-white/80 uppercase tracking-wider flex items-center gap-1.5 pt-1 font-medium">
            <Lock size={13} className="text-[#F4CDD4] shrink-0" />
            <span>
              Atendimento prioritário para contatos da{' '}
              <span className="bg-[#F4CDD4] text-[#080808] px-2 py-0.5 rounded font-black tracking-widest shadow-sm">PET SOUTH AMERICA</span>
            </span>
          </p>
        </div>

        <div className="lg:col-span-5 h-[380px] sm:h-[450px]">
          <PetSouthHeroCarousel />
        </div>
      </div>
    </section>
  )
}
