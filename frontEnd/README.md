# Car Rental — Frontend

React 19 single-page application built with Vite, Tailwind CSS, Framer Motion, and React Router v7.

## Stack

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19 | UI library |
| react-router-dom | 7 | Client-side routing with animated page transitions |
| vite | 8 | Dev server & build tool |
| tailwindcss | 3 | Utility-first styling |
| framer-motion | 12 | Page transition animations |
| lucide-react | latest | Icon set |
| axios | **1.15.0** | HTTP client (pinned — post supply-chain-attack safe release) |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

Set the backend URL if needed (defaults to `http://localhost:5000`):

```bash
# .env.local
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
src/
├── lib/
│   ├── auth.js             # saveAuth / getToken / getUser / clearAuth
│   └── apiClient.js        # Axios instance — JWT interceptor + 401 redirect
├── services/               # One file per API domain
│   ├── authService.js
│   ├── carService.js
│   ├── rentalService.js
│   ├── renterService.js
│   ├── ownerService.js
│   ├── reviewService.js
│   ├── adminService.js
│   └── notificationService.js
├── features/               # Route-level feature folders (components + hooks + data)
│   ├── home/
│   ├── explore/
│   ├── car-detail/
│   ├── confirm-request/
│   ├── dashboard/
│   ├── profile-settings/
│   └── admin/
├── Admin/                  # Admin pages & layout
├── Owner/                  # Owner pages & layout
├── HomePage/               # Public landing page
├── LoginPage/
├── SignupPage/
├── shared/                 # Reusable layouts, Navbar, Footer, StatusChip
├── components/             # Generic UI primitives
├── design/                 # Design tokens
└── App.jsx                 # Router + animated routes
```

## Authentication

JWTs are stored in `sessionStorage` via `src/lib/auth.js`.  
The `apiClient` automatically attaches the token as `Authorization: Bearer <token>` on every request and redirects to `/login` on a `401` response.

## Building for Docker

The `Dockerfile` in this folder builds the Vite output with `npm run build` and serves it. The Docker Compose setup maps it to port `3000`.
