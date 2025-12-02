# 🔑 Create Keystore for Signing APK

## Quick Command

Run this in PowerShell (from project root):

```powershell
cd G:\Stock-Media-web\Stock-Media

keytool -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
```

## What You'll Enter

When prompted, enter:
- **Keystore password:** (choose a strong password - SAVE IT!)
- **Re-enter password:** (same password)
- **Your name:** Your name or company name
- **Organizational Unit:** (optional - press Enter)
- **Organization:** Your company name
- **City:** Your city
- **State:** Your state
- **Country code:** Two letters (US, IN, GB, etc.)

## After Creating Keystore

1. **Create `android/key.properties` file:**
   ```properties
   storePassword=YOUR_KEYSTORE_PASSWORD
   keyPassword=YOUR_KEY_PASSWORD
   keyAlias=freemediabuzz
   storeFile=../../freemediabuzz-release-key.jks
   ```

2. **Replace:**
   - `YOUR_KEYSTORE_PASSWORD` - Password you entered
   - `YOUR_KEY_PASSWORD` - Same password (or different if you set one)

3. **Build signed release in Android Studio:**
   - Build → Build Bundle(s) / APK(s) → Build Bundle(s) (for Play Store)
   - OR Build → Build Bundle(s) / APK(s) → Build APK(s) (for APK)

## ⚠️ IMPORTANT

- **SAVE YOUR PASSWORD!** You'll need it for all future updates
- **BACKUP YOUR KEYSTORE!** If you lose it, you can't update your app
- **KEEP IT PRIVATE!** Never share your keystore file

---

**Run the keytool command above to create your keystore!** 🔐

