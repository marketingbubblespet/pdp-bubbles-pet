'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle2 } from 'lucide-react'
import { CAPTACAO_TESTIMONIALS } from '@/lib/captacao'
import { CaptacaoCarousel, useAutoScroll } from './CaptacaoCarousel'

export function CaptacaoTestimonials() {
  const trilhoRef = useRef<HTMLDivElement>(null)
  const [ativo, setAtivo] = useState(0)
  useAutoScroll(trilhoRef, { disableOnMobile: true })

  // Card mais próximo do centro do trilho fica em destaque (os outros, meio apagados).
  const aoRolar = () => {
    const el = trilhoRef.current
    if (!el) return
    const centro = el.scrollLeft + el.clientWidth / 2
    let melhor = 0
    let menor = Infinity
    Array.from(el.children).forEach((filho, i) => {
      const c = filho as HTMLElement
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centro)
      if (d < menor) { menor = d; melhor = i }
    })
    setAtivo(melhor)
  }

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 bg-[#0F0C0D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Vozes do Sucesso</span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tight uppercase break-words">
            Mais de 50 distribuidores em todo o Brasil confiam na Bubbles. Veja o que eles dizem:
          </h2>
        </div>

        <CaptacaoCarousel carouselRef={trilhoRef} showOnDesktop showGradient>
          <div
            ref={trilhoRef}
            onScroll={aoRolar}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0 items-stretch"
          >
            {CAPTACAO_TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl hover:border-[#F4CDD4]/30 transition-all duration-500 group min-w-[80%] md:min-w-[40%] snap-center flex flex-col justify-between relative h-full ${i === ativo ? 'opacity-100' : 'opacity-50'}`}
              >
                <div className="absolute top-4 right-6 text-[#F4CDD4]/10 group-hover:text-[#F4CDD4]/20 transition-colors">
                  <span className="text-6xl font-serif">&quot;</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star key={starIdx} size={10} className="fill-[#F4CDD4] text-[#F4CDD4]" />
                    ))}
                  </div>
                  <p className="text-white/60 text-[10px] md:text-xs italic mb-6 leading-relaxed relative z-10">&quot;{testimonial.text}&quot;</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <p className="text-white font-black text-xs md:text-sm tracking-tight">{testimonial.name}</p>
                  <span className="text-[#3DB85C] text-[8px] font-bold uppercase tracking-widest bg-[#3DB85C]/10 px-2 py-0.5 rounded-full border border-[#3DB85C]/20 flex items-center gap-1 w-fit">
                    <CheckCircle2 size={8} /> Verificado
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CaptacaoCarousel>
      </div>
    </section>
  )
}
