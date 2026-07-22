import { CARE_HOW_IT_WORKS } from '@/lib/care'
import { Reveal } from './Reveal'

export function CareHowItWorks() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
            Como funciona
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-12">
            Simples: você se cadastra, a gente cuida do resto.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {CARE_HOW_IT_WORKS.map((item, i) => (
            <Reveal key={item.step} delay={i * 150}>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#E8649A] text-white font-extrabold flex items-center justify-center text-lg transition-transform duration-300 hover:scale-110">
                  {item.step}
                </div>
                <h3 className="font-extrabold text-[#0F0C0D]">{item.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="flex justify-center mt-12">
            <a
              href="#cadastro"
              className="inline-block bg-[#3DB85C] text-white font-bold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-md"
            >
              Quero começar →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
