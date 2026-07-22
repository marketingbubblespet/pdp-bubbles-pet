import Image from 'next/image'

export function LiveFooter() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-10 pb-28 md:pb-24 px-4">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-3 text-center">
        <Image src="/images/bubbles-logo.svg" alt="Bubbles Pet" width={110} height={26} className="invert opacity-80" />
        <p className="text-xs text-white/60">© {new Date().getFullYear()} Bubbles Pet. Todos os direitos reservados.</p>
        <p className="text-xs text-white/60">Cosméticos pet de alta performance para profissionais.</p>
        <div className="flex items-center gap-3 mt-1">
          <a href="https://www.bubbles.com.br/pages/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 underline hover:text-white/70 transition-colors">Política de Privacidade</a>
          <span className="text-xs text-white/60">·</span>
          <a href="https://www.bubbles.com.br/pages/termos-de-servico" target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 underline hover:text-white/70 transition-colors">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  )
}
