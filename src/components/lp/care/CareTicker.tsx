// Faixa contínua (marquee) só com CSS, sem JS/dependência. Componente de servidor.
const PHRASES = [
  'A demanda já está em movimento',
  '2.665 afiliados gerando procura',
  'Margem pensada pro seu petshop',
  'Pré-venda de lançamento',
  'Produto que gira, não encalha',
]

export function CareTicker() {
  const loop = [...PHRASES, ...PHRASES]
  return (
    <div className="bg-[#E8649A] py-3 overflow-hidden">
      <style>{`
        @keyframes care-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .care-ticker-track { animation: care-ticker 24s linear infinite; }
      `}</style>
      <div className="flex whitespace-nowrap care-ticker-track w-max">
        {loop.map((phrase, i) => (
          <span key={i} className="mx-6 text-xs md:text-sm font-bold uppercase tracking-widest text-white flex items-center gap-6 shrink-0">
            {phrase}
            <span className="opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
