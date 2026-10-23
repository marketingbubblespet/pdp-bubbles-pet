// Dados do B6 (vitrine) da LP /distribuidor-care: abas, os 11 produtos e os 8 kits.
// TypeScript puro, sem 'use client', sem import de componente e sem segredo. Textos dos painéis só das fichas técnicas.
// Ids e caminhos de foto copiados de src/lib/care.ts (regra 17: nada importado de outra LP).

export type AbaVitrine = 'limpar' | 'hidratar' | 'finalizar' | 'cuidado-diario'
export const DISTRIBUIDOR_CARE_ABAS = [
  { id: 'limpar', rotulo: 'Limpar' },
  { id: 'hidratar', rotulo: 'Hidratar' },
  { id: 'finalizar', rotulo: 'Finalizar' },
  { id: 'cuidado-diario', rotulo: 'Cuidado diário' },
] as const

const USO_SHAMPOO = 'Aplicar na pelagem molhada, massagear até formar espuma e enxaguar. Repetir se necessário.'
const USO_ENXAGUE = 'Depois do shampoo, aplicar na pelagem úmida no sentido dos pelos, deixar agir alguns minutos e enxaguar.'
const USO_SPLASH = 'Borrifar a cerca de 15 cm na pelagem seca, evitando olhos, focinho, boca e ouvidos. Não enxaguar.'
const KIT_COMPLETO = 'Kit Completo Linha Care Bubbles'

export type ProdutoVitrine = {
  id: string; aba: AbaVitrine; nome: string; volume: string; idealParaOCaixa: boolean; imagem: string
  frase: string; paraQueServe: string; fragrancia?: string; comoUsar: string
  combinaCom: readonly string[]; nosKits: readonly string[]; provisorio?: boolean
}

