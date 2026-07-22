'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { CARE_FAQ } from '@/lib/care'

export function CareFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="px-4 py-16 md:py-24 bg-[#F7F7F7]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Perguntas frequentes
        </p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[#0F0C0D] mb-8 md:mb-10 text-center">
          Tudo o que o lojista pergunta antes de revender.
        </h2>

        <div className="divide-y divide-[#E5E7EB] max-w-2xl mx-auto mb-8 md:mb-10">
          {CARE_FAQ.map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-4 md:py-5 text-left transition-colors"
              >
                <span className="font-semibold text-[#0F0C0D] pr-4 text-sm md:text-base">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#6B7280] shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <p className="pb-4 md:pb-5 text-[#6B7280] leading-relaxed text-xs md:text-sm">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="#cadastro"
            className="inline-block bg-[#3DB85C] text-white font-bold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-md"
          >
            Quero revender no meu petshop →
          </a>
        </div>
      </div>
    </section>
  )
}
