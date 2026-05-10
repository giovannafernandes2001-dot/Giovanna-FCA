'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Globe } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface HeaderProps {
  title?: string
  showBack?: boolean
  backLabel?: string
}

export default function Header({ title, showBack, backLabel }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    const { data: { user } } = await supabase.auth.getUser()
    const isAdmin = user?.user_metadata?.role === 'admin'
    await supabase.auth.signOut()
    router.push(isAdmin ? '/admin-login' : '/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-brand-blue text-white shadow-lg">
      <div className="mx-auto max-w-lg px-4 py-3 flex items-center gap-3">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity mr-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            {backLabel || 'Voltar'}
          </button>
        ) : (
          <Globe size={28} className="text-brand-gold shrink-0" />
        )}

        <div className="flex-1 min-w-0">
          {title ? (
            <p className="font-semibold text-sm truncate">{title}</p>
          ) : (
            <>
              <p className="font-serif font-bold text-base leading-tight">Grão de Mostarda</p>
              <p className="text-xs opacity-70 leading-tight">Ministérios Cristãos</p>
            </>
          )}
        </div>

        {!showBack && (
          <button
            onClick={handleLogout}
            title="Sair"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </header>
  )
}
