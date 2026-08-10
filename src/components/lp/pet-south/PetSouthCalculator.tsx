'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

// Simulador de retorno: investimento ajustável via slider, markup fixo de 80%.
export function PetSouthCalculator() {
  const [investment, setInvestment] = useState(10000)
  const paybackMonths = '2-3'

  const revenue = Math.round(investment * 1.8)
  const profit = revenue - investment

  return (
    <section id="calculadora" className="py-12 md:py-20 px-6 md:px-10 bg-[#080808] relative overflow-hidden border-y border-[#F4CDD4]/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-2 md:mb-3 block">
            Simulador de Negócio
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight uppercase">
            O Retorno <br className="block md:hidden" />
            Que o seu <br className="block md:hidden" />
            <span className="text-[#F4CDD4]">Capital Merece.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-4 md:gap-8 items-stretch">
          <div className="lg:col-span-3 order-1 lg:order-2 bg-gradient-to-br from-[#1A1A1A] to-[#080808] border border-[#F4CDD4]/20 p-6 md:p-12 rounded-[24px] md:rounded-[32px] shadow-2xl relative group flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp size={60} className="md:w-[100px] md:h-[100px] text-[#F4CDD4]" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-10 relative z-10">
              <div>
                <p className="text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Faturamento (1º Ciclo)</p>
                <p className="text-xl md:text-3xl font-black text-white tracking-tighter">R$ {revenue.toLocaleString('pt-BR')}</p>
              </div>

              <div>
                <p className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Potencial de Ganho de até</p>
                <p className="text-xl md:text-3xl font-black text-[#F4CDD4] tracking-tighter drop-shadow-[0_0_15px_rgba(244,205,212,0.3)]">R$ {profit.toLocaleString('pt-BR')}</p>
              </div>
            </div>

            <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white/10">
              <p className="text-white/40 text-[8px] md:text-[10px] italic leading-relaxed">
                *Cálculo baseado no markup médio de 80% praticado. O giro de estoque ocorre em ciclos de 45 a 60 dias. Esses dados podem variar de acordo com região, logística e processos do distribuidor.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 order-2 lg:order-1 bg-[#121212] border border-white/5 p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-xl flex flex-col justify-center space-y-4 md:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <span className="text-white/60 font-bold text-[9px] md:text-[10px] uppercase tracking-widest">Investimento</span>
                <span className="text-[#F4CDD4] text-lg md:text-2xl font-black">R$ {investment.toLocaleString('pt-BR')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={investment}
                onChange={(e) => setInvestment(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#F4CDD4] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 md:[&::-webkit-slider-thumb]:w-6 md:[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#F4CDD4] [&::-webkit-slider-thumb]:rounded-full"
              />
              <div className="flex justify-between text-[7px] md:text-[8px] text-white/40 mt-2 md:mt-3 font-bold uppercase tracking-widest">
                <span className="text-[#F4CDD4]">Mínimo R$ 10k</span>
                <span>Escala</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="bg-white/5 p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                <p className="text-white/40 text-[6px] md:text-[8px] font-black uppercase tracking-widest mb-0.5 md:mb-1">Markup Médio</p>
                <p className="text-xs md:text-base font-black text-white">80% MKP</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white/5 p-2 md:p-4 rounded-xl md:rounded-2xl border border-[#F4CDD4]/20"
              >
                <p className="text-white/40 text-[6px] md:text-[8px] font-black uppercase tracking-widest mb-0.5 md:mb-1">Payback</p>
                <p className="text-xs md:text-base font-black text-white">{paybackMonths} Meses</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
