// src/components/lp/MechanismBlock.tsx
import Image from 'next/image'
import { Beaker, Leaf } from 'lucide-react'

const actives = [
  {
    icon: Beaker,
    title: 'Bioex AO',
    subtitle: 'Ativo natural de ação antioxidante',
    text: 'Associação de extratos vegetais (agrião, bardana, sálvia, limão, hera e quilaia) que atua no controle da oleosidade, auxilia na hidratação e contribui para reduzir odores indesejados, sem agredir a barreira cutânea.',
  },
  {
    icon: Leaf,
    title: 'Extrato de Algas (Chlorella)',
    subtitle: 'Rico em nutrientes e antioxidantes',
    text: 'Contribui para a proteção da pele e da pelagem contra fatores externos, favorece a hidratação e o aspecto saudável dos fios, adequado para pelagens sensíveis.',
  },
]

export function MechanismBlock() {
  return (
    <section className="py-16 md:py-24 bg-[#F4CDD4]/10">
      <div className="px-4 max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Por que funciona
        </p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[#0F0C0D] mb-3 text-center">
          Fórmula com ativos que fazem o trabalho pesado.
        </h2>
        <p className="text-[#6B7280] text-center font-medium leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          O Shampoo Neutro Essential combina dois ativos de alta eficácia que atuam juntos no cuidado da pelagem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-10">
          {actives.map(({ icon: Icon, title, subtitle, text }) => (
            <div key={title} className="bg-white rounded-xl shadow-sm p-5 md:p-6">
              <Icon size={26} className="text-[#E8649A] mb-3" />
              <h3 className="font-bold text-[#0F0C0D] text-base md:text-lg mb-1">{title}</h3>
              <p className="text-xs font-medium uppercase tracking-wide text-[#E8649A] mb-2">{subtitle}</p>
              <p className="text-sm text-[#6B7280] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#6B7280] text-xs md:text-sm mb-10 md:mb-12">
          Fórmula 100% vegana, hipoalergênica e cruelty free. Desenvolvida para uso profissional diário.
        </p>
      </div>

      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src="/images/mechanism-pelagem.jpg"
          alt="Pelagem macia e brilhante pós-banho com Shampoo Neutro Essential Bubbles"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  )
}
