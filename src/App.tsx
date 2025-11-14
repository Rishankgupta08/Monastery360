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
import { EnvCheck } from './components/EnvCheck';

// Firebase connection test (only in development)
if (import.meta.env.DEV) {
  import('./lib/firebase-test');
}

function Layout() {
  const [isDark, setIsDark] = useState(false);
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || 'home';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch('/api/monasteries', { 
          signal: AbortSignal.timeout(5000) // Timeout after 5 seconds
        });
        if (!response.ok) throw new Error(`API responded with status: ${response.status}`);
        await response.json();
        setApiStatus('ok');
      } catch (error) {
        console.error('API connection error:', error);
        setApiStatus('error');
        // Retry after 30 seconds
        setTimeout(checkApiConnection, 30000);
      }
    };
    
    checkApiConnection();
  }, []);

  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation
        currentPage={currentPage}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />
      <main className={`flex-1 ${isLandingPage ? "pt-16" : "container mx-auto px-4 pt-20 pb-12"}`}>
        {apiStatus === 'error' && (
          <div className="mb-4 p-3 rounded border border-red-300 text-red-700 bg-red-50">
            We're having trouble connecting to our servers. Please check your internet connection or try again later.
            <button 
              onClick={() => window.location.reload()} 
              className="ml-2 underline hover:text-red-800"
            >
              Retry
            </button>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
      
      {/* AI Chatbot - Persistent across all pages */}
      <FloatingChatIcon />
      <AIChatbot />
      
      {/* Debug Environment Variables */}
      {import.meta.env.DEV && <EnvCheck />}
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
