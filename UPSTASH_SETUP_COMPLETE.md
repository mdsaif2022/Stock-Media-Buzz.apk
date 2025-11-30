# ✅ Upstash Redis Setup - Complete Guide

## What We've Updated

The code now uses **`@upstash/redis`** SDK (recommended by Upstash) instead of `@vercel/kv`.

## ✅ Installation Complete

The `@upstash/redis` package has been installed:
```bash
✓ @upstash/redis 1.35.7
```

## 🔧 Code Updates

### Automatic Environment Variable Detection

The code now automatically detects:
- **Upstash Redis:** `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- **Vercel KV:** `KV_URL` or `STORAGE_URL` (custom prefix)

### How It Works

```typescript
// Automatically uses Redis.fromEnv() which reads:
// - UPSTASH_REDIS_REST_URL
// - UPSTASH_REDIS_REST_TOKEN
// OR falls back to @vercel/kv if available
```

## 🚀 Setup Steps

### Step 1: Connect Upstash Redis to Your Project

1. **In Vercel Dashboard:**
   - Marketplace → Upstash Redis → Add Integration
   - Select your project
   - Set Custom Prefix to `KV` (or leave empty)
   - Click "Connect"

2. **Environment Variables Auto-Set:**
   Vercel automatically creates:
   - `KV_URL` (or `STORAGE_URL` if custom prefix)
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

   **OR** if using Upstash directly:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 2: Pull Environment Variables (Local Development)

If you want to test locally with KV:

```bash
vercel env pull .env.development.local
```

This downloads environment variables to `.env.development.local`.

### Step 3: Deploy

```bash
vercel --prod
```

Or push to Git (if auto-deploy enabled).

### Step 4: Verify

Check status endpoint:
```
https://your-site.vercel.app/api/media/database/status
```

Should show:
```json
{
  "storage": {
    "type": "Upstash Redis",
    "hasKV": true,
    "hasUpstashRedis": true
  }
}
```

## 📝 How the Code Works

### Automatic Detection

The code tries in this order:
1. **Upstash Redis SDK** (`@upstash/redis`) - Uses `Redis.fromEnv()`
2. **Fallback to Vercel KV** (`@vercel/kv`) - If Upstash SDK not available

### Environment Variables

The code checks for:
- ✅ `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (Upstash)
- ✅ `KV_URL` or `STORAGE_URL` (Vercel KV)
- ✅ Falls back to file storage if neither is available

## ✅ What's Changed

**Updated Files:**
- ✅ `server/utils/database.ts` - Now uses `@upstash/redis`
- ✅ `server/routes/media.ts` - Updated status messages
- ✅ `package.json` - Added `@upstash/redis` dependency

**Compatibility:**
- ✅ Works with Upstash Redis (recommended)
- ✅ Works with Vercel KV (fallback)
- ✅ Works with file storage (localhost)

## 🎯 Next Steps

1. **Add Upstash Redis** via Vercel Marketplace
2. **Redeploy** your project
3. **Run sync:** `/api/media/sync-cloudinary`
4. **Verify:** Files persist permanently

## 📚 Documentation

- **Setup:** `HOW_TO_CREATE_KV.md`
- **Configuration:** `UPSTASH_CONFIGURATION.md`
- **Marketplace:** `KV_MARKETPLACE_GUIDE.md`
- **Selecting Option:** `SELECT_UPSTASH_REDIS.md`

---

**Everything is ready!** Just add Upstash Redis via Marketplace and redeploy. 🚀

