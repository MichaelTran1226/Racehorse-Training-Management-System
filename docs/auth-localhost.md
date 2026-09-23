# Local authentication demo

## Run

Terminal 1:
```powershell
cd backend
npm install
npm run build
node dist/main.js
```

Terminal 2:
```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173/login`.

## Demo accounts

All accounts use password `equi123`:

| Actor | Email |
|---|---|
| Head Trainer | `headtrainer@gmail.com` |
| Veterinarian | `veterinarian@gmail.com` |
| Groom / Stable Hand | `groom@gmail.com` |
| Horse Owner | `horseowner@gmail.com` |
| Club Manager | `clubmanager@gmail.com` |

## Registration and OTP

The registration screen intentionally says Gmail, but this local phase does not call Google. Use any `@gmail.com` address, then enter OTP `123456`. The demo countdown is 15 minutes. This fixed OTP is development-only.

## Google OAuth note

Google OAuth is deferred. When that phase starts, Google Cloud OAuth credentials and a localhost callback URL will be needed. Real Gmail delivery also needs a configured mail provider; neither is required for this demo.

If `DATABASE_URL` is absent, the backend starts in local auth-demo mode and skips Prisma connection. Real database-backed features still require the project's PostgreSQL connection.
