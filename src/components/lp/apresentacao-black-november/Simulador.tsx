'use client'
// Simulador da projeção: verba da Meta (30, 40, 45 ou 50 mil), cenário e melhorias de site.
import { useState } from 'react'
import {
  LOJA_2025,
  META_LINHAS,
  META_SEMANAS,
  PROJ,
  brl,
  pct,
  projetar,
  type Cenario,
} from '@/lib/apresentacao-black-november'

const btn = (on: boolean) =>
  `min-h-[44px] rounded-[12px] border px-4 text-sm font-medium ${
    on ? 'border-[#0D0C0D] bg-[#0D0C0D] text-white' : 'border-[#E5E7EB] bg-white text-[#0D0C0D] hover:bg-[#FDF2F4]'
  }`

const n0 = (v: number) => Math.round(v).toLocaleString('pt-BR')
const n2 = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function Simulador() {
  const [verba, setVerba] = useState<number>(30000)
  const [cen, setCen] = useState<Cenario>('base')
  const [site, setSite] = useState<number>(0)
  const p = projetar(verba, cen, site)
  const extra = verba - 30000

  return (
    <div className="space-y-8">
      <div className="space-y-3 rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)] md:p-6">
        <p className="text-sm font-medium text-[#0D0C0D]">Verba da Black na Meta</p>
        <div className="flex flex-wrap gap-2">
          {PROJ.verbas.map((v) => (
            <button key={v} type="button" className={btn(v === verba)} onClick={() => setVerba(v)}>
              {brl(v)}
            </button>
          ))}
        </div>
        <p className="pt-2 text-sm font-medium text-[#0D0C0D]">Como a conta responde ao dinheiro extra</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PROJ.cenarios) as Cenario[]).map((c) => (
            <button key={c} type="button" className={btn(c === cen)} onClick={() => setCen(c)}>
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <p className="pt-2 text-sm font-medium text-[#0D0C0D]">Melhorias de site</p>
        <div className="flex flex-wrap gap-2">
          {PROJ.site.map((s) => (
            <button key={s.valor} type="button" className={btn(s.valor === site)} onClick={() => setSite(s.valor)}>
              {s.rotulo}
              {s.valor ? ` (+${s.valor}%)` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          [brl(p.faturamento), `faturamento da loja em novembro (${n0(p.pedidosLoja)} pedidos × ${brl(PROJ.ticketLoja2026)})`],
          [pct(p.contra2025), `contra os ${brl(LOJA_2025.receita)} de 2025 (meta mínima: empatar)`],
          [brl(p.midiaTotal), `mídia total: Meta ${brl(verba)} + Google ${brl(PROJ.google2026)}`],
          [n2(p.roasLc), `ROAS de último clique da Meta (régua: 2,0)`],
        ].map(([v, r]) => (
          <div key={r} className="rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
            <p className="text-2xl font-semibold text-[#E8649A] md:text-3xl">{v}</p>
            <p className="mt-1 text-sm text-[#666666]">{r}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#FDF2F4]">
              {['', 'Meta', 'Google', 'Mídia total', 'Pedidos LC Meta', 'ROAS LC Meta', 'Pedidos da loja', 'Faturamento da loja', 'Contra 2025'].map((c) => (
                <th key={c} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#0D0C0D]">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#E5E7EB] text-[#666666]">
              <td className="px-4 py-3 font-medium text-[#0D0C0D]">2025 real</td>
              <td className="px-4 py-3">{brl(PROJ.verbaMeta2025)}</td>
              <td className="px-4 py-3">{brl(PROJ.google2025)}</td>
              <td className="px-4 py-3">{brl(PROJ.verbaMeta2025 + PROJ.google2025)}</td>
              <td className="px-4 py-3">{PROJ.pedidosLcMeta2025}</td>
              <td className="px-4 py-3">{n2(PROJ.receitaLcMeta2025 / PROJ.verbaMeta2025)}</td>
              <td className="px-4 py-3">{LOJA_2025.pedidos}</td>
              <td className="px-4 py-3">{brl(LOJA_2025.receita)}</td>
              <td className="px-4 py-3" />
            </tr>
            {PROJ.verbas.map((v) => {
              const x = projetar(v, cen, site)
              return (
                <tr key={v} className={`border-t border-[#E5E7EB] text-[#666666] ${v === verba ? 'bg-[#FDF2F4]' : ''}`}>
                  <td className="px-4 py-3 font-medium text-[#0D0C0D]">2026 · {cen}</td>
                  <td className="px-4 py-3">{brl(v)}</td>
                  <td className="px-4 py-3">{brl(PROJ.google2026)}</td>
                  <td className="px-4 py-3">{brl(x.midiaTotal)}</td>
                  <td className="px-4 py-3">{n0(x.pedidosLc)}</td>
                  <td className="px-4 py-3">{n2(x.roasLc)}</td>
                  <td className="px-4 py-3">{n0(x.pedidosLoja)}</td>
                  <td className="px-4 py-3 font-semibold text-[#0D0C0D]">{brl(x.faturamento)}</td>
                  <td className="px-4 py-3">{pct(x.contra2025)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-base font-medium text-[#0D0C0D]">Onde a verba da Meta vai ({brl(verba)})</p>
          <div className="space-y-3 rounded-[12px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)] md:p-6">
            {META_LINHAS.map((l) => {
              const v = l.base + l.extra * extra
              return (
                <div key={l.linha}>
                  <div className="mb-1 flex justify-between gap-3 text-sm">
                    <span className="text-[#0D0C0D]">{l.linha}</span>
                    <span className="font-semibold text-[#0D0C0D]">{brl(v)}</span>
                  </div>
                  <div className="h-3 w-full rounded-[4px] bg-[#F7F7F7]">
                    <div className="h-3 rounded-[4px] bg-[#E8649A]" style={{ width: `${(v / verba) * 100}%` }} />
                  </div>
                </div>
              )
            })}
            <p className="pt-1 text-sm text-[#666666]">
              Acima de R$ 30 mil: 60% prospecção, 10% Quente, 15% Impactados (pode começar em 20/11) e 15% de reserva
              liberada só com ROAS de último clique de 2,0 ou mais.
            </p>
          </div>
        </div>
        <div>
          <p className="mb-3 text-base font-medium text-[#0D0C0D]">Por semana</p>
          <div className="overflow-x-auto rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#FDF2F4]">
                  {['Semana', 'Verba', 'Por dia', '% do mês'].map((c) => (
                    <th key={c} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#0D0C0D]">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {META_SEMANAS.map((s) => {
                  const v = s.base + s.extra * extra
                  return (
                    <tr key={s.semana} className="border-t border-[#E5E7EB] text-[#666666]">
                      <td className="px-4 py-3 font-medium text-[#0D0C0D]">{s.semana}</td>
                      <td className="px-4 py-3">{brl(v)}</td>
                      <td className="px-4 py-3">{brl(v / s.dias)}</td>
                      <td className="px-4 py-3">{((v / verba) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
