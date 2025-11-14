# Monastery360

An immersive, modern web app for exploring monasteries through 360° virtual tours, interactive maps, cultural calendars, digital archives, and an AI-powered guide. This repository contains a Vite + React (TypeScript) frontend and a Spring Boot backend.

Frontend serves the UI, 360° viewers, Google Maps view, audio guides, and Gemini-powered chatbot. Backend exposes simple JSON APIs for monasteries, events, and health checks. Firebase is used for Auth, Firestore, and optional Analytics.

## Contents
- Overview
- Features
- Project structure
- Tech stack
- Prerequisites
- Setup
  - Frontend
  - Backend
  - Environment variables
- Development
- Build & deploy
- API reference
- Assets (audio/video)
- Firebase & AI setup
- Troubleshooting
- License

## Overview
Monastery360 enables users to:
- Explore monasteries via 360° virtual tours and video assets
- Discover locations on an interactive map
- Browse a cultural events calendar and digital archives
- Use audio guides in multiple languages
- Chat with an AI guide (Gemini) for concise, contextual answers

## Features
- Vite + React + TypeScript frontend with Tailwind UI components
- 360° viewers using `aframe` and Three.js
- Google Maps integration (`@react-google-maps/api`)
- Firebase Auth and Firestore integration
- AI chatbot powered by Gemini 1.5 Flash (REST)
- Spring Boot backend with REST endpoints
- Vite dev proxy to backend; mock API during frontend-only dev

## Project structure
```
.
├─ backend/                      # Spring Boot backend
│  ├─ src/main/java/com/monastery360/
│  │  ├─ controller/
│  │  │  ├─ EventController.java         # GET /api/events
│  │  │  ├─ MonasteryController.java     # GET /api/monasteries
│  │  │  └─ HealthController.java        # GET /, /health, /api/health
│  │  ├─ model/                          # Event, Monastery
│  │  ├─ dto/                            # ApiResponse<T>
│  │  └─ service/                        # In-memory services
│  └─ pom.xml
├─ public/                      # Static assets (audio/video), index.html
├─ src/                         # Frontend app (React + TS)
│  ├─ components/               # Pages, UI components, 360 viewers, etc.
│  ├─ contexts/                 # auth-context, chatbot-context
│  ├─ data/                     # audio-data
│  ├─ lib/firebase.ts           # Firebase initialization
│  ├─ services/gemini.ts        # Gemini integration
│  ├─ main.tsx                  # App bootstrap
│  └─ App.tsx                   # Router and layout
├─ build/                       # Frontend production build output
├─ vite.config.ts               # Dev server, proxy, mock API, assets config
├─ package.json
└─ README.md
```

## Tech stack
- Frontend: Vite 6, React 18, TypeScript, Tailwind CSS 4, Radix UI, Framer Motion, A-Frame, Three.js
- Maps: `@react-google-maps/api`
- Auth/DB/Analytics: Firebase Web SDK
- AI: Google Gemini (via REST)
- Backend: Spring Boot 3 (Java 17)

## Prerequisites
- Node.js 18+ and npm
- Java 17 and Maven (for backend)
- Google Cloud API key for Gemini (optional but recommended)
- Firebase project (for Auth/Firestore/Analytics)

## Setup

### 1) Frontend
```bash
npm install
npm run dev
```
Dev server runs on http://localhost:3000 by default.

### 2) Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs on http://localhost:8080 by default.

### 3) Environment variables
Create a `.env` at the project root for the frontend (Vite). Vite only exposes vars prefixed with `VITE_`.

```env
# Firebase (required for Auth/Firestore)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Gemini (optional but required to enable AI chatbot)
VITE_GEMINI_API_KEY=...
```

If you change frontend or backend ports, update `vite.config.ts` proxy accordingly.

## Development
- Frontend dev: `npm run dev`
- Backend dev: `mvn spring-boot:run` (in `backend/`)

The Vite dev server includes:
- A proxy from `/api/*` to `http://localhost:8080` for backend endpoints
- A simple mock endpoint at `/api/monasteries` to unblock UI dev when backend is not running
- Asset handling for `.mkv`, `.mp4`, `.webm`, `.ogg`

`App.tsx` pings `/api/monasteries` on load and shows a banner if the backend is unreachable.

## Build & deploy
```bash
npm run build
```
Static files are generated in the `build/` directory. You can deploy these to any static host (e.g., Firebase Hosting, Netlify, Vercel static, S3/CloudFront). Ensure your backend is reachable by the frontend origin, and configure CORS on the backend if hosting separately.

## API reference (backend)
Base URL: `http://localhost:8080`

- `GET /` → "Monastery360 Backend is running"
- `GET /health` → basic health string
- `GET /api/health` → `{ success: true, data: "ok" }`
- `GET /api/monasteries` → `{ success: true, data: Monastery[] }`
- `GET /api/events` → `{ success: true, data: Event[] }`

Responses are wrapped in `ApiResponse<T>`.

Dev CORS allows `http://localhost:3000`.

## Assets (audio/video)
- Public media resides under `public/assets/{audio,videos}` and is served directly by Vite/dev server and the production build.
- The repository includes sample `.mp3`, `.mkv`, and `.mp4` assets for testing.
- See `AUDIO_*` markdown guides for integration and performance tips.

## Firebase & AI setup
- Firebase config is read from environment variables in `src/lib/firebase.ts`. Ensure values are present for local dev; analytics initializes only in browser environments when supported.
- Gemini integration is implemented in `src/services/gemini.ts` using the REST API for Gemini 1.5 Flash. Set `VITE_GEMINI_API_KEY` to enable the chatbot.
- Additional setup docs are provided in:
  - `FIREBASE_SETUP.md`
  - `FIREBASE_AUTH_FIX.md`
  - `FIREBASE_CONSOLE_CHECKLIST.md`
  - `CURRENT_SETUP_GUIDE.md`
  - `FINAL_IMPLEMENTATION_SUMMARY.md`
  - `CLEAN_AUDIO_SETUP.md`, `AUDIO_INTEGRATION_GUIDE.md`, `AUDIO_PLAYBACK_EXPLAINED.md`

## Troubleshooting
- Backend unreachable banner at runtime: ensure backend is running on `:8080` or update `vite.config.ts` proxy.
- CORS errors: verify `@CrossOrigin` and frontend origin match (see controllers under `backend/src/main/java/.../controller`).
- Firebase initialization errors: confirm all `VITE_FIREBASE_*` vars exist and correspond to your Firebase project.
- Gemini returns null: verify `VITE_GEMINI_API_KEY` is set and the model endpoint is reachable from your network.
- Video/audio not loading: confirm file types are included in `vite.config.ts` `assetsInclude` and assets exist under `public/` or are imported correctly.

## License
This project is provided as-is for demonstration and educational purposes. If you intend to use or redistribute, please add an appropriate license file and update this section.
  

