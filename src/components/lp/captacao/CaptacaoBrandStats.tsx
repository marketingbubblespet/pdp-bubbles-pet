'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Star, Users, Heart, Package, type LucideIcon } from 'lucide-react'
import { CAPTACAO_BRAND_STATS } from '@/lib/captacao'

const ICONS: Record<string, LucideIcon> = { Clock, Star, Users, Heart, Package }

export function CaptacaoBrandStats() {
  return (
    <section id="quem-somos" className="relative py-16 md:py-20 px-6 md:px-10 overflow-hidden flex items-center min-h-[60vh]">
      <Image
        src="/images/distribuidores/bubbles-estoque-expedicao-desktop.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover z-0"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="max-w-7xl mx-auto relative z-20 w-full">
        <div className="text-center mb-8">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#F4CDD4] text-[8px] font-black uppercase tracking-[0.4em] mb-2 block">
            Nossa Essência
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            Quem é a <span className="text-[#F4CDD4]">Bubbles?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto text-center">
            <div className="space-y-3 text-white/90 text-sm md:text-base leading-relaxed font-medium">
              <p>
                A Bubbles nasceu da vontade de transformar a experiência de banho e tosa em algo mais profissional,
                sensorial e consciente, tanto para o groomer quanto para o pet.
              </p>
              <p>
                Com <span className="text-[#F4CDD4] font-black">mais de 7 anos de história</span>, elevamos o padrão
                do mercado, transformando cada atendimento em uma experiência memorável.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {CAPTACAO_BRAND_STATS.map((stat, i) => {
            const Icon = ICONS[stat.icon]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-[16px] text-center shadow-2xl hover:bg-white/10 hover:border-[#F4CDD4]/30 transition-all duration-500 group"
              >
                <div className="w-8 h-8 bg-[#F4CDD4]/10 rounded-[10px] flex items-center justify-center mx-auto mb-2 group-hover:bg-[#F4CDD4] transition-all duration-500">
                  <Icon size={16} className="text-[#F4CDD4] group-hover:text-[#0F0C0D] transition-colors duration-500" />
                </div>
                <p className="text-lg font-black text-white mb-0.5 tracking-tight">{stat.val}</p>
                <p className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-widest mb-0.5">{stat.label}</p>
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-tighter">{stat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
