// src/lib/planos/fs.ts
// Leitura dos arquivos .md de content/planos/. Só roda em Server Components (usa `fs`).
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Plano, PlanoFrontmatter } from './types'

const PLANOS_DIR = path.join(process.cwd(), 'content', 'planos')

// O parser YAML (js-yaml, usado pelo gray-matter) converte datas sem aspas
// (ex: `2026-09-14`) em objetos Date automaticamente. O resto do código espera sempre
// string 'AAAA-MM-DD'. Normalizamos aqui pra não depender de quem escreve o relatório
// lembrar de colocar aspas em toda data.
function normalizarDatas<T>(valor: T): T {
  if (valor instanceof Date) {
    const iso = valor.toISOString().slice(0, 10)
    return iso as unknown as T
  }
  if (Array.isArray(valor)) {
    return valor.map((v) => normalizarDatas(v)) as unknown as T
  }
  if (valor !== null && typeof valor === 'object') {
    return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, normalizarDatas(v)])) as T
  }
  return valor
}

function readSlugs(): string[] {
  if (!fs.existsSync(PLANOS_DIR)) return []
  return fs
    .readdirSync(PLANOS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getAllPlanoSlugs(): string[] {
  return readSlugs()
}

export function getPlanoBySlug(slug: string): Plano | null {
  const filePath = path.join(PLANOS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const dataNormalizada = normalizarDatas(data)

  // O slug de arquivo é a fonte da verdade da rota; o campo `slug` do frontmatter deve
  // bater com o nome do arquivo, mas não confiamos cegamente nele pra montar a URL.
  const frontmatter = { ...dataNormalizada, slug } as PlanoFrontmatter
  return { frontmatter, content }
}

export function getAllPlanos(): Plano[] {
  return readSlugs()
    .map((slug) => getPlanoBySlug(slug))
    .filter((p): p is Plano => p !== null)
    // Mais recentes primeiro.
    .sort((a, b) => (a.frontmatter.gerado_em < b.frontmatter.gerado_em ? 1 : -1))
}
