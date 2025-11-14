import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper function to create user profile in Firestore
async function createUserProfile(firebaseUser: FirebaseUser, additionalData?: any) {
  if (!firebaseUser) return;
  
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    const { displayName, email } = firebaseUser;
    const createdAt = new Date().toISOString();
    
    try {
      await setDoc(userRef, {
        displayName: displayName || additionalData?.name || '',
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }
  
  return userRef;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  // Convert Firebase User to our User interface
  const mapFirebaseUser = async (firebaseUser: FirebaseUser | null): Promise<User | null> => {
    if (!firebaseUser) return null;
    
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      
      return {
        id: firebaseUser.uid,
        name: userData?.displayName || firebaseUser.displayName || 'Anonymous User',
        email: firebaseUser.email || '',
        createdAt: userData?.createdAt
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Anonymous User',
        email: firebaseUser.email || ''
      };
    }
  };

  // Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = await mapFirebaseUser(firebaseUser);
        setUser(mappedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Check Firebase configuration
      if (!auth) {
        throw new Error('Firebase authentication not available. Please check your Firebase configuration.');
      }
      
      // Validate environment variables at runtime
      if (!import.meta.env.VITE_FIREBASE_API_KEY || !import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || !import.meta.env.VITE_FIREBASE_APP_ID) {
        throw new Error('Firebase configuration is missing. Please check your .env file and ensure all Firebase environment variables are properly set.');
      }
      
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const mappedUser = await mapFirebaseUser(result.user);
      setUser(mappedUser);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Firebase configuration is missing. Please check your .env file and ensure all Firebase environment variables are properly set.');
      }
      throw new Error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Check Firebase configuration
      if (!auth) {
        throw new Error('Firebase authentication not available. Please check your Firebase configuration.');
      }
      
      // Validate environment variables at runtime
      if (!import.meta.env.VITE_FIREBASE_API_KEY || !import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || !import.meta.env.VITE_FIREBASE_APP_ID) {
        throw new Error('Firebase configuration is missing. Please check your .env file and ensure all Firebase environment variables are properly set.');
      }
      
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(result.user, {
        displayName: name
      });
      
      // Create user profile in Firestore
      await createUserProfile(result.user, { name });
      
      const mappedUser = await mapFirebaseUser(result.user);
      setUser(mappedUser);
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Firebase configuration is missing. Please check your .env file and ensure all Firebase environment variables are properly set.');
      }
      throw new Error(error.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Failed to logout');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}