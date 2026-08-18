import { Camera } from 'lucide-react'
import { LIVE_CARE } from '@/lib/live-care'
import { BRAND } from '@/lib/constants'

// Rodapé enxuto de propósito: página dedicada não tem menu nem links que tirem o foco
// do único CTA.
export function LiveCareFooter() {
  return (
    <footer className="bg-[#0F0C0D] text-white py-10 px-4 pb-28 md:pb-10">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-extrabold tracking-tight">{BRAND.name}</p>
        <p className="text-xs text-white/60 max-w-[440px] leading-relaxed">
          Cosméticos pet de alta performance para uso profissional em cães e gatos.
        </p>
        <a
          href={LIVE_CARE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
        >
          <Camera size={16} /> @bubblespet
        </a>
        <p className="text-[10px] text-white/40 mt-2">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
