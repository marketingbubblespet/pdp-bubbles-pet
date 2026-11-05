/**
 * ============================================================================
 *  PAINEL DE INDICADORES · BLACK NOVEMBER 2026 · Bubbles
 *  Apps Script único que lê as duas planilhas (Groomer/B2B e Tutor/B2C),
 *  entrega os dados ao site ofertas.bubbles.com.br/planos/indicadores
 *  e manda e-mail de resumo e alertas.
 * ============================================================================
 *
 *  O QUE ELE FAZ
 *  1. doGet: o site chama a URL deste script (com chave) e recebe os dados do mês em JSON.
 *     Só saem as colunas que o painel usa. Metas, projeções e o resto da planilha não saem.
 *  2. Quando alguém edita a aba NOV26: grava a hora da edição e avisa o site (atualiza em segundos).
 *  3. De hora em hora: confere se os dados mudaram (inclusive os automáticos do Adveronix)
 *     e avisa o site. Também envia o resumo atrasado se o preenchimento acontecer depois das 12h.
 *  4. Todo dia às 11h: avisa o site para pegar os dados automáticos (o Adveronix importa às 10h30).
 *  5. Dias úteis às 12h: e-mail para a equipe com
 *       - "aguardando preenchimento" (lista o que falta), ou
 *       - resumo do dia anterior + alertas negativos.
 *     Sábado e domingo não manda e-mail. Na segunda, o resumo cobre sexta, sábado e domingo.
 *  6. Depois de 01/12/2026 tudo para sozinho (o painel é só de novembro).
 *
 *  SEGURANÇA
 *  - Chaves ficam em Propriedades do script (nunca no código): CHAVE_API e CHAVE_WEBHOOK.
 *  - O script só LÊ as planilhas. Nunca escreve nelas.
 *  - Sem a chave certa, a URL responde "acesso negado" e nada mais.
 *
 *  ANTES DE USAR: siga o guia docs/indicadores/guia-instalacao-apps-script.md
 *  Funções que você roda à mão (menu "Executar"):
 *    gerarChaves()        -> cria as duas chaves e mostra no registro para copiar no Netlify
 *    testarConfiguracao() -> confere acesso às planilhas, colunas, dados e conexão com o site
 *    instalarGatilhos()   -> liga as automações (edição, de hora em hora, 1h e 12h)
 *    removerGatilhos()    -> desliga tudo
 *    testarEmail()        -> manda o resumo agora, para ver como chega
 */

// ============================================================================
//  CONFIGURAÇÃO (o único bloco que pode precisar de ajuste)
// ============================================================================
const CONFIG = {
  PLANILHAS: {
    B2B: { nome: 'Groomer (B2B)', id: '1FQv40SQNB5iIG2sh-FTnASGYVqYs0qANW7_KRPRdNPg', aba: 'NOV26' },
    B2C: { nome: 'Tutor (Care/B2C)', id: '1YwORrKs1goSxIxaLBZAPI3nwci1HmERs6cgqe0Z_XRI', aba: 'NOV26' },
  },
  ANO: 2026,
  MES: 11,
  NOME_MES: 'Novembro 2026',
  META_FATURAMENTO: 560000, // Groomer + Tutor
  DATA_FIM: '2026-12-02', // a partir deste dia o script não faz mais nada (01/12 ainda manda o resumo de 30/11)
  FUSO: 'America/Sao_Paulo',
  EMAILS: ['gabriel@bubbles.com.br', 'mariane@bubbles.com.br'],
  URL_PAINEL: 'https://ofertas.bubbles.com.br/planos/indicadores',
  URL_ATUALIZAR_SITE: 'https://ofertas.bubbles.com.br/api/indicadores/atualizar',
  HORA_RESUMO: 12, // dias úteis
  // Metas usadas nos alertas (as mesmas da linha 3 da planilha B2B)
  METAS: { aprovacao: 0.9333, conversao: 0.028, roas: 12, ticket: 350 },
};

