'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, X } from 'lucide-react'

const FIVE_MINUTES_MS = 5 * 60 * 1000

export function CaptacaoExitPopup({ onOpenForm }: { onOpenForm: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return
      const lastShown = localStorage.getItem('captacaoLastExitPopupTime')
      const hasSubmitted = localStorage.getItem('captacaoFormSubmitted')
      const now = Date.now()
      if (!hasSubmitted && (!lastShown || now - Number(lastShown) > FIVE_MINUTES_MS)) {
        setIsOpen(true)
        localStorage.setItem('captacaoLastExitPopupTime', now.toString())
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#1A1A1A] border border-[#F4CDD4]/20 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden shadow-[0_0_50px_rgba(244,205,212,0.1)]"
      >
        <div className="absolute top-0 right-0 p-4">
          <button type="button" onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-[#F4CDD4]/10 text-[#F4CDD4] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,205,212,0.2)]">
            <Calculator size={32} />
          </div>
          <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Espere. Não perca essa oportunidade.</h2>
          <p className="text-white/60 mb-8 text-xs">
            O mercado pet está em plena expansão. <span className="text-[#F4CDD4] font-bold">Seja um distribuidor Bubbles</span> e
            garanta exclusividade na sua região antes que outro empreendedor o faça.
          </p>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                onOpenForm()
                setIsOpen(false)
              }}
              className="w-full bg-[#F4CDD4] text-[#0F0C0D] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-colors"
            >
              Quero me candidatar agora
            </button>
            <button type="button" onClick={() => setIsOpen(false)} className="w-full bg-transparent text-white/40 py-2 text-xs font-bold hover:text-white transition-colors">
              Prefiro ignorar esta oportunidade
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
