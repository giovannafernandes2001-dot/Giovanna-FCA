'use client'

import { CheckCircle, Circle, ChevronRight, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Devotional } from '@/types'

interface DevotionalListItemProps {
  devotional: Devotional
  completed: boolean
  index: number
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function DevotionalListItem({
  devotional,
  completed,
  index,
}: DevotionalListItemProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`/devocional/${devotional.id}`)}
      className="w-full text-left animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div
        className={`bg-surface rounded-2xl shadow-sm border-2 p-4 flex items-start gap-4 transition-all duration-200 active:scale-[0.98]
          ${completed
            ? 'border-brand-gold/40 bg-brand-gold-muted'
            : 'border-cream-dark hover:border-brand-blue/30 hover:shadow-md'
          }`}
      >
        <div className="mt-0.5 shrink-0">
          {completed ? (
            <CheckCircle size={28} className="text-brand-gold animate-check" />
          ) : (
            <Circle size={28} className="text-cream-dark" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-ink-muted capitalize mb-1">
            {formatDate(devotional.sermon_date)}
          </p>
          <h2
            className={`font-serif text-xl font-bold leading-snug truncate
              ${completed ? 'text-ink-muted' : 'text-ink'}`}
          >
            {devotional.title}
          </h2>
          <div className="flex items-center gap-1.5 mt-1.5">
            <BookOpen size={14} className="text-brand-blue opacity-70" />
            <p className="text-sm text-brand-blue font-medium">
              {devotional.bible_reference}
            </p>
          </div>
        </div>

        <ChevronRight
          size={20}
          className="text-ink-muted shrink-0 mt-1"
        />
      </div>
    </button>
  )
}
