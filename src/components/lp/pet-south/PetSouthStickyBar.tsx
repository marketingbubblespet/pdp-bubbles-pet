'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PetSouthLogo } from './PetSouthLogo'
import { openPetSouthForm } from './formBus'

// Barra fixa que aparece quando o botão principal do Hero (#pet-south-hero-cta) sai da tela.
export function PetSouthStickyBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById('pet-south-hero-cta')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full z-50 bg-[#080808]/90 backdrop-blur-md border-t border-[#F4CDD4]/20 py-3 md:py-4 px-4 md:px-6 flex items-center justify-between shadow-[0_-5px_20px_rgba(244,205,212,0.15)]"
        >
          <div className="flex items-center gap-3">
            <PetSouthLogo />
            <p className="text-white text-[10px] md:text-xs font-bold hidden lg:block opacity-80">
              Atendimento Especial <span className="text-[#F4CDD4]">PET South America</span>. Lançamento da{' '}
              <strong className="text-white">Linha Care</strong> & Condições Especiais na Feira.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={openPetSouthForm}
            className="bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4] text-[#080808] px-5 md:px-8 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(244,205,212,0.3)] transition-all shrink-0 text-center"
          >
            AGENDAR REUNIÃO NA FEIRA
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
