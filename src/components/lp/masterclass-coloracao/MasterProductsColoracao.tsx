'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { MC, MC_PRODUCTS, MC_PRODUCTS_VISIBLE } from '@/lib/masterclass-coloracao'
import { CtaLink } from '@/components/ui/CtaLink'
import { pushCtaClick } from '@/lib/tracking'

const formatarPreco = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Vitrine da linha Collora: cada card abre a PDP na Shopify em nova aba (CtaLink preserva
// UTM). Mostra os primeiros MC_PRODUCTS_VISIBLE e o resto atrás do botão "ver mais".
export function MasterProductsColoracao() {
  const [todos, setTodos] = useState(false)
  const lista = todos ? MC_PRODUCTS : MC_PRODUCTS.slice(0, MC_PRODUCTS_VISIBLE)
  const restantes = MC_PRODUCTS.length - MC_PRODUCTS_VISIBLE

  return (
    <section id="produtos" className="bg-[#FDF2F4] py-16 md:py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Linha Collora
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] tracking-tight text-center mb-4 max-w-[760px] mx-auto">
          Os produtos que a Lari usa na aula
        </h2>
        <p className="text-sm md:text-base text-[#666666] text-center mb-10 max-w-[640px] mx-auto">
          Qualquer produto Collora libera o seu acesso à MasterClass, de qualquer valor. Do spray de preparo ao glitter de acabamento.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {lista.map((p) => (
            <CtaLink
              key={p.handle}
              href={p.url}
              onClick={() => pushCtaClick(`produto-${p.handle}`, 'vitrine-collora')}
              className="group bg-white rounded-[20px] border border-[#E5E7EB] overflow-hidden flex flex-col hover:border-[#F4CDD4] transition-colors duration-300"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.nome}
                  fill
                  sizes="(max-width: 767px) calc(50vw - 22px), 262px"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="p-3 md:p-4 flex flex-col gap-1 flex-1">
                <p className="text-sm font-medium text-[#0D0C0D] leading-snug">{p.nome}</p>
                <p className="text-xs text-[#666666]">{p.detalhe}</p>
                <p className="mt-auto pt-2 text-base font-semibold text-[#0D0C0D]">{formatarPreco(p.preco)}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E8649A] group-hover:gap-2 transition-all duration-200">
                  Ver produto <ArrowRight size={14} />
                </span>
              </div>
            </CtaLink>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {!todos && restantes > 0 && (
            <button
              type="button"
              onClick={() => setTodos(true)}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white border border-[#E5E7EB] text-[#0D0C0D] font-semibold rounded-[12px] px-6 py-3 hover:border-[#E8649A] transition-colors duration-200"
            >
              Ver mais {restantes} produtos <ChevronDown size={16} />
            </button>
          )}
          <CtaLink
            href={MC.collectionUrl}
            onClick={() => pushCtaClick('ver-colecao-collora', 'vitrine-collora')}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] text-[#E8649A] font-semibold px-4 py-3"
          >
            Abrir a coleção Collora na loja <ArrowRight size={16} />
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
