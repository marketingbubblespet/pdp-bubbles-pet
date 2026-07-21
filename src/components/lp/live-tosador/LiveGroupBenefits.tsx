import { LIVE_GROUP_BENEFITS } from '@/lib/live-tosador'
import { LiveCta } from './LiveCta'

export function LiveGroupBenefits() {
  return (
    <section id="participar" className="bg-[#fdf0f3] py-16 md:py-24 px-4 scroll-mt-4">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">Por que entrar no grupo</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] mb-10">O grupo é a sua garantia de não perder nada</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {LIVE_GROUP_BENEFITS.map((b) => (
            <div key={b.title} className="bg-white rounded-[10px] p-6 border border-[#E5E7EB] flex flex-col gap-2 items-center text-center">
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-extrabold text-[#0F0C0D]">{b.title}</h3>
              <p className="text-sm text-[#6B7280] leading-snug">{b.text}</p>
            </div>
          ))}
        </div>
        <LiveCta pulse className="text-base md:text-lg shadow-lg">Entrar no grupo do WhatsApp</LiveCta>
      </div>
    </section>
  )
}
