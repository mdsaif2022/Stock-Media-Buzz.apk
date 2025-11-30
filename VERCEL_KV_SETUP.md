# Vercel KV Setup Guide - Fix for Vanishing Uploads

## Problem

When deploying to Vercel, uploaded media content disappears after a few hours because:
- Vercel serverless functions use an **ephemeral filesystem** (read-only)
- Data stored in `server/data/` JSON files gets wiped when functions stop
- Files work locally but vanish on Vercel

## Solution

We've implemented a database abstraction layer that uses:
- **Vercel KV (Redis)** on Vercel (persistent storage)
- **File storage** on localhost (for development)

## Setup Instructions

### Step 1: Create Vercel KV Database

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database**
4. Select **KV** (Redis)
5. Choose a name (e.g., `stock-media-kv`)
6. Select a region (closest to your users)
7. Click **Create**

### Step 2: Link KV to Your Project

1. After creating KV, you'll see connection details
2. Vercel automatically sets these environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### Step 3: Update Environment Variables

If deploying from CLI or if variables aren't auto-set:

```bash
# Get these from Vercel Dashboard → Storage → Your KV Database → Settings
vercel env add KV_URL
vercel env add KV_REST_API_URL
vercel env add KV_REST_API_TOKEN
vercel env add KV_REST_API_READ_ONLY_TOKEN
```

### Step 4: Deploy

The code automatically detects KV environment variables and uses KV storage when available.

```bash
vercel --prod
```

## How It Works

### Automatic Detection

The system automatically detects the storage type:

```typescript
// ✅ On Vercel (with KV_URL set) → Uses Vercel KV (Redis)
// ✅ On localhost (no KV_URL) → Uses file storage (server/data/)
```

### Migration

- **Existing data**: When you first deploy, KV will be empty
- **New uploads**: Will be stored in KV (persistent)
- **Local development**: Continues using `server/data/` files

### Backing Up Data

To migrate existing local data to KV:

1. Export your local data:
```bash
# Backup current data
cp -r server/data backup/
```

2. Use Vercel KV Dashboard to import data, or create a migration script

## Verification

### Step 1: Check Deployment Logs

After deployment, check logs. You should see:

```
✅ Connected to Vercel KV - Data will persist
```

If you see this, KV is working correctly!

If you see:
```
⚠️  WARNING: Running on Vercel but KV_URL is not set!
```

KV is not configured. Follow the setup steps above.

### Step 2: Check Database Status

Visit this endpoint to check your database status:
```
https://your-site.vercel.app/api/media/database/status
```

Expected response (KV configured):
```json
{
  "status": "ok",
  "storage": {
    "type": "Vercel KV",
    "isVercel": true,
    "hasKV": true,
    "kvUrl": "✅ Set"
  },
  "media": {
    "count": 5,
    ...
  },
  "message": "✅ Database configured correctly"
}
```

If you see `"hasKV": false`, KV is not set up. Follow setup steps above.

## Troubleshooting

### Uploads Still Disappearing?

1. **Check KV connection**:
   - Verify `KV_URL` is set in Vercel environment variables
   - Check deployment logs for KV connection errors

2. **Verify KV is created**:
   - Go to Vercel Dashboard → Storage
   - Ensure KV database exists and is linked to your project

3. **Check API routes**:
   - Ensure your API routes are deployed as serverless functions
   - Check `vercel.json` configuration

### Environment Variables Not Set?

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Manually add:
   - `KV_URL` (from KV database settings)
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

### Local Development

For local development, you don't need KV. The system automatically uses file storage when `KV_URL` is not set.

## Pricing

Vercel KV Free Tier:
- 256 MB storage
- 30,000 commands/day
- Perfect for small-medium projects

For larger projects, upgrade to paid plans.

## API Routes Setup

If you're deploying the backend to Vercel (not just frontend), the setup includes:

- ✅ `api/index.ts` - Vercel serverless function handler
- ✅ `vercel.json` - Configured to route `/api/*` to serverless function

The API routes are automatically handled when you deploy to Vercel.

## Files Changed

- ✅ `server/utils/database.ts` - Database abstraction layer
- ✅ `server/routes/media.ts` - Updated to use database abstraction
- ✅ `server/routes/upload.ts` - Updated to use database abstraction
- ✅ `server/index.ts` - Initialize KV connection on startup
- ✅ `api/index.ts` - Vercel serverless function handler (new)
- ✅ `vercel.json` - Updated for API routes (new)
- ✅ `package.json` - Added `@vercel/kv` dependency

## Next Steps

1. **Set up KV** (see Step 1-3 above)
2. **Deploy to Vercel**
3. **Test uploads** - They should now persist!

For other data (users, creators, settings), the same pattern will be applied in future updates.

