// Placeholder visual para fotos/vídeos que ainda serão enviados.
export function MediaPlaceholder({
  label,
  ratio = 'aspect-[4/3]',
  className = '',
}: {
  label: string
  ratio?: string
  className?: string
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-[#F4CDD4]/20 border-2 border-dashed border-[#E8649A]/50 rounded-[10px] text-center p-6 ${ratio} ${className}`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8649A" strokeWidth="1.8" className="opacity-70">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8649A] leading-snug">
        {label}
      </span>
    </div>
  )
}
