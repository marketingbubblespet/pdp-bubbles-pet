// src/lib/relatorio-distribuidor/mapa-brasil.ts
// Mapa do Brasil em grade de quadrados (tile map): cada estado vira um quadrado do mesmo
// tamanho, na posição aproximada do mapa real. Todos os estados ficam legíveis, inclusive
// os pequenos (DF, SE, AL), e a sigla cabe dentro de cada um.
import type { UF } from './tipos'

export type Regiao = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul'

// [coluna, linha] na grade de 6 colunas x 8 linhas.
export const POSICAO_UF: Record<UF, [number, number]> = {
  RR: [2, 1], AP: [4, 1],
  AM: [2, 2], PA: [3, 2], MA: [4, 2], CE: [5, 2], RN: [6, 2],
  AC: [1, 3], RO: [2, 3], TO: [3, 3], PI: [4, 3], PE: [5, 3], PB: [6, 3],
  MT: [2, 4], GO: [3, 4], DF: [4, 4], BA: [5, 4], AL: [6, 4],
  MS: [2, 5], SP: [3, 5], MG: [4, 5], ES: [5, 5], SE: [6, 5],
  PR: [3, 6], RJ: [4, 6],
  SC: [3, 7],
  RS: [3, 8],
}

export const NOME_UF: Record<UF, string> = {
  AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará',
  DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná',
  PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
  SE: 'Sergipe', TO: 'Tocantins',
}

export const REGIAO_UF: Record<UF, Regiao> = {
  AC: 'Norte', AM: 'Norte', AP: 'Norte', PA: 'Norte', RO: 'Norte', RR: 'Norte', TO: 'Norte',
  AL: 'Nordeste', BA: 'Nordeste', CE: 'Nordeste', MA: 'Nordeste', PB: 'Nordeste',
  PE: 'Nordeste', PI: 'Nordeste', RN: 'Nordeste', SE: 'Nordeste',
  DF: 'Centro-Oeste', GO: 'Centro-Oeste', MT: 'Centro-Oeste', MS: 'Centro-Oeste',
  ES: 'Sudeste', MG: 'Sudeste', RJ: 'Sudeste', SP: 'Sudeste',
  PR: 'Sul', RS: 'Sul', SC: 'Sul',
}

export const REGIOES: Regiao[] = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul']

export const TODAS_UFS = Object.keys(POSICAO_UF) as UF[]
