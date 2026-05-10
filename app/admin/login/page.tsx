'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function AdminLoginPage() {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const input = login.trim()

    const { data: emailData } = await supabase
      .rpc('get_email_by_username', { p_username: input })

    const email = emailData || input

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('Login ou senha incorretos.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-fade-in">

        <div className="flex flex-col items-center gap-3 text-white text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-brand-gold flex items-center justify-center">
            <ShieldCheck size={44} className="text-brand-gold" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold">Área Admin</h1>
            <p className="text-sm text-white/50 mt-1">Grão de Mostarda</p>
          </div>
        </div>

        <div className="w-full bg-gray-900 border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col gap-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Entrar</h2>
            <p className="text-sm text-white/50 mt-1">Acesso restrito à liderança</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login" className="text-sm font-semibold text-white/80">
                Nome de login ou e-mail
              </label>
              <input
                id="login"
                type="text"
                placeholder="nome de login ou seu@email.com"
                value={login}
                onChange={e => setLogin(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-brand-gold focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-white/80">
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-base text-white placeholder:text-white/30 focus:border-brand-gold focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-950/50 rounded-xl px-4 py-3 border border-red-800/50">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
