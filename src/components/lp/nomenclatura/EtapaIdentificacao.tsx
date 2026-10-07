'use client'
import {
  MESES_NOME,
  OPCOES_CICLO,
  OPCOES_DESTINO,
  OPCOES_MIDIA,
  SUGESTOES_LP,
  blocoDataLimite,
  dataLimite,
  formatarNumero,
  slug,
  type EstadoNomenclatura,
} from '@/lib/nomenclatura'
import {
  BotaoExemplo,
  Chips,
  GradeOpcoes,
  Secao,
  ajuda,
  campoTexto,
  type EtapaProps,
  type Faltando,
  type SetCampo,
} from './ui'

const seletor =
  'min-h-[44px] bg-white border border-[#E5E7EB] rounded-[12px] px-3 text-base text-[#0D0C0D] focus:outline-none focus:border-[#E8649A]'

const DIAS = Array.from({ length: 31 }, (_, i) => String(i + 1))

const pad = (n: number) => String(n).padStart(2, '0')
const isoDe = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

function definirData(set: SetCampo, d: Date) {
  set('dataDia', String(d.getDate()))
  set('dataMes', String(d.getMonth() + 1))
  set('dataAno', String(d.getFullYear()))
}

// Atalhos para os próximos 30 dias, que é onde cai quase todo anúncio pontual.
function atalhos(hoje: Date) {
  const mais = (n: number) => new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + n)
  return [
    { rotulo: 'em 7 dias', data: mais(7) },
    { rotulo: 'em 15 dias', data: mais(15) },
    { rotulo: 'em 30 dias', data: mais(30) },
    { rotulo: 'fim do mês', data: new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0) },
  ]
}

