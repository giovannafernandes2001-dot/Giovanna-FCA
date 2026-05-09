'use client'

import { useState } from 'react'
import { CheckCircle, Circle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

interface CompleteButtonProps {
  devotionalId: string
  userId: string
  initialCompleted: boolean
}

export default function CompleteButton({
  devotionalId,
  userId,
  initialCompleted,
}: CompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setCompleted(v => !v)
      return
    }

    setLoading(true)
    const supabase = createClient()

    if (completed) {
      await supabase
        .from('user_progress')
        .delete()
        .eq('devotional_id', devotionalId)
        .eq('user_id', userId)
      setCompleted(false)
    } else {
      await supabase
        .from('user_progress')
        .insert({ devotional_id: devotionalId, user_id: userId })
      setCompleted(true)
    }

    setLoading(false)
  }

  return (
    <Button
      onClick={toggle}
      disabled={loading}
      variant={completed ? 'secondary' : 'gold'}
      size="lg"
      className="w-full"
    >
      {completed ? (
        <>
          <CheckCircle size={22} className="text-brand-gold" />
          Concluído
        </>
      ) : (
        <>
          <Circle size={22} />
          Marcar como concluído
        </>
      )}
    </Button>
  )
}
