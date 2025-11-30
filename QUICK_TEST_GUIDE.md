# Quick Test Guide - Cloudinary Sync

## Step 1: Start Dev Server

```bash
pnpm dev
```

**Important:** Server runs on port **8080**, not 8088!

Wait for: `🚀 Fusion Starter server running` message

## Step 2: Test Cloudinary Connection First

Before syncing, test if Cloudinary is accessible:

**Open in browser:**
```
http://localhost:8080/api/media/test-cloudinary
```

**Expected response:**
```json
{
  "success": true,
  "servers": {
    "server1": {
      "connected": true,
      "cloud_name": "dk81tgmae",
      "hasResources": true
    },
    "server2": { ... },
    "server3": { ... }
  }
}
```

**If connection fails:**
- Check Cloudinary credentials in `server/config/cloudinary.ts`
- Verify API keys are correct
- Make sure accounts are active

## Step 3: Run Sync

**Open in browser:**
```
http://localhost:8080/api/media/sync-cloudinary
```

**Or use curl:**
```bash
curl http://localhost:8080/api/media/sync-cloudinary
```

**Watch console output:**
```
🔄 Starting Cloudinary sync...
✅ Cloudinary module loaded successfully
📡 Fetching resources from Cloudinary...
   This may take a while if you have many files...
  ✅ X image files from server1
  ✅ Y video files from server1
📦 Total resources found: XX
📚 Loading existing database...
📚 Found X existing items in database
🔄 Processing resources...
✅ Processed XX resources: X new, Y skipped
💾 Saving XX items to database...
✅ Database saved successfully
✅ Sync complete: X new items added, Y skipped (already exists)
```

## Step 4: Verify Sync

**Check database status:**
```
http://localhost:8080/api/media/database/status
```

Should show:
- `media.count` > 0 (if files were synced)
- Storage type (File Storage on localhost, Vercel KV on production)

**Check media list:**
```
http://localhost:8080/api/media
```

Should list all synced media.

## Troubleshooting

### Error: "Failed to fetch resources from Cloudinary"

**Check:**
1. Test connection first: `/api/media/test-cloudinary`
2. Verify credentials in `server/config/cloudinary.ts`
3. Check console logs for specific error

### No files found

**Possible causes:**
1. Cloudinary accounts are empty
2. Files are in derived/transformed format (not uploaded directly)
3. Wrong account credentials

**Solution:**
- Check Cloudinary Dashboard manually
- Verify files are "Uploaded" type, not "Derived"

### Sync completes but shows 0 files

**Check:**
1. All files already exist in database (skipped)
2. Database save failed (check console logs)
3. Wrong URLs being checked

**Solution:**
- Check console logs for "skipped" count
- Verify database file: `server/data/media-database.json`

### Port Issues

**Wrong port?** Dev server uses **8080**, not 8088!

- Correct: `http://localhost:8080/api/...`
- Wrong: `http://localhost:8088/api/...`

## Common Errors

### "ERR_CONNECTION_REFUSED"
→ Dev server not running. Start with `pnpm dev`

### "Failed to load Cloudinary module"
→ Check that `server/config/cloudinary.ts` exists and exports correctly

### "Cloudinary authentication failed"
→ Check API keys in `server/config/cloudinary.ts`

### "No resources found"
→ Cloudinary accounts are empty or credentials are wrong

