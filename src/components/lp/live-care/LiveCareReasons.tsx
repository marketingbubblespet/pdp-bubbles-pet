import { Sparkles, Target, TrendingUp, Award, Star, type LucideIcon } from 'lucide-react'
import { LIVE_CARE_REASONS } from '@/lib/live-care'
import { LiveCareCta } from './LiveCareCta'

const ICONS: Record<string, LucideIcon> = { Sparkles, Target, TrendingUp, Award, Star }

export function LiveCareReasons() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Por que assistir
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-4 max-w-[720px] mx-auto">
          Uma hora de domingo que muda a forma como você fecha o atendimento
        </h2>
        <p className="text-sm md:text-base text-[#666666] text-center mb-10 max-w-[620px] mx-auto">
          O banho acaba quando o pet sai do seu salão. O cuidado, não. É disso que a gente vai falar.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIVE_CARE_REASONS.map((r) => {
            const Icon = ICONS[r.icon]
            return (
              <div
                key={r.title}
                className="bg-[#F7F7F7] rounded-2xl p-6 border border-[#E5E7EB] flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#F4CDD4]"
              >
                {Icon && <Icon size={26} className="text-[#E8649A]" />}
                <h3 className="font-medium text-[#0D0C0D] leading-snug">{r.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{r.text}</p>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mt-10">
          <LiveCareCta origem="motivos" className="w-full sm:w-auto">
            Entrar no grupo do WhatsApp →
          </LiveCareCta>
        </div>
      </div>
    </section>
  )
}
