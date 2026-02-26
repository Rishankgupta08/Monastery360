# Firebase Authentication Fix Guide

## 🔥 Current Status
- ✅ Environment variables are properly loaded
- ✅ Firebase SDK is properly configured
- ✅ Login page is integrated with Firebase Auth context
- ❌ Getting `auth/configuration-not-found` error

## 🎯 Root Cause Analysis

The `auth/configuration-not-found` error typically occurs when:

1. **Firebase Authentication is not enabled** in the Firebase Console
2. **Domain is not authorized** for the Firebase project
3. **Web app is not properly configured** in Firebase project
4. **API keys are invalid or restricted**

## 🚀 Step-by-Step Fix

### 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **monastery360-f4196**
3. If the project doesn't exist, create it with this exact project ID

### 2. Enable Authentication

1. In the Firebase Console, go to **Authentication**
2. Click on **Get Started** (if not already enabled)
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider:
   - Click on **Email/Password**
   - Enable **Email/Password** (first option)
   - Click **Save**

### 3. Configure Web App

1. Go to **Project Settings** (gear icon)
2. In the **General** tab, scroll to **Your apps**
3. If no web app exists:
   - Click **Add app** → **Web app** (</>)
   - App nickname: `monastery360-web`
   - Check **Also set up Firebase Hosting** (optional)
   - Click **Register app**
4. Copy the configuration values and verify they match your `.env` file

### 4. Domain Authorization

1. In **Authentication** → **Settings** → **Authorized domains**
2. Add these domains:
   - `localhost` (for development)
   - `127.0.0.1` (for development)  
   - Your production domain (if any)

### 5. API Key Configuration

1. Go to **Google Cloud Console** → **APIs & Services** → **Credentials**
2. Find your Firebase API key
3. Edit the API key restrictions:
   - **Application restrictions**: HTTP referrers
   - **Website restrictions**: Add your domains
   - **API restrictions**: Make sure Firebase APIs are enabled

### 6. Firestore Database Setup

1. Go to **Firestore Database** in Firebase Console
2. Click **Create database**
3. Choose **Start in production mode**
4. Select a location (recommend same region as hosting)
5. Update security rules:

```javascript
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

## 🔧 Verification Steps

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Check browser console for:**
   - ✅ Firebase Configuration Debug messages
   - ✅ Firebase app initialized successfully
   - ✅ All environment variables are configured

3. **Test authentication:**
   - Go to `/register` and create a test account
   - Check Firebase Console → Authentication → Users
   - Verify user appears in the list

4. **Test sign-in:**
   - Go to `/login`
   - Try logging in with the test account
   - Should redirect to homepage

## 🐛 Common Issues & Solutions

### Issue: `auth/api-key-not-valid`
**Solution:** API key is incorrect. Copy the correct key from Firebase Console.

### Issue: `auth/domain-not-authorized`
**Solution:** Add your domain to authorized domains in Authentication settings.

### Issue: `auth/project-not-found`
**Solution:** Check that the project ID "monastery360-f4196" exists and is accessible.

### Issue: `auth/operation-not-allowed`
**Solution:** Enable Email/Password authentication in Firebase Console.

## 🎯 Quick Test Commands

Run these to verify your setup:

```bash
# Check environment variables
node check-env.js

# Start development server
npm run dev

# Check Firebase debug info in browser console
```

## 📊 Expected Console Output

When working correctly, you should see:

```
🔧 Firebase Configuration Debug:
  API Key: ✅ Set
  Auth Domain: ✅ Set  
  Project ID: monastery360-f4196 ✅
  Storage Bucket: ✅ Set
  Messaging Sender ID: ✅ Set
  App ID: ✅ Set
  
✅ All Firebase configuration keys are present
🔥 Firebase app initialized successfully
```

## 🆘 If Still Not Working

1. **Double-check project ID:** Ensure "monastery360-f4196" is correct
2. **Try creating a new Firebase project** with a different name
3. **Check browser network tab** for blocked requests
4. **Disable browser extensions** that might block Firebase
5. **Clear browser cache and cookies**

## 📞 Support

If you continue having issues:
1. Check the Firebase Console logs
2. Enable Firebase Debug mode
3. Look for specific error codes in browser console
4. Verify all steps above are completed correctly