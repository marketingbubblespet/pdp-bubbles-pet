import Image from 'next/image'
import { MC_INSTRUCTOR } from '@/lib/masterclass-spitz'

export function MasterInstructorB() {
  return (
    <section className="bg-[#111111] py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden">
          <Image
            src="/images/masterclass/guilherme-hero.webp"
            alt={MC_INSTRUCTOR.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#F4CDD4] uppercase tracking-widest block mb-3">
            Quem vai ensinar
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            {MC_INSTRUCTOR.name}
          </h2>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
            {MC_INSTRUCTOR.credential}.
          </p>

          <div className="flex flex-wrap gap-2">
            {MC_INSTRUCTOR.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-[#1A1A1A] text-[#F4CDD4] text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1.5 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
