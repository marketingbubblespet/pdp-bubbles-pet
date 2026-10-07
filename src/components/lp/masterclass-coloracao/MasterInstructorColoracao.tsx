import Image from 'next/image'
import { MC_INSTRUCTOR } from '@/lib/masterclass-coloracao'

// Sem foto (pendente no briefing), a seção vira coluna única só com texto, em vez de
// usar uma foto que não é da instrutora.
export function MasterInstructorColoracao() {
  const temFoto = Boolean(MC_INSTRUCTOR.photo)

  return (
    <section className="bg-white py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div
        className={`max-w-[1100px] mx-auto grid gap-8 md:gap-12 items-center ${
          temFoto ? 'md:grid-cols-[400px_1fr]' : 'max-w-[760px] text-center'
        }`}
      >
        {MC_INSTRUCTOR.photo && (
          <div className="relative aspect-square rounded-[40px] overflow-hidden">
            <Image
              src={MC_INSTRUCTOR.photo}
              alt={MC_INSTRUCTOR.name}
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), 400px"
              className="object-cover object-top"
            />
          </div>
        )}

        <div>
          <span className="text-[10px] font-semibold text-[#E8649A] uppercase tracking-widest block mb-3">
            Quem vai ensinar
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-[#0D0C0D] tracking-tight mb-1">{MC_INSTRUCTOR.name}</h2>
          <p className="text-sm font-semibold text-[#E8649A] mb-4">{MC_INSTRUCTOR.credential}</p>
          <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-5">{MC_INSTRUCTOR.bio}</p>

          <blockquote className="bg-[#FDF2F4] rounded-[20px] px-5 py-4 text-sm md:text-base text-[#0D0C0D] leading-relaxed mb-5">
            &ldquo;{MC_INSTRUCTOR.quote}&rdquo;
          </blockquote>

          <div className={`flex flex-wrap gap-2 ${temFoto ? '' : 'justify-center'}`}>
            {MC_INSTRUCTOR.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-[#FDF2F4] text-[#E8649A] text-xs font-semibold uppercase tracking-widest rounded-[4px] px-3 py-1.5 border border-[#F4CDD4]"
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
