'use client'
import { useState, useSyncExternalStore, type ReactNode } from 'react'
import { gravarAcesso, lerAcesso } from './storage'

// Portão simples da ferramenta interna. Senha é o nome da gerente.
// Aviso honesto: senha no navegador não é segurança de verdade, quem abrir o código
// enxerga. É só para não entrar aqui sem querer. A página também é noindex.
const SENHA = 'mariane'

// localStorage não muda sozinho durante a vida do componente: não há evento externo real.
const subscribe = () => () => {}

export function AcessoGate({ children }: { children: ReactNode }) {
  // Lido via useSyncExternalStore: o servidor recebe null (mostra o vazio), o cliente
  // troca pelo valor real assim que hidrata, sem descompasso de hidratação.
  const acessoSalvo = useSyncExternalStore(subscribe, lerAcesso, () => null)
  const [liberadoManual, setLiberadoManual] = useState(false)
  const liberado = liberadoManual ? true : acessoSalvo

  const [valor, setValor] = useState('')
  const [erro, setErro] = useState(false)

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (valor.trim().toLowerCase() === SENHA) {
      gravarAcesso()
      setLiberadoManual(true)
      setErro(false)
    } else {
      setErro(true)
    }
  }

  if (liberado === null) {
    return <div className="min-h-screen bg-[#F7F7F7]" />
  }

  if (liberado) return <>{children}</>

  return (
    <main className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-6">
      <form
        onSubmit={enviar}
        className="w-full max-w-[340px] bg-white border border-[#E5E7EB] rounded-[12px] p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E8649A] mb-2">
          Bubbles Pet
        </p>
        <h1 className="text-xl font-medium text-[#0D0C0D] mb-4">Área restrita</h1>
        <input
          type="password"
          value={valor}
          onChange={(e) => {
            setValor(e.target.value)
            setErro(false)
          }}
          placeholder="Senha"
          autoFocus
          className={`w-full text-base px-4 py-3 rounded-[12px] border ${
            erro ? 'border-[#E8649A]' : 'border-[#E5E7EB]'
          } focus:outline-none focus:border-[#E8649A] mb-3`}
        />
        <p className="text-[12px] text-[#888888] mb-3">Dica: o primeiro nome da gerente.</p>
        {erro && <p className="text-[13px] text-[#E8649A] mb-3">Senha incorreta.</p>}
        <button
          type="submit"
          className="w-full min-h-[44px] bg-[#E8649A] text-white font-semibold rounded-[12px] hover:brightness-110 active:scale-95 transition-all duration-200"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
