// src/app/planos/[slug]/page.tsx
// Página de revisão/aprovação de relatório de análise de mídia paga. Server Component:
// lê o .md, compila o corpo em MDX, e entrega o frontmatter (dados puros, serializáveis)
// pro componente cliente que controla o estado de aprovação.
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPlanoSlugs, getPlanoBySlug } from '@/lib/planos/fs'
import { extrairSumario } from '@/lib/planos/slugify'
import { formatDateBR } from '@/lib/planos/format'
import { CabecalhoPlano } from '@/components/planos/CabecalhoPlano'
import { Sumario } from '@/components/planos/Sumario'
import { PlanoReviewClient } from '@/components/planos/PlanoReviewClient'
import { mdxComponents } from '@/components/planos/MdxTable'

export function generateStaticParams() {
  return getAllPlanoSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plano = getPlanoBySlug(slug)
  if (!plano) return { title: 'Plano não encontrado' }
  return {
    title: `${plano.frontmatter.canal} · ${plano.frontmatter.cliente.nome}`,
    // Página interna, enviada só por link direto: nunca deve aparecer em busca.
    robots: { index: false, follow: false },
  }
}

const NIVEL_LABEL: Record<string, string> = {
  campanha: 'Análise por campanha',
  conjunto: 'Análise por conjunto',
  grupo: 'Análise por conjunto',
  anuncio: 'Análise por anúncio',
}

export default async function PlanoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plano = getPlanoBySlug(slug)
  if (!plano) notFound()

  const sumario = extrairSumario(plano.content)

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Faixa de topo */}
      <header className="bg-white border-b border-[#E5E7EB] px-4 py-10 md:py-14">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3">
            Relatório · {plano.frontmatter.canal}
          </p>
          <h1 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] tracking-tight break-words">
            {NIVEL_LABEL[plano.frontmatter.nivel] ?? 'Análise'} · {plano.frontmatter.cliente.nome}
          </h1>
          <p className="text-sm text-[#666666] mt-2">
            Gerado em {formatDateBR(plano.frontmatter.gerado_em)}
          </p>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 py-8 md:py-10 flex gap-8">
        <Sumario itens={sumario} />

        <div className="min-w-0 flex-1 max-w-[1100px]">
          <CabecalhoPlano plano={plano.frontmatter} />

          {plano.content.trim() && (
            <div className="rounded-[20px] border border-gray-200 bg-white p-6 md:p-8 mb-8 flex flex-col gap-4">
              <MDXRemote
                source={plano.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          )}

          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#E8649A] mb-1">
              Revisão e decisões
            </p>
            <h2 className="text-xl font-medium text-[#0D0C0D]">O que aplicar</h2>
          </div>

          <PlanoReviewClient frontmatter={plano.frontmatter} />
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-[#E5E7EB] px-4 py-6 mt-12">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#888888]">
          <span>Bubbles · relatório interno, não indexado</span>
          <span>Relatório: {plano.frontmatter.slug}</span>
        </div>
      </footer>
    </main>
  )
}
