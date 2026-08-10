'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'

export function CaptacaoFinalCta({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="py-8 md:py-12 px-6 md:px-10 bg-[#0F0C0D]">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#1A1A1A] to-[#0F0C0D] border border-white/10 rounded-[40px] md:rounded-[60px] p-10 md:p-24 text-center relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        <div className="relative z-10">
          <span className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 md:mb-6 block">Seu Território Aguarda</span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 tracking-tighter">
            Pronto para ser o <br />
            <span className="text-[#F4CDD4] drop-shadow-[0_0_15px_rgba(244,205,212,0.4)]">Próximo Case de Sucesso?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            As vagas para novos distribuidores são limitadas por região para garantir a exclusividade e
            rentabilidade dos parceiros atuais.
          </p>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(244,205,212,0.4)', y: -1 }}
            whileTap={{ scale: 0.98 }}
            animate={{ y: [0, -2, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            onClick={onOpenForm}
            className="bg-[#F4CDD4] text-[#0F0C0D] px-10 md:px-20 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-base transition-all flex items-center justify-center gap-3 md:gap-4 mx-auto group w-full sm:w-auto shadow-2xl max-w-[260px] md:max-w-none text-center leading-tight"
          >
            Me tornar um distribuidor agora
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform hidden md:block" />
          </motion.button>

          <p className="mt-8 md:mt-12 text-white/40 text-[8px] md:text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Lock size={12} /> Processo de Seleção 100% Seguro e Confidencial
          </p>
        </div>
      </div>
    </section>
  )
}
