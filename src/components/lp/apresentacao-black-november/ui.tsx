// Peças visuais da apresentação /apresentacao-black-november. Tokens do DESIGN-SYSTEM.md (tema claro).
// Nada aqui é botão de compra, então sem verde.
import type { ReactNode } from 'react'
import Image from 'next/image'
import { SECOES, numeroDaSecao, type SecaoId } from '@/lib/apresentacao-black-november'
import { Roteiro } from './Apresentador'

export function Secao({
  id,
  resumo,
  roteiro,
  pergunta,
  children,
}: {
  id: SecaoId
  resumo: ReactNode
  roteiro?: string[]
  pergunta?: { p: string; r: string }
  children: ReactNode
}) {
  const s = SECOES.find((x) => x.id === id)!
  return (
    <section id={id} data-secao className="scroll-mt-16 border-t border-[#E5E7EB] py-12 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">
          {String(numeroDaSecao(id)).padStart(2, '0')} · {s.curto} · {s.minutos} min
        </p>
        <h2 className="mt-2 text-2xl font-medium text-[#0D0C0D] md:text-4xl">{s.titulo}</h2>
        <div className="mt-3 max-w-[820px] text-base text-[#666666] md:text-lg">{resumo}</div>
        {roteiro && <Roteiro itens={roteiro} pergunta={pergunta} />}
        <div className="mt-8 space-y-10">{children}</div>
      </div>
    </section>
  )
}

export function Bloco({ titulo, nota, children }: { titulo: string; nota?: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-[#0D0C0D] md:text-xl">{titulo}</h3>
      {children}
      {nota && <p className="mt-3 text-sm text-[#666666]">{nota}</p>}
    </div>
  )
}

export function Numeros({ itens }: { itens: { valor: string; rotulo: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {itens.map((i) => (
        <div key={i.rotulo} className="rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
          <p className="text-2xl font-semibold text-[#E8649A] md:text-3xl">{i.valor}</p>
          <p className="mt-1 text-sm text-[#666666]">{i.rotulo}</p>
        </div>
      ))}
    </div>
  )
}

export function Tabela({
  cabecalho,
  linhas,
  destaque,
  minimo = 620,
}: {
  cabecalho: string[]
  linhas: ReactNode[][]
  destaque?: number[]
  minimo?: number
}) {
  return (
    <div className="overflow-x-auto rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <table className="w-full border-collapse text-left text-sm" style={{ minWidth: minimo }}>
        <thead>
          <tr className="bg-[#FDF2F4]">
            {cabecalho.map((c) => (
              <th key={c} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#0D0C0D]">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, li) => (
            <tr
              key={li}
              className={`border-t border-[#E5E7EB] align-top ${destaque?.includes(li) ? 'bg-[#FDF2F4]' : ''}`}
            >
              {l.map((c, idx) => (
                <td
                  key={idx}
                  className={`px-4 py-3 ${idx === 0 ? 'font-medium text-[#0D0C0D]' : 'text-[#666666]'}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Barras({
  itens,
  nota,
}: {
  itens: { rotulo: string; valor: string; largura: number; destaque?: boolean }[]
  nota?: string
}) {
  return (
    <div className="space-y-3 rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)] md:p-6">
      {itens.map((i) => (
        <div key={i.rotulo}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="text-[#0D0C0D]">{i.rotulo}</span>
            <span className="font-semibold text-[#0D0C0D]">{i.valor}</span>
          </div>
          <div className="h-3 w-full rounded-[4px] bg-[#F7F7F7]">
            <div
              className="h-3 rounded-[4px]"
              style={{ width: `${i.largura}%`, background: i.destaque ? '#E8649A' : '#F4CDD4' }}
            />
          </div>
        </div>
      ))}
      {nota && <p className="pt-1 text-sm text-[#666666]">{nota}</p>}
    </div>
  )
}

export function Callout({ titulo, children, escuro }: { titulo: string; children: ReactNode; escuro?: boolean }) {
  return (
    <div
      className={`rounded-[20px] p-5 md:p-6 ${
        escuro ? 'bg-[#0D0C0D] text-white' : 'border border-[#F4CDD4] bg-[#FDF2F4] text-[#0D0C0D]'
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest ${escuro ? 'text-[#F4CDD4]' : 'text-[#E8649A]'}`}>
        {titulo}
      </p>
      <div className="mt-2 space-y-2 text-sm md:text-base">{children}</div>
    </div>
  )
}

export function Lista({ itens, claro }: { itens: ReactNode[]; claro?: boolean }) {
  return (
    <ul className={`space-y-2 text-sm md:text-base ${claro ? 'text-white' : 'text-[#666666]'}`}>
      {itens.map((i, idx) => (
        <li key={idx} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8649A]" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  )
}

export function Cards({
  itens,
  colunas = 3,
}: {
  itens: { titulo: string; selo?: string; texto: ReactNode }[]
  colunas?: 2 | 3 | 4
}) {
  const grid = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[colunas]
  return (
    <div className={`grid gap-4 ${grid}`}>
      {itens.map((i) => (
        <div key={i.titulo} className="rounded-[12px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
          {i.selo && (
            <span className="mb-2 inline-block rounded-[4px] bg-[#F4CDD4] px-2 py-0.5 text-xs font-semibold text-[#0D0C0D]">
              {i.selo}
            </span>
          )}
          <h4 className="text-base font-medium text-[#0D0C0D]">{i.titulo}</h4>
          <div className="mt-2 space-y-2 text-sm text-[#666666]">{i.texto}</div>
        </div>
      ))}
    </div>
  )
}

export function Passos({ itens }: { itens: { marca: string; titulo: string; texto: ReactNode }[] }) {
  return (
    <ol className="space-y-3">
      {itens.map((i) => (
        <li key={i.marca + i.titulo} className="flex gap-4 rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
          <span className="flex min-h-11 w-20 shrink-0 items-center justify-center rounded-[12px] bg-[#0D0C0D] px-2 text-center text-xs font-semibold text-[#F4CDD4]">
            {i.marca}
          </span>
          <div>
            <p className="text-sm font-medium text-[#0D0C0D]">{i.titulo}</p>
            <div className="mt-0.5 text-sm text-[#666666]">{i.texto}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}

// Imagem com legenda. `largura` é a largura exibida em px (vira o `sizes`).
export function Figura({
  src,
  alt,
  w,
  h,
  largura,
  legenda,
  destaque,
}: {
  src: string
  alt: string
  w: number
  h: number
  largura: number
  legenda?: string
  destaque?: boolean
}) {
  return (
    <figure className="m-0" style={{ maxWidth: largura }}>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={`(max-width: 767px) 90vw, ${largura}px`}
        className={`h-auto w-full rounded-[12px] ${destaque ? 'border-2 border-[#E8649A]' : 'border border-[#E5E7EB]'}`}
      />
      {legenda && <figcaption className="mt-2 text-xs text-[#666666] md:text-sm">{legenda}</figcaption>}
    </figure>
  )
}

export function LinkInterno({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex min-h-[44px] items-center rounded-[12px] border border-[#0D0C0D] px-4 text-sm font-medium text-[#0D0C0D] hover:bg-[#FDF2F4]"
    >
      {children} ↗
    </a>
  )
}