// Colunas lidas em cada planilha, encontradas PELO NOME do cabeçalho (não pela letra).
// Se alguém inserir uma coluna nova, continua funcionando. "grupo" = título da linha de cima,
// usado quando o mesmo nome aparece em mais de um bloco (ex.: "Investimento" do Google Ads).
const COLUNAS = [
  { campo: 'data', cabecalho: 'Data' },
  { campo: 'receita', cabecalho: 'Receita Captada', manual: true },
  { campo: 'faturada', cabecalho: 'Receita Faturada', manual: true },
  { campo: 'pedidos', cabecalho: 'Pedidos Captados', manual: true },
  { campo: 'novos', cabecalho: 'Clientes Novos', opcional: true },
  { campo: 'recorrentes', cabecalho: 'Clientes Recorrentes', opcional: true },
  { campo: 'sessoes', cabecalho: 'Sessões Totais' },
  { campo: 'investMeta', cabecalho: 'Invest. Total Meta' },
  { campo: 'investGoogle', cabecalho: 'Investimento', grupo: 'Google Ads' },
];

// Nome de cada campo no site, por planilha (contrato com src/lib/planos/indicadores-fonte.ts)
const NOME_NO_SITE = {
  B2B: { receita: 'receitaB2B', faturada: 'faturadaB2B', pedidos: 'pedidosB2B', novos: 'novosB2B', recorrentes: 'recorrentesB2B', sessoes: 'sessoes', investMeta: 'investMeta', investGoogle: 'investGoogle' },
  B2C: { receita: 'receitaB2C', faturada: 'faturadaB2C', pedidos: 'pedidosB2C', novos: 'novosB2C', recorrentes: 'recorrentesB2C', sessoes: 'sessoesB2C', investMeta: 'investMetaB2C', investGoogle: 'investGoogleB2C' },
};

const VERSAO = 1;
const CACHE_CHAVE = 'payload_v' + VERSAO;
const CACHE_SEGUNDOS = 120;

// ============================================================================
//  1. ENTREGA DOS DADOS AO SITE
// ============================================================================
function doGet(e) {
  try {
    const chave = lerPropriedade_('CHAVE_API');
    const recebida = (e && e.parameter && e.parameter.k) || '';
    if (!chave || !iguaisSeguro_(recebida, chave)) return json_({ ok: false, erro: 'acesso negado' });

    const cache = CacheService.getScriptCache();
    const guardado = cache.get(CACHE_CHAVE);
    if (guardado) return ContentService.createTextOutput(guardado).setMimeType(ContentService.MimeType.JSON);

    const payload = montarPayload_();
    const texto = JSON.stringify(payload);
    if (texto.length < 90000) cache.put(CACHE_CHAVE, texto, CACHE_SEGUNDOS); // limite do cache: 100 KB
    return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error('doGet falhou: ' + (err && err.stack ? err.stack : err));
    // Nunca devolve detalhes técnicos para fora.
    return json_({ ok: false, erro: 'Erro ao ler a planilha. Veja as execuções do Apps Script.' });
  }
}

function montarPayload_() {
  const avisos = [];
  const lidas = {};
  Object.keys(CONFIG.PLANILHAS).forEach(function (loja) {
    lidas[loja] = lerPlanilha_(loja, avisos);
  });

  const dias = diasDoMes_().map(function (data) {
    const dia = { data: data };
    Object.keys(NOME_NO_SITE).forEach(function (loja) {
      const linha = (lidas[loja] && lidas[loja][data]) || {};
      Object.keys(NOME_NO_SITE[loja]).forEach(function (campo) {
        const v = linha[campo];
        dia[NOME_NO_SITE[loja][campo]] = typeof v === 'number' ? v : null;
      });
    });
    return dia;
  });

  return {
    ok: true,
    versao: VERSAO,
    mes: CONFIG.NOME_MES,
    metaFaturamento: CONFIG.META_FATURAMENTO,
    geradoEm: new Date().toISOString(),
    ultimaEdicaoManual: lerPropriedade_('ULTIMA_EDICAO_MANUAL') || null,
    dias: dias,
    avisos: avisos.slice(0, 20),
  };
}

