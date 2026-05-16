import { useState } from 'react'
import { LockIcon } from '../Icons'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/.netlify/functions/admin-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      })

      if (!res.ok) throw new Error('Invalid password')
      const { token } = await res.json()
      onLogin(token)
    } catch {
      setError('Invalid password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/bloom-babe-logo-large.jpeg"
            alt="Bloom Babe"
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4 ring-1 ring-gold/20"
          />
          <h1 className="font-serif text-2xl text-charcoal mb-1">Admin Dashboard</h1>
          <p className="text-charcoal-light text-sm">Bloom Babe Floral & Events</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gold/10 p-8">
          <div className="flex items-center gap-2 mb-4">
            <LockIcon className="w-4 h-4 text-gold" />
            <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light font-sans font-medium">
              Password
            </label>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-lg border border-gold/15 bg-cream/50 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors mb-4"
            autoFocus
          />

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose/10 border border-rose/20 text-sm text-rose-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-full bg-charcoal text-cream font-medium text-sm tracking-wide hover:bg-charcoal-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
