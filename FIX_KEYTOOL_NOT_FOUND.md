# 🔧 Fix "keytool not found" Error

## ❌ Problem

`keytool` command not found because Java JDK is not in your PATH or not installed.

---

## ✅ Solution

### Option 1: Use Full Path to keytool

Java is usually installed with Android Studio. Find keytool:

**Typical locations:**
```
C:\Program Files\Java\jdk-XX\bin\keytool.exe
C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe
%LOCALAPPDATA%\Android\Sdk\jre\bin\keytool.exe
```

**Try this:**
```powershell
# If Java JDK is installed
"C:\Program Files\Java\jdk-11\bin\keytool.exe" -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz

# OR if Android Studio JBR
"C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
```

---

### Option 2: Add Java to PATH

**Find Java installation:**
1. Check if Java is installed: `java -version`
2. Find Java bin folder location
3. Add to PATH environment variable

**Steps:**
1. **Find Java location:**
   ```powershell
   where.exe java
   ```

2. **Add to PATH (temporary - current session only):**
   ```powershell
   $env:PATH += ";C:\Program Files\Java\jdk-XX\bin"
   ```

3. **Add to PATH (permanent):**
   - Open System Properties → Environment Variables
   - Add `C:\Program Files\Java\jdk-XX\bin` to PATH
   - Restart terminal

---

### Option 3: Install Java JDK

**Download and install:**
1. **OpenJDK:** https://adoptium.net/ (recommended)
   - Download JDK 11 or newer
   - Install it
   - Add `C:\Program Files\Eclipse Adoptium\jdk-XX\bin` to PATH

2. **Oracle JDK:** https://www.oracle.com/java/technologies/downloads/
   - Download JDK 11 or newer
   - Install it
   - Add `C:\Program Files\Java\jdk-XX\bin` to PATH

---

### Option 4: Use Android Studio's Built-in Terminal

Android Studio has Java built-in. Use it:

1. **Open Android Studio**
2. **Terminal tab** (bottom of Android Studio)
3. **Run command there** (Java should be in PATH)

---

## 🔍 Quick Check Commands

```powershell
# Check if Java is installed
java -version

# Find Java location
where.exe java

# Find keytool
Get-ChildItem -Path "C:\Program Files" -Recurse -Filter "keytool.exe" -ErrorAction SilentlyContinue | Select-Object FullName

# Check Android Studio JBR
Test-Path "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe"
```

---

## ✅ Recommended Solution

**Use Android Studio's built-in Java:**

1. Open Android Studio
2. Open Terminal (View → Tool Windows → Terminal)
3. Navigate to project:
   ```powershell
   cd G:\Stock-Media-web\Stock-Media
   ```
4. Run keytool command:
   ```powershell
   keytool -genkey -v -keystore freemediabuzz-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias freemediabuzz
   ```

Android Studio terminal should have Java in PATH already!

---

## 🎯 Alternative: Use Android Studio UI

You can also create keystore using Android Studio:

1. **Build** → **Generate Signed Bundle / APK**
2. Select **Android App Bundle** or **APK**
3. Click **Create new...** (keystore)
4. Fill in details
5. Android Studio will create the keystore for you

---

**Try using Android Studio's terminal - it should work there!** 🚀

