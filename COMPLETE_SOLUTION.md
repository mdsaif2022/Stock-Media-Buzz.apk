# Complete Solution - Cloudinary Sync & Vercel Persistence

## ✅ What Was Fixed

1. **Database Persistence** - Uses Vercel KV on Vercel, file storage on localhost
2. **Cloudinary Sync** - Recover all files from Cloudinary to database
3. **Better Error Handling** - Clear error messages and logging
4. **Test Endpoints** - Easy debugging and verification

## 🚀 Step-by-Step Setup

### Step 1: Test on Localhost

1. **Start dev server:**
   ```bash
   pnpm dev
   ```
   Server runs on **port 8080**

2. **Test Cloudinary connection:**
   Open in browser:
   ```
   http://localhost:8080/api/media/test-cloudinary
   ```
   
   Should return:
   ```json
   {
     "success": true,
     "servers": {
       "server1": { "connected": true, "cloud_name": "dk81tgmae" },
       "server2": { "connected": true },
       "server3": { "connected": true }
     }
   }
   ```

3. **Sync files from Cloudinary:**
   Open in browser:
   ```
   http://localhost:8080/api/media/sync-cloudinary
   ```
   
   Watch console for progress. Should see:
   ```
   🔄 Starting Cloudinary sync...
   ✅ Cloudinary module loaded successfully
   📡 Fetching resources from Cloudinary...
   📦 Total resources found: XX
   📚 Loading existing database...
   🔄 Processing resources...
   ✅ Sync complete: X new items added
   ```

4. **Verify sync:**
   - Check status: `http://localhost:8080/api/media/database/status`
   - Check media: `http://localhost:8080/api/media`
   - Check database file: `server/data/media-database.json`

### Step 2: Deploy to Vercel

1. **Create Vercel KV Database:**
   - Go to Vercel Dashboard → Your Project → Storage
   - Click "Create Database" → Select "KV"
   - Name it (e.g., `stock-media-kv`)
   - Select region
   - Click "Create"
   - Vercel auto-sets environment variables

2. **Deploy:**
   ```bash
   vercel --prod
   ```
   
   Or push to Git (if auto-deploy is enabled)

3. **Verify KV is connected:**
   Check deployment logs for:
   ```
   ✅ Connected to Vercel KV - Data will persist
   ```

4. **Run sync on Vercel:**
   ```
   https://your-site.vercel.app/api/media/sync-cloudinary
   ```
   
   This syncs all files to KV (persistent storage)

5. **Verify:**
   - Check status: `https://your-site.vercel.app/api/media/database/status`
   - Should show: `"storage": { "type": "Vercel KV", "hasKV": true }`
   - Visit your site - media should appear

## 📋 API Endpoints

### Test Endpoints

- `GET /api/media/test-cloudinary` - Test Cloudinary connection
- `GET /api/media/database/status` - Check database status

### Sync Endpoint

- `GET /api/media/sync-cloudinary` - Sync files from Cloudinary (GET method for easy testing)
- `POST /api/media/sync-cloudinary` - Sync files from Cloudinary

### Media Endpoints

- `GET /api/media` - List all media
- `GET /api/media/:id` - Get media by ID
- `GET /api/media/trending` - Get trending media

## 🔍 Troubleshooting

### Localhost Issues

**Error: "ERR_CONNECTION_REFUSED"**
- Dev server not running
- Start with: `pnpm dev`
- Use port **8080**, not 8088

**Error: "Failed to fetch from Cloudinary"**
- Test connection first: `/api/media/test-cloudinary`
- Check credentials in `server/config/cloudinary.ts`
- Verify Cloudinary accounts are active

**Sync shows 0 files**
- Check Cloudinary Dashboard manually
- Verify files exist in all 3 accounts
- Check console logs for errors

### Vercel Issues

**Error: "KV not configured"**
- Create Vercel KV database (Step 2 above)
- Redeploy after creating KV
- Verify `KV_URL` environment variable is set

**Files disappear after some hours**
- KV not set up or not working
- Check logs: `✅ Connected to Vercel KV`
- Verify KV database is active in Vercel Dashboard

**Sync completes but files don't show**
- Check `/api/media/database/status`
- Verify `media.count > 0`
- Check if KV is saving: Look for `✅ Saved X items to KV` in logs

## 📁 File Structure

```
server/
├── config/
│   └── cloudinary.ts          # Cloudinary config & sync functions
├── routes/
│   ├── media.ts               # Media routes + sync endpoint
│   └── upload.ts              # Upload routes (uses database)
├── utils/
│   └── database.ts            # Database abstraction (KV/file)
└── data/
    └── media-database.json    # Local file storage (localhost only)
```

## 🔄 How It Works

### Localhost Flow
1. Upload → Cloudinary
2. Metadata → File storage (`server/data/media-database.json`)
3. Sync → Reads from Cloudinary, writes to file storage
4. Display → Reads from file storage

### Vercel Flow
1. Upload → Cloudinary
2. Metadata → Vercel KV (Redis)
3. Sync → Reads from Cloudinary, writes to KV
4. Display → Reads from KV

### Sync Process
1. Fetches all files from all 3 Cloudinary accounts
2. Creates Media database entries for each file
3. Skips files already in database (by URL)
4. Saves to persistent storage (KV or file)
5. Returns statistics

## ✅ Verification Checklist

### Localhost
- [ ] Dev server runs on port 8080
- [ ] Test endpoint works: `/api/media/test-cloudinary`
- [ ] Sync completes successfully
- [ ] Files appear in `/api/media`
- [ ] Database file exists: `server/data/media-database.json`
- [ ] Files visible on frontend

### Vercel
- [ ] KV database created
- [ ] Deployment shows: `✅ Connected to Vercel KV`
- [ ] Status endpoint shows: `"hasKV": true`
- [ ] Sync completes on Vercel
- [ ] Files persist after 1+ hours
- [ ] Files visible on production site

## 🎯 Quick Commands

```bash
# Start dev server
pnpm dev

# Test endpoints (in browser)
http://localhost:8080/api/media/test-cloudinary
http://localhost:8080/api/media/sync-cloudinary
http://localhost:8080/api/media/database/status

# Deploy to Vercel
vercel --prod

# Check logs
vercel logs
```

## 📝 Notes

- Sync can take 1-5 minutes for large libraries
- Safe to run sync multiple times (won't create duplicates)
- Database is checked by URL to avoid duplicates
- All 3 Cloudinary accounts are synced automatically
- New uploads automatically save to database

## 🆘 Still Having Issues?

1. **Check logs** - Look for error messages in console/logs
2. **Test connection** - Use `/api/media/test-cloudinary` first
3. **Verify credentials** - Check `server/config/cloudinary.ts`
4. **Check KV status** - Use `/api/media/database/status`
5. **Review documentation** - See `VERCEL_KV_SETUP.md` and `TROUBLESHOOTING.md`

