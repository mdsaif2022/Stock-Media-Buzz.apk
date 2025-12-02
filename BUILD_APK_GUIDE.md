# 📱 Build Android APK from Web App

## Overview

This guide will help you convert your React web app into a native Android APK using **Capacitor** - the modern way to build native apps from web apps.

---

## 📋 Prerequisites

1. **Node.js** (already installed ✅)
2. **Java JDK 11+** - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
3. **Android Studio** - Download from [Android Studio](https://developer.android.com/studio)
4. **Android SDK** - Installed via Android Studio

---

## 🚀 Step-by-Step Setup

### Step 1: Install Capacitor

```bash
pnpm add @capacitor/core @capacitor/cli
pnpm add @capacitor/android
```

### Step 2: Initialize Capacitor

```bash
npx cap init
```

When prompted:
- **App name:** FreeMediaBuzz (or your app name)
- **App ID:** com.genztools.freemediabuzz (or your package ID)
- **Web dir:** dist/spa

### Step 3: Add Android Platform

```bash
pnpm build:cpanel
npx cap add android
```

### Step 4: Sync Files

```bash
npx cap sync
```

### Step 5: Open in Android Studio

```bash
npx cap open android
```

### Step 6: Build APK in Android Studio

1. In Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete
3. Click **locate** to find the APK file
4. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔧 Configuration

### Update `capacitor.config.ts`

After initialization, update the config file:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.genztools.freemediabuzz',
  appName: 'FreeMediaBuzz',
  webDir: 'dist/spa',
  server: {
    // Use production API URL
    url: 'https://genztools.top',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    // Required for API calls
    usesCleartextTraffic: true
  }
};

export default config;
```

---

## 📦 Build Scripts

Add these to `package.json`:

```json
{
  "scripts": {
    "build:android": "npm run build:cpanel && npx cap sync android",
    "open:android": "npx cap open android"
  }
}
```

---

## 🔑 Generate Signed APK (For Play Store)

### Create Keystore

```bash
keytool -genkey -v -keystore freemediabuzz-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
```

### Configure Signing in Android Studio

1. Create `android/key.properties`:
```
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=freemediabuzz
storeFile=../../freemediabuzz-key.jks
```

2. Update `android/app/build.gradle` (signing config section)

---

## ✅ Quick Commands

```bash
# Build web app
pnpm build:cpanel

# Sync to Android
npx cap sync android

# Open Android Studio
npx cap open android

# Build APK (in Android Studio)
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

---

## 🆘 Troubleshooting

### Issue: "Command not found: npx cap"

**Fix:** Install Capacitor globally:
```bash
pnpm add -g @capacitor/cli
```

### Issue: "Android SDK not found"

**Fix:** Install Android Studio and SDK, then set ANDROID_HOME:
- Windows: `setx ANDROID_HOME "C:\Users\YourName\AppData\Local\Android\Sdk"`
- Mac/Linux: `export ANDROID_HOME=$HOME/Library/Android/sdk`

### Issue: "Java not found"

**Fix:** Install JDK and set JAVA_HOME:
- Windows: `setx JAVA_HOME "C:\Program Files\Java\jdk-XX"`
- Mac/Linux: `export JAVA_HOME=/usr/lib/jvm/java-XX-openjdk`

---

## 📝 Alternative: PWA (Easier, No APK)

If you just want an installable app experience without APK:

1. Add PWA manifest (we'll set this up)
2. Users can "Add to Home Screen" on Android
3. Works like a native app
4. No Play Store submission needed

---

**Ready to start?** Follow the steps above!

