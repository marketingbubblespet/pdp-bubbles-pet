// Favicon da Bubbles (patinha) para as páginas servidas como HTML pronto por route.ts.
// Essas páginas não passam pelo layout do Next, então o navegador ficava com o ícone que tivesse em cache
// (o triângulo da Vercel do create-next-app). O "?v=" força o navegador a buscar o ícone de novo.
// Toda rota que devolve HTML deve passar o conteúdo por comFavicon().
const ICONES =
  '<link rel="icon" href="/icon.svg?v=bubbles-2" type="image/svg+xml">' +
  '<link rel="icon" href="/favicon.ico?v=bubbles-2" sizes="any">' +
  '<link rel="apple-touch-icon" href="/icon.svg?v=bubbles-2">'

export function comFavicon(html: string): string {
  const limpo = html.replace(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>/gi, '')
  return limpo.includes('</head>') ? limpo.replace('</head>', `${ICONES}</head>`) : ICONES + limpo
}
