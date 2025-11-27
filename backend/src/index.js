require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-prod'

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))
app.use(express.json())

// Database bootstrap
const pool = new Pool(getDbConfig())

function getDbConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
  }

  return {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'eightvo',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
  }
}

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      date_of_birth DATE NOT NULL,
      phone TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'normal', 'temporary')),
      expires_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `)
}

async function ensureAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@eightvo.ca'
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!'

  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail])
  if (existing.rows.length) {
    return
  }

  const password_hash = await bcrypt.hash(adminPassword, 10)
  await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash, date_of_birth, phone, role) VALUES ($1,$2,$3,$4,$5,$6,$7)`
    , ['Admin', 'User', adminEmail, password_hash, '1990-01-01', '+1-000-000-0000', 'admin']
  )
  console.log(`Admin user provisioned with email ${adminEmail}`)
}

function validatePassword(password = '') {
  const lengthOk = password.length >= 8
  const upper = /[A-Z]/.test(password)
  const lower = /[a-z]/.test(password)
  const number = /\d/.test(password)
  const special = /[^A-Za-z0-9]/.test(password)
  return lengthOk && upper && lower && number && special
}

function normalizePhone(phone = '') {
  return phone.replace(/\s+/g, '')
}

function hasCountryCode(phone = '') {
  return /^\+\d{1,3}[\d-]{6,}$/.test(normalizePhone(phone))
}

function buildToken(user) {
  return jwt.sign({
    sub: user.id,
    email: user.email,
    role: user.role,
    expiresAt: user.expires_at || null
  }, JWT_SECRET, { expiresIn: '2h' })
}

function sanitizeUser(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    role: row.role,
    expiresAt: row.expires_at
  }
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const [, token] = header.split(' ')
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.get('/api/auth/permissions', (req, res) => {
  res.json({
    admin: {
      description: 'Full control including dashboard access, user lifecycle, and content management.',
      capabilities: ['CRUD on users and content', 'Dashboard access', 'Manage temporary account expirations', 'Invite and revoke access']
    },
    normal: {
      description: 'Registered clients with access to standard features and personal dashboard widgets.',
      capabilities: ['Update own profile', 'Create/Read content they own', 'Request support from admins']
    },
    temporary: {
      description: 'Time-bound access; automatically disabled after expiry.',
      capabilities: ['Limited dashboard access', 'Read-only content unless granted create permission', 'Expires at configured date']
    }
  })
})

app.post('/api/auth/register', async (req, res) => {
  const { firstName, lastName, email, dateOfBirth, phone, password, confirmPassword, accountType, expiresAt } = req.body
  const normalizedPhone = normalizePhone(phone)
  const role = accountType === 'temporary' ? 'temporary' : 'normal'

  if (!firstName || !lastName || !email || !dateOfBirth || !phone || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' })
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters with upper, lower, number, and special character.'
    })
  }

  if (!hasCountryCode(normalizedPhone)) {
    return res.status(400).json({ message: 'Phone number must include a country code (e.g., +1-555-123-4567).' })
  }

  let expiry = null
  if (role === 'temporary') {
    expiry = expiresAt ? new Date(expiresAt) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    if (Number.isNaN(expiry.getTime())) {
      return res.status(400).json({ message: 'Invalid expiry date for temporary user.' })
    }
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
    if (existing.rows.length) {
      return res.status(409).json({ message: 'User already exists with that email.' })
    }

    const password_hash = await bcrypt.hash(password, 10)
    const insertResult = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, date_of_birth, phone, role, expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [firstName.trim(), lastName.trim(), email.toLowerCase(), password_hash, dateOfBirth, normalizedPhone, role, expiry]
    )

    const user = insertResult.rows[0]
    const token = buildToken(user)
    return res.status(201).json({
      message: role === 'temporary' ? 'Temporary access created.' : 'Registration successful.',
      token,
      user: sanitizeUser(user)
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to register user.' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
    if (!result.rows.length) return res.status(401).json({ message: 'Invalid credentials.' })

    const user = result.rows[0]
    if (user.role === 'temporary' && user.expires_at && new Date(user.expires_at) < new Date()) {
      return res.status(403).json({ message: 'Temporary access has expired.' })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials.' })

    const token = buildToken(user)
    return res.json({
      message: 'Login successful',
      token,
      user: sanitizeUser(user)
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Login failed.' })
  }
})

app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.sub])
    if (!result.rows.length) return res.status(404).json({ message: 'User not found.' })

    const user = result.rows[0]
    if (user.role === 'temporary' && user.expires_at && new Date(user.expires_at) < new Date()) {
      return res.status(403).json({ message: 'Temporary access has expired.' })
    }

    res.json({ user: sanitizeUser(user) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to load profile.' })
  }
})

// Example protected route placeholder
app.get('/api/public/services', (req, res) => {
  res.json([{ id: 1, name: 'Consulting' }, { id: 2, name: 'Training' }])
})

// Serve static from frontend in production (if built)
if (process.env.NODE_ENV === 'production') {
  const frontDist = process.env.FRONTEND_DIST
    ? path.resolve(process.env.FRONTEND_DIST)
    : path.resolve(process.cwd(), 'frontend', 'dist')

  console.log('Attempting to serve frontend from:', frontDist)

  if (fs.existsSync(frontDist)) {
    app.use(express.static(frontDist))
    app.get('*', (req, res) => res.sendFile(path.join(frontDist, 'index.html')))
  } else {
    console.error('Frontend dist not found at', frontDist)
  }
}

initDb()
  .then(ensureAdminUser)
  .then(() => {
    app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to start server', err)
    process.exit(1)
  })
