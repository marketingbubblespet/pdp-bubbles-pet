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
              className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex flex-col items-center text-center gap-3"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-[#fdf0f3] shrink-0">
                <LiveCarePhoto
                  src={h.photo}
                  alt={h.name}
                  sizes="112px"
                  label={`[FOTO: ${h.name}]`}
                />
              </div>
              <div>
                <p className="font-extrabold text-[#0F0C0D] text-lg">{h.name}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mt-1">{h.role}</p>
              </div>
              {h.bio ? (
                <p className="text-sm text-[#6B7280] leading-relaxed">{h.bio}</p>
              ) : (
                <p className="text-xs text-[#9ca3af] italic leading-relaxed">
                  [Aguardando cargo e bio para completar esta seção]
                </p>
              )}
              {h.quote && (
                <p className="text-xs text-[#9ca3af] italic leading-relaxed border-t border-[#E5E7EB] pt-3 mt-1">
                  &quot;{h.quote}&quot;
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
