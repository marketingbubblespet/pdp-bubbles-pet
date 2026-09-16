'use client'
// src/lib/planos/usePlanoState.ts
// Estado de revisão persistido em localStorage, chave `plano:<slug>`. Sem backend: nada
// sai do navegador além do que o próprio usuário decide copiar/enviar por WhatsApp.
//
// Implementado como um mini external store (useSyncExternalStore) em vez de
// useState+useEffect: o servidor não tem localStorage, então a leitura real só pode
// acontecer no cliente. useSyncExternalStore já resolve isso nativamente — renderiza
// com `getServerSnapshot` (vazio) na hidratação e troca pro valor real do cliente logo
// em seguida, sem o mismatch nem o "setState dentro de efeito" que useEffect exigiria.
import { useCallback, useSyncExternalStore } from 'react'
import type { Decisao, EstadoPlano } from './types'

function chaveStorage(slug: string): string {
  return `plano:${slug}`
}

const ESTADO_VAZIO: EstadoPlano = {}
const cache = new Map<string, EstadoPlano>()
const listeners = new Map<string, Set<() => void>>()

function lerStorage(slug: string): EstadoPlano {
  try {
    const raw = localStorage.getItem(chaveStorage(slug))
    return raw ? (JSON.parse(raw) as EstadoPlano) : {}
  } catch {
    return {}
  }
}

function getSnapshot(slug: string): EstadoPlano {
  if (!cache.has(slug)) cache.set(slug, lerStorage(slug))
  return cache.get(slug)!
}

function getServerSnapshot(): EstadoPlano {
  return ESTADO_VAZIO
}

function notificar(slug: string) {
  for (const cb of listeners.get(slug) ?? []) cb()
}

function gravar(slug: string, novo: EstadoPlano) {
  cache.set(slug, novo)
  try {
    localStorage.setItem(chaveStorage(slug), JSON.stringify(novo))
  } catch {
    // Armazenamento indisponível (modo privado, cota cheia): a revisão continua
    // funcionando nesta sessão, só não persiste entre recargas.
  }
  notificar(slug)
}

function subscribe(slug: string, callback: () => void): () => void {
  if (!listeners.has(slug)) listeners.set(slug, new Set())
  listeners.get(slug)!.add(callback)
  return () => listeners.get(slug)?.delete(callback)
}

export function usePlanoState(slug: string) {
  const estado = useSyncExternalStore(
    useCallback((cb) => subscribe(slug, cb), [slug]),
    useCallback(() => getSnapshot(slug), [slug]),
    getServerSnapshot,
  )

  const aprovar = useCallback(
    (acaoId: string, observacao = '') => {
      const atual = getSnapshot(slug)
      gravar(slug, { ...atual, [acaoId]: { decisao: 'aprovado', observacao, opcaoEscolhida: atual[acaoId]?.opcaoEscolhida ?? null } })
    },
    [slug],
  )

  const reprovar = useCallback(
    (acaoId: string, justificativa: string) => {
      const atual = getSnapshot(slug)
      gravar(slug, { ...atual, [acaoId]: { decisao: 'reprovado', observacao: justificativa, opcaoEscolhida: atual[acaoId]?.opcaoEscolhida ?? null } })
    },
    [slug],
  )

  const escolherOpcao = useCallback(
    (acaoId: string, opcaoId: string, decisao: Decisao, observacao = '') => {
      const atual = getSnapshot(slug)
      gravar(slug, { ...atual, [acaoId]: { decisao, observacao, opcaoEscolhida: opcaoId } })
    },
    [slug],
  )

  const limpar = useCallback(() => {
    gravar(slug, {})
  }, [slug])

  return { estado, aprovar, reprovar, escolherOpcao, limpar }
}
