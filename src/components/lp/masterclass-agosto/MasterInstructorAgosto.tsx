// Cópia isolada de MasterInstructorB, só pra essa LP: usa a foto do arquivo de dados
// (MC_INSTRUCTOR.photo) em vez do caminho fixo do componente compartilhado.
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MC_INSTRUCTOR } from '@/lib/masterclass-agosto'

const INSTRUCTOR_PHOTOS = [
  '/images/masterclass/tio-dan-hero.webp',
  '/images/masterclass/tio-dan-trabalho.webp',
  '/images/masterclass/tio-dan-retrato.webp',
]

export function MasterInstructorAgosto() {
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % INSTRUCTOR_PHOTOS.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-[#111111] py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden">
          {INSTRUCTOR_PHOTOS.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={MC_INSTRUCTOR.name}
              fill
              sizes="(max-width: 767px) 343px, 280px"
              className={`object-cover object-top transition-opacity duration-700 ${i === photoIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#F4CDD4] uppercase tracking-widest block mb-3">
            Quem vai ensinar
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            {MC_INSTRUCTOR.name}
          </h2>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-2">
            {MC_INSTRUCTOR.credential}.
          </p>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
            {MC_INSTRUCTOR.bio}
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
