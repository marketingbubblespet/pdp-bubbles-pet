'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PET_SOUTH_HERO_LINES } from '@/lib/pet-south'

// Carrossel automático das linhas de produto em destaque, dentro do Hero.
export function PetSouthHeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PET_SOUTH_HERO_LINES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const line = PET_SOUTH_HERO_LINES[index]

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[32px] border border-[#F4CDD4]/20 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={line.imgDesktop}
            alt={line.name}
            fill
            sizes="(max-width: 1023px) 100vw, 520px"
            className="object-cover hidden md:block"
            priority={index === 0}
          />
          <Image
            src={line.imgMobile}
            alt={line.name}
            fill
            sizes="(max-width: 1023px) 100vw, 520px"
            className="object-cover md:hidden"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30" />

          <div className="absolute bottom-6 left-6 right-6 z-20">
            <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="inline-block px-3 py-1 bg-[#F4CDD4] text-[#080808] text-[9px] font-black uppercase tracking-widest rounded-full mb-2 shadow-lg">
                Destaque PET South America
              </div>
              <h3 className="text-xl font-black text-white mb-1 drop-shadow-md">{line.name}</h3>
              <p className="text-white/80 font-semibold text-xs drop-shadow-sm">{line.desc}</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-6 right-6 flex gap-1.5 z-30">
        {PET_SOUTH_HERO_LINES.map((l, i) => (
          <div
            key={l.name}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-[#F4CDD4]' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}
