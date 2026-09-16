// src/proxy.ts
// Protege /planos com senha, conforme o briefing (seção 2). Escopo restrito via `matcher`:
// não intercepta nenhuma outra rota/LP do site.
//
// Next.js 16 renomeou a convenção "middleware" para "proxy" (arquivo e nome da função) —
// ver node_modules/next/dist/docs/.../file-conventions/proxy.md. O arquivo antigo
// (middleware.ts na raiz) nunca era detectado nesta versão: nem pelo nome errado da
// convenção, nem pelo lugar errado (com `src/`, o arquivo precisa estar dentro de `src/`).
// Resultado: a proteção de senha ficava completamente inativa, sem nenhum erro visível.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NOME_COOKIE, validarCookieAssinado } from '@/lib/planos/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // A própria página de login (e a rota que ela chama) precisa ficar de fora, senão
  // o usuário nunca consegue nem tentar entrar a senha.
  if (pathname === '/planos/login') return NextResponse.next()

  const segredo = process.env.RELATORIO_COOKIE_SECRET
  if (!segredo) {
    // Sem segredo configurado, não há como validar nada com segurança: bloquear é a
    // escolha mais segura (nunca abrir a rota "por engano" em produção mal configurada).
    return new NextResponse('Configuração de acesso ausente.', { status: 500 })
  }

  const cookie = request.cookies.get(NOME_COOKIE)?.value
  const autenticado = await validarCookieAssinado(cookie, segredo)

  if (!autenticado) {
    const url = request.nextUrl.clone()
    url.pathname = '/planos/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/planos', '/planos/:path*'],
}
