# Firebase Console Setup Checklist

## 🎯 Your Current Status
✅ Environment variables are properly loaded  
✅ Firebase SDK configuration is correct  
✅ Code is properly integrated  
❌ Firebase Console needs configuration  

## 🚀 Required Actions (Complete in Order)

### Step 1: Access Firebase Console
1. Go to: https://console.firebase.google.com/
2. Find project **monastery360-f4196** or create it if it doesn't exist

### Step 2: Enable Authentication ⚠️ CRITICAL
1. Click on **"Authentication"** in the left sidebar
2. If you see "Get Started", click it
3. Go to **"Sign-in method"** tab  
4. Click on **"Email/Password"**
5. **Enable the first toggle** (Email/Password)
6. Click **"Save"**

### Step 3: Authorize Domains ⚠️ CRITICAL  
1. Still in Authentication, go to **"Settings"** tab
2. Scroll to **"Authorized domains"**
3. Make sure these domains are listed:
   - `localhost` ✅
   - `127.0.0.1` ✅
   - If not present, click **"Add domain"** and add them

### Step 4: Verify Web App Configuration
1. Click the **gear icon** (Project Settings)
2. Scroll to **"Your apps"** section
3. You should see a web app with these config values:
   ```
   API Key: AIzaSyDyDSNIvwTrpCuFVwnmTMRdN3EvD1eH3Qk
   Auth Domain: monastery360-f4196.firebaseapp.com
   Project ID: monastery360-f4196
   Storage Bucket: monastery360-f4196.firebasestorage.app
   Messaging Sender ID: 919269902610
   App ID: 1:919269902610:web:b7b5f9b88087d7236f8bcb
   ```
4. If no web app exists, click **"Add app"** → Web icon → Register

### Step 5: Enable Firestore (Optional but Recommended)
1. Click **"Firestore Database"** in sidebar
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select your preferred location
5. Click **"Done"**

## 🧪 Test After Setup

After completing the above steps:

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Test Registration:**
   - Go to: http://localhost:3000/register
   - Fill out the form and submit
   - Should succeed without errors

3. **Check Firebase Console:**
   - Go to Authentication → Users
   - Your test user should appear

4. **Test Login:**
   - Go to: http://localhost:3000/login  
   - Use the email/password you just created
   - Should redirect to homepage

## 🚨 Common Issues

**If you see: "auth/operation-not-allowed"**
→ Email/Password authentication is not enabled (Step 2)

**If you see: "auth/unauthorized-domain"** 
→ localhost is not in authorized domains (Step 3)

**If you see: "auth/api-key-not-valid"**
→ API key doesn't match project (Step 4)

**If you see: "auth/project-not-found"**
→ Project ID doesn't exist (Step 1)

## ✅ Success Indicators

You'll know it's working when:
- No errors in browser console during Firebase initialization
- Registration creates users in Firebase Console
- Login redirects to homepage
- Console shows: "🔥 Firebase app initialized successfully"

## 🆘 If Still Having Issues

1. **Check browser Network tab** for failed requests
2. **Look for specific error codes** in console  
3. **Try creating a completely new Firebase project** with a different name
4. **Clear browser cache** and try again

---

**Most Common Fix:** Steps 2 and 3 (Enable Authentication + Authorize Domains) solve 90% of issues!