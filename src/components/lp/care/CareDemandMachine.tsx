import Image from 'next/image'
import { Users, ShoppingBag, Video } from 'lucide-react'
import { CARE_DEMAND } from '@/lib/care'
import { Reveal } from './Reveal'
import { CountUp } from './CountUp'
import { CareDemandGallery } from './CareDemandGallery'

const stats = [
  { icon: Users, target: CARE_DEMAND.afiliados, prefix: '', label: 'Afiliados ativos divulgando a marca' },
  { icon: ShoppingBag, target: CARE_DEMAND.vendas3meses, prefix: '', label: 'Produtos vendidos em 3 meses de TikTok Shop' },
  { icon: Video, target: CARE_DEMAND.videos, prefix: '+', label: 'Vídeos e lives já produzidos pelos afiliados' },
]

export function CareDemandMachine() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <style>{`
        @keyframes care-float-c { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-14px, 16px); } }
        .care-blob-c { animation: care-float-c 8s ease-in-out infinite; }
      `}</style>

      {/* Foto de fundo (exemplo/placeholder): trocar por imagem real de afiliado/prova quando chegar */}
      <Image
        src="/images/mechanism-pelagem.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#fdf0f3]/95 z-0" />
      <div className="care-blob-c absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-white opacity-30 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
            A máquina de demanda
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-[#0F0C0D] mb-4 text-center max-w-[820px] mx-auto">
            Enquanto você vê isso, tem criador gerando conteúdo e desejo para seu negócio.
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] leading-relaxed mb-10 text-center max-w-[720px] mx-auto">
            {CARE_DEMAND.afiliados.toLocaleString('pt-BR')} criadores já estão gerando procura pela Bubbles no TikTok Shop. Os tutores vão procurar os produtos. A pergunta é: vão encontrar na sua prateleira?
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center gap-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <s.icon size={28} className="text-[#E8649A]" />
                <span className="text-3xl md:text-4xl font-extrabold text-[#0F0C0D]">
                  <CountUp target={s.target} prefix={s.prefix} />
                </span>
                <span className="text-xs md:text-sm text-[#6B7280] leading-snug">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="text-sm md:text-base font-semibold text-[#0F0C0D] text-center mb-10 max-w-[680px] mx-auto">
            Não é promessa de venda. É venda que já está acontecendo. Cada afiliado é uma pessoa trabalhando, de graça, para levar o tutor até o seu balcão.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <CareDemandGallery />
        </Reveal>
      </div>
    </section>
  )
}
