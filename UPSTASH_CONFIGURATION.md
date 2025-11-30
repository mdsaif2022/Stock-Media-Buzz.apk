# ⚠️ IMPORTANT: Set Custom Prefix to "KV"

## Configuration Screen Settings

You're on the configuration screen for "stock-media-kv". Here's what to set:

### ✅ Environments (Already Correct)
- ✅ Development - Checked
- ✅ Preview - Checked  
- ✅ Production - Checked

**All checked is correct!**

### ⚠️ Custom Prefix (CHANGE THIS!)

**Current:** `STORAGE`  
**Should be:** `KV` (or leave empty for default)

**Why?** Our code expects environment variables named:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

If you use "STORAGE" as prefix, it will create:
- `STORAGE_URL` ❌ (wrong name)
- `STORAGE_REST_API_URL` ❌ (wrong name)

## 🎯 What to Do

1. **Change Custom Prefix:**
   - Delete "STORAGE" from the Custom Prefix field
   - Type: `KV`
   - Or leave it **empty** (blank) for default

2. **Verify:**
   - The suffix shows `_URL`
   - Full name should be: `KV_URL` (not `STORAGE_URL`)

3. **Click "Connect"**

## ✅ After Connecting

Environment variables will be created as:
- ✅ `KV_URL`
- ✅ `KV_REST_API_URL`
- ✅ `KV_REST_API_TOKEN`
- ✅ `KV_REST_API_READ_ONLY_TOKEN`

These match what our code expects!

## 🔍 Verify After Connection

1. **Check Environment Variables:**
   - Project → Settings → Environment Variables
   - Should see `KV_URL` (not `STORAGE_URL`)

2. **Redeploy:**
   ```bash
   vercel --prod
   ```

3. **Test:**
   - Visit: `https://your-site.vercel.app/api/media/database/status`
   - Should show: `"hasKV": true`

---

**Action Required:** Change Custom Prefix from "STORAGE" to "KV" (or leave empty), then click "Connect"!

