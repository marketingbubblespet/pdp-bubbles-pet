// src/app/atendimento/page.tsx
// Página ponte dos anúncios do Meta para o WhatsApp de atendimento da Bubbles.
// Cada visita ganha um ID de atendimento gravado no Netlify Forms (form
// "atendimento-whatsapp") com os dados de tráfego, para conversão offline depois da compra.
// GTM da Bubbles Shopify por decisão do usuário (08/10/2026). Escondida do Google.
import type { Metadata } from 'next'
import { GtmScript } from '@/components/ui/GtmScript'
import { AtendimentoRedirect } from '@/components/lp/atendimento/AtendimentoRedirect'

export const metadata: Metadata = {
  title: 'Atendimento Bubbles Pet | Fale no WhatsApp',
  description: 'Fale com um especialista Bubbles pelo WhatsApp.',
  robots: { index: false, follow: false },
}

export default function AtendimentoPage() {
  return (
    <>
      <GtmScript id="GTM-5L9TD3PN" />
      <AtendimentoRedirect />
    </>
  )
}
