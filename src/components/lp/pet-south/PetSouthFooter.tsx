import { PetSouthLogo } from './PetSouthLogo'

export function PetSouthFooter() {
  return (
    <footer className="py-8 bg-[#050505] border-t border-white/10 text-center text-white/40 text-[10px] px-4 space-y-2">
      <div className="flex justify-center items-center gap-2">
        <PetSouthLogo />
      </div>
      <p>© {new Date().getFullYear()} Bubbles®. Todos os direitos reservados. Edição Especial PET South America.</p>
    </footer>
  )
}
