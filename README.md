# TaskFlow — Frontend

React + Vite frontend for TaskFlow — a task manager with a focus timer, analytics, and an AI assistant. Talks to the TaskFlow backend (Spring Boot + MySQL) over REST.

---

## Tech Stack

- React 18 + Vite
- Tailwind CSS (custom warm color theme — see `tailwind.config.js`)
- React Router
- Axios
- Recharts (Analytics charts)
- Font Awesome (icons)
- `@react-oauth/google` (Google Sign-In)
- Firebase (Phone Authentication)

---

## Features

- **Landing page** — Hero, Features, How It Works, Footer
- **Auth** — Login/Register (username or email), Google Sign-In, Phone Auth, Forgot/Reset Password
- **Tasks** — create, edit, delete, search, priority, category, due dates, long descriptions
- **Focus Timer** — start/pause/resume/cancel sessions, accurate countdown across tab switches and reloads, live session recovery
- **Dashboard** — today's stats, weekly focus chart, task progress, recent sessions
- **Analytics** — completion trend, focus time trend, category/priority breakdowns, productivity heatmap, streaks
- **AI Assistant** — chat widget that answers questions about your tasks
- **Tools** — everyday calculators (age, BMI, EMI, GST, currency, etc.)
- Light/dark mode

---

## Getting Started

### Prerequisites
- Node.js 18+
- The TaskFlow backend running locally or deployed somewhere reachable

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_API_URL=http://localhost:8080
   ```

   Point this at your backend's URL — `http://localhost:8080` for local development, or your deployed backend URL (e.g. a Render URL) in production.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:5173` by default.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Environment Variables

| Key | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the backend API. Every API call in the app is built as `${import.meta.env.VITE_API_URL}/...` — never hardcode `localhost:8080` directly in a component. |

Because Vite only exposes env vars prefixed with `VITE_` to the client, any new environment variable added here must follow that naming convention to be accessible via `import.meta.env`.

> **Reminder:** `import.meta.env.VITE_API_URL` only substitutes correctly inside a template literal (`` `${import.meta.env.VITE_API_URL}/auth/login` ``). Writing it inside a plain string (`"import.meta.env.VITE_API_URL/auth/login"`) will send the request to that literal text instead of the real URL — a good thing to grep for (`"import.meta.env`) before shipping.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. On [vercel.com](https://vercel.com), sign in with GitHub and import the repo. Vercel auto-detects the Vite framework preset.
3. Add the environment variable in Vercel's project settings:

   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```

4. Deploy. Vercel gives you a live URL (e.g. `https://taskflow-frontend.vercel.app`).
5. **Update the backend's CORS configuration** to allow this new Vercel origin — otherwise the deployed frontend's requests will be blocked. Add the Vercel URL to `allowedOrigins` in the backend's `CorsConfig.java` and redeploy the backend.

---

## Project Structure

```
src/
├── components/     # TaskForm, TaskList, FocusTimer, TimerCircle, TaskSelector,
│                   #   Chatbot, Navbar, Sidebar, ProtectedRoute, HeroSection,
│                   #   FeaturesSection, HowItWorksSection, Footer, etc.
├── pages/          # Landing, Login, Register, ForgotPassword, ResetPassword,
│                   #   Dashboard, AnalyticsPage, tools/*
├── layouts/        # DashboardLayout (sidebar + navbar shell)
├── hooks/          # useTimer (timestamp-anchored countdown hook)
├── services/       # api.js, focusSessionService.js, analyticsService.js
├── context/        # ToastContext
└── App.jsx         # Route definitions
```

---

## Known Limitations

- Pausing a focus session is a frontend-only concept — the backend has no `PAUSED` status, so a session recovered after a reload resumes based on real elapsed time, not the paused snapshot.
- No automated test suite is currently included.