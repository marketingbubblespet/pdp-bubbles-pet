// src/components/lp/TrustBar.tsx
import { RotateCcw, ShieldCheck, CreditCard, Headset } from 'lucide-react'
import { PRODUCT } from '@/lib/constants'

const stats = [
  { label: 'Rendimento',  value: `${PRODUCT.yieldBaths} banhos` },
  { label: 'Custo/Banho', value: PRODUCT.costPerBath },
  { label: 'Diluição',    value: PRODUCT.dilution },
]

const badges = [
  { icon: RotateCcw,   title: 'Garantia',       sub: '7 dias para trocar' },
  { icon: ShieldCheck, title: 'Compra Segura',   sub: 'Sem burocracia' },
  { icon: CreditCard,  title: 'Até 6x S/ Juros', sub: 'Com nota fiscal' },
  { icon: Headset,     title: 'Suporte',          sub: 'Expertise Real' },
]

export function TrustBar() {
  return (
    <div className="bg-white px-4 py-5 md:py-6 border-b border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto space-y-5">
        {/* Stats: Rendimento / Custo / Diluição */}
        <div className="grid grid-cols-3 gap-0 border border-gray-200 rounded-[10px] bg-[#f7f7f7]">
          {stats.map(({ label, value }, i) => (
            <div key={label} className={`p-4 text-center ${i < stats.length - 1 ? 'border-r border-gray-200' : ''}`}>
              <span className="block text-[10px] text-gray-400 uppercase font-medium tracking-widest mb-1">{label}</span>
              <span className="block text-[15px] font-medium text-black">{value}</span>
            </div>
          ))}
        </div>

        {/* Badges: Garantia / Compra Segura / 6x / Suporte */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pb-1">
          {badges.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#fdf2f4] flex items-center justify-center">
                <Icon className="w-5 h-5 text-black" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-black uppercase tracking-tighter">{title}</p>
                <p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
