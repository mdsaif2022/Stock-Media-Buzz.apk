# Fix "Failed to fetch" Error in Android App

## Problem
When running the Android app, you see "Failed to fetch" error even though the backend shows 147 media items in logs.

## Root Cause
The Android app doesn't know where your backend API is located. The `VITE_API_BASE_URL` environment variable is not set during the build.

## Solution

### Step 1: Create `.env.production` File

Create a file named `.env.production` in your project root directory with:

```env
# Backend API URL (REQUIRED for Android app)
VITE_API_BASE_URL=https://stock-mediabuzz-1.onrender.com

# Optional: Admin email
# VITE_ADMIN_EMAIL=admin@yourdomain.com
```

**Important:** 
- Replace `https://stock-mediabuzz-1.onrender.com` with YOUR actual backend URL if different
- Make sure there's NO trailing slash at the end
- This file is in `.gitignore` (not committed to Git) for security

### Step 2: Rebuild for Android

After creating `.env.production`, rebuild the app:

```bash
pnpm build:android
```

Or if using npm:
```bash
npm run build:android
```

This will:
1. Build the frontend with the API URL from `.env.production`
2. Copy files to the Android project
3. Include the backend URL in the build

### Step 3: Sync Capacitor

```bash
pnpm exec cap sync android
```

### Step 4: Rebuild APK in Android Studio

1. Open Android Studio:
   ```bash
   pnpm open:android
   ```

2. Wait for Gradle sync to complete

3. Build → Build Bundle(s) / APK(s) → Build APK(s)

4. Install and test the new APK

## Verify the Fix

After rebuilding:

1. **Check the console logs** when the app starts
   - You should see: `[apiFetch] Running in native app. Using backend URL: https://stock-mediabuzz-1.onrender.com`
   - Or: `[apiFetch] Native app API call: https://stock-mediabuzz-1.onrender.com/api/media`

2. **The app should now load media items** from your backend

## Troubleshooting

### Still seeing "Failed to fetch"?

1. **Verify your backend is running:**
   ```bash
   curl https://stock-mediabuzz-1.onrender.com/api/ping
   ```
   Should return: `{"message":"pong"}`

2. **Check Android network permissions:**
   - The `AndroidManifest.xml` should include:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```
   ✅ This is already configured correctly

3. **Check CORS on backend:**
   - Your Render backend should allow requests from Android apps
   - The CORS configuration handles requests without Origin header (which Android apps typically don't send)
   - ✅ This should already work

4. **Check `.env.production` file:**
   - Make sure it's in the project root (same folder as `package.json`)
   - Make sure there's no trailing slash: `https://stock-mediabuzz-1.onrender.com` (NOT `https://stock-mediabuzz-1.onrender.com/`)
   - Make sure there are no quotes around the URL

5. **Clear build cache:**
   ```bash
   # Delete build folders
   rm -rf dist
   rm -rf android/app/build
   
   # Rebuild
   pnpm build:android
   pnpm exec cap sync android
   ```

6. **Check if you're using the correct backend URL:**
   - Verify your Render service URL
   - Make sure it matches what's in `.env.production`

## Quick Test

Test the API directly from your Android device/emulator:

1. Open Chrome on your Android device
2. Navigate to: `https://stock-mediabuzz-1.onrender.com/api/ping`
3. Should see: `{"message":"pong"}`

If this doesn't work, there might be a network/firewall issue.

## After Fix

Once working, your Android app will:
- ✅ Connect to your Render backend
- ✅ Load media items
- ✅ Allow users to browse and download media
- ✅ Show all 147 media items (or however many you have)

---

**Last Updated:** 2025-01-XX

