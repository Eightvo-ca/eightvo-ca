import React, { useEffect, useMemo, useState } from 'react'
import { fetchTableRows, insertRow, isSupabaseConfigured } from './utils/supabase'
import './styles.css'

const initialForm = { fullName: '', email: '', password: '' }

function RegistrationForm() {
  const [formState, setFormState] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [saving, setSaving] = useState(false)
  const [registrations, setRegistrations] = useState([])

  const supabaseReady = useMemo(() => isSupabaseConfigured(), [])

  useEffect(() => {
    if (!supabaseReady) return

    const loadRegistrations = async () => {
      const { data, error } = await fetchTableRows('registrations', {
        select: 'id, full_name, email, created_at',
        orderBy: 'created_at.desc',
        limit: 20,
      })

      if (error) {
        setStatus({ type: 'error', message: error })
        return
      }

      setRegistrations(data ?? [])
    }

    loadRegistrations()
  }, [supabaseReady])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const buffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'idle', message: '' })

    if (!supabaseReady) {
      setStatus({ type: 'error', message: 'Supabase environment variables are missing.' })
      return
    }

    if (!formState.fullName || !formState.email || !formState.password) {
      setStatus({ type: 'error', message: 'Please fill in name, email, and password.' })
      return
    }

    setSaving(true)

    const passwordHash = await hashPassword(formState.password)
    const payload = {
      full_name: formState.fullName.trim(),
      email: formState.email.trim().toLowerCase(),
      password_hash: passwordHash,
    }

    const { error } = await insertRow('registrations', payload)

    if (error) {
      setStatus({ type: 'error', message: error })
      setSaving(false)
      return
    }

    setStatus({ type: 'success', message: 'Registration saved to Supabase.' })
    setFormState(initialForm)

    const { data, error: listError } = await fetchTableRows('registrations', {
      select: 'id, full_name, email, created_at',
      orderBy: 'created_at.desc',
      limit: 20,
    })

    if (!listError) {
      setRegistrations(data ?? [])
    }

    setSaving(false)
  }

  return (
    <div className="page">
      <header className="page__header">
        <img
          src="/IMG_1789.png"
          alt="eightVo logo"
          className="page__logo"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <div>
          <p className="eyebrow">eightVo — onboarding demo</p>
          <h1>Create an account</h1>
          <p className="lede">Save registration details directly into your Supabase PostgreSQL instance.</p>
        </div>
      </header>

      <section className="card">
        <div className="card__header">
          <div>
            <p className="eyebrow">Supabase-backed</p>
            <h2>User registration</h2>
          </div>
          {!supabaseReady && <span className="pill pill--warning">Missing env variables</span>}
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="form__field">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={handleChange}
              placeholder="e.g. Ada Lovelace"
              autoComplete="name"
              required
            />
          </label>

          <label className="form__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="form__field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <button type="submit" className="button" disabled={saving}>
            {saving ? 'Saving…' : 'Save to Supabase'}
          </button>

          {status.message && (
            <p className={`status status--${status.type}`} role="status">
              {status.message}
            </p>
          )}
        </form>
      </section>

      <section className="card">
        <div className="card__header">
          <div>
            <p className="eyebrow">Recent records</p>
            <h2>Registrations stored</h2>
          </div>
          <span className="pill">latest 20</span>
        </div>

        {registrations.length === 0 ? (
          <p className="muted">No registrations saved yet.</p>
        ) : (
          <ul className="list">
            {registrations.map((registration) => (
              <li key={registration.id} className="list__item">
                <div>
                  <p className="list__title">{registration.full_name}</p>
                  <p className="muted">{registration.email}</p>
                </div>
                <span className="pill pill--ghost">
                  {new Date(registration.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default function App() {
  return <RegistrationForm />
}
