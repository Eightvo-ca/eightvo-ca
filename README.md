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

If you have an existing snapshot of the EightVo-Solutions-Inc repository on your machine (for example at
`D:\ddc-material-master\EightVo-Solutions-Inc`), you can sync it into this repo while excluding the Vercel package/config by
running:

```bash
./scripts/sync_from_snapshot.sh /path/to/EightVo-Solutions-Inc
```

Run services individually:

```powershell
npm --workspace backend run dev
npm --workspace frontend run dev
```

See `README_Version3.md` for product vision and requirements.
