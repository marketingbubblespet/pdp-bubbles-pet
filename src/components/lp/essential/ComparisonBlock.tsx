// src/components/lp/ComparisonBlock.tsx
import { X, Check } from 'lucide-react'
import { PRODUCT } from '@/lib/constants'
import { CtaLink } from '@/components/ui/CtaLink'

const rows = [
  { bad: 'Odor voltando em poucas horas',        good: 'Redução real de odor com Bioex AO' },
  { bad: 'Pelagem ressecada e opaca',             good: 'Pelagem macia, hidratada e brilhante' },
  { bad: 'Fórmula que mascara o cheiro',          good: 'Ação nos ativos naturais da pele' },
  { bad: 'Baixo rendimento por litro',            good: '1:5 → 30L → ~300 banhos' },
  { bad: 'Composição duvidosa',                   good: '100% vegano, hipoalergênico, MAPA' },
]

export function ComparisonBlock() {
  return (
    <section className="px-4 py-16 md:py-24 bg-[#F7F7F7]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          O padrão Bubbles
        </p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[#0F0C0D] mb-10 md:mb-12 text-center">
          Por que groomers profissionais não trocam a Bubbles por marcas genéricas.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
          {/* Marcas comuns */}
          <div className="bg-[#F5F5F5] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E5E7EB]">
              <span className="text-sm font-bold text-[#6B7280] uppercase tracking-wide">Marcas comuns</span>
            </div>
            <ul className="divide-y divide-[#E5E7EB]">
              {rows.map((r) => (
                <li key={r.bad} className="flex items-start gap-3 px-5 py-4">
                  <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-[#6B7280]">{r.bad}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bubbles Essential */}
          <div className="bg-[#F4CDD4]/20 border border-[#E8649A]/30 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E8649A]/20">
              <span className="text-sm font-bold text-[#E8649A] uppercase tracking-wide">Bubbles Essential</span>
            </div>
            <ul className="divide-y divide-[#E8649A]/10">
              {rows.map((r) => (
                <li key={r.good} className="flex items-start gap-3 px-5 py-4">
                  <Check size={16} className="text-[#3DB85C] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#0F0C0D] font-medium">{r.good}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <CtaLink
            href={PRODUCT.shopifyUrl}
            className="inline-block bg-[#3DB85C] text-white font-bold text-lg px-8 py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150 text-center shadow-lg"
          >
            Quero o Bubbles Essential →
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
