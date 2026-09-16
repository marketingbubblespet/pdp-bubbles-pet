// src/lib/planos/rateLimit.ts
// Limite simples de tentativas de senha por IP (5 a cada 15 min), em memória. Não
// sobrevive a redeploy nem é compartilhado entre instâncias — proteção contra tentativa
// casual, não contra um ataque distribuído sério (mesmo nível de proteção da senha única).
const JANELA_MS = 15 * 60 * 1000
const LIMITE = 5

const tentativasPorIp = new Map<string, { contagem: number; expiraEm: number }>()

export function excedeuLimite(ip: string): boolean {
  const registro = tentativasPorIp.get(ip)
  if (!registro || Date.now() > registro.expiraEm) return false
  return registro.contagem >= LIMITE
}

export function registrarTentativa(ip: string): void {
  const registro = tentativasPorIp.get(ip)
  if (!registro || Date.now() > registro.expiraEm) {
    tentativasPorIp.set(ip, { contagem: 1, expiraEm: Date.now() + JANELA_MS })
    return
  }
  registro.contagem += 1
}

export function limparTentativas(ip: string): void {
  tentativasPorIp.delete(ip)
}
