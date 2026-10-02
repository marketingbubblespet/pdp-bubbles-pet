'use client'
import {
  OPCOES_CATEGORIA,
  OPCOES_LINHA,
  OPCOES_PUBLICO,
  SUGESTOES_PRODUTO,
  slug,
} from '@/lib/nomenclatura'
import { BotaoExemplo, Chips, GradeOpcoes, Secao, ajuda, campoTexto, type EtapaProps } from './ui'

// Etapa 2: para quem é o anúncio e sobre qual produto.
export function EtapaPublicoProduto({ estado, set, exemplo, faltando }: EtapaProps) {
  const sugestoes = SUGESTOES_PRODUTO[estado.linha] ?? []
  const produtoSlug = slug(estado.produto)

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
        <GradeOpcoes
          opcoes={OPCOES_LINHA}
          valor={estado.linha}
          onSelect={(c) => set('linha', c)}
          colunas={3}
        />
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
        <p className={ajuda}>Segue o menu do site. Kit tem categoria própria.</p>
        <GradeOpcoes
          opcoes={OPCOES_CATEGORIA}
          valor={estado.categoria}
          onSelect={(c) => set('categoria', c)}
          colunas={3}
        />
      </Secao>

      <Secao titulo="Produto específico">
        <p className={ajuda}>
          Opcional. Ex: clareador, neutralizador. Se for kit, escreva o nome do kit.
        </p>
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
    </div>
  )
}
