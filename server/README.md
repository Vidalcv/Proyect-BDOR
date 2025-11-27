# Server — Proyect-BDOR

This folder contains the minimal Express backend for the project.

Prerequisites
- Node.js (v18+ recommended) and npm
- PostgreSQL server and `psql` client

Quick setup (on a new machine)

1. Clone the repo and go to project root, then server folder:

```powershell
git clone <your-repo-url>
Set-Location .\Proyect-BDOR\server
```

2. Install server dependencies:

```powershell
npm install
```

3. Create a database and import schema (adjust DB name/user as you prefer).

# From PowerShell: create DB named `bdor` (you may be asked for postgres password)
```powershell
psql -U postgres -c "CREATE DATABASE bdor;"
```

# Import provided SQL (the file is at project `Docs/database.sql`):
```powershell
psql -U postgres -d bdor -f "..\Docs\database.sql"
```

If you cannot run `psql` from PowerShell, open `psql` prompt and run:
```sql
\c bdor
\i '..\\Docs\\database.sql'
```

4. Create `.env` from the example and edit values:

```powershell
copy .env.example .env
# edit .env and set DATABASE_URL to point to your DB (e.g. postgresql://postgres:pass@localhost:5432/bdor)
```

5. Start server (development):

```powershell
npm run dev
```

6. Start the frontend (from project root):

```powershell
Set-Location ..\client
npm install
npm run dev
```

Notes & tips
- The backend expects the database schema provided in `Docs/database.sql` (it uses PostgreSQL composite types and inheritance).
- Authentication is JWT-based. The quick `POST /api/auth/login` currently locates the user by email (no password check) — see `server/controllers/auth.controller.js`. If you want secure login, I can add hashed passwords and registration flow.
- The server listens on `PORT` (default 4000) and allows CORS from `CORS_ORIGIN`.
- If you push this repo to a remote and clone on another machine, copy `.env.example` to `.env` and update the values before running.

Endpoints: the most used by the frontend are mounted under `/api`:

- `POST /api/auth/login` (body: `{ correo, password }`)
- `GET /api/usuarios/:id?` (uses token if id missing)
- `GET /api/materias` and other CRUD routes
- `GET /api/asesorias`, `/api/asesorias/profesor/:id`, `/api/asesorias/alumno/:id`
- `GET /api/dashboard/alumno/:id`

If you want, I can also:
- Add a `server` script to run the SQL import automatically (requires `psql` available),
- Add password hashing + registration flow, or
- Add a small Postman collection for quick testing.
