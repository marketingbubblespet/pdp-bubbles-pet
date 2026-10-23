'use client'
// B1 da LP /distribuidor-care: os 6 chips de "qual é o seu negócio?". Gravam a etapa 1 do formulário (mesmo estado),
// rolam até #cadastro e põem o foco em "Estado", tudo dentro do handler do clique (regra 40).
import { Check } from 'lucide-react'
import { DISTRIBUIDOR_CARE_HERO } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_TIPOS_NEGOCIO } from './distribuidorCareFormDados'
import { escolherTipo, useTipoNegocio } from './useDistribuidorCareForm'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

export function DistribuidorCareHeroChips() {
  const atual = useTipoNegocio()
  return (
    <div>
      <p id="dc-hero-chips-rotulo" className="text-sm font-semibold text-[#0D0C0D]">{DISTRIBUIDOR_CARE_HERO.rotuloChips}</p>
      <div role="group" id="dc-hero-chips" aria-labelledby="dc-hero-chips-rotulo" className="mt-2 grid grid-cols-2 gap-2">
        {DISTRIBUIDOR_CARE_TIPOS_NEGOCIO.map((t) => {
          const marcado = atual === t.value
          return (
            <button
              key={t.value}
              type="button"
              aria-pressed={marcado}
              onClick={() => escolherTipo(t.value)}
              className={`flex min-h-[48px] items-center gap-2 rounded-[12px] px-3 py-2 text-left text-sm font-medium leading-snug text-[#0D0C0D] ${C.FOCO} ${
                marcado ? 'border-2 border-[#E8649A] bg-[#FDF2F4]' : 'border border-[#888888] bg-white'
              }`}
            >
              {marcado && <Check size={16} aria-hidden="true" className="shrink-0 text-[#E8649A]" />}
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
