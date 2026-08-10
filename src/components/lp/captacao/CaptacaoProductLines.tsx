'use client'
import { motion } from 'framer-motion'
import { Eye, Droplets } from 'lucide-react'
import { CAPTACAO_PRODUCT_LINES } from '@/lib/captacao'

export function CaptacaoProductLines() {
  return (
    <section id="linhas" className="py-20 px-6 md:px-10 bg-[#0F0C0D] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Nosso Mix</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase break-words">
            Uma Linha para cada <br className="block md:hidden" />
            <span className="text-[#F4CDD4]">Perfil de Cliente</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Do groomer de elite ao pet shop em expansão, a Bubbles oferece soluções que combinam alta performance
            técnica com rentabilidade imbatível.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CAPTACAO_PRODUCT_LINES.map((line, i) => (
            <motion.div
              key={line.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, borderColor: `${line.accent}44`, backgroundColor: `${line.accent}05` }}
              className="bg-[#1A1A1A] border border-white/5 border-t-4 p-8 rounded-[32px] flex flex-col h-full group transition-all duration-500 relative overflow-hidden"
              style={{ borderTopColor: line.accent }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: line.accent }}
              />

              <div className="mb-6">
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-4 inline-block"
                  style={{ borderColor: `${line.accent}33`, color: line.accent, backgroundColor: `${line.accent}11` }}
                >
                  {line.target}
                </span>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">Linha {line.name}</h3>
                <p className="text-white/50 text-xs leading-relaxed font-medium">{line.pos}</p>
              </div>

              <div className="space-y-5 mb-10 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <Eye size={14} style={{ color: line.accent }} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-0.5">Visual</p>
                    <p className="text-white/80 text-[11px] leading-tight font-medium">{line.visual}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <Droplets size={14} style={{ color: line.accent }} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-0.5">{line.highlightLabel}</p>
                    <p className="text-white/80 text-[11px] leading-tight font-medium">{line.highlightValue}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: line.accent }} />
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Manifesto</p>
                </div>
                <p className="text-white font-black italic text-xs leading-tight tracking-tight">&ldquo;{line.quote}&rdquo;</p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: line.accent }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
