'use client'
import { useState } from 'react'
import { LIVE_FAQ } from '@/lib/live-tosador'

export function LiveFaq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">Perguntas frequentes</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">Ainda ficou com dúvida?</h2>
        <div className="flex flex-col gap-3">
          {LIVE_FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border border-[#E5E7EB] rounded-[10px] overflow-hidden bg-white">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-semibold text-[#0F0C0D] text-sm md:text-base">{item.q}</span>
                  <span className={`text-[#E8649A] text-xl shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                {isOpen && <div className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed">{item.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
