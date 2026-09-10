'use client'
import { OPCOES_CICLO, OPCOES_MIDIA, formatarNumero } from '@/lib/nomenclatura'
import { BotaoExemplo, GradeOpcoes, Secao, ajuda, campoTexto, type EtapaProps } from './ui'

// Etapa 1: número, tipo de mídia e ciclo (pontual / contínuo).
export function EtapaIdentificacao({ estado, set, exemplo }: EtapaProps) {
  return (
    <div>
      <BotaoExemplo onClick={exemplo} />
      <Secao titulo="Número do anúncio *">
        <p className={ajuda}>
          Você escolhe o número, não precisa ser em ordem. Um dígito vira dois (7 vira 07).
        </p>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-[#666666]">ad</span>
          <input
            inputMode="numeric"
            value={estado.numero}
            onChange={(e) => set('numero', e.target.value.replace(/\D/g, '').slice(0, 3))}
            placeholder="07"
            className={`${campoTexto} max-w-[120px] tabular-nums`}
          />
          {formatarNumero(estado.numero) && (
            <span className="text-[13px] text-[#666666]">
              vira <span className="font-mono text-[#0D0C0D]">ad{formatarNumero(estado.numero)}</span>
            </span>
          )}
        </div>
      </Secao>

      <Secao titulo="Tipo de mídia *">
        <p className={ajuda}>Para o nome deixar claro o formato do criativo.</p>
        <GradeOpcoes
          opcoes={OPCOES_MIDIA}
          valor={estado.midia}
          onSelect={(c) => set('midia', c)}
          colunas={2}
        />
        {estado.midia === 'outro' && (
          <input
            value={estado.midiaOutro}
            onChange={(e) => set('midiaOutro', e.target.value)}
            placeholder="qual formato?"
            className={`${campoTexto} mt-2`}
          />
        )}
      </Secao>

      <Secao titulo="Pontual ou contínuo? *">
        <p className={ajuda}>
          Pontual: o criativo cita mês, data ou promoção. O nome termina com o mês em que
          foi gerado (ex: set-26). Contínuo: pode rodar o ano todo.
        </p>
        <GradeOpcoes
          opcoes={OPCOES_CICLO}
          valor={estado.ciclo}
          onSelect={(c) => set('ciclo', c)}
          colunas={2}
        />
      </Secao>

      <p className="text-[12px] text-[#888888]">
        Dica: se não lembra o último número usado, veja o histórico no rodapé.
      </p>
    </div>
  )
}