// [CONFIRMAR COM O GESTOR] seleção do "Combina com" de cada produto (pendência 3)
export const DISTRIBUIDOR_CARE_PRODUTOS: readonly ProdutoVitrine[] = [
  { id: 'shampoo-neutro', aba: 'limpar', nome: 'Shampoo Neutro', volume: '300 ml', idealParaOCaixa: false, imagem: '/images/care/care_shampoo-neutro_300ml.webp',
    frase: 'Limpeza suave do dia a dia, sem agredir os pelos',
    paraQueServe: 'Shampoo de limpeza suave, que remove as impurezas do dia a dia sem agredir os pelos e deixa a pelagem limpa, macia, brilhante e com toque agradável. Tem BIOEX AO, um blend de extratos vegetais, e extrato de algas verdes, que contribuem para o condicionamento dos fios.',
    comoUsar: USO_SHAMPOO,
    combinaCom: ['Máscara Multifuncional', 'Condicionador Hidratante'], nosKits: ['Kit Pet Banho Completo Care', KIT_COMPLETO] },
  { id: 'shampoo-limpeza-profunda', aba: 'limpar', nome: 'Shampoo Limpeza Profunda', volume: '300 ml', idealParaOCaixa: false, imagem: '/images/care/care_shampoo-limpeza-profunda_300ml.webp',
    frase: 'Limpeza eficiente que ajuda a controlar odores',
    paraQueServe: 'Shampoo de limpeza eficiente, que auxilia na remoção de impurezas e odores e deixa a pelagem limpa, leve, macia e com brilho. Tem Deoplex Clear, que ajuda no controle dos odores e prolonga a sensação de limpeza, além de Polímero W25 e extrato de frutas, que condicionam os pelos.',
    comoUsar: USO_SHAMPOO,
    combinaCom: ['Máscara Multifuncional', 'Condicionador Hidratante'], nosKits: ['Kit Pet Tratamento Profundo Care', KIT_COMPLETO] },
  { id: 'shampoo-pelos-claros', aba: 'limpar', nome: 'Shampoo Pelos Claros', volume: '300 ml', idealParaOCaixa: false, imagem: '/images/care/care_shampoo-pelos-claros_300ml.webp',
    frase: 'Realça a luminosidade de pelagens claras',
    paraQueServe: 'Shampoo para pelagem clara, branca ou grisalha. A tecnologia óptica (branqueador óptico) realça a luminosidade natural dos pelos e ajuda a minimizar o aspecto amarelado, e o BIOEX AO, blend de extratos vegetais, contribui para uma pelagem limpa, macia e com brilho.',
    comoUsar: USO_SHAMPOO,
    combinaCom: ['Máscara Multifuncional', 'Condicionador Hidratante'], nosKits: ['Kit Pet Pelos Claros Care', KIT_COMPLETO] },
  { id: 'mascara-multifuncional', aba: 'hidratar', nome: 'Máscara Multifuncional', volume: '100 ml', idealParaOCaixa: false, imagem: '/images/care/care_mascara-multifuncional_100ml.webp',
    frase: 'Hidrata e nutre com karité, abacate e pantenol',
    paraQueServe: 'Máscara que hidrata e nutre a pelagem e contribui para maciez, brilho e resistência da fibra. Reúne manteiga de karité, óleo de abacate e pantenol, que também melhora a penteabilidade.',
    comoUsar: USO_ENXAGUE,
    combinaCom: ['Condicionador Hidratante'], nosKits: ['Kit Pet Tratamento Profundo Care', 'Kit Pet Pelos Claros Care', 'Kit Pet Cuidado Total Care', KIT_COMPLETO] },
  { id: 'condicionador-hidratante', aba: 'hidratar', nome: 'Condicionador Hidratante', volume: '250 g', idealParaOCaixa: false, imagem: '/images/care/care_condicionador-hidratante_300ml.webp',   // nome do arquivo errado: não renomear
    frase: 'Hidrata e desembaraça, com óleo de argan e girassol',
    paraQueServe: 'Condicionador que hidrata e desembaraça a pelagem, ajuda a reduzir os nós e facilita a escovação, deixando os pelos alinhados, macios e com toque sedoso. Combina óleo de argan, óleo de girassol e um blend de silicones que forma um filme protetor sobre os fios.',
    comoUsar: USO_ENXAGUE,
    combinaCom: ['Máscara Multifuncional', 'Secagem Rápida'], nosKits: ['Kit Pet Banho Completo Care', 'Kit Pet Tratamento Profundo Care', 'Kit Pet Pelos Claros Care', KIT_COMPLETO] },
  { id: 'secagem-rapida', aba: 'finalizar', nome: 'Secagem Rápida', volume: '100 ml', idealParaOCaixa: false, imagem: '/images/care/care_acelerador-de-secagem_100ml.webp',
    frase: 'Leave-in que ajuda a reduzir o tempo de secagem',
    paraQueServe: 'Leave-in sem enxágue que auxilia na redução do tempo de secagem e facilita a escovação, com acabamento leve, macio e sedoso, sem pesar. Tem Covertrix®, que ajuda a equilibrar a umidade dos pelos durante a secagem, e CLX-E, condicionante que facilita o desembaraço.',
    comoUsar: 'Após o banho, borrifar a cerca de 15 cm na pelagem úmida, espalhar e seguir com a secagem. Não enxaguar.',
    combinaCom: ['Condicionador Hidratante', 'Body Splash Flora', 'Body Splash Luna'], nosKits: ['Kit Pet Banho Completo Care', 'Kit Pet Tratamento Profundo Care', KIT_COMPLETO] },
  { id: 'body-splash-flora', aba: 'finalizar', nome: 'Body Splash Flora', volume: '80 ml', idealParaOCaixa: true, imagem: '/images/care/care_body-splash-flora_80ml.webp',
    frase: 'Perfuma com delicadeza, sem pesar a pelagem',
    paraQueServe: 'Body splash que perfuma delicadamente a pelagem e deixa sensação de frescor e bem-estar, com fragrância duradoura e sem pesar os pelos. Tem glicerina, que ajuda a manter a maciez.',
    fragrancia: 'Floral · notas de lavanda e jasmim · sem álcool',   // fonte: rótulo
    comoUsar: USO_SPLASH,
    combinaCom: ['Secagem Rápida', 'Banho a Seco'], nosKits: ['Kit Pet Tratamento Profundo Care', KIT_COMPLETO] },
  { id: 'body-splash-luna', aba: 'finalizar', nome: 'Body Splash Luna', volume: '80 ml', idealParaOCaixa: true, imagem: '/images/care/care_body-splash-luna_80ml.webp',
    frase: 'Frescor e fragrância duradoura, sem pesar os pelos',
    paraQueServe: 'Body splash que perfuma a pelagem com fragrância duradoura e deixa sensação de frescor e bem-estar, sem pesar os pelos. Tem glicerina, que ajuda a manter a maciez.',
    fragrancia: 'Amadeirada · notas de âmbar e jasmim · sem álcool',   // fonte: rótulo
    comoUsar: USO_SPLASH,
    combinaCom: ['Secagem Rápida', 'Banho a Seco'], nosKits: ['Kit Pet Banho Completo Care', KIT_COMPLETO] },
  { id: 'banho-a-seco', aba: 'cuidado-diario', nome: 'Banho a Seco', volume: '250 ml', idealParaOCaixa: true, imagem: '/images/care/care_banho-a-seco_300ml.webp',   // nome do arquivo errado: não renomear
    frase: 'Higiene entre banhos, sem enxágue e sem resíduo',
    paraQueServe: 'Banho a seco para manter a higiene da pelagem entre os banhos, sem enxágue. Facilita a escovação, ajuda no desembaraço e deixa os pelos macios e suavemente perfumados, sem pesar nem deixar resíduos. Tem glicerina e extrato de aloe vera.',
    comoUsar: 'Agitar, borrifar a cerca de 15 cm na pelagem seca ou usar um pano umedecido, espalhar e escovar. Não enxaguar.',
    combinaCom: ['Hidratante de Patas e Focinho', 'Limpeza de Olhos e Ouvidos'], nosKits: ['Kit Pet Cuidado Total Care', 'Kit Pet Cuidados Essenciais', KIT_COMPLETO] },
  { id: 'hidratante-patas-focinhos', aba: 'cuidado-diario', nome: 'Hidratante de Patas e Focinho', volume: '50 ml', idealParaOCaixa: true, imagem: '/images/care/care_hidratante-patas-focinho_50ml.webp',
    frase: 'Balm que hidrata e ajuda a proteger patas e focinho',
    paraQueServe: 'Balm que forma uma barreira cosmética sobre a pele das patinhas e do focinho, ajudando a reduzir o ressecamento e a manter a região macia e nutrida. Tem ceras de candelila e de carnaúba e manteiga de karité, com rápida absorção para uso frequente.',
    comoUsar: 'Com a região limpa e seca, aplicar pouca quantidade e espalhar até absorver. Reaplicar quando precisar.',
    combinaCom: ['Banho a Seco', 'Limpeza de Olhos e Ouvidos'], nosKits: ['Kit Pet Cuidado Total Care', 'Kit Pet Cuidados Essenciais', KIT_COMPLETO] },
  { id: 'limpeza-olhos-ouvidos', aba: 'cuidado-diario', nome: 'Limpeza de Olhos e Ouvidos', volume: '100 ml', idealParaOCaixa: false,
    provisorio: true,   // PROVISÓRIO: sem ficha técnica; texto neutro a validar com o time. [CONFIRMAR COM O GESTOR] (pendência 4)
    imagem: '/images/care/care_limpeza-olhos-e-ouvidos_100ml.webp',
    frase: 'Higiene suave da área dos olhos e das orelhas',
    paraQueServe: 'Solução para a higiene suave da área externa dos olhos e das orelhas, no cuidado do dia a dia.',
    comoUsar: 'Umedecer um algodão e limpar a área externa dos olhos e das orelhas. Não pingar no canal do ouvido.',
    combinaCom: ['Banho a Seco', 'Hidratante de Patas e Focinho'], nosKits: ['Kit Pet Cuidado Total Care', 'Kit Pet Cuidados Essenciais', KIT_COMPLETO] },
]

