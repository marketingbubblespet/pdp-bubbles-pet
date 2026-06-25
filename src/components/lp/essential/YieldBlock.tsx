'use client'
// src/components/lp/YieldBlock.tsx
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Package, Droplets, PawPrint, DollarSign } from 'lucide-react'
import { PRODUCT } from '@/lib/constants'
import { CtaLink } from '@/components/ui/CtaLink'

const stats = [
  { icon: Package,    value: '5L',         unit: 'concentrado', label: '1 galão cheio' },
  { icon: Droplets,   value: '30L',        unit: 'prontos',     label: 'Diluição 1:5' },
  { icon: PawPrint,   value: '~300',       unit: 'banhos',      label: 'Porte pequeno' },
  { icon: DollarSign, value: 'R$ 0,73',    unit: '/banho',      label: 'Custo real' },
]

export function YieldBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="px-4 py-16 md:py-24 bg-white overflow-hidden">
      <div ref={ref} className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Coluna esquerda: texto + stats */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
              A matemática do seu negócio
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#0F0C0D] mb-4">
              1 galão. 30 litros. ~300 banhos.
            </h2>
            <p className="text-[#6B7280] font-medium leading-relaxed mb-8 text-sm md:text-base">
              Enquanto outros produtos acabam rápido, o Essential 5L trabalha por você, com custo por banho que não pesa no caixa.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              {stats.map(({ icon: Icon, value, unit, label }, i) => (
                <div
                  key={label}
                  className="bg-[#fdf2f4] border border-[#F4CDD4] rounded-[10px] p-4 flex flex-col transition-all duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(24px)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <Icon size={20} className="text-[#E8649A] mb-2" />
                  <div className="flex items-baseline gap-1">
                    <span className="font-extrabold text-[#0F0C0D] text-xl md:text-2xl leading-none">{value}</span>
                    <span className="text-[#6B7280] text-xs">{unit}</span>
                  </div>
                  <span className="text-xs text-[#6B7280] mt-1">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-[#9ca3af] mb-8">
              * Baseado em 100ml/banho porte pequeno. Varia conforme porte e aplicação.
            </p>

            <CtaLink
              href={PRODUCT.shopifyUrl}
              className="inline-block bg-[#3DB85C] text-white font-bold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md"
            >
              ECONOMIZE AGORA →
            </CtaLink>
          </div>

          {/* Coluna direita: imagens */}
          <div
            className="relative flex justify-center md:justify-end transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '200ms' }}
          >
            {/* Produto principal — grande */}
            <div className="relative w-[384px] md:w-[576px] aspect-square overflow-hidden">
              <Image
                src="/images/groomer-badge.png"
                alt="Shampoo Neutro Essential 5L Bubbles"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 384px, 576px"
                style={{ animation: 'zoom-pulse 5s ease-in-out infinite' }}
              />
            </div>

            {/* Badge flutuante */}
            <div
              className="absolute -top-4 -right-2 md:-right-4 bg-white rounded-2xl shadow-lg border border-[#E5E7EB] px-3 py-2 text-center transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transitionDelay: '500ms' }}
            >
              <p className="text-[18px] font-extrabold text-[#3DB85C] leading-none">R$ 0,73</p>
              <p className="text-[9px] text-[#6B7280] mt-0.5">por banho</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