// ============================================================================
//  2. LEITURA DE UMA PLANILHA (à prova de colunas mudadas e células digitadas como texto)
// ============================================================================
function lerPlanilha_(loja, avisos) {
  const cfg = CONFIG.PLANILHAS[loja];
  let aba, fusoPlanilha;
  try {
    const ss = SpreadsheetApp.openById(cfg.id);
    aba = ss.getSheetByName(cfg.aba);
    // As datas da planilha valem meia-noite NO FUSO DA PLANILHA. Ler em outro fuso desloca 1 dia.
    fusoPlanilha = ss.getSpreadsheetTimeZone() || CONFIG.FUSO;
  } catch (err) {
    avisos.push(cfg.nome + ': sem acesso à planilha.');
    console.error(cfg.nome + ' openById falhou: ' + err);
    return {};
  }
  if (!aba) {
    avisos.push(cfg.nome + ': aba ' + cfg.aba + ' não encontrada.');
    return {};
  }

  // Lê só as primeiras 60 linhas (o mês tem 30 dias + cabeçalhos) e todas as colunas usadas.
  const ultimaColuna = Math.min(aba.getLastColumn(), 200);
  const valores = aba.getRange(1, 1, Math.min(aba.getLastRow(), 60), ultimaColuna).getValues();

  const mapa = mapearColunas_(valores, cfg.nome, avisos);
  if (!mapa) return {};

  const porData = {};
  for (let r = mapa.linhaCabecalho + 1; r < valores.length; r++) {
    const linha = valores[r];
    const data = paraDataISO_(linha[mapa.colunas.data], fusoPlanilha);
    if (!data) continue; // linha TOTAL, vazia ou de outro mês
    const registro = {};
    COLUNAS.forEach(function (c) {
      if (c.campo === 'data' || mapa.colunas[c.campo] == null) return;
      const bruto = linha[mapa.colunas[c.campo]];
      const n = paraNumero_(bruto);
      if (n === undefined) {
        avisos.push(cfg.nome + ' ' + data.slice(8) + '/' + data.slice(5, 7) + ': "' + c.cabecalho + '" não é um número (' + String(bruto).slice(0, 20) + ').');
        registro[c.campo] = null;
      } else {
        registro[c.campo] = n;
      }
    });
    porData[data] = registro;
  }
  return porData;
}

// Acha a linha do cabeçalho (a que tem "Data" e "Receita Captada") e a coluna de cada campo.
function mapearColunas_(valores, nomePlanilha, avisos) {
  let linhaCab = -1;
  for (let r = 0; r < Math.min(valores.length, 25); r++) {
    const nomes = valores[r].map(normalizar_);
    if (nomes.indexOf('data') >= 0 && nomes.indexOf('receita captada') >= 0) { linhaCab = r; break; }
  }
  if (linhaCab < 0) {
    avisos.push(nomePlanilha + ': cabeçalho da tabela diária não encontrado.');
    return null;
  }

  const cab = valores[linhaCab].map(normalizar_);
  // Grupo de cada coluna = último título não vazio na linha de cima, da esquerda para a direita.
  const grupos = [];
  let atual = '';
  const linhaGrupo = linhaCab > 0 ? valores[linhaCab - 1] : [];
  for (let c = 0; c < cab.length; c++) {
    const g = normalizar_(linhaGrupo[c]);
    if (g) atual = g;
    grupos.push(atual);
  }

  const colunas = {};
  COLUNAS.forEach(function (def) {
    const alvo = normalizar_(def.cabecalho);
    const grupoAlvo = def.grupo ? normalizar_(def.grupo) : null;
    const achadas = [];
    for (let c = 0; c < cab.length; c++) {
      if (cab[c] === alvo && (!grupoAlvo || grupos[c] === grupoAlvo)) achadas.push(c);
    }
    if (achadas.length === 0) {
      colunas[def.campo] = null;
      if (!def.opcional) avisos.push(nomePlanilha + ': coluna "' + def.cabecalho + '"' + (def.grupo ? ' (bloco ' + def.grupo + ')' : '') + ' não encontrada.');
    } else {
      colunas[def.campo] = achadas[0];
      if (achadas.length > 1) console.warn(nomePlanilha + ': "' + def.cabecalho + '" aparece ' + achadas.length + ' vezes; usando a primeira.');
    }
  });
  if (colunas.data == null) return null;
  return { linhaCabecalho: linhaCab, colunas: colunas };
}

// ============================================================================
//  3. GATILHOS (automações)
// ============================================================================

// Edição na planilha: grava a hora e avisa o site (com folga de 1 minuto, para juntar várias edições).
function aoEditar(e) {
  executarComSeguranca_('aoEditar', function () {
    if (foraDoPeriodo_()) return;
    if (!e || !e.range) return;
    const aba = e.range.getSheet();
    if (aba.getName() !== CONFIG.PLANILHAS.B2B.aba) return;
    PropertiesService.getScriptProperties().setProperty('ULTIMA_EDICAO_MANUAL', new Date().toISOString());
    CacheService.getScriptCache().remove(CACHE_CHAVE);
    agendarAvisoAoSite_();
  }, false);
}

