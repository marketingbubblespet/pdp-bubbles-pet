'use client'
// F3 da LP /distribuidor-care: compartilhar a página com o sócio ou diretor pelo WhatsApp (wa.me sem número).
// <a> direto, nunca window.open nem nada depois de await (o navegador interno do Instagram bloqueia).
import { pushShareWhatsapp } from '@/lib/tracking'
import { DISTRIBUIDOR_CARE_COMPARTILHAR } from '@/lib/distribuidor-care'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'
import { cn } from '@/lib/utils'

const HREF = 'https://wa.me/?text=' + encodeURIComponent(DISTRIBUIDOR_CARE_COMPARTILHAR.mensagem)

export function DistribuidorCareShareLink({ origem }: { origem: 'simulador' | 'cta-final' }) {
  return (
    <a href={HREF} target="_blank" rel="noopener noreferrer" onClick={() => pushShareWhatsapp(origem)} className={cn(C.LINK_TEXTO, 'text-sm')}>
      <WhatsAppIcon size={18} />
      {DISTRIBUIDOR_CARE_COMPARTILHAR.rotulo}
    </a>
  )
}
