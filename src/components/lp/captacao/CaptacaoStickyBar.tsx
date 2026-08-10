'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function CaptacaoStickyBar({
  onOpenForm,
  heroButtonRef,
}: {
  onOpenForm: () => void
  heroButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (heroButtonRef.current) {
        const rect = heroButtonRef.current.getBoundingClientRect()
        setIsVisible(rect.bottom < 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [heroButtonRef])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full z-50 bg-[#0F0C0D]/80 backdrop-blur-sm border-t border-white/10 py-4 px-6 flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center gap-4">
            <Image src="/images/bubbles-logo.svg" alt="Bubbles" width={110} height={30} className="h-6 md:h-8 w-auto brightness-0 invert" />
            <p className="text-white text-[10px] font-bold hidden md:block opacity-60">
              Vagas limitadas por região. <span className="text-[#F4CDD4]">Garanta seu território.</span>
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(244,205,212,0.4)', y: -1 }}
            whileTap={{ scale: 0.98 }}
            animate={{ y: [0, -2, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            onClick={onOpenForm}
            className="bg-[#F4CDD4] text-[#0F0C0D] px-6 md:px-10 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(244,205,212,0.2)] transition-all shrink-0 max-w-[140px] md:max-w-none text-center leading-tight"
          >
            Quero ser um distribuidor
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
