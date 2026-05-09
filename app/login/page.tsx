'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-mail ou senha incorretos. Tente novamente.')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-fade-in">

        {/* Logo area */}
        <div className="flex flex-col items-center gap-3 text-white text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-brand-gold flex items-center justify-center">
            <Globe size={44} className="text-brand-gold" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold">Grão de Mostarda</h1>
            <p className="text-sm text-white/70 mt-1">Ministérios Cristãos</p>
          </div>
        </div>

        {/* Login card */}
        <div className="w-full bg-surface rounded-2xl shadow-xl p-6 flex flex-col gap-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Entrar</h2>
            <p className="text-sm text-ink-muted mt-1">Acesse os devocionais da semana</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              id="email"
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-ink">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border-2 border-cream-dark bg-surface px-4 py-3 pr-12 text-base text-ink placeholder:text-ink-muted focus:border-brand-blue focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
          </form>
        </div>

        <p className="text-white/50 text-xs text-center">
          Não tem acesso? Fale com a liderança da igreja.
        </p>
      </div>
    </div>
  )
}
