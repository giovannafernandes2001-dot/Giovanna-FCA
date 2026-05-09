export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { mockDevotionals, mockLives } from '@/data/mock'
import Header from '@/components/Header'
import Link from 'next/link'
import { BookOpen, Tv, Plus, Pencil } from 'lucide-react'
import type { Devotional, YouTubeLive } from '@/types'

async function getAdminData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { devotionals: mockDevotionals, lives: mockLives }
  }

  const supabase = await createClient()
  const { data: devotionals } = await supabase
    .from('devotionals')
    .select('id, title, sermon_date, published')
    .order('sermon_date', { ascending: false })
  const { data: lives } = await supabase
    .from('youtube_lives')
    .select('*')
    .order('live_date', { ascending: false })

  return {
    devotionals: (devotionals ?? []) as Devotional[],
    lives: (lives ?? []) as YouTubeLive[],
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function AdminPage() {
  const { devotionals, lives } = await getAdminData()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6 flex flex-col gap-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Painel Admin</h1>
          <p className="text-ink-muted text-sm mt-1">Gerencie o conteúdo do aplicativo</p>
        </div>

        {/* Devotionals section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
              <BookOpen size={20} className="text-brand-gold" />
              Devocionais
            </h2>
            <Link
              href="/admin/devocional/novo"
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-light transition-colors"
            >
              <Plus size={18} />
              Novo
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {devotionals.length === 0 ? (
              <p className="text-ink-muted text-sm py-4 text-center">Nenhum devocional ainda.</p>
            ) : (
              devotionals.map(d => (
                <Link
                  key={d.id}
                  href={`/admin/devocional/${d.id}`}
                  className="flex items-center gap-3 bg-surface rounded-xl border-2 border-cream-dark px-4 py-3 hover:border-brand-blue/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink truncate">{d.title}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{formatDate(d.sermon_date)}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0
                    ${d.published ? 'bg-green-100 text-green-700' : 'bg-cream-dark text-ink-muted'}`}>
                    {d.published ? 'Publicado' : 'Rascunho'}
                  </span>
                  <Pencil size={16} className="text-ink-muted shrink-0" />
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Lives section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
              <Tv size={20} className="text-brand-gold" />
              Lives / Cultos
            </h2>
            <Link
              href="/admin/lives"
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-light transition-colors"
            >
              <Plus size={18} />
              Gerenciar
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {lives.length === 0 ? (
              <p className="text-ink-muted text-sm py-4 text-center">Nenhuma live cadastrada.</p>
            ) : (
              lives.slice(0, 3).map(l => (
                <div
                  key={l.id}
                  className="flex items-center gap-3 bg-surface rounded-xl border-2 border-cream-dark px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink truncate">{l.title}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{formatDate(l.live_date)}</p>
                  </div>
                  {l.is_live && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600 shrink-0">
                      Ao Vivo
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