// Roda 1 minuto depois da última edição (criado por agendarAvisoAoSite_ e apagado em seguida).
function avisoAgendado() {
  executarComSeguranca_('avisoAgendado', function () {
    apagarGatilhosDe_('avisoAgendado');
    PropertiesService.getScriptProperties().deleteProperty('AVISO_AGENDADO_EM');
    atualizarSeMudou_(true);
  }, true);
}

function verificarDeHoraEmHora() {
  executarComSeguranca_('verificarDeHoraEmHora', function () {
    if (foraDoPeriodo_()) return;
    atualizarSeMudou_(false);
    // Resumo pendente: às 12h estava "aguardando"; se o preenchimento chegou depois, manda agora.
    const agora = new Date();
    if (ehDiaUtil_(agora) && horaLocal_(agora) >= CONFIG.HORA_RESUMO && horaLocal_(agora) <= 20) {
      const estado = lerPropriedade_('RESUMO_' + dataISO_(agora));
      if (estado === 'aguardando') enviarResumo_(false);
    }
  }, true);
}

function atualizacaoNoturna() {
  executarComSeguranca_('atualizacaoNoturna', function () {
    if (foraDoPeriodo_()) return;
    CacheService.getScriptCache().remove(CACHE_CHAVE);
    atualizarSeMudou_(true);
  }, true);
}

function enviarResumoDiario() {
  executarComSeguranca_('enviarResumoDiario', function () {
    if (foraDoPeriodo_()) return;
    if (!ehDiaUtil_(new Date())) return; // sábado e domingo: sem e-mail
    enviarResumo_(false);
  }, true);
}

// Compara uma "impressão digital" dos dados com a anterior. Se mudou (ou se forçar), avisa o site.
function atualizarSeMudou_(forcar) {
  CacheService.getScriptCache().remove(CACHE_CHAVE);
  const payload = montarPayload_();
  const digital = Utilities.base64Encode(
    Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, JSON.stringify(payload.dias), Utilities.Charset.UTF_8));
  const props = PropertiesService.getScriptProperties();
  if (!forcar && props.getProperty('DIGITAL_DADOS') === digital) return;
  if (avisarSite_()) props.setProperty('DIGITAL_DADOS', digital);
}

function agendarAvisoAoSite_() {
  const props = PropertiesService.getScriptProperties();
  const ja = Number(props.getProperty('AVISO_AGENDADO_EM') || 0);
  if (ja && Date.now() - ja < 5 * 60 * 1000) return; // já tem um agendado
  apagarGatilhosDe_('avisoAgendado');
  ScriptApp.newTrigger('avisoAgendado').timeBased().after(60 * 1000).create();
  props.setProperty('AVISO_AGENDADO_EM', String(Date.now()));
}

// Chama o site (POST com chave no header). Tenta 3 vezes com espera crescente.
function avisarSite_() {
  const chave = lerPropriedade_('CHAVE_WEBHOOK');
  if (!chave) { console.error('CHAVE_WEBHOOK não configurada.'); return false; }
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const resp = UrlFetchApp.fetch(CONFIG.URL_ATUALIZAR_SITE, {
        method: 'post',
        headers: { 'x-chave': chave },
        muteHttpExceptions: true,
        followRedirects: true,
      });
      const status = resp.getResponseCode();
      if (status === 200) { console.log('Site avisado.'); return true; }
      if (status === 401) { console.error('Site recusou a chave (401). Confira CHAVE_WEBHOOK e INDICADORES_WEBHOOK_SECRET.'); return false; }
      console.warn('Tentativa ' + tentativa + ': site respondeu ' + status);
    } catch (err) {
      console.warn('Tentativa ' + tentativa + ' falhou: ' + err);
    }
    Utilities.sleep(2000 * tentativa);
  }
  return false;
}

