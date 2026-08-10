import Image from 'next/image'

export function CaptacaoFooter() {
  return (
    <footer className="py-12 px-6 md:px-10 border-t border-white/5 bg-[#0F0C0D]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <Image src="/images/bubbles-logo.svg" alt="Bubbles" width={150} height={40} className="h-8 md:h-10 w-auto brightness-0 invert" />

          <div className="text-center md:text-right">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Bubbles Cosméticos Pet</p>
            <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">CNPJ: 26.353.134/0001-40</p>
          </div>

          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Bubbles. Todos os direitos reservados.
          </p>
        </div>

        <div className="pt-12 border-t border-white/5">
          <p className="text-white/20 text-[9px] leading-relaxed max-w-4xl mx-auto text-center font-medium">
            *As bonificações por metas atingidas são calculadas trimestralmente com base no volume de compras e
            positivação de novos clientes na região designada. Os critérios de elegibilidade incluem adimplência
            financeira e participação nos treinamentos oficiais da marca. Os valores de faturamento e margem
            apresentados na calculadora são estimativas baseadas em médias de mercado e podem variar conforme a
            gestão e região. Caso tenha dúvidas sobre os cálculos, margens ou condições comerciais específicas para
            sua região, entre em contato com nosso suporte. Consulte seu gerente de conta para o detalhamento das
            faixas de premiação vigentes.
          </p>
        </div>
      </div>
    </footer>
  )
}
