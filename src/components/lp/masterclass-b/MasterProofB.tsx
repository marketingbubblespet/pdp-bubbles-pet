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
const PLAYER_ELEMENT_ID = `mcb-yt-player-${MC.lastEditionVideoId}`

export function MasterProofB() {
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
    <section className="bg-[#080808] py-16 md:py-24 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4CDD4] mb-3">
          Como foi a última edição
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
          Veja um pouco do que já rolou ao vivo
        </h2>
        <p className="text-xs text-white/60 mb-6">
          Prévia exclusiva de {MC.videoPreviewMinutes} minutos, disponível apenas nesta página.
          <span className="block mt-0.5">O conteúdo completo é liberado apenas para quem participa ao vivo.</span>
        </p>

        <div
          onContextMenu={(e) => e.preventDefault()}
          className="relative rounded-2xl overflow-hidden border border-white/5 aspect-video bg-black select-none"
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
                sizes="(max-width: 767px) 343px, 800px"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F4CDD4] shadow-[0_0_20px_rgba(244,205,212,0.4)] transition-transform duration-150 group-hover:scale-[1.05]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#080808">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <span className="absolute top-3 right-3 bg-[#1A1A1A]/90 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {MC.videoPreviewMinutes} min de prévia
              </span>
            </button>
          )}

          {started && (
            <>
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div id={PLAYER_ELEMENT_ID} className="w-full h-full" />
              </div>

              {!expired && (
                <>
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none">
                      <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F4CDD4] shadow-[0_0_20px_rgba(244,205,212,0.4)]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#080808">
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
                  <span className="absolute top-3 right-3 bg-[#1A1A1A]/90 text-[#F4CDD4] font-mono text-lg md:text-xl font-bold px-3 py-1.5 rounded-full tabular-nums pointer-events-none">
                    {mm}:{ss}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 pointer-events-none">
                    <div
                      className="h-full bg-[#F4CDD4] shadow-[0_0_10px_rgba(244,205,212,0.5)] transition-[width] duration-1000 ease-linear"
                      style={{ width: `${((ACCESS_SECONDS - remaining) / ACCESS_SECONDS) * 100}%` }}
                    />
                  </div>
                </>
              )}

              {expired && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/95 px-6 text-center">
                  <p className="text-white font-black text-sm md:text-base">
                    Sua prévia de {MC.videoPreviewMinutes} minutos terminou
                  </p>
                  <p className="text-white/60 text-xs md:text-sm max-w-[380px]">
                    Garanta seu acesso e participe ao vivo da próxima MasterClass.
                  </p>
                  <a
                    href="#acesso"
                    className="bg-[#F4CDD4] text-[#080808] font-black uppercase tracking-widest rounded-xl px-5 py-2.5 text-xs transition-transform duration-150 hover:scale-[1.02]"
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
          <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5">
            <Image src="/images/masterclass/bastidores-1.webp" alt="Bastidores da última MasterClass" fill sizes="(max-width: 767px) 165px, 394px" className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5">
            <Image src="/images/masterclass/bastidores-2.webp" alt="Bastidores da última MasterClass" fill sizes="(max-width: 767px) 165px, 394px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
