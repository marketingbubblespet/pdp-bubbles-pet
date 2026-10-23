'use client'
// Primitivos do formulário da LP /distribuidor-care: campo de texto, select, grupo de opções, erro, honeypot e privacidade.
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import { Check, CircleAlert } from 'lucide-react'
import { DISTRIBUIDOR_CARE_LINKS } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_FORM as F } from './distribuidorCareFormDados'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

export function MensagemErro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-600">
      <CircleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
      {texto}
    </p>
  )
}

type CampoProps = {
  id: string
  rotulo: string
  erro?: string
  ajuda?: string
  obrigatorio?: boolean
  valor: string
  aoMudar: (v: string) => void
  aoSair: () => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange' | 'onBlur'>

export function CampoTexto({ id, rotulo, erro, ajuda, obrigatorio = true, valor, aoMudar, aoSair, ...resto }: CampoProps) {
  const idErro = `dc-erro-${id.replace(/^dc-/, '')}`
  const idAjuda = ajuda ? `dc-ajuda-${id.replace(/^dc-/, '')}` : ''
  const descricao = [idAjuda, erro ? idErro : ''].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#0D0C0D]">{rotulo}</label>
      <input
        id={id}
        value={valor}
        onChange={(e: ChangeEvent<HTMLInputElement>) => aoMudar(e.target.value)}
        onBlur={aoSair}
        aria-required={obrigatorio || undefined}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descricao}
        className={C.CAMPO}
        {...resto}
      />
      {ajuda && <p id={idAjuda} className="mt-1 text-xs text-[#666666]">{ajuda}</p>}
      <MensagemErro id={idErro} texto={erro} />
    </div>
  )
}

export function CampoEstado({ valor, erro, aoMudar, aoSair }: { valor: string; erro?: string; aoMudar: (v: string) => void; aoSair: () => void }) {
  return (
    <div>
      <label htmlFor="dc-estado" className="mb-1.5 block text-sm font-medium text-[#0D0C0D]">{F.rotulos.estado}</label>
      <select
        id="dc-estado"
        value={valor}
        autoComplete="address-level1"
        onChange={(e) => aoMudar(e.target.value)}
        onBlur={aoSair}
        aria-required="true"
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? 'dc-erro-estado' : undefined}
        className={C.CAMPO}
      >
        <option value="">{F.placeholders.estado}</option>
        {F.ufs.map((u) => <option key={u.sigla} value={u.sigla}>{u.nome}</option>)}
      </select>
      <MensagemErro id="dc-erro-estado" texto={erro} />
    </div>
  )
}

type GrupoProps = {
  id: string
  nome: string
  legenda: ReactNode
  opcoes: readonly { value: string; label: string }[]
  valor: string
  erro?: string
  colunas?: 1 | 2
  aoEscolher: (v: string) => void
}

export function GrupoOpcoes({ id, nome, legenda, opcoes, valor, erro, colunas = 2, aoEscolher }: GrupoProps) {
  const idErro = `dc-erro-${id.replace(/^dc-grupo-/, '')}`
  return (
    <fieldset id={id} className="scroll-mt-24" aria-describedby={erro ? idErro : undefined}>
      <legend className="mb-2 text-sm font-medium text-[#0D0C0D]">{legenda}</legend>
      <div className={`grid gap-2 ${colunas === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {opcoes.map((o) => {
          const marcado = valor === o.value
          return (
            <label
              key={o.value}
              className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[12px] px-4 py-2.5 text-sm font-medium text-[#0D0C0D] focus-within:ring-2 focus-within:ring-[#0D0C0D] focus-within:ring-offset-2 ${
                marcado ? 'border-2 border-[#E8649A] bg-[#FDF2F4]' : 'border border-[#888888] bg-white'
              }`}
            >
              <input
                type="radio"
                name={nome}
                value={o.value}
                checked={marcado}
                onChange={() => aoEscolher(o.value)}
                className="sr-only"
              />
              {marcado && <Check size={16} aria-hidden="true" className="shrink-0 text-[#E8649A]" />}
              <span>{o.label}</span>
            </label>
          )
        })}
      </div>
      <MensagemErro id={idErro} texto={erro} />
    </fieldset>
  )
}

export function Honeypot({ valor, aoMudar }: { valor: string; aoMudar: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        {F.honeypot}
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" value={valor} onChange={(e) => aoMudar(e.target.value)} />
      </label>
    </div>
  )
}

export function Privacidade() {
  return (
    <p className={cn(C.LEGAL, 'leading-relaxed')}>
      {F.privacidade.texto}{' '}
      <a href={DISTRIBUIDOR_CARE_LINKS.privacidade} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-4 ${C.FOCO}`}>
        {F.privacidade.link}
      </a>
    </p>
  )
}
