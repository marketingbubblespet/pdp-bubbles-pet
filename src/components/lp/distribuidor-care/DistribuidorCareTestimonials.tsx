'use client'
// B11 da LP /distribuidor-care: depoimentos de distribuidores (literais) e a prova dos groomers. Sem estrela,
// selo, foto ou cargo. Texto inteiro sempre no DOM; "Ler mais" só tira o corte visual.
import { useState } from 'react'
import { Quote, Users } from 'lucide-react'
import { DISTRIBUIDOR_CARE_DEPOIMENTOS, DISTRIBUIDOR_CARE_PROVA as P } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

function Depoimento({ empresa, texto, n }: { empresa: string; texto: string; n: number }) {
  const [aberto, setAberto] = useState(false)
  const longo = texto.length > 300
  const id = `dc-depoimento-${n}`
  return (
    <figure className={cn(C.CARTAO, 'flex h-full flex-col')}>
      <Quote size={20} aria-hidden="true" className="text-[#F4CDD4]" />
      <blockquote className="mt-3 flex-1">
        <p id={id} className={`${C.CORPO} ${longo && !aberto ? 'line-clamp-6' : ''}`}>{texto}</p>
      </blockquote>
      {longo && (
        <button type="button" aria-expanded={aberto} aria-controls={id} onClick={() => setAberto(!aberto)}
          className={cn(C.LINK_TEXTO, 'self-start text-sm')}>
          {aberto ? P.lerMenos : P.lerMais}
        </button>
      )}
      <figcaption className="mt-3 text-sm font-semibold text-[#0D0C0D]">{empresa}</figcaption>
    </figure>
  )
}

export function DistribuidorCareTestimonials() {
  return (
    <section aria-labelledby="dc-titulo-prova" className={`bg-[#F7F7F7] ${C.SECAO}`}>
      <div className={C.CONTAINER}>
        <h2 id="dc-titulo-prova" className={cn(C.TITULO_H2, 'text-center')}>{P.titulo}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {DISTRIBUIDOR_CARE_DEPOIMENTOS.map((d, i) => <Depoimento key={d.empresa} empresa={d.empresa} texto={d.texto} n={i + 1} />)}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-white p-5">
          <Users size={22} aria-hidden="true" className="shrink-0 text-[#E8649A]" />
          <p className="text-base font-medium text-[#0D0C0D] md:text-lg">{P.demanda}</p>
        </div>
      </div>
    </section>
  )
}
