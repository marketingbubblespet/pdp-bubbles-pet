'use client'
// src/components/lp/ReviewsBlock.tsx
import { useState } from 'react'
import { REVIEWS, PRODUCT } from '@/lib/constants'
import { CtaLink } from '@/components/ui/CtaLink'

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#F4A522" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

const FILTERS = ['Todos', '5 estrelas', '4 estrelas', 'Com foto']

export function ReviewsBlock() {
  const [active, setActive] = useState('Todos')

  return (
    <section className="px-4 py-16 md:py-20 bg-[#fdf0f3]">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-center text-[18px] md:text-[22px] font-bold text-[#0F0C0D] uppercase tracking-wide mb-8">
          Confira o que os groomers estão dizendo
        </h2>

        {/* Rating summary */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-[40px] font-bold text-[#0F0C0D] leading-none">4.9</span>
          <div className="flex flex-col gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <span className="text-[13px] text-[#6B7280]">87 avaliações verificadas</span>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-[13px] border transition-colors ${
                active === f
                  ? 'bg-white border-[#E8649A] text-[#E8649A] font-bold'
                  : 'bg-white border-transparent text-[#6B7280] font-medium hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards de depoimento */}
        <div className="space-y-3 mb-8">
          {REVIEWS.map((r) => (
            <div key={r.name + r.date} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <span className="font-bold text-[#0F0C0D] text-sm">{r.name}</span>
                <span className="text-[12px] text-[#6B7280] shrink-0 ml-2">{r.date}</span>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.stars)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="text-[14px] text-[#0F0C0D] leading-relaxed">&quot;{r.text}&quot;</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <CtaLink
            href={PRODUCT.shopifyUrl}
            className="inline-block bg-[#3DB85C] text-white font-bold text-base px-6 py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150 text-center"
          >
            COMPRE AGORA →
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
