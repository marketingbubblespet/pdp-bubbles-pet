import { Sparkles } from 'lucide-react'
import { PET_SOUTH_MARQUEE } from '@/lib/pet-south'

// Faixa animada de benefícios em loop contínuo (CSS puro, sem JS de scroll).
export function PetSouthMarquee() {
  const items = [...PET_SOUTH_MARQUEE, ...PET_SOUTH_MARQUEE]
  return (
    <div className="bg-gradient-to-r from-[#F4CDD4] via-[#FFFFFF] to-[#F4CDD4] py-3.5 overflow-hidden border-y border-[#F4CDD4]/30 relative z-20">
      <div className="flex whitespace-nowrap animate-pet-south-marquee">
        {items.map((benefit, i) => (
          <div key={`${benefit}-${i}`} className="flex items-center gap-3 mx-6">
            <Sparkles size={14} className="text-[#080808]" />
            <span className="text-[#080808] font-black text-[10px] uppercase tracking-widest">{benefit}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pet-south-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-pet-south-marquee {
          animation: pet-south-marquee 12s linear infinite;
        }
      `}</style>
    </div>
  )
}
