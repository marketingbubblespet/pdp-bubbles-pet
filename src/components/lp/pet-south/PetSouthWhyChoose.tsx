import { DollarSign, Award, Truck, Users, Shield, Sparkles, type LucideIcon } from 'lucide-react'
import { PET_SOUTH_WHY_CHOOSE } from '@/lib/pet-south'

const ICONS: Record<string, LucideIcon> = { DollarSign, Award, Truck, Users, Shield, Sparkles }

export function PetSouthWhyChoose() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="px-3 py-1 bg-[#F4CDD4]/20 border border-[#F4CDD4]/40 text-[#F4CDD4] text-[10px] font-black uppercase tracking-widest rounded-full">
          Diferenciais Competitivos
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
          Por que os Maiores Distribuidores Escolhem a Bubbles®?
        </h2>
        <p className="text-white/60 text-xs md:text-sm">
          Não entregamos apenas cosméticos. Entregamos um modelo de negócio estruturado para alavancar suas vendas no canal profissional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PET_SOUTH_WHY_CHOOSE.map((item) => {
          const Icon = ICONS[item.icon]
          return (
            <div key={item.title} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#F4CDD4]/40 transition-all space-y-4 group">
              <div className="w-12 h-12 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-black text-white">{item.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed">{item.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
