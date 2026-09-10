'use client'
import {
  COLABORADORES,
  OPCOES_METODOLOGIA,
  OPCOES_TALENTO,
  slug,
} from '@/lib/nomenclatura'
import { BotaoExemplo, Chips, GradeOpcoes, Secao, ajuda, campoTexto, type EtapaProps } from './ui'

// Etapa 3: metodologia (Axoly / Interno) e quem aparece no criativo.
// Metodologia e talento são independentes: dá para ter Axoly gravado por gente interna.
export function EtapaProducao({ estado, set, exemplo }: EtapaProps) {
  const nomeSlug = slug(estado.talentoNome)

  return (
    <div>
      <BotaoExemplo onClick={exemplo} />
      <Secao titulo="Metodologia">
        <p className={ajuda}>Como o criativo foi produzido ou é gerido.</p>
        <GradeOpcoes
          opcoes={OPCOES_METODOLOGIA}
          valor={estado.metodologia}
          onSelect={(c) => set('metodologia', c)}
          colunas={3}
        />
        {estado.metodologia === 'axoly' && (
          <input
            value={estado.pilar}
            onChange={(e) => set('pilar', e.target.value)}
            placeholder="qual pilar da Axoly?"
            className={`${campoTexto} mt-2`}
          />
        )}
        {estado.metodologia === 'outro' && (
          <input
            value={estado.metodologiaOutro}
            onChange={(e) => set('metodologiaOutro', e.target.value)}
            placeholder="ex: freelancer, cliente, a própria influencer"
            className={`${campoTexto} mt-2`}
          />
        )}
      </Secao>

      <Secao titulo="Quem aparece no criativo?">
        <p className={ajuda}>Influenciador entra como influ-nome, colaborador como int-nome.</p>
        <GradeOpcoes
          opcoes={OPCOES_TALENTO}
          valor={estado.talentoTipo}
          onSelect={(c) => set('talentoTipo', c)}
          colunas={3}
        />

        {estado.talentoTipo === 'influ' && (
          <input
            value={estado.talentoNome}
            onChange={(e) => set('talentoNome', e.target.value)}
            placeholder="nome do influenciador. ex: weryka"
            className={`${campoTexto} mt-2`}
          />
        )}

        {estado.talentoTipo === 'int' && (
          <>
            <input
              value={estado.talentoNome}
              onChange={(e) => set('talentoNome', e.target.value)}
              placeholder="nome do colaborador"
              className={`${campoTexto} mt-2`}
            />
            <Chips
              itens={COLABORADORES}
              onPick={(i) => set('talentoNome', i)}
              ativo={estado.talentoNome}
            />
          </>
        )}

        {(estado.talentoTipo === 'influ' || estado.talentoTipo === 'int') &&
          nomeSlug &&
          nomeSlug !== estado.talentoNome && (
            <p className="text-[12px] text-[#666666] mt-1">
              vira{' '}
              <span className="font-mono text-[#0D0C0D]">
                {estado.talentoTipo}-{nomeSlug}
              </span>
            </p>
          )}
      </Secao>
    </div>
  )
}
