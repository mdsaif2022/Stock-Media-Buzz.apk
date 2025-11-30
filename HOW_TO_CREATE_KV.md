# How to Create KV on Vercel (2024 Update)

## ⚠️ Important: KV is Now in Marketplace

Vercel has moved KV to the **Marketplace**. It's no longer directly in Storage.

## 🎯 Step-by-Step Instructions

### Option 1: Through Storage Tab (Easiest)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Open Storage:**
   - Click **Storage** tab (left sidebar)
   - Click **"Create New"** button

3. **Find Marketplace Section:**
   - You'll see "Edge Config" and "Blob" options first
   - **Scroll down** to find **"Marketplace Database Providers"**
   - Look for **KV** or **Upstash Redis**

4. **Create KV:**
   - Click on **KV** or **Upstash Redis**
   - Click **"Add Integration"** or **"Create"**
   - Name: `stock-media-kv`
   - Select region (closest to you)
   - Click **Create**

### Option 2: Direct Marketplace Access

1. **Go to Marketplace:**
   - Vercel Dashboard → Click **Marketplace** (top navigation)
   - Or visit: https://vercel.com/marketplace

2. **Search for KV:**
   - Search bar: Type **"KV"** or **"Redis"** or **"Upstash"**
   - Click on **Vercel KV** or **Upstash Redis**

3. **Add to Project:**
   - Click **"Add Integration"** or **"Install"**
   - Select your project from dropdown
   - Name: `stock-media-kv`
   - Region: Choose closest to you
   - Click **Add** or **Create**

### Option 3: Upstash Direct Link

1. **Go directly to Upstash:**
   - Visit: https://vercel.com/marketplace/upstash
   - Or search "Upstash" in Vercel Marketplace

2. **Add Redis:**
   - Click **"Add Integration"**
   - Select your project
   - Choose **Redis** (not Kafka)
   - Name: `stock-media-kv`
   - Click **Add**

## ✅ After Creating KV

1. **Environment Variables Auto-Set:**
   - Vercel automatically adds:
     - `KV_URL`
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

2. **Verify in Settings:**
   - Go to: Project → Settings → Environment Variables
   - Should see `KV_URL` listed

3. **Redeploy:**
   ```bash
   vercel --prod
   ```
   Or push to Git (if auto-deploy enabled)

4. **Check Status:**
   ```
   https://your-site.vercel.app/api/media/database/status
   ```
   Should show: `"hasKV": true`

## 🔍 Can't Find KV?

**If you don't see KV in Marketplace:**

1. **Try Upstash:**
   - Search "Upstash" instead of "KV"
   - Upstash provides Redis (same as KV)

2. **Check Your Plan:**
   - KV/Redis might require Pro plan on some regions
   - Check Vercel pricing page

3. **Use Alternative:**
   - You can use Upstash directly: https://upstash.com
   - Create Redis database there
   - Add connection strings to Vercel Environment Variables

## 📝 Quick Checklist

- [ ] Found "Marketplace Database Providers" section
- [ ] Clicked on KV/Upstash Redis
- [ ] Created database named `stock-media-kv`
- [ ] Environment variables auto-set
- [ ] Redeployed project
- [ ] Status endpoint shows `"hasKV": true`

## 🆘 Still Having Issues?

1. **Screenshot the Storage page** - I can help identify where KV is
2. **Check Vercel docs:** https://vercel.com/docs/storage/vercel-kv
3. **Contact Vercel support** if KV option is missing

---

**Remember:** KV is now in **Marketplace**, not directly in Storage. Scroll down or use Marketplace search!

