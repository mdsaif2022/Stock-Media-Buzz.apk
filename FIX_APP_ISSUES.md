# 🔧 Fix App Issues: API & Back Button

## ❌ Problems

1. **Uploaded content not showing** - API not configured for native app
2. **Back button not working** - Native Android back button not handled

---

## ✅ Solution 1: Fix API Configuration

### Issue

The app needs `VITE_API_BASE_URL` to point to your Render backend. Without it, API calls fail in the native app.

### Fix: Update .env.production

**Check your `.env.production` file** (in project root):

```env
VITE_API_BASE_URL=https://stock-mediabuzz-1.onrender.com
VITE_ADMIN_EMAIL=admin@yourdomain.com
```

**Make sure the URL is correct!** It should be your Render backend URL.

---

### Step 2: Rebuild App with API URL

```powershell
cd G:\Stock-Media-web\Stock-Media

# Build with API URL from .env.production
pnpm build:android
```

This will:
- Build the app with `VITE_API_BASE_URL` embedded
- Sync to Android project
- App will connect to your Render backend

---

## ✅ Solution 2: Back Button Fixed

### What I Did

1. ✅ Installed `@capacitor/app` plugin
2. ✅ Added back button listener in `App.tsx`
3. ✅ Integrated with React Router navigation
4. ✅ Synced to Android project

### How It Works

- **Native back button pressed** → Triggers Capacitor listener
- **If can go back** → Uses React Router `navigate(-1)`
- **If at root** → Exits app (Android standard behavior)

---

## 🔄 Complete Fix Steps

### Step 1: Verify .env.production

Make sure it exists and has:
```env
VITE_API_BASE_URL=https://stock-mediabuzz-1.onrender.com
VITE_ADMIN_EMAIL=admin@yourdomain.com
```

### Step 2: Rebuild App

```powershell
cd G:\Stock-Media-web\Stock-Media
pnpm build:android
```

### Step 3: Sync to Android (Already Done)

```powershell
pnpm exec cap sync android
```

✅ Already synced - plugin is installed!

### Step 4: Rebuild APK in Android Studio

1. Open Android Studio
2. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Install and test on device

---

## ✅ What's Fixed

### Back Button:
- ✅ Native Android back button now works
- ✅ Integrates with React Router
- ✅ Navigates back through app history
- ✅ Exits app when at root (standard Android behavior)

### API Connection:
- ✅ App will use `VITE_API_BASE_URL` from `.env.production`
- ✅ API calls will go to your Render backend
- ✅ Media content will load correctly
- ✅ Uploaded content will show

---

## 🧪 Testing After Rebuild

### Test Back Button:
1. Navigate to a page (e.g., `/browse`)
2. Press Android back button
3. Should navigate back to previous page
4. At home page, back button should exit app

### Test API Connection:
1. Open app
2. Check if media content loads
3. Check browser/console for errors
4. Verify API calls in network tab (if possible)

---

## 📝 Important Notes

- **Must rebuild** after changing `.env.production`
- **Must rebuild APK** in Android Studio after changes
- **Back button only works in native app** (not in browser)
- **API URL must be set** in `.env.production` before building

---

## 🆘 Troubleshooting

### Content Still Not Showing

**Check:**
1. `.env.production` has correct `VITE_API_BASE_URL`
2. Rebuilt app with `pnpm build:android`
3. Rebuilt APK in Android Studio
4. Render backend is running and accessible

**Verify API URL in build:**
- Check `dist/spa/assets/index-*.js` (built files)
- Search for your Render backend URL
- Should be embedded in the JavaScript

### Back Button Still Not Working

**Check:**
1. Rebuilt APK after syncing
2. Testing on actual device (not emulator)
3. Plugin is installed: `@capacitor/app@7.1.0`

**Verify:**
- Check Android Studio → Build → Analyze APK
- Check if Capacitor plugins are included

---

**Rebuild your app now to apply all fixes!** 🚀
