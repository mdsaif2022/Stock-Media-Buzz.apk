# How to Sync Media from Cloudinary

If your files are uploaded to Cloudinary but not showing on your site, you can sync them to rebuild your database.

## Quick Fix

### Step 1: Make sure KV is set up

Before syncing, ensure Vercel KV is configured (see `VERCEL_KV_SETUP.md`).

Check status:
```
https://your-site.vercel.app/api/media/database/status
```

Should show: `"hasKV": true`

### Step 2: Run the sync

**Easiest: Open in browser (GET method works!)**
```
https://your-site.vercel.app/api/media/sync-cloudinary
```

Or use curl:
```bash
# GET method (simpler)
curl https://your-site.vercel.app/api/media/sync-cloudinary

# Or POST method
curl -X POST https://your-site.vercel.app/api/media/sync-cloudinary
```

### Step 3: Wait for completion

The sync will:
1. List all files from all 3 Cloudinary accounts
2. Create database entries for each file
3. Save to KV (persistent storage)

This may take a few minutes if you have many files.

### Step 4: Verify

After sync completes, check:
1. Visit `/api/media/database/status` - should show correct count
2. Visit your site - media should now appear
3. Upload a new file - should appear immediately

## What the Sync Does

The sync endpoint:
- ✅ Lists all images, videos, and raw files from Cloudinary
- ✅ Creates Media database entries for each file
- ✅ Automatically detects file types (image/video/APK)
- ✅ Skips files already in database (by URL)
- ✅ Preserves existing database entries
- ✅ Saves everything to KV (persistent)

## Response Example

```json
{
  "success": true,
  "message": "Synced 45 new media items from Cloudinary",
  "stats": {
    "totalInCloudinary": 45,
    "existingInDatabase": 0,
    "newItemsAdded": 45,
    "skipped": 0,
    "totalInDatabase": 45
  }
}
```

## Troubleshooting

### "Failed to sync from Cloudinary"

**Possible causes:**
1. Cloudinary credentials are incorrect
2. API rate limits (if you have many files)
3. Network timeout (if sync takes too long)

**Solution:**
- Check Cloudinary credentials in `server/config/cloudinary.ts`
- Try syncing again (may need multiple attempts for large libraries)
- Check deployment logs for specific errors

### Sync completes but media still not showing

**Check:**
1. KV is configured: `/api/media/database/status`
2. Database has items: `media.count > 0`
3. Refresh your browser
4. Clear browser cache

### Only some files synced

The sync may take multiple attempts for large libraries. Run the sync endpoint again - it will skip files already in the database and only add new ones.

## Running Multiple Times

You can safely run the sync multiple times:
- ✅ Won't create duplicates (checks by URL)
- ✅ Only adds files not in database
- ✅ Preserves existing media entries

## Manual Sync (Alternative)

If the API endpoint doesn't work, you can also:
1. Go to Cloudinary Dashboard
2. Export your file list
3. Manually create Media entries through admin panel

But the sync endpoint is much faster! ⚡

