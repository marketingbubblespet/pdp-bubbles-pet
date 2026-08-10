'use client'
import { Sparkles, TrendingUp, Package, ShieldCheck } from 'lucide-react'
import { openPetSouthForm } from './formBus'
import { PET_SOUTH_CARE_CATEGORIES, PET_SOUTH_DEMAND_STATS } from '@/lib/pet-south'

// Lançamento da Linha Care: grade de 11 SKUs + prova de demanda + CTA.
export function PetSouthCareLaunch() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#080808] via-[#120D14] to-[#080808] relative overflow-hidden border-b border-[#F4CDD4]/20">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="px-4 py-1.5 bg-[#F4CDD4]/20 border border-[#F4CDD4]/50 text-[#F4CDD4] text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full inline-flex items-center gap-2">
            <Sparkles size={14} className="text-[#F4CDD4]" />
            <span>Lançamento Oficial PET South America</span>
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Nova <span className="text-[#F4CDD4] drop-shadow-[0_0_20px_rgba(244,205,212,0.4)]">Linha Care</span> Bubbles®
          </h2>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            A solução perfeita em cosmética de manutenção para tutores e revenda no balcão de pet shops.{' '}
            <strong className="text-[#F4CDD4]">11 SKUs estratégicos</strong> que cobrem 100% da rotina de cuidados em casa, permitindo vender o mix completo sem lacunas de categoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {PET_SOUTH_CARE_CATEGORIES.map((cat) => (
            <div key={cat.num} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3 hover:border-[#F4CDD4]/40 transition-all">
              <div className="w-10 h-10 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-xl flex items-center justify-center font-black">
                {cat.num}
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">{cat.title}</h3>
              <p className="text-[10px] text-[#F4CDD4] font-bold uppercase tracking-widest">{cat.tag}</p>
              <ul className="text-xs text-white/70 space-y-1.5 font-medium border-t border-white/10 pt-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F4CDD4]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-[#F4CDD4]">
              <TrendingUp size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Demanda Validada Direto com o Tutor</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase">
              Sua Região Não Precisa Empurrar Produto: A Demanda Já Existe!
            </h3>
            <p className="text-white/70 text-xs leading-relaxed font-medium">
              A marca Bubbles® já é um fenômeno de busca e engajamento. O tutor de pet procura pelo produto no ponto de venda porque já consome nosso conteúdo diariamente.
            </p>
            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-center">
              {PET_SOUTH_DEMAND_STATS.map((s) => (
                <div key={s.label} className="p-3 bg-black/40 rounded-xl">
                  <div className="text-lg md:text-xl font-black text-[#F4CDD4]">{s.value}</div>
                  <div className="text-[9px] text-white/60 uppercase font-bold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-br from-[#1F1224] to-[#080808] border-2 border-[#F4CDD4]/50 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#F4CDD4]">
              <Package size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Condição Especial PET South America</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase">
              Kit Prateleira + Expositor PDV Grátis no Estande
            </h3>
            <p className="text-white/80 text-xs leading-relaxed font-medium">
              Fechando a reunião de distribuição no estande da feira, receba a composição do mix inicial da Linha Care completo + expositor de acrílico exclusivo para balcão e enxoval de material gráfico promocional para os seus clientes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <ShieldCheck size={20} className="text-[#F4CDD4] shrink-0" />
              <p className="text-xs font-bold text-white">
                Atendimento prioritário e agendamento direto com os diretores comerciais da fábrica.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-gradient-to-r from-[#F4CDD4]/10 via-[#F4CDD4]/20 to-[#F4CDD4]/10 border border-[#F4CDD4]/40 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg md:text-xl font-black text-white uppercase">
              Agende sua Reunião na PET South America e Conheça a Linha Care
            </h4>
            <p className="text-white/70 text-xs md:text-sm font-medium">
              Garanta seu horário exclusivo com a diretoria comercial para negociar a distribuição na sua cidade ou região.
            </p>
          </div>
          <button
            type="button"
            onClick={openPetSouthForm}
            className="bg-[#F4CDD4] hover:bg-white text-[#080808] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(244,205,212,0.3)] shrink-0 cursor-pointer"
          >
            AGENDAR REUNIÃO NA FEIRA
          </button>
        </div>
      </div>
    </section>
  )
}
