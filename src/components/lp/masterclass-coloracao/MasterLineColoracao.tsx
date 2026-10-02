import Image from 'next/image'
import { MC_COLORS, MC_LINE_ITEMS, MC_LINE_STEPS } from '@/lib/masterclass-coloracao'

export function MasterLineColoracao() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Conheça a linha Collora
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] tracking-tight text-center mb-4 max-w-[760px] mx-auto">
          Coloração estética semipermanente, com 7 cores que se misturam
        </h2>
        <p className="text-sm md:text-base text-[#666666] text-center mb-10 max-w-[640px] mx-auto">
          O pigmento age no córtex do fio. Cada tinta vem em bisnaga de 100g, e todas cabem num kit só.
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-3 mb-14">
          {MC_COLORS.map((c) => (
            <div key={c.nome} className="flex flex-col items-center gap-2">
              <div className="relative w-full aspect-square rounded-[12px] overflow-hidden bg-[#F7F7F7]">
                <Image src={c.image} alt={`Tinta Collora ${c.nome}`} fill sizes="(max-width: 639px) 22vw, 140px" className="object-cover" />
              </div>
              <p className="text-xs md:text-sm font-medium text-[#0D0C0D] text-center leading-tight">
                {c.nome}
                <span className="block text-[11px] md:text-xs font-normal text-[#666666]">{c.tom}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {MC_LINE_ITEMS.map((item) => (
            <div key={item.nome} className="bg-[#F7F7F7] rounded-[20px] border border-[#E5E7EB] overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3]">
                <Image src={item.image} alt={item.nome} fill sizes="(max-width: 767px) calc(100vw - 32px), 350px" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-base font-medium text-[#0D0C0D]">{item.nome}</p>
                <p className="text-xs font-semibold text-[#E8649A] mb-2">{item.detalhe}</p>
                <p className="text-sm text-[#666666] leading-relaxed">{item.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-[760px] mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#E8649A] mb-4 text-center">
            Como a aplicação funciona
          </p>
          <ol className="grid sm:grid-cols-5 gap-3">
            {MC_LINE_STEPS.map((passo, i) => (
              <li key={passo} className="bg-[#FDF2F4] rounded-[12px] p-4 text-sm text-[#0D0C0D] leading-snug">
                <span className="block text-xs font-semibold text-[#E8649A] mb-1">{i + 1}</span>
                {passo}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
