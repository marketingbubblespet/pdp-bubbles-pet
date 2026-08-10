'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { CAPTACAO_HERO_LINES } from '@/lib/captacao'

function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lines = CAPTACAO_HERO_LINES

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timer = setInterval(() => setIndex((prev) => (prev + 1) % lines.length), 4000)
        } else {
          clearInterval(timer)
        }
      },
      { threshold: 0.1 },
    )
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => {
      clearInterval(timer)
      observer.disconnect()
    }
  }, [lines.length])

  const line = lines[index]

  return (
    <div ref={wrapperRef} className="relative w-full h-full group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={line.imgDesktop}
            alt={line.name}
            fill
            sizes="(max-width: 767px) 100vw, 526px"
            className="object-cover rounded-[40px]"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C0D] via-transparent to-transparent opacity-60 rounded-[40px]" />
          <div className="absolute bottom-10 left-10 right-10 z-20">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="inline-block px-3 py-1 bg-[#F4CDD4] text-[#0F0C0D] text-[8px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg">
                Destaque de Mercado
              </div>
              <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg">{line.name}</h3>
              <p className="text-white/90 font-bold text-[10px] uppercase tracking-widest drop-shadow-md">{line.desc}</p>
            </motion.div>
          </div>
          <div className="absolute top-20 left-10 max-w-[200px] z-20 hidden md:block">
            <motion.div
              key={`overlay-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-black/40 backdrop-blur-md border-l-2 border-[#F4CDD4] rounded-r-xl"
            >
              <p className="text-[10px] text-white/80 leading-relaxed italic">{line.overlay}</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-10 right-10 flex gap-2 z-30">
        {lines.map((l, i) => (
          <div key={l.name} className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-[#F4CDD4]' : 'w-2 bg-white/20'}`} />
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={() => setIndex((prev) => (prev - 1 + lines.length) % lines.length)}
          className="w-10 h-10 rounded-full bg-[#0F0C0D]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#F4CDD4] hover:text-[#0F0C0D] transition-colors shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => setIndex((prev) => (prev + 1) % lines.length)}
          className="w-10 h-10 rounded-full bg-[#0F0C0D]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#F4CDD4] hover:text-[#0F0C0D] transition-colors shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export function CaptacaoHero({
  onOpenForm,
  heroButtonRef,
}: {
  onOpenForm: () => void
  heroButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden py-20 md:py-0">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/5 blur-[120px] rounded-full" />
      </div>

      <div className="flex-grow flex items-center px-6 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="mb-4 pt-6 md:pt-8">
              <Image src="/images/bubbles-logo.svg" alt="Bubbles" width={150} height={40} className="h-8 md:h-10 w-auto brightness-0 invert" priority />
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-[1.1] tracking-tighter uppercase text-white">
              Seja um distribuidor Bubbles e domine a sua região com a marca que{' '}
              <span className="text-[#F4CDD4] drop-shadow-[0_0_10px_rgba(244,205,212,0.3)]">define o padrão</span> do
              cosmético pet.
            </h1>

            <p className="text-white/60 text-base md:text-lg mb-6 max-w-xl leading-relaxed">
              Leve inovação, qualidade premium e lucratividade para o seu negócio através da marca que mais cresce no
              setor.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-stretch">
              <motion.button
                ref={heroButtonRef}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(244,205,212,0.6)', y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={{ y: [0, -4, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                onClick={onOpenForm}
                className="bg-[#F4CDD4] text-[#0F0C0D] px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(244,205,212,0.4)] transition-all flex items-center justify-center gap-2 group flex-1 w-full md:w-auto text-center leading-tight"
              >
                Quero ser um distribuidor
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform hidden md:block" />
              </motion.button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex-1">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F0C0D] bg-[#F4CDD4]/30" />
                  ))}
                </div>
                <div className="text-xs">
                  <p className="text-white font-black text-xs">+150 Parceiros</p>
                  <p className="text-white/40 uppercase tracking-[0.2em] font-black text-[8px]">Ativos no Brasil</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] md:h-[480px]"
          >
            <div className="absolute inset-0 bg-[#F4CDD4]/10 blur-[100px] rounded-full -z-10" />
            <div className="h-full border border-white/10 rounded-[40px] p-2 bg-white/5 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <HeroCarousel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
