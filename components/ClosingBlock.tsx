'use client'

import { useState } from 'react'
import { ChevronDown, Music, HandMetal } from 'lucide-react'
import YouTubeEmbed from './YouTubeEmbed'

interface ClosingBlockProps {
  type: 'prayer' | 'song'
  content: string
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function ClosingBlock({ type, content }: ClosingBlockProps) {
  const [open, setOpen] = useState(false)
  const isSong = type === 'song'
  const videoId = isSong ? getYouTubeId(content) : null

  return (
    <section className="bg-brand-gold-muted border-2 border-brand-gold/40 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
          {isSong ? (
            <Music size={18} className="text-white" />
          ) : (
            <HandMetal size={18} className="text-white" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {isSong ? 'Música de Encerramento' : 'Oração de Encerramento'}
          </p>
          <p className="text-sm text-ink-muted mt-0.5">
            {open ? 'Toque para fechar' : `Toque para ${isSong ? 'ouvir' : 'ler'}`}
          </p>
        </div>
        <ChevronDown
          size={20}
          className={`text-brand-gold shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="h-px bg-brand-gold/20 mb-4" />
          {isSong && videoId ? (
            <YouTubeEmbed videoId={videoId} />
          ) : (
            <p className="leading-relaxed text-ink font-serif italic text-lg whitespace-pre-line">
              {content}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
