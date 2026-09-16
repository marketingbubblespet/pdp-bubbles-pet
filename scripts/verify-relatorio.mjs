#!/usr/bin/env node
// scripts/verify-relatorio.mjs
// Verificador do relatório gerado (PARTE 8 do prompt). Roda contra o HTML mais recente
// em output/relatorio-*/index.html, ou contra o caminho passado como argumento.
import fs from 'node:fs'
import path from 'node:path'

const argPath = process.argv[2]

function acharUltimoRelatorio() {
  const outputDir = path.join(process.cwd(), 'output')
  if (!fs.existsSync(outputDir)) return null
  const pastas = fs
    .readdirSync(outputDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith('relatorio-'))
    .map((d) => path.join(outputDir, d.name))
    .filter((p) => fs.existsSync(path.join(p, 'index.html')))
  if (pastas.length === 0) return null
  pastas.sort((a, b) => fs.statSync(path.join(b, 'index.html')).mtimeMs - fs.statSync(path.join(a, 'index.html')).mtimeMs)
  return path.join(pastas[0], 'index.html')
}

const alvo = argPath ? path.resolve(argPath) : acharUltimoRelatorio()
if (!alvo || !fs.existsSync(alvo)) {
  console.error('Nenhum relatório encontrado. Rode gerar-relatorio.mjs primeiro, ou passe o caminho do index.html.')
  process.exit(1)
}

const html = fs.readFileSync(alvo, 'utf8')
const checks = []

function checar(nome, ok, detalhe) {
  checks.push({ nome, ok, detalhe })
}

// Nenhum travessão no texto visível (fora de tags/script/style). O "—" usado como
// placeholder de campo ausente (regra 0.1 do prompt, dentro de .valor-ausente ou como
// fallback de string) é intencional e exigido pelo próprio schema — não conta como
// travessão de prosa (regra de copy da casa, que veta só o uso como pontuação).
const textoVisivel = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<span class="valor-ausente"[^>]*>—<\/span>/g, '')
  .replace(/<[^>]+>/g, ' ')
checar('Sem travessão (—) de prosa no texto visível', !textoVisivel.includes('—'))

checar('Sem placeholder esquecido ({{ / TODO literal / Lorem)', !/\{\{|\bTODO\b|Lorem/.test(html))

checar('<meta name="viewport"> presente', /<meta name="viewport"/.test(html))

checar('Breakpoints mobile no CSS', /@media/.test(html))

// Nome truncado com reticências (indício comum: "…")
checar('Nenhum nome truncado com "…"', !html.includes('…'))

checar('Todo item decidível tem os cinco botões', (() => {
  const grupos = html.match(/<div class="decisao__estados"[\s\S]*?<\/div>/g) ?? []
  if (grupos.length === 0) return false
  return grupos.every((g) => (g.match(/btn-estado/g) ?? []).length === 5)
})())

checar('localStorage presente e chaveado pelo slug', html.includes('localStorage') && html.includes("CHAVE_STORAGE = 'plano:' + SLUG"))

checar('Botões de copiar e WhatsApp presentes, com número do frontmatter', html.includes('id="btn-copiar"') && html.includes('id="btn-whatsapp"') && /WHATSAPP = "\d+"/.test(html))

checar('aria-expanded em todo colapsável relevante (sumário/gate)', html.includes('aria-expanded'))

checar('noindex presente', /content="noindex, nofollow"/.test(html))

// Tamanho de imagens embutidas (data URI) — nenhuma prevista neste template, mas
// checamos por segurança caso alguém cole uma imagem base64 grande.
const imagensBase64 = html.match(/data:image\/[^"']+/g) ?? []
const imagemGrande = imagensBase64.find((img) => Buffer.byteLength(img) > 200 * 1024)
checar('Nenhuma imagem acima de 200KB', !imagemGrande)

const tamanhoMB = Buffer.byteLength(html) / (1024 * 1024)
checar(`Arquivo final abaixo de 2MB (atual: ${tamanhoMB.toFixed(2)}MB)`, tamanhoMB < 2)

// --- Regras específicas do domínio (PARTE 0 / PARTE 9) ---
checar('Selo de completude presente', html.includes('selo-completude'))
checar('Aviso de segurança da senha presente no código-fonte', html.includes('AVISO DE SEGURANÇA'))
checar('Barra de progresso presente', html.includes('id="progresso"'))
checar('Sumário presente', html.includes('id="sumario"'))

console.log(`\nVerificação: ${alvo}\n`)
let falhas = 0
for (const c of checks) {
  console.log(`${c.ok ? '✅' : '❌'} ${c.nome}`)
  if (!c.ok) falhas++
}
console.log(`\n${checks.length - falhas}/${checks.length} passaram.`)
if (falhas > 0) process.exit(1)
