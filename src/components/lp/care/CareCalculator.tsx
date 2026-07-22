'use client'
import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { trackCareCalculatorUse } from './trackCare'

// TODO [a confirmar com Ivan]: valores placeholder. A margem real por unidade e a taxa de
// conversão dependem da resolução do briefing (seção 8.1: os preços recebidos, abaixo de 100
// unidades, davam prejuízo sobre o "Con. Final"). Não plugar em produção sem esses números.
const LUCRO_MEDIO_POR_UNIDADE = 12 // R$ de margem média estimada por unidade (placeholder)
const MIN_UNIDADES = 10
const MAX_UNIDADES = 100

export function CareCalculator() {
  const [unidades, setUnidades] = useState(30)

  const lucroMes = unidades * LUCRO_MEDIO_POR_UNIDADE
  const lucroAno = lucroMes * 12

  const handleChange = (v: number) => {
    setUnidades(v)
    trackCareCalculatorUse()
  }

  return (
    <section className="bg-[#fdf2f4] py-16 md:py-24 px-4 border-t border-[#E5E7EB]">
      <div className="max-w-[760px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3 text-center">
          Faça a conta
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] text-center mb-4">
          Quanto a Care pode render pro seu petshop?
        </h2>
        <p className="text-sm text-[#6B7280] text-center mb-10 max-w-[560px] mx-auto">
          Considerando a procura que já geramos, arraste para simular quantas unidades por mês o seu petshop pretende comprar.
        </p>

        <div className="bg-white rounded-2xl p-6 md:p-10 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="unidades" className="text-sm font-bold text-[#0F0C0D]">
              Unidades por mês
            </label>
            <span className="text-lg font-extrabold text-[#E8649A]">{unidades}</span>
          </div>
          <input
            id="unidades"
            type="range"
            min={MIN_UNIDADES}
            max={MAX_UNIDADES}
            step={5}
            value={unidades}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="w-full accent-[#E8649A] mb-8"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#fdf0f3] rounded-xl p-4 md:p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
                Lucro extra por mês
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-[#0F0C0D]">
                R$ {lucroMes.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-[#fdf0f3] rounded-xl p-4 md:p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
                Lucro extra por ano
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-[#0F0C0D]">
                R$ {lucroAno.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-6 text-[#9ca3af]">
            <Calculator size={14} className="shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Projeção ilustrativa baseada na demanda que já geramos. Resultados reais podem variar
              conforme o movimento da sua loja. Valores de margem em confirmação final.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="#cadastro"
            className="inline-block bg-[#3DB85C] text-white font-bold text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-[10px] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center shadow-md"
          >
            Quero essa margem no meu petshop →
          </a>
        </div>
      </div>
    </section>
  )
}
