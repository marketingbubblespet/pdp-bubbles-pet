// Mídia da LP /distribuidor-care: foto real ou placeholder honesto (P-01 a P-08).
// Sem 'use client'. O pai define proporção, raio e `relative overflow-hidden`; este componente ocupa `absolute inset-0`.
// Também centraliza as receitas de classe da página (§5.3 e §8.0 do super prompt).
import Image from 'next/image'
import {
  BadgeCheck, BookOpen, Camera, Clock, FileText, GraduationCap, Layers, Megaphone, PackagePlus, Percent, Play,
  RefreshCw, Rocket, Smartphone, Sparkles, Star, Store, TrendingUp, Truck,
} from 'lucide-react'
import { DISTRIBUIDOR_CARE_MIDIA, type CodigoMidia, type IconeDistribuidorCare } from '@/lib/distribuidor-care'
import { DistribuidorCareVideo } from './DistribuidorCareVideo'

const FOCO = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0C0D] focus-visible:ring-offset-2'

export const DISTRIBUIDOR_CARE_CLASSES = {
  FOCO,
  BOTAO_PRIMARIO: `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-[#3DB85C] px-6 py-3 text-base font-semibold text-[#0D0C0D] transition duration-200 hover:brightness-110 motion-safe:hover:scale-[1.02] motion-safe:active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:px-8 md:py-4 ${FOCO}`,
  BOTAO_NEUTRO: `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] bg-[#0D0C0D] px-6 py-3 text-base font-semibold text-white transition duration-200 hover:bg-[#0D0C0D]/90 disabled:cursor-not-allowed disabled:opacity-60 md:px-8 md:py-4 ${FOCO}`,
  BOTAO_SECUNDARIO: `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-[#0D0C0D] bg-white px-6 py-3 text-base font-semibold text-[#0D0C0D] transition duration-200 hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-60 ${FOCO}`,
  LINK_TEXTO: `inline-flex min-h-[44px] items-center gap-1.5 text-[#0D0C0D] underline underline-offset-4 hover:text-[#666666] ${FOCO}`,
  EYEBROW: 'inline-block rounded-full bg-[#FDF2F4] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#0D0C0D]',
  TITULO_H2: 'text-2xl md:text-3xl font-medium text-[#0D0C0D]',
  TITULO_H3: 'text-base md:text-lg font-medium text-[#0D0C0D]',
  CORPO: 'text-sm md:text-base leading-relaxed text-[#666666]',
  LEGAL: 'text-xs text-[#666666]',
  CARTAO: 'bg-white rounded-[12px] border border-[#E5E7EB] p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)]',
  PILULA: 'inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E5E7EB] px-3 py-1.5 text-xs font-semibold text-[#0D0C0D]',
  CONTAINER: 'max-w-[1100px] mx-auto px-4',
  SECAO: 'py-16 md:py-24',
  CAMPO: 'w-full min-h-[48px] rounded-[12px] border border-[#888888] bg-white px-4 text-base text-[#0D0C0D] placeholder:text-[#666666] focus:border-[#0D0C0D] aria-[invalid=true]:border-red-600 disabled:bg-[#F7F7F7] disabled:text-[#666666] ' + FOCO,
} as const

const ICONES = {
  TrendingUp, BadgeCheck, Sparkles, RefreshCw, PackagePlus, Store, Layers, Percent, Clock,
  Smartphone, Megaphone, Rocket, Star, GraduationCap, FileText, BookOpen, Truck,
} as const

/** Ícone decorativo pelo nome guardado nos dados (os dados não importam componente). */
export function IconeDc({ nome, size = 22, className = 'text-[#E8649A]' }: { nome: IconeDistribuidorCare; size?: number; className?: string }) {
  const Icone = ICONES[nome]
  return <Icone size={size} aria-hidden="true" className={className} />
}

type Props = {
  codigo: CodigoMidia
  src?: string | null
  alt?: string
  sizes?: string
  poster?: string | null
  descricao?: string
  ariaLabel?: string
  className?: string
}

function srcPadrao(codigo: CodigoMidia): string | null {
  const m = DISTRIBUIDOR_CARE_MIDIA[codigo]
  if ('src' in m) return m.src
  return m.mobile ?? m.desktop
}

export function DistribuidorCareMedia({ codigo, src, alt = '', sizes = '100vw', poster = null, descricao, ariaLabel, className = '' }: Props) {
  const midia = DISTRIBUIDOR_CARE_MIDIA[codigo]
  const arquivo = src === undefined ? srcPadrao(codigo) : src

  if (!arquivo) {
    const Icone = midia.tipo === 'video' ? Play : Camera
    return (
      <div
        data-placeholder={codigo}
        aria-hidden="true"
        className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center bg-[#F7F7F7] border-2 border-dashed border-[#F4CDD4] rounded-[12px] ${className}`}
      >
        <Icone size={28} className="text-[#E8649A]" />
        <span className="text-xs font-semibold tracking-widest text-[#0D0C0D]">{codigo}</span>
        <span className="text-xs text-[#666666]">{descricao ?? midia.descricao}</span>
        <span className="text-xs text-[#666666]">{midia.dimensoes}</span>
      </div>
    )
  }

  if (midia.tipo === 'video') {
    return <DistribuidorCareVideo src={arquivo} poster={poster} ariaLabel={ariaLabel} className={className} />
  }

  return <Image src={arquivo} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />
}
