// src/app/planos/login/page.tsx
// Tela de senha única para /planos. A validação real acontece no Server Action
// (actions.ts) — este componente só renderiza o formulário.
import { Lock } from 'lucide-react'
import { entrar } from './actions'

export const metadata = {
  title: 'Acesso · Relatórios',
  robots: { index: false, follow: false },
}

const MENSAGENS: Record<string, string> = {
  senha: 'Acesso negado.',
  limite: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
  config: 'Configuração de acesso ausente. Avise quem administra o site.',
}

export default async function LoginPlanos({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; erro?: string }>
}) {
  const { next, erro } = await searchParams
  const proximaRota = next && next.startsWith('/planos') ? next : '/planos'
  const mensagemErro = erro ? MENSAGENS[erro] : null

  return (
    <main className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[380px] rounded-[20px] border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FDF2F4] mb-4 mx-auto">
          <Lock size={20} className="text-[#E8649A]" />
        </div>
        <h1 className="text-lg font-semibold text-gray-900 text-center mb-1">
          Acesso ao relatório
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Digite a senha para continuar.
        </p>

        <form action={entrar} className="flex flex-col gap-3">
          <input type="hidden" name="next" value={proximaRota} />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-xs font-medium text-gray-600">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              autoFocus
              className="w-full rounded-[12px] border border-gray-300 bg-white px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#E8649A]/40"
            />
            <p className="text-xs text-gray-400">Dica: nome da gerente.</p>
          </div>

          {mensagemErro && (
            <p className="text-xs text-red-600" role="alert">
              {mensagemErro}
            </p>
          )}

          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center min-h-[44px] rounded-[12px] bg-[#3DB85C] text-white font-semibold px-6 py-3 hover:brightness-110 hover:scale-[1.01] active:scale-95 transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
