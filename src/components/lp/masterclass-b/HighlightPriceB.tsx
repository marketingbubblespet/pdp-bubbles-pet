import { MC } from '@/lib/masterclass-spitz'

// Realça o valor mínimo de compra em Cosmic Rose, dentro de um texto corrido.
export function HighlightPriceB({ text }: { text: string }) {
  const parts = text.split(MC.minPurchase)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-[#F4CDD4] font-black">{MC.minPurchase}</span>
          )}
        </span>
      ))}
    </>
  )
}
