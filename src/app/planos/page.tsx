// src/app/planos/page.tsx
// Índice de todos os planos de ação, mais recentes primeiro.
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPlanos } from '@/lib/planos/fs'
import { formatDateBR, formatMoney } from '@/lib/planos/format'

export const metadata = {
  title: 'Planos de ação · Mídia paga',
  robots: { index: false, follow: false },
}

export default function PlanosIndex() {
  const planos = getAllPlanos()

  return (
    <main className="min-h-screen bg-[#F7F7F7] px-4 py-10">
      <div className="max-w-[800px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#E8649A] mb-1">Mídia paga</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Planos de ação</h1>

        {planos.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum plano de ação publicado ainda.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {planos.map((plano) => (
              <li key={plano.frontmatter.slug}>
                <Link
                  href={`/planos/${plano.frontmatter.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-[12px] border border-gray-200 bg-white px-5 py-4 hover:border-[#E8649A] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                      {formatDateBR(plano.frontmatter.gerado_em)} · {plano.frontmatter.cliente.nome} · {plano.frontmatter.canal}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">
                      {plano.frontmatter.nivel === 'anuncio' ? 'Análise por anúncio' : 'Análise por conjunto'}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Investimento na janela: {formatMoney(plano.frontmatter.investimento.janela)}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-[#E8649A] shrink-0 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
