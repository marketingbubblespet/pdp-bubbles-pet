'use server'
// src/app/planos/login/actions.ts
// Server Action: valida a senha no servidor (nunca no cliente), grava o cookie assinado.
import { timingSafeEqual } from 'node:crypto'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { NOME_COOKIE, gerarCookieAssinado } from '@/lib/planos/auth'
import { excedeuLimite, registrarTentativa, limparTentativas } from '@/lib/planos/rateLimit'

function senhaCorreta(digitada: string, esperada: string): boolean {
  const a = Buffer.from(digitada)
  const b = Buffer.from(esperada)
  // timingSafeEqual exige buffers do mesmo tamanho; senha errada em tamanho já falha aqui,
  // sem vazar por quanto tempo a comparação levou.
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function entrar(formData: FormData): Promise<void> {
  const senha = String(formData.get('senha') ?? '')
  const proximaRota = String(formData.get('next') ?? '/planos')
  const rotaSegura = proximaRota.startsWith('/planos') ? proximaRota : '/planos'

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'desconhecido'

  if (excedeuLimite(ip)) {
    redirect(`/planos/login?next=${encodeURIComponent(rotaSegura)}&erro=limite`)
  }

  const senhaEsperada = process.env.RELATORIO_SENHA
  const segredo = process.env.RELATORIO_COOKIE_SECRET
  if (!senhaEsperada || !segredo) {
    redirect(`/planos/login?next=${encodeURIComponent(rotaSegura)}&erro=config`)
  }

  if (!senhaCorreta(senha, senhaEsperada)) {
    registrarTentativa(ip)
    redirect(`/planos/login?next=${encodeURIComponent(rotaSegura)}&erro=senha`)
  }

  limparTentativas(ip)

  const valor = await gerarCookieAssinado(segredo)
  const jar = await cookies()
  jar.set(NOME_COOKIE, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 12, // 12h, mesma duração do cookie assinado
    path: '/planos',
  })

  redirect(rotaSegura)
}
