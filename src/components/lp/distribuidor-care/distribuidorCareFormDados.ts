// Dados do B13 (formulário) da LP /distribuidor-care: rótulos, opções, as 27 UFs, erros e telas.
// TypeScript puro, sem 'use client', sem import de componente e sem segredo. A rota de API importa daqui
// para validar com as mesmas listas. Textos com {chave} são preenchidos pelo componente.

export const DISTRIBUIDOR_CARE_TIPOS_NEGOCIO = [
  { value: 'distribuidor_pet', label: 'Distribuidor pet' },
  { value: 'distribuidor_agro_vet', label: 'Distribuidor agro ou veterinário' },
  { value: 'distribuidor_beleza', label: 'Distribuidor de beleza' },
  { value: 'atacadista', label: 'Atacadista' },
  { value: 'pet_shop_loja', label: 'Pet shop ou loja' },
  { value: 'outro', label: 'Outro' },
] as const

export const DISTRIBUIDOR_CARE_FORM = {
  progresso: 'Etapa {n} de 4',
  etapas: ['Sobre o seu negócio', 'Como é a sua operação?', 'Seus dados', 'Última pergunta'],

  rotulos: {
    tipo: 'Tipo de negócio',
    tipoOutro: 'Qual é o seu negócio? (opcional)',
    estado: 'Estado',
    cidade: 'Cidade',
    vendedores: 'Quantos vendedores externos você tem?',
    pdvs: 'Quantos pontos de venda você atende?',
    linhaPet: 'Já trabalha com linha pet?',
    nome: 'Nome',
    cargo: 'Cargo',
    whatsapp: 'WhatsApp',
    email: 'E-mail (opcional)',
    cnpj: 'CNPJ',
    semCnpj: 'Ainda não tenho CNPJ',
    pedido: 'O pedido inicial parte de R$ 3 mil. Faz sentido para a sua operação agora?',
    contatoTitulo: 'Como prefere que a gente fale com você?',
    canal: 'Canal',
    horario: 'Melhor horário',
    emailContato: 'E-mail',
  },

  placeholders: {
    tipoOutro: 'Ex.: distribuidora de higiene e limpeza',
    estado: 'Selecione o estado',
    cidade: 'Ex.: Campinas',
    nome: 'Nome e sobrenome',
    whatsapp: '(00) 00000-0000',
    email: 'nome@empresa.com.br',
    cnpj: '00.000.000/0000-00',
  },
  ajudaWhatsapp: 'Com DDD.',

  vendedores: [{ value: 'nenhum', label: 'Nenhum' }, { value: '1_3', label: '1 a 3' }, { value: '4_10', label: '4 a 10' }, { value: 'mais_10', label: 'Mais de 10' }],
  pdvs: [{ value: 'ate_50', label: 'Até 50' }, { value: '51_200', label: '51 a 200' }, { value: '201_500', label: '201 a 500' }, { value: 'mais_500', label: 'Mais de 500' }],
  linhaPet: [{ value: 'sim', label: 'Sim' }, { value: 'ainda_nao', label: 'Ainda não' }],
  cargos: [{ value: 'dono_socio', label: 'Dono ou sócio' }, { value: 'comprador', label: 'Comprador' }, { value: 'gerente_comercial', label: 'Gerente comercial' }, { value: 'outro', label: 'Outro' }],
  canais: [{ value: 'whatsapp', label: 'WhatsApp' }, { value: 'ligacao', label: 'Ligação' }, { value: 'email', label: 'E-mail' }],
  horarios: [{ value: 'manha', label: 'Manhã' }, { value: 'tarde', label: 'Tarde' }, { value: 'qualquer', label: 'Qualquer horário' }],
  pedido: [{ value: 'sim', label: 'Sim' }, { value: 'agora_nao', label: 'Agora não' }],
  ufs: [
    { sigla: 'AC', nome: 'Acre' }, { sigla: 'AL', nome: 'Alagoas' }, { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' }, { sigla: 'BA', nome: 'Bahia' }, { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' }, { sigla: 'ES', nome: 'Espírito Santo' }, { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' }, { sigla: 'MT', nome: 'Mato Grosso' }, { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' }, { sigla: 'PA', nome: 'Pará' }, { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' }, { sigla: 'PE', nome: 'Pernambuco' }, { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' }, { sigla: 'RN', nome: 'Rio Grande do Norte' }, { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' }, { sigla: 'RR', nome: 'Roraima' }, { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' }, { sigla: 'SE', nome: 'Sergipe' }, { sigla: 'TO', nome: 'Tocantins' },
  ],

  erros: {
    tipo: 'Escolha o tipo do seu negócio.',
    estado: 'Escolha o estado.',
    cidade: 'Digite a sua cidade.',
    vendedores: 'Escolha quantos vendedores externos você tem.',
    pdvs: 'Escolha quantos pontos de venda você atende.',
    linhaPet: 'Responda se já trabalha com linha pet.',
    nome: 'Digite o seu nome.',
    cargo: 'Escolha o seu cargo.',
    whatsapp: 'Digite o WhatsApp com DDD, por exemplo (14) 99999-9999.',
    email: 'Digite um e-mail válido, por exemplo nome@empresa.com.br.',
    cnpjIncompleto: 'Digite os 14 números do CNPJ.',
    cnpjInvalido: 'Este CNPJ não é válido. Revise os números.',
    emailContatoVazio: 'Digite o seu e-mail para o nosso time falar com você por e-mail.',
  },

  // Rótulos curtos do resumo de erros (região aria-live)
  rotulosCurtos: {
    'dc-grupo-tipo': 'Tipo de negócio', 'dc-estado': 'Estado', 'dc-cidade': 'Cidade',
    'dc-grupo-vendedores': 'Vendedores externos', 'dc-grupo-pdvs': 'Pontos de venda', 'dc-grupo-linha-pet': 'Linha pet',
    'dc-nome': 'Nome', 'dc-grupo-cargo': 'Cargo', 'dc-whatsapp': 'WhatsApp', 'dc-email': 'E-mail', 'dc-cnpj': 'CNPJ',
    'dc-email-contato': 'E-mail',
  },
  anuncios: {
    etapa: 'Etapa {n} de 4: {titulo}',
    umErro: 'Revise o campo {rotulo}.',
    variosErros: 'Revise os campos: {rotulos}.',
    salvando: 'Salvando os seus dados.',
  },

  privacidade: { texto: 'Seus dados ficam com a Bubbles® e servem só para este contato.', link: 'Política de Privacidade' },
  // [CONFIRMAR COM O GESTOR] frase extra junto do aviso de privacidade (pendência 9); até a resposta, não é exibida
  privacidadeExtra: 'O que você preencher fica salvo só nesta aba até o envio.',
  honeypot: 'Não preencha este campo',

  botoes: {
    continuar: 'Continuar',
    voltar: 'Voltar',
    final: 'Quero ser distribuidor Care',
    tentarDeNovo: 'Tentar de novo',
    whatsapp: 'Quero falar no WhatsApp',
    desvio: 'Quero ver a Linha Care',
  },

  telas: {
    sucessoTitulo: 'Recebemos.',
    sucessoPeriodo: 'O nosso time de atendimento fala com você pelo {canal}, no período da {periodo}, em horário comercial.',
    sucessoQualquer: 'O nosso time de atendimento fala com você pelo {canal} em horário comercial.',
    canalNoTexto: { whatsapp: 'WhatsApp', ligacao: 'telefone', email: 'e-mail' },
    periodoNoTexto: { manha: 'manhã', tarde: 'tarde' },
    desvioTitulo: 'Obrigado pelo interesse.',
    desvioTexto: 'Para comprar a Linha Care para a sua loja ou para o seu pet, ela está no nosso site.',
    falhaSellumTitulo: 'Recebemos os seus dados.',
    falhaSellumTexto: 'Tivemos uma instabilidade no nosso sistema e o nosso time já foi avisado. Se preferir adiantar, fale com a gente agora pelo WhatsApp.',
    falhaSellumMensagem: 'Olá. Acabei de me cadastrar para ser distribuidor Linha Care. ID do cadastro: {leadId}',
    falhaTotalTexto: 'Não conseguimos salvar os seus dados agora. Verifique a sua conexão e tente de novo. Se preferir, fale com o nosso time pelo WhatsApp.',
    falhaTotalMensagem: 'Olá. Tentei me cadastrar para ser distribuidor Linha Care e não consegui. ID do cadastro: {leadId}',
  },
} as const
