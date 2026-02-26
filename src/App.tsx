import { useState, useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { LandingPage } from './components/landing-page';
import { VirtualTourPage } from './components/virtual-tour-page';
import { MapPage } from './components/map-page';
import { DigitalArchivePage } from './components/digital-archive-page';
import { AudioGuidePage } from './components/audio-guide-page';
import { CulturalCalendarPage } from './components/cultural-calendar-page';
import { CommunityPage } from './components/community-page';
import { FutureFeaturesPage } from './components/future-features-page';
import { LoginPage } from './components/auth/login-page';
import { RegisterPage } from './components/auth/register-page';
import { AuthProvider } from './contexts/auth-context';
import { ChatbotProvider } from './contexts/chatbot-context';
import { FloatingChatIcon } from './components/FloatingChatIcon';
import { AIChatbot } from './components/AIChatbot';

// Firebase connection test (only in development)
if (import.meta.env.DEV) {
  import('./lib/firebase-test');
}

function Layout() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || 'home';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation
        currentPage={currentPage}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />
      <main className={`flex-1 ${isLandingPage ? "pt-16" : "container mx-auto px-4 pt-20 pb-12"}`}>
        <Outlet />
      </main>
      <Footer />

      {/* AI Chatbot - Persistent across all pages */}
      <FloatingChatIcon />
      <AIChatbot />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "virtual-tour", element: <VirtualTourPage /> },
      { path: "map", element: <MapPage key="map-page" /> },
      { path: "archive", element: <DigitalArchivePage /> },
      { path: "audio-guide", element: <AudioGuidePage /> },
      { path: "calendar", element: <CulturalCalendarPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "future", element: <FutureFeaturesPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);

export default function App() {
  return (
    <AuthProvider>
      <ChatbotProvider>
        <RouterProvider router={router} />
      </ChatbotProvider>
    </AuthProvider>
  );
}