// ============================================================================
//  4. E-MAIL: RESUMO, AGUARDANDO PREENCHIMENTO E ALERTAS
// ============================================================================
function enviarResumo_(teste) {
  const agora = new Date();
  const hoje = dataISO_(agora);
  const props = PropertiesService.getScriptProperties();
  if (!teste && props.getProperty('RESUMO_' + hoje) === 'enviado') return;

  const payload = montarPayload_();
  const refs = diasDeReferencia_(agora); // ontem, ou sexta+sábado+domingo na segunda
  const porData = {};
  payload.dias.forEach(function (d) { porData[d.data] = d; });

  const faltando = listarFaltantes_(refs, porData);
  if (faltando.manuais.length > 0) {
    if (!teste && props.getProperty('RESUMO_' + hoje) === 'aguardando') return; // já avisou hoje
    enviarEmail_('[Painel Black] Aguardando preenchimento de ' + refs.map(dataBR_).join(', '),
      htmlAguardando_(refs, faltando, payload.avisos));
    if (!teste) props.setProperty('RESUMO_' + hoje, 'aguardando');
    return;
  }

  const alertas = detectarAnomalias_(payload.dias).filter(function (a) {
    return refs.indexOf(a.data) >= 0 && !(a.direcao === 'alta' && a.indicador !== 'investimento');
  });
  const assunto = alertas.length
    ? '[Painel Black] ' + alertas.length + (alertas.length === 1 ? ' alerta' : ' alertas') + ' em ' + refs.map(dataBR_).join(', ')
    : '[Painel Black] Resumo de ' + refs.map(dataBR_).join(', ') + ': sem alertas';
  enviarEmail_(assunto, htmlResumo_(refs, porData, alertas, faltando, payload));
  if (!teste) props.setProperty('RESUMO_' + hoje, 'enviado');
}

function listarFaltantes_(refs, porData) {
  const manuais = [];
  const automaticos = [];
  refs.forEach(function (data) {
    const d = porData[data] || {};
    Object.keys(NOME_NO_SITE).forEach(function (loja) {
      COLUNAS.forEach(function (c) {
        if (c.campo === 'data' || c.opcional) return;
        if (d[NOME_NO_SITE[loja][c.campo]] == null) {
          const texto = dataBR_(data) + ' · ' + CONFIG.PLANILHAS[loja].nome + ' · ' + c.cabecalho;
          (c.manual ? manuais : automaticos).push(texto);
        }
      });
    });
  });
  return { manuais: manuais, automaticos: automaticos };
}

function enviarEmail_(assunto, html) {
  MailApp.sendEmail({ to: CONFIG.EMAILS.join(','), subject: assunto, htmlBody: html, name: 'Painel Black November' });
}

function htmlAguardando_(refs, faltando, avisos) {
  return estilo_() +
    '<h2>Aguardando preenchimento</h2>' +
    '<p>Ainda faltam dados manuais de <b>' + refs.map(dataBR_).join(', ') + '</b>. O resumo e os alertas saem automaticamente assim que estiverem preenchidos (o script confere de hora em hora até as 20h).</p>' +
    lista_('Faltando (preenchimento manual)', faltando.manuais) +
    lista_('Dados automáticos ainda ausentes (Adveronix)', faltando.automaticos) +
    lista_('Avisos da planilha', avisos) +
    rodape_();
}

function htmlResumo_(refs, porData, alertas, faltando, payload) {
  const linhas = refs.map(function (data) {
    const d = porData[data] || {};
    const receita = (d.receitaB2B || 0) + (d.receitaB2C || 0);
    const pedidos = (d.pedidosB2B || 0) + (d.pedidosB2C || 0);
    return '<tr><td>' + dataBR_(data) + '</td><td>' + reais_(receita) + '</td><td>' + pedidos + '</td><td>' +
      (pedidos ? reais_(receita / pedidos) : '—') + '</td></tr>';
  }).join('');
  const faturado = payload.dias.reduce(function (a, d) { return a + (d.faturadaB2B || 0) + (d.faturadaB2C || 0); }, 0);
  const itens = alertas.map(function (a) {
    return (a.severidade === 'forte' ? '🔴 ' : '🟠 ') + NOMES_[a.indicador] + ' em ' + dataBR_(a.data) + ': ' +
      variacaoTexto_(a, a.vsAnterior) + ' vs dia anterior, ' + variacaoTexto_(a, a.vsMedia) + ' vs média';
  });
  return estilo_() +
    '<h2>Resumo de ' + refs.map(dataBR_).join(', ') + '</h2>' +
    '<table><tr><th>Dia</th><th>Receita captada</th><th>Pedidos</th><th>Ticket</th></tr>' + linhas + '</table>' +
    '<p>Faturado no mês (Groomer + Tutor): <b>' + reais_(faturado) + '</b> de ' + reais_(CONFIG.META_FATURAMENTO) +
    ' (' + (faturado / CONFIG.META_FATURAMENTO * 100).toFixed(1).replace('.', ',') + '%).</p>' +
    (alertas.length ? lista_('Alertas (quedas fora do normal)', itens) : '<p>✅ Nenhuma queda fora do normal.</p>') +
    lista_('Dados automáticos ainda ausentes', faltando.automaticos) +
    '<p>Causas prováveis e plano de ação de cada alerta: abra o painel e clique em "Detalhes de alerta".</p>' +
    rodape_();
}

