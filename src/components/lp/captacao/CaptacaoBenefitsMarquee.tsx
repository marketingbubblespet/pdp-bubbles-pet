import { Sparkles } from 'lucide-react'
import { CAPTACAO_BENEFITS_MARQUEE } from '@/lib/captacao'

export function CaptacaoBenefitsMarquee() {
  const items = [...CAPTACAO_BENEFITS_MARQUEE, ...CAPTACAO_BENEFITS_MARQUEE]
  return (
    <div className="bg-[#F4CDD4] py-4 overflow-hidden border-y border-black/10 relative z-20">
      <div className="flex whitespace-nowrap animate-captacao-marquee">
        {items.map((benefit, i) => (
          <div key={`${benefit}-${i}`} className="flex items-center gap-4 mx-8">
            <Sparkles size={16} className="text-[#0F0C0D]" />
            <span className="text-[#0F0C0D] font-black text-[10px] uppercase tracking-widest">{benefit}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes captacao-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-captacao-marquee {
          animation: captacao-marquee 9.6s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-captacao-marquee {
            animation: captacao-marquee 6.4s linear infinite;
          }
        }
      `}</style>
    </div>
  )
}
