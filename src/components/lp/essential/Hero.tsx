// src/components/lp/Hero.tsx
import Image from 'next/image'
import { Check } from 'lucide-react'
import { PRODUCT } from '@/lib/constants'
import { CtaLink } from '@/components/ui/CtaLink'
import { DeliveryBadge } from '@/components/ui/DeliveryBadge'

export function Hero() {
  const bullets = [
    'Diluição 1:5 → 30L prontos',
    'Ativos Bioex AO + Extrato de Algas',
    '100% Vegano · Cruelty Free · Hipoalergênico',
    'Pelagem macia e levemente perfumada após o primeiro uso',
  ]

  return (
    <section className="pt-24 md:pt-28 px-4 pb-16 md:pb-24 bg-[#F7F7F7]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Copy */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
              Linha Essential · Shampoo Pet Neutro · 5 Litros
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.15] text-[#0F0C0D] mb-4">
              O shampoo que limpa de verdade e ainda rende 300 banhos.
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] font-medium leading-relaxed mb-6">
              Desenvolvido para groomers profissionais que não abrem mão de resultado, higiene e economia por banho.
            </p>

            <ul className="space-y-2 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-[#0F0C0D] text-sm md:text-base">
                  <Check size={16} className="text-[#3DB85C] mt-1 shrink-0" />
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>

            <CtaLink
              href={PRODUCT.shopifyUrl}
              className="inline-block bg-[#3DB85C] text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-lg mb-3"
            >
              COMPRE AGORA →
            </CtaLink>

            <p className="text-[10px] md:text-xs text-[#6B7280]">
              Compra Segura · Garantia · ATÉ 6X S/JUROS
            </p>
            <DeliveryBadge />
          </div>

          {/* Imagens */}
          <div className="relative flex justify-center md:justify-end">
            {/* Produto principal */}
            <div className="relative w-full max-w-[560px] aspect-square rounded-2xl overflow-hidden bg-[#F9F5F5]">
              <Image
                src="/images/hero-produto-5l.jpg"
                alt="Shampoo Neutro Essential 5L Bubbles Pet"
                fill
                className="object-contain"
                priority
                fetchPriority="high"
                sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 768px) 560px, 560px"
              />
            </div>

            {/* Badge groomer — prova social flutuante */}
            <div className="absolute bottom-4 -left-2 md:-left-6 flex items-center gap-3 bg-white rounded-2xl shadow-xl p-3 border border-[#E5E7EB] max-w-[230px]">
              <div className="w-[48px] h-[48px] rounded-[10px] shrink-0 bg-[#f0fdf4] border-2 border-[#bbf7d0] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#3DB85C"/>
                  <path d="M6.5 12.5L10 16L17.5 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#0F0C0D] leading-tight">Aprovado por groomers</p>
                <p className="text-[10px] text-[#6B7280] leading-tight mt-0.5">+5.000 profissionais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
