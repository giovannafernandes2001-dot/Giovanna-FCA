export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { mockLives } from '@/data/mock'
import type { YouTubeLive } from '@/types'
import Header from '@/components/Header'
import LiveCard from '@/components/LiveCard'
import { Tv } from 'lucide-react'

async function getLives(): Promise<YouTubeLive[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return mockLives
  }

  const supabase = await createClient()
  const { data } = await supabase
    .from('youtube_lives')
    .select('*')
    .order('live_date', { ascending: false })

  return (data as YouTubeLive[]) ?? []
}

export default async function LivesPage() {
  const lives = await getLives()
  const activeLive = lives.find(l => l.is_live)
  const pastLives = lives.filter(l => !l.is_live)

  return (
    <div className="min-h-screen flex flex-col">
      <Header showBack backLabel="Início" />

      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6 flex flex-col gap-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Cultos &amp; Lives</h1>
          <p className="text-ink-muted text-sm mt-1">Assista aos cultos dominicais</p>
        </div>

        {/* Active live banner */}
        {activeLive && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-bold text-red-500 uppercase tracking-wider">Ao Vivo Agora</p>
            </div>
            <LiveCard live={activeLive} />
          </div>
        )}

        {/* Past lives */}
        {pastLives.length > 0 && (
          <div className="flex flex-col gap-4">
            {activeLive && (
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                Cultos Anteriores
              </p>
            )}
            {pastLives.map(live => (
              <LiveCard key={live.id} live={live} />
            ))}
          </div>
        )}

        {lives.length === 0 && (
          <div className="text-center py-12 text-ink-muted">
            <Tv size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">Nenhum culto disponível ainda.</p>
            <p className="text-sm mt-1">Volte em breve!</p>
          </div>
        )}
      </main>
    </div>
  )
}
