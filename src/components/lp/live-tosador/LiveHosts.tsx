import { Camera } from 'lucide-react'
import { LIVE_HOSTS } from '@/lib/live-tosador'

export function LiveHosts() {
  return (
    <section className="bg-[#111111] py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-[900px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#F4CDD4] mb-3 text-center">
          Quem vai apresentar
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center mb-10">
          A live é comandada por elas
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {LIVE_HOSTS.map((h) => (
            <div key={h.name} className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center gap-3">
              {/* Placeholder de foto, substituir por next/image quando a foto real chegar */}
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/10 bg-[#111111] flex flex-col items-center justify-center text-center p-2 gap-1">
                <Camera size={22} className="text-white/40" />
                <span className="text-[10px] text-white/40 leading-tight">{h.photoSpec}</span>
              </div>
              <h3 className="font-extrabold text-white">{h.name}</h3>
              <p className={`text-xs leading-snug ${h.bioPending ? 'text-white/40 italic' : 'text-white/70'}`}>{h.bio}</p>
              {h.quote && (
                <p className="text-xs text-white/50 italic leading-relaxed border-t border-white/5 pt-3 mt-1">
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
