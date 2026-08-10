import Image from 'next/image'

// Logo dupla usada no header, na barra fixa e no rodapé: Bubbles x PET South America.
export function PetSouthLogo() {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4">
      <Image
        src="/images/bubbles-logo.svg"
        alt="Bubbles® Logo"
        width={130}
        height={36}
        priority
        className="h-6 sm:h-7 md:h-9 w-auto brightness-0 invert shrink-0"
      />
      <span className="text-white/30 font-light text-base md:text-lg select-none">×</span>
      <Image
        src="/images/distribuidores/pet-south-america-logo.svg"
        alt="PET South America Logo"
        width={160}
        height={44}
        priority
        className="h-7 sm:h-9 md:h-11 w-auto shrink-0 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
      />
    </div>
  )
}
