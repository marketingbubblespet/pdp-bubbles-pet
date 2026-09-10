'use client'
import { slug } from '@/lib/nomenclatura'
import { BotaoExemplo, Secao, ajuda, campoTexto, type EtapaProps } from './ui'

const EXEMPLOS = [
  'masterclass da jessica',
  'divulgacao do kit gelato de pistache',
  'rende 500 banhos',
  'trafego distribuidores psa',
  'pare de olhar apenas o preco',
]

// Etapa 4: descrição livre do anúncio. É o último bloco antes do mês.
export function EtapaDescricao({ estado, set, exemplo }: EtapaProps) {
  const previa = slug(estado.descricao)

  return (
    <div>
      <BotaoExemplo onClick={exemplo} />
      <Secao titulo="Do que se trata o anúncio?">
        <p className={ajuda}>
          Escreva livre, do seu jeito. A ferramenta padroniza (tudo minúsculo, sem acento,
          espaços viram traço).
        </p>
        <input
          value={estado.descricao}
          onChange={(e) => set('descricao', e.target.value)}
          placeholder="ex: masterclass da jessica"
          className={campoTexto}
        />
        {previa && (
          <p className="text-[12px] text-[#666666] mt-1">
            vira <span className="font-mono text-[#0D0C0D]">{previa}</span>
          </p>
        )}

        <p className="text-[13px] text-[#666666] mt-4 mb-2">Exemplos, toque para usar:</p>
        <div className="flex flex-wrap gap-2">
          {EXEMPLOS.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => set('descricao', ex)}
              className="min-h-[36px] rounded-full border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#666666] hover:border-[#E8649A]"
            >
              {ex}
            </button>
          ))}
        </div>
      </Secao>
    </div>
  )
}
