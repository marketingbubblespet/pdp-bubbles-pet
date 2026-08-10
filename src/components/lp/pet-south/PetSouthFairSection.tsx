'use client'
import { CheckCircle, Sparkles, Calendar } from 'lucide-react'
import { openPetSouthForm } from './formBus'
import { PET_SOUTH_FAIR_STATS, PET_SOUTH_FAIR_BULLETS } from '@/lib/pet-south'

// Bloco "ecossistema da feira": explicação à esquerda, estatísticas à direita.
export function PetSouthFairSection() {
  return (
    <section className="py-16 md:py-20 bg-[#FDF2F4] text-[#080808] border-b border-[#F4CDD4]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[#080808] font-black text-[10px] uppercase tracking-[0.2em] bg-[#F4CDD4] px-3 py-1 rounded-full inline-block border border-[#080808]/10">
              O Ecossistema da Maior Feira do Setor
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#080808] uppercase leading-tight">
              A PET South America é o Epicentro dos Negócios Pet na América Latina
            </h2>
            <p className="text-[#080808]/80 text-sm md:text-base leading-relaxed font-medium">
              Sendo o maior ponto de encontro de negócios e tendências da indústria pet da América Latina, a feira é a oportunidade perfeita para distribuidores ampliarem seu portfólio com marcas de alta performance como a Bubbles®, contando com duas linhas profissionais completas, banhos sensoriais, coloração e suporte direto de fábrica.
            </p>

            <div className="space-y-3 pt-2">
              {PET_SOUTH_FAIR_BULLETS.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#BE185D] shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-[#080808]/90">
                    <strong className="text-[#080808] font-black">{b.title}</strong> {b.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 bg-[#080808] text-white rounded-2xl border-2 border-[#BE185D] shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-[#F4CDD4]">
                <Sparkles size={18} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Exclusivo na PET South America</span>
              </div>
              <h3 className="text-base font-black text-white uppercase">
                Agende sua Reunião e Garanta Condições Especiais na Feira!
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">
                Negocie diretamente no estande Bubbles® com a diretoria comercial. Condições exclusivas de parcelamento, bonificação de estoque inicial e prioridade de entrega para{' '}
                <strong className="text-[#F4CDD4]">distribuidores e lojistas</strong> que agendarem a reunião com antecedência.
              </p>
              <button
                type="button"
                onClick={openPetSouthForm}
                className="w-full sm:w-auto bg-[#F4CDD4] text-[#080808] px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar size={15} />
                <span>Agendar Reunião no Estande</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {PET_SOUTH_FAIR_STATS.map((s) => (
              <div key={s.label} className="p-6 bg-white border border-[#F4CDD4] rounded-3xl shadow-sm text-center space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#BE185D]">{s.value}</div>
                <div className="text-xs font-black text-[#080808] uppercase tracking-wider">{s.label}</div>
                <p className="text-[10px] text-[#080808]/60 font-medium">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
