// B16 da LP /distribuidor-care: rodapé com CNPJ e endereço. Único lugar com links externos (nova aba).
import Image from 'next/image'
import { DISTRIBUIDOR_CARE_RODAPE as D } from '@/lib/distribuidor-care'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

export function DistribuidorCareFooter() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F7F7F7] px-4 pb-28 pt-10 md:pb-12">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 text-center">
        <Image src="/images/bubbles-logo.svg" width={110} height={26} alt="Bubbles" />
        <p className="text-xs text-[#666666]">{D.linhaLegal(new Date().getFullYear())}</p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-[#666666]">
          {D.links.map((l, i) => (
            <span key={l.href} className="inline-flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              <a href={l.href} target="_blank" rel="noopener noreferrer"
                className={`inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-[#0D0C0D] ${C.FOCO}`}>
                {l.rotulo}
              </a>
            </span>
          ))}
        </p>
        <p className="max-w-3xl text-xs leading-relaxed text-[#666666]">{D.ressalva}</p>
      </div>
    </footer>
  )
}
