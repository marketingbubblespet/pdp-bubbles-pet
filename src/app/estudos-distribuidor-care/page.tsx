// src/app/estudos-distribuidor-care/page.tsx
// Página interna de leitura: resumo dos estudos de mercado sobre captação de
// distribuidores da Linha Care. Sem formulário e sem GTM de propósito (não é LP de
// tráfego). Escondida do Google.
import type { Metadata } from 'next'
import { Estudo1Mercado } from '@/components/lp/estudos-care/Estudo1Mercado'
import { Estudo2Icp } from '@/components/lp/estudos-care/Estudo2Icp'
import { Estudo3Landing } from '@/components/lp/estudos-care/Estudo3Landing'
import { Estudo4MetaAds } from '@/components/lp/estudos-care/Estudo4MetaAds'
import { Estudo5Cosmeticos } from '@/components/lp/estudos-care/Estudo5Cosmeticos'
import { Callout, Lista } from '@/components/lp/estudos-care/ui'
import { SenhaGate } from '@/components/lp/estudos-care/SenhaGate'

export const metadata: Metadata = {
  title: 'Estudos Distribuidor Care | Bubbles Pet',
  description: 'Resumo dos estudos de mercado para captar distribuidores da Linha Care.',
  robots: { index: false, follow: false },
}

const ESTUDOS = [
  {
    id: 'estudo-1',
    curto: 'Mercado',
    titulo: 'Mercado, concorrentes e margem',
    frase: 'O frasco de R$ 40 precisa chegar ao distribuidor por cerca de R$ 15 a 17.',
  },
  {
    id: 'estudo-2',
    curto: 'ICP e pitch',
    titulo: 'Por que a revenda direta falhou',
    frase: 'O pet shop não vende cosmético. O distribuidor com vendedor de rota, sim, se tiver margem, exclusividade e display.',
  },
  {
    id: 'estudo-3',
    curto: 'Landing page',
    titulo: 'Página de credenciamento',
    frase: 'Falar de margem e logística, não de fragrância. Formulário em 3 etapas e kit só para quem se qualifica.',
  },
  {
    id: 'estudo-4',
    curto: 'Meta Ads',
    titulo: 'Anúncios com R$ 2.000 por mês',
    frase: 'Uma campanha aberta, praça controlada e formulário que filtra. Meta de 2 distribuidores com CAC perto de R$ 952.',
  },
  {
    id: 'estudo-5',
    curto: 'Cosméticos humanos',
    titulo: 'Expansão lateral',
    frase: 'Distribuidores de beleza para salões e perfumarias já têm a rota paga, e quase toda a margem vira lucro.',
  },
]

export default function EstudosDistribuidorCarePage() {
  return (
    <SenhaGate>
    <main className="min-h-screen bg-[#F7F7F7] text-[#0D0C0D]">
      <header className="mx-auto max-w-[1100px] px-4 pb-10 pt-12 md:pb-14 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">
          Linha Care · Captação de distribuidores
        </p>
        <h1 className="mt-3 text-3xl font-medium leading-[1.15] md:text-5xl">
          Estudos de mercado, resumidos
        </h1>
        <p className="mt-4 max-w-[760px] text-sm text-[#666666] md:text-base">
          Cinco pesquisas sobre como vender a Linha Care por distribuidores: concorrência, perfil ideal,
          página de captura, anúncios e um canal alternativo. Cada estudo tem o resumo em primeiro lugar,
          com tabelas e gráficos no lugar dos textos longos.
        </p>
      </header>

      <nav
        aria-label="Estudos"
        className="sticky top-0 z-10 border-y border-[#E5E7EB] bg-white/95 backdrop-blur"
      >
        <ul className="mx-auto flex max-w-[1100px] gap-2 overflow-x-auto px-4 py-2">
          {ESTUDOS.map((e, i) => (
            <li key={e.id} className="shrink-0">
              <a
                href={`#${e.id}`}
                className="flex min-h-[44px] items-center rounded-[12px] px-4 text-sm font-medium text-[#0D0C0D] hover:bg-[#FDF2F4]"
              >
                <span className="mr-2 text-[#E8649A]">{i + 1}</span>
                {e.curto}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mx-auto max-w-[1100px] px-4 py-12 md:py-16">
        <h2 className="text-2xl font-medium md:text-3xl">Leitura rápida</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ESTUDOS.map((e, i) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="rounded-[12px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-transform duration-200 hover:scale-[1.02]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">
                Estudo {i + 1}
              </p>
              <h3 className="mt-1 text-base font-medium">{e.titulo}</h3>
              <p className="mt-2 text-sm text-[#666666]">{e.frase}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Callout titulo="O que os estudos têm em comum">
            <Lista
              itens={[
                'O tomador de decisão olha margem, giro e proteção, não cheiro nem estética.',
                'O ganho do distribuidor vem de cosmético leve na mesma rota (carga pequena, margem alta).',
                'Exclusividade territorial e material de PDV desarmam as duas maiores objeções: guerra de preço e encalhe.',
                'Resposta rápida do comercial (5 a 15 minutos) decide o fechamento.',
              ]}
            />
          </Callout>
          <Callout titulo="Pontos de atenção antes de decidir">
            <Lista
              itens={[
                'Os números são referências dos estudos, não dados validados pela Bubbles.',
                'Confirmar sobre qual preço incidem os 45%. O exemplo do estudo 4 (custo de R$ 21,94 para venda a R$ 39,90) é a faixa que o estudo 1 reserva ao lojista, não ao distribuidor.',
                'Formato de captura divergente: o estudo 3 propõe landing page, o estudo 4 prefere formulário nativo do Meta (mais barato por lead, qualificação menor).',
                'Público divergente: distribuidor tradicional de ração (estudo 2) contra distribuidor de cosméticos humanos (estudo 5).',
                'Os enquadramentos de CNAE e de isenção no MAPA (estudo 5) merecem conferência com contador ou jurídico.',
              ]}
            />
          </Callout>
        </div>
      </section>

      <Estudo1Mercado />
      <Estudo2Icp />
      <Estudo3Landing />
      <Estudo4MetaAds />
      <Estudo5Cosmeticos />

      <footer className="border-t border-[#E5E7EB] py-10">
        <p className="mx-auto max-w-[1100px] px-4 text-sm text-[#666666]">
          Página interna de estudo. Resumo editorial dos relatórios originais, sem alteração dos números.
        </p>
      </footer>
    </main>
    </SenhaGate>
  )
}
