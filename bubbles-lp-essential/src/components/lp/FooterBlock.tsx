// src/components/lp/FooterBlock.tsx

const policies = [
  { label: 'Envio e Frete',       href: 'https://www.bubbles.com.br/pages/politica-de-frete' },
  { label: 'Privacidade',         href: 'https://www.bubbles.com.br/pages/politica-de-privacidade' },
  { label: 'Termos de Serviço',   href: 'https://www.bubbles.com.br/pages/termos-de-servico' },
  { label: 'Troca e Devoluções',  href: 'https://www.bubbles.com.br/pages/politica-de-trocas' },
  { label: 'Guia de Diluição',    href: 'https://www.bubbles.com.br/pages/guia-de-diluicao' },
]

const badges = [
  {
    src: 'https://cdn.shopify.com/s/images/badges/shopify-secure-badge-white.svg',
    alt: 'Shopify Secure',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0886/3596/5714/files/162134751179189.png?v=1725283377',
    alt: 'Site Seguro SSL',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0886/3596/5714/files/public.webp?v=1725283228',
    alt: 'Google Safe Browsing',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0455/2065/0401/files/logo_ra1000_inst.webp?v=1725449621',
    alt: 'RA1000',
  },
]

const paymentMethods = ['Pix', 'Visa', 'Mastercard', 'Amex', 'Boleto']

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export function FooterBlock() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-6 text-[#0D0C0D]">
      <div className="max-w-[1100px] mx-auto px-4">

        {/* Políticas */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm font-medium items-center pb-4 border-b border-gray-100">
          <span className="font-bold text-gray-700 mr-1">Políticas:</span>
          {policies.map((p, i) => (
            <span key={p.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300">|</span>}
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8649A] transition-colors whitespace-nowrap"
              >
                {p.label}
              </a>
            </span>
          ))}
        </div>

        {/* Pagamento + Selos */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 border-b border-gray-100">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pagamento Seguro</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 items-center">
              {paymentMethods.map((m) => (
                <span key={m} className="border border-gray-200 rounded-[6px] px-2 py-0.5 text-xs font-medium text-gray-500">
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 items-center">
            {badges.map((b) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.alt}
                src={b.src}
                alt={b.alt}
                className="h-[28px] w-auto border border-gray-200 rounded-[6px] bg-white grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        {/* Social + CNPJ */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex gap-3">
            <a
              href="https://instagram.com/bubblespet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Bubbles"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#F4CDD4] hover:text-[#0D0C0D] transition-all"
            >
              <IconInstagram />
            </a>
            <a
              href="https://wa.me/5514996312932"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Bubbles"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#F4CDD4] hover:text-[#0D0C0D] transition-all"
            >
              <IconWhatsApp />
            </a>
          </div>
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            © 2025 Bubbles Pet | CNPJ: 31.900.078/0001-96
            <span className="hidden md:inline"> | R. Fortunato Zilo, 238, Lençóis Paulista - SP | CEP: 18681-200</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
