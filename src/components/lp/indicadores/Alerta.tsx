// Selo de alerta (no alvo / abaixo / muito abaixo) comparando com a meta da planilha.
import type { Nivel } from '@/lib/planos/indicadores'

const ESTILO: Record<Nivel, { texto: string; ponto: string; selo: string }> = {
  alvo: { texto: 'No alvo', ponto: 'bg-[#166534]' /* verde CTA #3DB85C é exclusivo de botão de compra */, selo: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]' },
  abaixo: { texto: 'Abaixo', ponto: 'bg-[#F4A522]', selo: 'bg-[#FFF8EB] border-[#F4A522] text-[#7A4B00]' },
  'muito-abaixo': { texto: 'Muito abaixo', ponto: 'bg-red-400', selo: 'bg-[#FDF2F4] border-red-400 text-[#B4235F]' },
}

export function SeloAlerta({ nivel, meta }: { nivel: Nivel | null; meta: string }) {
  if (!nivel) return null
  const e = ESTILO[nivel]
  return (
    <span className={`mt-2 inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 text-[11px] font-semibold ${e.selo}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${e.ponto}`} />
      {e.texto} · meta {meta}
    </span>
  )
}

// Versão compacta para a tabela: só a bolinha colorida, com o texto para leitor de tela.
export function PontoAlerta({ nivel }: { nivel: Nivel | null }) {
  if (!nivel) return null
  const e = ESTILO[nivel]
  return (
    <span className={`mr-1.5 inline-block h-2 w-2 rounded-full align-middle ${e.ponto}`} title={e.texto}>
      <span className="sr-only">{e.texto}</span>
    </span>
  )
}
