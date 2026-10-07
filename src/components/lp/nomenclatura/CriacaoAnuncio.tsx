'use client'
import { useState } from 'react'
import { lerColagem, type ResultadoColagem } from '@/lib/criacao-anuncio'

// Bloco "clique para copiar": copia o texto exato e mostra "copiado" por 2s.
export function Copiavel({
  rotulo,
  texto,
  id,
  copiado,
  onCopiar,
  extra,
}: {
  rotulo: string
  texto: string
  id: string
  copiado: string
  onCopiar: (id: string, texto: string) => void
  extra?: React.ReactNode
}) {
  const ok = copiado === id
  return (
    <button
      type="button"
      onClick={() => onCopiar(id, texto)}
      className={`w-full text-left rounded-[12px] border p-3 transition-colors ${
        ok ? 'border-[#3DB85C] bg-[#f0fdf4]' : 'border-[#E5E7EB] bg-white hover:border-[#E8649A]'
      }`}
    >
      <span className="flex items-center justify-between gap-2 mb-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#E8649A]">{rotulo}</span>
        <span className={`text-[12px] font-semibold ${ok ? 'text-[#166534]' : 'text-[#666666]'}`}>
          {ok ? 'copiado ✓' : 'clique para copiar'}
        </span>
      </span>
      <span className="block text-sm text-[#0D0C0D] whitespace-pre-wrap break-words">{texto}</span>
      {extra}
    </button>
  )
}

// Seção do fim da página: cola a linha da planilha e recebe cada campo pronto para copiar.
export function CriacaoAnuncio() {
  const [entrada, setEntrada] = useState('')
  const [resultado, setResultado] = useState<ResultadoColagem | null>(null)
  const [copiado, setCopiado] = useState('')

  const copiar = (id: string, texto: string) => {
    navigator.clipboard?.writeText(texto).then(
      () => {
        setCopiado(id)
        window.setTimeout(() => setCopiado((atual) => (atual === id ? '' : atual)), 2000)
      },
      () => {},
    )
  }

  const enviar = () => setResultado(lerColagem(entrada))
  const vazio = resultado && resultado.anuncios.length === 0 && resultado.google.length === 0

  return (
    <section className="mt-12 border-t border-[#E5E7EB] pt-8">
      <h2 className="text-lg font-medium text-[#0D0C0D] mb-1">Criação de anúncio</h2>
      <p className="text-[13px] text-[#666666] mb-4">
        Cole uma ou mais linhas da planilha de criativos (pode vir com o cabeçalho). Títulos e descrições do Google
        (PMax, Search, extensões) podem vir no mesmo campo, um por linha. Depois clique em enviar.
      </p>

      <textarea
        value={entrada}
        onChange={(e) => setEntrada(e.target.value)}
        rows={6}
        placeholder="Cole aqui a linha da planilha"
        className="w-full bg-white border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-sm text-[#0D0C0D] placeholder:text-[#888888] focus:outline-none focus:border-[#E8649A] font-mono"
      />
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={enviar}
          disabled={!entrada.trim()}
          className="flex-1 min-h-[44px] rounded-[12px] bg-[#E8649A] text-white font-semibold hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          Enviar
        </button>
        {(entrada || resultado) && (
          <button
            type="button"
            onClick={() => {
              setEntrada('')
              setResultado(null)
            }}
            className="min-h-[44px] rounded-[12px] border border-[#E5E7EB] px-5 text-sm font-medium text-[#0D0C0D] hover:border-[#E8649A] transition-colors"
          >
            Limpar
          </button>
        )}
      </div>

      {vazio && (
        <p className="mt-4 text-[13px] text-[#E8649A]">
          Não encontrei nenhum anúncio. Confira se a linha tem a nomenclatura (ex: ad37|vid|...).
        </p>
      )}

      {resultado?.anuncios.map((a, ia) => (
        <div key={`${a.nome}-${ia}`} className="mt-6 rounded-[12px] border border-[#E5E7EB] bg-[#F7F7F7] p-4 flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#0D0C0D] font-mono break-all">{a.nome}</p>
          {a.campos.map((c, ic) => (
            <Copiavel
              key={ic}
              id={`a${ia}-${ic}`}
              rotulo={c.rotulo}
              texto={c.valor}
              copiado={copiado}
              onCopiar={copiar}
            />
          ))}
        </div>
      ))}

      {resultado && resultado.google.length > 0 && (
        <div className="mt-6 rounded-[12px] border border-[#E5E7EB] bg-[#F7F7F7] p-4 flex flex-col gap-4">
          <p className="text-sm font-semibold text-[#0D0C0D]">Google Ads</p>
          {resultado.google.map((g, ig) => (
            <div key={ig} className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#666666]">{g.titulo}</p>
              {g.itens.map((item, ii) => {
                const n = Array.from(item.texto).length
                const passou = item.limite !== null && n > item.limite
                return (
                  <Copiavel
                    key={ii}
                    id={`g${ig}-${ii}`}
                    rotulo={item.rotulo}
                    texto={item.texto}
                    copiado={copiado}
                    onCopiar={copiar}
                    extra={
                      <span className={`block mt-1 text-[12px] ${passou ? 'text-[#E8649A] font-semibold' : 'text-[#666666]'}`}>
                        {n}
                        {item.limite !== null && `/${item.limite}`} caracteres{passou && ', acima do limite'}
                      </span>
                    }
                  />
                )
              })}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
