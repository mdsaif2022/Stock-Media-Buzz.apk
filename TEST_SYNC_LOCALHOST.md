# Testing Sync on Localhost

## Quick Test

1. **Start your dev server:**
   ```bash
   pnpm run dev
   ```

2. **Call the sync endpoint:**
   
   **Option A: Browser (Easiest - GET method now works!)**
   Just open this URL in your browser:
   ```
   http://localhost:8088/api/media/sync-cloudinary
   ```
   The endpoint now accepts both GET and POST for easier testing.

   **Option B: curl (PowerShell)**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:8088/api/media/sync-cloudinary" -Method POST
   ```

   **Option C: curl (Command Prompt)**
   ```cmd
   curl -X POST http://localhost:8088/api/media/sync-cloudinary
   ```
   
   Or with GET:
   ```cmd
   curl http://localhost:8088/api/media/sync-cloudinary
   ```

   **Option D: Use Postman/Insomnia**
   - Method: `POST` or `GET`
   - URL: `http://localhost:8088/api/media/sync-cloudinary`

3. **Check the response:**
   You should see a JSON response with sync statistics.

4. **Check your database:**
   ```
   http://localhost:8088/api/media/database/status
   ```
   Should show the media count.

5. **Verify files are synced:**
   ```
   http://localhost:8088/api/media
   ```
   Should list all synced media.

## Troubleshooting

### Error: "Failed to load Cloudinary module"
- Check that `server/config/cloudinary.ts` exists
- Check that Cloudinary credentials are set correctly

### Error: "Failed to fetch resources from Cloudinary"
- Check Cloudinary credentials in `server/config/cloudinary.ts`
- Verify API keys are correct
- Check if Cloudinary API is accessible from your network

### Error: "Failed to save database"
- Check that `server/data/` directory exists
- Check file permissions (should be writable)
- Check console logs for specific error

### No files found
- Verify you have files in Cloudinary
- Check all 3 Cloudinary accounts (server1, server2, server3)
- Try accessing Cloudinary dashboard to confirm files exist

## Expected Console Output

When sync runs, you should see:
```
🔄 Starting Cloudinary sync...
✅ Cloudinary module loaded
📡 Fetching resources from Cloudinary...
  ✅ X image files from server1
  ✅ Y video files from server1
  ...
📦 Total resources found: XX
📚 Loading existing database...
📚 Found X existing items in database
🔄 Processing resources...
✅ Processed XX resources: X new, Y skipped
💾 Saving XX items to database...
✅ Database saved successfully
✅ Sync complete: X new items added, Y skipped (already exists)
```

## Testing After Sync

1. Check media list: `http://localhost:8088/api/media`
2. Check database status: `http://localhost:8088/api/media/database/status`
3. Visit your frontend and verify media appears
4. Upload a new file - should appear immediately

