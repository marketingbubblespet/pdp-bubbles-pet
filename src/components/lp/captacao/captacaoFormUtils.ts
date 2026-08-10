// Helpers de máscara/validação do formulário de captação (mesmo padrão de CareForm.tsx).
export type FormState = {
  name: string
  email: string
  whatsapp: string
  hasCnpj: 'yes' | 'no' | ''
  hasErp: 'yes' | 'no' | ''
  documento: string
  city: string
  targetCities: string
  businessModel: string
  previousBrands: string
  hasInvestment: 'yes' | 'no' | ''
}

export const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  whatsapp: '',
  hasCnpj: '',
  hasErp: '',
  documento: '',
  city: '',
  targetCities: '',
  businessModel: '',
  previousBrands: '',
  hasInvestment: '',
}

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function isPhoneValid(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

export function isEmailValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// CPF (000.000.000-00) até 11 dígitos; CNPJ (00.000.000/0000-00) a partir do 12º.
export function formatDoc(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 11) {
    if (d.length > 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
    if (d.length > 6) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
    if (d.length > 3) return `${d.slice(0, 3)}.${d.slice(3)}`
    return d
  }
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

export function isDocValid(value: string, hasCnpj: FormState['hasCnpj']): boolean {
  const digits = value.replace(/\D/g, '')
  return hasCnpj === 'no' ? digits.length === 11 : digits.length === 14
}

export function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 py-3 md:py-4 text-white text-sm focus:border-[#F4CDD4] outline-none transition-colors'
export const labelClass = 'text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block'
export const errorClass = 'text-red-400 text-[10px] mt-1 block'
