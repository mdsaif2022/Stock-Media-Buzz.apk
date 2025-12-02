# 🔧 Fix Android Build Issues

## ❌ Problem

You're running commands in the **wrong directory**!

Current location: `G:\Stock-Media-web` ❌  
Should be: `G:\Stock-Media-web\Stock-Media` ✅

---

## ✅ Solution

### Step 1: Navigate to Correct Directory

Open **PowerShell** or **Command Prompt** (NOT Android Studio terminal):

```powershell
cd G:\Stock-Media-web\Stock-Media
```

### Step 2: Verify You're in Right Place

Check that you see these files:
```powershell
dir package.json
dir capacitor.config.ts
dir android
```

If you see these files, you're in the right place! ✅

### Step 3: Run Build Command

```powershell
pnpm build:android
```

This should work now!

---

## 🆘 Still Getting Errors?

### Error: "No package.json found"

**Fix:** You're still in wrong directory. Make sure you see `package.json`:

```powershell
# Check current directory
pwd

# Should show: G:\Stock-Media-web\Stock-Media

# If not, navigate:
cd G:\Stock-Media-web\Stock-Media
```

### Error: "npx cap not found"

**Fix:** Make sure you're using the project's node_modules:

```powershell
# Use pnpm (preferred)
pnpm exec cap sync android

# OR use npx from node_modules
.\node_modules\.bin\cap sync android
```

### Error: "npm error could not determine executable"

**Fix:** This means Capacitor CLI isn't installed properly:

```powershell
# Reinstall Capacitor
pnpm add @capacitor/cli

# Then try again
pnpm exec cap sync android
```

---

## 📝 Correct Workflow

1. **Open PowerShell/CMD** (not Android Studio terminal)
2. **Navigate to project:**
   ```powershell
   cd G:\Stock-Media-web\Stock-Media
   ```
3. **Build:**
   ```powershell
   pnpm build:android
   ```
4. **Open Android Studio:**
   ```powershell
   pnpm exec cap open android
   ```
   OR manually open `android` folder in Android Studio

---

## ✅ Quick Checklist

- [ ] Using PowerShell/CMD (not Android Studio terminal)
- [ ] In correct directory: `G:\Stock-Media-web\Stock-Media`
- [ ] `package.json` exists in current directory
- [ ] `android` folder exists
- [ ] Capacitor installed: `pnpm list @capacitor/cli`

---

**Try again from the correct directory!** 🚀

