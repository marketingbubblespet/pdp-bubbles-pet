'use client'
import Image from 'next/image'
import { ArrowRight, Tag } from 'lucide-react'
import { MC_PRODUCTS } from '@/lib/masterclass-penteados'
import { CtaLink } from '@/components/ui/CtaLink'
import { trackPurchaseClick } from './trackPenteados'

const PROMO_URL = 'https://www.bubbles.com.br/collections/promocao-mes'

// Baseado na estrutura da seção "O que você vai conhecer" da LP /live-care (grade de
// cards com imagem quadrada + nome), com duas diferenças: aqui cada card linka direto
// pro produto na Shopify (via CtaLink, preserva UTM), e a imagem reage ao hover: troca
// pra uma segunda foto quando existe, ou aplica zoom quando só há uma (Máscara
// Multifuncional).
export function MasterProductsPenteados() {
  return (
    <section className="bg-[#fdf0f3] py-16 md:py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Os produtos por trás
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0F0C0D] tracking-tight text-center mb-4 max-w-[760px] mx-auto">
          O que a Jéssica usa pra montar cada penteado
        </h2>
        <p className="text-sm md:text-base text-[#6B7280] text-center mb-10 max-w-[640px] mx-auto">
          Da preparação do pelo ao acabamento com brilho. Na aula, ela mostra como e quando usar cada um.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {MC_PRODUCTS.map((p) => (
            <CtaLink
              key={p.nome}
              href={p.url}
              onClick={() => trackPurchaseClick(`produto-${p.nome}`)}
              className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col hover:border-[#F4CDD4] transition-colors duration-300"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                {/* Foto principal: com hoverImage, some no hover; sem, ganha zoom sutil */}
                <Image
                  src={p.image}
                  alt={p.nome}
                  fill
                  sizes="(max-width: 767px) 45vw, 220px"
                  className={`object-contain p-4 transition-all duration-500 ${
                    p.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'
                  }`}
                />
                {p.hoverImage && (
                  <Image
                    src={p.hoverImage}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 45vw, 220px"
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
              </div>
              <div className="p-3 md:p-4">
                <p className="text-sm font-semibold text-[#0F0C0D] leading-snug">{p.nome}</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">{p.linha}</p>
              </div>
            </CtaLink>
          ))}

          {/* Card de fechamento, mesma grade dos produtos, levando pra coleção completa de promoções */}
          <CtaLink
            href={PROMO_URL}
            onClick={() => trackPurchaseClick('ver-todas-promocoes')}
            className="group bg-[#E8649A] rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-4 gap-2 aspect-square hover:brightness-110 transition-all duration-300"
          >
            <Tag size={22} className="text-white" />
            <p className="text-sm font-semibold text-white leading-snug">
              Confira todas as promoções
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:gap-2 transition-all duration-200">
              Ver ofertas <ArrowRight size={14} />
            </span>
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
