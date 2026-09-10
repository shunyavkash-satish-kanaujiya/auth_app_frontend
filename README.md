# Auth App Frontend

React + TypeScript + Vite frontend for the v1 authentication flow.

## Architecture

- `src/app`: application composition and route definitions.
- `src/features/auth`: session state, login, logout, and bootstrap logic.
- `src/lib/api.ts`: one typed API boundary; all requests include cookies and retry once through refresh when an access token expires.
- `src/components`: shared auth layout, form fields, and route guards.
- `src/pages`: register, login, and welcome experiences.
- `src/styles`: global responsive visual system.

The frontend never stores JWTs in local storage. The backend owns the HttpOnly cookies; the frontend only receives sanitized user data.

## Run

```bash
npm install
npm run dev
```

The default API URL is `http://localhost:8000/api/v1`. Override it with `VITE_API_URL` in `.env.local` when needed.

## v1 flow

Registration creates the account, establishes the cookie session, and redirects directly to `/welcome`. Login also establishes the cookie session and redirects to `/welcome`. The protected welcome page bootstraps the current user's name from `/api/v1/dashboard`.
