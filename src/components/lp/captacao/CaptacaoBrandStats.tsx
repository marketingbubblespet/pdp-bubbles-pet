'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CaptacaoCarousel, useAutoScroll } from './CaptacaoCarousel'
import { Clock, Star, Users, Heart, Package, type LucideIcon } from 'lucide-react'
import { CAPTACAO_BRAND_STATS, CAPTACAO_VIDEO_QUEM_SOMOS } from '@/lib/captacao'

const ICONS: Record<string, LucideIcon> = { Clock, Star, Users, Heart, Package }

export function CaptacaoBrandStats() {
  const trilhoRef = useRef<HTMLDivElement>(null)
  useAutoScroll(trilhoRef)

  // O vídeo (4,3 MB) só começa a baixar quando a seção chega perto da tela, para não
  // disputar a internet com a primeira dobra.
  const secaoRef = useRef<HTMLElement>(null)
  const [carregarVideo, setCarregarVideo] = useState(false)
  useEffect(() => {
    const el = secaoRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCarregarVideo(true); obs.disconnect() }
    }, { rootMargin: '400px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="quem-somos" ref={secaoRef} className="relative py-12 px-10 overflow-hidden flex items-center min-h-[60vh]">
      {/* Vídeo de fundo (Linha PRO), igual à página de referência. Quem tem "reduzir
          movimento" ligado fica só com o fundo escuro, sem o vídeo. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 motion-reduce:hidden"
      >
        {carregarVideo && <source src={CAPTACAO_VIDEO_QUEM_SOMOS} type="video/mp4" />}
      </video>
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="max-w-7xl mx-auto relative z-20 w-full">
        <div className="text-center mb-8">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#F4CDD4] text-[8px] font-black uppercase tracking-[0.4em] mb-2 block">
            Nossa Essência
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            Quem é a <span className="text-[#F4CDD4]">Bubbles®?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto text-center">
            <div className="space-y-3 text-white/90 text-sm md:text-base leading-relaxed font-medium">
              <p>
                A Bubbles® nasceu da vontade de transformar a experiência de banho e tosa em algo mais profissional,
                sensorial e consciente, tanto para o groomer quanto para o pet.
              </p>
              <p>
                Com <span className="text-[#F4CDD4] font-black">mais de 7 anos de história</span>, elevamos o padrão
                do mercado, transformando cada atendimento em uma experiência memorável.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Abaixo do computador vira carrossel sem setas que rola sozinho (igual à referência). */}
        <CaptacaoCarousel carouselRef={trilhoRef} hideArrows>
        <div ref={trilhoRef} className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-10 px-10 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-2">
          {CAPTACAO_BRAND_STATS.map((stat, i) => {
            const Icon = ICONS[stat.icon]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-[16px] text-center shadow-2xl hover:bg-white/10 hover:border-[#F4CDD4]/30 transition-all duration-500 group min-w-[200px] lg:min-w-0 snap-center"
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
        </CaptacaoCarousel>
      </div>
    </section>
  )
}
