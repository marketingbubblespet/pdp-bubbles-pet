'use client'
import { useState, createElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, HelpCircle, Award, GraduationCap, TrendingUp, type LucideIcon } from 'lucide-react'
import { CAPTACAO_COMMUNITY_ITEMS } from '@/lib/captacao'

const ICONS: Record<string, LucideIcon> = { Instagram: Share2, HelpCircle, Award, GraduationCap, TrendingUp }

export function CaptacaoCommunity() {
  const [active, setActive] = useState(0)
  const item = CAPTACAO_COMMUNITY_ITEMS[active]

  return (
    <section id="comunidade" className="py-20 px-6 md:px-10 bg-[#121212]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Pertencimento e Elite</span>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight uppercase break-words">
          Faça Parte da <br className="block md:hidden" />
          <span className="bg-[#F4CDD4] text-[#0F0C0D] px-2">COMUNIDADE</span> que <br /> Lidera o Futuro do Mercado
          Pet.
        </h2>
        <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
          Ser um distribuidor Bubbles é pertencer a um{' '}
          <span className="bg-[#F4CDD4] text-[#0F0C0D] px-1 py-1 font-bold">ecossistema</span> de elite que dita as
          tendências do setor. Não entregamos apenas galões; entregamos{' '}
          <span className="text-white font-bold">posicionamento e autoridade</span>.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CAPTACAO_COMMUNITY_ITEMS.map((it, i) => (
            <button
              key={it.title}
              type="button"
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                active === i
                  ? 'bg-[#F4CDD4] text-[#0F0C0D] border-[#F4CDD4] shadow-[0_0_20px_rgba(244,205,212,0.3)]'
                  : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
              }`}
            >
              {it.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#1A1A1A] border border-white/10 p-8 md:p-16 rounded-[40px] relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4CDD4]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F4CDD4]/10 rounded-3xl flex items-center justify-center border border-[#F4CDD4]/20 text-[#F4CDD4] shrink-0">
                {createElement(ICONS[item.icon], { size: 48 })}
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">{item.title}</h4>
                <p className="text-white/60 text-sm md:text-lg leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
