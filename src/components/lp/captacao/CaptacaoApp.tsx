'use client'
import { useCallback, useRef } from 'react'
import { CaptacaoHero } from './CaptacaoHero'
import { CaptacaoBenefitsMarquee } from './CaptacaoBenefitsMarquee'
import { CaptacaoProductLines } from './CaptacaoProductLines'
import { CaptacaoProfitability } from './CaptacaoProfitability'
import { CaptacaoRoiCalculator } from './CaptacaoRoiCalculator'
import { CaptacaoBrandStats } from './CaptacaoBrandStats'
import { CaptacaoCommunity } from './CaptacaoCommunity'
import { CaptacaoSupport } from './CaptacaoSupport'
import { CaptacaoTestimonials } from './CaptacaoTestimonials'
import { CaptacaoFinalCta } from './CaptacaoFinalCta'
import { CaptacaoFooter } from './CaptacaoFooter'
import dynamic from 'next/dynamic'
import { pushFormOpen } from '@/lib/tracking'

// Code-split (mesmo padrão da LP /care): formulário, popup de saída e barra fixa não
// aparecem na primeira dobra, então vão em pacotes separados e não atrasam o carregamento.
const CaptacaoForm = dynamic(() => import('./CaptacaoForm').then((m) => ({ default: m.CaptacaoForm })))
const CaptacaoStickyBar = dynamic(() => import('./CaptacaoStickyBar').then((m) => ({ default: m.CaptacaoStickyBar })))
const CaptacaoExitPopup = dynamic(() => import('./CaptacaoExitPopup').then((m) => ({ default: m.CaptacaoExitPopup })))
import { useFormModal } from './useFormModal'

export function CaptacaoApp() {
  const { isOpen, open, close } = useFormModal()
  const heroButtonRef = useRef<HTMLButtonElement>(null)

  const handleOpenForm = useCallback(() => {
    open()
    pushFormOpen('captacao-lead')
  }, [open])

  return (
    <div className="bg-[#0F0C0D] text-white selection:bg-[#F4CDD4] selection:text-[#0F0C0D] overflow-x-hidden pb-40">
      <CaptacaoHero onOpenForm={handleOpenForm} heroButtonRef={heroButtonRef} />
      <CaptacaoBenefitsMarquee />
      <CaptacaoProductLines />
      <CaptacaoProfitability />
      <CaptacaoRoiCalculator />
      <CaptacaoBrandStats />
      <CaptacaoCommunity />
      <CaptacaoSupport />
      <CaptacaoTestimonials />
      <CaptacaoFinalCta onOpenForm={handleOpenForm} />
      <CaptacaoFooter />

      <CaptacaoForm isOpen={isOpen} onClose={close} />
      <CaptacaoExitPopup onOpenForm={handleOpenForm} />
      <CaptacaoStickyBar onOpenForm={handleOpenForm} heroButtonRef={heroButtonRef} />
    </div>
  )
}
