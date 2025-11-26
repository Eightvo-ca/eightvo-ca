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
