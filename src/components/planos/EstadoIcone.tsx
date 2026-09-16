import { Circle, CheckCircle2, XCircle } from 'lucide-react'
import type { Decisao } from '@/lib/planos/types'

const CONFIG: Record<Decisao, { Icon: typeof Circle; className: string; rotulo: string }> = {
  pendente: { Icon: Circle, className: 'text-gray-400', rotulo: 'Pendente' },
  aprovado: { Icon: CheckCircle2, className: 'text-[#3DB85C]', rotulo: 'Aprovado' },
  reprovado: { Icon: XCircle, className: 'text-red-600', rotulo: 'Não aplicada' },
}

export function EstadoIcone({ decisao, size = 16 }: { decisao: Decisao; size?: number }) {
  const { Icon, className, rotulo } = CONFIG[decisao]
  return <Icon size={size} className={className} aria-label={rotulo} />
}

export function EstadoTexto({ decisao }: { decisao: Decisao }) {
  const { className, rotulo } = CONFIG[decisao]
  return <span className={`text-xs font-semibold ${className}`}>{rotulo}</span>
}
