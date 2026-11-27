// src/lib/relatorio-distribuidor/2026-09-v2.ts
// Setembro de 2026 na estrutura nova (/relatorio-distribuidor-setembro26). Parte do arquivo de
// setembro (2026-09.ts, que segue alimentando /distribuidor-setembro-2026 sem mudança) e
// acrescenta o que a extração de 27/11/2026 trouxe:
// - a campanha de mensagem no WhatsApp, que gastou em setembro e não estava no arquivo original;
// - a contagem de press kits do relatório do comercial de outubro;
// - o mapa por estado refeito com o export de região das 3 campanhas (o anterior não tinha o WhatsApp)
//   e com as impressões por estado do Google.
// Meta: "DIST Analise - 01 Campanhas por dia" e "07 Conjuntos por regiao" (01/09 a 31/10).
// Google: "DIST Analise - 10/11/19" de setembro.
import type { RelatorioDistribuidor } from './tipos'
import { relatorioSetembro2026 } from './2026-09'
import { relatorioAgosto2026 } from './2026-08'

const meta = relatorioSetembro2026.redes.meta!
const google = relatorioSetembro2026.redes.google!

export const relatorioSetembro2026v2: RelatorioDistribuidor = {
  ...relatorioSetembro2026,
  impressoesNaoAtribuidas: 1042,
  redes: {
    google: {
      ...google,
      impressoesPorUF: { SP: 167, RJ: 83, ES: 44, AL: 33, SE: 29, TO: 15, DF: 14, MG: 6, BA: 4, PA: 3, GO: 1, PR: 1 },
    },
    meta: {
      ...meta,
      // Export de região das 3 campanhas: a soma (318.764 + 1.042 sem estado) bate com as 319.806 impressões.
      impressoesPorUF: {
        SP: 84227, BA: 37804, MG: 33990, MA: 20938, PE: 20681, RJ: 14476, GO: 10680, AM: 10662, PI: 10484, MT: 8457,
        RN: 8175, PB: 7712, AL: 7115, ES: 5859, MS: 5604, SE: 5543, RO: 5511, TO: 4876, DF: 3690, AP: 2558, AC: 2393,
        RR: 1817, RS: 1383, CE: 1261, PR: 1125, PA: 927, SC: 816,
      },
      campanhas: [
        ...meta.campanhas,
        {
          id: 'whatsapp-petshops',
          nome: 'Mensagem | Petshops | WhatsApp [Increase] - Copy',
          status: { tipo: 'encerrada', texto: 'Encerrada em 06/09' },
          investimento: 316.56,
          impressoes: 13322,
          cliques: 201,
          leads: 0,
          destaque: 'Campanha de mensagem: 74 conversas iniciadas no WhatsApp, que não contam como lead de cadastro.',
        },
      ],
    },
  },
  notaComercial: `${relatorioSetembro2026.notaComercial} Press kits enviados no mês: 3.`,
  relatoriosAnteriores: [],
  anterior: relatorioAgosto2026,
}
