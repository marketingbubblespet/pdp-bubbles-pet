'use client'
// src/components/ui/DeliveryBadge.tsx
export function DeliveryBadge() {
  const today = new Date()
  const addDays = (d: Date, days: number) => {
    const r = new Date(d)
    r.setDate(r.getDate() + days)
    return r
  }
  const fmt = (d: Date) =>
    d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })

  return (
    <div className="mt-3 flex items-start gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3">
      <div className="w-6 h-6 bg-[#3DB85C] rounded-full flex items-center justify-center shrink-0 mt-0.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      </div>
      <div>
        <p className="text-[13px] font-bold text-[#0F0C0D]">
          Chegará entre {fmt(addDays(today, 2))} e {fmt(addDays(today, 7))}
        </p>
        <p className="text-[11px] text-[#6B7280] mt-0.5">Confirme o prazo final na próxima etapa.</p>
      </div>
    </div>
  )
}
