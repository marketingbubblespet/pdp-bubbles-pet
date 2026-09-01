import { MC } from '@/lib/masterclass-penteados'

// Realça o valor mínimo de compra dentro de um texto corrido.
export function HighlightPricePenteados({ text }: { text: string }) {
  const parts = text.split(MC.minPurchase)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-[#B25A72] font-semibold">{MC.minPurchase}</span>
          )}
        </span>
      ))}
    </>
  )
}
