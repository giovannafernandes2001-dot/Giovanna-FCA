export const dynamic = 'force-dynamic'

import Header from '@/components/Header'
import DevotionalForm from '../DevotionalForm'

export default function NovoDevocionalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showBack backLabel="Admin" />
      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6">
        <h1 className="font-serif text-2xl font-bold text-ink mb-6">Novo Devocional</h1>
        <DevotionalForm />
      </main>
    </div>
  )
}
