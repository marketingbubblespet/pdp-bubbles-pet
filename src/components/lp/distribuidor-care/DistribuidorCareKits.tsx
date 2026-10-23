// B6 da LP /distribuidor-care: faixa "Monte a rotina" com os 8 kits. Sem botão, sem link e sem preço.
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { DISTRIBUIDOR_CARE_VITRINE as V } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_KITS, type KitVitrine } from './distribuidorCareVitrineDados'
import { DistribuidorCareCarousel } from './DistribuidorCareCarousel'
import { DistribuidorCareMedia, DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

// "250 g" e "80 ml" não quebram de linha entre o número e a unidade.
const semQuebraNoVolume = (t: string) => t.replace(/ (ml|g)$/, '\u00a0$1')

function CartaoKit({ kit }: { kit: KitVitrine }) {
  return (
    <div className={cn(C.CARTAO, 'h-full p-4 md:p-4')}>
      <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#E4E7E9]">
        {kit.imagem
          ? <Image src={kit.imagem} alt={kit.alt} fill sizes="(max-width: 767px) 70vw, 240px" className="object-contain" />
          : <DistribuidorCareMedia codigo="P-06" />}
      </div>
      <h4 className="mt-3 text-sm font-medium text-[#0D0C0D] md:text-base">{kit.nome}</h4>
      <p data-placeholder={kit.composicao === null ? 'composicao-kit' : undefined} className="mt-1 text-xs font-semibold text-[#666666]">
        {V.kitsContagem.replace('{n}', String(kit.itens))}
      </p>
      {kit.composicao === null ? null : kit.resumo ? (
        <p className="mt-1 text-xs text-[#666666]">{kit.resumo}</p>
      ) : (
        <ul className="mt-1 space-y-0.5 text-xs text-[#666666]">
          {kit.composicao.map((item) => <li key={item}>{semQuebraNoVolume(item)}</li>)}
        </ul>
      )}
    </div>
  )
}

export function DistribuidorCareKits() {
  return (
    <div className="mt-12 md:mt-16">
      <DistribuidorCareCarousel
        id="dc-trilho-kits"
        ariaLabel={V.ariaKits}
        focavel
        cabecalho={
          <>
            <h3 className={C.TITULO_H3}>{V.kitsTitulo}</h3>
            <p className={cn(C.CORPO, 'mt-1')}>{V.kitsFrase}</p>
          </>
        }
      >
        {DISTRIBUIDOR_CARE_KITS.map((k) => (
          <li key={k.handle} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-[calc((100%-72px)/4)]">
            <CartaoKit kit={k} />
          </li>
        ))}
      </DistribuidorCareCarousel>
    </div>
  )
}
