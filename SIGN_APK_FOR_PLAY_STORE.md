# 🔐 Sign APK/Bundle for Google Play Store

## Overview

To publish on Google Play Store, you need to **sign your APK or AAB (Android App Bundle)** with a keystore. This guide will show you how.

---

## 📋 Step-by-Step Guide

### Step 1: Generate Keystore

Open PowerShell/CMD and run:

```powershell
cd G:\Stock-Media-web\Stock-Media

keytool -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
```

**You'll be prompted for:**
- **Keystore password** - Choose a strong password (save it!)
- **Re-enter password** - Type it again
- **Your name** - Your name or company
- **Organizational Unit** - Optional (press Enter to skip)
- **Organization** - Your company name
- **City** - Your city
- **State** - Your state
- **Country code** - Two letters (e.g., US, IN, GB)

**⚠️ IMPORTANT:** Save the password! You'll need it to sign future updates!

---

### Step 2: Create key.properties File

Create a new file: `android/key.properties`

**Content:**
```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=freemediabuzz
storeFile=../../freemediabuzz-release-key.jks
```

**Replace:**
- `YOUR_KEYSTORE_PASSWORD` - Password you used when creating keystore
- `YOUR_KEY_PASSWORD` - Same password (or different if you set one)

---

### Step 3: Update build.gradle

Open `android/app/build.gradle` and add this code:

**Add at the TOP (after the first line):**
```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

**Find the `android {` section and add `signingConfigs` BEFORE `buildTypes`:**
```gradle
android {
    namespace "com.genztools.freemediabuzz"
    compileSdk rootProject.ext.compileSdkVersion
    
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    
    defaultConfig {
        // ... existing config ...
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

### Step 4: Build Signed APK/Bundle

**In Android Studio:**

1. **Build** → **Build Bundle(s) / APK(s)** → **Build Bundle(s)**
   - Creates: `app-release.aab` (recommended for Play Store)

2. **OR Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Creates: `app-release.apk` (if you prefer APK)

3. Wait for build to complete
4. Click **"locate"** when notification appears

---

### Step 5: Find Your Signed File

**Signed AAB (Recommended):**
```
G:\Stock-Media-web\Stock-Media\android\app\build\outputs\bundle\release\app-release.aab
```

**Signed APK:**
```
G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\release\app-release.apk
```

---

## 🔒 Security: Protect Your Keystore

### ⚠️ CRITICAL WARNINGS

1. **Never lose your keystore file!** - If you lose it, you can't update your app
2. **Never share your keystore!** - Keep it private and secure
3. **Backup your keystore** - Store it in a safe place
4. **Save your passwords** - Write them down securely

### Backup Keystore

```powershell
# Copy keystore to safe location
Copy-Item "freemediabuzz-release-key.jks" -Destination "C:\Backup\freemediabuzz-release-key.jks"
```

---

## 📦 Upload to Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app (or select existing)
3. Go to **Release** → **Production** (or Testing)
4. Create new release
5. Upload **`app-release.aab`** file (or APK)
6. Fill in release notes
7. Review and publish

---

## ✅ Quick Checklist

- [ ] Keystore file created (`freemediabuzz-release-key.jks`)
- [ ] `key.properties` file created in `android/` folder
- [ ] `build.gradle` updated with signing config
- [ ] Keystore password saved securely
- [ ] Built signed release bundle/APK
- [ ] Found signed file in `build/outputs/bundle/release/` or `build/outputs/apk/release/`
- [ ] Keystore backed up to safe location

---

## 🆘 Troubleshooting

### "keystore password was incorrect"

**Fix:** Check `key.properties` file - passwords must match exactly

### "key.properties file not found"

**Fix:** Make sure file is at: `android/key.properties` (not `android/app/key.properties`)

### "Cannot find keystore file"

**Fix:** Check path in `key.properties` - should be `../../freemediabuzz-release-key.jks`

### "Build failed - signing config error"

**Fix:**
1. Check all passwords in `key.properties`
2. Verify keystore file exists
3. Check alias name matches (`freemediabuzz`)

---

## 🔄 Update App (Future Releases)

When updating your app:

1. **Keep the same keystore file** - Use `freemediabuzz-release-key.jks`
2. **Use same passwords** - From `key.properties`
3. **Build signed release** - Same as above
4. **Upload new version** - Play Store will accept it

---

**Ready to sign?** Follow the steps above! 🔐

