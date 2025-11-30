# Troubleshooting: Media Not Showing on Vercel

## Problem: Uploaded Content Disappears

If uploaded media files are in Cloudinary but don't show on your site after a few hours:

**Root Cause**: The media metadata database is not persisting. Files are uploaded correctly to Cloudinary, but the database that tracks which files exist is stored in temporary storage that gets wiped.

## Quick Diagnostic

Check your database status by visiting:
```
https://your-site.vercel.app/api/media/database/status
```

You should see:
```json
{
  "status": "ok",
  "storage": {
    "type": "Vercel KV",
    "hasKV": true,
    "kvUrl": "✅ Set"
  },
  "media": {
    "count": 10,
    ...
  }
}
```

### If You See "⚠️ KV not configured"

This means Vercel KV is not set up. Follow these steps:

## Solution: Set Up Vercel KV + Sync Cloudinary

### IMPORTANT: Two Steps Required

1. **Set up KV** - So data persists
2. **Sync Cloudinary** - To recover existing files

---

### Step 1: Create Vercel KV Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis)
6. Choose a name (e.g., `stock-media-kv`)
7. Select region (closest to your users)
8. Click **Create**

### Step 2: Verify KV is Linked

After creating KV, Vercel automatically:
- Links it to your project
- Sets environment variables (`KV_URL`, etc.)

You can verify in:
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Look for `KV_URL`, `KV_REST_API_URL`, etc.

### Step 3: Redeploy

After KV is set up, redeploy your project:

```bash
vercel --prod
```

Or trigger a redeploy from Vercel Dashboard.

### Step 4: Check Logs

After deployment, check the logs. You should see:
```
✅ Connected to Vercel KV - Data will persist
✅ Saved X items to KV (media-database)
```

### Step 5: Sync Existing Files from Cloudinary

Your files are already in Cloudinary, but the database is empty. Sync them:

**Call the sync endpoint:**
```bash
POST https://your-site.vercel.app/api/media/sync-cloudinary
```

Or visit in browser:
```
https://your-site.vercel.app/api/media/sync-cloudinary
```

This will:
- ✅ List all files from all 3 Cloudinary accounts
- ✅ Create database entries for each file
- ✅ Save to KV (so they persist)

**Wait for completion** (may take 1-5 minutes depending on file count).

### Step 6: Verify

1. Check status: `/api/media/database/status`
   - Should show `media.count > 0`
   - Should show correct number of files

2. Visit your site
   - Media should now appear!

3. Test new upload:
   - Upload a new file
   - Should appear immediately
   - Should persist (check again after 1 hour)

## Common Issues

### Issue 1: "KV_URL is not set"

**Solution**: KV database is not created or not linked to your project.

1. Create KV database (see Step 1 above)
2. Verify it's linked to your project
3. Redeploy

### Issue 2: "KV connection failed"

**Solution**: KV is configured but connection is failing.

1. Check Vercel Dashboard → Storage → Your KV Database
2. Verify it's active and not paused
3. Check environment variables are set correctly
4. Try redeploying

### Issue 3: Uploads work but disappear after some hours

**Solution**: KV is not being used - falling back to file storage.

1. Check deployment logs for warnings
2. Verify `KV_URL` environment variable is set
3. Check `/api/media/database/status` endpoint
4. If it shows "File Storage" on Vercel, KV is not configured

### Issue 4: Empty database after setup

**Solution**: KV was just created, so it's empty. You need to re-upload your media, or migrate existing data.

**Option A: Re-upload** (simplest)
- Just upload your media again through the admin panel
- New uploads will persist in KV

**Option B: Migrate existing data** (if you have local backups)
- Use the Vercel KV Dashboard to manually import data
- Or create a migration script

## Verification Checklist

- [ ] Vercel KV database created
- [ ] KV linked to your project
- [ ] `KV_URL` environment variable exists
- [ ] Deployment logs show "✅ Connected to Vercel KV"
- [ ] `/api/media/database/status` shows "Vercel KV"
- [ ] Upload a test file
- [ ] File appears on site immediately
- [ ] File still appears after 1+ hours

## Need Help?

1. Check deployment logs in Vercel Dashboard
2. Visit `/api/media/database/status` to see current configuration
3. Check Cloudinary - files should still be there (the issue is metadata, not files)
4. Review `VERCEL_KV_SETUP.md` for detailed setup instructions

