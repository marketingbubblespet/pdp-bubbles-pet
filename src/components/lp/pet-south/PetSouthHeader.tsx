'use client'
import { PetSouthLogo } from './PetSouthLogo'
import { openPetSouthForm } from './formBus'

export function PetSouthHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <PetSouthLogo />
        <button
          type="button"
          onClick={openPetSouthForm}
          className="bg-[#F4CDD4] text-[#080808] px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(244,205,212,0.2)]"
        >
          Agendar Reunião
        </button>
      </div>
    </header>
  )
}
