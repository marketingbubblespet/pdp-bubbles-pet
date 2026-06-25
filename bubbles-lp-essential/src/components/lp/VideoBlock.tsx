// src/components/lp/VideoBlock.tsx
import { PRODUCT } from '@/lib/constants'
import { CtaLink } from '@/components/ui/CtaLink'

export function VideoBlock() {
  return (
    <section className="px-4 py-16 md:py-24 bg-[#0F0C0D] overflow-hidden">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">

        {/* Vídeo vertical — borda 10px + glow rosa */}
        <div className="shrink-0 w-full max-w-[240px] mx-auto md:mx-0">
          {/* Wrapper com glow rosa */}
          <div
            className="rounded-[13px] p-[3px]"
            style={{
              background: 'linear-gradient(160deg, rgba(244,205,212,0.55) 0%, rgba(244,205,212,0.08) 60%, transparent 100%)',
              boxShadow: '0 0 32px rgba(244,205,212,0.22), 0 0 8px rgba(244,205,212,0.14)',
            }}
          >
            <div className="rounded-[10px] overflow-hidden" style={{ aspectRatio: '9/16' }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                disablePictureInPicture
                className="w-full h-full object-cover"
                style={{ pointerEvents: 'none', display: 'block' }}
              >
                <source
                  src="https://cdn.shopify.com/videos/c/vp/9868262c8d0641b3a85ea134cacd8008/9868262c8d0641b3a85ea134cacd8008.SD-480p-0.9Mbps-67289517.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex-1 flex flex-col text-white text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
            Resultado em ação
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-white mb-4">
            Pelagem limpa, macia e com cheiro que fica.
          </h2>
          <p className="text-[#9ca3af] leading-relaxed mb-6 text-sm md:text-base">
            O Shampoo Neutro Essential entrega resultado que o tutor percebe antes de sair do petshop. Pelo limpo sem ressecar, fragrância suave e duradoura, sem risco de reação.
          </p>

          <ul className="space-y-3 mb-8 text-sm text-[#d1d5db]">
            {[
              'Bioex AO age na origem do odor',
              'Fórmula suave para uso diário',
              'Resultado consistente em qualquer pelagem',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4CDD4] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA — full width no mobile, auto no desktop */}
          <div className="mt-auto">
            <CtaLink
              href={PRODUCT.shopifyUrl}
              className="block md:inline-block w-full md:w-auto text-center bg-[#3DB85C] text-white font-bold text-base px-8 py-4 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg"
            >
              COMPRE AGORA →
            </CtaLink>
          </div>
        </div>

      </div>
    </section>
  )
}
