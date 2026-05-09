'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function DeleteDevotionalButton({ id }: { id: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
      return
    }

    setLoading(true)
    const supabase = createClient()
    await supabase.from('devotionals').delete().eq('id', id)
    router.push('/admin')
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl transition-colors
        ${confirming
          ? 'bg-red-500 text-white'
          : 'text-red-500 hover:bg-red-50'
        }`}
    >
      <Trash2 size={16} />
      {confirming ? 'Confirmar exclusão' : 'Excluir'}
    </button>
  )
}
