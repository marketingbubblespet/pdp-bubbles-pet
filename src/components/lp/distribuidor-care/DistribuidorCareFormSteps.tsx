'use client'
// Etapas 1 a 4 do formulário da LP /distribuidor-care. A preferência de contato aparece na etapa 4, depois do "Sim".
import { Check, ChevronLeft, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DISTRIBUIDOR_CARE_FORM as F, DISTRIBUIDOR_CARE_TIPOS_NEGOCIO } from './distribuidorCareFormDados'
import { errosDaEtapa, mostraEmailContato, type CamposForm, type Etapa } from './distribuidorCareFormUtils'
import type { AcoesForm, UiForm } from './useDistribuidorCareForm'
import { CampoEstado, CampoTexto, GrupoOpcoes, Privacidade } from './DistribuidorCareFormFields'
import { BlocoFalhaTotal } from './DistribuidorCareFormScreens'
import { DISTRIBUIDOR_CARE_CLASSES as C } from './DistribuidorCareMedia'

type Props = { etapa: Etapa; campos: CamposForm; leadId: string; ui: UiForm; acoes: AcoesForm }

function erroVisivel(props: Props, id: string): string | undefined {
  return props.ui.visiveis[id] ? errosDaEtapa(props.etapa, props.campos)[id] : undefined
}

function Carregando({ ativo }: { ativo: boolean }) {
  if (!ativo) return null
  return <LoaderCircle size={18} aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
}

function Etapa1(p: Props) {
  const { campos: c, acoes: a } = p
  return (
    <>
      <GrupoOpcoes id="dc-grupo-tipo" nome="dc-tipo" legenda={F.rotulos.tipo} opcoes={DISTRIBUIDOR_CARE_TIPOS_NEGOCIO}
        valor={c.tipoNegocio} erro={erroVisivel(p, 'dc-grupo-tipo')}
        aoEscolher={(v) => a.escolher('dc-grupo-tipo', {
          tipoNegocio: v as CamposForm['tipoNegocio'], tipoNegocioOutro: v === 'outro' ? c.tipoNegocioOutro : '' })} />
      {c.tipoNegocio === 'outro' && (
        <CampoTexto id="dc-tipo-outro" rotulo={F.rotulos.tipoOutro} obrigatorio={false} valor={c.tipoNegocioOutro}
          placeholder={F.placeholders.tipoOutro} maxLength={60}
          aoMudar={(v) => a.texto('dc-tipo-outro', 'tipoNegocioOutro', v)} aoSair={() => a.sair('dc-tipo-outro')} />
      )}
      <CampoEstado valor={c.estado} erro={erroVisivel(p, 'dc-estado')}
        aoMudar={(v) => a.escolher('dc-estado', { estado: v as CamposForm['estado'] })} aoSair={() => a.sair('dc-estado')} />
      <CampoTexto id="dc-cidade" rotulo={F.rotulos.cidade} valor={c.cidade} erro={erroVisivel(p, 'dc-cidade')}
        placeholder={F.placeholders.cidade} autoComplete="address-level2" autoCapitalize="words" maxLength={60}
        aoMudar={(v) => a.texto('dc-cidade', 'cidade', v)} aoSair={() => a.sair('dc-cidade')} />
    </>
  )
}

function Etapa2(p: Props) {
  const { campos: c, acoes: a } = p
  return (
    <>
      <GrupoOpcoes id="dc-grupo-vendedores" nome="dc-vendedores" legenda={F.rotulos.vendedores} opcoes={F.vendedores}
        valor={c.vendedoresExternos} erro={erroVisivel(p, 'dc-grupo-vendedores')}
        aoEscolher={(v) => a.escolher('dc-grupo-vendedores', { vendedoresExternos: v as CamposForm['vendedoresExternos'] })} />
      <GrupoOpcoes id="dc-grupo-pdvs" nome="dc-pdvs" legenda={F.rotulos.pdvs} opcoes={F.pdvs}
        valor={c.pontosDeVenda} erro={erroVisivel(p, 'dc-grupo-pdvs')}
        aoEscolher={(v) => a.escolher('dc-grupo-pdvs', { pontosDeVenda: v as CamposForm['pontosDeVenda'] })} />
      <GrupoOpcoes id="dc-grupo-linha-pet" nome="dc-linha-pet" legenda={F.rotulos.linhaPet} opcoes={F.linhaPet}
        valor={c.trabalhaComPet} erro={erroVisivel(p, 'dc-grupo-linha-pet')}
        aoEscolher={(v) => a.escolher('dc-grupo-linha-pet', { trabalhaComPet: v as CamposForm['trabalhaComPet'] })} />
    </>
  )
}

