'use client'
// F2 da LP /distribuidor-care: popup de saída só no desktop com mouse. No máximo 1 vez a cada 5 minutos, nunca com o
// cadastro começado ou enviado, nunca com outro <dialog> aberto. Leva ao simulador com o foco no título.
import { useEffect, useRef } from 'react'
import { Calculator } from 'lucide-react'
import { pushExitPopupClick, pushExitPopupShown } from '@/lib/tracking'
import { DISTRIBUIDOR_CARE_POPUP as D } from '@/lib/distribuidor-care'
import { comportamento } from './useDistribuidorCareForm'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

const CHAVE = 'dc-exit-ultimo'
const CINCO_MIN = 5 * 60 * 1000
const LOCAL = 'distribuidor-care'
let ultimoEmMemoria = 0

function podeMostrar(): boolean {
  let salvo: number
  try { salvo = Number(sessionStorage.getItem(CHAVE) ?? 0) } catch {
    return ultimoEmMemoria === 0           // sem storage: no máximo 1 vez por carregamento
  }
  return Date.now() - Math.max(ultimoEmMemoria, salvo) >= CINCO_MIN
}
function marcarExibicao(): void {
  ultimoEmMemoria = Date.now()
  try { sessionStorage.setItem(CHAVE, String(ultimoEmMemoria)) } catch { /* só memória */ }
}

export function DistribuidorCareExitPopup({ bloqueado }: { bloqueado: boolean }) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const anterior = useRef<HTMLElement | null>(null)
  const irAoSimulador = useRef(false)

  useEffect(() => {
    if (bloqueado || !window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches) return
    const aoSair = (e: MouseEvent) => {
      const d = dialogo.current
      if (e.relatedTarget || e.clientY > 0 || !d || d.open || document.querySelector('dialog[open]') || !podeMostrar()) return
      anterior.current = document.activeElement as HTMLElement | null
      marcarExibicao()
      d.showModal()
      pushExitPopupShown(LOCAL)
    }
    document.addEventListener('mouseout', aoSair)
    return () => document.removeEventListener('mouseout', aoSair)
  }, [bloqueado])

  const aoFechar = () => {
    if (irAoSimulador.current) {
      irAoSimulador.current = false
      document.getElementById('simulador')?.scrollIntoView({ behavior: comportamento(), block: 'start' })
      document.getElementById('dc-titulo-simulador')?.focus({ preventScroll: true })
      return
    }
    anterior.current?.focus()
  }

  const verConta = () => {
    pushExitPopupClick(LOCAL)
    irAoSimulador.current = true
    dialogo.current?.close()
  }

  return (
    <dialog
      ref={dialogo}
      aria-labelledby="dc-popup-titulo"
      onClose={aoFechar}
      onClick={(e) => { if (e.target === e.currentTarget) dialogo.current?.close() }}
      className="m-auto w-[calc(100%-32px)] max-w-[480px] rounded-[12px] border-0 p-0 backdrop:bg-black/50"
    >
      <div className="p-6 text-center md:p-8">
        <Calculator size={28} aria-hidden="true" className="mx-auto text-[#E8649A]" />
        <h2 id="dc-popup-titulo" className="mt-3 text-xl font-medium text-[#0D0C0D] md:text-2xl">{D.titulo}</h2>
        <button type="button" autoFocus onClick={verConta} className={cn(C.BOTAO_PRIMARIO, 'mt-6 w-full')}>{D.cta}</button>
        <button type="button" onClick={() => dialogo.current?.close()} className={cn(C.LINK_TEXTO, 'mx-auto mt-2')}>{D.recusar}</button>
      </div>
    </dialog>
  )
}
