// src/components/lp/BrandBlock.tsx
import { BRAND, PRODUCT } from '@/lib/constants'
import { CtaLink } from '@/components/ui/CtaLink'

const stats = [
  { value: BRAND.years,    label: 'Tempo de mercado' },
  { value: BRAND.groomers, label: 'Groomers parceiros' },
  { value: BRAND.clients,  label: 'Clientes ativos' },
  { value: BRAND.rating,   label: 'Satisfação (NPS)' },
]

export function BrandBlock() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden flex items-center min-h-[60vh]">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://www.bubbles.com.br/cdn/shop/videos/c/vp/6fd9894dcddb47b5883886091db28520/6fd9894dcddb47b5883886091db28520.HD-1080p-7.2Mbps-45960585.mp4?v=0"
          type="video/mp4"
        />
      </video>
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Conteúdo */}
      <div className="relative z-20 max-w-[1100px] mx-auto w-full text-[#FAFAFA]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">
          Bubbles Pet
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white mb-6 text-center">
          Mais de 7 anos elevando o padrão do banho e tosa.
        </h2>
        <p className="text-[#9ca3af] text-center leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          A Bubbles nasceu com o propósito de transformar cada banho em uma experiência profissional, segura e memorável, tanto para o groomer quanto para o pet. Somos 100% brasileiros, veganos e cruelty free.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 flex flex-col items-center text-center border border-white/10">
              <span className="font-extrabold text-white text-lg md:text-xl mb-0.5">{value}</span>
              <span className="text-xs text-[#9ca3af]">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <CtaLink
            href={PRODUCT.shopifyUrl}
            className="inline-block bg-[#3DB85C] text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-150 text-center shadow-lg"
          >
            COMPRE AGORA →
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
