import { Star, UserCircle2 } from 'lucide-react'
import { BRAND } from '@/lib/constants'
import { Reveal } from './Reveal'

export function CareGroomerProof() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
            Quem já confia
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10 max-w-[720px] mx-auto">
            {BRAND.groomers} groomers já constroem seu padrão com a Bubbles.
          </h2>
        </Reveal>

        {/* Depoimentos: placeholder até o time enviar os reais. Não inventar nome/texto de pessoa real. */}
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#F4A522] fill-[#F4A522]" />
                  ))}
                </div>
                <p className="text-sm text-[#9ca3af] italic leading-relaxed">
                  [Depoimento a confirmar, aguardando conteúdo real de parceiro groomer]
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <UserCircle2 size={28} className="text-[#E5E7EB]" />
                  <span className="text-xs font-bold text-[#0F0C0D]">Groomer parceiro Bubbles</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