// ============================================================================
//  5. ANOMALIAS (mesma lógica do painel: src/lib/planos/anomalias.ts)
// ============================================================================
const NOMES_ = {
  receita: 'Receita captada (Groomer)', pedidos: 'Pedidos (Groomer)', sessoes: 'Sessões (Groomer)',
  aprovacao: '% de aprovação (Groomer)', conversao: 'Taxa de conversão (Groomer)',
  investimento: 'Investimento (Groomer)', roas: 'ROAS (Groomer)', ticket: 'Ticket médio (Groomer)',
};

function valorDoDia_(d, i) {
  const div = function (a, b) { return a != null && b != null && b > 0 ? a / b : null; };
  const invest = d.investMeta != null && d.investGoogle != null ? d.investMeta + d.investGoogle : null;
  switch (i) {
    case 'receita': return d.receitaB2B;
    case 'pedidos': return d.pedidosB2B;
    case 'sessoes': return d.sessoes;
    case 'aprovacao': return div(d.faturadaB2B, d.receitaB2B);
    case 'conversao': return div(d.pedidosB2B, d.sessoes);
    case 'investimento': return invest;
    case 'roas': return div(d.receitaB2B, invest);
    case 'ticket': return div(d.receitaB2B, d.pedidosB2B);
  }
  return null;
}

function detectarAnomalias_(dias) {
  const saida = [];
  Object.keys(NOMES_).forEach(function (i) {
    const base = [];
    dias.forEach(function (d) {
      const v = valorDoDia_(d, i);
      if (v == null) return;
      if (base.length) {
        const ant = base[base.length - 1];
        const media = base.reduce(function (a, h) { return a + h.v; }, 0) / base.length;
        const rel = function (x, b) { return i === 'aprovacao' ? x - b : (b > 0 ? (x - b) / b : 0); };
        const vsAnterior = rel(v, ant.v), vsMedia = rel(v, media);
        const pior = Math.abs(vsAnterior) >= Math.abs(vsMedia) ? vsAnterior : vsMedia;
        let r = null;
        if (i === 'aprovacao') {
          if (pior <= -0.03) r = { direcao: 'queda', severidade: pior <= -0.06 ? 'forte' : 'moderada' };
        } else if (Math.abs(pior) >= 0.3) {
          r = { direcao: pior < 0 ? 'queda' : 'alta', severidade: Math.abs(pior) >= 0.5 ? 'forte' : 'moderada' };
        }
        if (r) saida.push({ data: d.data, indicador: i, direcao: r.direcao, severidade: r.severidade, vsAnterior: vsAnterior, vsMedia: vsMedia });
        if (r && r.direcao === 'alta') return; // pico positivo não entra na base
      }
      base.push({ data: d.data, v: v });
    });
  });
  return saida;
}

function variacaoTexto_(a, v) {
  if (a.indicador === 'aprovacao') return (v >= 0 ? '+' : '') + (v * 100).toFixed(1).replace('.', ',') + ' pontos';
  return (v >= 0 ? '+' : '') + Math.round(v * 100) + '%';
}

// ============================================================================
//  6. FUNÇÕES PARA RODAR À MÃO
// ============================================================================
function gerarChaves() {
  const props = PropertiesService.getScriptProperties();
  const nova = function () { return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''); };
  if (!props.getProperty('CHAVE_API')) props.setProperty('CHAVE_API', nova());
  if (!props.getProperty('CHAVE_WEBHOOK')) props.setProperty('CHAVE_WEBHOOK', nova());
  console.log('Copie para o Netlify (Environment variables):');
  console.log('SHEETS_SCRIPT_KEY = ' + props.getProperty('CHAVE_API'));
  console.log('INDICADORES_WEBHOOK_SECRET = ' + props.getProperty('CHAVE_WEBHOOK'));
  console.log('Rodar de novo NÃO troca as chaves. Para trocar, apague-as em Configurações do projeto > Propriedades do script.');
}

