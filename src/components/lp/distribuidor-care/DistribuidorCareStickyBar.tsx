'use client'
// F1 da LP /distribuidor-care: barra fixa só no celular. Aparece quando os chips do hero saem da tela por cima,
// some com qualquer parte de #cadastro na tela e não volta depois do envio.
// [CONFIRMAR COM O GESTOR] esconder também com o B15 (#cta-final) visível (pendência 8); até lá, só as regras acima.
import { useEffect, useState } from 'react'
import { DISTRIBUIDOR_CARE_BARRA_FIXA as D } from '@/lib/distribuidor-care'
import { DistribuidorCareTrackedLink } from './DistribuidorCareTrackedLink'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function DistribuidorCareStickyBar({ oculta }: { oculta: boolean }) {
  const [passouDosChips, setPassouDosChips] = useState(false)
  const [cadastroVisivel, setCadastroVisivel] = useState(false)

  useEffect(() => {
    const chips = document.getElementById('dc-hero-chips')
    const cadastro = document.getElementById('cadastro')
    const obsChips = new IntersectionObserver(([e]) => {
      setPassouDosChips(!e.isIntersecting && e.boundingClientRect.top < 0)
    })
    const obsCadastro = new IntersectionObserver(([e]) => setCadastroVisivel(e.isIntersecting), { threshold: 0 })
    if (chips) obsChips.observe(chips)
    if (cadastro) obsCadastro.observe(cadastro)
    return () => { obsChips.disconnect(); obsCadastro.disconnect() }
  }, [])

  const visivel = passouDosChips && !cadastroVisivel && !oculta

  return (
    <div
      aria-hidden={visivel ? undefined : true}
      inert={!visivel}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E7EB] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-250 md:hidden ${
        visivel ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex items-center gap-3 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
        <p className="flex-1 text-xs font-medium leading-snug text-[#0D0C0D]">{D.texto}</p>
        <DistribuidorCareTrackedLink href="#cadastro" rotulo={D.cta} local="barra-fixa" className={cn(C.BOTAO_PRIMARIO, 'shrink-0 px-4 py-3 text-sm')}>
          {D.cta}
        </DistribuidorCareTrackedLink>
      </div>
    </div>
  )
}
