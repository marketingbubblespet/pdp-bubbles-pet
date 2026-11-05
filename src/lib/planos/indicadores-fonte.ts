// src/lib/planos/indicadores-fonte.ts
// Busca os dados do painel no Apps Script (planilhas B2B e B2C, aba NOV26). Só roda no servidor:
// a URL e a chave nunca chegam ao navegador.
//
// Cache: a resposta fica guardada por até 1 hora (etiqueta "indicadores"). Quando a planilha
// muda, o Apps Script chama /api/indicadores/atualizar, que expira essa etiqueta na hora.
//
// Variáveis de ambiente (Netlify e .env.local):
//   SHEETS_SCRIPT_URL  URL do app da Web do Apps Script (termina em /exec)
//   SHEETS_SCRIPT_KEY  mesma chave gravada em CHAVE_API nas propriedades do script
// Importado só pela page.tsx (Server Component). Nunca importar num componente 'use client'.
import type { Dia, Indicadores } from './indicadores'

export const TAG_INDICADORES = 'indicadores'
const TEMPO_MAXIMO_MS = 20_000

export type ResultadoIndicadores =
  | { ok: true; dados: Indicadores; avisos: string[] }
  | { ok: false; erro: string }

const CAMPOS: Exclude<keyof Dia, 'data'>[] = [
  'receitaB2B', 'receitaB2C', 'faturadaB2B', 'faturadaB2C', 'pedidosB2B', 'pedidosB2C',
  'sessoes', 'sessoesB2C', 'investMeta', 'investGoogle', 'investMetaB2C', 'investGoogleB2C',
  'novosB2B', 'novosB2C', 'recorrentesB2B', 'recorrentesB2C',
]

const numOuNull = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)
const ehData = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)

// Confere o formato que chegou. Campo estranho vira null (nunca derruba a página por um valor).
function lerDias(bruto: unknown): Dia[] | null {
  if (!Array.isArray(bruto) || bruto.length < 28 || bruto.length > 31) return null
  const dias: Dia[] = []
  for (const item of bruto) {
    if (typeof item !== 'object' || item === null) return null
    const o = item as Record<string, unknown>
    if (!ehData(o.data)) return null
    const dia = { data: o.data } as Dia
    for (const c of CAMPOS) dia[c] = numOuNull(o[c])
    dias.push(dia)
  }
  return dias.sort((a, b) => a.data.localeCompare(b.data))
}

export async function getIndicadores(): Promise<ResultadoIndicadores> {
  const url = process.env.SHEETS_SCRIPT_URL
  const chave = process.env.SHEETS_SCRIPT_KEY
  if (!url || !chave) return { ok: false, erro: 'Conexão com a planilha não configurada (SHEETS_SCRIPT_URL / SHEETS_SCRIPT_KEY).' }

  try {
    const res = await fetch(`${url}?k=${encodeURIComponent(chave)}`, {
      next: { revalidate: 3600, tags: [TAG_INDICADORES] },
      signal: AbortSignal.timeout(TEMPO_MAXIMO_MS),
    })
    if (!res.ok) return { ok: false, erro: `A planilha respondeu com erro (${res.status}).` }
    const json = (await res.json()) as Record<string, unknown>
    if (json.ok !== true) return { ok: false, erro: typeof json.erro === 'string' ? json.erro : 'Resposta inválida da planilha.' }

    const dias = lerDias(json.dias)
    if (!dias) return { ok: false, erro: 'A planilha devolveu os dias num formato inesperado.' }

    return {
      ok: true,
      avisos: Array.isArray(json.avisos) ? json.avisos.filter((a): a is string => typeof a === 'string').slice(0, 20) : [],
      dados: {
        mes: typeof json.mes === 'string' ? json.mes : 'Novembro 2026',
        ultimaEdicaoManual: typeof json.ultimaEdicaoManual === 'string' ? json.ultimaEdicaoManual : null,
        metaFaturamento: numOuNull(json.metaFaturamento) ?? 560000,
        dias,
      },
    }
  } catch (e) {
    const tempo = e instanceof Error && e.name === 'TimeoutError'
    return { ok: false, erro: tempo ? 'A planilha demorou demais para responder.' : 'Não foi possível falar com a planilha.' }
  }
}
