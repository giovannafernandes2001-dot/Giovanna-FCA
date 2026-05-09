'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { mockLives } from '@/data/mock'
import type { YouTubeLive } from '@/types'
import Header from '@/components/Header'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Trash2, Plus } from 'lucide-react'

function emptyLive(): Omit<YouTubeLive, 'id'> {
  return { title: '', youtube_url: '', live_date: '', is_live: false }
}

export default function AdminLivesPage() {
  const router = useRouter()
  const [lives, setLives] = useState<YouTubeLive[]>([])
  const [newLive, setNewLive] = useState(emptyLive())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setLives(mockLives)
      return
    }
    const supabase = createClient()
    supabase
      .from('youtube_lives')
      .select('*')
      .order('live_date', { ascending: false })
      .then(({ data }) => setLives((data ?? []) as YouTubeLive[]))
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setLives(prev => [{ ...newLive, id: String(Date.now()) }, ...prev])
      setNewLive(emptyLive())
      return
    }
    setSaving(true)
    const supabase = createClient()
    const { data } = await supabase.from('youtube_lives').insert(newLive).select().single()
    if (data) setLives(prev => [data as YouTubeLive, ...prev])
    setNewLive(emptyLive())
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setLives(prev => prev.filter(l => l.id !== id))
      return
    }
    const supabase = createClient()
    await supabase.from('youtube_lives').delete().eq('id', id)
    setLives(prev => prev.filter(l => l.id !== id))
  }

  async function toggleLive(live: YouTubeLive) {
    const updated = { ...live, is_live: !live.is_live }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setLives(prev => prev.map(l => l.id === live.id ? updated : l))
      return
    }
    const supabase = createClient()
    await supabase.from('youtube_lives').update({ is_live: updated.is_live }).eq('id', live.id)
    setLives(prev => prev.map(l => l.id === live.id ? updated : l))
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return ''
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header showBack backLabel="Admin" />

      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6 flex flex-col gap-8">
        <h1 className="font-serif text-2xl font-bold text-ink">Gerenciar Lives</h1>

        {/* Add form */}
        <form onSubmit={handleAdd} className="bg-surface rounded-2xl border-2 border-cream-dark p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-ink flex items-center gap-2">
            <Plus size={18} className="text-brand-gold" />
            Adicionar culto / live
          </h2>

          <Input
            id="live-title"
            label="Título"
            placeholder="ex: Culto Dominical — 4 de Maio"
            value={newLive.title}
            onChange={e => setNewLive(p => ({ ...p, title: e.target.value }))}
            required
          />
          <Input
            id="live-url"
            label="Link do YouTube"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={newLive.youtube_url}
            onChange={e => setNewLive(p => ({ ...p, youtube_url: e.target.value }))}
            required
          />
          <Input
            id="live-date"
            label="Data"
            type="date"
            value={newLive.live_date}
            onChange={e => setNewLive(p => ({ ...p, live_date: e.target.value }))}
            required
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              role="checkbox"
              aria-checked={newLive.is_live}
              onClick={() => setNewLive(p => ({ ...p, is_live: !p.is_live }))}
              className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5
                ${newLive.is_live ? 'bg-red-500' : 'bg-cream-dark'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform
                ${newLive.is_live ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm font-semibold text-ink">Ao vivo agora</span>
          </label>

          <Button type="submit" variant="gold" disabled={saving} className="w-full">
            {saving ? 'Adicionando…' : 'Adicionar'}
          </Button>
        </form>

        {/* Lives list */}
        <div className="flex flex-col gap-3">
          {lives.map(live => (
            <div
              key={live.id}
              className="bg-surface rounded-xl border-2 border-cream-dark px-4 py-3 flex items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink truncate">{live.title}</p>
                <p className="text-xs text-ink-muted mt-0.5">{formatDate(live.live_date)}</p>
              </div>
              <button
                onClick={() => toggleLive(live)}
                className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 transition-colors
                  ${live.is_live ? 'bg-red-100 text-red-600' : 'bg-cream-dark text-ink-muted'}`}
              >
                {live.is_live ? 'Ao Vivo' : 'Gravado'}
              </button>
              <button
                onClick={() => handleDelete(live.id)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
