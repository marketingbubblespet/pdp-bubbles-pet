// Keyframes usadas só no painel de indicadores (escopo local, sem tocar no globals.css).
// Quem tem "reduzir movimento" ligado não vê nenhuma delas.
export function Animacoes() {
  return (
    <style>{`
      @keyframes ind-brilho { from { transform: translateX(-100%) } to { transform: translateX(250%) } }
      @keyframes ind-crescer { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      .ind-skeleton {
        background: linear-gradient(90deg, #EEEFF1 0%, #EEEFF1 40%, #F7F7F7 50%, #EEEFF1 60%, #EEEFF1 100%);
        background-size: 300% 100%;
        animation: ind-skeleton 2.2s ease-in-out infinite;
      }
      @keyframes ind-skeleton { from { background-position: 100% 0 } to { background-position: 0 0 } }
      .ind-barra { transform-origin: left; animation: ind-crescer 1.2s cubic-bezier(.22,1,.36,1) both }
      .ind-brilho { animation: ind-brilho 2.4s ease-in-out 1.2s infinite }
      @media (prefers-reduced-motion: reduce) {
        .ind-skeleton, .ind-barra, .ind-brilho { animation: none }
      }
    `}</style>
  )
}
