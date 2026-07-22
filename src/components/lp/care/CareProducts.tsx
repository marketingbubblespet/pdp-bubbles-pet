'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CARE_CATEGORIES, CARE_PRODUCTS, type CareCategoryId } from '@/lib/care'

export function CareProducts() {
  const [active, setActive] = useState<CareCategoryId>(CARE_CATEGORIES[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const updateIndicator = () => {
      const el = tabRefs.current[active]
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [active])

  const items = CARE_PRODUCTS.filter((p) => p.categoria === active)

  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB] overflow-hidden">
      <style>{`
        @keyframes care-product-in {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .care-product-enter { animation: care-product-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          A linha completa
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-4">
          11 produtos prontos para girar na sua prateleira.
        </h2>
        <p className="text-sm md:text-base text-[#6B7280] text-center mb-10 max-w-[640px] mx-auto">
          Escolha uma categoria e veja o que já pode estar na sua prateleira.
        </p>

        {/* Abas com indicador deslizante */}
        <div className="relative flex gap-1 overflow-x-auto mb-10 pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
          <div
            className="absolute top-0 h-full bg-[#E8649A] rounded-full transition-all duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
          {CARE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              ref={(el) => { tabRefs.current[cat.id] = el }}
              onClick={() => setActive(cat.id)}
              className={`relative z-10 whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-colors duration-300 ${
                active === cat.id ? 'text-white' : 'text-[#0F0C0D] hover:bg-[#fdf0f3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid com fade/stagger a cada troca de aba (key força remontagem = nova animação) */}
        <div key={active} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((p, i) => (
            <div
              key={p.id}
              className="care-product-enter group flex flex-col"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="relative aspect-square rounded-[10px] overflow-hidden bg-[#fdf0f3] mb-3">
                <Image
                  src={p.imagem}
                  alt={p.nome}
                  fill
                  sizes="(max-width: 767px) 45vw, 260px"
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h4 className="font-extrabold text-[#0F0C0D] text-sm leading-snug">{p.nome}</h4>
              <p className="text-[11px] text-[#9ca3af] mb-1">{p.apresentacao}</p>
              <p className="text-xs text-[#6B7280] leading-snug">{p.descricao}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="#cadastro"
            className="inline-block bg-[#3DB85C] text-white font-bold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-md"
          >
            Quero revender essa linha →
          </a>
        </div>
      </div>
    </section>
  )
}
