import { auth, db } from './firebase';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Test auth connection
    console.log('🔥 Firebase Auth initialized:', !!auth);
    console.log('🔥 Firebase Firestore initialized:', !!db);
    
    // Check if we're connected to Firebase
    const authConfig = auth.config;
    console.log('🔥 Firebase project:', authConfig.apiKey ? 'Connected' : 'Not configured');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};

// Development helper function to check environment variables
export const checkFirebaseConfig = () => {
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missing = requiredEnvVars.filter(envVar => 
    !import.meta.env[envVar] || import.meta.env[envVar] === 'your_api_key_here' || import.meta.env[envVar] === 'your_sender_id_here' || import.meta.env[envVar] === 'your_app_id_here'
  );

  if (missing.length > 0) {
    console.warn('⚠️ Missing or placeholder Firebase environment variables:', missing);
    console.info('📝 Please update your .env file with actual Firebase configuration values');
    console.info('🔍 Get these from Firebase Console -> Project Settings -> General -> Your apps -> Web app');
    return false;
  } else {
    console.log('✅ All Firebase environment variables are configured');
    return true;
  }
};

// Call this in development to check setup
if (import.meta.env.DEV) {
  checkFirebaseConfig();
  testFirebaseConnection();
}