function CampoCnpj(p: Props) {
  const { campos: c, acoes: a } = p
  return (
    <div className="space-y-2">
      <CampoTexto id="dc-cnpj" rotulo={F.rotulos.cnpj} valor={c.cnpj} erro={c.semCnpj ? undefined : erroVisivel(p, 'dc-cnpj')}
        obrigatorio={!c.semCnpj} placeholder={F.placeholders.cnpj} inputMode="numeric" autoComplete="off" maxLength={18}
        disabled={c.semCnpj} aoMudar={(v) => a.texto('dc-cnpj', 'cnpj', v)} aoSair={() => a.sair('dc-cnpj')} />
      <label htmlFor="dc-sem-cnpj" className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-[#0D0C0D]">
        <input id="dc-sem-cnpj" type="checkbox" checked={c.semCnpj} onChange={(e) => a.semCnpj(e.target.checked)}
          className={`h-5 w-5 accent-[#E8649A] ${C.FOCO}`} />
        {F.rotulos.semCnpj}
      </label>
    </div>
  )
}

function Etapa3(p: Props) {
  const { campos: c, acoes: a } = p
  return (
    <>
      <Privacidade />
      <CampoTexto id="dc-nome" rotulo={F.rotulos.nome} valor={c.nome} erro={erroVisivel(p, 'dc-nome')}
        placeholder={F.placeholders.nome} autoComplete="name" autoCapitalize="words" maxLength={80}
        aoMudar={(v) => a.texto('dc-nome', 'nome', v)} aoSair={() => a.sair('dc-nome')} />
      <GrupoOpcoes id="dc-grupo-cargo" nome="dc-cargo" legenda={F.rotulos.cargo} opcoes={F.cargos}
        valor={c.cargo} erro={erroVisivel(p, 'dc-grupo-cargo')}
        aoEscolher={(v) => a.escolher('dc-grupo-cargo', { cargo: v as CamposForm['cargo'] })} />
      <CampoTexto id="dc-whatsapp" rotulo={F.rotulos.whatsapp} valor={c.whatsapp} erro={erroVisivel(p, 'dc-whatsapp')}
        ajuda={F.ajudaWhatsapp} type="tel" inputMode="tel" autoComplete="tel" maxLength={15} placeholder={F.placeholders.whatsapp}
        aoMudar={(v) => a.texto('dc-whatsapp', 'whatsapp', v)} aoSair={() => a.sair('dc-whatsapp')} />
      <CampoTexto id="dc-email" rotulo={F.rotulos.email} obrigatorio={false} valor={c.email} erro={erroVisivel(p, 'dc-email')}
        type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={120}
        placeholder={F.placeholders.email} aoMudar={(v) => a.texto('dc-email', 'email', v)} aoSair={() => a.sair('dc-email')} />
      <CampoCnpj {...p} />
    </>
  )
}

function BlocoContato(p: Props) {
  const { campos: c, acoes: a, ui } = p
  return (
    <div id="dc-bloco-contato" className="space-y-5 border-t border-[#E5E7EB] pt-5">
      <h4 className="text-base font-medium text-[#0D0C0D]">{F.rotulos.contatoTitulo}</h4>
      <GrupoOpcoes id="dc-grupo-canal" nome="dc-canal" legenda={F.rotulos.canal} opcoes={F.canais} valor={c.canal}
        aoEscolher={(v) => a.canal(v as CamposForm['canal'])} />
      <GrupoOpcoes id="dc-grupo-horario" nome="dc-horario" legenda={F.rotulos.horario} opcoes={F.horarios} valor={c.horario}
        aoEscolher={(v) => a.escolher('dc-grupo-horario', { horario: v as CamposForm['horario'] })} />
      {mostraEmailContato(c) && (
        <CampoTexto id="dc-email-contato" rotulo={F.rotulos.emailContato} valor={c.email} erro={erroVisivel(p, 'dc-email-contato')}
          type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={120}
          placeholder={F.placeholders.email}
          aoMudar={(v) => a.texto('dc-email-contato', 'email', v)} aoSair={() => a.sair('dc-email-contato')} />
      )}
      <button type="submit" disabled={ui.enviando !== false} aria-busy={ui.enviando === 'final' || undefined}
        className={cn(C.BOTAO_PRIMARIO, 'w-full')}>
        <Carregando ativo={ui.enviando === 'final'} />
        {F.botoes.final}
      </button>
    </div>
  )
}

function Etapa4(p: Props) {
  const { campos: c, acoes: a, ui } = p
  return (
    <>
      <div id="dc-grupo-pedido" role="group" aria-labelledby="dc-pedido-pergunta" className="scroll-mt-24">
        <p id="dc-pedido-pergunta" className="mb-3 text-base font-medium text-[#0D0C0D]">{F.rotulos.pedido}</p>
        <div className="grid grid-cols-2 gap-3">
          {F.pedido.map((o) => {
            const marcado = c.pedidoInicial === o.value
            return (
              <button key={o.value} type="button" aria-pressed={marcado} disabled={ui.enviando !== false}
                aria-busy={(o.value === 'agora_nao' && ui.enviando === 'agora_nao') || undefined}
                onClick={() => a.pedido(o.value)}
                className={`flex min-h-[56px] items-center justify-center gap-2 rounded-[12px] px-4 text-base font-semibold text-[#0D0C0D] disabled:opacity-60 ${C.FOCO} ${
                  marcado ? 'border-2 border-[#E8649A] bg-[#FDF2F4]' : 'border border-[#888888] bg-white'}`}>
                <Carregando ativo={o.value === 'agora_nao' && ui.enviando === 'agora_nao'} />
                {marcado && ui.enviando === false && <Check size={18} aria-hidden="true" className="text-[#E8649A]" />}
                {o.label}
              </button>
            )
          })}
        </div>
      </div>
      {c.pedidoInicial === 'sim' && <BlocoContato {...p} />}
    </>
  )
}

function Navegacao(p: Props) {
  const { etapa, ui, acoes: a } = p
  const ocupado = ui.enviando !== false
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      {etapa < 4 && (
        <button type="submit" disabled={ocupado} aria-busy={ui.enviando === 'sem_cnpj' || undefined}
          className={cn(C.BOTAO_NEUTRO, 'w-full md:w-auto')}>
          <Carregando ativo={ui.enviando === 'sem_cnpj'} />
          {F.botoes.continuar}
        </button>
      )}
      {etapa > 1 && (
        <button type="button" onClick={a.voltar} disabled={ocupado} className={cn(C.LINK_TEXTO, 'justify-center px-2 no-underline')}>
          <ChevronLeft size={18} aria-hidden="true" />
          {F.botoes.voltar}
        </button>
      )}
    </div>
  )
}

export function DistribuidorCareFormSteps(p: Props) {
  const { etapa, ui, acoes, leadId } = p
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-[#666666]">{F.progresso.replace('{n}', String(etapa))}</p>
        <div aria-hidden="true" className="mt-2 h-1.5 w-full rounded-full bg-[#F7F7F7]">
          <div className="h-1.5 rounded-full bg-[#E8649A] transition-transform duration-250" style={{ width: `${etapa * 25}%` }} />
        </div>
        <h3 id="dc-etapa-titulo" tabIndex={-1} className="mt-4 text-lg font-medium text-[#0D0C0D] focus:outline-none">
          {F.etapas[etapa - 1]}
        </h3>
      </div>
      {etapa === 1 && <Etapa1 {...p} />}
      {etapa === 2 && <Etapa2 {...p} />}
      {etapa === 3 && <Etapa3 {...p} />}
      {etapa === 4 && <Etapa4 {...p} />}
      {ui.falhaTotal && <BlocoFalhaTotal leadId={leadId} aoTentar={acoes.tentarDeNovo} ocupado={ui.enviando !== false} />}
      <Navegacao {...p} />
      {etapa >= 3 && <Privacidade />}
    </div>
  )
}
