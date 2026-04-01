<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring%20Boot-3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
<img src="https://img.shields.io/badge/Gemini-1.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>

# 🏯 Monastery360

### *Digitize & Experience the Spirit of Sikkim's Monasteries*

> An immersive web platform for exploring Sikkim's sacred monasteries through 360° virtual tours, interactive maps, multilingual audio guides, a cultural events calendar, a digital archive of ancient artifacts, and an AI-powered guide.

**[🌐 Live Demo](https://monastery360-haritage.vercel.app)** &nbsp;|&nbsp; **[📂 Repository](https://github.com/Rishankgupta08/Monastery360)**

</div>

---

## 📸 Screenshots

### 🏠 Home — Hero Section
<img width="1300" height="450" alt="Screenshot 2026-04-01 161531" src="https://github.com/user-attachments/assets/565e0b61-b013-4059-a7c7-ad748f45fe95" />


### 🗺️ Explore Map — Interactive Sacred Sites
<img width="1300" height="450" alt="Screenshot 2026-04-01 161616" src="https://github.com/user-attachments/assets/d38a9b7d-101b-439b-b093-19b12dd9212c" />


### 📚 Digital Archive — Sacred Artifacts & Texts
<img width="1300" height="450" alt="Screenshot 2026-04-01 161633" src="https://github.com/user-attachments/assets/5766a903-ca67-41f5-9901-aacabd8daed6" />


### 🎧 Audio Guide — Immersive Audio Experience
<img width="1300" height="450" alt="Screenshot 2026-04-01 161558" src="https://github.com/user-attachments/assets/f6bbd45d-0c29-497e-a2b7-e8c03c231250" />


---

## ✨ Features

| Feature | Description |
|---|---|
| 🌐 **360° Virtual Tours** | Immersive monastery walkthroughs using A-Frame & Three.js |
| 🗺️ **Interactive Map** | Explore all sacred sites across Sikkim with filters by location, century, and festival |
| 📚 **Digital Archive** | Browse 847+ digitally preserved manuscripts, murals, prayer scrolls, and ritual artifacts |
| 🎧 **Audio Guides** | Multilingual narrations with offline support and per-monastery playlists |
| 📅 **Cultural Calendar** | Upcoming monastery events, festivals, and ceremonies |
| 🤖 **AI Guide (Gemini)** | Ask questions about monasteries — powered by Gemini 1.5 Flash |
| 🔐 **Firebase Auth** | Sign in with Google/Email via Firebase Authentication |
| 🌙 **Dark / Light Mode** | Full theme toggle across all pages |
| 📖 **Community** | Shared experiences and user-contributed content |

---

## 🏗️ Project Structure

```
Monastery360/
├── backend/                         # Spring Boot (Java 17)
│   └── src/main/java/com/monastery360/
│       ├── controller/
│       │   ├── MonasteryController.java   # GET /api/monasteries
│       │   ├── EventController.java       # GET /api/events
│       │   └── HealthController.java      # GET /health
│       ├── model/                         # Monastery, Event
│       ├── dto/                           # ApiResponse<T>
│       └── service/                       # In-memory service layer
│
├── src/                             # React + TypeScript frontend
│   ├── components/                  # Pages, UI, 360° viewers
│   ├── contexts/                    # Auth, Chatbot context
│   ├── data/                        # Audio metadata
│   ├── lib/firebase.ts              # Firebase init
│   ├── services/gemini.ts           # Gemini REST integration
│   ├── App.tsx                      # Router & layout
│   └── main.tsx                     # Entry point
│
├── public/                          # Static audio/video assets
├── build/                           # Production build output
├── vite.config.ts                   # Dev server, proxy, asset config
├── firebase.json
└── vercel.json
```

---

## 🛠️ Tech Stack

**Frontend**
- [Vite 6](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) + [Framer Motion](https://www.framer.com/motion/)
- [A-Frame](https://aframe.io/) + [Three.js](https://threejs.org/) — 360° viewer
- [@react-google-maps/api](https://visgl.github.io/react-google-maps/) — interactive maps

**Backend**
- [Spring Boot 3](https://spring.io/projects/spring-boot) (Java 17)
- RESTful JSON APIs wrapped in `ApiResponse<T>`

**Cloud & AI**
- [Firebase](https://firebase.google.com/) — Auth, Firestore, Analytics
- [Google Gemini 1.5 Flash](https://ai.google.dev/) — AI chatbot (REST)

---

## ⚙️ Prerequisites

- Node.js 18+ and npm
- Java 17 and Maven
- Firebase project (for Auth / Firestore)
- Google Cloud API key (for Gemini chatbot — optional)

---

## 🚀 Setup & Development

### 1. Clone the repository
```bash
git clone https://github.com/Rishankgupta08/Monastery360.git
cd Monastery360
```

### 2. Frontend
```bash
npm install
npm run dev
# Runs at http://localhost:3000
```

### 3. Backend
```bash
cd backend
mvn spring-boot:run
# Runs at http://localhost:8080
```

### 4. Environment Variables

Create a `.env` file at the project root:

```env
# Firebase (required for Auth & Firestore)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Gemini AI chatbot (optional but recommended)
VITE_GEMINI_API_KEY=...
```

> Vite only exposes variables prefixed with `VITE_` to the browser.

---

## 📡 API Reference

Base URL: `http://localhost:8080`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check string |
| GET | `/health` | Basic health response |
| GET | `/api/health` | `{ success: true, data: "ok" }` |
| GET | `/api/monasteries` | `{ success: true, data: Monastery[] }` |
| GET | `/api/events` | `{ success: true, data: Event[] }` |

All responses are wrapped in `ApiResponse<T>`. Dev CORS allows `http://localhost:3000`.

---

## 📦 Build & Deploy

```bash
npm run build
# Output: /build directory
```

Deploy the `/build` folder to any static host — Firebase Hosting, Vercel, Netlify, or S3/CloudFront. Ensure backend CORS is configured for your production origin.

---

## 🎵 Audio & Video Assets

- Media files live under `public/assets/{audio,videos}/`
- Supported formats: `.mp3`, `.mp4`, `.mkv`, `.webm`, `.ogg`
- Vite's `assetsInclude` config handles all media types
- See `AUDIO_INTEGRATION_GUIDE.md` and `AUDIO_PLAYBACK_EXPLAINED.md` for details

---

## 🔥 Firebase & AI Setup

- Firebase config is loaded from `VITE_FIREBASE_*` env vars in `src/lib/firebase.ts`
- Analytics is initialized only in browser environments where supported
- Gemini integration lives in `src/services/gemini.ts` — set `VITE_GEMINI_API_KEY` to enable

Additional guides included in the repo:
- `FIREBASE_SETUP.md` — initial project configuration
- `FIREBASE_AUTH_FIX.md` — common auth troubleshooting
- `FIREBASE_CONSOLE_CHECKLIST.md` — pre-launch checklist
- `CURRENT_SETUP_GUIDE.md` — complete local setup walkthrough
- `FINAL_IMPLEMENTATION_SUMMARY.md` — architecture summary

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| **Backend unreachable banner** | Ensure backend runs on `:8080` or update `vite.config.ts` proxy |
| **CORS errors** | Verify `@CrossOrigin` on controllers matches your frontend origin |
| **Firebase init errors** | Confirm all `VITE_FIREBASE_*` env vars match your Firebase project |
| **Gemini returns null** | Verify `VITE_GEMINI_API_KEY` is set and the Gemini endpoint is reachable |
| **Audio/video not loading** | Confirm file types are in `vite.config.ts` `assetsInclude` and files exist under `public/` |

---


## 📄 License

This project is provided as-is for demonstration and educational purposes.
Please add an appropriate license file if you intend to use or redistribute it.

---

<div align="center">
  <sub>Built with ❤️ for preserving Sikkim's Buddhist heritage</sub>
</div>
