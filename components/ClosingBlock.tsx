'use client'

import { useState } from 'react'
import { Heart, Music, ChevronDown } from 'lucide-react'

interface ClosingBlockProps {
  type: 'prayer' | 'song'
  content: string
}

export default function ClosingBlock({ type, content }: ClosingBlockProps) {
  const [open, setOpen] = useState(false)

  const isPrayer = type === 'prayer'

  const isSongLink = !isPrayer && content.startsWith('http')

  return (
    <section className="bg-brand-blue rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-6 py-5 text-white"
      >
        <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
          {isPrayer ? <Heart size={20} className="text-white" /> : <Music size={20} className="text-white" />}
        </div>
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {isPrayer ? 'Oração' : 'Música para Reflexão'}
          </p>
          <p className="text-sm text-white/80 mt-0.5">
            {open ? 'Toque para fechar' : `Toque para ${isPrayer ? 'orar' : 'ouvir'}`}
          </p>
        </div>
        <ChevronDown
          size={20}
          className={`text-white/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 animate-fade-in">
          <div className="h-px bg-white/10 mb-5" />
          {isPrayer || !isSongLink ? (
            <p className="prose-bible text-white/90 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          ) : isSpotifyUrl(content) ? (
            <iframe
              src={toSpotifyEmbed(content)}
              title="Música para reflexão"
              className="w-full rounded-xl"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(content)}?rel=0`}
                title="Música para reflexão"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function extractYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/)
  return match ? match[1] : url
}

function isSpotifyUrl(url: string) {
  return url.includes('open.spotify.com')
}

function toSpotifyEmbed(url: string) {
  return url
    .replace('open.spotify.com/', 'open.spotify.com/embed/')
    .split('?')[0]
}
