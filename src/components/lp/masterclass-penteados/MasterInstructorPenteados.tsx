import Image from 'next/image'
import { MC_INSTRUCTOR } from '@/lib/masterclass-penteados'

export function MasterInstructorPenteados() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-[400px_1fr] gap-8 md:gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden">
          <Image
            src={MC_INSTRUCTOR.photo}
            alt={MC_INSTRUCTOR.name}
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), 400px"
            className="object-cover object-top"
          />
        </div>

        <div>
          <span className="text-[10px] font-semibold text-[#E8649A] uppercase tracking-widest block mb-3">
            Quem vai ensinar
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-[#0F0C0D] tracking-tight mb-2">
            {MC_INSTRUCTOR.name}
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] leading-relaxed mb-2">
            {MC_INSTRUCTOR.credential}
          </p>
          <p className="text-sm md:text-base text-[#6B7280] leading-relaxed mb-5">
            {MC_INSTRUCTOR.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {MC_INSTRUCTOR.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-[#fdf0f3] text-[#E8649A] text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1.5 border border-[#F4CDD4]"
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
