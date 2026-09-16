'use client'
import { useEffect, useState } from 'react'
import type { ItemSumario } from '@/lib/planos/slugify'

// Sumário fixo à esquerda com destaque automático da seção ativa (scroll spy), solto no
// fundo claro da página — sem caixa própria, como referência de navegação lateral.
export function Sumario({ itens }: { itens: ItemSumario[] }) {
  const [ativo, setAtivo] = useState<string | null>(itens[0]?.slug ?? null)

  useEffect(() => {
    const secoes = itens
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => el !== null)
    if (secoes.length === 0) return

    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) setAtivo(visivel.target.id)
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    for (const secao of secoes) observer.observe(secao)
    return () => observer.disconnect()
    // Só precisa reobservar se a lista de seções mudar (novo relatório carregado).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itens.map((i) => i.slug).join(',')])

  if (itens.length === 0) return null

  return (
    <nav aria-label="Sumário" className="hidden lg:block sticky top-8 self-start w-[200px] shrink-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#888888] mb-3">Sumário</p>
      <ol className="flex flex-col border-l border-[#E5E7EB]">
        {itens.map((item, i) => {
          const estaAtivo = item.slug === ativo
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                className={`flex items-baseline gap-2 py-2 pl-4 -ml-px border-l-2 transition-colors ${
                  estaAtivo ? 'border-[#E8649A]' : 'border-transparent hover:border-[#F4CDD4]'
                }`}
              >
                <span
                  className={`text-xs font-semibold tabular-nums shrink-0 w-5 ${
                    estaAtivo ? 'text-[#E8649A]' : 'text-gray-300'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-sm leading-snug ${
                    estaAtivo ? 'text-[#0D0C0D] font-medium' : 'text-[#666666]'
                  }`}
                >
                  {item.titulo}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
