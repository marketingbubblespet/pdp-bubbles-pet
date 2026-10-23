'use client'
// B6 da LP /distribuidor-care: vitrine com abas por momento da rotina (padrão APG, ativação automática),
// carrossel de produtos por aba, painel de detalhe e a faixa de kits. Sem preço e sem link para a loja.
import { useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { pushVitrineAba, pushVitrineProdutoOpen } from '@/lib/tracking'
import { DISTRIBUIDOR_CARE_VITRINE as V } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_ABAS, DISTRIBUIDOR_CARE_PRODUTOS, type AbaVitrine, type ProdutoVitrine } from './distribuidorCareVitrineDados'
import { DistribuidorCareCarousel } from './DistribuidorCareCarousel'
import { DistribuidorCareProductDialog } from './DistribuidorCareProductDialog'
import { DistribuidorCareKits } from './DistribuidorCareKits'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

function CartaoProduto({ produto, aoAbrir }: { produto: ProdutoVitrine; aoAbrir: (p: ProdutoVitrine, b: HTMLButtonElement) => void }) {
  return (
    <article className="relative rounded-[12px] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#0D0C0D]">
      <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#E4E7E9]">
        <Image src={produto.imagem} alt={`${produto.nome} ${produto.volume} da Linha Care`} fill
          sizes="(max-width: 767px) 70vw, 320px" className="object-contain p-3" />
        {produto.idealParaOCaixa && (
          <span className="absolute left-2 top-2 rounded-full bg-[#F4CDD4] px-2.5 py-1 text-xs font-semibold text-[#0D0C0D]">{V.seloCaixa}</span>
        )}
      </div>
      <h3 className={cn(C.TITULO_H3, 'mt-3')}>
        <button type="button" aria-haspopup="dialog" onClick={(e) => aoAbrir(produto, e.currentTarget)}
          className="text-left after:absolute after:inset-0 after:content-[''] focus:outline-none">
          {produto.nome}
        </button>
      </h3>
      <p className="text-xs text-[#666666]">{produto.volume}</p>
      <p className="mt-1 text-sm text-[#0D0C0D] md:truncate">{produto.frase}</p>
    </article>
  )
}

function Abas({ ativa, aoTrocar }: { ativa: AbaVitrine; aoTrocar: (a: AbaVitrine, focar: boolean) => void }) {
  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = DISTRIBUIDOR_CARE_ABAS.findIndex((a) => a.id === ativa)
    const total = DISTRIBUIDOR_CARE_ABAS.length
    const mapa: Record<string, number> = { ArrowRight: (i + 1) % total, ArrowLeft: (i - 1 + total) % total, Home: 0, End: total - 1 }
    if (!(e.key in mapa)) return
    e.preventDefault()
    aoTrocar(DISTRIBUIDOR_CARE_ABAS[mapa[e.key]].id, true)
  }
  return (
    <div role="tablist" aria-label={V.ariaAbas} onKeyDown={aoTeclar}
      className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 md:justify-center">
      {DISTRIBUIDOR_CARE_ABAS.map((a) => {
        const sel = a.id === ativa
        return (
          <button key={a.id} id={`dc-aba-${a.id}`} role="tab" type="button" aria-selected={sel} aria-controls={`dc-painel-${a.id}`}
            tabIndex={sel ? 0 : -1} onClick={() => aoTrocar(a.id, false)}
            className={`min-h-[44px] shrink-0 rounded-full px-4 text-sm font-medium ${C.FOCO} ${
              sel ? 'bg-[#0D0C0D] text-white' : 'border border-[#888888] bg-white text-[#0D0C0D]'}`}>
            {a.rotulo}
          </button>
        )
      })}
    </div>
  )
}

export function DistribuidorCareProducts() {
  const [ativa, setAtiva] = useState<AbaVitrine>('limpar')
  const [produto, setProduto] = useState<ProdutoVitrine | null>(null)
  const abridor = useRef<HTMLButtonElement | null>(null)

  const trocar = (aba: AbaVitrine, focar: boolean) => {
    if (focar) document.getElementById(`dc-aba-${aba}`)?.focus()
    if (aba === ativa) return
    setAtiva(aba)
    pushVitrineAba(aba)
  }
  const abrir = (p: ProdutoVitrine, botao: HTMLButtonElement) => {
    abridor.current = botao
    setProduto(p)
    pushVitrineProdutoOpen(p.id, ativa)
  }
  const fechar = () => {
    setProduto(null)
    abridor.current?.focus()
  }

  return (
    <section aria-labelledby="dc-titulo-vitrine" className={`bg-white ${C.SECAO}`}>
      <div className={C.CONTAINER}>
        <h2 id="dc-titulo-vitrine" className={cn(C.TITULO_H2, 'text-center')}>{V.titulo}</h2>
        <p className={cn(C.CORPO, 'mt-3 text-center')}>{V.subtitulo}</p>
        <Abas ativa={ativa} aoTrocar={trocar} />
        {DISTRIBUIDOR_CARE_ABAS.map((a) => (
          <div key={a.id} role="tabpanel" id={`dc-painel-${a.id}`} aria-labelledby={`dc-aba-${a.id}`} hidden={a.id !== ativa}>
            <DistribuidorCareCarousel id={`dc-trilho-${a.id}`} ariaLabel={V.ariaProdutos.replace('{aba}', a.rotulo)} centralizarDesktop>
              {DISTRIBUIDOR_CARE_PRODUTOS.filter((p) => p.aba === a.id).map((p) => (
                <li key={p.id} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-[calc((100%-48px)/3)]">
                  <CartaoProduto produto={p} aoAbrir={abrir} />
                </li>
              ))}
            </DistribuidorCareCarousel>
          </div>
        ))}
        <DistribuidorCareKits />
      </div>
      <DistribuidorCareProductDialog produto={produto} aoFechar={fechar} />
    </section>
  )
}
