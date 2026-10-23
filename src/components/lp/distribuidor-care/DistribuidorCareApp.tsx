'use client'
// Composição da LP /distribuidor-care. Estáticos: B0, B1, B2 e o formulário (B13), porque os chips da primeira dobra
// escrevem nele. Demais blocos com dynamic() (SSR); barra fixa e popup de saída só no cliente.
// A ponte entre blocos é o módulo de estado de useDistribuidorCareForm (sem levantar o estado do formulário).
import dynamic from 'next/dynamic'
import { DistribuidorCareHeader } from './DistribuidorCareHeader'
import { DistribuidorCareHero } from './DistribuidorCareHero'
import { DistribuidorCareTicker } from './DistribuidorCareTicker'
import { DistribuidorCareForm } from './DistribuidorCareForm'   // import ESTÁTICO, nunca dynamic()
import { useStatusCadastro } from './useDistribuidorCareForm'

const DistribuidorCareChanges = dynamic(() => import('./DistribuidorCareChanges').then((m) => ({ default: m.DistribuidorCareChanges })))
const DistribuidorCareWhySells = dynamic(() => import('./DistribuidorCareWhySells').then((m) => ({ default: m.DistribuidorCareWhySells })))
const DistribuidorCareCalculator = dynamic(() => import('./DistribuidorCareCalculator').then((m) => ({ default: m.DistribuidorCareCalculator })))
const DistribuidorCareProducts = dynamic(() => import('./DistribuidorCareProducts').then((m) => ({ default: m.DistribuidorCareProducts })))
const DistribuidorCareDemand = dynamic(() => import('./DistribuidorCareDemand').then((m) => ({ default: m.DistribuidorCareDemand })))
const DistribuidorCareSupport = dynamic(() => import('./DistribuidorCareSupport').then((m) => ({ default: m.DistribuidorCareSupport })))
const DistribuidorCareRegion = dynamic(() => import('./DistribuidorCareRegion').then((m) => ({ default: m.DistribuidorCareRegion })))
const DistribuidorCareBrand = dynamic(() => import('./DistribuidorCareBrand').then((m) => ({ default: m.DistribuidorCareBrand })))
const DistribuidorCareTestimonials = dynamic(() => import('./DistribuidorCareTestimonials').then((m) => ({ default: m.DistribuidorCareTestimonials })))
const DistribuidorCareHowItWorks = dynamic(() => import('./DistribuidorCareHowItWorks').then((m) => ({ default: m.DistribuidorCareHowItWorks })))
const DistribuidorCareFaq = dynamic(() => import('./DistribuidorCareFaq').then((m) => ({ default: m.DistribuidorCareFaq })))
const DistribuidorCareFinalCta = dynamic(() => import('./DistribuidorCareFinalCta').then((m) => ({ default: m.DistribuidorCareFinalCta })))
const DistribuidorCareFooter = dynamic(() => import('./DistribuidorCareFooter').then((m) => ({ default: m.DistribuidorCareFooter })))
const DistribuidorCareStickyBar = dynamic(() => import('./DistribuidorCareStickyBar').then((m) => ({ default: m.DistribuidorCareStickyBar })), { ssr: false })
const DistribuidorCareExitPopup = dynamic(() => import('./DistribuidorCareExitPopup').then((m) => ({ default: m.DistribuidorCareExitPopup })), { ssr: false })

export function DistribuidorCareApp() {
  const status = useStatusCadastro() // 'inicial' | 'em_andamento' | 'enviado'
  return (
    <>
      <DistribuidorCareHeader />
      <main className="pb-24 md:pb-20">
        <DistribuidorCareHero />
        <DistribuidorCareTicker />
        <DistribuidorCareChanges />
        <DistribuidorCareWhySells />
        <DistribuidorCareCalculator />
        <DistribuidorCareProducts />
        <DistribuidorCareDemand />
        <DistribuidorCareSupport />
        <DistribuidorCareRegion />
        <DistribuidorCareBrand />
        <DistribuidorCareTestimonials />
        <DistribuidorCareHowItWorks />
        <DistribuidorCareForm />
        <DistribuidorCareFaq />
        <DistribuidorCareFinalCta />
      </main>
      <DistribuidorCareFooter />
      <DistribuidorCareStickyBar oculta={status === 'enviado'} />
      <DistribuidorCareExitPopup bloqueado={status !== 'inicial'} />
    </>
  )
}
