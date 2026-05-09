export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { mockDevotionals } from '@/data/mock'
import type { Devotional } from '@/types'
import Header from '@/components/Header'
import DevotionalListItem from '@/components/DevotionalListItem'
import PullToRefresh from '@/components/PullToRefresh'
import { BookOpen, Tv } from 'lucide-react'
import Link from 'next/link'

async function getDevotionalsAndProgress(): Promise<{
  devotionals: Devotional[]
  completedIds: string[]
}> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { devotionals: mockDevotionals, completedIds: [] }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: devotionals } = await supabase
    .from('devotionals')
    .select('*')
    .eq('published', true)
    .order('sermon_date', { ascending: false })

  const { data: progress } = await supabase
    .from('user_progress')
    .select('devotional_id')
    .eq('user_id', user?.id ?? '')

  return {
    devotionals: (devotionals as Devotional[]) ?? [],
    completedIds: (progress ?? []).map((p: { devotional_id: string }) => p.devotional_id),
  }
}

export default async function HomePage() {
  const { devotionals, completedIds } = await getDevotionalsAndProgress()

  const total = devotionals.length
  const done = completedIds.length
  const progressPct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6 flex flex-col gap-6">

        {/* Week greeting */}
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">
            Devocionais
          </h1>
          <p className="text-ink-muted text-sm mt-1">
            Reflita, estude e prepare-se para a célula
          </p>
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div className="bg-surface rounded-2xl border-2 border-cream-dark p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-ink flex items-center gap-2">
                <BookOpen size={16} className="text-brand-gold" />
                Seu progresso
              </span>
              <span className="text-sm font-bold text-brand-blue">
                {done}/{total} concluídos
              </span>
            </div>
            <div className="h-2.5 bg-cream-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-gold rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Lives shortcut */}
        <Link
          href="/lives"
          className="flex items-center gap-4 bg-brand-blue text-white rounded-2xl px-5 py-4 shadow-md hover:bg-brand-blue-light transition-colors active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
            <Tv size={20} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-base">Cultos &amp; Lives</p>
            <p className="text-xs text-white/70">Assista ao YouTube</p>
          </div>
          <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>

        {/* Devotional list */}
        <PullToRefresh>
          <div className="flex flex-col gap-3">
            {devotionals.length === 0 ? (
              <div className="text-center py-12 text-ink-muted">
                <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">Nenhum devocional publicado ainda.</p>
                <p className="text-sm mt-1">Volte em breve!</p>
              </div>
            ) : (
              devotionals.map((d, i) => (
                <DevotionalListItem
                  key={d.id}
                  devotional={d}
                  completed={completedIds.includes(d.id)}
                  index={i}
                />
              ))
            )}
          </div>
        </PullToRefresh>
      </main>
    </div>
  )
}
