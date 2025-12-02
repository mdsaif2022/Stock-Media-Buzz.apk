# 📱 Build Android APK - Complete Steps

## ✅ Setup Complete!

Capacitor is now installed and Android platform has been added. Follow these steps to build your APK:

---

## 📋 Prerequisites (Install These First)

### 1. Install Java JDK 11+
- Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
- Verify: Open terminal and run `java -version`

### 2. Install Android Studio
- Download: [Android Studio](https://developer.android.com/studio)
- During installation, make sure to install:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (optional, for testing)

### 3. Set Environment Variables (Windows)

After installing Android Studio, set these:

**ANDROID_HOME:**
```powershell
setx ANDROID_HOME "C:\Users\YourName\AppData\Local\Android\Sdk"
```

**Add to PATH:**
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

**JAVA_HOME:**
```powershell
setx JAVA_HOME "C:\Program Files\Java\jdk-XX"
```

**Restart terminal/computer after setting these!**

---

## 🚀 Build APK Steps

### Step 1: Build Web App

```bash
pnpm build:android
```

This will:
- Build the web app
- Sync files to Android project

### Step 2: Open in Android Studio

```bash
npx cap open android
```

This opens the Android project in Android Studio.

### Step 3: Wait for Gradle Sync

- Android Studio will automatically sync Gradle
- Wait for it to finish (bottom right corner)

### Step 4: Build APK

In Android Studio:

1. **Menu:** Build → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete (check bottom status bar)
3. When done, click **locate** link in notification

### Step 5: Find Your APK

The APK will be located at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 Quick Commands Reference

```bash
# Build and sync
pnpm build:android

# Open Android Studio
npx cap open android

# Sync only (after making changes)
npx cap sync android
```

---

## 🔑 Generate Signed APK (For Play Store)

### Step 1: Create Keystore

```bash
keytool -genkey -v -keystore freemediabuzz-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
```

Save the passwords you enter!

### Step 2: Create key.properties

Create file: `android/key.properties`

```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=freemediabuzz
storeFile=../../freemediabuzz-key.jks
```

### Step 3: Update build.gradle

In Android Studio, open `android/app/build.gradle` and add:

```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### Step 4: Build Release APK

1. In Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Select **release** variant
3. Find APK at: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🆘 Troubleshooting

### "Command 'npx' not found"

**Fix:** Make sure Node.js is installed and in PATH.

### "Android SDK not found"

**Fix:** 
1. Open Android Studio
2. File → Settings → Appearance & Behavior → System Settings → Android SDK
3. Note the SDK location
4. Set `ANDROID_HOME` to that location

### "Java not found"

**Fix:**
1. Install JDK 11+
2. Set `JAVA_HOME` environment variable
3. Add `%JAVA_HOME%\bin` to PATH

### "Gradle sync failed"

**Fix:**
1. In Android Studio: File → Invalidate Caches → Invalidate and Restart
2. Try again

### Build errors in Android Studio

**Fix:**
1. Click "Sync Project with Gradle Files" button
2. Wait for sync to complete
3. Try building again

---

## ✅ Next Steps After Building APK

1. **Test APK:** Install on Android device:
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

2. **Share APK:** Send the APK file to others (they can install directly)

3. **Upload to Play Store:**
   - Create Google Play Developer account ($25 one-time)
   - Build signed release APK (see above)
   - Upload via Play Console

---

## 📝 Alternative: PWA (No APK Needed)

Your app is already a PWA! Users can:
1. Visit your website on Android
2. Browser menu → "Add to Home Screen"
3. App works like a native app
4. No Play Store needed

---

**Ready to build?** Make sure prerequisites are installed, then run:

```bash
pnpm build:android
npx cap open android
```

Good luck! 🚀

