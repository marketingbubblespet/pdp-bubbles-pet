import Image from 'next/image'
import { MC_GALLERY } from '@/lib/masterclass-coloracao'

export function MasterGalleryColoracao() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Resultados com Collora
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] tracking-tight text-center mb-10 max-w-[760px] mx-auto">
          Pontas, orelhas, rabo e degradê: o tipo de serviço que o tutor fotografa e posta
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {MC_GALLERY.map((foto) => (
            <div key={foto.src} className="relative aspect-square rounded-[20px] overflow-hidden bg-white">
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 767px) calc(50vw - 22px), 262px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
