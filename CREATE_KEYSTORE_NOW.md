# 🔑 Create Keystore - Quick Command

## ✅ Found Your Java Installation!

Your Java is installed at:
```
C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot\bin\keytool.exe
```

---

## 🚀 Option 1: Use Full Path (Easiest)

Run this command (copy and paste):

```powershell
cd G:\Stock-Media-web\Stock-Media

"C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot\bin\keytool.exe" -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
```

---

## 🚀 Option 2: Use Android Studio Terminal (Recommended)

1. **Open Android Studio**
2. **View** → **Tool Windows** → **Terminal** (or click Terminal tab at bottom)
3. **Navigate to project:**
   ```powershell
   cd G:\Stock-Media-web\Stock-Media
   ```
4. **Run keytool:**
   ```powershell
   keytool -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
   ```

Android Studio terminal has Java in PATH already!

---

## 🚀 Option 3: Add Java to PATH (Permanent)

Add this to your PATH so `keytool` works anywhere:

**Temporary (current session):**
```powershell
$env:PATH += ";C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot\bin"
```

**Permanent:**
1. Press `Win + X` → **System**
2. Click **Advanced system settings**
3. Click **Environment Variables**
4. Under **System variables**, find **Path** → Click **Edit**
5. Click **New**
6. Add: `C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot\bin`
7. Click **OK** on all dialogs
8. **Restart PowerShell**

---

## 📝 What to Enter When Prompted

After running keytool command, you'll be asked:

1. **Enter keystore password:** (Choose a strong password - SAVE IT!)
2. **Re-enter new password:** (Type same password)
3. **What is your first and last name?** → Your name or company
4. **What is the name of your organizational unit?** → (Press Enter to skip)
5. **What is the name of your organization?** → Your company name
6. **What is the name of your City or Locality?** → Your city
7. **What is the name of your State or Province?** → Your state
8. **What is the two-letter country code for this unit?** → US, IN, GB, etc.
9. **Is CN=... correct?** → Type `yes`

---

## ✅ After Keystore is Created

1. **Keystore file created:** `freemediabuzz-release-key.jks` (in project root)
2. **Create `android/key.properties` file:**
   ```properties
   storePassword=YOUR_PASSWORD
   keyPassword=YOUR_PASSWORD
   keyAlias=freemediabuzz
   storeFile=../../freemediabuzz-release-key.jks
   ```
3. **Build signed release in Android Studio!**

---

## 🎯 Recommended: Use Option 1 (Full Path)

Just copy and paste this:

```powershell
cd G:\Stock-Media-web\Stock-Media

"C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot\bin\keytool.exe" -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
```

**It will work immediately!** ✅

