'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: any) => {
    e.preventDefault()
    setErr('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.error || 'Login failed')

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('current_user', JSON.stringify(data.user))

      // Redirect to onboarding if first time, else home
      if (!data.user.profile_complete) {
        router.push('/onboarding')
      } else {
        router.push('/home')
      }
    } catch (err: any) {
      setErr(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-32 -translate-y-32 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-32 translate-y-32 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            CityAssist
          </h1>
          <p className="text-slate-400">Your Citizen-Centric Urban Assistant</p>
        </div>

        <div className="card glow">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <LogIn className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sign In</h2>
              <p className="text-sm text-slate-400">Access your account</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  className="input pl-10"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  className="input pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {err && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-xs font-medium text-slate-300 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-slate-400">
              <p>Admin: admin@cityassist.local / admin123</p>
              <p>User: demo@cityassist.city / demo123</p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <a href="/onboarding" className="text-blue-400 hover:text-blue-300 font-medium">
            Get started
          </a>
        </p>
      </div>
    </div>
  )
}
