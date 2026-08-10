'use client'
import { motion } from 'framer-motion'
import { BarChart3, Zap, Shield, Users, CheckCircle, type LucideIcon } from 'lucide-react'
import { CAPTACAO_PROFITABILITY_ITEMS, CAPTACAO_PROFITABILITY_LIST } from '@/lib/captacao'

const ICONS: Record<string, LucideIcon> = { BarChart3, Zap, Shield, Users }

export function CaptacaoProfitability() {
  return (
    <section id="rentabilidade" className="py-16 md:py-20 px-6 md:px-10 border-t border-white/5 relative z-0 bg-[#0F0C0D]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F4CDD4]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 min-w-0">
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {CAPTACAO_PROFITABILITY_ITEMS.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -10, borderColor: 'rgba(244,205,212,0.6)', boxShadow: '0 0 40px rgba(244,205,212,0.15)' }}
                    className="bg-[#1A1A1A] border border-white/5 p-6 lg:p-8 rounded-3xl transition-all group shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4CDD4]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#F4CDD4]/10 transition-colors" />
                    <Icon size={28} className="text-[#F4CDD4] mb-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(244,205,212,0.3)]" />
                    <h4 className="text-base font-black text-white mb-2 tracking-tight uppercase">{item.title}</h4>
                    <p className="text-white/40 text-[11px] leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
          <div className="order-1 lg:order-2 min-w-0">
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Ganhos Exponenciais</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight uppercase break-words">
              Segurança de Margem <br className="block md:hidden" />e <br className="hidden md:block" />
              <span className="text-[#F4CDD4]">Rentabilidade Real.</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
              Nossa Linha PRO oferece diluição de até 1:10, garantindo o menor custo por banho do mercado. Para o
              distribuidor, isso se traduz em <span className="text-white font-bold">lucratividade competitiva com margens de até 45%</span> e recompra
              garantida.
            </p>
            <ul className="space-y-3 md:space-y-4">
              {CAPTACAO_PROFITABILITY_LIST.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 font-bold text-sm">
                  <CheckCircle size={16} className="text-[#F4CDD4] shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
