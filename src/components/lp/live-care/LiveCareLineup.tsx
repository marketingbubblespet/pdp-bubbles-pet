import Image from 'next/image'
import { LIVE_CARE_PRODUCTS } from '@/lib/live-care'
import { LiveCareCta } from './LiveCareCta'

// Vitrine, não loja: sem preço, sem botão de comprar e sem link para a Shopify. A compra
// acontece na live, com o cupom liberado ao vivo, então tirar o link daqui é o que
// preserva o motivo de entrar no grupo.
export function LiveCareLineup() {
  return (
    <section className="bg-[#fdf0f3] py-16 md:py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          O que você vai conhecer
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0D0C0D] text-center mb-4 max-w-[760px] mx-auto">
          11 produtos pensados para o cuidado continuar depois que o pet sai do seu salão
        </h2>
        <p className="text-sm md:text-base text-[#666666] text-center mb-10 max-w-[640px] mx-auto">
          Shampoos, condicionamento, finalizadores, perfumes e cuidados específicos. Na live, mostramos
          produto por produto, os kits prontos e como apresentar cada um ao tutor.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {LIVE_CARE_PRODUCTS.map((p) => (
            <div
              key={p.nome}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={p.imagem}
                  alt={p.nome}
                  fill
                  sizes="(max-width: 767px) 45vw, 250px"
                  className="object-cover"
                />
              </div>
              <div className="p-3 md:p-4">
                <p className="text-sm font-semibold text-[#0D0C0D] leading-snug">{p.nome}</p>
                <p className="text-xs text-[#666666] mt-0.5">{p.volume}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 mt-10">
          <LiveCareCta origem="vitrine" className="w-full sm:w-auto">
            Quero ver o lançamento ao vivo →
          </LiveCareCta>
          <p className="text-xs text-[#666666] text-center max-w-[420px]">
            As condições de lançamento e os kits são apresentados durante a transmissão.
          </p>
        </div>
      </div>
    </section>
  )
}
