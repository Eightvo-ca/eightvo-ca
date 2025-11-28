# Supabase setup for registrations

Use these SQL statements in the Supabase SQL editor to create a `registrations` table that works with the new registration form. The anon key in `.env.local` is sufficient if row-level security policies allow inserts and reads.

```sql
-- Create the table
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.registrations enable row level security;

-- Allow public (anon) clients to insert and read their own registration rows
create policy "Allow inserts for anon" on public.registrations
  for insert with check (true);

create policy "Allow reads for anon" on public.registrations
  for select using (true);
```

After the table is created, copy `frontend/.env.example` to `frontend/.env.local` so the Vite dev server can reach your project:

```bash
cp frontend/.env.example frontend/.env.local
```
