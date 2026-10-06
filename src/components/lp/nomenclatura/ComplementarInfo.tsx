'use client'
import { useState } from 'react'
import { COMPLEMENTO_VAZIO, UTM_PADRAO, linhaPlanilha, type Complemento } from '@/lib/criacao-anuncio'
import { Copiavel } from './CriacaoAnuncio'
import { campoTexto } from './ui'

const CAMPOS: { chave: keyof Complemento; rotulo: string; longo?: boolean; placeholder: string }[] = [
  { chave: 'copy1', rotulo: 'Copy 01', longo: true, placeholder: 'texto principal do anúncio' },
  { chave: 'copy2', rotulo: 'Copy 02', longo: true, placeholder: 'variação do texto (opcional)' },
  { chave: 'titulo1', rotulo: 'Título 01', placeholder: 'título' },
  { chave: 'titulo2', rotulo: 'Título 02', placeholder: 'variação do título (opcional)' },
  { chave: 'drive', rotulo: 'Link do material', placeholder: 'link do Drive ou Dropbox' },
  { chave: 'destino', rotulo: 'Link de destino', placeholder: 'https://www.bubbles.com.br/...' },
]

const hojeBR = () => new Date().toLocaleDateString('pt-BR')

// Depois de gerar o nome: completa copies, títulos e links e devolve a linha pronta para
// colar na planilha (mesma ordem de colunas) + cada campo em bloco de clique para copiar.
export function ComplementarInfo({
  nome,
  midia,
  dataFinalBR,
  destinoInicial = '',
}: {
  destinoInicial?: string
  nome: string
  midia: string
  dataFinalBR: string
}) {
  const [aberto, setAberto] = useState(false)
  const [c, setC] = useState<Complemento>({ ...COMPLEMENTO_VAZIO, destino: destinoInicial })
  const [copiado, setCopiado] = useState('')

  const copiar = (id: string, texto: string) => {
    navigator.clipboard?.writeText(texto).then(
      () => {
        setCopiado(id)
        window.setTimeout(() => setCopiado((a) => (a === id ? '' : a)), 2000)
      },
      () => {},
    )
  }

  if (!aberto) {
    return (
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="mt-4 w-full min-h-[44px] rounded-[12px] border-2 border-dashed border-[#E8649A] text-[#E8649A] font-semibold hover:bg-[#FDF2F4] transition-colors"
      >
        + Complementar informações
      </button>
    )
  }

  const hoje = hojeBR()
  const linha = linhaPlanilha({
    nome,
    midia,
    data: hoje,
    inicio: dataFinalBR ? hoje : '',
    fim: dataFinalBR,
    c,
  })
  const preenchidos = CAMPOS.filter((f) => c[f.chave].trim())

  return (
    <div className="mt-6 rounded-[12px] border border-[#E5E7EB] bg-[#F7F7F7] p-4">
      <p className="text-sm font-semibold text-[#0D0C0D] mb-1">Complementar informações</p>
      <p className="text-[13px] text-[#666666] mb-4">
        Preencha o que tiver. Campo vazio fica vazio na planilha.
      </p>

      <div className="flex flex-col gap-3">
        {CAMPOS.map((f) => (
          <label key={f.chave} className="block">
            <span className="block text-sm font-medium text-[#0D0C0D] mb-1">{f.rotulo}</span>
            {f.longo ? (
              <textarea
                rows={4}
                value={c[f.chave]}
                onChange={(e) => setC((s) => ({ ...s, [f.chave]: e.target.value }))}
                placeholder={f.placeholder}
                className={campoTexto}
              />
            ) : (
              <input
                value={c[f.chave]}
                onChange={(e) => setC((s) => ({ ...s, [f.chave]: e.target.value }))}
                placeholder={f.placeholder}
                className={campoTexto}
              />
            )}
          </label>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-1">Linha para a planilha</p>
        <p className="text-[12px] text-[#666666] mb-2">
          Copia tudo de uma vez. Na planilha, clique na célula da coluna &ldquo;Status Meta&rdquo; de uma linha vazia e
          cole: cada informação cai na sua coluna.
        </p>
        <button
          type="button"
          onClick={() => copiar('linha', linha)}
          className={`w-full min-h-[48px] rounded-[12px] font-semibold transition-all duration-200 active:scale-95 ${
            copiado === 'linha' ? 'bg-[#3DB85C] text-white' : 'bg-[#E8649A] text-white hover:brightness-110'
          }`}
        >
          {copiado === 'linha' ? 'Linha copiada ✓' : 'Copiar linha completa para a planilha'}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">Ou copie campo por campo</p>
        <Copiavel id="c-nome" rotulo="Nomenclatura" texto={nome} copiado={copiado} onCopiar={copiar} />
        {preenchidos.map((f) => (
          <Copiavel key={f.chave} id={`c-${f.chave}`} rotulo={f.rotulo} texto={c[f.chave].trim()} copiado={copiado} onCopiar={copiar} />
        ))}
        <Copiavel id="c-utm" rotulo="UTM" texto={UTM_PADRAO} copiado={copiado} onCopiar={copiar} />
      </div>
    </div>
  )
}
