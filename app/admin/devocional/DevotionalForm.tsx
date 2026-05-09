'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Devotional } from '@/types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

interface DevotionalFormProps {
  initialData?: Devotional
}

export default function DevotionalForm({ initialData }: DevotionalFormProps) {
  const router = useRouter()
  const isEditing = !!initialData

  const [form, setForm] = useState({
    title: initialData?.title ?? '',
    sermon_date: initialData?.sermon_date ?? '',
    reflection_phrase: initialData?.reflection_phrase ?? '',
    bible_reference: initialData?.bible_reference ?? '',
    bible_text: initialData?.bible_text ?? '',
    puc_summary: initialData?.puc_summary ?? '',
    reflection_questions: (initialData?.reflection_questions ?? ['', '', '', '']).join('\n'),
    closing_type: initialData?.closing_type ?? 'prayer',
    closing_content: initialData?.closing_content ?? '',
    youtube_url: initialData?.youtube_url ?? '',
    published: initialData?.published ?? false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...form,
      reflection_questions: form.reflection_questions
        .split('\n')
        .map(q => q.trim())
        .filter(Boolean),
      youtube_url: form.youtube_url || null,
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      alert(isEditing ? 'Devocional atualizado (mock)!' : 'Devocional criado (mock)!')
      router.push('/admin')
      return
    }

    const supabase = createClient()

    if (isEditing) {
      const { error } = await supabase
        .from('devotionals')
        .update(payload)
        .eq('id', initialData.id)
      if (error) { setError(error.message); setLoading(false); return }
    } else {
      const { error } = await supabase.from('devotionals').insert(payload)
      if (error) { setError(error.message); setLoading(false); return }
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      <Input
        id="title"
        label="Título"
        placeholder="ex: A Videira Verdadeira"
        value={form.title}
        onChange={e => update('title', e.target.value)}
        required
      />

      <Input
        id="sermon_date"
        label="Data do culto"
        type="date"
        value={form.sermon_date}
        onChange={e => update('sermon_date', e.target.value)}
        required
      />

      <Textarea
        id="reflection_phrase"
        label="Frase de reflexão"
        hint="Versículo ou frase central do sermão"
        placeholder='"Eu sou a videira…" — João 15:5'
        value={form.reflection_phrase}
        onChange={e => update('reflection_phrase', e.target.value)}
        required
      />

      <Input
        id="bible_reference"
        label="Referência bíblica"
        placeholder="ex: João 15:1-8"
        value={form.bible_reference}
        onChange={e => update('bible_reference', e.target.value)}
        required
      />

      <Textarea
        id="bible_text"
        label="Texto bíblico completo"
        placeholder="Cole aqui o texto da passagem..."
        value={form.bible_text}
        onChange={e => update('bible_text', e.target.value)}
        required
        className="min-h-[200px]"
      />

      <Textarea
        id="puc_summary"
        label="Resumo PUC PUC"
        hint="Use **texto** para negrito. Separe seções com linhas em branco."
        placeholder="**Contexto**&#10;Jesus fala…&#10;&#10;**Pontos centrais**&#10;1. **Permanecer**…"
        value={form.puc_summary}
        onChange={e => update('puc_summary', e.target.value)}
        required
        className="min-h-[200px]"
      />

      <Textarea
        id="reflection_questions"
        label="Perguntas para reflexão"
        hint="Uma pergunta por linha (máx. 5)"
        placeholder="Em que áreas você tem dependido mais de seus próprios esforços?&#10;Como você tem recebido os momentos de 'poda'?"
        value={form.reflection_questions}
        onChange={e => update('reflection_questions', e.target.value)}
        required
        className="min-h-[140px]"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-ink">Tipo de encerramento</label>
        <div className="flex gap-3">
          {(['prayer', 'song'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => update('closing_type', t)}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-colors
                ${form.closing_type === t
                  ? 'border-brand-blue bg-brand-blue-muted text-brand-blue'
                  : 'border-cream-dark text-ink-muted'}`}
            >
              {t === 'prayer' ? 'Oração' : 'Música'}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        id="closing_content"
        label={form.closing_type === 'prayer' ? 'Texto da oração' : 'Link do YouTube (música)'}
        placeholder={form.closing_type === 'prayer'
          ? 'Senhor Jesus, Tu és a videira…'
          : 'https://www.youtube.com/watch?v=...'}
        value={form.closing_content}
        onChange={e => update('closing_content', e.target.value)}
        required
      />

      <Input
        id="youtube_url"
        label="Link do culto (YouTube) — opcional"
        type="url"
        placeholder="https://www.youtube.com/watch?v=..."
        value={form.youtube_url}
        onChange={e => update('youtube_url', e.target.value)}
      />

      <label className="flex items-center gap-3 cursor-pointer">
        <div
          role="checkbox"
          aria-checked={form.published}
          onClick={() => update('published', !form.published)}
          className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5
            ${form.published ? 'bg-brand-blue' : 'bg-cream-dark'}`}
        >
          <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform
            ${form.published ? 'translate-x-6' : 'translate-x-0'}`} />
        </div>
        <span className="text-sm font-semibold text-ink">
          {form.published ? 'Publicado' : 'Rascunho'}
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3 border border-red-200">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full mt-2">
        {loading ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Criar devocional'}
      </Button>
    </form>
  )
}
