import React, { useEffect, useMemo, useState } from 'react'

const API_BASE = '/api'

const passwordScore = (password) => {
  let score = 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return score
}

const strengthLabel = ['Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']

export default function App() {
  const [showAuth, setShowAuth] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [permissions, setPermissions] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phone: '+1',
    accountType: 'normal',
    expiresAt: '',
    password: '',
    confirmPassword: ''
  })

  const passwordStrength = useMemo(() => passwordScore(registerForm.password), [registerForm.password])

  useEffect(() => {
    fetch(`${API_BASE}/auth/permissions`).then(async (res) => {
      if (res.ok) {
        setPermissions(await res.json())
      }
    })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) return
    setIsLoadingProfile(true)
    fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unable to load profile')
        const data = await res.json()
        setCurrentUser(data.user)
      })
      .catch(() => {
        localStorage.removeItem('authToken')
      })
      .finally(() => setIsLoadingProfile(false))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Unable to login')
        return
      }
      localStorage.setItem('authToken', data.token)
      setCurrentUser(data.user)
      setMessage(data.message)
      setShowAuth(false)
    } catch (err) {
      setError('An unexpected error occurred while logging in.')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords must match.')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Registration failed')
        return
      }
      localStorage.setItem('authToken', data.token)
      setCurrentUser(data.user)
      setMessage(data.message)
      setShowAuth(false)
    } catch (err) {
      setError('An unexpected error occurred while registering.')
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setCurrentUser(null)
    setMessage('Logged out successfully.')
  }

  const renderPermissionCards = () => {
    if (!permissions) return null
    return (
      <div className="grid">
        {Object.entries(permissions).map(([role, info]) => (
          <div key={role} className="card">
            <div className="pill">{role}</div>
            <h3>{role === 'normal' ? 'Normal' : role.charAt(0).toUpperCase() + role.slice(1)} user</h3>
            <p>{info.description}</p>
            <ul>
              {info.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  const renderAuthModal = () => {
    if (!showAuth) return null
    return (
      <div className="modal-backdrop" onClick={() => setShowAuth(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="tabs">
            <button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>
              Login
            </button>
            <button className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>
              Register
            </button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="form">
              <label>
                Email
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </label>
              <button type="submit" className="primary">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="form">
              <div className="two-col">
                <label>
                  First name
                  <input
                    type="text"
                    required
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                  />
                </label>
                <label>
                  Last name
                  <input
                    type="text"
                    required
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                  />
                </label>
              </div>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
              </label>
              <div className="two-col">
                <label>
                  Date of birth
                  <input
                    type="date"
                    required
                    value={registerForm.dateOfBirth}
                    onChange={(e) => setRegisterForm({ ...registerForm, dateOfBirth: e.target.value })}
                  />
                </label>
                <label>
                  Phone (with country code)
                  <input
                    type="tel"
                    required
                    placeholder="+1-555-123-4567"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  />
                </label>
              </div>

              <div className="two-col">
                <label>
                  Password
                  <input
                    type="password"
                    required
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  />
                </label>
                <label>
                  Re-enter password
                  <input
                    type="password"
                    required
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  />
                </label>
              </div>

              <div className="strength">
                <div>Strength: {strengthLabel[passwordStrength]}</div>
                <div className="strength-bar">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className={passwordStrength > idx ? 'filled' : ''} />
                  ))}
                </div>
                <small>Use 8+ characters with upper, lower, number, and symbol.</small>
              </div>

              <div className="two-col">
                <label>
                  Account type
                  <select
                    value={registerForm.accountType}
                    onChange={(e) => setRegisterForm({ ...registerForm, accountType: e.target.value })}
                  >
                    <option value="normal">Normal</option>
                    <option value="temporary">Temporary</option>
                  </select>
                </label>
                {registerForm.accountType === 'temporary' && (
                  <label>
                    Expires at
                    <input
                      type="date"
                      value={registerForm.expiresAt}
                      onChange={(e) => setRegisterForm({ ...registerForm, expiresAt: e.target.value })}
                    />
                  </label>
                )}
              </div>

              <button type="submit" className="primary">Create account</button>
            </form>
          )}

          {error && <div className="alert error">{error}</div>}
          {message && <div className="alert success">{message}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <img src="/IMG_1789.png" alt="eightVo logo" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div>
            <div className="eyebrow">phase 1 · permissions</div>
            <h1>eightVo Access Control</h1>
          </div>
        </div>

        <div className="profile-area">
          {currentUser ? (
            <div className="user-chip">
              <span className="user-role">{currentUser.role}</span>
              <span>{currentUser.email}</span>
              {currentUser.role === 'temporary' && currentUser.expiresAt && (
                <span className="expiry">Expires {new Date(currentUser.expiresAt).toLocaleDateString()}</span>
              )}
            </div>
          ) : (
            <div className="user-chip muted">Guest</div>
          )}
          <button className="icon-button" onClick={() => setShowAuth(true)} title="Profile">
            <span role="img" aria-label="profile">👤</span>
          </button>
          {currentUser && (
            <button className="ghost" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="content">
        <section className="panel">
          <div>
            <p className="eyebrow">What you can do today</p>
            <h2>Clarified permissions for Admin, Normal, and Temporary users</h2>
            <p>
              The profile icon in the top-right opens login/registration. Admin accounts are provisioned once on the backend,
              while every self-service registration creates a normal client account. Temporary access can be issued with an
              expiry date and is automatically blocked after it passes.
            </p>
            <ul className="checks">
              <li>CRUD clarity across user types</li>
              <li>Dashboard access notes</li>
              <li>Content management ownership rules</li>
              <li>Temporary access expiry enforcement</li>
            </ul>
            {currentUser ? (
              <div className="alert success compact">
                Signed in as <strong>{currentUser.firstName || currentUser.email}</strong> ({currentUser.role}).
                {currentUser.role === 'temporary' && currentUser.expiresAt && (
                  <> Access ends {new Date(currentUser.expiresAt).toLocaleDateString()}.</>
                )}
              </div>
            ) : (
              <button className="primary" onClick={() => { setShowAuth(true); setActiveTab('register') }}>
                Get started
              </button>
            )}
          </div>
          <div className="callout">
            <h3>Profile actions</h3>
            <p>Click the profile icon to sign in or register. All fields are validated before hitting PostgreSQL.</p>
            <div className="mini-list">
              <div>
                <strong>Admin</strong>
                <p>Provisioned server-side with secure defaults.</p>
              </div>
              <div>
                <strong>Normal</strong>
                <p>Created via registration; full CRUD on personal content.</p>
              </div>
              <div>
                <strong>Temporary</strong>
                <p>Optional expiry date; blocked automatically when expired.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Permissions matrix</h2>
          {permissions ? renderPermissionCards() : <p>Loading permission details…</p>}
        </section>

        <section>
          <h2>Temporary access policy</h2>
          <div className="card">
            <p>Temporary users can be created from the registration modal by choosing the Temporary account type.</p>
            <ul>
              <li>Default expiry is 14 days if a custom date is not provided.</li>
              <li>Logins are blocked automatically after the expiry date.</li>
              <li>Admins can extend or revoke access directly in the database.</li>
            </ul>
          </div>
        </section>
      </main>

      {renderAuthModal()}

      <footer className="footer">
        eightVo · permissions preview · {new Date().getFullYear()}
        {isLoadingProfile && <span className="loading">Loading profile…</span>}
      </footer>
    </div>
  )
}
