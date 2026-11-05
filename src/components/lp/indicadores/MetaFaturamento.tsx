// Meta de faturamento do mês: como estamos em relação ao esperado até ontem
// (meta do mês ÷ dias do mês × dias fechados) e quanto já faturamos do total.
import type { ReactNode } from 'react'
import { formatMoney, formatPct } from '@/lib/planos/format'
import { ritmoMeta, type Indicadores } from '@/lib/planos/indicadores'

const SELO = {
  dentro: { texto: 'Dentro do esperado', classe: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]' },
  atencao: { texto: 'Atenção: um pouco abaixo', classe: 'bg-[#FFF8EB] border-[#F4A522] text-[#7A4B00]' },
  fora: { texto: 'Fora do esperado', classe: 'bg-[#FDF2F4] border-[#E8649A] text-[#B4235F]' },
  inicio: { texto: 'Início do mês', classe: 'bg-[#F7F7F7] border-[#E5E7EB] text-[#666666]' },
}

function Bloco({ rotulo, pct, linha1, linha2 }: { rotulo: string; pct: string; linha1: ReactNode; linha2: ReactNode }) {
  return (
    <div className="rounded-[12px] bg-[#F7F7F7] px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666666]">{rotulo}</p>
      <p className="mt-0.5 text-[15px] font-semibold text-[#0D0C0D]">{pct}</p>
      <p className="mt-0.5 text-xs text-[#666666]">{linha1}</p>
      <p className="text-xs text-[#666666]">{linha2}</p>
    </div>
  )
}

export function MetaFaturamento({ dados, hoje }: { dados: Indicadores; hoje: string }) {
  const r = ritmoMeta(dados, hoje)
  const atingido = r.faturado / r.meta
  const marcaEsperado = Math.min(100, (r.esperado / r.meta) * 100)
  const selo = SELO[r.status]
  const dif = r.diferenca

  return (
    <section className="rounded-[12px] border border-[#E5E7EB] bg-white p-4 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">Meta de faturamento · Groomer & Tutor (Care)</p>
          <p className="mt-2 text-lg md:text-2xl font-semibold text-[#0D0C0D]">
            {formatMoney(r.faturado)} <span className="font-normal text-[#666666]">de {formatMoney(r.meta)}</span>
          </p>
        </div>
        <span className={`rounded-[4px] border px-3 py-1.5 text-xs font-semibold ${selo.classe}`}>{selo.texto}</span>
      </div>

      {/* Barra de progresso: cresce ao carregar e tem um brilho passando (sensação de avanço) */}
      <div className="relative mt-4 h-[21px] rounded-full bg-[#F7F7F7] border border-[#E5E7EB]">
        <div className="ind-barra relative h-full overflow-hidden rounded-full bg-[#E8649A]" style={{ width: `${Math.min(100, atingido * 100)}%` }}>
          <span className="ind-brilho absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent" aria-hidden />
        </div>
        {r.esperado > 0 && (
          <div className="absolute -top-1.5 -bottom-1.5 w-0.5 bg-[#0D0C0D]" style={{ left: `${marcaEsperado}%` }} aria-hidden />
        )}
      </div>
      <p className="mt-2 text-xs text-[#666666]">O traço preto marca onde deveríamos estar até ontem.</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Bloco
          rotulo={`Do esperado até ontem (${r.diasFechados} ${r.diasFechados === 1 ? 'dia' : 'dias'})`}
          pct={r.ritmo == null ? '—' : `${formatPct(r.ritmo * 100)} do esperado`}
          linha1={`Esperado até ontem: ${formatMoney(r.esperado)}`}
          linha2={r.ritmo == null ? 'Ainda sem dia fechado' : `${dif >= 0 ? 'Acima' : 'Abaixo'} em ${formatMoney(Math.abs(dif))}`}
        />
        <Bloco
          rotulo="Do total do mês"
          pct={`${formatPct(atingido * 100)} atingido`}
          linha1={<><span className="font-semibold text-[#0D0C0D]">{formatMoney(r.faturado)}</span> de {formatMoney(r.meta)}</>}
          linha2={r.projecao == null ? `Falta ${formatMoney(Math.max(0, r.meta - r.faturado))}` : `Projeção no ritmo atual: ${formatMoney(r.projecao)}`}
        />
      </div>
      <p className="mt-3 text-xs text-[#666666]">
        O esperado segue a curva da Black: dias comuns pesam 1, o 11.11 pesa 2,5 e de 27/11 em diante (Black Friday e Cyber Monday) pesam de 2 a 3.
        Faturado = Groomer + Tutor (Care).
      </p>
    </section>
  )
}