const CDN = 'https://cdn.shopify.com/s/files/1/0627/3322/1999/files'
export type KitVitrine = {
  nome: string; handle: string; itens: number; resumo?: string
  composicao: readonly string[] | null; imagem: string | null; alt: string
}

// url de referência: `https://www.bubbles.com.br/products/${handle}` (nunca renderizar como link)
// [CONFIRMAR COM O GESTOR] "Kit Completo Linha Care Bubbles" sem ® no nome (pendência 6)
export const DISTRIBUIDOR_CARE_KITS: readonly KitVitrine[] = [
  { nome: 'Kit Pet Banho Completo Care', handle: 'kit-pet-banho-competo-care-2c', itens: 4,
    composicao: ['Shampoo Neutro Care 300 ml', 'Condicionador Hidratante Care 250 g', 'Secagem Rápida Care 100 ml', 'Body Splash Luna Care 80 ml'],
    imagem: `${CDN}/TELA_01_-_A_6.png?v=1789303225`,
    alt: 'Kit Pet Banho Completo Care: shampoo neutro, condicionador hidratante, secagem rápida e body splash luna' },
  { nome: 'Kit Pet Tratamento Profundo Care', handle: 'kit-pet-tratamento-profundo-care-2c', itens: 5,
    composicao: ['Shampoo Limpeza Profunda Care 300 ml', 'Máscara Multifuncional Care 100 ml', 'Condicionador Hidratante Care 250 g', 'Secagem Rápida Care 100 ml', 'Body Splash Flora Care 80 ml'],
    imagem: `${CDN}/TELA_01_-_A_2.png?v=1788357214`,
    alt: 'Kit Pet Tratamento Profundo Care: shampoo limpeza profunda, máscara multifuncional, condicionador hidratante, secagem rápida e body splash flora' },
  { nome: 'Kit Pet Pelos Claros Care', handle: 'kit-pet-pelos-claros-care-2c', itens: 4,
    // a loja se contradiz entre Flora e Luna neste kit: sem fragrância
    composicao: ['Shampoo Pelos Claros Care 300 ml', 'Máscara Multifuncional Care 100 ml', 'Condicionador Hidratante Care 250 g', 'Body Splash Care 80 ml'],
    imagem: `${CDN}/TELA_01_-_A_3.png?v=1788357256`,
    alt: 'Kit Pet Pelos Claros Care: shampoo pelos claros, máscara multifuncional, condicionador hidratante e body splash' },
  { nome: 'Kit Pet Cuidado Total Care', handle: 'kit-pet-cuidado-total-care-2c', itens: 5,
    // a loja se contradiz entre Flora e Luna neste kit: sem fragrância
    composicao: ['Máscara Multifuncional Care 100 ml', 'Body Splash Care 80 ml', 'Hidratante de Patas e Focinho Care 50 ml', 'Limpeza de Olhos e Ouvidos Care 100 ml', 'Banho a Seco Care 250 ml'],
    imagem: `${CDN}/TELA_01_-_A_1.png?v=1788357153`,
    alt: 'Kit Pet Cuidado Total Care: máscara multifuncional, body splash, hidratante de patas e focinho, limpeza de olhos e ouvidos e banho a seco' },
  { nome: 'Kit Pet Cuidados Essenciais', handle: 'kit-pet-cuidados-essenciais-2c', itens: 3,
    composicao: ['Hidratante de Patas e Focinho Care 50 ml', 'Limpeza de Olhos e Ouvidos Care 100 ml', 'Banho a Seco Care 250 ml'],
    imagem: `${CDN}/TELA_01_-_A.png?v=1788357073`,
    alt: 'Kit Pet Cuidados Essenciais: hidratante de patas e focinho, limpeza de olhos e ouvidos e banho a seco' },
  { nome: 'Kit Completo Linha Care Bubbles', handle: 'kit-completo-linha-care-bubbles-2c', itens: 11,
    resumo: 'Os 11 produtos da Linha Care.',
    composicao: ['Shampoo Limpeza Profunda Care 300 ml', 'Shampoo Neutro Care 300 ml', 'Shampoo Pelos Claros Care 300 ml', 'Condicionador Hidratante Care 250 g', 'Máscara Multifuncional Care 100 ml', 'Secagem Rápida Care 100 ml', 'Hidratante de Patas e Focinho Care 50 ml', 'Body Splash Luna Care 80 ml', 'Body Splash Flora Care 80 ml', 'Limpeza de Olhos e Ouvidos Care 100 ml', 'Banho a Seco Care 250 ml'],
    imagem: `${CDN}/ae3673f9d7ce145d2271acd60971858c.jpg?v=1788357434`,
    alt: 'Kit Completo Linha Care Bubbles: os 11 produtos da Linha Care em degraus' },
  { nome: 'Kit Pet Fondue de Chocolate Xperience Care', handle: 'kit-pet-fondue-de-chocolate-xperience-care-4-itens', itens: 4,
    composicao: null,   // [CONFIRMAR COM O GESTOR] a loja não publica a composição; conferir se a arte traz claim (pendência 5)
    imagem: `${CDN}/kit-pet-fondue-de-chocolate-xperience-care-4-itens-9784916.jpg?v=1777638668`,
    alt: 'Kit Pet Fondue de Chocolate Xperience Care, 4 itens' },
  { nome: 'Kit Pet Gelato de Pistache Xperience Care', handle: 'kit-pet-gelato-de-pistache-xperience-care-4-itens', itens: 4,
    composicao: null,   // [CONFIRMAR COM O GESTOR] a loja não publica a composição; conferir se a arte traz claim (pendência 5)
    imagem: `${CDN}/kit-pet-gelato-de-pistache-xperience-care-4-itens-4017090.jpg?v=1777638667`,
    alt: 'Kit Pet Gelato de Pistache Xperience Care, 4 itens' },
]
