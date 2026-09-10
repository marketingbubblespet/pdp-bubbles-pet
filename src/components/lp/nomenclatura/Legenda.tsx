'use client'
import {
  OPCOES_CATEGORIA,
  OPCOES_CICLO,
  OPCOES_LINHA,
  OPCOES_MIDIA,
  OPCOES_PUBLICO,
} from '@/lib/nomenclatura'

function Bloco({ titulo, itens }: { titulo: string; itens: { codigo: string; rotulo: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-2">{titulo}</p>
      <ul className="space-y-1">
        {itens.map((i) => (
          <li key={i.codigo} className="text-[13px] text-[#666666]">
            <span className="font-mono text-[#0D0C0D]">{i.codigo}</span> = {i.rotulo}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Legenda completa dos códigos, fixa no rodapé da página.
export function Legenda() {
  return (
    <section className="mt-12 border-t border-[#E5E7EB] pt-8">
      <h2 className="text-lg font-medium text-[#0D0C0D] mb-1">Legenda dos códigos</h2>
      <p className="text-[13px] text-[#666666] mb-6">
        Ordem do nome: ad + número | mídia | ciclo | público | linha | categoria | produto |
        metodologia | quem aparece | do que se trata | mês (só pontual). Blocos em branco somem.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Bloco titulo="Mídia" itens={OPCOES_MIDIA} />
        <Bloco titulo="Ciclo" itens={OPCOES_CICLO} />
        <Bloco titulo="Público" itens={OPCOES_PUBLICO} />
        <Bloco titulo="Linha" itens={OPCOES_LINHA} />
        <Bloco titulo="Categoria" itens={OPCOES_CATEGORIA} />
        <Bloco
          titulo="Metodologia e talento"
          itens={[
            { codigo: 'axoly-x', rotulo: 'Axoly, pilar x' },
            { codigo: 'interno', rotulo: 'produção interna' },
            { codigo: 'influ-nome', rotulo: 'influenciador' },
            { codigo: 'int-nome', rotulo: 'colaborador interno' },
          ]}
        />
      </div>
    </section>
  )
}
