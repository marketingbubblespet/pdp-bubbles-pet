'use client'
import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { trackShareClick } from './trackJoin'

const SHARE_TEXT = 'Bubbles tá fazendo uma live especial de Dia do Tosador, 26/07 às 19h, com brinde, sorteio e cupom exclusivo. Entra também:'

export function LiveShare() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    trackShareClick()
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: 'Live Dia do Tosador com a Bubbles', text: SHARE_TEXT, url }).catch(() => {})
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${url}`)}`, '_blank')
    }
  }

  const handleCopy = () => {
    trackShareClick()
    const url = window.location.href
    const onCopied = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(onCopied).catch(() => fallbackCopy(url, onCopied))
    } else {
      fallbackCopy(url, onCopied)
    }
  }

  // Alguns navegadores/contextos bloqueiam a Clipboard API (sem permissão, http não seguro etc.).
  // Este fallback usa um campo de texto temporário + o comando de cópia clássico do navegador.
  const fallbackCopy = (text: string, onDone: () => void) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      onDone()
    } catch {
      // Nada a fazer: navegador não suporta cópia programática.
    }
    document.body.removeChild(textarea)
  }

  return (
    <section className="bg-[#111111] py-14 md:py-20 px-4 border-t border-white/5">
      <div className="max-w-[600px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">Espalha a palavra</p>
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-3">Chama aquele parceiro groomer</h2>
        <p className="text-sm text-white/70 leading-relaxed mb-8">
          Você não devia ser o único tosador nessa live. Manda o convite pra quem também merece essas condições.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 bg-[#F4CDD4] text-[#080808] font-black uppercase tracking-widest rounded-xl px-6 py-3.5 text-xs md:text-sm transition-transform duration-150 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(244,205,212,0.2)]"
          >
            <Share2 size={16} />
            Compartilhar com um groomer
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/5 text-white font-semibold rounded-xl px-6 py-3.5 text-xs md:text-sm hover:border-white/10 transition-colors"
          >
            {copied ? <Check size={16} className="text-[#F4CDD4]" /> : <Copy size={16} />}
            {copied ? 'Link copiado!' : 'Copiar link'}
          </button>
        </div>
      </div>
    </section>
  )
}
