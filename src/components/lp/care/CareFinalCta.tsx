import Image from 'next/image'
import { Reveal } from './Reveal'

export function CareFinalCta() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Foto de fundo (exemplo/placeholder): trocar por imagem real de petshop/prateleira */}
      <Image
        src="/images/masterclass/bastidores-2.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#0d0c0d]/85 z-0" />

      <Reveal className="relative z-10 max-w-[760px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
          Pré-venda de lançamento
        </p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">
          Entre agora, com prioridade. Depois, seu concorrente já vai estar revendendo.
        </h2>
        <p className="text-sm md:text-base text-[#9ca3af] mb-8 max-w-[560px] mx-auto">
          A demanda já está girando. Garanta que ela encontre a sua prateleira primeiro.
        </p>
        <a
          href="#cadastro"
          className="inline-block bg-[#3DB85C] text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg"
        >
          Quero revender no meu petshop →
        </a>
      </Reveal>
    </section>
  )
}
