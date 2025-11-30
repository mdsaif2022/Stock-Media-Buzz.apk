# ⚠️ IMPORTANT: KV is Now in Marketplace!

## The Issue You're Seeing

When you visit `/api/media/sync-cloudinary` on Vercel, it shows KV is not configured because:
- **KV is no longer directly in Storage tab**
- **KV has been moved to Marketplace**
- You need to find it in the Marketplace section

## 🎯 How to Find and Create KV

### Step 1: Access Marketplace

**Method A: Through Storage Tab**
1. Vercel Dashboard → Your Project → **Storage** tab
2. Click **"Create New"**
3. **Scroll down** past "Edge Config" and "Blob"
4. Find **"Marketplace Database Providers"** section
5. Click on **KV** or **Upstash Redis**

**Method B: Direct Marketplace**
1. Vercel Dashboard → Click **"Marketplace"** (top navigation)
2. Search for **"KV"** or **"Upstash"**
3. You'll see multiple Upstash options:
   - ⭐ **"Upstash for Redis"** ← **SELECT THIS ONE!** (red square icon)
   - "Upstash Vector" (don't select)
   - "Upstash QStash/Workflow" (don't select)
   - "Upstash Search" (don't select)
4. Click on **"Upstash for Redis"**
5. Click **"Add Integration"**

### Step 2: Create KV Database

1. Select your project
2. Name it: `stock-media-kv`
3. Choose region (closest to you)
4. Click **Create** or **Add**

### Step 3: Verify

After creating, check:
- **Environment Variables:** Project → Settings → Environment Variables
- Should see: `KV_URL` automatically added
- **Status Endpoint:** `/api/media/database/status`
- Should show: `"hasKV": true`

## 🔍 Why Sync Endpoint Shows "No KV"

The sync endpoint checks for `KV_URL` environment variable. If it's not set:
- ✅ Sync still works (saves to temporary storage)
- ⚠️ Files will disappear after function restart
- ❌ Need KV for permanent persistence

## ✅ After Creating KV

1. **Redeploy:**
   ```bash
   vercel --prod
   ```

2. **Run sync again:**
   ```
   https://your-site.vercel.app/api/media/sync-cloudinary
   ```

3. **Check response:**
   Should now show:
   ```json
   {
     "storage": {
       "type": "Vercel KV",
       "hasKV": true
     }
   }
   ```

## 📸 Visual Guide

Based on your screenshot:
1. You're in **Storage** → **Create New**
2. You see **Edge Config** and **Blob**
3. **Scroll down** to find **"Marketplace Database Providers"**
4. Look for **KV** or **Upstash Redis** in that section

## 🆘 Can't Find KV?

**Alternative: Use Upstash Directly**

1. Go to: https://upstash.com
2. Create account/login
3. Create Redis database
4. Copy connection strings
5. Add to Vercel Environment Variables:
   - `KV_URL` = Your Upstash REST URL
   - `KV_REST_API_URL` = Your Upstash REST URL  
   - `KV_REST_API_TOKEN` = Your Upstash REST Token

## 📋 Quick Checklist

- [ ] Found "Marketplace Database Providers" section
- [ ] Clicked on KV/Upstash Redis
- [ ] Created database
- [ ] Environment variables auto-set
- [ ] Redeployed
- [ ] Status shows `"hasKV": true`
- [ ] Sync works and shows KV

---

**The sync endpoint works without KV, but files won't persist. Create KV via Marketplace to fix this!**

