// Peças visuais reutilizadas pelos 5 estudos da página /estudos-distribuidor-care.
// Só tokens do DESIGN-SYSTEM.md (tema claro). Nada aqui é botão de compra, então sem verde.
import type { ReactNode } from 'react'

export function EstudoSecao({
  id,
  numero,
  titulo,
  resumo,
  children,
}: {
  id: string
  numero: number
  titulo: string
  resumo: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-[#E5E7EB] py-12 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">
          Estudo {numero}
        </p>
        <h2 className="mt-2 text-2xl font-medium text-[#0D0C0D] md:text-3xl">{titulo}</h2>
        <p className="mt-3 max-w-[760px] text-sm text-[#666666] md:text-base">{resumo}</p>
        <div className="mt-8 space-y-10">{children}</div>
      </div>
    </section>
  )
}

export function Bloco({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-[#0D0C0D]">{titulo}</h3>
      {children}
    </div>
  )
}

export function Numeros({ itens }: { itens: { valor: string; rotulo: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {itens.map((i) => (
        <div
          key={i.rotulo}
          className="rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)]"
        >
          <p className="text-2xl font-semibold text-[#E8649A] md:text-3xl">{i.valor}</p>
          <p className="mt-1 text-sm text-[#666666]">{i.rotulo}</p>
        </div>
      ))}
    </div>
  )
}

export function Tabela({ cabecalho, linhas }: { cabecalho: string[]; linhas: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
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
          {linhas.map((l) => (
            <tr key={l[0]} className="border-t border-[#E5E7EB] align-top">
              {l.map((c, idx) => (
                <td
                  key={idx}
                  className={`px-4 py-3 text-[#666666] ${idx === 0 ? 'font-medium text-[#0D0C0D]' : ''}`}
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

// Barras horizontais: `largura` é a % da barra (só visual), `valor` é o texto exibido.
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
              style={{
                width: `${i.largura}%`,
                background: i.destaque ? '#E8649A' : '#F4CDD4',
              }}
            />
          </div>
        </div>
      ))}
      {nota && <p className="pt-1 text-sm text-[#666666]">{nota}</p>}
    </div>
  )
}

export function Callout({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="rounded-[20px] border border-[#F4CDD4] bg-[#FDF2F4] p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">{titulo}</p>
      <div className="mt-2 space-y-2 text-sm text-[#0D0C0D] md:text-base">{children}</div>
    </div>
  )
}

export function Lista({ itens }: { itens: ReactNode[] }) {
  return (
    <ul className="space-y-2 text-sm text-[#666666] md:text-base">
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
  colunas?: 2 | 3
}) {
  return (
    <div className={`grid gap-4 ${colunas === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {itens.map((i) => (
        <div
          key={i.titulo}
          className="rounded-[12px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)]"
        >
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

// Linha do tempo vertical simples (cadência de prospecção).
export function Passos({ itens }: { itens: { marca: string; titulo: string; texto: string }[] }) {
  return (
    <ol className="space-y-3">
      {itens.map((i) => (
        <li
          key={i.marca + i.titulo}
          className="flex gap-4 rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)]"
        >
          <span className="flex h-11 w-16 shrink-0 items-center justify-center rounded-[12px] bg-[#0D0C0D] text-xs font-semibold text-[#F4CDD4]">
            {i.marca}
          </span>
          <div>
            <p className="text-sm font-medium text-[#0D0C0D]">{i.titulo}</p>
            <p className="mt-0.5 text-sm text-[#666666]">{i.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
