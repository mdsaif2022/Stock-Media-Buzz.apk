# 🔄 Redeploy Production Frontend (cPanel)

## Issue

Mobile autoplay is working on localhost but **not on production site** (`genztools.top`).

**Reason:** The production site is serving old JavaScript files. You need to rebuild and re-upload the frontend.

---

## ✅ Quick Fix (3 Steps)

### Step 1: Rebuild Frontend for Production

Run this command in your project directory:

```bash
pnpm build:cpanel
```

This will:
- Build the frontend with latest changes
- Copy `.htaccess` file
- Create production-ready files in `dist/spa/`

---

### Step 2: Upload to cPanel

1. **Go to cPanel** → **File Manager**
2. **Navigate to `public_html/`** folder
3. **Delete old files:**
   - Delete all files EXCEPT `.htaccess` (or rename it to `.htaccess.backup` first)
   - Or delete everything and upload fresh

4. **Upload new files:**
   - Go to your local project folder: `dist/spa/`
   - **Select ALL files** in `dist/spa/`
   - Upload to `public_html/` in cPanel
   - **Make sure `.htaccess` is included!**

---

### Step 3: Clear Browser Cache

**On Mobile:**
1. Clear browser cache OR
2. Use **private/incognito mode** to test
3. Hard refresh: Pull down to refresh on mobile

**On Desktop (if testing):**
- Press `Ctrl + Shift + R` (Windows/Linux)
- Press `Cmd + Shift + R` (Mac)
- OR open DevTools → Right-click refresh button → "Empty Cache and Hard Reload"

---

## 🔍 Verify It Works

After uploading:

1. **Open mobile browser** (or mobile emulator)
2. **Go to:** `https://genztools.top`
3. **Scroll to a video**
4. **Check console** (if possible) for:
   - `[UserInteraction] User interaction detected - autoplay enabled`
   - `[VideoCard] Mobile autoplay state: {...}`
   - `[useMobileAutoplay] Scroll detected - autoplay changed: {...}`

---

## 🆘 Still Not Working?

### Check 1: Files Uploaded Correctly

Verify these files exist in `public_html/`:
- `index.html`
- `assets/` folder with JavaScript files
- `.htaccess` file

### Check 2: Browser Console

Open browser console on mobile and check for:
- JavaScript errors
- `[VideoCard]` logs (should show autoplay attempts)
- Any autoplay blocked errors

### Check 3: File Timestamps

Check that uploaded files have **recent timestamps** (not old dates):
- Files should be from today's date
- JavaScript files should have new content

### Check 4: Hard Refresh

**Force browser to reload:**
- Mobile: Close and reopen browser
- Or use private/incognito mode
- Desktop: `Ctrl + Shift + Delete` → Clear cached files

---

## 📝 Quick Command Summary

```bash
# 1. Build for production
pnpm build:cpanel

# 2. Upload dist/spa/* to cPanel public_html/

# 3. Clear browser cache and test
```

---

## ✅ Success Checklist

After redeploy:
- [ ] `dist/spa/` folder exists with new files
- [ ] All files uploaded to `public_html/`
- [ ] `.htaccess` file is in `public_html/`
- [ ] Browser cache cleared
- [ ] Videos autoplay on mobile when scrolling to center
- [ ] Console shows autoplay logs (if accessible)

---

**Need help?** Check `MOBILE_AUTOPLAY_DEBUG.md` for detailed troubleshooting.

