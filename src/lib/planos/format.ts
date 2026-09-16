// src/lib/planos/format.ts
// Formatação em pt-BR: moeda e data. Sem uso de Intl direto espalhado pelo código.

export function formatMoney(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Formata sem o símbolo R$, usado dentro de frases já prefixadas com "R$".
export function formatMoneyNumber(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Espera 'AAAA-MM-DD' (formato do YAML) e devolve 'DD/MM/AAAA'.
export function formatDateBR(isoDate: string): string {
  const [ano, mes, dia] = isoDate.split('-')
  if (!ano || !mes || !dia) return isoDate
  return `${dia}/${mes}/${ano}`
}

export function formatRoas(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatHoraAgora(): string {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function formatDataAgora(): string {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

// Regra número um do relatório: campo ausente vira "—", nunca 0 nem omitido em silêncio.
export function formatOuTraco(valor: number | null | undefined, formatador: (v: number) => string): string {
  return valor == null ? '—' : formatador(valor)
}

export function formatPct(valor: number, casas = 1): string {
  return `${valor >= 0 ? '' : ''}${valor.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`
}
