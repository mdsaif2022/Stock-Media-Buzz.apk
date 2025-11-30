# ✅ Select "Upstash for Redis" from Upstash Options

## Which Upstash Option to Choose?

You're seeing multiple Upstash options. Here's what each one is:

1. **Upstash (Main)** - Overview/service page
2. **Upstash for Redis** ⭐ **← SELECT THIS ONE!**
3. **Upstash Vector** - For vector/embeddings (not needed)
4. **Upstash QStash/Workflow** - For queues/workflows (not needed)
5. **Upstash Search** - For search functionality (not needed)

## ✅ Correct Choice: "Upstash for Redis"

**Click on: "Upstash for Redis"** (the one with the red square icon)

This is the Redis database that provides the KV functionality.

## 📋 Step-by-Step:

1. **Click "Upstash for Redis"** (red square icon)
2. **Click "Add Integration"** or **"Install"**
3. **Select your project** from the dropdown
4. **Name it:** `stock-media-kv`
5. **Select region** (closest to you)
6. **Click "Add"** or **"Create"**

## ✅ After Adding:

1. **Environment Variables Auto-Set:**
   - Vercel automatically adds:
     - `KV_URL`
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

2. **Verify:**
   - Go to: Project → Settings → Environment Variables
   - Should see `KV_URL` listed

3. **Redeploy:**
   ```bash
   vercel --prod
   ```

4. **Test:**
   - Visit: `https://your-site.vercel.app/api/media/database/status`
   - Should show: `"hasKV": true`

5. **Run Sync:**
   - Visit: `https://your-site.vercel.app/api/media/sync-cloudinary`
   - Should now show: `"storage": { "hasKV": true }`

## 🎯 Quick Summary:

- ✅ **Select:** "Upstash for Redis" (red square icon)
- ❌ **Don't select:** Vector, QStash, or Search
- ✅ **Result:** KV/Redis database for persistent storage

---

**Once you add "Upstash for Redis", your files will persist permanently on Vercel!**

