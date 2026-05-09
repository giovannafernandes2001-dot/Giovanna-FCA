export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { mockDevotionals } from '@/data/mock'
import type { Devotional } from '@/types'
import Header from '@/components/Header'
import BibleText from '@/components/BibleText'
import PucSection from '@/components/PucSection'
import ClosingBlock from '@/components/ClosingBlock'
import CompleteButton from './CompleteButton'
import YouTubeEmbed from '@/components/YouTubeEmbed'

async function getDevotional(id: string): Promise<{ devotional: Devotional; completed: boolean; userId: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const devotional = mockDevotionals.find(d => d.id === id)
    if (!devotional) notFound()
    return { devotional, completed: false, userId: 'mock-user' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('devotionals')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single()

  if (!data) notFound()

  const { data: progress } = await supabase
    .from('user_progress')
    .select('id')
    .eq('devotional_id', id)
    .eq('user_id', user?.id ?? '')
    .maybeSingle()

  return {
    devotional: data as Devotional,
    completed: !!progress,
    userId: user?.id ?? '',
  }
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
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export default async function DevotionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { devotional, completed, userId } = await getDevotional(id)
  const videoId = devotional.youtube_url ? getYouTubeId(devotional.youtube_url) : null

  return (
    <div className="min-h-screen flex flex-col pb-28">
      <Header showBack backLabel="Devocionais" />

      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6 flex flex-col gap-6">

        {/* Title block */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted capitalize">
            {formatDate(devotional.sermon_date)}
          </p>
          <h1 className="font-serif text-3xl font-bold text-ink mt-2 leading-tight">
            {devotional.title}
          </h1>
        </div>

        {/* Reflection phrase */}
        <section className="bg-brand-gold rounded-2xl p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
            Reflexão
          </p>
          <blockquote className="font-serif italic text-xl leading-relaxed">
            {devotional.reflection_phrase}
          </blockquote>
        </section>

        {/* Bible text */}
        <BibleText
          reference={devotional.bible_reference}
          text={devotional.bible_text}
        />

        {/* PUC summary + questions */}
        <PucSection
          summary={devotional.puc_summary}
          questions={devotional.reflection_questions}
        />

        {/* Culto video */}
        {videoId && (
          <section className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              Culto do Domingo
            </p>
            <YouTubeEmbed videoId={videoId} title={devotional.title} />
          </section>
        )}

        {/* Closing (prayer / song) */}
        <ClosingBlock
          type={devotional.closing_type}
          content={devotional.closing_content}
        />
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-cream/95 backdrop-blur-sm border-t border-cream-dark">
        <div className="mx-auto max-w-lg">
          <CompleteButton
            devotionalId={devotional.id}
            userId={userId}
            initialCompleted={completed}
          />
        </div>
      </div>
    </div>
  )
}
