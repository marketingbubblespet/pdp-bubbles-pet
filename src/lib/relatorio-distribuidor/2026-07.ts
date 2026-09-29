// src/lib/relatorio-distribuidor/2026-07.ts
// Dados de julho de 2026, usados como mês anterior no comparativo de agosto (não tem
// página própria). Fonte: exportações do Gerenciador de Anúncios (anúncios e conjuntos,
// só a campanha "[GX] [Conv] [Leads] [Novos Distribuidores] V2") e do Google Ads.
import type { RelatorioDistribuidor } from './tipos'

export const relatorioJulho2026: RelatorioDistribuidor = {
  mes: { ano: 2026, mes: 7 },
  periodo: '01/07 a 31/07',
  redes: {
    meta: {
      campanhas: [
        {
          id: 'distribuidor-tradicional',
          nome: 'Distribuidor Tradicional',
          status: { tipo: 'ativa', texto: 'Ativa' },
          investimento: 5249.34,
          impressoes: 180083,
          cliques: 1777,
          leads: 189,
        },
      ],
      impressoesPorUF: {
        SP: 52816, AC: 847, AP: 1092, AM: 4195, PA: 7347, RO: 2967, RR: 952, TO: 1441, AL: 1362,
        BA: 8269, CE: 4377, DF: 29800, ES: 2739, MS: 2943, MA: 2412, MT: 3417, MG: 15302, PB: 2250,
        PI: 1421, RJ: 11381, RN: 1825, SE: 1279, GO: 15082, PE: 4474,
      },
    },
    google: {
      campanhas: [
        {
          id: 'pmax-cadastro-distribuidor',
          nome: 'PMax · Cadastro Distribuidor',
          status: { tipo: 'ativa', texto: 'Ativa' },
          investimento: 31.95,
          impressoes: 1105,
          cliques: 36,
          leads: 2,
        },
      ],
      impressoesPorUF: null,
    },
  },
  ufsZeroConhecido: ['PR', 'SC', 'RS'],
  impressoesNaoAtribuidas: 93,
  funilComercial:{ alcance: null, leadsQualificados: null, reunioes: null, novosDistribuidores: null },
  criativos: [],
  timeline: null,
  desafios: [],
  planoAnterior: null,
  planoProximo: { titulo: 'Plano de ação · Agosto', itens: [] },
  paginas: [],
  regioesFoco: null,
  relatoriosAnteriores: [],
  anterior: null,
}
