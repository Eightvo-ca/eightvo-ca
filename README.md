# eightvo-ca (monorepo)

This repository is a scaffold for the eightVo public site + app. It contains a minimal monorepo with two workspaces:

- `backend` — minimal Express API with a health route
- `frontend` — minimal Vite + React app

Quick start (Windows PowerShell):

```powershell
cd d:\ddc-material-master\eightvo-ca
npm ci
npm run dev
```

Run services individually:

```powershell
npm --workspace backend run dev
npm --workspace frontend run dev
```

See `README_Version3.md` for product vision and requirements.

## Supabase-backed registration demo

The frontend now includes a registration form that saves user details (including a SHA-256 password hash) into a Supabase Postgres table. To use it:

1. Copy `frontend/.env.example` to `frontend/.env.local` so the Supabase URL and anon key are available.
2. Create the `registrations` table and policies using the SQL in `frontend/SUPABASE_SETUP.md`.
3. Run `npm --workspace frontend run dev` and submit the form to write rows into Supabase.
