'use client'
// Telas finais do formulário da LP /distribuidor-care (sucesso, desvio, falha só da Sellum) e o bloco de falha total.
import type { ReactNode } from 'react'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { pushCtaClick, pushWhatsappClick } from '@/lib/tracking'
import { DISTRIBUIDOR_CARE, DISTRIBUIDOR_CARE_LINKS } from '@/lib/distribuidor-care'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { DISTRIBUIDOR_CARE_FORM as F } from './distribuidorCareFormDados'
import { preencher } from './distribuidorCareFormUtils'
import type { Enviado } from './useDistribuidorCareForm'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

function linkWhatsapp(modelo: string, leadId: string): string {
  return `${DISTRIBUIDOR_CARE.whatsappAtendimento}?text=${encodeURIComponent(preencher(modelo, { leadId }))}`
}

function BotaoWhatsapp({ href, local }: { href: string; local: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => pushWhatsappClick(local)} className={C.BOTAO_NEUTRO}>
      <WhatsAppIcon size={18} />
      {F.botoes.whatsapp}
    </a>
  )
}

// Dentro do cartão do formulário: só o sucesso ganha o selo verde; as outras telas ficam sem moldura própria.
function Moldura({ titulo, children, tipo }: { titulo: string; children: ReactNode; tipo: 'sucesso' | 'desvio' | 'falha' }) {
  const Icone = tipo === 'falha' ? CircleAlert : CheckCircle2
  const fundo = tipo === 'sucesso' ? 'rounded-[12px] border border-[#bbf7d0] bg-[#f0fdf4] p-6 md:p-8' : 'py-2'
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${fundo}`}>
      <Icone size={40} aria-hidden="true" className="text-[#E8649A]" />
      <h3 id="dc-tela-titulo" tabIndex={-1} className="text-xl font-medium text-[#0D0C0D] focus:outline-none">{titulo}</h3>
      {children}
    </div>
  )
}

function textoSucesso(envio: Enviado): string {
  const canal = F.telas.canalNoTexto[envio.canal]
  if (envio.horario === 'qualquer') return preencher(F.telas.sucessoQualquer, { canal })
  return preencher(F.telas.sucessoPeriodo, { canal, periodo: F.telas.periodoNoTexto[envio.horario] })
}

export function DistribuidorCareFormScreens({ envio }: { envio: Enviado }) {
  if (envio.tela === 'sucesso') {
    return (
      <Moldura titulo={F.telas.sucessoTitulo} tipo="sucesso">
        <p className={C.CORPO}>{textoSucesso(envio)}</p>
      </Moldura>
    )
  }
  if (envio.tela === 'desvio') {
    return (
      <Moldura titulo={F.telas.desvioTitulo} tipo="desvio">
        <p className={C.CORPO}>{F.telas.desvioTexto}</p>
        <a href={DISTRIBUIDOR_CARE_LINKS.desvio} onClick={() => pushCtaClick(F.botoes.desvio, 'desvio')} className={C.BOTAO_NEUTRO}>
          {F.botoes.desvio}
        </a>
      </Moldura>
    )
  }
  return (
    <Moldura titulo={F.telas.falhaSellumTitulo} tipo="falha">
      <p className={C.CORPO}>{F.telas.falhaSellumTexto}</p>
      <BotaoWhatsapp href={linkWhatsapp(F.telas.falhaSellumMensagem, envio.leadId)} local="distribuidor-care-falha-sellum" />
    </Moldura>
  )
}

export function BlocoFalhaTotal({ leadId, aoTentar, ocupado }: { leadId: string; aoTentar: () => void; ocupado: boolean }) {
  if (ocupado) return null
  return (
    <div id="dc-falha-total" role="alert" tabIndex={-1} className="space-y-3 rounded-[12px] border border-red-600 bg-white p-4 focus:outline-none">
      <p className="flex items-start gap-2 text-sm text-[#0D0C0D]">
        <CircleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#E8649A]" />
        {F.telas.falhaTotalTexto}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={aoTentar} className={C.BOTAO_PRIMARIO}>{F.botoes.tentarDeNovo}</button>
        <BotaoWhatsapp href={linkWhatsapp(F.telas.falhaTotalMensagem, leadId)} local="distribuidor-care-falha-total" />
      </div>
    </div>
  )
}
