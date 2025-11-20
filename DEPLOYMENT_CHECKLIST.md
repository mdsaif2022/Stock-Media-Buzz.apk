# Deployment Checklist - Verify Everything Works

## ✅ Environment Variables Setup

### Vercel (Frontend) - Required:
- [x] `VITE_API_BASE_URL` - ✅ Used in `client/lib/api.ts`
- [x] `VITE_ADMIN_EMAIL` - ✅ Used in `client/components/AdminLayout.tsx`

### Render (Backend) - Required:
- [x] `ALLOWED_ORIGINS` - ✅ Used in `server/index.ts` (CORS configuration)
- [x] `ADMIN_EMAIL` - ✅ Used in `server/routes/auth.ts`
- [x] `ADMIN_USERNAME` - ✅ Used in `server/routes/auth.ts`
- [x] `ADMIN_PASSWORD` - ✅ Used in `server/routes/auth.ts`
- [x] `PORT` - ✅ Used in `server/node-build.ts` (Render auto-sets this)
- [x] `PING_MESSAGE` - ✅ Used in `server/index.ts` (optional)

## ✅ Code Verification

### Frontend (Vercel):
✅ **API Base URL**: Correctly configured
- File: `client/lib/api.ts`
- Uses: `import.meta.env.VITE_API_BASE_URL`
- Will work when deployed to Vercel

✅ **Admin Email Check**: Correctly configured
- File: `client/components/AdminLayout.tsx`
- Uses: `import.meta.env.VITE_ADMIN_EMAIL`
- Will work when deployed to Vercel

### Backend (Render):
✅ **CORS Configuration**: Correctly configured
- File: `server/index.ts`
- Uses: `process.env.ALLOWED_ORIGINS`
- Will allow requests from your Vercel domain

✅ **Admin Authentication**: Correctly configured
- File: `server/routes/auth.ts`
- Uses: `process.env.ADMIN_EMAIL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- Will work for admin login

## 🧪 Testing After Deployment

### Step 1: Test Backend (Render)
1. Visit: `https://your-app-name.onrender.com/api/ping`
2. Should return: `{"message":"pong"}` (or your custom PING_MESSAGE)
3. ✅ If this works, backend is running

### Step 2: Test Frontend (Vercel)
1. Visit your Vercel URL
2. Open browser console (F12)
3. Check for any CORS errors
4. ✅ If no errors, frontend is connecting to backend

### Step 3: Test Admin Login
1. Go to `/login` page
2. Use your admin credentials:
   - Email: (your ADMIN_EMAIL from Render)
   - Password: (your ADMIN_PASSWORD from Render)
3. ✅ If login works, admin auth is configured correctly

### Step 4: Test API Calls
1. Browse media on the frontend
2. Check browser Network tab
3. API calls should go to: `https://your-app-name.onrender.com/api/...`
4. ✅ If API calls work, VITE_API_BASE_URL is correct

## ⚠️ Common Issues & Solutions

### Issue 1: CORS Errors
**Symptom**: Browser console shows CORS errors
**Solution**: 
- Make sure your Vercel URL is in Render's `ALLOWED_ORIGINS`
- Format: `https://your-app.vercel.app` (no trailing slash)
- Multiple URLs: `https://app1.vercel.app,https://app2.vercel.app`

### Issue 2: API Calls Fail
**Symptom**: Network requests return 404 or fail
**Solution**:
- Verify `VITE_API_BASE_URL` in Vercel matches your Render URL
- Format: `https://your-app-name.onrender.com` (no trailing slash)
- Check Render service is running and not sleeping

### Issue 3: Admin Login Doesn't Work
**Symptom**: Can't login with admin credentials
**Solution**:
- Verify `ADMIN_EMAIL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` in Render
- Make sure you're using the exact values from Render env vars
- Check `VITE_ADMIN_EMAIL` in Vercel matches `ADMIN_EMAIL` in Render

### Issue 4: Render Service Sleeping
**Symptom**: First request takes 30+ seconds
**Solution**:
- This is normal for free Render plans
- Service wakes up after first request
- Consider upgrading to paid plan for always-on service

## ✅ Final Verification Checklist

Before going live, verify:

- [ ] Backend `/api/ping` endpoint works
- [ ] Frontend loads without errors
- [ ] No CORS errors in browser console
- [ ] API calls go to correct Render backend
- [ ] Admin login works with Render credentials
- [ ] Media browsing works
- [ ] Downloads work
- [ ] Admin dashboard accessible

## 🎉 Success Indicators

If all these work, your deployment is successful:

✅ Backend responds to ping
✅ Frontend connects to backend
✅ No CORS errors
✅ Admin can login
✅ Media loads and displays
✅ Downloads work
✅ Admin features accessible

---

## 📞 Need Help?

If something doesn't work:
1. Check browser console for errors
2. Check Render logs for backend errors
3. Verify all environment variables are set correctly
4. Make sure both services are deployed and running

**Everything is configured correctly in the code!** Just make sure to:
1. Set the environment variables correctly
2. Use the right URLs (no trailing slashes)
3. Wait for both services to finish deploying