function DataFinal({ estado, set, faltando }: { estado: EstadoNomenclatura; set: SetCampo; faltando?: Faltando }) {
  const erro = Boolean(faltando?.campos.has('data'))
  const hoje = new Date()
  const anos = [String(hoje.getFullYear()), String(hoje.getFullYear() + 1)]
  const dt = dataLimite(estado)
  const preenchida = estado.dataDia && estado.dataMes && estado.dataAno
  const iso = dt ? isoDe(dt) : ''

  return (
    <div
      id="campo-data"
      key={erro ? `erro-${faltando?.tentativa}` : 'ok'}
      className={`mt-4 scroll-mt-24 rounded-[12px] p-4 ${
        erro
          ? 'nom-shake border-2 border-[#E8649A] bg-[#FDF2F4] shadow-[0_0_0_4px_rgba(232,100,154,0.18)]'
          : 'border border-[#E5E7EB] bg-[#F7F7F7]'
      }`}
    >
      <p className="text-sm font-medium text-[#0D0C0D] mb-1">Até quando o anúncio roda? *</p>
      {erro && (
        <p role="alert" className="text-[13px] font-semibold text-[#E8649A] mb-2">
          ! Escolha a data final do anúncio
        </p>
      )}
      <p className={ajuda}>Escolha um atalho, abra o calendário ou selecione dia, mês e ano.</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {atalhos(hoje).map((a) => {
          const ativo = iso === isoDe(a.data)
          return (
            <button
              key={a.rotulo}
              type="button"
              onClick={() => definirData(set, a.data)}
              className={`min-h-[36px] rounded-full border px-3 text-[13px] transition-colors ${
                ativo ? 'border-[#E8649A] bg-[#FDF2F4] text-[#0D0C0D]' : 'border-[#E5E7EB] bg-white text-[#666666] hover:border-[#E8649A]'
              }`}
            >
              {a.rotulo}{' '}
              <span className="text-[#888888]">
                {pad(a.data.getDate())}/{pad(a.data.getMonth() + 1)}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select aria-label="Dia" value={estado.dataDia} onChange={(e) => set('dataDia', e.target.value)} className={seletor}>
          <option value="">dia</option>
          {DIAS.map((d) => (
            <option key={d} value={d}>
              {pad(Number(d))}
            </option>
          ))}
        </select>
        <select aria-label="Mês" value={estado.dataMes} onChange={(e) => set('dataMes', e.target.value)} className={seletor}>
          <option value="">mês</option>
          {MESES_NOME.map((m, i) => (
            <option key={m} value={String(i + 1)}>
              {m}
            </option>
          ))}
        </select>
        <select aria-label="Ano" value={estado.dataAno} onChange={(e) => set('dataAno', e.target.value)} className={seletor}>
          <option value="">ano</option>
          {anos.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <label className="inline-flex items-center gap-2 min-h-[44px] rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#666666] hover:border-[#E8649A] cursor-pointer">
          calendário
          <input
            type="date"
            value={iso}
            min={isoDe(hoje)}
            max={`${anos[1]}-12-31`}
            onChange={(e) => {
              const [a, m, d] = e.target.value.split('-').map(Number)
              if (a && m && d) definirData(set, new Date(a, m - 1, d))
            }}
            className="text-base text-[#0D0C0D] bg-transparent"
          />
        </label>
      </div>

      {preenchida && !dt && <p className="text-[13px] text-[#E8649A] mt-2">Essa data não existe nesse mês.</p>}
      {dt && (
        <p className="text-[13px] text-[#666666] mt-2">
          vira <span className="font-mono text-[#0D0C0D]">{blocoDataLimite(estado)}</span> no final do nome
        </p>
      )}
    </div>
  )
}

// Etapa 1: número, tipo de mídia, ciclo (com data final no pontual) e destino.
export function EtapaIdentificacao({ estado, set, exemplo, faltando }: EtapaProps) {
  return (
    <div>
      <BotaoExemplo onClick={exemplo} />
      <Secao titulo="Número do anúncio *" campo="numero" faltando={faltando}>
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

      <Secao titulo="Tipo de mídia *" campo="midia" faltando={faltando}>
        <p className={ajuda}>Para o nome deixar claro o formato do criativo.</p>
        <GradeOpcoes opcoes={OPCOES_MIDIA} valor={estado.midia} onSelect={(c) => set('midia', c)} colunas={2} />
        {estado.midia === 'outro' && (
          <input
            value={estado.midiaOutro}
            onChange={(e) => set('midiaOutro', e.target.value)}
            placeholder="qual formato?"
            className={`${campoTexto} mt-2`}
          />
        )}
      </Secao>

      <Secao titulo="Pontual ou contínuo? *" campo="ciclo" faltando={faltando}>
        <p className={ajuda}>
          Pontual: tem data para acabar, e o nome termina com ela (ex: ate-28-out-26). Contínuo: pode rodar o
          ano todo, e o nome termina com o mês atual (ex: set-26).
        </p>
        <GradeOpcoes opcoes={OPCOES_CICLO} valor={estado.ciclo} onSelect={(c) => set('ciclo', c)} colunas={2} />
        {estado.ciclo === 'pont' && <DataFinal estado={estado} set={set} faltando={faltando} />}
      </Secao>

      <Secao titulo="Destino do clique" campo="destino" faltando={faltando}>
        <p className={ajuda}>Para onde o anúncio leva. Site é o padrão e não aparece no nome.</p>
        <GradeOpcoes opcoes={OPCOES_DESTINO} valor={estado.destino} onSelect={(c) => set('destino', c)} colunas={2} />
        {estado.destino === 'lp' && (
          <div className="mt-2">
            <input
              value={estado.lpNome}
              onChange={(e) => set('lpNome', e.target.value)}
              placeholder="nome da LP, ex: masterclass coloração *"
              className={campoTexto}
            />
            {slug(estado.lpNome) && (
              <p className="text-[12px] text-[#666666] mt-1">
                vira <span className="font-mono text-[#0D0C0D]">lp-{slug(estado.lpNome)}</span>
              </p>
            )}
            <Chips itens={SUGESTOES_LP} onPick={(i) => set('lpNome', i)} ativo={estado.lpNome} />
          </div>
        )}
      </Secao>

      <p className="text-[12px] text-[#888888]">Dica: se não lembra o último número usado, veja o histórico no rodapé.</p>
    </div>
  )
}
