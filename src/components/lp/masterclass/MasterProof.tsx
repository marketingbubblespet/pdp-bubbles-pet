'use client'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { MC } from '@/lib/masterclass-spitz'

interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  mute(): void
  getPlayerState(): number
  destroy(): void
}

interface YTNamespace {
  Player: new (elementId: string, options: Record<string, unknown>) => YTPlayer
  PlayerState: { PLAYING: number; PAUSED: number }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const ACCESS_SECONDS = MC.videoPreviewMinutes * 60
const PLAYER_ELEMENT_ID = `mc-yt-player-${MC.lastEditionVideoId}`

export function MasterProof() {
  const [started, setStarted] = useState(false)
  const [remaining, setRemaining] = useState(ACCESS_SECONDS)
  const [expired, setExpired] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playerRef = useRef<YTPlayer | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          stopTimer()
          playerRef.current?.pauseVideo?.()
          playerRef.current?.mute?.()
          setExpired(true)
          return 0
        }
        return r - 1
      })
    }, 1000)
  }, [stopTimer])

  // Carrega a API do YouTube e cria o player sem controles nativos (sem menu de
  // "copiar link"). A criação do player é sempre disparada por um evento (clique
  // do usuário ou callback assíncrono do script do YouTube), nunca por um
  // setState síncrono dentro do corpo do efeito.
  useEffect(() => {
    if (!started || expired) return

    const createPlayer = () => {
      if (!window.YT) return
      playerRef.current = new window.YT.Player(PLAYER_ELEMENT_ID, {
        videoId: MC.lastEditionVideoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onStateChange: (e: { data: number }) => {
            if (!window.YT) return
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              startTimer()
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
              stopTimer()
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script')
        tag.id = 'youtube-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previous?.()
        createPlayer()
      }
    }

    return () => {
      stopTimer()
      playerRef.current?.destroy?.()
      playerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  const togglePlay = () => {
    if (!playerRef.current || expired || !window.YT) return
    const state = playerRef.current.getPlayerState()
    if (state === window.YT.PlayerState.PLAYING) playerRef.current.pauseVideo()
    else playerRef.current.playVideo()
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')

  return (
    <section className="bg-[#fdf0f3] py-16 md:py-24 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8649A] mb-3">
          Como foi a última edição
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F0C0D] mb-3">
          Veja um pouco do que já rolou ao vivo
        </h2>
        <p className="text-xs text-[#9ca3af] mb-6">
          Prévia exclusiva de {MC.videoPreviewMinutes} minutos, disponível apenas nesta página.
          <span className="block mt-0.5">O conteúdo completo é liberado apenas para quem participa ao vivo.</span>
        </p>

        <div
          onContextMenu={(e) => e.preventDefault()}
          className="relative rounded-[10px] overflow-hidden border border-[#E5E7EB] shadow-sm aspect-video bg-black select-none"
        >
          {!started && (
            <button
              onClick={() => setStarted(true)}
              className="group absolute inset-0 w-full h-full cursor-pointer"
              aria-label="Reproduzir prévia da última edição"
            >
              <Image
                src={`https://img.youtube.com/vi/${MC.lastEditionVideoId}/hqdefault.jpg`}
                alt="Última edição da MasterClass"
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3DB85C] shadow-lg group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <span className="absolute top-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                {MC.videoPreviewMinutes} min de prévia
              </span>
            </button>
          )}

          {started && (
            <>
              {/* Wrapper sem interação: o iframe do YouTube nunca recebe cliques diretos do usuário. */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div id={PLAYER_ELEMENT_ID} className="w-full h-full" />
              </div>

              {!expired && (
                <>
                  {/* Cobre a tela de pausa nativa do YouTube (que mostra o título do vídeo). */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none">
                      <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3DB85C] shadow-lg">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                  )}
                  <button
                    onClick={togglePlay}
                    aria-label="Pausar ou continuar a prévia"
                    className="absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <span className="absolute top-3 right-3 bg-black/70 text-[#E8649A] text-lg md:text-xl font-extrabold px-3 py-1.5 rounded-full tabular-nums pointer-events-none">
                    {mm}:{ss}
                  </span>
                  {/* Barra de progresso da prévia */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 pointer-events-none">
                    <div
                      className="h-full bg-[#E8649A] transition-[width] duration-1000 ease-linear"
                      style={{ width: `${((ACCESS_SECONDS - remaining) / ACCESS_SECONDS) * 100}%` }}
                    />
                  </div>
                </>
              )}

              {expired && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90 px-6 text-center">
                  <p className="text-white font-bold text-sm md:text-base">
                    Sua prévia de {MC.videoPreviewMinutes} minutos terminou
                  </p>
                  <p className="text-[#9ca3af] text-xs md:text-sm max-w-[380px]">
                    Garanta seu acesso e participe ao vivo da próxima MasterClass.
                  </p>
                  <a
                    href="#acesso"
                    className="bg-[#3DB85C] text-white font-bold rounded-[10px] px-5 py-2.5 text-sm hover:brightness-110 transition-all"
                  >
                    Garantir meu acesso →
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bastidores da última edição */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="relative aspect-square rounded-[10px] overflow-hidden">
            <Image src="/images/masterclass/bastidores-1.webp" alt="Bastidores da última MasterClass" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-[10px] overflow-hidden">
            <Image src="/images/masterclass/bastidores-2.webp" alt="Bastidores da última MasterClass" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
