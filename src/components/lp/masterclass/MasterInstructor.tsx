import Image from 'next/image'
import { MC_INSTRUCTOR } from '@/lib/masterclass-spitz'

export function MasterInstructor() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
        <div className="relative aspect-square rounded-[10px] overflow-hidden">
          <Image
            src="/images/masterclass/guilherme-hero.webp"
            alt={MC_INSTRUCTOR.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
            Quem vai ensinar
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] mb-2">
            {MC_INSTRUCTOR.name}
          </h2>
          <p className="text-sm md:text-base font-medium text-[#6B7280] leading-relaxed mb-5">
            {MC_INSTRUCTOR.credential}.
          </p>

          <div className="flex flex-wrap gap-2">
            {MC_INSTRUCTOR.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-[#fdf0f3] text-[#E8649A] text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1.5 border border-[#F4CDD4]"
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
