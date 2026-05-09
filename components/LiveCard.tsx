import { Play, Radio, ExternalLink } from 'lucide-react'
import type { YouTubeLive } from '@/types'
import YouTubeEmbed from './YouTubeEmbed'

interface LiveCardProps {
  live: YouTubeLive
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|live\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function LiveCard({ live }: LiveCardProps) {
  const videoId = getYouTubeId(live.youtube_url)

  return (
    <div className="bg-surface rounded-2xl border-2 border-cream-dark overflow-hidden shadow-sm">
      {videoId && <YouTubeEmbed videoId={videoId} title={live.title} />}

      <div className="p-4 flex items-start gap-3">
        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0
          ${live.is_live ? 'bg-red-500 animate-pulse' : 'bg-brand-blue'}`}>
          {live.is_live ? (
            <Radio size={16} className="text-white" />
          ) : (
            <Play size={16} className="text-white fill-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {live.is_live && (
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
              Ao Vivo
            </span>
          )}
          <h3 className="font-serif font-bold text-ink text-lg leading-snug">{live.title}</h3>
          <p className="text-sm text-ink-muted mt-1 capitalize">{formatDate(live.live_date)}</p>
          <a
            href={live.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-brand-blue"
          >
            <ExternalLink size={14} />
            Abrir no YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
