# 📱 Where to Find Your APK File

## ✅ APK Location After Building

After successfully building in Android Studio, your APK is located at:

### Debug APK (for testing):
```
G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\debug\app-debug.apk
```

### Release APK (for Play Store - if you built signed release):
```
G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\release\app-release.apk
```

---

## 🔍 How to Find It

### Method 1: Android Studio Notification
1. After build completes, Android Studio shows a notification
2. Click **"locate"** link in the notification
3. File explorer opens to the APK location

### Method 2: File Explorer (Windows)
1. Open File Explorer
2. Navigate to:
   ```
   G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\debug
   ```
3. Find `app-debug.apk`

### Method 3: Android Studio Project View
1. In Android Studio, open **Project** view (left sidebar)
2. Navigate to:
   ```
   app → build → outputs → apk → debug
   ```
3. Right-click `app-debug.apk` → **Show in Explorer**

---

## 📦 Install APK on Device

### Option 1: Transfer via USB
1. Connect Android device via USB
2. Copy APK to device
3. Open file manager on device
4. Tap APK to install

### Option 2: Transfer via Cloud
1. Upload APK to Google Drive/Dropbox
2. Download on Android device
3. Open file manager
4. Tap APK to install

### Option 3: Direct Install via ADB
```powershell
# Make sure device is connected
adb devices

# Install APK
adb install G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## ✅ Verify APK Exists

Run this command to check:

```powershell
dir "G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\debug\app-debug.apk"
```

If file exists, you'll see file details! ✅

---

## 🎯 Quick Path Copy

Copy this path and paste in File Explorer address bar:

```
G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\debug
```

