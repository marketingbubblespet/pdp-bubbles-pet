import { LIVE_CARE_HOSTS } from '@/lib/live-care'
import { LiveCarePhoto } from './LiveCarePhoto'

export function LiveCareHosts() {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 px-4">
      <div className="max-w-[900px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Quem apresenta
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-10">
          Quem vai estar com você no domingo
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {LIVE_CARE_HOSTS.map((h) => (
            <div
              key={h.name}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Retrato em quadrado: as fotos são 4:5 feitas na loja, então o recorte
                  pelo topo mantém o rosto centralizado e ainda mostra o ambiente. */}
              <div className="relative aspect-square bg-[#fdf0f3]">
                <LiveCarePhoto
                  src={h.photo}
                  alt={h.name}
                  sizes="(max-width: 639px) calc(100vw - 32px), 420px"
                  label={`[FOTO: ${h.name}]`}
                />
              </div>

              <div className="p-5 flex flex-col gap-2">
                <p className="font-extrabold text-[#0F0C0D] text-lg leading-tight">{h.name}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A]">{h.role}</p>

                {h.bio && <p className="text-sm text-[#6B7280] leading-relaxed mt-1">{h.bio}</p>}

                {/* Frase de convite na primeira pessoa: dá voz humana à seção */}
                {h.quote && (
                  <p className="text-sm text-[#6B7280] italic leading-relaxed border-t border-[#E5E7EB] pt-3 mt-2">
                    &ldquo;{h.quote}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