function testarConfiguracao() {
  const ok = [], erros = [];
  const props = PropertiesService.getScriptProperties();
  (props.getProperty('CHAVE_API') ? ok : erros).push('CHAVE_API ' + (props.getProperty('CHAVE_API') ? 'configurada' : 'AUSENTE: rode gerarChaves()'));
  (props.getProperty('CHAVE_WEBHOOK') ? ok : erros).push('CHAVE_WEBHOOK ' + (props.getProperty('CHAVE_WEBHOOK') ? 'configurada' : 'AUSENTE: rode gerarChaves()'));
  if (Session.getScriptTimeZone() !== CONFIG.FUSO) erros.push('Fuso do projeto é ' + Session.getScriptTimeZone() + '; mude para ' + CONFIG.FUSO + ' (Configurações do projeto).');
  else ok.push('Fuso horário: ' + CONFIG.FUSO);

  const avisos = [];
  Object.keys(CONFIG.PLANILHAS).forEach(function (loja) {
    const dados = lerPlanilha_(loja, avisos);
    const datas = Object.keys(dados);
    const comReceita = datas.filter(function (d) { return dados[d].receita != null; });
    if (datas.length >= 28) ok.push(CONFIG.PLANILHAS[loja].nome + ': ' + datas.length + ' dias encontrados, ' + comReceita.length + ' com receita preenchida.');
    else erros.push(CONFIG.PLANILHAS[loja].nome + ': só ' + datas.length + ' dias encontrados (esperado 30).');
    if (datas[0]) console.log(CONFIG.PLANILHAS[loja].nome + ' · exemplo ' + datas[0] + ': ' + JSON.stringify(dados[datas[0]]));
  });
  avisos.forEach(function (a) { erros.push('Aviso: ' + a); });

  if (props.getProperty('CHAVE_WEBHOOK')) {
    if (avisarSite_()) ok.push('Conexão com o site: OK (o site aceitou o aviso de atualização).');
    else erros.push('Conexão com o site falhou: confira INDICADORES_WEBHOOK_SECRET no Netlify e se o deploy novo já subiu.');
  }

  console.log('===== OK =====\n' + ok.join('\n'));
  console.log('===== PROBLEMAS =====\n' + (erros.length ? erros.join('\n') : 'nenhum'));
}

function instalarGatilhos() {
  removerGatilhos();
  Object.keys(CONFIG.PLANILHAS).forEach(function (loja) {
    ScriptApp.newTrigger('aoEditar').forSpreadsheet(CONFIG.PLANILHAS[loja].id).onEdit().create();
  });
  ScriptApp.newTrigger('verificarDeHoraEmHora').timeBased().everyHours(1).create();
  ScriptApp.newTrigger('atualizacaoNoturna').timeBased().atHour(11).everyDays(1).inTimezone(CONFIG.FUSO).create();
  ScriptApp.newTrigger('enviarResumoDiario').timeBased().atHour(CONFIG.HORA_RESUMO).everyDays(1).inTimezone(CONFIG.FUSO).create();
  console.log('Gatilhos instalados: ' + ScriptApp.getProjectTriggers().length + ' (esperado 5).');
}

function removerGatilhos() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  PropertiesService.getScriptProperties().deleteProperty('AVISO_AGENDADO_EM');
  console.log('Todos os gatilhos removidos.');
}

function testarEmail() {
  enviarResumo_(true);
  console.log('E-mail de teste enviado para ' + CONFIG.EMAILS.join(', '));
}

// ============================================================================
//  7. UTILITÁRIOS
// ============================================================================

// Trava (evita duas execuções ao mesmo tempo) + captura de erro + e-mail de erro (no máximo 1 a cada 6h).
function executarComSeguranca_(nome, fn, avisarErroPorEmail) {
  const trava = LockService.getScriptLock();
  if (!trava.tryLock(30000)) { console.warn(nome + ': outra execução em andamento, pulando.'); return; }
  try {
    fn();
  } catch (err) {
    console.error(nome + ' falhou: ' + (err && err.stack ? err.stack : err));
    if (avisarErroPorEmail) notificarErro_(nome, err);
  } finally {
    trava.releaseLock();
  }
}

function notificarErro_(nome, err) {
  try {
    const props = PropertiesService.getScriptProperties();
    const ultimo = Number(props.getProperty('ULTIMO_EMAIL_ERRO') || 0);
    if (Date.now() - ultimo < 6 * 3600 * 1000) return;
    MailApp.sendEmail({
      to: CONFIG.EMAILS[0],
      subject: '[Painel Black] Erro no script: ' + nome,
      htmlBody: estilo_() + '<p>A função <b>' + nome + '</b> falhou:</p><pre>' + escapar_(String(err)).slice(0, 1500) +
        '</pre><p>Veja o detalhe em script.google.com > Execuções.</p>',
      name: 'Painel Black November',
    });
    props.setProperty('ULTIMO_EMAIL_ERRO', String(Date.now()));
  } catch (e) {
    console.error('Falha ao enviar e-mail de erro: ' + e);
  }
}

