import Image from 'next/image'
import { ImageIcon } from 'lucide-react'

// Regra 27 do CONVENCOES.md: só referenciar imagem que existe em public/images. Enquanto
// as fotos da live não chegam, este componente mostra uma caixa marcada dizendo o que
// falta, em vez de apontar para um arquivo inexistente (que daria 404 em produção).
export function LiveCarePhoto({
  src,
  alt,
  sizes,
  label,
  priority = false,
  className = '',
}: {
  src: string | null
  alt: string
  sizes: string
  label: string
  priority?: boolean
  className?: string
}) {
  if (!src) {
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#fdf0f3] border-2 border-dashed border-[#F4CDD4] p-4 text-center ${className}`}
      >
        <ImageIcon size={26} className="text-[#E8649A]" aria-hidden />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8649A] leading-snug">
          {label}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover object-top ${className}`}
    />
  )
}
