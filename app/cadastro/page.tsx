'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Globe, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function CadastroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    username: '',
    full_name: '',
    email: '',
    phone: '',
    birth_date: '',
    congregation: '',
    password: '',
    confirm_password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (form.password !== form.confirm_password) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .ilike('username', form.username.trim())
      .maybeSingle()

    if (existing) {
      setError('Este nome de login já está em uso. Escolha outro.')
      setLoading(false)
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
    })

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? 'Erro ao criar conta.')
      setLoading(false)
      return
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: form.username.trim(),
      full_name: form.full_name.trim(),
      phone: form.phone.trim() || null,
      birth_date: form.birth_date || null,
      congregation: form.congregation.trim() || null,
    })

    if (profileError) {
      setError('Conta criada, mas erro ao salvar perfil. Fale com a liderança.')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-fade-in">

        <div className="flex flex-col items-center gap-3 text-white text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-brand-gold flex items-center justify-center">
            <Globe size={44} className="text-brand-gold" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold">Grão de Mostarda</h1>
            <p className="text-sm text-white/70 mt-1">Ministérios Cristãos</p>
          </div>
        </div>

        <div className="w-full bg-surface rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Criar conta</h2>
            <p className="text-sm text-ink-muted mt-1">Preencha seus dados para se cadastrar</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="username"
              label="Nome de login"
              hint="Será usado para entrar no app. Pode ser seu nome, apelido etc."
              placeholder="ex: mariasilva"
              value={form.username}
              onChange={e => update('username', e.target.value)}
              required
              autoComplete="username"
            />

            <Input
              id="full_name"
              label="Nome completo"
              placeholder="Maria Silva Santos"
              value={form.full_name}
              onChange={e => update('full_name', e.target.value)}
              required
            />

            <Input
              id="email"
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              id="phone"
              label="Celular"
              type="tel"
              placeholder="(11) 99999-9999"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
            />

            <Input
              id="birth_date"
              label="Data de nascimento"
              type="date"
              value={form.birth_date}
              onChange={e => update('birth_date', e.target.value)}
              required
            />

            <Input
              id="congregation"
              label="Congregação"
              placeholder="ex: Sede, Zona Norte…"
              value={form.congregation}
              onChange={e => update('congregation', e.target.value)}
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-ink">Senha</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="mínimo 6 caracteres"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-xl border-2 border-cream-dark bg-surface px-4 py-3 pr-12 text-base text-ink placeholder:text-ink-muted focus:border-brand-blue focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Input
              id="confirm_password"
              label="Confirmar senha"
              type="password"
              placeholder="repita a senha"
              value={form.confirm_password}
              onChange={e => update('confirm_password', e.target.value)}
              required
              autoComplete="new-password"
            />

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={loading}>
              {loading ? 'Criando conta…' : 'Criar conta'}
            </Button>
          </form>
        </div>

        <p className="text-white/70 text-sm text-center">
          Já tem conta?{' '}
          <Link href="/login" className="text-brand-gold font-semibold underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