function apagarGatilhosDe_(funcao) {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === funcao) ScriptApp.deleteTrigger(t);
  });
}

// "R$ 15.666,12" -> 15666.12 · 1234 -> 1234 · "" -> null · "abc" -> undefined (inválido)
function paraNumero_(v) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') return isFinite(v) ? v : undefined;
  if (v instanceof Date) return undefined;
  let s = String(v).replace(/R\$/gi, '').replace(/[\s ]/g, '').replace(/%$/, '');
  if (s === '' || s === '-' || s === '—') return null;
  if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.'); // padrão brasileiro: 1.234,56
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, ''); // "2.167" = dois mil (milhar)
  const n = Number(s);
  return isFinite(n) ? n : undefined;
}

// Date ou "01/11/2026" -> "2026-11-01", só se for do mês configurado.
// fuso = fuso da PLANILHA (Arquivo > Configurações), não o do script.
function paraDataISO_(v, fuso) {
  let iso = null;
  if (v instanceof Date && !isNaN(v)) iso = Utilities.formatDate(v, fuso || CONFIG.FUSO, 'yyyy-MM-dd');
  else if (typeof v === 'string') {
    const m = v.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) iso = m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2);
  }
  if (!iso) return null;
  const prefixo = CONFIG.ANO + '-' + ('0' + CONFIG.MES).slice(-2) + '-';
  return iso.indexOf(prefixo) === 0 ? iso : null;
}

function diasDoMes_() {
  const total = new Date(CONFIG.ANO, CONFIG.MES, 0).getDate();
  const lista = [];
  for (let d = 1; d <= total; d++) lista.push(CONFIG.ANO + '-' + ('0' + CONFIG.MES).slice(-2) + '-' + ('0' + d).slice(-2));
  return lista;
}

// Segunda: sexta, sábado e domingo. Outros dias úteis: ontem. Sempre dentro do mês.
function diasDeReferencia_(agora) {
  const diaSemana = Number(Utilities.formatDate(agora, CONFIG.FUSO, 'u')); // 1=segunda ... 7=domingo
  const voltar = diaSemana === 1 ? [3, 2, 1] : [1];
  return voltar.map(function (n) { return dataISO_(new Date(agora.getTime() - n * 86400000)); })
    .filter(function (d) { return diasDoMes_().indexOf(d) >= 0; });
}

function ehDiaUtil_(data) { return Number(Utilities.formatDate(data, CONFIG.FUSO, 'u')) <= 5; }
function horaLocal_(data) { return Number(Utilities.formatDate(data, CONFIG.FUSO, 'H')); }
function dataISO_(data) { return Utilities.formatDate(data, CONFIG.FUSO, 'yyyy-MM-dd'); }
function dataBR_(iso) { return iso.slice(8) + '/' + iso.slice(5, 7); }
function foraDoPeriodo_() { return dataISO_(new Date()) >= CONFIG.DATA_FIM; }

function normalizar_(v) {
  return String(v == null ? '' : v).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

function iguaisSeguro_(a, b) {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

function lerPropriedade_(nome) { return PropertiesService.getScriptProperties().getProperty(nome); }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function reais_(v) { return 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function escapar_(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function lista_(titulo, itens) {
  if (!itens || !itens.length) return '';
  return '<h3>' + titulo + '</h3><ul>' + itens.map(function (i) { return '<li>' + escapar_(i) + '</li>'; }).join('') + '</ul>';
}
function estilo_() {
  return '<style>body{font-family:Arial,sans-serif;color:#0D0C0D}h2{color:#E8649A}table{border-collapse:collapse}' +
    'td,th{border:1px solid #E5E7EB;padding:6px 10px;text-align:left}</style>';
}
function rodape_() {
  return '<p style="margin-top:24px"><a href="' + CONFIG.URL_PAINEL + '">Abrir o painel</a> (senha do /planos).</p>' +
    '<p style="color:#666;font-size:12px">E-mail automático do Apps Script do Painel Black November. Para parar, rode removerGatilhos().</p>';
}
