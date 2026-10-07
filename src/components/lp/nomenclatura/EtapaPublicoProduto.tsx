'use client'
import { useState } from 'react'
import {
  CATEGORIAS_LINHA,
  OPCOES_CATEGORIA,
  OPCOES_LINHA,
  OPCOES_PUBLICO,
  SUGESTOES_PRODUTO,
  colecaoDaCategoria,
  paginaDestino,
  slug,
} from '@/lib/nomenclatura'
import { COLECAO_INTEIRA, nomeLegivel, produtoPorSlug } from '@/lib/produtos-linhas'
import { BotaoExemplo, Chips, GradeOpcoes, Secao, ajuda, campoTexto, type EtapaProps } from './ui'
import { BuscaProduto } from './BuscaProduto'

const CATEGORIA_DA_LINHA: Record<string, string> = { pro: 'lpro', ess: 'less' }

// Etapa 2: para quem é o anúncio e sobre qual produto.
export function EtapaPublicoProduto({ estado, set, exemplo, faltando }: EtapaProps) {
  const [buscaAberta, setBuscaAberta] = useState(false)
  const sugestoes = SUGESTOES_PRODUTO[estado.linha] ?? []
  const produtoSlug = slug(estado.produto)
  const colecao = colecaoDaCategoria(estado)
  const escolhido = estado.destaque && estado.destaque !== COLECAO_INTEIRA ? produtoPorSlug(estado.destaque) : undefined
  const destino = paginaDestino(estado)

  const escolherCategoria = (c: string) => {
    set('categoria', c)
    const linha = CATEGORIAS_LINHA[c]
    if (linha) {
      // Categoria de linha: a linha acompanha e a busca do produto abre na hora (obrigatória).
      set('linha', linha)
      if (colecaoDaCategoria(estado) !== linha) {
        set('destaque', '')
        set('produto', '')
      }
      setBuscaAberta(true)
    } else if (colecao) {
      set('destaque', '')
      set('produto', '')
    }
  }

  const escolherLinha = (c: string) => {
    set('linha', c)
    // Trocou a linha para outra que não a da coleção escolhida: desfaz a categoria de linha.
    if (colecao && colecao !== c) {
      set('categoria', '')
      set('destaque', '')
      set('produto', '')
    }
  }

  return (
    <div>
      <BotaoExemplo onClick={exemplo} />
      <Secao titulo="Público *" campo="publico" faltando={faltando}>
        <p className={ajuda}>Para quem esse criativo fala. Branding cobre o institucional.</p>
        <GradeOpcoes
          opcoes={OPCOES_PUBLICO}
          valor={estado.publico}
          onSelect={(c) => set('publico', c)}
          colunas={2}
        />
        {estado.publico === 'outro' && (
          <input
            value={estado.publicoOutro}
            onChange={(e) => set('publicoOutro', e.target.value)}
            placeholder="qual público? ex: veterinário"
            className={`${campoTexto} mt-2`}
          />
        )}
      </Secao>

      <Secao titulo="Linha do produto">
        <p className={ajuda}>
          Se o criativo fala de várias linhas ou de nenhuma (ex: anúncio de WhatsApp), pode pular. Não precisa
          escrever &ldquo;todas&rdquo;: campo vazio some do nome.
        </p>
        <GradeOpcoes opcoes={OPCOES_LINHA} valor={estado.linha} onSelect={escolherLinha} colunas={3} />
        {estado.linha === 'outro' && (
          <input
            value={estado.linhaOutro}
            onChange={(e) => set('linhaOutro', e.target.value)}
            placeholder="qual linha?"
            className={`${campoTexto} mt-2`}
          />
        )}
      </Secao>

      <Secao titulo="Categoria">
        <p className={ajuda}>
          Segue o menu do site. Kit tem categoria própria. &ldquo;Linha Pro&rdquo; e &ldquo;Linha Essential&rdquo;
          levam para a página da linha no site, com o produto em destaque.
        </p>
        <GradeOpcoes opcoes={OPCOES_CATEGORIA} valor={estado.categoria} onSelect={escolherCategoria} colunas={3} />
      </Secao>

      {colecao ? (
        <Secao titulo="Produto específico *" campo="produto" faltando={faltando}>
          <p className={ajuda}>
            Obrigatório na categoria de linha: escolha o produto que o anúncio destaca, ou &ldquo;coleção inteira&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setBuscaAberta(true)}
            className="w-full min-h-[48px] text-left rounded-[12px] border border-[#E5E7EB] bg-white px-4 py-3 hover:border-[#E8649A] transition-colors"
          >
            {estado.destaque === COLECAO_INTEIRA ? (
              <span className="text-sm font-medium text-[#0D0C0D]">Coleção inteira, sem destaque</span>
            ) : escolhido ? (
              <span className="text-sm font-medium text-[#0D0C0D]">{nomeLegivel(escolhido.nome)}</span>
            ) : (
              <span className="text-sm text-[#888888]">Buscar produto...</span>
            )}
            <span className="block text-[12px] text-[#E8649A] mt-0.5">
              {estado.destaque ? 'trocar' : 'abrir a busca'}
            </span>
          </button>
          {destino && (
            <p className="text-[12px] text-[#666666] mt-2 break-all">
              Página de destino: <span className="font-mono text-[#0D0C0D]">{destino}</span>
            </p>
          )}
        </Secao>
      ) : (
        <Secao titulo="Produto específico">
          <p className={ajuda}>Opcional. Ex: clareador, neutralizador. Se for kit, escreva o nome do kit.</p>
          <input
            value={estado.produto}
            onChange={(e) => set('produto', e.target.value)}
            placeholder="ex: clareador"
            className={campoTexto}
          />
          {produtoSlug && produtoSlug !== estado.produto && (
            <p className="text-[12px] text-[#666666] mt-1">
              vira <span className="font-mono text-[#0D0C0D]">{produtoSlug}</span>
            </p>
          )}
          <Chips itens={sugestoes} onPick={(i) => set('produto', i)} ativo={estado.produto} />
        </Secao>
      )}

      {buscaAberta && colecao && (
        <BuscaProduto
          linha={colecao}
          onFechar={() => setBuscaAberta(false)}
          onEscolher={(p) => {
            if (p === COLECAO_INTEIRA) {
              set('destaque', COLECAO_INTEIRA)
              set('produto', '')
            } else {
              // Produto da outra linha: categoria e linha acompanham, pro link apontar para a coleção certa.
              if (p.linha !== colecao) {
                set('categoria', CATEGORIA_DA_LINHA[p.linha])
                set('linha', p.linha)
              }
              set('destaque', p.slug)
              set('produto', p.curto)
            }
            setBuscaAberta(false)
          }}
        />
      )}
    </div>
  )
}
