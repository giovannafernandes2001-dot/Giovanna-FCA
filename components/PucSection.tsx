import { MessageSquare } from 'lucide-react'

interface PucSectionProps {
  summary: string
  questions: string[]
}

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-serif font-bold text-brand-blue text-lg mt-5 first:mt-0">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    }
    if (line.match(/^\d+\.\s+\*\*/)) {
      const clean = line.replace(/\*\*/g, '')
      return (
        <p key={i} className="mt-2 leading-relaxed text-ink">
          {clean}
        </p>
      )
    }
    if (line === '') return <div key={i} className="h-1" />
    return (
      <p key={i} className="leading-relaxed text-ink">
        {line}
      </p>
    )
  })
}

export default function PucSection({ summary, questions }: PucSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="bg-surface rounded-2xl border-2 border-cream-dark p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">
          PUC PUC — Resumo da Palavra
        </p>
        <div className="space-y-1">{renderMarkdown(summary)}</div>
      </section>

      <section className="bg-cream rounded-2xl border-2 border-brand-gold/30 p-6">
        <div className="flex items-center gap-2 mb-5">
          <MessageSquare size={20} className="text-brand-gold" />
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Perguntas para a Célula
          </p>
        </div>
        <ol className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-brand-gold text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="leading-relaxed text-ink pt-0.5">{q}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
