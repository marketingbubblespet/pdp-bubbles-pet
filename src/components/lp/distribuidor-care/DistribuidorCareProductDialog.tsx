'use client'
// B6 da LP /distribuidor-care: painel de detalhe do produto num único <dialog> com showModal().
// Bottom sheet no celular, modal centralizado no desktop. Esc nativo; clique fora feito à mão (sem closedby).
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DISTRIBUIDOR_CARE_VITRINE as V } from '@/lib/distribuidor-care'
import type { ProdutoVitrine } from './distribuidorCareVitrineDados'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

type Props = { produto: ProdutoVitrine | null; aoFechar: () => void }

function Conteudo({ produto, fechar }: { produto: ProdutoVitrine; fechar: () => void }) {
  const selos = produto.idealParaOCaixa ? [...V.selosPainel, V.seloCaixa] : V.selosPainel
  return (
    <>
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[12px] bg-[#E4E7E9]">
          <Image src={produto.imagem} alt={`${produto.nome} ${produto.volume} da Linha Care`} fill sizes="96px" className="object-contain p-1.5" />
        </div>
        <div className="flex-1">
          <h2 id="dc-produto-titulo" className="text-xl font-medium text-[#0D0C0D]">{produto.nome}</h2>
          <p className="mt-1 text-sm text-[#666666]">{produto.volume}</p>
        </div>
        <button type="button" onClick={fechar} className={cn(C.LINK_TEXTO, 'shrink-0 no-underline')}>
          <X size={18} aria-hidden="true" />
          {V.fechar}
        </button>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {selos.map((s) => <li key={s} className={C.PILULA}>{s}</li>)}
      </ul>
      <h3 className={cn(C.TITULO_H3, 'mt-6')}>{V.painel.paraQueServe}</h3>
      <p className={cn(C.CORPO, 'mt-1')}>{produto.paraQueServe}</p>
      {produto.fragrancia && <p className="mt-2 text-sm text-[#666666]">{produto.fragrancia}</p>}
      <h3 className={cn(C.TITULO_H3, 'mt-6')}>{V.painel.comoUsar}</h3>
      <p className={cn(C.CORPO, 'mt-1')}>{produto.comoUsar}</p>
      <h3 className={cn(C.TITULO_H3, 'mt-6')}>{V.painel.combinaCom}</h3>
      <ul className={cn(C.CORPO, 'mt-1 list-disc pl-5')}>
        {produto.combinaCom.map((n) => <li key={n}>{n}</li>)}
      </ul>
      <p className={cn(C.CORPO, 'mt-2')}>{V.painel.nosKits}{produto.nosKits.join(', ')}</p>
    </>
  )
}

export function DistribuidorCareProductDialog({ produto, aoFechar }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialogo.current
    if (produto && d && !d.open) {
      d.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
    return () => { document.documentElement.style.overflow = '' }   // limpa se desmontar com o painel aberto
  }, [produto])

  const fechar = () => dialogo.current?.close()

  return (
    <dialog
      ref={dialogo}
      aria-labelledby="dc-produto-titulo"
      onClose={() => { document.documentElement.style.overflow = ''; aoFechar() }}
      onClick={(e) => { if (e.target === e.currentTarget) fechar() }}
      className="m-0 mt-auto max-h-[85vh] border-0 w-full max-w-full rounded-t-[12px] bg-white p-0 backdrop:bg-black/50 supports-[height:100dvh]:max-h-[85dvh] md:m-auto md:max-h-[80vh] md:max-w-[640px] md:rounded-[12px]"
    >
      <div className="max-h-[inherit] overflow-y-auto overscroll-contain p-5 pb-[max(20px,env(safe-area-inset-bottom))] md:p-8">
        {produto && <Conteudo produto={produto} fechar={fechar} />}
      </div>
    </dialog>
  )
}
