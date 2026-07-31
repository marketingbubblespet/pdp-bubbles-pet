import Image from 'next/image'
import { Scissors, Ban, Star, GraduationCap, MessageCircle, Link2, PlayCircle, type LucideIcon } from 'lucide-react'
import { MC, MC_LEARN, MC_DELIVERABLES } from '@/lib/masterclass-agosto'

const LEARN_ICONS: Record<string, LucideIcon> = {
  '✂️': Scissors,
  '🚫': Ban,
  '⭐': Star,
}
const DELIVERABLE_ICONS: Record<string, LucideIcon> = {
  '🎓': GraduationCap,
  '💬': MessageCircle,
  '🔗': Link2,
  '▶️': PlayCircle,
}

export function MasterLearnAgosto() {
  return (
    <section className="relative bg-[#111111] py-16 md:py-24 px-4 border-t border-white/5 overflow-hidden">
      {/* Foto de fundo (Tio Dan trabalhando) só na metade direita; metade esquerda fica no preto tradicional */}
      <Image
        src="/images/masterclass/tio-dan-trabalho.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom z-0 opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111] from-50% to-transparent z-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">
          O que você vai aprender
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center max-w-[760px] mx-auto mb-4">
          {MC.transformation}
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {MC_LEARN.map((item) => {
            const Icon = LEARN_ICONS[item.icon]
            return (
              <div
                key={item.text}
                className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors duration-300 flex flex-col gap-3"
              >
                {Icon && <Icon size={28} className="text-[#F4CDD4]" />}
                <p className="text-sm md:text-base font-semibold text-white leading-snug">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 md:mt-20 max-w-[760px] mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-6 text-center">
            O que você recebe ao participar
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {MC_DELIVERABLES.map((d) => {
              const Icon = DELIVERABLE_ICONS[d.icon]
              return (
                <div
                  key={d.text}
                  className="flex items-start gap-3 bg-[#1A1A1A] rounded-xl p-4 border border-white/5"
                >
                  {Icon && <Icon size={22} className="text-[#F4CDD4] shrink-0" />}
                  <p className="text-sm text-white/70 leading-relaxed">{d.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
