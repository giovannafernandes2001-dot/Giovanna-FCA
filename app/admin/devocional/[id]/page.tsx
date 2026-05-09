export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { mockDevotionals } from '@/data/mock'
import type { Devotional } from '@/types'
import Header from '@/components/Header'
import DevotionalForm from '../DevotionalForm'
import DeleteDevotionalButton from './DeleteDevotionalButton'

async function getDevotional(id: string): Promise<Devotional> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const d = mockDevotionals.find(d => d.id === id)
    if (!d) notFound()
    return d
  }

  const supabase = await createClient()
  const { data } = await supabase
    .from('devotionals')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()
  return data as Devotional
}

export default async function EditDevotionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const devotional = await getDevotional(id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header showBack backLabel="Admin" />
      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-serif text-2xl font-bold text-ink">Editar Devocional</h1>
          <DeleteDevotionalButton id={devotional.id} />
        </div>
        <DevotionalForm initialData={devotional} />
      </main>
    </div>
  )
}
