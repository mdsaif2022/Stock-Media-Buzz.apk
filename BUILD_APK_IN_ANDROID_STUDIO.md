# 🔨 Build APK in Android Studio - Step by Step

## ❌ Problem

The APK folder doesn't exist because **you haven't built the APK yet**!

The `build` folder is only created **after** you successfully build the APK in Android Studio.

---

## ✅ Solution: Build APK in Android Studio

### Step 1: Open Android Studio

**Option A: Using Command**
```powershell
cd G:\Stock-Media-web\Stock-Media
pnpm exec cap open android
```

**Option B: Manual**
1. Open Android Studio
2. File → Open
3. Navigate to: `G:\Stock-Media-web\Stock-Media\android`
4. Click OK

---

### Step 2: Wait for Gradle Sync

1. Android Studio will automatically start syncing Gradle
2. Wait for it to finish (check bottom status bar)
3. You'll see "Gradle sync finished" when done
4. **If sync fails**, click "Sync Project with Gradle Files" button (elephant icon)

---

### Step 3: Build APK

1. In Android Studio menu: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete (check bottom status bar)
3. You'll see a notification when done: **"APK(s) generated successfully"**
4. Click **"locate"** link in the notification

---

### Step 4: Find Your APK

After build completes, the APK will be at:

```
G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\debug\app-debug.apk
```

**The folder will be created automatically after building!**

---

## 🆘 Troubleshooting

### "Gradle sync failed"

**Fix:**
1. File → Invalidate Caches → Invalidate and Restart
2. Wait for Android Studio to restart
3. Try syncing again

### "SDK not found"

**Fix:**
1. File → Settings → Appearance & Behavior → System Settings → Android SDK
2. Install missing SDK components
3. Note SDK location and set `ANDROID_HOME` environment variable

### "Build failed"

**Fix:**
1. Check the error message in "Build" tab (bottom of Android Studio)
2. Common issues:
   - Missing SDK
   - Java version mismatch
   - Gradle sync incomplete

### "No build option in menu"

**Fix:**
1. Make sure Android Studio finished loading
2. Wait for Gradle sync to complete
3. Try: Build → Rebuild Project first

---

## 📝 Quick Checklist

Before building:
- [ ] Android Studio is open
- [ ] Project is loaded (`android` folder)
- [ ] Gradle sync completed (no errors)
- [ ] No red error messages in project

Then:
- [ ] Build → Build Bundle(s) / APK(s) → Build APK(s)
- [ ] Wait for "APK(s) generated successfully" notification
- [ ] Click "locate" to find APK

---

## 🎯 After Building

Once you see the "APK(s) generated successfully" notification:

1. **Click "locate"** - Opens folder with APK
2. **OR navigate to:**
   ```
   G:\Stock-Media-web\Stock-Media\android\app\build\outputs\apk\debug
   ```
3. **Find:** `app-debug.apk`

---

**The folder doesn't exist yet because you need to build first!** 

Open Android Studio and follow the steps above. 🚀

