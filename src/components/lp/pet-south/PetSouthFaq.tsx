import { ChevronDown } from 'lucide-react'
import { PET_SOUTH_FAQ } from '@/lib/pet-south'

export function PetSouthFaq() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-widest block mb-1">Dúvidas Frequentes</span>
        <h2 className="text-2xl md:text-3xl font-black text-white">Perguntas da PET South America</h2>
      </div>

      <div className="space-y-4">
        {PET_SOUTH_FAQ.map((faq) => (
          <details key={faq.q} className="group bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm text-white list-none">
              <span>{faq.q}</span>
              <ChevronDown size={18} className="text-[#F4CDD4] group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-xs text-white/70 leading-relaxed pl-1">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
