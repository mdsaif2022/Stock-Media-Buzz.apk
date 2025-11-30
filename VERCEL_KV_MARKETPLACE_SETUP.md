# Vercel KV Setup via Marketplace (Updated 2024)

## ⚠️ Important Change

Vercel has moved KV (Redis) to the **Marketplace**. It's no longer directly in the Storage section.

## 🚀 How to Create KV via Marketplace

### Method 1: Through Storage Tab

1. **Go to Vercel Dashboard:**
   - Select your project
   - Click **Storage** tab

2. **Create New Storage:**
   - Click **"Create New"** button
   - You'll see Edge Config and Blob options

3. **Find Marketplace:**
   - Scroll down to **"Marketplace Database Providers"** section
   - Look for **KV** or **Redis** option
   - Click on it

4. **Add KV:**
   - Click **"Add Integration"** or **"Create"**
   - Name it: `stock-media-kv`
   - Select region
   - Click **Create**

### Method 2: Direct Marketplace Access

1. **Go to Marketplace:**
   - Vercel Dashboard → **Marketplace** (or search in top bar)
   - Or visit: https://vercel.com/marketplace

2. **Search for KV:**
   - Search for **"KV"** or **"Redis"**
   - Click on **Vercel KV** or **Upstash Redis**

3. **Add to Project:**
   - Click **"Add Integration"**
   - Select your project
   - Name it: `stock-media-kv`
   - Select region
   - Click **Add** or **Create**

### Method 3: Using Upstash (Recommended)

1. **Go to Upstash:**
   - Visit: https://vercel.com/marketplace/upstash
   - Or search "Upstash" in Vercel Marketplace

2. **Add Upstash Redis:**
   - Click **"Add Integration"**
   - Select your project
   - Choose **Redis** (not Kafka)
   - Name it: `stock-media-kv`
   - Select region
   - Click **Add**

3. **Environment Variables:**
   - Vercel automatically sets:
     - `KV_URL`
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

## ✅ Verify KV is Set Up

After creating KV:

1. **Check Environment Variables:**
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Look for `KV_URL` - should be set automatically

2. **Check Deployment Logs:**
   - After redeploy, look for:
   ```
   ✅ Connected to Vercel KV - Data will persist
   ```

3. **Check Status Endpoint:**
   ```
   https://your-site.vercel.app/api/media/database/status
   ```
   Should show:
   ```json
   {
     "storage": {
       "type": "Vercel KV",
       "hasKV": true,
       "kvUrl": "✅ Set"
     }
   }
   ```

## 🔄 After Creating KV

1. **Redeploy:**
   ```bash
   vercel --prod
   ```
   Or push to Git (if auto-deploy enabled)

2. **Run Sync:**
   ```
   https://your-site.vercel.app/api/media/sync-cloudinary
   ```

3. **Verify:**
   - Check status endpoint
   - Files should persist after sync

## 🆘 Troubleshooting

### "KV_URL is not set"

**Solution:**
- Verify KV was created successfully
- Check Environment Variables in Vercel Dashboard
- If missing, manually add from KV dashboard:
  - Go to your KV database in Vercel
  - Copy the connection strings
  - Add to Environment Variables

### "KV not showing in Storage"

**Solution:**
- KV is now in Marketplace, not Storage
- Use Marketplace method above
- Or use Upstash directly

### "Can't find KV in Marketplace"

**Solution:**
- Search for "Upstash" instead
- Or "Redis"
- Or visit: https://vercel.com/marketplace/upstash

## 📝 Alternative: Use Upstash Directly

If Marketplace doesn't work:

1. **Go to Upstash:**
   - Visit: https://upstash.com
   - Sign up/login

2. **Create Redis Database:**
   - Click **Create Database**
   - Choose **Redis**
   - Select region
   - Click **Create**

3. **Get Connection Details:**
   - Copy `UPSTASH_REDIS_REST_URL`
   - Copy `UPSTASH_REDIS_REST_TOKEN`

4. **Add to Vercel:**
   - Vercel Dashboard → Environment Variables
   - Add:
     - `KV_URL` = Your Upstash REST URL
     - `KV_REST_API_URL` = Your Upstash REST URL
     - `KV_REST_API_TOKEN` = Your Upstash REST Token

5. **Update Code (if needed):**
   - The `@vercel/kv` package should work with Upstash URLs
   - Or use `@upstash/redis` package

## ✅ Quick Checklist

- [ ] Found KV in Marketplace
- [ ] Created KV database
- [ ] Environment variables auto-set
- [ ] Redeployed project
- [ ] Status shows `"hasKV": true`
- [ ] Sync works
- [ ] Files persist

---

**Note:** If you're having trouble finding KV, use **Upstash** from the Marketplace - it's the same Redis service that Vercel KV uses.

