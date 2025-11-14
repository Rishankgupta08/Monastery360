// Temporary component to debug environment variables
export function EnvCheck() {
  console.log('🔍 Environment Variable Check:');
  console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY ? 'SET' : 'MISSING');
  console.log('VITE_FIREBASE_AUTH_DOMAIN:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'SET' : 'MISSING');
  console.log('VITE_FIREBASE_APP_ID:', import.meta.env.VITE_FIREBASE_APP_ID ? 'SET' : 'MISSING');
  console.log('All env vars:', import.meta.env);

  // Only render this helper in development to avoid overlapping UI in prod
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[5] bg-red-500/90 text-white px-2 py-1 rounded text-[10px] pointer-events-none shadow" role="status">
      ENV CHECK - See Console
    </div>
  );
}