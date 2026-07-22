import { ImageIcon, VolumeX } from 'lucide-react'

// Carrossel de prova (prints/vídeos de afiliados). Placeholder até chegar o conteúdo real.
// Quando os vídeos reais entrarem: usar <video muted autoPlay loop playsInline /> (sem som,
// como pedido). O selo de "mudo" já fica no placeholder pra deixar isso combinado desde já.
const SLOTS = Array.from({ length: 8 }, (_, i) => i)

export function CareDemandGallery() {
  const loop = [...SLOTS, ...SLOTS]

  return (
    <div className="relative overflow-hidden care-gallery-mask">
      <style>{`
        @keyframes care-gallery-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .care-gallery-track { animation: care-gallery-scroll 30s linear infinite; }
        .care-gallery-track:hover { animation-play-state: paused; }
        .care-gallery-mask { -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent); mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent); }
      `}</style>
      <div className="flex gap-3 w-max care-gallery-track">
        {loop.map((slot, i) => (
          <div
            key={i}
            className="group relative w-32 md:w-36 aspect-[9/16] rounded-xl border-2 border-dashed border-[#F4CDD4] bg-white flex flex-col items-center justify-center gap-1 p-2 shrink-0 transition-transform duration-300 hover:scale-110 hover:z-10 cursor-pointer"
          >
            <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#fdf0f3] flex items-center justify-center">
              <VolumeX size={11} className="text-[#E8649A]" />
            </span>
            <ImageIcon size={20} className="text-[#E8649A]" />
            <span className="text-[9px] text-[#9ca3af] text-center leading-tight">
              Print/vídeo real de afiliado
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
