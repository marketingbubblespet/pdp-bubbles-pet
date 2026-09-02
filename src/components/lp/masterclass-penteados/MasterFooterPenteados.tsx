import { BRAND } from '@/lib/constants'

// Rodapé enxuto de propósito: página dedicada não tem menu nem links que tirem o foco
// do único CTA (comprar / garantir acesso).
export function MasterFooterPenteados() {
  return (
    <footer className="bg-[#0F0C0D] text-white py-10 px-4 pb-28 md:pb-10">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-medium tracking-tight">{BRAND.name}</p>
        <p className="text-xs text-white/60 max-w-[440px] leading-relaxed">
          Cosméticos pet de alta performance para uso profissional em cães e gatos.
        </p>
        <p className="text-[10px] text-white/40 mt-2">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
