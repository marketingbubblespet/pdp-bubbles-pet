// src/app/api/indicadores/atualizar/route.ts
// Chamado pelo Apps Script quando a planilha muda: expira o cache do painel na hora, para a
// próxima visita a /planos/indicadores já buscar os dados novos.
//
// Protegido por chave: header "x-chave" igual a INDICADORES_WEBHOOK_SECRET (variável de ambiente).
// Sem a chave certa, responde 401 e não faz nada. Não devolve nenhum dado de faturamento.
import { timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { TAG_INDICADORES } from '@/lib/planos/indicadores-fonte'

function chaveCorreta(recebida: string, esperada: string): boolean {
  const a = Buffer.from(recebida)
  const b = Buffer.from(esperada)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  const esperada = process.env.INDICADORES_WEBHOOK_SECRET
  if (!esperada) return Response.json({ ok: false, erro: 'não configurado' }, { status: 500 })

  const recebida = request.headers.get('x-chave') ?? ''
  if (!chaveCorreta(recebida, esperada)) return Response.json({ ok: false }, { status: 401 })

  // { expire: 0 }: expira na hora (padrão recomendado pelo Next para webhooks externos).
  revalidateTag(TAG_INDICADORES, { expire: 0 })
  return Response.json({ ok: true, em: new Date().toISOString() })
}
