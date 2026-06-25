// src/components/lp/PainBlock.tsx
import { CheckCircle2, TrendingUp, Leaf } from 'lucide-react'

const cards = [
  {
    icon: CheckCircle2,
    title: 'Resultado que o tutor percebe na hora',
    text: 'O ativo Bioex AO age diretamente na origem do odor, com ação antioxidante e seborreguladora. O pelo sai limpo, macio e levemente perfumado. O tutor elogia antes de sair do petshop.',
  },
  {
    icon: TrendingUp,
    title: 'Custo que não pesa no caixa',
    text: 'Diluição 1:5 transforma 5L em 30L prontos, rendendo até 300 banhos. R$ 0,73 por atendimento com qualidade profissional, sem comprometer a margem.',
  },
  {
    icon: Leaf,
    title: 'Fórmula segura para qualquer pelagem',
    text: '100% vegano, hipoalergênico e cruelty free. Desenvolvido para uso profissional diário, inclusive em pets com pele sensível, sem risco de reações.',
  },
]

export function PainBlock() {
  return (
    <section className="px-4 py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[#0F0C0D] mb-3 text-center">
          O que muda no seu petshop com o shampoo certo.
        </h2>
        <p className="text-[#6B7280] text-center font-medium leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Profissionais exigentes escolhem o Essential por três motivos práticos: resultado real, rendimento honesto e fórmula com procedência.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {cards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border border-[#E5E7EB] rounded-[10px] p-5 md:p-6 bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-200">
              <Icon size={26} className="text-[#E8649A] mb-3" />
              <h3 className="font-bold text-[#0F0C0D] mb-2 text-base">{title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <p className="text-center italic text-[#E8649A] font-medium text-sm md:text-base">
          &ldquo;Menos troca de produto, menos reclamação e mais margem por banho. Essa é a diferença de usar tecnologia real.&rdquo;
        </p>
      </div>
    </section>
  )
}
