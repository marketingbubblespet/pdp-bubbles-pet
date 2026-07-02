import { MC } from '@/lib/masterclass-spitz'

// Realça todas as ocorrências do valor mínimo de compra em rosa, dentro de um texto corrido.
export function HighlightPrice({ text }: { text: string }) {
  const parts = text.split(MC.minPurchase)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-[#E8649A] font-extrabold underline decoration-2 underline-offset-2 decoration-[#E8649A]">
              {MC.minPurchase}
            </span>
          )}
        </span>
      ))}
    </>
  )
}
