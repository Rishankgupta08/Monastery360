# Firebase Setup Guide - Monastery360

## 🔥 Firebase Integration Status

✅ **Firebase Hosting** - Configured and deployed  
✅ **Firebase SDK** - Installed and initialized  
✅ **Firebase Auth** - Integrated with authentication context  
✅ **Firestore Database** - Configured for user profiles  
⚠️ **Environment Variables** - Need actual Firebase project values  

## 📋 Next Steps Required

### 1. Get Firebase Configuration Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `monastery360-f4196`
3. Go to **Project Settings** (gear icon)
4. Scroll to **Your apps** section
5. Click on your web app or create one if needed
6. Copy the config values

### 2. Update Environment Variables

Replace the placeholder values in `.env` with your actual Firebase config:

```bash
# .env file
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBQQQP15Y1LwJJDCNRpGd6bBz3DZJ48LnM

# Firebase Configuration - UPDATE THESE VALUES
VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=monastery360-f4196.firebaseapp.com
VITE_FIREBASE_STORAGE_BUCKET=monastery360-f4196.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id_here
VITE_FIREBASE_APP_ID=your_actual_app_id_here
```

### 3. Enable Firebase Services

In Firebase Console, enable these services:

#### Authentication:
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Optionally enable **Google** provider for social login

#### Firestore Database:
1. Go to **Firestore Database**
2. Create database in **production mode**
3. Choose a region (recommend same as hosting)
4. Set up security rules:

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── firebase.ts          # Firebase SDK initialization
│   └── firebase-test.ts     # Development testing utilities
├── contexts/
│   └── auth-context.tsx     # Firebase Auth integration
└── components/auth/
    ├── login-page.tsx       # Login with Firebase Auth
    └── register-page.tsx    # Registration with Firebase Auth
```

## 🔑 Firebase Features Implemented

### Authentication
- ✅ User registration with email/password
- ✅ User login with email/password  
- ✅ User profile storage in Firestore
- ✅ Password reset functionality
- ✅ Persistent authentication state
- ✅ Automatic session management

### Database (Firestore)
- ✅ User profile creation
- ✅ User data persistence
- ✅ Automatic profile mapping
- ✅ Error handling

### Analytics (Optional)
- ✅ Firebase Analytics initialized
- ✅ Browser compatibility check
- ✅ Development environment detection

## 🚀 Testing the Integration

### Development Console Logs
When running in development, check browser console for:

```
✅ All Firebase environment variables are configured
🔥 Firebase Auth initialized: true
🔥 Firebase Firestore initialized: true
🔥 Firebase project: Connected
```

### Test Authentication Flow
1. Navigate to `/register`
2. Create a new account
3. Verify user is created in Firebase Console > Authentication
4. Check user profile in Firestore > users collection

## 🔧 Troubleshooting

### Common Issues:

**1. Environment Variables Not Loading**
- Restart development server after updating `.env`
- Ensure variables start with `VITE_`
- Check for typos in variable names

**2. Firebase Auth Errors**
- Verify Authentication is enabled in Firebase Console
- Check Email/Password provider is enabled
- Ensure domain is authorized in Authentication settings

**3. Firestore Permission Errors**
- Update Firestore security rules
- Verify user is authenticated before database operations
- Check Firebase Console for detailed error logs

### Development Commands:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

## 📊 Monitoring

- **Firebase Console**: Monitor authentication, database usage
- **Browser Console**: Development logs and error tracking
- **Network Tab**: Verify Firebase API calls

## 🔐 Security Best Practices

1. **Never commit actual Firebase keys to git**
2. **Use Firebase Security Rules for database protection**
3. **Validate user input on both client and server**
4. **Enable Firebase App Check for production**
5. **Monitor authentication anomalies**

## 🎯 Next Enhancement Opportunities

- **Social Authentication** (Google, Facebook)
- **Phone Number Authentication**
- **Custom Claims** for user roles
- **Push Notifications** with Firebase Messaging
- **Analytics Events** for user behavior tracking
- **Storage Integration** for user uploads